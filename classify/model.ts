// classify/model.ts
// Drives Claude Code through @qlairoslabs/acp-client (catalogue §7), one fresh
// session per batch, on the maintainer's subscription.
//
// The input is untrusted and a harness has built-in tools that a refused
// permission does not switch off, so the boundary is the container
// (acp-client's own guidance): the ACP adapter runs in a read-only container
// with an empty working folder, no host mounts but a read-only managed
// settings file that denies every tool, no client terminal or filesystem, and
// every permission request refused. The credential is a long-lived token from
// `claude setup-token`, passed by name; the interactive login is never mounted.

import { randomUUID } from "node:crypto";
import { mkdtempSync, writeFileSync } from "node:fs";
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
}

export const DEFAULT_OPTIONS: ModelOptions = {
    image: process.env.CLASSIFY_IMAGE ?? "localhost/agents-standard:linux-amd64-bf2f5c8fb584",
    model: "opus",
    timeoutMs: 15 * 60_000,
};

/** Removes a run's container and checks it is gone. The container holds the
 *  token, so a run that cannot confirm its removal fails loudly. */
export async function removeContainer(name: string, timeoutMs = 20_000): Promise<void> {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        Bun.spawnSync(["podman", "rm", "-f", "-t", "0", name], { stdout: "ignore", stderr: "ignore" });
        if (Bun.spawnSync(["podman", "container", "exists", name]).exitCode !== 0) return;
        await Bun.sleep(250);
    }
    throw new Error(`container ${name} is still present; remove it by hand (podman rm -f ${name})`);
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
        "-e", "HOME=/home/classify", "-e", "CLAUDE_CODE_OAUTH_TOKEN",
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

export async function runBatch(options: ModelOptions, prompt: string): Promise<BatchRun> {
    if (!process.env.CLAUDE_CODE_OAUTH_TOKEN) throw new Error("CLAUDE_CODE_OAUTH_TOKEN is not set (create one with `claude setup-token`)");
    // The relay adds the explicit empty tool set to session/new on the wire.
    const name = `classify-${randomUUID()}`;
    const command = [process.execPath, join(import.meta.dir, "acp-relay.ts"), ...containerCommand(options, settingsFile(), name)];
    // Only what podman needs on the host, and the token it passes on by name.
    const spawnEnv = Object.fromEntries(Object.entries({
        PATH: process.env.PATH, HOME: process.env.HOME, XDG_RUNTIME_DIR: process.env.XDG_RUNTIME_DIR,
        CONTAINERS_CONF: process.env.CONTAINERS_CONF, CLAUDE_CODE_OAUTH_TOKEN: process.env.CLAUDE_CODE_OAUTH_TOKEN,
    }).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
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
        await removeContainer(name);
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
