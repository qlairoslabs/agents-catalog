// classify/model.ts
// Runs Claude Code once per batch, with every tool, MCP server and settings
// file off, inside a container that holds only the binary and an empty folder
// (catalogue §7: the input is untrusted, and a harness can use tools).
//
// The credential is a long-lived Claude Code token (`claude setup-token`) in
// CLAUDE_CODE_OAUTH_TOKEN, passed to the container by name only. Mounting the
// interactive login instead would let a token refresh inside the container
// log the maintainer out.

import { readlinkSync, realpathSync } from "node:fs";
import { BATCH_SCHEMA } from "./output";

export interface ModelOptions {
    /** `podman` (default) or `none` for a direct run, for debugging only. */
    sandbox: "podman" | "none";
    model: string;
    image: string;
    claude: string;
    timeoutMs: number;
}

export const DEFAULT_OPTIONS: ModelOptions = {
    sandbox: "podman",
    model: "opus",
    image: "docker.io/library/debian:bookworm-slim",
    claude: "claude",
    timeoutMs: 15 * 60_000,
};

export type Ask = (system: string, prompt: string) => Promise<unknown>;

function resolveBinary(name: string): string {
    const found = Bun.which(name);
    if (!found) throw new Error(`${name} not found`);
    try { return realpathSync(found); } catch { return readlinkSync(found); }
}

export function claudeArgs(options: ModelOptions, system: string, schema: object = BATCH_SCHEMA): string[] {
    return [
        "-p", "--output-format", "json",
        "--model", options.model,
        "--tools", "",
        "--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}',
        "--setting-sources", "",
        "--no-session-persistence",
        "--system-prompt", system,
        "--json-schema", JSON.stringify(schema),
    ];
}

export function commandFor(options: ModelOptions, system: string, schema: object = BATCH_SCHEMA): string[] {
    const args = claudeArgs(options, system, schema);
    if (options.sandbox === "none") return [options.claude, ...args];
    return [
        "podman", "run", "--rm", "-i",
        "--read-only", "--cap-drop=all", "--security-opt", "no-new-privileges",
        "--tmpfs", "/home/classify:rw,size=64m", "--tmpfs", "/tmp:rw,size=64m", "--tmpfs", "/work:rw,size=1m",
        "--workdir", "/work",
        "-e", "HOME=/home/classify", "-e", "CLAUDE_CODE_OAUTH_TOKEN",
        "-e", "DISABLE_AUTOUPDATER=1", "-e", "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1",
        "-v", `${resolveBinary(options.claude)}:/usr/local/bin/claude:ro`,
        options.image, "/usr/local/bin/claude", ...args,
    ];
}

/** Pulls the structured answer out of Claude Code's JSON envelope. */
export function parseEnvelope(stdout: string): unknown {
    const envelope = JSON.parse(stdout);
    if (envelope?.is_error) throw new Error(`model error: ${String(envelope.result ?? envelope.subtype).slice(0, 300)}`);
    if (envelope?.structured_output !== undefined) return envelope.structured_output;
    if (typeof envelope?.result === "string") return JSON.parse(envelope.result);
    throw new Error("no structured output in the answer");
}

export function claudeModel(options: ModelOptions = DEFAULT_OPTIONS, schema: object = BATCH_SCHEMA): Ask {
    if (options.sandbox === "podman" && !process.env.CLAUDE_CODE_OAUTH_TOKEN) {
        throw new Error("CLAUDE_CODE_OAUTH_TOKEN is not set (create one with `claude setup-token`)");
    }
    return async (system, prompt) => {
        const child = Bun.spawn(commandFor(options, system, schema), {
            stdin: new TextEncoder().encode(prompt), stdout: "pipe", stderr: "pipe",
            env: { PATH: process.env.PATH ?? "", HOME: process.env.HOME ?? "", CLAUDE_CODE_OAUTH_TOKEN: process.env.CLAUDE_CODE_OAUTH_TOKEN ?? "" },
        });
        const timer = setTimeout(() => child.kill(), options.timeoutMs);
        try {
            const [stdout, stderr, code] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
            if (code !== 0) throw new Error(`claude exited ${code}: ${stderr.slice(0, 300)}`);
            return parseEnvelope(stdout);
        } finally { clearTimeout(timer); }
    };
}
