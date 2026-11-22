import { decodeManifest, detachTools, loadToolParts, writeToolParts } from "./tool-parts";
import { stageV1, v1Report } from "./v1-build";
import { readTaxonomy, taxonomyFacet } from "./facets/v1";
import { Checkpoint } from "./mcp/checkpoint";
import { createHash } from "node:crypto";
import { mkdir, readdir, rename } from "node:fs/promises";
import { join } from "node:path";
import { parseCommunityFeed } from "./mcp/feed";
import type { FeedRejection, RegistryRecord } from "./mcp/feed-builder";
import type { CatalogListingItem, CatalogTool } from "./mcp/item";
import type { CatalogItem } from "./mcp/model";
import { catalogueTool, mapItem, mergeItems } from "./mcp/map";
import { discoverTools } from "./mcp/tools";
import { facets, withFacets } from "./facets";
import { applyClassification } from "./facets/classification";
import { validateIndex, validateIndexBytes, validatePartBytes, validateSelectedParts, MAX_INDEX_BYTES, MAX_PART_BYTES, MAX_SELECTED_BYTES, encode } from "./validate";
import { comparison, type Explanation, type Snapshot } from "./compare";
import type { SourceCapture } from "./generate-catalog";

type Part = "connectors" | "skills";
const partIds: Part[] = ["connectors", "skills"];
const DAY = 86_400_000;
const v1Taxonomy = readTaxonomy(await Bun.file(new URL("./facets/taxonomy-v1.1.tsv", import.meta.url)).text());
const json = (value: unknown) => JSON.stringify(value) + "\n";

export function partWithFallback(id: Part, staged: unknown, previous: string | Uint8Array | undefined, sourceErrors: string[] = [], minimum = 0) {
    try {
        if (sourceErrors.length) throw Error(sourceErrors.join("; "));
        const stagedText = json(staged);
        const items = validatePartBytes(id, stagedText);
        const prior = previous ? validatePartBytes(id, previous).length : 0;
        if (items.length < Math.max(minimum, Math.floor(prior * 0.6))) throw Error(`only ${items.length} entries passed the part threshold`);
        return { text: stagedText, items, warning: null };
    } catch (error) {
        if (previous === undefined) throw error;
        return { text: previous, items: validatePartBytes(id, previous), warning: error instanceof Error ? error.message : "part failed" };
    }
}

export function makeIndex(commit: string, parts: Record<Part, string | Uint8Array>, now = Date.now(), previous?: ReturnType<typeof validateIndex>, manifest?: Uint8Array) {
    const listings = validateSelectedParts(parts);
    const index = {
        schema: 1, sequence: Math.max(Math.floor(now / 1000), (previous?.sequence ?? 0) + 1), generatedAt: new Date(now).toISOString(),
        expires: new Date(now + 14 * DAY).toISOString(), rules: "1", commit,
        facets: [...facets(listings), ...(listings.some(item=>item.discovery.attributes?.topic?.length) ? [taxonomyFacet(v1Taxonomy)] : [])], annotations: [], blocked: previous?.blocked ?? { packages: [], servers: [], skills: [] },
        ...(previous?.revokes.length ? { revokes: previous.revokes } : {}),
        parts: [...partIds.map(id => ({ id, url: `https://raw.githubusercontent.com/qlairoslabs/agents-catalog/${commit}/${id}.json`,
            sha256: createHash("sha256").update(parts[id]).digest("hex"), bytes: encode(parts[id]).byteLength,
            items: listings.filter(item => id === "connectors" ? item.kind === "mcp" : item.kind !== "mcp").length })),
            ...(manifest ? [{id:"tools",url:`https://raw.githubusercontent.com/qlairoslabs/agents-catalog/${commit}/tools.json`,
                sha256:createHash("sha256").update(manifest).digest("hex"),bytes:manifest.byteLength,items:decodeManifest(manifest,listings).size}] : [])],
    };
    validateIndexBytes(json(index));
    return index;
}

function wire(items: CatalogListingItem[], part: Part): unknown {
    const select = (kind: CatalogListingItem["kind"]) => items.filter(item => item.kind === kind)
        .map(({ kind: _kind, ...item }) => item);
    return part === "connectors" ? { mcp: select("mcp") } : { skills: select("skill"), bundles: select("bundle") };
}

export function pickCommunity(records: RegistryRecord[], reasons: Explanation[]) {
    const supplied = new Map<string, CatalogTool[]>();
    const entries = parseCommunityFeed({ servers: records.filter(record => !record.server.remotes?.length || !record.server.remotes.every(item => item.type === "sse")) });
    const itemsById = new Map(entries.map(item => [item.id,item]));
    for (const record of records) {
        const id = `community-feed:${record.server.name}`;
        if (record.server.remotes?.length && record.server.remotes.every(item => item.type === "sse")) reasons.push({id, reason:"SSE-only transport"});
        const declared = (record.server as {tools?: unknown[]}).tools;
        if (Array.isArray(declared) && declared.length <= 1000) {
            const tools = declared.map(catalogueTool);
            if (tools.every(tool => tool !== null)) supplied.set(id, tools);
        }
        const mcp = itemsById.get(id)?.mcp;
        const recordedAuth = record._meta?.["agents/community"]?.auth;
        if (mcp && mcp.auth === "none") {
            if (recordedAuth === "oauth") mcp.auth = "oauth";
            if (recordedAuth === "key") mcp.setupNeeded = "authentication is required but the source declares no secret header";
        }
    }
    return { items: entries, supplied };
}

const arg = (name: string) => {
    const prefix = `--${name}`;
    const inline = process.argv.find(value => value.startsWith(prefix + "="));
    if (inline) return inline.slice(prefix.length + 1);
    const index = process.argv.indexOf(prefix);
    return index < 0 ? undefined : process.argv[index + 1];
};
const need = (name: string) => { const value = arg(name); if (!value) throw Error(`--${name} is required`); return value; };
async function writeAtomic(path: string, text: string | Uint8Array) {
    const temp = `${path}.${process.pid}.tmp`;
    await Bun.write(temp, text);
    await rename(temp, path);
}
async function optional(path: string) {
    const file = Bun.file(path);
    if (!(await file.exists())) return undefined;
    if (file.size > MAX_PART_BYTES) throw Error("previous part exceeds the Hub byte limit");
    return new Uint8Array(await file.arrayBuffer());
}

async function parts(output: string) {
    const report = arg("comparison");
    const snapshotPath = report ? need("previous-snapshot") : arg("previous-snapshot");
    const snapshot: Snapshot = snapshotPath ? await Bun.file(snapshotPath).json() : { sources: {} };
    const oldFeed = report ? await Bun.file(need("previous-feed")).json() : { servers: [] };
    const sourceCapture = await Bun.file(need("sources")).json() as SourceCapture;
    const feedCapture = await Bun.file(need("feed")).json() as { servers: RegistryRecord[]; summary?: { checked: number } };
    const reasons: Explanation[] = [];
    const { items: community, supplied } = pickCommunity(feedCapture.servers, reasons);
    const mappingInputs: CatalogItem[] = [...Object.values(sourceCapture.sources).flat(), ...community];
    const reportPath = arg("rejections");
    const legacyCommunity = new Map((snapshot.sources["community-feed"]?.items ?? []).map(item => [item.id, item]));
    for (const item of parseCommunityFeed(oldFeed)) legacyCommunity.set(item.id, item);
    const previousByBase = Map.groupBy([...legacyCommunity.values()], item => item.id.split("#")[0]!);
    const registryPath = arg("registry-checkpoint");
    if (registryPath) {
        const checkpoint = new Checkpoint(registryPath);
        let registry;
        try { registry = checkpoint.read<RegistryRecord[]>("registry:Infinity"); }
        finally { checkpoint.close(); }
        if (!registry?.length) throw Error("full registry capture is required for source removal evidence");
        const byName = Map.groupBy(registry, record => record.server.name);
        for (const [id, entries] of previousByBase) {
            const current = byName.get(id.slice("community-feed:".length));
            for (const entry of entries) {
                const config = entry.mcp?.config;
                const status = (record: RegistryRecord) => record._meta?.["io.modelcontextprotocol.registry/official"]?.status;
                let reason: string | undefined;
                if (!current) reason = "Upstream removal: absent from the complete latest-version MCP Registry capture.";
                else if (current.every(record => ["deleted", "deprecated"].includes(status(record)))) {
                    reason = `MCP Registry marks all current records ${[...new Set(current.map(status))].join(" or ")}.`;
                } else if (config?.type === "package") {
                    const pkg = config.package;
                    if (!current.some(record => record.server.packages?.some(p => p.identifier === pkg.identifier && p.registryType === pkg.manager))) {
                        reason = "Upstream removal: the captured registry listing no longer declares this package.";
                    } else if (!current.some(record => record.server.packages?.some(p => p.identifier === pkg.identifier && p.registryType === pkg.manager
                        && p.transport?.type === "stdio" && p.version))) reason = "The current registry package lacks a versioned stdio declaration.";
                } else if (!current.some(record => record.server.remotes?.length)) {
                    reason = "Upstream removal: the captured registry listing no longer declares any remote.";
                } else if (current.every(record => !record.server.remotes?.some(remote => remote.type === "streamable-http" && remote.url))) {
                    reason = "The current registry listing has no streamable HTTP remote; SSE is excluded by schema 1.";
                }
                if (reason) reasons.push({ id: entry.id, reason });
            }
        }
    }
    if (reportPath) for (const rejected of await Bun.file(reportPath).json() as FeedRejection[]) {
        const previous = previousByBase.get(`community-feed:${rejected.name}`) ?? [];
        for (const item of previous) {
            const config = item.mcp?.config;
            if (rejected.kind === "remote" && config?.type === "package") continue;
            if (rejected.kind === "package" && (config?.type !== "package" || config.package.identifier !== rejected.identifier)) continue;
            reasons.push({ id: item.id, reason: rejected.reason });
        }
    }
    const mapped: CatalogListingItem[] = [];
    for (const source of mappingInputs) {
        const result = mapItem(source, supplied.get(source.id.split("#")[0]!), sourceCapture.members[source.id]);
        if ("reason" in result) { reasons.push({id:source.id, reason:result.reason}); continue; }
        const bundle = sourceCapture.bundleFor[source.id];
        const item = result.item;
        if (bundle) { item.origin.bundle = bundle; item.origin.all = item.origin.all.map(entry => ({ ...entry, bundle })); }
        mapped.push(item);
    }
    const validRemotes = new Set(mapped.filter(item => item.kind === "mcp" && item.connect.config.type === "http").map(item => item.id));
    const selected = mapped.filter(item => {
        if (item.kind !== "mcp" || item.connect.config.type !== "package" || !item.id.startsWith("community-feed:")) return true;
        const base = item.id.split("#")[0]!;
        if (item.id === base || !validRemotes.has(base)) return true;
        reasons.push({ id:item.id, reason:"streamable HTTPS remote preferred" });
        return false;
    });
    const rejectedItems = new Map(reasons.map(({id, reason}) => [id, reason]));
    for (const item of selected) {
        if (item.kind !== "bundle") continue;
        item.bundle.connectors = item.bundle.connectors.map(member => {
            const reason = rejectedItems.get(`${item.id}:mcp:${member.name}`);
            return reason ? { name: member.name, leftOut: reason.slice(0, 300) } : member;
        });
    }
    const {items, aliases} = mergeItems(selected);
    const probing = Math.min(Number(arg("probe-tools") ?? 0), 5000);
    if (!Number.isInteger(probing) || probing < 0) throw Error("invalid --probe-tools");
    const candidates = items.filter(item => item.kind === "mcp" && item.connect.auth === "none"
        && item.connect.config.type === "http" && !Object.keys(item.connect.config.headers ?? {}).length && !item.connect.tools).slice(0, probing);
    const toolCachePath = arg("tool-checkpoint");
    const toolCache = toolCachePath ? new Checkpoint(toolCachePath) : null;
    let discoveryBytes = 0, discoveryNodes = 0, probed = 0;
    try {
        for (let offset = 0; offset < candidates.length && discoveryBytes < 8 * 1024 * 1024; offset += 20) {
            const batch = candidates.slice(offset, offset + 20);
            probed += batch.length;
            const discoveries = await Promise.all(batch.map(async item => {
                if (item.kind !== "mcp" || item.connect.config.type !== "http") return null;
                const { url } = item.connect.config;
                const load = async () => await discoverTools(url) ?? null;
                return toolCache ? toolCache.remember(url, load) : load();
            }));
            for (const [index, tools] of discoveries.entries()) {
                const item = batch[index]!;
                if (!tools || item.kind !== "mcp") continue;
                const encoded = JSON.stringify(tools);
                const size = Buffer.byteLength(encoded);
                const nodes = encoded.match(/["\[{,]/g)?.length ?? 0;
                if (size <= 96 * 1024 && discoveryBytes + size <= 8 * 1024 * 1024 && discoveryNodes + nodes <= 350_000) {
                    discoveryBytes += size;
                    discoveryNodes += nodes;
                    item.connect.tools = tools;
                }
            }
        }
    } finally { toolCache?.close(); }
    const decoratedItems = items.map(withFacets);
    const classified = process.argv.includes("--untagged")
        ? { items: decoratedItems, applied: 0 }
        : await applyClassification(decoratedItems, { tags: arg("tags"), vocabulary: arg("vocabulary") });
    const decorated = classified.items;
    const note = arg("comparison-note");
    const notes: string[] = note ? [note] : [];
    if (classified.applied) notes.push(`Applied matching classification tags to ${classified.applied} listings.`);
    const accepted: CatalogListingItem[] = [];
    const stages = await Promise.all(partIds.map(async id => {
        const missing = Object.entries(sourceCapture.errors).filter(([source]) => id === "connectors" ? source === "docker" : source.startsWith("marketplace:"))
            .map(([source, error]) => `${source}: ${error}`);
        for (const source of Object.keys(sourceCapture.sources)) {
            const belongs = id === "skills" ? source.startsWith("marketplace:") : !source.startsWith("marketplace:");
            if (belongs && !mapped.some(item => item.origin.source.id === source)) missing.push(`${source} mapped to no valid items`);
        }
        if (id === "connectors" && (feedCapture.summary?.checked ?? 0) > 1000 && community.length < 100) missing.push("fewer than 100 accepted community entries mapped");
        const previous = arg("previous-parts");
        const result = partWithFallback(id, wire(decorated,id), previous ? await optional(join(previous,`${id}.json`)) : undefined, missing);
        if (result.warning) notes.push(`${id}: retained last good part because ${result.warning}`);
        return { id, ...result };
    }));
    for (const stage of stages) accepted.push(...stage.items);
    validateSelectedParts({
        connectors: stages.find(stage => stage.id === "connectors")!.text,
        skills: stages.find(stage => stage.id === "skills")!.text,
    });
    if (report) {
        await mkdir(join(report,".."),{recursive:true});
        if (process.argv.includes("--require-explanations") && !registryPath) throw Error("--registry-checkpoint is required for strict comparison");
        const evidence = (await Bun.file(new URL("./reports/r1-source-evidence.json", import.meta.url)).json()) as Explanation[];
        const result = comparison(snapshot,oldFeed,accepted,[...reasons,...evidence],aliases,notes);
        await writeAtomic(report,result.text);
        if (result.unexplained.length) throw Error(`Unattributed drops require review: ${result.unexplained.join(", ")}`);
    }
    const retainedConnectors = stages.find(stage => stage.id === "connectors" && stage.warning);
    const previous = arg("previous-parts");
    const previousLists = retainedConnectors && previous && await Bun.file(join(previous, "tools.json")).exists()
        ? await loadToolParts(previous, retainedConnectors.items)
        : undefined;
    const detached = detachTools(accepted.map(item => {
        const ref = previousLists?.refs.get(item.id);
        return item.kind === "mcp" && ref
            ? {...item, connect:{...item.connect, tools:previousLists!.tools.get(ref.sha256)!}}
            : item;
    }));
    const lightConnectors = json(wire(detached.listings, "connectors"));
    validatePartBytes("connectors", lightConnectors);
    await mkdir(output,{recursive:true});
    for (const { id, text } of stages) await writeAtomic(join(output,`${id}.json`),id === "connectors" ? lightConnectors : text);
    await writeToolParts(output, detached);
    await loadToolParts(output, detached.listings);
    console.log(JSON.stringify({ listings: accepted.length, parts: stages.map(({id, items, warning}) => ({id,count:items.length,warning})), toolsProbed: probed, tagsApplied: classified.applied }));
}

if (import.meta.main) {
    const command = process.argv[2];
    const output = arg("output") ?? arg("dir") ?? (command === "validate" ? process.argv[3] : undefined) ?? ".r1-cache/candidate";
    if (command === "parts" || command === "apply-tags") {
        await mkdir(output, {recursive:true});
        if ((await readdir(output)).length) throw Error("release output directory must be empty: " + output);
    }
    if (command === "parts" && arg("input")) {
        const input = need("input");
        const before = validateSelectedParts({
            connectors:new Uint8Array(await Bun.file(join(input,"connectors.json")).arrayBuffer()),
            skills:new Uint8Array(await Bun.file(join(input,"skills.json")).arrayBuffer()),
        });
        const staged = await stageV1(before,need("evidence"),arg("classification"));
        const tagged = process.argv.includes("--untagged") ? { items:staged.items,applied:0 }
            : await applyClassification(staged.items,{tags:arg("tags"),effectsOnly:true});
        const detached = detachTools(tagged.items);
        const parts = {connectors:json(wire(detached.listings,"connectors")),skills:json(wire(detached.listings,"skills"))};
        validateSelectedParts(parts);
        const report = arg("comparison");
        if (report) await writeAtomic(report,v1Report(before,{...staged,items:tagged.items}));
        await mkdir(output,{recursive:true});
        for (const id of partIds) await writeAtomic(join(output,id+".json"),parts[id]);
        await writeToolParts(output, detached);
        await loadToolParts(output, detached.listings);
        console.log(JSON.stringify({count:tagged.items.length,drop:staged.drops.size,merge:staged.aliases.size,tagsApplied:tagged.applied}));
    }
    else if (command === "parts") await parts(output);
    else if (command === "index" || command === "validate" || command === "apply-tags") {
        if (command === "validate") {
            const entries = await readdir(output, { withFileTypes: true });
            const expected = new Set(["connectors.json", "skills.json", "tools.json", "tools"]);
            const required = partIds.map(id => id + ".json").concat("tools.json");
            if (required.some(name => !entries.some(entry => entry.name === name && entry.isFile()))
                || entries.some(entry => !expected.has(entry.name) || !(entry.name === "tools" ? entry.isDirectory() : entry.isFile()))) {
                throw Error("release directory must contain only connectors.json, skills.json, tools.json and tools/");
            }
        }
        const input = command === "apply-tags" ? need("input") : output;
        const files = partIds.map(id => [id, Bun.file(join(input,`${id}.json`))] as const);
        if (files.reduce((total, [, file]) => total + file.size, 0) > MAX_SELECTED_BYTES) throw Error("selected parts exceed the Hub byte limit");
        if (files.some(([, file]) => file.size > MAX_PART_BYTES)) throw Error("part exceeds the Hub byte limit");
        const bytes = Object.fromEntries(await Promise.all(files.map(async ([id,file]) => [id, new Uint8Array(await file.arrayBuffer())]))) as Record<Part,Uint8Array>;
        const previous = command === "index" ? arg("previous") : undefined;
        const file = previous ? Bun.file(previous) : undefined;
        if (file && file.size > MAX_INDEX_BYTES) throw Error("index exceeds the Hub byte limit");
        const listings = validateSelectedParts(bytes);
        const detached = await loadToolParts(input, listings);
        if (detached.bytes.byteLength + files.reduce((sum, [, part]) => sum + part.size, 0) > MAX_SELECTED_BYTES) {
            throw Error("selected parts and manifest exceed the Hub byte limit");
        }
        if (command === "index") {
            await writeAtomic(join(output,"index.json"),json(makeIndex(need("commit"), bytes, Date.now(),
                file ? validateIndexBytes(new Uint8Array(await file.arrayBuffer())) : undefined, detached.bytes)));
        } else if (command === "apply-tags") {
            const withTools = listings.map(item => {
                const ref = detached.refs.get(item.id);
                return item.kind === "mcp" && ref ? {...item,connect:{...item.connect,tools:detached.tools.get(ref.sha256)!}} : item;
            });
            const classified = await applyClassification(withTools, {
                tags: arg("tags"), vocabulary: arg("vocabulary"), required: true,
                effectsOnly: true,
            });
            const outputTools = detachTools(classified.items);
            const tagged = { connectors: json(wire(outputTools.listings,"connectors")), skills: json(wire(outputTools.listings,"skills")) };
            validateSelectedParts(tagged);
            await mkdir(output,{recursive:true});
            for (const id of partIds) await writeAtomic(join(output,`${id}.json`),tagged[id]);
            await writeToolParts(output, outputTools);
            await loadToolParts(output, outputTools.listings);
            console.log(JSON.stringify({ listings: classified.items.length, tagsApplied: classified.applied }));
        }
    } else throw Error("Usage: bun build.ts parts|index|validate|apply-tags [--output=directory]");
}
