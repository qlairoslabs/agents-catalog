// Acceptance rules for the published community feed (tools J5). The scheduled
// builder supplies signals; hubs do not repeat these network checks.

import { namespaceDomain, type RegistryServer } from "./registry";

export interface RemoteSignals {
    live: boolean;
    auth: "oauth" | "key" | "none" | null;
    domainAgeDays: number | null;
    listingAgeDays: number;
    trancoTopMillion: boolean;
    hostEntries: number;
    publisherEntries: number;
    urlNamespaces: number;
}

export interface PackageSignals {
    exists: boolean;
    deprecated: boolean;
    advisories: number;
    repositoryMatchesNamespace: boolean;
    ageDays: number;
    weeklyDownloads: number;
    provenance: boolean;
    previousProvenance: boolean;
}

export type FeedVerdict = { accepted: true; label: "community"; signals: Record<string, unknown> }
    | { accepted: false; reason: string };

const SHARED_HOSTING = ["vercel.app", "workers.dev", "trycloudflare.com", "netlify.app", "onrender.com", "railway.app", "pages.dev"];
const under = (host: string, domain: string) => host === domain || host.endsWith(`.${domain}`);

export function precheckRemote(server: RegistryServer, url: string,
    signals: Pick<RemoteSignals, "hostEntries" | "publisherEntries" | "urlNamespaces">): string | null {
    let parsed: URL;
    try { parsed = new URL(url); } catch { return "invalid URL"; }
    const domain = namespaceDomain(server.name ?? "");
    if (parsed.protocol !== "https:" || !domain || !under(parsed.hostname.toLowerCase(), domain) || url.includes("{")) {
        return "unverified or templated domain";
    }
    if (SHARED_HOSTING.some(suffix => under(parsed.hostname.toLowerCase(), suffix))) return "shared hosting";
    if (signals.hostEntries >= 10) return "gateway host";
    if (signals.publisherEntries > 3) return "publisher exceeds entry limit";
    if (signals.urlNamespaces !== 1) return "URL republished under another namespace";
    return null;
}

export function checkRemote(server: RegistryServer, url: string, signals: RemoteSignals): FeedVerdict {
    const reason = precheckRemote(server, url, signals);
    if (reason) return { accepted: false, reason };
    const domain = namespaceDomain(server.name!)!;
    if (!signals.live || !signals.auth) return { accepted: false, reason: "remote did not answer MCP or request authentication" };
    const established = signals.trancoTopMillion || (signals.domainAgeDays === null
        ? signals.listingAgeDays >= 90
        : signals.domainAgeDays >= 183 && signals.listingAgeDays >= 30);
    if (!established) return { accepted: false, reason: "domain or listing too young" };
    return { accepted: true, label: "community", signals: { domain, ...signals } };
}

/** Days since the package first appeared, not since its listed release: an
 *  active package always has a young latest version. Which version an agent
 *  gets is the minimum-age rule of J8. */
export function packageAgeDays(manager: "npm" | "pypi", data: any, now: number): number {
    const dates: unknown[] = manager === "npm" ? [data?.time?.created]
        : Object.values(data?.releases ?? {}).flatMap((files: any) => (files ?? []).map((file: any) => file.upload_time_iso_8601 ?? file.upload_time));
    const times = dates.map(date => Date.parse(String(date))).filter(Number.isFinite);
    return times.length ? (now - Math.min(...times)) / 864e5 : 0;
}

/** The package names this server back: the marker the official registry
 *  requires to prove package ownership (`mcpName` on npm, `mcp-name:` in the
 *  PyPI description). A verified domain's repository usually lives elsewhere,
 *  such as GitHub, so this is what ties its package to that namespace. */
export function declaresServerName(manager: "npm" | "pypi", release: any, data: any, name: string): boolean {
    if (manager === "npm") return release?.mcpName === name;
    const description = String(data?.info?.description ?? "");
    let at = 0;
    for (;;) {
        at = description.indexOf(`mcp-name: ${name}`, at);
        if (at < 0) return false;
        const next = description[at + `mcp-name: ${name}`.length];
        if (next === undefined || /[\s<]/.test(next) || description.startsWith("-->", at + `mcp-name: ${name}`.length)) return true;
        at++;
    }
}

export function checkPackage(signals: PackageSignals): FeedVerdict {
    if (!signals.exists) return { accepted: false, reason: "package or version missing" };
    if (signals.deprecated) return { accepted: false, reason: "deprecated package" };
    if (signals.advisories > 0) return { accepted: false, reason: "security advisory" };
    if (!signals.repositoryMatchesNamespace) return { accepted: false, reason: "repository namespace mismatch" };
    if (signals.ageDays < 30) return { accepted: false, reason: "package too young" };
    if (signals.weeklyDownloads < 1000) return { accepted: false, reason: "too few weekly downloads" };
    if (signals.previousProvenance && !signals.provenance) return { accepted: false, reason: "provenance lost" };
    return { accepted: true, label: "community", signals: { ...signals } };
}
