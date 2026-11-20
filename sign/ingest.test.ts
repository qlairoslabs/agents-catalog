import { afterEach, expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ingest } from "./ingest";

const dirs: string[] = [];
afterEach(() => { for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true }); });
const temp = () => { const dir = mkdtempSync(join(tmpdir(), "catalog-ingest-")); dirs.push(dir); return dir; };

function run(cwd: string, ...args: string[]) {
    const result = Bun.spawnSync(["git", "-c", "user.name=t", "-c", "user.email=t@t", ...args], { cwd });
    if (result.exitCode !== 0) throw new Error(result.stderr.toString());
    return result.stdout.toString().trim();
}

/** A repository whose one commit holds the given files (a value of null is a link). */
async function build(files: Record<string, string | null>): Promise<{ repo: string; sha: string }> {
    const repo = temp();
    run(repo, "init", "-q");
    for (const [path, content] of Object.entries(files)) {
        mkdirSync(join(repo, path, ".."), { recursive: true });
        if (content === null) symlinkSync("/etc/passwd", join(repo, path));
        else await Bun.write(join(repo, path), content);
    }
    run(repo, "add", "-A");
    run(repo, "commit", "-q", "-m", "build");
    return { repo, sha: run(repo, "rev-parse", "HEAD") };
}

const good = { "out/connectors.json": '{"mcp":[]}', "out/skills.json": '{"skills":[],"bundles":[]}' };

test("a build with exactly the allowed parts is copied byte for byte", async () => {
    const { repo, sha } = await build({ ...good, "out/annotations/composio.json": '{"a":1}', "README.md": "ignored, outside out/" });
    const dest = temp();
    const paths = await ingest(sha, dest, repo);
    expect(paths.sort()).toEqual(["annotations/composio.json", "connectors.json", "skills.json"]);
    expect(await Bun.file(join(dest, "connectors.json")).text()).toBe('{"mcp":[]}');
    expect(existsSync(join(dest, "README.md"))).toBe(false);
});

for (const [name, extra] of [
    ["an index", { "out/index.json": "{}" }],
    ["a signature", { "out/index.json.sig": "{}" }],
    ["git control files", { "out/.gitattributes": "* filter=x" }],
    ["a git module list", { "out/.gitmodules": "[submodule]" }],
    ["a workflow", { "out/.github/workflows/x.yml": "on: push" }],
    ["an unknown file", { "out/extra.json": "{}" }],
    ["a nested annotation", { "out/annotations/x/y.json": "{}" }],
    ["a link", { "out/annotations/link.json": null }],
] as const) {
    test(`a build carrying ${name} is refused whole`, async () => {
        const { repo, sha } = await build({ ...good, ...extra });
        const dest = temp();
        await expect(ingest(sha, dest, repo)).rejects.toThrow();
        expect(readdirSync(dest)).toEqual([]);
    });
}

test("missing parts, invalid JSON, a short SHA and a non-empty destination are refused", async () => {
    const missing = await build({ "out/connectors.json": '{"mcp":[]}' });
    await expect(ingest(missing.sha, temp(), missing.repo)).rejects.toThrow(/lacks/);
    const invalid = await build({ ...good, "out/skills.json": "not json" });
    await expect(ingest(invalid.sha, temp(), invalid.repo)).rejects.toThrow();
    const array = await build({ ...good, "out/skills.json": "[]" });
    await expect(ingest(array.sha, temp(), array.repo)).rejects.toThrow(/object/);
    const ok = await build(good);
    await expect(ingest(ok.sha.slice(0, 12), temp(), ok.repo)).rejects.toThrow(/full commit/);
    const dirty = temp();
    await Bun.write(join(dirty, "stale.json"), "{}");
    await expect(ingest(ok.sha, dirty, ok.repo)).rejects.toThrow(/not empty/);
});
