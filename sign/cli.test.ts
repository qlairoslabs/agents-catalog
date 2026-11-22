import { expect, test } from "bun:test";
import { chmod, mkdtemp, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateKeyPair, verifyIndex } from "./ed25519";

test("offline signer requires the shipped next key and a clean environment", async () => {
    const root = await mkdtemp(join(tmpdir(), "catalog-sign-next-"));
    try {
        const current = await generateKeyPair();
        const next = await generateKeyPair();
        const source = import.meta.dir;
        for (const name of ["cli.ts", "ed25519.ts"]) {
            await Bun.write(join(root, name), Bun.file(join(source, name)));
        }
        await Bun.write(join(root, "keys.ts"), `export const SHIPPED_KEYS = ${JSON.stringify({
            current: { kid: "catalog-2026-a", key: current.publicKey },
            next: { kid: "catalog-2026-b", key: next.publicKey },
        })}; export function shippedKey() { return null; }`);
        await Bun.write(join(root, "index.json"), '{"sequence":123}\n');
        await Bun.write(join(root, "current.key"), current.privateKey);
        await Bun.write(join(root, "next.key"), next.privateKey + "\n");

        const run = (file: string, env: Record<string, string> = {}) =>
            Bun.spawnSync([process.execPath, "--no-env-file", "cli.ts", "sign", "--next", file], { cwd: root, env });
        const dirty = run("missing.key", { GH_TOKEN: "credential-fixture" });
        expect(dirty.exitCode).not.toBe(0);
        expect(dirty.stderr.toString()).toContain("requires a clean environment");
        expect(dirty.stderr.toString()).not.toContain("credential-fixture");
        await chmod(join(root, "current.key"), 0o600);
        await chmod(join(root, "next.key"), 0o644);
        const shared = run("next.key");
        expect(shared.exitCode).not.toBe(0);
        expect(shared.stderr.toString()).toContain("owner-only regular file");
        await chmod(join(root, "next.key"), 0o400);
        await symlink("next.key", join(root, "key-link"));
        expect(run("key-link").exitCode).not.toBe(0);
        expect(run(".").exitCode).not.toBe(0);
        await Bun.write(join(root, "oversized.key"), "x".repeat(1025));
        await chmod(join(root, "oversized.key"), 0o600);
        expect(run("oversized.key").exitCode).not.toBe(0);

        const wrong = run("current.key");
        expect(wrong.exitCode).not.toBe(0);
        expect(wrong.stderr.toString()).toContain("does not match the shipped next key");
        expect(await Bun.file(join(root, "index.json.sig")).exists()).toBe(false);

        expect(run("next.key").exitCode).toBe(0); // Read-only, owner-only file.
        await chmod(join(root, "next.key"), 0o600);
        const signed = run("next.key");
        expect(signed.exitCode).toBe(0);
        const index = new Uint8Array(await Bun.file(join(root, "index.json")).arrayBuffer());
        const signature = await Bun.file(join(root, "index.json.sig")).json();
        expect(signature.keyId).toBe("catalog-2026-b");
        expect(await verifyIndex(index, signature, next.publicKey)).toBe(true);
        expect(signed.stdout.toString()).not.toContain(next.privateKey);
    } finally {
        await rm(root, { recursive: true, force: true });
    }
});
