// src/catalog/github.ts
// Reading marketplace repositories on GitHub: a commit, a file tree, raw files.
//
// The API allows 60 unauthenticated requests an hour, so this is used
// sparingly: a commit and a tree per marketplace per sync, a tree per bundle
// when one is opened. File contents come from raw.githubusercontent.com, which
// that limit does not count. A `GITHUB_TOKEN` in the hub's own environment (the
// owner's, not an agent's) raises the limit. Everything goes through the
// outbound guard, like every other connection the hub makes.

import { guardedFetch, type OAuthIo } from "./network";

export interface RepoRef {
    owner: string;
    repo: string;
}

export interface TreeEntry {
    path: string;
    type: "blob" | "tree";
    sha: string;
    size?: number;
}

export class GitHubError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GitHubError";
    }
}

/** `github.com/o/r`, `https://github.com/o/r.git`, `https://github.com/o/r/…` */
export function parseGitHubRepo(value: string): RepoRef | null {
    const match = value.replace(/^https?:\/\//, "").replace(/\.git$/, "").match(/^github\.com\/([\w.-]+)\/([\w.-]+)/);
    return match ? { owner: match[1]!, repo: match[2]! } : null;
}

function apiHeaders(): Record<string, string> {
    const headers: Record<string, string> = { "user-agent": "agents-hub", accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    return headers;
}

async function api<T>(path: string, io: OAuthIo): Promise<T> {
    const response = await guardedFetch(`https://api.github.com${path}`, { headers: apiHeaders() }, io);
    if (response.status === 403 || response.status === 429) {
        throw new GitHubError(response.headers.get("x-ratelimit-remaining") === "0"
            ? "GitHub's hourly limit is used up; a GITHUB_TOKEN for the hub raises it"
            : `GitHub refused (${response.status})`);
    }
    if (!response.ok) throw new GitHubError(`GitHub answered ${response.status} for ${path}`);
    return await response.json() as T;
}

/** The commit a ref points at (default: the default branch's head). */
export async function resolveCommit(ref: RepoRef, rev = "HEAD", io: OAuthIo = {}): Promise<string> {
    const body = await api<{ sha?: string }>(`/repos/${ref.owner}/${ref.repo}/commits/${encodeURIComponent(rev)}`, io);
    if (!body.sha) throw new GitHubError(`no commit for ${ref.owner}/${ref.repo}@${rev}`);
    return body.sha;
}

/** Every path in the repository at a commit. */
export async function repoTree(ref: RepoRef, commit: string, io: OAuthIo = {}): Promise<TreeEntry[]> {
    const body = await api<{ tree?: TreeEntry[]; truncated?: boolean }>(`/repos/${ref.owner}/${ref.repo}/git/trees/${commit}?recursive=1`, io);
    if (body.truncated) throw new GitHubError(`${ref.owner}/${ref.repo} is too large to list in one request`);
    return body.tree ?? [];
}

export function rawUrl(ref: RepoRef, commit: string, path: string): string {
    return `https://raw.githubusercontent.com/${ref.owner}/${ref.repo}/${commit}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

/** Where a person can read a file at exactly the pinned commit. */
export function blobUrl(ref: RepoRef, commit: string, path: string): string {
    return `https://github.com/${ref.owner}/${ref.repo}/blob/${commit}/${path}`;
}

/** A publisher's avatar, the one icon a marketplace listing always implies:
 *  its entries carry no icon of their own, and the account that publishes the
 *  repository is who the card is naming. Loaded by the browser from github.com. */
export function avatarUrl(owner: string): string {
    return `https://github.com/${encodeURIComponent(owner)}.png?size=80`;
}

export async function rawFile(ref: RepoRef, commit: string, path: string, io: OAuthIo = {}, maxBytes = 1024 * 1024): Promise<Uint8Array> {
    const response = await guardedFetch(rawUrl(ref, commit, path), { headers: { "user-agent": "agents-hub" } }, io);
    if (!response.ok) throw new GitHubError(`${path} answered ${response.status}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength > maxBytes) throw new GitHubError(`${path} is over ${Math.round(maxBytes / 1024)} KB`);
    return bytes;
}

export async function rawText(ref: RepoRef, commit: string, path: string, io: OAuthIo = {}): Promise<string> {
    return new TextDecoder().decode(await rawFile(ref, commit, path, io));
}
