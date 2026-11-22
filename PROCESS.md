# How the catalogue is built

This is the whole pipeline, from nothing to a signed, published catalogue: what
runs at each step, what it reads and writes, who decides, and what checks it. It
describes what we do, not the design reasons; those are in `RULES.md` (what gets
in, and why) and `TAXONOMY.md` (how entries are organized).

Each step is marked:

- **now**: built and used.
- **v1**: agreed for the first publication, being built.
- **later**: planned, not started.

Everything the pipeline reads from outside is public: the official MCP registry,
Docker's MCP catalogue, the reference servers, the marketplaces, npm, PyPI, and the
listed servers themselves. All of it is untrusted, and nothing downloaded is ever
installed or run.

## Overview

| # | Step | Output | Decided by |
|---|---|---|---|
| 1 | Fetch the sources | raw captures | code |
| 2 | Check each entry against the rules | accepted entries, with reasons for every rejection | code, against `RULES.md` |
| 3 | Fetch evidence about each entry | tool lists, skill text, READMEs, health | code |
| 4 | Map, merge and remove duplicates | one listing per tool, in the catalogue format | code |
| 5 | Classify | topic, status, summary, language, regions; effect per tool | models, then a person (see §5) |
| 6 | Apply the classification and validate | the parts: `connectors.json`, `skills.json`, the tool-list manifest `tools.json` and one `tools/<hash>.json` per server | code |
| 7 | Compare with the previous catalogue | a report: every entry added, changed, merged or dropped, with its rule | code, read by a person |
| 8 | Review | the reviewed build, on a branch | a person |
| 9 | Sign and publish | `index.json` and its signature, on the `published` branch | the owner starts it |

Steps 1–4 and 6–9 are code in this repository. Step 5 runs on a maintainer's
machine, never in GitHub's builds (see §5).

## 1. Fetch the sources (now)

| Source | What is read | Command |
|---|---|---|
| Official MCP registry | every server's latest version, all pages | `bun mcp/build-community-feed.ts` |
| Docker's MCP catalogue, reference servers, marketplaces | their published lists, pinned by commit | `bun generate-catalog.ts` |
| npm, PyPI, OSV, RDAP/WHOIS, Tranco | package metadata, downloads, advisories, domain age, the top-million list | inside the community feed build |

The registry crawl takes hours: npm and PyPI limit request rates, so it is paced.
It keeps a checkpoint and resumes where it stopped. Results that rarely change
(domain registration dates, download counts) are kept between runs; liveness,
advisories and accepted packages' metadata are checked again every run. See
`RULES.md` §2.1 for what happens when a check gets no answer.

## 2. Check each entry (now)

Each entry is checked against `RULES.md`: §2 for remote servers, §3 for packages,
§5 for skills and bundles. A rejected entry keeps its reason, so every difference
from the previous catalogue can be explained.

## 3. Fetch evidence (now in part; v1 in full)

A catalogue description is often short, vague or written for a model. The tools
publish better evidence of what they do, and it is fetched once per run:

| Entry | Fetched | Status |
|---|---|---|
| Remote server, no sign-in | MCP `initialize` and `tools/list`: tool names, descriptions, parameters | now, up to a bound (`--probe-tools`) |
| Remote server, sign-in needed | MCP `initialize` only, as a health check: 401/403 means alive but needs sign-in | v1 |
| Skill | `SKILL.md`, at the pinned commit | v1 |
| Bundle | `README.md` and the plugin file, at the pinned commit | v1 |
| npm or PyPI package | README, latest version, deprecated or yanked flags | v1 |

Tool lists are published (§6); the rest of the evidence is used for classification and
is not published.

Each entry gets a health result (`ok`, `auth-required`, `not-found`,
`unreachable`, `deprecated`, `rate-limited`) with the time it was taken.

How we contact servers: read-only requests, a generic client name, no personal
data, a bounded number of parallel requests spread across hosts. Fetched content
is stored as data and never executed; classification treats it as untrusted.

## 4. Map, merge and remove duplicates (now)

Each accepted entry becomes a listing in the catalogue format
(`schema/item.schema.json`):

- The connection must be an HTTPS server or an exact package version. Servers
  offering only SSE, plain HTTP, URL templates or arbitrary commands are left out
  (`RULES.md` §2, §3).
- When one server has both a remote and a package, the remote is preferred.
- Listings with the same connection, or skills with identical content, become one
  listing with all their sources. It keeps the highest tier.
- Display text is normalized and cut to the format's limits.

Facts that come from the data become filters here: kind, source, publisher, tier,
sign-in, transport, bundle membership.

**v1:** normalize addresses (case, trailing `/`, `www.`, query) before
comparing, so the same server listed by two sources merges (for example a
community entry and Docker's entry for one address). With evidence (§3), servers
at different addresses with identical tool lists are flagged for review as
probable duplicates; they are not merged automatically.

## 5. Classify

What cannot be read from the data comes from models: what an entry is about, a
clean summary, and what each tool does. It runs on a maintainer's machine with
their own subscription, never in GitHub's builds, and every result is a reviewed
file in this repository (`tags/`, `facets/`).

### 5.1 The loop

Used for the taxonomy, and for any later layer (services, capabilities):

1. **Discover:** propose categories from samples of real entries, with two or
   three independent attempts using different methods and samples.
2. **Compare:** label everything with each attempt and measure where they agree
   (stable) and disagree (boundaries to decide).
3. **Consolidate:** one coded scheme, with a definition and an "excludes" note per
   node. **A person makes the boundary calls.**
4. **Label:** small models in parallel (about 900 entries each), each reading every
   entry, with every output checked automatically: valid codes, the row range,
   each row once, field counts.
5. **Adjudicate:** a stronger model re-checks only the disputed entries.
6. **Spot-check:** a person reviews about 100 random entries.
7. **Revise:** split, merge or add nodes, then re-label only the affected entries.

### 5.2 What it produces

| Field | Values | Where it goes |
|---|---|---|
| topic | one primary code and up to two secondary codes from `TAXONOMY.md` | a filter |
| status | `ok`, `junk`, `profile`, `brochure`, `adult`, `excluded` (`TAXONOMY.md`) | `junk` and `excluded` are not published; the others are |
| summary | one line in English, from the user's point of view | the displayed description; the original is kept |
| language | the language of the original description | a filter |
| regions | the places a tool is about or serves, or `global` | a filter |
| effect, per tool | `read`, `write` or `risky`, tied to the hash of the tool definition it was judged from | used by hubs to decide what needs approval |

An effect is `read` only when the tool clearly changes nothing; when unsure, it is
`write`. A hub ignores an effect whose hash does not match the tool it holds.

### 5.3 How models are run

Entry text, fetched tool lists and skill files are written by others and may carry
instructions, so models never run with access to the maintainer's machine:

- Each run is in a container with an empty working folder holding only its input,
  and one output folder. Nothing else from the machine is visible.
- **Labeling over files** (v1): the model may only read and write files there. No
  shell, no web access, no connectors.
- **Batch classification** (now, `classify/`): no tools at all. Entries are sent as
  data, and every session is given an empty tool set.
- The credential is a short-lived access token. The maintainer's login stays
  outside the container.
- Every output is checked outside the container before it is stored. Unknown
  values are dropped and text is cut to the format's limits.
- Before a new image or login is used, a canary entry that tells the model to run
  commands and write files must produce nothing.

Commands: `bun classify/canary.ts`, `bun classify/run.ts <parts-dir>`. See the
README for options.

### 5.4 For v1

The first publication uses a taxonomy built with the loop above (`TAXONOMY.md`,
version 1.1): 34 areas and 332 topics, with every entry labeled, adjudicated and
spot-checked. Effects per tool are produced for every published tool list, in one
batch run.

## 6. Apply the classification and validate (now)

`bun build.ts parts ... --tags <dir>` rebuilds the parts with the classification,
or `bun build.ts apply-tags` applies it to an existing build. Untagged entries are
published as they are, only without those filters.

Tool lists are not inside the listings: each server's list is its own file,
`tools/<sha256>.json`, named by its content, and `tools.json` (the manifest) gives each
listing's file, size, tool count and its counts of `read`, `write` and `risky` tools.
Hubs load the listings and the manifest, and fetch a tool list only when they need it.
**(v1)**

`bun build.ts validate <dir>` then checks every part against the schema and the
same limits a hub applies (bytes, items, depth, text lengths). A part that fails,
a source that comes back empty, or a part far smaller than the last good one keeps
the previous validated part instead. A first build with no previous part fails.

## 7. Compare (now)

`bun compare.ts` and the `parts` step write a report: counts by kind and transport,
and every entry added, changed, merged or dropped, each with the rule that caused
it. **A drop that cannot be attributed to a rule fails the build.**

## 8. Review (now)

The build's output (`out/connectors.json`, `out/skills.json`) and the comparison
are committed to a branch, `manual-build` today. A person reviews it. Only reviewed
bytes are published.

## 9. Sign and publish (now)

The `publish` workflow is started by hand, from `main`, by the owner, naming the
full commit of the reviewed build. It:

1. Takes the build's files from that commit as git objects: the two parts, and (v1) the
   manifest and the tool-list files, refusing anything else in `out/`. Nothing from the
   build commit runs.
2. Validates them with this repository's own code, from the workflow's commit.
3. Commits the parts to `published`.
4. Writes the index naming that commit, and checks it, and (v1) every tool-list file
   against the manifest, from the committed bytes (sizes and digests of what GitHub will
   serve).
5. Signs the index with the current key (Ed25519), verifies the signature, and
   commits it.

The signing key is only available to that workflow, in a protected environment.
The public keys are built into the hubs; a second key, held offline, can revoke the
current one. Every publication has a higher sequence number than the last.

## 10. Re-running (now in part; later in full)

A new build starts from the stored results:

- Checks reuse what does not change (`RULES.md` §2.1).
- Classification only runs on entries whose content changed, because tags are
  stored by a hash of what the model read (`tags/<hash>.json`).
- Taxonomy values are only added after publication, never renamed or reused; a
  merge ships as a published remap (`TAXONOMY.md`).

**Later:** a scheduled daily build, publishing without the manual review for
entries that only changed in health or tool lists; services and capabilities,
with the same loop as §5.1; notes on other catalogues' listings (for example
Composio's toolkits), published beside the index.

## Open

- Whether fetched tool lists and evidence are kept in the repository (versioned,
  tens of MB) or outside it as a cache.
- Servers that need sign-in stay described by their listing only, unless they
  publish their tools elsewhere.
- Geo-blocking is not detected: servers are only reached from one place.
