// The publisher's build pipeline. All expensive signals are supplied by a
// scheduled job; only accepted registry entries are written to the feed.

import { checkPackage, checkRemote, precheckRemote, type PackageSignals, type RemoteSignals } from "./community-checks";
import { namespaceDomain, type RegistryServer } from "./registry";

export interface RegistryRecord {
    server: RegistryServer;
    _meta?: Record<string, any>;
}

export interface FeedSignals {
    remote(server: RegistryServer, url: string): Promise<Pick<RemoteSignals, "live" | "auth" | "domainAgeDays" | "trancoTopMillion">>;
    package(server: RegistryServer, pkg: NonNullable<RegistryServer["packages"]>[number]): Promise<PackageSignals>;
}

export interface FeedRejection {
    name: string;
    kind?: "remote" | "package";
    identifier?: string;
    reason: string;
    /** For an unavailable signal: consecutive unavailable runs counted for this entry (1 when it had
     *  no prior accepted record). The weekly build attributes a drop only when it reached the limit. */
    unavailableRuns?: number;
    /** What failed, when the check could not be made. */
    detail?: string;
}

/** Answers that may differ on a second try. Any other status is the answer. */
const TEMPORARY = new Set([408, 425, 429, 500, 502, 503, 504]);

/** Runs without an answer before an accepted entry leaves the feed. */
export const MAX_UNAVAILABLE_RUNS = 3;

export class HttpError extends Error {
    constructor(readonly status: number, message: string) { super(message); }
    get temporary(): boolean { return TEMPORARY.has(this.status); }
}

/** Retries a failed lookup; a definite answer, like a 404, stops at once. */
export async function retrying<T>(work: () => Promise<T>, attempts = 6, delay = 1000): Promise<T> {
    for (let attempt = 1; ; attempt++) {
        try { return await work(); }
        catch (error) {
            if (attempt >= attempts || (error instanceof HttpError && !error.temporary)) throw error;
            await Bun.sleep(delay * attempt);
        }
    }
}

const feedKey = (name: string, kind: unknown, identifier = "") => `${name}|${kind}|${identifier}`;

export function listingAgeDays(record: RegistryRecord, now = Date.now()): number {
    const published = record._meta?.["io.modelcontextprotocol.registry/official"]?.publishedAt;
    return typeof published === "string" && Number.isFinite(Date.parse(published))
        ? Math.max(0, (now - Date.parse(published)) / 86400000) : 0;
}

export async function buildCheckedFeed(records: RegistryRecord[], providers: FeedSignals, now = Date.now(),
    progress?: (checked: number, total: number, accepted: number) => void, previous: RegistryRecord[] = []): Promise<{
        servers: RegistryRecord[];
        summary: { checked: number; remote: number; npm: number; pypi: number; rejected: Record<string, number> };
        rejections: FeedRejection[];
    }> {
    const active = records.filter(record => record.server.name
        && record._meta?.["io.modelcontextprotocol.registry/official"]?.status !== "deleted"
        && record._meta?.["io.modelcontextprotocol.registry/official"]?.status !== "deprecated");
    const hosts = new Map<string, number>();
    const publishers = new Map<string, number>();
    const urlNamespaces = new Map<string, Set<string>>();
    for (const { server } of active) {
        const domain = namespaceDomain(server.name!);
        if (domain) publishers.set(domain, (publishers.get(domain) ?? 0) + 1);
        for (const remote of server.remotes ?? []) if (remote.url) {
            try {
                const url = new URL(remote.url);
                hosts.set(url.hostname, (hosts.get(url.hostname) ?? 0) + 1);
                const namespaces = urlNamespaces.get(url.toString()) ?? new Set<string>();
                namespaces.add(server.name!.split("/")[0]!);
                urlNamespaces.set(url.toString(), namespaces);
            } catch { /* rejected by checkRemote */ }
        }
    }
    const output: RegistryRecord[] = [];
    const rejected = new Map<string, number>();
    const rejections: FeedRejection[] = [];
    const reject = (reason: string, entry: Omit<FeedRejection, "reason">) => {
        rejected.set(reason, (rejected.get(reason) ?? 0) + 1);
        rejections.push({ ...entry, reason });
    };
    const accepted = new Map(previous.map(entry => [feedKey(entry.server.name!, entry._meta?.["agents/community"]?.kind,
        entry.server.packages?.[0]?.identifier), entry]));
    // "Could not ask" is not a "no": an accepted entry stays as it was for a few
    // runs. A new one still needs a real pass.
    const unavailable = (reason: string, entry: Omit<FeedRejection, "reason">, error: unknown) => {
        const before = accepted.get(feedKey(entry.name, entry.kind, entry.identifier));
        const signals = before?._meta?.["agents/community"];
        const runs = Number(signals?.unavailableRuns ?? 0) + 1;
        const keep = !!before && runs < MAX_UNAVAILABLE_RUNS;
        if (keep) output.push({ ...before, _meta: { ...before._meta, "agents/community": { ...signals, unavailableRuns: runs } } });
        reject(keep ? `${reason}, kept` : reason, { ...entry, detail: error instanceof Error ? error.message : String(error),
            unavailableRuns: before ? runs : 1 });
    };
    const accept = (record: RegistryRecord, kind: "remote" | "package", signals: Record<string, unknown>,
        remote?: NonNullable<RegistryServer["remotes"]>[number], pkg?: NonNullable<RegistryServer["packages"]>[number]) => {
        output.push({ ...record, server: { ...record.server,
            remotes: kind === "remote" && remote ? [remote] : undefined,
            packages: kind === "package" && pkg ? [pkg] : undefined },
        _meta: { ...record._meta, "agents/community": { verdict: "community", kind, ...signals } } });
    };
    // Bound probes, RDAP and package lookups so a 38k-entry run does not
    // create tens of thousands of simultaneous sockets.
    let next = 0;
    let checked = 0;
    await Promise.all(Array.from({ length: Math.min(24, active.length) }, async () => {
        while (next < active.length) {
            const record = active[next++]!;
            const server = record.server;
            const name = server.name!;
            const remote = server.remotes?.find(item => item.type === "streamable-http" && item.url)
                ?? server.remotes?.find(item => item.type === "sse" && item.url);
            try {
                if (remote?.url) {
                    let url: URL | null = null;
                    try { url = new URL(remote.url); } catch { reject("invalid URL", { name, kind: "remote" }); }
                    if (url) {
                        const counts = { hostEntries: hosts.get(url.hostname) ?? 0,
                            publisherEntries: publishers.get(namespaceDomain(server.name!) ?? "") ?? 0,
                            urlNamespaces: urlNamespaces.get(url.toString())?.size ?? 0 };
                        const reason = precheckRemote(server, remote.url, counts);
                        if (reason) reject(reason, { name, kind: "remote" });
                        else {
                            try {
                                const verdict = checkRemote(server, remote.url, {
                                    ...await providers.remote(server, remote.url),
                                    listingAgeDays: listingAgeDays(record, now), ...counts });
                                if (verdict.accepted) accept(record, "remote", verdict.signals, remote);
                                else reject(verdict.reason, { name, kind: "remote" });
                            } catch (error) { unavailable("remote signal unavailable", { name, kind: "remote" }, error); }
                        }
                    }
                }
                for (const pkg of server.packages ?? []) {
                    if (pkg.transport?.type !== "stdio" || !["npm", "pypi"].includes(pkg.registryType ?? "")
                        || !pkg.identifier || !pkg.version) continue;
                    const entry = { name, kind: "package" as const, identifier: pkg.identifier };
                    try {
                        const verdict = checkPackage(await providers.package(server, pkg));
                        if (verdict.accepted) accept(record, "package", verdict.signals, undefined, pkg);
                        else reject(verdict.reason, entry);
                    } catch (error) { unavailable("package signal unavailable", entry, error); }
                }
            } catch (error) { reject("entry processing failed", { name, detail: String(error) }); }
            finally { checked++; if (checked % 1000 === 0) progress?.(checked, active.length, output.length); }
        }
    }));
    output.sort((a, b) => a.server.name!.localeCompare(b.server.name!)
        || String(a._meta?.["agents/community"]?.kind).localeCompare(String(b._meta?.["agents/community"]?.kind))
        || String(a.server.packages?.[0]?.identifier ?? "").localeCompare(String(b.server.packages?.[0]?.identifier ?? "")));
    return { servers: output, summary: { checked: active.length,
        remote: output.filter(item => item._meta?.["agents/community"]?.kind === "remote").length,
        npm: output.filter(item => item.server.packages?.[0]?.registryType === "npm").length,
        pypi: output.filter(item => item.server.packages?.[0]?.registryType === "pypi").length,
        rejected: Object.fromEntries([...rejected].sort((a, b) => b[1] - a[1])) }, rejections };
}
