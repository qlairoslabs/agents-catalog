// classify/risk.ts
// The gateway spec's definition of a risky tool (tools2 part 2 §4.1): "Each tool has an effect:
// read, write or risky (sending, paying, deleting, publishing)". Model labels are refined by this
// rule, upgrade-only: a tool labelled write whose name has one of those action verbs becomes risky,
// so "Always allow" is never offered for it (tools.risky_always). read and risky are never changed:
// a read needs two independent passes to agree. Used by the native build (classify/apply.ts) and by
// the Composio notes' assembly.

export type Effect = "read" | "write" | "risky";

/** The actions of GW §4.1, as verbs: matched as whole words of the tool's name. */
export const RISKY_VERBS: ReadonlySet<string> = new Set([
    // sending
    "send", "sends", "forward", "reply", "broadcast", "notify", "tweet", "post",
    // paying
    "pay", "pays", "charge", "refund", "transfer", "purchase", "buy", "checkout", "withdraw",
    // deleting
    "delete", "deletes", "remove", "removes", "erase", "purge", "destroy", "trash", "wipe", "truncate", "drop",
    // publishing
    "publish", "publishes",
]);

/** Words of a tool name: snake, kebab, dotted, spaced and camelCase all split. */
export function nameWords(name: string): string[] {
    return name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

/** Verbs that are also nouns ("GET_TELEGRAM_POST", "ADD_CHECKOUT_COUPON", "SET_DROP_DOWN",
 *  "BATCH_FORWARD_GEOCODE"): they count only as the action's first word, where the verb stands. */
const AMBIGUOUS = new Set(["post", "checkout", "purchase", "drop", "forward", "transfer", "charge", "notify"]);

/** GW §4.1 applied to a model label: a write whose action has a sending, paying, deleting or
 *  publishing verb becomes risky. `toolkit` (a Composio toolkit slug such as "send_pulse") is
 *  stripped from the start of the name first, so the provider's own name never counts. */
export function specEffect(name: string, effect: Effect, toolkit?: string): Effect {
    if (effect !== "write") return effect;
    let words = nameWords(name);
    const prefix = toolkit ? nameWords(toolkit) : [];
    if (prefix.length && prefix.every((word, index) => words[index] === word)) words = words.slice(prefix.length);
    return words.some((word, index) => RISKY_VERBS.has(word) && (!AMBIGUOUS.has(word) || index === 0)) ? "risky" : effect;
}
