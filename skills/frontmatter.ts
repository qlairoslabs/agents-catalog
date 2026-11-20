import { parse as parseYaml } from "yaml";

export function skillFrontmatter(markdown: string): Record<string, string> {
    const block = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    if (!block) return {};
    let parsed: unknown;
    try { parsed = parseYaml(block); } catch { return {}; }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed as Record<string, unknown>)
        .filter(([, value]) => typeof value === "string" || typeof value === "number")
        .map(([key, value]) => [key, String(value).trim()]));
}

