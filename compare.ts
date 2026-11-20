import type { CatalogItem } from "./mcp/model";
import type { CatalogListingItem } from "./mcp/item";
import { parseCommunityFeed } from "./mcp/feed";

export type Explanation = { id: string; reason: string };
export type Snapshot = { sources: Record<string, { items: CatalogItem[] }> };

function oldKind(item: CatalogItem): string {
    if (String(item.kind) === "plugin") return "bundle";
    if (item.kind !== "mcp") return item.kind;
    const config = item.mcp?.config;
    return config?.type === "package" ? `mcp/${config.package.manager}` : `mcp/${config?.type ?? "stdio"}`;
}
function newKind(item: CatalogListingItem): string {
    if (item.kind !== "mcp") return item.kind;
    const config = item.connect.config;
    return config.type === "package" ? `mcp/${config.package.manager}` : "mcp/http";
}
function counts<T>(items: readonly T[], key: (item: T) => string): Map<string, number> {
    const values = new Map<string, number>();
    for (const item of items) values.set(key(item), (values.get(key(item)) ?? 0) + 1);
    return values;
}

export function comparison(snapshot: Snapshot, oldFeed: unknown, next: CatalogListingItem[], reasons: Explanation[],
    aliases: Map<string, string>, notes: string[] = []): string {
    const prior = new Map(Object.values(snapshot.sources).flatMap(source => source.items.map(item => [item.id, item] as const)));
    const feed = parseCommunityFeed(oldFeed);
    for (const item of feed) prior.set(item.id, item);
    const byId = new Map(next.map(item => [item.id,item]));
    const oldCounts = counts([...prior.values()], oldKind);
    const feedCounts = counts(feed, oldKind);
    const newCounts = counts(next, newKind);
    const rules = new Map(reasons.map(({ id, reason }) => [id, reason]));
    const rows: string[] = [];
    const escape = (value: string) => value.replace(/[|\r\n]/g, " ").replace(/[<>]/g, "");
    let dropped = 0, changed = 0, added = 0;
    const row = (id: string, change: string, cause: string) => rows.push(`| ${escape(id)} | ${change} | ${escape(cause)} |`);
    for (const [id, item] of prior) {
        const other = byId.get(id);
        if (aliases.has(id)) { changed++; row(id,"merged", `duplicate connection or content; kept as ${aliases.get(id)}`); continue; }
        if (!other) { dropped++; row(id,"dropped", rules.get(id) ?? "source removed the listing or the current crawl no longer accepted it"); continue; }
        const changes = ["schema 1 display, origin and discovery"];
        if (oldKind(item) !== newKind(other)) changes.push(`transport ${oldKind(item)} to ${newKind(other)}`);
        if (other.kind === "mcp" && other.connect.config.type === "package") changes.push("exact pinned package");
        if (other.kind === "mcp" && other.connect.tools) changes.push("tool definitions supplied or live-listed");
        if (item.title !== other.display.title || item.description !== other.display.description) changes.push("source display metadata changed or was bounded");
        if (other.kind === "skill" && other.skill.treeSha !== item.skill?.treeSha) changes.push("source tree changed");
        if (other.kind === "bundle") changes.push("bundle membership resolved at pinned source");
        changed++; row(id,"changed",changes.join("; "));
    }
    for (const item of next) {
        if (!prior.has(item.id)) { added++; row(item.id,"added","new accepted source listing or expanded bundle member"); }
    }
    const kinds = [...new Set([...oldCounts.keys(),...newCounts.keys()])].sort();
    const table = kinds.map(kind => `| ${kind} | ${oldCounts.get(kind) ?? 0} | ${feedCounts.get(kind) ?? 0} | ${newCounts.get(kind) ?? 0} |`);
    return ["# R1 catalogue comparison","",`Compared ${prior.size} distinct legacy IDs with ${next.length} candidate listings. ${added} added, ${changed} changed or merged, ${dropped} dropped.`,
        ...(notes.length ? ["", ...notes.map(note => `- ${escape(note)}`)] : []),"","| Kind/transport | Snapshot and feed combined | Community feed | Candidate |","| --- | ---: | ---: | ---: |",...table,"",
        "## Listing differences","","| Listing | Change | Rule |","| --- | --- | --- |",...rows,"",
        "## Candidate entries rejected during mapping","","| Listing | Change | Rule |","| --- | --- | --- |",
        ...reasons.map(({id, reason}) => `| ${escape(id)} | rejected | ${escape(reason)} |`),""].join("\n");
}
