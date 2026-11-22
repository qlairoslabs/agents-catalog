# agents-catalog

How it is built: `PROCESS.md`. What gets in, and why: `RULES.md`. How it is organized:
`TAXONOMY.md`.

The catalogue of connectors, skills and bundles that `agents` hubs read. Status: the build,
classification, signing and publishing are in place; the first signed publication is being
prepared.

## The contract

A build publishes, on the `published` branch:

| File | Schema | What |
|---|---|---|
| `index.json` | `schema/index.schema.json` | the signed file: sequence, expiry, facets (including optional versioned topic taxonomy), parts, annotations, the block list |
| `index.json.sig` | `schema/signature.schema.json` | a detached Ed25519 signature over the exact bytes of `index.json`, nothing else |
| `connectors.json` | `schema/parts.schema.json#/$defs/connectors` | `{ "mcp": [item…] }` |
| `tools.json` | `schema/parts.schema.json#/$defs/tools` | listing IDs mapped to tool-list references and optional effect counts |
| `tools/<sha256>.json` | `schema/parts.schema.json#/$defs/toolList` | one content-addressed tool list, shared when identical |
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

## R1 build review

The standalone build and resume commands are in
[CHANGES-FROM-LIBRARY.md](CHANGES-FROM-LIBRARY.md). The review branch's
`out/` holds `connectors.json`, `skills.json`, `tools.json` and the referenced files in `tools/`. Keep crawl captures,
checkpoints and logs in `.r1-cache/`, and the comparison under `reports/`.
Do not put an index, signature, annotations or review notes in `out/`.

Run `bun build.ts validate out` before handing off the parts. The release
workflow writes the index in its publication staging directory after
committing those exact part bytes. For a full comparison, pass the registry
checkpoint and `--require-explanations`. An unattributed drop is marked in the
report and fails the build before it writes the parts.

## Signing and publishing (R3)

`sign/` signs `index.json` with Ed25519 (`bun sign/cli.ts keygen|sign|verify`).
Routine publishing uses the shipped current key. The verifier accepts only IDs
in `sign/keys.ts`, which holds the same public keys as the library.

To sign a revocation index, move the prepared index to the offline machine.
From the catalogue checkout, run:

```sh
env -i "$(command -v bun)" --no-env-file sign/cli.ts sign --next /offline/next.key /path/to/index-dir
```

The mode checks that the private key matches shipped key `catalog-2026-b`
and writes `index.json.sig` beside the index. Use an owner-only regular key
file (mode `0600` or `0400`) at a path that is not a symlink. Omit the final directory argument
to use the working directory. The environment may contain only `PATH`, `LANG`,
`LC_ALL` and `TZ`. Use an offline machine even with a clean environment.
Verify the detached signature before transferring the signed index for publication.

The `publish` workflow runs from `main`, naming the full commit of a build whose output is
in `out/` on a branch of this repository: dispatched every week by the weekly job
(`PROCESS.md` §11), or by hand. It runs in the protected `catalog-signing` environment
(secret `CATALOG_SIGNING_KEY`, variables `CATALOG_SIGNING_KEY_ID` and `CATALOG_PUBLIC_KEY`).

Any workflow on `main` could ask for the `catalog-signing` environment, so adding or
changing a workflow is a reviewed change to the protected `main`. It needs
`build.ts validate <dir>` and `build.ts index --commit <sha> --dir <dir> [--previous
<index.json>]` from the build (R1); the new sequence must exceed the previous one.

Still to come: the scheduled build (catalogue §9) and the catalogue embedded in the
library's release build (R3, with the switch).

## Classification (R4)

Run locally, never in an Action (catalogue §7). `classify/` drives Claude Code through
`@qlairoslabs/acp-client` and the Claude ACP adapter (`claude-agent-acp`), on the
maintainer's subscription, one fresh session per batch. A relay on the ACP wire
(`classify/acp-relay.ts`) gives every new session the adapter's explicit empty tool set and
empty setting sources, since acp-client sends no session metadata. A refused permission does not
switch off a harness's built-in tools, so the boundary is the container: the adapter runs
in a read-only container (default: the agents standard image, or `CLASSIFY_IMAGE`) with an
empty working folder, no host mounts except a read-only Claude Code managed settings file
that denies every tool and bypass mode, no client terminal or filesystem, and every
permission request refused. A batch in which the harness announces a tool or asks for a
permission is refused, as is any turn that does not end normally (`end_turn`). Task and
todo activity reaches ACP as plan updates and counts as a tool. The credential is the maintainer's own Claude Code login, read on the host only. Before
each batch the run checks that its access token outlives the batch; if not, it waits until
just before expiry and lets one trivial Claude Code call on the host refresh it, under
Claude Code's own refresh lock there. The container gets only the access token, by name
as `CLAUDE_CODE_OAUTH_TOKEN`: the login file and its refresh token never enter it, so
nothing in the container can refresh or rotate the login. An explicit
`CLAUDE_CODE_OAUTH_TOKEN` (from `claude setup-token`) is used instead when set. A token from `claude setup-token` in `CLAUDE_CODE_OAUTH_TOKEN`
is used instead when set.

    bun classify/canary.ts                                              # isolation gate, first
    bun classify/run.ts <parts-dir> [--batch=25] [--limit=N]
    bun classify/vocabulary.ts              # writes facets/vocabulary.proposed.json
    bun classify/apply.ts <parts-dir>                                   # then the build's validator

- **Pass 1** writes `tags/<content hash>.json` per item, atomically and resumably. The
  hash covers what the model reads (title, description, publisher, each tool's name,
  description and input schema), so a changed or renamed tool re-classifies. A tag is used
  only if it is well formed and has the current `CLASSIFIER_VERSION`; bump it when the
  prompt or schema change what a tag means.
- **Answers are untrusted:** unknown values are dropped, text is cut to the schema's
  limits, and a tool's effect is kept only for a tool the item has, by its definition's
  hash. `read` needs the model to have seen the whole definition (description up to 600
  characters, input schema up to 3,000); otherwise `write`. Classifier version 2
  shows at most 200 tools per listing and leaves tools beyond that cutoff at
  `write`. Unsure is `write`.
- **Pass 2** proposes the vocabulary from the distinct values into
  `facets/vocabulary.proposed.json`. A person reviews it, removes `added`, and renames it
  to `facets/vocabulary.json`. Later passes only add: existing values and mappings are
  kept exactly. `domain`, `product` and `audience` are published only through a reviewed
  vocabulary; a value it does not map waits for the next review.
- **Isolation, and what is left:** the canary checks that an entry aimed at the harness
  writes nothing, announces no tool and asks for no permission. The container still has ordinary network access,
  because the model API needs it; with no tools the model has no way to use it. The
  image's Claude Code and ACP adapter are trusted.
- **Deferred:** `reliesOn` (§7), which matters for skills, comes with R2.

## Preparing v1

The reviewed entry labels are in `facets/classification-v1.json`. The build
requires one row for every input ID and resolves topics through the reviewed
v1.1 TSV and regions through `facets/regions.tsv`. The signed index's topic
facet carries the labels, definitions and exclusions. Listing status uses
ordinary discovery attributes. The report records every dropped or merged ID.

Fetch evidence into an external cache with
`bun evidence.ts <validated-parts-dir> <evidence-dir> [previous-evidence-dir]`.
The fetch records per-entry health and time, and never executes downloaded
content. Reusing the same evidence directory resumes the same run. Use a new
directory for a new run, and pass the previous directory to carry the
consecutive unavailable count and last tool list. Set
`CATALOG_EVIDENCE_EXCLUDE` to a JSON array of IDs already excluded by review.
Only sanitized tool definitions reach the published parts.

Run `bun build.ts parts --input <validated-parts-dir> --evidence <evidence-dir>
--untagged --comparison <report-path> --output <untagged-dir>` before
classifying tools. Then use
`bun build.ts apply-tags --input <untagged-dir> --tags <tag-dir> --output <out>`
and validate `out`. The v1 tag path retains the reviewed summary and topics
and applies only per-tool effects, when-to-use text and tasks.

The v1 parts command takes historical R1 listings as input. Use separate
output directories for it and apply-tags. See examples/detached/ for the
release layout. The manifest is capped at 2 MiB. Each blob is capped at
1 MiB and 1,000 tools, with JSON depth at most 48.

A signed release always includes tools.json. For an empty manifest,
Git can omit the empty tools directory.
