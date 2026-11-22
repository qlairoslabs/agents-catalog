# How the catalogue is organized

Version **1.1**, the taxonomy of the first signed publication. The coded list is
`facets/taxonomy-v1.1.tsv` (code, area, category, topic, definition, excludes); this
document explains it and shows it in full. How it was built: `PROCESS.md` §5.

## What organizes the catalogue

One category tree cannot serve filtering, relevance, discovery and Agents all at
once, so the catalogue uses three separate things:

| What | Used for | Values |
|---|---|---|
| **Filters** | narrowing a list, like a shop | facts from the data: kind (connector, skill, bundle), transport (remote, local package), sign-in, source, tier, publisher; and, from classification, language and regions |
| **Topics** | browsing and discovery: "tools for doing X" | this taxonomy: area, category, topic |
| **Status** | removing noise | `ok`, `junk`, `profile`, `brochure`, `adult`, `excluded` (below) |

What each tool does to the world (`read`, `write` or `risky`) is published per tool,
not per listing (`PROCESS.md` §5.2).

**Not topics:** geography is the regions filter, and packaging (a server, a skill, a
bundle) is the kind and transport filters. An AI-powered app belongs to its own
domain, not to AI.

## Structure

- **34 areas**, flat, with no groups above them: grouping adds arbitrary choices ("is
  HR under Business?"), and 34 is easy to skim.
- **Area › category › topic.** A third level exists only where a category is dense
  (more than about 60 listings) or holds things nobody would compare. A node above
  about 60 listings is split; one below about 5 is merged.
- **Codes:** `AA.CC` for a category, `AA.CC.TT` for a topic (for example `01.03.02`,
  Software Development › Testing & QA › End-to-end & visual testing). A listing has
  one primary code and up to two secondary codes, each a leaf of the tree.
- Every node has a **definition** and, where a boundary needs it, an **excludes**
  note naming where the excluded things go. The definitions and excludes do most of
  the work in labeling consistently.

**Boundary decisions** made when building it:

- AI is split in two: **AI Engineering** (models, evals, frameworks) and **Agent
  Infrastructure** (memory, MCP, agent payments, trust).
- Knowledge bases for people are in Productivity; memory for agents is in Agent
  Infrastructure.
- Sports & Outdoors is its own area, and includes training and fitness (wearables,
  coaching).

## Status

| Status | Meaning | In the catalogue |
|---|---|---|
| `ok` | a normal listing | shown |
| `junk` | a test, placeholder, example or deprecated tool | not published |
| `profile` | one person's portfolio, blog or CV | published, hidden by default |
| `brochure` | a company's own about, pricing or demo server with no real tool | published, hidden by default, found by name |
| `adult` | explicit content | published, hidden unless the user opts in |
| `excluded` | against our policy (`RULES.md` §11) | not published |

## Changes

Before the first publication the tree could change freely. From then on:

- **Codes are never reused** for something else.
- **Values are only added.** A merge or rename ships as a published remap from old
  codes to new ones, so a hub's saved filters keep working.
- A new version changes the version number here and in the file name. Only the
  listings a change affects are labeled again.

## The taxonomy

Counts are listings with status `ok` in the first build.


### 01 Software Development (477)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `01.01.01` | Code hosting & repos | GitHub & GitLab | Repos, issues, PRs on GitHub/GitLab/Bitbucket | CI pipelines (01.05) | 16 |
| `01.01.02` | Code hosting & repos | Code search & repo intelligence | Search, navigate, explain or map codebases |  | 40 |
| `01.02.01` | Docs & references | Library & framework docs | Up-to-date docs for libraries, frameworks, languages |  | 73 |
| `01.02.02` | Docs & references | API references, OpenAPI & SDKs | API specs, OpenAPI, product API docs |  | 25 |
| `01.03.01` | Testing & QA | Unit & integration testing | Writing and running automated tests |  | 7 |
| `01.03.02` | Testing & QA | End-to-end & visual testing | Browser e2e tests, visual regression, QA agents | general browser automation (08.03) | 31 |
| `01.03.03` | Testing & QA | Mocking & load testing | Mock servers, API testing, load and performance tests |  | 10 |
| `01.04.01` | Code quality | Linting & static analysis | Linters, type checks, code quality metrics | security scanning (09.03) | 12 |
| `01.04.02` | Code quality | Code review | Automated or AI code review, review standards |  | 19 |
| `01.04.03` | Code quality | Refactoring & migration | Refactors, upgrades, language/framework migrations |  | 6 |
| `01.05` | CI/CD & builds |  | Build pipelines, CI runners, release automation |  | 20 |
| `01.06` | Local environment |  | Terminal, filesystem, SSH, local machine access |  | 22 |
| `01.07` | Coding agent workflows |  | Methods/skills for how coding agents plan, work, commit | agent memory (07.01) | 43 |
| `01.08.01` | Frontend & UI | UI component libraries | Component libraries, design systems for code |  | 39 |
| `01.08.02` | Frontend & UI | Design-to-code | Figma/design handoff to code, UI generation |  | 19 |
| `01.09` | Mobile app development |  | iOS/Android dev, app builds, app store submission | app store marketing (10.10) | 19 |
| `01.10` | Game development |  | Game engines (Unity, Godot…), game assets for dev | video games for players (24.03) | 25 |
| `01.11` | Embedded & hardware dev |  | Firmware, microcontrollers, hardware debugging | PCB design (32.*) | 7 |
| `01.12` | Language & runtime tools |  | LSP servers, package managers, language-specific tooling |  | 44 |

### 02 Cloud & Infrastructure (292)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `02.01.01` | Cloud providers | AWS | Amazon Web Services — any tool for that provider's own services |  | 45 |
| `02.01.02` | Cloud providers | Azure | Microsoft Azure — any tool for that provider's own services |  | 20 |
| `02.01.03` | Cloud providers | Google Cloud | Google Cloud Platform — any tool for that provider's own services |  | 4 |
| `02.01.04` | Cloud providers | Cloudflare | Cloudflare developer platform — any tool for that provider's own services |  | 3 |
| `02.01.05` | Cloud providers | Other clouds | Other cloud providers (DigitalOcean, Hetzner, Oracle…) — any tool for that provider's own services |  | 4 |
| `02.02` | App deployment & PaaS |  | Deploy apps/services (Vercel, Render, Railway, Fly…) | a specific provider's own products (02.01.*); static sites (03.04) | 54 |
| `02.03` | Backend-as-a-service |  | Supabase, Firebase-style backends | plain databases (05.01) | 41 |
| `02.04` | Servers & VPS |  | Virtual servers, bare metal, server admin |  | 22 |
| `02.05` | Containers & Kubernetes |  | Docker, Kubernetes, container registries |  | 9 |
| `02.06` | Infrastructure as code |  | Terraform, Pulumi, CloudFormation |  | 10 |
| `02.07` | Sandboxes |  | Ephemeral environments to run code safely |  | 9 |
| `02.08` | Networking, proxies & tunnels |  | Proxy networks, tunnels, CDN, IP lookups | firewalls/VPN (09.05) | 26 |
| `02.09` | File & object storage |  | Object storage, file hosting, media CDN |  | 39 |
| `02.10` | Cloud costs |  | Cloud billing, FinOps, cost optimization | AI token costs (06.07) | 6 |

### 03 Web Presence (217)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `03.01` | Website builders |  | Build and edit websites/landing pages | ecommerce stores (22.01) | 50 |
| `03.02` | CMS & WordPress |  | Content management systems, WordPress, headless CMS |  | 22 |
| `03.03.01` | Domains & DNS | Domain registration | Search, buy, renew domains |  | 21 |
| `03.03.02` | Domains & DNS | DNS & SSL | DNS records, certificates, custom domains |  | 6 |
| `03.03.03` | Domains & DNS | WHOIS & domain intelligence | Domain ownership, history, availability lookups |  | 12 |
| `03.04` | Web hosting |  | Static and shared web hosting | app platforms (02.02) | 34 |
| `03.05` | Links |  | URL shortening, link-in-bio, QR links |  | 37 |
| `03.06` | Website audits |  | Performance, accessibility, broken links, tech stack | SEO audits (10.02) | 35 |

### 04 Observability & Operations (83)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `04.01` | Logs & error monitoring |  | Error tracking, log search (Sentry, Datadog logs…) |  | 22 |
| `04.02` | Uptime & status pages |  | Uptime checks, status pages |  | 25 |
| `04.03` | Incidents & on-call |  | Incident management, on-call, postmortems |  | 13 |
| `04.04` | Metrics & APM |  | Infra metrics, tracing, APM | LLM tracing (06.04) | 23 |

### 05 Data (304)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `05.01.01` | Databases | Relational databases | Postgres, MySQL, SQL Server, SQLite |  | 51 |
| `05.01.02` | Databases | NoSQL, key-value & graph | MongoDB, Redis, DynamoDB |  | 16 |
| `05.01.03` | Databases | Vector databases | Embeddings stores, vector search |  | 8 |
| `05.02` | Warehouses & analytics DBs |  | Snowflake, BigQuery, ClickHouse, Databricks |  | 15 |
| `05.03` | Pipelines & orchestration |  | ETL, replication, Airflow, dbt |  | 54 |
| `05.04` | Spreadsheets & CSV |  | Spreadsheets, CSV/JSON processing, data cleaning |  | 11 |
| `05.05` | No-code data tables |  | Airtable-like tables and simple data apps |  | 27 |
| `05.06` | BI & dashboards |  | Dashboards, charts, BI tools, KPI reporting |  | 35 |
| `05.07` | Natural-language querying |  | Ask data questions in plain language |  | 8 |
| `05.08` | Data catalogs & governance |  | Data catalogs, lineage, quality, governance |  | 17 |
| `05.09` | Open data & statistics |  | Public statistics, open government datasets |  | 25 |
| `05.10` | Dataset discovery |  | Finding and downloading datasets |  | 6 |
| `05.11.01` | Geospatial & maps | Geocoding & addresses | Geocode, normalize, validate addresses |  | 8 |
| `05.11.02` | Geospatial & maps | Mapping, routing & imagery | Map data, routing, distance, GIS analysis | consumer place discovery (26.05) | 23 |

### 06 AI Engineering (188)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `06.01` | Model gateways & catalogs |  | Access many models, routing, model catalogs |  | 35 |
| `06.02` | GPU & inference hosting |  | Run/serve/fine-tune models on GPUs |  | 20 |
| `06.03` | Agent frameworks & SDKs |  | Libraries/platforms to build agents |  | 37 |
| `06.04` | Evaluation & tracing |  | LLM evals, tracing, prompt/agent observability |  | 33 |
| `06.05` | Prompts & techniques |  | Prompt libraries, reasoning techniques, prompt management |  | 19 |
| `06.06` | Voice agent platforms |  | Build voice/phone AI agents | using a phone agent (12.06) | 6 |
| `06.07` | AI cost & usage |  | Token cost, usage and ROI tracking |  | 12 |
| `06.08` | AI governance |  | AI policy, EU AI Act, responsible AI | agent runtime guardrails (07.07) | 13 |
| `06.09` | ML & data science |  | Classic ML, model training, notebooks |  | 13 |

### 07 Agent Infrastructure (419)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `07.01.01` | Memory & context | Persistent agent memory | Memory that persists across sessions/clients | human notes/wikis (14.04) | 70 |
| `07.01.02` | Memory & context | Coding-agent memory | Memory and context specific to coding agents |  | 17 |
| `07.01.03` | Memory & context | Shared team context | Context shared between people's agents/teams |  | 24 |
| `07.01.04` | Memory & context | Handoffs & decision records | Session handoffs, decision logs, chat history |  | 8 |
| `07.02` | Agent-to-agent |  | Agent messaging, agent social networks, agent task boards |  | 61 |
| `07.03` | Agent marketplaces |  | Agents buying/selling services, gigs, bounties |  | 39 |
| `07.04` | Humans for agents |  | Hiring humans, approvals, human input bridges |  | 26 |
| `07.05.01` | MCP ecosystem | MCP registries & directories | Find MCP servers and tools |  | 20 |
| `07.05.02` | MCP ecosystem | MCP gateways & routers | Aggregate, proxy, route MCP servers |  | 23 |
| `07.05.03` | MCP ecosystem | MCP & skill vetting | Security/quality checks of MCP servers and skills |  | 18 |
| `07.06` | Skills |  | Skill libraries, skill authoring and management |  | 15 |
| `07.07.01` | Agent trust & governance | Agent identity & verifiable records | Agent identity, attestations, audit trails |  | 22 |
| `07.07.02` | Agent trust & governance | Pre-action gates & policies | Policies/guardrails checked before agent actions |  | 36 |
| `07.07.03` | Agent trust & governance | Spend & permission limits | Budgets, payment and permission limits for agents |  | 1 |
| `07.08` | Agent payments |  | x402, pay-per-call, agent wallets and spend | crypto trading (20.*) | 39 |

### 08 Web Search & Automation (188)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `08.01` | Search APIs |  | General web search for agents | news (24.11) | 36 |
| `08.02.01` | Scraping & extraction | Web scraping | Crawl and extract data from websites |  | 35 |
| `08.02.02` | Scraping & extraction | Page to markdown | Read a page as clean text/markdown |  | 16 |
| `08.02.03` | Scraping & extraction | Platform data scrapers | Scrape specific platforms (social, maps, app stores, marketplaces) |  | 9 |
| `08.03` | Browser & computer automation |  | Control browsers or desktops |  | 36 |
| `08.04` | Workflow automation |  | Zapier/Make/n8n-style integrations and automations |  | 18 |
| `08.05` | Deep research |  | Multi-step research reports |  | 12 |
| `08.06` | Software & AI tool directories |  | Directories, launch sites and reviews of software and AI tools | MCP registries (07.05.01) | 26 |
| `08.07` | Fact-checking & verification |  | Verify claims, sources, AI-generated content |  | 0 |

### 09 Security & Identity (150)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `09.01` | Auth & identity providers |  | Login, SSO, user identity, IAM | agent identity (07.07) | 12 |
| `09.02` | Secrets & credentials |  | Vaults, secrets, password managers |  | 9 |
| `09.03.01` | App security scanning | Code & dependency scanning | SAST, dependencies, secrets in code |  | 29 |
| `09.03.02` | App security scanning | Pentest & vulnerability scanning | Pentesting, DAST, infrastructure vulnerability scans |  | 20 |
| `09.04` | Threat intel & OSINT |  | Threat intelligence, OSINT, investigations |  | 20 |
| `09.05` | Network & device security |  | Firewalls, VPN, network scanning |  | 14 |
| `09.06` | URL & email security |  | Phishing, link and email/domain checks |  | 18 |
| `09.07` | Fraud, KYC & bot detection |  | Fraud detection, identity verification, KYC |  | 17 |
| `09.08` | Privacy & PII |  | PII redaction, privacy tooling |  | 11 |

### 10 Marketing (489)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `10.01.01` | Advertising | Search ads | Google/Bing ads management |  | 18 |
| `10.01.02` | Advertising | Social ads | Meta, TikTok, LinkedIn ads management |  | 20 |
| `10.01.03` | Advertising | Ad intelligence | Ad libraries, competitor ads, ad creative research |  | 8 |
| `10.01.04` | Advertising | Other advertising | Programmatic, out-of-home, niche ad networks |  | 17 |
| `10.02.01` | SEO | Technical SEO audits | Site SEO audits and fixes |  | 17 |
| `10.02.02` | SEO | Keywords & rank tracking | Keyword research, SERP and rank tracking |  | 19 |
| `10.02.03` | SEO | Local SEO | Google Business profiles, local listings |  | 7 |
| `10.02.04` | SEO | Content SEO & backlinks | SEO content, blog publishing, backlinks |  | 19 |
| `10.03` | AI search visibility |  | Visibility in ChatGPT/AI answers (GEO) |  | 58 |
| `10.04.01` | Social media | Scheduling & publishing | Plan and post to social platforms |  | 58 |
| `10.04.02` | Social media | Social analytics & listening | Social metrics, brand monitoring, listening |  | 17 |
| `10.04.03` | Social media | Platform data | Social platform data APIs (X, Instagram, TikTok, YouTube, Reddit) |  | 25 |
| `10.04.04` | Social media | Growth services | Followers, engagement and growth services |  | 10 |
| `10.05` | Influencers & creators |  | Find and manage creators/influencers |  | 16 |
| `10.06` | Email marketing |  | Campaigns, newsletters, email marketing platforms | transactional email (12.01) | 23 |
| `10.07` | Affiliate & funnels |  | Affiliate programs, funnels |  | 13 |
| `10.08.01` | Analytics | Web analytics | Website traffic analytics |  | 28 |
| `10.08.02` | Analytics | Product analytics | Product/app usage, session replay |  | 39 |
| `10.08.03` | Analytics | Attribution | Marketing attribution and campaign measurement |  | 8 |
| `10.09` | Experiments & feature flags |  | A/B tests, feature flags |  | 17 |
| `10.10` | App store optimization |  | App store listings, ASO, app store analytics |  | 16 |
| `10.11` | PR & press |  | Press releases, media outreach, PR |  | 4 |
| `10.12` | Marketing strategy |  | Marketing plans, positioning, AI marketing teams |  | 32 |

### 11 Sales & CRM (158)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `11.01` | CRM systems |  | HubSpot, Salesforce, Pipedrive and other CRMs |  | 44 |
| `11.02.01` | Prospecting data | Contact & email finder | Find emails/phones of people |  | 19 |
| `11.02.02` | Prospecting data | Enrichment | Enrich people and companies |  | 22 |
| `11.02.03` | Prospecting data | Local business leads | Lists of local businesses as leads |  | 9 |
| `11.03` | Outreach |  | Cold email, LinkedIn outreach, sequences |  | 22 |
| `11.04` | Sales intelligence |  | Buying signals, account briefs, call prep |  | 19 |
| `11.05` | Lead scoring |  | Qualify and prioritize leads |  | 5 |
| `11.06` | AI SDRs |  | Autonomous AI sales reps |  | 7 |
| `11.07` | Sales calls & coaching |  | Call analysis, coaching |  | 5 |
| `11.08` | Proposals & quotes |  | Sales proposals, RFPs, quotes | invoices (15.02) | 6 |

### 12 Communications (185)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `12.01` | Transactional email |  | Send email from apps, deliverability | marketing email (10.06) | 22 |
| `12.02` | Email verification |  | Validate email addresses |  | 20 |
| `12.03` | Inboxes |  | Business mailboxes, agent inboxes, personal inbox mgmt |  | 30 |
| `12.04` | SMS, phone numbers & push |  | SMS, virtual numbers, OTP numbers |  | 26 |
| `12.05` | Messaging apps |  | WhatsApp, Telegram, Slack, Discord, Teams |  | 48 |
| `12.06` | Voice & telephony |  | Phone calls, AI phone desks, fax, telephony | building voice agents (06.06) | 30 |
| `12.08` | Physical mail |  | Send letters, postcards, physical mail |  | 9 |

### 13 Customer Experience (133)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `13.01` | Helpdesk & ticketing |  | Support tickets, helpdesk platforms |  | 17 |
| `13.02` | AI support agents |  | AI agents that answer customers |  | 18 |
| `13.03` | Feedback, reviews & NPS |  | Customer feedback, NPS, roadmaps |  | 28 |
| `13.04` | Surveys & forms |  | Surveys, forms, polls |  | 35 |
| `13.06` | Loyalty & rewards |  | Loyalty programs, points, rewards |  | 7 |
| `13.07` | User research |  | Customer interviews, user research |  | 23 |
| `13.08` | Retention & cancellations |  | Churn, cancellation flows, retention |  | 5 |

### 14 Productivity & Collaboration (434)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `14.01.01` | Tasks & projects | Task management | To-dos, personal tasks, habits |  | 25 |
| `14.01.02` | Tasks & projects | Project management & OKRs | Team project boards (Asana, Linear, Monday, Trello) |  | 59 |
| `14.01.03` | Tasks & projects | Jira & Confluence | Atlassian tools |  | 15 |
| `14.02` | Calendar & scheduling |  | Calendars, booking links, meeting scheduling | local appointment booking (26.01) | 35 |
| `14.03` | Meetings |  | Transcripts, summaries, minutes, video calls |  | 32 |
| `14.04.01` | Notes & knowledge bases | Notes & journals | Personal notes, journals |  | 23 |
| `14.04.02` | Notes & knowledge bases | Wikis & knowledge bases | Team wikis, documentation, knowledge bases | agent memory (07.01) | 35 |
| `14.04.03` | Notes & knowledge bases | Bookmarks & read-later | Saved links, read-later, clippings |  | 12 |
| `14.05.01` | Documents | PDF & OCR | Read, edit, OCR PDFs and scans |  | 25 |
| `14.05.02` | Documents | File conversion | Convert between file formats |  | 24 |
| `14.05.03` | Documents | E-signature | Sign documents |  | 15 |
| `14.05.04` | Documents | Document generation | Generate documents, reports, templates |  | 13 |
| `14.06` | Presentations |  | Slides and decks |  | 18 |
| `14.07` | Diagrams & whiteboards |  | Diagrams, flowcharts, whiteboards |  | 29 |
| `14.08` | Office suites |  | Microsoft 365, Google Workspace, Notion |  | 21 |
| `14.09` | Time tracking |  | Track time on work |  | 5 |
| `14.10` | Everyday utilities |  | Time zones, units, dates, QR, calculators, randomness |  | 31 |
| `14.11` | Speech-to-text |  | Transcribe audio to text |  | 17 |

### 15 Finance & Accounting (150)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `15.01` | Accounting |  | Bookkeeping, ledgers, accounting software |  | 32 |
| `15.02` | Invoicing |  | Invoices, estimates |  | 29 |
| `15.03` | Payment processing |  | Stripe-like payments, payment links | agent payments (07.08) | 31 |
| `15.04` | Subscription billing |  | Recurring billing, SaaS metrics |  | 8 |
| `15.05` | Business banking & formation |  | Business accounts, corporate cards |  | 10 |
| `15.06` | Tax & VAT |  | Tax calculation, VAT, filings |  | 24 |
| `15.08` | Expenses & receipts |  | Expense reports, receipt and statement extraction |  | 5 |
| `15.10` | Financial reporting & planning |  | Financial statements, budgets, forecasts, cash flow |  | 11 |

### 16 Business Operations (163)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `16.01` | ERP & enterprise apps |  | SAP, ServiceNow, NetSuite, Dynamics |  | 19 |
| `16.02` | Procurement & suppliers |  | Buying, payables, supplier sourcing |  | 11 |
| `16.03` | Inventory & supply chain |  | Inventory, warehouses, supply chain |  | 8 |
| `16.04.01` | Company intelligence | Company registries | Official company registries and firmographics |  | 45 |
| `16.04.02` | Company intelligence | Competitor & market research | Competitors, markets, industry research |  | 29 |
| `16.04.03` | Company intelligence | Company risk & filings | Company risk, credit, reliability |  | 11 |
| `16.05` | Business strategy |  | Strategy frameworks, diagnostics, startup idea validation |  | 32 |
| `16.06` | Field service |  | Field service, resource and equipment scheduling |  | 8 |

### 17 HR & Careers (144)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `17.01` | Job search |  | Find jobs, job boards |  | 56 |
| `17.02` | Applications & CVs |  | CVs, cover letters, auto-apply, interview prep |  | 24 |
| `17.03` | Recruiting |  | Job posting, ATS, sourcing candidates |  | 19 |
| `17.04` | Candidate assessment |  | Screening, tests, assessments |  | 10 |
| `17.05` | Freelance, talent & networking |  | Freelance platforms, talent networks, professional networking |  | 15 |
| `17.06` | People management & payroll |  | Engagement, people analytics, onboarding, HR policy |  | 14 |
| `17.08` | Compensation data |  | Salaries, pay transparency |  | 6 |

### 18 Legal & Compliance (132)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `18.01` | Legal research |  | Case law, legal Q&A |  | 19 |
| `18.02` | Statutes & regulations |  | Laws, regulations |  | 28 |
| `18.03` | Courts & filings |  | Court records, dockets, judgments |  | 13 |
| `18.04` | Contracts & legal documents |  | Draft and review contracts and legal docs |  | 22 |
| `18.05` | Patents & trademarks |  | IP search and filings |  | 11 |
| `18.06` | Compliance |  | GDPR, security certifications, industry compliance | AI governance (06.08) | 33 |
| `18.07` | Sanctions & screening |  | Sanctions, export control, AML screening |  | 6 |

### 19 Investing & Markets (274)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `19.01.01` | Stocks | Market data & quotes | Prices, quotes, market data |  | 25 |
| `19.01.02` | Stocks | Fundamentals & filings | Financials, SEC filings, insider trades |  | 47 |
| `19.01.03` | Stocks | Equity research | Valuation, analyst ratings, sentiment |  | 50 |
| `19.02` | Macro & economics |  | Economic indicators, central banks |  | 14 |
| `19.03` | Forex & commodities |  | FX, gold, commodities |  | 20 |
| `19.04` | Bonds, funds & ETFs |  | Bonds, yields |  | 6 |
| `19.05` | Trading & brokerage |  | Brokerage APIs, trading strategies, backtests | crypto trading (20.02) | 34 |
| `19.06` | Private markets |  | VC, PE, startups, deals |  | 44 |
| `19.07` | Prediction markets |  | Polymarket, Kalshi-style markets | sports betting (29.03) | 14 |
| `19.08` | Portfolio & advisor tools |  | Portfolio tracking, wealth advisor tools |  | 20 |

### 20 Crypto & Web3 (175)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `20.01` | Crypto market data |  | Prices, signals, on-chain analytics |  | 57 |
| `20.02` | Crypto trading |  | Trading bots, perps, backtesting |  | 20 |
| `20.03` | DEX & swaps |  | Swaps, exchanges, DeFi |  | 22 |
| `20.04` | Wallets & token risk |  | Wallets, token safety checks |  | 29 |
| `20.05` | Stablecoins |  | Stablecoin infrastructure | agent payments (07.08) | 5 |
| `20.06` | Blockchain infrastructure |  | Nodes, RPC, chain tooling |  | 35 |
| `20.07` | NFTs & tokenized assets |  | NFTs, RWA, token launches |  | 7 |

### 21 Personal Finance (89)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `21.01` | Budgeting |  | Personal budgets, spending |  | 24 |
| `21.02` | Bank aggregation |  | Connect personal bank accounts |  | 11 |
| `21.03` | Loans, cards & rewards |  | Personal loans, credit cards, rewards |  | 11 |
| `21.04` | Insurance |  | Insurance quotes, policies, claims | health billing (28.05) | 14 |
| `21.06` | Mortgages |  | Mortgage rates and calculators |  | 15 |
| `21.07` | Calculators & retirement |  | Personal finance calculators |  | 14 |

### 22 Commerce & Shopping (287)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `22.01.01` | Selling online | Store builders | Shopify, WooCommerce, storefronts |  | 34 |
| `22.01.02` | Selling online | Marketplace seller tools | Amazon, Etsy, eBay seller tools |  | 15 |
| `22.01.03` | Selling online | Orders & fulfillment | Orders, shipping, fulfillment | freight (33.05) | 13 |
| `22.01.04` | Selling online | Ecommerce analytics | Store metrics, product analytics |  | 13 |
| `22.02` | Print on demand |  | POD merch, custom products |  | 19 |
| `22.03.01` | Product search & price comparison | Product search | Find products across stores |  | 25 |
| `22.03.02` | Product search & price comparison | Price tracking & comparison | Compare and track prices |  | 41 |
| `22.03.03` | Product search & price comparison | Product reviews | Product reviews and ratings |  | 3 |
| `22.04` | Deals & coupons |  | Coupons, discounts |  | 16 |
| `22.05` | Classifieds & second-hand |  | Classifieds, used goods | cars (25.08) | 17 |
| `22.06` | Shopping agents & checkout |  | Agents that buy for you, checkout |  | 16 |
| `22.07` | Wholesale & B2B |  | Wholesale catalogs, B2B buying |  | 17 |
| `22.08` | Category shops |  | Specific product categories (fashion, electronics, beauty, gifts…) |  | 58 |

### 23 Content & Media Creation (393)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `23.01.01` | Images | AI image generation | Generate images with AI |  | 59 |
| `23.01.02` | Images | Image editing | Edit, resize, remove background |  | 16 |
| `23.01.03` | Images | Stock media & icons | Stock photos, icons, illustrations |  | 17 |
| `23.02.01` | Video | AI video generation | Generate video with AI |  | 48 |
| `23.02.02` | Video | Video editing | Edit, clip, subtitle videos |  | 50 |
| `23.03.01` | Audio | Music generation | AI music |  | 11 |
| `23.03.02` | Audio | Voice & TTS | Text to speech, voice cloning |  | 8 |
| `23.03.03` | Audio | Audio editing | Mastering, sound effects |  | 16 |
| `23.04.01` | Design | Templates & graphics | Templates, social graphics, Canva-like |  | 50 |
| `23.04.02` | Design | Brand & logos | Brand kits, logos |  | 11 |
| `23.04.03` | Design | 3D & animation | 3D models, animation, motion graphics | engineering CAD (32.*) | 17 |
| `23.05` | Writing |  | Copywriting, editing, storytelling |  | 29 |
| `23.06` | Translation |  | Translation and localization |  | 18 |
| `23.07` | Publishing |  | Blogs, books, ebooks |  | 19 |
| `23.08` | Podcasts |  | Podcast production and hosting |  | 20 |
| `23.09` | Digital signage |  | Manage screens and displays content |  | 4 |

### 24 Entertainment & Culture (234)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `24.01` | Movies & TV |  | Film, TV, streaming |  | 20 |
| `24.02` | Music & radio |  | Music catalogs, concerts, lyrics, radio stations, track ID |  | 24 |
| `24.03` | Video games |  | Games for players: catalogs, stats, guides |  | 38 |
| `24.04` | Tabletop, puzzles & trivia |  | Board games, RPGs, puzzles, chess |  | 17 |
| `24.05` | Books & reading |  | Books, libraries, reading |  | 9 |
| `24.06` | Art & museums |  | Art, artists, museums, art market |  | 14 |
| `24.07` | Collectibles |  | Trading cards, collectibles |  | 15 |
| `24.08` | Religion & spirituality |  | Scripture, prayer, religious texts |  | 16 |
| `24.09` | Astrology & divination |  | Astrology, tarot, I Ching |  | 17 |
| `24.11` | News |  | News search, briefings, archives |  | 57 |
| `24.12` | History & culture |  | History, heritage, culture |  | 7 |

### 25 Travel & Mobility (258)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `25.01` | Flights |  | Flight search, booking, awards, compensation |  | 38 |
| `25.02` | Hotels & stays |  | Hotels, rentals, campsites |  | 45 |
| `25.03` | Trip planning & tours |  | Itineraries, tours, guides |  | 52 |
| `25.04` | Ground transport & car rental |  | Trains, transit, rides, transfers |  | 19 |
| `25.06` | Visas & immigration |  | Visas, residency, citizenship |  | 13 |
| `25.07` | Connectivity abroad |  | eSIM, roaming |  | 17 |
| `25.08.01` | Vehicles | Vehicle data & VIN | VIN decoding, specs, recalls |  | 11 |
| `25.08.02` | Vehicles | Buying, selling & valuation | Car listings, prices, auctions |  | 29 |
| `25.08.03` | Vehicles | Parts & maintenance | Parts, fitment, repairs, diagnostics |  | 13 |
| `25.08.04` | Vehicles | Parking & tolls | Parking, tolls, fines | EV charging (33.01) | 4 |
| `25.09` | Aviation & maritime |  | Flight and vessel tracking, aviation data |  | 17 |

### 26 Local & Events (136)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `26.01` | Local businesses |  | Local directories, appointments, local services |  | 37 |
| `26.02` | Restaurants |  | Restaurant search and booking |  | 13 |
| `26.03` | Events & ticketing |  | Events, conferences, tickets |  | 56 |
| `26.04` | Weddings & celebrations |  | Wedding and party planning |  | 8 |
| `26.05` | Places & maps |  | Place discovery, POIs | GIS (05.11) | 11 |
| `26.06` | Weather |  | Forecasts, climate, natural hazards |  | 11 |

### 27 Real Estate & Home (189)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `27.01` | Property listings |  | Homes for sale |  | 37 |
| `27.02` | Rentals |  | Rental listings |  | 17 |
| `27.03` | Property records & valuation |  | Parcels, zoning, valuations |  | 55 |
| `27.04` | Property management |  | Landlord and property management |  | 10 |
| `27.05` | Home services |  | Trades, movers, repairs |  | 29 |
| `27.06` | Construction & AEC |  | Building projects, estimating, takeoffs |  | 24 |
| `27.07` | Smart home |  | Home automation, IoT at home |  | 9 |
| `27.08` | Interior & decor |  | Interior design, decor |  | 8 |

### 28 Health & Wellbeing (80)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `28.01` | Clinical & senior care |  | Telehealth, providers, clinical tools |  | 14 |
| `28.02` | Medical records |  | Patient records, health data |  | 5 |
| `28.03` | Drugs & pharmacy |  | Medications, drug info, pharmacy prices |  | 6 |
| `28.04` | Medical references |  | Clinical evidence, guidelines, medical coding |  | 13 |
| `28.05` | Medical billing & insurance |  | Claims, prior auth, medical bills |  | 9 |
| `28.06` | Mental health |  | Therapy, mood, stress |  | 14 |
| `28.07` | Nutrition & diet |  | Calories, diets, nutrition | recipes (30.01) | 11 |
| `28.09` | Sleep & wellbeing |  | Sleep, habits, general wellbeing |  | 8 |

### 29 Sports & Outdoors (96)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `29.01` | Training & fitness |  | Coaching, workouts, wearables (Garmin, Oura, Strava) |  | 32 |
| `29.02` | Scores & stats |  | Results, schedules, stats |  | 26 |
| `29.03` | Betting & odds |  | Sports predictions and odds |  | 18 |
| `29.04` | Amateur leagues |  | Clubs, leagues, tournaments |  | 8 |
| `29.05` | Outdoor activities |  | Trails, camping, surf, hiking |  | 12 |

### 30 Food & Lifestyle (68)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `30.01` | Recipes |  | Recipes, cooking |  | 10 |
| `30.02` | Groceries & food delivery |  | Grocery shopping, lists |  | 15 |
| `30.04` | Drinks & wine |  | Wine, beer, beverages |  | 8 |
| `30.05` | Beauty & salons |  | Beauty, hair, salon booking |  | 9 |
| `30.06` | Dating & relationships |  | Dating, relationships |  | 5 |
| `30.07` | Parenting & kids |  | Parenting, kids activities |  | 7 |
| `30.08` | Pets |  | Pet care, adoption |  | 7 |
| `30.09` | Hobbies & crafts |  | Gardening, crafts, sewing, other hobbies |  | 7 |

### 31 Education & Research (94)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `31.01` | Courses & certifications |  | Online courses, training |  | 33 |
| `31.02` | Language learning |  | Learn languages |  | 7 |
| `31.03` | Tutoring & exams |  | Tutoring, exam prep, flashcards |  | 14 |
| `31.04` | Scientific literature & academic writing |  | Paper search, citations, research graphs |  | 31 |
| `31.06` | Schools & education data |  | School data |  | 9 |

### 32 Science & Engineering (110)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `32.01` | Life sciences |  | Genomics, biology data, lab experiment tracking | clinical care (28.*) | 14 |
| `32.02` | Chemistry, materials & drug discovery |  | Molecular/protein modelling, materials, drug discovery data |  | 11 |
| `32.03` | Mathematics, physics & quantum |  | Proofs, problem solving, statistics, econometrics |  | 15 |
| `32.05` | Research computing |  | HPC, scientific data formats, research pipelines | paper search (31.04) | 8 |
| `32.06` | Earth, space & environment |  | Climate, air quality, oceans, geohazards, environmental data | daily weather (26.06) | 12 |
| `32.08` | CAD & engineering design |  | CAD, parametric modelling, engineering drawings | 3D for media (23.04.03) | 8 |
| `32.09` | Engineering calculation, simulation & standards |  | Engineering calcs, simulation, systems modelling |  | 14 |
| `32.11` | Electronics |  | Components, datasheets, PCB, RF & optics | firmware dev (01.11) | 12 |
| `32.12` | Robotics & computer vision |  | Robots, drones, vision |  | 6 |
| `32.13` | Telecom & IoT |  | Telecom networks, IoT devices, sensors | smart home (27.07) | 10 |

### 33 Industry & Energy (101)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `33.01` | Energy & resources |  | Grid, electricity, solar, storage, EV charging, fuel, oil & gas, mining, carbon accounting |  | 29 |
| `33.03` | Manufacturing |  | Industrial automation, metals & fabrication, industrial supplies, product compliance |  | 17 |
| `33.04` | Agriculture |  | Farms, crops, livestock, food safety |  | 8 |
| `33.05.01` | Freight & logistics | Parcels & shipping | Parcel tracking, shipping labels, carriers | store fulfillment (22.01.03) | 17 |
| `33.05.02` | Freight & logistics | Freight marketplaces | Freight rates, carriers, trucking |  | 11 |
| `33.05.03` | Freight & logistics | Customs & trade | Tariffs, customs, import duties, trade data |  | 8 |
| `33.07` | 3D printing |  | Additive manufacturing, print services |  | 11 |

### 34 Government & Society (67)

| Code | Category | Topic | Definition | Excludes | Listings |
|---|---|---|---|---|---:|
| `34.01` | Public records & demographics |  | Council, municipal and public records |  | 11 |
| `34.02` | Public procurement |  | Tenders, government contracts |  | 22 |
| `34.03` | Elections & politics |  | Elections, legislation, politicians |  | 10 |
| `34.05` | Nonprofits & charity |  | Charities, donations |  | 12 |
| `34.07` | Government & social services |  | Paperwork, public services, civic tech |  | 12 |
