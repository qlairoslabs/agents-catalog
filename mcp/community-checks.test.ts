import { test, expect } from "bun:test";
import { checkPackage, checkRemote, declaresServerName, packageAgeDays, type PackageSignals, type RemoteSignals } from "./community-checks";

const server = { name: "com.example/tool" };
const remote: RemoteSignals = { live: true, auth: "oauth", domainAgeDays: 365, listingAgeDays: 60,
    trancoTopMillion: false, hostEntries: 1, publisherEntries: 1, urlNamespaces: 1 };
const pkg: PackageSignals = { exists: true, deprecated: false, advisories: 0, repositoryMatchesNamespace: true,
    ageDays: 31, weeklyDownloads: 1000, provenance: true, previousProvenance: true };

test("remote feed gate checks liveness, namespace, hosting, publisher, age and republishing", () => {
    const url = "https://mcp.example.com/mcp";
    expect(checkRemote(server, url, remote).accepted).toBe(true);
    for (const override of [{ live: false }, { auth: null }, { hostEntries: 10 }, { publisherEntries: 4 },
        { urlNamespaces: 2 }, { domainAgeDays: 100 }, { listingAgeDays: 29 }]) {
        expect(checkRemote(server, url, { ...remote, ...override }).accepted).toBe(false);
    }
    expect(checkRemote(server, url, { ...remote, domainAgeDays: null, listingAgeDays: 89 }).accepted).toBe(false);
    expect(checkRemote(server, url, { ...remote, domainAgeDays: null, listingAgeDays: 90 }).accepted).toBe(true);
    expect(checkRemote(server, url, { ...remote, domainAgeDays: 1, listingAgeDays: 1, trancoTopMillion: true }).accepted).toBe(true);
    expect(checkRemote(server, "https://other.com/mcp", remote).accepted).toBe(false);
    expect(checkRemote({ name: "com.vercel.app/tool" }, "https://mcp.vercel.app/mcp", remote).accepted).toBe(false);
    expect(checkRemote(server, "https://{tenant}.example.com/mcp", remote).accepted).toBe(false);
});

test("package feed gate checks existence, OSV, repository, age, downloads and provenance", () => {
    expect(checkPackage(pkg).accepted).toBe(true);
    for (const override of [{ exists: false }, { deprecated: true }, { advisories: 1 },
        { repositoryMatchesNamespace: false }, { ageDays: 29 }, { weeklyDownloads: 999 },
        { provenance: false }]) {
        expect(checkPackage({ ...pkg, ...override }).accepted).toBe(false);
    }
    expect(checkPackage({ ...pkg, provenance: false, previousProvenance: false }).accepted).toBe(true);
});

test("package age counts from the first release, so an active package keeps passing", () => {
    const now = Date.parse("2026-10-30T00:00:00Z");
    const npm = { time: { created: "2025-04-01T00:00:00Z", "1.0.0": "2025-04-01T00:00:00Z", "9.0.0": "2026-10-29T00:00:00Z" } };
    expect(packageAgeDays("npm", npm, now)).toBeGreaterThan(500);
    const pypi = { releases: { "1.0": [{ upload_time_iso_8601: "2025-04-01T00:00:00Z" }], "2.0": [{ upload_time_iso_8601: "2026-10-29T00:00:00Z" }], "3.0": [] } };
    expect(packageAgeDays("pypi", pypi, now)).toBeGreaterThan(500);
    expect(packageAgeDays("npm", { time: { created: "2026-10-20T00:00:00Z" } }, now)).toBeLessThan(30);
    expect(packageAgeDays("npm", {}, now)).toBe(0);
    expect(packageAgeDays("pypi", { releases: {} }, now)).toBe(0);
});

test("a package must name the server to tie it to a verified domain", () => {
    expect(declaresServerName("npm", { mcpName: "com.supabase/mcp" }, {}, "com.supabase/mcp")).toBe(true);
    expect(declaresServerName("npm", { mcpName: "com.other/mcp" }, {}, "com.supabase/mcp")).toBe(false);
    expect(declaresServerName("npm", {}, {}, "com.supabase/mcp")).toBe(false);
    const pypi = (description: string) => declaresServerName("pypi", {}, { info: { description } }, "com.example/tool");
    expect(pypi("Intro\n<!-- mcp-name: com.example/tool -->\n")).toBe(true);
    expect(pypi("mcp-name: com.example/tool\n")).toBe(true);
    expect(pypi("<p>mcp-name: com.example/tool</p>")).toBe(true);
    expect(pypi("<!--mcp-name: com.example/tool-->")).toBe(true);
    expect(pypi("mcp-name: com.example/tool.")).toBe(false);
    expect(pypi("mcp-name: com.example/tool2\n")).toBe(false);
    expect(pypi("no marker")).toBe(false);
});
