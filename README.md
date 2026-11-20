# agents-catalog

The catalogue of connectors, skills and bundles that `agents` hubs read. Spec:
`10-30-SPEC-catalog-service.md` and `10-30-RULES-catalog.md` in `qlairoslabs/agents`
(`.res/4docs/31-10+/`). Status: **L0 contracts, for review.** No build yet.

## The contract

A build publishes, on the `published` branch:

| File | Schema | What |
|---|---|---|
| `index.json` | `schema/index.schema.json` | the signed file: sequence, expiry, facets, parts, annotations, the block list |
| `index.json.sig` | `schema/signature.schema.json` | a detached Ed25519 signature over the exact bytes of `index.json`, nothing else |
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
`{ "name", "description", "inputSchema" }`: object keys sorted by **UTF-16 code unit**
(JavaScript's default `sort()`, which differs from code-point order outside the Basic
Multilingual Plane) at every level, arrays kept in order, no whitespace, strings and
numbers exactly as `JSON.stringify` writes them, a missing `description` as `""`.

Test vector (`examples/tool-hash-vector.json`, checked by both sides): the tool in that
file hashes to `e679e25e087b40db73a45bf31ef45f284a2276a5a05dad01735e945f7d353b61`.

## Checks the schema cannot express

Readers, and the build before it publishes, also check:

- every `$SECRET` in `connect.config` names a secret the item declares;
- every URL in the index is pinned to the index's own `commit`, and is already in normal
  form;
- a part id or annotation catalogue appears once in the index;
- `generatedAt` and `expires` are valid times;
- every HTTPS URL parses with a host and no credentials.
- `revokes` in the index is honoured only under the offline next key (the verifier, L1).

## Signing and publishing (R3)

`sign/` signs `index.json` with Ed25519 (`bun sign/cli.ts keygen|sign|verify`). It signs
only with the shipped current key (`sign/keys.ts`, the same keys as the library's
`BUILTIN_CATALOG_KEYS`) and verifies only shipped key ids.

The `publish` workflow is dispatched by hand, from `main`, **by the owner only**, with the
full commit of a build the owner has reviewed (its output in `out/`, on a branch of this
repository). It runs in the protected `catalog-signing` environment (secret
`CATALOG_SIGNING_KEY`, variables `CATALOG_SIGNING_KEY_ID` and `CATALOG_PUBLIC_KEY`).
Nothing from the build commit runs: the tools are this workflow's own commit, and
`sign/ingest.ts` reads the build's files as git objects, taking only `connectors.json`,
`skills.json` and `annotations/<id>.json` as regular files and refusing the build if
anything else is in `out/`. The parts and then the index are validated by the trusted
build code before signing. It publishes to `published` in two commits: the parts, then
the index and its signature naming the parts' commit; the push is never forced.

Any workflow on `main` could ask for the `catalog-signing` environment, so adding or
changing a workflow is a reviewed change to the protected `main`. It needs
`build.ts validate <dir>` and `build.ts index --commit <sha> --dir <dir> [--previous
<index.json>]` from the build (R1); the new sequence must exceed the previous one.

Still to come: the scheduled build (catalogue §9) and the catalogue embedded in the
library's release build (R3, with the switch).
