// src/catalog/marketplace.ts
// Bundle marketplaces: a git repository with a listing (9-18-SPEC-tools.md §E).
//
// The listing is not standardised; the package is. Three listings are read —
// Claude's, Copilot's and Codex's — and three package layouts: Agent Plugins
// 1.1 (plugin.json + mcp.json + skills/), Claude's (.claude-plugin/ + .mcp.json)
// and Codex's legacy (.codex-plugin/). A bundle is split into its skills and
// MCP servers; agents, commands, hooks and namespaced extras are ignored —
// hooks run shell commands, which the hub never executes from a catalogue.

import { posix } from "node:path";
import type { RawMcpServerEntry } from "../mcp/config";
import type { OAuthIo } from "../mcp/network";
import { blobUrl, GitHubError, parseGitHubRepo, rawText, repoTree, resolveCommit, type RepoRef, type TreeEntry, avatarUrl } from "../mcp/github";
import type { CatalogItem, GitSource } from "../mcp/model";
import { skillFrontmatter } from "./frontmatter";
import { assertSafePackageReference } from "../mcp/local-rules";

const LISTINGS = [".claude-plugin/marketplace.json", ".github/plugin/marketplace.json", ".agents/plugins/marketplace.json"];
const MANIFESTS = ["plugin.json", ".claude-plugin/plugin.json", ".codex-plugin/plugin.json"];
const MCP_FILES = ["mcp.json", ".mcp.json"];

interface ListingEntry {
    name?: string;
    displayName?: string;
    description?: string;
    category?: string;
    author?: { name?: string } | string;
    source?: unknown;
    skills?: string[];
    strict?: boolean;
}

/** A folder inside a repository, never above it. */
function safeDir(path: string): string | null {
    const normal = posix.normalize(path.replace(/^\.\//, "")).replace(/\/+$/, "");
    if (normal === "." || normal === "") return "";
    if (normal.startsWith("..") || posix.isAbsolute(normal)) return null;
    return normal;
}

function join(dir: string, path: string): string {
    return dir ? `${dir}/${path}` : path;
}

/** Where a bundle's files are, from any of the listing formats. */
export function resolveSource(source: unknown, marketplace: RepoRef, commit: string): GitSource | null {
    if (typeof source === "string") {
        const path = safeDir(source);
        return path === null ? null : { ...marketplace, commit, path };
    }
    if (!source || typeof source !== "object") return null;
    const raw = source as Record<string, unknown>;
    const pinned = typeof raw.sha === "string" && /^[0-9a-f]{40}$/.test(raw.sha) ? raw.sha : null;
    const ref = typeof raw.ref === "string" ? raw.ref : undefined;
    if (raw.source === "url" || raw.source === "git-subdir") {
        const repo = typeof raw.url === "string" ? parseGitHubRepo(raw.url) : null;
        const path = safeDir(typeof raw.path === "string" ? raw.path : "");
        return repo && path !== null ? { ...repo, commit: pinned, ...(ref ? { ref } : {}), path } : null;
    }
    if (raw.source === "github") {
        const repo = typeof raw.repo === "string" ? parseGitHubRepo(`github.com/${raw.repo}`) : null;
        return repo ? { ...repo, commit: pinned, ...(ref ? { ref } : {}), path: "" } : null;
    }
    if (typeof raw.path === "string" && raw.source === undefined) {
        const path = safeDir(raw.path);
        return path === null ? null : { ...marketplace, commit, path };
    }
    return null;
}

function under(tree: readonly TreeEntry[], dir: string): TreeEntry[] {
    const prefix = dir ? `${dir}/` : "";
    return tree.filter(entry => entry.path.startsWith(prefix));
}

/**
 * The skill folders of a bundle. The standard counts only immediate children of
 * `skills/`; Claude's layout nests deeper (Notion: skills/notion/<skill>/). A
 * folder inside another skill is that skill's files, never a second skill.
 */
export function skillDirs(tree: readonly TreeEntry[], bundleDir: string, standard: boolean): string[] {
    const skillsRoot = join(bundleDir, "skills");
    const found = under(tree, skillsRoot)
        .filter(entry => entry.type === "blob" && posix.basename(entry.path) === "SKILL.md")
        .map(entry => posix.dirname(entry.path))
        .filter(dir => !standard || posix.dirname(dir) === skillsRoot)
        .sort((a, b) => a.length - b.length);
    return found.filter((dir, index) => !found.slice(0, index).some(outer => dir.startsWith(`${outer}/`)));
}

function treeSha(tree: readonly TreeEntry[], dir: string, fallback: string): string {
    return (dir ? tree.find(entry => entry.type === "tree" && entry.path === dir)?.sha : undefined) ?? fallback;
}

const frontmatter = skillFrontmatter;

/** Read a marketplace listing into bundle items, plus a skill item for every
 *  skill the listing names explicitly (the skills-marketplace pattern). */
export async function readMarketplace(repoSpec: string, sourceId: string, label: string, io: OAuthIo = {}): Promise<CatalogItem[]> {
    const marketplace = parseGitHubRepo(repoSpec);
    if (!marketplace) throw new GitHubError(`not a GitHub repository: ${repoSpec}`);
    const commit = await resolveCommit(marketplace, "HEAD", io);
    const tree = await repoTree(marketplace, commit, io);
    const listingPath = LISTINGS.find(path => tree.some(entry => entry.path === path));
    if (!listingPath) throw new GitHubError(`${repoSpec} has no bundle listing`);
    const listing = JSON.parse(await rawText(marketplace, commit, listingPath, io)) as { plugins?: ListingEntry[] };

    const items: CatalogItem[] = [];
    for (const entry of listing.plugins ?? []) {
        if (!entry.name) continue;
        const source = resolveSource(entry.source, marketplace, commit);
        if (!source) continue;
        const local = source.owner === marketplace.owner && source.repo === marketplace.repo && source.commit === commit;
        const publisher = typeof entry.author === "string" ? entry.author : entry.author?.name;
        const explicit = entry.skills?.map(path => safeDir(join(source.path, path.replace(/^\.\//, "")))).filter((path): path is string => !!path);
        const standard = tree.some(item => item.path === join(source.path, "plugin.json"));
        const skills = local ? explicit ?? skillDirs(tree, source.path, standard) : explicit;
        // Keep the historical item ID: stored tags refer to it across upgrades.
        items.push({
            id: `${sourceId}:plugin:${entry.name}`,
            kind: "bundle",
            name: entry.name,
            title: entry.displayName?.trim() || entry.name,
            description: entry.description?.trim() || null,
            icon: avatarUrl(source.owner),
            category: entry.category?.toLowerCase() ?? null,
            trust: "curated",
            publisher: publisher ? { name: publisher, verified: false } : null,
            source: { id: sourceId, label },
            bundle: {
                source,
                version: local ? treeSha(tree, source.path, commit) : source.commit,
                known: local,
                ...(skills ? { skills } : {}),
                ...(local ? { hasMcp: MCP_FILES.some(file => tree.some(item => item.path === join(source.path, file))) } : {}),
            },
        });

        // A listing that names its skills is offering them one by one too.
        if (local && explicit) {
            for (const dir of explicit) {
                const readme = join(dir, "SKILL.md");
                if (!tree.some(item => item.path === readme)) continue;
                const meta = frontmatter(await rawText(marketplace, commit, readme, io).catch(() => ""));
                const name = meta.name || posix.basename(dir);
                items.push({
                    id: `${sourceId}:skill:${dir}`,
                    kind: "skill",
                    name,
                    title: name,
                    description: meta.description || null,
                    icon: avatarUrl(marketplace.owner),
                    category: entry.category?.toLowerCase() ?? null,
                    trust: "curated",
                    publisher: publisher ? { name: publisher, verified: false } : null,
                    source: { id: sourceId, label },
                    skill: {
                        source: { ...marketplace, commit, path: dir },
                        treeSha: treeSha(tree, dir, commit),
                        readUrl: blobUrl(marketplace, commit, readme),
                    },
                });
            }
        }
    }
    return items;
}

// ---------------------------------------------------------------------------
// Reading one bundle
// ---------------------------------------------------------------------------

export interface BundleSkill {
    name: string;
    description: string | null;
    dir: string;
    readUrl: string;
    treeSha: string;
    files: { path: string; size: number }[];
}

export interface BundleServer {
    name: string;
    config: RawMcpServerEntry;
}

export interface BundleContents {
    source: GitSource & { commit: string };
    /** What an install is tagged with. */
    version: string;
    manifestVersion: string | null;
    skills: BundleSkill[];
    mcp: BundleServer[];
    /** Parts not installed in this pass, and why — said on the card. */
    skipped: { name: string; reason: string }[];
}

/** An MCP server entry from either file shape, or why it cannot be taken. */
export function bundleServer(name: string, raw: unknown): BundleServer | { name: string; reason: string } {
    if (!raw || typeof raw !== "object") return { name, reason: "not a server entry" };
    const entry = raw as Record<string, unknown>;
    if (typeof entry.command === "string" || entry.type === "stdio") {
        if (entry.command !== "npx" && entry.command !== "npm exec" && entry.command !== "uvx") {
            return { name, reason: "runs a program that is not a supported package" };
        }
        const args = Array.isArray(entry.args) && entry.args.every(arg => typeof arg === "string") ? entry.args as string[] : null;
        const env = entry.env && typeof entry.env === "object" && !Array.isArray(entry.env)
            && Object.values(entry.env).every(value => typeof value === "string") ? entry.env as Record<string, string> : {};
        if (!args) return { name, reason: "runs a program without a supported package specification" };
        const manager: "npm" | "pypi" = entry.command === "uvx" ? "pypi" : "npm";
        let spec = "";
        let fixedArgs: string[] = [];
        if (entry.command === "npx" || entry.command === "npm exec") {
            const offset = args[0] === "-y" || args[0] === "--yes" ? 1 : 0;
            spec = args[offset] ?? "";
            fixedArgs = args.slice(offset + 1);
        } else if (entry.command === "uvx") {
            spec = args[0] ?? "";
            fixedArgs = args.slice(1);
        }
        const separator = manager === "npm" ? spec.lastIndexOf("@") : spec.indexOf("==");
        const identifier = separator > 0 ? spec.slice(0, separator) : "";
        const version = separator > 0 ? spec.slice(separator + (manager === "npm" ? 1 : 2)) : "";
        if (!identifier || !version || !/^(?:latest|[0-9][A-Za-z0-9.+-]*)$/.test(version)) {
            return { name, reason: "package command needs a pinned version or latest" };
        }
        try { assertSafePackageReference({ manager, identifier, version }); }
        catch { return { name, reason: "invalid package name or version" }; }
        const config = { type: "package" as const, package: { manager, identifier, version },
            update: version === "latest" ? "auto" as const : "frozen" as const, args: fixedArgs,
            ...(entry.installScripts === true ? { installScripts: true } : {}),
            env: Object.fromEntries(Object.entries(env).map(([key, value]) => [key, value.replace(/\$\{([A-Z_][A-Z0-9_]*)\}/g, "$$$1")])) };
        return { name, config };
    }
    const type = entry.type === "sse" ? "sse" : entry.type === "http" || entry.type === "streamable-http" ? "http" : null;
    if (!type || typeof entry.url !== "string" || !entry.url.startsWith("https://")) return { name, reason: "not a remote https server" };
    const headers = entry.headers && typeof entry.headers === "object" ? entry.headers as Record<string, unknown> : {};
    const values = Object.values(headers);
    if (values.some(value => typeof value !== "string" || /\$\{?[A-Za-z_]/.test(value))) {
        // A portable bundle cannot say where a key goes (Agent Plugins §9).
        return { name, reason: "needs a key the bundle cannot declare; add it under Custom" };
    }
    return { name, config: { type, url: entry.url, ...(values.length ? { headers: headers as Record<string, string> } : {}) } as RawMcpServerEntry };
}

export async function readBundle(item: CatalogItem, io: OAuthIo = {}): Promise<BundleContents> {
    const bundle = item.bundle;
    if (!bundle) throw new GitHubError("not a bundle");
    const repo = { owner: bundle.source.owner, repo: bundle.source.repo };
    const commit = bundle.source.commit ?? await resolveCommit(repo, bundle.source.ref ?? "HEAD", io);
    const tree = await repoTree(repo, commit, io);
    const dir = bundle.source.path;
    const has = (path: string) => tree.some(entry => entry.path === join(dir, path));

    const manifestPath = MANIFESTS.find(has);
    const manifest = manifestPath ? JSON.parse(await rawText(repo, commit, join(dir, manifestPath), io).catch(() => "{}")) as { version?: string } : {};
    const standard = manifestPath === "plugin.json";

    const skills: BundleSkill[] = [];
    for (const skillDir of bundle.skills ?? skillDirs(tree, dir, standard)) {
        const readme = join(skillDir, "SKILL.md");
        if (!tree.some(entry => entry.path === readme)) continue;
        const meta = frontmatter(await rawText(repo, commit, readme, io).catch(() => ""));
        skills.push({
            name: meta.name || posix.basename(skillDir),
            description: meta.description || null,
            dir: skillDir,
            readUrl: blobUrl(repo, commit, readme),
            treeSha: treeSha(tree, skillDir, commit),
            files: under(tree, skillDir).filter(entry => entry.type === "blob")
                .map(entry => ({ path: entry.path.slice(skillDir.length + 1), size: entry.size ?? 0 })),
        });
    }

    const mcp: BundleServer[] = [];
    const skipped: { name: string; reason: string }[] = [];
    const mcpPath = MCP_FILES.find(has);
    if (mcpPath) {
        const parsed = JSON.parse(await rawText(repo, commit, join(dir, mcpPath), io).catch(() => "{}")) as Record<string, unknown>;
        // `{ "mcpServers": {…} }` (the standard, Notion) or a bare map (Linear).
        const servers = (parsed.mcpServers && typeof parsed.mcpServers === "object" ? parsed.mcpServers : parsed) as Record<string, unknown>;
        for (const [name, raw] of Object.entries(servers)) {
            if (name.startsWith("$")) continue;
            const server = bundleServer(name, raw);
            if ("config" in server) mcp.push(server); else skipped.push(server);
        }
    }

    return {
        source: { ...bundle.source, commit },
        // The same rule as the listing: a bundle in the marketplace's own repo is
        // versioned by its folder (the repo's head moves for unrelated reasons);
        // one elsewhere by the commit it is read at.
        version: bundle.known ? treeSha(tree, dir, commit) : commit,
        manifestVersion: manifest.version ?? null,
        skills,
        mcp,
        skipped,
    };
}
