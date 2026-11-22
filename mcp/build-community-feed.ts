import { Checkpoint } from "./checkpoint";
// Daily publisher for the checked MCP community feed (tools spec J4–J5).
// Run on a networked build worker; hubs only fetch the resulting JSON file.

import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import { buildCheckedFeed, HttpError, retrying, type FeedRejection, type FeedSignals, type RegistryRecord } from "./feed-builder";
import { namespaceDomain, type RegistryServer } from "./registry";
import { guardedFetch, OAuthError, probeAuth } from "./network";
import { OutboundRefused } from "./gate";
import { declaresServerName, packageAgeDays, type PackageSignals, type RemoteSignals } from "./community-checks";

const OUT = ".r1-cache/community-feed.json";
const REGISTRY = "https://registry.modelcontextprotocol.io";
const DAY = 86400000;
const WEEK = 7 * DAY;
let history: Checkpoint;
const memo = <T>() => new Map<string, Promise<T>>();

async function json(url: string, init: RequestInit = {}): Promise<any> {
    return retrying(async () => {
        const response = await fetch(url, { ...init, signal: AbortSignal.timeout(12000) });
        if (!response.ok) throw new HttpError(response.status, `${new URL(url).hostname} answered ${response.status}`);
        return response.json();
    });
}

async function registryEntries(limit = Infinity): Promise<RegistryRecord[]> {
    const records: RegistryRecord[] = [];
    let cursor: string | undefined;
    const seen = new Set<string>();
    do {
        const url = new URL("/v0.1/servers", REGISTRY);
        url.searchParams.set("version", "latest");
        url.searchParams.set("limit", "100");
        if (cursor) url.searchParams.set("cursor", cursor);
        const page = await json(url.toString()) as { servers?: RegistryRecord[]; metadata?: { nextCursor?: string } };
        records.push(...(page.servers ?? []));
        if (records.length >= limit) return records.slice(0, limit);
        cursor = page.metadata?.nextCursor || undefined;
        if (cursor && seen.has(cursor)) throw new Error("registry repeated a cursor");
        if (cursor) seen.add(cursor);
    } while (cursor);
    return records;
}

function domainOf(name: string): string | null {
    const domain = namespaceDomain(name);
    return domain ?? (name.startsWith("io.github.") ? null : null);
}

const ageCache = memo<number | null>();
let rdapBootstrap: Promise<Map<string, string>> | null = null;
async function rdapServices(): Promise<Map<string, string>> {
    rdapBootstrap ??= (async () => {
        const bootstrap = await json("https://data.iana.org/rdap/dns.json") as { services?: [string[], string[]][] };
        const services = new Map<string, string>();
        for (const [tlds, urls] of bootstrap.services ?? []) {
            const base = urls.find(url => url.startsWith("https://"));
            if (base) for (const tld of tlds) services.set(tld.toLowerCase(), base);
        }
        return services;
    })();
    return rdapBootstrap;
}

async function domainAgeDays(domain: string): Promise<number | null> {
    const stored = history.get<number>(`domain-registration:${domain}`, Infinity);
    if (stored !== undefined) return (Date.now() - stored) / DAY;
    const cached = ageCache.get(domain);
    if (cached) return cached;
    const work = (async () => {
        try {
            const services = await rdapServices();
            const base = services.get(domain.split(".").at(-1) ?? "");
            if (!base) throw new Error("no authoritative RDAP service");
            const data = await json(`${base.replace(/\/*$/, "/")}domain/${encodeURIComponent(domain)}`);
            const event = (data.events ?? []).find((item: any) => /registration|created/i.test(item.eventAction));
            const date = Date.parse(event?.eventDate);
            if (Number.isFinite(date)) {
                history.put(`domain-registration:${domain}`, date);
                return (Date.now() - date) / DAY;
            }
        } catch { /* WHOIS fallback */ }
        try {
            const child = Bun.spawn(["whois", domain], { stdout: "pipe", stderr: "ignore" });
            const timer = setTimeout(() => child.kill(), 8000);
            let output: string;
            try { output = await new Response(child.stdout).text(); await child.exited; }
            finally { clearTimeout(timer); }
            const matched = output.match(/(?:Creation Date|Registered on|Created On|created):\s*(.+)/im)?.[1];
            const date = Date.parse(matched ?? "");
            if (Number.isFinite(date)) {
                history.put(`domain-registration:${domain}`, date);
                return (Date.now() - date) / DAY;
            }
        } catch { /* some TLDs omit creation dates */ }
        return null;
    })();
    ageCache.set(domain, work);
    return work;
}

async function trancoDomains(): Promise<Set<string>> {
    const response = await fetch("https://tranco-list.eu/top-1m.csv.zip", { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Tranco list answered ${response.status}`);
    const zip = join(tmpdir(), `community-tranco-${randomUUID()}.zip`);
    try {
        await Bun.write(zip, response);
        const child = Bun.spawn(["unzip", "-p", zip], { stdout: "pipe", stderr: "pipe" });
        const body = await new Response(child.stdout).text();
        if (await child.exited !== 0) throw new Error("could not unpack Tranco list");
        return new Set(body.trim().split("\n").map(line => line.split(",")[1]?.trim()).filter((entry): entry is string => !!entry));
    } finally { rmSync(zip, { force: true }); }
}

function onTranco(host: string, top: Set<string>): boolean {
    const labels = host.split(".");
    for (let i = 0; i < labels.length - 1; i++) if (top.has(labels.slice(i).join("."))) return true;
    return false;
}

async function remoteSignals(server: RegistryServer, url: string, top: Set<string>, knownAges: Map<string, number>): Promise<Pick<RemoteSignals, "live" | "auth" | "domainAgeDays" | "trancoTopMillion">> {
    const domain = domainOf(server.name ?? "");
    const trancoTopMillion = !!domain && onTranco(domain, top);
    // A dead endpoint cannot pass J5, so defer its expensive domain-age lookup
    // until a successful liveness or authentication result.
    let live = false;
    let auth: "oauth" | "key" | "none" | null = null;
    try {
        await retrying(async () => {
            const response = await guardedFetch(url, { method: "POST", headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
                body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "agents-feed", version: "1" } } }),
                signal: AbortSignal.timeout(8000) });
            const failure = new HttpError(response.status, `${new URL(url).hostname} answered ${response.status}`);
            if (failure.temporary) { await response.body?.cancel().catch(() => undefined); throw failure; }
            const challenge = response.headers.get("www-authenticate") ?? "";
            const declaredHeader = server.remotes?.some(remote => remote.url === url && remote.headers?.some(header => header.isRequired || header.isSecret));
            if (response.status === 401 && /resource_metadata=/i.test(challenge)) { live = true; auth = "oauth"; }
            else if ((response.status === 401 || response.status === 403) && (/Bearer/i.test(challenge) || declaredHeader)) { live = true; auth = "key"; }
            else if (response.ok && /json|event-stream/i.test(response.headers.get("content-type") ?? "")) {
                const body = await response.text();
                live = /jsonrpc|event:\s*message/.test(body.slice(0, 4096));
                if (live) auth = await probeAuth(url, { fetch: (input, init) => fetch(input,
                    { ...init, signal: AbortSignal.timeout(8000) }) }).catch(() => "none" as const);
            }
            await response.body?.cancel().catch(() => undefined);
        }, 2);
    } catch (error) {
        // The guard refusing the address, or a redirect on POST, is an answer.
        // No answer at all may be an outage, so that goes up as unavailable.
        const refused = error instanceof OutboundRefused && !/does not resolve/.test(error.message);
        if (!refused && !(error instanceof OAuthError)) throw error;
    }
    // A registration date does not change, so a failed lookup can use the last one.
    const age = live && domain && !trancoTopMillion ? await domainAgeDays(domain) ?? knownAges.get(domain) ?? null : null;
    return { live, auth, domainAgeDays: age, trancoTopMillion };
}

function repositoryMatches(name: string, repository: unknown): boolean {
    const source = typeof repository === "string" ? repository : typeof repository === "object" && repository
        ? (repository as { url?: string }).url ?? "" : "";
    const path = source.replace(/^git\+/, "").replace(/^git@github\.com:/, "https://github.com/").replace(/\.git$/, "");
    let url: URL;
    try { url = new URL(path); } catch { return false; }
    const namespace = name.split("/")[0] ?? "";
    if (namespace.startsWith("io.github.")) return url.hostname === "github.com" && url.pathname.split("/")[1]?.toLowerCase() === namespace.slice(10).toLowerCase();
    const domain = domainOf(name);
    return !!domain && (url.hostname === domain || url.hostname.endsWith(`.${domain}`));
}

const packageCache = memo<any>();
const npmWeeklyCounts = new Map<string, number>();
// npm's stats service answers 429 well before 5 requests a second over a long run,
// and Playwright and Context7 were lost to it at 200 ms.
const DOWNLOAD_GAP_MS = 1100;
let nextDownloadAt = 0;
let downloadQueue = Promise.resolve();

async function pacedDownload(url: string): Promise<Response> {
    // The public stats service rate-limits concurrent point requests. Space
    // scoped-package calls without serializing their response bodies.
    const turn = downloadQueue.then(async () => {
        const wait = Math.max(0, nextDownloadAt - Date.now());
        if (wait) await Bun.sleep(wait);
        nextDownloadAt = Date.now() + DOWNLOAD_GAP_MS;
    });
    downloadQueue = turn.catch(() => undefined);
    await turn;
    return fetch(url, { signal: AbortSignal.timeout(12000) });
}

async function prefetchNpmDownloads(records: RegistryRecord[]): Promise<void> {
    // npm's documented bulk endpoint accepts up to 128 unscoped names. Scoped
    // names must use single-package requests, handled by pacedDownload.
    const names = [...new Set(records.flatMap(record => record.server.packages ?? [])
        .filter(pkg => pkg.registryType === "npm" && pkg.transport?.type === "stdio"
            && pkg.identifier && !pkg.identifier.startsWith("@"))
        .map(pkg => pkg.identifier!))];
    const missing = names.filter(name => {
        const known = history.get<number>(`downloads:npm:${name}`, WEEK);
        if (known === undefined) return true;
        npmWeeklyCounts.set(name, known);
        return false;
    });
    const batches: string[][] = [];
    for (let i = 0; i < missing.length; i += 128) batches.push(missing.slice(i, i + 128));
    let next = 0;
    await Promise.all(Array.from({ length: 3 }, async () => {
        while (next < batches.length) {
            const batch = batches[next++]!;
            const url = `https://api.npmjs.org/downloads/point/last-week/${batch.map(encodeURIComponent).join(",")}`;
            try {
                const response = await pacedDownload(url);
                if (!response.ok) continue; // individual lookup is the fallback
                const result = await response.json() as Record<string, { downloads?: number } | null>;
                for (const name of batch) {
                    const count = Number(result[name]?.downloads) || 0;
                    npmWeeklyCounts.set(name, count);
                    history.put(`downloads:npm:${name}`, count);
                }
            } catch { /* individual lookup is the fallback */ }
        }
    }));
}

async function packageMetadata(manager: string, identifier: string): Promise<any> {
    const key = `${manager}:${identifier}`;
    const cached = packageCache.get(key);
    if (cached) return cached;
    const work = json(manager === "npm" ? `https://registry.npmjs.org/${encodeURIComponent(identifier)}`
        : `https://pypi.org/pypi/${encodeURIComponent(identifier)}/json`).catch(error => {
        // Gone from the registry is an answer. A failed lookup is not, and must
        // not decide for the other entries naming this package.
        if (error instanceof HttpError && error.status === 404) return null;
        packageCache.delete(key);
        throw error;
    });
    packageCache.set(key, work);
    return work;
}

async function packageSignals(server: RegistryServer, pkg: NonNullable<RegistryServer["packages"]>[number], previous: Map<string, boolean>): Promise<PackageSignals> {
    const identifier = pkg.identifier!, version = pkg.version!, manager = pkg.registryType!;
    const missing: PackageSignals = { exists: false, deprecated: false, advisories: 0, repositoryMatchesNamespace: false,
        ageDays: 0, weeklyDownloads: 0, provenance: false, previousProvenance: false };
    try {
        const data = await packageMetadata(manager, identifier);
        if (!data) return missing;
        const release = manager === "npm" ? data.versions?.[version] : data.releases?.[version];
        if (!release) return missing;
        const files = manager === "pypi" ? release.filter((file: any) => file.packagetype === "bdist_wheel") : [];
        if (manager === "pypi" && !files.length) return missing;
        const ageDays = packageAgeDays(manager as "npm" | "pypi", data, Date.now());
        const repository = manager === "npm" ? release.repository ?? data.repository
            : data.info?.project_urls?.Source ?? data.info?.project_urls?.Repository ?? data.info?.home_page;
        const base: PackageSignals = { ...missing, exists: true, deprecated: !!release.deprecated,
            repositoryMatchesNamespace: repositoryMatches(server.name!, repository)
                || (!!domainOf(server.name!) && declaresServerName(manager as "npm" | "pypi", release, data, server.name!)),
            ageDays,
            previousProvenance: previous.get(`${manager}:${identifier}`) ?? false };
        // These fail the gate without needing the two rate-limited APIs. Keep
        // their real rejection reasons instead of collapsing a 429 to missing.
        if (base.deprecated || !base.repositoryMatchesNamespace || ageDays < 30) return base;
        const downloadUrl = manager === "npm"
            ? `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(identifier)}`
            : `https://pypistats.org/api/packages/${encodeURIComponent(identifier)}/recent`;
        const downloadKey = `downloads:${manager}:${identifier}`;
        let weeklyDownloads = (manager === "npm" ? npmWeeklyCounts.get(identifier) : undefined)
            ?? history.get<number>(downloadKey, WEEK);
        if (weeklyDownloads === undefined) {
            const downloads: any = await retrying(async () => {
                const response = await pacedDownload(downloadUrl);
                if (response.status === 404) return {};
                if (response.status === 429) {
                    // Everyone behind this one would be refused too, so hold the queue.
                    const wait = Number(response.headers.get("retry-after")) || 30;
                    nextDownloadAt = Math.max(nextDownloadAt, Date.now() + wait * 1000);
                }
                if (!response.ok) throw new HttpError(response.status, `download service answered ${response.status}`);
                return response.json();
            });
            weeklyDownloads = Number(manager === "npm" ? downloads.downloads : downloads.data?.last_week) || 0;
            history.put(downloadKey, weeklyDownloads);
            if (manager === "npm") npmWeeklyCounts.set(identifier, weeklyDownloads);
        }
        if (weeklyDownloads < 1000) return { ...base, weeklyDownloads };
        const osv = await json("https://api.osv.dev/v1/query", { method: "POST", headers: { "content-type": "application/json" },
            body: JSON.stringify({ version, package: { name: identifier, ecosystem: manager === "npm" ? "npm" : "PyPI" } }) });
        let provenance = manager === "npm" ? !!release.dist?.attestations : false;
        if (manager === "pypi") {
            const file = files[0];
            provenance = await retrying(async () => {
                const response = await fetch(`https://pypi.org/integrity/${encodeURIComponent(identifier)}/${encodeURIComponent(version)}/${encodeURIComponent(file.filename)}/provenance`,
                    { signal: AbortSignal.timeout(8000) });
                await response.body?.cancel().catch(() => undefined);
                if (response.status === 404) return false;
                if (!response.ok) throw new HttpError(response.status, `PyPI answered ${response.status}`);
                return true;
            });
        }
        return { ...base, advisories: (osv.vulns ?? []).length, weeklyDownloads, provenance };
    } catch (error) { throw new Error(`${manager}:${identifier}: ${error instanceof Error ? error.message : error}`); }
}

function previousFeed(path: string) {
    const provenance = new Map<string, boolean>();
    const domainAges = new Map<string, number>();
    let records: RegistryRecord[] = [];
    try {
        records = (JSON.parse(readFileSync(path, "utf8")) as { servers?: RegistryRecord[] }).servers ?? [];
        for (const record of records) {
            const signals = record._meta?.["agents/community"];
            if (signals?.domain && typeof signals.domainAgeDays === "number") domainAges.set(signals.domain, signals.domainAgeDays);
            for (const pkg of record.server.packages ?? []) {
                if (pkg.registryType && pkg.identifier && signals?.provenance) provenance.set(`${pkg.registryType}:${pkg.identifier}`, true);
            }
        }
    } catch { /* initial build */ }
    return { records, provenance, domainAges };
}

async function main(): Promise<void> {
    const limitFlag = process.argv.find(arg => arg.startsWith("--limit="));
    const outFlag = process.argv.find(arg => arg.startsWith("--out="));
    const reportFlag = process.argv.find(arg => arg.startsWith("--report="));
    const recheckFlag = process.argv.find(arg => arg.startsWith("--recheck="));
    const limit = limitFlag ? Number(limitFlag.slice(8)) : Infinity;
    if (!(limit > 0) || (Number.isFinite(limit) && !outFlag)) throw new Error("--limit requires a positive count and --out=path");
    const out = outFlag?.slice(6) || OUT;
    if (!outFlag || !process.argv.some(arg => arg.startsWith("--signals="))) mkdirSync(".r1-cache", { recursive: true });
    const checkpoint = new Checkpoint(process.argv.find(arg => arg.startsWith("--checkpoint="))?.slice(13) ?? ":memory:");
    history = new Checkpoint(process.argv.find(arg => arg.startsWith("--signals="))?.slice(10) ?? ".r1-cache/signals.sqlite");
    const remember = checkpoint.remember.bind(checkpoint);
    const [listed, topList] = await Promise.all([
        remember(`registry:${limit}`, () => registryEntries(limit)),
        remember("tranco", async () => [...await trancoDomains()]),
    ]);
    const top = new Set(topList);
    console.log(`loaded ${listed.length} registry entries and ${top.size} Tranco domains`);
    // Asks again only for packages a run could not check, from its --report file,
    // and merges them into the current feed.
    const failed = recheckFlag ? new Set(((await Bun.file(recheckFlag.slice(10)).json()) as FeedRejection[])
        .filter(entry => entry.kind === "package" && entry.reason.startsWith("package signal unavailable"))
        .map(entry => entry.name)) : null;
    const records = failed ? listed.filter(record => failed.has(record.server.name!))
        .map(record => ({ ...record, server: { ...record.server, remotes: undefined } })) : listed;
    const counts = await remember("npm-prefetch", async () => {
        await prefetchNpmDownloads(records);
        return [...npmWeeklyCounts];
    });
    for (const [name, count] of counts) npmWeeklyCounts.set(name, count);
    const previous = previousFeed(process.argv.find(arg => arg.startsWith("--previous="))?.slice(11) ?? OUT);
    const previouslyAccepted = new Set(previous.records.flatMap(record => (record.server.packages ?? [])
        .map(pkg => JSON.stringify([record.server.name, pkg.registryType, pkg.identifier]))));
    const providers: FeedSignals = {
        remote: (server, url) => remember(JSON.stringify(["remote",server.name,server.version,url]), () => remoteSignals(server, url, top, previous.domainAges)),
        package: (server, pkg) => remember(JSON.stringify(["package",server.name,pkg]), async () => {
            const key = JSON.stringify(["negative",server.name,server.version,pkg]);
            const accepted = previouslyAccepted.has(JSON.stringify([server.name,pkg.registryType,pkg.identifier]));
            const prior = !accepted ? history.get<PackageSignals>(key, WEEK) : undefined;
            if (prior) return prior;
            const fresh = await packageSignals(server, pkg, previous.provenance);
            if (!fresh.exists || fresh.deprecated || !fresh.repositoryMatchesNamespace || fresh.ageDays < 30 || fresh.weeklyDownloads < 1000) {
                history.put(key, fresh);
            }
            return fresh;
        }),
    };
    const { rejections, ...built } = await buildCheckedFeed(records, providers, Date.now(), (checked, total, accepted) =>
        console.log(`checked ${checked}/${total}; accepted ${accepted}`), previous.records);
    const packageId = (record: RegistryRecord) => `${record.server.name}|${record.server.packages?.[0]?.identifier ?? ""}`;
    const fresh = new Set(built.servers.map(packageId));
    const merged = failed ? [...previous.records.filter(record => !fresh.has(packageId(record))), ...built.servers]
        .filter((record, index, all) => all.findIndex(other => packageId(other) === packageId(record)) === index)
        .sort((a, b) => a.server.name!.localeCompare(b.server.name!)) : [];
    const feed = failed ? { servers: merged, summary: { ...built.summary, rechecked: built.summary.checked,
        remote: merged.filter(record => record._meta?.["agents/community"]?.kind === "remote").length,
        npm: merged.filter(record => record.server.packages?.[0]?.registryType === "npm").length,
        pypi: merged.filter(record => record.server.packages?.[0]?.registryType === "pypi").length } } : built;
    if (reportFlag) await Bun.write(reportFlag.slice(9), JSON.stringify(rejections, null, 1) + "\n");
    if (!failed && !Number.isFinite(limit) && records.length > 1000 && feed.servers.length < 100) {
        throw new Error(`only ${feed.servers.length} of ${records.length} entries passed; refusing to replace the published feed`);
    }
    await Bun.write(out, JSON.stringify(feed) + "\n");
    console.log(`checked ${records.length} registry entries; wrote ${feed.servers.length} to ${out}`);
    checkpoint.close();
    history.close();
}

if (import.meta.main) await main();
