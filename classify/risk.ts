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

/** "post" is also a noun ("GET_TELEGRAM_POST"): it counts as publishing only when no reading verb
 *  is in the name. */
const READING = new Set(["get", "list", "search", "fetch", "scrape", "read", "find", "retrieve"]);

/** GW §4.1 applied to a model label: a write with a sending, paying, deleting or publishing verb
 *  in its name becomes risky. */
export function specEffect(name: string, effect: Effect): Effect {
    if (effect !== "write") return effect;
    const words = nameWords(name);
    const reading = words.some(word => READING.has(word));
    return words.some(word => RISKY_VERBS.has(word) && !(word === "post" && reading)) ? "risky" : effect;
}
