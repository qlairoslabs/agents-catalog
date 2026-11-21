import { readMarketplace, readBundle } from "./skills/marketplace";
import { REFERENCE_ITEMS } from "./mcp/reference";
import { parseDockerCatalog } from "./mcp/docker";
import { guardedFetch } from "./mcp/network";
import type { CatalogItem } from "./mcp/model";

export interface BundleMembers {
    skills: string[];
    connectors: Array<{ name: string; transport?: "http" | "stdio"; leftOut?: string }>;
}
export interface SourceCapture {
    sources: Record<string, CatalogItem[]>;
    errors: Record<string, string>;
    members: Record<string, BundleMembers>;
    bundleFor: Record<string, string>;
}

const repositories = ["anthropics/claude-plugins-official", "anthropics/skills"];

export async function captureSources(): Promise<SourceCapture> {
    const captured: SourceCapture = { sources: { reference: REFERENCE_ITEMS }, errors: {}, members: {}, bundleFor: {} };
    const source = async (id: string, load: () => Promise<CatalogItem[]>) => {
        try {
            const items = await load();
            if (!items.length) throw new Error("source returned no listings");
            captured.sources[id] = items;
        } catch (error) {
            captured.errors[id] = error instanceof Error ? error.message : "source unavailable";
        }
    };
    await Promise.all([
        source("docker", async () => {
            const response = await guardedFetch("https://desktop.docker.com/mcp/catalog/v3/catalog.yaml", { signal: AbortSignal.timeout(30_000) });
            if (!response.ok) throw new Error(`Docker source answered ${response.status}`);
            return parseDockerCatalog(await response.text(), "docker", "Docker");
        }),
        ...repositories.map(repo => source(`marketplace:${repo}`, async () => {
            const id = `marketplace:${repo}`;
            const items = await readMarketplace(`github.com/${repo}`, id, repo);
            const additions = new Map<string, CatalogItem>();
            const listedSkills = new Map(items.filter(item => item.skill).map(item => [item.skill!.source.path, item.id]));
            for (const bundle of items.filter(item => item.bundle)) {
                try {
                    const checked = await readBundle(bundle);
                    bundle.bundle = { ...bundle.bundle!, source: checked.source, version: checked.version, known: true };
                    const skills = checked.skills.map(member => {
                        const existing = listedSkills.get(member.dir);
                        const skillId = existing ?? `${bundle.id}:skill:${member.dir}`;
                        captured.bundleFor[skillId] ??= bundle.id;
                        if (!existing) additions.set(skillId, { ...bundle, id: skillId, kind: "skill", bundle: undefined,
                            name: member.name, title: member.name, description: member.description,
                            skill: { source: { ...checked.source, path: member.dir }, treeSha: member.treeSha, readUrl: member.readUrl } });
                        return skillId;
                    });
                    const connectors: BundleMembers["connectors"] = checked.skipped.map(({ name, reason }) => ({ name, leftOut: reason }));
                    for (const entry of checked.mcp) {
                        const config = entry.config;
                        const name = entry.name;
                        const itemId = `${bundle.id}:mcp:${name}`;
                        captured.bundleFor[itemId] = bundle.id;
                        additions.set(itemId, { ...bundle, id: itemId, kind: "mcp", bundle: undefined, name, title: name,
                            mcp: { config, auth: "none", secrets: [] } });
                        connectors.push(config.type === "http" ? { name, transport: "http" }
                            : config.type === "package" ? { name, transport: "stdio" } : { name, leftOut: "transport is outside schema 1" });
                    }
                    captured.members[bundle.id] = { skills, connectors };
                } catch {
                    // A pinned listing can still be offered if its member lookup failed.
                    captured.members[bundle.id] = { skills: [], connectors: [] };
                }
            }
            return [...items, ...additions.values()];
        })),
    ]);
    return captured;
}

if (import.meta.main) {
    const path = process.argv[2];
    if (!path) throw new Error("Usage: bun generate-catalog.ts <capture.json>");
    const data = await captureSources();
    await Bun.write(path, JSON.stringify(data) + "\n");
    console.log(JSON.stringify({ sources: Object.fromEntries(Object.entries(data.sources).map(([name, items]) => [name, items.length])), errors: data.errors }));
}
