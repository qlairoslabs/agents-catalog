import { mkdir, rename } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { guardedFetch, type OAuthIo } from "./mcp/network";
import { responseHealth, remoteEvidence, type Health } from "./mcp/tools";
import { listingIdentity } from "./mcp/map";
import { validatePartBytes } from "./validate";
import type { CatalogListingItem, CatalogTool, GitSource } from "./mcp/item";

export interface Evidence {
    id: string;
    target: string;
    fetched_at: string;
    health: Health;
    tools?: CatalogTool[];
    files?: Record<string, string>;
    latest?: string;
    unavailableRuns?: number;
    reason?: string;
}
const digest = (id: string) => createHash("sha256").update(id).digest("hex");
const pathOf = (dir: string, id: string) => join(dir, digest(id) + ".json");
export function evidenceTarget(item: CatalogListingItem): string {
    const source = item.kind === "skill" ? item.skill.source : item.kind === "bundle" ? item.bundle.source : null;
    return digest(source
        ? JSON.stringify([item.kind, source.owner, source.repo, source.commit, source.path])
        : listingIdentity(item));
}

export async function readEvidence(dir: string, listing: CatalogListingItem): Promise<Evidence | undefined> {
    const file = Bun.file(pathOf(dir, listing.id));
    if (!await file.exists()) return;
    const item = await file.json() as Evidence;
    if (item.id !== listing.id || !Number.isFinite(Date.parse(item.fetched_at))
        || !["ok","auth-required","not-found","unreachable","deprecated","rate-limited"].includes(item.health)) {
        throw Error("invalid cached evidence for " + listing.id);
    }
    return item.target === evidenceTarget(listing) ? item : undefined;
}

async function get(url: string, io: OAuthIo, cap: number, signal: AbortSignal) {
    const response = await guardedFetch(url,{ signal, headers: { "user-agent": "catalog-indexer/1" } },io);
    const health = responseHealth(response.status);
    const reader = response.body?.getReader();
    if (!reader) return { health, text: "" };
    const decoder = new TextDecoder();
    let length = 0, text = "";
    try {
        if (health !== "ok") return { health, text };
        while (true) {
            const next = await reader.read();
            if (next.done) return { health, text: text + decoder.decode() };
            const room = cap - length;
            if (room < next.value.byteLength) {
                text += decoder.decode(next.value.subarray(0,room),{stream:true});
                return { health, text: text + decoder.decode(), truncated: true };
            }
            length += next.value.byteLength;
            text += decoder.decode(next.value,{stream:true});
        }
    } finally { await reader.cancel().catch(()=>{}); }
}
function pinned(source: GitSource, file: string) {
    const path = [source.owner,source.repo,source.commit,...source.path.split("/").filter(Boolean),...file.split("/")];
    if (path.some(segment => segment === "." || segment === "..")) throw Error("unsafe evidence path");
    return "https://raw.githubusercontent.com/" + path.map(encodeURIComponent).join("/");
}

export function evidenceHost(item: CatalogListingItem) {
    if (item.kind !== "mcp") return "raw.githubusercontent.com";
    const cfg = item.connect.config;
    if (cfg.type === "http") return new URL(cfg.url).hostname.replace(/^www\./,"");
    return cfg.package.manager;
}

export async function fetchEvidence(item: CatalogListingItem, io: OAuthIo = {}): Promise<Evidence> {
    const base = { id:item.id, target:evidenceTarget(item), fetched_at:new Date().toISOString() };
    const signal = AbortSignal.timeout(12_000);
    try {
        if (item.kind !== "mcp") {
            const source = item.kind === "skill" ? item.skill.source : item.bundle.source;
            const paths = item.kind === "skill" ? ["SKILL.md"] : ["README.md",".claude-plugin/plugin.json","plugin.json"];
            const files: Record<string,string> = {};
            let health: Health = "not-found";
            for (const path of paths) {
                const result = await get(pinned(source,path),io,8000,signal);
                if (result.health === "ok") files[path] = result.text;
                else if (result.health !== "not-found") health = result.health;
            }
            return { ...base, health:Object.keys(files).length ? "ok" : health, files };
        }
        const cfg = item.connect.config;
        if (cfg.type === "http") return { ...base, ...await remoteEvidence(cfg.url,item.connect.auth === "none" && !Object.keys(cfg.headers ?? {}).length,io) };
        const { manager, identifier, version } = cfg.package;
        if (manager === "mcpb") return { ...base, health:"ok", reason:"Reviewed digest-pinned MCPB; never opened as executable code." };
        const suffix = encodeURIComponent(identifier);
        const npm = manager === "npm";
        const url = npm ? "https://registry.npmjs.org/" + suffix
            : "https://pypi.org/pypi/" + suffix + "/" + encodeURIComponent(version) + "/json";
        const result = await get(url,io,8 * 1024 * 1024,signal);
        if (result.health !== "ok") return { ...base, health:result.health };
        if (result.truncated) return { ...base, health:"unreachable", reason:"Package metadata exceeded the byte limit." };
        const metadata = JSON.parse(result.text);
        const release = npm ? metadata.versions?.[version] : metadata.info;
        if (!release) return { ...base, health:"not-found" };
        const distribution = Array.isArray(metadata.urls) ? metadata.urls : [];
        const deprecated = npm ? Boolean(release.deprecated) : distribution.length > 0 && distribution.every((file: { yanked?: boolean }) => file.yanked === true);
        return { ...base, health:deprecated ? "deprecated" : "ok", ...(deprecated ? { reason:npm ? "deprecated npm release" : "yanked PyPI release" } : {}),
            latest:npm ? metadata["dist-tags"]?.latest : undefined, files:{ README:String(npm ? metadata.readme ?? "" : release.description ?? "").slice(0,8000) } };
    } catch { return { ...base, health:"unreachable" }; }
}

export async function collectEvidence(items: readonly CatalogListingItem[], dir: string, previous?: string, io: OAuthIo = {}) {
    await mkdir(dir,{recursive:true});
    const queues = Map.groupBy(items,evidenceHost);
    const ready = [...queues.values()];
    let completed = 0;
    async function worker() {
        for (let queue = ready.shift(); queue; queue = ready.shift()) {
            const item = queue.shift()!;
            if (!await readEvidence(dir,item)) {
                const result = await fetchEvidence(item,io);
                if (["unreachable","rate-limited","not-found"].includes(result.health)) {
                    const prior = previous ? await readEvidence(previous,item) : undefined;
                    result.unavailableRuns = (prior?.unavailableRuns ?? 0) + 1;
                    if (prior?.tools && result.unavailableRuns < 3) result.tools = prior.tools;
                }
                const path = pathOf(dir,item.id);
                await Bun.write(path + ".tmp",JSON.stringify(result) + "\n");
                await rename(path + ".tmp",path);
            }
            if (++completed % 250 === 0) console.log(`Evidence ${completed}/${items.length}`);
            if (queue.length) ready.push(queue);
        }
    }
    await Promise.all(Array.from({length:32},worker));
    console.log(`Evidence ${completed}/${items.length}`);
}

if (import.meta.main) {
    const [, , input, dir, previous] = process.argv;
    if (!input || !dir) throw Error("Usage: bun evidence.ts <parts-dir> <evidence-dir> [previous-evidence-dir]");
    const items = (await Promise.all((["connectors","skills"] as const).map(async part =>
        validatePartBytes(part,new Uint8Array(await Bun.file(join(input,part+".json")).arrayBuffer()))))).flat();
    const excluded = process.env.CATALOG_EVIDENCE_EXCLUDE;
    const ids = new Set<string>(excluded ? await Bun.file(excluded).json() : []);
    await collectEvidence(items.filter(item => !ids.has(item.id)),dir,previous);
}
