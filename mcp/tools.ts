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

export type Health = "ok" | "auth-required" | "not-found" | "unreachable" | "deprecated" | "rate-limited";

export function responseHealth(status: number): Health {
    if (status === 401 || status === 403) return "auth-required";
    if (status === 404 || status === 410) return "not-found";
    if (status === 429) return "rate-limited";
    return status >= 200 && status < 300 ? "ok" : "unreachable";
}

export async function remoteEvidence(url: string, listTools: boolean, io: OAuthIo = {}): Promise<{ health: Health; tools?: CatalogTool[] }> {
    const signal = AbortSignal.timeout(8000);
    const headers = new Headers({ "content-type": "application/json", accept: "application/json, text/event-stream", "user-agent": "catalog-indexer/1" });
    const send = (message: Record<string, unknown>) => guardedFetch(url, { method: "POST", headers, signal,
        body: JSON.stringify({ jsonrpc: "2.0", ...message }) }, io);
    try {
        const initialized = await send({ id: 1, method: "initialize", params: { protocolVersion: "2025-06-18",
            capabilities: {}, clientInfo: { name: "catalog-indexer", version: "1" } } });
        const health = responseHealth(initialized.status);
        if (health !== "ok") { await initialized.body?.cancel(); return { health }; }
        const session = initialized.headers.get("mcp-session-id");
        const reply = JSON.parse(await limitedText(initialized));
        const result = reply?.result;
        if (!["2024-11-05", "2025-03-26", "2025-06-18", "2025-11-25"].includes(result?.protocolVersion)) return { health: "unreachable" };
        if (!listTools) return { health: "ok" };
        headers.set("MCP-Protocol-Version", result.protocolVersion);
        if (session) headers.set("MCP-Session-Id", session);
        if (!result.capabilities?.tools) return { health: "ok" };
        const notification = await send({ method: "notifications/initialized" });
        await notification.body?.cancel();
        if (!notification.ok) return { health: responseHealth(notification.status) };
        const tools: CatalogTool[] = [];
        const names = new Set<string>();
        const cursors = new Set<string>();
        let cursor: string | undefined;
        for (let page = 0; page < 10; page++) {
            const response = await send({ id: 2 + page, method: "tools/list", ...(cursor ? { params: { cursor } } : {}) });
            if (!response.ok) { await response.body?.cancel(); return { health: responseHealth(response.status) }; }
            const list = JSON.parse(await limitedText(response))?.result;
            if (!Array.isArray(list?.tools) || tools.length + list.tools.length > 1000) return { health: "ok" };
            for (const raw of list.tools) {
                const tool = catalogueTool(raw);
                if (!tool || names.has(tool.name)) return { health: "unreachable" };
                names.add(tool.name);
                tools.push(tool);
            }
            cursor = list.nextCursor;
            if (!cursor) {
                parseCatalogJson(new TextEncoder().encode(JSON.stringify(tools)), 20_000);
                return { health: "ok", tools };
            }
            if (typeof cursor !== "string" || cursor.length > 1024 || cursors.has(cursor)) return { health: "unreachable" };
            cursors.add(cursor);
        }
        return { health: "ok" };
    } catch { return { health: "unreachable" }; }
    finally {
        if (headers.has("MCP-Session-Id") && !signal.aborted) {
            await guardedFetch(url, { method: "DELETE", headers, signal }, io)
                .then(response => response.body?.cancel()).catch(() => {});
        }
    }
}

export async function discoverTools(url: string, io: OAuthIo = {}): Promise<CatalogTool[] | undefined> {
    return (await remoteEvidence(url, true, io)).tools;
}
