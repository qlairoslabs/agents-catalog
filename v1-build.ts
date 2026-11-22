import type { CatalogListingItem } from "./mcp/item";
import { toolHash } from "./mcp/item";
import { mergeItems, normalizeAddress } from "./mcp/map";
import { loadReviewed, attachReviewed } from "./facets/v1";
import { readEvidence } from "./evidence";
import type { CatalogTool } from "./mcp/item";

export async function stageV1(items: CatalogListingItem[], evidenceDir: string, classification?: string) {
    const reviews = await loadReviewed(new Set(items.map(item=>item.id)),classification);
    const drops = new Map<string,string>();
    const staged: CatalogListingItem[] = [];
    const health = new Map<string,number>();
    const candidates = new Map<string, CatalogTool[]>();
    for (const item of items) {
        const row = reviews.get(item.id)!;
        if (row.status === "junk" || row.status === "excluded") {
            drops.set(item.id,"Reviewed status: " + row.status);
            continue;
        }
        const evidence = await readEvidence(evidenceDir,item);
        if (!evidence) throw Error("missing evidence for " + item.id);
        health.set(evidence.health,(health.get(evidence.health) ?? 0)+1);
        if (evidence.health === "deprecated") {
            drops.set(item.id,"Publisher metadata: " + (evidence.reason ?? "deprecated release"));
            continue;
        }
        if ((evidence.unavailableRuns ?? 0) >= 3 && ["unreachable","not-found","rate-limited"].includes(evidence.health)) {
            drops.set(item.id,`Evidence health ${evidence.health} for three consecutive runs (RULES §2.1)`);
            continue;
        }
        const classified = attachReviewed(item,row);
        if (classified.kind === "mcp" && item.kind === "mcp" && classified.connect.config.type === "http"
            && classified.connect.auth === "none" && !Object.keys(classified.connect.config.headers ?? {}).length) {
            const { tools: _inline, ...connection } = classified.connect;
            classified.connect = connection;
            const tools = evidence.tools;
            if (tools?.length) candidates.set(item.id, tools);
        }
        staged.push(classified);
    }
    const { items: mapped, aliases } = mergeItems(staged);
    for (const item of mapped) {
        if (item.kind === "mcp") {
            const tools = candidates.get(item.id);
            if (tools) item.connect.tools = tools;
        }
    }
    const ids = new Set(mapped.map(item=>item.id));
    const final = mapped.map(item => item.kind === "bundle" ? {
        ...item, bundle:{ ...item.bundle, skills:item.bundle.skills.filter(id=>ids.has(id)) },
    } : item);
    return { items:final, drops, aliases, health };
}

export function duplicateTools(items: readonly CatalogListingItem[]) {
    const groups = new Map<string,Array<{ id:string; address:string }>>();
    for (const item of items) {
        if (item.kind !== "mcp" || item.connect.config.type !== "http" || !item.connect.tools?.length) continue;
        const key = item.connect.tools.map(toolHash).sort().join(":");
        const group = groups.get(key) ?? [];
        group.push({ id:item.id,address:normalizeAddress(item.connect.config.url) });
        groups.set(key,group);
    }
    return [...groups.values()].filter(group=>new Set(group.map(item=>item.address)).size>1);
}

export function v1Report(before: readonly CatalogListingItem[], result: Awaited<ReturnType<typeof stageV1>>) {
    const after = new Set(result.items.map(item=>item.id));
    const changes:string[] = [];
    for (const item of before) {
        if (after.has(item.id)) continue;
        const drop = result.drops.get(item.id);
        const merge = result.aliases.get(item.id);
        if (drop) changes.push(`| ${item.id} | dropped | ${drop} |`);
        else if (merge) changes.push(`| ${item.id} | merged | Same normalized connection or content (RULES §10), kept as ${merge} |`);
        else throw Error("unattributed v1 drop: " + item.id);
    }
    const flagged = duplicateTools(result.items);
    return ["# V1 catalogue comparison","",
        `Reviewed input: ${before.length}. Published: ${result.items.length}. Dropped: ${result.drops.size}. Merged: ${result.aliases.size}.`,
        `Tool definitions: ${result.items.reduce((n,item)=>n+(item.kind==="mcp" ? item.connect.tools?.length ?? 0 : 0),0)}.`,
        "", "## Evidence health","", ...[...result.health].sort().map(([key,count])=>`- ${key} — ${count}`),
        "", "## Drops and merges","","| ID | Change | Reason |","| --- | --- | --- |", ...changes,
        "", "## Different addresses with identical tool definitions","",
        ...flagged.map(group=>"- "+group.map(row=>row.id).join(", ")),""].join("\n");
}
