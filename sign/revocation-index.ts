import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { parseCatalogJson } from "../ingestion";
import { MAX_INDEX_BYTES, validateIndex, validateIndexBytes } from "../validate";
import { SHIPPED_KEYS } from "./keys";

// Match the library verifier in agents-core/src/catalog/adapters/agents-catalog.ts.
const FUTURE_TOLERANCE_MS = 5 * 60_000;

export async function writeRevocationIndex(args: string[]): Promise<void> {
    const { values } = parseArgs({
        args,
        options: { from: { type: "string" }, revoke: { type: "string" }, out: { type: "string" } },
    });
    const { from, revoke, out } = values;
    if (!from || !out || revoke !== SHIPPED_KEYS.current.kid) {
        throw new Error(`usage: revocation-index --from <index.json> --revoke ${SHIPPED_KEYS.current.kid} --out <dir>`);
    }
    const file = Bun.file(from);
    const bytes = new Uint8Array(await file.slice(0, MAX_INDEX_BYTES + 1).arrayBuffer());
    if (bytes.length > MAX_INDEX_BYTES) throw new Error("index exceeds the Hub byte limit");
    const raw = parseCatalogJson(bytes) as Record<string, unknown>;
    const previous = validateIndex(raw);
    const now = Date.now();
    const sequence = Math.max(Math.floor(now / 1000), previous.sequence + 1);
    if (!Number.isSafeInteger(sequence)) throw new Error("revocation sequence exceeds the safe integer range");
    if (sequence > Math.floor((now + FUTURE_TOLERANCE_MS) / 1000)) {
        throw new Error("revocation sequence would be too far in the future; wait until the clock passes the previous sequence");
    }
    const text = JSON.stringify({
        ...raw,
        revokes: [...new Set([...previous.revokes, revoke])],
        sequence,
        generatedAt: new Date(now).toISOString(),
        expires: new Date(now + 14 * 86_400_000).toISOString(),
    }, null, 2) + "\n";
    validateIndexBytes(text);
    await mkdir(out, { recursive: true });
    await writeFile(join(out, "index.json"), text, { flag: "wx" });
}
