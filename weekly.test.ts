import { expect, test } from "bun:test";
import { cp, mkdtemp, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { compareWeekly, dropReason } from "./weekly";
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
        const annotations = join(directory, "reviewed-annotations");
        await mkdir(annotations);
        const example = await Bun.file(new URL("./examples/annotations-composio.json", import.meta.url)).json();
        const github = example.github;
        await cp(new URL("./examples/annotations/composio", import.meta.url).pathname, join(annotations, "composio"), { recursive: true });
        const sourceNotes = JSON.stringify({ github, gmail: { topics: ["01.01.01"], replacedBy: [sample.id, "docker:withdrawn"] } });
        await Bun.write(join(annotations, "composio.json"), sourceNotes);
        const launch=Bun.spawnSync([process.execPath,"weekly.ts","build","--cache",cache,"--run-id","fixture","--output",output,
            "--annotations",annotations,"--previous-parts",mapped,"--previous-unsigned","--verdict",verdict],{cwd:import.meta.dir});
        expect(launch.exitCode).toBe(0);
        expect(await Bun.file(verdict).json()).toMatchObject({publish:true,reasons:["annotation-replacement-removed"],dropped:[],added:[],previousUnsigned:true,
            annotationReplacements:[{toolkit:"gmail",listing:"docker:withdrawn"}]});
        expect(await Bun.file(join(output,"annotations","composio.json")).json()).toEqual({ github, gmail: { topics: ["01.01.01"], replacedBy: [sample.id] } });
        expect(await Bun.file(join(annotations,"composio.json")).text()).toBe(sourceNotes);
        const blob = join("composio", github.effects.sha256 + ".json");
        expect(await Bun.file(join(output,"annotations",blob)).text()).toBe(await Bun.file(join(annotations,blob)).text());
        expect(await Bun.file(join(output,"tools.json")).json()).toEqual({lists:{}});
        expect(await Bun.file(join(cache,"latest.json")).json()).toBe("fixture");
    } finally { await rm(directory,{recursive:true,force:true}); }
});

test("the previous index verifies exact signed bytes and refuses a tampered index", async () => {
    const {readPreviousIndex}=await import("./weekly");
    const {generateKeyPair,signIndex}=await import("./sign/ed25519");
    const directory=await mkdtemp(join(tmpdir(),"catalog-weekly-previous-"));
    try {
        const index=join(directory,"index.json");
        const bytes=new Uint8Array(await Bun.file(new URL("./examples/index.json",import.meta.url)).arrayBuffer());
        const keys=await generateKeyPair();
        const signature=await signIndex(bytes,"fixture",keys.privateKey);
        const lookup=(kid:string)=>kid === "fixture" ? keys.publicKey : null;
        await Bun.write(index,bytes);
        await Bun.write(index+".sig",JSON.stringify(signature));
        expect((await readPreviousIndex(index,false,lookup)).schema).toBe(1);
        await Bun.write(index,new TextDecoder().decode(bytes)+" ");
        await expect(readPreviousIndex(index,false,lookup)).rejects.toThrow("invalid previous index signature");
        const verdict=join(directory,"verdict.json");
        const result=Bun.spawnSync([process.execPath,"weekly.ts","build","--cache",join(directory,"cache"),"--run-id","fixture",
            "--output",join(directory,"out"),"--previous-index",index,"--verdict",verdict],{cwd:import.meta.dir});
        expect(result.exitCode).toBe(1);
        expect(await Bun.file(verdict).json()).toMatchObject({publish:false,reasons:["previous release not verified"],previousUnsigned:false});
    } finally { await rm(directory,{recursive:true,force:true}); }
});

test("a drop after the unavailable runs runs out names that rule; other transient reasons explain nothing", () => {
    const one = (reason: string, extra: Record<string, unknown> = {}) => [{ name: "a/b", kind: "remote" as const, reason, ...extra }];
    // the rule: an accepted listing unavailable for MAX runs
    expect(dropReason(1, one("remote signal unavailable", { detail: "x.example does not resolve", unavailableRuns: 3 })))
        .toBe("remote signal unavailable for 3 runs in a row");
    expect(dropReason(1, [{ name: "a/b", kind: "package", identifier: "p", reason: "package signal unavailable", detail: "timed out", unavailableRuns: 3 }]))
        .toBe("package signal unavailable for 3 runs in a row");
    // the same string on a first failure (no prior accepted record), or with no count, is not the rule
    expect(dropReason(1, one("remote signal unavailable", { detail: "timed out", unavailableRuns: 1 }))).toBeNull();
    expect(dropReason(1, one("remote signal unavailable", { detail: "timed out" }))).toBeNull();
    // still kept this run: not a drop reason
    expect(dropReason(1, one("remote signal unavailable, kept", { detail: "timed out", unavailableRuns: 2 }))).toBeNull();
    expect(dropReason(1, one("rate limit reached"))).toBeNull();
    expect(dropReason(1, one("too few weekly downloads", { detail: "detail" }))).toBeNull();
    expect(dropReason(1, one("too few weekly downloads"))).toBe("too few weekly downloads");
    // several live records, several matching rejections, or none: no single rule
    expect(dropReason(2, one("too few weekly downloads"))).toBeNull();
    expect(dropReason(1, [...one("too few weekly downloads"), ...one("domain or listing too young")])).toBeNull();
    expect(dropReason(1, undefined)).toBeNull();
});
