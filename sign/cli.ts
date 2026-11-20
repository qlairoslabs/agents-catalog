// sign/cli.ts
//
//   bun sign/cli.ts keygen <private-key-file>
//       Writes a new private key (mode 600) and prints only its public key.
//       Keep the file offline, or pipe it straight into a secret store.
//   bun sign/cli.ts sign <dir>
//       Signs <dir>/index.json into <dir>/index.json.sig with the key in
//       CATALOG_SIGNING_KEY (id CATALOG_SIGNING_KEY_ID). Refuses unless the id
//       and the key's public half are the shipped current key (keys.ts), equal
//       to CATALOG_PUBLIC_KEY too, and the signature verifies.
//   bun sign/cli.ts verify <dir>
//       Verifies against the shipped key the signature names; any other id fails.

import { closeSync, constants, openSync, writeSync } from "node:fs";
import { join } from "node:path";
import { generateKeyPair, publicKeyOf, signIndex, verifyIndex, type IndexSignature } from "./ed25519";
import { SHIPPED_KEYS, shippedKey } from "./keys";

async function readBytes(path: string): Promise<Uint8Array<ArrayBuffer>> {
    const data = await Bun.file(path).arrayBuffer();
    return new Uint8Array(data);
}

function required(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`${name} is not set`);
    return value.trim();
}

const [command, ...args] = process.argv.slice(2);

if (command === "keygen") {
    const file = args[0];
    if (!file) throw new Error("usage: keygen <private-key-file>");
    // Created exclusively, 0600 from the first open, never through a link.
    const fd = openSync(file, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW, 0o600);
    try {
        const { privateKey, publicKey } = await generateKeyPair();
        writeSync(fd, privateKey + "\n");
        console.log(publicKey);
    } finally { closeSync(fd); }
} else if (command === "sign") {
    const dir = args[0];
    if (!dir) throw new Error("usage: sign <dir>");
    const privateKey = required("CATALOG_SIGNING_KEY");
    const keyId = required("CATALOG_SIGNING_KEY_ID");
    const expected = required("CATALOG_PUBLIC_KEY");
    if (keyId !== SHIPPED_KEYS.current.kid || expected !== SHIPPED_KEYS.current.key) {
        throw new Error("the configured key id or public key is not the shipped current key");
    }
    if (await publicKeyOf(privateKey) !== expected) throw new Error("the signing key does not match the shipped current key");
    const index = await readBytes(join(dir, "index.json"));
    const sig = await signIndex(index, keyId, privateKey);
    if (!await verifyIndex(index, sig, expected)) throw new Error("the new signature does not verify");
    await Bun.write(join(dir, "index.json.sig"), JSON.stringify(sig) + "\n");
    console.log(`signed ${index.byteLength} bytes with ${keyId}`);
} else if (command === "verify") {
    const [dir] = args;
    if (!dir) throw new Error("usage: verify <dir>");
    const sig = await Bun.file(join(dir, "index.json.sig")).json() as IndexSignature;
    const publicKey = shippedKey(sig.keyId);
    if (!publicKey || !await verifyIndex(await readBytes(join(dir, "index.json")), sig, publicKey)) {
        console.error("signature does not verify");
        process.exit(1);
    }
    console.log(`verified, key ${sig.keyId}`);
} else {
    console.error("usage: bun sign/cli.ts keygen <file> | sign <dir> | verify <dir>");
    process.exit(2);
}
