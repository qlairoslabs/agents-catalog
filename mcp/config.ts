export interface RawMcpServerStdio {
    type?: "stdio";
    command: string;
    args?: string[];
    env?: Record<string, string>;
}

export interface RawMcpServerHttp {
    type: "http";
    url: string;
    headers?: Record<string, string>;
    auth?: "none" | "oauth" | "key";
}

export interface RawMcpServerSse {
    type: "sse";
    url: string;
    headers?: Record<string, string>;
    auth?: "none" | "oauth" | "key";
}

export interface RawMcpServerPackage {
    type: "package";
    package: { manager: "npm" | "pypi" | "mcpb"; identifier: string; version: string; sha256?: string };
    args?: string[];
    env?: Record<string, string>;
    update?: "auto" | "frozen";
    installScripts?: boolean;
    trust?: "curated" | "verified-publisher" | "community" | "unvetted";
    provenance?: boolean;
}

export type RawMcpServerEntry = RawMcpServerStdio | RawMcpServerHttp | RawMcpServerSse | RawMcpServerPackage;

export type OutboundConfig = Record<"mcp" | "skills", "off" | "bundled" | "trusted" | "community" | "any">;
