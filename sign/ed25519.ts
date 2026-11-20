// sign/ed25519.ts
// Detached Ed25519 signatures over the exact bytes of index.json (catalogue §9).
// The private key is PKCS#8 DER, base64url; the public key is the raw 32 bytes,
// base64url, as the library's verifier imports it (hub/signed-assertion.ts).

export interface IndexSignature {
    algorithm: "ed25519";
    keyId: string;
    signature: string;
}

const KEY_ID = /^[a-z0-9-]{1,64}$/;

function bytes(value: string): Uint8Array<ArrayBuffer> {
    if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("expected base64url without padding");
    const buffer = Buffer.from(value, "base64url");
    const out = new Uint8Array(new ArrayBuffer(buffer.byteLength));
    out.set(buffer);
    return out;
}

const b64url = (data: ArrayBuffer | Uint8Array) => Buffer.from(data as ArrayBuffer).toString("base64url");

export async function generateKeyPair(): Promise<{ privateKey: string; publicKey: string }> {
    const pair = await crypto.subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]) as CryptoKeyPair;
    return {
        privateKey: b64url(await crypto.subtle.exportKey("pkcs8", pair.privateKey)),
        publicKey: b64url(await crypto.subtle.exportKey("raw", pair.publicKey)),
    };
}

/** The raw public key of a private key, so a signer can check it holds the key it claims. */
export async function publicKeyOf(privateKey: string): Promise<string> {
    const key = await crypto.subtle.importKey("pkcs8", bytes(privateKey), { name: "Ed25519" }, true, ["sign"]);
    const jwk = await crypto.subtle.exportKey("jwk", key);
    if (!jwk.x) throw new Error("not an Ed25519 private key");
    return jwk.x;
}

export async function signIndex(index: Uint8Array<ArrayBuffer>, keyId: string, privateKey: string): Promise<IndexSignature> {
    if (!KEY_ID.test(keyId)) throw new Error(`key id must match ${KEY_ID}`);
    const key = await crypto.subtle.importKey("pkcs8", bytes(privateKey), { name: "Ed25519" }, false, ["sign"]);
    const signature = b64url(await crypto.subtle.sign("Ed25519", key, index));
    return { algorithm: "ed25519", keyId, signature };
}

export async function verifyIndex(index: Uint8Array<ArrayBuffer>, sig: IndexSignature, publicKey: string): Promise<boolean> {
    if (sig.algorithm !== "ed25519" || !KEY_ID.test(sig.keyId) || !/^[A-Za-z0-9_-]{86}$/.test(sig.signature)) return false;
    const key = await crypto.subtle.importKey("raw", bytes(publicKey), { name: "Ed25519" }, false, ["verify"]).catch(() => null);
    if (!key) return false;
    return crypto.subtle.verify("Ed25519", key, bytes(sig.signature), index).catch(() => false);
}
