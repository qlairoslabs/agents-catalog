import { parseCatalogJson } from "./ingestion";
import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import { readIndex, readPart } from "./mcp/item";

export const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
for (const name of ["item", "parts", "index"]) {
    ajv.addSchema(await Bun.file(new URL(`./schema/${name}.schema.json`, import.meta.url)).json(), `${name}.schema.json`);
}

export function validateSchema(ref: string, data: unknown): void {
    if (!ajv.validate(ref, data)) throw new Error(ajv.errorsText());
}

export const MAX_PART_BYTES = 24 * 1024 * 1024;
export const MAX_FILE_ITEMS = 10_000;
export const MAX_SELECTED_BYTES = 64 * 1024 * 1024;
export const MAX_INDEX_BYTES = 2 * 1024 * 1024;
export const encode = (bytes: string | Uint8Array) => typeof bytes === "string" ? new TextEncoder().encode(bytes) : bytes;

export function validatePartBytes(id: "connectors" | "skills", input: string | Uint8Array) {
    const bytes = encode(input);
    if (bytes.byteLength > MAX_PART_BYTES) throw Error("part exceeds the Hub byte limit");
    return validatePart(id, parseCatalogJson(bytes));
}

export function validatePart(id: "connectors" | "skills", data: unknown) {
    validateSchema(`https://raw.githubusercontent.com/qlairoslabs/agents-catalog/main/schema/parts.schema.json#/$defs/${id}`, data);
    const items = readPart(data, id);
    if (items.length > MAX_FILE_ITEMS) throw Error("part exceeds the Hub listing limit");
    const ids = new Set<string>();
    for (const item of items) {
        if (ids.has(item.id)) throw new Error(`duplicate listing ID ${item.id}`);
        ids.add(item.id);
    }
    if (id === "skills") {
        const skills = new Set(items.filter(item => item.kind === "skill").map(item => item.id));
        for (const item of items) {
            if (item.kind === "bundle" && item.bundle.skills.some(member => !skills.has(member))) {
                throw new Error(`bundle ${item.id} references a missing skill`);
            }
        }
    }
    return items;
}

export function validateSelectedParts(parts: Record<"connectors" | "skills", string | Uint8Array>) {
    const connectors = encode(parts.connectors);
    const skills = encode(parts.skills);
    if (connectors.byteLength + skills.byteLength > MAX_SELECTED_BYTES) throw Error("selected parts exceed the Hub byte limit");
    return [...validatePartBytes("connectors", connectors), ...validatePartBytes("skills", skills)];
}

export function validateIndexBytes(input: string | Uint8Array) {
    const bytes = encode(input);
    if (bytes.byteLength > MAX_INDEX_BYTES) throw Error("index exceeds the Hub byte limit");
    return validateIndex(parseCatalogJson(bytes));
}

export function validateIndex(data: unknown) {
    validateSchema("index.schema.json", data);
    return readIndex(data);
}
