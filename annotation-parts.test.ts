import { createHash } from "node:crypto";
import { expect, test } from "bun:test";
import { ANNOTATIONS_PATH, checkAnnotationGraph } from "./annotation-parts";
import { makeIndex } from "./build";
import { checkAnnotations } from "./sign/check-index";

const bytes = (data: unknown) => new TextEncoder().encode(JSON.stringify(data));
const digest = (blob: Uint8Array) => createHash("sha256").update(blob).digest("hex");
const commit = "3".repeat(40);
const connectors = new Set(["docker:notion"]);
const effect = (i: number) => i.toString(16).padStart(64, "0");
const native = (name: string) => Bun.file(new URL("examples/detached/" + name + ".json", import.meta.url)).bytes();

test("annotation graph is validated, indexed and checked against committed bytes", async () => {
    const effects = bytes({ effects: Object.fromEntries(Array.from({ length: 2000 }, (_, i) => [effect(i), "read"])) });
    const ref = { sha256: digest(effects), bytes: effects.length, tools: 2000 };
    const path = `annotations/composio/${ref.sha256}.json`;
    const notes = bytes({ gmail: { topics: ["01.01.01"], effects: ref }, notion: { replacedBy: ["docker:notion"] } });
    const files = new Map([[path, effects], [ANNOTATIONS_PATH, notes], ["connectors.json", await native("connectors")]]);
    const read = (file: string) => files.get(file) ?? null;
    const entry = checkAnnotationGraph(notes, [path], connectors, read);
    expect(entry).toEqual({ sha256: digest(notes), bytes: notes.length, items: 2 });
    const index = makeIndex(commit, { connectors: await native("connectors"), skills: await native("skills") },
        Date.now(), undefined, await native("tools"), entry);
    expect(checkAnnotations(index, read, [ANNOTATIONS_PATH, path])).toEqual([]);
    expect(checkAnnotations({ ...index, annotations: [] }, read, [ANNOTATIONS_PATH, path])).not.toEqual([]);
    files.set(path, bytes({ effects: { [effect(0)]: "write" } }));
    expect(() => checkAnnotations(index, read, [ANNOTATIONS_PATH, path])).toThrow("digest mismatch");
});

test("annotation graph rejects private text, unknown references and malformed effect graphs", () => {
    const effectBytes = bytes({ effects: { [effect(0)]: "read" } });
    const ref = { sha256: digest(effectBytes), bytes: effectBytes.length, tools: 1 };
    const file = `annotations/composio/${ref.sha256}.json`;
    const check = (note: object, paths: string[] = [], blob = effectBytes) =>
        checkAnnotationGraph(bytes({ gmail: note }), paths, connectors, () => blob);
    for (const field of ["tool", "name", "description", "discovery", "tasks", "whenToUse", "connect"]) {
        expect(() => check({ [field]: "private" })).toThrow();
    }
    expect(() => check({ topics: ["99.99"] })).toThrow("unknown Composio annotation topic");
    expect(() => check({ replacedBy: ["docker:missing"] })).toThrow("unknown Composio replacement connector");
    expect(() => check({ effects: ref })).toThrow("missing, orphan");
    expect(() => check({}, [file])).toThrow("missing, orphan");
    expect(() => check({ effects: { ...ref, tools: 2 } }, [file])).toThrow("effect count mismatch");
    expect(() => check({ effects: { ...ref, tools: 2001 } }, [file])).toThrow();
    for (const bad of [{ effects: { TOOL_NAME: "read" } }, { effects: { [effect(0)]: "read" }, description: "private" }]) {
        const blob = bytes(bad);
        const sha256 = digest(blob);
        expect(() => check({ effects: { ...ref, sha256, bytes: blob.length } }, [`annotations/composio/${sha256}.json`], blob)).toThrow();
    }
});
