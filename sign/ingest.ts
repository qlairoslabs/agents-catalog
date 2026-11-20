// sign/ingest.ts
// Copies a reviewed build's parts out of git into the folder that will be
// published, reading git objects only: nothing from the build commit runs.
//
//   bun sign/ingest.ts <build-sha> <dest>
//
// Only regular files on an exact allowlist under out/ are taken, each checked
// for size and JSON shape. Anything else in out/ (another file, a folder, a
// link, a submodule, an index or signature) refuses the whole build.

import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

// The library's ingestion limits (agents-core catalog/adapters/agents-catalog.ts):
// a build a hub would refuse is not published.
export const MAX_PART_BYTES = 24 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 64 * 1024 * 1024;
// Annotations are not yet referenced by the index R1 writes, so they are refused
// until the index signs their bytes too.
const ALLOWED = [/^connectors\.json$/, /^skills\.json$/];

export interface TreeEntry { mode: string; type: string; object: string; size: number; path: string }

/** Parses `git ls-tree -r -l -z <sha> -- out/`. */
export function parseTree(output: string): TreeEntry[] {
    return output.split("\0").filter(Boolean).map(line => {
        const tab = line.indexOf("\t");
        const [mode, type, object, size] = line.slice(0, tab).trim().split(/\s+/);
        return { mode: mode!, type: type!, object: object!, size: Number(size), path: line.slice(tab + 1) };
    });
}

/** The relative paths to publish, or an error naming the first thing refused. */
export function checkTree(entries: readonly TreeEntry[]): string[] {
    const paths: string[] = [];
    for (const entry of entries) {
        if (!entry.path.startsWith("out/")) throw new Error(`outside out/: ${entry.path}`);
        const path = entry.path.slice(4);
        if (entry.type !== "blob" || entry.mode !== "100644") throw new Error(`not a regular file: ${entry.path} (${entry.mode} ${entry.type})`);
        if (!ALLOWED.some(rule => rule.test(path))) throw new Error(`not an allowed part: ${entry.path}`);
        if (!(entry.size > 0 && entry.size <= MAX_PART_BYTES)) throw new Error(`size out of range: ${entry.path} (${entry.size})`);
        paths.push(path);
    }
    if (!paths.includes("connectors.json") || !paths.includes("skills.json")) throw new Error("the build lacks connectors.json or skills.json");
    if (entries.reduce((sum, entry) => sum + entry.size, 0) > MAX_TOTAL_BYTES) throw new Error("the parts together exceed the library's limit");
    return paths;
}

function git(args: string[], cwd: string): Buffer {
    const result = Bun.spawnSync(["git", ...args], { cwd, stdout: "pipe", stderr: "pipe" });
    if (result.exitCode !== 0) throw new Error(`git ${args[0]} failed: ${result.stderr.toString().trim()}`);
    return result.stdout;
}

export async function ingest(sha: string, dest: string, repo = process.cwd()): Promise<string[]> {
    if (!/^[0-9a-f]{40}$/.test(sha)) throw new Error("build must be a full commit SHA");
    if (git(["cat-file", "-t", sha], repo).toString().trim() !== "commit") throw new Error("not a commit");
    const entries = parseTree(git(["ls-tree", "-r", "-l", "-z", sha, "--", "out/"], repo).toString());
    const paths = checkTree(entries);
    const leftovers = readdirSync(dest).filter(name => name !== ".git");
    if (leftovers.length) throw new Error(`destination is not empty: ${leftovers.join(", ")}`);
    for (const entry of entries) {
        const path = entry.path.slice(4);
        const bytes = git(["cat-file", "blob", entry.object], repo);
        if (bytes.byteLength !== entry.size) throw new Error(`size changed while reading: ${entry.path}`);
        // Fatal decoding: malformed UTF-8 refuses the build instead of being
        // replaced, so the bytes hashed and the text parsed are the same.
        const parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes));
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(`not a JSON object: ${entry.path}`);
        if (path.includes("/")) mkdirSync(join(dest, path.slice(0, path.lastIndexOf("/"))), { recursive: true });
        await Bun.write(join(dest, path), bytes);
    }
    return paths;
}

if (import.meta.main) {
    const [sha, dest] = process.argv.slice(2);
    if (!sha || !dest) { console.error("usage: bun sign/ingest.ts <build-sha> <dest>"); process.exit(2); }
    const paths = await ingest(sha, dest);
    console.log(`ingested ${paths.length} parts: ${paths.join(", ")}`);
}
