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

export function validatePart(id: "connectors" | "skills", data: unknown) {
    validateSchema(`https://raw.githubusercontent.com/qlairoslabs/agents-catalog/main/schema/parts.schema.json#/$defs/${id}`, data);
    const items = readPart(data, id);
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

export function validateIndex(data: unknown) {
    validateSchema("index.schema.json", data);
    return readIndex(data);
}
