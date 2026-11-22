import { expect, test } from "bun:test";
import { cp, mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { compareWeekly } from "./weekly";
import { attachReviewed, loadReviewed } from "./facets/v1";
import { readPart } from "./mcp/item";

const sample = readPart(await Bun.file(new URL("./examples/detached/connectors.json",import.meta.url)).json(),"connectors")[0]!;
const items = Array.from({length:20},(_,i)=>({...sample,id:"reference:item-"+i}));
const snapshot = (selection=items) => ({
    items:selection, counts:{connectors:selection.length,skills:0,tools:0}, manifest:new Map(), fingerprint:"fixture",
});

test("weekly drop gates refuse unattributed, over-threshold and undersized candidates", () => {
    const bounds={maxDrop:0.05,minPart:0.6};
    const reason = new Map(items.map(item=>[item.id,"test removal"]));
    expect(compareWeekly(snapshot(),snapshot(items.slice(1)),reason,bounds).publish).toBe(true);
    expect(compareWeekly(snapshot(),snapshot(items.slice(1)),new Map(),bounds).reasons).toEqual(["unattributed-drop"]);
    expect(compareWeekly(snapshot(),snapshot(items.slice(2)),reason,bounds).reasons).toEqual(["drop-threshold"]);
    expect(compareWeekly(snapshot(),snapshot(items.slice(9)),reason,bounds).reasons).toEqual(["drop-threshold","part-shrink"]);
});

test("empty classification does not hide a listing and a duplicate across files is refused", async () => {
    const directory=await mkdtemp(join(tmpdir(),"catalog-weekly-classes-"));
    try {
        const row={id:sample.id,status:"ok",code:"01.03.02",secondary_codes:"",summary:"Reviewed",language:"en",regions:"unknown"};
        const first=join(directory,"first.json"), second=join(directory,"second.json");
        await Bun.write(first,JSON.stringify([row]));
        await Bun.write(second,JSON.stringify([row]));
        await expect(loadReviewed(null,first,second)).rejects.toThrow("duplicate classification ID");
        await Bun.write(first,"[]");
        expect((await loadReviewed(null,first,second)).get(sample.id)?.summary).toBe("Reviewed");
        const unclassified=attachReviewed({...sample,discovery:{attributes:{status:["profile"],topic:["01.03.02"]}}});
        expect(unclassified.discovery.attributes).not.toHaveProperty("status");
        expect(unclassified.discovery.attributes).not.toHaveProperty("topic");
    } finally { await rm(directory,{recursive:true,force:true}); }
});

test("weekly label input is JSONL and an input failure writes a closed verdict", async () => {
    const directory=await mkdtemp(join(tmpdir(),"catalog-weekly-cli-"));
    try {
        const fixture=join(directory,"fixture");
        await cp(new URL("./examples/detached",import.meta.url).pathname,fixture,{recursive:true});
        const launch=(...args:string[])=>Bun.spawnSync([process.execPath,"weekly.ts",...args],{cwd:import.meta.dir});
        const labels=launch("needs-labels","--parts",fixture);
        expect(labels.exitCode).toBe(0);
        const lines=labels.stdout.toString().trim().split("\n").map(line=>JSON.parse(line));
        expect(lines.some(row=>row.tools.length)).toBe(true);
        for(const row of lines) {
            expect(Object.keys(row)).toEqual(["id","name","description","tools"]);
            for(const tool of row.tools) expect(Object.keys(tool)).toEqual(["name","description"]);
        }
        const occupied=join(directory,"out");
        await mkdir(occupied);
        const result=launch("build","--output",occupied,"--verdict",join(directory,"verdict.json"));
        expect(result.exitCode).toBe(1);
        expect(await Bun.file(join(directory,"verdict.json")).json()).toMatchObject({publish:false,reasons:["build-failure"]});
    } finally { await rm(directory,{recursive:true,force:true}); }
});

test("a resumed cached crawl stages a valid candidate without fetching network inputs", async () => {
    const {Checkpoint}=await import("./mcp/checkpoint");
    const {evidenceTarget}=await import("./evidence");
    const {createHash}=await import("node:crypto");
    const directory=await mkdtemp(join(tmpdir(),"catalog-weekly-resume-"));
    try {
        const cache=join(directory,"cache"), run=join(cache,"runs","fixture"), mapped=join(run,"mapped");
        await mkdir(join(run,"evidence"),{recursive:true});
        await cp(new URL("./examples/detached",import.meta.url).pathname,mapped,{recursive:true});
        // Empty manifest provides a baseline for this OAuth-only fixture.
        await Bun.write(join(mapped,"tools.json"),'{"lists":{}}');
        await rm(join(mapped,"tools"),{recursive:true});
        await Promise.all(Object.entries({
            "sources.json":{}, "feed.json":{}, "rejections.json":[],
            "decisions.json":{reasons:[],aliases:[],sourceErrors:{}},
        }).map(([name,value])=>Bun.write(join(run,name),JSON.stringify(value))));
        const db=new Checkpoint(join(run,"crawl.sqlite"));
        await db.remember("registry:Infinity",async()=>[{server:{name:"fixture"}}]);
        db.close();
        const listings=[
            ...readPart(await Bun.file(join(mapped,"connectors.json")).json(),"connectors"),
            ...readPart(await Bun.file(join(mapped,"skills.json")).json(),"skills"),
        ];
        for(const item of listings) {
            const key=createHash("sha256").update(item.id).digest("hex");
            await Bun.write(join(run,"evidence",key+".json"),JSON.stringify({
                id:item.id,target:evidenceTarget(item),fetched_at:new Date().toISOString(),health:"ok",
            }));
        }
        const output=join(directory,"out"), verdict=join(directory,"verdict.json");
        const launch=Bun.spawnSync([process.execPath,"weekly.ts","build","--cache",cache,"--run-id","fixture","--output",output,
            "--previous-parts",mapped,"--verdict",verdict],{cwd:import.meta.dir});
        expect(launch.exitCode).toBe(0);
        expect(await Bun.file(verdict).json()).toMatchObject({publish:true,reasons:[],dropped:[],added:[]});
        expect(await Bun.file(join(output,"tools.json")).json()).toEqual({lists:{}});
        expect(await Bun.file(join(cache,"latest.json")).json()).toBe("fixture");
    } finally { await rm(directory,{recursive:true,force:true}); }
});
