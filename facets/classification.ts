import { readdir } from "node:fs/promises";
import { join } from "node:path";
import type { CatalogListingItem } from "../mcp/item";

type Tags = { contentHash: string } & Record<string, unknown>;
const root = new URL("../", import.meta.url);
const defaultTags = new URL("tags/", root).pathname;
const defaultVocabulary = new URL("facets/vocabulary.json", root).pathname;

export async function applyClassification(items: CatalogListingItem[], options: {
    tags?: string; vocabulary?: string; required?: boolean;
} = {}) {
    const directory = options.tags ?? defaultTags;
    const files = await readdir(directory, { withFileTypes: true }).catch(error => {
        if (error.code === "ENOENT" && !options.tags && !options.required) return [];
        throw error;
    });
    const names = files.filter(entry => entry.isFile() && /^[a-f0-9]{64}\.json$/.test(entry.name))
        .map(entry => entry.name).sort();
    if (!names.length) {
        if (options.required) throw Error("no classification tags were found");
        return { items, applied: 0 };
    }
    const vocabularyFile = Bun.file(options.vocabulary ?? defaultVocabulary);
    const vocabulary = options.vocabulary || await vocabularyFile.exists() ? await vocabularyFile.json() : null;
    const tags = new Map<string, Tags>();
    for (const name of names) {
        const tag = await Bun.file(join(directory, name)).json() as Tags;
        const hash = name.slice(0, -5);
        if (tag.contentHash !== hash) throw Error(`classification filename and content hash disagree: ${name}`);
        tags.set(hash, tag);
    }
    // The R1 and R4 review branches remain independent. Tags require the
    // R4 implementation, and an ordinary R1 checkout has no tags yet.
    const applyModule = new URL("classify/apply.ts", root);
    const { applyTags } = await import(applyModule.href);
    let applied = 0;
    const decorated = items.map(item => {
        const tagged = applyTags(item, item.kind === "mcp" ? "connector" : item.kind, tags, vocabulary) as CatalogListingItem;
        if (tagged !== item) applied++;
        return tagged;
    });
    if (options.required && !applied) throw Error("classification tags did not match any input listings");
    return { items: decorated, applied };
}
