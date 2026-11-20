// classify/apply.ts
// Merges stored tags into finished items (catalogue §4 step 4). Pure: the
// build calls it with the parts, the tags it found and the vocabulary. An item
// with no tags is published unchanged, only without those filters. An effect
// attaches only to a tool whose current definition has the hash it was
// classified from; summary and whenToUse stay untrusted text.

import { contentHash, inputOf, toolHash, type ClassifyInput } from "./hash";
import type { Tags } from "./output";
import type { Vocabulary } from "./vocabulary";

const FIELDS = ["domain", "product", "audience"] as const;

function mapped(tags: Tags, field: typeof FIELDS[number], vocabulary: Vocabulary | null): string[] {
    const values = tags[field].map(value => vocabulary?.mapping[field]?.[value] ?? value);
    return [...new Set(values)].slice(0, 20);
}

export function applyTags<T extends Record<string, any>>(item: T, kind: ClassifyInput["kind"], tags: ReadonlyMap<string, Tags>, vocabulary: Vocabulary | null): T {
    const found = tags.get(contentHash(inputOf(item, kind)));
    if (!found) return item;
    const discovery = { ...(item.discovery ?? {}) };
    const attributes = { ...(discovery.attributes ?? {}) };
    for (const field of FIELDS) { const values = mapped(found, field, vocabulary); if (values.length) attributes[field] = values; }
    if (found.goal.length) attributes.goal = [...found.goal];
    discovery.attributes = attributes;
    if (found.summary) discovery.summary = found.summary;
    if (found.whenToUse) discovery.whenToUse = found.whenToUse;
    if (found.tasks.length) discovery.tasks = [...found.tasks];
    const next: Record<string, any> = { ...item, discovery };
    if (Array.isArray(item.connect?.tools)) {
        next.connect = { ...item.connect, tools: item.connect.tools.map((tool: any) => {
            const hash = toolHash(tool);
            const effect = found.effects[hash];
            const { effect: _old, ...rest } = tool;
            return effect ? { ...rest, effect: { effect, hash } } : rest;
        }) };
    }
    return next as T;
}
