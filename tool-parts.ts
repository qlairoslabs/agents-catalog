import { createHash } from "node:crypto";
import { mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";
import { parseCatalogJson } from "./ingestion";
import { MAX_MANIFEST_BYTES, MAX_TOOL_LIST_BYTES, readToolList, readToolManifest, toolEffectCounts, type CatalogListingItem, type ToolListRef } from "./mcp/item";
import { validateSchema } from "./validate";

const schema = "https://raw.githubusercontent.com/qlairoslabs/agents-catalog/main/schema/parts.schema.json#/$defs/";
const hash = (bytes: Uint8Array | string) => createHash("sha256").update(bytes).digest("hex");
const json = (value: unknown) => JSON.stringify(value) + "\n";

export function decodeManifest(bytes: Uint8Array, items: readonly CatalogListingItem[]) {
    if (bytes.byteLength > MAX_MANIFEST_BYTES) throw Error("tools.json exceeds the manifest byte limit");
    const raw = parseCatalogJson(bytes);
    validateSchema(schema + "tools", raw);
    const refs = readToolManifest(raw);
    const connectors = new Set(items.filter(item => item.kind === "mcp").map(item => item.id));
    if (items.some(item => item.kind === "mcp" && item.connect.tools !== undefined)) throw Error("connectors.json must not have inline tools");
    for (const id of refs.keys()) if (!connectors.has(id)) throw Error("unknown manifest connector " + id);
    return refs;
}

export async function loadToolParts(dir: string, items: readonly CatalogListingItem[]) {
    const manifest = Bun.file(join(dir, "tools.json"));
    if (manifest.size > MAX_MANIFEST_BYTES) throw Error("tools.json exceeds the manifest byte limit");
    const bytes = new Uint8Array(await manifest.arrayBuffer());
    const refs = decodeManifest(bytes, items);
    const directory = join(dir, "tools");
    const files = await readdir(directory, { withFileTypes: true });
    const expected = new Set([...refs.values()].map(ref => ref.sha256 + ".json"));
    if (files.length !== expected.size || files.some(file => !file.isFile() || !expected.has(file.name))) {
        throw Error("tools directory has missing, orphan or invalid files");
    }
    const byHash = new Map<string, ToolListRef[]>();
    for (const ref of refs.values()) {
        const shared = byHash.get(ref.sha256) ?? [];
        shared.push(ref);
        byHash.set(ref.sha256, shared);
    }
    const tools = new Map();
    for (const [sha256, shared] of byHash) {
        const file = Bun.file(join(directory, sha256 + ".json"));
        if (file.size > MAX_TOOL_LIST_BYTES || shared.some(ref => ref.bytes !== file.size)) throw Error("tool blob length mismatch");
        const bytes = new Uint8Array(await file.arrayBuffer());
        if (hash(bytes) !== sha256) throw Error("tool blob hash mismatch");
        const raw = parseCatalogJson(bytes);
        validateSchema(schema + "toolList", raw);
        for (const ref of shared) tools.set(sha256, readToolList(raw, ref));
    }
    return { bytes, refs, tools };
}

export function detachTools(items: CatalogListingItem[]) {
    const refs = new Map<string, ToolListRef>();
    const blobs = new Map<string, string>();
    const listings = items.map(item => {
        if (item.kind !== "mcp" || item.connect.tools === undefined) return item;
        const { tools, ...connect } = item.connect;
        if (tools.length) {
            const blob = json({ tools });
            const sha256 = hash(blob);
            const effects = tools.some(tool => tool.effect) ? toolEffectCounts(tools) : {};
            refs.set(item.id, { sha256, bytes: Buffer.byteLength(blob), tools: tools.length, ...effects });
            blobs.set(sha256, blob);
        }
        return { ...item, connect };
    });
    return { listings, manifest: json({ lists: Object.fromEntries(refs) }), blobs };
}

export async function writeToolParts(dir: string, parts: ReturnType<typeof detachTools>) {
    const directory = join(dir, "tools");
    await mkdir(directory, { recursive: true });
    for (const [sha256, blob] of parts.blobs) await Bun.write(join(directory, sha256 + ".json"), blob);
    await Bun.write(join(dir, "tools.json"), parts.manifest);
}
