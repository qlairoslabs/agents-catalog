import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdtempSync, rmSync, truncateSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { makeIndex, partWithFallback, pickCommunity } from "./build";
import { comparison } from "./compare";
import { validateIndex, validateIndexBytes, validatePart, validatePartBytes } from "./validate";
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

function cli(args: string[]) {
    return Bun.spawnSync([process.execPath, new URL("./build.ts", import.meta.url).pathname, ...args], { stderr: "pipe", stdout: "pipe" });
}

test("both CLI release checks refuse an invalid UTF-8 title byte and extras in out", async () => {
    const dir = mkdtempSync(join(tmpdir(),"catalog-release-bytes-"));
    try {
        const path = join(dir, "connectors.json");
        const bytes = Buffer.from(JSON.stringify(connectors));
        const title = bytes.indexOf("Notion");
        bytes[title] = 0xff;
        await Bun.write(path, bytes);
        await Bun.write(join(dir, "skills.json"), JSON.stringify(skills));
        expect(cli(["validate",dir]).exitCode).not.toBe(0);
        expect(cli(["index","--commit",commit,"--dir",dir]).exitCode).not.toBe(0);
        expect(await Bun.file(join(dir,"index.json")).exists()).toBe(false);
        await Bun.write(path, JSON.stringify(connectors));
        expect(cli(["validate",dir]).exitCode).toBe(0);
        await Bun.write(join(dir,"report.md"), "Review notes");
        expect(cli(["validate",dir]).stderr.toString()).toContain("must contain only");
        rmSync(join(dir,"report.md"));
        const original = Buffer.from(JSON.stringify(connectors).replace("Notion","Notión") + "\r\n ");
        await Bun.write(path, original);
        expect(cli(["index","--commit",commit,"--dir",dir]).exitCode).toBe(0);
        const index = await Bun.file(join(dir,"index.json")).json();
        expect(index.parts[0]).toMatchObject({bytes:original.byteLength,sha256:createHash("sha256").update(original).digest("hex")});
    } finally { rmSync(dir,{recursive:true,force:true}); }
});

test("release gates reject byte, aggregate, item, nesting and field oversize", async () => {
    const mib = 1024 * 1024;
    const dir = mkdtempSync(join(tmpdir(),"catalog-release-limits-"));
    try {
        const connectorPath = join(dir, "connectors.json"), skillsPath = join(dir, "skills.json"), old = join(dir, "old.json");
        await Bun.write(connectorPath, JSON.stringify(connectors));
        await Bun.write(skillsPath, JSON.stringify(skills));
        await Bun.write(old, "{}");
        truncateSync(old, 2 * mib + 1);
        expect(cli(["index","--commit",commit,"--dir",dir,"--previous",old]).stderr.toString()).toContain("index exceeds");
        rmSync(old);
        truncateSync(connectorPath, 24 * mib + 1);
        expect(cli(["validate",dir]).stderr.toString()).toContain("part exceeds");
        truncateSync(skillsPath, 40 * mib);
        expect(cli(["validate",dir]).stderr.toString()).toContain("selected parts exceed");
        expect(() => validatePartBytes("connectors", JSON.stringify({mcp:Array.from({length:10_001},(_, i) => ({
            ...connectors.mcp[1]!, id:`fixture:${i}`,
        }))}))).toThrow("listing limit");
        expect(() => validatePartBytes("skills", "[".repeat(49)+"]".repeat(49))).toThrow("nested");
        expect(() => validatePartBytes("connectors", JSON.stringify({ mcp:[{
            ...connectors.mcp[0]!, display:{ ...connectors.mcp[0]!.display, title:"x".repeat(201) },
        }]}))).toThrow();
        expect(() => validateIndexBytes(new Uint8Array(2 * mib + 1))).toThrow("index exceeds");
    } finally { rmSync(dir,{recursive:true,force:true}); }
});

test("comparison flags unattributed drops and accepts explicit source evidence", () => {
    const dropped = connector({ type:"http",url:"https://example.com/mcp" });
    const previous = { sources:{ fixture:{items:[dropped]} } };
    const result = comparison(previous, { servers:[] }, [], [], new Map());
    expect(result.unexplained).toEqual([dropped.id]);
    expect(result.text).toContain("UNATTRIBUTED");
    expect(comparison(previous, {servers:[]}, [], [{id:dropped.id, reason:"Upstream listing removed",url:"https://example.com/list"}],new Map()))
        .toMatchObject({unexplained:[],text:expect.stringContaining("Evidence: https://example.com/list")});
});

const r4Available = await Bun.file(new URL("./classify/apply.ts", import.meta.url)).exists();
test.skipIf(!r4Available)("classification attaches matching tags and facets without changing untagged listings", async () => {
    const { applyClassification } = await import("./facets/classification");
    const { facets } = await import("./facets");
    const hashModule = new URL("./classify/hash.ts", import.meta.url);
    const { contentHash, inputOf, toolHash } = await import(hashModule.href);
    const { CLASSIFIER_VERSION } = await import(new URL("./classify/output.ts", import.meta.url).href);
    const dir = mkdtempSync(join(tmpdir(),"catalog-apply-tags-"));
    try {
        const listings = validatePart("connectors", connectors);
        const [item, untagged] = listings;
        if (item?.kind !== "mcp") throw Error("missing connector fixture");
        item.discovery = { attributes: { signin: ["oauth"] } };
        const tool = item.connect.tools![0]!;
        const hash = contentHash(inputOf(item,"connector"));
        const tagFile = join(dir,`${hash}.json`);
        const tag = {
            classifier:CLASSIFIER_VERSION, contentHash:hash, domain:["old-notes"], product:["notion"], audience:["operator"], goal:["automate-work"],
            summary:"Find notes",whenToUse:"Workspace search",tasks:["Search notes"],effects:{[toolHash(tool)]:"read"},flags:[],
        };
        await Bun.write(tagFile, JSON.stringify(tag));
        const vocabulary = join(dir,"vocabulary.json");
        await Bun.write(vocabulary,JSON.stringify({ domain:["productivity/notes"],product:["notion"],audience:[],
            mapping:{domain:{"old-notes":"productivity/notes"},product:{},audience:{}} }));
        const result = await applyClassification(listings,{tags:dir,vocabulary,required:true});
        expect(result.applied).toBe(1);
        expect(result.items[0]).toMatchObject({discovery:{summary:"Find notes",attributes:{domain:["productivity/notes"]}},
            connect:{tools:[{effect:{effect:"read",hash:toolHash(tool)}}]}});
        expect(result.items[1]).toBe(untagged);
        expect(facets(result.items)).toContainEqual({id:"domain",label:"Domain",hierarchical:true,kinds:["mcp"],values:[{id:"productivity/notes"}]});
        const withoutReview = await applyClassification(listings,{tags:dir,vocabulary:join(dir,"missing.json"),required:true});
        expect(withoutReview.items[0]!.discovery.attributes).toMatchObject({goal:["automate-work"]});
        for (const field of ["domain","product","audience"]) expect(withoutReview.items[0]!.discovery.attributes).not.toHaveProperty(field);
        await Bun.write(vocabulary, "{}");
        await expect(applyClassification(listings,{tags:dir,vocabulary})).rejects.toThrow("vocabulary domain");
        await Bun.write(tagFile, JSON.stringify({ ...tag, classifier:0 }));
        expect((await applyClassification(listings,{tags:dir})).applied).toBe(0);
        await Bun.write(tagFile, "malformed");
        expect((await applyClassification(listings,{tags:dir})).applied).toBe(0);
    } finally { rmSync(dir,{recursive:true,force:true}); }
});

test("an empty classification directory leaves ordinary parts unchanged and fails explicit application", async () => {
    const { applyClassification } = await import("./facets/classification");
    const dir = mkdtempSync(join(tmpdir(),"catalog-no-tags-"));
    try {
        const items = validatePart("connectors",connectors);
        expect((await applyClassification(items,{tags:dir})).items).toBe(items);
        await expect(applyClassification(items,{tags:dir,required:true})).rejects.toThrow("no classification tags");
    } finally { rmSync(dir,{recursive:true,force:true}); }
});

test("secret labels fit the schema without changing secret names or references", () => {
    const config = { type:"http", url:"https://example.com/mcp", headers:{ Authorization:"$FIXTURE_TOKEN", "X-Key":"$EMPTY_KEY" } } as const;
    const source = connector(config, [
        {env:"FIXTURE_TOKEN",label:"  A\\t B ".replace("\\t", "\t") + "x".repeat(195) + "😀 remainder"},
        {env:"EMPTY_KEY",label:" \t\n "},
    ]);
    const result = mapItem(source);
    expect(result).toHaveProperty("item.connect.config",config);
    expect(result).toHaveProperty("item.connect.secrets",[
        {env:"FIXTURE_TOKEN",label:"A B " + "x".repeat(195)},
        {env:"EMPTY_KEY",label:"EMPTY_KEY"},
    ]);
});
