// sign/check-index.ts
// Checks a written index.json before it is signed: valid by the build's own
// index validator, naming the parts commit, and describing exactly the bytes
// GitHub will serve. Each part is read back from the commit's blob, not the
// working tree, so a line-ending or filter change at `git add` cannot slip a
// digest past the signature.
//
//   bun sign/check-index.ts <published-checkout> <parts-commit>

import { createHash } from "node:crypto";
import { join } from "node:path";
import { validateIndexBytes } from "../validate";

export const PART_IDS = ["connectors", "skills"] as const;
/** Present when the build publishes tool lists (spec §15, A1.1). */
export const TOOLS_PART = "tools";
const RAW = "https://raw.githubusercontent.com/qlairoslabs/agents-catalog";

export interface IndexPart { id: string; url: string; sha256: string; bytes: number }

/** Problems with an index's parts against the committed blobs; empty when it matches. */
export function checkParts(index: { commit?: unknown; parts?: IndexPart[] }, commit: string, blob: (path: string) => Uint8Array | null): string[] {
    const problems: string[] = [];
    if (index.commit !== commit) problems.push(`index names commit ${String(index.commit)}, expected ${commit}`);
    const parts = Array.isArray(index.parts) ? index.parts : [];
    const ids = parts.map(part => part.id).sort();
    // The tools part is required exactly when the commit has a manifest.
    const expected = [...PART_IDS, ...(blob("tools.json") ? [TOOLS_PART] : [])].sort();
    if (ids.join(",") !== expected.join(",")) problems.push(`index parts are ${ids.join(", ") || "none"}, expected exactly ${expected.join(", ")}`);
    for (const part of parts) {
        const path = `${part.id}.json`;
        if (part.url !== `${RAW}/${commit}/${path}`) problems.push(`${part.id}: url ${part.url} is not the root file of ${commit}`);
        const bytes = blob(path);
        if (!bytes) { problems.push(`${part.id}: no ${path} in commit ${commit}`); continue; }
        if (part.bytes !== bytes.byteLength) problems.push(`${part.id}: index says ${part.bytes} bytes, the commit has ${bytes.byteLength}`);
        const digest = createHash("sha256").update(bytes).digest("hex");
        if (part.sha256 !== digest) problems.push(`${part.id}: index sha256 does not match the committed blob`);
    }
    return problems;
}

export interface ToolListEntry { sha256?: unknown; bytes?: unknown; tools?: unknown }

/** Problems with the committed tool-list files against the committed manifest:
 *  every entry's file exists with that size and digest, and every file under
 *  tools/ is referenced. Empty when there is no manifest. */
export function checkToolFiles(blob: (path: string) => Uint8Array | null, files: readonly string[]): string[] {
    const manifestBytes = blob("tools.json");
    if (!manifestBytes) return files.length ? [`${files.length} tool-list files but no tools.json`] : [];
    const problems: string[] = [];
    let manifest: any;
    try { manifest = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(manifestBytes)); }
    catch { return ["tools.json is not valid JSON"]; }
    const lists = manifest?.lists;
    if (!lists || typeof lists !== "object" || Array.isArray(lists)) return ["tools.json has no lists object"];
    const referenced = new Set<string>();
    for (const [id, entry] of Object.entries(lists) as [string, ToolListEntry][]) {
        if (typeof entry?.sha256 !== "string" || !/^[0-9a-f]{64}$/.test(entry.sha256)) { problems.push(`${id}: bad sha256`); continue; }
        const path = `tools/${entry.sha256}.json`;
        referenced.add(path);
        const bytes = blob(path);
        if (!bytes) { problems.push(`${id}: ${path} is not in the commit`); continue; }
        if (entry.bytes !== bytes.byteLength) problems.push(`${id}: manifest says ${String(entry.bytes)} bytes, the commit has ${bytes.byteLength}`);
        if (createHash("sha256").update(bytes).digest("hex") !== entry.sha256) problems.push(`${id}: ${path} does not match its digest`);
    }
    for (const file of files) if (!referenced.has(file)) problems.push(`${file} is not referenced by tools.json`);
    return problems;
}

/** The files under tools/ in a commit. */
export function committedToolFiles(repo: string, commit: string): string[] {
    const result = Bun.spawnSync(["git", "-C", repo, "ls-tree", "-r", "--name-only", "-z", commit, "--", "tools/"], { stdout: "pipe", stderr: "pipe" });
    if (result.exitCode !== 0) throw new Error(`git ls-tree failed: ${result.stderr.toString().trim()}`);
    return result.stdout.toString().split("\0").filter(Boolean);
}

export function committedBlob(repo: string, commit: string) {
    return (path: string): Uint8Array | null => {
        const result = Bun.spawnSync(["git", "-C", repo, "cat-file", "blob", `${commit}:${path}`], { stdout: "pipe", stderr: "ignore" });
        return result.exitCode === 0 ? new Uint8Array(result.stdout) : null;
    };
}

if (import.meta.main) {
    const [dir, commit] = process.argv.slice(2);
    if (!dir || !commit || !/^[0-9a-f]{40}$/.test(commit)) { console.error("usage: bun sign/check-index.ts <published-checkout> <parts-commit>"); process.exit(2); }
    const index = validateIndexBytes(new Uint8Array(await Bun.file(join(dir, "index.json")).arrayBuffer())) as any;
    const blob = committedBlob(dir, commit);
    const problems = [...checkParts(index, commit, blob), ...checkToolFiles(blob, committedToolFiles(dir, commit))];
    if (problems.length) { console.error(`index refused:\n- ${problems.join("\n- ")}`); process.exit(1); }
    console.log(`index valid: sequence ${index.sequence}, parts match commit ${commit}`);
}
