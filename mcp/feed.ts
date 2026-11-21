// The checked community feed is a published file, not a registry search.
// Its publisher is responsible for the checks in tools spec J5. A hub only
// validates the shape and transport before offering a remote.

import type { CatalogItem } from "./model";
import { registryToItem, type RegistryServer } from "./registry";

export const COMMUNITY_FEED_ID = "community-feed";
export const COMMUNITY_FEED_LABEL = "Community feed";

export function parseCommunityFeed(body: unknown): CatalogItem[] {
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not a community feed");
    const entries = (body as { servers?: unknown }).servers;
    if (!Array.isArray(entries)) throw new Error("community feed has no servers array");
    const items: CatalogItem[] = [];
    const seen = new Set<string>();
    for (const entry of entries) {
        if (!entry || typeof entry !== "object") continue;
        const server = ("server" in entry ? (entry as { server?: unknown }).server : entry) as RegistryServer | undefined;
        if (!server || typeof server.name !== "string"
            || (!Array.isArray(server.remotes) && !Array.isArray(server.packages))) continue;
        const item = registryToItem(server, COMMUNITY_FEED_ID, COMMUNITY_FEED_LABEL, []);
        if (!item?.mcp) continue;
        const signals = (entry as { _meta?: Record<string, any> })._meta?.["agents/community"];
        const kind = signals?.kind;
        if ((kind === "package" && !item.mcp.package) || (kind === "remote" && !("url" in item.mcp.config))) continue;
        const url = item.mcp.config && "url" in item.mcp.config ? item.mcp.config.url : null;
        if (url !== null) {
            if (typeof url !== "string") continue;
            try {
                const parsed = new URL(url);
                if (parsed.protocol !== "https:" || parsed.username || parsed.password) continue;
            } catch { continue; }
        } else if (!item.mcp.package) continue;
        const pkg = item.mcp.package;
        const variant = kind === "package" && pkg
            ? { ...item,
                id: `${item.id}#${pkg.manager}:${encodeURIComponent(pkg.identifier)}`,
                name: `${item.name.slice(0, 38)}-${pkg.manager}-${pkg.identifier.split("/").at(-1)!.replace(/[^A-Za-z0-9_.-]/g, "-").slice(0, 16)}`,
                title: `${item.title} · Local ${pkg.manager}` } : item;
        if (seen.has(variant.id)) continue;
        seen.add(variant.id);
        const provenance = signals?.provenance;
        if (item.mcp.config.type === "package" && typeof provenance === "boolean") {
            item.mcp.config.provenance = provenance;
        }
        items.push({ ...variant, trust: "community" });
    }
    return items;
}
