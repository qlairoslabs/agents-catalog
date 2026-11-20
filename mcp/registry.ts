// src/catalog/registry.ts
// The MCP Registry API (`/v0.1/servers`): the official registry, or any
// registry implementing it.
//
// Not a trusted catalogue by itself (tools spec §C3, §G1): anyone with a domain
// can publish. A domain namespace proves who published an entry — identity,
// shown on the card — and counts as trusted only for domains the operator lists
// in `trusted_publishers`.

import { isReservedSecretName } from "./local-rules";
import type { RawMcpServerEntry } from "./config";
import { secretEnvName, type CatalogItem, type SecretInput } from "./model";

interface RegistryHeader {
    name?: string;
    description?: string;
    isRequired?: boolean;
    isSecret?: boolean;
    value?: string;
    variables?: unknown;
}

interface RegistryRemote {
    type?: string;
    url?: string;
    headers?: RegistryHeader[];
    variables?: unknown;
}

interface RegistryPackage {
    registryType?: string;
    identifier?: string;
    version?: string;
    fileSha256?: string;
    installScripts?: boolean;
    registryBaseUrl?: string;
    transport?: { type?: string };
    packageArguments?: { value?: string; isRequired?: boolean; variables?: unknown }[];
    environmentVariables?: { name?: string; value?: string; description?: string; isSecret?: boolean; isRequired?: boolean; variables?: unknown }[];
}

export interface RegistryServer {
    name?: string;
    title?: string;
    description?: string;
    version?: string;
    remotes?: RegistryRemote[];
    packages?: RegistryPackage[];
    icons?: { src?: string }[];
}

/** `com.notion` → `notion.com`; null for GitHub namespaces and anything odd. */
export function namespaceDomain(serverName: string): string | null {
    const namespace = serverName.split("/")[0] ?? "";
    if (namespace.startsWith("io.github.")) return null;
    const labels = namespace.split(".");
    if (labels.length < 2 || labels.some(label => !/^[a-z0-9-]+$/i.test(label))) return null;
    return labels.reverse().join(".").toLowerCase();
}

function onDomain(host: string, domain: string): boolean {
    return host === domain || host.endsWith(`.${domain}`);
}

/** The listed publisher an entry belongs to, if any: its namespace must be on a
 *  listed domain, and so must its URL — the registry does not check the latter. */
export function listedPublisher(serverName: string, url: string, trustedPublishers: readonly string[]): string | null {
    const domain = namespaceDomain(serverName);
    if (!domain) return null;
    let host: string;
    try { host = new URL(url).hostname.toLowerCase(); } catch { return null; }
    return trustedPublishers.find(listed => onDomain(domain, listed) && onDomain(host, listed)) ?? null;
}

function shortName(serverName: string): string {
    const tail = serverName.split("/").pop() ?? serverName;
    return tail.replace(/[^A-Za-z0-9_.-]/g, "-").slice(0, 64) || "server";
}

export function registryToItem(
    server: RegistryServer,
    sourceId: string,
    sourceLabel: string,
    trustedPublishers: readonly string[],
): CatalogItem | null {
    if (!server.name) return null;
    const remote = server.remotes?.find(entry => entry.type === "streamable-http" && entry.url)
        ?? server.remotes?.find(entry => entry.type === "sse" && entry.url);
    const pkg = !remote?.url ? server.packages?.find(entry => entry.transport?.type === "stdio"
        && ((entry.registryType === "npm" || entry.registryType === "pypi") && entry.identifier && entry.version
            || entry.registryType === "mcpb" && entry.identifier && /^[a-f0-9]{64}$/i.test(entry.fileSha256 ?? ""))) : undefined;
    if (!remote?.url && !pkg && !server.packages?.length) return null;

    const name = shortName(server.name);
    const secrets: SecretInput[] = [];
    const headers: Record<string, string> = {};
    let setupNeeded: string | undefined = remote?.url?.includes("{") || remote?.variables
        ? "Its address needs values you choose. Add it under Custom."
        : undefined;
    for (const header of remote?.headers ?? []) {
        if (!header.name) continue;
        if (header.value !== undefined) {
            if (header.variables || header.value.includes("{")) setupNeeded ??= "It needs values in its headers. Add it under Custom.";
            else headers[header.name] = header.value;
            continue;
        }
        if (!header.isRequired && !header.isSecret) continue;
        const env = secretEnvName(`${name}_${header.name}`);
        if (!env || isReservedSecretName(env)) { setupNeeded ??= "It needs a key under a name the hub reserves."; continue; }
        headers[header.name] = `$${env}`;
        secrets.push({ env, label: header.description?.trim() || header.name });
    }

    const packageEnv: Record<string, string> = {};
    if (pkg) for (const variable of pkg.environmentVariables ?? []) {
        if (!variable.name || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(variable.name)) { setupNeeded ??= "Its environment needs manual setup."; continue; }
        if (variable.value !== undefined && !variable.variables && !variable.value.includes("{")) {
            packageEnv[variable.name] = variable.value;
        } else if (variable.isSecret || variable.isRequired) {
            const env = secretEnvName(`${name}_${variable.name}`);
            if (!env || isReservedSecretName(env)) { setupNeeded ??= "It needs a key under a name the hub reserves."; continue; }
            packageEnv[variable.name] = `$${env}`;
            secrets.push({ env, label: variable.description?.trim() || variable.name });
        } else if (variable.variables || variable.value?.includes("{")) setupNeeded ??= "Its environment needs manual setup.";
    }
    const args: string[] = [];
    if (pkg) for (const argument of pkg.packageArguments ?? []) {
        if (typeof argument.value === "string" && !argument.variables && !argument.value.includes("{")) args.push(argument.value);
        else if (argument.isRequired) setupNeeded ??= "Its command needs values you choose.";
    }
    const config = remote?.url ? {
        type: remote.type === "sse" ? "sse" : "http",
        url: remote.url,
        ...(Object.keys(headers).length ? { headers } : {}),
    } as RawMcpServerEntry : pkg ? {
        type: "package", package: { manager: pkg.registryType as "npm" | "pypi" | "mcpb", identifier: pkg.identifier!,
            version: pkg.version ?? pkg.fileSha256!.slice(0, 16), ...(pkg.fileSha256 ? { sha256: pkg.fileSha256 } : {}) },
        args, env: packageEnv, update: pkg.registryType === "mcpb" ? "frozen" : "auto",
        ...(pkg.installScripts === true ? { installScripts: true } : {}),
    } as RawMcpServerEntry : { type: "stdio", command: "__MCP_UNSUPPORTED_PACKAGE__" } as RawMcpServerEntry;
    if (!remote?.url && !pkg) setupNeeded ??= "This package type is unavailable on this hub.";
    const domain = namespaceDomain(server.name);
    const listed = remote?.url ? listedPublisher(server.name, remote.url, trustedPublishers) : null;

    return {
        id: `${sourceId}:${server.name}`,
        kind: "mcp",
        name,
        title: server.title?.trim() || name,
        description: server.description?.trim() || null,
        icon: server.icons?.[0]?.src ?? null,
        category: null,
        trust: listed ? "verified-publisher" : "unvetted",
        publisher: domain
            ? { name: domain, verified: true }
            : { name: `github.com/${server.name.split("/")[0]!.slice("io.github.".length)}`, verified: true },
        source: { id: sourceId, label: sourceLabel },
        // The registry does not declare OAuth; it shows at connect (§G3).
        mcp: { config, auth: secrets.length ? "key" : "none", secrets,
            ...(pkg ? { package: { manager: pkg.registryType as "npm" | "pypi" | "mcpb", identifier: pkg.identifier!,
                version: pkg.version ?? pkg.fileSha256!.slice(0, 16), ...(pkg.fileSha256 ? { sha256: pkg.fileSha256 } : {}), args } } : {}),
            ...(setupNeeded ? { setupNeeded } : {}) },
    };
}

type Fetch = (input: string) => Promise<Response>;

/** One page of `/v0.1/servers`, latest versions only. */
export async function queryRegistry(baseUrl: string, search: string, fetchFn: Fetch = fetch, limit = 50): Promise<RegistryServer[]> {
    const url = new URL("/v0.1/servers", baseUrl);
    url.searchParams.set("version", "latest");
    url.searchParams.set("limit", String(Math.min(limit, 100)));
    if (search) url.searchParams.set("search", search);
    const response = await fetchFn(url.toString());
    if (!response.ok) throw new Error(`registry answered ${response.status}`);
    const body = await response.json() as { servers?: { server?: RegistryServer }[] };
    return (body.servers ?? []).map(entry => entry.server).filter((server): server is RegistryServer => !!server);
}

/** Every latest entry a listed publisher has: the registry's search is a
 *  substring match on names, and a publisher's names start with its namespace. */
export async function publisherEntries(baseUrl: string, domain: string, fetchFn: Fetch = fetch): Promise<RegistryServer[]> {
    const namespace = domain.split(".").reverse().join(".");
    const found = await queryRegistry(baseUrl, namespace, fetchFn, 100);
    return found.filter(server => server.name && namespaceDomain(server.name) !== null
        && onDomain(namespaceDomain(server.name)!, domain));
}
