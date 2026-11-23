# How the catalogue is built

This is the whole pipeline, from nothing to a signed, published catalogue: what
runs at each step, what it reads and writes, who decides, and what checks it. It
describes what we do, not the design reasons; those are in `RULES.md` (what gets
in, and why) and `TAXONOMY.md` (how entries are organized).

Each step is marked **now** (built and used) or **later** (planned, not started).

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

## 3. Fetch evidence (now)

A catalogue description is often short, vague or written for a model. The tools
publish better evidence of what they do, and it is fetched once per run:

| Entry | Fetched | Status |
|---|---|---|
| Remote server, no sign-in | MCP `initialize` and `tools/list`: tool names, descriptions, parameters | now |
| Remote server, sign-in needed | MCP `initialize` only, as a health check: 401/403 means alive but needs sign-in || now |
| Skill | `SKILL.md`, at the pinned commit || now |
| Bundle | `README.md` and the plugin file, at the pinned commit || now |
| npm or PyPI package | README, latest version, deprecated or yanked flags || now |

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

Two listings merge only when their whole connection is the same: for a remote,
the address with only scheme and host lowercased (path and query kept unless proven
equivalent), with the same headers, sign-in and secret slots; for a package, the same
registry, name, version, arguments, environment and, for MCPB, digest. That merges, for
example, a community entry and Docker's entry for one address. With evidence (§3), servers
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
- **Batch runs** (now, all of `classify/`): no tools at all. Entries are sent as data,
  and every session is given an empty tool set. This covers the weekly labeling of new
  listings (`classify/label.ts`) and the per-tool effects (`classify/run.ts`).
- **Labeling over files** (allowed, used only for whole relabels when the structure
  changes, §5.1): the model may only read and write files in its folder; no shell, no
  web access, no connectors.
- The credential is a short-lived access token. The maintainer's login stays
  outside the container.
- Every output is checked outside the container before it is stored. Unknown
  values are dropped and text is cut to the format's limits.
- Before a new image or login is used, a canary entry that tells the model to run
  commands and write files must produce no tool call, no permission request and no file,
  and still a valid answer that ends its turn normally.

Commands: `bun classify/canary.ts`, `bun classify/run.ts <parts-dir>`. See the
README for options.

### 5.4 What has run

- **v1, the first publication:** the taxonomy built with the loop above (`TAXONOMY.md`,
  version 1.1, 34 areas and 332 topics), every entry labeled, adjudicated and
  spot-checked (`facets/classification-v1.json`); effects for every published tool, in
  one batch run (`tags/`).
- **Each week (§11):** only listings without a row are labeled against the taxonomy,
  by `classify/label.ts`: a small model (Haiku) labels, a stronger one (Sonnet)
  re-checks entries placed under NEW or with a status other than `ok`, and every row is
  checked with the build's own reader before it is stored in
  `facets/classification-added.json`. Effects run on new or changed tools only
  (Sonnet). A listing keeps its row by id; the reviewed v1 rows are never rewritten.
- **Models:** Claude Code through acp-client, on the maintainer's subscription; which
  model is a setting (§11), and so is the provider when the job moves.

## 6. Apply the classification and validate (now)

`bun build.ts parts ... --tags <dir>` rebuilds the parts with the classification,
or `bun build.ts apply-tags` applies it to an existing build. Untagged entries are
published as they are, only without those filters.

Tool lists are not inside the listings: each server's list is its own file,
`tools/<sha256>.json`, named by its content, and `tools.json` (the manifest) gives each
listing's file, size, tool count and its counts of `read`, `write` and `risky` tools.
Hubs load the listings and the manifest, and fetch a tool list only when they need it.


`bun build.ts validate <dir>` then checks every part against the schema and the
same limits a hub applies (bytes, items, depth, text lengths). A part that fails,
a source that comes back empty, or a part far smaller than the last good one keeps
the previous validated part instead. A first build with no previous part fails.

## 7. Compare (now)

`bun compare.ts` and the `parts` step write a report: counts by kind and transport,
and every entry added, changed, merged or dropped, each with the rule that caused
it. **A drop that cannot be attributed to a rule fails the build.**

## 8. Review (when the structure changes)

A person reviews a build when the structure changes: a new taxonomy version, new
rules, a new source. That build is committed to a branch (`manual-build`) and
published only after review. Weekly builds are not reviewed: they are guarded by the
safety stops in §11 instead.

## 9. Sign and publish (now)

The `publish` workflow is started from `main`, naming the full commit of a build:
by the weekly job (§11), on the owner's behalf, or by hand. It:

1. Takes the build's files from that commit as git objects: the two parts, the
   manifest and the tool-list files, refusing anything else in `out/`. Nothing from the
   build commit runs.
2. Validates them with this repository's own code, from the workflow's commit.
3. Commits the parts to `published`.
4. Writes the index naming that commit, and checks it and every tool-list file
   against the manifest, from the committed bytes (sizes and digests of what GitHub will
   serve).
5. Signs the index with the current key (Ed25519), verifies the signature, and
   commits it.

The signing key is a secret of a protected environment limited to `main`: only workflows
on `main`, which is itself protected and changed only by review, can use it.
The public keys are built into the hubs; a second key, held offline, can revoke the
current one. Every publication has a higher sequence number than the last.

## 10. Re-running (now)

A new build starts from the stored results:

- Checks reuse what does not change (`RULES.md` §2.1).
- Classification only runs on entries whose content changed, because tags are
  stored by a hash of what the model read (`tags/<hash>.json`).
- Taxonomy values are only added after publication, never renamed or reused; a
  merge ships as a published remap (`TAXONOMY.md`).

Every week this runs on its own (§11). **Later:** services and capabilities,
with the same loop as §5.1; notes on other catalogues' listings (for example
Composio's toolkits), published beside the index.

## 11. Running the weekly build

Every Sunday at 00:00 UTC (the timer adds a random delay of up to 10 minutes) the catalogue is rebuilt and published, with no manual
review. The catalogue expires 14 days after a publication, so one missed week is
covered. Everything runs from one script, `ops/weekly-run.sh`, configured only by
environment settings, so it can move to another machine or to CI without changes.

### Steps

| # | Step | Command | Stops the run when |
|---|---|---|---|
| 1 | Update the job's own checkout of this repository | `git fetch`, fast-forward | the checkout has any local change, or `main` is not exactly `origin/main` |
| 2 | Isolation canary | `bun classify/canary.ts` | the model used a tool, asked a permission, wrote a file, or gave no valid answer |
| 3 | Build before labeling: incremental crawl, evidence, checks, merge, compare | `bun weekly.ts build ... --output <run>/untagged --verdict <run>/verdict-untagged.json` | the verdict is "do not publish" (below) |
| 4 | Label new listings against the taxonomy | `bun weekly.ts needs-labels` then `bun classify/label.ts` | a hard failure (below); an allowed incomplete result continues |
| 5 | Classify new or changed tools (`read`, `write`, `risky`) | `bun classify/run.ts <run>/untagged` | a hard failure (below); an allowed incomplete result continues |
| 6 | Build with the labels | `bun weekly.ts build ... --output <run>/tagged --verdict <run>/verdict.json`, then `bun build.ts validate` | the verdict, or validation fails |
| 7 | Record the week's labels on `main` | one commit of only `tags/` and `facets/classification-added.json` | anything else changed, or the push fails |
| 8 | Release the build | `bun weekly.ts release --parts <run>/tagged --branch weekly-build` prints its full commit | no commit is returned |
| 9 | Publish | `gh workflow run publish -f build=<commit>` (§9) | the dispatch fails |

The last good signed catalogue stays live whenever a run stops.

**Model steps: incomplete or failed.** The labeler and the classifier exit `0` when
complete and `3` when incomplete in the one allowed way: some answers were unusable
(no valid JSON, a turn that did not end normally) or the provider's usage limit was
reached. Those entries publish unlabeled (Unclassified; tools counted as able to change
things) and are tried again next week. Any other failure is hard and stops the run: the
model trying a tool or asking a permission (even if the provider then fails), a sign-in
failure, the session not starting, a container problem, or any other error. Only a
failure of the prompt itself, with no tool activity, whose message is a usage or rate
limit, counts as allowed.

**The checkout belongs to the job.** It must be a dedicated clone, used for nothing
else: the run refuses to start if it has any local change or is not exactly at
`origin/main`, and it commits only the generated label files. Two states need a person
before the next run:

- **A hard failure after some batches succeeded** leaves label files written but not
  committed (`tags/`, `facets/classification-added.json`). They are valid (every file is
  checked before it is written), so the usual recovery is to commit and push them; or
  discard them (`git checkout -- tags facets/classification-added.json` and `git clean
  -fd tags`) and they are produced again.
- **Labels committed but not pushed:** push that commit, or reset `main` to
  `origin/main`.

In both cases, find out first why the run failed (`CATALOG_WORK/<date>/run.log`).

**Restarting a run:** run the script again with the same `CATALOG_RUN_ID` (by default
the date). The pre-labeling build is reused only if it finished with a verdict that
allows publishing; otherwise it is set aside and built again. The labeled build always
goes to a fresh folder (`tagged.1`, `tagged.2`, ...). Labels already stored are reused.

**Safety verdict** (steps 3 and 6), written by the build as JSON with `publish: true` or
`false` and its reasons. "Do not publish" when: a drop has no rule; more than
`CATALOG_MAX_DROP_FRACTION` (5%) of the previous listings dropped; a part shrinks below
the guard (§6); validation fails.

### What is kept between runs

| What | Where | Why |
|---|---|---|
| Crawl checkpoints, the signal cache (domain ages, downloads), fetched evidence | `CATALOG_CACHE` | the crawl only re-checks what changes (§1, `RULES.md` §2.1) |
| Per-listing classification | `facets/classification-v1.json` (reviewed, fixed) and `facets/classification-added.json` (weekly additions), in this repository | a listing keeps its labels by id; only new listings are labeled |
| Tool effects, `whenToUse`, `tasks` | `tags/<hash>.json`, in this repository | reused while what the model read is unchanged |
| The previous publication | the `published` branch | compared against, and kept live if a run stops |
| Each run's outputs and log | `CATALOG_WORK/<date>/` | to see what happened |

### Settings

All in the environment; `ops/systemd/weekly.env.example` lists them.

| Setting | Meaning |
|---|---|
| `CATALOG_CHECKOUT` | a git checkout of this repository, on `main`, that the job may commit from |
| `CATALOG_CACHE`, `CATALOG_WORK` | the kept cache, and the per-run outputs |
| `CATALOG_GITHUB_REPO` | the repository to publish (`qlairoslabs/agents-catalog`) |
| `CATALOG_PREVIOUS_INDEX` | the published index to compare with (default: the `published` branch) |
| `CATALOG_PUBLISH` | `1` to dispatch `publish`, `0` to stop after releasing the build |
| `CATALOG_MAX_DROP_FRACTION` | the drop limit (default `0.05`) |
| `CLASSIFY_LABEL_MODEL`, `CLASSIFY_RECHECK_MODEL`, `CLASSIFY_EFFECTS_MODEL` | the models for labeling (default Haiku), its re-check (Sonnet) and tool effects (Sonnet) |
| `CLASSIFY_IMAGE` | the container image the models run in (§5.3) |
| `CATALOG_GIT_NAME`, `CATALOG_GIT_EMAIL` | the identity of the job's commits (default `agents-catalog weekly`) |

For the Codex classifier, use `CLASSIFY_HARNESS=codex` and a pinned image
containing `codex` and `codex-acp`. The default model is `gpt-6-luna`.
`CLASSIFY_CODEX_AUTH` and `CLASSIFY_CODEX_MODELS` default to the host's
`~/.codex/auth.json` and `~/.codex/models_cache.json`. Run the isolation canary
with the selected model before classifying.

```sh
CLASSIFY_HARNESS=codex CLASSIFY_CANARY_MODEL=gpt-6-luna bun classify/canary.ts
```

Codex refreshes on the host. The read-only credential mount contains the
access token and account ID in Codex's external ChatGPT auth format. The
container copies it into a fresh tmpfs Codex home. It has no refresh credential
or host login mount. Its refresh endpoint is also blocked. Shell, patch, web
search and MCP are disabled by the model profile, Codex settings and relay.
The next classifier startup sweeps abandoned credential directories bearing
a process ID and start time. Older unstamped directories are left alone
because their owner process cannot be identified.

Credentials are not settings: the model login and GitHub access come from the machine
the job runs on.

### On a maintainer's machine (now)

- Requirements: Bun, git, podman with the classification image, a Claude Code login,
  and `gh` signed in with rights to push to this repository and run workflows.
- Install the timer: copy `ops/systemd/agents-catalog-weekly.{service,timer}` to
  `~/.config/systemd/user/`, write `~/.config/agents-catalog/weekly.env` from the
  example, then `systemctl --user daemon-reload && systemctl --user enable --now
  agents-catalog-weekly.timer`. For it to run while logged out:
  `loginctl enable-linger $USER`.
- Run by hand: `systemctl --user start agents-catalog-weekly.service`, or run
  `ops/weekly-run.sh` with the settings exported. `CATALOG_PUBLISH=0` builds and
  releases without publishing.
- See runs: `journalctl --user -u agents-catalog-weekly` and `CATALOG_WORK/<date>/run.log`.

### Moving it (checklist)

The job is planned to move off the maintainer's machine, likely to GitHub Actions with
OpenRouter as the model provider through acp-client. To move it:

1. **Models:** choose a harness that acp-client drives with OpenRouter, and make it the
   classifier's provider in `classify/model.ts` (today: Claude Code through
   `claude-agent-acp`). Keep the container, the empty tool set and the canary. Use an
   OpenRouter key with a spending limit and an expiry, held as a secret of a protected
   environment that only the classification job can use. This reverses the earlier
   rule that models never run in GitHub's builds; the owner accepted it on that basis.
2. **Separate jobs:** build and classification in one job, signing and publishing in
   the existing `publish` workflow, which must stay the only user of the signing key.
3. **The cache:** keep `CATALOG_CACHE` between runs (an Actions cache, or a release
   asset), or the crawl starts from nothing and takes hours.
4. **Time:** a GitHub job may run at most 6 hours. The incremental crawl should fit;
   a cold start may not, in which case it resumes from its checkpoint next run.
5. **Rate limits:** npm, PyPI, OSV and RDAP see GitHub's shared addresses; the crawl
   is paced and retries, but expect more "no answer" results (`RULES.md` §2.1).
6. **Pushing:** the job needs a token that can push `main` (labels) and
   `weekly-build`, and dispatch `publish`.
7. **Schedule:** a `schedule:` trigger at `0 0 * * 0` (Sunday 00:00 UTC). GitHub
   disables schedules in public repositories after 60 days without activity; the
   weekly commits count as activity.
8. **Container:** Actions runners have Docker, not podman; the classifier's container
   command needs that switch.

## Open

- Whether fetched tool lists and evidence are kept in the repository (versioned,
  tens of MB) or outside it as a cache.
- Servers that need sign-in stay described by their listing only, unless they
  publish their tools elsewhere.
- Geo-blocking is not detected: servers are only reached from one place.
- Signing the emergency "revoke the current key" index with the offline key is not
  built yet (the signer accepts only the current key); see the signing runbook.
