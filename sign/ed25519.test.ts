import { expect, test } from "bun:test";
import { mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateKeyPair, publicKeyOf, signIndex, verifyIndex } from "./ed25519";

const enc = (text: string) => new Uint8Array(new TextEncoder().encode(text));
const index = enc('{"schema":1,"sequence":1}\n');

test("a signature verifies over the exact bytes and nothing else", async () => {
    const { privateKey, publicKey } = await generateKeyPair();
    const sig = await signIndex(index, "catalog-2026-a", privateKey);
    expect(sig.algorithm).toBe("ed25519");
    expect(sig.signature).toMatch(/^[A-Za-z0-9_-]{86}$/);
    expect(await verifyIndex(index, sig, publicKey)).toBe(true);
    expect(await verifyIndex(enc('{"schema":1,"sequence":1} \n'), sig, publicKey)).toBe(false);
    expect(await verifyIndex(enc('{"schema":1,"sequence":2}\n'), sig, publicKey)).toBe(false);
});

test("another key, a changed key id format or a malformed signature fails", async () => {
    const a = await generateKeyPair(), b = await generateKeyPair();
    const sig = await signIndex(index, "catalog-2026-a", a.privateKey);
    expect(await verifyIndex(index, sig, b.publicKey)).toBe(false);
    expect(await verifyIndex(index, { ...sig, keyId: "Bad Id" }, a.publicKey)).toBe(false);
    expect(await verifyIndex(index, { ...sig, signature: sig.signature + "=" }, a.publicKey)).toBe(false);
    expect(await verifyIndex(index, sig, "not-a-key")).toBe(false);
    await expect(signIndex(index, "Bad Id", a.privateKey)).rejects.toThrow();
});

test("the public half is recovered from the private key", async () => {
    const { privateKey, publicKey } = await generateKeyPair();
    expect(await publicKeyOf(privateKey)).toBe(publicKey);
});

test("the library's verifier accepts what this signer writes", async () => {
    // Mirrors agents-core's importEd25519Key: raw public key, base64url.
    const { privateKey, publicKey } = await generateKeyPair();
    const sig = await signIndex(index, "catalog-2026-a", privateKey);
    const key = await crypto.subtle.importKey("raw", new Uint8Array(Buffer.from(publicKey, "base64url")), { name: "Ed25519" }, false, ["verify"]);
    expect(await crypto.subtle.verify("Ed25519", key, new Uint8Array(Buffer.from(sig.signature, "base64url")), index)).toBe(true);
});

test("the CLI signs only with the key the library expects, and keygen never overwrites", async () => {
    const dir = mkdtempSync(join(tmpdir(), "catalog-sign-"));
    try {
        const keyFile = join(dir, "key");
        const gen = Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), "keygen", keyFile]);
        expect(gen.exitCode).toBe(0);
        const publicKey = gen.stdout.toString().trim();
        expect(statSync(keyFile).mode & 0o777).toBe(0o600);
        expect(Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), "keygen", keyFile]).exitCode).not.toBe(0);
        await Bun.write(join(dir, "index.json"), index);
        const privateKey = (await Bun.file(keyFile).text()).trim();
        const other = await generateKeyPair();
        const env = { ...process.env, CATALOG_SIGNING_KEY: privateKey, CATALOG_SIGNING_KEY_ID: "catalog-2026-a" };
        const wrong = Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), "sign", dir], { env: { ...env, CATALOG_PUBLIC_KEY: other.publicKey } });
        expect(wrong.exitCode).not.toBe(0);
        const ok = Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), "sign", dir], { env: { ...env, CATALOG_PUBLIC_KEY: publicKey } });
        expect(ok.exitCode).toBe(0);
        expect(ok.stdout.toString()).not.toContain(privateKey);
        const verify = Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), "verify", dir, publicKey]);
        expect(verify.exitCode).toBe(0);
    } finally { rmSync(dir, { recursive: true, force: true }); }
});
