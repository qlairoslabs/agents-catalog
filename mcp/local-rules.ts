export type McpPackageManager = "npm" | "pypi" | "mcpb";

export interface McpPackageReference {
    manager: McpPackageManager;
    identifier: string;
    version: string;
    sha256?: string;
}

const VERSION = /^[A-Za-z0-9][A-Za-z0-9._+-]{0,127}$/;
const NPM_NAME = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i;
const PYPI_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

/** The package rules the store enforces, for a catalogue reader to apply
 *  before anything reaches the store. Throws on an unsafe reference. */
export function assertSafePackageReference(ref: McpPackageReference): void { safeReference(ref); }

function safeReference(ref: McpPackageReference): void {
    if (!VERSION.test(ref.version)) throw new Error("invalid MCP package version");
    if (ref.manager === "mcpb") {
        let url: URL;
        try { url = new URL(ref.identifier); } catch { throw new Error("invalid MCPB URL"); }
        const releasePath = url.hostname.toLowerCase() === "github.com" ? url.pathname.includes("/releases/download/")
            : url.hostname.toLowerCase() === "gitlab.com" && /\/-\/releases\/[^/]+\/downloads\//.test(url.pathname);
        if (url.protocol !== "https:" || !releasePath || !url.pathname.endsWith(".mcpb")
            || url.username || url.password || !/^[a-f0-9]{64}$/i.test(ref.sha256 ?? "")) throw new Error("invalid MCPB URL or SHA-256");
        return;
    }
    if (ref.manager === "npm" ? !NPM_NAME.test(ref.identifier)
        : ref.manager === "pypi" ? !PYPI_NAME.test(ref.identifier)
            : true) {
        throw new Error("invalid MCP package identifier");
    }
}

const RESERVED_SECRET_PREFIX = "AGENTS_";
const RESERVED_SECRET_NAMES: ReadonlySet<string> = new Set([
    "HOME", "PATH",
    "XDG_CONFIG_HOME", "XDG_DATA_HOME", "XDG_STATE_HOME", "XDG_CACHE_HOME",
    "NPM_CONFIG_PREFIX", "MAMBA_ROOT_PREFIX", "CONDA_PKGS_DIRS", "UV_CACHE_DIR",
]);
export function isReservedSecretName(name: string): boolean {
    return name.startsWith(RESERVED_SECRET_PREFIX) || RESERVED_SECRET_NAMES.has(name);
}

