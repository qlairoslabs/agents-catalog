import { expect, test } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { CODEX_CLASSIFIER_CONFIG, codexLogin, codexModelCatalogue } from "./codex";
import { containerCommand, DEFAULT_OPTIONS, KEY_PATH, sweepKeyFiles, writeKeyFile } from "./model";

test("Codex transfers only an external ChatGPT access credential and uses a tool-free model catalogue", () => {
    const dir = mkdtempSync("/tmp/classify-codex-test-");
    try {
        const file = join(dir, "auth.json");
        const token = "fixture." + Buffer.from(JSON.stringify({ exp: 2_000_000_000 })).toString("base64url") + ".signature";
        writeFileSync(file, JSON.stringify({ auth_mode: "chatgpt", last_refresh: "2026-11-23T00:00:00Z", tokens: {
            access_token: token, account_id: "fixture-account", id_token: "host-id-token", refresh_token: "host-refresh-token",
        } }));
        const auth = codexLogin(file)!;
        expect(auth.expiresAt).toBe(2_000_000_000_000);
        expect(JSON.parse(auth.credential)).toEqual({
            auth_mode: "chatgptAuthTokens", last_refresh: "2026-11-23T00:00:00Z",
            tokens: { access_token: token, id_token: token, account_id: "fixture-account", refresh_token: "" },
        });
        expect(auth.credential).not.toContain("host-refresh-token");
        expect(auth.credential).not.toContain("host-id-token");

        const model = "gpt-6-luna";
        const catalog = join(dir, "models.json");
        writeFileSync(catalog, JSON.stringify({ models: [{ slug: "other" }, {
            slug: model, shell_type: "unified_exec", apply_patch_tool_type: "freeform", tool_mode: "code_mode_only",
        }] }));
        expect(JSON.parse(codexModelCatalogue(catalog, model)).models).toMatchObject([{
            slug: model, shell_type: "disabled", apply_patch_tool_type: null, tool_mode: "direct",
            experimental_supported_tools: [], supports_search_tool: false, node_repl_disabled: true,
        }]);
        expect(() => codexModelCatalogue(catalog, "missing")).toThrow();
        expect(CODEX_CLASSIFIER_CONFIG).toContain('web_search = "disabled"');
        expect(CODEX_CLASSIFIER_CONFIG).toContain("shell_tool = false");
        const command = containerCommand({ ...DEFAULT_OPTIONS, harness: "codex", model }, dir, "fixture", "/dev/shm/fixture/key").join(" ");
        for (const argument of ["--read-only", "--cap-drop=all", "--log-driver=none", "--tmpfs /home/classify",
            "/dev/shm/fixture/key:" + KEY_PATH + ":ro", 'CODEX_HOME=/home/classify/.codex',
            "CODEX_REFRESH_TOKEN_URL_OVERRIDE=http://127.0.0.1:1", 'approval_policy":"never', 'sandbox_mode":"read-only', "exec codex-acp"]) {
            expect(command).toContain(argument);
        }
        expect(command).not.toContain(token);
        expect(command).not.toContain(file);
    } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("startup sweep only removes identified orphan key directories", () => {
    const base = mkdtempSync("/dev/shm/classify-sweep-test-");
    try {
        const live = writeKeyFile("live fixture", base);
        const orphan = join(base, "classify-key-2147483647-1-orphan");
        const legacy = join(base, "classify-key-legacy");
        const reused = join(base, `classify-key-${process.pid}-0-reused`);
        const symlink = join(base, "classify-key-2147483647-1-linkxx");
        mkdirSync(orphan); mkdirSync(legacy); mkdirSync(reused);
        symlinkSync(legacy, symlink);
        sweepKeyFiles(base);
        expect(existsSync(orphan)).toBe(false);
        expect(existsSync(reused)).toBe(false);
        expect(existsSync(legacy)).toBe(true);
        expect(existsSync(symlink)).toBe(true);
        expect(readFileSync(live.file, "utf8")).toBe("live fixture\n");
        live.remove();
    } finally { rmSync(base, { recursive: true, force: true }); }
});
