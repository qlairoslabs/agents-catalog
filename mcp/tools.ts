import { parseCatalogJson } from "../ingestion";
import { guardedFetch, type OAuthIo } from "./network";
import { catalogueTool } from "./map";
import type { CatalogTool } from "./item";

async function limitedText(response: Response): Promise<string> {
    const reader = response.body?.getReader();
    if (!reader) return "";
    let bytes = 0;
    const decoder = new TextDecoder();
    let text = "";
    try {
        while (true) {
            const next = await reader.read();
            if (next.done) return text + decoder.decode();
            bytes += next.value.byteLength;
            if (bytes > 384 * 1024) throw new Error("tool discovery response is too large");
            text += decoder.decode(next.value, { stream: true });
            if (/event-stream/i.test(response.headers.get("content-type") ?? "") && /\r?\n\r?\n/.test(text)) {
                return text.split(/\r?\n\r?\n/).map(event => event.split(/\r?\n/)
                    .filter(line => line.startsWith("data:")).map(line => line.slice(5).trimStart()).join("\n")).find(Boolean) ?? "";
            }
        }
    } finally { await reader.cancel().catch(() => {}); }
}

export async function discoverTools(url: string, io: OAuthIo = {}): Promise<CatalogTool[] | undefined> {
    const signal = AbortSignal.timeout(4500);
    const headers = new Headers({ "content-type": "application/json", accept: "application/json, text/event-stream" });
    const send = (message: Record<string, unknown>) => guardedFetch(url, { method: "POST", headers, signal,
        body: JSON.stringify({ jsonrpc: "2.0", ...message }) }, io);
    try {
        const initialized = await send({ id: 1, method: "initialize", params: { protocolVersion: "2025-06-18",
            capabilities: {}, clientInfo: { name: "agents-catalog", version: "1" } } });
        const session = initialized.headers.get("mcp-session-id");
        if (!initialized.ok) { await initialized.body?.cancel(); return; }
        const reply = JSON.parse(await limitedText(initialized));
        if (!reply?.result?.capabilities?.tools || !["2024-11-05", "2025-03-26", "2025-06-18", "2025-11-25"].includes(reply.result.protocolVersion)) return;
        headers.set("MCP-Protocol-Version", reply.result.protocolVersion);
        if (session) headers.set("MCP-Session-Id", session);
        const notification = await send({ method: "notifications/initialized" });
        await notification.body?.cancel();
        if (!notification.ok) return;
        const response = await send({ id: 2, method: "tools/list" });
        if (!response.ok) { await response.body?.cancel(); return; }
        const list = JSON.parse(await limitedText(response))?.result;
        if (!Array.isArray(list?.tools) || list.tools.length > 1000 || list.nextCursor) return;
        const tools: CatalogTool[] = [];
        for (const raw of list.tools) {
            const tool = catalogueTool(raw);
            if (!tool) return;
            tools.push(tool);
        }
        parseCatalogJson(new TextEncoder().encode(JSON.stringify(tools)), 20_000);
        return tools;
    } catch { return undefined; }
    finally {
        if (headers.has("MCP-Session-Id") && !signal.aborted) {
            await guardedFetch(url, { method: "DELETE", headers, signal }, io)
                .then(response => response.body?.cancel()).catch(() => {});
        }
    }
}
