import type { CatalogFacet, CatalogListingItem } from "../mcp/item";

export function withFacets(item: CatalogListingItem): CatalogListingItem {
    const attributes: Record<string, string[]> = { kind: [item.kind], trust: [item.origin.trust] };
    const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^[^a-z0-9]+|-+$/g, "").slice(0, 120);
    const sources = [...new Set(item.origin.all.map(entry => slug(entry.source.id)).filter(Boolean))];
    if (sources.length) attributes.source = sources.slice(0, 20);
    const vendor = slug(item.origin.publisher?.name ?? "");
    if (vendor) attributes.vendor = [vendor];
    if (item.kind === "mcp") {
        attributes.signin = [item.connect.auth];
        attributes.runs = [item.connect.config.type === "http" ? "http" : "stdio"];
    }
    if (item.origin.bundle) attributes.bundle = ["yes"];
    return { ...item, discovery: { ...item.discovery, attributes } };
}

export function facets(items: readonly CatalogListingItem[]): CatalogFacet[] {
    const definitions: Array<[string, string]> = [["kind","Kind"],["trust","Trust"],["source","Source"],["vendor","Vendor"],
        ["signin","Sign-in"],["runs","Runs as"],["bundle","Part of a bundle"]];
    return definitions.flatMap(([id, label]) => {
        const selected = items.filter(item => item.discovery.attributes?.[id]?.length);
        if (!selected.length) return [];
        const values = [...new Set(selected.flatMap(item => item.discovery.attributes![id]!))].sort();
        return [{ id, label, kinds: [...new Set(selected.map(item => item.kind))],
            ...(values.length <= 2000 ? { values: values.map(id => ({ id })) } : {}) }];
    });
}
