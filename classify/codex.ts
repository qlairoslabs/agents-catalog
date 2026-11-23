import { readFileSync } from "node:fs";
import { basename, dirname } from "node:path";

export function codexLogin(file: string) {
    try {
        const auth = JSON.parse(readFileSync(file, "utf8"));
        if (auth?.auth_mode !== "chatgpt") return null;
        const { access_token, account_id } = auth.tokens ?? {};
        if (typeof access_token !== "string" || !access_token || typeof account_id !== "string" || !account_id) return null;
        const claims = JSON.parse(Buffer.from(access_token.split(".")[1]!, "base64url").toString("utf8"));
        const expiresAt = typeof claims.exp === "number" ? claims.exp * 1000 : NaN;
        if (!Number.isFinite(expiresAt) || typeof auth.last_refresh !== "string"
            || !Number.isFinite(Date.parse(auth.last_refresh))) return null;
        return {
            expiresAt,
            // The file loader expects token data including a JWT and a refresh-token
            // string. Reuse the same JWT and supply no refresh credential.
            credential: JSON.stringify({ auth_mode: "chatgptAuthTokens", last_refresh: auth.last_refresh, tokens: {
                access_token, account_id, id_token: access_token, refresh_token: "",
            } }),
        };
    } catch { return null; }
}

export async function refreshCodexLogin(file: string): Promise<void> {
    if (basename(file) !== "auth.json") throw new Error("Codex host refresh requires an auth.json file");
    const child = Bun.spawn(["codex", "app-server", "--listen", "stdio://"], {
        cwd: "/tmp", env: { ...process.env, CODEX_HOME: dirname(file) }, stdin: "pipe", stdout: "pipe", stderr: "ignore",
    });
    const timer = setTimeout(() => child.kill("SIGKILL"), 120_000);
    try {
        const reader = child.stdout.pipeThrough(new TextDecoderStream()).getReader();
        let pending = "";
        child.stdin.write(JSON.stringify({ id: 1, method: "initialize", params: {
            clientInfo: { name: "catalogue-classifier", version: "1" },
        } }) + "\n");
        child.stdin.flush();
        while (true) {
            const chunk = await reader.read();
            if (chunk.done) break;
            pending += chunk.value;
            const lines = pending.split("\n");
            pending = lines.pop()!;
            for (const line of lines) {
                const result = JSON.parse(line);
                if (result.id === 1 && result.result) {
                    child.stdin.write('{"method":"initialized"}\n{"id":2,"method":"account/read","params":{"refreshToken":true}}\n');
                    child.stdin.flush();
                } else if (result.id === 2 || result.id === 1 && result.error) return;
            }
        }
    } finally {
        child.kill();
        await child.exited;
        clearTimeout(timer);
    }
}

export function codexModelCatalogue(file: string, model: string): string {
    const { models } = JSON.parse(readFileSync(file, "utf8"));
    const selected = Array.isArray(models) && models.find(entry => entry?.slug === model);
    if (!selected) throw new Error("Codex classifier model is missing from models_cache.json");
    return JSON.stringify({ models: [{ ...selected, shell_type: "disabled",
        apply_patch_tool_type: null, tool_mode: "direct", experimental_supported_tools: [],
        supports_search_tool: false, node_repl_disabled: true,
        include_skills_usage_instructions: false, include_plugin_usage_instructions: false, include_apps_usage_instructions: false,
    }] });
}

export const CODEX_CLASSIFIER_CONFIG = `
sandbox_mode = "read-only"
approval_policy = "never"
web_search = "disabled"
model_catalog_json = "/run/classify/models.json"
cli_auth_credentials_store = "file"
check_for_update_on_startup = false
[mcp_servers]
[agents]
enabled = false
[features]
shell_tool = false
unified_exec = false
apps = false
plugins = false
remote_plugin = false
hooks = false
multi_agent_v2 = false
code_mode = false
code_mode_only = false
code_mode_host = false
sleep_tool = false
view_image = false
tool_suggest = false
skill_search = false
skill_mcp_dependency_install = false
computer_use = false
browser_use = false
image_generation = false
goals = false
`;
