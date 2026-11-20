import { hasSetupBudget, setupCheckpoint, setupSignal, setupStage } from "./setup-budget";
import { assertPublicHttps } from "./gate";

type Fetch = (input: string, init?: RequestInit) => Promise<Response>;
type Resolve = (host: string) => Promise<string[]>;

export interface OAuthIo {
    fetch?: Fetch;
    resolve?: Resolve;
}

export class OAuthError extends Error {
    /** `setup`: the hub owner has something to configure first (§D5). */
    constructor(message: string, readonly code: "discovery" | "registration" | "exchange" | "refresh" | "invalid_grant" | "setup") {
        super(message);
        this.name = "OAuthError";
    }
}

/** At most this many redirects, each checked. */
const MAX_HOPS = 3;

export async function guardedFetch(target: string, init: RequestInit = {}, io: OAuthIo = {},
    policy: { redirects?: "return"; allowPrivateHttps?: boolean } = {}): Promise<Response> {
    const fetchFn = io.fetch ?? ((input, options) => fetch(input, options));
    const headers = new Headers(init.headers);
    const safeRedirect = ["GET", "HEAD"].includes((init.method ?? "GET").toUpperCase())
        && !init.body && !["authorization", "cookie", "proxy-authorization"].some(name => headers.has(name));
    let url = target;
    for (let hop = 0; hop <= MAX_HOPS; hop++) {
        setupCheckpoint();
        if (policy.allowPrivateHttps) {
            const parsed = new URL(url);
            if (parsed.protocol !== "https:" || parsed.username || parsed.password) throw new OAuthError("The connector URL must be HTTPS without credentials.", "exchange");
        } else {
            await assertPublicHttps(url, io.resolve);
        }
        const response = hasSetupBudget()
            ? await setupStage("provider", () => fetchFn(url, { ...init, redirect: "manual", signal: setupSignal(35_000, init.signal) }))
            : await fetchFn(url, { ...init, redirect: "manual" });
        if (policy.redirects === "return") return response;
        if (response.status < 300 || response.status >= 400 || !response.headers.get("location")) return response;
        const location = response.headers.get("location")!;
        await response.body?.cancel();
        if (!safeRedirect) throw new OAuthError("the provider redirected a credential or mutating request; configure its final endpoint", "exchange");
        url = new URL(location, url).toString();
        // A redirected POST becomes a GET, as browsers do for 301–303.
        if (response.status !== 307 && response.status !== 308) init = { ...init, method: "GET", body: undefined };
    }
    throw new OAuthError(`too many redirects from ${new URL(target).origin}`, "discovery");
}

function wellKnown(base: string, suffix: string): string[] {
    const url = new URL(base);
    const path = url.pathname.replace(/\/+$/, "");
    const withPath = `${url.origin}/.well-known/${suffix}${path}`;
    const atRoot = `${url.origin}/.well-known/${suffix}`;
    return path ? [withPath, atRoot] : [atRoot];
}

async function firstJson<T>(urls: string[], io: OAuthIo): Promise<T | null> {
    for (const url of urls) {
        setupCheckpoint();
        const response = await guardedFetch(url, { headers: { accept: "application/json" } }, io).catch(() => null);
        if (response?.ok) {
            try { return await setupStage("provider_body",()=>response.json()) as T; } catch { /* next */ }
        }
    }
    return null;
}

export async function probeAuth(mcpUrl: string, io: OAuthIo = {}): Promise<"oauth" | "none"> {
    const response = await guardedFetch(mcpUrl, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 0, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "agents-hub", version: "1" } } }),
    }, io);
    await response.body?.cancel().catch(() => {});
    if (response.status === 401) return "oauth";
    const meta = await firstJson<{ resource?: string; authorization_servers?: string[] }>(wellKnown(mcpUrl, "oauth-protected-resource"), io);
    return meta?.authorization_servers?.length && describesResource(meta.resource, mcpUrl) ? "oauth" : "none";
}

/** RFC 9728 §3.3: metadata counts only for the resource it names. The
 *  origin-level document a server falls back to may describe another path on
 *  the same host, so a `resource` that is neither this URL nor a prefix of it
 *  says nothing about this server. */
function describesResource(resource: string | undefined, mcpUrl: string): boolean {
    if (!resource) return true;
    const trim = (value: string) => value.replace(/\/+$/, "");
    const named = trim(resource);
    const target = trim(mcpUrl);
    return target === named || target.startsWith(`${named}/`);
}
