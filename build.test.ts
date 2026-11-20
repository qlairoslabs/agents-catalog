import { afterEach, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { makeIndex, partWithFallback, pickCommunity } from "./build";
import { validateIndex, validatePart } from "./validate";
import { mapItem, mergeItems } from "./mcp/map";
import { registryToItem } from "./mcp/registry";
import { Checkpoint } from "./mcp/checkpoint";
import { discoverTools } from "./mcp/tools";
import type { CatalogItem } from "./mcp/model";
import connectors from "./examples/connectors.json";
import skills from "./examples/skills.json";

const commit = "a".repeat(40);
const now = Date.parse("2026-11-20T10:00:00Z");
const connector = (config: NonNullable<CatalogItem["mcp"]>["config"], secrets: { env: string; label: string }[] = []): CatalogItem =>
    ({ id:"fixture:connector", kind:"mcp", name:"connector", title:"Connector", icon:null, description:null, category:null,
        trust:"curated", publisher:null, source:{id:"fixture",label:"Fixture"}, mcp:{config,secrets,auth:secrets.length ? "key" : "none"} });

test("maps only streamable HTTPS, declared secret references and exact store packages", () => {
    expect(mapItem(connector({ type:"sse", url:"https://example.com/sse" }))).toHaveProperty("reason","SSE-only transport");
    expect(mapItem(connector({ command:"npx" }))).toHaveProperty("reason","launches a stdio command");
    expect(mapItem(connector({ type:"http", url:"http://example.com/mcp" }))).toHaveProperty("reason");
    expect(mapItem(connector({ type:"http", url:"https://example.com/mcp", headers:{ Authorization:"literal" } }))).toHaveProperty("reason");
    const config = { type:"http", url:"https://example.com/mcp", headers:{ Authorization:"$FIXTURE_TOKEN" } } as const;
    expect(mapItem(connector(config))).toHaveProperty("reason");
    expect(mapItem(connector(config,[{env:"FIXTURE_TOKEN",label:"Key"}]))).toHaveProperty("item.connect.config",config);
    const pkg = {manager:"npm",identifier:"@fixture/demo",version:"1.2.3"} as const;
    expect(mapItem(connector({type:"package",package:pkg,update:"auto"}))).toHaveProperty("item.connect.config.update","pinned");
    expect(mapItem(connector({type:"package",package:{...pkg,version:"latest"}}))).toHaveProperty("reason");
    expect(mapItem(connector({type:"package",package:pkg,env:{PREFIX:"literal"}}))).toHaveProperty("reason");
});

test("a source listing with SSE, HTTPS, and a package maps its HTTPS remote", () => {
    const item = registryToItem({name:"com.example/server",remotes:[
        {type:"sse",url:"https://example.com/sse"}, {type:"streamable-http",url:"https://example.com/mcp"},
    ],packages:[{registryType:"npm",identifier:"demo",version:"1.2.3",transport:{type:"stdio"}}]}, "registry", "Registry", [])!;
    expect(mapItem(item)).toHaveProperty("item.connect.config",{type:"http",url:"https://example.com/mcp"});
});

test("deduplication retains trusted origin and stable aliases without losing differing connections", () => {
    const first = validatePart("connectors",connectors)[0]!;
    const lower = {...first,id:"registry:notion",origin:{...first.origin,trust:"community" as const,source:{id:"registry",label:"Registry"},
        all:[{source:{id:"registry",label:"Registry"},trust:"community" as const}]}};
    const merged = mergeItems([lower,first]);
    expect(merged.items).toHaveLength(1);
    expect(merged.items[0]?.origin.all).toHaveLength(2);
    expect(merged.aliases.get(lower.id)).toBe(first.id);
});

test("an invalid or unusually small part keeps prior bytes while the other part builds", () => {
    const old = JSON.stringify(connectors) + "\n";
    const invalid = {...connectors,mcp:[{...connectors.mcp[0],connect:{...connectors.mcp[0]!.connect, config:{type:"http",url:"https://example.com",headers:{Authorization:"$UNDECLARED"}}}}]};
    expect(partWithFallback("connectors",invalid,old).text).toBe(old);
    expect(partWithFallback("connectors",{mcp:[]},old).warning).toContain("threshold");
    expect(partWithFallback("connectors",connectors,old,["Docker source empty"]).warning).toContain("Docker source empty");
    expect(partWithFallback("skills",skills,undefined).items).toHaveLength(2);
    expect(() => partWithFallback("connectors",invalid,undefined)).toThrow();
});

test("the index describes exact bytes, pins URLs, and stays monotonic", () => {
    const parts = {connectors: JSON.stringify(connectors) + "\n", skills:JSON.stringify(skills)};
    const index = makeIndex(commit,parts,now);
    expect(index.parts[0]).toMatchObject({url:`https://raw.githubusercontent.com/qlairoslabs/agents-catalog/${commit}/connectors.json`,
        bytes:Buffer.byteLength(parts.connectors),sha256:createHash("sha256").update(parts.connectors).digest("hex"),items:2});
    expect(makeIndex(commit,parts,now,validateIndex(index)).sequence).toBe(index.sequence + 1);
    expect(() => makeIndex("main",parts,now)).toThrow();
    expect(() => validateIndex({...index,parts:[{...index.parts[0]!,url:`https://raw.githubusercontent.com/qlairoslabs/agents-catalog/${commit}/x/../connectors.json` }]})).toThrow();
});

test("checkpoint resumes completed inputs, keeps dated signals and does not record failures", async () => {
    const dir = mkdtempSync(join(tmpdir(),"catalog-checkpoint-"));
    const path = join(dir,"signals.db");
    let clock = 1;
    let db = new Checkpoint(path,() => clock);
    try {
        expect(await db.remember("server:v1",async () => "checked")).toBe("checked");
        await expect(db.remember("retry",async () => { throw Error("outage"); })).rejects.toThrow("outage");
        db.put("downloads",3);
        db.close();
        db = new Checkpoint(path,() => clock);
        expect(await db.remember("server:v1",async () => { throw Error("already checked"); })).toBe("checked");
        expect(await db.remember("server:v2",async () => "changed")).toBe("changed");
        expect(await db.remember("retry",async () => "recovered")).toBe("recovered");
        expect(db.get("downloads",5)).toBe(3);
        clock = 6;
        expect(db.get("downloads",5)).toBeUndefined();
    } finally { db.close(); rmSync(dir,{recursive:true,force:true}); }
});

test("no-auth discovery lists tool shapes without invoking tools or following redirects", async () => {
    const requests:string[] = [];
    const listed = await discoverTools("https://example.com/mcp", {
        resolve:async () => ["93.184.216.34"],
        fetch:async (_url, init) => {
            if (init?.method === "DELETE") { requests.push("DELETE"); return new Response(null,{status:204}); }
            const {method} = JSON.parse(String(init?.body)); requests.push(method);
            if (method === "initialize") return Response.json({result:{protocolVersion:"2025-06-18",capabilities:{tools:{}}}},{headers:{"mcp-session-id":"fixture"}});
            if (method === "notifications/initialized") return new Response(null,{status:202});
            return Response.json({result:{tools:[{name:"search",inputSchema:{type:"object"},annotations:{readOnlyHint:true}}]}});
        },
    });
    expect(requests).toEqual(["initialize","notifications/initialized","tools/list","DELETE"]);
    expect(listed).toEqual([{name:"search",description:"",inputSchema:{type:"object"}}]);
});


test("recorded key auth without a declared header is dropped before tool discovery", () => {
    const { items } = pickCommunity([{ server:{name:"com.example/server",remotes:[{type:"streamable-http",url:"https://example.com/mcp"}]},
        _meta:{"agents/community":{kind:"remote",auth:"key"}} }], []);
    expect(items).toHaveLength(1);
    expect(mapItem(items[0]!)).toHaveProperty("reason","authentication is required but the source declares no secret header");
});
