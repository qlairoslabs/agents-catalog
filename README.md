# agents-catalog

The catalogue of connectors, skills and bundles that `agents` hubs read. Spec:
`10-30-SPEC-catalog-service.md` and `10-30-RULES-catalog.md` in `qlairoslabs/agents`
(`.res/4docs/31-10+/`). Status: **L0 contracts, for review.** No build yet.

## The contract

A build publishes, on the `published` branch:

| File | Schema | What |
|---|---|---|
| `index.json` | `schema/index.schema.json` | the signed file: sequence, expiry, facets, parts, annotations, the block list |
| `index.json.sig` | `schema/signature.schema.json` | a detached Ed25519 signature over the exact bytes of `index.json` |
| `connectors.json` | `schema/parts.schema.json#/$defs/connectors` | `{ "mcp": [item…] }` |
| `skills.json` | `schema/parts.schema.json#/$defs/skills` | `{ "skills": [item…], "bundles": [item…] }` |
| `annotations/<catalogue>.json` | `schema/annotations.schema.json` | our notes on another catalogue's listings |

Every item follows `schema/item.schema.json`: `id`, `formerIds`, `name`, `display`,
`origin`, `discovery`, and exactly one of `connect` (connectors), `skill` or `bundle`.
`examples/` holds one valid file of each kind; `schema.test.ts` checks them.

**Compatibility.** `schema: 1` changes only on a breaking change. Within it, changes only
add fields. Readers ignore fields they do not know, except in `connect`, the signature
and the effect objects, which decide what runs or what is allowed and refuse unknown
fields. A field a reader does not understand never weakens a check.

**Strict where it decides what runs.** `connect.config` is an HTTPS server, with header
values only as `$SECRET` references to a declared secret, or an exact package version
from npm, PyPI or MCPB. No arbitrary command. The catalogue never emits delegated
connectors: a hub's provider adapter builds those.

**Addresses.** Every URL in the index is on `raw.githubusercontent.com` under this
repository and a full commit, so a build between reading the index and its parts changes
nothing, and nothing can point a hub elsewhere.

## Tool hash

An `effect` carries the sha256 of the tool definition it was classified from. A hub
ignores an effect whose hash does not match the tool it holds, and counts that tool as
`write`.

The hash is the lowercase hex sha256 of the UTF-8 bytes of the canonical JSON of
`{ "name", "description", "inputSchema" }`: object keys sorted by code point at every
level, arrays kept in order, no whitespace, numbers and strings as `JSON.stringify`
writes them, a missing `description` as `""`.
