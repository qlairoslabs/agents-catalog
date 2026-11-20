// classify/run.ts
// Pass 1: classify every item whose content hash has no stored tags, in
// batches, resumable (each batch's results are written as they come).
//
//   CLAUDE_CODE_OAUTH_TOKEN=... bun classify/run.ts <parts-dir> [--batch=25] [--limit=N] [--model=opus]
//
// Results go to tags/<content hash>.json, reviewed and committed like any
// change. The scheduled build only reads them; it never calls a model.

import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { contentHash, inputOf, type ClassifyInput } from "./hash";
import { claudeModel, DEFAULT_OPTIONS, type Ask } from "./model";
import { sanitize, VOCABULARY_VERSION, type Tags } from "./output";
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

/** Items still needing tags: no file for their content hash, or an older vocabulary. */
export async function pending(items: readonly ClassifyInput[], tagsDir: string): Promise<{ input: ClassifyInput; hash: string }[]> {
    const out: { input: ClassifyInput; hash: string }[] = [];
    const seen = new Set<string>();
    for (const input of items) {
        const hash = contentHash(input);
        if (seen.has(hash)) continue;
        seen.add(hash);
        const file = join(tagsDir, `${hash}.json`);
        if (existsSync(file) && (await Bun.file(file).json() as Tags).vocabulary === VOCABULARY_VERSION) continue;
        out.push({ input, hash });
    }
    return out;
}

export async function classify(items: readonly ClassifyInput[], ask: Ask, options: { tagsDir: string; batch: number; limit?: number; log?: (line: string) => void }): Promise<{ done: number; failed: string[] }> {
    mkdirSync(options.tagsDir, { recursive: true });
    const todo = (await pending(items, options.tagsDir)).slice(0, options.limit ?? Infinity);
    const system = systemPrompt(readVocabulary());
    let done = 0;
    const failed: string[] = [];
    for (let i = 0; i < todo.length; i += options.batch) {
        const batch = todo.slice(i, i + options.batch);
        let answer: any;
        try { answer = await ask(system, batchPrompt(batch.map(entry => entry.input))); }
        catch (error) {
            failed.push(...batch.map(entry => entry.input.id));
            options.log?.(`batch ${i / options.batch + 1} failed: ${error instanceof Error ? error.message : error}`);
            continue;
        }
        const byId = new Map((Array.isArray(answer?.items) ? answer.items : []).map((item: any) => [item?.id, item]));
        for (const { input, hash } of batch) {
            const result = byId.get(input.id);
            if (!result) { failed.push(input.id); continue; } // asked again next run
            await Bun.write(join(options.tagsDir, `${hash}.json`), JSON.stringify(sanitize(result, input, hash), null, 1) + "\n");
            done++;
        }
        options.log?.(`classified ${Math.min(i + options.batch, todo.length)}/${todo.length}`);
    }
    return { done, failed };
}

if (import.meta.main) {
    const args = process.argv.slice(2);
    const flag = (name: string) => args.find(arg => arg.startsWith(`--${name}=`))?.split("=")[1];
    const dir = args.find(arg => !arg.startsWith("--"));
    if (!dir) { console.error("usage: bun classify/run.ts <parts-dir> [--batch=25] [--limit=N] [--model=opus] [--sandbox=podman|none]"); process.exit(2); }
    const ask = claudeModel({ ...DEFAULT_OPTIONS, model: flag("model") ?? DEFAULT_OPTIONS.model,
        sandbox: (flag("sandbox") as "podman" | "none") ?? DEFAULT_OPTIONS.sandbox });
    const result = await classify(await readItems(dir), ask, { tagsDir: TAGS_DIR, batch: Number(flag("batch") ?? 25),
        limit: flag("limit") ? Number(flag("limit")) : undefined, log: console.log });
    console.log(`done ${result.done}; ${result.failed.length} to retry; ${readdirSync(TAGS_DIR).length} stored`);
}
