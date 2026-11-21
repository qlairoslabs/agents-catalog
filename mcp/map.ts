import type { CatalogItem, CatalogMcp } from "./model";
import type { CatalogConnectConfig, CatalogListingItem, CatalogOrigin, CatalogTool } from "./item";
import { readItem } from "./item";
import { isReservedSecretName } from "./local-rules";

export type Mapping = { item: CatalogListingItem } | { reason: string };

export function catalogueTool(raw: unknown): CatalogTool | null {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    const { name, description, inputSchema } = raw as Record<string, unknown>;
    if (typeof name !== "string" || !name || name.length > 128
        || !inputSchema || typeof inputSchema !== "object" || Array.isArray(inputSchema)) return null;
    return { name, description: typeof description === "string" ? description.slice(0, 4000) : "",
        inputSchema: inputSchema as Record<string, unknown> };
}

function connect(mcp: CatalogMcp): CatalogConnectConfig | string {
    const config = mcp.config;
    if (config.type === "sse") return "SSE-only transport";
    if (config.type !== "http" && config.type !== "package") return "launches a stdio command";
    if (mcp.setupNeeded) return mcp.setupNeeded;
    const declared = new Set(mcp.secrets.map(secret => secret.env));
    const values = config.type === "http" ? config.headers : config.env;
    for (const [key, value] of Object.entries(values ?? {})) {
        if (!/^\$[A-Z_][A-Z0-9_]{0,63}$/.test(value) || !declared.has(value.slice(1))
            || (config.type === "package" && isReservedSecretName(key))) {
            return config.type === "http" ? "header is not a declared secret reference" : "package environment is not a declared secret reference";
        }
    }
    if (config.type === "http") {
        if (/[{}]/.test(config.url)) return "remote URL contains a template";
        try {
            const url = new URL(config.url);
            if (url.protocol !== "https:" || url.username || url.password) return "remote URL must be HTTPS without credentials";
        } catch { return "invalid remote URL"; }
        return { type: "http", url: config.url, ...(config.headers ? { headers: config.headers } : {}) };
    }
    if (config.installScripts) return "package requires install scripts outside schema 1";
    if (config.package.manager !== "mcpb" && !/^v?[0-9]/.test(config.package.version)) return "package version is not exact";
    return { type: "package", package: config.package, ...(config.env ? { env: config.env } : {}),
        ...(config.args ? { args: config.args } : {}), update: "pinned" };
}

function secretLabel(label: string, name: string): string {
    const normalized = label.replace(/\s+/gu, " ").trim() || name || "Secret";
    // The reader counts UTF-16 units. Avoid splitting a surrogate pair.
    return normalized.slice(0, 200).replace(/[\uD800-\uDBFF]$/u, "").trimEnd() || "Secret";
}

export function mapItem(item: CatalogItem, tools?: readonly CatalogTool[], members: { skills: string[]; connectors: { name: string; transport?: "http" | "stdio"; leftOut?: string }[] } = { skills: [], connectors: [] }): Mapping {
    const origin: CatalogOrigin = {
        trust: item.trust, publisher: item.publisher, source: item.source,
        all: [{ source: item.source, trust: item.trust }],
    };
    const display = { title: item.title.slice(0, 200), description: item.description?.slice(0, 2000) ?? null,
        icon: item.icon?.startsWith("https://") ? item.icon : null };
    const common = { id: item.id, name: item.name, display, origin };
    let result: Record<string, unknown>;
    if (item.kind === "mcp") {
        if (!item.mcp) return { reason: "missing connector definition" };
        const config = connect(item.mcp);
        if (typeof config === "string") return { reason: config };
        result = { ...common, connect: { config, auth: item.mcp.auth, secrets: item.mcp.secrets.map(secret => ({ ...secret, label: secretLabel(secret.label, secret.env) })), ...(tools ? { tools } : {}) } };
    } else if (item.kind === "skill") {
        if (!item.skill) return { reason: "missing skill definition" };
        const { ref: _ref, ...source } = item.skill.source;
        result = { ...common, skill: { ...item.skill, source } };
    } else {
        const bundle = item.bundle;
        if (!bundle?.source.commit || !bundle.version) return { reason: "bundle source is not pinned" };
        const { ref: _ref, ...source } = bundle.source;
        result = { ...common, bundle: { source, version: bundle.version, ...members } };
    }
    try { return { item: readItem(result, item.kind) }; }
    catch (error) { return { reason: error instanceof Error ? error.message : "invalid schema 1 item" }; }
}

const trust = { curated: 0, "verified-publisher": 1, community: 2, unvetted: 3 };

function identity(item: CatalogListingItem): string {
    if (item.kind === "skill") return JSON.stringify(["skill", item.skill.treeSha]);
    if (item.kind === "bundle") return JSON.stringify(["bundle", item.bundle.source.owner, item.bundle.source.repo, item.bundle.source.path]);
    const config = item.connect.config;
    if (config.type === "http") return JSON.stringify(["http", new URL(config.url).href, item.connect.auth, Object.entries(config.headers ?? {}).sort()]);
    return JSON.stringify(["package", config.package.manager, config.package.identifier, config.package.version, config.package.sha256 ?? null, config.args ?? [], Object.entries(config.env ?? {}).sort()]);
}

export function mergeItems(items: readonly CatalogListingItem[]) {
    const merged = new Map<string, CatalogListingItem>();
    const aliases = new Map<string, string>();
    const sorted = [...items].sort((a, b) => trust[a.origin.trust] - trust[b.origin.trust] || a.id.localeCompare(b.id));
    for (const item of sorted) {
        const key = identity(item);
        const winner = merged.get(key);
        if (!winner) { merged.set(key, item); continue; }
        if (winner.id === item.id) continue;
        aliases.set(item.id, winner.id);
        const all = [...winner.origin.all, ...item.origin.all];
        const origins = [...new Map(all.map(entry => [JSON.stringify(entry), entry])).values()];
        if (origins.length > 50) throw new Error(`too many origins for ${winner.id}`);
        merged.set(key, { ...winner, formerIds: [...new Set([...(winner.formerIds ?? []), item.id, ...(item.formerIds ?? [])])].slice(0, 20),
            origin: { ...winner.origin, all: origins } });
    }
    const results = [...merged.values()].map(item => item.kind === "bundle"
        ? { ...item, bundle: { ...item.bundle, skills: [...new Set(item.bundle.skills.map(id => aliases.get(id) ?? id))] } }
        : item);
    return { items: results.sort((a, b) => a.id.localeCompare(b.id)), aliases };
}
