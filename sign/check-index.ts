// sign/check-index.ts
// Checks a written index.json before it is signed: valid by the build's own
// index validator, naming the parts commit, and describing exactly the bytes
// GitHub will serve. Each part is read back from the commit's blob, not the
// working tree, so a line-ending or filter change at `git add` cannot slip a
// digest past the signature.
//
//   bun sign/check-index.ts <published-checkout> <parts-commit>

import { createHash } from "node:crypto";
import { join } from "node:path";
import { validateIndexBytes } from "../validate";

export const PART_IDS = ["connectors", "skills"] as const;
const RAW = "https://raw.githubusercontent.com/qlairoslabs/agents-catalog";

export interface IndexPart { id: string; url: string; sha256: string; bytes: number }

/** Problems with an index's parts against the committed blobs; empty when it matches. */
export function checkParts(index: { commit?: unknown; parts?: IndexPart[] }, commit: string, blob: (path: string) => Uint8Array | null): string[] {
    const problems: string[] = [];
    if (index.commit !== commit) problems.push(`index names commit ${String(index.commit)}, expected ${commit}`);
    const parts = Array.isArray(index.parts) ? index.parts : [];
    const ids = parts.map(part => part.id).sort();
    if (ids.join(",") !== [...PART_IDS].sort().join(",")) problems.push(`index parts are ${ids.join(", ") || "none"}, expected exactly ${PART_IDS.join(" and ")}`);
    for (const part of parts) {
        const path = `${part.id}.json`;
        if (part.url !== `${RAW}/${commit}/${path}`) problems.push(`${part.id}: url ${part.url} is not the root file of ${commit}`);
        const bytes = blob(path);
        if (!bytes) { problems.push(`${part.id}: no ${path} in commit ${commit}`); continue; }
        if (part.bytes !== bytes.byteLength) problems.push(`${part.id}: index says ${part.bytes} bytes, the commit has ${bytes.byteLength}`);
        const digest = createHash("sha256").update(bytes).digest("hex");
        if (part.sha256 !== digest) problems.push(`${part.id}: index sha256 does not match the committed blob`);
    }
    return problems;
}

export function committedBlob(repo: string, commit: string) {
    return (path: string): Uint8Array | null => {
        const result = Bun.spawnSync(["git", "-C", repo, "cat-file", "blob", `${commit}:${path}`], { stdout: "pipe", stderr: "ignore" });
        return result.exitCode === 0 ? new Uint8Array(result.stdout) : null;
    };
}

if (import.meta.main) {
    const [dir, commit] = process.argv.slice(2);
    if (!dir || !commit || !/^[0-9a-f]{40}$/.test(commit)) { console.error("usage: bun sign/check-index.ts <published-checkout> <parts-commit>"); process.exit(2); }
    const index = validateIndexBytes(new Uint8Array(await Bun.file(join(dir, "index.json")).arrayBuffer())) as any;
    const problems = checkParts(index, commit, committedBlob(dir, commit));
    if (problems.length) { console.error(`index refused:\n- ${problems.join("\n- ")}`); process.exit(1); }
    console.log(`index valid: sequence ${index.sequence}, parts match commit ${commit}`);
}
