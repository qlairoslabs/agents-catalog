# R1 changes from the library build

The checked-feed rules and source readers were copied from the library. The
library scripts, snapshots and workflow remain in place until L2.

| Area | R1 behaviour |
| --- | --- |
| Stages | The registry/Tranco/package crawl and trusted-source fetch are separate captures. Mapping, merging, comparison and validation run offline over those inputs. The final parts retain source, publisher and tier. |
| Resumption | A checkpoint records the registry pages as one capture, Tranco input, npm download prefetch and finished per-entry signals. Restart with the same checkpoint to resume the same logical run. A new run uses a new checkpoint. |
| Incremental checks | A separate SQLite signal cache retains proven domain registration dates and weekly download counts. Unchanged previously rejected packages may reuse definitive negative metadata checks for a week. Accepted package metadata, advisories and remote liveness are checked anew in each logical run. Marketplace source trees are pinned by commit. |
| No answer | Preserves the library's retry, last-good and three-run removal behaviour. The resume checkpoint only records successful lookups, including definite refusals. |
| Transport | Schema 1 only. Prefer an eligible streamable HTTPS remote over the same registry listing's package. A source declaring both SSE and streamable HTTPS is checked for its streamable remote first. SSE-only entries, plain HTTP, URL templates and arbitrary stdio commands are excluded. |
| Secrets | A header or package env value must be an entire declared `$SECRET` reference. Literal prefixes, literals, runtime paths and undeclared references are excluded. This leaves the reference memory server out because its storage path is a runtime variable expression. |
| Packages | Publishes exact store-validated npm, PyPI and digest-pinned MCPB references, using `update: pinned`. The legacy runtime provenance fields and package install-script opt-in are not fields in signed schema 1. Packages requiring install scripts are excluded. |
| Package checks | The checked community crawl retains the existing npm/PyPI checks. MCPB comes from reviewed bundle sources only. The build never installs or runs downloaded package code. |
| Auth and tools | Recorded OAuth is retained when discovery would otherwise advertise no auth. A known key-auth remote with no declared secret header is excluded. Available source tool definitions are sanitized to names, descriptions and schemas. The optional bounded discovery stage sends initialize, initialized, tools/list and session close to public no-auth remotes. It omits unauthenticated probes whose list cannot be obtained cheaply in one page. No labels or MCP hints are promoted to effects. |
| Marketplace | Reads and pins bundle members, adds skill origins, folds identical skill trees and merges bundle copies by repository and directory. Contents are fetched with the existing GitHub reader. If a bundle's contents cannot be fetched, its pinned descriptor can survive with no confirmed members. |
| Duplicates | Across listings, merge equal connection configurations and identical skill trees. Keep the highest tier, then stable ID order. Record each converging ID in the comparison and preserve up to schema 1's 20 former IDs in the listing itself. |
| Display and facets | Normalizes grouped display and origin, bounds strings, and derives kind, source, publisher, trust, sign-in, transport and bundle membership facets. Classification and effects remain R4. |
| Broken parts | Validate with Ajv and the separate library-equivalent reader, including the Hub byte, depth, node and item limits. A missing source, invalid part or part below 60% of the last good item count retains the previous validated bytes if present. An initial build with no last-good part fails closed. Compare before release. |
| Index | Writes the full commit, real dates, normal-form raw GitHub URLs, on-disk size and digest, and counts for both parts. Sequence is build time in seconds or one above a supplied previous sequence. Previous blocks and revocations carry forward. No signing or publication is performed. |

## Build and resume

Use Bun and a frozen install. A manual job can call the following stages from
a checkout of the review branch. The output and checkpoint directories are
independent of either signing or the publication branch.

```sh
mkdir -p .r1-cache
bun mcp/build-community-feed.ts --checkpoint=.r1-cache/manual.sqlite \
  --previous=/path/to/legacy-community-feed.json --out=.r1-cache/live-feed.json \
  --report=.r1-cache/live-rejections.json
bun generate-catalog.ts .r1-cache/live-sources.json
bun build.ts parts --sources=.r1-cache/live-sources.json --feed=.r1-cache/live-feed.json \
  --registry-checkpoint=.r1-cache/manual.sqlite --require-explanations \
  --rejections=.r1-cache/live-rejections.json --previous-snapshot=/path/to/snapshot.json \
  --previous-feed=/path/to/legacy-community-feed.json --comparison=reports/r1-comparison.md \
  --probe-tools=5000 --tool-checkpoint=.r1-cache/tools.sqlite --output=out
bun build.ts validate out
```

Resume the crawl with the same arguments and checkpoint after an interruption.
Use an existing `--previous-parts=<dir>` to enable independent part fallback.
Only the review branch's `out/connectors.json` and `out/skills.json` are
publication inputs. The comparison records explicit source evidence and
fails the build if any drop cannot be attributed. The release workflow commits those bytes first and calls
`bun build.ts index --commit <parts-commit> --dir <dir> [--previous <index.json>]`.

The comparison committed on the builder branch pairs a live trusted-source
capture with the recorded library community feed to exercise schema 1 before the
manual registry crawl completes. The manual-build branch will replace that
comparison with the live crawl result.
