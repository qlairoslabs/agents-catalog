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
//   bun sign/cli.ts sign --next <private-key-file> [dir]
//       Signs with the shipped offline next key, using the current directory
//       by default. Run on an offline machine with a clean environment.
//   bun sign/cli.ts verify <dir>
//       Verifies against the shipped key the signature names; any other id fails.

import { closeSync, constants, fstatSync, openSync, readSync, writeSync } from "node:fs";
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

const MAX_PRIVATE_KEY_BYTES = 1024;

function readOfflineKey(path: string): string {
    const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
    try {
        const file = fstatSync(fd);
        if (!file.isFile() || file.uid !== process.geteuid?.() || (file.mode & 0o077) !== 0
            || file.size === 0 || file.size > MAX_PRIVATE_KEY_BYTES) {
            throw new Error("offline key must be an owner-only regular file of at most 1024 bytes");
        }
        const bytes = Buffer.alloc(MAX_PRIVATE_KEY_BYTES + 1);
        let length = 0;
        while (length < bytes.length) {
            const count = readSync(fd, bytes, length, bytes.length - length, null);
            if (!count) break;
            length += count;
        }
        if (length !== file.size) throw new Error("offline key file changed while reading");
        return bytes.toString("utf8", 0, length).trim();
    } finally { closeSync(fd); }
}

// A clean environment avoids chasing provider-specific credential names.
const OFFLINE_ENV = new Set(["PATH", "LANG", "LC_ALL", "TZ"]);

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
    const offline = args[0] === "--next";
    const dir = offline ? args[2] ?? "." : args[0];
    if (offline ? !args[1] || args.length > 3 : !dir || args.length !== 1 || dir.startsWith("--")) {
        throw new Error("usage: sign <dir> | sign --next <private-key-file> [dir]");
    }
    const key = offline ? SHIPPED_KEYS.next : SHIPPED_KEYS.current;
    let privateKey: string;
    if (offline) {
        if (Object.keys(process.env).some(name => !OFFLINE_ENV.has(name))) {
            throw new Error("offline signing requires a clean environment; run with env -i and --no-env-file");
        }
        privateKey = readOfflineKey(args[1]!);
    } else {
        privateKey = required("CATALOG_SIGNING_KEY");
        if (required("CATALOG_SIGNING_KEY_ID") !== key.kid || required("CATALOG_PUBLIC_KEY") !== key.key) {
            throw new Error("the configured key id or public key is not the shipped current key");
        }
    }
    if (await publicKeyOf(privateKey).catch(() => null) !== key.key) {
        throw new Error(`the signing key does not match the shipped ${offline ? "next" : "current"} key`);
    }
    const index = await readBytes(join(dir, "index.json"));
    const sig = await signIndex(index, key.kid, privateKey);
    if (!await verifyIndex(index, sig, key.key)) throw new Error("the new signature does not verify");
    await Bun.write(join(dir, "index.json.sig"), JSON.stringify(sig) + "\n");
    console.log(`signed ${index.byteLength} bytes with ${key.kid}`);
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
    console.error("usage: bun sign/cli.ts keygen <file> | sign <dir> | sign --next <private-key-file> [dir] | verify <dir>");
    process.exit(2);
}
