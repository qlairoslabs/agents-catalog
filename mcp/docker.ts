// src/catalog/docker.ts
// Docker's MCP catalogue (desktop.docker.com/mcp/catalog/v3/catalog.yaml).
//
// Curated: every entry is a reviewed pull request (tools spec §G2). Only
// `remote` entries are taken. `server` entries are Docker images an agent's
// runtime may not be able to run, and `poci` is Docker-specific.

import { parse } from "yaml";
import { isReservedSecretName } from "./local-rules";
import type { RawMcpServerEntry } from "./config";
import type { CatalogAuth, CatalogItem, SecretInput } from "./model";

interface DockerEntry {
    type?: string;
    title?: string;
    description?: string;
    icon?: string;
    metadata?: { category?: string };
    remote?: { transport_type?: string; url?: string; headers?: Record<string, string> };
    secrets?: { name?: string; env?: string; example?: string }[];
    oauth?: { providers?: unknown[] };
}

/** Docker writes `${NAME}`; our expansion reads `$NAME`. */
function toDollarVars(value: string): string {
    return value.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (_, name: string) => `$${name}`);
}

function entryToItem(sourceId: string, sourceLabel: string, name: string, entry: DockerEntry): CatalogItem | null {
    if (entry.type !== "remote" || !entry.remote?.url) return null;
    const transport = entry.remote.transport_type === "sse" ? "sse" : "http";
    const headers = Object.fromEntries(Object.entries(entry.remote.headers ?? {}).map(([key, value]) => [key, toDollarVars(String(value))]));
    const config = { type: transport, url: entry.remote.url, ...(Object.keys(headers).length ? { headers } : {}) } as RawMcpServerEntry;

    const secrets: SecretInput[] = (entry.secrets ?? [])
        .filter(secret => typeof secret.env === "string" && secret.env.length > 0)
        .map(secret => ({ env: secret.env!, label: secret.name ?? secret.env!, ...(secret.example ? { example: secret.example } : {}) }));
    const referenced = Object.values(headers).join(" ");
    const placed = secrets.filter(secret => referenced.includes(`$${secret.env}`));

    let auth: CatalogAuth = "none";
    let setupNeeded: string | undefined;
    if (entry.oauth?.providers?.length) {
        auth = "oauth";
    } else if (secrets.length > 0) {
        auth = "key";
        if (placed.length < secrets.length) {
            setupNeeded = "It needs a key, but the catalogue does not say where the key goes. Add it under Custom.";
        } else if (secrets.some(secret => isReservedSecretName(secret.env))) {
            setupNeeded = "It needs a key under a name the hub reserves for itself.";
        }
    }

    return {
        id: `${sourceId}:${name}`,
        kind: "mcp",
        name,
        title: entry.title?.trim() || name,
        description: entry.description?.trim() || null,
        icon: entry.icon ?? null,
        category: entry.metadata?.category ? entry.metadata.category.toLowerCase() : null,
        trust: "curated",
        publisher: null,
        source: { id: sourceId, label: sourceLabel },
        mcp: { config, auth, secrets: placed.length ? placed : secrets, ...(setupNeeded ? { setupNeeded } : {}) },
    };
}

export function parseDockerCatalog(text: string, sourceId: string, sourceLabel = "Docker"): CatalogItem[] {
    const doc = parse(text) as { registry?: Record<string, DockerEntry> } | null;
    if (!doc || typeof doc !== "object" || !doc.registry || typeof doc.registry !== "object") {
        throw new Error("not a Docker MCP catalogue: no `registry` map");
    }
    return Object.entries(doc.registry)
        .map(([name, entry]) => entryToItem(sourceId, sourceLabel, name, entry ?? {}))
        .filter((item): item is CatalogItem => item !== null)
        .sort((a, b) => a.title.localeCompare(b.title));
}
