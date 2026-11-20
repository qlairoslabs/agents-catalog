// classify/output.ts
// What the model must return per item (catalogue §7), and the check every
// answer passes before it is stored. The model's output is untrusted: unknown
// fields and values are dropped, text is cut to the schema's limits, and an
// effect is kept only for a tool the item really has, defaulting to write.

import { TOOLS_SHOWN, type ClassifyInput } from "./hash";

/** Bump when the prompt, schema or sanitizer change what a tag means: every
 *  stored tag is then classified again. A vocabulary merge does not need it. */
export const CLASSIFIER_VERSION = 2;

export const GOALS = [
    "get-customers", "sell", "get-paid", "keep-in-touch", "support-customers", "be-online",
    "create-content", "schedule", "run-the-money", "work-as-a-team", "hire-and-manage",
    "understand-what-is-happening", "automate-work", "build-software", "stay-compliant",
] as const;

const VALUE = /^[a-z0-9][a-z0-9._-]*(\/[a-z0-9][a-z0-9._-]*){0,2}$/;

/** JSON Schema given to the model for one batch. */
export const BATCH_SCHEMA = {
    type: "object",
    required: ["items"],
    additionalProperties: false,
    properties: {
        items: {
            type: "array",
            items: {
                type: "object",
                required: ["id", "domain", "product", "audience", "goal", "summary", "whenToUse", "tasks", "effects", "flags"],
                additionalProperties: false,
                properties: {
                    id: { type: "string" },
                    domain: { type: "array", maxItems: 3, items: { type: "string" } },
                    product: { type: "array", maxItems: 8, items: { type: "string" } },
                    audience: { type: "array", maxItems: 4, items: { type: "string" } },
                    goal: { type: "array", maxItems: 3, items: { enum: [...GOALS] } },
                    summary: { type: "string" },
                    whenToUse: { type: "string" },
                    tasks: { type: "array", maxItems: 12, items: { type: "string" } },
                    effects: {
                        type: "array",
                        items: {
                            type: "object", required: ["tool", "effect"], additionalProperties: false,
                            properties: { tool: { type: "string" }, effect: { enum: ["read", "write", "risky"] } },
                        },
                    },
                    flags: { type: "array", maxItems: 5, items: { type: "string" } },
                },
            },
        },
    },
} as const;

export interface Tags {
    classifier: number;
    contentHash: string;
    domain: string[];
    product: string[];
    audience: string[];
    goal: string[];
    summary: string;
    whenToUse: string;
    tasks: string[];
    /** By tool hash: an effect follows the definition, not the name. */
    effects: Record<string, "read" | "write" | "risky">;
    flags: string[];
}

/** Normalizes a free value to the attribute pattern, or drops it. */
export function slug(value: unknown): string | null {
    if (typeof value !== "string") return null;
    const parts = value.toLowerCase().split("/").slice(0, 3)
        .map(part => part.normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9._-]+/g, "-").replace(/^[^a-z0-9]+|-+$/g, ""))
        .filter(Boolean);
    const out = parts.join("/");
    return VALUE.test(out) && out.length <= 80 ? out : null;
}

const text = (value: unknown, max: number) =>
    typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";

const values = (list: unknown, max: number) =>
    [...new Set((Array.isArray(list) ? list : []).map(slug).filter((v): v is string => !!v))].slice(0, max);

export function sanitize(answer: any, input: ClassifyInput, contentHash: string): Tags {
    // Only the tools the prompt showed can be judged; the rest stay write.
    const byName = new Map(input.tools.slice(0, TOOLS_SHOWN).map(tool => [tool.name, tool]));
    const effects: Tags["effects"] = Object.create(null);
    for (const tool of input.tools) effects[tool.hash] = "write"; // unsure is write
    for (const entry of Array.isArray(answer?.effects) ? answer.effects : []) {
        const tool = typeof entry?.tool === "string" ? byName.get(entry.tool) : undefined;
        if (!tool || !["read", "write", "risky"].includes(entry.effect)) continue;
        // read vouches for the whole definition: only when the model saw all of it.
        effects[tool.hash] = entry.effect === "read" && !tool.complete ? "write" : entry.effect;
    }
    return {
        classifier: CLASSIFIER_VERSION,
        contentHash,
        domain: values(answer?.domain, 3),
        product: values(answer?.product, 8),
        audience: values(answer?.audience, 4),
        goal: (Array.isArray(answer?.goal) ? answer.goal : []).filter((g: unknown) => (GOALS as readonly unknown[]).includes(g)).slice(0, 3),
        summary: text(answer?.summary, 300),
        whenToUse: text(answer?.whenToUse, 500),
        tasks: (Array.isArray(answer?.tasks) ? answer.tasks : []).map((t: unknown) => text(t, 120)).filter(Boolean).slice(0, 12),
        effects: { ...effects },
        flags: (Array.isArray(answer?.flags) ? answer.flags : []).map((f: unknown) => text(f, 300)).filter(Boolean).slice(0, 5),
    };
}

const isStrings = (value: unknown, max: number) => Array.isArray(value) && value.length <= max && value.every(v => typeof v === "string");

/** A stored tag file is used only if it is current and well formed; anything
 *  else counts as missing and is classified again. */
export function validTags(value: any, contentHash: string): value is Tags {
    return !!value && typeof value === "object" && value.classifier === CLASSIFIER_VERSION && value.contentHash === contentHash
        && isStrings(value.domain, 3) && value.domain.every((v: string) => slug(v) === v)
        && isStrings(value.product, 8) && value.product.every((v: string) => slug(v) === v)
        && isStrings(value.audience, 4) && value.audience.every((v: string) => slug(v) === v)
        && isStrings(value.goal, 3) && value.goal.every((v: string) => (GOALS as readonly string[]).includes(v))
        && typeof value.summary === "string" && value.summary.length <= 300
        && typeof value.whenToUse === "string" && value.whenToUse.length <= 500
        && isStrings(value.tasks, 12) && value.tasks.every((v: string) => v.length <= 120)
        && isStrings(value.flags, 5)
        && !!value.effects && typeof value.effects === "object" && !Array.isArray(value.effects)
        && Object.entries(value.effects).every(([hash, effect]) => /^[0-9a-f]{64}$/.test(hash) && ["read", "write", "risky"].includes(effect as string));
}
