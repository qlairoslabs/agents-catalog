import type { CatalogFacet, CatalogListingItem, CatalogTaxonomyLabel } from "../mcp/item";

const root = new URL("./",import.meta.url);
export type Topic = CatalogTaxonomyLabel & { code: string };
export const statuses = ["ok","junk","excluded","profile","brochure","adult"] as const;
export type Status = typeof statuses[number];
export type Classification = { id:string; status: Status; topic: string[]; summary:string; language:string; region:string[] };

export function readTaxonomy(text: string): Map<string, Topic> {
    const [header,...rows] = text.trimEnd().split(/\r?\n/);
    if (header !== "code\tarea\tcategory\ttopic\tdefinition\texcludes") throw Error("invalid taxonomy header");
    const values = new Map<string,Topic>();
    // Trim only newlines, so an empty last TSV cell is preserved.
    for (const line of text.replace(/\r?\n$/,"").split(/\r?\n/).slice(1)) {
        const columns = line.split("\t");
        const [code,area,category,topic,definition,excludes] = columns;
        if (columns.length !== 6 || !/^\d{2}\.\d{2}(?:\.\d{2})?$/.test(code!) || values.has(code!) || !area || !category || !definition) throw Error("invalid taxonomy entry " + code);
        values.set(code!,{ code:code!,area,category,definition,...(topic ? {topic} : {}),...(excludes ? {excludes} : {}) });
    }
    if (!rows.length) throw Error("taxonomy has no entries");
    return values;
}

export function taxonomyFacet(values: ReadonlyMap<string,Topic>): CatalogFacet {
    return {id:"topic",label:"Topic",version:"1.1",hierarchical:true,kinds:["mcp","skill","bundle"],
        values:[...values.values()].map(({code,...taxonomy}) => ({
            id:code,label:[taxonomy.area,taxonomy.category,taxonomy.topic].filter(Boolean).join(" › ").slice(0,120).replace(/[\uD800-\uDBFF]$/u,""),
            taxonomy,
        })) };
}

export function readRegionTable(text: string): Map<string,string[]> {
    const result = new Map<string,string[]>();
    for (const line of text.replace(/\r?\n$/,"").split(/\r?\n/)) {
        if (line.startsWith("#")) continue;
        const [name,codes,...rest] = line.split("\t");
        const values = codes?.split(",").filter(Boolean);
        if (!name || rest.length || !values || result.has(name)
            || values.some(code => !/^(?:[a-z]{2}|global|africa|asia|europe|latin-america|north-america|east-africa)$/.test(code))) throw Error("invalid region table entry " + name);
        result.set(name,values);
    }
    return result;
}

export function normalizeRegions(input:string, table: ReadonlyMap<string,string[]>): string[] {
    const names = table.has(input) ? [input] : input.split(";");
    const codes = [...new Set(names.flatMap(name => {
        const result = table.get(name.trim());
        if (!result) throw Error("unknown region " + name);
        return result;
    }))];
    if (codes.length > 20) throw Error("too many region values");
    return codes;
}

const languages = new Set("en es fr pt de zh ja ko ru nl pl hu cs da ca hr it no sv".split(" "));
export function readClassification(input: unknown, ids: ReadonlySet<string> | null, topics: ReadonlyMap<string,Topic>, regions: ReadonlyMap<string,string[]>) {
    if (!Array.isArray(input)) throw Error("classification must be an array");
    const records = new Map<string,Classification>();
    const keys = ["id","status","code","secondary_codes","summary","language","regions"];
    for (const raw of input) {
        if (!raw || typeof raw !== "object" || Object.keys(raw).length !== keys.length || keys.some(key=>typeof raw[key] !== "string")) throw Error("invalid classification row");
        const {id,status,code,secondary_codes,summary,language} = raw;
        if (!id || (ids && !ids.has(id)) || records.has(id)) throw Error("unknown or duplicate classification ID " + id);
        if (!statuses.includes(status) || !languages.has(language) || !summary.trim() || summary.length > 300) throw Error("invalid classification for " + id);
        const secondary = secondary_codes ? secondary_codes.split(";") : [];
        const codes = [code, ...secondary].filter(value => value && value !== "NEW");
        if (secondary.length > 2 || codes.some(value => !topics.has(value)) || (!code && status !== "junk" && status !== "excluded")) throw Error("invalid topic code for " + id);
        records.set(id,{ id,status,topic:[...new Set(codes)],summary,language,region:normalizeRegions(raw.regions,regions) });
    }
    if (ids && records.size !== ids.size) throw Error(`reviewed classification covers ${records.size} of ${ids.size} listings`);
    return records;
}

export function attachReviewed(item: CatalogListingItem, row?: Classification): CatalogListingItem {
    const attributes = { ...item.discovery.attributes };
    for (const field of ["domain","product","audience","goal","topic","region","language","status"]) delete attributes[field];
    if (!row) return { ...item, discovery: { ...item.discovery, attributes } };
    if (row.topic.length) attributes.topic = row.topic;
    if (row.region.length) attributes.region = row.region;
    attributes.language = [row.language];
    if (row.status !== "ok") attributes.status = [row.status];
    return { ...item, discovery: { ...item.discovery, attributes, summary:row.summary } };
}

export async function loadReviewed(ids: ReadonlySet<string> | null, file?:string, added?: string) {
    const [input,taxonomy,regions] = await Promise.all([
        Bun.file(file ?? new URL("classification-v1.json",root)).json(),
        Bun.file(new URL("taxonomy-v1.1.tsv",root)).text(),
        Bun.file(new URL("regions.tsv",root)).text(),
    ]);
    const codes = readTaxonomy(taxonomy), regionTable = readRegionTable(regions);
    const original = readClassification(input, ids, codes, regionTable);
    if (ids) return original;
    const additions = Bun.file(added ?? new URL("classification-added.json", root));
    if (await additions.exists()) {
        for (const [id, row] of readClassification(await additions.json(), null, codes, regionTable)) {
            if (original.has(id)) throw Error("duplicate classification ID " + id);
            original.set(id, row);
        }
    }
    return original;
}
