// src/catalog/reference.ts
// The Model Context Protocol project's reference servers. They are not in the
// official registry, so they are listed here by hand; `version` is only a
// starting point, because Add resolves the newest release old enough (J8).
//
// The archived reference servers are unmaintained and stay out.

import type { CatalogItem } from "./model";
import type { RawMcpServerEntry } from "./config";

export const REFERENCE_SOURCE_ID = "reference";
export const REFERENCE_SOURCE_LABEL = "MCP reference servers";

interface Reference {
    name: string;
    title: string;
    description: string;
    category: string;
    manager: "npm" | "pypi";
    identifier: string;
    version: string;
    args?: string[];
    env?: Record<string, string>;
}

const REFERENCES: Reference[] = [
    { name: "everything", title: "Everything", description: "Test server that exercises every MCP feature. For trying out clients, not for real work.", category: "Developer tools",
        manager: "npm", identifier: "@modelcontextprotocol/server-everything", version: "2.1.0" },
    { name: "fetch", title: "Fetch", description: "Fetches web pages and converts them to Markdown.", category: "Web",
        manager: "pypi", identifier: "mcp-server-fetch", version: "2026.10.28" },
    { name: "filesystem", title: "Filesystem", description: "File operations limited to the agent's working directory.", category: "Developer tools",
        manager: "npm", identifier: "@modelcontextprotocol/server-filesystem", version: "2.1.0", args: ["$AGENTS_WORKSPACE_DIR"] },
    { name: "git", title: "Git", description: "Reads, searches and changes Git repositories.", category: "Developer tools",
        manager: "pypi", identifier: "mcp-server-git", version: "2026.10.28" },
    // Its default file sits beside its code, and the package store is read-only.
    { name: "memory", title: "Memory", description: "A knowledge graph the agent keeps between sessions.", category: "Productivity",
        manager: "npm", identifier: "@modelcontextprotocol/server-memory", version: "2.0.1",
        env: { MEMORY_FILE_PATH: "$AGENTS_ARTIFACTS_DIR/memory.jsonl" } },
    { name: "sequential-thinking", title: "Sequential Thinking", description: "Structured step-by-step problem solving.", category: "Productivity",
        manager: "npm", identifier: "@modelcontextprotocol/server-sequential-thinking", version: "2.0.0" },
    { name: "time", title: "Time", description: "Current time and time zone conversion.", category: "Productivity",
        manager: "pypi", identifier: "mcp-server-time", version: "2026.10.28" },
];

export const REFERENCE_ITEMS: CatalogItem[] = REFERENCES.map(server => {
    const args = server.args ?? [];
    const ref = { manager: server.manager, identifier: server.identifier, version: server.version };
    return {
        id: `${REFERENCE_SOURCE_ID}:${server.name}`,
        kind: "mcp",
        name: server.name,
        title: server.title,
        description: server.description,
        icon: null,
        category: server.category,
        trust: "curated",
        publisher: { name: "Model Context Protocol", verified: true },
        source: { id: REFERENCE_SOURCE_ID, label: REFERENCE_SOURCE_LABEL },
        mcp: {
            config: { type: "package", package: ref, args, env: server.env ?? {}, update: "auto" } as RawMcpServerEntry,
            auth: "none",
            secrets: [],
            package: { ...ref, args },
        },
    };
});
