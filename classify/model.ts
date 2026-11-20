// classify/model.ts
// Drives Claude Code through @qlairoslabs/acp-client (catalogue §7), one fresh
// session per batch, on the maintainer's subscription.
//
// The input is untrusted and a harness has built-in tools that a refused
// permission does not switch off, so the boundary is the container
// (acp-client's own guidance): the ACP adapter runs in a read-only container
// with an empty working folder, no host mounts but a read-only managed
// settings file that denies every tool, no client terminal or filesystem, and
// every permission request refused. The credential is the access token of the
// maintainer's own Claude Code login, refreshed on the host (or a
// CLAUDE_CODE_OAUTH_TOKEN, if set); the refresh token never enters the container.

import { randomUUID } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { AgentController } from "@qlairoslabs/acp-client";

export interface ModelOptions {
    /** An image with claude-agent-acp and Claude Code, e.g. the agents standard image. */
    image: string;
    /** Claude Code's model alias, set through ANTHROPIC_MODEL in the container. */
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
}

export const DEFAULT_OPTIONS: ModelOptions = {
    image: process.env.CLASSIFY_IMAGE ?? "localhost/agents-standard:linux-amd64-bf2f5c8fb584",
    model: "opus",
    timeoutMs: 15 * 60_000,
    credentials: join(process.env.HOME ?? "", ".claude", ".credentials.json"),
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

/** The ACP adapter's command: podman around claude-agent-acp. */
export function containerCommand(options: ModelOptions, settings: string, name = `classify-${randomUUID()}`): string[] {
    return [
        "podman", "run", "--rm", "-i", "--pull=never", "--name", name,
        "--read-only", "--cap-drop=all", "--security-opt", "no-new-privileges",
        "--tmpfs", "/home/classify:rw,size=128m", "--tmpfs", "/tmp:rw,size=128m",
        ...(options.workMount ? ["-v", `${options.workMount}:/work:rw`] : ["--tmpfs", "/work:rw,size=1m"]),
        "-v", `${settings}:/etc/claude-code/managed-settings.json:ro`,
        "--workdir", "/work",
        // Only an access token, by name: never the login file or its refresh token.
        "-e", "CLAUDE_CODE_OAUTH_TOKEN",
        "-e", "HOME=/home/classify",
        "-e", `ANTHROPIC_MODEL=${options.model}`,
        "-e", "DISABLE_AUTOUPDATER=1", "-e", "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1",
        "--entrypoint", "claude-agent-acp",
        options.image,
    ];
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

/** A run must never need a refresh inside the container. If the token has less
 *  than `needMs` left, wait until it is nearly expired and let one trivial
 *  Claude Code call on the host refresh it, the normal way. */
export async function ensureFreshLogin(file: string, needMs: number, deps: {
    now?: () => number; sleep?: (ms: number) => Promise<void>; refresh?: () => Promise<void>; log?: (line: string) => void;
} = {}): Promise<void> {
    const now = deps.now ?? Date.now, sleep = deps.sleep ?? Bun.sleep, log = deps.log ?? (() => undefined);
    const refresh = deps.refresh ?? hostRefresh;
    for (let attempt = 0; ; attempt++) {
        const expiry = loginExpiry(file);
        if (expiry === null) throw new Error(`cannot read the login's expiry in ${file}; sign in with \`claude\` on this machine`);
        if (expiry - now() >= needMs) return;
        if (attempt === 3) break; // checked again after the last refresh, then given up
        // First a minute before expiry; if that did not refresh, just after it.
        const wait = Math.max(0, expiry - now() + (attempt === 0 ? -60_000 : 5_000));
        log(`login expires in ${Math.round((expiry - now()) / 60_000)} min; refreshing on the host${wait ? ` in ${Math.round(wait / 60_000)} min` : ""}`);
        if (wait) await sleep(wait);
        await refresh();
    }
    throw new Error("the login did not refresh on the host; run `claude` here once, then retry");
}

async function hostRefresh(): Promise<void> {
    const child = Bun.spawn(["claude", "-p", "--model", "haiku", "--tools", "", "--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}',
        "--setting-sources", "", "--no-session-persistence", "Reply with the word ok."], { stdout: "ignore", stderr: "ignore", cwd: tmpdir() });
    const timer = setTimeout(() => child.kill("SIGKILL"), 120_000);
    try { await child.exited; } finally { clearTimeout(timer); }
}

export async function runBatch(options: ModelOptions, prompt: string): Promise<BatchRun> {
    if (!process.env.CLAUDE_CODE_OAUTH_TOKEN) {
        if (!(options.credentials && existsSync(options.credentials))) {
            throw new Error("no Claude Code login: sign in with `claude` on this machine, or set CLAUDE_CODE_OAUTH_TOKEN");
        }
        await ensureFreshLogin(options.credentials, options.timeoutMs + 5 * 60_000);
    }
    const token = process.env.CLAUDE_CODE_OAUTH_TOKEN || (options.credentials ? loginAccess(options.credentials)?.accessToken : undefined);
    if (!token) throw new Error("no access token to give the container");
    // The relay adds the explicit empty tool set to session/new on the wire.
    const name = `classify-${randomUUID()}`;
    const command = [process.execPath, join(import.meta.dir, "acp-relay.ts"), ...containerCommand(options, settingsFile(), name)];
    // Only what podman needs on the host, and the token it passes on by name.
    const env = podmanEnv();
    const spawnEnv: Record<string, string> = { ...env };
    spawnEnv.CLAUDE_CODE_OAUTH_TOKEN = token;
    const agent = new AgentController({
        adapter: { command, displayName: "Claude (classify)" },
        adapterId: "claude",
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
        await agent.start();
        const result = await agent.prompt(prompt, {
            // Task and todo activity reaches ACP as plan updates, not tool calls: both count.
            onActivity: (event: any) => {
                if (["tool", "tool_update", "plan", "plan_update", "plan_removed"].includes(event?.kind)) tools.push(String(event.title ?? event.kind));
            },
            onPermissionRequest: () => { permissions++; return { outcome: "cancelled" } as const; },
        });
        const text = result.messages.map((message: any) => message.text ?? "").join("\n");
        return { text, tools, permissions, stopReason: String(result.stopReason) };
    } finally {
        clearTimeout(timer);
        await agent.stop().catch(() => undefined);
        // acp-client stops the relay with SIGTERM, then SIGKILL; the container
        // is removed here either way, and its absence confirmed.
        await removeContainer(name, 20_000, env);
    }
}

/** The first JSON object in the answer's text. */
export function extractJson(text: string): unknown {
    const start = text.indexOf("{"), end = text.lastIndexOf("}");
    if (start < 0 || end <= start) throw new Error("no JSON object in the answer");
    return JSON.parse(text.slice(start, end + 1));
}

export type Ask = (instructions: string, data: string) => Promise<unknown>;

/** One batch: the instructions, then the data. A batch where the harness
 *  announced a tool or asked for a permission is refused. */
export function acpModel(options: ModelOptions = DEFAULT_OPTIONS): Ask {
    return async (instructions, data) => {
        const run = await runBatch(options, `${instructions}\n\nAnswer with the JSON object only, no other text.\n\n${data}`);
        if (run.tools.length || run.permissions) throw new Error(`the harness tried to use tools (${run.tools.join(", ") || "permission request"}); batch refused`);
        if (run.stopReason !== "end_turn") throw new Error(`the turn ended with ${run.stopReason}; batch refused`);
        return extractJson(run.text);
    };
}
