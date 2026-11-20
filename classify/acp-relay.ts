// classify/acp-relay.ts
// Sits on the ACP wire between acp-client and the containerized adapter.
// acp-client 0.12.1 sends no `_meta` on session/new, and claude-agent-acp
// otherwise starts with Claude Code's full tool preset and loads user, project
// and local settings. The relay adds the adapter's explicit empty tool set and
// empty setting sources to every session/new and session/load, and refuses
// any other client method that could open or change a session.
//
//   bun classify/acp-relay.ts <command...>     (the launcher runs it around podman)

export const SESSION_META = { claudeCode: { options: { tools: [] as string[], settingSources: [] as string[] } } };

const ALLOWED = new Set(["initialize", "authenticate", "session/new", "session/load", "session/prompt", "session/cancel", "session/set_config_option", "session/set_model"]);

/** Rewrites one client→agent line. Responses to the agent's requests pass unchanged. */
export function rewriteClientLine(line: string): { line: string; refused?: string } {
    if (!line.trim()) return { line };
    let message: any;
    try { message = JSON.parse(line); } catch { return { line: "", refused: "a line that is not JSON" }; }
    if (typeof message?.method !== "string") return { line }; // a response to the agent
    if (!ALLOWED.has(message.method)) return { line: "", refused: message.method };
    if (message.method === "session/new" || message.method === "session/load") {
        const params = message.params && typeof message.params === "object" ? message.params : {};
        const meta = params._meta && typeof params._meta === "object" ? params._meta : {};
        message.params = { ...params, mcpServers: [], _meta: { ...meta, ...SESSION_META } };
    }
    return { line: JSON.stringify(message) };
}

async function pump(input: ReadableStream<Uint8Array>, write: (line: string) => void, transform: (line: string) => string): Promise<void> {
    const decoder = new TextDecoder();
    let buffer = "";
    for await (const chunk of input) {
        buffer += decoder.decode(chunk, { stream: true });
        let newline: number;
        while ((newline = buffer.indexOf("\n")) >= 0) {
            const line = transform(buffer.slice(0, newline));
            buffer = buffer.slice(newline + 1);
            if (line) write(line + "\n");
        }
    }
}

if (import.meta.main) {
    const command = process.argv.slice(2);
    if (!command.length) { console.error("usage: bun classify/acp-relay.ts <command...>"); process.exit(2); }
    const child = Bun.spawn(command, { stdin: "pipe", stdout: "pipe", stderr: "inherit", env: process.env });
    const toAgent = pump(Bun.stdin.stream(), line => { child.stdin.write(line); child.stdin.flush(); }, line => {
        const result = rewriteClientLine(line);
        if (result.refused) { console.error(`acp-relay: refused ${result.refused}`); child.kill(); process.exit(3); }
        return result.line;
    }).finally(() => child.stdin.end());
    const toClient = pump(child.stdout, line => { process.stdout.write(line); }, line => line);
    await Promise.race([toClient, child.exited]);
    void toAgent;
    process.exit(await child.exited);
}
