import { afterEach, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkParts, committedBlob } from "./check-index";

const dirs: string[] = [];
afterEach(() => { for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true }); });
const git = (cwd: string, ...args: string[]) => {
    const r = Bun.spawnSync(["git", "-c", "user.name=t", "-c", "user.email=t@t", ...args], { cwd });
    if (r.exitCode !== 0) throw new Error(r.stderr.toString());
    return r.stdout.toString().trim();
};
const sha = (b: Uint8Array | string) => createHash("sha256").update(b).digest("hex");
const RAW = "https://raw.githubusercontent.com/qlairoslabs/agents-catalog";

function repoWith(files: Record<string, string>, config: string[] = []) {
    const dir = mkdtempSync(join(tmpdir(), "check-index-")); dirs.push(dir);
    git(dir, "init", "-q");
    for (const c of config) git(dir, "config", ...c.split(" "));
    for (const [name, text] of Object.entries(files)) writeFileSync(join(dir, name), text);
    git(dir, "add", "-A"); git(dir, "commit", "-qm", "parts");
    return { dir, commit: git(dir, "rev-parse", "HEAD") };
}
const indexFor = (commit: string, files: Record<string, string>) => ({
    commit, parts: Object.entries(files).map(([name, text]) => ({ id: name.replace(".json", ""), url: `${RAW}/${commit}/${name}`, sha256: sha(text), bytes: Buffer.byteLength(text) })),
});

const parts = { "connectors.json": '{"mcp":[]}\n', "skills.json": '{"skills":[],"bundles":[]}\n' };

test("an index matching the committed blobs passes", () => {
    const { dir, commit } = repoWith(parts);
    expect(checkParts(indexFor(commit, parts), commit, committedBlob(dir, commit))).toEqual([]);
});

test("a digest of working-tree bytes that git normalized at add is refused", () => {
    const crlf = { "connectors.json": '{"mcp":[]}\r\n', "skills.json": '{"skills":[],"bundles":[]}\r\n' };
    const { dir, commit } = repoWith(crlf, ["core.autocrlf true"]);
    const problems = checkParts(indexFor(commit, crlf), commit, committedBlob(dir, commit));
    expect(problems.some(p => /does not match the committed blob|bytes/.test(p))).toBe(true);
});

test("a wrong digest, a wrong size, a foreign URL, a missing or extra part, or another commit is refused", () => {
    const { dir, commit } = repoWith(parts);
    const blob = committedBlob(dir, commit);
    const good = indexFor(commit, parts);
    expect(checkParts({ ...good, parts: good.parts.map(p => ({ ...p, sha256: "0".repeat(64) })) }, commit, blob)).not.toEqual([]);
    expect(checkParts({ ...good, parts: good.parts.map(p => ({ ...p, bytes: p.bytes + 1 })) }, commit, blob)).not.toEqual([]);
    expect(checkParts({ ...good, parts: good.parts.map(p => ({ ...p, url: p.url.replace(commit, "f".repeat(40)) })) }, commit, blob)).not.toEqual([]);
    expect(checkParts({ ...good, parts: good.parts.map(p => ({ ...p, url: p.url.replace("/connectors.json", "/sub/connectors.json") })) }, commit, blob)).not.toEqual([]);
    expect(checkParts({ ...good, parts: good.parts.slice(0, 1) }, commit, blob)).not.toEqual([]);
    expect(checkParts({ ...good, parts: [...good.parts, { ...good.parts[0]!, id: "extra" }] }, commit, blob)).not.toEqual([]);
    expect(checkParts({ ...good, commit: "a".repeat(40) }, commit, blob)).not.toEqual([]);
});
