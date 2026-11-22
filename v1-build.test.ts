import { expect,test } from "bun:test";
import { attachReviewed,normalizeRegions,readClassification,readRegionTable,readTaxonomy,taxonomyFacet } from "./facets/v1";
import { fetchEvidence } from "./evidence";
import { mergeItems } from "./mcp/map";
import { duplicateTools } from "./v1-build";
import { validateIndex } from "./validate";
import { readPart } from "./mcp/item";
import connectors from "./examples/connectors.json";
import index from "./examples/index.json";

const taxonomy = readTaxonomy(await Bun.file(new URL("./facets/taxonomy-v1.1.tsv",import.meta.url)).text());
const regions = readRegionTable(await Bun.file(new URL("./facets/regions.tsv",import.meta.url)).text());
const connector = readPart(connectors,"connectors")[0]!;
if (connector.kind !== "mcp") throw Error("invalid fixture");
const io = (fetch: (url:string,init?:RequestInit)=>Promise<Response>)=>({fetch,resolve:async()=>["93.184.216.34"]});

test("v1 validates every ID, code, language, region and status and retains the original description", () => {
    const row = {id:connector.id,status:"profile",code:"NEW",secondary_codes:"01.03.02",summary:"Find and update pages.",language:"en",regions:"United Kingdom;EU"};
    const ids = new Set([connector.id]);
    const result = readClassification([row],ids,taxonomy,regions).get(connector.id)!;
    expect(attachReviewed(connector,result)).toMatchObject({display:connector.display,discovery:{
        summary:row.summary,attributes:{topic:["01.03.02"],status:["profile"],language:["en"],region:["gb","eu"]},
    }});
    for (const patch of [{id:"missing"},{status:"new"},{language:"zz"},{code:"00.00"},{regions:"Atlantis"}]) {
        expect(()=>readClassification([{...row,...patch}],ids,taxonomy,regions)).toThrow();
    }
    expect(()=>readClassification([],ids,taxonomy,regions)).toThrow("0 of 1");
    expect(normalizeRegions("DACH;Germany;Europe;EU;Mediterranean",regions)).toEqual(["de","at","ch","europe","eu"]);
    expect(normalizeRegions("Trinidad;Tobago",regions)).toEqual(["tt"]);
    expect(normalizeRegions("unknown",regions)).toEqual([]);
});

test("all 332 taxonomy values fit the signed index", () => {
    const facet = taxonomyFacet(taxonomy);
    expect(facet.values).toHaveLength(332);
    expect(validateIndex({...index,facets:[facet]}).facets[0]).toEqual(facet);
    expect(Buffer.byteLength(JSON.stringify({...index,facets:[facet]}))).toBeLessThan(150_000);
});

test("normalize equivalent addresses and flag identical lists only across different addresses", () => {
    const make = (id:string,url:string)=>({...connector,id,connect:{...connector.connect,config:{type:"http" as const,url}}});
    const a=make("docker:a","https://EXAMPLE.com/MCP/?foo=1");
    const b=make("community-feed:b","https://example.com/MCP/?foo=1");
    b.origin={...b.origin,trust:"community"};
    const c=make("docker:c","https://other.example/mcp");
    const merged=mergeItems([a,b,c]);
    expect(merged.aliases.get(b.id)).toBe(a.id);
    expect(merged.items).toHaveLength(2);
    expect(duplicateTools(merged.items)[0]?.map(x=>x.id)).toEqual([a.id,c.id]);
    for (const url of ["https://example.com/mcp/?foo=1","https://www.example.com/MCP/?foo=1",
        "https://example.com/MCP?foo=1","https://example.com/MCP/?foo=2"]) {
        expect(mergeItems([a,make("docker:distinct",url)]).items).toHaveLength(2);
    }
    expect(mergeItems([a,{...b,connect:{...b.connect,auth:"key"}}]).items).toHaveLength(2);
    expect(mergeItems([a,{...b,connect:{...b.connect,secrets:[{env:"API_KEY",label:"Key"}]}}]).items).toHaveLength(2);
});

test("authenticated health sends initialize only and records 401", async () => {
    const requests:string[] = [];
    const result=await fetchEvidence(connector,io(async (_url,init)=>{
        requests.push(JSON.parse(String(init?.body)).method);
        return new Response(null,{status:401});
    }));
    expect(result.health).toBe("auth-required");
    expect(requests).toEqual(["initialize"]);
    expect(result.tools).toBeUndefined();
});

test("package evidence checks the pinned npm version and PyPI yanked files", async () => {
    const packageItem=(manager:"npm"|"pypi")=>({...connector,connect:{...connector.connect,config:{type:"package" as const,package:{manager,identifier:"demo",version:"1.0.0"}}}});
    const npm=await fetchEvidence(packageItem("npm"),io(async()=>Response.json({
        versions:{"1.0.0":{deprecated:"old"},"2.0.0":{}}, "dist-tags":{latest:"2.0.0"},readme:"README evidence"
    })));
    expect(npm).toMatchObject({health:"deprecated",latest:"2.0.0",files:{README:"README evidence"}});
    const pypi=await fetchEvidence(packageItem("pypi"),io(async url=>{
        expect(url).toEndWith("/1.0.0/json");
        return Response.json({info:{description:"readme"},urls:[{yanked:true}]});
    }));
    expect(pypi.health).toBe("deprecated");
});

test("skill and bundle evidence use pinned sources and keep their text outside the listing", async () => {
    const parts=await Bun.file(new URL("./examples/skills.json",import.meta.url)).json();
    const listing=readPart(parts,"skills");
    const names:string[]=[];
    const fetch=io(async url=>{ names.push(url); return new Response("untrusted evidence"); });
    const skill=await fetchEvidence(listing[0]!,fetch);
    const bundle=await fetchEvidence(listing[1]!,fetch);
    expect(names[0]).toEndWith("/1111111111111111111111111111111111111111/document-skills/pdf/SKILL.md");
    expect(bundle.files?.["README.md"]).toBe("untrusted evidence");
    expect(skill.files?.["SKILL.md"]).toBe("untrusted evidence");
    expect(listing[0]).not.toHaveProperty("files");
});

test("public MCP evidence follows the tool cursor and never invokes a tool", async () => {
    const item={...connector,connect:{...connector.connect,auth:"none" as const}};
    const methods:string[]=[];
    const result=await fetchEvidence(item,io(async (_url,init)=>{
        if (init?.method==="DELETE") return new Response(null,{status:204});
        const {method,params}=JSON.parse(String(init?.body));
        methods.push(method);
        if (method==="initialize") return Response.json({result:{protocolVersion:"2025-06-18",capabilities:{tools:{}}}});
        if (method==="notifications/initialized") return new Response(null,{status:202});
        const tool=(name:string)=>({name,inputSchema:{type:"object"},annotations:{readOnlyHint:true}});
        return Response.json({result:params?.cursor ? {tools:[tool("next")]} : {tools:[tool("first")],nextCursor:"one"}});
    }));
    expect(methods).toEqual(["initialize","notifications/initialized","tools/list","tools/list"]);
    expect(result.tools).toEqual(["first","next"].map(name=>({name,description:"",inputSchema:{type:"object"}})));
});

test("detached parts verify shared blobs, exact bytes, links and effect counts", async () => {
    const {mkdtemp,rm}=await import("node:fs/promises");
    const {join}=await import("node:path");
    const {detachTools,loadToolParts,writeToolParts}=await import("./tool-parts");
    const {toolHash}=await import("./mcp/item");
    const dir=await mkdtemp("/tmp/catalog-tools-");
    try {
        const tool=connector.connect.tools![0]!;
        const item={...connector,connect:{...connector.connect,tools:[{...tool,effect:{effect:"read" as const,hash:toolHash(tool)}}]}};
        const detached=detachTools([item,{...item,id:"same:second"}]);
        expect(detached.blobs.size).toBe(1);
        await writeToolParts(dir,detached);
        const good=await loadToolParts(dir,detached.listings);
        expect(good.refs.get(item.id)).toMatchObject({tools:1,read:1,write:0,risky:0});
        await expect(loadToolParts(dir,detached.listings.slice(0,1))).rejects.toThrow("unknown manifest connector");
        await expect(loadToolParts(dir,[item,detached.listings[1]!])).rejects.toThrow("inline");
        const manifest=JSON.parse(detached.manifest);
        manifest.lists[item.id].read=0;
        await Bun.write(join(dir,"tools.json"),JSON.stringify(manifest));
        await expect(loadToolParts(dir,detached.listings)).rejects.toThrow("count differs");
        await Bun.write(join(dir,"tools.json"),detached.manifest);
        const blob=join(dir,"tools",good.refs.get(item.id)!.sha256+".json");
        const original=await Bun.file(blob).text();
        await Bun.write(blob,original.replace('"read"','"rEad"'));
        await expect(loadToolParts(dir,detached.listings)).rejects.toThrow("hash mismatch");
        await Bun.write(blob,original);
        await Bun.write(join(dir,"tools","e".repeat(64)+".json"),"{}");
        await expect(loadToolParts(dir,detached.listings)).rejects.toThrow("orphan");
    } finally { await rm(dir,{recursive:true,force:true}); }
});
