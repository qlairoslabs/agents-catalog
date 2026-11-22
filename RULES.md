# RULES: what the catalogue offers

Status: **in force**, reviewed 2026-11-14, updated 2026-11-22 with what the build
enforces (§2.2, §3.1, §10) and the status policy (§11). Address normalization in §10 and
all of §11 apply from the first signed publication. This says what gets offered to
users and why; `PROCESS.md` says how the catalogue is built, and `TAXONOMY.md` how it is
organized. Sections marked **open** are not decided.

Each rule carries its reason, so it can be judged later. Numbers are parameters
and can change; the reasons are what matters. **A rule is not done until the
code applies exactly what is written here.** The age rule below was applied
wrongly because the code and the text differed, and nothing compared them.

## 1. What a tier means

Trust is decided per entry and shown on every card.

| Tier | Meaning | What it proves |
|---|---|---|
| **curated** | in a source someone reviews: Docker's list, Anthropic's marketplaces, the reference servers, the operator's own entries | a person or organization looked at the source |
| **verified publisher** | a vendor on the reviewed vendor list (§5, §7), with its own repository or a URL on its domain | who published it, and that it is trusted as a publisher; **nobody reviewed the entry** |
| **community** | passed automatic checks: §2, §3, or the automated review of a marketplace (§5) | it looks established and real; **nobody read it** |
| **unvetted** | everything else: open registry search, pasted URLs and commands | nothing |

A verified domain alone is identity, never trust: anyone can verify a domain,
and most of the registry's verified domains are unknown companies.

**Curated means a person looked at this once.** Skills are pinned, so a review
holds until the content changes. Stdio packages update themselves and a remote can
change at any time, so for connectors it means the server and its publisher were
reviewed, not each release.

**What a hub shows, by mode** (`server.outbound.mcp`; each adds to the one
before):

| Mode | Offers |
|---|---|
| `off` | nothing from outside |
| `bundled` | the catalogue shipped in the release, not updated |
| `trusted` | curated and verified publisher, updated |
| `community` | also community |
| `any` | also unvetted, with hard filters only: no missing packages or versions, no deprecated packages, no advisories |

## 2. Remote servers (HTTP)

The server runs elsewhere: no third-party code enters the Agent's environment,
and sign-in goes through the hub's proxy. The risk is what the server does with
what it is sent, and whether it is who it claims to be. So the checks are about
**identity and being established**.

All of these, for the community tier:

| Rule | Value | Why |
|---|---|---|
| Live | answers an MCP `initialize`, or asks for OAuth (401 with resource metadata) or a key (401/403 with a `Bearer` challenge, or a declared header) | a listing that does not work is noise; it leaves on a clear "no", or after three runs with no answer (§2.1) |
| Verified domain | the namespace is a verified domain, and the URL is on it | ties the server to whoever controls the domain; the registry checks only the namespace, so the URL is checked here |
| HTTPS, no template variables | | a template URL is not one server, and cannot be probed |
| Not shared hosting | not under a maintained list (`*.vercel.app`, `*.workers.dev`, `*.trycloudflare.com`, `*.netlify.app`, `*.onrender.com`, `*.railway.app`, `*.pages.dev`) | anyone can get a subdomain there, so the domain proves nothing |
| Not a gateway | the host serves fewer than 10 registry entries | a host with many entries is a reseller, not a publisher |
| Small publisher | at most 3 entries per publisher | blocks mass publishing to flood the list |
| Not republished | the URL appears under one namespace only | blocks copying someone's server under another name |
| Established | the domain is at least 6 months old and the entry listed at least 30 days, **or** the domain is in the Tranco top million. No domain age available: listed at least 90 days | fresh domains are the usual shape of abuse |

**When a server offers both a remote and a package,** the remote is preferred:
no code in the Agent's environment, no cold start, sign-in through the proxy.

### 2.1 When a check gets no answer

Applies to §2 and §3. "The check said no" and "we could not ask" are different
results, and only the first says anything about the entry.

| Result | What happens | Why |
|---|---|---|
| A clear "no": a failed rule, a package gone from npm or PyPI, an address the guard refuses | the entry leaves at once | the answer is known |
| No answer: a timeout, a connection or server error, a rate limit, after retrying | an accepted entry stays as it was and is asked again at the next run; it leaves after **three** runs with no answer. A new entry stays out | one failed request must not remove a healthy server: Brave Search and next-devtools were lost that way |

The limit matters: while there is no answer, a kept entry is not checked, so it
could hide a dead server or a new advisory. An entry the registry has deprecated
or deleted is never kept. Domain age is the exception: a registration date does
not change, so a failed lookup uses the age from the last feed.

### 2.2 How a remote connects

| Rule | Why |
|---|---|
| Streamable HTTP over HTTPS only. Servers offering only SSE, plain HTTP or a URL template are left out; one offering both SSE and streamable HTTP is listed by its streamable address | SSE is the protocol's older transport, being retired; plain HTTP exposes the traffic; a template is not one server |
| A header value is a whole reference to a secret the listing declares (`$SECRET`), never a literal or part of one | the catalogue never carries a credential, and a hub must know which secret goes where |
| A server known to need a key but declaring no header for it is left out | there is nowhere to put the key, so it would show as usable and fail. It can still be added by hand |
| Its tools, when it lists them without sign-in, are published with it: names, descriptions and parameters only | so an Agent can know what it does before anything is connected |

## 3. Stdio packages

The code runs **inside the Agent's environment**, with its access: the
workspace, its environment and secrets, `AGENTS_TOKEN`, and any public host.
Nothing isolates it; trust comes from curation and pinning, not from a sandbox.
So the checks are about **the code and who controls it**, and they are stricter
than for remotes. The hub itself never runs a stdio server.

All of these, for the community tier:

| Rule | Value | Why |
|---|---|---|
| Exists | the package and the listed version exist; on PyPI, a wheel is published | a listing must be installable |
| Not deprecated | | the publisher has said to stop using it |
| No advisories | none on the listed version (OSV) | known-bad code |
| Ownership | see below | the name on the card must be the owner of the code |
| Package age | at least 30 days **since its first release** | gives time for a malicious package to be caught and removed. Not the listed version: active packages always have a young latest version, and Playwright and Chrome DevTools were rejected for it |
| Popularity | at least 1,000 downloads a week | a weak signal of real use; many eyes. It counts the whole package, not its MCP use, so general libraries with an MCP listing pass on their library use (`color-space`, `browser-use`, `seleniumbase`). **Open:** a better signal |
| Provenance | shown as a badge, not required; a release that **loses** it when earlier ones had it is refused | few packages have it, but losing it can mean a stolen account |

**Ownership:**

- `io.github.<owner>/…`: the package's repository is on GitHub under that owner.
- Verified domain (`com.supabase/…`): the repository is on that domain, **or**
  the package declares the server name: `mcpName` in `package.json`, `mcp-name:`
  in the PyPI description. It is the marker the official registry requires to
  prove package ownership, and a company's repository is usually on GitHub, not
  on its own domain.

**Install scripts** never run: packages are installed with `--ignore-scripts`. A package
that needs them is left out; allowing it would need a new rule, with its reason.

### 3.1 How a package connects

| Rule | Why |
|---|---|
| An exact version from npm or PyPI, or an MCPB bundle pinned by digest from a reviewed bundle | what runs is exactly what was checked |
| No arbitrary command, and no environment value that is a path or expression evaluated at run time | the catalogue must not decide what runs on a machine beyond the package itself |
| An environment value holding a credential is a whole reference to a declared secret | as for remotes (§2.2) |
| The build never installs or runs a package | checking needs only its metadata |

**Not offered:**

| Type | Why |
|---|---|
| Docker images (`oci`, Docker's `server` entries) | need a container next to the Agent; most wrap an npm or PyPI package and arrive that way |
| nuget, cargo | would need .NET or Rust in every image |
| mcpb | only inside a curated bundle, pinned by hash |
| A bundle's server launching a file inside the bundle | left out when the bundle is added (§5) |

Measured on the 2026-10-06 crawl, npm only: 277 packages pass with the age rule
fixed; about 336 with the ownership rule fixed. At 500 downloads a week, about
640; at 100, about 2,000. **Open:** whether to lower the threshold, once the
fixed catalogue has been seen. PyPI is unmeasured.

## 4. Delegated connectors

A third party runs them (Composio). Nothing runs in the Agent's environment, but the
provider holds the accounts and sees all traffic, so trust belongs to the provider:

| Rule | Why |
|---|---|
| All of a provider's listings take one tier, from reviewing the provider | a per-connector tier would say nothing about who holds the account |
| To be offered: documented data handling, access a user can revoke, and a key that stays with the hub, or on hosted the control plane, and never reaches an Agent | it sits between the Agent and the service |
| We add providers through the vendor list; operator-added providers come later, as each needs library code | the same path as any vendor |
| Where a service has an open MCP server, our listing is offered instead | no cost, and we own the flow |
| The catalogue never lists a provider's tools: a hub fetches them, and the catalogue only publishes our notes on them | its list is its own, and stays current |

End users need not know how the provider works, but they are told one is involved:
a delegated connector carries a third-party badge in every client, the consumer one
included, and the technical webapp also names the provider. It must be
named in the privacy terms of any service using it.

## 5. Skills and bundles

Bundles are what Anthropic and others call **plugins**, listed in **marketplaces**.
A plugin can hold skills, MCP servers, agents, commands and hooks. We take skills
and MCP servers only: hooks run shell commands, which the hub never executes from
a catalogue, and agents and commands are ignored.

A skill is **authoritative text the Agent follows**, and may carry scripts. It
needs no sign-in and no network to do harm: its risk is the instructions
themselves, which no download count measures. Stars belong to a repository, not
to a skill, and install counts are near zero, so §3's popularity checks do not
carry over.

There is no official registry for skills or plugins, so no verified namespace and
no ownership marker. **Trust comes from who owns the repository.**

| Tier | What it takes |
|---|---|
| curated | in a marketplace someone reviews: `anthropics/claude-plugins-official`, `anthropics/skills`, Anthropic's other first-party marketplaces |
| verified publisher | in a repository owned by a vendor's GitHub organization, on the reviewed list below |
| community | in `anthropics/claude-plugins-community`: 2,283 plugins that, as its README states, passed automated security scanning and approval. Automated, so not curated |
| unvetted | a pasted URL, under `any` |

**No other community tier for skills yet.** Stars alone are not enough for
something the Agent obeys. Skills are short and pinned to a commit, so a review
stays valid until the content changes, which makes real review possible:
automatic scans, or an LLM reading each one as help for a person. That comes
first.

**Vendors (verified publisher).** Reviewed by hand, each with its reason; counts
are distinct skills on 2026-10-30.

| Owner | Repositories | Skills |
|---|---|---|
| Microsoft | `microsoft/skills`, `dotnet/skills`, `microsoft/azure-skills` | 382 |
| Google | `google/skills`, `google-gemini/gemini-skills` | 181 |
| Trail of Bits | `trailofbits/skills` | 97 |
| OpenAI | `openai/skills` (no listing file) | 44 |
| AWS | `awslabs/agent-plugins` | 34 |
| Sentry | `getsentry/skills` | 30 |
| Hugging Face | `huggingface/skills` | 26 |
| Expo | `expo/skills` | 25 |
| LangChain | `langchain-ai/langchain-skills` | 22 |
| HashiCorp | `hashicorp/agent-skills` | 20 |
| Cloudflare | `cloudflare/skills` | 19 |
| Stripe | `stripe/ai` | 10 |
| Vercel | `vercel-labs/agent-skills` (no listing file) | 9 |
| Supabase | `supabase/agent-skills` | 2 |

Their contents have not been read yet. `github/awesome-copilot` is left out: it
sits under GitHub's organization but appears community-contributed.

**Rules that apply to every tier:**

| Rule | Why |
|---|---|
| Pinned to a commit and a content hash | a review or a tag stays valid until the content changes |
| In a vendor's repository, a listed entry's source must be owned by that vendor, or it drops a tier. Reviewed marketplaces are exempt: their review covers the sources they list | a vendor listing can point at anyone's repository, and the owner is the whole basis of a vendor's trust |
| Hooks, agents and commands are ignored | hooks run shell commands |
| A bundle keeps its source's tier | a tier says who reviewed it, not what runs |
| A member that breaks a rule is left out when the bundle is added, and the card says so: a stdio server outside §3's limits, or one launching a file inside the bundle (16 of Claude's 310) | it would run unpackaged code in the Agent's environment. The rest of the bundle still works, though it may only half work without that server |
| Same content is one listing, with all its origins | copies are common: one skill appears in 195 repositories |
| A plugin in two marketplaces is one listing when the source matches: same repository and folder, whatever its name. It takes the highest tier and **that tier's commit** | a tier belongs to the commit it was given for. On 2026-10-30, 166 community entries shared a source with an official one, and 143 of them pinned a different commit |
| The same name from another source stays a separate listing, showing its owner | a name proves nothing: 14 community plugins shared a name with an official one but came from another repository, such as `skill-creator` and `apollo` |

**Open:**

- What reviewing a skill means, and what a scan must find.
- For `outbound.skills`, `community` grants what `trusted` does today; with a
  community tier for bundles it must mean what it means for connectors.

Agents can never install or change a skill, in any tier: writes exist only in
the user-facing plane.

## 6. Versions and updates

**Live data changes what is offered, never what is installed**, with one
exception, stdio packages:

| Kind | Rule | Why |
|---|---|---|
| Remote and delegated connectors | the URL is pinned at connect; a changed URL shows *Update available*. What the server does changes upstream and cannot be pinned; the gateway refreshes the tool list and changes are shown | a remote cannot be frozen, so changes are made visible |
| Skills and bundles | pinned to a commit and digest; updating shows the new content first | nothing changes the Agent's instructions silently |
| Stdio packages (default) | move on their own to the newest stable release at least N days old, refreshed daily: **7 days** for community, **3 days** for curated and verified publisher | security fixes arrive on their own, and the delay gives time for a bad release to be caught |
| Stdio packages (frozen) | an entry may name an exact version; it is not refreshed and shows *Update available* | the operator's choice |

- Skipped when choosing a version: pre-releases, deprecated releases, releases
  with an advisory, releases that lose provenance.
- An advisory against the installed version shows on the card; the operator may
  update at once, ignoring N. Not automatic.

## 7. How something gets vetted

| What | How |
|---|---|
| One entry becomes curated | a file in the repository records the reviewer, the date, the version and what was checked, changed by a reviewed pull request |
| A vendor joins the list | by a reviewed change, with proof it is the official organization. A vendor can ask in an issue |
| A vendor leaves | when compromised, abandoned, or under a new owner |
| The vendors' MCP servers (a seed list of 1,181 servers from 1,082 vendors) | join in batches, as verified publisher: an LLM drafts, a person confirms |
| An entry rejected by a rule gets an exception | a file with a reason, a reviewer and an expiry. An exception list is a rule too |

There is one reviewer today, so public requests get no promise of time.

## 8. Removal

Today an entry leaves the community feed when it fails a check, and a hub that already
added it keeps it, silently.

**At launch, a block list only:** the signed index's `blocked` field names a
package version, server address or skill hash, set by a reviewed change. Hubs refuse to
start or connect anything on it, deleting nothing, and reach it through their daily
refresh. A three- or
seven-day update delay is not screening: until this list names something, a bad
release that passed the checks runs. A `bundled` hub never fetches, so it never gets the
list: it learns of a block only through a newer release, which is what `bundled` means
(no updates of any kind). An operator who wants safety updates uses `trusted`. Hosted
runs `trusted`.

**Deferred, the full design.** The proposal to start from:

- Two states. **No longer offered:** the entry left the catalogue; it keeps working
  and the card says so. **Known bad:** a signed list in the index names the package
  version, URL or skill hash.
- Known bad is set automatically by malware advisories (OSV's `MAL-` ids), or by a
  reviewed change. An emergency workflow re-signs the index in minutes. Ordinary
  advisories stay a warning on the card.
- A hub leaves it out of new sessions and shows a banner. The operator can override,
  which is recorded, or choose to warn instead of block. A skill only leaves on a
  restart, so it depends on the configuration spec's plan and apply.
- `bundled` hubs do not get the list.

Hubs ignore fields they do not know, so adding the list later breaks nothing.

## 9. Changing these rules

A change states its reason and its measured effect: how many entries enter and
leave, and which notable ones. Each published catalogue records the rules
version it was built with.

## 10. One tool, one listing

| Rule | Why |
|---|---|
| Listings with the same connection (the same address after normalizing case, trailing `/`, `www.` and query, or the same package and version) are one listing with all their sources, at the highest tier | the same tool must not appear twice because two sources list it |
| Skills with identical content are one listing (§5) | copies are common |
| Different addresses of one publisher, different packaging of one service (a server and a bundle), and different builders for one service (an official and a community server) stay separate listings | they are different things to connect; a hub can show how they relate |
| Two servers at different addresses with identical tool lists are flagged for review, never merged automatically | likely copies, but only a person can tell |

## 11. Status, and what is not published

Every listing has a status, set by classification and reviewed (`TAXONOMY.md`):

| Status | Meaning | In the catalogue |
|---|---|---|
| `ok` | a normal listing | shown |
| `junk` | a test, placeholder, example or deprecated tool | not published |
| `profile` | one person's portfolio, blog or CV | published, hidden by default |
| `brochure` | a company's own about, pricing or demo server with no real tool | published, hidden by default, found by name |
| `adult` | explicit content | published, hidden unless the user opts in |
| `excluded` | against our policy, for example identifying adult performers from photos of their face | not published |

A server that is unreachable or not found across several runs leaves under §2.1. A
package its publisher deprecated leaves under §3.

## 12. Corrections and removal

A publisher, or anyone, can ask for a listing to be corrected, re-classified or
removed, by opening an issue in this repository. A request about one's own listing
is handled first. A removal for safety goes through the block list (§8); any other
change is a reviewed change, recorded with its reason. There is one reviewer today,
so requests get no promise of time.
