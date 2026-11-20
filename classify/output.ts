// classify/output.ts
// What the model must return per item (catalogue §7), and the check every
// answer passes before it is stored. The model's output is untrusted: unknown
// fields and values are dropped, text is cut to the schema's limits, and an
// effect is kept only for a tool the item really has, defaulting to write.

import type { ClassifyInput } from "./hash";

export const VOCABULARY_VERSION = 1;

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
    vocabulary: number;
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
    const byName = new Map(input.tools.map(tool => [tool.name, tool.hash]));
    const effects: Tags["effects"] = {};
    for (const tool of input.tools) effects[tool.hash] = "write"; // unsure is write
    for (const entry of Array.isArray(answer?.effects) ? answer.effects : []) {
        const hash = byName.get(entry?.tool);
        if (hash && ["read", "write", "risky"].includes(entry.effect)) effects[hash] = entry.effect;
    }
    return {
        vocabulary: VOCABULARY_VERSION,
        contentHash,
        domain: values(answer?.domain, 3),
        product: values(answer?.product, 8),
        audience: values(answer?.audience, 4),
        goal: (Array.isArray(answer?.goal) ? answer.goal : []).filter((g: unknown) => (GOALS as readonly unknown[]).includes(g)).slice(0, 3),
        summary: text(answer?.summary, 300),
        whenToUse: text(answer?.whenToUse, 500),
        tasks: (Array.isArray(answer?.tasks) ? answer.tasks : []).map((t: unknown) => text(t, 120)).filter(Boolean).slice(0, 12),
        effects,
        flags: (Array.isArray(answer?.flags) ? answer.flags : []).map((f: unknown) => text(f, 300)).filter(Boolean).slice(0, 5),
    };
}
