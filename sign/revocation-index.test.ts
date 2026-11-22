import { expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import index from "../examples/index-taxonomy.json";

test("revocation-index advances the sequence and preserves published references", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-revocation-index-"));
    try {
        const input = join(root, "published.json");
        const run = (out: string, revoke = "catalog-2026-a") => Bun.spawnSync([
            process.execPath, "--no-env-file", join(import.meta.dir, "cli.ts"), "revocation-index",
            "--out", out, "--from", input, "--revoke", revoke,
        ]);
        const before = Date.now();
        const future = Math.floor(before / 1000) + 120;
        for (const sequence of [index.sequence, future]) {
            const previous = { ...index, sequence, revokes: sequence === future ? ["catalog-retired", "catalog-2026-a"] : ["catalog-retired"] };
            await Bun.write(input, JSON.stringify(previous));
            const out = join(root, String(sequence));
            const runResult = run(out);
            expect(runResult.stderr.toString()).toBe("");
            expect(runResult.exitCode).toBe(0);
            const file = Bun.file(join(out, "index.json"));
            const next = await file.json();
            const generated = Date.parse(next.generatedAt);
            expect(generated).toBeGreaterThanOrEqual(before);
            expect(generated).toBeLessThanOrEqual(Date.now());
            expect(Date.parse(next.expires) - generated).toBe(14 * 86_400_000);
            expect(next).toEqual({
                ...previous, generatedAt: next.generatedAt, expires: next.expires,
                revokes: ["catalog-retired", "catalog-2026-a"],
                sequence: Math.max(Math.floor(generated / 1000), sequence + 1),
            });
            expect(run(out).exitCode).not.toBe(0);
            expect(await file.json()).toEqual(next);
        }
        const out = join(root, "invalid");
        expect(run(out, "catalog-2026-b").exitCode).not.toBe(0);
        await Bun.write(input, JSON.stringify({ ...index, commit: "malformed" }));
        expect(run(out).exitCode).not.toBe(0);
        expect(await Bun.file(join(out, "index.json")).exists()).toBe(false);
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});
