// src/catalog/item.ts
// The catalogue's grouped item and index (catalogue §8, schema 1), as the
// library reads them. The published contract is the JSON Schema in
// qlairoslabs/agents-catalog (schema/); this is the library's own copy of it,
// checked against the same examples (fixtures/schema-1/) so the two cannot
// drift silently. Readers ignore unknown fields, except where a field decides
// what runs or what is allowed (connect, effects, the signature).

export type CatalogTrust = "curated" | "verified-publisher" | "community" | "unvetted";
export type ToolEffect = "read" | "write" | "risky";

export interface SourceRef { id: string; label: string }

/** A tool's classified effect, with the hash of the definition it came from;
 *  ignored when the tool now hashes differently (see toolHash). */
export interface ClassifiedEffect { effect: ToolEffect; hash: string }

export interface CatalogTool {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    effect?: ClassifiedEffect;
}

export interface SecretInput { env: string; label: string; example?: string }

export type CatalogConnectConfig =
    | { type: "http"; url: string; headers?: Record<string, string> }
    | { type: "package"; package: { manager: "npm" | "pypi" | "mcpb"; identifier: string; version: string; sha256?: string };
        args?: string[]; env?: Record<string, string>; update?: "auto" | "pinned" };

export interface CatalogConnect {
    config: CatalogConnectConfig;
    auth: "none" | "key" | "oauth";
    secrets: SecretInput[];
    /** What this listing depends on on a hub, like "google" for a sign-in. */
    requires?: string[];
    tools?: CatalogTool[];
}

export interface GitSource { owner: string; repo: string; commit: string; path: string }

export interface CatalogSkill { source: GitSource; treeSha: string; readUrl: string }

export interface CatalogBundle {
    source: GitSource;
    version: string;
    skills: string[];
    connectors: Array<{ name: string; transport?: "http" | "stdio"; leftOut?: string }>;
}

export interface CatalogOrigin {
    trust: CatalogTrust;
    publisher: { name: string; verified: boolean } | null;
    source: SourceRef;
    /** Set when the listing came from a bundle. */
    bundle?: string;
    all: Array<{ source: SourceRef; trust: CatalogTrust; bundle?: string }>;
}

export interface CatalogDiscovery {
    summary?: string;
    whenToUse?: string;
    tasks?: string[];
    attributes?: Record<string, string[]>;
    signals?: { popularity?: number; updatedAt?: string };
}

interface ItemCommon {
    id: string;
    formerIds: string[];
    name: string;
    display: { title: string; description: string | null; icon: string | null };
    origin: CatalogOrigin;
    discovery: CatalogDiscovery;
}

export type CatalogConnectorItem = ItemCommon & { kind: "mcp"; connect: CatalogConnect };
export type CatalogSkillItem = ItemCommon & { kind: "skill"; skill: CatalogSkill };
export type CatalogBundleItem = ItemCommon & { kind: "bundle"; bundle: CatalogBundle };
/** In memory an item records its kind; on the wire the part and block say it. */
export type CatalogListingItem = CatalogConnectorItem | CatalogSkillItem | CatalogBundleItem;

export interface CatalogFacet {
    id: string;
    label: string;
    hierarchical?: boolean;
    kinds: Array<"mcp" | "skill" | "bundle">;
    version?: string;
    values?: Array<{ id: string; label?: string; taxonomy?: CatalogTaxonomyLabel }>;
}

export interface CatalogTaxonomyLabel {
    area: string;
    category: string;
    topic?: string;
    definition: string;
    excludes?: string;
}

function readTaxonomyLabel(value: unknown, path: string): CatalogTaxonomyLabel {
    const raw = obj(value, path);
    only(raw, path, ["area", "category", "topic", "definition", "excludes"]);
    return {
        area: str(raw.area, path + ".area", 120, 0),
        category: str(raw.category, path + ".category", 120, 0),
        definition: str(raw.definition, path + ".definition", 300, 0),
        ...(raw.topic === undefined ? {} : { topic: str(raw.topic, path + ".topic", 120, 0) }),
        ...(raw.excludes === undefined ? {} : { excludes: str(raw.excludes, path + ".excludes", 300, 0) }),
    };
}

export interface CatalogFileRef { url: string; sha256: string; bytes: number; items: number }

export interface CatalogBlocked {
    packages: Array<{ manager: "npm" | "pypi" | "mcpb"; identifier: string; versions: string[]; reason: string }>;
    servers: Array<{ url: string; reason: string }>;
    skills: Array<{ treeSha: string; reason: string }>;
}

export interface CatalogIndex {
    schema: 1;
    sequence: number;
    generatedAt: string;
    expires: string;
    rules: string;
    commit: string;
    facets: CatalogFacet[];
    parts: Array<CatalogFileRef & { id: "connectors" | "skills" | "tools" }>;
    annotations: Array<CatalogFileRef & { catalogue: string }>;
    blocked: CatalogBlocked;
    /** Key ids this index declares revoked. Honoured only when the index is
     *  signed by the offline next key (catalogue §9); the verifier checks. */
    revokes: string[];
}

/** The detached signature. It authenticates only the index's bytes, so it
 *  carries nothing else: revocations are in the signed index. */
export interface CatalogSignature { algorithm: "ed25519"; keyId: string; signature: string }

export interface CatalogAnnotations {
    catalogue: string;
    entries: Record<string, {
        discovery?: Pick<CatalogDiscovery, "attributes" | "tasks">;
        replacedBy?: string[];
        effects?: Record<string, ClassifiedEffect>;
    }>;
}

// ── Validation ──────────────────────────────────────────────────────────────

import { assertSafePackageReference } from "./local-rules";
import { isReservedSecretName } from "./local-rules";

/** Why a value was refused: a path and a reason, never the value itself. */
export class CatalogShapeError extends Error {
    constructor(readonly path: string, readonly reason: string) { super(`${path}: ${reason}`); }
}

type Obj = Record<string, unknown>;
const isObj = (value: unknown): value is Obj => !!value && typeof value === "object" && !Array.isArray(value);
const fail = (path: string, reason: string): never => { throw new CatalogShapeError(path, reason); };

function obj(value: unknown, path: string): Obj { return isObj(value) ? value : fail(path, "not an object"); }
function str(value: unknown, path: string, max: number, min = 1): string {
    if (typeof value !== "string") fail(path, "not a string");
    const text = value as string;
    if (text.length < min || text.length > max) fail(path, `length outside ${min}..${max}`);
    return text;
}
function optStr(value: unknown, path: string, max: number): string | undefined { return value === undefined ? undefined : str(value, path, max, 0); }
function nullableStr(value: unknown, path: string, max: number): string | null { return value === null || value === undefined ? null : str(value, path, max, 0); }
function arr(value: unknown, path: string, max: number): unknown[] {
    if (!Array.isArray(value)) fail(path, "not an array");
    if ((value as unknown[]).length > max) fail(path, `more than ${max} entries`);
    return value as unknown[];
}
function match(value: unknown, path: string, pattern: RegExp, max = 2000): string {
    const text = str(value, path, max);
    if (!pattern.test(text)) fail(path, "does not match its format");
    return text;
}
/** Strict objects (connect and below) refuse fields they do not know. */
function only(value: Obj, path: string, keys: readonly string[]): void {
    for (const key of Object.keys(value)) if (!keys.includes(key)) fail(`${path}.${key}`, "unknown field");
}

const ID = /^[a-z][a-z0-9-]*:[^\s]{1,200}$/;
const SHA256 = /^[0-9a-f]{64}$/;
const SHA1 = /^[0-9a-f]{40}$/;
/** The same as the schema's httpsUrl: an authority right after the scheme, no `@`, no `$`. */
const HTTPS = /^https:\/\/[^\s/@$?#]+(?:[/?#][^\s$]*)?$/;
const ENV = /^[A-Z_][A-Z0-9_]{0,63}$/;
const SECRET_REF = /^\$[A-Z_][A-Z0-9_]{0,63}$/;
const ATTRIBUTE = /^[a-z0-9][a-z0-9._-]*(\/[a-z0-9][a-z0-9._-]*){0,2}$/;
const TRUST: readonly CatalogTrust[] = ["curated", "verified-publisher", "community", "unvetted"];
const EFFECTS: readonly ToolEffect[] = ["read", "write", "risky"];

/** An HTTPS URL, parsed: an authority, no credentials in it, and no `$` (the
 *  catalogue never expands variables in a URL). A regex alone is not enough. */
function httpsUrl(value: unknown, path: string): string {
    const text = match(value, path, HTTPS);
    if (text.includes("$")) fail(path, "contains a variable reference");
    let url: URL;
    try { url = new URL(text); } catch { return fail(path, "not a URL"); }
    if (url.protocol !== "https:" || !url.hostname) fail(path, "not an HTTPS URL with a host");
    if (url.username || url.password) fail(path, "carries credentials");
    return text;
}

/** A secret a connector declares: an environment name the hub does not set
 *  itself (no AGENTS_*, HOME, PATH and the others, secrets.ts). */
function secretName(value: unknown, path: string): string {
    const name = match(value, path, ENV, 64);
    if (isReservedSecretName(name)) fail(path, "a name the hub sets itself");
    return name;
}

const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
/** A real calendar time: Date.parse alone rolls 2026-02-31 over to March, so
 *  the date and clock fields are checked themselves. */
function dateTime(value: unknown, path: string): string {
    const text = match(value, path, ISO_TIME, 40);
    const [year, month, day, hour, minute, second] = [text.slice(0, 4), text.slice(5, 7), text.slice(8, 10), text.slice(11, 13), text.slice(14, 16), text.slice(17, 19)].map(Number);
    const daysInMonth = new Date(Date.UTC(year!, month!, 0)).getUTCDate();
    if (month! < 1 || month! > 12 || day! < 1 || day! > daysInMonth || hour! > 23 || minute! > 59 || second! > 59) fail(path, "not a valid time");
    const offset = text.match(/([+-])(\d{2}):(\d{2})$/);
    if (offset && (Number(offset[2]) > 23 || Number(offset[3]) > 59)) fail(path, "not a valid time");
    if (Number.isNaN(Date.parse(text))) fail(path, "not a valid time");
    return text;
}

function trust(value: unknown, path: string): CatalogTrust {
    return TRUST.includes(value as CatalogTrust) ? value as CatalogTrust : fail(path, "unknown trust tier");
}
function sourceRef(value: unknown, path: string): SourceRef {
    const raw = obj(value, path);
    return { id: str(raw.id, `${path}.id`, 200), label: str(raw.label, `${path}.label`, 200) };
}
export function readEffect(value: unknown, path: string): ClassifiedEffect {
    const raw = obj(value, path);
    only(raw, path, ["effect", "hash"]);
    if (!EFFECTS.includes(raw.effect as ToolEffect)) fail(`${path}.effect`, "unknown effect");
    return { effect: raw.effect as ToolEffect, hash: match(raw.hash, `${path}.hash`, SHA256, 64) };
}
function secretMap(value: unknown, path: string, max: number): Record<string, string> {
    const raw = obj(value, path);
    if (Object.keys(raw).length > max) fail(path, `more than ${max} entries`);
    const out: Record<string, string> = {};
    for (const [key, entry] of Object.entries(raw)) {
        const reference = match(entry, `${path}.${key}`, SECRET_REF, 65);
        if (isReservedSecretName(reference.slice(1))) fail(`${path}.${key}`, "references a name the hub sets itself");
        out[str(key, `${path}[key]`, 128)] = reference;
    }
    return out;
}

function readConnect(value: unknown, path: string): CatalogConnect {
    const raw = obj(value, path);
    only(raw, path, ["config", "auth", "secrets", "requires", "tools"]);
    const config = obj(raw.config, `${path}.config`);
    let parsed: CatalogConnectConfig;
    if (config.type === "http") {
        only(config, `${path}.config`, ["type", "url", "headers"]);
        parsed = { type: "http", url: httpsUrl(config.url, `${path}.config.url`),
            ...(config.headers === undefined ? {} : { headers: secretMap(config.headers, `${path}.config.headers`, 16) }) };
    } else if (config.type === "package") {
        only(config, `${path}.config`, ["type", "package", "args", "env", "update"]);
        const pkg = obj(config.package, `${path}.config.package`);
        only(pkg, `${path}.config.package`, ["manager", "identifier", "version", "sha256"]);
        if (!["npm", "pypi", "mcpb"].includes(pkg.manager as string)) fail(`${path}.config.package.manager`, "unknown manager");
        // The store's own rules: npm and PyPI names, and for MCPB an HTTPS
        // release URL with its digest, so nothing reaches the store unsafe.
        try {
            assertSafePackageReference({ manager: pkg.manager as "npm", identifier: String(pkg.identifier), version: String(pkg.version),
                ...(typeof pkg.sha256 === "string" ? { sha256: pkg.sha256 } : {}) });
        } catch { fail(`${path}.config.package`, "not a package the store accepts"); }
        parsed = {
            type: "package",
            package: {
                manager: pkg.manager as "npm" | "pypi" | "mcpb",
                identifier: str(pkg.identifier, `${path}.config.package.identifier`, 214),
                version: match(pkg.version, `${path}.config.package.version`, /^[0-9A-Za-z.+_-]+$/, 64),
                ...(pkg.sha256 === undefined ? {} : { sha256: match(pkg.sha256, `${path}.config.package.sha256`, SHA256, 64) }),
            },
            ...(config.args === undefined ? {} : { args: arr(config.args, `${path}.config.args`, 32).map((arg, i) => str(arg, `${path}.config.args[${i}]`, 500, 0)) }),
            ...(config.env === undefined ? {} : { env: secretMap(config.env, `${path}.config.env`, 32) }),
            ...(config.update === undefined ? {} : { update: config.update === "auto" || config.update === "pinned" ? config.update : fail(`${path}.config.update`, "unknown update rule") }),
        };
    } else {
        // http and package only: the catalogue names no command and no delegated provider.
        return fail(`${path}.config.type`, "not http or package");
    }
    if (!["none", "key", "oauth"].includes(raw.auth as string)) fail(`${path}.auth`, "unknown auth");
    const secrets = arr(raw.secrets, `${path}.secrets`, 16).map((entry, i) => {
        const secret = obj(entry, `${path}.secrets[${i}]`);
        only(secret, `${path}.secrets[${i}]`, ["env", "label", "example"]);
        return { env: secretName(secret.env, `${path}.secrets[${i}].env`), label: str(secret.label, `${path}.secrets[${i}].label`, 200),
            ...(secret.example === undefined ? {} : { example: str(secret.example, `${path}.secrets[${i}].example`, 200, 0) }) };
    });
    // Header and env references must name a declared secret.
    const declared = new Set(secrets.map(secret => secret.env));
    const references = parsed.type === "http" ? Object.values(parsed.headers ?? {}) : Object.values(parsed.env ?? {});
    for (const reference of references) if (!declared.has(reference.slice(1))) fail(`${path}.config`, "references an undeclared secret");
    const tools = raw.tools === undefined ? undefined : readTools(raw.tools, `${path}.tools`);
    return { config: parsed, auth: raw.auth as CatalogConnect["auth"], secrets,
        ...(raw.requires === undefined ? {} : { requires: arr(raw.requires, `${path}.requires`, 8).map((r, i) => match(r, `${path}.requires[${i}]`, /^[a-z][a-z0-9-]{0,63}$/, 64)) }),
        ...(tools ? { tools } : {}) };
}

function readTools(value: unknown, path: string): CatalogTool[] {
    return arr(value, path, 1000).map((entry, i) => {
        const tool = obj(entry, `${path}[${i}]`);
        only(tool, `${path}[${i}]`, ["name", "description", "inputSchema", "effect"]);
        return { name: str(tool.name, `${path}[${i}].name`, 128), description: str(tool.description, `${path}[${i}].description`, 4000, 0),
            inputSchema: obj(tool.inputSchema, `${path}[${i}].inputSchema`),
            ...(tool.effect === undefined ? {} : { effect: readEffect(tool.effect, `${path}[${i}].effect`) }) };
    });
}

export const MAX_MANIFEST_BYTES = 2 * 1024 * 1024;
export const MAX_TOOL_LIST_BYTES = 1024 * 1024;
export interface ToolListRef {
    sha256: string;
    bytes: number;
    tools: number;
    read?: number;
    write?: number;
    risky?: number;
}
/** Missing classification is conservative: every tool must be known read-only. */
export function toolListCanChangeThings(ref: ToolListRef | undefined): boolean {
    return !ref || ref.read !== ref.tools;
}
const counts = ["read", "write", "risky"] as const;

export function readToolManifest(value: unknown): Map<string, ToolListRef> {
    const raw = obj(value, "tools");
    only(raw, "tools", ["lists"]);
    const rows = Object.entries(obj(raw.lists, "tools.lists"));
    if (rows.length > 10_000) fail("tools.lists", "too many entries");
    return new Map(rows.map(([id, value]) => {
        str(id, "tools.lists.id", 256);
        const path = `tools.lists[${id}]`;
        const row = obj(value, path);
        only(row, path, ["sha256", "bytes", "tools", ...counts]);
        const integer = (key: string, min: number, max: number) => {
            const n = row[key];
            if (typeof n !== "number" || !Number.isInteger(n) || n < min || n > max) return fail(`${path}.${key}`, "invalid count");
            return n;
        };
        const ref: ToolListRef = {
            sha256: match(row.sha256, `${path}.sha256`, SHA256, 64),
            bytes: integer("bytes", 1, MAX_TOOL_LIST_BYTES), tools: integer("tools", 1, 1000),
        };
        for (const key of counts) if (row[key] !== undefined) ref[key] = integer(key, 0, ref.tools);
        if (counts.reduce((sum, key) => sum + (ref[key] ?? 0), 0) > ref.tools) fail(path, "effect counts exceed total");
        return [id, ref];
    }));
}

export function toolEffectCounts(tools: readonly CatalogTool[]) {
    const result = { read: 0, write: 0, risky: 0 };
    for (const tool of tools) {
        if (!tool.effect) continue;
        const effect = currentEffect(tool, tool.effect);
        if (!effect) return fail("toolList.tools.effect", "hash does not match definition");
        result[effect]++;
    }
    return result;
}

export function readToolList(value: unknown, ref: ToolListRef): CatalogTool[] {
    const raw = obj(value, "toolList");
    only(raw, "toolList", ["tools"]);
    const tools = readTools(raw.tools, "toolList.tools");
    if (tools.length !== ref.tools) fail("toolList.tools", "count differs from manifest");
    const actual = toolEffectCounts(tools);
    for (const key of counts) if (ref[key] !== undefined && ref[key] !== actual[key]) fail(`toolList.${key}`, "count differs from manifest");
    return tools;
}

function gitSource(value: unknown, path: string): GitSource {
    const raw = obj(value, path);
    only(raw, path, ["owner", "repo", "commit", "path"]);
    return { owner: match(raw.owner, `${path}.owner`, /^[A-Za-z0-9_.-]{1,100}$/, 100), repo: match(raw.repo, `${path}.repo`, /^[A-Za-z0-9_.-]{1,100}$/, 100),
        commit: match(raw.commit, `${path}.commit`, SHA1, 40), path: str(raw.path, `${path}.path`, 500, 0) };
}

function readDiscovery(value: unknown, path: string): CatalogDiscovery {
    if (value === undefined) return {};
    const raw = obj(value, path);
    const out: CatalogDiscovery = {};
    if (raw.summary !== undefined) out.summary = optStr(raw.summary, `${path}.summary`, 300);
    if (raw.whenToUse !== undefined) out.whenToUse = optStr(raw.whenToUse, `${path}.whenToUse`, 500);
    if (raw.tasks !== undefined) out.tasks = arr(raw.tasks, `${path}.tasks`, 20).map((t, i) => str(t, `${path}.tasks[${i}]`, 120, 0));
    if (raw.attributes !== undefined) {
        const attributes = obj(raw.attributes, `${path}.attributes`);
        if (Object.keys(attributes).length > 32) fail(`${path}.attributes`, "more than 32 filters");
        out.attributes = Object.fromEntries(Object.entries(attributes).map(([key, values]) =>
            [key, arr(values, `${path}.attributes.${key}`, 20).map((v, i) => match(v, `${path}.attributes.${key}[${i}]`, ATTRIBUTE, 120))]));
    }
    if (raw.signals !== undefined) {
        const signals = obj(raw.signals, `${path}.signals`);
        out.signals = {};
        if (signals.popularity !== undefined) {
            if (!Number.isInteger(signals.popularity) || (signals.popularity as number) < 0 || (signals.popularity as number) > 100) fail(`${path}.signals.popularity`, "not 0..100");
            out.signals.popularity = signals.popularity as number;
        }
        if (signals.updatedAt !== undefined) out.signals.updatedAt = match(signals.updatedAt, `${path}.signals.updatedAt`, /^\d{4}-\d{2}-\d{2}$/, 10);
    }
    return out;
}

/** One item of a part. `kind` says which part it came from; the item must hold
 *  exactly that block and no other. */
export function readItem(value: unknown, kind: "mcp" | "skill" | "bundle", path = "item"): CatalogListingItem {
    const raw = obj(value, path);
    const blocks = (["connect", "skill", "bundle"] as const).filter(block => raw[block] !== undefined);
    const expected = kind === "mcp" ? "connect" : kind;
    if (blocks.length !== 1 || blocks[0] !== expected) fail(path, `must hold exactly the ${expected} block`);
    const display = obj(raw.display, `${path}.display`);
    const origin = obj(raw.origin, `${path}.origin`);
    const publisher = origin.publisher === null || origin.publisher === undefined ? null : (() => {
        const p = obj(origin.publisher, `${path}.origin.publisher`);
        if (typeof p.verified !== "boolean") fail(`${path}.origin.publisher.verified`, "not a boolean");
        return { name: str(p.name, `${path}.origin.publisher.name`, 200), verified: p.verified as boolean };
    })();
    const common: ItemCommon = {
        id: match(raw.id, `${path}.id`, ID, 220),
        formerIds: raw.formerIds === undefined ? [] : arr(raw.formerIds, `${path}.formerIds`, 20).map((id, i) => match(id, `${path}.formerIds[${i}]`, ID, 220)),
        name: str(raw.name, `${path}.name`, 100),
        display: { title: str(display.title, `${path}.display.title`, 200), description: nullableStr(display.description, `${path}.display.description`, 4000),
            icon: display.icon === null || display.icon === undefined ? null : httpsUrl(display.icon, `${path}.display.icon`) },
        origin: {
            trust: trust(origin.trust, `${path}.origin.trust`),
            publisher,
            source: sourceRef(origin.source, `${path}.origin.source`),
            ...(origin.bundle === undefined ? {} : { bundle: match(origin.bundle, `${path}.origin.bundle`, ID, 220) }),
            all: arr(origin.all, `${path}.origin.all`, 50).map((entry, i) => {
                const e = obj(entry, `${path}.origin.all[${i}]`);
                return { source: sourceRef(e.source, `${path}.origin.all[${i}].source`), trust: trust(e.trust, `${path}.origin.all[${i}].trust`),
                    ...(e.bundle === undefined ? {} : { bundle: match(e.bundle, `${path}.origin.all[${i}].bundle`, ID, 220) }) };
            }),
        },
        discovery: readDiscovery(raw.discovery, `${path}.discovery`),
    };
    if (common.origin.all.length === 0) fail(`${path}.origin.all`, "empty");
    if (kind === "mcp") return { ...common, kind, connect: readConnect(raw.connect, `${path}.connect`) };
    if (kind === "skill") {
        const skill = obj(raw.skill, `${path}.skill`);
        only(skill, `${path}.skill`, ["source", "treeSha", "readUrl"]);
        return { ...common, kind, skill: { source: gitSource(skill.source, `${path}.skill.source`),
            treeSha: match(skill.treeSha, `${path}.skill.treeSha`, SHA1, 40), readUrl: httpsUrl(skill.readUrl, `${path}.skill.readUrl`) } };
    }
    const bundle = obj(raw.bundle, `${path}.bundle`);
    only(bundle, `${path}.bundle`, ["source", "version", "skills", "connectors"]);
    return { ...common, kind, bundle: {
        source: gitSource(bundle.source, `${path}.bundle.source`),
        version: str(bundle.version, `${path}.bundle.version`, 100),
        skills: arr(bundle.skills, `${path}.bundle.skills`, 2000).map((id, i) => match(id, `${path}.bundle.skills[${i}]`, ID, 220)),
        connectors: arr(bundle.connectors, `${path}.bundle.connectors`, 200).map((entry, i) => {
            const c = obj(entry, `${path}.bundle.connectors[${i}]`);
            only(c, `${path}.bundle.connectors[${i}]`, ["name", "transport", "leftOut"]);
            return { name: str(c.name, `${path}.bundle.connectors[${i}].name`, 200),
                ...(c.transport === undefined ? {} : { transport: c.transport === "http" || c.transport === "stdio" ? c.transport : fail(`${path}.bundle.connectors[${i}].transport`, "unknown transport") }),
                ...(c.leftOut === undefined ? {} : { leftOut: str(c.leftOut, `${path}.bundle.connectors[${i}].leftOut`, 300) }) };
        }),
    } };
}

/** A part file. One bad item refuses the whole part: a part is published as a
 *  unit, and a reader keeps its last good copy (catalogue §10). */
export function readPart(value: unknown, id: "connectors" | "skills"): CatalogListingItem[] {
    const raw = obj(value, id);
    if (id === "connectors") return arr(raw.mcp, "connectors.mcp", 50_000).map((item, i) => readItem(item, "mcp", `connectors.mcp[${i}]`));
    return [
        ...arr(raw.skills, "skills.skills", 50_000).map((item, i) => readItem(item, "skill", `skills.skills[${i}]`)),
        ...arr(raw.bundles, "skills.bundles", 20_000).map((item, i) => readItem(item, "bundle", `skills.bundles[${i}]`)),
    ];
}

/** The catalogue's host, repository and a full commit, then path segments
 *  that are neither empty nor `.` or `..`, so normalising cannot move it. */
const RAW_URL = /^https:\/\/raw\.githubusercontent\.com\/qlairoslabs\/agents-catalog\/([0-9a-f]{40})((?:\/(?!\.\.?(?:\/|$))[A-Za-z0-9._-]+)+)$/;

function fileRef(value: unknown, path: string, commit: string): CatalogFileRef {
    const raw = obj(value, path);
    const count = (field: string) => Number.isInteger(raw[field]) && (raw[field] as number) >= 0 ? raw[field] as number : fail(`${path}.${field}`, "not a count");
    const url = match(raw.url, `${path}.url`, RAW_URL);
    // Parts and annotations come from the same build as the index.
    if (RAW_URL.exec(url)![1] !== commit) fail(`${path}.url`, "not pinned to the index's commit");
    if (new URL(url).href !== url) fail(`${path}.url`, "not in normal form");
    return { url, sha256: match(raw.sha256, `${path}.sha256`, SHA256, 64), bytes: count("bytes"), items: count("items") };
}

/** The signed index. `schema` must be one this library reads. */
export function readIndex(value: unknown): CatalogIndex {
    const raw = obj(value, "index");
    if (raw.schema !== 1) fail("index.schema", "a schema this library cannot read");
    if (!Number.isInteger(raw.sequence) || (raw.sequence as number) < 1) fail("index.sequence", "not a positive integer");
    const blocked = obj(raw.blocked, "index.blocked");
    const commit = match(raw.commit, "index.commit", SHA1, 40);
    const unique = <T>(list: T[], key: (entry: T) => string, path: string): T[] => {
        const seen = new Set<string>();
        for (const entry of list) { const k = key(entry); if (seen.has(k)) fail(path, "lists one file twice"); seen.add(k); }
        return list;
    };
    return {
        schema: 1,
        sequence: raw.sequence as number,
        generatedAt: dateTime(raw.generatedAt, "index.generatedAt"),
        expires: dateTime(raw.expires, "index.expires"),
        rules: str(raw.rules, "index.rules", 100, 0),
        commit,
        facets: arr(raw.facets, "index.facets", 64).map((entry, i) => {
            const f = obj(entry, `index.facets[${i}]`);
            return {
                id: match(f.id, `index.facets[${i}].id`, /^[a-z][a-z0-9_-]{0,31}$/, 32),
                label: str(f.label, `index.facets[${i}].label`, 60),
                ...(f.hierarchical === undefined ? {} : { hierarchical: f.hierarchical === true }),
                ...(f.version === undefined ? {} : { version: str(f.version, "index.facets.version", 16) }),
                kinds: arr(f.kinds, `index.facets[${i}].kinds`, 3).map((k, j) => ["mcp", "skill", "bundle"].includes(k as string) ? k as "mcp" : fail(`index.facets[${i}].kinds[${j}]`, "unknown kind")),
                ...(f.values === undefined ? {} : { values: arr(f.values, `index.facets[${i}].values`, 2000).map((v, j) => {
                    const value = obj(v, `index.facets[${i}].values[${j}]`);
                    return { id: str(value.id, `index.facets[${i}].values[${j}].id`, 120), ...(value.label === undefined ? {} : { label: str(value.label, `index.facets[${i}].values[${j}].label`, 120, 0) }),
                        ...(value.taxonomy === undefined ? {} : { taxonomy: readTaxonomyLabel(value.taxonomy, "index.facets.values.taxonomy") }) };
                }) }),
            };
        }),
        parts: unique(arr(raw.parts, "index.parts", 8).map((entry, i) => {
            const id = obj(entry, `index.parts[${i}]`).id;
            if (id !== "connectors" && id !== "skills" && id !== "tools") return fail(`index.parts[${i}].id`, "unknown part");
            const ref = fileRef(entry, `index.parts[${i}]`, commit);
            if (id === "tools" && !ref.url.endsWith(`/${commit}/tools.json`)) fail("index.parts.tools.url", "not the root manifest");
            return { id, ...ref };
        }), part => part.id, "index.parts"),
        annotations: unique(arr(raw.annotations, "index.annotations", 16).map((entry, i) => ({
            catalogue: match(obj(entry, `index.annotations[${i}]`).catalogue, `index.annotations[${i}].catalogue`, /^[a-z][a-z0-9-]{0,31}$/, 32),
            ...fileRef(entry, `index.annotations[${i}]`, commit),
        })), file => file.catalogue, "index.annotations"),
        revokes: raw.revokes === undefined ? [] : arr(raw.revokes, "index.revokes", 8).map((k, i) => match(k, `index.revokes[${i}]`, /^[a-z0-9-]{1,64}$/, 64)),
        blocked: {
            packages: arr(blocked.packages, "index.blocked.packages", 10_000).map((entry, i) => {
                const p = obj(entry, `index.blocked.packages[${i}]`);
                if (!["npm", "pypi", "mcpb"].includes(p.manager as string)) fail(`index.blocked.packages[${i}].manager`, "unknown manager");
                return { manager: p.manager as "npm", identifier: str(p.identifier, `index.blocked.packages[${i}].identifier`, 214),
                    versions: arr(p.versions, `index.blocked.packages[${i}].versions`, 1000).map((v, j) => str(v, `index.blocked.packages[${i}].versions[${j}]`, 64)),
                    reason: str(p.reason, `index.blocked.packages[${i}].reason`, 300) };
            }),
            servers: arr(blocked.servers, "index.blocked.servers", 10_000).map((entry, i) => {
                const s = obj(entry, `index.blocked.servers[${i}]`);
                return { url: httpsUrl(s.url, `index.blocked.servers[${i}].url`), reason: str(s.reason, `index.blocked.servers[${i}].reason`, 300) };
            }),
            skills: arr(blocked.skills, "index.blocked.skills", 10_000).map((entry, i) => {
                const s = obj(entry, `index.blocked.skills[${i}]`);
                return { treeSha: match(s.treeSha, `index.blocked.skills[${i}].treeSha`, SHA1, 40), reason: str(s.reason, `index.blocked.skills[${i}].reason`, 300) };
            }),
        },
    };
}

export function readSignature(value: unknown): CatalogSignature {
    const raw = obj(value, "signature");
    only(raw, "signature", ["algorithm", "keyId", "signature"]);
    if (raw.algorithm !== "ed25519") fail("signature.algorithm", "not ed25519");
    return { algorithm: "ed25519", keyId: match(raw.keyId, "signature.keyId", /^[a-z0-9-]{1,64}$/, 64),
        signature: match(raw.signature, "signature.signature", /^[A-Za-z0-9_-]{86}$/, 86) };
}

/** Annotations only add discovery, set replacedBy, and give tools effects. */
export function readAnnotations(value: unknown): CatalogAnnotations {
    const raw = obj(value, "annotations");
    const entries = obj(raw.entries, "annotations.entries");
    if (Object.keys(entries).length > 20_000) fail("annotations.entries", "too many entries");
    return {
        catalogue: match(raw.catalogue, "annotations.catalogue", /^[a-z][a-z0-9-]{0,31}$/, 32),
        entries: Object.fromEntries(Object.entries(entries).map(([id, entry]) => {
            const path = `annotations.entries[${JSON.stringify(id).slice(0, 60)}]`;
            match(id, path, ID, 220);
            const e = obj(entry, path);
            only(e, path, ["discovery", "replacedBy", "effects"]);
            const out: CatalogAnnotations["entries"][string] = {};
            if (e.discovery !== undefined) {
                const d = obj(e.discovery, `${path}.discovery`);
                only(d, `${path}.discovery`, ["attributes", "tasks"]);
                const read = readDiscovery(d, `${path}.discovery`);
                out.discovery = { ...(read.attributes ? { attributes: read.attributes } : {}), ...(read.tasks ? { tasks: read.tasks } : {}) };
            }
            if (e.replacedBy !== undefined) out.replacedBy = arr(e.replacedBy, `${path}.replacedBy`, 8).map((r, i) => match(r, `${path}.replacedBy[${i}]`, ID, 220));
            if (e.effects !== undefined) {
                const effects = obj(e.effects, `${path}.effects`);
                if (Object.keys(effects).length > 2000) fail(`${path}.effects`, "too many effects");
                out.effects = Object.fromEntries(Object.entries(effects).map(([tool, effect]) => [str(tool, `${path}.effects[key]`, 128), readEffect(effect, `${path}.effects.${tool}`)]));
            }
            return [id, out];
        })),
    };
}

// ── Tool hash ───────────────────────────────────────────────────────────────

/** Object keys sorted by UTF-16 code unit (JavaScript's default sort), at
 *  every level; arrays in order; no whitespace; strings and numbers as
 *  JSON.stringify writes them. The README states the same, with a test vector. */
function canonical(value: unknown): string {
    if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
    if (value && typeof value === "object") {
        const keys = Object.keys(value as Obj).sort();
        return `{${keys.map(key => `${JSON.stringify(key)}:${canonical((value as Obj)[key])}`).join(",")}}`;
    }
    return JSON.stringify(value);
}

/** The hash an effect is tied to (README, "Tool hash"): sha256 of the
 *  canonical JSON of the tool's name, description and input schema. */
export function toolHash(tool: { name: string; description?: string | null; inputSchema: Record<string, unknown> }): string {
    const text = canonical({ name: tool.name, description: tool.description ?? "", inputSchema: tool.inputSchema });
    return new Bun.CryptoHasher("sha256").update(text).digest("hex");
}

/** A tool's effect, or undefined when it was classified from another definition. */
export function currentEffect(tool: { name: string; description?: string | null; inputSchema: Record<string, unknown> }, effect: ClassifiedEffect | undefined): ToolEffect | undefined {
    return effect && effect.hash === toolHash(tool) ? effect.effect : undefined;
}
