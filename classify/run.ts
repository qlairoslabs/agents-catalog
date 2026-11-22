// classify/run.ts
// Pass 1: classify every item whose content hash has no stored tags, in
// batches, resumable (each batch's results are written as they come).
//
//   CLAUDE_CODE_OAUTH_TOKEN=... bun classify/run.ts <parts-dir> [--batch=25] [--limit=N] [--model=sonnet]
//
// Results go to tags/<content hash>.json, reviewed and committed like any
// change. The scheduled build only reads them; it never calls a model.

import { mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { contentHash, inputOf, TOOLS_SHOWN, type ClassifyInput } from "./hash";
import { acpModel, DEFAULT_OPTIONS, type Ask } from "./model";
import { sanitize, validTags, type Tags } from "./output";
import { batchPrompt, systemPrompt } from "./prompt";
import { readVocabulary } from "./vocabulary";

export const TAGS_DIR = join(import.meta.dir, "..", "tags");

export async function readItems(dir: string): Promise<ClassifyInput[]> {
    const connectors = await Bun.file(join(dir, "connectors.json")).json() as { mcp?: unknown[] };
    const skills = await Bun.file(join(dir, "skills.json")).json() as { skills?: unknown[]; bundles?: unknown[] };
    return [
        ...(connectors.mcp ?? []).map(item => inputOf(item, "connector")),
        ...(skills.skills ?? []).map(item => inputOf(item, "skill")),
        ...(skills.bundles ?? []).map(item => inputOf(item, "bundle")),
    ];
}

/** A stored tag if it is current and well formed, else null (classified again). */
export function readTag(tagsDir: string, hash: string): Tags | null {
    try {
        const value = JSON.parse(readFileSync(join(tagsDir, `${hash}.json`), "utf8"));
        return validTags(value, hash) ? value : null;
    } catch { return null; }
}

/** Written beside and renamed into place, so an interruption never leaves a partial tag. */
export function writeTag(tagsDir: string, tags: Tags): void {
    const file = join(tagsDir, `${tags.contentHash}.json`);
    const temp = `${file}.${process.pid}.tmp`;
    writeFileSync(temp, JSON.stringify(tags, null, 1) + "\n");
    renameSync(temp, file);
}

/** Items still needing tags: no current, well-formed tag for their content hash. */
export async function pending(items: readonly ClassifyInput[], tagsDir: string): Promise<{ input: ClassifyInput; hash: string }[]> {
    const out: { input: ClassifyInput; hash: string }[] = [];
    const seen = new Set<string>();
    for (const input of items) {
        const hash = contentHash(input);
        if (seen.has(hash)) continue;
        seen.add(hash);
        if (readTag(tagsDir, hash)) continue;
        out.push({ input, hash });
    }
    return out;
}

/** Tools sent in one batch at most: a batch closes at `size` entries or when the
 *  next entry would pass this many tools. An entry over it goes alone. */
export const MAX_BATCH_TOOLS = 300;

export function batches<T extends { input: ClassifyInput }>(todo: readonly T[], size: number, maxTools: number): T[][] {
    const out: T[][] = [];
    let current: T[] = [], tools = 0;
    for (const entry of todo) {
        const n = Math.min(entry.input.tools.length, TOOLS_SHOWN);
        if (current.length && (current.length >= size || tools + n > maxTools)) { out.push(current); current = []; tools = 0; }
        current.push(entry); tools += n;
    }
    if (current.length) out.push(current);
    return out;
}

export async function classify(items: readonly ClassifyInput[], ask: Ask, options: { tagsDir: string; batch: number; maxTools?: number; limit?: number; log?: (line: string) => void }): Promise<{ done: number; failed: string[] }> {
    mkdirSync(options.tagsDir, { recursive: true });
    const todo = (await pending(items, options.tagsDir)).slice(0, options.limit ?? Infinity);
    const system = systemPrompt(readVocabulary());
    let done = 0;
    const failed: string[] = [];
    for (const batch of batches(todo, options.batch, options.maxTools ?? MAX_BATCH_TOOLS)) {
        const start = todo.indexOf(batch[0]!), end = start + batch.length;
        let answer: any;
        try { answer = await ask(system, batchPrompt(batch.map(entry => entry.input))); }
        catch (error) {
            failed.push(...batch.map(entry => entry.input.id));
            options.log?.(`batch at ${start + 1}–${end} failed: ${error instanceof Error ? error.message : error}`);
            continue;
        }
        const byId = new Map((Array.isArray(answer?.items) ? answer.items : []).filter((item: any) => typeof item?.id === "string").map((item: any) => [item.id, item]));
        for (const { input, hash } of batch) {
            const result = byId.get(input.id);
            if (!result) { failed.push(input.id); continue; } // asked again next run
            writeTag(options.tagsDir, sanitize(result, input, hash));
            done++;
        }
        options.log?.(`classified ${end}/${todo.length}`);
    }
    return { done, failed };
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    const flag = (name: string) => args.find(arg => arg.startsWith(`--${name}=`))?.split("=")[1];
    const dir = args.find(arg => !arg.startsWith("--"));
    if (!dir) { console.error("usage: bun classify/run.ts <parts-dir> [--batch=25] [--limit=N] [--model=sonnet] [--image=...]"); process.exit(2); }
    const ask = acpModel({ ...DEFAULT_OPTIONS, model: flag("model") ?? DEFAULT_OPTIONS.model, image: flag("image") ?? DEFAULT_OPTIONS.image });
    const result = await classify(await readItems(dir), ask, { tagsDir: TAGS_DIR, batch: Number(flag("batch") ?? 25),
        limit: flag("limit") ? Number(flag("limit")) : undefined, log: console.log });
    console.log(`done ${result.done}; ${result.failed.length} to retry; ${readdirSync(TAGS_DIR).filter(n => n.endsWith(".json")).length} stored`);
}
