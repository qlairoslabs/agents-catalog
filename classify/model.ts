// classify/model.ts
// Drives each classifier through @qlairoslabs/acp-client (catalogue §7), one
// fresh session per batch.
//
// The input is untrusted and a harness has built-in tools that a refused
// permission does not switch off, so the boundary is the container
// (acp-client's own guidance): the ACP adapter runs in a read-only container
// with an empty working folder, read-only settings and credential mounts,
// no client terminal or filesystem, and every permission request refused.
// Subscription logins refresh on the host. The container receives only the
// access credential, through a memory-backed file.

import { randomUUID } from "node:crypto";
import { chmodSync, closeSync, constants, existsSync, mkdtempSync, openSync, readFileSync, readdirSync, lstatSync, rmSync, writeFileSync, writeSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AgentController } from "@qlairoslabs/acp-client";
import { CODEX_CLASSIFIER_CONFIG, codexLogin, codexModelCatalogue, refreshCodexLogin } from "./codex";

export interface ModelOptions {
    /** The pinned execution image, with the selected adapter and its runtime. */
    image: string;
    /** The selected harness model name or provider/model identifier. */
    model: string;
    timeoutMs: number;
    /** The canary only: a host folder mounted as the working folder, to show it stays empty. */
    workMount?: string;
    /** The maintainer's Claude Code login file, read on the host only. The
     *  container gets just its access token, after the host has made sure it
     *  outlives the batch; the refresh token never leaves the host, so only the
     *  host (under Claude Code's own lock) ever refreshes. Used unless
     *  CLAUDE_CODE_OAUTH_TOKEN is set. */
    credentials?: string;
    /** Claude Code by default. OpenCode uses its mounted binary. Codex uses
     *  codex-acp and codex from the image. */
    harness?: "claude" | "opencode" | "codex";
    opencodeBinary?: string;
    codexAuth?: string;
    codexModels?: string;
}

/** OpenCode's settings inside the container: no tools, every permission denied,
 *  nothing fetched or updated on its own. Passed as OPENCODE_CONFIG_CONTENT. */
export function opencodeConfig(model: string): string {
    return JSON.stringify({
        $schema: "https://opencode.ai/config.json",
        model, autoupdate: false, share: "disabled",
        tools: { "*": false },
        permission: { "*": "deny", edit: "deny", bash: "deny", webfetch: "deny", external_directory: "deny" },
        mcp: {},
    });
}

export const DEFAULT_OPTIONS: ModelOptions = {
    image: process.env.CLASSIFY_IMAGE ?? "localhost/agents-standard:linux-amd64-bf2f5c8fb584",
    model: process.env.CLASSIFY_HARNESS === "codex" ? "gpt-6-luna" : "sonnet",
    timeoutMs: 15 * 60_000,
    credentials: join(process.env.HOME ?? "", ".claude", ".credentials.json"),
    harness: process.env.CLASSIFY_HARNESS === "codex" ? "codex" : process.env.CLASSIFY_HARNESS === "opencode" ? "opencode" : "claude",
    opencodeBinary: process.env.CLASSIFY_OPENCODE_BINARY,
    codexAuth: process.env.CLASSIFY_CODEX_AUTH ?? join(process.env.HOME ?? "", ".codex", "auth.json"),
    codexModels: process.env.CLASSIFY_CODEX_MODELS ?? join(process.env.HOME ?? "", ".codex", "models_cache.json"),
};

/** The exact environment podman runs with on the host: the same for creating,
 *  removing and checking a container, so they all see one store. */
export function podmanEnv(): Record<string, string> {
    return Object.fromEntries(Object.entries({
        PATH: process.env.PATH, HOME: process.env.HOME, XDG_RUNTIME_DIR: process.env.XDG_RUNTIME_DIR,
        CONTAINERS_CONF: process.env.CONTAINERS_CONF,
    }).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
}

async function podmanStep(args: string[], env: Record<string, string>, timeoutMs: number): Promise<number | null> {
    const child = Bun.spawn(["podman", ...args], { env, stdout: "ignore", stderr: "ignore" });
    const timer = setTimeout(() => child.kill("SIGKILL"), timeoutMs);
    try {
        const code = await child.exited;
        return child.signalCode ? null : code;
    } finally { clearTimeout(timer); }
}

/** Removes a run's container and confirms it is gone: `podman container
 *  exists` must answer exactly 1 (absent); an error (125) or a stuck command
 *  is retried until the deadline, then fails loudly, since the container holds
 *  the token. */
export async function removeContainer(name: string, timeoutMs = 20_000, env: Record<string, string> = podmanEnv()): Promise<void> {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        const left = () => Math.max(500, Math.min(5_000, deadline - Date.now()));
        await podmanStep(["rm", "-f", "-t", "0", name], env, left());
        if (await podmanStep(["container", "exists", name], env, left()) === 1) return;
        await Bun.sleep(250);
    }
    throw new Error(`could not confirm container ${name} is gone; remove it by hand (podman rm -f ${name})`);
}

/** Claude Code's managed settings inside the container: every tool denied, and
 *  no way to switch permissions off. */
export const MANAGED_SETTINGS = {
    permissions: {
        // A backstop: the relay (acp-relay.ts) gives the session no tools at all.
        deny: ["Bash", "BashOutput", "KillShell", "Read", "Write", "Edit", "MultiEdit", "NotebookEdit", "Glob", "Grep",
            "LS", "WebFetch", "WebSearch", "Task", "TaskCreate", "TaskUpdate", "TaskList", "TaskGet", "TaskOutput", "TaskStop",
            "Agent", "TodoWrite", "EnterPlanMode", "ExitPlanMode", "SlashCommand", "Skill", "ToolSearch", "AskUserQuestion",
            "ListMcpResourcesTool", "ReadMcpResourceTool", "mcp__*"],
        defaultMode: "default",
        disableBypassPermissionsMode: "disable",
    },
    disableAllHooks: true,
    enableAllProjectMcpServers: false,
};

let settingsDir: string | null = null;
function settingsFile(): string {
    settingsDir ??= mkdtempSync(join(tmpdir(), "classify-settings-"));
    const file = join(settingsDir, "managed-settings.json");
    writeFileSync(file, JSON.stringify(MANAGED_SETTINGS));
    return file;
}

/** Where a run's credential is mounted inside the container. The value is never
 *  passed as an environment option to podman, which would copy it into the
 *  container's saved configuration on disk; it lives in a memory-backed file the
 *  host deletes when the batch ends, and a shell reads it into the process. */
export const KEY_PATH = "/run/classify/key";

/** The ACP adapter's command: podman around claude-agent-acp or OpenCode. Output
 *  is never logged by podman (`--log-driver=none`), so no answer stays in the host
 *  journal. */
export function containerCommand(options: ModelOptions, settings: string, name = `classify-${randomUUID()}`, keyFile = "/dev/null"): string[] {
    const common = [
        "podman", "run", "--rm", "-i", "--pull=never", "--name", name, "--log-driver=none",
        "--read-only", "--cap-drop=all", "--security-opt", "no-new-privileges",
        "--tmpfs", "/tmp:rw,size=128m",
        ...(options.workMount ? ["-v", `${options.workMount}:/work:rw`] : ["--tmpfs", "/work:rw,size=1m"]),
        "-v", `${keyFile}:${KEY_PATH}:ro`,
        "--workdir", "/work", "-e", "HOME=/home/classify",
    ];
    const start = (variable: string, program: string) =>
        `read -r k < ${KEY_PATH}; export ${variable}="$k"; unset k; exec ${program}`;
    if (options.harness === "codex") return [
        ...common,
        "--tmpfs", "/home/classify:rw,size=128m",
        "-v", `${settings}/codex.toml:/run/classify/config.toml:ro`,
        "-v", `${settings}/models.json:/run/classify/models.json:ro`,
        "-e", "CODEX_HOME=/home/classify/.codex",
        "-e", "CODEX_REFRESH_TOKEN_URL_OVERRIDE=http://127.0.0.1:1",
        "-e", `CODEX_CONFIG=${JSON.stringify({ model: options.model, sandbox_mode: "read-only", approval_policy: "never", mcp_servers: {} })}`,
        "--entrypoint", "/bin/sh", options.image, "-c",
        `set -eu; umask 077; mkdir -p "$CODEX_HOME"; cp /run/classify/config.toml "$CODEX_HOME/config.toml"; cp ${KEY_PATH} "$CODEX_HOME/auth.json"; exec codex-acp`,
    ];
    if (options.harness === "opencode") {
        if (!options.opencodeBinary) throw new Error("OpenCode needs its binary (opencodeBinary)");
        return [
            ...common,
            "--tmpfs", "/home/classify:rw,size=256m",
            "-v", `${options.opencodeBinary}:/usr/local/bin/opencode-classify:ro`,
            "-e", `OPENCODE_CONFIG_CONTENT=${opencodeConfig(options.model)}`,
            "-e", "OPENCODE_DISABLE_AUTOUPDATE=1", "-e", "OPENCODE_DISABLE_CLAUDE_CODE=1",
            "-e", "OPENCODE_DISABLE_PROJECT_CONFIG=1", "-e", "OPENCODE_DISABLE_FILEWATCHER=1",
            "--entrypoint", "/bin/sh",
            options.image, "-c", start("OPENCODE_API_KEY", "/usr/local/bin/opencode-classify acp"),
        ];
    }
    return [
        ...common,
        "--tmpfs", "/home/classify:rw,size=128m",
        "-v", `${settings}:/etc/claude-code/managed-settings.json:ro`,
        "-e", `ANTHROPIC_MODEL=${options.model}`,
        "-e", "DISABLE_AUTOUPDATER=1", "-e", "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1",
        "--entrypoint", "/bin/sh",
        options.image, "-c", start("CLAUDE_CODE_OAUTH_TOKEN", "claude-agent-acp"),
    ];
}

function processStart(pid: number): string | null {
    try {
        const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
        return stat.slice(stat.lastIndexOf(")") + 2).split(" ")[19] ?? null;
    } catch { return null; }
}

export function sweepKeyFiles(base = "/dev/shm"): void {
    if (!isMemoryBacked(base)) return;
    for (const name of readdirSync(base)) {
        const match = /^classify-key-(\d+)-(\d+)-[a-zA-Z0-9]{6}$/.exec(name);
        if (!match) continue;
        const pid = Number(match[1]);
        if (!Number.isSafeInteger(pid) || pid < 1) continue;
        const started = processStart(pid);
        if (started === match[2]) continue;
        if (started === null) {
            try { process.kill(pid, 0); continue; }
            catch (error) { if ((error as NodeJS.ErrnoException).code !== "ESRCH") continue; }
        }
        const dir = join(base, name);
        try {
            const entry = lstatSync(dir);
            if (entry.isDirectory() && entry.uid === process.getuid?.()) rmSync(dir, { recursive: true, force: true });
        } catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
    }
}

/** Writes the credential to a memory-backed file only the user can read, for one run. */
export function writeKeyFile(value: string, base = "/dev/shm"): { file: string; remove: () => void } {
    // Memory-backed only: never fall back to a disk directory for a credential.
    if (!isMemoryBacked(base)) throw new Error(`${base} is not a memory-backed directory; refusing to write the credential`);
    const started = processStart(process.pid);
    if (!started) throw new Error("cannot identify the classifier process");
    const dir = mkdtempSync(join(base, `classify-key-${process.pid}-${started}-`));
    const remove = () => rmSync(dir, { recursive: true, force: true });
    try {
        chmodSync(dir, 0o700);
        const file = join(dir, "key");
        const fd = openSync(file, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL, 0o600);
        try { writeSync(fd, value + "\n"); } finally { closeSync(fd); }
        return { file, remove };
    } catch (error) { remove(); throw error; }
}

/** True when `dir` is on tmpfs (or ramfs), from /proc/self/mountinfo. */
export function isMemoryBacked(dir: string, mountinfo = (() => { try { return readFileSync("/proc/self/mountinfo", "utf8"); } catch { return ""; } })()): boolean {
    let best = "", type = "";
    for (const line of mountinfo.split("\n")) {
        const parts = line.split(" ");
        const dash = parts.indexOf("-");
        if (dash < 0 || !parts[4]) continue;
        const point = parts[4];
        if ((dir === point || dir.startsWith(point.endsWith("/") ? point : point + "/")) && point.length >= best.length) {
            best = point; type = parts[dash + 1] ?? "";
        }
    }
    return type === "tmpfs" || type === "ramfs";
}

export interface BatchRun {
    text: string;
    /** Tool calls the harness announced, and permissions it asked for: both must be zero. */
    tools: string[];
    permissions: number;
    stopReason: string;
}

/** The login's access token and its expiry. The refresh token is never read. */
export function loginAccess(file: string): { accessToken: string; expiresAt: number } | null {
    try {
        const oauth = JSON.parse(readFileSync(file, "utf8"))?.claudeAiOauth;
        const { accessToken, expiresAt } = oauth ?? {};
        return typeof accessToken === "string" && accessToken && typeof expiresAt === "number" && Number.isFinite(expiresAt)
            ? { accessToken, expiresAt } : null;
    } catch { return null; }
}

export const loginExpiry = (file: string) => loginAccess(file)?.expiresAt ?? null;

/** A run must never need a refresh inside the container. Wait until the
 *  token is nearly expired and let the host login refresh it. */
export async function ensureFreshLogin(file: string, needMs: number, deps: {
    now?: () => number; sleep?: (ms: number) => Promise<void>; refresh?: () => Promise<void>; expiry?: () => number | null; login?: string; log?: (line: string) => void;
} = {}): Promise<void> {
    const now = deps.now ?? Date.now, sleep = deps.sleep ?? Bun.sleep, log = deps.log ?? (() => undefined);
    const refresh = deps.refresh ?? hostRefresh;
    for (let attempt = 0; ; attempt++) {
        const expiry = deps.expiry ? deps.expiry() : loginExpiry(file);
        if (expiry === null) throw new Error(`cannot read the login's expiry in ${file}; sign in with \`${deps.login ?? "claude"}\` on this machine`);
        if (expiry - now() >= needMs) return;
        if (attempt === 3) break; // checked again after the last refresh, then given up
        // First a minute before expiry; if that did not refresh, just after it.
        const wait = Math.max(0, expiry - now() + (attempt === 0 ? -60_000 : 5_000));
        log(`login expires in ${Math.round((expiry - now()) / 60_000)} min; refreshing on the host${wait ? ` in ${Math.round(wait / 60_000)} min` : ""}`);
        if (wait) await sleep(wait);
        await refresh();
    }
    throw new Error(`the login did not refresh on the host; run \`${deps.login ?? "claude"}\` here once, then retry`);
}

async function hostRefresh(): Promise<void> {
    const child = Bun.spawn(["claude", "-p", "--model", "haiku", "--tools", "", "--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}',
        "--setting-sources", "", "--no-session-persistence", "Reply with the word ok."], { stdout: "ignore", stderr: "ignore", cwd: tmpdir() });
    const timer = setTimeout(() => child.kill("SIGKILL"), 120_000);
    try { await child.exited; } finally { clearTimeout(timer); }
}

/** A failure of the prompt itself, raised by the provider after the session was
 *  set up and with no tool or permission activity seen: the only kind of thrown
 *  failure that may be retried (if its message is a usage limit or rate limit). */
export class PromptFailure extends Error {}

type Controller = Pick<AgentController, "start" | "prompt" | "stop">;

export async function runBatch(options: ModelOptions, prompt: string,
    deps: { controller?: (config: ConstructorParameters<typeof AgentController>[0]) => Controller; removeContainer?: typeof removeContainer } = {}): Promise<BatchRun> {
    sweepKeyFiles();
    const opencode = options.harness === "opencode";
    const codex = options.harness === "codex";
    if (codex) {
        const file = options.codexAuth;
        if (!file) throw new Error("Codex needs a host ChatGPT login file");
        await ensureFreshLogin(file, options.timeoutMs + 5 * 60_000, {
            expiry: () => codexLogin(file)?.expiresAt ?? null, refresh: () => refreshCodexLogin(file), login: "codex",
        });
    }
    if (opencode && !process.env.OPENCODE_API_KEY) throw new Error("OPENCODE_API_KEY is not set for the OpenCode harness");
    if (!opencode && !codex && !process.env.CLAUDE_CODE_OAUTH_TOKEN) {
        if (!(options.credentials && existsSync(options.credentials))) {
            throw new Error("no Claude Code login: sign in with `claude` on this machine, or set CLAUDE_CODE_OAUTH_TOKEN");
        }
        await ensureFreshLogin(options.credentials, options.timeoutMs + 5 * 60_000);
    }
    const token = codex ? codexLogin(options.codexAuth!)?.credential : opencode ? process.env.OPENCODE_API_KEY
        : process.env.CLAUDE_CODE_OAUTH_TOKEN || (options.credentials ? loginAccess(options.credentials)?.accessToken : undefined);
    if (!token) throw new Error("no access token to give the container");
    // The relay adds the explicit empty tool set to session/new on the wire.
    const name = `classify-${randomUUID()}`;
    // The credential file is removed on every path from here on, including a
    // failure while building the command or the controller.
    const key = writeKeyFile(token);
    let codexSettings: string | undefined;
    try {
        if (codex) {
            if (!options.codexModels) throw new Error("Codex needs its host models_cache.json");
            codexSettings = mkdtempSync(join(tmpdir(), "classify-codex-"));
            writeFileSync(join(codexSettings, "codex.toml"), CODEX_CLASSIFIER_CONFIG);
            writeFileSync(join(codexSettings, "models.json"), codexModelCatalogue(options.codexModels, options.model));
        }
        const command = [process.execPath, join(import.meta.dir, "acp-relay.ts"), ...containerCommand(options, codexSettings ?? settingsFile(), name, key.file)];
        // Only what podman needs on the host; the credential goes through the key file.
        const env = podmanEnv();
        const spawnEnv: Record<string, string> = { ...env };
        const agent: Controller = (deps.controller ?? (config => new AgentController(config)))({
            adapter: { command, displayName: codex ? "Codex (classify)" : opencode ? "OpenCode (classify)" : "Claude (classify)" },
            adapterId: codex ? "codex" : opencode ? "opencode" : "claude",
            // The launcher replaces the adapter command with the exact podman process;
            // /work is the folder the harness sees inside the container.
            launcher: { prepare: async () => ({ command, spawnCwd: tmpdir(), spawnEnv }) },
            cwd: "/work",
            mcpServers: [],
            defaultPermission: "cancel",
            clientHandlers: { terminal: false, filesystem: false },
        });
        const tools: string[] = [];
        let permissions = 0;
        const timer = setTimeout(() => { void agent.stop().catch(() => undefined); }, options.timeoutMs);
        try {
            await agent.start(); // a failure here is hard: the session never started
            let result: Awaited<ReturnType<Controller["prompt"]>>;
            try {
                result = await agent.prompt(prompt, {
                    // Task and todo activity reaches ACP as plan updates, not tool calls: both count.
                    onActivity: (event: any) => {
                        if (["tool", "tool_update", "plan", "plan_update", "plan_removed"].includes(event?.kind)) tools.push(String(event.title ?? event.kind));
                    },
                    onPermissionRequest: () => { permissions++; return { outcome: "cancelled" } as const; },
                });
            } catch (error) {
                // Activity seen before a failure is still an isolation breach: hard.
                if (tools.length || permissions) throw new Error(`the harness tried to use tools (${tools.join(", ") || "permission request"}) before failing; stopping`);
                throw new PromptFailure(error instanceof Error ? error.message : String(error));
            }
            const text = result.messages.map((message: any) => message.text ?? "").join("\n");
            return { text, tools, permissions, stopReason: String(result.stopReason) };
        } finally {
            clearTimeout(timer);
            await agent.stop().catch(() => undefined);
            // acp-client stops the relay with SIGTERM, then SIGKILL; the container
            // is removed here either way, and its absence confirmed.
            await (deps.removeContainer ?? removeContainer)(name, 20_000, env);
        }
    } finally {
        key.remove();
        if (codexSettings) rmSync(codexSettings, { recursive: true, force: true });
    }
}

/** The first JSON object in the answer's text. */
export function extractJson(text: string): unknown {
    const start = text.indexOf("{"), end = text.lastIndexOf("}");
    if (start < 0 || end <= start) throw new Error("no JSON object in the answer");
    return JSON.parse(text.slice(start, end + 1));
}

export type Ask = (instructions: string, data: string) => Promise<unknown>;

/** Only a prompt failure with a usage-limit or rate-limit message is recoverable;
 *  startup, teardown and every other error stay hard, whatever their text. */
export function classifyFailure(error: unknown): Error {
    if (error instanceof PromptFailure && SOFT.test(error.message)) return new SoftModelError(error.message);
    return error instanceof Error ? error : new Error(String(error));
}

/** A batch that may be retried next run: the model's answer was unusable, or the
 *  provider's usage limit was reached. Every other failure is hard and stops the
 *  whole run: a tool or permission attempt, sign-in, the container, anything else. */
export class SoftModelError extends Error {}
const SOFT = /hit your .*limit|usage limit|rate.?limit|\b429\b|overloaded/i;

/** One batch: the instructions, then the data. A batch where the harness
 *  announced a tool or asked for a permission is refused. */
export function acpModel(options: ModelOptions = DEFAULT_OPTIONS): Ask {
    return async (instructions, data) => {
        let run: BatchRun;
        try { run = await runBatch(options, `${instructions}\n\nAnswer with the JSON object only, no other text.\n\n${data}`); }
        catch (error) { throw classifyFailure(error); }
        if (run.tools.length || run.permissions) throw new Error(`the harness tried to use tools (${run.tools.join(", ") || "permission request"}); stopping`);
        if (run.stopReason !== "end_turn") throw new SoftModelError(`the turn ended with ${run.stopReason}`);
        try { return extractJson(run.text); }
        catch (error) { throw new SoftModelError(error instanceof Error ? error.message : String(error)); }
    };
}
