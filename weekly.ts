import { ANNOTATIONS_PATH, MAX_ANNOTATIONS_BYTES, ANNOTATION_REPLACEMENT_REMOVED, stageWeeklyAnnotations } from "./annotation-parts";
import { cp, mkdir, mkdtemp, readdir, rename, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { parseArgs } from "node:util";
import { wire } from "./build";
import { collectEvidence } from "./evidence";
import { applyClassification } from "./facets/classification";
import { loadReviewed } from "./facets/v1";
import { Checkpoint } from "./mcp/checkpoint";
import type { FeedRejection, RegistryRecord } from "./mcp/feed-builder";
import { MAX_MANIFEST_BYTES, readSignature, type CatalogListingItem } from "./mcp/item";
import { decodeManifest, detachTools, loadToolParts, writeToolParts } from "./tool-parts";
import { MAX_INDEX_BYTES, MAX_PART_BYTES, MAX_SELECTED_BYTES, validateIndexBytes, validateSelectedParts } from "./validate";
import { parseCatalogJson } from "./ingestion";
import { verifyIndex } from "./sign/ed25519";
import { shippedKey } from "./sign/keys";
import { stageV1 } from "./v1-build";

const root = import.meta.dir;
const parts = ["connectors", "skills", "tools"] as const;
const json = (value: unknown) => JSON.stringify(value) + "\n";
const hash = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");
const fileBytes = async (path: string, limit: number) => {
    const file = Bun.file(path);
    if (file.size > limit) throw Error("oversized input: " + path);
    return new Uint8Array(await file.arrayBuffer());
};

async function readSnapshot(dir: string) {
    const connectors = await fileBytes(join(dir, "connectors.json"), MAX_PART_BYTES);
    const skills = await fileBytes(join(dir, "skills.json"), MAX_PART_BYTES);
    const tools = await fileBytes(join(dir, "tools.json"), MAX_MANIFEST_BYTES);
    if (connectors.length + skills.length + tools.length > MAX_SELECTED_BYTES) throw Error("selected parts exceed the byte limit");
    const items = validateSelectedParts({ connectors, skills });
    const manifest = decodeManifest(tools, items);
    const notePath = join(dir, ANNOTATIONS_PATH);
    const noteDigest = await Bun.file(notePath).exists() ? hash(await fileBytes(notePath, MAX_ANNOTATIONS_BYTES)) : null;
    const digests = [connectors, skills, tools].map(hash);
    if (noteDigest) digests.push(noteDigest);
    return {
        items, manifest,
        counts: { connectors:items.filter(x=>x.kind === "mcp").length, skills:items.filter(x=>x.kind !== "mcp").length, tools:manifest.size },
        fingerprint:hash(new TextEncoder().encode(json(digests))),
    };
}

async function download(url: string, limit: number, exact?: number) {
    const response = await fetch(url, { redirect:"error", signal:AbortSignal.timeout(60_000) });
    if (!response.ok || !response.body) throw Error("cannot fetch previous catalogue: " + response.status);
    const reader = response.body.getReader();
    const bytes = new Uint8Array(exact ?? limit);
    let offset = 0;
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            if (value.length > bytes.length - offset) throw Error("previous catalogue file exceeds its size limit");
            bytes.set(value, offset);
            offset += value.length;
        }
    } finally { await reader.cancel().catch(()=>{}); }
    if (exact !== undefined && offset !== exact) throw Error("previous catalogue file length mismatch");
    return bytes.subarray(0, offset);
}

export async function readPreviousIndex(indexPath: string, unsigned = false, findKey = shippedKey) {
    const remote = /^https:\/\//.test(indexPath);
    if (remote && unsigned) throw Error("unsigned previous input must be local");
    const indexBytes = remote ? await download(indexPath,MAX_INDEX_BYTES) : await fileBytes(indexPath,MAX_INDEX_BYTES);
    if (!unsigned) {
        let signaturePath = indexPath + ".sig";
        if (remote) {
            const url = new URL(indexPath);
            url.pathname += ".sig";
            signaturePath = url.href;
        }
        const signatureBytes = remote ? await download(signaturePath,1024) : await fileBytes(signaturePath,1024);
        const signature = readSignature(parseCatalogJson(signatureBytes));
        const key = findKey(signature.keyId);
        if (!key || !await verifyIndex(indexBytes,signature,key)) throw Error("invalid previous index signature");
    }
    return validateIndexBytes(indexBytes);
}

async function previousSnapshot(indexPath: string, directory: string, unsigned: boolean) {
    const remote = /^https:\/\//.test(indexPath);
    const index = await readPreviousIndex(indexPath,unsigned);
    const refs = parts.map(id=>{
        const ref = index.parts.find(part=>part.id === id);
        const limit = id === "tools" ? MAX_MANIFEST_BYTES : MAX_PART_BYTES;
        if (!ref || ref.bytes > limit) throw Error("missing or oversized previous part: " + id);
        return { ...ref, id, limit };
    });
    if (refs.reduce((n, part)=>n+part.bytes,0) > MAX_SELECTED_BYTES) throw Error("previous parts exceed the aggregate limit");
    const scratch = await mkdtemp(join(directory,"previous-"));
    try {
        for (const ref of refs) {
            const name = ref.id + ".json";
            const local = Bun.file(join(dirname(indexPath),name));
            const bytes = !remote && await local.exists() ? await fileBytes(local.name!,ref.limit)
                : await download(ref.url,ref.limit,ref.bytes);
            if (ref.bytes !== bytes.length || ref.sha256 !== hash(bytes)) throw Error("previous part digest mismatch: " + name);
            await Bun.write(join(scratch,name),bytes);
        }
        const snapshot = await readSnapshot(scratch);
        for (const ref of refs) if (snapshot.counts[ref.id] !== ref.items) throw Error("previous part count mismatch: " + ref.id);
        return snapshot;
    } finally { await rm(scratch,{recursive:true,force:true}); }
}

export function compareWeekly(
    previous: Awaited<ReturnType<typeof readSnapshot>>,
    candidate: Awaited<ReturnType<typeof readSnapshot>>,
    reasons: ReadonlyMap<string,string>,
    thresholds: { maxDrop: number; minPart: number },
) {
    const before = new Set(previous.items.map(item=>item.id));
    const after = new Set(candidate.items.map(item=>item.id));
    const dropped = [...before].filter(id=>!after.has(id)).map(id=>({id, reason:reasons.get(id) ?? null}));
    const added = [...after].filter(id=>!before.has(id));
    const oldItems = new Map(previous.items.map(item=>[item.id,item]));
    const changed = candidate.items.filter(item=>oldItems.has(item.id) && (
        json(oldItems.get(item.id)) !== json(item) || json(previous.manifest.get(item.id)) !== json(candidate.manifest.get(item.id))))
        .map(item=>item.id);
    const failures = [];
    if (dropped.some(drop=>drop.reason === null)) failures.push("unattributed-drop");
    if (dropped.length > before.size * thresholds.maxDrop) failures.push("drop-threshold");
    const shrink = parts.filter(part=>candidate.counts[part] < Math.floor(previous.counts[part] * thresholds.minPart));
    if (shrink.length) failures.push("part-shrink");
    return { publish:!failures.length, reasons:failures, fingerprint:candidate.fingerprint, thresholds,
        previous:previous.counts, candidate:candidate.counts, dropped, added, changed, shrink };
}

const runBun = async (...args: string[]) => {
    const child = Bun.spawn([process.execPath,...args], {cwd:root,stdout:"inherit",stderr:"inherit"});
    if (await child.exited) throw Error("step failed: " + args[0]);
};

const writeJson = async (path: string, value: unknown) => {
    await mkdir(dirname(path),{recursive:true});
    const temporary = path + "." + crypto.randomUUID() + ".tmp";
    await Bun.write(temporary,json(value));
    await rename(temporary,path);
};

async function reasonsForDrops(previous: CatalogListingItem[], checkpoint: string, report: string, reasons: Map<string,string>) {
    const database = new Checkpoint(checkpoint);
    const records = database.read<RegistryRecord[]>("registry:Infinity");
    database.close();
    if (!records?.length) throw Error("complete registry capture is required");
    const listed = Map.groupBy(records,rec=>rec.server.name);
    const rejected = Map.groupBy(await Bun.file(report).json() as FeedRejection[],record=>record.name);
    for (const item of previous) {
        if (!item.id.startsWith("community-feed:") || item.kind !== "mcp" || reasons.has(item.id)) continue;
        const name = item.id.slice("community-feed:".length).split("#")[0]!;
        const live = listed.get(name);
        if (!live?.length) { reasons.set(item.id,"Absent from the complete MCP Registry capture"); continue; }
        if (live.every(row=>["deleted","deprecated"].includes(row._meta?.["io.modelcontextprotocol.registry/official"]?.status))) {
            reasons.set(item.id,"All current registry records are deleted or deprecated");
            continue;
        }
        const config = item.connect.config;
        const matching = rejected.get(name)?.filter(r=>config.type === "http" ? r.kind === "remote"
            : r.kind === "package" && r.identifier === config.package.identifier);
        if (live.length === 1 && matching?.length === 1 && !/unavailable|timeout|rate limit/i.test(matching[0]!.reason)
            && !matching[0]!.detail) reasons.set(item.id,matching[0]!.reason);
    }
}

function fraction(value: string | undefined, fallback: number) {
    const number = value === undefined ? fallback : Number(value);
    if (value === "" || !Number.isFinite(number) || number < 0 || number > 1) throw Error("threshold must be in [0,1]");
    return number;
}

const options = {
    "cache":{type:"string"}, "run-id":{type:"string"}, "output":{type:"string"}, "previous-parts":{type:"string"},
    "previous-index":{type:"string"}, "previous-unsigned":{type:"boolean"}, "verdict":{type:"string"}, "classification-added":{type:"string"},
    "tags":{type:"string"}, "max-drop-fraction":{type:"string"}, "min-part-fraction":{type:"string"},
    "parts":{type:"string"}, "remote":{type:"string"}, "branch":{type:"string"},
    "annotations": { type: "string" },
} as const;

async function main() {
    const { values, positionals } = parseArgs({args:process.argv.slice(2),options,allowPositionals:true,strict:true});
    const required = (name: keyof typeof options) => {
        const value = values[name];
        if (!value) throw Error("--" + name + " is required");
        return value;
    };
    const path = (name: keyof typeof options) => resolve(required(name));
    const added = values["classification-added"] ? path("classification-added") : undefined;
    const [command] = positionals;
    if (positionals.length !== 1) throw Error("Usage: bun weekly.ts build|needs-labels|release [options]");
    if (command === "needs-labels") {
        const dir = path("parts");
        const { items } = await readSnapshot(dir);
        const reviews = await loadReviewed(null,undefined,added);
        const tools = await loadToolParts(dir,items);
        for (const item of items) {
            if (reviews.has(item.id)) continue;
            const ref = tools.refs.get(item.id);
            process.stdout.write(json({id:item.id,name:item.display.title,description:item.display.description ?? "",
                tools:ref ? tools.tools.get(ref.sha256)!.map(({name, description})=>({name,description})) : []}));
        }
        return;
    }
    if (command === "release") {
        await release(path("parts"),path("verdict"),values.remote ?? "origin",values.branch ?? "weekly-build");
        return;
    }
    if (command !== "build") throw Error("unknown weekly command: " + command);
    const verdict = path("verdict");
    const previousUnsigned = values["previous-unsigned"] === true;
    const output = path("output");
    await writeJson(verdict,{publish:false,reasons:["build-in-progress"],previousUnsigned});
    let staging: string | undefined;
    let failure = "build-failure";
    try {
        if (await readdir(output).then(()=>true,error=>error.code === "ENOENT" ? false : Promise.reject(error))) {
            throw Error("weekly output already exists");
        }
        const cache = path("cache");
        const id = required("run-id");
        if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(id)) throw Error("invalid run id");
        const directory = join(cache,"runs",id);
        await mkdir(directory,{recursive:true});
        const latest = join(cache,"latest.json");
        const parent = join(directory,"prior.json");
        if (!await Bun.file(parent).exists()) {
            await writeJson(parent, await Bun.file(latest).exists() ? await Bun.file(latest).json() : null);
        }
        const prior = await Bun.file(parent).json() as string | null;
        if (prior !== null && !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/.test(prior)) throw Error("invalid cached previous run id");
        const priorDir = prior && prior !== id ? join(cache,"runs",prior) : undefined;
        if (!!values["previous-parts"] === !!values["previous-index"]) throw Error("choose one previous catalogue input");
        failure = "previous release not verified";
        const previous = values["previous-parts"]
            ? previousUnsigned ? await readSnapshot(path("previous-parts"))
                : await previousSnapshot(join(path("previous-parts"),"index.json"),directory,false)
            : await previousSnapshot(required("previous-index"),directory,previousUnsigned);
        failure = "build-failure";
        const thresholds = { maxDrop:fraction(values["max-drop-fraction"],0.05), minPart:fraction(values["min-part-fraction"],0.6) };
        const reviews = await loadReviewed(null,undefined,added);
        const source = join(directory,"sources.json"), feed = join(directory,"feed.json"), rejections = join(directory,"rejections.json");
        const checkpoint = join(directory,"crawl.sqlite"), mapped = join(directory,"mapped"), decisions = join(directory,"decisions.json");
        if (!await Bun.file(source).exists()) await runBun("generate-catalog.ts",source);
        if (!await Bun.file(feed).exists() || !await Bun.file(rejections).exists()) {
            await runBun("mcp/build-community-feed.ts",`--out=${feed}`,`--report=${rejections}`,
                `--checkpoint=${checkpoint}`,`--signals=${join(cache,"signals.sqlite")}`,
                `--previous=${priorDir ? join(priorDir,"feed.json") : join(directory,"feed.previous.json")}`);
        }
        if (!await Bun.file(join(mapped,"connectors.json")).exists() || !await Bun.file(join(mapped,"skills.json")).exists()
            || !await Bun.file(join(mapped,"tools.json")).exists() || !await Bun.file(decisions).exists()) {
            const mapping = await mkdtemp(join(directory,"mapping-"));
            try {
                await runBun("build.ts","parts","--sources",source,"--feed",feed,"--untagged","--decisions",decisions,"--output",mapping);
                await rename(mapping,mapped);
            } finally { await rm(mapping,{recursive:true,force:true}); }
        }
        const mappedSnapshot = await readSnapshot(mapped);
        const mapping = await Bun.file(decisions).json() as { reasons:{id:string;reason:string}[]; aliases:[string,string][]; sourceErrors:Record<string,string> };
        if (Object.keys(mapping.sourceErrors).length) throw Error("source capture failed: " + Object.keys(mapping.sourceErrors).join(", "));
        const evidence = join(directory,"evidence");
        await collectEvidence(mappedSnapshot.items.filter(item=>!["junk","excluded"].includes(reviews.get(item.id)?.status ?? "")),
            evidence,priorDir ? join(priorDir,"evidence") : undefined);
        const staged = await stageV1(mappedSnapshot.items,evidence,undefined,reviews);
        const tagged = await applyClassification(staged.items,{effectsOnly:true,tags:values.tags ? path("tags") : undefined});
        const detached = detachTools(tagged.items);
        await mkdir(dirname(output),{recursive:true});
        staging = await mkdtemp(join(dirname(output),".weekly-stage-"));
        for (const id of ["connectors","skills"] as const) await Bun.write(join(staging,id+".json"),json(wire(detached.listings,id)));
        await writeToolParts(staging,detached);
        failure = "validation-failure";
        const annotationReplacements = await stageWeeklyAnnotations(
            values.annotations ? path("annotations") : join(root, "annotations"), staging, detached.listings);
        await runBun("build.ts","validate",staging);
        const candidate = await readSnapshot(staging);
        failure = "build-failure";
        const reasons = new Map(mapping.reasons.map(({id,reason})=>[id,reason]));
        const live = new Set(candidate.items.map(item=>item.id));
        for (const [id,winner] of [...mapping.aliases,...staged.aliases]) {
            if (live.has(winner)) reasons.set(id,"Same connection or content; kept as " + winner);
        }
        for (const [id,reason] of staged.drops) reasons.set(id,reason);
        await reasonsForDrops(previous.items,checkpoint,rejections,reasons);
        const comparison = { ...compareWeekly(previous,candidate,reasons,thresholds), previousUnsigned, annotationReplacements };
        if (annotationReplacements.length) comparison.reasons.push(ANNOTATION_REPLACEMENT_REMOVED);
        if (!comparison.publish) {
            await writeJson(verdict,comparison);
            process.exitCode = 1;
            return;
        }
        await rename(staging,output);
        await writeJson(latest,id);
        await writeJson(verdict,comparison);
    } catch (error) {
        await writeJson(verdict,{publish:false,reasons:[failure],previousUnsigned,error:error instanceof Error ? error.message : String(error)});
        process.exitCode = 1;
    } finally {
        if (staging) await rm(staging,{recursive:true,force:true});
    }
}

async function git(cwd: string, ...args: string[]) {
    const child = Bun.spawn(["git",...args],{cwd,stdout:"pipe",stderr:"inherit"});
    const result = await new Response(child.stdout).text();
    if (await child.exited) throw Error("git step failed: " + args[0]);
    return result.trim();
}

async function release(dir: string, verdictPath: string, remote: string, branch: string) {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(remote) || !/^[a-zA-Z0-9][a-zA-Z0-9._/-]*$/.test(branch)) {
        throw Error("invalid remote or branch");
    }
    if (branch !== "weekly-build") throw Error("release branch must be weekly-build");
    const verdict = await Bun.file(verdictPath).json();
    if (verdict.previousUnsigned !== false || verdict.publish !== true || !Array.isArray(verdict.reasons) || verdict.reasons.some((reason: unknown) => reason !== ANNOTATION_REPLACEMENT_REMOVED)) throw Error("weekly verdict refuses release");
    const ref = "refs/heads/" + branch;
    const existing = await git(root,"ls-remote","--heads",remote,ref);
    const base = existing.split(/\s/,1)[0] || await git(root,"rev-parse","HEAD");
    if (existing) await git(root,"fetch","--no-tags",remote,ref);
    const temporary = await mkdtemp(join(tmpdir(),"catalog-weekly-release-"));
    const tree = join(temporary,"checkout");
    try {
        await git(root,"worktree","add","--detach",tree,base);
        await git(tree,"rm","-r","--ignore-unmatch","--","out");
        const destination = join(tree,"out");
        await cp(dir,destination,{recursive:true,errorOnExist:true,force:false});
        await runBun("build.ts","validate",destination);
        if ((await readSnapshot(destination)).fingerprint !== verdict.fingerprint) throw Error("release files differ from passed verdict");
        await git(tree,"add","--","out");
        await git(tree,"commit","--allow-empty","-m","Build weekly catalogue");
        const committed = await git(tree,"diff-tree","--no-commit-id","--name-only","-r","HEAD");
        if (committed.split("\n").some(file=>file && !file.startsWith("out/"))) throw Error("release commit contains files outside out/");
        const sha = await git(tree,"rev-parse","HEAD");
        await git(tree,"push",remote,sha+":"+ref);
        console.log(sha);
    } finally {
        await git(root,"worktree","remove","--force",tree).catch(()=>{});
        await rm(temporary,{recursive:true,force:true});
    }
}

if (import.meta.main) await main();
