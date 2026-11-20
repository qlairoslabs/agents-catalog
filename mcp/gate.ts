// src/catalog/gate.ts
// The one place that decides whether the hub itself may reach something
// (9-18-SPEC-tools.md §B4). Catalogue sync, registry search and — in later
// phases — OAuth, the proxy and skill downloads all ask here, so the rule
// cannot drift between them.

import { setupStage, SetupDeadlineError } from "./setup-budget";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { OutboundConfig } from "./config";

export type OutboundKind = "mcp" | "skills";

/** What the hub is about to do. */
export type OutboundPurpose =
    | "catalog-sync"        // read the sources in `trusted_catalogs` / `trusted_publishers`
    | "community-search";   // search the open registry live

export function outboundAllows(outbound: OutboundConfig, kind: OutboundKind, purpose: OutboundPurpose): boolean {
    const mode = outbound[kind];
    switch (purpose) {
        case "catalog-sync": return mode === "trusted" || mode === "community" || mode === "any";
        case "community-search": return mode === "any";
    }
}

// ---------------------------------------------------------------------------
// Where the hub may connect
// ---------------------------------------------------------------------------

export class OutboundRefused extends Error {
    constructor(message: string) {
        super(message);
        this.name = "OutboundRefused";
    }
}

/** Loopback, link-local (cloud metadata lives there), private, CGNAT and the
 *  other ranges a request from the hub's network position must never reach. */
export function isPrivateAddress(address: string): boolean {
    const normalized = address.toLowerCase();
    // WHATWG URLs canonicalize dotted IPv4-mapped IPv6 literals to hex.
    const mapped = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(normalized);
    const v4 = mapped ? [Number.parseInt(mapped[1]!, 16), Number.parseInt(mapped[2]!, 16)]
        .flatMap(word => [word >> 8, word & 255]).join(".")
        : normalized.startsWith("::ffff:") ? normalized.slice(7) : normalized;
    if (isIP(v4) === 4) {
        const [a, b] = v4.split(".").map(Number) as [number, number];
        return a === 0 || a === 10 || a === 127
            || (a === 100 && b >= 64 && b <= 127)
            || (a === 169 && b === 254)
            || (a === 172 && b >= 16 && b <= 31)
            || (a === 192 && b === 168)
            || a >= 224;
    }
    const v6 = normalized;
    return v6 === "::" || v6 === "::1" || v6.startsWith("fc") || v6.startsWith("fd") || v6.startsWith("fe8") || v6.startsWith("fe9")
        || v6.startsWith("fea") || v6.startsWith("feb") || v6.startsWith("ff");
}

type Resolve = (host: string) => Promise<string[]>;
const resolveAll: Resolve = async host => (await lookup(host, { all: true })).map(entry => entry.address);

/**
 * Refuse a URL the hub must not connect to: anything but https, and any host
 * that resolves to a private address. Called before every connection the hub
 * makes on a connector's behalf — discovery, registration, token exchange, the
 * proxy — so a catalogue entry, an authorization server's metadata or a
 * redirect cannot point the hub at its own network.
 *
 * The address is resolved here and again by fetch; a host that changes its
 * answer between the two can still slip through. Closing that needs pinning the
 * resolved address into the connection, which Bun's fetch does not expose.
 */
export async function assertPublicHttps(target: string, resolve: Resolve = resolveAll): Promise<URL> {
    let url: URL;
    try { url = new URL(target); } catch { throw new OutboundRefused(`not a URL: ${target}`); }
    if (url.protocol !== "https:") throw new OutboundRefused(`the hub only connects over https: ${url.origin}`);
    if (url.username || url.password) throw new OutboundRefused("a URL with credentials in it is refused");
    if (process.env.AGENTS_HUB_OUTBOUND_POLICY === "hosted-hub-v1" && url.port && url.port !== "443") throw new OutboundRefused("hosted Hub external connections require public HTTPS port443");
    const host = url.hostname.replace(/^\[|\]$/g, "");
    if (host === "localhost" || host.endsWith(".localhost")) throw new OutboundRefused(`${host} is this machine`);
    const addresses = isIP(host) ? [host] : await setupStage("dns",()=>resolve(host),5_000).catch(error => { if (error instanceof SetupDeadlineError) throw error; throw new OutboundRefused(`${host} does not resolve`); });
    if (addresses.length === 0 || addresses.some(isPrivateAddress)) {
        throw new OutboundRefused(`${host} resolves to a private address`);
    }
    return url;
}

/** Whether the hub may connect for a connector under this mode. */
export function mayConnect(outbound: OutboundConfig, trust: "curated" | "verified-publisher" | "community" | "unvetted"): boolean {
    switch (outbound.mcp) {
        case "off": return false;
        case "bundled":
        case "trusted": return trust === "curated" || trust === "verified-publisher";
        case "community": return trust !== "unvetted";
        case "any": return true;
    }
}

/** Whether the hub may download a skill or bundle under this mode. */
export function mayDownload(outbound: OutboundConfig, trust: "curated" | "verified-publisher" | "community" | "unvetted"): boolean {
    switch (outbound.skills) {
        case "off": return false;
        case "bundled":
        case "trusted":
        case "community": return trust === "curated" || trust === "verified-publisher";
        case "any": return true;
    }
}
