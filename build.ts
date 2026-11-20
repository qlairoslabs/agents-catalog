import { Checkpoint } from "./mcp/checkpoint";
import { createHash } from "node:crypto";
import { mkdir, rename } from "node:fs/promises";
import { join } from "node:path";
import { parseCommunityFeed } from "./mcp/feed";
import type { FeedRejection, RegistryRecord } from "./mcp/feed-builder";
import type { CatalogListingItem, CatalogTool } from "./mcp/item";
import type { CatalogItem } from "./mcp/model";
import { catalogueTool, mapItem, mergeItems } from "./mcp/map";
import { discoverTools } from "./mcp/tools";
import { facets, withFacets } from "./facets";
import { validateIndex, validatePartBytes, encode } from "./validate";
import { comparison, type Explanation, type Snapshot } from "./compare";
import type { SourceCapture } from "./generate-catalog";

type Part = "connectors" | "skills";
const partIds: Part[] = ["connectors", "skills"];
const DAY = 86_400_000;
const json = (value: unknown) => JSON.stringify(value) + "\n";

export function partWithFallback(id: Part, staged: unknown, previous: string | undefined, sourceErrors: string[] = [], minimum = 0) {
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

export function makeIndex(commit: string, parts: Record<Part, string | Uint8Array>, now = Date.now(), previous?: ReturnType<typeof validateIndex>) {
    const listings = partIds.flatMap(id => validatePartBytes(id, parts[id]));
    const index = {
        schema: 1, sequence: Math.max(Math.floor(now / 1000), (previous?.sequence ?? 0) + 1), generatedAt: new Date(now).toISOString(),
        expires: new Date(now + 14 * DAY).toISOString(), rules: "1", commit,
        facets: facets(listings), annotations: [], blocked: previous?.blocked ?? { packages: [], servers: [], skills: [] },
        ...(previous?.revokes.length ? { revokes: previous.revokes } : {}),
        parts: partIds.map(id => ({ id, url: `https://raw.githubusercontent.com/qlairoslabs/agents-catalog/${commit}/${id}.json`,
            sha256: createHash("sha256").update(parts[id]).digest("hex"), bytes: encode(parts[id]).byteLength,
            items: listings.filter(item => id === "connectors" ? item.kind === "mcp" : item.kind !== "mcp").length })),
    };
    if (Buffer.byteLength(json(index)) > 2 * 1024 * 1024) throw Error("index exceeds the Hub byte limit");
    validateIndex(index);
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
async function writeAtomic(path: string, text: string) {
    const temp = `${path}.${process.pid}.tmp`;
    await Bun.write(temp, text);
    await rename(temp, path);
}
async function optional(path: string) {
    const file = Bun.file(path);
    return await file.exists() ? file.text() : undefined;
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
    const previousByBase = Map.groupBy(snapshot.sources["community-feed"]?.items ?? [], item => item.id.split("#")[0]!);
    if (reportPath) for (const rejected of await Bun.file(reportPath).json() as FeedRejection[]) {
        const previous = previousByBase.get(`community-feed:${rejected.name}`) ?? [];
        for (const item of previous) reasons.push({ id: item.id, reason: rejected.reason });
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
    const decorated = items.map(withFacets);
    const note = arg("comparison-note");
    const notes: string[] = note ? [note] : [];
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
    await mkdir(output,{recursive:true});
    for (const { id, text, items } of stages) { await writeAtomic(join(output,`${id}.json`),text); accepted.push(...items); }
    if (report) {
        await mkdir(join(report,".."),{recursive:true});
        await writeAtomic(report,comparison(snapshot,oldFeed,accepted,reasons,aliases,notes));
    }
    console.log(JSON.stringify({ listings: accepted.length, parts: stages.map(({id, items, warning}) => ({id,count:items.length,warning})), toolsProbed: probed }));
}

if (import.meta.main) {
    const command = process.argv[2];
    const output = arg("output") ?? arg("dir") ?? (command === "validate" ? process.argv[3] : undefined) ?? ".r1-cache/candidate";
    if (command === "parts") await parts(output);
    else if (command === "index" || command === "validate") {
        const bytes = Object.fromEntries(await Promise.all(partIds.map(async id => [id, new Uint8Array(await Bun.file(join(output,`${id}.json`)).arrayBuffer())]))) as Record<Part,Uint8Array>;
        if (command === "index") {
            const previous = arg("previous");
            await writeAtomic(join(output,"index.json"),json(makeIndex(need("commit"), bytes, Date.now(),
                previous ? validateIndex(await Bun.file(previous).json()) : undefined)));
        } else {
            for (const id of partIds) validatePartBytes(id, bytes[id]);
            const saved = await optional(join(output,"index.json"));
            if (saved) {
                const index = validateIndex(JSON.parse(saved));
                const expected = makeIndex(index.commit, bytes, Date.parse(index.generatedAt));
                if (index.parts.length !== expected.parts.length || expected.parts.some(part => {
                    const actual = index.parts.find(entry => entry.id === part.id);
                    return !actual || actual.url !== part.url || actual.sha256 !== part.sha256 || actual.bytes !== part.bytes || actual.items !== part.items;
                })) throw Error("index does not describe the two validated part files");
            }
        }
    } else throw Error("Usage: bun build.ts parts|index|validate [--output=directory]");
}
