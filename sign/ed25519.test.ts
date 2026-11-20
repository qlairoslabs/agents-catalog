import { expect, test } from "bun:test";
import { existsSync, mkdtempSync, rmSync, statSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { generateKeyPair, publicKeyOf, signIndex, verifyIndex } from "./ed25519";
import { SHIPPED_KEYS } from "./keys";

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

test("keygen creates the key exclusively with mode 600, never over a file or through a link", async () => {
    const dir = mkdtempSync(join(tmpdir(), "catalog-keygen-"));
    try {
        const keyFile = join(dir, "key");
        const gen = Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), "keygen", keyFile]);
        expect(gen.exitCode).toBe(0);
        const publicKey = gen.stdout.toString().trim();
        expect(statSync(keyFile).mode & 0o777).toBe(0o600);
        expect(await publicKeyOf((await Bun.file(keyFile).text()).trim())).toBe(publicKey);
        expect(gen.stdout.toString()).not.toContain((await Bun.file(keyFile).text()).trim());
        expect(Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), "keygen", keyFile]).exitCode).not.toBe(0);
        const link = join(dir, "link");
        symlinkSync(join(dir, "target"), link);
        expect(Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), "keygen", link]).exitCode).not.toBe(0);
        expect(existsSync(join(dir, "target"))).toBe(false);
    } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("the CLI signs only with the shipped current key, and verifies only shipped key ids", async () => {
    const dir = mkdtempSync(join(tmpdir(), "catalog-sign-"));
    try {
        await Bun.write(join(dir, "index.json"), index);
        const other = await generateKeyPair();
        const cli = (args: string[], env: Record<string, string> = {}) =>
            Bun.spawnSync(["bun", join(import.meta.dir, "cli.ts"), ...args], { env: { ...process.env, ...env } });
        // An unshipped key, even self-consistent, is refused.
        expect(cli(["sign", dir], { CATALOG_SIGNING_KEY: other.privateKey, CATALOG_SIGNING_KEY_ID: SHIPPED_KEYS.current.kid, CATALOG_PUBLIC_KEY: other.publicKey }).exitCode).not.toBe(0);
        // The shipped public key with a private key that is not its pair is refused.
        expect(cli(["sign", dir], { CATALOG_SIGNING_KEY: other.privateKey, CATALOG_SIGNING_KEY_ID: SHIPPED_KEYS.current.kid, CATALOG_PUBLIC_KEY: SHIPPED_KEYS.current.key }).exitCode).not.toBe(0);
        // The next key's id is not used for routine signing.
        expect(cli(["sign", dir], { CATALOG_SIGNING_KEY: other.privateKey, CATALOG_SIGNING_KEY_ID: SHIPPED_KEYS.next.kid, CATALOG_PUBLIC_KEY: SHIPPED_KEYS.next.key }).exitCode).not.toBe(0);
        expect(existsSync(join(dir, "index.json.sig"))).toBe(false);
        // A valid signature by an unshipped key id does not verify.
        await Bun.write(join(dir, "index.json.sig"), JSON.stringify(await signIndex(index, "catalog-2099-z", other.privateKey)));
        expect(cli(["verify", dir]).exitCode).not.toBe(0);
        // A shipped id with a signature from another key does not verify.
        await Bun.write(join(dir, "index.json.sig"), JSON.stringify(await signIndex(index, SHIPPED_KEYS.current.kid, other.privateKey)));
        expect(cli(["verify", dir]).exitCode).not.toBe(0);
    } finally { rmSync(dir, { recursive: true, force: true }); }
});
