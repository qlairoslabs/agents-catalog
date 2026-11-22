import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { lstat, mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";
import { readTaxonomy } from "./facets/v1";
import { parseCatalogJson } from "./ingestion";
import { MAX_ANNOTATIONS_BYTES, MAX_EFFECT_BLOB_BYTES, readAnnotations, readAnnotationEffects,
    type AnnotationEffectRef, type CatalogListingItem } from "./mcp/item";
export { MAX_ANNOTATIONS_BYTES, MAX_EFFECT_BLOB_BYTES, MAX_ANNOTATED_TOOLKITS } from "./mcp/item";
import { validateSchema } from "./validate";

export const ANNOTATIONS_PATH = "annotations/composio.json";
export const ANNOTATION_BLOB = /^annotations\/composio\/([0-9a-f]{64})\.json$/;
export const MAX_EFFECT_BLOBS_BYTES = 256 * 1024 * 1024;
const ANNOTATION_SCHEMA = "https://raw.githubusercontent.com/qlairoslabs/agents-catalog/main/schema/annotations.schema.json";


const hash = (bytes: Uint8Array) => createHash("sha256").update(bytes).digest("hex");
const topics = readTaxonomy(await Bun.file(new URL("./facets/taxonomy-v1.1.tsv", import.meta.url)).text());

export function decodeNotes(bytes: Uint8Array, connectors?: ReadonlySet<string>) {
    if (!bytes.byteLength || bytes.byteLength > MAX_ANNOTATIONS_BYTES) throw Error("Composio annotations exceed their byte limit");
    const value = parseCatalogJson(bytes);
    validateSchema(ANNOTATION_SCHEMA, value);
    const { entries: notes } = readAnnotations(value);
    for (const entry of Object.values(notes)) {
        if (entry.topics?.some(code => !topics.has(code))) throw Error("unknown Composio annotation topic");
        if (connectors && entry.replacedBy?.some(id => !connectors.has(id))) throw Error("unknown Composio replacement connector");
    }
    return notes;
}

export function decodeEffects(bytes: Uint8Array, ref: AnnotationEffectRef) {
    if (!bytes.byteLength || bytes.byteLength > MAX_EFFECT_BLOB_BYTES || bytes.byteLength !== ref.bytes || hash(bytes) !== ref.sha256) {
        throw Error("Composio effect blob length or digest mismatch");
    }
    const value = parseCatalogJson(bytes);
    validateSchema(ANNOTATION_SCHEMA + "#/$defs/effects", value);
    return readAnnotationEffects(value, ref);
}

export function checkAnnotationGraph(bytes: Uint8Array | null, paths: readonly string[], connectors: ReadonlySet<string>,
    read: (path: string) => Uint8Array | null) {
    if (!bytes) {
        if (paths.length) throw Error("Composio blobs without annotations/composio.json");
        return null;
    }
    const notes = decodeNotes(bytes, connectors);
    const needed = new Map<string, AnnotationEffectRef>();
    for (const { effects } of Object.values(notes)) {
        if (!effects) continue;
        const path = `annotations/composio/${effects.sha256}.json`;
        const existing = needed.get(path);
        if (existing && (existing.bytes !== effects.bytes || existing.tools !== effects.tools)) {
            throw Error("inconsistent shared Composio effects reference");
        }
        needed.set(path, effects);
    }
    if (paths.length !== needed.size || paths.some(path => !needed.has(path))) throw Error("missing, orphan or invalid Composio effect blob");
    let total = 0;
    for (const [path, ref] of needed) {
        total += ref.bytes;
        if (total > MAX_EFFECT_BLOBS_BYTES) throw Error("Composio effect blobs exceed their aggregate byte limit");
        const blob = read(path);
        if (!blob) throw Error("missing Composio effect blob");
        decodeEffects(blob, ref);
    }
    return { sha256: hash(bytes), bytes: bytes.byteLength, items: Object.keys(notes).length };
}

async function children(path: string) {
    return readdir(path, { withFileTypes: true }).catch(error => {
        if (error.code === "ENOENT") return [];
        throw error;
    });
}

function connectorIds(listings: readonly CatalogListingItem[]) {
    return new Set(listings.filter(item => item.kind === "mcp").map(item => item.id));
}

async function annotationFiles(directory: string) {
    const stat = await lstat(directory).catch(error => {
        if (error.code === "ENOENT") return null;
        throw error;
    });
    if (!stat) return null;
    if (!stat.isDirectory()) throw Error("invalid annotations directory");
    const top = await children(directory);
    if (!top.length) return null;
    if (top.some(file => !(file.name === "composio.json" && file.isFile() || file.name === "composio" && file.isDirectory()))) {
        throw Error("invalid annotations directory");
    }
    const paths = (await children(join(directory, "composio"))).map(file => {
        const path = `annotations/composio/${file.name}`;
        if (!file.isFile() || !ANNOTATION_BLOB.test(path)) throw Error("invalid Composio effect file");
        return path;
    });
    const read = (path: string) => {
        const location = join(directory, path.slice("annotations/".length));
        const file = Bun.file(location);
        const limit = path === ANNOTATIONS_PATH ? MAX_ANNOTATIONS_BYTES : MAX_EFFECT_BLOB_BYTES;
        if (!file.size || file.size > limit) return null;
        return new Uint8Array(readFileSync(location));
    };
    const bytes = top.some(file => file.name === "composio.json") ? read(ANNOTATIONS_PATH) : null;
    if (!bytes) throw Error("missing or oversized Composio annotations");
    return { bytes, paths, read };
}

export async function loadAnnotationParts(dir: string, listings: readonly CatalogListingItem[]) {
    const files = await annotationFiles(join(dir, "annotations"));
    return files ? checkAnnotationGraph(files.bytes, files.paths, connectorIds(listings), files.read) : null;
}

export const ANNOTATION_REPLACEMENT_REMOVED = "annotation-replacement-removed";

/** Copy reviewed notes into a weekly candidate, pruning only withdrawn native IDs. */
export async function stageWeeklyAnnotations(directory: string, output: string, listings: readonly CatalogListingItem[]) {
    const files = await annotationFiles(directory);
    const removed: { toolkit: string; listing: string }[] = [];
    if (!files) return removed;
    const available = connectorIds(listings);
    const notes = decodeNotes(files.bytes);
    for (const [toolkit, note] of Object.entries(notes)) {
        if (!note.replacedBy) continue;
        const keep = note.replacedBy.filter(listing => {
            if (available.has(listing)) return true;
            removed.push({ toolkit, listing });
            return false;
        });
        if (keep.length) note.replacedBy = keep;
        else delete note.replacedBy;
    }
    const contents = removed.length ? new TextEncoder().encode(JSON.stringify(notes) + "\n") : files.bytes;
    checkAnnotationGraph(contents, files.paths, available, files.read);
    await mkdir(join(output, "annotations"), { recursive: true });
    await Bun.write(join(output, ANNOTATIONS_PATH), contents);
    for (const path of files.paths) {
        const bytes = files.read(path);
        if (!bytes) throw Error("Composio effect file changed while staging");
        await Bun.write(join(output, path), bytes);
    }
    return removed;
}
