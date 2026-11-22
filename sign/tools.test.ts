// The tool-list manifest and files through the publish gate (spec §15, A1.1).
import { afterEach, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkToolFiles, committedBlob, committedToolFiles } from "./check-index";
import { ingest } from "./ingest";

const dirs: string[] = [];
afterEach(() => { for (const d of dirs.splice(0)) rmSync(d, { recursive: true, force: true }); });
const temp = () => { const d = mkdtempSync(join(tmpdir(), "tools-gate-")); dirs.push(d); return d; };
const git = (cwd: string, ...args: string[]) => {
    const r = Bun.spawnSync(["git", "-c", "user.name=t", "-c", "user.email=t@t", ...args], { cwd });
    if (r.exitCode !== 0) throw new Error(r.stderr.toString());
    return r.stdout.toString().trim();
};
const sha = (s: string | Uint8Array) => createHash("sha256").update(s).digest("hex");

async function commit(files: Record<string, string>): Promise<{ repo: string; commit: string }> {
    const repo = temp();
    git(repo, "init", "-q");
    for (const [path, text] of Object.entries(files)) {
        mkdirSync(join(repo, path, ".."), { recursive: true });
        await Bun.write(join(repo, path), text);
    }
    git(repo, "add", "-A"); git(repo, "commit", "-qm", "build");
    return { repo, commit: git(repo, "rev-parse", "HEAD") };
}

const list = JSON.stringify({ tools: [{ name: "search", description: "Search.", inputSchema: { type: "object" } }] });
const parts = { "connectors.json": '{"mcp":[]}', "skills.json": '{"skills":[],"bundles":[]}' };

test("ingest takes the manifest and tool files named by their content, and an empty manifest without a folder", async () => {
    const withLists = await commit({ ...Object.fromEntries(Object.entries(parts).map(([k, v]) => [`out/${k}`, v])),
        "out/tools.json": JSON.stringify({ lists: { "x:a": { sha256: sha(list), bytes: list.length, tools: 1 } } }),
        [`out/tools/${sha(list)}.json`]: list });
    const dest = temp();
    const paths = await ingest(withLists.commit, dest, withLists.repo);
    expect(paths.sort()).toEqual(["connectors.json", "skills.json", `tools/${sha(list)}.json`, "tools.json"].sort());
    expect(readdirSync(join(dest, "tools"))).toEqual([`${sha(list)}.json`]);
    const empty = await commit({ "out/connectors.json": parts["connectors.json"], "out/skills.json": parts["skills.json"], "out/tools.json": '{"lists":{}}' });
    expect((await ingest(empty.commit, temp(), empty.repo)).sort()).toEqual(["connectors.json", "skills.json", "tools.json"]);
});

for (const [name, files] of [
    ["a tool file whose name is not its content", { [`out/tools/${"a".repeat(64)}.json`]: list, "out/tools.json": '{"lists":{}}' }],
    ["tool files without a manifest", { [`out/tools/${sha(list)}.json`]: list }],
    ["a tool file in a subfolder", { [`out/tools/x/${sha(list)}.json`]: list, "out/tools.json": '{"lists":{}}' }],
    ["a tool file with an uppercase name", { [`out/tools/${sha(list).toUpperCase()}.json`]: list, "out/tools.json": '{"lists":{}}' }],
    ["an oversized tool file", { [`out/tools/${sha("x".repeat(1024 * 1024 + 20))}.json`]: `{"tools":[],"pad":"${"x".repeat(1024 * 1024)}"}`, "out/tools.json": '{"lists":{}}' }],
    ["a tool file that is not a tool list", { [`out/tools/${sha('{"x":1}')}.json`]: '{"x":1}', "out/tools.json": '{"lists":{}}' }],
] as const) {
    test(`ingest refuses ${name}`, async () => {
        const c = await commit({ "out/connectors.json": parts["connectors.json"], "out/skills.json": parts["skills.json"], ...files });
        const dest = temp();
        await expect(ingest(c.commit, dest, c.repo)).rejects.toThrow();
        expect(readdirSync(dest)).toEqual([]);
    });
}

test("the committed graph: every entry present with its size and digest, no orphans, empty manifest fine", async () => {
    const good = await commit({ "tools.json": JSON.stringify({ lists: { "x:a": { sha256: sha(list), bytes: list.length, tools: 1 }, "x:b": { sha256: sha(list), bytes: list.length, tools: 1 } } }), [`tools/${sha(list)}.json`]: list });
    expect(checkToolFiles(committedBlob(good.repo, good.commit), committedToolFiles(good.repo, good.commit))).toEqual([]); // shared file
    const empty = await commit({ "tools.json": '{"lists":{}}' });
    expect(checkToolFiles(committedBlob(empty.repo, empty.commit), committedToolFiles(empty.repo, empty.commit))).toEqual([]);
    const orphan = await commit({ "tools.json": '{"lists":{}}', [`tools/${sha(list)}.json`]: list });
    expect(checkToolFiles(committedBlob(orphan.repo, orphan.commit), committedToolFiles(orphan.repo, orphan.commit)).join()).toMatch(/not referenced/);
    const missing = await commit({ "tools.json": JSON.stringify({ lists: { "x:a": { sha256: sha(list), bytes: list.length, tools: 1 } } }) });
    expect(checkToolFiles(committedBlob(missing.repo, missing.commit), committedToolFiles(missing.repo, missing.commit)).join()).toMatch(/not in the commit/);
    const wrongSize = await commit({ "tools.json": JSON.stringify({ lists: { "x:a": { sha256: sha(list), bytes: list.length + 1, tools: 1 } } }), [`tools/${sha(list)}.json`]: list });
    expect(checkToolFiles(committedBlob(wrongSize.repo, wrongSize.commit), committedToolFiles(wrongSize.repo, wrongSize.commit)).join()).toMatch(/bytes/);
});
