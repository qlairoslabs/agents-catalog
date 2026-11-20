import { readdir } from "node:fs/promises";
import type { CatalogListingItem } from "../mcp/item";

const root = new URL("../", import.meta.url);
const defaultTags = new URL("tags/", root).pathname;

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
    // The R1 and R4 review branches remain independent. A build with tags
    // loads the reviewed R4 implementation and uses its readers unchanged.
    const load = (name: string) => import(new URL(`classify/${name}.ts`, root).href);
    const [{ applyTags }, { readTag }, { readVocabulary }] = await Promise.all([
        load("apply"), load("run"), load("vocabulary"),
    ]);
    const vocabulary = readVocabulary(options.vocabulary);
    const lookup = (hash: string) => readTag(directory, hash);
    let applied = 0;
    const decorated = items.map(item => {
        const tagged = applyTags(item, item.kind === "mcp" ? "connector" : item.kind, lookup, vocabulary) as CatalogListingItem;
        if (tagged !== item) applied++;
        return tagged;
    });
    if (options.required && !applied) throw Error("classification tags did not match any input listings");
    return { items: decorated, applied };
}
