// classify/hash.ts
// The tool hash (README, "Tool hash") and the content hash that decides when an
// item must be classified again.

import { createHash } from "node:crypto";

export function canonicalJson(value: unknown): string {
    if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
    if (value && typeof value === "object") {
        const keys = Object.keys(value).sort(); // UTF-16 code unit order
        return `{${keys.map(key => `${JSON.stringify(key)}:${canonicalJson((value as Record<string, unknown>)[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
}

const sha256 = (text: string) => createHash("sha256").update(text, "utf8").digest("hex");

export interface ToolDefinition { name: string; description?: string | null; inputSchema: object }

export function toolHash(tool: ToolDefinition): string {
    return sha256(canonicalJson({ name: tool.name, description: tool.description ?? "", inputSchema: tool.inputSchema }));
}

/** What the classifier reads of an item. A change to any of it re-classifies. */
export interface ClassifyInput {
    id: string;
    kind: "connector" | "skill" | "bundle";
    title: string;
    description: string;
    publisher: string | null;
    /** schema is the canonical input schema, cut to a bound; complete says the
     *  model saw the whole definition, which a read effect requires. */
    tools: { name: string; description: string; schema: string; complete: boolean; hash: string }[];
}

export const TOOL_DESCRIPTION_LIMIT = 600;
export const TOOL_SCHEMA_LIMIT = 3000;
/** Tools shown to the model per item; the rest are never judged and stay write. */
export const TOOLS_SHOWN = 200;

export function contentHash(input: ClassifyInput): string {
    return sha256(canonicalJson(input));
}

/** Reads the classifier's input from a published item. */
export function inputOf(item: any, kind: ClassifyInput["kind"]): ClassifyInput {
    const tools = Array.isArray(item?.connect?.tools) ? item.connect.tools : [];
    return {
        id: String(item.id),
        kind,
        title: String(item.display?.title ?? item.name ?? ""),
        description: String(item.display?.description ?? ""),
        publisher: item.origin?.publisher?.name ?? null,
        tools: tools.map((tool: ToolDefinition) => {
            const description = String(tool.description ?? "");
            const schema = canonicalJson(tool.inputSchema ?? {});
            return {
                name: tool.name,
                description: description.slice(0, TOOL_DESCRIPTION_LIMIT),
                schema: schema.slice(0, TOOL_SCHEMA_LIMIT),
                complete: description.length <= TOOL_DESCRIPTION_LIMIT && schema.length <= TOOL_SCHEMA_LIMIT,
                hash: toolHash(tool),
            };
        }),
    };
}
