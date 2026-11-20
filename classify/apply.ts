// classify/apply.ts
// Merges stored tags into finished items (catalogue §4 step 4).
//
//   bun classify/apply.ts <parts-dir>   rewrites connectors.json and skills.json in place
//
// An item with no current tag is published unchanged, only without those
// filters. domain, product and audience are published only through a reviewed
// vocabulary (facets/vocabulary.json); with none, they are left out. An effect
// attaches only to a tool whose current definition has the hash it was
// classified from. summary and whenToUse stay untrusted text. The build's
// validator must run on the result.

import { join } from "node:path";
import { contentHash, inputOf, toolHash, type ClassifyInput } from "./hash";
import type { Tags } from "./output";
import { FIELDS, type Vocabulary } from "./vocabulary";

export const MAX_ATTRIBUTES = 32;
export const MAX_VALUES = 20;

function mapped(tags: Tags, field: typeof FIELDS[number], vocabulary: Vocabulary): string[] {
    const out: string[] = [];
    for (const value of tags[field]) {
        if (!Object.hasOwn(vocabulary.mapping[field], value)) continue; // waits for review
        const final = vocabulary.mapping[field][value]!;
        if (vocabulary[field].includes(final) && !out.includes(final)) out.push(final);
    }
    return out.slice(0, MAX_VALUES);
}

export function applyTags<T extends Record<string, any>>(item: T, kind: ClassifyInput["kind"], readTag: (hash: string) => Tags | null, vocabulary: Vocabulary | null): T {
    const found = readTag(contentHash(inputOf(item, kind)));
    if (!found) return item;
    const discovery = { ...(item.discovery ?? {}) };
    const attributes: Record<string, string[]> = { ...(discovery.attributes ?? {}) };
    const add = (key: string, values: string[]) => {
        if (!values.length) return;
        if (!Object.hasOwn(attributes, key) && Object.keys(attributes).length >= MAX_ATTRIBUTES) return;
        attributes[key] = values.slice(0, MAX_VALUES);
    };
    if (vocabulary) for (const field of FIELDS) add(field, mapped(found, field, vocabulary));
    add("goal", [...found.goal]);
    discovery.attributes = attributes;
    if (found.summary) discovery.summary = found.summary;
    if (found.whenToUse) discovery.whenToUse = found.whenToUse;
    if (found.tasks.length) discovery.tasks = [...found.tasks];
    const next: Record<string, any> = { ...item, discovery };
    if (Array.isArray(item.connect?.tools)) {
        next.connect = { ...item.connect, tools: item.connect.tools.map((tool: any) => {
            const hash = toolHash(tool);
            const effect = Object.hasOwn(found.effects, hash) ? found.effects[hash] : undefined;
            const { effect: _old, ...rest } = tool;
            return effect ? { ...rest, effect: { effect, hash } } : rest;
        }) };
    }
    return next as T;
}

export async function applyToParts(dir: string, readTag: (hash: string) => Tags | null, vocabulary: Vocabulary | null): Promise<number> {
    const connectorsFile = join(dir, "connectors.json"), skillsFile = join(dir, "skills.json");
    const connectors = await Bun.file(connectorsFile).json() as { mcp: any[] };
    const skills = await Bun.file(skillsFile).json() as { skills: any[]; bundles: any[] };
    let tagged = 0;
    const each = (items: any[], kind: ClassifyInput["kind"]) => items.map(item => {
        const next = applyTags(item, kind, readTag, vocabulary);
        if (next !== item) tagged++;
        return next;
    });
    const out = { ...connectors, mcp: each(connectors.mcp ?? [], "connector") };
    const outSkills = { ...skills, skills: each(skills.skills ?? [], "skill"), bundles: each(skills.bundles ?? [], "bundle") };
    await Bun.write(connectorsFile, JSON.stringify(out) + "\n");
    await Bun.write(skillsFile, JSON.stringify(outSkills) + "\n");
    return tagged;
}

if (import.meta.main) {
    const dir = process.argv[2];
    if (!dir) { console.error("usage: bun classify/apply.ts <parts-dir>"); process.exit(2); }
    const { readTag, TAGS_DIR } = await import("./run");
    const { readVocabulary } = await import("./vocabulary");
    const tagged = await applyToParts(dir, hash => readTag(TAGS_DIR, hash), readVocabulary());
    console.log(`tagged ${tagged} items in ${dir}; run the build's validator next`);
}
