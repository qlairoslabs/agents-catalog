import { test, expect } from "bun:test";
import { buildCheckedFeed, HttpError, retrying, type RegistryRecord } from "./feed-builder";
import { parseCommunityFeed } from "./feed";

const stamp = "2026-07-01T00:00:00Z";
const record = (name: string, url?: string): RegistryRecord => ({ server: { name,
    ...(url ? { remotes: [{ type: "streamable-http", url }] } : { packages: [{ registryType: "npm", identifier: "example-mcp", version: "1.0.0", transport: { type: "stdio" } }] }) },
    _meta: { "io.modelcontextprotocol.registry/official": { publishedAt: stamp, status: "active" } } });

test("builder accepts checked entries, records signals and excludes republished URLs", async () => {
    const records = [record("com.example/one", "https://mcp.example.com/mcp"),
        record("com.other/copy", "https://mcp.example.com/mcp"), record("io.github.acme/package")];
    const feed = await buildCheckedFeed(records, {
        remote: async () => ({ live: true, auth: "oauth", domainAgeDays: 365, trancoTopMillion: false }),
        package: async () => ({ exists: true, deprecated: false, advisories: 0, repositoryMatchesNamespace: true,
            ageDays: 60, weeklyDownloads: 2000, provenance: false, previousProvenance: false }),
    }, Date.parse("2026-10-06T00:00:00Z"));
    expect(feed.servers.map(entry => entry.server.name)).toEqual(["io.github.acme/package"]);
    expect(feed.servers[0]?._meta?.["agents/community"]?.verdict).toBe("community");
});

test("fixed registry rejections do not perform network probes", async () => {
    const records = [record("com.example/one", "https://other.test/mcp")];
    let probes = 0;
    const feed = await buildCheckedFeed(records, {
        remote: async () => { probes++; throw new Error("must not probe"); },
        package: async () => { throw new Error("must not check package"); },
    });
    expect(probes).toBe(0);
    expect(feed.servers).toEqual([]);
});

test("a mixed server offers remote and package only after each passes its own gate", async () => {
    const mixed = record("com.example/tool", "https://mcp.example.com/mcp");
    mixed.server.packages = [{ registryType: "npm", identifier: "example-mcp", version: "1.0.0", transport: { type: "stdio" } }];
    const providers = { remote: async () => ({ live: true, auth: "none" as const, domainAgeDays: 365, trancoTopMillion: false }),
        package: async () => ({ exists: true, deprecated: false, advisories: 0, repositoryMatchesNamespace: true,
            ageDays: 60, weeklyDownloads: 2000, provenance: true, previousProvenance: false }) };
    const feed = await buildCheckedFeed([mixed], providers, Date.parse("2026-10-06T00:00:00Z"));
    expect(feed.summary).toMatchObject({ remote: 1, npm: 1 });
    expect(parseCommunityFeed(feed).map(item => [item.id, item.mcp?.config.type])).toEqual([
        ["community-feed:com.example/tool#npm:example-mcp", "package"],
        ["community-feed:com.example/tool", "http"],
    ]);
    const rejected = await buildCheckedFeed([mixed], { ...providers,
        package: async () => ({ ...await providers.package(), advisories: 1 }) }, Date.parse("2026-10-06T00:00:00Z"));
    expect(parseCommunityFeed(rejected).map(item => item.mcp?.config.type)).toEqual(["http"]);
});

const signals = { exists: true, deprecated: false, advisories: 0, repositoryMatchesNamespace: true,
    ageDays: 60, weeklyDownloads: 2000, provenance: false, previousProvenance: false };
const passing = { remote: async () => ({ live: true, auth: "oauth" as const, domainAgeDays: 365, trancoTopMillion: false }),
    package: async () => signals };
const failing = { remote: async () => { throw new Error("timed out"); }, package: async () => { throw new Error("timed out"); } };
const when = Date.parse("2026-10-06T00:00:00Z");

test("an accepted entry survives a failed lookup, and leaves after three runs without an answer", async () => {
    const records = [record("com.example/one", "https://mcp.example.com/mcp"), record("io.github.acme/package")];
    let feed = await buildCheckedFeed(records, passing, when);
    expect(feed.servers).toHaveLength(2);
    feed = await buildCheckedFeed(records, failing, when, undefined, feed.servers);
    expect(feed.servers.map(entry => entry._meta?.["agents/community"]?.unavailableRuns)).toEqual([1, 1]);
    expect(feed.summary).toMatchObject({ remote: 1, npm: 1, rejected: { "remote signal unavailable, kept": 1, "package signal unavailable, kept": 1 } });
    feed = await buildCheckedFeed(records, failing, when, undefined, feed.servers);
    expect(feed.servers.map(entry => entry._meta?.["agents/community"]?.unavailableRuns)).toEqual([2, 2]);
    feed = await buildCheckedFeed(records, failing, when, undefined, feed.servers);
    expect(feed.servers).toEqual([]);
    expect(feed.rejections.map(entry => [entry.reason, entry.detail])).toEqual([
        ["remote signal unavailable", "timed out"], ["package signal unavailable", "timed out"]]);
});

test("a real pass clears the count of runs without an answer", async () => {
    const records = [record("io.github.acme/package")];
    const kept = await buildCheckedFeed(records, failing, when, undefined, (await buildCheckedFeed(records, passing, when)).servers);
    expect(kept.servers[0]?._meta?.["agents/community"]?.unavailableRuns).toBe(1);
    const again = await buildCheckedFeed(records, passing, when, undefined, kept.servers);
    expect(again.servers[0]?._meta?.["agents/community"]?.unavailableRuns).toBeUndefined();
});

test("a clear no removes an accepted entry, and a new entry needs a real pass", async () => {
    const records = [record("io.github.acme/package")];
    const before = (await buildCheckedFeed(records, passing, when)).servers;
    const no = await buildCheckedFeed(records, { ...passing, package: async () => ({ ...signals, advisories: 1 }) }, when, undefined, before);
    expect(no.servers).toEqual([]);
    expect(no.rejections).toEqual([{ name: "io.github.acme/package", kind: "package", identifier: "example-mcp", reason: "security advisory" }]);
    expect((await buildCheckedFeed(records, failing, when)).servers).toEqual([]);
});

test("an entry the registry has deprecated is not kept", async () => {
    const records = [record("io.github.acme/package")];
    const before = (await buildCheckedFeed(records, passing, when)).servers;
    records[0]!._meta!["io.modelcontextprotocol.registry/official"].status = "deprecated";
    expect((await buildCheckedFeed(records, failing, when, undefined, before)).servers).toEqual([]);
});

test("retrying rides out failures and stops at a definite answer", async () => {
    let calls = 0;
    expect(await retrying(async () => { if (++calls < 3) throw new HttpError(503, "busy"); return "ok"; }, 6, 1)).toBe("ok");
    expect(calls).toBe(3);
    calls = 0;
    await expect(retrying(async () => { calls++; throw new HttpError(404, "gone"); }, 6, 1)).rejects.toThrow("gone");
    expect(calls).toBe(1);
    calls = 0;
    await expect(retrying(async () => { calls++; throw new Error("timed out"); }, 3, 1)).rejects.toThrow("timed out");
    expect(calls).toBe(3);
});
