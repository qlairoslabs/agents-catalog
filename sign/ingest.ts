// sign/ingest.ts
// Copies a reviewed build's parts out of git into the folder that will be
// published, reading git objects only: nothing from the build commit runs.
//
//   bun sign/ingest.ts <build-sha> <dest>
//
// Only regular files on an exact allowlist under out/ are taken, each checked
// for size and JSON shape. Anything else in out/ (another file, a folder, a
// link, a submodule, an index or signature) refuses the whole build.

import { createHash } from "node:crypto";
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

// The library's ingestion limits (agents-core catalog/adapters/agents-catalog.ts):
// a build a hub would refuse is not published.
export const MAX_PART_BYTES = 24 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 64 * 1024 * 1024;
// Spec §15 (A1.1): the tool-list manifest and one file per tool list, named by
// the sha256 of its bytes. Tool lists are read lazily, so they have their own
// limits and their own total, apart from the parts a hub loads at sync.
export const MAX_MANIFEST_BYTES = 2 * 1024 * 1024;
export const MAX_TOOL_FILE_BYTES = 1024 * 1024;
export const MAX_TOOL_FILES = 50_000;
export const MAX_TOOL_FILES_TOTAL = 256 * 1024 * 1024;
const PARTS = new Set(["connectors.json", "skills.json", "tools.json"]);
const TOOL_FILE = /^tools\/[0-9a-f]{64}\.json$/;
// Annotations are not yet referenced by the index R1 writes, so they are refused
// until the index signs their bytes too.

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
        const tool = TOOL_FILE.test(path);
        if (!PARTS.has(path) && !tool) throw new Error(`not an allowed part: ${entry.path}`);
        const max = tool ? MAX_TOOL_FILE_BYTES : path === "tools.json" ? MAX_MANIFEST_BYTES : MAX_PART_BYTES;
        if (!(entry.size > 0 && entry.size <= max)) throw new Error(`size out of range: ${entry.path} (${entry.size})`);
        paths.push(path);
    }
    if (!paths.includes("connectors.json") || !paths.includes("skills.json")) throw new Error("the build lacks connectors.json or skills.json");
    const toolFiles = entries.filter(entry => TOOL_FILE.test(entry.path.slice(4)));
    if (toolFiles.length && !paths.includes("tools.json")) throw new Error("tool-list files without the manifest tools.json");
    if (toolFiles.length > MAX_TOOL_FILES) throw new Error(`too many tool-list files (${toolFiles.length})`);
    const partBytes = entries.filter(entry => PARTS.has(entry.path.slice(4))).reduce((sum, entry) => sum + entry.size, 0);
    if (partBytes > MAX_TOTAL_BYTES) throw new Error("the parts together exceed the library's limit");
    if (toolFiles.reduce((sum, entry) => sum + entry.size, 0) > MAX_TOOL_FILES_TOTAL) throw new Error("the tool-list files together exceed their limit");
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
    // Everything is read and checked first; nothing is written unless all of it passes.
    const files: { path: string; bytes: Buffer }[] = [];
    for (const entry of entries) {
        const path = entry.path.slice(4);
        const bytes = git(["cat-file", "blob", entry.object], repo);
        if (bytes.byteLength !== entry.size) throw new Error(`size changed while reading: ${entry.path}`);
        // Fatal decoding: malformed UTF-8 refuses the build instead of being
        // replaced, so the bytes hashed and the text parsed are the same.
        const parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes));
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(`not a JSON object: ${entry.path}`);
        if (TOOL_FILE.test(path)) {
            // Its name is its content: a renamed or edited file is refused here.
            if (createHash("sha256").update(bytes).digest("hex") !== path.slice(6, 70)) throw new Error(`name does not match content: ${entry.path}`);
            if (!Array.isArray((parsed as any).tools)) throw new Error(`not a tool list: ${entry.path}`);
        }
        files.push({ path, bytes });
    }
    for (const { path, bytes } of files) {
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
