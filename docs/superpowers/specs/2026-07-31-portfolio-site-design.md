# Portfolio Site — Design Spec

Date: 2026-07-31
Owner: Tanishq Shukla

## Purpose

A personal portfolio site that lets both non-technical recruiters and engineers
quickly conclude "this person is a highly skilled full-stack AI engineer" —
recruiters via a fast top-level scan, engineers via real technical depth on
click-through. One page, no backend, deployable free.

## Repo / hosting

- New standalone repo: `portfolio/` on Desktop, own git history (Desktop itself
  is not a git repo).
- Remote: `git@github-personal:tanishq0421/portfolio.git` (public repo,
  created via `gh repo create`).
- Deploy target: Vercel, done later by the user — not part of this build.
- Small, incremental commits per logical step (scaffold, then one commit per
  section/component), pushed as work lands.

## Tech stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS.
- Fully static (no API routes, no database) — content lives in typed data
  files under `lib/data/`.
- No test framework requested; this is a content/visual site, verified via
  running the dev server and reviewing in-browser (per CLAUDE.md: UI changes
  must be checked in a real browser before being called done).

## Visual system

- Dark, technical, precise: near-black background (`#0a0a0a`-ish), off-white
  text, one restrained amber accent color for links/highlights/metrics.
- Monospace font (e.g. JetBrains Mono / Geist Mono) for metrics, labels, code
  snippets, section eyebrows. A clean sans (e.g. Inter / Geist Sans) for body
  copy and headings.
- Sharp grid layout, generous vertical spacing between sections, no
  gradients/glassmorphism/animated blobs — restrained, engineering-grade, not
  "SaaS landing page."
- Responsive: single column on mobile, grid where it helps (impact strip,
  skills) on desktop.

## Page structure (single scrollable page, `app/page.tsx`)

### 1. Hero
- Name, role line: "Founding Engineer · Full-Stack AI Engineer."
- One-sentence positioning (LLM infra / agent systems / production backend).
- Links: GitHub (github.com/tanishq0421), LinkedIn, email
  (tanishq.shukla.official@gmail.com), resume PDF download.

### 2. Impact strip
Scannable row/grid of hard metrics, sourced from resume + project READMEs —
the "recruiter in 5 seconds" layer. No expansion, just numbers + one-line
labels:
- ~12k MCP tool calls/day across 9 tools
- $10k+/mo payments processed @ 99.99% success
- ~50k requests/day distributed job infra
- 500k+ frames/day media pipeline
- Scraping cost cut 89% ($1,800 → $200/mo)
- Red-team attack success rate cut 100% → <20% (Sentinel)

### 3. Experience — expandable case-study cards
Accordion cards: collapsed shows role/company/dates + one-line summary +
headline metric; expanded shows Problem → Architecture/Approach → Key
decisions → Tradeoffs → Stack.

**Surgegrowth — Founding Engineer (Feb '25–Present)**, four case-study cards:
1. MCP server (FastMCP) — 9 tools, ~12k calls/day, OAuth 2.1 (PKCE, dynamic
   client registration, rotating refresh tokens).
2. Billing & usage-based pricing (Dodo) — idempotent payments, $10k+/mo @
   99.99%, rate cards, prepaid credit lots (FEFO), 40+ orgs.
3. Distributed job infrastructure — APScheduler + Postgres job store, Cloud
   Pub/Sub, Cloud Run Jobs/Functions, atomic claims, ~50k req/day.
4. Media-processing engine — FFmpeg, 500k+ frames/day, self-hosted ML
   inference (MDX-Net/ONNX, DeepFilterNet), replaced json2video.
   (Multi-model media gateway — Veo 3.1/Nano Banana/Seedance — and ClickHouse
   usage analytics get folded in as supporting detail on the relevant cards
   rather than as separate cards, to keep the section to 4 focused cards.)

**Kimcc — SDE Intern (May–Jul '24)**, one case-study card:
- Pulse analytics revamp (+25% engagement) + Time Diary; cross-platform
  Electron app (secure auth, offline-first sync); MongoDB aggregation
  pipelines (~30% faster queries).
- Built strictly from resume bullets — the LinkedIn post referenced was not
  accessible (login-walled, not scraped) and was not supplied as text, so no
  claims beyond the resume are made here.

**Oton — SDE Intern (Dec '23–Feb '24)** — compact entry, no expansion (Slack
bot automation, Prisma/Postgres, cursor pagination + Jira API integration,
Redis Bull queues).

### 4. Projects — full case-study cards
Same expand pattern as Experience, built from each repo's README:

**Sentinel — Agent Eval & Red-Team Platform** ([github link](https://github.com/tanishq0421/Sentinel))
- Problem: shipping LLM agents safely needs more than vibes — need measured
  eval + red-team evidence.
- Architecture: Next.js console → FastAPI → Redis/RQ worker → Postgres
  (ParadeDB: pgvector + BM25 hybrid RAG); agent built on LangGraph, models via
  LiteLLM.
- Key findings: Claude Haiku 0% vs GPT-4o-mini 25% attack-success-rate on
  identical injection attacks; guardrails cut GPT-4o-mini ASR 25% → 0%; caught
  a real agent safety bug (unauthorized refund on a cancel request).
- Tradeoffs/design notes: custom-built evals/tracing instead of
  DeepEval/Langfuse (rationale in repo); strict TDD, 77 tests, integration
  tests against a real Postgres.

**OutageRadar — Distributed RSS Feed Monitor** ([github link](https://github.com/tanishq0421/Status-Tracker-App))
- Problem: track OpenAI/Claude status feeds reliably without hammering them or
  double-processing incidents.
- Architecture: async monitor (poll → parse → dedup → enqueue) decoupled from
  worker(s) (dequeue → atomic claim → dispatch) via a Redis queue
  (LPUSH/BRPOP).
- Key design: two-level deduplication — monitor-level GUID check
  (pre-enqueue) + worker-level atomic Redis SETNX claim (race-condition-free
  across multiple workers); Strategy pattern for per-provider parsers
  (OpenAI/Claude/generic), zero changes to existing parsers when adding a
  provider.
- Other details: conditional GET (ETag/Last-Modified), adaptive polling
  (30s during incidents vs 5min normal), exponential backoff with jitter,
  structured JSON logs, graceful SIGTERM shutdown.

### 5. Skills
Grouped, not a flat tag cloud:
- **Languages:** C/C++, TypeScript, Python, Rust, Go, PHP, SQL, HTML/CSS
- **Infra & Cloud:** AWS (EC2, S3), Docker, Nginx, Cloud Run, Cloud Pub/Sub,
  Grafana
- **AI / LLM:** LangChain, LangGraph, LangSmith, LiteLLM, RAG, agentic system
  design
- **Data:** PostgreSQL, Redis, ClickHouse, pgvector

### 6. Leadership + Education
Compact, non-expandable:
- B.Tech Chemical Engineering, IIT (BHU) Varanasi, 2021–2025.
- Startup Assistance Program Manager, E-Cell IIT BHU (May '23–May '24) —
  principal liaison for 20+ startups at E-Summit'24.

### Footer
Email, GitHub, LinkedIn, resume download — repeated from hero for
end-of-scroll conversion.

## Data structure

Content separated from components so future edits are data edits:
- `lib/data/hero.ts`
- `lib/data/impact-metrics.ts`
- `lib/data/experience.ts` (Surgegrowth cards, Kimcc card, Oton entry)
- `lib/data/projects.ts` (Sentinel, OutageRadar)
- `lib/data/skills.ts`
- `lib/data/leadership.ts`

Each experience/project card is one typed object: `{ title, org, dates,
summary, metric, problem, approach, decisions, tradeoffs, stack, links? }`.
A single `<CaseStudyCard>` component renders both Experience and Project
cards from this shape (Oton stays a plain non-expandable row using a subset
of the same shape).

## Explicitly out of scope

- No CMS, no backend, no contact form (mailto link only).
- No terminal/CLI easter egg (user chose expandable case studies as the sole
  depth mechanism).
- No multi-page routing — single scrollable page only.
- No automated tests — verified via dev server + in-browser review.
- No deployment as part of this build (user deploys to Vercel later).
