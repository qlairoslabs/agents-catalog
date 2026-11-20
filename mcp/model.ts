// src/catalog/model.ts
// One shape for everything Browse can offer, whichever source it came from.
// See 9-18-SPEC-tools.md §C.

import type { RawMcpServerEntry } from "./config";

export type CatalogKind = "mcp" | "skill" | "bundle";

/** How an entry came to be offered. Every card shows it (§C3). */
export type CatalogTrust = "curated" | "verified-publisher" | "community" | "unvetted";

/** How connecting authenticates. `oauth` needs the hub to log in (phase 2). */
export type CatalogAuth = "none" | "key" | "oauth";

/** A value the user types on Connect, stored as a secret under `env`. */
export interface SecretInput {
    env: string;
    label: string;
    example?: string;
}

export interface CatalogMcp {
    /** What gets written as the overlay entry. `$VAR`s name `secrets`. */
    config: RawMcpServerEntry;
    auth: CatalogAuth;
    secrets: SecretInput[];
    /** A package-based stdio server. Resolved through the MCP store, never npx. */
    package?: { manager: "npm" | "pypi" | "mcpb"; identifier: string; version: string; sha256?: string; args: string[] };
    /** Set when the entry cannot be added as it stands — e.g. a key it needs has
     *  nowhere to go, or its URL has template variables. Said on the card. */
    setupNeeded?: string;
}

export interface CatalogItem {
    /** Stable across syncs: `${sourceId}:${name}`. */
    id: string;
    kind: CatalogKind;
    /** The name it is added under. */
    name: string;
    title: string;
    description: string | null;
    icon: string | null;
    category: string | null;
    trust: CatalogTrust;
    /** Who published it. `verified` only when the source proves it (§C3). */
    publisher: { name: string; verified: boolean } | null;
    source: { id: string; label: string };
    mcp?: CatalogMcp;
    skill?: CatalogSkill;
    bundle?: CatalogBundle;
}

/** Where a skill's or bundle's files are: a GitHub repository, pinned. */
export interface GitSource {
    owner: string;
    repo: string;
    /** The commit to read, when the listing pins one; else the branch head at
     *  add time, which is then what gets pinned. */
    commit: string | null;
    ref?: string;
    /** The folder within the repository; "" for its root. */
    path: string;
}

export interface CatalogSkill {
    source: GitSource & { commit: string };
    /** Git's hash of the skill's folder: changes exactly when its files do,
     *  so it is what "update available" compares. */
    treeSha: string;
    /** SKILL.md at the pinned commit, for reading before adding. */
    readUrl: string;
}

export interface CatalogBundle {
    source: GitSource;
    /** The folder's tree hash, or the pinned commit: what an install is tagged
     *  with, and what "update available" compares. Null until read. */
    version: string | null;
    /** What the listing alone can tell. `known: false` means the bundle lives in
     *  another repository and is read when opened. */
    known: boolean;
    skills?: string[];
    hasMcp?: boolean;
}

export interface CatalogSourceStatus {
    id: string;
    label: string;
    /** When the items now held were fetched; null for the snapshot fallback. */
    fetchedAt: number | null;
    /** Why the last sync failed, when it did; the previous items are kept. */
    error: string | null;
    items: number;
    /** Where the items shown come from right now. */
    from: "live" | "snapshot" | "config";
}

/** Environment variable names a hub accepts as secret names. */
export function secretEnvName(value: string): string | null {
    const name = value.toUpperCase().replace(/[^A-Z0-9_]/g, "_");
    return /^[A-Z_][A-Z0-9_]*$/.test(name) ? name : null;
}
