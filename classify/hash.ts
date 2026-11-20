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
    tools: { name: string; description: string; hash: string }[];
}

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
        tools: tools.map((tool: ToolDefinition) => ({ name: tool.name, description: String(tool.description ?? ""), hash: toolHash(tool) })),
    };
}
