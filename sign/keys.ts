// sign/keys.ts
// The public keys built into the library (agents-core/src/catalog/signature.ts,
// BUILTIN_CATALOG_KEYS). The signer refuses any other key, and verification
// checks the key id against these, so a valid signature by an unshipped key
// never publishes.

export const SHIPPED_KEYS = {
    current: { kid: "catalog-2026-a", key: "6QQ2Me9pGsJL30S3kd6nLe_61y8Oa3nMOtr5h4oUTvg" },
    next: { kid: "catalog-2026-b", key: "S9VEUn65l2qgZA942Za-J4DOPu93Fz_S7YVSo9ZDlNQ" },
} as const;

export function shippedKey(kid: string): string | null {
    for (const entry of Object.values(SHIPPED_KEYS)) if (entry.kid === kid) return entry.key;
    return null;
}
