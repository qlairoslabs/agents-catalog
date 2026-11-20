/** Check the lexical limits before JSON.parse allocates a tree. The parser
 * still establishes the grammar. Strings count encoded code units, including escapes. */
export function parseCatalogJson(bytes: Uint8Array, maxNodes = 1_000_000): unknown {
    const source = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
    let depth = 0, nodes = 0, stringStart = -1;
    for (let i = 0; i < source.length; i++) {
        const character = source[i];
        if (stringStart >= 0) {
            if (i - stringStart > 64_000) throw new Error("Catalogue string exceeds the limit");
            if (character === "\\") i++;
            else if (character === '"') stringStart = -1;
            continue;
        }
        switch (character) {
            case '"': stringStart = i; break;
            case "{": case "[":
                if (++depth > 48) throw new Error("Catalogue JSON is too deeply nested");
                break;
            case "}": case "]": depth--; break;
        }
        if ((character === '"' || character === "[" || character === "{" || character === ",") && ++nodes > maxNodes) {
            throw new Error("Catalogue JSON exceeds its node limit");
        }
    }
    return JSON.parse(source);
}
