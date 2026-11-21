# R1 catalogue comparison

Compared 5184 distinct legacy IDs with 5283 candidate listings. 415 added, 4885 changed or merged, 299 dropped.

- Preflight pairs a live Docker and marketplace capture with the recorded library community feed; the manual-build branch carries the full live registry run.

| Kind/transport | Snapshot and feed combined | Community feed | Candidate |
| --- | ---: | ---: | ---: |
| bundle | 315 | 0 | 312 |
| mcp/http | 4136 | 4089 | 3957 |
| mcp/npm | 529 | 525 | 489 |
| mcp/pypi | 129 | 126 | 124 |
| mcp/sse | 56 | 26 | 0 |
| skill | 19 | 0 | 401 |

## Listing differences

| Listing | Change | Rule |
| --- | --- | --- |
| docker:ais-fleet | dropped | SSE-only transport |
| docker:apify | dropped | header is not a declared secret reference |
| docker:asana | dropped | SSE-only transport |
| docker:astro-docs | changed | schema 1 display, origin and discovery |
| docker:atlassian-remote | changed | schema 1 display, origin and discovery |
| docker:audioscrape | changed | schema 1 display, origin and discovery |
| docker:brightdata | dropped | It needs a key, but the catalogue does not say where the key goes. Add it under Custom. |
| docker:carbon-voice | changed | schema 1 display, origin and discovery |
| docker:circleci | changed | schema 1 display, origin and discovery |
| docker:close | dropped | header is not a declared secret reference |
| docker:cloudflare-ai-gateway | dropped | SSE-only transport |
| docker:cloudflare-audit-logs | dropped | SSE-only transport |
| docker:cloudflare-autorag | dropped | SSE-only transport |
| docker:cloudflare-browser-rendering | dropped | SSE-only transport |
| docker:cloudflare-container | dropped | SSE-only transport |
| docker:cloudflare-digital-experience-monitoring | dropped | SSE-only transport |
| docker:cloudflare-dns-analytics | dropped | SSE-only transport |
| docker:cloudflare-docs | dropped | SSE-only transport |
| docker:cloudflare-graphql | dropped | SSE-only transport |
| docker:cloudflare-logpush | dropped | SSE-only transport |
| docker:cloudflare-observability | dropped | SSE-only transport |
| docker:cloudflare-one-casb | dropped | SSE-only transport |
| docker:cloudflare-radar | dropped | SSE-only transport |
| docker:cloudflare-workers-bindings | dropped | SSE-only transport |
| docker:cloudflare-workers-builds | dropped | SSE-only transport |
| docker:context7 | changed | schema 1 display, origin and discovery |
| docker:dappier-remote | dropped | header is not a declared secret reference |
| docker:deepwiki | changed | schema 1 display, origin and discovery; transport mcp/sse to mcp/http |
| docker:dialer | dropped | SSE-only transport |
| docker:docker-docs | changed | schema 1 display, origin and discovery |
| docker:dodo-payments | dropped | SSE-only transport |
| docker:excalidraw-remote | changed | schema 1 display, origin and discovery |
| docker:find-a-domain | changed | schema 1 display, origin and discovery |
| docker:firefly | changed | schema 1 display, origin and discovery |
| docker:gitmcp | changed | schema 1 display, origin and discovery |
| docker:globalping | dropped | SSE-only transport |
| docker:grafbase | changed | schema 1 display, origin and discovery |
| docker:granola-remote | changed | schema 1 display, origin and discovery |
| docker:hubspot | dropped | header is not a declared secret reference |
| docker:hugging-face | changed | schema 1 display, origin and discovery |
| docker:incident-io | changed | schema 1 display, origin and discovery |
| docker:instant | changed | schema 1 display, origin and discovery |
| docker:invideo | dropped | SSE-only transport |
| docker:javadocs | changed | schema 1 display, origin and discovery |
| docker:linear | changed | schema 1 display, origin and discovery |
| docker:llmtxt | dropped | SSE-only transport |
| docker:manifold | changed | schema 1 display, origin and discovery |
| docker:mercado-libre | dropped | header is not a declared secret reference |
| docker:mercado-pago | dropped | header is not a declared secret reference |
| docker:microsoft-learn | changed | schema 1 display, origin and discovery |
| docker:miro-remote | changed | schema 1 display, origin and discovery |
| docker:monday | dropped | SSE-only transport |
| docker:morningstar-mcp-server | changed | schema 1 display, origin and discovery |
| docker:needle | dropped | header is not a declared secret reference |
| docker:notion-remote | changed | schema 1 display, origin and discovery |
| docker:octagon | changed | schema 1 display, origin and discovery |
| docker:openmesh | dropped | Upstream removal: Openmesh is absent from Docker's live v3 registry (HTTP 200; capture SHA-256 cc65cdd277333649579317b2573d853e160f52bde150028b59356c9eb19c4641). Evidence: https://desktop.docker.com/mcp/catalog/v3/catalog.yaml |
| docker:openzeppelin-cairo | changed | schema 1 display, origin and discovery |
| docker:openzeppelin-solidity | changed | schema 1 display, origin and discovery |
| docker:openzeppelin-stellar | changed | schema 1 display, origin and discovery |
| docker:openzeppelin-stylus | changed | schema 1 display, origin and discovery |
| docker:paypal | dropped | SSE-only transport |
| docker:polar-signals | dropped | header is not a declared secret reference |
| docker:prisma-postgres | changed | schema 1 display, origin and discovery |
| docker:pulumi-remote | changed | schema 1 display, origin and discovery |
| docker:remote-mcp | changed | schema 1 display, origin and discovery |
| docker:rube | dropped | header is not a declared secret reference |
| docker:scorecard | dropped | SSE-only transport |
| docker:semgrep | changed | schema 1 display, origin and discovery |
| docker:sentry-remote | dropped | SSE-only transport |
| docker:short-io | dropped | header is not a declared secret reference |
| docker:stripe-remote | changed | schema 1 display, origin and discovery |
| docker:telnyx | dropped | header is not a declared secret reference |
| docker:wayfound | dropped | SSE-only transport |
| docker:waystation | changed | schema 1 display, origin and discovery |
| docker:webflow-remote | dropped | SSE-only transport |
| docker:wix | dropped | SSE-only transport |
| marketplace:anthropics/claude-plugins-official:plugin:42crunch-api-security-testing | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:agent-sdk-dev | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:agentforce-adlc | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:ai-plugins | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aikido | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:airtable | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-agentos | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-dev | dropped | Upstream withdrew the standalone Airwallex Dev bundle. The current Airwallex AgentOS bundle includes an airwallex-dev HTTP connector, rather than a separate marketplace listing. Evidence: https://raw.githubusercontent.com/anthropics/claude-plugins-official/1b9a8c736db2330ce1812bcc41878a6e2e288e24/.claude-plugin/marketplace.json |
| marketplace:anthropics/claude-plugins-official:plugin:aiven | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:alloydb | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:alloydb-omni | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:altimate-code | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:amazon-location-service | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:amd-skills | changed | schema 1 display, origin and discovery; source display metadata changed or was bounded; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:apollo | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:asana | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:atlan | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian-twg-cli | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:atomic-agents | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:auth0 | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aws-amplify | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aws-serverless | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor | changed | schema 1 display, origin and discovery; source display metadata changed or was bounded; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:aws-transform | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:azure | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:azure-cosmos-db-assistant | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:base44 | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:bigquery-data-analytics | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:boltz | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:box | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:browser-use | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:buildkite | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:canva | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:carbone-skill | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:carta-cap-table | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:carta-crm | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:carta-investors | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:catalyst-by-zoho | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:cds-mcp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:chrome-devtools-mcp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:chronograph-gp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:chronograph-lp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:circle-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:circleback | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:ckeditor | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:clangd-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:claude-code-setup | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:claude-md-management | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:claude-security | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:clay | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:clickhouse | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:clickhouse-best-practices | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:cloud-sql-mysql | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:cloud-sql-postgresql | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:cloud-sql-sqlserver | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:cloudflare | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:cloudinary | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:cockroachdb | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:code-modernization | changed | schema 1 display, origin and discovery; source display metadata changed or was bounded; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:code-review | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:code-simplifier | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:coderabbit | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:codspeed | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:commit-commands | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:confidence | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:context7 | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:convex | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:crowdsec | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:crowdstrike-falcon-foundry | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:crowdstrike-falcon-fusion | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:csharp-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:cwc-makers | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:dash0 | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:data | merged | duplicate connection or content; kept as marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents |
| marketplace:anthropics/claude-plugins-official:plugin:data-agent-kit-starter-pack | dropped | Explicit marketplace rename to data-agent-kit, now sourced from GoogleCloudPlatform/data-agent-kit-plugin. Evidence: https://raw.githubusercontent.com/anthropics/claude-plugins-official/1b9a8c736db2330ce1812bcc41878a6e2e288e24/.claude-plugin/marketplace.json |
| marketplace:anthropics/claude-plugins-official:plugin:data-engineering | merged | duplicate connection or content; kept as marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents |
| marketplace:anthropics/claude-plugins-official:plugin:databases-on-aws | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:databricks | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:datadog | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:datahub-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:dataproc | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:datarobot-agent-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:dataverse | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:deepeval | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:deploy-on-aws | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:desktop-commander | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:discord | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:dominodatalab | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:dropbox | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:duckdb-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:duende-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:exa | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:explanatory-output-style | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:expo | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:fakechat | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:fastly-agent-toolkit | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:feature-dev | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:fiftyone | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:figma | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:firebase | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:firecrawl | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:firestore-native | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:forge-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:frontend-design | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:fullstory | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:gc-ai | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:github | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:gitkraken | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:gitlab | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:google-cloud-storage | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:gopls-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:grafana-assistant | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:grafana-cloud-mcp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:grafana-mcp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:greptile | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:growthbook | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:honeycomb | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:hookify | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:hostinger | changed | schema 1 display, origin and discovery; source display metadata changed or was bounded; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:huggingface-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:hunter | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:hyperframes | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:idmp-plugin | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:imessage | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:incident-io | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:informatica-for-claude-platform | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:intercom | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:intuit-quickbooks | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:jdtls-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:jfrog | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:knowledge-catalog | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:kotlin-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:langfuse-observability | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:laravel-boost | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:leadfeeder | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:learn-with-coursera | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:learning-output-style | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:legalzoom | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:linear | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:liquid-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:liquid-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:logfire | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:logrocket | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:looker | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:lovable | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:lua-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:lumen | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:lusha | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mapbox | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:math-olympiad | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mattpocock-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mcp-apps | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mcp-server-dev | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mcp-tunnels | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mercadopago | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mergify | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:microsoft-docs | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:migration-to-aws | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mintlify | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:miro | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:modern-web-guidance | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mlflow | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:monday-crm | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mongodb | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:mongodb-atlas | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:neon | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:netlify-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:netsuite-ai-companion | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:netsuite-finance-analyst | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:netsuite-suitecloud | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:newrelic | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:nightvision | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:nimble | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:noibu | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:notion | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:nvidia-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:oracle-ai-data-platform-workbench-databricks-migrator | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:oracle-ai-data-platform-workbench-engineer-agent | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:oracle-ai-data-platform-workbench-spark-connectors | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:oracledb | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:outputai | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pagerduty | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:paypal | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pendo-analytics | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pendo-guides | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pendo-orchestrate | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:php-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pigment | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pinecone | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pixeltable | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:planetscale | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:playground | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:playwright | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:plugin-dev | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:posthog | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:postiz | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:postman | changed | schema 1 display, origin and discovery; source display metadata changed or was bounded; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pr-review-toolkit | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:preset-cli-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:prisma | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:project-artifact | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pydantic-ai | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:pyright-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:qdrant-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:qodo | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:qodo-standards | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:qt-development-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:quarkus-agent | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:railway | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:ralph-loop | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:rc | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:receipts | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:redis-development | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:remember | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:render | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:resend | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:revenuecat | merged | duplicate connection or content; kept as marketplace:anthropics/claude-plugins-official:plugin:rc |
| marketplace:anthropics/claude-plugins-official:plugin:rill | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:rootly | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:ruby-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:runway-api | changed | schema 1 display, origin and discovery; source display metadata changed or was bounded; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:rust-analyzer-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sagemaker-ai | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:salesforce-development | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sanity | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sap-cds-mcp | merged | duplicate connection or content; kept as marketplace:anthropics/claude-plugins-official:plugin:cds-mcp |
| marketplace:anthropics/claude-plugins-official:plugin:sap-fiori-mcp-server | dropped | Explicit marketplace rename to sap-ux-fiori-tools, now sourced from plugins-coding-agents/fiori in SAP/open-ux-tools. Evidence: https://raw.githubusercontent.com/anthropics/claude-plugins-official/1b9a8c736db2330ce1812bcc41878a6e2e288e24/.claude-plugin/marketplace.json |
| marketplace:anthropics/claude-plugins-official:plugin:sap-hana-cli | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sap-mdk-server | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:save-to-spotify | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:scandit-sdk | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:security-guidance | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:semgrep | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sentry | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sentry-cli | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:serena | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:servicenow-sdk | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:session-report | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:setup-agent-analytics | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:setup-mcp-agent-analytics | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:shippo | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:shopify-ai-toolkit | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:skill-creator | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:slack | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:snowflake-cortex-code | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sonarqube | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sonatype-guide | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sourcegraph | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:spanner | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:spotify-ads-api | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:stackhawk-hawkscan | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:stackhawk-api | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:streaming-skills-plugin | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:stripe | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:sumup | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:supabase | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:superdesign | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:superpowers | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:swift-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:synthflow | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:tavily | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:teamcity-cli | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:telegram | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:terraform | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:togetherai-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:twilio-developer-kit | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:typescript-lsp | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:ui-theme-designer | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:ui5 | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:ui5-modernization | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:ui5-typescript-conversion | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:unity | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:unreal-engine-skills-for-claude-code | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:valtown | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:vanta | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:vanta-mcp-plugin | merged | duplicate connection or content; kept as marketplace:anthropics/claude-plugins-official:plugin:vanta |
| marketplace:anthropics/claude-plugins-official:plugin:vercel | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:vibe-prospecting | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:vsql-extension-builder | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:windsor-ai | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:wix | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:build-with-wordpress | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:workos | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:youdotcom-agent-skills | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:zapier | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:zilliz | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:zocks-advisor | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:zoom-plugin | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:zoominfo | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:zscaler | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:langfuse | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:zyte-web-data | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:activecampaign | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:hubspot-sales | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:dynatrace | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/claude-plugins-official:plugin:wingspan | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/skills:plugin:document-skills | merged | duplicate connection or content; kept as marketplace:anthropics/skills:plugin:academy-guide |
| marketplace:anthropics/skills:skill:skills/xlsx | changed | schema 1 display, origin and discovery; source tree changed |
| marketplace:anthropics/skills:skill:skills/docx | changed | schema 1 display, origin and discovery; source tree changed |
| marketplace:anthropics/skills:skill:skills/pptx | changed | schema 1 display, origin and discovery; source tree changed |
| marketplace:anthropics/skills:skill:skills/pdf | changed | schema 1 display, origin and discovery; source tree changed |
| marketplace:anthropics/skills:plugin:example-skills | merged | duplicate connection or content; kept as marketplace:anthropics/skills:plugin:academy-guide |
| marketplace:anthropics/skills:skill:skills/algorithmic-art | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/brand-guidelines | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/canvas-design | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/doc-coauthoring | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/frontend-design | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/internal-comms | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/mcp-builder | changed | schema 1 display, origin and discovery; source tree changed |
| marketplace:anthropics/skills:skill:skills/skill-creator | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/slack-gif-creator | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/theme-factory | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/web-artifacts-builder | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:skill:skills/webapp-testing | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:plugin:claude-api | merged | duplicate connection or content; kept as marketplace:anthropics/skills:plugin:academy-guide |
| marketplace:anthropics/skills:skill:skills/claude-api | changed | schema 1 display, origin and discovery; source tree changed |
| marketplace:anthropics/skills:plugin:academy-guide | changed | schema 1 display, origin and discovery; bundle membership resolved at pinned source |
| marketplace:anthropics/skills:skill:skills/academy-guide | changed | schema 1 display, origin and discovery |
| marketplace:anthropics/skills:plugin:discernment-nudge | merged | duplicate connection or content; kept as marketplace:anthropics/skills:plugin:academy-guide |
| marketplace:anthropics/skills:skill:skills/discernment-nudge | changed | schema 1 display, origin and discovery |
| community-feed:ac.tandem/docs-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ad.inside/inside-ads | changed | schema 1 display, origin and discovery |
| community-feed:ag.hood/name-service | changed | schema 1 display, origin and discovery |
| community-feed:agency.goji/goji | changed | schema 1 display, origin and discovery |
| community-feed:agency.lona/trading | changed | schema 1 display, origin and discovery |
| community-feed:agency.ottobot/licensed-house-painters | changed | schema 1 display, origin and discovery |
| community-feed:ai.2kw/mcp-server#npm:%402kw%2Fai-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.aard/aard | changed | schema 1 display, origin and discovery |
| community-feed:ai.abmeter/abmeter | changed | schema 1 display, origin and discovery |
| community-feed:ai.actwise/ideation | changed | schema 1 display, origin and discovery |
| community-feed:ai.adadvisor/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:ai.adsap/adsap | changed | schema 1 display, origin and discovery |
| community-feed:ai.adside/adside | changed | schema 1 display, origin and discovery |
| community-feed:ai.advisorsai/service-navigator | changed | schema 1 display, origin and discovery |
| community-feed:ai.advisorsai/store-readiness | changed | schema 1 display, origin and discovery |
| community-feed:ai.adweave/meta-ads-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.afg/afg | changed | schema 1 display, origin and discovery |
| community-feed:ai.agentdm/agentdm | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.agentic-news/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.agenticterminal/directory | changed | schema 1 display, origin and discovery |
| community-feed:ai.agentmesh/mesh | changed | schema 1 display, origin and discovery |
| community-feed:ai.agentrapay/agentra | dropped | SSE-only transport |
| community-feed:ai.agentxray/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.ai-advisors/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.ai-akari/agent-trust-receipt | changed | schema 1 display, origin and discovery |
| community-feed:ai.ai-akari/one-minute-akari | changed | schema 1 display, origin and discovery |
| community-feed:ai.aient/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.airshelf/catalog | changed | schema 1 display, origin and discovery |
| community-feed:ai.aislabs/cve | changed | schema 1 display, origin and discovery |
| community-feed:ai.aislabs/gateway | changed | schema 1 display, origin and discovery |
| community-feed:ai.aislabs/recorder | changed | schema 1 display, origin and discovery |
| community-feed:ai.aitopia/aitopia | changed | schema 1 display, origin and discovery |
| community-feed:ai.aivonic/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.akkrudata/akkrudata | changed | schema 1 display, origin and discovery |
| community-feed:ai.alphacreek/alphacreek-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.ankimcp/anki-mcp-server#npm:%40ankimcp%2Fanki-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.anomalyarmor/armor-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.anyforge/anyforge#npm:%40anyforge%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.anzenna/anzenna | dropped | SSE-only transport |
| community-feed:ai.apatero/studio | changed | schema 1 display, origin and discovery |
| community-feed:ai.apiant/apiant | changed | schema 1 display, origin and discovery |
| community-feed:ai.appdeploy/deploy-app | changed | schema 1 display, origin and discovery |
| community-feed:ai.aqta/seal | changed | schema 1 display, origin and discovery |
| community-feed:ai.artidrop/artidrop | changed | schema 1 display, origin and discovery |
| community-feed:ai.askmiles/catalog | changed | schema 1 display, origin and discovery |
| community-feed:ai.asrm/asrm | changed | schema 1 display, origin and discovery |
| community-feed:ai.assetlog/assetlog | changed | schema 1 display, origin and discovery |
| community-feed:ai.atdev/supershopping | changed | schema 1 display, origin and discovery |
| community-feed:ai.athenahq/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.atlasverified/atlas-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.audo/audo | changed | schema 1 display, origin and discovery |
| community-feed:ai.augenix/build | changed | schema 1 display, origin and discovery |
| community-feed:ai.augworlds/travel-world | changed | schema 1 display, origin and discovery |
| community-feed:ai.autoposting/autoposting | changed | schema 1 display, origin and discovery |
| community-feed:ai.avasis/quant-research | changed | schema 1 display, origin and discovery |
| community-feed:ai.axonagentic/neuroautomata | changed | schema 1 display, origin and discovery |
| community-feed:ai.backengine/backengine-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.backrow/backrow | changed | schema 1 display, origin and discovery |
| community-feed:ai.bareun/bareun | changed | schema 1 display, origin and discovery |
| community-feed:ai.basethread/basethread | changed | schema 1 display, origin and discovery |
| community-feed:ai.beatbandit/beatbandit | changed | schema 1 display, origin and discovery |
| community-feed:ai.betterpost/server | changed | schema 1 display, origin and discovery |
| community-feed:ai.bezal/local-commerce | changed | schema 1 display, origin and discovery |
| community-feed:ai.bidclub/bidclub | changed | schema 1 display, origin and discovery |
| community-feed:ai.biddeed/biddeed-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.bizmoon/regulatory | changed | schema 1 display, origin and discovery |
| community-feed:ai.blast-radius/blast-radius | changed | schema 1 display, origin and discovery |
| community-feed:ai.blaze.app/blaze | changed | schema 1 display, origin and discovery |
| community-feed:ai.bloopo/bloopo | dropped | authentication is required but the source declares no secret header |
| community-feed:ai.borealhost/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.boundaryai/boundaryai | changed | schema 1 display, origin and discovery |
| community-feed:ai.bowmark/bowmark#npm:%40bowmark%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.bridgeapp/bridgeapp | changed | schema 1 display, origin and discovery |
| community-feed:ai.bringyour/bringyour | changed | schema 1 display, origin and discovery |
| community-feed:ai.byteask/embedded-docs | changed | schema 1 display, origin and discovery |
| community-feed:ai.byteray/byteray-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.cabrini/market-data | changed | schema 1 display, origin and discovery |
| community-feed:ai.calendarmcp/server | changed | schema 1 display, origin and discovery |
| community-feed:ai.calfeed/calfeed | changed | schema 1 display, origin and discovery |
| community-feed:ai.canaryusers/canaryusers | changed | schema 1 display, origin and discovery |
| community-feed:ai.canivibe/status | changed | schema 1 display, origin and discovery |
| community-feed:ai.canvora/canvora | changed | schema 1 display, origin and discovery |
| community-feed:ai.caulo/caulo | changed | schema 1 display, origin and discovery |
| community-feed:ai.ccapi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.cdbx/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:ai.cerebrium/docs | changed | schema 1 display, origin and discovery |
| community-feed:ai.chatthing/chat-thing | changed | schema 1 display, origin and discovery |
| community-feed:ai.chinamarketing/intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ai.chronary/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.circleback/circleback | changed | schema 1 display, origin and discovery |
| community-feed:ai.cirra/salesforce-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.clarid/hmda | changed | schema 1 display, origin and discovery |
| community-feed:ai.clawterminal/markets | changed | schema 1 display, origin and discovery |
| community-feed:ai.cleanvoice/cleanvoice | changed | schema 1 display, origin and discovery |
| community-feed:ai.cnaps/studio | changed | schema 1 display, origin and discovery |
| community-feed:ai.cnpj/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.cofoundagent/cofound | changed | schema 1 display, origin and discovery |
| community-feed:ai.compeller/compel | changed | schema 1 display, origin and discovery |
| community-feed:ai.connectmachine/connectmachine | changed | schema 1 display, origin and discovery |
| community-feed:ai.constellationfinance/constellation-finance-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.conveo/conveo | changed | schema 1 display, origin and discovery |
| community-feed:ai.cookiy/cookiy | changed | schema 1 display, origin and discovery |
| community-feed:ai.corduroy-labs/updates | changed | schema 1 display, origin and discovery |
| community-feed:ai.craneledger/crane-ledger | changed | schema 1 display, origin and discovery |
| community-feed:ai.creatify/ad-agent | changed | schema 1 display, origin and discovery |
| community-feed:ai.creationloop/creationloop | changed | schema 1 display, origin and discovery |
| community-feed:ai.creativescope/creative-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ai.d50/d50-platform | changed | schema 1 display, origin and discovery |
| community-feed:ai.dataecho/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.dataforb2b/dataforb2b | changed | schema 1 display, origin and discovery |
| community-feed:ai.datamerge/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.dealfilter/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.decisionlog/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.deinai/creator-skill | changed | schema 1 display, origin and discovery |
| community-feed:ai.deinai/creator-skill-v2 | changed | schema 1 display, origin and discovery |
| community-feed:ai.delega/aws-pricing-calculator | changed | schema 1 display, origin and discovery |
| community-feed:ai.denser/denser | changed | schema 1 display, origin and discovery |
| community-feed:ai.diagramzu/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.djzs/trust-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.donethat/donethat | changed | schema 1 display, origin and discovery |
| community-feed:ai.dreamlit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.duvera/gateway | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.eachlabs/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.easy-peasy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.echoloc/company-technographics | changed | schema 1 display, origin and discovery |
| community-feed:ai.edgechat/edgepedia | changed | schema 1 display, origin and discovery |
| community-feed:ai.eevy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.ekwo/mcp#npm:%40ekwo-ai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.enginy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.entityenricher/enricher | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.evolink/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.exa/exa | changed | schema 1 display, origin and discovery |
| community-feed:ai.example4/xmp4 | changed | schema 1 display, origin and discovery |
| community-feed:ai.explorium/mcp-explorium | dropped | authentication is required but the source declares no secret header |
| community-feed:ai.extend/extend | changed | schema 1 display, origin and discovery |
| community-feed:ai.ezel/ezel | changed | schema 1 display, origin and discovery |
| community-feed:ai.factori/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.fantopy/fantopy | changed | schema 1 display, origin and discovery |
| community-feed:ai.fathom.api/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.filegraph/document-processing | dropped | SSE-only transport |
| community-feed:ai.filtrix.mcp/filtrix-ai | changed | schema 1 display, origin and discovery |
| community-feed:ai.fincontext/fincontext | changed | schema 1 display, origin and discovery |
| community-feed:ai.findip/patent-search | changed | schema 1 display, origin and discovery |
| community-feed:ai.finstat/finstat | changed | schema 1 display, origin and discovery |
| community-feed:ai.fintent/signals | changed | schema 1 display, origin and discovery |
| community-feed:ai.fireflies/fireflies | merged | duplicate connection or content; kept as docker:firefly |
| community-feed:ai.fiuto/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.flora/flora | changed | schema 1 display, origin and discovery |
| community-feed:ai.flowcastle/flowcastle | changed | schema 1 display, origin and discovery |
| community-feed:ai.flowmingo/flowmingo | changed | schema 1 display, origin and discovery |
| community-feed:ai.flowstep/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.fluxink/fci-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.flydocs/flydocs#npm:%40flydocs%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.fonzi/company | changed | schema 1 display, origin and discovery |
| community-feed:ai.fonzi/talent | changed | schema 1 display, origin and discovery |
| community-feed:ai.freudly/tests | changed | schema 1 display, origin and discovery |
| community-feed:ai.gavelin/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:ai.gemus/gemus | changed | schema 1 display, origin and discovery |
| community-feed:ai.genomicintelligence/genomic-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ai.geodesiclabs/governance-platform | changed | schema 1 display, origin and discovery |
| community-feed:ai.gethal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.getimg/getimg | changed | schema 1 display, origin and discovery |
| community-feed:ai.getmarrow/marrow#npm:%40getmarrow%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.getminds/minds | changed | schema 1 display, origin and discovery |
| community-feed:ai.getperspective/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.getthroughline/throughline | changed | schema 1 display, origin and discovery |
| community-feed:ai.glassflow/tares#pypi:tares | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.gomarble/mcp-api | dropped | SSE-only transport |
| community-feed:ai.good-sport/good-sport | changed | schema 1 display, origin and discovery |
| community-feed:ai.groundroute/web-search | dropped | authentication is required but the source declares no secret header |
| community-feed:ai.gtfi/groundtruth | changed | schema 1 display, origin and discovery |
| community-feed:ai.helixar/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.hirey/hi | changed | schema 1 display, origin and discovery |
| community-feed:ai.hivewiki/hivewiki | changed | schema 1 display, origin and discovery |
| community-feed:ai.hypernatural/hypernatural | changed | schema 1 display, origin and discovery |
| community-feed:ai.i18nagent/i18n-agent | changed | schema 1 display, origin and discovery |
| community-feed:ai.imboard/dossier#npm:%40ai-dossier%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.inblog/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.inflowpay.app/inflow | changed | schema 1 display, origin and discovery |
| community-feed:ai.intodns/scanner#npm:intodns-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.intuitek.the-stall/the-stall | changed | schema 1 display, origin and discovery |
| community-feed:ai.inventoryhero/inventory-hero | changed | schema 1 display, origin and discovery |
| community-feed:ai.ironshard/agent-storage-sandbox | changed | schema 1 display, origin and discovery |
| community-feed:ai.iturri/market-data | changed | schema 1 display, origin and discovery |
| community-feed:ai.jeda/jeda-ai | changed | schema 1 display, origin and discovery |
| community-feed:ai.jerry/insurance | changed | schema 1 display, origin and discovery |
| community-feed:ai.jurisprudencias/case-law | changed | schema 1 display, origin and discovery |
| community-feed:ai.keenable/web-search | changed | schema 1 display, origin and discovery |
| community-feed:ai.kernora/agent-sec | changed | schema 1 display, origin and discovery |
| community-feed:ai.kifly/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.kive/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.klaaro/klaaro | changed | schema 1 display, origin and discovery |
| community-feed:ai.klodkot/gen | changed | schema 1 display, origin and discovery |
| community-feed:ai.kolens/kolens-mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:ai.korey/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.krater/krater | changed | schema 1 display, origin and discovery |
| community-feed:ai.krtr/krtr | changed | schema 1 display, origin and discovery |
| community-feed:ai.kumbuka/kumbuka-server | changed | schema 1 display, origin and discovery |
| community-feed:ai.ladderflow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.law.mcp/lawyer-search | changed | schema 1 display, origin and discovery |
| community-feed:ai.lenshub/lenshub | changed | schema 1 display, origin and discovery |
| community-feed:ai.libers/libers-suite | changed | schema 1 display, origin and discovery |
| community-feed:ai.licensy/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:ai.livingmeta/ai-in-research | changed | schema 1 display, origin and discovery |
| community-feed:ai.llamanotes/llamanotes | changed | schema 1 display, origin and discovery |
| community-feed:ai.llmhosting/pricing | changed | schema 1 display, origin and discovery |
| community-feed:ai.llmintel/model-lifecycle | changed | schema 1 display, origin and discovery |
| community-feed:ai.llmse/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.lucasandersen/mlp-tax | changed | schema 1 display, origin and discovery |
| community-feed:ai.ludo/game-assets | changed | schema 1 display, origin and discovery |
| community-feed:ai.lumify/sports-intelligence | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.luw/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.magicinsights/insights | changed | schema 1 display, origin and discovery |
| community-feed:ai.mailjunky/mcp | dropped | SSE-only transport |
| community-feed:ai.marketcode/marketcode | changed | schema 1 display, origin and discovery |
| community-feed:ai.marketintell/marketintell | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.masnavi/masnavi | changed | schema 1 display, origin and discovery |
| community-feed:ai.matih/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.maxcv/resume | changed | schema 1 display, origin and discovery |
| community-feed:ai.maximem/synap | changed | schema 1 display, origin and discovery |
| community-feed:ai.meacheal/mrc-data | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.meetlark/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:ai.memoket/memoket | changed | schema 1 display, origin and discovery |
| community-feed:ai.midplane/midplane#npm:midplane | dropped | Its command needs values you choose. |
| community-feed:ai.mitosislabs/mitosis | changed | schema 1 display, origin and discovery |
| community-feed:ai.moonlings/moonlings | changed | schema 1 display, origin and discovery |
| community-feed:ai.moxt/mcp-workspace | changed | schema 1 display, origin and discovery |
| community-feed:ai.mymarky/marky | changed | schema 1 display, origin and discovery |
| community-feed:ai.myporta/myporta | changed | schema 1 display, origin and discovery |
| community-feed:ai.myriade/myriade | changed | schema 1 display, origin and discovery |
| community-feed:ai.namewhisper/ens-tools | changed | schema 1 display, origin and discovery |
| community-feed:ai.nativeads/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.nefesh/human-state | changed | schema 1 display, origin and discovery |
| community-feed:ai.newzai.api/NewzAI | changed | schema 1 display, origin and discovery |
| community-feed:ai.ninar/ninar | changed | schema 1 display, origin and discovery |
| community-feed:ai.ninjachat/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.nobi/shop-nobi | changed | schema 1 display, origin and discovery |
| community-feed:ai.nordax/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.normhyra/normhyra | changed | schema 1 display, origin and discovery |
| community-feed:ai.nothumansearch/search | changed | schema 1 display, origin and discovery |
| community-feed:ai.nudg3/brand-intelligence | dropped | authentication is required but the source declares no secret header |
| community-feed:ai.nullary/nullary | changed | schema 1 display, origin and discovery |
| community-feed:ai.obris/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.oddessentials/agent-guild#npm:%40oddessentials%2Fagent-guild | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.odei/connect | changed | schema 1 display, origin and discovery |
| community-feed:ai.ohmyfin/banking-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ai.onelore/lore | changed | schema 1 display, origin and discovery |
| community-feed:ai.onzero/creative-studio | changed | schema 1 display, origin and discovery |
| community-feed:ai.oobeprotocol.sap.mcp/sap-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.openaso/openaso | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.opinly/opinly | changed | schema 1 display, origin and discovery |
| community-feed:ai.orq/orq | changed | schema 1 display, origin and discovery |
| community-feed:ai.outlit/outlit | changed | schema 1 display, origin and discovery |
| community-feed:ai.outset/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.palmyr/palmyr | changed | schema 1 display, origin and discovery |
| community-feed:ai.parallel/task-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.pathbound/pathbound | changed | schema 1 display, origin and discovery |
| community-feed:ai.perplexity/mcp-server#npm:%40perplexity-ai%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.phano/intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ai.pidgeon/mcp#npm:%40pidgeon-ai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.pipe2/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.pixeldojo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.pocketdrives/pocket-drives | changed | schema 1 display, origin and discovery |
| community-feed:ai.powerline/inbox-preview | changed | schema 1 display, origin and discovery |
| community-feed:ai.precip/weather | changed | schema 1 display, origin and discovery |
| community-feed:ai.preclick/preclick-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.presentations/presentations-ai | changed | schema 1 display, origin and discovery |
| community-feed:ai.primateintelligence/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.primeta/primeta | changed | schema 1 display, origin and discovery |
| community-feed:ai.promptsharp/promptsharp | changed | schema 1 display, origin and discovery |
| community-feed:ai.publishwith/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.pulsegate/provenance | changed | schema 1 display, origin and discovery |
| community-feed:ai.qr-manager/qr-manager | changed | schema 1 display, origin and discovery |
| community-feed:ai.quantifyme/quantifyme | changed | schema 1 display, origin and discovery |
| community-feed:ai.raisonn/connect | changed | schema 1 display, origin and discovery |
| community-feed:ai.redditgrow/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.reka/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.relaystation/relaystation | changed | schema 1 display, origin and discovery |
| community-feed:ai.retrodiffusion/pixel-art | changed | schema 1 display, origin and discovery |
| community-feed:ai.revenuebase/revenuebase | changed | schema 1 display, origin and discovery |
| community-feed:ai.revid/revid | changed | schema 1 display, origin and discovery |
| community-feed:ai.revuo/revuo | changed | schema 1 display, origin and discovery |
| community-feed:ai.rfix/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.rfp/rfp-ai | changed | schema 1 display, origin and discovery |
| community-feed:ai.richgo.m/richgo | changed | schema 1 display, origin and discovery |
| community-feed:ai.rightcard/mcp#npm:rightcard-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.robomart/robomart | changed | schema 1 display, origin and discovery |
| community-feed:ai.rocketlist/rocketlist | changed | schema 1 display, origin and discovery |
| community-feed:ai.rocketsloth/rocketsloth | changed | schema 1 display, origin and discovery |
| community-feed:ai.rockmoon/financial-data | changed | schema 1 display, origin and discovery |
| community-feed:ai.roic/roic | changed | schema 1 display, origin and discovery |
| community-feed:ai.roopslaw/legalsearch | changed | schema 1 display, origin and discovery |
| community-feed:ai.rootdata/public-directory | changed | schema 1 display, origin and discovery |
| community-feed:ai.roryplans/roryplans | changed | schema 1 display, origin and discovery |
| community-feed:ai.rxmanager/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.saascloud/cryptopulse | changed | schema 1 display, origin and discovery |
| community-feed:ai.salescloser/salescloser | changed | schema 1 display, origin and discovery |
| community-feed:ai.salespeak/company-context | changed | schema 1 display, origin and discovery |
| community-feed:ai.saltybytes/recipes | changed | schema 1 display, origin and discovery |
| community-feed:ai.satoshidata/wallet-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ai.scite/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.securenow/securenow#npm:securenow | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.seltz/seltz-ai-seltz-mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.sendfast/sendfast | changed | schema 1 display, origin and discovery |
| community-feed:ai.sendinel/mcp-server#npm:%40sendinel%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.sentedge/idea-machine | changed | schema 1 display, origin and discovery |
| community-feed:ai.sentisense/market-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ai.seocrawl/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.sessionkeeper/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.sharebench/registry | changed | schema 1 display, origin and discovery |
| community-feed:ai.shiplight/shiplight#npm:%40shiplightai%2Fmcp | dropped | package environment is not a declared secret reference |
| community-feed:ai.sig.foodlog/food-logger | dropped | authentication is required but the source declares no secret header |
| community-feed:ai.simsense/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.sitepulsar/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.sixta/sixta-connect | changed | schema 1 display, origin and discovery |
| community-feed:ai.skilder/skilder | changed | schema 1 display, origin and discovery |
| community-feed:ai.skilltotal/skilltotal#pypi:skilltotal | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.skylit/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.slabline/slabline | changed | schema 1 display, origin and discovery |
| community-feed:ai.sleepwalker/sleepwalker | changed | schema 1 display, origin and discovery |
| community-feed:ai.slideless/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.snipget/snipget | changed | schema 1 display, origin and discovery |
| community-feed:ai.socialsight/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.solenium/netsuite-link | changed | schema 1 display, origin and discovery |
| community-feed:ai.sourcemill/au-hot-water-payback | changed | schema 1 display, origin and discovery |
| community-feed:ai.sourcemill/au-towing-legality | changed | schema 1 display, origin and discovery |
| community-feed:ai.spala/public-mcp | dropped | header is not a declared secret reference |
| community-feed:ai.specproof/specproof-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.speko/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.spicygen/spicygen | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.spritecook/generate | changed | schema 1 display, origin and discovery |
| community-feed:ai.starreel/starreel#npm:%40starreel%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.startuphub/startuphub | changed | schema 1 display, origin and discovery |
| community-feed:ai.statey/statey | changed | schema 1 display, origin and discovery |
| community-feed:ai.statshawk/statshawk | changed | schema 1 display, origin and discovery |
| community-feed:ai.stompy/stompy | changed | schema 1 display, origin and discovery |
| community-feed:ai.strix/strix | changed | schema 1 display, origin and discovery |
| community-feed:ai.stumpy/agents | changed | schema 1 display, origin and discovery |
| community-feed:ai.subscribr/subscribr | changed | schema 1 display, origin and discovery |
| community-feed:ai.supercut/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.superfact/superfact | changed | schema 1 display, origin and discovery |
| community-feed:ai.svtr/aidb | changed | schema 1 display, origin and discovery |
| community-feed:ai.switchapp/switch | changed | schema 1 display, origin and discovery |
| community-feed:ai.synlake/synlake | changed | schema 1 display, origin and discovery |
| community-feed:ai.syntheticbrew/syntheticbrew | changed | schema 1 display, origin and discovery |
| community-feed:ai.syntitan/syntitan-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.tachyo/tachyo | changed | schema 1 display, origin and discovery |
| community-feed:ai.takara/miru#npm:%40takara-ai%2Fmiru-code | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.taskive/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.teable/teable | changed | schema 1 display, origin and discovery |
| community-feed:ai.tekboss/assessment | changed | schema 1 display, origin and discovery |
| community-feed:ai.tenderhunt/agent | changed | schema 1 display, origin and discovery |
| community-feed:ai.thinkneo/control-plane | changed | schema 1 display, origin and discovery |
| community-feed:ai.thinkpattern/news | changed | schema 1 display, origin and discovery |
| community-feed:ai.thiri/chord-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ai.thoughtbox.api/thoughts | changed | schema 1 display, origin and discovery |
| community-feed:ai.tickettailor/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.timeml/time-machine | changed | schema 1 display, origin and discovery |
| community-feed:ai.timix/time-tracking | changed | schema 1 display, origin and discovery |
| community-feed:ai.timothe/growth-calendar | changed | schema 1 display, origin and discovery |
| community-feed:ai.tinyfish.agent/web-agent | changed | schema 1 display, origin and discovery |
| community-feed:ai.toffu/toffu | changed | schema 1 display, origin and discovery |
| community-feed:ai.tokenarcade/tokenarcade | changed | schema 1 display, origin and discovery |
| community-feed:ai.trackradar/trackradar | changed | schema 1 display, origin and discovery |
| community-feed:ai.travelminds/concierge | changed | schema 1 display, origin and discovery |
| community-feed:ai.trellus/trellus | changed | schema 1 display, origin and discovery |
| community-feed:ai.trustysquire/trusty-squire#npm:%40trusty-squire%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ai.trycanonical/company-search | changed | schema 1 display, origin and discovery |
| community-feed:ai.trydock/dock | changed | schema 1 display, origin and discovery |
| community-feed:ai.tunnelmind/data | changed | schema 1 display, origin and discovery |
| community-feed:ai.tunnelmind/scry | changed | schema 1 display, origin and discovery |
| community-feed:ai.tuteliq/mcp#npm:%40tuteliq%2Fmcp | dropped | streamable HTTPS remote preferred |
| community-feed:ai.tuteliq/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.unulu/unulu | changed | schema 1 display, origin and discovery |
| community-feed:ai.upriver/upriver | changed | schema 1 display, origin and discovery |
| community-feed:ai.urlcheck/urlcheck-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.usealloy/alloy | changed | schema 1 display, origin and discovery |
| community-feed:ai.uselamina/lamina | changed | schema 1 display, origin and discovery |
| community-feed:ai.uwear/uwear | changed | schema 1 display, origin and discovery |
| community-feed:ai.uxbert/cms | changed | schema 1 display, origin and discovery |
| community-feed:ai.v-safe/vsafe-risk | changed | schema 1 display, origin and discovery |
| community-feed:ai.veecle/chiplab | changed | schema 1 display, origin and discovery |
| community-feed:ai.vergio/vergio | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.verificate/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.verifox/email-verifier | changed | schema 1 display, origin and discovery |
| community-feed:ai.vibe-bi/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:ai.videozero.engine/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.villiers/charter | changed | schema 1 display, origin and discovery |
| community-feed:ai.viralspin/viralspin | changed | schema 1 display, origin and discovery |
| community-feed:ai.visuary/actuarial-value-calculator | changed | schema 1 display, origin and discovery |
| community-feed:ai.vocci/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.vortexiq/vortex-iq | changed | schema 1 display, origin and discovery |
| community-feed:ai.voxplo/voxplo | changed | schema 1 display, origin and discovery |
| community-feed:ai.wavespeed/mcp#npm:%40wavespeed%2Fmcp | dropped | streamable HTTPS remote preferred |
| community-feed:ai.wavespeed/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.webanatomy/webanatomy | changed | schema 1 display, origin and discovery |
| community-feed:ai.webhound/webhound | changed | schema 1 display, origin and discovery |
| community-feed:ai.webmatik/audit | changed | schema 1 display, origin and discovery |
| community-feed:ai.websitepublisher/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.wiro/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.withone/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.wiv/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.workingmemory/memory | changed | schema 1 display, origin and discovery |
| community-feed:ai.writingmate/writingmate-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.wubble/audio | changed | schema 1 display, origin and discovery |
| community-feed:ai.xpoz/social-insights | changed | schema 1 display, origin and discovery |
| community-feed:ai.yempik/company-brain | changed | schema 1 display, origin and discovery |
| community-feed:ai.youtube-transcript/youtube-transcript | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:ai.zairalabs/guide | changed | schema 1 display, origin and discovery |
| community-feed:ai.zencap/zencap | changed | schema 1 display, origin and discovery |
| community-feed:ai.zine/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ai.zipquote/us-property-hazard-risk | changed | schema 1 display, origin and discovery |
| community-feed:am.mana/mana-public | changed | schema 1 display, origin and discovery |
| community-feed:app.2ools/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.acornonaut/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.agencyai/agency-ai | changed | schema 1 display, origin and discovery |
| community-feed:app.alterphone/phone-calls | changed | schema 1 display, origin and discovery |
| community-feed:app.apick/all#npm:apick-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:app.apiguru/amazon-data#npm:apiguru-mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:app.applybolt/applybolt | changed | schema 1 display, origin and discovery |
| community-feed:app.arbitron/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.askqa/structforge | changed | schema 1 display, origin and discovery |
| community-feed:app.avatalks/avatalks | changed | schema 1 display, origin and discovery |
| community-feed:app.aveiro/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.bestappify/shopify-app-store | changed | schema 1 display, origin and discovery |
| community-feed:app.blip-board/blipboard | changed | schema 1 display, origin and discovery |
| community-feed:app.bonsave/bonsave | changed | schema 1 display, origin and discovery |
| community-feed:app.branddock/branddock | changed | schema 1 display, origin and discovery |
| community-feed:app.busyboard/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.cannonstudio/cannon-studio | changed | schema 1 display, origin and discovery |
| community-feed:app.capgo/capgo | changed | schema 1 display, origin and discovery |
| community-feed:app.cellarion/cellarion | changed | schema 1 display, origin and discovery |
| community-feed:app.cellarion/wine-registry | changed | schema 1 display, origin and discovery |
| community-feed:app.certman/server | changed | schema 1 display, origin and discovery |
| community-feed:app.cleanor/cleanor | changed | schema 1 display, origin and discovery |
| community-feed:app.clearpolicy/clearpolicy | changed | schema 1 display, origin and discovery |
| community-feed:app.cnvs/whiteboard | changed | schema 1 display, origin and discovery |
| community-feed:app.contendeo/contendeo | changed | schema 1 display, origin and discovery |
| community-feed:app.cooperpetcare.www/cooper | changed | schema 1 display, origin and discovery |
| community-feed:app.crawlie/crawlie | changed | schema 1 display, origin and discovery |
| community-feed:app.creatordb/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.dealermax/public-search | changed | schema 1 display, origin and discovery |
| community-feed:app.decibelshield/decibel-shield | changed | schema 1 display, origin and discovery |
| community-feed:app.deepsearch/deepsearch | changed | schema 1 display, origin and discovery |
| community-feed:app.desktopcommander/remote-desktop-commander | changed | schema 1 display, origin and discovery |
| community-feed:app.dreamhall/dreamhall | changed | schema 1 display, origin and discovery |
| community-feed:app.easykanb/easykanban | changed | schema 1 display, origin and discovery |
| community-feed:app.edgelock/journal | changed | schema 1 display, origin and discovery |
| community-feed:app.elasticflow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.epubtranslator/epub-translator | changed | schema 1 display, origin and discovery |
| community-feed:app.era/context | changed | schema 1 display, origin and discovery |
| community-feed:app.eurocomply/compliance | changed | schema 1 display, origin and discovery |
| community-feed:app.eurolytics/eurolytics | changed | schema 1 display, origin and discovery |
| community-feed:app.fakto/fakturownia | dropped | authentication is required but the source declares no secret header |
| community-feed:app.fakto/wfirma | dropped | authentication is required but the source declares no secret header |
| community-feed:app.favorize/assistant | changed | schema 1 display, origin and discovery |
| community-feed:app.fftcompanion/fft-companion | changed | schema 1 display, origin and discovery |
| community-feed:app.finfam/calculators | changed | schema 1 display, origin and discovery |
| community-feed:app.flamap/flamap | changed | schema 1 display, origin and discovery |
| community-feed:app.floot.via-router/via-gateway | changed | schema 1 display, origin and discovery |
| community-feed:app.fluentive/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.fotify/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.fotohub/fotohub | changed | schema 1 display, origin and discovery |
| community-feed:app.framezone/framezone | changed | schema 1 display, origin and discovery |
| community-feed:app.frankki/letters | changed | schema 1 display, origin and discovery |
| community-feed:app.fryd/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:app.ganty/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:app.geometry/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.getandiamo/andiamo | changed | schema 1 display, origin and discovery |
| community-feed:app.getdialer/dialer | dropped | authentication is required but the source declares no secret header |
| community-feed:app.getquieta/quieta-mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.getsalta/salta | changed | schema 1 display, origin and discovery |
| community-feed:app.glif/glif | changed | schema 1 display, origin and discovery |
| community-feed:app.goodwatch/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.govauctions/govauctions | changed | schema 1 display, origin and discovery |
| community-feed:app.hadl/portfolio | dropped | authentication is required but the source declares no secret header |
| community-feed:app.havnre/havn | changed | schema 1 display, origin and discovery |
| community-feed:app.health-os/health-os | changed | schema 1 display, origin and discovery |
| community-feed:app.higgsfield.mizan-bazar/mizan | changed | schema 1 display, origin and discovery |
| community-feed:app.himalayas/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.hinducalendar/hinducalendar | changed | schema 1 display, origin and discovery |
| community-feed:app.hoaster/hoaster | changed | schema 1 display, origin and discovery |
| community-feed:app.hoodex/hoodex | changed | schema 1 display, origin and discovery |
| community-feed:app.humantaste/taste-mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.immoapi/immoapi | changed | schema 1 display, origin and discovery |
| community-feed:app.indicia/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.interbang/interbang | changed | schema 1 display, origin and discovery |
| community-feed:app.ip/ipinfo | changed | schema 1 display, origin and discovery |
| community-feed:app.joinways/joinways | changed | schema 1 display, origin and discovery |
| community-feed:app.justemails/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:app.kanbai/discovery | changed | schema 1 display, origin and discovery |
| community-feed:app.katla/katla | changed | schema 1 display, origin and discovery |
| community-feed:app.kezai/memory | changed | schema 1 display, origin and discovery |
| community-feed:app.knowtis/knowtis | changed | schema 1 display, origin and discovery |
| community-feed:app.lance/app-manager | changed | schema 1 display, origin and discovery |
| community-feed:app.learnwithagents/learn-with-agents | changed | schema 1 display, origin and discovery |
| community-feed:app.letterly/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.linear/linear | merged | duplicate connection or content; kept as docker:linear |
| community-feed:app.listentosadhu/corpus | changed | schema 1 display, origin and discovery |
| community-feed:app.livtakt/livtakt | changed | schema 1 display, origin and discovery |
| community-feed:app.locize.mcp/server | changed | schema 1 display, origin and discovery |
| community-feed:app.lovable.answer-engine-ready/llmready | changed | schema 1 display, origin and discovery |
| community-feed:app.lovable.jessica-hill-holm/leadership-coach | changed | schema 1 display, origin and discovery |
| community-feed:app.lovable.local-schema-beacon/localschema | changed | schema 1 display, origin and discovery |
| community-feed:app.lovable.peppol-invoice-compass/invoiceverify | changed | schema 1 display, origin and discovery |
| community-feed:app.lovable.privacy-pill-consent-studio/privacypill | changed | schema 1 display, origin and discovery |
| community-feed:app.lovable.release-ripple-roadmap/logpulse | changed | schema 1 display, origin and discovery |
| community-feed:app.made/made-mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.mailcoach/mailcoach | changed | schema 1 display, origin and discovery |
| community-feed:app.mailstream/mailstream | changed | schema 1 display, origin and discovery |
| community-feed:app.mashop/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.meistron/meistron | changed | schema 1 display, origin and discovery |
| community-feed:app.melodygenie/melody-genie | changed | schema 1 display, origin and discovery |
| community-feed:app.memol/memol | changed | schema 1 display, origin and discovery |
| community-feed:app.mhai/knihajizd | changed | schema 1 display, origin and discovery |
| community-feed:app.miromiro/miromiro | changed | schema 1 display, origin and discovery |
| community-feed:app.mochify/mochify | dropped | authentication is required but the source declares no secret header |
| community-feed:app.myghosts/myghosts | changed | schema 1 display, origin and discovery |
| community-feed:app.nanocorp.agentarena/agent-coliseum-mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.nausika/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.nd-x/ndex-pricing | changed | schema 1 display, origin and discovery |
| community-feed:app.neurorank/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:app.noemic/noemic | changed | schema 1 display, origin and discovery |
| community-feed:app.notefit/notefit | changed | schema 1 display, origin and discovery |
| community-feed:app.octotrip/flights | changed | schema 1 display, origin and discovery |
| community-feed:app.octotrip/rental-cars | changed | schema 1 display, origin and discovery |
| community-feed:app.ohdear/ohdear | changed | schema 1 display, origin and discovery |
| community-feed:app.once/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.onehaus/haus | changed | schema 1 display, origin and discovery |
| community-feed:app.onlinefitness/coach | changed | schema 1 display, origin and discovery |
| community-feed:app.openclip/openclip | changed | schema 1 display, origin and discovery |
| community-feed:app.opendealer/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.paichart/mcp-hub | changed | schema 1 display, origin and discovery |
| community-feed:app.pandough/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.parrotnotes/parrotnotes | changed | schema 1 display, origin and discovery |
| community-feed:app.partli/partli | changed | schema 1 display, origin and discovery |
| community-feed:app.pascal/editor#npm:%40pascal-app%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:app.penlog/penlog | changed | schema 1 display, origin and discovery |
| community-feed:app.performix/performix-site | changed | schema 1 display, origin and discovery |
| community-feed:app.permtracker/perm-tracker | changed | schema 1 display, origin and discovery |
| community-feed:app.pinsuite/pinsuite | changed | schema 1 display, origin and discovery |
| community-feed:app.pivotbank/pivotbank | changed | schema 1 display, origin and discovery |
| community-feed:app.pixly/pixly | changed | schema 1 display, origin and discovery |
| community-feed:app.podstow/podstow | changed | schema 1 display, origin and discovery |
| community-feed:app.postel/postel | changed | schema 1 display, origin and discovery |
| community-feed:app.postpone/api | changed | schema 1 display, origin and discovery |
| community-feed:app.priorify/priorify | changed | schema 1 display, origin and discovery |
| community-feed:app.promptfax/promptfax | changed | schema 1 display, origin and discovery |
| community-feed:app.pumpx/pumpx | dropped | authentication is required but the source declares no secret header |
| community-feed:app.qwady/borough | changed | schema 1 display, origin and discovery |
| community-feed:app.racecalendar/f1 | changed | schema 1 display, origin and discovery |
| community-feed:app.raster/raster | changed | schema 1 display, origin and discovery |
| community-feed:app.readwithleaf/leaf | changed | schema 1 display, origin and discovery |
| community-feed:app.recao/recao-mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.remoote/remote-jobs | changed | schema 1 display, origin and discovery |
| community-feed:app.replit.paid-mcp-opportunity-lab--taylorboucher1/base-token-tools | changed | schema 1 display, origin and discovery |
| community-feed:app.robohub/robohub | changed | schema 1 display, origin and discovery |
| community-feed:app.roughsketch/roughsketch | changed | schema 1 display, origin and discovery |
| community-feed:app.rumors/lines | changed | schema 1 display, origin and discovery |
| community-feed:app.run.us-central1.agent-market-826727841930/agent-market | changed | schema 1 display, origin and discovery |
| community-feed:app.saber.mcp/saber | changed | schema 1 display, origin and discovery |
| community-feed:app.safeship/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.savedthat/savedthat | changed | schema 1 display, origin and discovery |
| community-feed:app.schedulin/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.seatcanvas/seatcanvas | changed | schema 1 display, origin and discovery |
| community-feed:app.selis.mcp/pmo | changed | schema 1 display, origin and discovery |
| community-feed:app.sellerassistant/seller-assistant | changed | schema 1 display, origin and discovery |
| community-feed:app.sendhey/sendhey | changed | schema 1 display, origin and discovery |
| community-feed:app.sentinelx/sentinelx | changed | schema 1 display, origin and discovery |
| community-feed:app.sharemypage/sharemypage | changed | schema 1 display, origin and discovery |
| community-feed:app.signsimple/signsimple | changed | schema 1 display, origin and discovery |
| community-feed:app.sorsa/sorsa | changed | schema 1 display, origin and discovery |
| community-feed:app.sparkscribe/sparks-scribe | changed | schema 1 display, origin and discovery |
| community-feed:app.spoonjoy/spoonjoy | changed | schema 1 display, origin and discovery |
| community-feed:app.sprkly/sprkly | changed | schema 1 display, origin and discovery |
| community-feed:app.steep/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.strikemission/surf-trip-planner | changed | schema 1 display, origin and discovery |
| community-feed:app.subdomain/subdomains | changed | schema 1 display, origin and discovery |
| community-feed:app.surewhynot.quantum-artificer/quantum-artificer | changed | schema 1 display, origin and discovery |
| community-feed:app.surewhynot.quartermaster/quartermaster | changed | schema 1 display, origin and discovery |
| community-feed:app.swapwallet/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.tabtree/tabtree#npm:tabtree-mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:app.tbit/tbit | changed | schema 1 display, origin and discovery |
| community-feed:app.teleboost/teleboost | changed | schema 1 display, origin and discovery |
| community-feed:app.thoughtspot/mcp-server | dropped | authentication is required but the source declares no secret header |
| community-feed:app.toofi/dental-planning | changed | schema 1 display, origin and discovery |
| community-feed:app.toptik/tiktok | changed | schema 1 display, origin and discovery |
| community-feed:app.trysonar/sonar | changed | schema 1 display, origin and discovery |
| community-feed:app.vibecom/growth | changed | schema 1 display, origin and discovery |
| community-feed:app.waapi/waapi | changed | schema 1 display, origin and discovery |
| community-feed:app.warplink/warplink | changed | schema 1 display, origin and discovery |
| community-feed:app.web.dealer-direct-mcp/dealer-direct-inventory | changed | schema 1 display, origin and discovery |
| community-feed:app.web.yutai-mcp/yutai-mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.wisepenny/wise-penny | changed | schema 1 display, origin and discovery |
| community-feed:app.work-handler/work-handler | changed | schema 1 display, origin and discovery |
| community-feed:app.worldmonitor/mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.xtiles/xtiles-mcp | changed | schema 1 display, origin and discovery |
| community-feed:app.yapl/yapl | changed | schema 1 display, origin and discovery |
| community-feed:app.zaklad/design-system | changed | schema 1 display, origin and discovery |
| community-feed:app.zenable/zenable | changed | schema 1 display, origin and discovery |
| community-feed:app.zooza/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:ar.almanac/almanac | changed | schema 1 display, origin and discovery |
| community-feed:ar.com.escaparate/escaparate | changed | schema 1 display, origin and discovery |
| community-feed:ar.com.ninox/ninoxnet | changed | schema 1 display, origin and discovery |
| community-feed:ar.indicadores/empresas | changed | schema 1 display, origin and discovery |
| community-feed:ar.mueblito/mueblito | changed | schema 1 display, origin and discovery |
| community-feed:art.allover/agentee | changed | schema 1 display, origin and discovery |
| community-feed:art.sprite-ai/sprite-ai | changed | schema 1 display, origin and discovery |
| community-feed:art.travel/mcp | changed | schema 1 display, origin and discovery |
| community-feed:at.designare/knowledge | changed | schema 1 display, origin and discovery |
| community-feed:at.memebo/memeboat-mcp | changed | schema 1 display, origin and discovery |
| community-feed:at.uurl/bundler | changed | schema 1 display, origin and discovery |
| community-feed:au.com.cameronwilson.camfeed/camfeed | changed | schema 1 display, origin and discovery |
| community-feed:au.com.casaintelligence/casa-property | changed | schema 1 display, origin and discovery |
| community-feed:au.com.feasibly/planning | changed | schema 1 display, origin and discovery |
| community-feed:au.com.iknowthepilot/flight-deals | changed | schema 1 display, origin and discovery |
| community-feed:au.com.microburbs/property-data | changed | schema 1 display, origin and discovery |
| community-feed:au.com.paycalculator/mcp | changed | schema 1 display, origin and discovery |
| community-feed:au.com.totalparks/mcp | changed | schema 1 display, origin and discovery |
| community-feed:au.com.travellersgroup/agent | changed | schema 1 display, origin and discovery |
| community-feed:au.com.trip-planner/camping-australia | changed | schema 1 display, origin and discovery |
| community-feed:au.com.vividads/vivid-ads-commerce | changed | schema 1 display, origin and discovery |
| community-feed:aws.api.us-east-1.ecs-mcp/server#pypi:mcp-proxy-for-aws | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:aws.api.us-east-1.eks-mcp/server#pypi:mcp-proxy-for-aws | merged | duplicate connection or content; kept as community-feed:aws.api.us-east-1.ecs-mcp/server#pypi:mcp-proxy-for-aws |
| community-feed:az.trend/news | changed | schema 1 display, origin and discovery |
| community-feed:bar.alerts/alertsbar | changed | schema 1 display, origin and discovery |
| community-feed:best.uneed/directory | changed | schema 1 display, origin and discovery |
| community-feed:bible.void/reader | changed | schema 1 display, origin and discovery |
| community-feed:bio.esst/esst-bio-mcp | changed | schema 1 display, origin and discovery |
| community-feed:biz.icecat/mcp | changed | schema 1 display, origin and discovery |
| community-feed:biz.soeru/soeru | changed | schema 1 display, origin and discovery |
| community-feed:biz.sri-test/verifier | changed | schema 1 display, origin and discovery |
| community-feed:bo.paralelo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:bot.meet/mcp | changed | schema 1 display, origin and discovery |
| community-feed:bot.persnickety/bridal | changed | schema 1 display, origin and discovery |
| community-feed:bot.yeehaw/events | changed | schema 1 display, origin and discovery |
| community-feed:br.api.rendafixa/renda-fixa | changed | schema 1 display, origin and discovery |
| community-feed:br.com.9bot/mcp | changed | schema 1 display, origin and discovery |
| community-feed:br.com.blucher/catalogo | changed | schema 1 display, origin and discovery |
| community-feed:br.com.brasilnfe/fiscal | changed | schema 1 display, origin and discovery |
| community-feed:br.com.carpedia/carpedia | changed | schema 1 display, origin and discovery |
| community-feed:br.com.escoladeradio.www/public | changed | schema 1 display, origin and discovery |
| community-feed:br.com.fipex/mcp | changed | schema 1 display, origin and discovery |
| community-feed:br.com.horusbi/lumo | changed | schema 1 display, origin and discovery |
| community-feed:br.com.lensas/optical-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:br.com.loqal/loqal | changed | schema 1 display, origin and discovery |
| community-feed:br.com.minutaia/pesquisa-juridica | changed | schema 1 display, origin and discovery |
| community-feed:br.com.music360.app/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:br.com.notaguard/notaguard | changed | schema 1 display, origin and discovery |
| community-feed:br.com.nvoip/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:br.com.oportunidados/mcp | changed | schema 1 display, origin and discovery |
| community-feed:br.com.pegarex/mcp | changed | schema 1 display, origin and discovery |
| community-feed:br.com.salvy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:br.com.signdocs/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:br.com.sistemasinovadores/zp-nexus | changed | schema 1 display, origin and discovery |
| community-feed:br.com.upcampo/upi | changed | schema 1 display, origin and discovery |
| community-feed:br.ia.cnpj/mcp | changed | schema 1 display, origin and discovery |
| community-feed:br.ia.dilligence/certidoes | changed | schema 1 display, origin and discovery |
| community-feed:brussels.toots/tickets | changed | schema 1 display, origin and discovery |
| community-feed:build.arca.mcp/arca-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:build.aurora/aurora | changed | schema 1 display, origin and discovery |
| community-feed:build.fabricate/fabricate | changed | schema 1 display, origin and discovery |
| community-feed:build.pdfs/pdfs-build | changed | schema 1 display, origin and discovery |
| community-feed:builders.bridgetown/bridge-town | changed | schema 1 display, origin and discovery |
| community-feed:by.authorized/brands | changed | schema 1 display, origin and discovery |
| community-feed:bz.manda/manda | changed | schema 1 display, origin and discovery |
| community-feed:ca.agenceelan/revoir | changed | schema 1 display, origin and discovery |
| community-feed:ca.airiskmanagement/shadow-ai-list | changed | schema 1 display, origin and discovery |
| community-feed:ca.artsdata/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ca.bakhour/profitcollector | changed | schema 1 display, origin and discovery |
| community-feed:ca.bluecraneworks/forms | changed | schema 1 display, origin and discovery |
| community-feed:ca.commercialgaragedoorman/business-card | changed | schema 1 display, origin and discovery |
| community-feed:ca.creditgps/canadian-credit | changed | schema 1 display, origin and discovery |
| community-feed:ca.dinilu/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ca.entogo/knowledge | changed | schema 1 display, origin and discovery |
| community-feed:ca.freelancertax/freelancertax | changed | schema 1 display, origin and discovery |
| community-feed:ca.garagedoorman/business-card | changed | schema 1 display, origin and discovery |
| community-feed:ca.govradar/govradar | changed | schema 1 display, origin and discovery |
| community-feed:ca.lovethenorth/public-videos | changed | schema 1 display, origin and discovery |
| community-feed:ca.maplev/tesla-collision-parts | changed | schema 1 display, origin and discovery |
| community-feed:ca.mattherbert/offers | changed | schema 1 display, origin and discovery |
| community-feed:ca.movahedi/privacy | changed | schema 1 display, origin and discovery |
| community-feed:ca.netgrant/canadian-grants | changed | schema 1 display, origin and discovery |
| community-feed:ca.structureclerk/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ca.swiftsign/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ca.tradebasis/automotive-appraisal | changed | schema 1 display, origin and discovery |
| community-feed:ca.veilpoint/opportunity-exchange | changed | schema 1 display, origin and discovery |
| community-feed:care.fysio/discovery | changed | schema 1 display, origin and discovery |
| community-feed:casa.find-me.sub1/send-email-mcp | changed | schema 1 display, origin and discovery |
| community-feed:cash.flat/flatcash | changed | schema 1 display, origin and discovery |
| community-feed:cat.2022/catalunya-2022 | changed | schema 1 display, origin and discovery |
| community-feed:cat.churchofai/aigora | changed | schema 1 display, origin and discovery |
| community-feed:cat.idescat/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cc.accrue/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cc.captcha/captchacc | changed | schema 1 display, origin and discovery |
| community-feed:cc.checkleaked/spotify-data | changed | schema 1 display, origin and discovery |
| community-feed:cc.contexta/contexta-mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:cc.easydata/data | changed | schema 1 display, origin and discovery |
| community-feed:cc.halite/recipes | changed | schema 1 display, origin and discovery |
| community-feed:cc.joules/coach | changed | schema 1 display, origin and discovery |
| community-feed:cc.thecolony/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:cc.wealthos/mcp | changed | schema 1 display, origin and discovery |
| community-feed:center.mylink/link-center | changed | schema 1 display, origin and discovery |
| community-feed:ch.1820/telefonbuch | changed | schema 1 display, origin and discovery |
| community-feed:ch.arvi/catalog | changed | schema 1 display, origin and discovery |
| community-feed:ch.cyon/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ch.entscheidsuche/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ch.fedlex-connector/fedlex-connector | changed | schema 1 display, origin and discovery |
| community-feed:ch.immoswipe/immoswipe-ai | changed | schema 1 display, origin and discovery |
| community-feed:ch.opencaselaw/swiss-caselaw | changed | schema 1 display, origin and discovery |
| community-feed:ch.wejob/wejob | changed | schema 1 display, origin and discovery |
| community-feed:ch.zenarion/booking | changed | schema 1 display, origin and discovery |
| community-feed:chat.muro/support | dropped | authentication is required but the source declares no secret header |
| community-feed:chat.prelim/prelim | changed | schema 1 display, origin and discovery |
| community-feed:chat.trilo/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:church.ai.mcp/mcp-hub | changed | schema 1 display, origin and discovery |
| community-feed:ci.git/mymlh-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:city.close/close-api | changed | schema 1 display, origin and discovery |
| community-feed:click.ciromaciel/tools | changed | schema 1 display, origin and discovery |
| community-feed:cloud.aderlo/hosting | changed | schema 1 display, origin and discovery |
| community-feed:cloud.artibot/zhijiangyun | changed | schema 1 display, origin and discovery |
| community-feed:cloud.atatravel/travel-agency | changed | schema 1 display, origin and discovery |
| community-feed:cloud.bisque/presentations | changed | schema 1 display, origin and discovery |
| community-feed:cloud.blitz/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cloud.clawspan/shardlink | changed | schema 1 display, origin and discovery |
| community-feed:cloud.easybits/easybits | changed | schema 1 display, origin and discovery |
| community-feed:cloud.eresourcescheduler.app/eresource-scheduler | changed | schema 1 display, origin and discovery |
| community-feed:cloud.fikst/crm | changed | schema 1 display, origin and discovery |
| community-feed:cloud.hstgr.srv1024618.aval/trust | changed | schema 1 display, origin and discovery |
| community-feed:cloud.kodshop/catalog | changed | schema 1 display, origin and discovery |
| community-feed:cloud.mengi/mengi-cloud | changed | schema 1 display, origin and discovery |
| community-feed:cloud.metrifyr/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cloud.nttzen.secdb/zen-secdb | changed | schema 1 display, origin and discovery |
| community-feed:cloud.opendocs/opendocs | changed | schema 1 display, origin and discovery |
| community-feed:cloud.prince/prince | changed | schema 1 display, origin and discovery |
| community-feed:cloud.serpent/salesforce-devops | changed | schema 1 display, origin and discovery |
| community-feed:cloud.servicepal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cloud.spider/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cloud.tatnet/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cloud.theprotocol/registry | changed | schema 1 display, origin and discovery |
| community-feed:cloud.tri2b/projects | changed | schema 1 display, origin and discovery |
| community-feed:club.goodleads/new-business-owner-contacts | changed | schema 1 display, origin and discovery |
| community-feed:club.inite/inite-club | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:club.worldorder/cube-playground | changed | schema 1 display, origin and discovery |
| community-feed:cn.com.grapecity/gcexcel | changed | schema 1 display, origin and discovery |
| community-feed:cn.com.grapecity/spreadjs | changed | schema 1 display, origin and discovery |
| community-feed:co.addcal/addcal | changed | schema 1 display, origin and discovery |
| community-feed:co.axiom/mcp | dropped | SSE-only transport |
| community-feed:co.bibigpt/youtube-video-summarizer | changed | schema 1 display, origin and discovery |
| community-feed:co.bizverify/mcp | changed | schema 1 display, origin and discovery |
| community-feed:co.brightkey/education-data | changed | schema 1 display, origin and discovery |
| community-feed:co.chatbase/chatbase | changed | schema 1 display, origin and discovery |
| community-feed:co.churnkey/churnkey | changed | schema 1 display, origin and discovery |
| community-feed:co.clutch/mcp | changed | schema 1 display, origin and discovery |
| community-feed:co.creativeclaw/creative-claw | changed | schema 1 display, origin and discovery |
| community-feed:co.feeder/feeder | changed | schema 1 display, origin and discovery |
| community-feed:co.flow2/flow2 | changed | schema 1 display, origin and discovery |
| community-feed:co.flyweel/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:co.gleanit/gleanit | changed | schema 1 display, origin and discovery |
| community-feed:co.heista/api | dropped | authentication is required but the source declares no secret header |
| community-feed:co.heyspark.mcp/server | changed | schema 1 display, origin and discovery |
| community-feed:co.huggingface/hf-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:co.junely/junely | changed | schema 1 display, origin and discovery |
| community-feed:co.launchtrust/launchtrust | changed | schema 1 display, origin and discovery |
| community-feed:co.lovie/company-formation | changed | schema 1 display, origin and discovery |
| community-feed:co.mindlify/mindlify | changed | schema 1 display, origin and discovery |
| community-feed:co.mural/mural | changed | schema 1 display, origin and discovery |
| community-feed:co.net.conexcol.mcp/hosting-cloud-colombia | changed | schema 1 display, origin and discovery |
| community-feed:co.netstate/netstate | changed | schema 1 display, origin and discovery |
| community-feed:co.nexalink/manage | changed | schema 1 display, origin and discovery |
| community-feed:co.oneschema/mcp | changed | schema 1 display, origin and discovery |
| community-feed:co.pepys/pepys-mcp | changed | schema 1 display, origin and discovery |
| community-feed:co.raisekit/raisekit | changed | schema 1 display, origin and discovery |
| community-feed:co.rho/api | changed | schema 1 display, origin and discovery |
| community-feed:co.rocketreach/mcp | changed | schema 1 display, origin and discovery |
| community-feed:co.servicegraph.mcp/servicegraph | changed | schema 1 display, origin and discovery |
| community-feed:co.superforms/superforms | changed | schema 1 display, origin and discovery |
| community-feed:co.supp/suppco | changed | schema 1 display, origin and discovery |
| community-feed:co.tenderly/tenderly-mcp | changed | schema 1 display, origin and discovery |
| community-feed:co.truemarkets/marketdata | changed | schema 1 display, origin and discovery |
| community-feed:co.valid/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:co.vantaj/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:co.wave/mcp | changed | schema 1 display, origin and discovery |
| community-feed:co.whooshly/whooshly-mcp | changed | schema 1 display, origin and discovery |
| community-feed:co.widgy/widgy | changed | schema 1 display, origin and discovery |
| community-feed:co.xianmi/xianmi | changed | schema 1 display, origin and discovery |
| community-feed:coach.freddy/freddy | changed | schema 1 display, origin and discovery |
| community-feed:codes.find/verified-codes | changed | schema 1 display, origin and discovery |
| community-feed:com.00widget/00widget | changed | schema 1 display, origin and discovery |
| community-feed:com.100hires/100hires | changed | schema 1 display, origin and discovery |
| community-feed:com.101soundboards/search | changed | schema 1 display, origin and discovery |
| community-feed:com.1099policy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.10life/insurance | changed | schema 1 display, origin and discovery |
| community-feed:com.1211holding/merch | changed | schema 1 display, origin and discovery |
| community-feed:com.1stcollab/influencers | changed | schema 1 display, origin and discovery |
| community-feed:com.1stdibs/1stDibs | changed | schema 1 display, origin and discovery |
| community-feed:com.24haowan/marketing | changed | schema 1 display, origin and discovery |
| community-feed:com.25karats/storefront | changed | schema 1 display, origin and discovery |
| community-feed:com.3doptix/optical-design | changed | schema 1 display, origin and discovery |
| community-feed:com.3dsellers/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.3dtexel/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.3gppscout/scout | changed | schema 1 display, origin and discovery |
| community-feed:com.4bl1ty/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.53on/directory | changed | schema 1 display, origin and discovery |
| community-feed:com.6ducklearn/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.6ix/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.7275/adwhiz | changed | schema 1 display, origin and discovery |
| community-feed:com.808bits/fips-cmvp | changed | schema 1 display, origin and discovery |
| community-feed:com.86hc/hongkong-company | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.8b/ai-website-builder | changed | schema 1 display, origin and discovery |
| community-feed:com.a3eecosystem.neurotrade/signal | changed | schema 1 display, origin and discovery |
| community-feed:com.abbyseo/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.ablakunio/nyilaszaro-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.abyssale/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.abyssfallgame/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.accountingqb/accountingqb | changed | schema 1 display, origin and discovery |
| community-feed:com.achivx/stablescan | changed | schema 1 display, origin and discovery |
| community-feed:com.acidpeak/acidpeak | changed | schema 1 display, origin and discovery |
| community-feed:com.acjlabs/catalog-normalizer | changed | schema 1 display, origin and discovery |
| community-feed:com.acjlabs/receipt-extraction | changed | schema 1 display, origin and discovery |
| community-feed:com.acjlabs/x402-listing-monitor | changed | schema 1 display, origin and discovery |
| community-feed:com.acprompt/acprompt | changed | schema 1 display, origin and discovery |
| community-feed:com.actikidz/actikidz | changed | schema 1 display, origin and discovery |
| community-feed:com.actuallycare/actuallycare | changed | schema 1 display, origin and discovery |
| community-feed:com.acuris-geo/acuris-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.adadiamonds/ada-diamonds | changed | schema 1 display, origin and discovery |
| community-feed:com.adaptlypost/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.adbloop/meta-ads | changed | schema 1 display, origin and discovery |
| community-feed:com.adbtd/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.adbutler/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.adcritter/mcp-agent | dropped | authentication is required but the source declares no secret header |
| community-feed:com.adcritter/mcp-dev | changed | schema 1 display, origin and discovery |
| community-feed:com.admakeai/admakeai | changed | schema 1 display, origin and discovery |
| community-feed:com.admaxxer/ads-manager | changed | schema 1 display, origin and discovery |
| community-feed:com.admit-coach/university-data | changed | schema 1 display, origin and discovery |
| community-feed:com.admitbase/admissions | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.adologyai/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.adrianhomelab/mall-directory | changed | schema 1 display, origin and discovery |
| community-feed:com.adsbiq/adsbiq | changed | schema 1 display, origin and discovery |
| community-feed:com.adskub/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.adspirer/ads | dropped | authentication is required but the source declares no secret header |
| community-feed:com.adviserry/adviserry | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.advisorfinder/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.advisorppc/advisorppc | changed | schema 1 display, origin and discovery |
| community-feed:com.advocatemcp/advocate | changed | schema 1 display, origin and discovery |
| community-feed:com.adwhispr/adwhispr | changed | schema 1 display, origin and discovery |
| community-feed:com.aegeanbot/direct-stays | changed | schema 1 display, origin and discovery |
| community-feed:com.aeroleads/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.aex402/rpc | changed | schema 1 display, origin and discovery |
| community-feed:com.afdinstitute/afd-knowledge | changed | schema 1 display, origin and discovery |
| community-feed:com.affogata.app/affogata | dropped | authentication is required but the source declares no secret header |
| community-feed:com.aftership.mcp/tracking-public | changed | schema 1 display, origin and discovery |
| community-feed:com.agentcat/agentcat | changed | schema 1 display, origin and discovery |
| community-feed:com.agentcollect/ar-analyst | changed | schema 1 display, origin and discovery |
| community-feed:com.agentdomainsearch/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.agentgrade/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.agenticcontrolplane/acp-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.agenticpaywall/composer | changed | schema 1 display, origin and discovery |
| community-feed:com.agentictotem/web-extractor | changed | schema 1 display, origin and discovery |
| community-feed:com.agentio/brand-connector | changed | schema 1 display, origin and discovery |
| community-feed:com.agentonair/podcasts | changed | schema 1 display, origin and discovery |
| community-feed:com.agentorist/agentorist | changed | schema 1 display, origin and discovery |
| community-feed:com.agentpmt/agentpmt | changed | schema 1 display, origin and discovery |
| community-feed:com.agentrux/agentrux | changed | schema 1 display, origin and discovery |
| community-feed:com.aggors/merchant-evidence | changed | schema 1 display, origin and discovery |
| community-feed:com.agilitycms/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.agtnames/agt | changed | schema 1 display, origin and discovery |
| community-feed:com.ahasend/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ai-for-av/ai-for-av | changed | schema 1 display, origin and discovery |
| community-feed:com.ai-law-tracker/ai-law-tracker | changed | schema 1 display, origin and discovery |
| community-feed:com.ai-semantica/semantica-ai | changed | schema 1 display, origin and discovery |
| community-feed:com.ai2fin/ai2fin-tax-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.aiactradar/ai-act-radar | changed | schema 1 display, origin and discovery |
| community-feed:com.aianyone/ai-anyone | changed | schema 1 display, origin and discovery |
| community-feed:com.aidailybrew/aidailybrew | changed | schema 1 display, origin and discovery |
| community-feed:com.aidemos/catalogue | changed | schema 1 display, origin and discovery |
| community-feed:com.aidesignblueprint/blueprint | changed | schema 1 display, origin and discovery |
| community-feed:com.aidevboard/jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.aidoos/virtual-delivery-center | changed | schema 1 display, origin and discovery |
| community-feed:com.aiesphere/jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.aifordatabase/aifordatabase | changed | schema 1 display, origin and discovery |
| community-feed:com.aiinterviewagents/interviews | changed | schema 1 display, origin and discovery |
| community-feed:com.aimetadatacleaner/metadata-cleaner | changed | schema 1 display, origin and discovery |
| community-feed:com.aiod-automatic-discount/discounts | changed | schema 1 display, origin and discovery |
| community-feed:com.aiproperty-phuket/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.aiqbee/brain | changed | schema 1 display, origin and discovery |
| community-feed:com.airesumemaster/resume-builder | changed | schema 1 display, origin and discovery |
| community-feed:com.airfreightprice/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.airlinestarlinktracker/starlink-tracker | changed | schema 1 display, origin and discovery |
| community-feed:com.airroi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.airsidelabs/aviation-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.airtable/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.aitwire/authority | changed | schema 1 display, origin and discovery |
| community-feed:com.aitwire/tenant | changed | schema 1 display, origin and discovery |
| community-feed:com.akiflow/akiflow | changed | schema 1 display, origin and discovery |
| community-feed:com.alamavar.taskrail/taskrail | changed | schema 1 display, origin and discovery |
| community-feed:com.alchemy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.alfanestlabs/relay | changed | schema 1 display, origin and discovery |
| community-feed:com.algo-trade-analytics/research | changed | schema 1 display, origin and discovery |
| community-feed:com.algomakers/algomaker | changed | schema 1 display, origin and discovery |
| community-feed:com.algovesta/trading | changed | schema 1 display, origin and discovery |
| community-feed:com.alleskralle/jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.allgoodinsp/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.allpdfmagic/allpdfmagic | changed | schema 1 display, origin and discovery |
| community-feed:com.allratestoday/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.allsvgicons/icons | changed | schema 1 display, origin and discovery |
| community-feed:com.almirall/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.almured/marketplace | changed | schema 1 display, origin and discovery |
| community-feed:com.aloudable/podlex | changed | schema 1 display, origin and discovery |
| community-feed:com.alternativeassetliteracy/aal-advisor-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.alternativeassetliteracy/aal-retail-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.altesim/esim | changed | schema 1 display, origin and discovery |
| community-feed:com.altmetric.mcp/altmetric-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.am-lich/vietnamese-calendar | changed | schema 1 display, origin and discovery |
| community-feed:com.amazonaws.us-east-1.execute-api.4fucgqu5if/agent-platform-rules | changed | schema 1 display, origin and discovery |
| community-feed:com.amplitude/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.anaella/mcp#npm:%40anaella%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.anahana/content-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.andiai/andi-search | changed | schema 1 display, origin and discovery |
| community-feed:com.angelcam/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.angelmoncada/consulting | changed | schema 1 display, origin and discovery |
| community-feed:com.anglero/speaker | changed | schema 1 display, origin and discovery |
| community-feed:com.anglinglines/angling-lines | changed | schema 1 display, origin and discovery |
| community-feed:com.anotepad/notes | dropped | authentication is required but the source declares no secret header |
| community-feed:com.anots/directory | changed | schema 1 display, origin and discovery |
| community-feed:com.anthonyhunts/shaart-agency | changed | schema 1 display, origin and discovery |
| community-feed:com.anthonyhunts/shaart-agency-docs | changed | schema 1 display, origin and discovery |
| community-feed:com.anvilcrm/crm | changed | schema 1 display, origin and discovery |
| community-feed:com.anygett/anygett | changed | schema 1 display, origin and discovery |
| community-feed:com.anywayr/anywayr | changed | schema 1 display, origin and discovery |
| community-feed:com.apexcharts/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.api-ninjas/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.api2cart/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.apievangelist/api-evangelist | changed | schema 1 display, origin and discovery |
| community-feed:com.appcreator24.www/android-app-builder | changed | schema 1 display, origin and discovery |
| community-feed:com.appealgo/appealgo | changed | schema 1 display, origin and discovery |
| community-feed:com.appealgo/parking-guides | changed | schema 1 display, origin and discovery |
| community-feed:com.appendix/appendix | changed | schema 1 display, origin and discovery |
| community-feed:com.appfigures/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.applivery.docs/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.applyall/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.appraisily/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.apprendre-les-echecs-24h/catalogue-echecs-fr | changed | schema 1 display, origin and discovery |
| community-feed:com.appsflyer/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.appwizzy/projects | changed | schema 1 display, origin and discovery |
| community-feed:com.apyhub/mcp-server-eu | changed | schema 1 display, origin and discovery |
| community-feed:com.apyhub/mcp-server-us | changed | schema 1 display, origin and discovery |
| community-feed:com.aradia/sovereign-hardware | dropped | SSE-only transport |
| community-feed:com.arc-relay/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.arcalune/music | changed | schema 1 display, origin and discovery |
| community-feed:com.arcandledger/tax-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.arcaneforecasting/world-sense | changed | schema 1 display, origin and discovery |
| community-feed:com.arcanika/tarot | changed | schema 1 display, origin and discovery |
| community-feed:com.arcasos/arcasos-rentals | changed | schema 1 display, origin and discovery |
| community-feed:com.arcat/arcat | changed | schema 1 display, origin and discovery |
| community-feed:com.archerionlabs/nasc | changed | schema 1 display, origin and discovery |
| community-feed:com.archerionlabs/speedread | changed | schema 1 display, origin and discovery |
| community-feed:com.arcjet/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.arcnautical/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.argorant/argorant | changed | schema 1 display, origin and discovery |
| community-feed:com.arison8/smolabot | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.arkm/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.artyfile/music-licensing | changed | schema 1 display, origin and discovery |
| community-feed:com.arxyne/solver#pypi:arxyne | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.arzbin/market-data | changed | schema 1 display, origin and discovery |
| community-feed:com.asalsold.app/canadian-mortgage-deadlines | changed | schema 1 display, origin and discovery |
| community-feed:com.ask10ais/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.askmyenvoy/meeting-scheduling-coordination | changed | schema 1 display, origin and discovery |
| community-feed:com.asksakina/islamic-knowledge#npm:%40asksakina%2Fislamic-knowledge-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.askscores/sports-stats | changed | schema 1 display, origin and discovery |
| community-feed:com.asterwise/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.astraverify/domain-trust | changed | schema 1 display, origin and discovery |
| community-feed:com.astravue/astravue-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.astryke/hub | changed | schema 1 display, origin and discovery |
| community-feed:com.asyntai/support-agent | changed | schema 1 display, origin and discovery |
| community-feed:com.atlasburn/atlasburn | changed | schema 1 display, origin and discovery |
| community-feed:com.atlasemoji/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.atlassian/atlassian-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.atly/places | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.atmita/atmita | changed | schema 1 display, origin and discovery |
| community-feed:com.atom/premium-domains | changed | schema 1 display, origin and discovery |
| community-feed:com.attractiontickets.mcp/products | changed | schema 1 display, origin and discovery |
| community-feed:com.attrove/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.audiala/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.audioscrape/audio-intelligence | merged | duplicate connection or content; kept as docker:audioscrape |
| community-feed:com.auraspay/merchant-payments | changed | schema 1 display, origin and discovery |
| community-feed:com.auravms/auravms | changed | schema 1 display, origin and discovery |
| community-feed:com.aurelianflo/core | changed | schema 1 display, origin and discovery |
| community-feed:com.ausca/agent-services | changed | schema 1 display, origin and discovery |
| community-feed:com.auth0/mcp#npm:%40auth0%2Fauth0-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.autodesk.aps.api/product-help-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.automatedclientacquisition.www/aca | dropped | SSE-only transport |
| community-feed:com.autrady/strategy-audits | changed | schema 1 display, origin and discovery |
| community-feed:com.avaza/avaza-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.avnester.mcp/property-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.awardsecrets/award-availability | changed | schema 1 display, origin and discovery |
| community-feed:com.awardtravelfinder/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.awesomeindie/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.axiomatic-ai/prover | changed | schema 1 display, origin and discovery |
| community-feed:com.axiomide/axiom | changed | schema 1 display, origin and discovery |
| community-feed:com.b2bware/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.babyagecalculator/baby-age | changed | schema 1 display, origin and discovery |
| community-feed:com.babyblueviper/invinoveritas | changed | schema 1 display, origin and discovery |
| community-feed:com.back9ins/agent-platform | changed | schema 1 display, origin and discovery |
| community-feed:com.back9ins/life-insurance | changed | schema 1 display, origin and discovery |
| community-feed:com.backquant/backquant | changed | schema 1 display, origin and discovery |
| community-feed:com.backresto/partner-api | changed | schema 1 display, origin and discovery |
| community-feed:com.backtest360/backtest360 | changed | schema 1 display, origin and discovery |
| community-feed:com.balladic/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bankruptcyobserver/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.barcodereport/barcode-lookup | changed | schema 1 display, origin and discovery |
| community-feed:com.barisasa.earlywire/wire | changed | schema 1 display, origin and discovery |
| community-feed:com.basecamp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.basedash/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bavlio/bavlio | changed | schema 1 display, origin and discovery |
| community-feed:com.bazous/bazous | changed | schema 1 display, origin and discovery |
| community-feed:com.beachvalencia/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.beamtrace/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.beatandraise/sec-filings | changed | schema 1 display, origin and discovery |
| community-feed:com.beaubitw/services | changed | schema 1 display, origin and discovery |
| community-feed:com.beauticslab/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.beehiiv/beehiiv | changed | schema 1 display, origin and discovery |
| community-feed:com.beeimg/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.belindoc/belindoc-mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.benawf/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.benriscore/api | changed | schema 1 display, origin and discovery |
| community-feed:com.besewbizzy/shop | changed | schema 1 display, origin and discovery |
| community-feed:com.besot/catalogue | changed | schema 1 display, origin and discovery |
| community-feed:com.bespree/resumes | changed | schema 1 display, origin and discovery |
| community-feed:com.bestcarfinder/dealer-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.beycome/listing | changed | schema 1 display, origin and discovery |
| community-feed:com.beyondfolder/directories | changed | schema 1 display, origin and discovery |
| community-feed:com.beyondpayday/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.beyourcover/book-cover-generator | changed | schema 1 display, origin and discovery |
| community-feed:com.biaedge/immigration-research | changed | schema 1 display, origin and discovery |
| community-feed:com.bidda/bidda-compliance | changed | schema 1 display, origin and discovery |
| community-feed:com.bidprowl/bidprowl | changed | schema 1 display, origin and discovery |
| community-feed:com.bidskim/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bigballsdata/sports-data | changed | schema 1 display, origin and discovery |
| community-feed:com.bigdata/bigdata-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bikefuchs/bikefuchs | changed | schema 1 display, origin and discovery |
| community-feed:com.bird/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bitly/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.bitmovin.mcp.analytics/analytics-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.biz-planner/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bjjsquare/bjjsquare | changed | schema 1 display, origin and discovery |
| community-feed:com.blacklabeltec/site-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.blazesportsintel/college-baseball | changed | schema 1 display, origin and discovery |
| community-feed:com.blend-ai/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.blendduck/blendduck | changed | schema 1 display, origin and discovery |
| community-feed:com.blicht/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.blindpay/mcp#npm:%40blindpay%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.blitzreels/blitzreels | changed | schema 1 display, origin and discovery |
| community-feed:com.blixtworks.www/tools | changed | schema 1 display, origin and discovery |
| community-feed:com.blockreq/rpc | changed | schema 1 display, origin and discovery |
| community-feed:com.blockscout/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.bloomyesim/esim | changed | schema 1 display, origin and discovery |
| community-feed:com.blotato/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bluepillow/hotels | changed | schema 1 display, origin and discovery |
| community-feed:com.blueticked/blueticked | changed | schema 1 display, origin and discovery |
| community-feed:com.bokendell/portfolio | changed | schema 1 display, origin and discovery |
| community-feed:com.bolotstudio/store | changed | schema 1 display, origin and discovery |
| community-feed:com.bonebenders/bonebenders | changed | schema 1 display, origin and discovery |
| community-feed:com.bookingmaven/marketplace | changed | schema 1 display, origin and discovery |
| community-feed:com.boords/boords | changed | schema 1 display, origin and discovery |
| community-feed:com.boostermage/mtg-prices | changed | schema 1 display, origin and discovery |
| community-feed:com.boothcheck/boothcheck | changed | schema 1 display, origin and discovery |
| community-feed:com.bootsandbassline/catalogue | changed | schema 1 display, origin and discovery |
| community-feed:com.bota-chat/bota | changed | schema 1 display, origin and discovery |
| community-feed:com.bottleyourbrand/print-shop | changed | schema 1 display, origin and discovery |
| community-feed:com.bouncewatch/signals | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.boxtoplay/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bozfix/bozfix | changed | schema 1 display, origin and discovery |
| community-feed:com.braincloudservers/braincloud-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.branderux/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bravos-ai/bravos | changed | schema 1 display, origin and discovery |
| community-feed:com.breckenwander/travel-connector | changed | schema 1 display, origin and discovery |
| community-feed:com.bringmethat/bringmethat | changed | schema 1 display, origin and discovery |
| community-feed:com.brm-chronographes/configurator | changed | schema 1 display, origin and discovery |
| community-feed:com.brofindai/brofindai | changed | schema 1 display, origin and discovery |
| community-feed:com.brokerchooser/broker-safety | changed | schema 1 display, origin and discovery |
| community-feed:com.brontir/research | changed | schema 1 display, origin and discovery |
| community-feed:com.browser-use/browser-use#pypi:browser-use | dropped | streamable HTTPS remote preferred |
| community-feed:com.browser-use/browser-use | changed | schema 1 display, origin and discovery |
| community-feed:com.browserssh/browser-ssh | changed | schema 1 display, origin and discovery |
| community-feed:com.btcdcaengine/btc-dca-engine | changed | schema 1 display, origin and discovery |
| community-feed:com.buckybuild/bucky | changed | schema 1 display, origin and discovery |
| community-feed:com.budgetpixel/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.budgeyapp/budgey | changed | schema 1 display, origin and discovery |
| community-feed:com.bugherd/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.buildworkpro/buildworkpro | changed | schema 1 display, origin and discovery |
| community-feed:com.built2winweb/built2winweb | changed | schema 1 display, origin and discovery |
| community-feed:com.bullpenstrategygroup.rotunda/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.bunstation/bunstation | changed | schema 1 display, origin and discovery |
| community-feed:com.bushdrum/events | changed | schema 1 display, origin and discovery |
| community-feed:com.businessmcp/businessmcp | changed | schema 1 display, origin and discovery |
| community-feed:com.buylater/buylater | changed | schema 1 display, origin and discovery |
| community-feed:com.buyukesim/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.byimprint/public-guidance | changed | schema 1 display, origin and discovery |
| community-feed:com.byjg/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.bykaranteli/mcp#npm:bykaranteli-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.bynn/bynn | changed | schema 1 display, origin and discovery |
| community-feed:com.bzigo/bzigo | changed | schema 1 display, origin and discovery |
| community-feed:com.cabal-hunter.api/cabal-hunter | changed | schema 1 display, origin and discovery |
| community-feed:com.cache-boost/cacheboost | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.cajusticewatch/cajusticewatch | changed | schema 1 display, origin and discovery |
| community-feed:com.calibrd/agent | changed | schema 1 display, origin and discovery |
| community-feed:com.caliuapp/caliu-notes | changed | schema 1 display, origin and discovery |
| community-feed:com.callingly/callingly | changed | schema 1 display, origin and discovery |
| community-feed:com.callstay/hotels | changed | schema 1 display, origin and discovery |
| community-feed:com.calvingwatch/public-knowledge | changed | schema 1 display, origin and discovery |
| community-feed:com.cambercloud.camber-mcp/camber-mcp-server | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.camdentools/shop | changed | schema 1 display, origin and discovery |
| community-feed:com.canalnav/canal-nav | changed | schema 1 display, origin and discovery |
| community-feed:com.canarics/canarics | changed | schema 1 display, origin and discovery |
| community-feed:com.canhelpto/support | changed | schema 1 display, origin and discovery |
| community-feed:com.canonicai/canonicai-answers | changed | schema 1 display, origin and discovery |
| community-feed:com.canva.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.captiatechnology/knowledge | changed | schema 1 display, origin and discovery |
| community-feed:com.captureoneai/web-perception | changed | schema 1 display, origin and discovery |
| community-feed:com.carathunter/diamond-prices | changed | schema 1 display, origin and discovery |
| community-feed:com.carbondesignsystem.mcp/carbon-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.cardcenteringtool/card-prices | changed | schema 1 display, origin and discovery |
| community-feed:com.cardnexus/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.careerrift/career-rift | changed | schema 1 display, origin and discovery |
| community-feed:com.careranks/careranks-data | changed | schema 1 display, origin and discovery |
| community-feed:com.cars-data/car-specs-api | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.carsmultiverse/recall-record | changed | schema 1 display, origin and discovery |
| community-feed:com.cashflowfrog.mcp/server | changed | schema 1 display, origin and discovery |
| community-feed:com.caspio/caspio | changed | schema 1 display, origin and discovery |
| community-feed:com.catalystedgescanner/catalyst-edge-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.catchintent/catchintent | changed | schema 1 display, origin and discovery |
| community-feed:com.caudexcatena/caudexcatena-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.cautellus/scam-detection | changed | schema 1 display, origin and discovery |
| community-feed:com.cavuno/job-board-operator | changed | schema 1 display, origin and discovery |
| community-feed:com.cdata/cdata-connect-ai | changed | schema 1 display, origin and discovery |
| community-feed:com.centipidbilling/billing | changed | schema 1 display, origin and discovery |
| community-feed:com.ceruleanjobs/search | changed | schema 1 display, origin and discovery |
| community-feed:com.chain305/chainsaw | changed | schema 1 display, origin and discovery |
| community-feed:com.chainstack/chainstack | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.chaiz/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.chalet-montagne/rentals | changed | schema 1 display, origin and discovery |
| community-feed:com.changethisfile/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.chapsoft/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.chartercaptain/charter-captain | changed | schema 1 display, origin and discovery |
| community-feed:com.chasync/chasync | changed | schema 1 display, origin and discovery |
| community-feed:com.chatfuel/chatfuel | changed | schema 1 display, origin and discovery |
| community-feed:com.chatfuel/chatfuel-api | changed | schema 1 display, origin and discovery |
| community-feed:com.cheapestinference/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.checkoutpage/checkout-page | changed | schema 1 display, origin and discovery |
| community-feed:com.cherishedbook/memorials | changed | schema 1 display, origin and discovery |
| community-feed:com.chessigma/chessigma | changed | schema 1 display, origin and discovery |
| community-feed:com.chibitek/mochii | changed | schema 1 display, origin and discovery |
| community-feed:com.chibitek/nexus | changed | schema 1 display, origin and discovery |
| community-feed:com.chilipiper/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.chnlsync/advisor | changed | schema 1 display, origin and discovery |
| community-feed:com.choosehelp/directory | changed | schema 1 display, origin and discovery |
| community-feed:com.choosemylo/mind-of-mylo-quotes | changed | schema 1 display, origin and discovery |
| community-feed:com.chorilo/chorilo | changed | schema 1 display, origin and discovery |
| community-feed:com.chrome-stats/chrome-stats | changed | schema 1 display, origin and discovery |
| community-feed:com.chrysai.www/chrysai | changed | schema 1 display, origin and discovery |
| community-feed:com.churnsolution/analytics | changed | schema 1 display, origin and discovery |
| community-feed:com.cinevva/game-creator | changed | schema 1 display, origin and discovery |
| community-feed:com.circleci/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.citehawk/citehawk | changed | schema 1 display, origin and discovery |
| community-feed:com.cituna/cituna-mcp#npm:cituna-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.civic/nexus | changed | schema 1 display, origin and discovery |
| community-feed:com.civilquants/civilquants | changed | schema 1 display, origin and discovery |
| community-feed:com.claribi/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.claude.platform/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.claudeers/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.clauderegistry/plugin-catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.clideck/network-knowledge | changed | schema 1 display, origin and discovery |
| community-feed:com.clment/clment | changed | schema 1 display, origin and discovery |
| community-feed:com.clootrack/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.close/close-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.cloudflare.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.cloziq/cloziq | changed | schema 1 display, origin and discovery |
| community-feed:com.cmein/cmein | changed | schema 1 display, origin and discovery |
| community-feed:com.coachwatts/coach-watts | changed | schema 1 display, origin and discovery |
| community-feed:com.codequiry/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.coderbuds/insights | changed | schema 1 display, origin and discovery |
| community-feed:com.codescene/codescene-mcp-server#npm:%40codescene%2Fcodehealth-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.codestringers/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.cogram/project | changed | schema 1 display, origin and discovery |
| community-feed:com.coinbucha/bitcoin-signals | changed | schema 1 display, origin and discovery |
| community-feed:com.coinfuty/coinfuty | changed | schema 1 display, origin and discovery |
| community-feed:com.coinira/calculators | changed | schema 1 display, origin and discovery |
| community-feed:com.coinlobster/whale-data | changed | schema 1 display, origin and discovery |
| community-feed:com.coinmarketcal/events | changed | schema 1 display, origin and discovery |
| community-feed:com.coinmarketcap/coinmarketcap | dropped | authentication is required but the source declares no secret header |
| community-feed:com.collabpls/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.coloringbookify/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.commonelements/data | changed | schema 1 display, origin and discovery |
| community-feed:com.comos-federation/gateway | changed | schema 1 display, origin and discovery |
| community-feed:com.companydata/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.compensationprofessional/discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.completionkit/evals | changed | schema 1 display, origin and discovery |
| community-feed:com.complianceautomator/public-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.compliapi/screening | changed | schema 1 display, origin and discovery |
| community-feed:com.complylayer/complylayer | changed | schema 1 display, origin and discovery |
| community-feed:com.compoid/mcp-server | dropped | Its address needs values you choose. Add it under Custom. |
| community-feed:com.conduyt/mcp#npm:conduyt-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.conferencegrid/conferencegrid | changed | schema 1 display, origin and discovery |
| community-feed:com.configdirector/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.congressmcp/congressmcp | changed | schema 1 display, origin and discovery |
| community-feed:com.consensus-analytics/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.consentlayer/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.contextflo/contextflo | changed | schema 1 display, origin and discovery |
| community-feed:com.converttoit/converter | changed | schema 1 display, origin and discovery |
| community-feed:com.convexvalue/cvserver | changed | schema 1 display, origin and discovery |
| community-feed:com.coordinalo/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.corapilot/whatsapp | changed | schema 1 display, origin and discovery |
| community-feed:com.cordering/whitelabel-ordering | changed | schema 1 display, origin and discovery |
| community-feed:com.corenexis/api | changed | schema 1 display, origin and discovery |
| community-feed:com.corenexis/cashly | changed | schema 1 display, origin and discovery |
| community-feed:com.coresignal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.correkt/api-server | changed | schema 1 display, origin and discovery |
| community-feed:com.costbench/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.costsegsmart/cost-seg-smart | changed | schema 1 display, origin and discovery |
| community-feed:com.courseprofiler/courseprofiler | changed | schema 1 display, origin and discovery |
| community-feed:com.courtdelta/court-delta | changed | schema 1 display, origin and discovery |
| community-feed:com.covasyn/chemistry | changed | schema 1 display, origin and discovery |
| community-feed:com.coverthegaps/coverthegaps | changed | schema 1 display, origin and discovery |
| community-feed:com.cpz-lab.mcp/cpzai | changed | schema 1 display, origin and discovery |
| community-feed:com.crackandreveal/locks | changed | schema 1 display, origin and discovery |
| community-feed:com.craftedtrust/mcp-shield | changed | schema 1 display, origin and discovery |
| community-feed:com.crawlconsole/crawlconsole | changed | schema 1 display, origin and discovery |
| community-feed:com.crawlraven/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.cre8techdev/mini-pricer-mcp | dropped | SSE-only transport |
| community-feed:com.cresclab.agentlab/deploy | changed | schema 1 display, origin and discovery |
| community-feed:com.cresclab.caacgo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.cresclab.catalog/ai-catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.crimsoncrawler/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.crontap/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.crossmint/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.crowdhum/crowdhum | changed | schema 1 display, origin and discovery |
| community-feed:com.cryptodataapi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.cryptohopper/mcp-data | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.cryptoquant/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.cryptorefills/mcp-server | dropped | SSE-only transport |
| community-feed:com.cryptowhaleinsights/whale-insights | changed | schema 1 display, origin and discovery |
| community-feed:com.cryptowisser/news | changed | schema 1 display, origin and discovery |
| community-feed:com.csidia/notes | changed | schema 1 display, origin and discovery |
| community-feed:com.csscreme/design-systems | changed | schema 1 display, origin and discovery |
| community-feed:com.ctlsurf/notebook | changed | schema 1 display, origin and discovery |
| community-feed:com.curaiz/remote-jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.currencyguard/guard-pricing | changed | schema 1 display, origin and discovery |
| community-feed:com.custosa/tools | changed | schema 1 display, origin and discovery |
| community-feed:com.cycle-platform/cycle-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.cymosoft/cymosoft | changed | schema 1 display, origin and discovery |
| community-feed:com.dabradata/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dajsve/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dannykeane/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.danubeai/danube | changed | schema 1 display, origin and discovery |
| community-feed:com.dapdip/youtube-growth | changed | schema 1 display, origin and discovery |
| community-feed:com.dartai/dart | changed | schema 1 display, origin and discovery |
| community-feed:com.dashthis/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dataart/case-studies | changed | schema 1 display, origin and discovery |
| community-feed:com.dataclawe/dataclawe-mcp | dropped | SSE-only transport |
| community-feed:com.dataddo/mcp-data | changed | schema 1 display, origin and discovery |
| community-feed:com.datadoe/amazon-seller-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.datailo/datailo | changed | schema 1 display, origin and discovery |
| community-feed:com.datalastic/vessel-tracking | changed | schema 1 display, origin and discovery |
| community-feed:com.datanexusmcp/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.dataplex-consulting/healthcare-data | changed | schema 1 display, origin and discovery |
| community-feed:com.dataroia/data-trust | changed | schema 1 display, origin and discovery |
| community-feed:com.datatreehaus/skopia-floor-plan-layout | changed | schema 1 display, origin and discovery |
| community-feed:com.datocapital/api | changed | schema 1 display, origin and discovery |
| community-feed:com.datpaq/datpaq | changed | schema 1 display, origin and discovery |
| community-feed:com.datronis/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.daxoom/daxoom | changed | schema 1 display, origin and discovery |
| community-feed:com.dayonelead/dayonelead | changed | schema 1 display, origin and discovery |
| community-feed:com.daytrip/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dayze/life-context | changed | schema 1 display, origin and discovery |
| community-feed:com.dealerific/dealerific | changed | schema 1 display, origin and discovery |
| community-feed:com.debitura/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.decionis/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.decision-anchor/da | changed | schema 1 display, origin and discovery |
| community-feed:com.deckextract/deckextract | changed | schema 1 display, origin and discovery |
| community-feed:com.deepmapai/earth-grounding | changed | schema 1 display, origin and discovery |
| community-feed:com.deepskyai/aviation-regulations | changed | schema 1 display, origin and discovery |
| community-feed:com.deerdawn/deerdawn | changed | schema 1 display, origin and discovery |
| community-feed:com.defaultverifier/settlement-witness | changed | schema 1 display, origin and discovery |
| community-feed:com.defici/marketplace | changed | schema 1 display, origin and discovery |
| community-feed:com.delilahusa/legislation | changed | schema 1 display, origin and discovery |
| community-feed:com.deployedbyai/the-deploy-log | changed | schema 1 display, origin and discovery |
| community-feed:com.derrick-app/derrick | changed | schema 1 display, origin and discovery |
| community-feed:com.desafiocomunicacion/services | changed | schema 1 display, origin and discovery |
| community-feed:com.destaire/destaire | changed | schema 1 display, origin and discovery |
| community-feed:com.devcycle/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.devdome/analytics | changed | schema 1 display, origin and discovery |
| community-feed:com.devexpress/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.devvizion/x402-research | changed | schema 1 display, origin and discovery |
| community-feed:com.dialogbrain/dialogbrain | changed | schema 1 display, origin and discovery |
| community-feed:com.diariobitcoin/news | changed | schema 1 display, origin and discovery |
| community-feed:com.dibind/daitk-total-import-cost | changed | schema 1 display, origin and discovery |
| community-feed:com.didlogic/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.diggercamp/music-similarity | changed | schema 1 display, origin and discovery |
| community-feed:com.digitalpublic/commercial | changed | schema 1 display, origin and discovery |
| community-feed:com.digitalpublic/marketing-operations | changed | schema 1 display, origin and discovery |
| community-feed:com.digitaltableteur/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dillilabs.deva/dilli-email-validation-api-server | changed | schema 1 display, origin and discovery |
| community-feed:com.dimensionkit/scorecards | changed | schema 1 display, origin and discovery |
| community-feed:com.dimhour/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.dintak/dintak-mcp-gateway | changed | schema 1 display, origin and discovery |
| community-feed:com.dirigon/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dirtsignal/dirtsignal | changed | schema 1 display, origin and discovery |
| community-feed:com.discolike/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.discordservers/search | changed | schema 1 display, origin and discovery |
| community-feed:com.discreterate/public | changed | schema 1 display, origin and discovery |
| community-feed:com.dispatchtickets/dispatch-tickets | changed | schema 1 display, origin and discovery |
| community-feed:com.distillmarkets/distill-markets | changed | schema 1 display, origin and discovery |
| community-feed:com.divineapi/horoscope | changed | schema 1 display, origin and discovery |
| community-feed:com.divineapi/indian | changed | schema 1 display, origin and discovery |
| community-feed:com.divineapi/western | changed | schema 1 display, origin and discovery |
| community-feed:com.dmca/dmca-cases | changed | schema 1 display, origin and discovery |
| community-feed:com.docketnexus/docketnexus | changed | schema 1 display, origin and discovery |
| community-feed:com.dogechain/dogechain | changed | schema 1 display, origin and discovery |
| community-feed:com.dominickprevete/dscr-lender-data | changed | schema 1 display, origin and discovery |
| community-feed:com.dominickprevete/instant-term-sheet | changed | schema 1 display, origin and discovery |
| community-feed:com.donebear/donebear | changed | schema 1 display, origin and discovery |
| community-feed:com.doodates/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.doomscrollr/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dotprompts/dotprompts | changed | schema 1 display, origin and discovery |
| community-feed:com.downtester/status | changed | schema 1 display, origin and discovery |
| community-feed:com.dplooy/hosting | changed | schema 1 display, origin and discovery |
| community-feed:com.draftboard/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dreamboothstudio/dreambooth | changed | schema 1 display, origin and discovery |
| community-feed:com.dregs/dregs-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.dribba/dribba | changed | schema 1 display, origin and discovery |
| community-feed:com.drillerdb/drillerdb | changed | schema 1 display, origin and discovery |
| community-feed:com.drip-apex/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.drivings/driving-test-study | changed | schema 1 display, origin and discovery |
| community-feed:com.droplinked.mcp/server | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.dubaiwealthindex/dubai-wealth-index | changed | schema 1 display, origin and discovery |
| community-feed:com.duck-hub/menu | changed | schema 1 display, origin and discovery |
| community-feed:com.dunsocial/dunsocial | changed | schema 1 display, origin and discovery |
| community-feed:com.dynomatix/company | changed | schema 1 display, origin and discovery |
| community-feed:com.e2llm/element-to-llm | changed | schema 1 display, origin and discovery |
| community-feed:com.earningsfeed/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.easyonward/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.easyparser/easyparser | changed | schema 1 display, origin and discovery |
| community-feed:com.easyship/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ecocitizenz/trust-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ecoexperten/energieausweis | changed | schema 1 display, origin and discovery |
| community-feed:com.ecourtsindia/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ecovanmove/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.ecuafact.docsapi/documentacion | changed | schema 1 display, origin and discovery |
| community-feed:com.educaplay/educaplay | changed | schema 1 display, origin and discovery |
| community-feed:com.edwyna/fax | changed | schema 1 display, origin and discovery |
| community-feed:com.eesier/prospecting | changed | schema 1 display, origin and discovery |
| community-feed:com.egnyte/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.electricskateboard/electricskateboard | changed | schema 1 display, origin and discovery |
| community-feed:com.electronics-architect/electronics-architect | changed | schema 1 display, origin and discovery |
| community-feed:com.eleyed/redact | changed | schema 1 display, origin and discovery |
| community-feed:com.elijahdesent/custom-website-editor | changed | schema 1 display, origin and discovery |
| community-feed:com.elixirconf/async | changed | schema 1 display, origin and discovery |
| community-feed:com.ellomind/therapy-booking | changed | schema 1 display, origin and discovery |
| community-feed:com.emailchaser/emailchaser | changed | schema 1 display, origin and discovery |
| community-feed:com.emailkind/emailkind | changed | schema 1 display, origin and discovery |
| community-feed:com.embersds/embers | changed | schema 1 display, origin and discovery |
| community-feed:com.emeditor/help | changed | schema 1 display, origin and discovery |
| community-feed:com.emergingtechcenter/gigs | changed | schema 1 display, origin and discovery |
| community-feed:com.emisorasdecolombia/radio | changed | schema 1 display, origin and discovery |
| community-feed:com.emorahealth/mental-health-care | changed | schema 1 display, origin and discovery |
| community-feed:com.emtailabs/xray-vision | dropped | authentication is required but the source declares no secret header |
| community-feed:com.encirca/domains | changed | schema 1 display, origin and discovery |
| community-feed:com.encompassconfirm/ec360 | changed | schema 1 display, origin and discovery |
| community-feed:com.energyaisolution/energyai | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.energyaisolution/solar-home-incentives | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.engagemii/citation-watch | changed | schema 1 display, origin and discovery |
| community-feed:com.engscript/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.enigma/enigma-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.enshapeapp/enshape | changed | schema 1 display, origin and discovery |
| community-feed:com.entidex/entidex | changed | schema 1 display, origin and discovery |
| community-feed:com.entroute/entroute | changed | schema 1 display, origin and discovery |
| community-feed:com.envelopebudget/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.envloped/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.epidemicsound/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.epkproperties/public-knowledge | changed | schema 1 display, origin and discovery |
| community-feed:com.epovest/ai-visibility | changed | schema 1 display, origin and discovery |
| community-feed:com.epublys/epublys | dropped | header is not a declared secret reference |
| community-feed:com.erikbethke/blog | changed | schema 1 display, origin and discovery |
| community-feed:com.erzycall/erzycall | changed | schema 1 display, origin and discovery |
| community-feed:com.escortfox/escortfox | changed | schema 1 display, origin and discovery |
| community-feed:com.esignatures/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.esimkenya/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.esimoa/esim | changed | schema 1 display, origin and discovery |
| community-feed:com.eurocollis/eurocollis | changed | schema 1 display, origin and discovery |
| community-feed:com.evaboot/evaboot | changed | schema 1 display, origin and discovery |
| community-feed:com.eventescapes/event-escapes | changed | schema 1 display, origin and discovery |
| community-feed:com.eventmatey.mcp/event-discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.eventship/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.eventsynoptic.go/event-synoptic | changed | schema 1 display, origin and discovery |
| community-feed:com.everstake/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.everydaybudd/decisions | changed | schema 1 display, origin and discovery |
| community-feed:com.evmux/evmux | changed | schema 1 display, origin and discovery |
| community-feed:com.ex2/account | changed | schema 1 display, origin and discovery |
| community-feed:com.ex2/catalogue | changed | schema 1 display, origin and discovery |
| community-feed:com.execbro/execbro#npm:execbro | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.expandingweb/agentic-commerce-readiness | changed | schema 1 display, origin and discovery |
| community-feed:com.expandingweb/nord-trail-store | changed | schema 1 display, origin and discovery |
| community-feed:com.expatriator/immigration | changed | schema 1 display, origin and discovery |
| community-feed:com.ezeep/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ezoic/setup | changed | schema 1 display, origin and discovery |
| community-feed:com.eztexting/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.f1laps/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.f1ow/f1ow | changed | schema 1 display, origin and discovery |
| community-feed:com.factanker/factanker | changed | schema 1 display, origin and discovery |
| community-feed:com.fadehost/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.fakeparrot/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.falazuki/finance-br | changed | schema 1 display, origin and discovery |
| community-feed:com.falcoscan/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.familiartarot/tarot | changed | schema 1 display, origin and discovery |
| community-feed:com.fareeagle/travel | changed | schema 1 display, origin and discovery |
| community-feed:com.fareeqy/fareeqy | changed | schema 1 display, origin and discovery |
| community-feed:com.fast-surveys/fast-surveys | changed | schema 1 display, origin and discovery |
| community-feed:com.favowe/favowe | changed | schema 1 display, origin and discovery |
| community-feed:com.fed-spend/fed-spend | changed | schema 1 display, origin and discovery |
| community-feed:com.feedbackpulse/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.feedbackrobot/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.feedhive/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.feedsquad/feedsquad | changed | schema 1 display, origin and discovery |
| community-feed:com.feode/feode-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.feranor/resilience | changed | schema 1 display, origin and discovery |
| community-feed:com.ferryflighthub/ferryflight | changed | schema 1 display, origin and discovery |
| community-feed:com.ffmpeg-api/ffmpeg | changed | schema 1 display, origin and discovery |
| community-feed:com.fibrecompare/availability | changed | schema 1 display, origin and discovery |
| community-feed:com.figma.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.filingspy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.filtrecharbon/catalogue | changed | schema 1 display, origin and discovery |
| community-feed:com.fin3000/fin3000 | changed | schema 1 display, origin and discovery |
| community-feed:com.financialfilings/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.findweedny/findweedny | changed | schema 1 display, origin and discovery |
| community-feed:com.findyourfivepm/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.fininfostation/tw-finance | changed | schema 1 display, origin and discovery |
| community-feed:com.finn.www/auto | changed | schema 1 display, origin and discovery |
| community-feed:com.fintalio/linkedin-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.finvygo/finvygo | changed | schema 1 display, origin and discovery |
| community-feed:com.fitiny/moissanite-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.fitnito/fitnito | changed | schema 1 display, origin and discovery |
| community-feed:com.fixidu/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.flevy/flevy | changed | schema 1 display, origin and discovery |
| community-feed:com.flickdirect.connect/flickdirect-connect | changed | schema 1 display, origin and discovery |
| community-feed:com.flightclaw/flightclaw | changed | schema 1 display, origin and discovery |
| community-feed:com.flightpowers/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.flightpowers/google-flights | changed | schema 1 display, origin and discovery |
| community-feed:com.flightqueue/flightqueue | changed | schema 1 display, origin and discovery |
| community-feed:com.flightseatmap/flightseatmap | changed | schema 1 display, origin and discovery |
| community-feed:com.flipnem/flipnem | changed | schema 1 display, origin and discovery |
| community-feed:com.floot/floot | changed | schema 1 display, origin and discovery |
| community-feed:com.flowaiapi/agent-bus | changed | schema 1 display, origin and discovery |
| community-feed:com.flyitalyadsb/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.footdigest/footdigest | changed | schema 1 display, origin and discovery |
| community-feed:com.forcedalpha/supply-chain | changed | schema 1 display, origin and discovery |
| community-feed:com.formaportal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.formasty/form-builder | changed | schema 1 display, origin and discovery |
| community-feed:com.formatho/runtime | changed | schema 1 display, origin and discovery |
| community-feed:com.formbuilder/formbuilder | changed | schema 1 display, origin and discovery |
| community-feed:com.formcarry/formcarry | changed | schema 1 display, origin and discovery |
| community-feed:com.formester/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.fortrabbit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.fortvision.app/fortvision | changed | schema 1 display, origin and discovery |
| community-feed:com.foundry-mcp/foundry | changed | schema 1 display, origin and discovery |
| community-feed:com.foundry-mcp/foundry-code | changed | schema 1 display, origin and discovery |
| community-feed:com.foundryims/foundry-ims | changed | schema 1 display, origin and discovery |
| community-feed:com.foxfiver/state-transfer-tracker | changed | schema 1 display, origin and discovery |
| community-feed:com.fplcopilot/fpl-copilot | changed | schema 1 display, origin and discovery |
| community-feed:com.fractionalteams/portal | changed | schema 1 display, origin and discovery |
| community-feed:com.framekeep/public | changed | schema 1 display, origin and discovery |
| community-feed:com.frameonlab/frameon | changed | schema 1 display, origin and discovery |
| community-feed:com.framesail/framesail | changed | schema 1 display, origin and discovery |
| community-feed:com.frankponcelet/profile | changed | schema 1 display, origin and discovery |
| community-feed:com.free-sign/signing | changed | schema 1 display, origin and discovery |
| community-feed:com.freebatteryfactory/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.freeelatech/oneda | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.freename/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.freerateupdate/mortgage-home-equity | changed | schema 1 display, origin and discovery |
| community-feed:com.freqblog/music-metadata | changed | schema 1 display, origin and discovery |
| community-feed:com.frisian-mcp/django | changed | schema 1 display, origin and discovery |
| community-feed:com.fromtocargo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.fronesislabs/dcl-trust-oracle | changed | schema 1 display, origin and discovery |
| community-feed:com.frontofgoal/odds-api | changed | schema 1 display, origin and discovery |
| community-feed:com.frontstat/visibility | changed | schema 1 display, origin and discovery |
| community-feed:com.frunklab/wraps | changed | schema 1 display, origin and discovery |
| community-feed:com.fulfiller/agentic-commerce-api | changed | schema 1 display, origin and discovery |
| community-feed:com.furrsati/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.futureagi/futureagi | changed | schema 1 display, origin and discovery |
| community-feed:com.fynk.app/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.g2x/govcon | changed | schema 1 display, origin and discovery |
| community-feed:com.gameanalytics/analytics-docs | changed | schema 1 display, origin and discovery |
| community-feed:com.gameindustrylibrary/gil | changed | schema 1 display, origin and discovery |
| community-feed:com.gameserverapp.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gameshopenter/shop | changed | schema 1 display, origin and discovery |
| community-feed:com.gangwaze/cruise | changed | schema 1 display, origin and discovery |
| community-feed:com.gatecoreai/marketplace | changed | schema 1 display, origin and discovery |
| community-feed:com.geckoboard.gateway/metrics | changed | schema 1 display, origin and discovery |
| community-feed:com.geezerkeeper/referral-exit-routes | changed | schema 1 display, origin and discovery |
| community-feed:com.gekkode/foliade | changed | schema 1 display, origin and discovery |
| community-feed:com.gemalli/trade | changed | schema 1 display, origin and discovery |
| community-feed:com.genchi/genchi | changed | schema 1 display, origin and discovery |
| community-feed:com.gencove.consumer/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.genmb/genmb | changed | schema 1 display, origin and discovery |
| community-feed:com.geonode/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.german-elections/gerda | changed | schema 1 display, origin and discovery |
| community-feed:com.get2great/get2great-discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.getabstract/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.getadloop/adloop#pypi:adloop | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.getalai/presentations | changed | schema 1 display, origin and discovery |
| community-feed:com.getarcresearch/arc-research | changed | schema 1 display, origin and discovery |
| community-feed:com.getbeachfinder/beachfinder | changed | schema 1 display, origin and discovery |
| community-feed:com.getboothiq/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.getboxkite/xero-backup-export | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.getcims/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.getcleed/linkedin-buying-signals | changed | schema 1 display, origin and discovery |
| community-feed:com.getclera/clera | changed | schema 1 display, origin and discovery |
| community-feed:com.getcurrentoffer/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.getdextego/dextego | changed | schema 1 display, origin and discovery |
| community-feed:com.getdynamicqr/qr-codes | changed | schema 1 display, origin and discovery |
| community-feed:com.getguru/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.getholdings/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.getklar/klar | changed | schema 1 display, origin and discovery |
| community-feed:com.getmikie/mikie#npm:%40getmikie%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.getmyhotels/getmyhotels | changed | schema 1 display, origin and discovery |
| community-feed:com.getonbrd/recruiter | changed | schema 1 display, origin and discovery |
| community-feed:com.getorquesta/orquesta | changed | schema 1 display, origin and discovery |
| community-feed:com.getrosey/rosey | changed | schema 1 display, origin and discovery |
| community-feed:com.getsapiens/sapiens | changed | schema 1 display, origin and discovery |
| community-feed:com.getsliq/sliq | changed | schema 1 display, origin and discovery |
| community-feed:com.getunblocked/unblocked-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.getvahada/vahada | changed | schema 1 display, origin and discovery |
| community-feed:com.getvaletparking/valet-parking-directory | changed | schema 1 display, origin and discovery |
| community-feed:com.getveles/cpq | changed | schema 1 display, origin and discovery |
| community-feed:com.getvoibe/transcription | changed | schema 1 display, origin and discovery |
| community-feed:com.getyoutubetranscript/youtube-transcript-and-youtube-search | changed | schema 1 display, origin and discovery |
| community-feed:com.ghostavo/retail-media-measurement | changed | schema 1 display, origin and discovery |
| community-feed:com.giftstoprint/poster-connector | changed | schema 1 display, origin and discovery |
| community-feed:com.gitdiagram/gitdiagram | changed | schema 1 display, origin and discovery |
| community-feed:com.githits/githits#npm:githits | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.gitkraken/gk-cli#npm:%40gitkraken%2Fgk | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.gitlab/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gitsim/chat | changed | schema 1 display, origin and discovery |
| community-feed:com.giveradar/charity-registry | changed | schema 1 display, origin and discovery |
| community-feed:com.glance/glanceai-fashion | changed | schema 1 display, origin and discovery |
| community-feed:com.glassfrog/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.globaldatabase/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.globalfinreg/lei | changed | schema 1 display, origin and discovery |
| community-feed:com.globalsourcepartners/emerging-markets-research | changed | schema 1 display, origin and discovery |
| community-feed:com.globalsurfari/globalsurfari | changed | schema 1 display, origin and discovery |
| community-feed:com.glockapps/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gluecron/gluecron | changed | schema 1 display, origin and discovery |
| community-feed:com.gmapsextractor/google-maps-scraper | changed | schema 1 display, origin and discovery |
| community-feed:com.gnosari/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gnosismemory/memory | changed | schema 1 display, origin and discovery |
| community-feed:com.gobananasai/go-bananas | changed | schema 1 display, origin and discovery |
| community-feed:com.gocardless/gc-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gocdkeys/gocdkeys | changed | schema 1 display, origin and discovery |
| community-feed:com.gocepetrov/goce-petrov | changed | schema 1 display, origin and discovery |
| community-feed:com.gocodebook/codes | changed | schema 1 display, origin and discovery |
| community-feed:com.gocontentflow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gocushy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.godavaii/health-ai | changed | schema 1 display, origin and discovery |
| community-feed:com.godorsal/dorsal | changed | schema 1 display, origin and discovery |
| community-feed:com.gofrantic/frantic | changed | schema 1 display, origin and discovery |
| community-feed:com.gojinko.mcp/jinko | changed | schema 1 display, origin and discovery |
| community-feed:com.goldsky/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.golemry/golemry | changed | schema 1 display, origin and discovery |
| community-feed:com.gominddb/gomind | changed | schema 1 display, origin and discovery |
| community-feed:com.goodsaegim/goodsaegim | changed | schema 1 display, origin and discovery |
| community-feed:com.goodword/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.androidmanagement/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.bigtableadmin/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.compute/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.container/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.datastream/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.design/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.developerknowledge/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.firestore/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.mapstools/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.memorystore/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.monitoring/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.run/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.sqladmin/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.googleapis.stitch/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gotfreefax/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.govbase/govbase | changed | schema 1 display, origin and discovery |
| community-feed:com.goveda/patent-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.govgazette/govgazette | changed | schema 1 display, origin and discovery |
| community-feed:com.gqlteam/site | changed | schema 1 display, origin and discovery |
| community-feed:com.grabbitapp/grabblist | changed | schema 1 display, origin and discovery |
| community-feed:com.grabient/grabient | changed | schema 1 display, origin and discovery |
| community-feed:com.graphmake/graphmake | changed | schema 1 display, origin and discovery |
| community-feed:com.green-api/whatsapp | changed | schema 1 display, origin and discovery |
| community-feed:com.greencalculus/api | changed | schema 1 display, origin and discovery |
| community-feed:com.gribstream/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.grid-shot/gridshot | changed | schema 1 display, origin and discovery |
| community-feed:com.growingupvideo/growingupvideo | changed | schema 1 display, origin and discovery |
| community-feed:com.growsurf/growsurf | changed | schema 1 display, origin and discovery |
| community-feed:com.growthmak/growthmak | changed | schema 1 display, origin and discovery |
| community-feed:com.growthr/seo-geo-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gtm-api/linkedin-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gtmetrix/gtmetrix | changed | schema 1 display, origin and discovery |
| community-feed:com.guleki/geolocate-me | changed | schema 1 display, origin and discovery |
| community-feed:com.gummble/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.guruhotel/manager | changed | schema 1 display, origin and discovery |
| community-feed:com.guruhotel/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gurusup/gurusup | changed | schema 1 display, origin and discovery |
| community-feed:com.guruwalk/affiliates-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.guruwalk/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.gymnavigator/coach | dropped | authentication is required but the source declares no secret header |
| community-feed:com.hackforddata/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.halalterminal/mcp | dropped | SSE-only transport |
| community-feed:com.handsontable/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.hankookilbo.mcp/hankookilbo-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.hanyuguide/hanyuguide | changed | schema 1 display, origin and discovery |
| community-feed:com.happyscribe/happyscribe | changed | schema 1 display, origin and discovery |
| community-feed:com.hardlinephone/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.harukibox/harukibox | changed | schema 1 display, origin and discovery |
| community-feed:com.hatchable/hatchable | changed | schema 1 display, origin and discovery |
| community-feed:com.haveitprinted/print-and-mail | changed | schema 1 display, origin and discovery |
| community-feed:com.haycion/haycion | changed | schema 1 display, origin and discovery |
| community-feed:com.healthai/clarity | changed | schema 1 display, origin and discovery |
| community-feed:com.hebertmagic/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.hedgefundalpha/public-research | changed | schema 1 display, origin and discovery |
| community-feed:com.hedwig-ai/hedwig | changed | schema 1 display, origin and discovery |
| community-feed:com.heliciel/heliciel | changed | schema 1 display, origin and discovery |
| community-feed:com.hellobasestation/pdfkit | changed | schema 1 display, origin and discovery |
| community-feed:com.helloretail/hello-retail | changed | schema 1 display, origin and discovery |
| community-feed:com.helvabase/helvabase | changed | schema 1 display, origin and discovery |
| community-feed:com.hemelion/decision-reflection | changed | schema 1 display, origin and discovery |
| community-feed:com.hibot/hibot | changed | schema 1 display, origin and discovery |
| community-feed:com.hiddenswap/swap | changed | schema 1 display, origin and discovery |
| community-feed:com.hillsignal/hillsignalapp | changed | schema 1 display, origin and discovery |
| community-feed:com.himaxym/flightfinder-aviation-safety | changed | schema 1 display, origin and discovery |
| community-feed:com.hireahelper/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.hit-pay/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.hitsteps/analytics-operations | changed | schema 1 display, origin and discovery |
| community-feed:com.hjarni/hjarni | changed | schema 1 display, origin and discovery |
| community-feed:com.holydb/holydb-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.homeoceutics/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.homevisto/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.honen/honen | changed | schema 1 display, origin and discovery |
| community-feed:com.hooklistener/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.hoptodesk/dashboard | changed | schema 1 display, origin and discovery |
| community-feed:com.hosco/hospitality-jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.hotels-toulon-mer/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.hotelscasa/hotelscasa-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.hovercode/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.howgooditcanget/clarity-os | changed | schema 1 display, origin and discovery |
| community-feed:com.howtoreadthefuture/podcast | changed | schema 1 display, origin and discovery |
| community-feed:com.hproxy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.htagai/htag-docs | changed | schema 1 display, origin and discovery |
| community-feed:com.htagai/htag-intelligence | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.htagai/htag-spatial | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.html2img/html-to-image | changed | schema 1 display, origin and discovery |
| community-feed:com.httpstatus/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.huddlekit/huddlekit | changed | schema 1 display, origin and discovery |
| community-feed:com.humanuscrit/happ | changed | schema 1 display, origin and discovery |
| community-feed:com.hungry-esim/esim | changed | schema 1 display, origin and discovery |
| community-feed:com.hustlegotreal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.hutchdb/hutchdb | changed | schema 1 display, origin and discovery |
| community-feed:com.hutlists/hutlists | changed | schema 1 display, origin and discovery |
| community-feed:com.hydrata/hydrata-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.i-kanban/ikanban | changed | schema 1 display, origin and discovery |
| community-feed:com.ibipoint/esim-catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.ibkr/interactive-brokers-ibkr | changed | schema 1 display, origin and discovery |
| community-feed:com.iconic-expeditions/concierge | changed | schema 1 display, origin and discovery |
| community-feed:com.iconiccls/reserve | changed | schema 1 display, origin and discovery |
| community-feed:com.icons8/icons8 | changed | schema 1 display, origin and discovery |
| community-feed:com.idealo.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.idkrx/idkrx | changed | schema 1 display, origin and discovery |
| community-feed:com.ifa-wisdom/library | changed | schema 1 display, origin and discovery |
| community-feed:com.ifillpdf/pdf | changed | schema 1 display, origin and discovery |
| community-feed:com.ifthenpay/payments | changed | schema 1 display, origin and discovery |
| community-feed:com.ifttt/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.igdigi/igdigi | changed | schema 1 display, origin and discovery |
| community-feed:com.igods/gvt | changed | schema 1 display, origin and discovery |
| community-feed:com.igods/space-monkey | changed | schema 1 display, origin and discovery |
| community-feed:com.imbawallet/agent | changed | schema 1 display, origin and discovery |
| community-feed:com.imbawallet/agent-docs | changed | schema 1 display, origin and discovery |
| community-feed:com.imergea/ma-advisory | changed | schema 1 display, origin and discovery |
| community-feed:com.iminify/iminify | changed | schema 1 display, origin and discovery |
| community-feed:com.immersivecommons/floor10 | changed | schema 1 display, origin and discovery |
| community-feed:com.immo-spot/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.inclusifyapp/inclusify | changed | schema 1 display, origin and discovery |
| community-feed:com.incrediblefi/loan-marketplace | changed | schema 1 display, origin and discovery |
| community-feed:com.indiarestros/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.industry-lens/mcp-public | changed | schema 1 display, origin and discovery |
| community-feed:com.infectrisk/infectrisk | changed | schema 1 display, origin and discovery |
| community-feed:com.inflyu/inflyu | changed | schema 1 display, origin and discovery |
| community-feed:com.infoaddict/public-site | changed | schema 1 display, origin and discovery |
| community-feed:com.infosecjobboard/jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.infotech-crm/infotech-crm | changed | schema 1 display, origin and discovery |
| community-feed:com.infumar/advertiser | changed | schema 1 display, origin and discovery |
| community-feed:com.inkfe/print | changed | schema 1 display, origin and discovery |
| community-feed:com.insta-pola/photo-gallery | changed | schema 1 display, origin and discovery |
| community-feed:com.instapods/instapods | changed | schema 1 display, origin and discovery |
| community-feed:com.instatus/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.insyncanalytics.ai-mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.intakra/buying-signal-review | changed | schema 1 display, origin and discovery |
| community-feed:com.intencheck/intencheck | changed | schema 1 display, origin and discovery |
| community-feed:com.intermind/intermind | changed | schema 1 display, origin and discovery |
| community-feed:com.interzoid/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.invoicexml/invoicexml | changed | schema 1 display, origin and discovery |
| community-feed:com.invompt/invompt | changed | schema 1 display, origin and discovery |
| community-feed:com.ip99/ip99 | changed | schema 1 display, origin and discovery |
| community-feed:com.ipogrid/ipogrid | changed | schema 1 display, origin and discovery |
| community-feed:com.ironfang/ironfang | changed | schema 1 display, origin and discovery |
| community-feed:com.ismalicious/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.iso20022generator/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ispyconnect/agentdvr | changed | schema 1 display, origin and discovery |
| community-feed:com.it-schulungen/seminare | changed | schema 1 display, origin and discovery |
| community-feed:com.it.justclaw/justclaw-it | changed | schema 1 display, origin and discovery |
| community-feed:com.it.scorptech/x402 | changed | schema 1 display, origin and discovery |
| community-feed:com.iterruptivo.ecodashboard/ecoplaza-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ithy/research-library | changed | schema 1 display, origin and discovery |
| community-feed:com.itsbaba/hebrewcore | changed | schema 1 display, origin and discovery |
| community-feed:com.ivisa.www/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.iwonder/iwonder | changed | schema 1 display, origin and discovery |
| community-feed:com.izhost/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.jakehandy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.jamesprompt/james | changed | schema 1 display, origin and discovery |
| community-feed:com.jampolls.hub/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.jeikin/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.jellypod/jellypod | changed | schema 1 display, origin and discovery |
| community-feed:com.jenesistravel/travel | changed | schema 1 display, origin and discovery |
| community-feed:com.jenniferrebholz/rebholz-attorney | changed | schema 1 display, origin and discovery |
| community-feed:com.jenriks/photo-archive | changed | schema 1 display, origin and discovery |
| community-feed:com.jitsu/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.jittee/splitbill | changed | schema 1 display, origin and discovery |
| community-feed:com.jobcrawls/connector | changed | schema 1 display, origin and discovery |
| community-feed:com.jobkeepr/jobkeepr | changed | schema 1 display, origin and discovery |
| community-feed:com.jobyap/jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.johnsessentials/johns-essentials | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.joinnod/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.joinsandwich/directory | changed | schema 1 display, origin and discovery |
| community-feed:com.jonathanarvay/axis-avatar-foundry | changed | schema 1 display, origin and discovery |
| community-feed:com.jpyc-service/ec-storefront | changed | schema 1 display, origin and discovery |
| community-feed:com.jumpcloud/jumpcloud-genai | changed | schema 1 display, origin and discovery |
| community-feed:com.jumper-health/jumper-health | changed | schema 1 display, origin and discovery |
| community-feed:com.jumpseller/admin-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.jupiterinvoice/server | changed | schema 1 display, origin and discovery |
| community-feed:com.justinmckelvey/ai-visibility-check | changed | schema 1 display, origin and discovery |
| community-feed:com.jyotishintelligence/sealed-forecasts | changed | schema 1 display, origin and discovery |
| community-feed:com.k-phi/kphi | changed | schema 1 display, origin and discovery |
| community-feed:com.kaalshodh/kaalshodh | changed | schema 1 display, origin and discovery |
| community-feed:com.kajabi/kajabi | changed | schema 1 display, origin and discovery |
| community-feed:com.kanbanthing/kanban | changed | schema 1 display, origin and discovery |
| community-feed:com.kapruka/kapruka-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.kari/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.karusele/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.kasahorow/kasahorow | changed | schema 1 display, origin and discovery |
| community-feed:com.kazejev/profile | changed | schema 1 display, origin and discovery |
| community-feed:com.kdandoc.mcp/kdan-pdf-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.keboola/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.keenethics-labs/mindmap | changed | schema 1 display, origin and discovery |
| community-feed:com.keenethics-labs/well-being-check | changed | schema 1 display, origin and discovery |
| community-feed:com.keenielts/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.keepmysubs/keepmysubs | changed | schema 1 display, origin and discovery |
| community-feed:com.kema-studio/invoice | changed | schema 1 display, origin and discovery |
| community-feed:com.kenoodl/verify | changed | schema 1 display, origin and discovery |
| community-feed:com.kettlelogic/mcp-kettlelogic | changed | schema 1 display, origin and discovery |
| community-feed:com.keywordise/keywordise | changed | schema 1 display, origin and discovery |
| community-feed:com.keywordseverywhere/keywords-everywhere | changed | schema 1 display, origin and discovery |
| community-feed:com.kimchi-sushi/agent-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.kimoun/spip | changed | schema 1 display, origin and discovery |
| community-feed:com.kindwise/agents | changed | schema 1 display, origin and discovery |
| community-feed:com.kineticist/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.kiprarent/kipra-rent-a-car | changed | schema 1 display, origin and discovery |
| community-feed:com.kiuli/kiuli | changed | schema 1 display, origin and discovery |
| community-feed:com.klarefi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.kliptools/youtube-subtitles | changed | schema 1 display, origin and discovery |
| community-feed:com.knotrik/knotrik | changed | schema 1 display, origin and discovery |
| community-feed:com.konbiniapi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.konghq/konnect | changed | schema 1 display, origin and discovery |
| community-feed:com.koongo/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.kordiapp/kordi-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.korture/hiring | changed | schema 1 display, origin and discovery |
| community-feed:com.kpidepot/kpi-depot | changed | schema 1 display, origin and discovery |
| community-feed:com.kratons/public | changed | schema 1 display, origin and discovery |
| community-feed:com.kresmion/kresmion | changed | schema 1 display, origin and discovery |
| community-feed:com.ksaworks/goldseam | changed | schema 1 display, origin and discovery |
| community-feed:com.ktrenz/kdata | changed | schema 1 display, origin and discovery |
| community-feed:com.kurdishtts/kurdish-tts-stt | changed | schema 1 display, origin and discovery |
| community-feed:com.kymaapi/kyma | changed | schema 1 display, origin and discovery |
| community-feed:com.la-truite/resort | changed | schema 1 display, origin and discovery |
| community-feed:com.laddro/career | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.lakpura/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.landingconnect/landingconnect | changed | schema 1 display, origin and discovery |
| community-feed:com.langbly/translation | changed | schema 1 display, origin and discovery |
| community-feed:com.laraue/boards | changed | schema 1 display, origin and discovery |
| community-feed:com.lassare/ask | changed | schema 1 display, origin and discovery |
| community-feed:com.lawstronaut/lawstronaut-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.lazynext/accessibility-checker | changed | schema 1 display, origin and discovery |
| community-feed:com.lazyweb/discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.lazyweb/lazyweb | changed | schema 1 display, origin and discovery |
| community-feed:com.leadboxer.mcp/leadboxer | changed | schema 1 display, origin and discovery |
| community-feed:com.leadfriendly/lead-friendly | dropped | authentication is required but the source declares no secret header |
| community-feed:com.leadfriendly/lead-friendly-info | changed | schema 1 display, origin and discovery |
| community-feed:com.leadpages/leadpages-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.leadrecorder/lead-recorder | changed | schema 1 display, origin and discovery |
| community-feed:com.leadsapp/leadsapp | changed | schema 1 display, origin and discovery |
| community-feed:com.leagueofspin/spots | changed | schema 1 display, origin and discovery |
| community-feed:com.leap-labs/discovery-engine | changed | schema 1 display, origin and discovery |
| community-feed:com.leapmemory/memory | changed | schema 1 display, origin and discovery |
| community-feed:com.ledgerbeaver/finance | changed | schema 1 display, origin and discovery |
| community-feed:com.leewaystudio/code-synapse | changed | schema 1 display, origin and discovery |
| community-feed:com.legaion/verifier | changed | schema 1 display, origin and discovery |
| community-feed:com.legalaimcp/directory | changed | schema 1 display, origin and discovery |
| community-feed:com.legendsoflearning.app/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.legitfit/legitfit | changed | schema 1 display, origin and discovery |
| community-feed:com.lemonvite/lemonvite | changed | schema 1 display, origin and discovery |
| community-feed:com.lenderprice/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.lessmeeting/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.letshum/internet-availability | changed | schema 1 display, origin and discovery |
| community-feed:com.lezzoo/lezzoo | changed | schema 1 display, origin and discovery |
| community-feed:com.liedetectortest/lie-detector-test | changed | schema 1 display, origin and discovery |
| community-feed:com.lifelongedge/edge-lab | changed | schema 1 display, origin and discovery |
| community-feed:com.lifttrackapp/lifttrack | dropped | authentication is required but the source declares no secret header |
| community-feed:com.lilla-alva/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.lillytechsystems/ai-school | changed | schema 1 display, origin and discovery |
| community-feed:com.limrun/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.limzo/telegram-group-stats | changed | schema 1 display, origin and discovery |
| community-feed:com.linatora/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.liner/search | changed | schema 1 display, origin and discovery |
| community-feed:com.linklyhq/linkly | changed | schema 1 display, origin and discovery |
| community-feed:com.listprelo/prelo | changed | schema 1 display, origin and discovery |
| community-feed:com.listsignal/listsignal | changed | schema 1 display, origin and discovery |
| community-feed:com.livereacting/livereacting | changed | schema 1 display, origin and discovery |
| community-feed:com.liz6/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.loc8id/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.local-mcp/local-mcp#npm:local-mcp | dropped | package environment is not a declared secret reference |
| community-feed:com.local-mcp/local-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.lockally/email | changed | schema 1 display, origin and discovery |
| community-feed:com.lodikidsactivities/lodi-kids-activities | changed | schema 1 display, origin and discovery |
| community-feed:com.logokit/brand-data | changed | schema 1 display, origin and discovery |
| community-feed:com.longbridge/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.loomascale/ads | changed | schema 1 display, origin and discovery |
| community-feed:com.loopgantt/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.loopingagent/loopingagent-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.loopwise/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.loppix/catalog-configuration | changed | schema 1 display, origin and discovery |
| community-feed:com.lorensaisolutions.preflight/agent-preflight | changed | schema 1 display, origin and discovery |
| community-feed:com.lotsofsounds/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.lowerscript/prices | changed | schema 1 display, origin and discovery |
| community-feed:com.lowtoxgear/scanner | changed | schema 1 display, origin and discovery |
| community-feed:com.lowtoxgear/storefront | changed | schema 1 display, origin and discovery |
| community-feed:com.lowvyn/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.loxoneai/loxone-ai | changed | schema 1 display, origin and discovery |
| community-feed:com.lucernanoetica/lucerna | changed | schema 1 display, origin and discovery |
| community-feed:com.lucidrents/building-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.lumethic/verify | changed | schema 1 display, origin and discovery |
| community-feed:com.lunaraastro/natal-chart | changed | schema 1 display, origin and discovery |
| community-feed:com.lunarwerx/lunarwerx | changed | schema 1 display, origin and discovery |
| community-feed:com.luneresearch/lune | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.lunoo/rankings | changed | schema 1 display, origin and discovery |
| community-feed:com.lusha.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.lutolearn/myaitwin | changed | schema 1 display, origin and discovery |
| community-feed:com.lvlltd/skill-market | changed | schema 1 display, origin and discovery |
| community-feed:com.lvlupauto/vendor-catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.lyssna/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.maatsii/linreg | changed | schema 1 display, origin and discovery |
| community-feed:com.mabl/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.macroaxis/macroaxis-api | changed | schema 1 display, origin and discovery |
| community-feed:com.maileroo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mailinapp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mailrith/mailrith | changed | schema 1 display, origin and discovery |
| community-feed:com.mailtester/email-verification | changed | schema 1 display, origin and discovery |
| community-feed:com.make/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.makespdf/makespdf | changed | schema 1 display, origin and discovery |
| community-feed:com.makeupar/beauty | changed | schema 1 display, origin and discovery |
| community-feed:com.makeupar/creators | changed | schema 1 display, origin and discovery |
| community-feed:com.makeupar/fashion | changed | schema 1 display, origin and discovery |
| community-feed:com.managelm/managelm | changed | schema 1 display, origin and discovery |
| community-feed:com.mapltours/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.mapmelon/mapmelon | changed | schema 1 display, origin and discovery |
| community-feed:com.mareaalcalina/storefront | changed | schema 1 display, origin and discovery |
| community-feed:com.margeoapp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mariadb/mariadb-docs | changed | schema 1 display, origin and discovery |
| community-feed:com.market-graphs/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.marketcaper/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.marketcheck/api | changed | schema 1 display, origin and discovery |
| community-feed:com.marketcheck/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.marketcheck/marketcheck-ai-reports | changed | schema 1 display, origin and discovery |
| community-feed:com.markifact/google-ads | changed | schema 1 display, origin and discovery |
| community-feed:com.markifact/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.markifact/meta-ads | changed | schema 1 display, origin and discovery |
| community-feed:com.markmesh/trademarks | changed | schema 1 display, origin and discovery |
| community-feed:com.markustenghamn/site | changed | schema 1 display, origin and discovery |
| community-feed:com.marleyfetch/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.master-setter/pokemon-tcg | changed | schema 1 display, origin and discovery |
| community-feed:com.matchoffice/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.materialscodegraph/mcg | changed | schema 1 display, origin and discovery |
| community-feed:com.mathieuberthet/mb-mastering | changed | schema 1 display, origin and discovery |
| community-feed:com.matterfact/matterfact | changed | schema 1 display, origin and discovery |
| community-feed:com.maximofn/content | changed | schema 1 display, origin and discovery |
| community-feed:com.mcpcalc/calculator | changed | schema 1 display, origin and discovery |
| community-feed:com.mcpweave/gateway | changed | schema 1 display, origin and discovery |
| community-feed:com.measuretechpro/agent-door | changed | schema 1 display, origin and discovery |
| community-feed:com.med-dent24/shop-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.medianfi/books | changed | schema 1 display, origin and discovery |
| community-feed:com.medianfi/compliance | changed | schema 1 display, origin and discovery |
| community-feed:com.medigami/chatgpt | changed | schema 1 display, origin and discovery |
| community-feed:com.medigami/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.medplum/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.medrecpro/drug-label-server | changed | schema 1 display, origin and discovery |
| community-feed:com.medusajs/cloud | changed | schema 1 display, origin and discovery |
| community-feed:com.medusajs/medusa-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.meetergo/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.meetsponsors/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.meistertask/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mellowmountainradio.mcp/kazm | changed | schema 1 display, origin and discovery |
| community-feed:com.melvea/local-discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.memesio/meme-generator | changed | schema 1 display, origin and discovery |
| community-feed:com.memoryplugin/memory | changed | schema 1 display, origin and discovery |
| community-feed:com.mentiondrop/mentiondrop | changed | schema 1 display, origin and discovery |
| community-feed:com.mentioned-on/ai-discovery-readiness | changed | schema 1 display, origin and discovery |
| community-feed:com.mentionkit/social-listening | changed | schema 1 display, origin and discovery |
| community-feed:com.meowapps/ai-engine | changed | schema 1 display, origin and discovery |
| community-feed:com.merchantwords/merchantwords | changed | schema 1 display, origin and discovery |
| community-feed:com.merchsage/sponsors | changed | schema 1 display, origin and discovery |
| community-feed:com.meridiantrace/medical-device-registrations | changed | schema 1 display, origin and discovery |
| community-feed:com.merlonix/monitoring | changed | schema 1 display, origin and discovery |
| community-feed:com.mermaidchart/mermaid-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.meshkore/meshkore | changed | schema 1 display, origin and discovery |
| community-feed:com.meta-council/decision-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.metalminer/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.metaltakip/digest | changed | schema 1 display, origin and discovery |
| community-feed:com.meteosource/weather | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.metricspot/seo-mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.michaelghelfistudios/toolbox | changed | schema 1 display, origin and discovery |
| community-feed:com.microsoft/azure#npm:%40azure%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.microsoft/dataverse#npm:%40microsoft%2Fdataverse | dropped | Its command needs values you choose. |
| community-feed:com.microsoft/microsoft-fabric#npm:%40microsoft%2Ffabric-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.microsoft/powerbi-modeling-mcp#npm:%40microsoft%2Fpowerbi-modeling-mcp | dropped | Its command needs values you choose. |
| community-feed:com.midvash/bible | changed | schema 1 display, origin and discovery |
| community-feed:com.milotche/carre-de-sable | changed | schema 1 display, origin and discovery |
| community-feed:com.mimikflow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.minddory/brain | changed | schema 1 display, origin and discovery |
| community-feed:com.mindmeister/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mindtheproduct/knowledge | changed | schema 1 display, origin and discovery |
| community-feed:com.minkapp/mink | changed | schema 1 display, origin and discovery |
| community-feed:com.mintlify/adminmcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mintlify/searchmcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mobbin/mobbin | changed | schema 1 display, origin and discovery |
| community-feed:com.mobile-text-alerts/sms-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mobopinions/survey-light | changed | schema 1 display, origin and discovery |
| community-feed:com.mocoapp.api/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.modmillennialdesigns/modmillennialdesigns | changed | schema 1 display, origin and discovery |
| community-feed:com.mographr/motion-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.mojalab/content | changed | schema 1 display, origin and discovery |
| community-feed:com.moltbotden/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.moltravel/travel | changed | schema 1 display, origin and discovery |
| community-feed:com.momenticmarketing/momentic | changed | schema 1 display, origin and discovery |
| community-feed:com.monday/monday.com | changed | schema 1 display, origin and discovery |
| community-feed:com.moregoodreviews/project | changed | schema 1 display, origin and discovery |
| community-feed:com.mosadd/mosadd-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mosaiden/souq | changed | schema 1 display, origin and discovery |
| community-feed:com.mostrecommendedbooks/books | changed | schema 1 display, origin and discovery |
| community-feed:com.mothership/mothership | changed | schema 1 display, origin and discovery |
| community-feed:com.movingplace/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mozilladatacollective/datasets | changed | schema 1 display, origin and discovery |
| community-feed:com.mozonic/mozonic | changed | schema 1 display, origin and discovery |
| community-feed:com.mrtrades/desk | changed | schema 1 display, origin and discovery |
| community-feed:com.msg91.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mttrly/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mubert/cast | changed | schema 1 display, origin and discovery |
| community-feed:com.mubert/music | changed | schema 1 display, origin and discovery |
| community-feed:com.mudko/agent-ready-kit | changed | schema 1 display, origin and discovery |
| community-feed:com.mudko/onramperx | changed | schema 1 display, origin and discovery |
| community-feed:com.mukoko/nhimbe-events | changed | schema 1 display, origin and discovery |
| community-feed:com.multi-upload-tool/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.multicinesortega/cartelera | changed | schema 1 display, origin and discovery |
| community-feed:com.multilipi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.multilo/multilo | changed | schema 1 display, origin and discovery |
| community-feed:com.multyplylabs/sec-fundamentals | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.muninx/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.musicboxmelodies/music-box | changed | schema 1 display, origin and discovery |
| community-feed:com.musokit/musokit | changed | schema 1 display, origin and discovery |
| community-feed:com.mustertheforce/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.mux/mcp#npm:%40mux%2Fmcp | dropped | streamable HTTPS remote preferred |
| community-feed:com.mux/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.muzecmo/ecommerce-ads | changed | schema 1 display, origin and discovery |
| community-feed:com.mybankstatementanalysis/bank-statements | changed | schema 1 display, origin and discovery |
| community-feed:com.mybiblecopilot/bible-copilot | changed | schema 1 display, origin and discovery |
| community-feed:com.mycardfolio/cards | changed | schema 1 display, origin and discovery |
| community-feed:com.myclawn/desktop | changed | schema 1 display, origin and discovery |
| community-feed:com.myhuiban.www/conference-partner | changed | schema 1 display, origin and discovery |
| community-feed:com.myinfluenceai/agents | dropped | authentication is required but the source declares no secret header |
| community-feed:com.myinsurebank/mib | changed | schema 1 display, origin and discovery |
| community-feed:com.mysherah/sherah | changed | schema 1 display, origin and discovery |
| community-feed:com.mystoq/storefront | changed | schema 1 display, origin and discovery |
| community-feed:com.mythsensus/mythsensus-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.nahook/nahook | changed | schema 1 display, origin and discovery |
| community-feed:com.naibul/board-game-hall | changed | schema 1 display, origin and discovery |
| community-feed:com.nalpeiron.docs/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.namebrewery/domain-checker | changed | schema 1 display, origin and discovery |
| community-feed:com.namestation/namestation | changed | schema 1 display, origin and discovery |
| community-feed:com.narrowhighway/concordance | changed | schema 1 display, origin and discovery |
| community-feed:com.natalcompass/connector | changed | schema 1 display, origin and discovery |
| community-feed:com.nearbypermits/permits | changed | schema 1 display, origin and discovery |
| community-feed:com.negativeev/bet-checker | changed | schema 1 display, origin and discovery |
| community-feed:com.neilpatelapi/ubersuggest | changed | schema 1 display, origin and discovery |
| community-feed:com.neptunecigar/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.nestjs/observe | changed | schema 1 display, origin and discovery |
| community-feed:com.netapi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.netentropyscore/coherence-signal | changed | schema 1 display, origin and discovery |
| community-feed:com.netfiscus/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.netmon/netmon-demo | changed | schema 1 display, origin and discovery |
| community-feed:com.neuhausre/austin-mls | changed | schema 1 display, origin and discovery |
| community-feed:com.neurarelay/relay-mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.neurobird/search | changed | schema 1 display, origin and discovery |
| community-feed:com.neuroflash/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.neuronto/agents-tools-search-discovery-ard-registry | changed | schema 1 display, origin and discovery |
| community-feed:com.newrelic/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.newscatcherapi/catchall | changed | schema 1 display, origin and discovery |
| community-feed:com.newsmcp/newsmcp | changed | schema 1 display, origin and discovery |
| community-feed:com.nexqual/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.nexus-catalyst/nexus-catalyst | changed | schema 1 display, origin and discovery |
| community-feed:com.ngrok/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.niftypm/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.nilyo/nilyo | changed | schema 1 display, origin and discovery |
| community-feed:com.nimble.app/nimble-crm | changed | schema 1 display, origin and discovery |
| community-feed:com.nimcoffee/nimcoffee | changed | schema 1 display, origin and discovery |
| community-feed:com.nirvanahq/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.niubiagent/niubiagent | changed | schema 1 display, origin and discovery |
| community-feed:com.nlqdb/nlqdb | changed | schema 1 display, origin and discovery |
| community-feed:com.nobleblocks/nobleblocks-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.nocodeexits/nocodeexits | changed | schema 1 display, origin and discovery |
| community-feed:com.nocompensation/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.noctaracorp/pupul | changed | schema 1 display, origin and discovery |
| community-feed:com.nomadforecast/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.nomads/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.nombrio/name-check | changed | schema 1 display, origin and discovery |
| community-feed:com.nomior/invest | changed | schema 1 display, origin and discovery |
| community-feed:com.nomnaviet/han-nom | changed | schema 1 display, origin and discovery |
| community-feed:com.nontoxicnook/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.nooticr/mcp#npm:%40nooticr%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.notemcp/notemcp | changed | schema 1 display, origin and discovery |
| community-feed:com.notion/mcp | merged | duplicate connection or content; kept as docker:notion-remote |
| community-feed:com.nourishvedha/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.npledger/np-ledger | changed | schema 1 display, origin and discovery |
| community-feed:com.ntop/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.nuasense/agri-data | changed | schema 1 display, origin and discovery |
| community-feed:com.nuditok/nuditok | changed | schema 1 display, origin and discovery |
| community-feed:com.nuelink/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.numezis/numezis | changed | schema 1 display, origin and discovery |
| community-feed:com.nusii/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.nvidia.ngc.nsight.copilot.api/cuda-docs | changed | schema 1 display, origin and discovery |
| community-feed:com.nyxory/nyxory | changed | schema 1 display, origin and discovery |
| community-feed:com.o11r/daleel | changed | schema 1 display, origin and discovery |
| community-feed:com.obligationsign.mcp/agts-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.obsmetrics.paygent/agents | changed | schema 1 display, origin and discovery |
| community-feed:com.oceanbuilders/inventory | changed | schema 1 display, origin and discovery |
| community-feed:com.octolens/octolens | changed | schema 1 display, origin and discovery |
| community-feed:com.octoparse/octoparse-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.octurasolutions/site-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.odooconsole/odoo | changed | schema 1 display, origin and discovery |
| community-feed:com.ogenalabs/gate402-x402 | changed | schema 1 display, origin and discovery |
| community-feed:com.ogenalabs/signals-edge-x402 | changed | schema 1 display, origin and discovery |
| community-feed:com.ogenalabs/token-risk-x402 | changed | schema 1 display, origin and discovery |
| community-feed:com.oheyinc/ringmaster | changed | schema 1 display, origin and discovery |
| community-feed:com.oldcarsdata/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.olympus-bets/olympus-bets-analytics | changed | schema 1 display, origin and discovery |
| community-feed:com.omnara/omnara | changed | schema 1 display, origin and discovery |
| community-feed:com.omniwatchguard/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ondacast/ondacast | changed | schema 1 display, origin and discovery |
| community-feed:com.oneaiguide/public-catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.oneheartesim.mcp/esim | changed | schema 1 display, origin and discovery |
| community-feed:com.onepagecrm/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ones/ones | dropped | authentication is required but the source declares no secret header |
| community-feed:com.onestori/stori | changed | schema 1 display, origin and discovery |
| community-feed:com.oneuedu.mcp/oneu-education | changed | schema 1 display, origin and discovery |
| community-feed:com.oneuptime/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.onkernel/kernel-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.onlinecomponents/onlinecomponents-search | changed | schema 1 display, origin and discovery |
| community-feed:com.onlineshippingcalculator/shipping-rates | changed | schema 1 display, origin and discovery |
| community-feed:com.only-mcp/onlymcp#npm:onlymcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.onlyworlds/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.opedd/opedd-mcp#npm:opedd-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.openagenda/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.opencase/opencase | changed | schema 1 display, origin and discovery |
| community-feed:com.openlaborproject/auto-repair | changed | schema 1 display, origin and discovery |
| community-feed:com.openpublica/civic-meetings | changed | schema 1 display, origin and discovery |
| community-feed:com.openrevenue/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.openwakeword/wake-word-training | changed | schema 1 display, origin and discovery |
| community-feed:com.openworklabs/openwork | changed | schema 1 display, origin and discovery |
| community-feed:com.opslevel/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.optionsanalysissuite/options-analysis-suite-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.opuslumiere/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.orangescrum/orangescrum-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.organikpi/organikpi | changed | schema 1 display, origin and discovery |
| community-feed:com.origineparis/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.orioralabs/router | changed | schema 1 display, origin and discovery |
| community-feed:com.osboon/osboon | changed | schema 1 display, origin and discovery |
| community-feed:com.oshyn/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.osir/domain-registrar | changed | schema 1 display, origin and discovery |
| community-feed:com.ottotheagent/otto-travel | changed | schema 1 display, origin and discovery |
| community-feed:com.ou-reports/just-signal | changed | schema 1 display, origin and discovery |
| community-feed:com.outreach2day/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.overskill/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.oviond/oviond | changed | schema 1 display, origin and discovery |
| community-feed:com.ovrsea.mcp/customer-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.owlgrouptrading/indicator-code | changed | schema 1 display, origin and discovery |
| community-feed:com.pacelabintervals/workouts | changed | schema 1 display, origin and discovery |
| community-feed:com.pachca/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.packagento/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pactlio/contracts | changed | schema 1 display, origin and discovery |
| community-feed:com.paddle/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.paddle/mcp-sandbox | dropped | authentication is required but the source declares no secret header |
| community-feed:com.padlet/padlet | changed | schema 1 display, origin and discovery |
| community-feed:com.pageproofer/pageproofer | changed | schema 1 display, origin and discovery |
| community-feed:com.pakistancaselaw/caselaw | changed | schema 1 display, origin and discovery |
| community-feed:com.palaner/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pally/pally | changed | schema 1 display, origin and discovery |
| community-feed:com.pandadoc.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pandavideo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pantryaide/pantry-aide | changed | schema 1 display, origin and discovery |
| community-feed:com.pantrypersona/pantry-persona | changed | schema 1 display, origin and discovery |
| community-feed:com.paperswithbacktest/papers-with-backtest | changed | schema 1 display, origin and discovery |
| community-feed:com.parad1gm/prism | changed | schema 1 display, origin and discovery |
| community-feed:com.parallaxvinc/parallax | changed | schema 1 display, origin and discovery |
| community-feed:com.paramountls/loan-application | changed | schema 1 display, origin and discovery |
| community-feed:com.parclick/parking | changed | schema 1 display, origin and discovery |
| community-feed:com.parkinzi/parkinzi | changed | schema 1 display, origin and discovery |
| community-feed:com.parlel/parlel | changed | schema 1 display, origin and discovery |
| community-feed:com.parseapi/mcp#npm:parseapi-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.parseium/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.parsely.dash/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.parsestream/parsestream | dropped | authentication is required but the source declares no secret header |
| community-feed:com.passportcraft/dpp-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pawlisty/pet-listings | changed | schema 1 display, origin and discovery |
| community-feed:com.paypal.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.payrent/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.paytm.travel/discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.paywithlocus/locus | changed | schema 1 display, origin and discovery |
| community-feed:com.pcblt/pcblt | changed | schema 1 display, origin and discovery |
| community-feed:com.pdf-redaction/pdf-redaction-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pdfia/pdf-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.peek/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.peerpush/peerpush | changed | schema 1 display, origin and discovery |
| community-feed:com.pentest-tools/mcp-server | dropped | authentication is required but the source declares no secret header |
| community-feed:com.peopleanalyst/discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.peopleanalyticstoolbox/toolbox | changed | schema 1 display, origin and discovery |
| community-feed:com.peoplecanbuild/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.peopleprincipia/principia | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.peppolstatus/api | changed | schema 1 display, origin and discovery |
| community-feed:com.perpfinder/perpfinder | changed | schema 1 display, origin and discovery |
| community-feed:com.persimmonhq/persimmon | changed | schema 1 display, origin and discovery |
| community-feed:com.personyze/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.persuadioai/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.petabloom/podcasts | changed | schema 1 display, origin and discovery |
| community-feed:com.pexafy/pexafy-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.phasefolio/phasefolio | changed | schema 1 display, origin and discovery |
| community-feed:com.phone-mcp/phonemcp-mcp-server | dropped | SSE-only transport |
| community-feed:com.photoaistudio/photo-ai-studio | changed | schema 1 display, origin and discovery |
| community-feed:com.phronesisintel/phronesis-hermes | changed | schema 1 display, origin and discovery |
| community-feed:com.pickadive/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pickfu/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pickshade/pickshade | changed | schema 1 display, origin and discovery |
| community-feed:com.picsart.api/gen-ai | changed | schema 1 display, origin and discovery |
| community-feed:com.pikasim/pikasim | changed | schema 1 display, origin and discovery |
| community-feed:com.pillargtm/gtm-os | changed | schema 1 display, origin and discovery |
| community-feed:com.pilot.meridian/qbo-connector | changed | schema 1 display, origin and discovery |
| community-feed:com.pilot.meridian/xero-connector | changed | schema 1 display, origin and discovery |
| community-feed:com.pilotplans/hotels | changed | schema 1 display, origin and discovery |
| community-feed:com.pinappai/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pinch-app/grocery | changed | schema 1 display, origin and discovery |
| community-feed:com.pinnodds/odds | changed | schema 1 display, origin and discovery |
| community-feed:com.pinoyshki/bakery | changed | schema 1 display, origin and discovery |
| community-feed:com.pipe0/pipe0 | changed | schema 1 display, origin and discovery |
| community-feed:com.piratefly/flight-deals | changed | schema 1 display, origin and discovery |
| community-feed:com.pixelixe/pixelixe-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.platequery/plate-api | changed | schema 1 display, origin and discovery |
| community-feed:com.playbook/playbook | changed | schema 1 display, origin and discovery |
| community-feed:com.playcallerapp/mcp | dropped | Its address needs values you choose. Add it under Custom. |
| community-feed:com.playgama/developer-cabinet | changed | schema 1 display, origin and discovery |
| community-feed:com.plodovi/shop | changed | schema 1 display, origin and discovery |
| community-feed:com.po6/mailbox | changed | schema 1 display, origin and discovery |
| community-feed:com.pocketsmith/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.pocketsmith/mcp-readonly | changed | schema 1 display, origin and discovery |
| community-feed:com.podmule/podmule | changed | schema 1 display, origin and discovery |
| community-feed:com.point-topic/point-topic-mcp-public | changed | schema 1 display, origin and discovery |
| community-feed:com.pointbagel/pointbagel | changed | schema 1 display, origin and discovery |
| community-feed:com.pointifytravels/travel | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.pokerink/poker-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.policylayer/registry | changed | schema 1 display, origin and discovery |
| community-feed:com.politicalcomms/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.pollunit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.polytranslator/translator | changed | schema 1 display, origin and discovery |
| community-feed:com.pondchat/pondchat | changed | schema 1 display, origin and discovery |
| community-feed:com.ponito/product-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.porkbun/mcp#npm:%40porkbunllc%2Fmcp-server | dropped | streamable HTTPS remote preferred |
| community-feed:com.porkbun/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.portscan/port-scanner | changed | schema 1 display, origin and discovery |
| community-feed:com.post-mesh/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.post-pulse/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.postalform/postalform | changed | schema 1 display, origin and discovery |
| community-feed:com.postassembly/post-assembly | changed | schema 1 display, origin and discovery |
| community-feed:com.postboxservices/postbox-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.postman/postman-mcp-server#npm:%40postman%2Fpostman-mcp-server | dropped | streamable HTTPS remote preferred |
| community-feed:com.postman/postman-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.powerstationplatform/powerstation | changed | schema 1 display, origin and discovery |
| community-feed:com.ppn-hub/ppn-hub | changed | schema 1 display, origin and discovery |
| community-feed:com.pptdepot/pptdepot | changed | schema 1 display, origin and discovery |
| community-feed:com.pptogo/pptogo | changed | schema 1 display, origin and discovery |
| community-feed:com.predictleads/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.predixsport/sports-predictions | changed | schema 1 display, origin and discovery |
| community-feed:com.premierletters/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.primecutsnursery/public-data | changed | schema 1 display, origin and discovery |
| community-feed:com.printfriendly/printfriendly | dropped | authentication is required but the source declares no secret header |
| community-feed:com.printhiv3d/print-hive | changed | schema 1 display, origin and discovery |
| community-feed:com.printinglabs/printing-labs | changed | schema 1 display, origin and discovery |
| community-feed:com.prismposter/creator-tools#npm:%40prismposter%2Fcreator-tools | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.prizmad/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.productclank/productclank | changed | schema 1 display, origin and discovery |
| community-feed:com.productionlist/production-list | changed | schema 1 display, origin and discovery |
| community-feed:com.produktly/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.profitpather/analytics | changed | schema 1 display, origin and discovery |
| community-feed:com.proflightsearch/airport-delays | changed | schema 1 display, origin and discovery |
| community-feed:com.programacionsiemens/blog-cursos | changed | schema 1 display, origin and discovery |
| community-feed:com.programme-tv-noel/telefilms | changed | schema 1 display, origin and discovery |
| community-feed:com.projectfingerprint/personal-context | changed | schema 1 display, origin and discovery |
| community-feed:com.projectpaced/timeline | changed | schema 1 display, origin and discovery |
| community-feed:com.projectthunder/site | changed | schema 1 display, origin and discovery |
| community-feed:com.promotionpros/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.promptbase/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.promptfrenzy/promptfrenzy | changed | schema 1 display, origin and discovery |
| community-feed:com.promptot/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.promtpress/ads | changed | schema 1 display, origin and discovery |
| community-feed:com.proscendia/google-workspace | changed | schema 1 display, origin and discovery |
| community-feed:com.proscendia/microsoft-365 | changed | schema 1 display, origin and discovery |
| community-feed:com.prowlo/reddit-x | changed | schema 1 display, origin and discovery |
| community-feed:com.proxycove/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.proz/remoto | changed | schema 1 display, origin and discovery |
| community-feed:com.pruviq/verdicts | changed | schema 1 display, origin and discovery |
| community-feed:com.publicwww/publicwww | changed | schema 1 display, origin and discovery |
| community-feed:com.publora/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.purchaseplus/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.purplegrain/api | changed | schema 1 display, origin and discovery |
| community-feed:com.puter/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.pv-solaire-energie/devis-solaire | changed | schema 1 display, origin and discovery |
| community-feed:com.pyloapp/pylo | changed | schema 1 display, origin and discovery |
| community-feed:com.pythonanywhere.conclavex402/conclave-agent-rails | changed | schema 1 display, origin and discovery |
| community-feed:com.pythonanywhere.conclavex402p04/conclave-agent-rails | changed | schema 1 display, origin and discovery |
| community-feed:com.qarera/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.qmailing/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.qorpiq/mca | changed | schema 1 display, origin and discovery |
| community-feed:com.qr-top/qr-top | changed | schema 1 display, origin and discovery |
| community-feed:com.qrcodekit/qrcodekit | changed | schema 1 display, origin and discovery |
| community-feed:com.qretro/retro | changed | schema 1 display, origin and discovery |
| community-feed:com.qruuk/qruuk | changed | schema 1 display, origin and discovery |
| community-feed:com.qsimhealth/public | changed | schema 1 display, origin and discovery |
| community-feed:com.qualequest/governance | changed | schema 1 display, origin and discovery |
| community-feed:com.qualityclouds/mcp-server-qualityclouds | changed | schema 1 display, origin and discovery |
| community-feed:com.quallaa/quallaa | changed | schema 1 display, origin and discovery |
| community-feed:com.quantral/sentiment | changed | schema 1 display, origin and discovery |
| community-feed:com.qubitsok/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.quelvio/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.queryomega/omega | changed | schema 1 display, origin and discovery |
| community-feed:com.queuesim/public | changed | schema 1 display, origin and discovery |
| community-feed:com.quicksnip/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.quintadb/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.qumge/skills | changed | schema 1 display, origin and discovery |
| community-feed:com.qurangallery/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.rackwarehouse/fitment | changed | schema 1 display, origin and discovery |
| community-feed:com.railway/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.raintreeminerals/public | changed | schema 1 display, origin and discovery |
| community-feed:com.ranklogs/ranklogs | changed | schema 1 display, origin and discovery |
| community-feed:com.ranomics/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.rate-my-agent.mcp/rate-my-agent | changed | schema 1 display, origin and discovery |
| community-feed:com.ratetrove/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ratevert/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ratezip/rates | changed | schema 1 display, origin and discovery |
| community-feed:com.rbxinvest/market-data | changed | schema 1 display, origin and discovery |
| community-feed:com.rcqsignals/data-oracle | changed | schema 1 display, origin and discovery |
| community-feed:com.reactlive/reactlive | changed | schema 1 display, origin and discovery |
| community-feed:com.readnpick/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.realistimo/realistimo | changed | schema 1 display, origin and discovery |
| community-feed:com.realry/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.recaloapp/recalo | changed | schema 1 display, origin and discovery |
| community-feed:com.rechargeapps/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.recipes-daily/recipes | changed | schema 1 display, origin and discovery |
| community-feed:com.recognitium/recognitium | changed | schema 1 display, origin and discovery |
| community-feed:com.redbark/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.redbooth/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.redirectboss/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.redocly/mcp | dropped | header is not a declared secret reference |
| community-feed:com.redpanda/docs-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.reelquoteai/survey-tool | changed | schema 1 display, origin and discovery |
| community-feed:com.reelrifter/watchlist | changed | schema 1 display, origin and discovery |
| community-feed:com.reevol.source/supplier-search | changed | schema 1 display, origin and discovery |
| community-feed:com.referralflooring/business-card | changed | schema 1 display, origin and discovery |
| community-feed:com.refsee/refsee | changed | schema 1 display, origin and discovery |
| community-feed:com.regfish/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.regiabi/chart-mcp#npm:%40bicharts%2Fchart-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.regiai/regiai | changed | schema 1 display, origin and discovery |
| community-feed:com.reglyze/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.reletter/reletter | changed | schema 1 display, origin and discovery |
| community-feed:com.reliasim/public | changed | schema 1 display, origin and discovery |
| community-feed:com.reliastats/public | changed | schema 1 display, origin and discovery |
| community-feed:com.relocation123/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.remotejobscenter/remote-jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.remoterocketship/jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.renacerpsicologico/renacer-psicologico | changed | schema 1 display, origin and discovery |
| community-feed:com.renovationroute/federal-opportunities | changed | schema 1 display, origin and discovery |
| community-feed:com.renzoprotocol/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.rephonic/rephonic | dropped | authentication is required but the source declares no secret header |
| community-feed:com.repofuse/repofuse | changed | schema 1 display, origin and discovery |
| community-feed:com.reps-log/repslog | changed | schema 1 display, origin and discovery |
| community-feed:com.repuso/monitoring | changed | schema 1 display, origin and discovery |
| community-feed:com.resellportal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.resetparatodos/verifica | changed | schema 1 display, origin and discovery |
| community-feed:com.resolvedmarkets/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.resustackapp/resustack | changed | schema 1 display, origin and discovery |
| community-feed:com.retentionrail/retentionrail | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.returnonsecurity/signal | changed | schema 1 display, origin and discovery |
| community-feed:com.revdoku/revdoku | changed | schema 1 display, origin and discovery |
| community-feed:com.revelata/deepkpi-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.revelica/revelica | changed | schema 1 display, origin and discovery |
| community-feed:com.revensi/revensi | changed | schema 1 display, origin and discovery |
| community-feed:com.reviewflowz/reviews | dropped | authentication is required but the source declares no secret header |
| community-feed:com.revnu/revnu | changed | schema 1 display, origin and discovery |
| community-feed:com.revorbit/crm | changed | schema 1 display, origin and discovery |
| community-feed:com.revvedupcars/true-cost-index | changed | schema 1 display, origin and discovery |
| community-feed:com.rhylthyme/rhylthyme | changed | schema 1 display, origin and discovery |
| community-feed:com.riddle/creator | changed | schema 1 display, origin and discovery |
| community-feed:com.ridemotive.app.mcp/motive | changed | schema 1 display, origin and discovery |
| community-feed:com.ridgerunner/outdoor-gear | changed | schema 1 display, origin and discovery |
| community-feed:com.riverscript/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.riverscript/mcp-v2 | changed | schema 1 display, origin and discovery |
| community-feed:com.rixfreight-group/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.roam2go/esim-catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.robbiegeorgephotography/naturepedia | changed | schema 1 display, origin and discovery |
| community-feed:com.roboflow/roboflow-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.robopartpicker/robopartpicker | changed | schema 1 display, origin and discovery |
| community-feed:com.robtex/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.rocsite/rocsite | changed | schema 1 display, origin and discovery |
| community-feed:com.rootly/mcp-server#pypi:rootly-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.rootly/mcp-server | dropped | SSE-only transport |
| community-feed:com.roroquantum/roro-quantum | changed | schema 1 display, origin and discovery |
| community-feed:com.rovvafrica/ride-booking | changed | schema 1 display, origin and discovery |
| community-feed:com.rowhint/seat-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.royalplugins/royal-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.royashbrook/hush | changed | schema 1 display, origin and discovery |
| community-feed:com.rtcstats/rtcstats | changed | schema 1 display, origin and discovery |
| community-feed:com.rti/connext-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.rubiic/rubiic | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.rulemesh/compliance | changed | schema 1 display, origin and discovery |
| community-feed:com.run402.llm-router/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.run402.zhiji-daily-report/zhiji-signal | changed | schema 1 display, origin and discovery |
| community-feed:com.run402.zhiji-signal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.run402/mcp#npm:run402-mcp | dropped | streamable HTTPS remote preferred |
| community-feed:com.run402/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.runable/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.runekist/runekist | changed | schema 1 display, origin and discovery |
| community-feed:com.runriva.quizbase/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.rushordertees/rushordertees | changed | schema 1 display, origin and discovery |
| community-feed:com.ruzora/ruzora | changed | schema 1 display, origin and discovery |
| community-feed:com.ryxell/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.rzailabs/rzailabs-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.saasbrowser/saas-browser | changed | schema 1 display, origin and discovery |
| community-feed:com.saasdossier/evidence-ledger | changed | schema 1 display, origin and discovery |
| community-feed:com.saaskly/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.safe-mcp/google-analytics-unofficial | changed | schema 1 display, origin and discovery |
| community-feed:com.sailtix/sailtix | changed | schema 1 display, origin and discovery |
| community-feed:com.sakuraweb.yamagishi/physics-papers | changed | schema 1 display, origin and discovery |
| community-feed:com.salesql/salesql | changed | schema 1 display, origin and discovery |
| community-feed:com.salsavida/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.santismm/knowledge | changed | schema 1 display, origin and discovery |
| community-feed:com.santyvv/tienda | changed | schema 1 display, origin and discovery |
| community-feed:com.sapiensinteticos/sapiens#npm:sapiens-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.sarkoa/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.satellitequotes/satellitequotes | changed | schema 1 display, origin and discovery |
| community-feed:com.savantisai/savantis-memory | changed | schema 1 display, origin and discovery |
| community-feed:com.savee/savee | changed | schema 1 display, origin and discovery |
| community-feed:com.savvly/savvly#npm:%40savvly%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.saybriefly/saybriefly | changed | schema 1 display, origin and discovery |
| community-feed:com.scadaminer/nem-explorer | changed | schema 1 display, origin and discovery |
| community-feed:com.scandit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.scanlabsai/scanner | changed | schema 1 display, origin and discovery |
| community-feed:com.scanmalware.mcp/scanmalware-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.scento/perfume-api | changed | schema 1 display, origin and discovery |
| community-feed:com.schedulala/schedulala | changed | schema 1 display, origin and discovery |
| community-feed:com.schedulenchill/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.scientificmicroservices/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.scopeblind/protect-mcp#npm:protect-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.scoutapm/scout-monitoring | dropped | authentication is required but the source declares no secret header |
| community-feed:com.scrap-autos/scrap-autos-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.scrapeunblocker/scrapeunblocker-mcp#npm:scrapeunblocker-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.scrapingant/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.scrapingbee/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.scraptik/tiktok | changed | schema 1 display, origin and discovery |
| community-feed:com.screenbrowser/screenbrowser | changed | schema 1 display, origin and discovery |
| community-feed:com.screensdesign/screensdesign | changed | schema 1 display, origin and discovery |
| community-feed:com.screenshotink/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.screvi/screvi | changed | schema 1 display, origin and discovery |
| community-feed:com.scribe-mail/scribe | changed | schema 1 display, origin and discovery |
| community-feed:com.searchcode/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.searcherlite/searcherlite | changed | schema 1 display, origin and discovery |
| community-feed:com.seayora/seayora | changed | schema 1 display, origin and discovery |
| community-feed:com.secdim/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.secondappraisal/total-loss-intake | changed | schema 1 display, origin and discovery |
| community-feed:com.securecloudstorage/providers | changed | schema 1 display, origin and discovery |
| community-feed:com.securesvault/catalogue | changed | schema 1 display, origin and discovery |
| community-feed:com.sednasystem/genesis | changed | schema 1 display, origin and discovery |
| community-feed:com.seekinweb/ai-visibility | changed | schema 1 display, origin and discovery |
| community-feed:com.seggwat/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.seishorei-wakarukun/legal-research | changed | schema 1 display, origin and discovery |
| community-feed:com.sekkeiflow/sekkeiflow | changed | schema 1 display, origin and discovery |
| community-feed:com.selectbnbs/verify | changed | schema 1 display, origin and discovery |
| community-feed:com.selenios/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.selfping/selfping | changed | schema 1 display, origin and discovery |
| community-feed:com.selfstorming/selfstorming | changed | schema 1 display, origin and discovery |
| community-feed:com.selltostate/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.senderkit/senderkit | changed | schema 1 display, origin and discovery |
| community-feed:com.sendifai/platform | changed | schema 1 display, origin and discovery |
| community-feed:com.sendpulse.mcp/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.sendquotenow/quote-engine | changed | schema 1 display, origin and discovery |
| community-feed:com.sendseven/messaging | dropped | authentication is required but the source declares no secret header |
| community-feed:com.sendthisfax/fax | changed | schema 1 display, origin and discovery |
| community-feed:com.sentientmail/email-platform | changed | schema 1 display, origin and discovery |
| community-feed:com.seoclerks/seoclerks | changed | schema 1 display, origin and discovery |
| community-feed:com.seofuxx/seo-audit | dropped | authentication is required but the source declares no secret header |
| community-feed:com.seranking/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.serdaroztetik/call-me | changed | schema 1 display, origin and discovery |
| community-feed:com.serp-agent/seo | changed | schema 1 display, origin and discovery |
| community-feed:com.serpstat/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.serpzilla/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.serversearcher/serversearcher-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.session-replay/session-replay | changed | schema 1 display, origin and discovery |
| community-feed:com.setlineapp/setline | changed | schema 1 display, origin and discovery |
| community-feed:com.sfxengine/sfx-engine | changed | schema 1 display, origin and discovery |
| community-feed:com.sgpbusiness/singapore-entities-directory | changed | schema 1 display, origin and discovery |
| community-feed:com.sgpdirectory/mcp | dropped | Its address needs values you choose. Add it under Custom. |
| community-feed:com.sgpdirectory/singapore-business-directory | dropped | Its address needs values you choose. Add it under Custom. |
| community-feed:com.shamra-academia/research | changed | schema 1 display, origin and discovery |
| community-feed:com.sharpnel-trading/dealer-gamma-levels | changed | schema 1 display, origin and discovery |
| community-feed:com.sherweb/platform | changed | schema 1 display, origin and discovery |
| community-feed:com.shiftyasan/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.shinobidata/research | changed | schema 1 display, origin and discovery |
| community-feed:com.ship24/tracking-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.shipday/shipday | changed | schema 1 display, origin and discovery |
| community-feed:com.shipmyform/shipmyform | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.shipshapedata/shipshape-data | changed | schema 1 display, origin and discovery |
| community-feed:com.shipshapedata/shipshape-data-docs | changed | schema 1 display, origin and discovery |
| community-feed:com.shonanfarm/zama-bike-kaitori | changed | schema 1 display, origin and discovery |
| community-feed:com.shortgenius/shortgenius | changed | schema 1 display, origin and discovery |
| community-feed:com.shortlistpass/local-businesses | changed | schema 1 display, origin and discovery |
| community-feed:com.shortpixel.mcp/optimize | changed | schema 1 display, origin and discovery |
| community-feed:com.shorttext/shorttext | changed | schema 1 display, origin and discovery |
| community-feed:com.showmeonmap/maps | changed | schema 1 display, origin and discovery |
| community-feed:com.shpbl/repository-audit-and-repair | changed | schema 1 display, origin and discovery |
| community-feed:com.shurq/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.sidecardata/sidecar | changed | schema 1 display, origin and discovery |
| community-feed:com.sigaoli/profile | changed | schema 1 display, origin and discovery |
| community-feed:com.siglume/mcp-gateway | changed | schema 1 display, origin and discovery |
| community-feed:com.signagespace/signagespace | changed | schema 1 display, origin and discovery |
| community-feed:com.signalaf/contribution-exchange | changed | schema 1 display, origin and discovery |
| community-feed:com.signalaf/sigrank | changed | schema 1 display, origin and discovery |
| community-feed:com.signatureapi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.signed/investors | changed | schema 1 display, origin and discovery |
| community-feed:com.signed/signed | changed | schema 1 display, origin and discovery |
| community-feed:com.sigoseguros/auto-quote | changed | schema 1 display, origin and discovery |
| community-feed:com.sigparser/sigparser | changed | schema 1 display, origin and discovery |
| community-feed:com.siilostomy/store | changed | schema 1 display, origin and discovery |
| community-feed:com.siliconfriendly/directory | changed | schema 1 display, origin and discovery |
| community-feed:com.simplecohortllc.bible/shepherd-bible-api | changed | schema 1 display, origin and discovery |
| community-feed:com.simplepdf/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.simpliers/giveaway | changed | schema 1 display, origin and discovery |
| community-feed:com.singlefax/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.singularity-app/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sinhvu/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sitelas/sitelas | changed | schema 1 display, origin and discovery |
| community-feed:com.sitesplaced/sitesplaced | changed | schema 1 display, origin and discovery |
| community-feed:com.skateboardpersonalizado/skateboard-deck | changed | schema 1 display, origin and discovery |
| community-feed:com.sketchlib/sketchlib | changed | schema 1 display, origin and discovery |
| community-feed:com.sketchxflow/dev-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sketchxflow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.ski-france/agent-search | changed | schema 1 display, origin and discovery |
| community-feed:com.skillmd/skillmd | changed | schema 1 display, origin and discovery |
| community-feed:com.skillsail/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.skingrind/skingrind | changed | schema 1 display, origin and discovery |
| community-feed:com.skiplagged/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.skipseek/skipseek | changed | schema 1 display, origin and discovery |
| community-feed:com.skipshit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.skyaccess/skyaccess | changed | schema 1 display, origin and discovery |
| community-feed:com.skyalo/travel-connectivity-guide | changed | schema 1 display, origin and discovery |
| community-feed:com.skydropx/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sleekplan/sleekplan | changed | schema 1 display, origin and discovery |
| community-feed:com.slidetok/slidetok | changed | schema 1 display, origin and discovery |
| community-feed:com.smart-me/smart-me | changed | schema 1 display, origin and discovery |
| community-feed:com.smartbear/smartbear-mcp#npm:%40smartbear%2Fmcp | dropped | streamable HTTPS remote preferred |
| community-feed:com.smartbear/smartbear-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.smartbear/swagger-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.smarthomeexplorer.www/product-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.smartling/smartling-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.smartmoney77/financial-calculators | changed | schema 1 display, origin and discovery |
| community-feed:com.smartpress/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.smiaware.mcp/smi-aware-assistant | changed | schema 1 display, origin and discovery |
| community-feed:com.smirnovlabs/ynab-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.smklog/parcel-shipping-rates | changed | schema 1 display, origin and discovery |
| community-feed:com.smspva/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.smsvertpro/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.snapshot-site/screenshots | changed | schema 1 display, origin and discovery |
| community-feed:com.snitcher/snitcher | changed | schema 1 display, origin and discovery |
| community-feed:com.sochain/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.socialchamp/socialchamp-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.socialcooks/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.socialfaktory/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sofiastage/events | changed | schema 1 display, origin and discovery |
| community-feed:com.solofire/spark | changed | schema 1 display, origin and discovery |
| community-feed:com.somosvelora/velora | changed | schema 1 display, origin and discovery |
| community-feed:com.sonatype/dependency-management-mcp-server | dropped | authentication is required but the source declares no secret header |
| community-feed:com.songstoyoureyes/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.sonlightwindow/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.sooveryn/sooveryn | changed | schema 1 display, origin and discovery |
| community-feed:com.sophomath/agent-beacon | changed | schema 1 display, origin and discovery |
| community-feed:com.soren/games | changed | schema 1 display, origin and discovery |
| community-feed:com.sornflow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.soundgtm/partner-tracker | changed | schema 1 display, origin and discovery |
| community-feed:com.southlondonscientific/clara | changed | schema 1 display, origin and discovery |
| community-feed:com.southlondonscientific/hermes | changed | schema 1 display, origin and discovery |
| community-feed:com.spaghettiandsummits/outdoors | changed | schema 1 display, origin and discovery |
| community-feed:com.spanly/spanly | changed | schema 1 display, origin and discovery |
| community-feed:com.sparklingtracks/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sparkvibeai/spec-committee | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.spatialindia/spatial-india | changed | schema 1 display, origin and discovery |
| community-feed:com.spcsft/sateais | changed | schema 1 display, origin and discovery |
| community-feed:com.speakeasy.ai/platform | changed | schema 1 display, origin and discovery |
| community-feed:com.spellbook-finance/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.spicyapi/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.splark/splark | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.spoki/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sponsorable/sponsorable | changed | schema 1 display, origin and discovery |
| community-feed:com.sportstracklive/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sportwizzard/sportwizzard | changed | schema 1 display, origin and discovery |
| community-feed:com.sprintcheckout/sprintcheckout | changed | schema 1 display, origin and discovery |
| community-feed:com.spritefusion/pixel-art-generator | changed | schema 1 display, origin and discovery |
| community-feed:com.squaredup/eu | changed | schema 1 display, origin and discovery |
| community-feed:com.squaredup/us | changed | schema 1 display, origin and discovery |
| community-feed:com.squiredocs/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sscmfi/bond | changed | schema 1 display, origin and discovery |
| community-feed:com.ssemble/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.stackone/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.stalsoft/stalsoft | changed | schema 1 display, origin and discovery |
| community-feed:com.startaiming/aim | changed | schema 1 display, origin and discovery |
| community-feed:com.startupnamegenerator/name-tools | changed | schema 1 display, origin and discovery |
| community-feed:com.stashgamma/eod-stock-data | changed | schema 1 display, origin and discovery |
| community-feed:com.statable/analytics | changed | schema 1 display, origin and discovery |
| community-feed:com.statsig/statsig-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.statusisdown/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.stayker/1stay | changed | schema 1 display, origin and discovery |
| community-feed:com.stayportland/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.steamanalyst/steamanalyst | changed | schema 1 display, origin and discovery |
| community-feed:com.stelllink/stelllink | changed | schema 1 display, origin and discovery |
| community-feed:com.stepshots/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sternify.app/sternify | changed | schema 1 display, origin and discovery |
| community-feed:com.stewai/stewai | changed | schema 1 display, origin and discovery |
| community-feed:com.stimulsoft/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.stockcake/stockcake | changed | schema 1 display, origin and discovery |
| community-feed:com.stockfilm/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.stocklens/stocklens | changed | schema 1 display, origin and discovery |
| community-feed:com.stockmarketscan/mcp-server | dropped | SSE-only transport |
| community-feed:com.storeinspect/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.storiesonboard/storiesonboard | changed | schema 1 display, origin and discovery |
| community-feed:com.storydoc/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.stratyfix/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.streamlinehq/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.streetproof/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.stripe/mcp | merged | duplicate connection or content; kept as docker:stripe-remote |
| community-feed:com.studiocorsair/lodestone | changed | schema 1 display, origin and discovery |
| community-feed:com.studocu/studocu | changed | schema 1 display, origin and discovery |
| community-feed:com.stytrix/stytrix-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.subastech/subastas-judiciales | changed | schema 1 display, origin and discovery |
| community-feed:com.submitrax/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sudomock/mockups | changed | schema 1 display, origin and discovery |
| community-feed:com.suggix/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sulvo.publisher-revenue-audit/audit | changed | schema 1 display, origin and discovery |
| community-feed:com.sunago-matrix/matrix | changed | schema 1 display, origin and discovery |
| community-feed:com.suntekstore/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.supabase/mcp#npm:%40supabase%2Fmcp-server-supabase | dropped | streamable HTTPS remote preferred |
| community-feed:com.supabase/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.supasaito/supasaito | changed | schema 1 display, origin and discovery |
| community-feed:com.supermetrics/supermetrics | changed | schema 1 display, origin and discovery |
| community-feed:com.superpractice/superpractice | changed | schema 1 display, origin and discovery |
| community-feed:com.supersaas/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.superstock/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.suprsend/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.suresms/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.sushi-tanji/reservations | changed | schema 1 display, origin and discovery |
| community-feed:com.svgator/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.svgicons/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.svgrid/svgrid#npm:%40svgrid%2Fmcp | dropped | streamable HTTPS remote preferred |
| community-feed:com.svgrid/svgrid | changed | schema 1 display, origin and discovery |
| community-feed:com.swifteq/zendesk-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.syfert/legal-research | changed | schema 1 display, origin and discovery |
| community-feed:com.symvanta/code-graph | changed | schema 1 display, origin and discovery |
| community-feed:com.synapticrelay/board | changed | schema 1 display, origin and discovery |
| community-feed:com.synapticrelay/freelance-board | changed | schema 1 display, origin and discovery |
| community-feed:com.synergyboat/website | changed | schema 1 display, origin and discovery |
| community-feed:com.tableall/mcp | dropped | SSE-only transport |
| community-feed:com.tailthemes/tailthemes | changed | schema 1 display, origin and discovery |
| community-feed:com.takident/patient-services | changed | schema 1 display, origin and discovery |
| community-feed:com.talarion/talarion | changed | schema 1 display, origin and discovery |
| community-feed:com.talkspirit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tallyfy/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.tapcart/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.taproothq/taproot | dropped | authentication is required but the source declares no secret header |
| community-feed:com.tarotap/tarot | changed | schema 1 display, origin and discovery |
| community-feed:com.taxact/taxact-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.taxisfabbrimone/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tazpal/x1-baas | changed | schema 1 display, origin and discovery |
| community-feed:com.teamhood/teamhood | changed | schema 1 display, origin and discovery |
| community-feed:com.teamo360/teamo | changed | schema 1 display, origin and discovery |
| community-feed:com.teamyou/teamyou | changed | schema 1 display, origin and discovery |
| community-feed:com.techsnif/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.teclazo/mercadolibre | changed | schema 1 display, origin and discovery |
| community-feed:com.telegramtometatrader/ttmt | changed | schema 1 display, origin and discovery |
| community-feed:com.teleprompter/teleprompter | changed | schema 1 display, origin and discovery |
| community-feed:com.telerivet/telerivet | changed | schema 1 display, origin and discovery |
| community-feed:com.tenantsdb/tenantsdb | changed | schema 1 display, origin and discovery |
| community-feed:com.tenmomo/tenmomo | changed | schema 1 display, origin and discovery |
| community-feed:com.tensormaster/pdf | changed | schema 1 display, origin and discovery |
| community-feed:com.teppek/teppek | changed | schema 1 display, origin and discovery |
| community-feed:com.tesorio/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.test-well/testwell | changed | schema 1 display, origin and discovery |
| community-feed:com.textmine/textmine-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.texttoquant/texttoquant | changed | schema 1 display, origin and discovery |
| community-feed:com.texttostl/texttostl | changed | schema 1 display, origin and discovery |
| community-feed:com.tgboard/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.thaiapp/bible-app | changed | schema 1 display, origin and discovery |
| community-feed:com.thaiprops/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.thatseoagent/seo | changed | schema 1 display, origin and discovery |
| community-feed:com.the-driscoll/public-ai | changed | schema 1 display, origin and discovery |
| community-feed:com.theagenttimes/agent-news | changed | schema 1 display, origin and discovery |
| community-feed:com.theartillerist/artist-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.theartofservice/compliance-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.theaslangroupllc.pulse/pulsenetwork | changed | schema 1 display, origin and discovery |
| community-feed:com.thebalancedinvestorclub/welcome | changed | schema 1 display, origin and discovery |
| community-feed:com.thechrisgrey/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.thecodey/codey | changed | schema 1 display, origin and discovery |
| community-feed:com.thecrowdspace/crowdspace | changed | schema 1 display, origin and discovery |
| community-feed:com.thedailysmark/wrestling | changed | schema 1 display, origin and discovery |
| community-feed:com.thedailyworkflow/thedailyworkflow-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.thedeskmonitor/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.thefilmradar/filmlab | changed | schema 1 display, origin and discovery |
| community-feed:com.theholisticcare/open-mindfulness | changed | schema 1 display, origin and discovery |
| community-feed:com.theirstack/theirstack | dropped | authentication is required but the source declares no secret header |
| community-feed:com.thejohnsonbros/plumbing-booking | changed | schema 1 display, origin and discovery |
| community-feed:com.themailx/email-deliverability | changed | schema 1 display, origin and discovery |
| community-feed:com.themarginapp/the-margin | changed | schema 1 display, origin and discovery |
| community-feed:com.themastermindset/themastermindset | changed | schema 1 display, origin and discovery |
| community-feed:com.themonexus/terminal | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.thenightsky/store | changed | schema 1 display, origin and discovery |
| community-feed:com.theoddsgap/answers | changed | schema 1 display, origin and discovery |
| community-feed:com.theoutdoorsapp/outdoors | changed | schema 1 display, origin and discovery |
| community-feed:com.theprotoclinical/commerce | changed | schema 1 display, origin and discovery |
| community-feed:com.thequietprotocol.www/tqp-growth-offense | changed | schema 1 display, origin and discovery |
| community-feed:com.therenovationroom/renovation-room | changed | schema 1 display, origin and discovery |
| community-feed:com.theservicemarketingguys/audit | changed | schema 1 display, origin and discovery |
| community-feed:com.thevicinityapp/vicinity-agent-api | changed | schema 1 display, origin and discovery |
| community-feed:com.thewheelatlas/wheel-atlas | changed | schema 1 display, origin and discovery |
| community-feed:com.theytree/theytree | changed | schema 1 display, origin and discovery |
| community-feed:com.thinkreasonlearn/founderbrain | changed | schema 1 display, origin and discovery |
| community-feed:com.thinqos/mind | changed | schema 1 display, origin and discovery |
| community-feed:com.thisisdelightful/games-research-starter-pack | changed | schema 1 display, origin and discovery |
| community-feed:com.thmenu/thmenu | changed | schema 1 display, origin and discovery |
| community-feed:com.thousand-api/thousand-api | changed | schema 1 display, origin and discovery |
| community-feed:com.thousandeyes/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.thrifle/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.thrustlab/thrustlab | changed | schema 1 display, origin and discovery |
| community-feed:com.tianxiagongchang/factory-search | dropped | authentication is required but the source declares no secret header |
| community-feed:com.tickerdb/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.ticketfairy/ticket-fairy-public-events | changed | schema 1 display, origin and discovery |
| community-feed:com.tickwind/tickwind | changed | schema 1 display, origin and discovery |
| community-feed:com.tidee/tidee | changed | schema 1 display, origin and discovery |
| community-feed:com.tilebox/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.timeprooflabs/forge-arena-wilds | changed | schema 1 display, origin and discovery |
| community-feed:com.timequip/timequip | changed | schema 1 display, origin and discovery |
| community-feed:com.timill/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tintin-x/tryon | changed | schema 1 display, origin and discovery |
| community-feed:com.tip4serv/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.tippingrules/tipping-rules | changed | schema 1 display, origin and discovery |
| community-feed:com.tipranks/tipranks | changed | schema 1 display, origin and discovery |
| community-feed:com.tkawen/intelligence-gateway | changed | schema 1 display, origin and discovery |
| community-feed:com.tlsradar/tlsradar | changed | schema 1 display, origin and discovery |
| community-feed:com.tofubofu/ai-visibility | changed | schema 1 display, origin and discovery |
| community-feed:com.tokenofesteem/token-of-esteem | changed | schema 1 display, origin and discovery |
| community-feed:com.tokportal/mcp#npm:tokportal-mcp | dropped | streamable HTTPS remote preferred |
| community-feed:com.tokportal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tolk2go/booking | changed | schema 1 display, origin and discovery |
| community-feed:com.tomesphere/tomesphere | changed | schema 1 display, origin and discovery |
| community-feed:com.tomorrowcentral/aws-cloud-cost-sentinel | changed | schema 1 display, origin and discovery |
| community-feed:com.tonpit/tonpit | changed | schema 1 display, origin and discovery |
| community-feed:com.toolsmonk/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.toolyour/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.topmessage/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tosheroon/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.toughtongueai/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.townbrief/townbrief | changed | schema 1 display, origin and discovery |
| community-feed:com.tppflow/texas-rrc-wellbores | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.tppflow/warn-act-layoffs | changed | schema 1 display, origin and discovery |
| community-feed:com.tracklution/server-side-tracking | changed | schema 1 display, origin and discovery |
| community-feed:com.trackordernow/order-tracking | changed | schema 1 display, origin and discovery |
| community-feed:com.trackpodcasts/podcast-sponsors | changed | schema 1 display, origin and discovery |
| community-feed:com.tractorscope/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tradeassi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tradechainly/trading-journal | changed | schema 1 display, origin and discovery |
| community-feed:com.traderhc/agenthc | changed | schema 1 display, origin and discovery |
| community-feed:com.traffalyzer/traffalyzer | changed | schema 1 display, origin and discovery |
| community-feed:com.trailfortress/fitment | changed | schema 1 display, origin and discovery |
| community-feed:com.trandence/trading-journal | changed | schema 1 display, origin and discovery |
| community-feed:com.transcodely/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.transcriptapi/youtube-transcript-and-youtube-search | changed | schema 1 display, origin and discovery |
| community-feed:com.transcriptmagic/transcript-magic | changed | schema 1 display, origin and discovery |
| community-feed:com.transipal/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.translayte/translayte | changed | schema 1 display, origin and discovery |
| community-feed:com.travcozy/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.travel-code/travel-code | changed | schema 1 display, origin and discovery |
| community-feed:com.tredict/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.trellistate/listings | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.trillboards/dooh | changed | schema 1 display, origin and discovery |
| community-feed:com.trillboards/planner | changed | schema 1 display, origin and discovery |
| community-feed:com.trip1/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.triplebooks/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.trivago.mcp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.trmnl/trmnl | changed | schema 1 display, origin and discovery |
| community-feed:com.truealter/identity | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.trueclicks/trueclicks | changed | schema 1 display, origin and discovery |
| community-feed:com.trusted-blogs/blogsuche | changed | schema 1 display, origin and discovery |
| community-feed:com.trustverum/public-reading | changed | schema 1 display, origin and discovery |
| community-feed:com.trustycap/trustycap | changed | schema 1 display, origin and discovery |
| community-feed:com.truthscan/truthscan | changed | schema 1 display, origin and discovery |
| community-feed:com.tryatria/atria | changed | schema 1 display, origin and discovery |
| community-feed:com.trycadbury/netsuite | changed | schema 1 display, origin and discovery |
| community-feed:com.trychannel3/shopping | changed | schema 1 display, origin and discovery |
| community-feed:com.trycommonplace/seller | changed | schema 1 display, origin and discovery |
| community-feed:com.tryoctopus/octopus | changed | schema 1 display, origin and discovery |
| community-feed:com.tttkmbb/calcgrid | changed | schema 1 display, origin and discovery |
| community-feed:com.tubechop/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tudetic/product-search | changed | schema 1 display, origin and discovery |
| community-feed:com.tulotero/tulotero | changed | schema 1 display, origin and discovery |
| community-feed:com.tulugar/tulugar | changed | schema 1 display, origin and discovery |
| community-feed:com.tunnelpowered/knowledge-base | changed | schema 1 display, origin and discovery |
| community-feed:com.turrior.my/turrior-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tvc-mall/customer-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tweetapi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.tweetsmash/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.twelvedata/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.twlawbot/tailexi | changed | schema 1 display, origin and discovery |
| community-feed:com.typeform/typeform | changed | schema 1 display, origin and discovery |
| community-feed:com.typefully/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.uapdrop/research-archive | changed | schema 1 display, origin and discovery |
| community-feed:com.ucpchecker/ucp-checker | changed | schema 1 display, origin and discovery |
| community-feed:com.ufcalendar/fight-api | changed | schema 1 display, origin and discovery |
| community-feed:com.uicapsule/components | changed | schema 1 display, origin and discovery |
| community-feed:com.ukraineborder/ukraine-travel | changed | schema 1 display, origin and discovery |
| community-feed:com.ultimatewebscraper/web-scraper | changed | schema 1 display, origin and discovery |
| community-feed:com.ulule/mcp-public | changed | schema 1 display, origin and discovery |
| community-feed:com.umesh-malik/blog-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.unfoldip/patent-search | changed | schema 1 display, origin and discovery |
| community-feed:com.unifapi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.unitedstarlinktracker/starlink-tracker | changed | schema 1 display, origin and discovery |
| community-feed:com.universally/platform | changed | schema 1 display, origin and discovery |
| community-feed:com.unlayer/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.unorouter/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.unrealugc/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.unstoppabledomains/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.upload-post/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.upscrape/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.uptimemonitoring/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.uptimerobot/uptimerobot | changed | schema 1 display, origin and discovery |
| community-feed:com.uptybots/monitoring | changed | schema 1 display, origin and discovery |
| community-feed:com.upwork.mcp/upwork-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.url2image/url2image | changed | schema 1 display, origin and discovery |
| community-feed:com.us-bike-travel/touren | changed | schema 1 display, origin and discovery |
| community-feed:com.useallowance/allowance-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.usecarscout/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.usegeon/geon | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.useinvent/invent | changed | schema 1 display, origin and discovery |
| community-feed:com.usememra/memra | changed | schema 1 display, origin and discovery |
| community-feed:com.usemuro/paint-colors | changed | schema 1 display, origin and discovery |
| community-feed:com.userbrain/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.usesideways/sideways | changed | schema 1 display, origin and discovery |
| community-feed:com.usewait/waitlist | changed | schema 1 display, origin and discovery |
| community-feed:com.usmortgagecalc/mortgage | changed | schema 1 display, origin and discovery |
| community-feed:com.vairetail/discovergpt | dropped | SSE-only transport |
| community-feed:com.valossa/video-assistant-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.valverideflow/flow | changed | schema 1 display, origin and discovery |
| community-feed:com.varynforge/server | changed | schema 1 display, origin and discovery |
| community-feed:com.vectorpanda/database | changed | schema 1 display, origin and discovery |
| community-feed:com.vectorpanda/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.vegasnearme/las-vegas | changed | schema 1 display, origin and discovery |
| community-feed:com.velrim/extract | changed | schema 1 display, origin and discovery |
| community-feed:com.vendizap/api | changed | schema 1 display, origin and discovery |
| community-feed:com.venturu/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.venumark/venumark | changed | schema 1 display, origin and discovery |
| community-feed:com.vepathos/vepathos | changed | schema 1 display, origin and discovery |
| community-feed:com.vercel/vercel-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.verifyum/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.verirouteintel/lookup | changed | schema 1 display, origin and discovery |
| community-feed:com.verisgov.api/data-access | changed | schema 1 display, origin and discovery |
| community-feed:com.veritahire/hiring-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:com.veritahire/jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.verixid/verifier | changed | schema 1 display, origin and discovery |
| community-feed:com.versedb/versedb-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.versium/REACH | changed | schema 1 display, origin and discovery |
| community-feed:com.verticalflows/agent-gateway | changed | schema 1 display, origin and discovery |
| community-feed:com.vertodigital/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.vesremont/store | changed | schema 1 display, origin and discovery |
| community-feed:com.vevang/agents | changed | schema 1 display, origin and discovery |
| community-feed:com.vibgrate/ai-context#npm:%40vibgrate%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.vibgrate/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.vicatoo/hotels | changed | schema 1 display, origin and discovery |
| community-feed:com.vidalytics/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.viddler/viddler-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.vidiq/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.vidmoat/vidmoat | changed | schema 1 display, origin and discovery |
| community-feed:com.vigotime/planner | changed | schema 1 display, origin and discovery |
| community-feed:com.vigotime/tools | changed | schema 1 display, origin and discovery |
| community-feed:com.vincario/vehicle-data | changed | schema 1 display, origin and discovery |
| community-feed:com.viral-cat/viral-cat | changed | schema 1 display, origin and discovery |
| community-feed:com.viraloutliers/viral-outliers | changed | schema 1 display, origin and discovery |
| community-feed:com.viralrecast/viralrecast | changed | schema 1 display, origin and discovery |
| community-feed:com.virohanadentalclinic/dental | changed | schema 1 display, origin and discovery |
| community-feed:com.virus-alert/agent-observatory | changed | schema 1 display, origin and discovery |
| community-feed:com.visualsandbox/visual-sandbox | changed | schema 1 display, origin and discovery |
| community-feed:com.vithanco/vgraph-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.vixdeo/vixdeo | changed | schema 1 display, origin and discovery |
| community-feed:com.vocaneo/vocaneo | changed | schema 1 display, origin and discovery |
| community-feed:com.vocuno/vocuno | changed | schema 1 display, origin and discovery |
| community-feed:com.voice-school/singing-vocal-lesson-booking | changed | schema 1 display, origin and discovery |
| community-feed:com.voicemoat/voicemoat | changed | schema 1 display, origin and discovery |
| community-feed:com.voltcast/voltcast | changed | schema 1 display, origin and discovery |
| community-feed:com.volunteerreminder/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.voxodds/voxodds | changed | schema 1 display, origin and discovery |
| community-feed:com.voyahomes/voya-homes | changed | schema 1 display, origin and discovery |
| community-feed:com.vpsnet/vpsnet | changed | schema 1 display, origin and discovery |
| community-feed:com.vtc/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.vviinn/commerce-context-layer | changed | schema 1 display, origin and discovery |
| community-feed:com.wachete/wachete | changed | schema 1 display, origin and discovery |
| community-feed:com.wadifa-info.www/morocco-public-jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.walnai/website | changed | schema 1 display, origin and discovery |
| community-feed:com.warmysender/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.washbodega/service-discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.wauldo/wauldo | changed | schema 1 display, origin and discovery |
| community-feed:com.wavebrook/dashboard | changed | schema 1 display, origin and discovery |
| community-feed:com.webeyez/webeyez | changed | schema 1 display, origin and discovery |
| community-feed:com.webflow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.webforj/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.webmoney/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.webotee/amazon-product-research-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.webremotejobs/jobs | changed | schema 1 display, origin and discovery |
| community-feed:com.websitelaunches/launch-record-lookup | changed | schema 1 display, origin and discovery |
| community-feed:com.wedding-seat/wedding-planner | changed | schema 1 display, origin and discovery |
| community-feed:com.wellemo/wellemo | changed | schema 1 display, origin and discovery |
| community-feed:com.wherobots/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.whimsical/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.whoogy/whoogy-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.whooing/whooing | changed | schema 1 display, origin and discovery |
| community-feed:com.whoppah/commerce | changed | schema 1 display, origin and discovery |
| community-feed:com.wikimedia.enterprise/docs | changed | schema 1 display, origin and discovery |
| community-feed:com.wikitolica/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.windbornesystems/weather | changed | schema 1 display, origin and discovery |
| community-feed:com.windowsforum/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.withcabin/cabin | changed | schema 1 display, origin and discovery |
| community-feed:com.withresumeai/ats | changed | schema 1 display, origin and discovery |
| community-feed:com.withruntime/runtime#npm:withruntime | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.wix/mcp | dropped | SSE-only transport |
| community-feed:com.wizeb/ai-native-index | changed | schema 1 display, origin and discovery |
| community-feed:com.wolfram/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.woopsocial/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.work-pick/press | changed | schema 1 display, origin and discovery |
| community-feed:com.workers-rights/employment-law | changed | schema 1 display, origin and discovery |
| community-feed:com.workos/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.worldairfares/flights-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.worqen/workspace | changed | schema 1 display, origin and discovery |
| community-feed:com.worthune/models | changed | schema 1 display, origin and discovery |
| community-feed:com.wpbay/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.wpwriter/wordpress | changed | schema 1 display, origin and discovery |
| community-feed:com.x-ego/x-ego | changed | schema 1 display, origin and discovery |
| community-feed:com.x402-agent-pay/facilitator | changed | schema 1 display, origin and discovery |
| community-feed:com.xcodebuildmcp/XcodeBuildMCP#npm:xcodebuildmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:com.xither/record | changed | schema 1 display, origin and discovery |
| community-feed:com.xonark/dental-gateway | changed | schema 1 display, origin and discovery |
| community-feed:com.xrade/xrade | changed | schema 1 display, origin and discovery |
| community-feed:com.xranks/domain-data | changed | schema 1 display, origin and discovery |
| community-feed:com.xrpldashboard/xrpldashboard-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.xweather/weather | changed | schema 1 display, origin and discovery |
| community-feed:com.yantrakit/blueprint-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.yatmo/yatmo | changed | schema 1 display, origin and discovery |
| community-feed:com.yloservice/search | changed | schema 1 display, origin and discovery |
| community-feed:com.youricp/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:com.yourmatflow/matflow | changed | schema 1 display, origin and discovery |
| community-feed:com.youspot/youspot | changed | schema 1 display, origin and discovery |
| community-feed:com.youth4work/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.youth4work/public | changed | schema 1 display, origin and discovery |
| community-feed:com.yowayow/heart-decision | changed | schema 1 display, origin and discovery |
| community-feed:com.zabihah/halal-places | changed | schema 1 display, origin and discovery |
| community-feed:com.zacharyr0th/public | changed | schema 1 display, origin and discovery |
| community-feed:com.zahabprice/gold-prices | changed | schema 1 display, origin and discovery |
| community-feed:com.zaimhub/catalog | changed | schema 1 display, origin and discovery |
| community-feed:com.zapier/mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.zarla/website-builder | changed | schema 1 display, origin and discovery |
| community-feed:com.zeltser/website-search | changed | schema 1 display, origin and discovery |
| community-feed:com.zenovay/analytics | changed | schema 1 display, origin and discovery |
| community-feed:com.zensched/zensched | changed | schema 1 display, origin and discovery |
| community-feed:com.zephior/discovery | changed | schema 1 display, origin and discovery |
| community-feed:com.zernio/zernio | changed | schema 1 display, origin and discovery |
| community-feed:com.zernote/zernote | changed | schema 1 display, origin and discovery |
| community-feed:com.zeroheight/zeroheight | changed | schema 1 display, origin and discovery |
| community-feed:com.zettoai/zetto | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:com.zhijipaipan/zhiji-bazi | changed | schema 1 display, origin and discovery |
| community-feed:com.zigpoll/zigpoll-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.zillapi/zillow-mcp | changed | schema 1 display, origin and discovery |
| community-feed:com.zip-codes/api | changed | schema 1 display, origin and discovery |
| community-feed:com.zippfeed/zipp | changed | schema 1 display, origin and discovery |
| community-feed:com.zobrx/zobrx | changed | schema 1 display, origin and discovery |
| community-feed:com.zomato/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:com.zoninga/finance | changed | schema 1 display, origin and discovery |
| community-feed:com.zoningsignal/observatory | changed | schema 1 display, origin and discovery |
| community-feed:com.zylalabs/api-hub | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.zyntaflow/zynta-flow | changed | schema 1 display, origin and discovery |
| community-feed:com.zype.mcp/server | changed | schema 1 display, origin and discovery |
| community-feed:com.zyphe/zyphe-mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:consulting.sequel/agent-tools | changed | schema 1 display, origin and discovery |
| community-feed:consulting.sophon/sophon-consulting | changed | schema 1 display, origin and discovery |
| community-feed:cool.asap/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cv.d/talent | changed | schema 1 display, origin and discovery |
| community-feed:cx.alloy/alloy | changed | schema 1 display, origin and discovery |
| community-feed:cz.audioknihy/catalog | changed | schema 1 display, origin and discovery |
| community-feed:cz.dokladbot/dokladbot | changed | schema 1 display, origin and discovery |
| community-feed:cz.freelax/tax-engine | changed | schema 1 display, origin and discovery |
| community-feed:cz.groo/reality | changed | schema 1 display, origin and discovery |
| community-feed:cz.hitprace/jobs | changed | schema 1 display, origin and discovery |
| community-feed:cz.pinflower/flowers | changed | schema 1 display, origin and discovery |
| community-feed:cz.salesbot/linkedin-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:cz.storeinvent/mcp | changed | schema 1 display, origin and discovery |
| community-feed:cz.studionatali-ricany/booking | changed | schema 1 display, origin and discovery |
| community-feed:cz.suorigo.konfigurator/server | changed | schema 1 display, origin and discovery |
| community-feed:cz.tvojelajky/agent-commerce | changed | schema 1 display, origin and discovery |
| community-feed:de.agentview/agentview-mcp | changed | schema 1 display, origin and discovery |
| community-feed:de.agundur/geo-scanner | changed | schema 1 display, origin and discovery |
| community-feed:de.auracite/ai-visibility | changed | schema 1 display, origin and discovery |
| community-feed:de.bluraysuchmaschine/suche | changed | schema 1 display, origin and discovery |
| community-feed:de.carbon-cashmere.api/crypto-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:de.choov/mcp | changed | schema 1 display, origin and discovery |
| community-feed:de.dm.mcp/dm-drogerie-markt | changed | schema 1 display, origin and discovery |
| community-feed:de.fakturai/erechnung | changed | schema 1 display, origin and discovery |
| community-feed:de.ferienhausmiete/guest | changed | schema 1 display, origin and discovery |
| community-feed:de.honestdog/honestdog | changed | schema 1 display, origin and discovery |
| community-feed:de.lebenslaufheld/mcp | changed | schema 1 display, origin and discovery |
| community-feed:de.qrcodly/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:de.registercheck/registercheck | changed | schema 1 display, origin and discovery |
| community-feed:de.stellenonline/jobsearch | changed | schema 1 display, origin and discovery |
| community-feed:de.vakantio/mcp | changed | schema 1 display, origin and discovery |
| community-feed:de.woebike/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wogrill/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wohandy/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wokonsole/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wolaptop/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wopool/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.woroller/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wosneaker/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wosolar/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wospeicher/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wostrom/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wotablet/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wouhr/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.wovitamine/catalog | changed | schema 1 display, origin and discovery |
| community-feed:de.zugferd-validator/validator | changed | schema 1 display, origin and discovery |
| community-feed:design.60fps/library | changed | schema 1 display, origin and discovery |
| community-feed:design.kwnva/portfolio | changed | schema 1 display, origin and discovery |
| community-feed:design.overflow/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:design.tesserai/tesserai#npm:%40tesserai%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.21st/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.2ds/2ds | changed | schema 1 display, origin and discovery |
| community-feed:dev.3tg/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.acopio/acopio | dropped | authentication is required but the source declares no secret header |
| community-feed:dev.adcrunch/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.agent-module/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.agently/brain | changed | schema 1 display, origin and discovery |
| community-feed:dev.agentopskit.www/constitution-lint | changed | schema 1 display, origin and discovery |
| community-feed:dev.agentpapers/agent-papers | changed | schema 1 display, origin and discovery |
| community-feed:dev.agentseo.www/agentseo-mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.agentshare/price-api | changed | schema 1 display, origin and discovery |
| community-feed:dev.agentsurface/docs | changed | schema 1 display, origin and discovery |
| community-feed:dev.agenttool/agenttool | changed | schema 1 display, origin and discovery |
| community-feed:dev.aic0rt3x.memory/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.archgraph/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.astrocal/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:dev.busymate/busymate-devtools | changed | schema 1 display, origin and discovery |
| community-feed:dev.charliemorrison/agent-web-reader | changed | schema 1 display, origin and discovery |
| community-feed:dev.cite42/mcp#npm:%40cite42%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.claw-link/clawlink | changed | schema 1 display, origin and discovery |
| community-feed:dev.clipkit/clipkit | changed | schema 1 display, origin and discovery |
| community-feed:dev.cloro/cloro | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:dev.cloudgate/workflow | changed | schema 1 display, origin and discovery |
| community-feed:dev.clutchcall/portal | changed | schema 1 display, origin and discovery |
| community-feed:dev.consultant/assignments | changed | schema 1 display, origin and discovery |
| community-feed:dev.corsproxy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.cr8/commons | changed | schema 1 display, origin and discovery |
| community-feed:dev.crelvo/german-tax-data | changed | schema 1 display, origin and discovery |
| community-feed:dev.cubic/cubic | changed | schema 1 display, origin and discovery |
| community-feed:dev.daily/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.e18e/e18e | changed | schema 1 display, origin and discovery |
| community-feed:dev.e2a/mcp-server | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:dev.edgegap/mcp#npm:%40edgegap%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.emailmd/emailmd#npm:emailmd | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.endform/mcp#npm:endform | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.falconbuilder/falcon-builder | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:dev.fly.basedworld/market | changed | schema 1 display, origin and discovery |
| community-feed:dev.fly.bot-bazaar/bot-bazaar | changed | schema 1 display, origin and discovery |
| community-feed:dev.fly.fathom-lab-door/fathom | changed | schema 1 display, origin and discovery |
| community-feed:dev.fly.geld-machen-x402/agent-utilities | changed | schema 1 display, origin and discovery |
| community-feed:dev.fly.grok-backtest-api/crypto-quant | changed | schema 1 display, origin and discovery |
| community-feed:dev.fly.looper-products/app-reviews | changed | schema 1 display, origin and discovery |
| community-feed:dev.fly.looper-products/crates-package-info | changed | schema 1 display, origin and discovery |
| community-feed:dev.fly.looper-products/statuspage-incidents | changed | schema 1 display, origin and discovery |
| community-feed:dev.fly.x402-accelerometer-feed/tokenized-stocks-agent-data | changed | schema 1 display, origin and discovery |
| community-feed:dev.forgesworn/bray#npm:nostr-bray | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.gemot/gemot | changed | schema 1 display, origin and discovery |
| community-feed:dev.getfrostbyte/frostbyte | changed | schema 1 display, origin and discovery |
| community-feed:dev.glideapps/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.gnosem/gnosem | changed | schema 1 display, origin and discovery |
| community-feed:dev.greenflagged/greenflagged | changed | schema 1 display, origin and discovery |
| community-feed:dev.gtfo/mcp-killchain-stage1-weather | changed | schema 1 display, origin and discovery |
| community-feed:dev.gvnr/gvnr | changed | schema 1 display, origin and discovery |
| community-feed:dev.iknow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.jam/jam | changed | schema 1 display, origin and discovery |
| community-feed:dev.jasonpearson/auto-mobile#npm:%40kaeawc%2Fauto-mobile | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.kaimeilabs/guardian-engine | changed | schema 1 display, origin and discovery |
| community-feed:dev.kamy/kamy | changed | schema 1 display, origin and discovery |
| community-feed:dev.legalize/legalize | changed | schema 1 display, origin and discovery |
| community-feed:dev.lingo/main | changed | schema 1 display, origin and discovery |
| community-feed:dev.logo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.lovable/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.mantlekit/launch-planner | changed | schema 1 display, origin and discovery |
| community-feed:dev.marksiazon/profile | changed | schema 1 display, origin and discovery |
| community-feed:dev.memnode/memnode | changed | schema 1 display, origin and discovery |
| community-feed:dev.modem/modem | changed | schema 1 display, origin and discovery |
| community-feed:dev.mory/trendflow | changed | schema 1 display, origin and discovery |
| community-feed:dev.multimail/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:dev.nativesoil/soil | changed | schema 1 display, origin and discovery |
| community-feed:dev.nexbid/discovery | changed | schema 1 display, origin and discovery |
| community-feed:dev.ngrok-free.sympathy-myself-jogger/agentbridge | dropped | header is not a declared secret reference |
| community-feed:dev.nichedb/nichedb#npm:%40profullstack%2Fnichedb | dropped | streamable HTTPS remote preferred |
| community-feed:dev.nichedb/nichedb | changed | schema 1 display, origin and discovery |
| community-feed:dev.ohmyposh/validator | changed | schema 1 display, origin and discovery |
| community-feed:dev.openstatus/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.pagehub/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.patent/patent | changed | schema 1 display, origin and discovery |
| community-feed:dev.postproxy/postproxy | changed | schema 1 display, origin and discovery |
| community-feed:dev.promplate/hmr | changed | schema 1 display, origin and discovery |
| community-feed:dev.proxylang/translate | changed | schema 1 display, origin and discovery |
| community-feed:dev.rankd/rankd | changed | schema 1 display, origin and discovery |
| community-feed:dev.rateapi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.realitygraph/verification-tools | changed | schema 1 display, origin and discovery |
| community-feed:dev.recapp/recapp | changed | schema 1 display, origin and discovery |
| community-feed:dev.releasealert/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.repofold/repofold | changed | schema 1 display, origin and discovery |
| community-feed:dev.repowise/repowise#pypi:repowise | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.revamp/revamp | changed | schema 1 display, origin and discovery |
| community-feed:dev.robase/sms | dropped | authentication is required but the source declares no secret header |
| community-feed:dev.rye/portfolio | changed | schema 1 display, origin and discovery |
| community-feed:dev.scrip/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.seekrit/remote-mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.seoskill/seo#npm:seo | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.servonaut/servonaut#pypi:servonaut | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.shardflux/mcp#npm:%40shardflux%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.shirabe/hub | changed | schema 1 display, origin and discovery |
| community-feed:dev.sipflow/sipflow | changed | schema 1 display, origin and discovery |
| community-feed:dev.skillrepo/skillrepo | changed | schema 1 display, origin and discovery |
| community-feed:dev.slashr/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.slideforge/slideforge | changed | schema 1 display, origin and discovery |
| community-feed:dev.slipstack/pdf | changed | schema 1 display, origin and discovery |
| community-feed:dev.sohum/workspace | changed | schema 1 display, origin and discovery |
| community-feed:dev.sprites/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.stitchapi/docs | changed | schema 1 display, origin and discovery |
| community-feed:dev.storage/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.suzuri/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.svelte/mcp#npm:%40sveltejs%2Fmcp | dropped | streamable HTTPS remote preferred |
| community-feed:dev.svelte/mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.tesseralytics/hyperliquid-data | changed | schema 1 display, origin and discovery |
| community-feed:dev.thexi/brainbox | changed | schema 1 display, origin and discovery |
| community-feed:dev.tmpstate/tmpstate | changed | schema 1 display, origin and discovery |
| community-feed:dev.turva/turva-mcp | changed | schema 1 display, origin and discovery |
| community-feed:dev.useaxis/axis | changed | schema 1 display, origin and discovery |
| community-feed:dev.voicemode/voicemode#pypi:voice-mode | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:dev.weblens/weblens | changed | schema 1 display, origin and discovery |
| community-feed:dev.wraps/docs | changed | schema 1 display, origin and discovery |
| community-feed:dev.xroot/token-operations | changed | schema 1 display, origin and discovery |
| community-feed:direct.openclaw/mcp | changed | schema 1 display, origin and discovery |
| community-feed:directory.brick/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:directory.neeed/listings | changed | schema 1 display, origin and discovery |
| community-feed:discount.cryptoexchange/referral-codes | changed | schema 1 display, origin and discovery |
| community-feed:dk.afbudsrejser/travel-search | changed | schema 1 display, origin and discovery |
| community-feed:dk.companydata/companydata | changed | schema 1 display, origin and discovery |
| community-feed:do.craft.mcp/server | changed | schema 1 display, origin and discovery |
| community-feed:do.octopus/sitemaps | changed | schema 1 display, origin and discovery |
| community-feed:dog.ego/ego | changed | schema 1 display, origin and discovery |
| community-feed:domains.snooze/snooze | changed | schema 1 display, origin and discovery |
| community-feed:earth.earthlinc/earthlinc | changed | schema 1 display, origin and discovery |
| community-feed:earth.hotspot/creator-studio | changed | schema 1 display, origin and discovery |
| community-feed:eco.reeco/reecopedia | changed | schema 1 display, origin and discovery |
| community-feed:eco.unreasonable/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ee.city24/real-estate | changed | schema 1 display, origin and discovery |
| community-feed:ee.ehtekunst/arhiiv | changed | schema 1 display, origin and discovery |
| community-feed:ee.offsite/wristwise | changed | schema 1 display, origin and discovery |
| community-feed:email.verifly/verifly | changed | schema 1 display, origin and discovery |
| community-feed:energy.clarigrid/clarigrid | changed | schema 1 display, origin and discovery |
| community-feed:engineer.calc/calc | changed | schema 1 display, origin and discovery |
| community-feed:es.boletinclaro/mcp | changed | schema 1 display, origin and discovery |
| community-feed:es.carteleracines/cartelera | changed | schema 1 display, origin and discovery |
| community-feed:es.discovr/profiles | changed | schema 1 display, origin and discovery |
| community-feed:es.zacatrus/zacatrus | changed | schema 1 display, origin and discovery |
| community-feed:eu.checkmails/checkmails | changed | schema 1 display, origin and discovery |
| community-feed:eu.dastra/mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.drafto/mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.exante/exante-mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.gridgarden/studio | changed | schema 1 display, origin and discovery |
| community-feed:eu.hlido/mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.iban-test.www/iban-validation | changed | schema 1 display, origin and discovery |
| community-feed:eu.icos-cp/icos | changed | schema 1 display, origin and discovery |
| community-feed:eu.madeinro/digital-compass-mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.madeinro/rotv-mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.mmatinca/portfolio-mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.mmatinca/travel-trends-mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.nulegal/anwaelte | changed | schema 1 display, origin and discovery |
| community-feed:eu.nulegal/recht | changed | schema 1 display, origin and discovery |
| community-feed:eu.propecto/propecto | changed | schema 1 display, origin and discovery |
| community-feed:eu.qeaas/qeaas-mcp | changed | schema 1 display, origin and discovery |
| community-feed:eu.quantumreadiness/qrp-mcp#pypi:qrp-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:eu.tech.funding/funding-explorer | changed | schema 1 display, origin and discovery |
| community-feed:eu.tendfeed/tendfeed | changed | schema 1 display, origin and discovery |
| community-feed:eu.tracepass/tracepass#npm:tracepass-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:exchange.carso/carso-exchange-engine | changed | schema 1 display, origin and discovery |
| community-feed:exchange.merx/mcp | changed | schema 1 display, origin and discovery |
| community-feed:fast.sorted/event-registration | changed | schema 1 display, origin and discovery |
| community-feed:fi.akkilahdot/travel-search | changed | schema 1 display, origin and discovery |
| community-feed:fi.brighter/brighter | changed | schema 1 display, origin and discovery |
| community-feed:fi.lanetti/oma | changed | schema 1 display, origin and discovery |
| community-feed:fi.northpoint/marketing-compliance | changed | schema 1 display, origin and discovery |
| community-feed:fi.okunkoneosa/okun-koneosa | changed | schema 1 display, origin and discovery |
| community-feed:fi.rakentajaoutlet/rakentaja-outlet | changed | schema 1 display, origin and discovery |
| community-feed:fi.sukuk/sukukfi | changed | schema 1 display, origin and discovery |
| community-feed:film.martini/mcp | changed | schema 1 display, origin and discovery |
| community-feed:finance.norman/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:finance.shibui/data | changed | schema 1 display, origin and discovery |
| community-feed:fit.caliper/caliper | changed | schema 1 display, origin and discovery |
| community-feed:fit.occam/occam | changed | schema 1 display, origin and discovery |
| community-feed:fit.portfolio/portfoliofit | changed | schema 1 display, origin and discovery |
| community-feed:fm.996/perspectives | changed | schema 1 display, origin and discovery |
| community-feed:fm.bizzy/radio | changed | schema 1 display, origin and discovery |
| community-feed:fm.callboard/connector | changed | schema 1 display, origin and discovery |
| community-feed:fm.grep/grepfm | changed | schema 1 display, origin and discovery |
| community-feed:fm.podhome/podhome | changed | schema 1 display, origin and discovery |
| community-feed:food.myplate/nutrition | changed | schema 1 display, origin and discovery |
| community-feed:foundation.finance/finance-foundation | changed | schema 1 display, origin and discovery |
| community-feed:fr.aopx/aopx | changed | schema 1 display, origin and discovery |
| community-feed:fr.bestwestern.mcp-hotel/hotels | changed | schema 1 display, origin and discovery |
| community-feed:fr.bullionradar/bullionradar-mcp | changed | schema 1 display, origin and discovery |
| community-feed:fr.calculpro/outils-batiment | changed | schema 1 display, origin and discovery |
| community-feed:fr.carhunt/carhunt | changed | schema 1 display, origin and discovery |
| community-feed:fr.comparr/comparr | changed | schema 1 display, origin and discovery |
| community-feed:fr.gentry/logement | changed | schema 1 display, origin and discovery |
| community-feed:fr.heyanto/anto | changed | schema 1 display, origin and discovery |
| community-feed:fr.hypotheques-en-ligne/hel | changed | schema 1 display, origin and discovery |
| community-feed:fr.izifete/prestataires | changed | schema 1 display, origin and discovery |
| community-feed:fr.jeremydevos/agent-jobs | changed | schema 1 display, origin and discovery |
| community-feed:fr.lead-radar/lead-radar | changed | schema 1 display, origin and discovery |
| community-feed:fr.origami-entreprises/origami | changed | schema 1 display, origin and discovery |
| community-feed:fr.outilsia/local-ai-advisor | changed | schema 1 display, origin and discovery |
| community-feed:fr.oxadash/oxadash | changed | schema 1 display, origin and discovery |
| community-feed:fr.projet-ariane/ariane-orientation | changed | schema 1 display, origin and discovery |
| community-feed:fr.qalimo/qalimo | changed | schema 1 display, origin and discovery |
| community-feed:fr.renoolab/mcp | changed | schema 1 display, origin and discovery |
| community-feed:fr.runningworkout/running-workout | changed | schema 1 display, origin and discovery |
| community-feed:fr.scorecredit/capucine | changed | schema 1 display, origin and discovery |
| community-feed:fr.scoreimmobilier/outils | changed | schema 1 display, origin and discovery |
| community-feed:fr.scoreprotect/assurance | changed | schema 1 display, origin and discovery |
| community-feed:fr.sesapp/fiches | changed | schema 1 display, origin and discovery |
| community-feed:fr.statis-tir/statistir | changed | schema 1 display, origin and discovery |
| community-feed:fr.suxession/suxession | changed | schema 1 display, origin and discovery |
| community-feed:fr.swipify/facturation | changed | schema 1 display, origin and discovery |
| community-feed:fr.symphony/symphony | changed | schema 1 display, origin and discovery |
| community-feed:fr.synergieloc/immobilier | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:fr.verifier-ma-facture/validateur | changed | schema 1 display, origin and discovery |
| community-feed:fr.vigi-sky/vigisky | changed | schema 1 display, origin and discovery |
| community-feed:fr.vintage-postcard/boutique | changed | schema 1 display, origin and discovery |
| community-feed:fun.lesgooo/lesgooo | changed | schema 1 display, origin and discovery |
| community-feed:fun.memeswap/trading | changed | schema 1 display, origin and discovery |
| community-feed:fun.publish/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:fyi.clearmarket/clearmarket | changed | schema 1 display, origin and discovery |
| community-feed:fyi.levels/levels-fyi | changed | schema 1 display, origin and discovery |
| community-feed:fyi.mess/mess | changed | schema 1 display, origin and discovery |
| community-feed:fyi.rodin/rodin | changed | schema 1 display, origin and discovery |
| community-feed:games.moddable.tools/moddable-games-tools | changed | schema 1 display, origin and discovery |
| community-feed:games.needmoar/needmoar | changed | schema 1 display, origin and discovery |
| community-feed:garden.animes/animegarden | changed | schema 1 display, origin and discovery |
| community-feed:garden.stanislav.svelte-llm/svelte-llm-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ge.meni/guest | changed | schema 1 display, origin and discovery |
| community-feed:gg.bluffnet/bluffnet | changed | schema 1 display, origin and discovery |
| community-feed:gg.remix/remix-games | changed | schema 1 display, origin and discovery |
| community-feed:gg.renewly/contracts | changed | schema 1 display, origin and discovery |
| community-feed:gg.savecraft/savecraft | changed | schema 1 display, origin and discovery |
| community-feed:gg.superbot/superbot | changed | schema 1 display, origin and discovery |
| community-feed:gg.unicum/wot-stats | changed | schema 1 display, origin and discovery |
| community-feed:gg.var/naming-memory | changed | schema 1 display, origin and discovery |
| community-feed:gift.dhamma/pali-canon | changed | schema 1 display, origin and discovery |
| community-feed:gl.parse/mcp | changed | schema 1 display, origin and discovery |
| community-feed:glass.cocktail/cocktail-glass | changed | schema 1 display, origin and discovery |
| community-feed:global.rootz.cars/marketplace | changed | schema 1 display, origin and discovery |
| community-feed:global.rootz.food/grocery | changed | schema 1 display, origin and discovery |
| community-feed:global.rootz.origin/filings | changed | schema 1 display, origin and discovery |
| community-feed:global.rootz.politics/officials | changed | schema 1 display, origin and discovery |
| community-feed:global.rootz.rental/registry | changed | schema 1 display, origin and discovery |
| community-feed:global.rootz.ship/maritime | changed | schema 1 display, origin and discovery |
| community-feed:global.rootz.timeshare/resale | changed | schema 1 display, origin and discovery |
| community-feed:global.signals/signals-mcp | changed | schema 1 display, origin and discovery |
| community-feed:goog.workspace-developer/developer-tools | changed | schema 1 display, origin and discovery |
| community-feed:gr.bestprice/mcp | changed | schema 1 display, origin and discovery |
| community-feed:gr.jobily/jobs | changed | schema 1 display, origin and discovery |
| community-feed:graphics.time/timelines | changed | schema 1 display, origin and discovery |
| community-feed:guide.capitol/capitolguide | changed | schema 1 display, origin and discovery |
| community-feed:guide.smm/catalog | changed | schema 1 display, origin and discovery |
| community-feed:guru.goanywhere/storefront | changed | schema 1 display, origin and discovery |
| community-feed:health.chia/chia-mcp | changed | schema 1 display, origin and discovery |
| community-feed:help.501c3/compliance | changed | schema 1 display, origin and discovery |
| community-feed:help.servicebuddy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:host.nippy/nippy | changed | schema 1 display, origin and discovery |
| community-feed:house.bim/bimhouse | changed | schema 1 display, origin and discovery |
| community-feed:how.padel/racket-reviews | changed | schema 1 display, origin and discovery |
| community-feed:hr.svijet-beba/products | changed | schema 1 display, origin and discovery |
| community-feed:hr.trazimstan/nekretnine | changed | schema 1 display, origin and discovery |
| community-feed:hr.vip-cars/vipcars | changed | schema 1 display, origin and discovery |
| community-feed:hu.ablakarajanlat/nyilaszaro-mcp | changed | schema 1 display, origin and discovery |
| community-feed:hu.xfish/webshop | changed | schema 1 display, origin and discovery |
| community-feed:icu.connections/connections | changed | schema 1 display, origin and discovery |
| community-feed:id.setlist/setlist-id | changed | schema 1 display, origin and discovery |
| community-feed:il.co.alice/flights | changed | schema 1 display, origin and discovery |
| community-feed:il.co.deali/mcp | changed | schema 1 display, origin and discovery |
| community-feed:im.agenty/agenty | changed | schema 1 display, origin and discovery |
| community-feed:in.1acre/land-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:in.creo-memories/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:in.elytron/pollen | changed | schema 1 display, origin and discovery |
| community-feed:in.fastdb.md/chainpulse | changed | schema 1 display, origin and discovery |
| community-feed:in.fastdb.md/mdapi | changed | schema 1 display, origin and discovery |
| community-feed:in.getdrishti/drishti | changed | schema 1 display, origin and discovery |
| community-feed:in.marketping/marketping | changed | schema 1 display, origin and discovery |
| community-feed:in.paisatrade/paisatrade | changed | schema 1 display, origin and discovery |
| community-feed:in.railroute/journey-planner | changed | schema 1 display, origin and discovery |
| community-feed:in.remotestack/remotestack | changed | schema 1 display, origin and discovery |
| community-feed:in.reqres/reqres | changed | schema 1 display, origin and discovery |
| community-feed:in.sambodh-ias/upsc-prep | changed | schema 1 display, origin and discovery |
| community-feed:in.theboringpeople/mnema | changed | schema 1 display, origin and discovery |
| community-feed:in.upgrowth/growth-toolkit | changed | schema 1 display, origin and discovery |
| community-feed:in.vynix/vynix-mcp | changed | schema 1 display, origin and discovery |
| community-feed:in.xavio/merchant | changed | schema 1 display, origin and discovery |
| community-feed:in.xavio/storefront | changed | schema 1 display, origin and discovery |
| community-feed:info.appgoblin/app-store-analytics | changed | schema 1 display, origin and discovery |
| community-feed:info.storiesig/instagram-mcp | changed | schema 1 display, origin and discovery |
| community-feed:info.verifiedtools/ai-visibility-monitoring | changed | schema 1 display, origin and discovery |
| community-feed:info.vetclinic/directory | changed | schema 1 display, origin and discovery |
| community-feed:ing.compoundinterest/market-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ing.rentseek/evidence | changed | schema 1 display, origin and discovery |
| community-feed:ink.ml/ink | changed | schema 1 display, origin and discovery |
| community-feed:ink.writeflow/writeflow | changed | schema 1 display, origin and discovery |
| community-feed:io.4dayweek/jobs | changed | schema 1 display, origin and discovery |
| community-feed:io.accurecord/icd10-coding | changed | schema 1 display, origin and discovery |
| community-feed:io.adtao/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:io.advalorem.mev/intelligence | changed | schema 1 display, origin and discovery |
| community-feed:io.afterlaunch/agentic-growth-marketing | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.agent4/agent4-tenant | changed | schema 1 display, origin and discovery |
| community-feed:io.agentage/find-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.agentage/memory | changed | schema 1 display, origin and discovery |
| community-feed:io.ai2sql/ai2sql | changed | schema 1 display, origin and discovery |
| community-feed:io.aidc-ai/design-engine | dropped | authentication is required but the source declares no secret header |
| community-feed:io.airpipe/airpipe | changed | schema 1 display, origin and discovery |
| community-feed:io.alphagrowth/data | changed | schema 1 display, origin and discovery |
| community-feed:io.ambiscribe/ambiscribe | changed | schema 1 display, origin and discovery |
| community-feed:io.anchorbrowser/anchor-browser | changed | schema 1 display, origin and discovery |
| community-feed:io.apdf/main | changed | schema 1 display, origin and discovery |
| community-feed:io.apis/apis-io | changed | schema 1 display, origin and discovery |
| community-feed:io.appcircle/appcircle-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.applayer/tango | changed | schema 1 display, origin and discovery |
| community-feed:io.appllama/appllama | changed | schema 1 display, origin and discovery |
| community-feed:io.artifacta/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.asterpay/asterpay | changed | schema 1 display, origin and discovery |
| community-feed:io.audioalpha.www/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.autoady.www/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.avatarfactory/avatarfactory | changed | schema 1 display, origin and discovery |
| community-feed:io.balldontlie/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.banksync/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.baserow/baserow | changed | schema 1 display, origin and discovery |
| community-feed:io.beancount/beancount | changed | schema 1 display, origin and discovery |
| community-feed:io.betterlytics/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.bitquery/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.blinkpdf/blinkpdf | changed | schema 1 display, origin and discovery |
| community-feed:io.blockrazor/docs | changed | schema 1 display, origin and discovery |
| community-feed:io.bosonprotocol/agentic-commerce | changed | schema 1 display, origin and discovery |
| community-feed:io.brandfetch/brandfetch | changed | schema 1 display, origin and discovery |
| community-feed:io.browserless/mcp#npm:%40browserless.io%2Fmcp | dropped | streamable HTTPS remote preferred |
| community-feed:io.browserless/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.callin/callin | changed | schema 1 display, origin and discovery |
| community-feed:io.calvix/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.campaignstack/campaignstack | changed | schema 1 display, origin and discovery |
| community-feed:io.capacities/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.capawesome/capacitor-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.capawesome/ionic-framework-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.capawesome/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.catchmetrics.mcp/rum-analytics | dropped | authentication is required but the source declares no secret header |
| community-feed:io.cg3/prior | dropped | Its address needs values you choose. Add it under Custom. |
| community-feed:io.chamade/server | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.changenow/crypto-swap | changed | schema 1 display, origin and discovery |
| community-feed:io.chatcut/chatcut | dropped | header is not a declared secret reference |
| community-feed:io.chirpwireless/chirp | changed | schema 1 display, origin and discovery |
| community-feed:io.clearout/clearout | changed | schema 1 display, origin and discovery |
| community-feed:io.cloudpepper/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.cloudresume/resume-builder | changed | schema 1 display, origin and discovery |
| community-feed:io.clueso/video | changed | schema 1 display, origin and discovery |
| community-feed:io.coachsync/coachsync-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.cohereon.manifold/imperium-manifold | dropped | SSE-only transport |
| community-feed:io.competitortracker/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.concessio/concessio | dropped | SSE-only transport |
| community-feed:io.consentstack/cookie-consent | changed | schema 1 display, origin and discovery |
| community-feed:io.converly/converly | changed | schema 1 display, origin and discovery |
| community-feed:io.coupler/remote-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.cpln/control-plane | changed | schema 1 display, origin and discovery |
| community-feed:io.ctxt/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.customerly/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.cycloid.mcp/server | changed | schema 1 display, origin and discovery |
| community-feed:io.cypress.mcp/cypress-cloud | changed | schema 1 display, origin and discovery |
| community-feed:io.dadan/dadan | changed | schema 1 display, origin and discovery |
| community-feed:io.datavessel/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.dealscanner/dealscanner | changed | schema 1 display, origin and discovery |
| community-feed:io.defianceinternational/storefront | changed | schema 1 display, origin and discovery |
| community-feed:io.demiton/demiton | changed | schema 1 display, origin and discovery |
| community-feed:io.developerhub/docs | changed | schema 1 display, origin and discovery |
| community-feed:io.developerhub/editor | changed | schema 1 display, origin and discovery |
| community-feed:io.disdex/discord-servers | changed | schema 1 display, origin and discovery |
| community-feed:io.domainium/domainium-search | changed | schema 1 display, origin and discovery |
| community-feed:io.draw/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.dwelldata/real-estate-data | changed | schema 1 display, origin and discovery |
| community-feed:io.dxbdata/dxb-data | changed | schema 1 display, origin and discovery |
| community-feed:io.easyweek/business | changed | schema 1 display, origin and discovery |
| community-feed:io.ecfr/ecfr | changed | schema 1 display, origin and discovery |
| community-feed:io.ecfr/uscode | changed | schema 1 display, origin and discovery |
| community-feed:io.echelongraph/echelongraph-mcp#npm:echelongraph-mcp | dropped | streamable HTTPS remote preferred |
| community-feed:io.echelongraph/echelongraph-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.elevenlabs/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.elmah/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.endlss/endlss-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.eraser/eraser | changed | schema 1 display, origin and discovery |
| community-feed:io.etherscan/etherscan-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.eventify/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.factorguide/factorguide | changed | schema 1 display, origin and discovery |
| community-feed:io.famulor/famulor-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.fast/fast-io | changed | schema 1 display, origin and discovery |
| community-feed:io.favcrm/favcrm | changed | schema 1 display, origin and discovery |
| community-feed:io.flareapp/flare | changed | schema 1 display, origin and discovery |
| community-feed:io.fltln/faultline | changed | schema 1 display, origin and discovery |
| community-feed:io.followin/market-data | changed | schema 1 display, origin and discovery |
| community-feed:io.framelane/framelane | changed | schema 1 display, origin and discovery |
| community-feed:io.frase/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.fuse/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.futia/seo | changed | schema 1 display, origin and discovery |
| community-feed:io.gainium/gainium-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.genesisre/proofrelay-mcp-verifier | changed | schema 1 display, origin and discovery |
| community-feed:io.getunleash/unleash-mcp#npm:%40unleash%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.0Mattias/bettermemory#pypi:bettermemory | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.0xfreak0/sui-mcp#npm:sui-analytics-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.0xinsider/mcp#npm:%400xinsider%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.1clawAI/1claw-mcp#npm:%401claw%2Fmcp | dropped | It needs a key under a name the hub reserves. |
| community-feed:io.github.aarifmms/keyblind#npm:keyblind | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aaronsb/google-workspace#npm:%40aaronsb%2Fgoogle-workspace-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aartiq/nowaikit#npm:nowaikit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aarwitz/tapp#npm:%40aarwitz%2Ftapp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.abhinav162/poltertab#npm:poltertab | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.abuzerasr/asrai#npm:asrai-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.abuzerasr/asrai-apikey#npm:asrai-mcp-apikey | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.achiya-automation/safari-mcp#npm:safari-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.activeing123/mcptoon#pypi:mcptoon | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Agent360dk/browser-mcp#npm:%40agent360%2Fbrowser-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.agentic-hil/agentic-hil#pypi:agentic-hil | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.AgentsKit-io/doc-bridge#npm:%40agentskit%2Fdoc-bridge | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.agigante80/actual-mcp-server#npm:actual-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aibtcdev/mcp-server#npm:%40aibtc%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aidemd-mcp/server#npm:%40aidemd-mcp%2Fserver | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.AKzar1el/god-prompt-mcp#npm:god-prompt-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.AKzar1el/mcp-geo#npm:%40digestseo%2Fmcp-geo | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.AKzar1el/mcp-web-validator#npm:mcp-web-validator | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.AKzar1el/nofax#npm:nofax | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.alexar76/warden#npm:%40aimarket%2Fwarden | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.AliAkhtari78/spotifyscraper#pypi:spotifyscraper | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aligndottech/cli#npm:%40aligndottech%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.alisaitteke/photoshop-mcp#npm:%40alisaitteke%2Fphotoshop-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.allxsmith/bestax-mcp#npm:bestax-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aloth/olcli#npm:%40aloth%2Folcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.amcharts/amcharts5#npm:%40amcharts%2Famcharts5-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.anipotts/imessage-mcp#npm:imessage-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.anipottsbuilds/imessage-mcp#npm:imessage-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.antonbabenko/deliberation#npm:%40antonbabenko%2Fdeliberation-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.antonorlov/mcp-postgres-server#npm:mcp-postgres-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.antvis/mcp-server-chart#npm:%40antv%2Fmcp-server-chart | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.anyproto/anytype-mcp#npm:%40anyproto%2Fanytype-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aokings/thth#pypi:thth | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Apex-Foundation/copilot-mcp#npm:%40apexfdn%2Fcopilot-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.aplaceforallmystuff/mcp-arr#npm:mcp-arr-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ApparelHub-AI/apparelhub-mcp#npm:%40apparelhub%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.appium/appium-mcp#npm:appium-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.arc-mcp/arc-1#npm:arc-1 | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.arikusi/deepseek#npm:%40arikusi%2Fdeepseek-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Ark0N/codeman#npm:aicodeman | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Artexis10/exomem#pypi:exomem | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.artokun/comfyui-mcp#npm:comfyui-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.asklokesh/loki-mode#npm:loki-mode | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.astrogilda/tsbootstrap#pypi:tsbootstrap | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Ataraxy-Labs/sem#npm:%40ataraxy-labs%2Fsem | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.atomicstrata/llmwiki#npm:llm-wiki-compiler | dropped | Its command needs values you choose. |
| community-feed:io.github.atrislabs/atris#npm:atris | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Aureliolo/gdharness#npm:gdharness | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.AutomateLab-tech/citation-intelligence#npm:%40automatelab%2Fcitation-intelligence | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.AVIDS2/memorix#npm:memorix | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.avivsinai/langfuse-mcp#pypi:langfuse-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.awkoy/notion-mcp-server#npm:notion-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.awpthorp/posterly#npm:posterly-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.b1ff/atlassian-dc-mcp-bitbucket#npm:%40atlassian-dc-mcp%2Fbitbucket | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.b1ff/atlassian-dc-mcp-confluence#npm:%40atlassian-dc-mcp%2Fconfluence | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.b1ff/atlassian-dc-mcp-jira#npm:%40atlassian-dc-mcp%2Fjira | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.bakissation/mcp-google-multi#npm:mcp-google-multi | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.basicmachines-co/basic-memory#pypi:basic-memory | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.BenAHammond/code-auditor-mcp#npm:code-auditor-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.bgauryy/octocode-mcp#npm:octocode-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.bintocher/mcp-superset#pypi:mcp-superset | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.blackwell-systems/agent-lsp#npm:%40blackwell-systems%2Fagent-lsp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.blazickjp/arxiv-mcp-server#pypi:arxiv-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.blisspixel/recon#pypi:recon-tool | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.BlockRunAI/blockrun-mcp#npm:%40blockrun%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.BourbonDog/amicus#npm:amicus | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.brajendrak00068/levea-mcp-server#npm:levea-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.brave/brave-search-mcp-server#npm:%40brave%2Fbrave-search-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.brightdata/brightdata-mcp#npm:%40brightdata%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.brilliantdirectories/brilliant-directories-mcp#npm:brilliant-directories-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.browserstack/mcp-server#npm:%40browserstack%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.bruchris/canvas-lms-mcp#npm:canvas-lms-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Buoy-gg/mcp#npm:%40buoy-gg%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.bvisible/mcp-ssh-manager#npm:mcp-ssh-manager | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.bytebase/dbhub#npm:%40bytebase%2Fdbhub | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.bzsanti/oxidize-pdf-mcp#pypi:oxidize-pdf | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cablate/google-map#npm:%40cablate%2Fmcp-google-map | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cachly-dev/mcp-server#npm:%40cachly-dev%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.caelo-cms/caelo#npm:%40caelo-cms%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.caelum29/calibre-mcp#npm:calibre-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.callstack/agent-device#npm:agent-device | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.callstackincubator/agent-device#npm:agent-device | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cameroncooke/XcodeBuildMCP#npm:xcodebuildmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cap-js/mcp-server#npm:%40cap-js%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.capad-xyz/searchts#pypi:searchts | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.CHAPIBUNNY/repolens#npm:%40chappibunny%2Frepolens | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.chrischall/gemini-mcp#npm:%40chrischall%2Fgemini-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.chrischall/ofw-mcp#npm:ofw-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.chrischall/skylight-mcp#npm:skylight-mcp | dropped | item.connect.secrets[2].label: length outside 1..200 |
| community-feed:io.github.chrisdoc/hevy-mcp#npm:hevy-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.chrisryugj/kordoc#npm:kordoc | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ChristophEnglisch/keycloak-model-context-protocol#npm:keycloak-model-context-protocol | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.chriswu727/argus#pypi:argus-testing | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ChromeDevTools/chrome-devtools-mcp#npm:chrome-devtools-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Clipform/mcp-server#npm:%40clipform%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cmssy-io/cmssy-mcp#npm:%40cmssy%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.codefuturist/email-mcp#npm:%40codefuturist%2Femail-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.codegraph-ai/codegraph#npm:%40astudioplus%2Fcodegraph-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.CodesWhat/portkey-admin-mcp#npm:portkey-admin-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.colorjs/color-space#npm:color-space | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.comet-ml/opik-mcp#pypi:opik-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.conorbronsdon/postlint-mcp#npm:%40conorbronsdon%2Fpostlint-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.conorbronsdon/substack-mcp#npm:%40conorbronsdon%2Fsubstack-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.constellation-works/orbit#npm:%40orbit-tools%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.containers/kubernetes-mcp-server#npm:kubernetes-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Contentrain/contentrain#npm:%40contentrain%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.contextstream/mcp-server#npm:%40contextstream%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.CordilleraSarl/clearotron#npm:clearotron | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.curlymolelabs/supericons#npm:%40supericons%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.CursorTouch/Windows-MCP#pypi:windows-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/arxiv-mcp-server#npm:%40cyanheads%2Farxiv-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/biorxiv-mcp-server#npm:%40cyanheads%2Fbiorxiv-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/census-mcp-server#npm:%40cyanheads%2Fcensus-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/clinicaltrialsgov-mcp-server#npm:clinicaltrialsgov-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/crossref-mcp-server#npm:%40cyanheads%2Fcrossref-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/eur-lex-mcp-server#npm:%40cyanheads%2Feur-lex-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/git-mcp-server#npm:%40cyanheads%2Fgit-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/mcp-ts-core#npm:%40cyanheads%2Fmcp-ts-core | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/medical-codes-mcp-server#npm:%40cyanheads%2Fmedical-codes-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/nws-weather-mcp-server#npm:%40cyanheads%2Fnws-weather-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/obsidian-mcp-server#npm:obsidian-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/openalex-mcp-server#npm:%40cyanheads%2Fopenalex-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/openfda-mcp-server#npm:%40cyanheads%2Fopenfda-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/openstreetmap-mcp-server#npm:%40cyanheads%2Fopenstreetmap-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/pubchem-mcp-server#npm:%40cyanheads%2Fpubchem-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/pubmed-mcp-server#npm:%40cyanheads%2Fpubmed-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/ris-austria-mcp-server#npm:%40cyanheads%2Fris-austria-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/secedgar-mcp-server#npm:%40cyanheads%2Fsecedgar-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/usaspending-mcp-server#npm:%40cyanheads%2Fusaspending-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.cyanheads/wikipedia-mcp-server#npm:%40cyanheads%2Fwikipedia-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.D4umak/heylead#pypi:heylead | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.D4Vinci/Scrapling#pypi:scrapling | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Daghis/teamcity#npm:%40daghis%2Fteamcity-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dahshanlabs/klypix-mcp#npm:klypix-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.daleweaver1981/tariffmonitor-mcp#npm:tariffmonitor-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.DanceNitra/inspeximus#pypi:inspeximus | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.danoszz/penthera#npm:penthera | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.datenoio/iterabledata#pypi:iterabledata | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Datura-ai/lium#pypi:lium.io | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.davesheffer/hunch#npm:%40davesheffer%2Fhunch | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.DayuanJiang/next-ai-drawio#npm:%40next-ai-drawio%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dcostenco/prism-coder#npm:prism-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dearlordylord/huly-mcp#npm:%40firfi%2Fhuly-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.debu-sinha/excalidraw#npm:excalidraw-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.debugmcp/mcp-debugger#npm:%40debugmcp%2Fmcp-debugger | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.DeepAgentLabs/deep-agentic-core-mcp#pypi:deep-agentic-core-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.delimit-ai/delimit-mcp-server#npm:delimit-cli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.delorenj/mcp-server-trello#npm:%40delorenj%2Fmcp-server-trello | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dembrandt/dembrandt#npm:dembrandt | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.demi-hl/oracle#npm:%40oracle-agent%2Foracle | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.DeusData/codebase-memory-mcp#npm:codebase-memory-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.devag7/linkedin-mcp#npm:linkedin-mcp-tools | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.DFM-Finance/dfm-agent#npm:%40dfm-fi%2Fagent | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dgunning/edgartools#pypi:edgartools | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.DiffCI/diffci#npm:%40diffci.com%2Fdiffci | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.discourse/mcp#npm:%40discourse%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.DmitriyGolub/threejs-devtools#npm:threejs-devtools-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.docling-project/docling-mcp#pypi:docling-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dogrucanemek-alt/conarium#npm:%40conarium-ai%2Fcore | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.domdomegg/airtable-mcp-server#npm:airtable-mcp-server | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.domdomegg/computer-use-mcp#npm:computer-use-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dominik1001/caldav-mcp#npm:caldav-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dorukardahan/twitterapi-io-mcp#npm:twitterapi-io-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dpc00/sublime-mcp#pypi:sublime-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dr12hes/engrm#npm:engrm | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.drexthealpha/knos#pypi:knos | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.drjerryrelth/ghl-command#npm:%40elitedcs%2Fghl-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.duriantaco/skylos#pypi:skylos | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.dynatrace-oss/dynatrace-managed-mcp#npm:%40dynatrace-oss%2Fdynatrace-managed-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.electron-stagewright/core#npm:%40electron-stagewright%2Fcore | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.elgorro/aiquila-mcp#npm:aiquila-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.elibarnett/kie-mcp#npm:kie-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Elnora-AI/elnora-mcp-server#npm:%40elnora-ai%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.emailens/mcp#npm:%40emailens%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.EricSeokgon/egovframe-scaffold-mcp#npm:egovframe-scaffold-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Erodenn/godot-mcp-runtime#npm:godot-mcp-runtime | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.erpipe-org/mcp-odoo#pypi:odoo-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.esaio/esa#npm:%40esaio%2Fesa-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.event4u-app/agent-config#npm:%40event4u%2Fagent-config | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.everest-an/awareness-local#npm:%40awareness.market%2Flocal | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ExaDev/agent-comms#npm:agent-comms | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ffroliva/gflow-cli#pypi:gflow-cli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.firebase/firebase-mcp#npm:firebase-tools | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.firecrawl/firecrawl-mcp-server#npm:firecrawl-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Fizzl13/presign-guard-wallet#npm:presign-guard-wallet-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.FlayedOne/plesk-mcp#pypi:plesk-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.florentine-ai/mcp#npm:%40florentine-ai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.flowing-abyss/obsidian-hybrid-search#npm:obsidian-hybrid-search | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.fluttersdk/ai#npm:%40fluttersdk%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.fluxmailai/fluxmail#npm:fluxmail | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.formulahendry/code-runner#npm:mcp-server-code-runner | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.fr0ster/mcp-abap-adt#npm:%40mcp-abap-adt%2Fcore | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.freebeatfit/freebeat-mcp#npm:freebeat-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.freema/mcp-gsheets#npm:mcp-gsheets | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.freema/mcp-jira-stdio#npm:mcp-jira-stdio | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.freema/openclaw-mcp#npm:openclaw-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.frsorrentino/chrome-bridge#npm:chrome-bridge-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.fruggr/zendesk-mcp-server#npm:%40fruggr%2Fzendesk-mcp-server | dropped | Its command needs values you choose. |
| community-feed:io.github.FunplayAI/funplay-cocos-mcp#npm:funplay-cocos-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.gautamvarmadatla/mcpsafetywarden#pypi:mcpsafetywarden | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Get-Concord-AI/concord-mcp#npm:%40concord-ai%2Fconcord-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.getcargohq/cargo#npm:%40cargo-ai%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.geter-andru/andru-intelligence#npm:mcp-server-andru-intelligence | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.getmcpm/cli#npm:%40getmcpm%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.getsentry/sentry-mcp#npm:%40sentry%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ggozad/haiku-rag#pypi:haiku-rag | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.GhostPawJS/affinity#npm:%40ghostpaw%2Faffinity | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.GhostPawJS/codex#npm:%40ghostpaw%2Fcodex | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.GhostPawJS/email#npm:%40ghostpaw%2Femail | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.GhostPawJS/grimoire#npm:%40ghostpaw%2Fgrimoire | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.GhostPawJS/questlog#npm:%40ghostpaw%2Fquestlog | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.GhostPawJS/souls#npm:%40ghostpaw%2Fsouls | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.GhostPawJS/telegram#npm:%40ghostpaw%2Ftelegram | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.giancarloerra/socraticode#npm:socraticode | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.GLips/Figma-Context-MCP#npm:figma-developer-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.goklab/guardvibe#npm:guardvibe | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.grahamnotgrant/blacksmith#npm:blacksmith-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.gregario/warhammer-oracle#npm:warhammer-oracle | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.gripforgeai/mcp#npm:%40gripforgeai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.grossiweb/toolroute#npm:%40toolroute%2Fsdk | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.growthbook/growthbook-mcp#npm:%40growthbook%2Fmcp | dropped | Its environment needs manual setup. |
| community-feed:io.github.GuardBee/security-proxy#npm:%40guardbee%2Fmcp-security-proxy | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.gzchenhao/openhire#pypi:openhire | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Harusame64/desktop-touch-mcp#npm:%40harusame64%2Fdesktop-touch-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.hashgraph-online/hol-guard#pypi:hol-guard | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.hedgerow-dev/hayward#pypi:hayward | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.hedging8563/tokenlab#npm:%40tokenlabai%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.heossihq/bee-public#pypi:bee-sdk | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.hermoso-ai/hermoso#npm:hermoso | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.HiAi-gg/docsmint#npm:%40hiai-gg%2Fdocsmint | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.hidai25/evalview-mcp#pypi:evalview | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.hifriendbot/agentwallet#npm:agentwallet-mcp | dropped | Its environment needs manual setup. |
| community-feed:io.github.hjbaard/solidworks-mcp#pypi:solidworks-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.homeassistant-ai/ha-mcp#pypi:ha-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.homeofe/supply-chain-guard#npm:supply-chain-guard | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.hostinger/hostinger-api-mcp#npm:%40hostinger%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.houtini-ai/gemini#npm:%40houtini%2Fgemini-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.hypothesi/mcp-server-tauri#npm:%40hypothesi%2Ftauri-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ie3jp/illustrator-mcp-server#npm:illustrator-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.IgniteUI/igniteui-theming#npm:igniteui-theming | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.IgniteUI/mcp-server#npm:%40igniteui%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.igorsaevets/page2ai-mcp#npm:%40page2ai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.igorzheludkov/execbro#npm:execbro | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ihor-sokoliuk/mcp-searxng#npm:mcp-searxng | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.imperalcloud/imperal-mcp#pypi:imperal-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.inavi-systems/inavi-mcp#npm:%40inavi-maps%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/adios-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/arxiv-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/chronolog-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/compression-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/darshan-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/geo-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/geojson-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/hdf5-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/jarvis-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/lmod-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/ndp-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/node-hardware-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/pandas-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/parallel-sort-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/paraview-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/parquet-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/plot-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/sac-mcp#pypi:clio-kit | merged | duplicate connection or content; kept as community-feed:io.github.iowarp/geojson-mcp#pypi:clio-kit |
| community-feed:io.github.iowarp/scientific-catalog-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/seismic-mcp#pypi:clio-kit | merged | duplicate connection or content; kept as community-feed:io.github.iowarp/geojson-mcp#pypi:clio-kit |
| community-feed:io.github.iowarp/seismology-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/slurm-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/spack-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/terrain-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iowarp/web-mcp#pypi:clio-kit | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.isdaniel/mcp_weather_server#pypi:mcp-weather-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.iseppo/e-arveldaja-mcp#npm:e-arveldaja-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.j0hanz/filesystem-mcp#npm:%40j0hanz%2Ffilesystem-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.j7an/nexus-mcp#pypi:nexus-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.JasmyLab-JANCTION/janction-render#pypi:janction-render | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.JeanExtreme002/PyMemoryEditor#pypi:pymemoryeditor | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.jeanpfs/stock-images-mcp#npm:stock-images-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.jee1/memento-mcp-server#npm:memento-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.jfarcand/mirroir-mcp#npm:mirroir-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.jgravelle/jcodemunch-mcp#pypi:jcodemunch-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.jgravelle/jdocmunch-mcp#pypi:jdocmunch-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.john-broadway/proximo-proxmox#pypi:proximo-proxmox | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.jojo-labs/smart-web#npm:smart-web-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.jordanburke/reddit-mcp-server#npm:reddit-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.jotbins/jotview#npm:jotview | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.JoviDeCroock/pracht#npm:%40pracht%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.JustasMonkev/mcp-accessibility-scanner#npm:mcp-accessibility-scanner | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.JustinBeckwith/gongio-mcp#npm:gongio-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.karanb192/reddit-mcp-buddy#npm:reddit-mcp-buddy | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kartegagithub/laviya-agent-skills#npm:laviya-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kensaurus/mushi-mushi#npm:%40mushi-mushi%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Kentucky-ai/opentakeoff#npm:opentakeoff-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.KevinRabun/judges#npm:%40kevinrabun%2Fjudges | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.khuisman/mcp-gee-sweet#pypi:mcp-gee-sweet | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kitepon-rgb/aiterm-mcp#npm:aiterm-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kitepon/aiterm-mcp#npm:aiterm-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.KittyCAD/zoo-mcp#pypi:zoo_mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kivanccakmak/yaver#npm:yaver-cli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.klimPaskov/hoi4-agent-tools#npm:hoi4-agent-tools | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.KnockOutEZ/wigolo#npm:wigolo | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kochetkov-ma/brewpage-mcp#npm:brewpage-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kryptobaseddev/cleo-mcp-server#npm:%40cleocode%2Fcleo | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.KryptosAI/mcp-observatory#npm:%40kryptosai%2Fmcp-observatory | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.krzysztofbury/librus-mcp#pypi:librus-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kujenga/zotero-mcp#pypi:zotero-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.kumoproductions/mcp-aftereffects#npm:%40kumoproductions%2Fmcp-aftereffects | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.KushalP1/context-doctor#npm:context-doctor | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.KyaniteLabs/mcp-video#pypi:mcp-video | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.layervai/qurl-mcp#npm:%40layervai%2Fqurl-mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.lazyants/hetzner#npm:%40lazyants%2Fhetzner-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.lazyants/lexware#npm:%40lazyants%2Flexware-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.leadbay/leadbay-mcp#npm:%40leadbay%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.leancoderkavy/premiere-pro#npm:premiere-pro-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.lennix1337/genexus#npm:genexus-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.leonardosepulvedat/mcp-google-analytics#npm:mcp-google-analytics | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.letoribo/mcp-graphql-enhanced#npm:%40letoribo%2Fmcp-graphql-enhanced | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.log-10x/log10x-mcp#npm:log10x-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Looted/kibi-mcp#npm:kibi-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.lucaslubi/fidacy-mcp#npm:%40fidacy%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Lykhoyda/ask-gemini#npm:%40ask-llm%2Fgemini-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mapbox/mcp-server#npm:%40mapbox%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.marianfoo/arc-1#npm:arc-1 | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.MatanYemini/bitbucket-mcp#npm:bitbucket-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.matiasmaquieira96/risk-mcp#npm:prometiam-risk-mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.MaxEllis/orcaslicer-mcp#pypi:orcaslicer-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mcp-telegram/mcp-telegram#npm:%40overpod%2Fmcp-telegram | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mcp-z/mcp-gmail#npm:%40mcp-z%2Fmcp-gmail | dropped | package environment is not a declared secret reference |
| community-feed:io.github.mcp-z/mcp-pdf#npm:%40mcp-z%2Fmcp-pdf | dropped | package environment is not a declared secret reference |
| community-feed:io.github.Merit-Systems/agentcash#npm:agentcash | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.microsoft/playwright-mcp#npm:%40playwright%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.MikeyPetrillo/agent402#npm:agent402-mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.mnemoverse/mcp-memory-server#npm:%40mnemoverse%2Fmcp-memory-server | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.mobile-next/mobile-mcp#npm:%40mobilenext%2Fmobile-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.MohamedAbdallah-14/prompt-to-asset#npm:prompt-to-asset | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mohitagw15856/pm-claude-skills#npm:pm-claude-skills | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mongodb-js/mongodb-mcp-server#npm:mongodb-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.morluto/rea#npm:rea-agents | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mozilla/firefox-devtools-mcp#npm:%40mozilla%2Ffirefox-devtools-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mpalermiti/outlook-mcp#pypi:outlook-graph-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mughalhere/prompt-protection#npm:prompt-protection | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.MuhamadBarzani/forge-delegate#npm:forge-delegate | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.munhq/chat-recall#npm:chat-recall | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.murphywuwu/easysociable-mcp#npm:%40easysociable%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Muvon/octofs#npm:%40muvon%2Foctofs | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.mysleekdesigns/crawlforge-mcp-server#npm:crawlforge-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nailuoGG/anki-mcp-server#npm:anki-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.neat-technologies/neat#npm:%40neat.is%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.neuledge/context#npm:%40neuledge%2Fcontext | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.newrelic-experimental/preflight#npm:%40newrelic%2Fpreflight | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nikolai-vysotskyi/trace-mcp#npm:trace-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nikolausm/imap-mcp-server#npm:imap-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nikolay-e/diffctx#pypi:diffctx | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nithin554/code-crawler#npm:%40nithin554%2Fcode-crawler | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.node9-ai/node9#npm:node9-ai | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.noncelogic/mcp#npm:%40roveapi%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.noteflowai/dsh-skills-anywhere#npm:dsh-skills-anywhere | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.NotNull92/hera-agent-unity#npm:hera-agent-unity | dropped | package environment is not a declared secret reference |
| community-feed:io.github.nrwl/nx-console#npm:nx-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nrwl/nx-mcp#npm:nx-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nteract/semiotic#npm:semiotic | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nubo-db/dynoxide#npm:dynoxide | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.nucliweb/webperf-snippets#npm:webperf-snippets | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Nutlope/inspo#npm:inspo-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.oaslananka/easyeda-mcp-pro#npm:easyeda-mcp-pro | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.oaslananka/kicad-mcp-pro#pypi:kicad-mcp-pro | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ODU33104/rive-mcp#npm:rive-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.olostep/olostep-mcp-server#npm:olostep-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.omega-memory/core#pypi:omega-memory | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.omitly/omitly-mcp#npm:omitly-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.onelogin/onelogin-mcp#npm:%40onelogin%2Fonelogin-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.onlsol/relay-remotify-mcp#npm:remotify-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ooples/token-optimizer-mcp#npm:%40ooples%2Ftoken-optimizer-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.OpenAdaptAI/openadapt-agent#pypi:openadapt-agent | dropped | Its command needs values you choose. |
| community-feed:io.github.opennodes-io/opennodes#npm:%40opennodes%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.OpenTrain-AI/opentrain#npm:%40opentrain-ai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.OtaKit/otakit#npm:%40otakit%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.paivapiovesan/next-finance#npm:next-finance-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.PaSympa/discord-mcp#npm:%40pasympa%2Fdiscord-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.pattrnlabs/grain#npm:grain-tools | dropped | package environment is not a declared secret reference |
| community-feed:io.github.perplexityai/mcp-server#npm:%40perplexity-ai%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.phaedo-labs/phaedo-mcp#npm:phaedo-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.PhilipAD/health-export-mcp#npm:health-export-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.phillipclapham/anneal-memory#pypi:anneal-memory | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.pijusz/mcp-gsc#npm:mcp-gsc | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.piotr-agier/google-drive-mcp#npm:%40piotr-agier%2Fgoogle-drive-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.pipeworx-io/civitai#npm:%40pipeworx%2Fmcp-civitai | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.pipeworx-io/edgar#npm:%40pipeworx%2Fmcp-edgar | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.pipeworx-io/replicate#npm:%40pipeworx%2Fmcp-replicate | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.plur-ai/plur#npm:%40plur-ai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.pnp/cli-microsoft365-mcp-server#npm:%40pnp%2Fcli-microsoft365-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.pooriaarab/aigentify#npm:aigentify | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.priors-agents/priors#npm:%40priors%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ProfessionalWiki/mediawiki-mcp-server#npm:%40professional-wiki%2Fmediawiki-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.programinglive/dev-workflow-mcp-server#npm:%40programinglive%2Fdev-workflow-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.pzfreo/build123d-mcp#pypi:build123d-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Q00/ouroboros#pypi:ouroboros-ai | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Qiskit/qiskit-mcp-server#pypi:qiskit-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.qso-graph/adif-mcp#pypi:adif-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.qso-graph/netlogger-mcp#pypi:netlogger-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.qualixar/superlocalmemory#npm:superlocalmemory | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Quidli/connect-mcp#npm:%40quidli%2Fconnect-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.QVerisAI/mcp#npm:%40qverisai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.raccioly/docguard#npm:docguard-cli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.redis/mcp-redis#pypi:redis-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Regsorm/code-index#npm:%40regsorm%2Fcode-index-mcp | dropped | Its command needs values you choose. |
| community-feed:io.github.RekklesNA/proxmox-mcp-plus#pypi:proxmox-mcp-plus | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.reticlehq/reticle#npm:%40reticlehq%2Fserver | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.rhein1/agoragentic#npm:agoragentic-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.rich-jojo/smart-web#npm:smart-web-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.rigour-labs/rigour#npm:%40rigour-labs%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.rkocosmergon/cosmergon#pypi:cosmergon-agent | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.RohanMuppa/brightspace#npm:brightspace-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.roomi-fields/notebooklm-mcp#npm:%40roomi-fields%2Fnotebooklm-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.roomi-fields/osc-bridge#npm:%40roomi-fields%2Fosc-bridge | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ruslanlap/pagespeed-insights-mcp#npm:pagespeed-insights-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ruvnet/claude-flow#npm:claude-flow | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ruvnet/flow-nexus#npm:flow-nexus | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ruvnet/ruv-swarm#npm:ruv-swarm | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.s-b-e-n-s-o-n/portkey-admin-mcp#npm:portkey-admin-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.s-stefanov/actual-mcp#npm:actual-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Sahil170595/chimeraforge#pypi:chimeraforge | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Samik081/mcp-adguard-home#npm:%40samik081%2Fmcp-adguard-home | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.SAP-samples/hana-cli#npm:hana-cli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.SAP/fiori-mcp-server#npm:%40sap-ux%2Ffiori-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.SAP/mdk-mcp-server#npm:%40sap%2Fmdk-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.sapientsai/microsoft365-mcp-server#npm:microsoft365-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.saurabhsharma2u/search-console-mcp#npm:search-console-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.sblattj/whosaid#pypi:whosaid | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.sbroenne/mcp-server-excel#npm:%40sbroenne%2Fmcp-server-excel | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.scavio-ai/scavio-mcp#npm:%40scavio%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.SCGIS-Wales/helm-mcp#pypi:helm-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.seadonggyun4/truthound#pypi:truthound | dropped | Its command needs values you choose. |
| community-feed:io.github.SeanHogg/builderforce-memory#npm:%40seanhogg%2Fbuilderforce-memory-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.sebstaq/opencode-subagent-mcp#npm:opencode-subagent-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.seleniumbase/seleniumbase#pypi:seleniumbase | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.senoff/xlsx-for-ai#npm:xlsx-for-ai | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Sensie-agents/vibecheck#npm:%40somacheck%2Fvibecheck | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.seob717/redash-mcp#npm:redash-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.SepineTam/stata-mcp#pypi:stata-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Serdnaley/metabase-mcp#npm:%40serdnaley%2Fmetabase-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.serkan-ozal/browser-devtools-mcp#npm:browser-devtools-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.sezzlee/excel#npm:%40sezzlee%2Fexcel-mcp | dropped | Its command needs values you choose. |
| community-feed:io.github.shaqmughal/seekstone#npm:seekstone | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.shinpr/mcp-image#npm:mcp-image | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.shinpr/mcp-local-rag#npm:mcp-local-rag | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.shitianfang/jev-use#npm:jev-use | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.silverstein/minutes#npm:minutes-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.sipyourdrink-ltd/bernstein#pypi:bernstein | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.siweina/dsh-novel-writer#npm:dsh-novel-writer | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.smaniches/semantic-scholar-mcp#pypi:s2-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Snowflake-Labs/mcp#pypi:snowflake-labs-mcp | dropped | Its command needs values you choose. |
| community-feed:io.github.Softeria/ms-365-mcp-server#npm:%40softeria%2Fms-365-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.software-mansion/argent#npm:%40swmansion%2Fargent | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.spacecowboyian/brains#npm:brains-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.speakai/mcp-server#npm:%40speakai%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.sriinnu/tokmeter#npm:%40sriinnu%2Ftokmeter-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.sslugic/amem#npm:%40iamem%2Famem | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.steve228uk/metro-mcp#npm:metro-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Strom-Capital/mcp-server-db2i#npm:mcp-server-db2i | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.structured-world/gitlab-mcp#npm:%40structured-world%2Fgitlab-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.StuMason/coolify#npm:%40masonator%2Fcoolify-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.SummerEngine/summer#npm:summer-engine | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.svayatta/agent-custody#npm:%40agent-custody%2Freceipts | dropped | Its command needs values you choose. |
| community-feed:io.github.sweetcornna/free-search-mcp#pypi:free-search-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.swswordholy-tech/agentschat-mcp#npm:agentschat-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.SylphxAI/anymd#npm:%40sylphx%2Fanymd | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.t-crew/memory-pulse#npm:memory-pulse | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.t8y2/dbx#npm:%40dbx-app%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.taazkareem/clickup#npm:%40taazkareem%2Fclickup-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.tang-vu/keryx#npm:keryx-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.TANTIOPE/datadog-mcp#npm:datadog-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.taurgis/sfcc-dev-mcp#npm:sfcc-dev-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.tavily-ai/tavily-mcp#npm:tavily-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.taylorwilsdon/workspace-mcp#pypi:workspace-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Team-Commonly/commonly#npm:%40commonlyai%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.team-telnyx/telnyx#npm:telnyx | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.TencentCloudBase/cloudbase-mcp#npm:%40cloudbase%2Fcloudbase-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.tester-army/e2e#npm:e2e | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.The-40-Thieves/obsidian-tc#npm:obsidian-tc | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.The-Pixel-Boys/shield-kya#npm:%40shield-agent%2Fkya | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.tiptreesystems/lacuna-research-mcp#pypi:lacuna-research-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.TMHSDigital/screencast-mcp#npm:%40tmhs%2Fscreencast-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.tobee89/mcp-paperless-ngx#npm:mcp-paperless-ngx | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.TocharianOU/kibana#npm:%40tocharianou%2Fmcp-server-kibana | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.tombaldwin/candor#npm:candor-ts | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.tosin2013/mcp-adr-analysis-server#npm:mcp-adr-analysis-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.trackly-app/trackly#npm:trackly-cli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.TranHoaiHung/figma-ui-mcp#npm:figma-ui-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.transloadit/mcp-server#npm:%40transloadit%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Trusty-Squire/mcp#npm:%40trusty-squire%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.tufantunc/ssh-mcp#npm:ssh-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Typeroll/typeroll#npm:%40typeroll%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.uarlouski/testrail-mcp-server#npm:%40uarlouski%2Ftestrail-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.UI5/mcp-server#npm:%40ui5%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.UI5/webcomponents-react-mcp-server#npm:%40ui5%2Fwebcomponents-react-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.umbraco/Umbraco-CMS-MCP-Dev#npm:%40umbraco-cms%2Fmcp-dev | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.upstash/context7#npm:%40upstash%2Fcontext7-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.upstash/mcp-server#npm:%40upstash%2Fmcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.usekaneo/kaneo#npm:%40kaneo%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.usezn/zn-gate#npm:zn-gate | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.vercel/next-devtools-mcp#npm:next-devtools-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.vibeview/vibeview#npm:vibeview | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.vish288/mcp-gitlab#pypi:mcp-gitlab | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.vndee/llm-sandbox#pypi:llm-sandbox | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Voidborn-Industries/mindupload#npm:mindupload | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.vschernoff/solhint-mcp#npm:solhint-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.vshulcz/deja-vu#npm:%40vshulcz%2Fdeja-vu | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.vuluu2k/sbuilder-mcp#npm:sbuilder-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.webdriverio/mcp#npm:%40wdio%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.webull-inc/webull-openapi-mcp#pypi:webull-openapi-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.wiltodelta/remove-ai-watermarks#pypi:remove-ai-watermarks | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.wingfoil/wingfoil#npm:wingfoil | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.wonderwhy-er/desktop-commander#npm:%40wonderwhy-er%2Fdesktop-commander | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.WSattazahn/caveat-lang#npm:caveat-lang | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.wtznicy/my-websearch#npm:my-websearch | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.XAGI-Lab/melra#npm:%40melra%2Fcli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.Xerolo44/rpgmaker-mv-mcp#npm:%40xerolo44%2Frpgmaker-mv-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.XRPL-Utilities/mcp#npm:%40xrpl-utilities%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.XZXZZX-Ai/bilibili-mcp#npm:%40xzxzzx%2Fbilibili-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.yamadashy/repomix#npm:repomix | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.yaver-io/yaver#npm:yaver-cli | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.YawLabs/ctxlint#npm:%40yawlabs%2Fctxlint | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.YawLabs/postgres-mcp#npm:%40yawlabs%2Fpostgres-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.yokingma/time-mcp#npm:time-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.youdotcom-oss/mcp#npm:%40youdotcom-oss%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ZahiriNatZuke/local-delegate#pypi:local-delegate-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ZenRows/zenrows-mcp#npm:%40zenrows%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.zereight/gitlab-mcp#npm:%40zereight%2Fmcp-gitlab | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.zhixuli0406/duduclaw#npm:duduclaw | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.ZiggsAI/ziggs#npm:%40ziggs-ai%2Fziggs-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.github.zombico/mojulo#npm:mojulo | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.gjalla/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.govparse/gateway | changed | schema 1 display, origin and discovery |
| community-feed:io.grabmail/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.grovs/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.hamla/hamla | changed | schema 1 display, origin and discovery |
| community-feed:io.healthparse/gateway | changed | schema 1 display, origin and discovery |
| community-feed:io.heartly/deals | changed | schema 1 display, origin and discovery |
| community-feed:io.heldly/scheduler | changed | schema 1 display, origin and discovery |
| community-feed:io.helloledger/bookkeeping | changed | schema 1 display, origin and discovery |
| community-feed:io.heyreach/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.honeycomb/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.huint/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.hunchful/hunchful | changed | schema 1 display, origin and discovery |
| community-feed:io.idntty/parley | changed | schema 1 display, origin and discovery |
| community-feed:io.idntty/stash | changed | schema 1 display, origin and discovery |
| community-feed:io.ihateinvoicing/ihateinvoicing | changed | schema 1 display, origin and discovery |
| community-feed:io.illumora/craft | changed | schema 1 display, origin and discovery |
| community-feed:io.imagekit/admin | changed | schema 1 display, origin and discovery |
| community-feed:io.imagekit/dam | changed | schema 1 display, origin and discovery |
| community-feed:io.imagekit/devtools | changed | schema 1 display, origin and discovery |
| community-feed:io.imejis/imejis | changed | schema 1 display, origin and discovery |
| community-feed:io.inboxacademy/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.inboxguard/email-deliverability | changed | schema 1 display, origin and discovery |
| community-feed:io.indexone/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.indices/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.insourcia/insourcia | changed | schema 1 display, origin and discovery |
| community-feed:io.instadash/server | changed | schema 1 display, origin and discovery |
| community-feed:io.instalent/instalent-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.internetdata/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.investjournal/investjournal | changed | schema 1 display, origin and discovery |
| community-feed:io.ishlabs/ish | changed | schema 1 display, origin and discovery |
| community-feed:io.jobsbase/jobs | changed | schema 1 display, origin and discovery |
| community-feed:io.kaitoi/studio | changed | schema 1 display, origin and discovery |
| community-feed:io.kernelscan/kernelscan | changed | schema 1 display, origin and discovery |
| community-feed:io.keryo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.keyflight/pnr | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:io.keypup/engineering-analytics | changed | schema 1 display, origin and discovery |
| community-feed:io.kiloiot/kilo | changed | schema 1 display, origin and discovery |
| community-feed:io.klokin/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.kondux/seraph | changed | schema 1 display, origin and discovery |
| community-feed:io.kotzilla/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.landbot/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.laraplugins/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.leantrading/leantrading-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.liminary.api/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.linkflare/linkflare | changed | schema 1 display, origin and discovery |
| community-feed:io.linklist/linklist | dropped | authentication is required but the source declares no secret header |
| community-feed:io.liqaa/meetings | changed | schema 1 display, origin and discovery |
| community-feed:io.lmxcloud/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.localize/localize-io | changed | schema 1 display, origin and discovery |
| community-feed:io.lucidnest/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.lumind/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.macula/macula-mcp#npm:%40macula-io%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.magellandata/spotlight | changed | schema 1 display, origin and discovery |
| community-feed:io.mailtrap/mcp#npm:mcp-mailtrap | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.maindex/expert | changed | schema 1 display, origin and discovery |
| community-feed:io.maindex/smart | changed | schema 1 display, origin and discovery |
| community-feed:io.mcp-hangar/hangar#pypi:mcp-hangar | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.mcp-marketplace/search | changed | schema 1 display, origin and discovery |
| community-feed:io.mcpcentral/jsoncanvas | changed | schema 1 display, origin and discovery |
| community-feed:io.metavert/llmopt | changed | schema 1 display, origin and discovery |
| community-feed:io.minter/analytics | changed | schema 1 display, origin and discovery |
| community-feed:io.mobz.app/mobzio | changed | schema 1 display, origin and discovery |
| community-feed:io.moltjobs/moltjobs | changed | schema 1 display, origin and discovery |
| community-feed:io.morningscore/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.motomarks/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.mytesla/mytesla | changed | schema 1 display, origin and discovery |
| community-feed:io.namefi/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.nameintel/server | changed | schema 1 display, origin and discovery |
| community-feed:io.nestr/mcp#npm:%40nestr%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.neurall/neurall | changed | schema 1 display, origin and discovery |
| community-feed:io.neuronik/drop | dropped | authentication is required but the source declares no secret header |
| community-feed:io.nevlo/nevlo | changed | schema 1 display, origin and discovery |
| community-feed:io.nightbreak/forge | changed | schema 1 display, origin and discovery |
| community-feed:io.nocrash/nocrash | changed | schema 1 display, origin and discovery |
| community-feed:io.nolio/nolio | changed | schema 1 display, origin and discovery |
| community-feed:io.nolt/nolt | changed | schema 1 display, origin and discovery |
| community-feed:io.nowline/nowline#npm:%40nowline%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.nutrient/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.openvidu/docs | changed | schema 1 display, origin and discovery |
| community-feed:io.openwaters/ais | changed | schema 1 display, origin and discovery |
| community-feed:io.opsera/opsera | dropped | SSE-only transport |
| community-feed:io.orbator/orbator-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.oxylabs/oxylabs-mcp#pypi:oxylabs-mcp | dropped | streamable HTTPS remote preferred |
| community-feed:io.oxylabs/oxylabs-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.ozmoz/ozmoz#npm:ozmoz | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.penguin-stats/penguin-stats | changed | schema 1 display, origin and discovery |
| community-feed:io.philidor/defi-vaults | changed | schema 1 display, origin and discovery |
| community-feed:io.pickrate/pickrate | changed | schema 1 display, origin and discovery |
| community-feed:io.picsee/short-link | changed | schema 1 display, origin and discovery |
| community-feed:io.planable/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:io.powerpointengine/powerpoint-engine | changed | schema 1 display, origin and discovery |
| community-feed:io.preset/mcp-gateway | changed | schema 1 display, origin and discovery |
| community-feed:io.printpal/printpal | changed | schema 1 display, origin and discovery |
| community-feed:io.prisma/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.productsource/product-source | changed | schema 1 display, origin and discovery |
| community-feed:io.prospeo/prospeo-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.protonote/protonote | changed | schema 1 display, origin and discovery |
| community-feed:io.pubble/pubble | changed | schema 1 display, origin and discovery |
| community-feed:io.purchaseiq/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.puzzle/puzzle | changed | schema 1 display, origin and discovery |
| community-feed:io.qase/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.qase/mcp-server#npm:%40qase%2Fmcp-server | dropped | streamable HTTPS remote preferred |
| community-feed:io.qt.qt-docs-mcp/qt-documentation | changed | schema 1 display, origin and discovery |
| community-feed:io.quackr/quackr | changed | schema 1 display, origin and discovery |
| community-feed:io.quanti/mcp-server | dropped | authentication is required but the source declares no secret header |
| community-feed:io.reelmint/studio | changed | schema 1 display, origin and discovery |
| community-feed:io.revise/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.roadflow/roadflow | changed | schema 1 display, origin and discovery |
| community-feed:io.robells/robells | changed | schema 1 display, origin and discovery |
| community-feed:io.routescore/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.rtkmotion/data | changed | schema 1 display, origin and discovery |
| community-feed:io.ruddr/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.salestouch/salestouch | changed | schema 1 display, origin and discovery |
| community-feed:io.samrum/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.scispot/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.scorecard/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.sentinelsignal/scoring | changed | schema 1 display, origin and discovery |
| community-feed:io.sentinelsignal/verify | changed | schema 1 display, origin and discovery |
| community-feed:io.seoforgpt/seoforgpt-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.setip/emailmcp | changed | schema 1 display, origin and discovery |
| community-feed:io.shingou/sentiment | changed | schema 1 display, origin and discovery |
| community-feed:io.signado/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.simplyprint/simplyprint | changed | schema 1 display, origin and discovery |
| community-feed:io.simplyscan/simplyscan | changed | schema 1 display, origin and discovery |
| community-feed:io.simulis/brain | changed | schema 1 display, origin and discovery |
| community-feed:io.skala/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.sku/sku | changed | schema 1 display, origin and discovery |
| community-feed:io.slingdata/sling-cli#pypi:sling | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.smartroutes/smartroutes | dropped | authentication is required but the source declares no secret header |
| community-feed:io.smootify/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.snov/snov-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.snyk/mcp#npm:snyk | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.sota/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.sponsorfinder/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.sslip.13-62-217-51/earth-and-sky | changed | schema 1 display, origin and discovery |
| community-feed:io.sslip.138-197-15-135/hearth-onchain | changed | schema 1 display, origin and discovery |
| community-feed:io.sslip.169.126.216.95/sol-defi-desk | changed | schema 1 display, origin and discovery |
| community-feed:io.sslip.249.111.77.187/x402-mcp-tools | changed | schema 1 display, origin and discovery |
| community-feed:io.sslip.79-108-224-31/sitecheck | changed | schema 1 display, origin and discovery |
| community-feed:io.standoutmcp/standout | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.stocksonchain/stocks-on-chain | changed | schema 1 display, origin and discovery |
| community-feed:io.summit53/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.sunaivacore/gate | changed | schema 1 display, origin and discovery |
| community-feed:io.supernova/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.swiftnodes/swiftnodes | changed | schema 1 display, origin and discovery |
| community-feed:io.synci/synci | changed | schema 1 display, origin and discovery |
| community-feed:io.systemprompt/reports | changed | schema 1 display, origin and discovery |
| community-feed:io.tacyon/mc | changed | schema 1 display, origin and discovery |
| community-feed:io.telemost/telemost-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.temp-mail/temp-mail | changed | schema 1 display, origin and discovery |
| community-feed:io.tendeta/tendeta | changed | schema 1 display, origin and discovery |
| community-feed:io.tenova/swt3-witness#npm:%40tenova%2Fswt3-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:io.tinyfn/tinyfn | changed | schema 1 display, origin and discovery |
| community-feed:io.tkllabs.bh.mcp-servers/ethereum-toolkit | changed | schema 1 display, origin and discovery |
| community-feed:io.tkllabs.bh.mcp-servers/ipfs-toolkit | changed | schema 1 display, origin and discovery |
| community-feed:io.tkllabs.bh.mcp-servers/navigation-toolkit | changed | schema 1 display, origin and discovery |
| community-feed:io.toolforest/toolforest | changed | schema 1 display, origin and discovery |
| community-feed:io.toolzy/toolzy | changed | schema 1 display, origin and discovery |
| community-feed:io.toui/url-shortener | changed | schema 1 display, origin and discovery |
| community-feed:io.trovest/trovest | changed | schema 1 display, origin and discovery |
| community-feed:io.trunk/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.twitterapi/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:io.unstructured/transform | changed | schema 1 display, origin and discovery |
| community-feed:io.userpilot/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.vectree/diagrams | changed | schema 1 display, origin and discovery |
| community-feed:io.veed/fabric-mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.weavz/weavz | changed | schema 1 display, origin and discovery |
| community-feed:io.webshare/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.whatic/datasheets | changed | schema 1 display, origin and discovery |
| community-feed:io.wisesheets/wisesheets | changed | schema 1 display, origin and discovery |
| community-feed:io.wonderchat/wonderchat | changed | schema 1 display, origin and discovery |
| community-feed:io.wordlift/mcp-server | dropped | SSE-only transport |
| community-feed:io.ybug/mcp | changed | schema 1 display, origin and discovery |
| community-feed:io.zvid/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ir.bijack/loadboard | changed | schema 1 display, origin and discovery |
| community-feed:is.k01/synthetic-health-data | changed | schema 1 display, origin and discovery |
| community-feed:is.mink/viking-experience | changed | schema 1 display, origin and discovery |
| community-feed:is.who/whois | changed | schema 1 display, origin and discovery |
| community-feed:it.flusia/crm | changed | schema 1 display, origin and discovery |
| community-feed:it.giornaledellepmi/archivio | changed | schema 1 display, origin and discovery |
| community-feed:it.giornatamondiale/world-days | changed | schema 1 display, origin and discovery |
| community-feed:it.heera/agentimus | changed | schema 1 display, origin and discovery |
| community-feed:it.inviaggioallecanarie/canarie | changed | schema 1 display, origin and discovery |
| community-feed:it.machinesignal/b2b-lead-scoring-ranking-italy | changed | schema 1 display, origin and discovery |
| community-feed:it.machinesignal/discovery | changed | schema 1 display, origin and discovery |
| community-feed:it.officina/mcp | changed | schema 1 display, origin and discovery |
| community-feed:it.piqod/experiences-oracle | changed | schema 1 display, origin and discovery |
| community-feed:it.remly/remly | changed | schema 1 display, origin and discovery |
| community-feed:it.taxcompass/taxcompass | changed | schema 1 display, origin and discovery |
| community-feed:it.webtic/webtic | changed | schema 1 display, origin and discovery |
| community-feed:jobs.physicalai/physical-ai-jobs | changed | schema 1 display, origin and discovery |
| community-feed:jp.agentfeeds.api/agentfeeds | changed | schema 1 display, origin and discovery |
| community-feed:jp.bestcalendar/koyomi | changed | schema 1 display, origin and discovery |
| community-feed:jp.calil/library | changed | schema 1 display, origin and discovery |
| community-feed:jp.ekiten.eapi/ekiten-reservation | changed | schema 1 display, origin and discovery |
| community-feed:jp.menufresh/menufresh | changed | schema 1 display, origin and discovery |
| community-feed:kr.ai.vdb/vdb | changed | schema 1 display, origin and discovery |
| community-feed:kr.co.imagefactory/adops | changed | schema 1 display, origin and discovery |
| community-feed:kr.co.softbowl/sbchart2 | changed | schema 1 display, origin and discovery |
| community-feed:kr.co.softbowl/sbgrid3 | changed | schema 1 display, origin and discovery |
| community-feed:kr.ibtcc/competition-ratio | changed | schema 1 display, origin and discovery |
| community-feed:kr.it.zeroone.vibe-doctor/vibe-doctor | changed | schema 1 display, origin and discovery |
| community-feed:kr.wandsol/patent-search | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:kr.xdata/xdata-mcp | changed | schema 1 display, origin and discovery |
| community-feed:kz.tehprof.booking/reservations | changed | schema 1 display, origin and discovery |
| community-feed:la.roki/connect | changed | schema 1 display, origin and discovery |
| community-feed:land.makeup/v1 | changed | schema 1 display, origin and discovery |
| community-feed:land.moss/alpha-mcp | changed | schema 1 display, origin and discovery |
| community-feed:lat.oktopus/checkout-cod | changed | schema 1 display, origin and discovery |
| community-feed:law.ukimmigration/uk-immigration-tools | changed | schema 1 display, origin and discovery |
| community-feed:link.cyberelf.whetstone/tools | changed | schema 1 display, origin and discovery |
| community-feed:link.sinkto/sinkto | changed | schema 1 display, origin and discovery |
| community-feed:link.smirnov/mcp-oura | changed | schema 1 display, origin and discovery |
| community-feed:link.snapto/snapto | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.apps-sdk-template-14df1dd6/apps-sdk-template | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.clouddj-ce0f8cfd/clouddj | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.doing-v2-d5286fe8/doing | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.email-mcp-dbb94dbf/email-mcp | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.gueguesser-chatgptap-68537aa2/gueguesser-chatgptapp | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.lineup-bf157e35/lineup | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.linkup-company-resea-2df3e8e8/Linkup-Company-Research | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.mcp-server-template-7860f7d3/mcp-server-template-python | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.mcpimmo-10e693d9/mcpimmo | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.memoire-partagee-ffe6c8c2/Memoire-partagee | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.node-email-mcp-b25f10ec/node-email-mcp | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.node-mcp-3a40efc5/node-mcp | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.openjobs-3168f222/openjobs | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.qa-test-cli-b955e6a8/qa-test-cli | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.staging.demo-81c8a122/demo | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.staging.email-mcp-3b5a375e/email-mcp | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.staging.everything-app-7f22928f/everything-app | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.staging.everything-app-ce82911c/everything-app | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.staging.mcp-server-6283dc54/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.staging.send-email-mcp-04d3fdca/send-email-mcp | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.staging.skybridge-712c1350/skybridge | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.tasks-example-ca49f0f6/tasks-example | changed | schema 1 display, origin and discovery |
| community-feed:live.alpic.test-distribution-pr-a7d5a2d3/test-distribution-project | changed | schema 1 display, origin and discovery |
| community-feed:live.catchaset/catchaset | changed | schema 1 display, origin and discovery |
| community-feed:llc.facet/ucp-shopping | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:lol.fantasypundit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:london.taskman/home-services | changed | schema 1 display, origin and discovery |
| community-feed:love.chain.app/chainlove-mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:lu.chathome/chathome | changed | schema 1 display, origin and discovery |
| community-feed:lv.bezbaseina/mcp | changed | schema 1 display, origin and discovery |
| community-feed:lv.city24/real-estate | changed | schema 1 display, origin and discovery |
| community-feed:ly.img/codesign#npm:%40imgly%2Fcodesign-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:ma.datao/mcp | changed | schema 1 display, origin and discovery |
| community-feed:makeup.pro/mcp | changed | schema 1 display, origin and discovery |
| community-feed:market.execution/execution-market | changed | schema 1 display, origin and discovery |
| community-feed:market.mtok/mcp | changed | schema 1 display, origin and discovery |
| community-feed:market.plati.mcp/digimarket | changed | schema 1 display, origin and discovery |
| community-feed:market.waxed/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:markets.bellwether/prediction-markets | changed | schema 1 display, origin and discovery |
| community-feed:markets.oblique.api/oblique-markets | changed | schema 1 display, origin and discovery |
| community-feed:md.adsagent/google-mcp | changed | schema 1 display, origin and discovery |
| community-feed:md.adsagent/meta-mcp | changed | schema 1 display, origin and discovery |
| community-feed:md.adsagent/tiktok-mcp | changed | schema 1 display, origin and discovery |
| community-feed:md.eureka/eureka | dropped | authentication is required but the source declares no secret header |
| community-feed:md.install/try | changed | schema 1 display, origin and discovery |
| community-feed:me.ceki/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:me.didit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:me.divest/divestme | changed | schema 1 display, origin and discovery |
| community-feed:me.foodnear/foodnear-me | changed | schema 1 display, origin and discovery |
| community-feed:me.freehire/freehire | changed | schema 1 display, origin and discovery |
| community-feed:me.grok.nova-otter-delta-cloud/surface | changed | schema 1 display, origin and discovery |
| community-feed:me.hummatch/hummatch | changed | schema 1 display, origin and discovery |
| community-feed:me.in-context/portfolio | changed | schema 1 display, origin and discovery |
| community-feed:me.optiai/optiai | changed | schema 1 display, origin and discovery |
| community-feed:me.seekon.fast/product-discovery-mcp | changed | schema 1 display, origin and discovery |
| community-feed:me.structa/structa | dropped | authentication is required but the source declares no secret header |
| community-feed:me.zeeg/mcp | changed | schema 1 display, origin and discovery |
| community-feed:media.distro/distroverse | changed | schema 1 display, origin and discovery |
| community-feed:moda.ai/remote-camera | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:money.barker/stablecoin-yield | changed | schema 1 display, origin and discovery |
| community-feed:money.stables/mcp#npm:stables-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:mu.micro/mu | changed | schema 1 display, origin and discovery |
| community-feed:music.audora/audora | changed | schema 1 display, origin and discovery |
| community-feed:my.haas/human-tasks | changed | schema 1 display, origin and discovery |
| community-feed:my.wimm/wimm | changed | schema 1 display, origin and discovery |
| community-feed:net.0bull/phone-farm | changed | schema 1 display, origin and discovery |
| community-feed:net.agentfund/us-economic-macro-sec-edgar-onchain-data | changed | schema 1 display, origin and discovery |
| community-feed:net.aivideocheck/mcp | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:net.andrii/booking | changed | schema 1 display, origin and discovery |
| community-feed:net.apisecurityscan/securityscan | changed | schema 1 display, origin and discovery |
| community-feed:net.apppage/app-data | changed | schema 1 display, origin and discovery |
| community-feed:net.audiodelivery/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.brazilian-bikinis/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.casthost/radio | changed | schema 1 display, origin and discovery |
| community-feed:net.chatinbox/chatinbox | changed | schema 1 display, origin and discovery |
| community-feed:net.ciphera/pulse-analytics | changed | schema 1 display, origin and discovery |
| community-feed:net.clearbounce/email-verification | changed | schema 1 display, origin and discovery |
| community-feed:net.clickwise/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:net.composedchaos/speed-to-lead | changed | schema 1 display, origin and discovery |
| community-feed:net.crawlora/crawlora-mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.csclear/wire | changed | schema 1 display, origin and discovery |
| community-feed:net.deepgent/deepgent | changed | schema 1 display, origin and discovery |
| community-feed:net.dexi/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.domandata/domandata | changed | schema 1 display, origin and discovery |
| community-feed:net.explorersmap/explorersmap | changed | schema 1 display, origin and discovery |
| community-feed:net.fantasize/cruise-finder | changed | schema 1 display, origin and discovery |
| community-feed:net.foxnose/knowledge | dropped | authentication is required but the source declares no secret header |
| community-feed:net.fsaircraft/catalog | changed | schema 1 display, origin and discovery |
| community-feed:net.fundz/agent-api | changed | schema 1 display, origin and discovery |
| community-feed:net.fundz/fundz | changed | schema 1 display, origin and discovery |
| community-feed:net.gamedev/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.genebe/genebe-mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.identifai/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.inboxy/inboxy | changed | schema 1 display, origin and discovery |
| community-feed:net.inkseal/inkseal | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:net.k4tech/docs | changed | schema 1 display, origin and discovery |
| community-feed:net.kokofinance/koko-finance | changed | schema 1 display, origin and discovery |
| community-feed:net.lawyerd/takedown | changed | schema 1 display, origin and discovery |
| community-feed:net.lnx/lnx | changed | schema 1 display, origin and discovery |
| community-feed:net.lnx/qr | changed | schema 1 display, origin and discovery |
| community-feed:net.mimicly/chat-mockups | changed | schema 1 display, origin and discovery |
| community-feed:net.nanosheep/leafle | changed | schema 1 display, origin and discovery |
| community-feed:net.particular/particular-docs-mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.pdf/pdf-net-mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.periodix/actions | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:net.pifini/pifini | changed | schema 1 display, origin and discovery |
| community-feed:net.programmes/developer-tools | changed | schema 1 display, origin and discovery |
| community-feed:net.quantumcx/pseo-engine | changed | schema 1 display, origin and discovery |
| community-feed:net.rafsoft/faktura-vat | changed | schema 1 display, origin and discovery |
| community-feed:net.raidrunner/raidrunner | changed | schema 1 display, origin and discovery |
| community-feed:net.reogrid/studio | changed | schema 1 display, origin and discovery |
| community-feed:net.settro/sales-team | changed | schema 1 display, origin and discovery |
| community-feed:net.singular/mcp-server | dropped | SSE-only transport |
| community-feed:net.sitesai/app | changed | schema 1 display, origin and discovery |
| community-feed:net.sitesai/estimate | changed | schema 1 display, origin and discovery |
| community-feed:net.sodatsu-mitsumori/estimate-invoice | changed | schema 1 display, origin and discovery |
| community-feed:net.stealth/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.steamgpt/steamgpt | changed | schema 1 display, origin and discovery |
| community-feed:net.streamscanner/streamscanner | changed | schema 1 display, origin and discovery |
| community-feed:net.swaptitan/swaptitan | changed | schema 1 display, origin and discovery |
| community-feed:net.tasklite/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.titanium/quotations | changed | schema 1 display, origin and discovery |
| community-feed:net.todoist/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.ts.tail1b5f86.diamond/bitcoin-intel | changed | schema 1 display, origin and discovery |
| community-feed:net.ts.tail9c2892.hive-web/hive | changed | schema 1 display, origin and discovery |
| community-feed:net.unotes/unotes | changed | schema 1 display, origin and discovery |
| community-feed:net.urbot/bots | changed | schema 1 display, origin and discovery |
| community-feed:net.vaguslab/research | changed | schema 1 display, origin and discovery |
| community-feed:net.vericite/research | changed | schema 1 display, origin and discovery |
| community-feed:net.vibesprings/x402-tools | changed | schema 1 display, origin and discovery |
| community-feed:net.videostemporales/video-temporary-hosting | changed | schema 1 display, origin and discovery |
| community-feed:net.webhooktest/webhook-tester | changed | schema 1 display, origin and discovery |
| community-feed:net.whataplan.api/whataplan-mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.whiskyhunter/mcp | changed | schema 1 display, origin and discovery |
| community-feed:net.word-cloud/wordcloud | changed | schema 1 display, origin and discovery |
| community-feed:net.zenitheye/agent-commons | changed | schema 1 display, origin and discovery |
| community-feed:network.capability/physical-capability-cloud | changed | schema 1 display, origin and discovery |
| community-feed:network.edge/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:network.flint/agent-transaction-control | changed | schema 1 display, origin and discovery |
| community-feed:network.plurality/ai-context-flow | changed | schema 1 display, origin and discovery |
| community-feed:network.pocket/agentic-portal-mcp | changed | schema 1 display, origin and discovery |
| community-feed:network.shodai/agreements | changed | schema 1 display, origin and discovery |
| community-feed:network.tagit/nfc-verify | changed | schema 1 display, origin and discovery |
| community-feed:network.wellknown/wellknown | changed | schema 1 display, origin and discovery |
| community-feed:news.agingresearch/agingresearch-news | changed | schema 1 display, origin and discovery |
| community-feed:news.pollar/pollar-news | changed | schema 1 display, origin and discovery |
| community-feed:news.svodka/svodka | changed | schema 1 display, origin and discovery |
| community-feed:news.v3/desk | changed | schema 1 display, origin and discovery |
| community-feed:ng.amo/amo-ng | changed | schema 1 display, origin and discovery |
| community-feed:ng.ranked/ranked | changed | schema 1 display, origin and discovery |
| community-feed:ninja.mailtester/email-verification | changed | schema 1 display, origin and discovery |
| community-feed:ninja.selfmade/labs | changed | schema 1 display, origin and discovery |
| community-feed:nl.briefverzenden/post | changed | schema 1 display, origin and discovery |
| community-feed:nl.digi-data/digidata | dropped | authentication is required but the source declares no secret header |
| community-feed:nl.dinilu/mcp | changed | schema 1 display, origin and discovery |
| community-feed:nl.intermediair.www/jobs | changed | schema 1 display, origin and discovery |
| community-feed:nl.ledgerbotje/exact-online | changed | schema 1 display, origin and discovery |
| community-feed:nl.nationalevacaturebank.www/jobs | changed | schema 1 display, origin and discovery |
| community-feed:nl.praatmetjeboekhouding/exact-online | changed | schema 1 display, origin and discovery |
| community-feed:nl.svv-schatzoekers/public-selling-agent | changed | schema 1 display, origin and discovery |
| community-feed:nl.taklo/taklo-evi | changed | schema 1 display, origin and discovery |
| community-feed:nl.tradebrite/dutch-property-context | changed | schema 1 display, origin and discovery |
| community-feed:nl.tradebrite/dutch-vehicle-context | changed | schema 1 display, origin and discovery |
| community-feed:nl.winkelfactuur/tools | changed | schema 1 display, origin and discovery |
| community-feed:no.bonussok/award-search | changed | schema 1 display, origin and discovery |
| community-feed:no.cantara/wiki | changed | schema 1 display, origin and discovery |
| community-feed:no.ferbu/store | changed | schema 1 display, origin and discovery |
| community-feed:no.firmaradar/mcp | changed | schema 1 display, origin and discovery |
| community-feed:no.folgpris/folgpris | changed | schema 1 display, origin and discovery |
| community-feed:no.kulturbase/catalogue | changed | schema 1 display, origin and discovery |
| community-feed:no.mynto/mynto | changed | schema 1 display, origin and discovery |
| community-feed:no.restplass/travel-search | changed | schema 1 display, origin and discovery |
| community-feed:no.sladd/mcp | changed | schema 1 display, origin and discovery |
| community-feed:no.zoopit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:now.presso/presso | changed | schema 1 display, origin and discovery |
| community-feed:now.roundtable.mcp/roundtable | changed | schema 1 display, origin and discovery |
| community-feed:nz.co.calculate/calculator | changed | schema 1 display, origin and discovery |
| community-feed:nz.co.prelude/instruments | changed | schema 1 display, origin and discovery |
| community-feed:nz.wanakahaus/booking | changed | schema 1 display, origin and discovery |
| community-feed:one.easyrider/agent-board | changed | schema 1 display, origin and discovery |
| community-feed:one.faf/claude-faf-mcp#npm:claude-faf-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:one.faf/grok-faf-mcp#npm:grok-faf-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:one.pound/pound-one | changed | schema 1 display, origin and discovery |
| community-feed:one.secureai/redaction | changed | schema 1 display, origin and discovery |
| community-feed:one.socialai/website-mcp | changed | schema 1 display, origin and discovery |
| community-feed:one.yruz/mcp | changed | schema 1 display, origin and discovery |
| community-feed:one.zerno/zerno-lite | changed | schema 1 display, origin and discovery |
| community-feed:online.algrow/mcp | changed | schema 1 display, origin and discovery |
| community-feed:online.chainray/chainray | changed | schema 1 display, origin and discovery |
| community-feed:online.confess/machines | changed | schema 1 display, origin and discovery |
| community-feed:online.convert/file-converter | changed | schema 1 display, origin and discovery |
| community-feed:online.editclips/mcp | changed | schema 1 display, origin and discovery |
| community-feed:online.file-convert/fileconvert | changed | schema 1 display, origin and discovery |
| community-feed:online.jinero/jinero | changed | schema 1 display, origin and discovery |
| community-feed:online.numbers/numbers-online | changed | schema 1 display, origin and discovery |
| community-feed:online.paperlink/mcp | changed | schema 1 display, origin and discovery |
| community-feed:online.scope/mcp | changed | schema 1 display, origin and discovery |
| community-feed:online.trvaelmind/travelmind-mcp | changed | schema 1 display, origin and discovery |
| community-feed:online.webring/ring | changed | schema 1 display, origin and discovery |
| community-feed:ooo.tiro/tiro | changed | schema 1 display, origin and discovery |
| community-feed:org.3dprinteverything/print-shop | changed | schema 1 display, origin and discovery |
| community-feed:org.448c/sentinel | changed | schema 1 display, origin and discovery |
| community-feed:org.agentcommunity/mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.agentpub/papers | changed | schema 1 display, origin and discovery |
| community-feed:org.aioq/aio | changed | schema 1 display, origin and discovery |
| community-feed:org.americandefault/research | changed | schema 1 display, origin and discovery |
| community-feed:org.aquaview/aquaview-mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.aviationhs/private-jet-charter | changed | schema 1 display, origin and discovery |
| community-feed:org.benevolabs/irenictable | changed | schema 1 display, origin and discovery |
| community-feed:org.blocksigner/agentworld | changed | schema 1 display, origin and discovery |
| community-feed:org.brainkb/brainkb | changed | schema 1 display, origin and discovery |
| community-feed:org.btcdecoded/intelligence | changed | schema 1 display, origin and discovery |
| community-feed:org.californiabitcoin/agent-commerce | changed | schema 1 display, origin and discovery |
| community-feed:org.cashbackpro/cashbackpro | changed | schema 1 display, origin and discovery |
| community-feed:org.celo/docs-mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.celo/x402-facilitator | changed | schema 1 display, origin and discovery |
| community-feed:org.citizenofnowhere.rankings/global-metro-power-rankings | changed | schema 1 display, origin and discovery |
| community-feed:org.configo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.contextoverflow/library | changed | schema 1 display, origin and discovery |
| community-feed:org.dpdns.clair/clair | changed | schema 1 display, origin and discovery |
| community-feed:org.duckdns.43-134-36-21/python-code-reviewer | changed | schema 1 display, origin and discovery |
| community-feed:org.duckdns.gregswarm.api/open-data | changed | schema 1 display, origin and discovery |
| community-feed:org.duckdns.keepthis/persistent-text-store | changed | schema 1 display, origin and discovery |
| community-feed:org.edufeed/nope-mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.expatslist/mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.fairappraisers/mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.freetts/mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.gdacs/api | changed | schema 1 display, origin and discovery |
| community-feed:org.globalexchangerates/exchange-rates | changed | schema 1 display, origin and discovery |
| community-feed:org.huettentouren/tours | changed | schema 1 display, origin and discovery |
| community-feed:org.iarccum/archive | changed | schema 1 display, origin and discovery |
| community-feed:org.jainebooks/catalogue | changed | schema 1 display, origin and discovery |
| community-feed:org.kampyeri/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:org.lexiara/lexiara | changed | schema 1 display, origin and discovery |
| community-feed:org.machupicchu/wonders-mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.medicalaialliance/intelligence | changed | schema 1 display, origin and discovery |
| community-feed:org.melaya/melaya | changed | schema 1 display, origin and discovery |
| community-feed:org.metalcharts/metal-prices | changed | schema 1 display, origin and discovery |
| community-feed:org.notcve/vulnerability-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:org.nsgoods/nsgoods-workbench-mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.nyuengelberg/corpus | changed | schema 1 display, origin and discovery |
| community-feed:org.openalex/openalex | changed | schema 1 display, origin and discovery |
| community-feed:org.openarg/datos-publicos | changed | schema 1 display, origin and discovery |
| community-feed:org.opencityrecord/opencity | changed | schema 1 display, origin and discovery |
| community-feed:org.openserp/mcp#npm:%40openserp%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:org.openweathermap/agents | dropped | It needs a key under a name the hub reserves. |
| community-feed:org.papex/mcp#npm:%40papexlabs%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:org.pinnacleblooms/ask | changed | schema 1 display, origin and discovery |
| community-feed:org.polyform/polyform | changed | schema 1 display, origin and discovery |
| community-feed:org.promptdna/promptdna | changed | schema 1 display, origin and discovery |
| community-feed:org.pwhois/pwhois | changed | schema 1 display, origin and discovery |
| community-feed:org.rentbuy/rentbuy | changed | schema 1 display, origin and discovery |
| community-feed:org.rrmacademy/library | changed | schema 1 display, origin and discovery |
| community-feed:org.safecreative/platform | changed | schema 1 display, origin and discovery |
| community-feed:org.scienceswarm/commerce-validators | changed | schema 1 display, origin and discovery |
| community-feed:org.sentimentfx/market-sentiment | changed | schema 1 display, origin and discovery |
| community-feed:org.sovgrid/self-hosted-ai | changed | schema 1 display, origin and discovery |
| community-feed:org.steadysteel/steady-steel | changed | schema 1 display, origin and discovery |
| community-feed:org.string-db/string-mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.sunrise-sunset/sun-times | changed | schema 1 display, origin and discovery |
| community-feed:org.svgai/svg-ai | changed | schema 1 display, origin and discovery |
| community-feed:org.swapp1990.designforyou/designforyou | changed | schema 1 display, origin and discovery |
| community-feed:org.swapp1990.writer/writer | changed | schema 1 display, origin and discovery |
| community-feed:org.texs/tapercraft | changed | schema 1 display, origin and discovery |
| community-feed:org.thorchain/thorchain-mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.thru/thru-explorer | changed | schema 1 display, origin and discovery |
| community-feed:org.tickets4pets/events | changed | schema 1 display, origin and discovery |
| community-feed:org.totto/knowledge | changed | schema 1 display, origin and discovery |
| community-feed:org.typesense/typesense-cloud | changed | schema 1 display, origin and discovery |
| community-feed:org.ungovr/mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.unyly/gateway | changed | schema 1 display, origin and discovery |
| community-feed:org.uscodex/uscodex | changed | schema 1 display, origin and discovery |
| community-feed:org.ventureatlas/venture-atlas | changed | schema 1 display, origin and discovery |
| community-feed:org.verifiedhandles/verified-handles | changed | schema 1 display, origin and discovery |
| community-feed:org.vicp-registry/vicp-registry | changed | schema 1 display, origin and discovery |
| community-feed:org.videohistoryproject/research | changed | schema 1 display, origin and discovery |
| community-feed:org.virtualflybrain/vfb3-mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.wegtultrarich/mcp | changed | schema 1 display, origin and discovery |
| community-feed:org.wikiprompt/mcp | changed | schema 1 display, origin and discovery |
| community-feed:page.anew/anew | changed | schema 1 display, origin and discovery |
| community-feed:page.details/details-page | changed | schema 1 display, origin and discovery |
| community-feed:page.doc/pdf-extract | changed | schema 1 display, origin and discovery |
| community-feed:page.infra/mcp | changed | schema 1 display, origin and discovery |
| community-feed:page.notepad/notepad | changed | schema 1 display, origin and discovery |
| community-feed:pizza.redirect/mcp | dropped | authentication is required but the source declares no secret header |
| community-feed:pk.myservice/hotels | changed | schema 1 display, origin and discovery |
| community-feed:pl.analizafirm/krs | changed | schema 1 display, origin and discovery |
| community-feed:pl.barwa/drukarnia | changed | schema 1 display, origin and discovery |
| community-feed:pl.biletyna/events-search | changed | schema 1 display, origin and discovery |
| community-feed:pl.cenogram/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:pl.gamedev/creator | changed | schema 1 display, origin and discovery |
| community-feed:pl.idfmetale/catalog-feed | changed | schema 1 display, origin and discovery |
| community-feed:pl.mobilna-faktura/panel | changed | schema 1 display, origin and discovery |
| community-feed:pl.nipregon/nipregon | changed | schema 1 display, origin and discovery |
| community-feed:pl.noclegowo/noclegowo | changed | schema 1 display, origin and discovery |
| community-feed:pl.numertel/numertel | changed | schema 1 display, origin and discovery |
| community-feed:pl.oleba/remonty | changed | schema 1 display, origin and discovery |
| community-feed:pl.org.attentio/petycje | changed | schema 1 display, origin and discovery |
| community-feed:pl.szuruszuru/booking | changed | schema 1 display, origin and discovery |
| community-feed:place.clubs/nippo | changed | schema 1 display, origin and discovery |
| community-feed:plus.gym/gym-plus | changed | schema 1 display, origin and discovery |
| community-feed:porn.tik-tok/tiktokporn | changed | schema 1 display, origin and discovery |
| community-feed:press.gps/gps-public-data | changed | schema 1 display, origin and discovery |
| community-feed:press.respira/respira-wordpress#npm:%40respira%2Fwordpress-mcp-server | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:pro.begonia/begonia-pro | changed | schema 1 display, origin and discovery |
| community-feed:pro.formdesigner/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:pro.laspi/directory | changed | schema 1 display, origin and discovery |
| community-feed:pro.ledgerhq/ledgerhq | changed | schema 1 display, origin and discovery |
| community-feed:pro.particle/particle-pro | changed | schema 1 display, origin and discovery |
| community-feed:pro.pixeldrive/pixeldrive | changed | schema 1 display, origin and discovery |
| community-feed:pro.worldclock/time | changed | schema 1 display, origin and discovery |
| community-feed:pt.lexbase/legislacao-portuguesa | changed | schema 1 display, origin and discovery |
| community-feed:pw.algo.ai/agent-commons | changed | schema 1 display, origin and discovery |
| community-feed:pw.hubris/hubris-mcp | changed | schema 1 display, origin and discovery |
| community-feed:realestate.secrets/property-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:realestate.verified/landlens-one | changed | schema 1 display, origin and discovery |
| community-feed:red.atlas/red-atlas-api | changed | schema 1 display, origin and discovery |
| community-feed:report.pure/news | changed | schema 1 display, origin and discovery |
| community-feed:report.thales/thales | changed | schema 1 display, origin and discovery |
| community-feed:reviews.rami/rami | changed | schema 1 display, origin and discovery |
| community-feed:ro.autoid/autoid-support | changed | schema 1 display, origin and discovery |
| community-feed:ro.avizo/avizo-mcp | changed | schema 1 display, origin and discovery |
| community-feed:ro.clickphone/clickphone | changed | schema 1 display, origin and discovery |
| community-feed:ro.factureaza/factureaza | changed | schema 1 display, origin and discovery |
| community-feed:ro.meseriasi/meseriasi-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:ro.soundcreation/catalog | changed | schema 1 display, origin and discovery |
| community-feed:ro.tria/lodging-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:ro.trisport/store | changed | schema 1 display, origin and discovery |
| community-feed:rocks.iching/hexagram-mcp | changed | schema 1 display, origin and discovery |
| community-feed:rs.ferritin/rustdoc | changed | schema 1 display, origin and discovery |
| community-feed:rs.rides/airport-transfers | changed | schema 1 display, origin and discovery |
| community-feed:ru.dashamail/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ru.htmlweb/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ru.iipodpis/iipodpis | changed | schema 1 display, origin and discovery |
| community-feed:ru.investmint/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ru.krasoft/zakupki | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ru.lab4u.mcp/lab4u | changed | schema 1 display, origin and discovery |
| community-feed:ru.laguna-pools.mcp/pools | changed | schema 1 display, origin and discovery |
| community-feed:ru.layero/layero | changed | schema 1 display, origin and discovery |
| community-feed:ru.lpmotor/mottor | dropped | authentication is required but the source declares no secret header |
| community-feed:ru.quintadb/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ru.renthuman/renthuman | changed | schema 1 display, origin and discovery |
| community-feed:ru.tuqo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ru.value-pro/value-pro-mcp | changed | schema 1 display, origin and discovery |
| community-feed:run.domani/domani | changed | schema 1 display, origin and discovery |
| community-feed:run.imho/games | changed | schema 1 display, origin and discovery |
| community-feed:run.pantheon/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:run.parlay/parlay | changed | schema 1 display, origin and discovery |
| community-feed:run.runlane/board | changed | schema 1 display, origin and discovery |
| community-feed:run.shots/shots | changed | schema 1 display, origin and discovery |
| community-feed:run.stas/stas | changed | schema 1 display, origin and discovery |
| community-feed:run.val.web.aideprecations--89b1777ed29f11f1a12e1607ee4eb77e/ai-deprecations | changed | schema 1 display, origin and discovery |
| community-feed:run.val.web.oronzo--dbb1424cc94f11f18b571607ee4eb77e/milan-direct-booking | changed | schema 1 display, origin and discovery |
| community-feed:sa.com.ventureinsights.solutions/venture-diagnostic | changed | schema 1 display, origin and discovery |
| community-feed:sa.karve/booking | changed | schema 1 display, origin and discovery |
| community-feed:sbs.culture/commons | changed | schema 1 display, origin and discovery |
| community-feed:school.delegation/delegation-school | changed | schema 1 display, origin and discovery |
| community-feed:science.pith/pith | changed | schema 1 display, origin and discovery |
| community-feed:se.aapl/nyheter | changed | schema 1 display, origin and discovery |
| community-feed:se.glowjakt/glowjakt | changed | schema 1 display, origin and discovery |
| community-feed:se.jakvab/scout | changed | schema 1 display, origin and discovery |
| community-feed:se.likarika/budget | changed | schema 1 display, origin and discovery |
| community-feed:se.livespot/mcp | changed | schema 1 display, origin and discovery |
| community-feed:se.nordsynk/fortnox | changed | schema 1 display, origin and discovery |
| community-feed:se.sistaminuten/travel-search | changed | schema 1 display, origin and discovery |
| community-feed:se.statistikdata/server | changed | schema 1 display, origin and discovery |
| community-feed:sg.homejourney/listings | changed | schema 1 display, origin and discovery |
| community-feed:sh.agentcard/agentcard | changed | schema 1 display, origin and discovery |
| community-feed:sh.agentdrive/agentdrive | changed | schema 1 display, origin and discovery |
| community-feed:sh.antrieb/antrieb | changed | schema 1 display, origin and discovery |
| community-feed:sh.clamp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.copywriting/copyscore | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.appstore/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.google-maps/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.google-news/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.google/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.googleplay/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.instagram/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.reddit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.tiktok/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.twitter/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.yelp/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.fetcher.youtube/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.glim/glim | changed | schema 1 display, origin and discovery |
| community-feed:sh.grabbit/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.graded/graded-x402 | changed | schema 1 display, origin and discovery |
| community-feed:sh.kwant/kwant | changed | schema 1 display, origin and discovery |
| community-feed:sh.marginal/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.microservices/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.newsflash/newsflash | changed | schema 1 display, origin and discovery |
| community-feed:sh.opencapital/mcp | changed | schema 1 display, origin and discovery |
| community-feed:sh.ripples/ripples | changed | schema 1 display, origin and discovery |
| community-feed:sh.safeguard/safeguard | changed | schema 1 display, origin and discovery |
| community-feed:sh.superlog/superlog | changed | schema 1 display, origin and discovery |
| community-feed:sh.twitr/twitr | changed | schema 1 display, origin and discovery |
| community-feed:sh.uldl/uldl | changed | schema 1 display, origin and discovery |
| community-feed:sh.uploads/mcp#npm:%40buildinternet%2Fuploads | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:sh.xorfox.drawbridge/server | dropped | SSE-only transport |
| community-feed:shop.nagora/nagora | changed | schema 1 display, origin and discovery |
| community-feed:shop.tier1/tier1-shop | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.a12tuyen.ai-exchange/ai-exchange | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.alert-crab-1890.pageproof/pdf-extract | dropped | header is not a declared secret reference |
| community-feed:site.chatgpt.alexvelez951205.human-relay-alex/human-relay | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.aqua-orbit-4010.common-agent-commons/common | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.army20160422.agentread-json-api/agentread | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.beigemelon258.agentcompute-pilot-portal/english-transcription | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.bootyplease.saas-bundlecheck/sideeye | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.cursoraikk.agent-arcade-ai/agent-arcade | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.cv5gyqnshz.field-404kin/transaction-intent | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.feycarp32.eclypse-sanctuary/eclypse | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.general615444.coopnet-agent-lab/coopnet | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.hendrixerceg.tao-reach-home/tao-reach-home | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.jessesay.leadproof/sales-agent | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.larklaon.one-bad-idea/not-work | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.lorh89.the-knowledge-commons/evidence | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.mitchellwhite.tableproof-data/tableproof | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.newvideocreator.human-test-desk/human-test-desk | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.no-qt.noqt/yumi-cost-aware-diagnostic-planner | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.no-qt.noqt/yumi-pypi-wheel-evidence | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.orangeslug16.dmitry-agent-appeal/voluntary-support | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.orellise.relay-agent-services/relay | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.predicata-9274.ai-ventures/ai-ventures | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.rlong33.ron-human-task-desk/human-task-desk | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.sarath0210.shekkizh-agent-exchange/agent-exchange | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.snoworacle.more-time-andrew/moretime | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.snugguppy5.accessgraph/accessgraph | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.super-myna-7255.agent-reserve-protocol/agent-transaction-firewall | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.super-myna-7255.crowdgap-pilot/probability-research | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.the-love-cam-1555.love-campus-sales-agent/commerce-agent | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.tuned-drake-1114.execution-evidence-lab/agent-workspace-notes | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.unamed.othernet-reunion/othernet | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.xuikatwsicrdsidm.batchloom-studio-0913/evidence | changed | schema 1 display, origin and discovery |
| community-feed:site.chatgpt.yotch0928.genesis-agent-network/genesis | changed | schema 1 display, origin and discovery |
| community-feed:site.guidelines/guidelines | changed | schema 1 display, origin and discovery |
| community-feed:site.lanlan/website-builder | changed | schema 1 display, origin and discovery |
| community-feed:site.pdfzen/render | changed | schema 1 display, origin and discovery |
| community-feed:site.skew/skew | changed | schema 1 display, origin and discovery |
| community-feed:sk.sos-battery/booking | changed | schema 1 display, origin and discovery |
| community-feed:so.anteroom/anteroom | changed | schema 1 display, origin and discovery |
| community-feed:so.cello/mcp | changed | schema 1 display, origin and discovery |
| community-feed:so.circle/circle | changed | schema 1 display, origin and discovery |
| community-feed:so.coreloop/directory | changed | schema 1 display, origin and discovery |
| community-feed:so.echoai/echo-ai | changed | schema 1 display, origin and discovery |
| community-feed:so.eden/eden | changed | schema 1 display, origin and discovery |
| community-feed:so.faceless/faceless | changed | schema 1 display, origin and discovery |
| community-feed:so.falcon/frontier-reference | changed | schema 1 display, origin and discovery |
| community-feed:so.hilt/agent-commerce | changed | schema 1 display, origin and discovery |
| community-feed:so.hilt/pay-me | changed | schema 1 display, origin and discovery |
| community-feed:so.linkup.mcp/linkup-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:so.mida/ab-testing | changed | schema 1 display, origin and discovery |
| community-feed:so.outrank/outrank | changed | schema 1 display, origin and discovery |
| community-feed:so.outstand/outstand | changed | schema 1 display, origin and discovery |
| community-feed:so.pharaoh/pharaoh#npm:%40pharaoh-so%2Fmcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:so.pixelflow/pixelflow | changed | schema 1 display, origin and discovery |
| community-feed:so.seeder/dms | changed | schema 1 display, origin and discovery |
| community-feed:so.sombra/sombra | changed | schema 1 display, origin and discovery |
| community-feed:so.tweek/mcp | changed | schema 1 display, origin and discovery |
| community-feed:so.upstream/upstream | changed | schema 1 display, origin and discovery |
| community-feed:space.customjs/customjs-mcp | changed | schema 1 display, origin and discovery |
| community-feed:space.freedomlab.loki/walletwatch | changed | schema 1 display, origin and discovery |
| community-feed:space.groovalizer/milkdrop-music-visualizer | changed | schema 1 display, origin and discovery |
| community-feed:space.hf.hoyant-su-agentic-rl/agentic-rl | changed | schema 1 display, origin and discovery |
| community-feed:space.innernote/innernote | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:space.mage/mage | changed | schema 1 display, origin and discovery |
| community-feed:space.manus.signalsprint-mqysbksh/signal-sprint | changed | schema 1 display, origin and discovery |
| community-feed:space.monon/additive-atlas | changed | schema 1 display, origin and discovery |
| community-feed:space.r3plica/catalog | changed | schema 1 display, origin and discovery |
| community-feed:space.steady/steady | changed | schema 1 display, origin and discovery |
| community-feed:sr.rush/lap-analyzer | changed | schema 1 display, origin and discovery |
| community-feed:sr.rush/maintenance | changed | schema 1 display, origin and discovery |
| community-feed:st.demo/demost | changed | schema 1 display, origin and discovery |
| community-feed:store.buynearby/mcp | changed | schema 1 display, origin and discovery |
| community-feed:store.dacix/store | changed | schema 1 display, origin and discovery |
| community-feed:store.getsoma/soma-brewing | changed | schema 1 display, origin and discovery |
| community-feed:studio.approval/mcp | changed | schema 1 display, origin and discovery |
| community-feed:study.vela/corpus | changed | schema 1 display, origin and discovery |
| community-feed:su.hpt/hptsu-mcp | changed | schema 1 display, origin and discovery |
| community-feed:support.recursive/alan | changed | schema 1 display, origin and discovery |
| community-feed:support.recursive/dezignworks | changed | schema 1 display, origin and discovery |
| community-feed:support.recursive/recursive | changed | schema 1 display, origin and discovery |
| community-feed:tax.awaken/awaken | changed | schema 1 display, origin and discovery |
| community-feed:team.jogo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:tech.apibara/vehicle-auction | changed | schema 1 display, origin and discovery |
| community-feed:tech.axl/axl | changed | schema 1 display, origin and discovery |
| community-feed:tech.botclaw/agent-observer | changed | schema 1 display, origin and discovery |
| community-feed:tech.broen/asmi | changed | schema 1 display, origin and discovery |
| community-feed:tech.brouky/brouky | changed | schema 1 display, origin and discovery |
| community-feed:tech.concord/concord | changed | schema 1 display, origin and discovery |
| community-feed:tech.davidmcgill/agent-layer | changed | schema 1 display, origin and discovery |
| community-feed:tech.ensotrade/ensotrade | changed | schema 1 display, origin and discovery |
| community-feed:tech.geckovision/surf | changed | schema 1 display, origin and discovery |
| community-feed:tech.geosensor.atlas/absence-index | changed | schema 1 display, origin and discovery |
| community-feed:tech.human/tap | changed | schema 1 display, origin and discovery |
| community-feed:tech.kyanitelabs/kinocut#pypi:kinocut | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:tech.leeway/financial-data | changed | schema 1 display, origin and discovery |
| community-feed:tech.novtriq/engineering | changed | schema 1 display, origin and discovery |
| community-feed:tech.searlo/searlo | changed | schema 1 display, origin and discovery |
| community-feed:tech.sirune/manthan | changed | schema 1 display, origin and discovery |
| community-feed:tech.skybridge.capitals/Capitals | changed | schema 1 display, origin and discovery |
| community-feed:tech.skybridge.ecommerce/Ecom-Carousel | changed | schema 1 display, origin and discovery |
| community-feed:tech.skybridge.everything/Everything | changed | schema 1 display, origin and discovery |
| community-feed:tech.skybridge.investigation-game/Investigation-Game | changed | schema 1 display, origin and discovery |
| community-feed:tech.skybridge.productivity/Productivity | changed | schema 1 display, origin and discovery |
| community-feed:tech.skybridge.times-up/Time-s-Up | changed | schema 1 display, origin and discovery |
| community-feed:tech.tessa/tessa-mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:tech.tradetron.mcp/tradetron | changed | schema 1 display, origin and discovery |
| community-feed:tech.viewprinter/viewprinter | changed | schema 1 display, origin and discovery |
| community-feed:tech.vrsai/mcp | changed | schema 1 display, origin and discovery |
| community-feed:tech.xfa/xfa | changed | schema 1 display, origin and discovery |
| community-feed:tech.ydb-qdrant.pets/codex-pets-ydb-qdrant | changed | schema 1 display, origin and discovery |
| community-feed:tech.ydb-qdrant/gravity-ai-ui | changed | schema 1 display, origin and discovery |
| community-feed:tech.zenfin/zenfinance | changed | schema 1 display, origin and discovery |
| community-feed:technology.draup/api-server | changed | schema 1 display, origin and discovery |
| community-feed:technology.royalty/royaltea | changed | schema 1 display, origin and discovery |
| community-feed:technology.royalty/royaltea-public | changed | schema 1 display, origin and discovery |
| community-feed:to.agentmail/agentmail | changed | schema 1 display, origin and discovery |
| community-feed:to.derive/derive | changed | schema 1 display, origin and discovery |
| community-feed:to.flyn/mcp | changed | schema 1 display, origin and discovery |
| community-feed:to.funn/funnel-generator | changed | schema 1 display, origin and discovery |
| community-feed:to.nexly/analytics | changed | schema 1 display, origin and discovery |
| community-feed:to.plate/mcp | changed | schema 1 display, origin and discovery |
| community-feed:to.sprawl/sprawl | dropped | It needs values in its headers. Add it under Custom. |
| community-feed:to.unified/core | changed | schema 1 display, origin and discovery |
| community-feed:to.viibe/living-memory | changed | schema 1 display, origin and discovery |
| community-feed:today.blame/mcp | changed | schema 1 display, origin and discovery |
| community-feed:today.lmk/commerce | changed | schema 1 display, origin and discovery |
| community-feed:today.naia/platform | changed | schema 1 display, origin and discovery |
| community-feed:today.utsuroi/uratori | changed | schema 1 display, origin and discovery |
| community-feed:tools.clean/mcp | changed | schema 1 display, origin and discovery |
| community-feed:tools.datadive/datadive | changed | schema 1 display, origin and discovery |
| community-feed:tools.edgar/sec-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:tools.growthkit/revenue-intelligence | changed | schema 1 display, origin and discovery |
| community-feed:tools.i-gaming/igaming-data | changed | schema 1 display, origin and discovery |
| community-feed:tools.planwright/planwright | changed | schema 1 display, origin and discovery |
| community-feed:tools.settled/settled#npm:settled-x402 | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:tools.xearno/calculators | changed | schema 1 display, origin and discovery |
| community-feed:top.jsnjlingdong/sports | changed | schema 1 display, origin and discovery |
| community-feed:top.placepack/placepack | changed | schema 1 display, origin and discovery |
| community-feed:top.pulsewatch/public-knowledge | changed | schema 1 display, origin and discovery |
| community-feed:town.val/mcp | changed | schema 1 display, origin and discovery |
| community-feed:trade.axel/filing | changed | schema 1 display, origin and discovery |
| community-feed:trade.axel/filing-public | changed | schema 1 display, origin and discovery |
| community-feed:trade.buildix/hyperliquid | changed | schema 1 display, origin and discovery |
| community-feed:trade.snacs/snacs-data | changed | schema 1 display, origin and discovery |
| community-feed:travel.kismet/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:tv.ai/aitv | changed | schema 1 display, origin and discovery |
| community-feed:tv.digitalexperts/hypotheses | changed | schema 1 display, origin and discovery |
| community-feed:tv.guidedoc/documentary-database | changed | schema 1 display, origin and discovery |
| community-feed:tv.pastaclean/mcp | changed | schema 1 display, origin and discovery |
| community-feed:tv.popoff/data | changed | schema 1 display, origin and discovery |
| community-feed:tv.web3/web3tv | changed | schema 1 display, origin and discovery |
| community-feed:tw.recur/mcp | changed | schema 1 display, origin and discovery |
| community-feed:tw.surl.humanread/publisher | changed | schema 1 display, origin and discovery |
| community-feed:ua.com.mfoxa/catalog | changed | schema 1 display, origin and discovery |
| community-feed:ua.com.quintadb/mcp | changed | schema 1 display, origin and discovery |
| community-feed:ua.org.chertov/chertov | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.allpaintcolours/mcp | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.buildmydigital/scanner | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.codecrafted/design | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.companystack/mcp | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.cybercentry/verification | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.dinilu/mcp | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.fantasyfootballhub/fantasy-football-hub | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.filtersolutions/public-content | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.garchi/garchi-cms | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.grantiq/mcp | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.hopi/hopi | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.marketingin/mcp | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.medimo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.propertydata/mcp | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.shareflo/shareflo | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.shipmycar/quote | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.tendersignal/tenders | changed | schema 1 display, origin and discovery |
| community-feed:uk.co.thebetterbuy/product-comparison | changed | schema 1 display, origin and discovery |
| community-feed:uk.exatoshi/autosearch | changed | schema 1 display, origin and discovery |
| community-feed:uk.minia2a/minia2a-mcp#npm:minia2a-mcp | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:uno.platform/uno | dropped | SSE-only transport |
| community-feed:us.42min/meetings | changed | schema 1 display, origin and discovery |
| community-feed:us.maroo/mcp | changed | schema 1 display, origin and discovery |
| community-feed:us.mindflows/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:us.moneychoice/macro-economic-forecast | changed | schema 1 display, origin and discovery |
| community-feed:us.namasteamerica/namaste-america | changed | schema 1 display, origin and discovery |
| community-feed:us.spacenexus/spacenexus | changed | schema 1 display, origin and discovery |
| community-feed:us.telcodata/telcodata | changed | schema 1 display, origin and discovery |
| community-feed:us.uphealth/mcp | changed | schema 1 display, origin and discovery |
| community-feed:uz.pactum/legal | changed | schema 1 display, origin and discovery |
| community-feed:vc.doomscore/doom | changed | schema 1 display, origin and discovery |
| community-feed:video.future/future-video-studio | changed | schema 1 display, origin and discovery |
| community-feed:video.motiontext/motion-text | changed | schema 1 display, origin and discovery |
| community-feed:video.open/open-video | dropped | authentication is required but the source declares no secret header |
| community-feed:video.quiz/api | changed | schema 1 display, origin and discovery |
| community-feed:vin.visor/mcp | changed | schema 1 display, origin and discovery |
| community-feed:vip.esim-global/esim-catalog | changed | schema 1 display, origin and discovery |
| community-feed:vote.andre/elections | changed | schema 1 display, origin and discovery |
| community-feed:website.l1nk/links | changed | schema 1 display, origin and discovery |
| community-feed:website.priceinindia/priceinindia | changed | schema 1 display, origin and discovery |
| community-feed:wedding.aisle/aisle | changed | schema 1 display, origin and discovery |
| community-feed:wiki.wallstreet/canon | changed | schema 1 display, origin and discovery |
| community-feed:wine.beyond/beyond-wine | changed | schema 1 display, origin and discovery |
| community-feed:work.agentexchange.aivisibility/ai-visibility-mcp | changed | schema 1 display, origin and discovery |
| community-feed:work.agentexchange.planets/agent-planets | changed | schema 1 display, origin and discovery |
| community-feed:work.autonet/agent-health | changed | schema 1 display, origin and discovery |
| community-feed:work.comuna/comuna | changed | schema 1 display, origin and discovery |
| community-feed:work.finder/jobs | changed | schema 1 display, origin and discovery |
| community-feed:work.latlng.mcp/latlng | changed | schema 1 display, origin and discovery |
| community-feed:works.jinn/gateway | changed | schema 1 display, origin and discovery |
| community-feed:works.relux/agent-gateway | changed | schema 1 display, origin and discovery |
| community-feed:world.3keys/wish-game | dropped | SSE-only transport |
| community-feed:world.jobo/job-search | changed | schema 1 display, origin and discovery |
| community-feed:xyz.47620/evm-data | changed | schema 1 display, origin and discovery |
| community-feed:xyz.47620/multichain | changed | schema 1 display, origin and discovery |
| community-feed:xyz.47620/solana-data | changed | schema 1 display, origin and discovery |
| community-feed:xyz.actiongate.api/actiongate | changed | schema 1 display, origin and discovery |
| community-feed:xyz.arithym/arithym | changed | schema 1 display, origin and discovery |
| community-feed:xyz.bizclaw/business-directory | changed | schema 1 display, origin and discovery |
| community-feed:xyz.botfriendly/botfriendly | changed | schema 1 display, origin and discovery |
| community-feed:xyz.cabalspy/wallet-tracker | changed | schema 1 display, origin and discovery |
| community-feed:xyz.chain-ops/mgo | changed | schema 1 display, origin and discovery |
| community-feed:xyz.crinkl.mcp/crinkl-commerce | changed | schema 1 display, origin and discovery |
| community-feed:xyz.cubesphere/insider | changed | schema 1 display, origin and discovery |
| community-feed:xyz.dreamtap/mcp | changed | schema 1 display, origin and discovery |
| community-feed:xyz.gembook/gembook | changed | schema 1 display, origin and discovery |
| community-feed:xyz.getvia.app/via-network | changed | schema 1 display, origin and discovery |
| community-feed:xyz.hiveintelligence/mcp#npm:hive-intelligence | changed | schema 1 display, origin and discovery; exact pinned package |
| community-feed:xyz.iposignal/iposignal | changed | schema 1 display, origin and discovery |
| community-feed:xyz.lonestaroracle/mcp-server | changed | schema 1 display, origin and discovery |
| community-feed:xyz.mindjack/mcp | dropped | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:xyz.picoads/picoads | changed | schema 1 display, origin and discovery |
| community-feed:xyz.pinseeker/tee-times | changed | schema 1 display, origin and discovery |
| community-feed:xyz.pokeka/card-prices | changed | schema 1 display, origin and discovery |
| community-feed:xyz.preflyte/preflyte | changed | schema 1 display, origin and discovery |
| community-feed:xyz.presio/presio | changed | schema 1 display, origin and discovery |
| community-feed:xyz.rubenayla.partle/marketplace | changed | schema 1 display, origin and discovery |
| community-feed:xyz.sentio/connect | changed | schema 1 display, origin and discovery |
| community-feed:xyz.spiralstake/leverage | changed | schema 1 display, origin and discovery |
| community-feed:xyz.spocal/sports | changed | schema 1 display, origin and discovery |
| community-feed:xyz.tereno/tereno | changed | schema 1 display, origin and discovery |
| community-feed:xyz.truedge/crypto-safety | changed | schema 1 display, origin and discovery |
| community-feed:xyz.wagyu/wagyu | changed | schema 1 display, origin and discovery |
| community-feed:xyz.web3icon/web3icon | changed | schema 1 display, origin and discovery |
| community-feed:za.co.simcloud/simcloud | changed | schema 1 display, origin and discovery |
| community-feed:za.co.webuycars/website | changed | schema 1 display, origin and discovery |
| community-feed:zone.waggle/waggle | changed | schema 1 display, origin and discovery |
| reference:everything | changed | schema 1 display, origin and discovery; exact pinned package |
| reference:fetch | changed | schema 1 display, origin and discovery; exact pinned package |
| reference:filesystem | changed | schema 1 display, origin and discovery; exact pinned package |
| reference:git | changed | schema 1 display, origin and discovery; exact pinned package |
| reference:memory | dropped | package environment is not a declared secret reference |
| reference:sequential-thinking | changed | schema 1 display, origin and discovery; exact pinned package |
| reference:time | changed | schema 1 display, origin and discovery; exact pinned package |
| docker:synter-remote | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:mcp:Adobe | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aikido:mcp:aikido-mcp | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:mcp:airtable | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-agentos:mcp:airwallex-agentos | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-agentos:mcp:airwallex-dev | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aiven:mcp:aiven | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:alloydb-omni:mcp:alloydb-omni | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:alloydb:mcp:alloydb-postgres | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:mcp:amplitude | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:mcp:graphos-tools | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo:mcp:apollo | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:mcp:appwrite | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlan:mcp:atlan | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian:mcp:atlassian | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:mcp:awsknowledge | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:mcp:aws-mcp | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:mcp:aws-mcp | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:mcp:aws-mcp | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:mcp:bigdata.com | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigquery-data-analytics:mcp:bigquery | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin:mcp:blackrock-advisor-center | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:box:mcp:box | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:canva:mcp:canva | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:42crunch-api-security-testing:skill:plugins/api-security-testing/skills/42crunch-api-security-testing | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:42crunch-api-security-testing:skill:plugins/api-security-testing/skills/42crunch-audit | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:42crunch-api-security-testing:skill:plugins/api-security-testing/skills/42crunch-scan | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:42crunch-api-security-testing:skill:plugins/api-security-testing/skills/42crunch-setup | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:42crunch-api-security-testing:skill:plugins/api-security-testing/skills/code-to-oas | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-anydocx | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-anyexcel | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-anypdf | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-anypptx | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-batch-edit-photos | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-create-pdfs-from-data | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-create-social-variations | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-design-from-template | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-design-to-pdf | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-document-review | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-edit-quick-cut | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-fonts | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-resize-photos-and-videos | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:adobe-for-creativity:skill:plugins/creative-cloud/adobe-for-creativity/skills/adobe-retouch-portraits | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:agentforce-adlc:skill:skills/agentforce-generate | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:agentforce-adlc:skill:skills/agentforce-observe | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:agentforce-adlc:skill:skills/agentforce-test | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:ai-plugins:skill:skills/endor-agent-kit-setup | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aikido:skill:skills/issues | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aikido:skill:skills/pr-comments | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aikido:skill:skills/scan | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aikido:skill:skills/setup | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:skill:plugins/airtable/skills/agent-activity-log | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:skill:plugins/airtable/skills/airtable-cli | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:skill:plugins/airtable/skills/airtable-filters | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:skill:plugins/airtable/skills/airtable-overview | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:skill:plugins/airtable/skills/marketing-ops | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:skill:plugins/airtable/skills/product-ops | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:skill:plugins/airtable/skills/sales-ops | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airtable:skill:plugins/airtable/skills/show-airtable-link | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-agentos:skill:plugins/airwallex-agentos/skills/awx-best-practices | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-agentos:skill:plugins/airwallex-agentos/skills/beneficiary-creation | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-agentos:skill:plugins/airwallex-agentos/skills/card-provisioning | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-agentos:skill:plugins/airwallex-agentos/skills/contract-to-billing | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:airwallex-agentos:skill:plugins/airwallex-agentos/skills/manage-cashflow | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aiven:skill:skills/aiven-getting-started | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:alloydb-omni:skill:skills/alloydb-omni-container | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:alloydb-omni:skill:skills/alloydb-omni-kubernetes | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:altimate-code:skill:plugins/altimate-code/skills/altimate-code | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:altimate-code:skill:plugins/altimate-code/skills/review | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amazon-location-service:skill:plugins/amazon-location-service/skills/amazon-location-service | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amd-skills:skill:skills/hyperloom-workload-optimizer | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amd-skills:skill:skills/local-ai-app-integration | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amd-skills:skill:skills/local-ai-use | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amd-skills:skill:skills/serving-llms-on-instinct | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amd-skills:skill:skills/tracelens-analysis-orchestrator | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/add-analytics-instrumentation | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/analyze-account-health | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/analyze-ai-topics | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/analyze-chart | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/analyze-dashboard | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/analyze-experiment | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/analyze-experiment-consolidated | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/analyze-feedback | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/build-charts-with-typed-params | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/chart-link-analysis | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/compare-user-journeys | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/create-chart | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/create-dashboard | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/daily-brief | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/debug-replay | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/diagnose-errors | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/diff-intake | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/discover-analytics-patterns | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/discover-event-surfaces | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/discover-opportunities | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/instrument-events | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/investigate-ai-session | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/live-data-forensics | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/manage-amp-context | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/monitor-ai-quality | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/monitor-experiments | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/monitor-experiments-consolidated | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/monitor-reliability | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/replay-ux-audit | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/review-agent-insights | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/scheduled-report-refresh | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/taxonomy | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/tracking-plan-audit | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/use-amp-guides-surveys | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/user-cohort-forensics | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/weekly-brief | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amplitude:skill:plugins/amplitude/skills/what-would-lenny-do | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-client | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-connectors | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-federation | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-ios | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-kotlin | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-mcp-server | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-router | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-router-plugin-creator | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/apollo-server | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/graphql-operations | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/graphql-schema | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/rover | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/rust-best-practices | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo-skills:skill:skills/skill-creator | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo:skill:skills/analytics | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo:skill:skills/enrich-lead | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo:skill:skills/gtm-strategist | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo:skill:skills/prospect | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:apollo:skill:skills/sequence-load | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/cli | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/dart | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/dotnet | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/go | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/kotlin | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/php | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/python | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/ruby | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/rust | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/swift | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:appwrite:skill:skills/typescript | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/airflow | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/airflow-hitl | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/airflow-plugins | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/airflow-state-store | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/analyzing-data | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/annotating-task-lineage | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/authoring-dags | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/authoring-go-sdk-tasks | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/authoring-java-sdk-tasks | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/authoring-language-sdk-tasks | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/blueprint | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/checking-freshness | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/configuring-airflow-language-sdks | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/cosmos-dbt-core | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/cosmos-dbt-fusion | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/creating-openlineage-extractors | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/dag-factory | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/debugging-dags | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/delegating-to-otto | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/deploying-airflow | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/deploying-go-sdk-bundles | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/deploying-java-sdk-bundles | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/managing-astro-deployments | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/managing-astro-local-env | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/migrating-ai-sdk-to-common-ai | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/migrating-airflow-2-to-3 | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/migrating-dagster-to-airflow | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/profiling-tables | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/setting-up-astro-project | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/testing-dags | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/tracing-downstream-lineage | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/tracing-upstream-lineage | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/troubleshooting-astro-deployments | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:astronomer-data-agents:skill:skills/warehouse-init | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlan:skill:skills/atlan-search | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian-twg-cli:skill:skills/twg-setup | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian:skill:skills/capture-tasks-from-meeting-notes | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian:skill:skills/generate-status-report | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian:skill:skills/jira-sprint-dashboard | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian:skill:skills/search-company-knowledge | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian:skill:skills/spec-to-backlog | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atlassian:skill:skills/triage-issue | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atomic-agents:skill:claude-plugin/atomic-agents/skills/create-atomic-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atomic-agents:skill:claude-plugin/atomic-agents/skills/create-atomic-context-provider | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atomic-agents:skill:claude-plugin/atomic-agents/skills/create-atomic-schema | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atomic-agents:skill:claude-plugin/atomic-agents/skills/create-atomic-tool | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atomic-agents:skill:claude-plugin/atomic-agents/skills/framework | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atomic-agents:skill:claude-plugin/atomic-agents/skills/new-app | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:atomic-agents:skill:claude-plugin/atomic-agents/skills/troubleshoot | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:auth0:skill:plugins/auth0/skills/auth0 | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/analyzing-release-readiness | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/chatting-with-aws-devops-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/coordinating-multi-space-devops-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/diff-scanning-with-aws-security-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/investigating-incidents-with-aws-devops-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/pentesting-with-aws-security-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/remediating-with-aws-security-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/running-release-tests | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/scanning-with-aws-security-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/setup | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/setup-devops-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/setup-security-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents-for-devsecops:skill:plugins/aws-agents-for-devsecops/skills/threat-modeling-with-aws-security-agent | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:skill:plugins/aws-agents/skills/agents-build | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:skill:plugins/aws-agents/skills/agents-connect | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:skill:plugins/aws-agents/skills/agents-debug | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:skill:plugins/aws-agents/skills/agents-deploy | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:skill:plugins/aws-agents/skills/agents-get-started | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:skill:plugins/aws-agents/skills/agents-harden | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:skill:plugins/aws-agents/skills/agents-optimize | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-agents:skill:plugins/aws-agents/skills/agents-pay | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-amplify:skill:plugins/aws-amplify/skills/amplify-workflow | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/amazon-bedrock | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-ai-ml | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-auth | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-billing-and-cost-management | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-blocks | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-cdk | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-cloudformation | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-compute | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-containers | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-database | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-deployment | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-iam | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-messaging-and-streaming | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-networking | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-observability | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-sdk-js-v3-usage | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-sdk-python-usage | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-sdk-swift-usage | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-secrets-manager | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-security | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-serverless | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-storage | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/aws-well-architected-review | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/launch-with-aws | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-core:skill:plugins/aws-core/skills/signing-in-to-aws | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/amazon-opensearch-service | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/authoring-mwaa-workflow | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/connecting-to-data-source | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/creating-data-lake-table | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/debugging-mwaa-workflow | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/exploring-data-catalog | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/finding-data-lake-assets | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/ingesting-into-data-lake | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/querying-data-lake | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/redshift-guide | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/storing-and-querying-vectors | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/testing-mwaa-workflow | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-data-analytics:skill:plugins/aws-data-analytics/skills/upgrading-mwaa-environments | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-serverless:skill:plugins/aws-serverless/skills/api-gateway | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-serverless:skill:plugins/aws-serverless/skills/aws-lambda | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-serverless:skill:plugins/aws-serverless/skills/aws-lambda-durable-functions | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-serverless:skill:plugins/aws-serverless/skills/aws-lambda-managed-instances | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-serverless:skill:plugins/aws-serverless/skills/aws-lambda-microvms | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-serverless:skill:plugins/aws-serverless/skills/aws-serverless-deployment | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-serverless:skill:plugins/aws-serverless/skills/aws-step-functions | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/agent-advisor | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/architect-for-startups | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/azure-to-aws | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/contextual-offers-for-startups | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/gcp-to-aws | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/heroku-to-aws | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/knowledge-base-for-startups | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/llm-to-bedrock | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/operate-on-aws | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/prompt-library-for-startups | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/start-building-for-startups | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-startup-advisor:skill:plugins/aws-startup-advisor/skills/tf-best-practices | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:aws-transform:skill:plugins/aws-transform/skills/aws-transform | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-cosmos-db-assistant:skill:skills/cosmosdb-best-practices | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-auth | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-ci | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-connections | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-container | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-dab | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-faq | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-feedback | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-from-sql-server | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-functions | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-import | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-local-to-cloud | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-rag | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-scaffold | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-schema-migration | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-seed | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-sidecar | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure-sql-developer:skill:skills/azuresql-db-testing | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/airunway-aks-setup | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/appinsights-instrumentation | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-ai | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-aigateway | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-app-onboard | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-app-onboard-prereq | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-cloud-migrate | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-compliance | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-compute | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-cost | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-deploy | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-diagnostics | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-enterprise-infra-planner | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-kubernetes | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-kusto | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-messaging | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-prepare | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-quotas | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-reliability | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-resource-lookup | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-resource-visualizer | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-storage | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-upgrade | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/azure-validate | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/entra-agent-id | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/entra-app-registration | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/microsoft-foundry | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:azure:skill:skills/python-appservice-deploy | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:base44:skill:skills/base44-cli | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:base44:skill:skills/base44-remote-dev | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:base44:skill:skills/base44-sandbox | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:base44:skill:skills/base44-sdk | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:base44:skill:skills/base44-troubleshooter | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-catalyst-monitor | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-company-brief | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-country-analysis | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-country-sector-analysis | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-cross-sector | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-earnings-digest | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-earnings-preview | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-earnings-quality-screen | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-earnings-reaction | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-g7-comparison | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-investment-memo | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-moat-governance-review | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-peer-comparables | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-post-ipo-day1 | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-post-ipo-day14 | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-post-ipo-day179 | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-post-ipo-day365 | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-pre-ipo-analysis | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-quick-take | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-regional-comparison | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-risk-assessment | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-scenario-analysis | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-sector-analysis | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-sector-playbook | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-thematic-research | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-valuation-snapshot | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigdata-com:skill:plugins/bigdata-com/skills/bigdata-variant-perception | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:bigquery-data-analytics:skill:skills/bigquery-ai-ml | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin:skill:skills/ac360-capability-router | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin:skill:skills/guided-benchmark-selection | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin:skill:skills/guided-portfolio-builder | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin:skill:skills/portfolio-observations-and-opportunities | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin:skill:skills/portfolio-review | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin:skill:skills/tax-and-capital-gains-analysis | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:blackrock-advisor-center-plugin:skill:skills/wealth-projections | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:boltz:skill:plugins/boltz/skills/boltz-check-status | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:boltz:skill:plugins/boltz/skills/boltz-cli-setup | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:boltz:skill:plugins/boltz/skills/boltz-protein-design | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:boltz:skill:plugins/boltz/skills/boltz-protein-screen | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:boltz:skill:plugins/boltz/skills/boltz-small-molecule-adme | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:boltz:skill:plugins/boltz/skills/boltz-small-molecule-design | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:boltz:skill:plugins/boltz/skills/boltz-small-molecule-screen | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:boltz:skill:plugins/boltz/skills/boltz-structure-and-binding | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:box:skill:skills/box | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:box:skill:skills/box-legal-workflows | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:box:skill:skills/box-legal-workflows-contract | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:box:skill:skills/box-legal-workflows-intake | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:box:skill:skills/box-legal-workflows-ma | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/agent-onboarding | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/brand-listening | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/brd-browser-debug | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/bright-data-best-practices | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/bright-data-mcp | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/brightdata-cli | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/competitive-intel | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/data-feeds | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/design-mirror | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/discover-api | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/js-sdk-best-practices | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/live-research | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/price-comparison | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/proxy | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/python-sdk-best-practices | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/rag-pipeline | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/scrape | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/scraper-builder | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/scraper-studio | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/search | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:brightdata-plugin:skill:skills/seo-audit | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:buildkite:skill:skills/buildkite-agent-runtime | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:buildkite:skill:skills/buildkite-api | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:buildkite:skill:skills/buildkite-cache | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:buildkite:skill:skills/buildkite-cli | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:buildkite:skill:skills/buildkite-migration | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:buildkite:skill:skills/buildkite-pipelines | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:buildkite:skill:skills/buildkite-preflight | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:canva:skill:plugins/canva/skills/brand-check | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:canva:skill:plugins/canva/skills/bulk-create | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:canva:skill:plugins/canva/skills/edit-design | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:canva:skill:plugins/canva/skills/get-design-feedback | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:canva:skill:plugins/canva/skills/implement-feedback | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:canva:skill:plugins/canva/skills/resize-for-social-media | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:amazon-selling-partner | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:champion-kit | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:data-agent-kit | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:govtribe | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:linq-alpha | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:math-proof | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:sap-ux-fiori-tools | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:theme-examples | added | new accepted source listing or expanded bundle member |
| marketplace:anthropics/claude-plugins-official:plugin:vanguard-advisor-tools | added | new accepted source listing or expanded bundle member |

## Candidate entries rejected during mapping

| Listing | Change | Rule |
| --- | --- | --- |
| community-feed:ai.agentrapay/agentra | rejected | SSE-only transport |
| community-feed:ai.anzenna/anzenna | rejected | SSE-only transport |
| community-feed:ai.filegraph/document-processing | rejected | SSE-only transport |
| community-feed:ai.gomarble/mcp-api | rejected | SSE-only transport |
| community-feed:ai.mailjunky/mcp | rejected | SSE-only transport |
| community-feed:co.axiom/mcp | rejected | SSE-only transport |
| community-feed:com.aradia/sovereign-hardware | rejected | SSE-only transport |
| community-feed:com.automatedclientacquisition.www/aca | rejected | SSE-only transport |
| community-feed:com.cre8techdev/mini-pricer-mcp | rejected | SSE-only transport |
| community-feed:com.cryptorefills/mcp-server | rejected | SSE-only transport |
| community-feed:com.dataclawe/dataclawe-mcp | rejected | SSE-only transport |
| community-feed:com.halalterminal/mcp | rejected | SSE-only transport |
| community-feed:com.phone-mcp/phonemcp-mcp-server | rejected | SSE-only transport |
| community-feed:com.rootly/mcp-server | rejected | SSE-only transport |
| community-feed:com.stockmarketscan/mcp-server | rejected | SSE-only transport |
| community-feed:com.tableall/mcp | rejected | SSE-only transport |
| community-feed:com.vairetail/discovergpt | rejected | SSE-only transport |
| community-feed:com.wix/mcp | rejected | SSE-only transport |
| community-feed:io.cohereon.manifold/imperium-manifold | rejected | SSE-only transport |
| community-feed:io.concessio/concessio | rejected | SSE-only transport |
| community-feed:io.opsera/opsera | rejected | SSE-only transport |
| community-feed:io.wordlift/mcp-server | rejected | SSE-only transport |
| community-feed:net.singular/mcp-server | rejected | SSE-only transport |
| community-feed:sh.xorfox.drawbridge/server | rejected | SSE-only transport |
| community-feed:uno.platform/uno | rejected | SSE-only transport |
| community-feed:world.3keys/wish-game | rejected | SSE-only transport |
| reference:memory | rejected | package environment is not a declared secret reference |
| docker:ais-fleet | rejected | SSE-only transport |
| docker:apify | rejected | header is not a declared secret reference |
| docker:asana | rejected | SSE-only transport |
| docker:brightdata | rejected | It needs a key, but the catalogue does not say where the key goes. Add it under Custom. |
| docker:close | rejected | header is not a declared secret reference |
| docker:cloudflare-ai-gateway | rejected | SSE-only transport |
| docker:cloudflare-audit-logs | rejected | SSE-only transport |
| docker:cloudflare-autorag | rejected | SSE-only transport |
| docker:cloudflare-browser-rendering | rejected | SSE-only transport |
| docker:cloudflare-container | rejected | SSE-only transport |
| docker:cloudflare-digital-experience-monitoring | rejected | SSE-only transport |
| docker:cloudflare-dns-analytics | rejected | SSE-only transport |
| docker:cloudflare-docs | rejected | SSE-only transport |
| docker:cloudflare-graphql | rejected | SSE-only transport |
| docker:cloudflare-logpush | rejected | SSE-only transport |
| docker:cloudflare-observability | rejected | SSE-only transport |
| docker:cloudflare-one-casb | rejected | SSE-only transport |
| docker:cloudflare-radar | rejected | SSE-only transport |
| docker:cloudflare-workers-bindings | rejected | SSE-only transport |
| docker:cloudflare-workers-builds | rejected | SSE-only transport |
| docker:dappier-remote | rejected | header is not a declared secret reference |
| docker:dialer | rejected | SSE-only transport |
| docker:dodo-payments | rejected | SSE-only transport |
| docker:globalping | rejected | SSE-only transport |
| docker:hubspot | rejected | header is not a declared secret reference |
| docker:invideo | rejected | SSE-only transport |
| docker:llmtxt | rejected | SSE-only transport |
| docker:mercado-libre | rejected | header is not a declared secret reference |
| docker:mercado-pago | rejected | header is not a declared secret reference |
| docker:monday | rejected | SSE-only transport |
| docker:needle | rejected | header is not a declared secret reference |
| docker:paypal | rejected | SSE-only transport |
| docker:polar-signals | rejected | header is not a declared secret reference |
| docker:rube | rejected | header is not a declared secret reference |
| docker:scorecard | rejected | SSE-only transport |
| docker:sentry-remote | rejected | SSE-only transport |
| docker:short-io | rejected | header is not a declared secret reference |
| docker:telnyx | rejected | header is not a declared secret reference |
| docker:wayfound | rejected | SSE-only transport |
| docker:webflow-remote | rejected | SSE-only transport |
| docker:wix | rejected | SSE-only transport |
| marketplace:anthropics/claude-plugins-official:plugin:azure:mcp:azure | rejected | package version is not exact |
| community-feed:ai.agentdm/agentdm | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.bloopo/bloopo | rejected | authentication is required but the source declares no secret header |
| community-feed:ai.decisionlog/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:ai.duvera/gateway | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:ai.entityenricher/enricher | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.explorium/mcp-explorium | rejected | authentication is required but the source declares no secret header |
| community-feed:ai.gavelin/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:ai.groundroute/web-search | rejected | authentication is required but the source declares no secret header |
| community-feed:ai.kolens/kolens-mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:ai.lumify/sports-intelligence | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.marketintell/marketintell | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.meacheal/mrc-data | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:ai.midplane/midplane#npm:midplane | rejected | Its command needs values you choose. |
| community-feed:ai.nudg3/brand-intelligence | rejected | authentication is required but the source declares no secret header |
| community-feed:ai.openaso/openaso | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:ai.primateintelligence/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:ai.redditgrow/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.seltz/seltz-ai-seltz-mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:ai.shiplight/shiplight#npm:%40shiplightai%2Fmcp | rejected | package environment is not a declared secret reference |
| community-feed:ai.sig.foodlog/food-logger | rejected | authentication is required but the source declares no secret header |
| community-feed:ai.skylit/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.spala/public-mcp | rejected | header is not a declared secret reference |
| community-feed:ai.spicygen/spicygen | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.vergio/vergio | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:ai.wiro/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:ai.youtube-transcript/youtube-transcript | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:app.apiguru/amazon-data#npm:apiguru-mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:app.fakto/fakturownia | rejected | authentication is required but the source declares no secret header |
| community-feed:app.fakto/wfirma | rejected | authentication is required but the source declares no secret header |
| community-feed:app.getdialer/dialer | rejected | authentication is required but the source declares no secret header |
| community-feed:app.hadl/portfolio | rejected | authentication is required but the source declares no secret header |
| community-feed:app.justemails/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:app.mochify/mochify | rejected | authentication is required but the source declares no secret header |
| community-feed:app.neurorank/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:app.pumpx/pumpx | rejected | authentication is required but the source declares no secret header |
| community-feed:app.tabtree/tabtree#npm:tabtree-mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:app.thoughtspot/mcp-server | rejected | authentication is required but the source declares no secret header |
| community-feed:cc.contexta/contexta-mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:chat.muro/support | rejected | authentication is required but the source declares no secret header |
| community-feed:chat.trilo/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:club.inite/inite-club | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:co.heista/api | rejected | authentication is required but the source declares no secret header |
| community-feed:co.valid/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.86hc/hongkong-company | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.adcritter/mcp-agent | rejected | authentication is required but the source declares no secret header |
| community-feed:com.admitbase/admissions | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.adspirer/ads | rejected | authentication is required but the source declares no secret header |
| community-feed:com.adviserry/adviserry | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.affogata.app/affogata | rejected | authentication is required but the source declares no secret header |
| community-feed:com.allratestoday/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.anotepad/notes | rejected | authentication is required but the source declares no secret header |
| community-feed:com.arcnautical/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.arison8/smolabot | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.atly/places | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.belindoc/belindoc-mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.bitly/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.bouncewatch/signals | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.cache-boost/cacheboost | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.cambercloud.camber-mcp/camber-mcp-server | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.cars-data/car-specs-api | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.chainstack/chainstack | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.clootrack/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.coinmarketcap/coinmarketcap | rejected | authentication is required but the source declares no secret header |
| community-feed:com.compoid/mcp-server | rejected | Its address needs values you choose. Add it under Custom. |
| community-feed:com.configdirector/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.cryptohopper/mcp-data | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.droplinked.mcp/server | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.emtailabs/xray-vision | rejected | authentication is required but the source declares no secret header |
| community-feed:com.energyaisolution/energyai | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.energyaisolution/solar-home-incentives | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.epublys/epublys | rejected | header is not a declared secret reference |
| community-feed:com.freeelatech/oneda | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.freename/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.getabstract/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.getboxkite/xero-backup-export | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.getcurrentoffer/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.gymnavigator/coach | rejected | authentication is required but the source declares no secret header |
| community-feed:com.hardlinephone/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.htagai/htag-intelligence | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.htagai/htag-spatial | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.johnsessentials/johns-essentials | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.joinnod/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.laddro/career | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.leadfriendly/lead-friendly | rejected | authentication is required but the source declares no secret header |
| community-feed:com.lenderprice/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.lifttrackapp/lifttrack | rejected | authentication is required but the source declares no secret header |
| community-feed:com.local-mcp/local-mcp#npm:local-mcp | rejected | package environment is not a declared secret reference |
| community-feed:com.luneresearch/lune | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.medplum/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.meteosource/weather | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.metricspot/seo-mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.microsoft/dataverse#npm:%40microsoft%2Fdataverse | rejected | Its command needs values you choose. |
| community-feed:com.microsoft/powerbi-modeling-mcp#npm:%40microsoft%2Fpowerbi-modeling-mcp | rejected | Its command needs values you choose. |
| community-feed:com.multyplylabs/sec-fundamentals | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.myinfluenceai/agents | rejected | authentication is required but the source declares no secret header |
| community-feed:com.neurarelay/relay-mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.ones/ones | rejected | authentication is required but the source declares no secret header |
| community-feed:com.paddle/mcp-sandbox | rejected | authentication is required but the source declares no secret header |
| community-feed:com.parsestream/parsestream | rejected | authentication is required but the source declares no secret header |
| community-feed:com.pentest-tools/mcp-server | rejected | authentication is required but the source declares no secret header |
| community-feed:com.peopleprincipia/principia | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.persuadioai/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.playcallerapp/mcp | rejected | Its address needs values you choose. Add it under Custom. |
| community-feed:com.pointifytravels/travel | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.printfriendly/printfriendly | rejected | authentication is required but the source declares no secret header |
| community-feed:com.qurangallery/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.redocly/mcp | rejected | header is not a declared secret reference |
| community-feed:com.rephonic/rephonic | rejected | authentication is required but the source declares no secret header |
| community-feed:com.retentionrail/retentionrail | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.reviewflowz/reviews | rejected | authentication is required but the source declares no secret header |
| community-feed:com.rubiic/rubiic | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.runriva.quizbase/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.scoutapm/scout-monitoring | rejected | authentication is required but the source declares no secret header |
| community-feed:com.sendseven/messaging | rejected | authentication is required but the source declares no secret header |
| community-feed:com.seofuxx/seo-audit | rejected | authentication is required but the source declares no secret header |
| community-feed:com.sgpdirectory/mcp | rejected | Its address needs values you choose. Add it under Custom. |
| community-feed:com.sgpdirectory/singapore-business-directory | rejected | Its address needs values you choose. Add it under Custom. |
| community-feed:com.shipmyform/shipmyform | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.shurq/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.sonatype/dependency-management-mcp-server | rejected | authentication is required but the source declares no secret header |
| community-feed:com.sparkvibeai/spec-committee | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.spicyapi/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.splark/splark | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.taproothq/taproot | rejected | authentication is required but the source declares no secret header |
| community-feed:com.theirstack/theirstack | rejected | authentication is required but the source declares no secret header |
| community-feed:com.themonexus/terminal | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.tianxiagongchang/factory-search | rejected | authentication is required but the source declares no secret header |
| community-feed:com.tppflow/texas-rrc-wellbores | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.trellistate/listings | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.truealter/identity | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.usegeon/geon | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.zettoai/zetto | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:com.zomato/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:com.zylalabs/api-hub | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:com.zyphe/zyphe-mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:design.overflow/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:dev.acopio/acopio | rejected | authentication is required but the source declares no secret header |
| community-feed:dev.cloro/cloro | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:dev.e2a/mcp-server | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:dev.falconbuilder/falcon-builder | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:dev.ngrok-free.sympathy-myself-jogger/agentbridge | rejected | header is not a declared secret reference |
| community-feed:dev.robase/sms | rejected | authentication is required but the source declares no secret header |
| community-feed:directory.brick/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:fr.synergieloc/immobilier | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:fun.publish/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:io.adtao/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:io.afterlaunch/agentic-growth-marketing | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.aidc-ai/design-engine | rejected | authentication is required but the source declares no secret header |
| community-feed:io.catchmetrics.mcp/rum-analytics | rejected | authentication is required but the source declares no secret header |
| community-feed:io.cg3/prior | rejected | Its address needs values you choose. Add it under Custom. |
| community-feed:io.chamade/server | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.chatcut/chatcut | rejected | header is not a declared secret reference |
| community-feed:io.github.1clawAI/1claw-mcp#npm:%401claw%2Fmcp | rejected | It needs a key under a name the hub reserves. |
| community-feed:io.github.atomicstrata/llmwiki#npm:llm-wiki-compiler | rejected | Its command needs values you choose. |
| community-feed:io.github.chrischall/skylight-mcp#npm:skylight-mcp | rejected | item.connect.secrets[2].label: length outside 1..200 |
| community-feed:io.github.domdomegg/airtable-mcp-server#npm:airtable-mcp-server | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.fr0ster/mcp-abap-adt#npm:%40mcp-abap-adt%2Fcore | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.fruggr/zendesk-mcp-server#npm:%40fruggr%2Fzendesk-mcp-server | rejected | Its command needs values you choose. |
| community-feed:io.github.growthbook/growthbook-mcp#npm:%40growthbook%2Fmcp | rejected | Its environment needs manual setup. |
| community-feed:io.github.HiAi-gg/docsmint#npm:%40hiai-gg%2Fdocsmint | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.hifriendbot/agentwallet#npm:agentwallet-mcp | rejected | Its environment needs manual setup. |
| community-feed:io.github.layervai/qurl-mcp#npm:%40layervai%2Fqurl-mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.matiasmaquieira96/risk-mcp#npm:prometiam-risk-mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.mcp-z/mcp-gmail#npm:%40mcp-z%2Fmcp-gmail | rejected | package environment is not a declared secret reference |
| community-feed:io.github.mcp-z/mcp-pdf#npm:%40mcp-z%2Fmcp-pdf | rejected | package environment is not a declared secret reference |
| community-feed:io.github.MikeyPetrillo/agent402#npm:agent402-mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.mnemoverse/mcp-memory-server#npm:%40mnemoverse%2Fmcp-memory-server | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.github.NotNull92/hera-agent-unity#npm:hera-agent-unity | rejected | package environment is not a declared secret reference |
| community-feed:io.github.OpenAdaptAI/openadapt-agent#pypi:openadapt-agent | rejected | Its command needs values you choose. |
| community-feed:io.github.pattrnlabs/grain#npm:grain-tools | rejected | package environment is not a declared secret reference |
| community-feed:io.github.Regsorm/code-index#npm:%40regsorm%2Fcode-index-mcp | rejected | Its command needs values you choose. |
| community-feed:io.github.seadonggyun4/truthound#pypi:truthound | rejected | Its command needs values you choose. |
| community-feed:io.github.sezzlee/excel#npm:%40sezzlee%2Fexcel-mcp | rejected | Its command needs values you choose. |
| community-feed:io.github.Snowflake-Labs/mcp#pypi:snowflake-labs-mcp | rejected | Its command needs values you choose. |
| community-feed:io.github.svayatta/agent-custody#npm:%40agent-custody%2Freceipts | rejected | Its command needs values you choose. |
| community-feed:io.github.zereight/gitlab-mcp#npm:%40zereight%2Fmcp-gitlab | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.indexone/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.keyflight/pnr | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:io.linklist/linklist | rejected | authentication is required but the source declares no secret header |
| community-feed:io.namefi/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.neuronik/drop | rejected | authentication is required but the source declares no secret header |
| community-feed:io.planable/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:io.quanti/mcp-server | rejected | authentication is required but the source declares no secret header |
| community-feed:io.routescore/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:io.smartroutes/smartroutes | rejected | authentication is required but the source declares no secret header |
| community-feed:io.standoutmcp/standout | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:kr.wandsol/patent-search | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:llc.facet/ucp-shopping | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:love.chain.app/chainlove-mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:market.waxed/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:md.eureka/eureka | rejected | authentication is required but the source declares no secret header |
| community-feed:me.structa/structa | rejected | authentication is required but the source declares no secret header |
| community-feed:moda.ai/remote-camera | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:net.aivideocheck/mcp | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:net.clickwise/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:net.foxnose/knowledge | rejected | authentication is required but the source declares no secret header |
| community-feed:net.inkseal/inkseal | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:net.periodix/actions | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:network.edge/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:nl.digi-data/digidata | rejected | authentication is required but the source declares no secret header |
| community-feed:org.openweathermap/agents | rejected | It needs a key under a name the hub reserves. |
| community-feed:pizza.redirect/mcp | rejected | authentication is required but the source declares no secret header |
| community-feed:ru.krasoft/zakupki | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ru.lpmotor/mottor | rejected | authentication is required but the source declares no secret header |
| community-feed:run.pantheon/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:site.chatgpt.alert-crab-1890.pageproof/pdf-extract | rejected | header is not a declared secret reference |
| community-feed:space.innernote/innernote | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:to.sprawl/sprawl | rejected | It needs values in its headers. Add it under Custom. |
| community-feed:video.open/open-video | rejected | authentication is required but the source declares no secret header |
| community-feed:xyz.mindjack/mcp | rejected | item.connect.secrets[0].label: length outside 1..200 |
| community-feed:ai.tuteliq/mcp#npm:%40tuteliq%2Fmcp | rejected | streamable HTTPS remote preferred |
| community-feed:ai.wavespeed/mcp#npm:%40wavespeed%2Fmcp | rejected | streamable HTTPS remote preferred |
| community-feed:com.browser-use/browser-use#pypi:browser-use | rejected | streamable HTTPS remote preferred |
| community-feed:com.mux/mcp#npm:%40mux%2Fmcp | rejected | streamable HTTPS remote preferred |
| community-feed:com.porkbun/mcp#npm:%40porkbunllc%2Fmcp-server | rejected | streamable HTTPS remote preferred |
| community-feed:com.postman/postman-mcp-server#npm:%40postman%2Fpostman-mcp-server | rejected | streamable HTTPS remote preferred |
| community-feed:com.run402/mcp#npm:run402-mcp | rejected | streamable HTTPS remote preferred |
| community-feed:com.smartbear/smartbear-mcp#npm:%40smartbear%2Fmcp | rejected | streamable HTTPS remote preferred |
| community-feed:com.supabase/mcp#npm:%40supabase%2Fmcp-server-supabase | rejected | streamable HTTPS remote preferred |
| community-feed:com.svgrid/svgrid#npm:%40svgrid%2Fmcp | rejected | streamable HTTPS remote preferred |
| community-feed:com.tokportal/mcp#npm:tokportal-mcp | rejected | streamable HTTPS remote preferred |
| community-feed:dev.nichedb/nichedb#npm:%40profullstack%2Fnichedb | rejected | streamable HTTPS remote preferred |
| community-feed:dev.svelte/mcp#npm:%40sveltejs%2Fmcp | rejected | streamable HTTPS remote preferred |
| community-feed:io.browserless/mcp#npm:%40browserless.io%2Fmcp | rejected | streamable HTTPS remote preferred |
| community-feed:io.echelongraph/echelongraph-mcp#npm:echelongraph-mcp | rejected | streamable HTTPS remote preferred |
| community-feed:io.oxylabs/oxylabs-mcp#pypi:oxylabs-mcp | rejected | streamable HTTPS remote preferred |
| community-feed:io.qase/mcp-server#npm:%40qase%2Fmcp-server | rejected | streamable HTTPS remote preferred |
