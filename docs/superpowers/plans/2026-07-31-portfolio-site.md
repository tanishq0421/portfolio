# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a single-page, dark-themed Next.js portfolio site for Tanishq Shukla with an expandable-case-study depth layer, backed by a public GitHub repo (`tanishq0421/portfolio`).

**Architecture:** Fully static Next.js 16 App Router site, no backend/API routes/database. Content lives in typed TypeScript data files under `lib/data/`, rendered by small single-purpose components under `components/`. One shared `CaseStudyCard` client component (accordion) powers both the Experience and Projects sections. Everything renders from `app/page.tsx`.

**Tech Stack:** Next.js 16.2.x (App Router), React 19, TypeScript, Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.ts`), Geist Sans / Geist Mono via `next/font/google`.

**Design reference:** `docs/superpowers/specs/2026-07-31-portfolio-site-design.md` — read it before starting if anything below is ambiguous.

## Global Constraints

- Repo already exists locally at `/Users/tanishq/Desktop/portfolio` with `git init` done, `origin` remote set to `git@github-personal:tanishq0421/portfolio.git`, and one commit (the design spec). `gh` CLI is authenticated as `tanishq0421` over SSH.
- No automated test framework (per spec: "verified via dev server + in-browser review"). **Test cycle for every task in this plan = `npm run build` (type-checks + lints + compiles) after each change**, plus a manual dev-server/browser check on the final task. Treat a clean `npm run build` as the pass/fail gate for each task — do not skip it.
- Dark theme only — no light-mode toggle, no `prefers-color-scheme` branching. This is the site's fixed visual identity, not a themeable app.
- Color tokens (fixed, do not invent new ones): `--background: #0a0a0a`, `--foreground: #e5e5e5`, `--accent: #f5a524`, `--muted: #8a8a8a`, `--border: #262626`.
- Fonts: Geist Sans (`--font-geist-sans`, body/headings) and Geist Mono (`--font-geist-mono`, labels/metrics/code), both self-hosted automatically by `next/font/google` — no extra font packages.
- Small, incremental commits: one commit per task (or per logical sub-step where noted), pushed to `origin main` after each commit.
- All resume/project facts in data files must trace back to `docs/superpowers/specs/2026-07-31-portfolio-site-design.md` or the two source READMEs it was built from (`/Users/tanishq/Desktop/sentinel/README.md`, `/Users/tanishq/Desktop/open-ai-status-tracker/README.md`). Do not invent metrics, dates, or claims.
- Working directory for every command below: `/Users/tanishq/Desktop/portfolio`.

---

### Task 1: Scaffold Next.js app, create GitHub repo, push

**Files:**
- Create: entire scaffold (`app/`, `public/`, `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `README.md`, `AGENTS.md`, `CLAUDE.md`) via `create-next-app`.

**Interfaces:**
- Produces: a runnable Next.js app (`npm run dev`, `npm run build`) and the `tanishq0421/portfolio` GitHub repo with `origin` pushed.

- [ ] **Step 1: Scaffold with create-next-app**

Run from `/Users/tanishq/Desktop/portfolio`:

```bash
npx --yes create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --no-turbopack
```

Expected: installs succeed (`added N packages`), ends with `Success! Created portfolio at /Users/tanishq/Desktop/portfolio`. It will run safely alongside the existing `.git/` and `docs/` — both are left untouched (verified during planning: `git log` and `git status` after scaffolding still show the prior spec commit intact, only new files appear as untracked).

- [ ] **Step 2: Verify the dev server boots**

```bash
npm run build
```

Expected: ends with `Compiled successfully` and no TypeScript errors, exit code 0.

- [ ] **Step 3: Commit the scaffold**

```bash
git add -A
git commit -m "Scaffold Next.js app with TypeScript, Tailwind v4, App Router"
```

- [ ] **Step 4: Create the GitHub repo**

```bash
gh repo create tanishq0421/portfolio --public --description "Tanishq Shukla — portfolio" --source=. --remote=upstream-tmp
git remote remove upstream-tmp
```

Expected: `gh repo create` prints `https://github.com/tanishq0421/portfolio`. We immediately drop the `upstream-tmp` remote it adds because `origin` (SSH, `github-personal`) is already correctly configured — this avoids ending up with two remotes pointing at the same repo over different protocols.

- [ ] **Step 5: Push**

```bash
git push -u origin main
```

Expected: `Branch 'main' set up to track 'origin/main'.` and the push succeeds. If the local default branch is not `main` (check with `git branch --show-current`), substitute the actual branch name in the command.

---

### Task 2: Dark theme tokens, layout metadata, remove scaffold boilerplate

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Delete: `app/page.tsx` content (replaced with a temporary placeholder; real content added in Task 4 onward)
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg` (unused default demo assets, orphaned once `app/page.tsx` no longer references them)
- Delete: `AGENTS.md`, `CLAUDE.md` (create-next-app's generic Next.js-version-warning boilerplate, not project-specific)

**Interfaces:**
- Produces: Tailwind utility classes `bg-background`, `text-foreground`, `text-accent`, `text-muted`, `border-border` (and their `bg-*`/`decoration-*` variants) available to every component built in later tasks.

- [ ] **Step 1: Replace globals.css with the fixed dark palette**

Replace the full contents of `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --background: #0a0a0a;
  --foreground: #e5e5e5;
  --accent: #f5a524;
  --muted: #8a8a8a;
  --border: #262626;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent: var(--accent);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Update layout.tsx metadata and body classes**

Replace the full contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanishq Shukla — Founding Engineer · Full-Stack AI Engineer",
  description:
    "Founding Engineer at Surgegrowth building production LLM infrastructure — MCP servers, distributed job systems, and agent red-teaming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Replace page.tsx with a temporary placeholder**

Replace the full contents of `app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <p className="font-mono text-sm text-muted">Portfolio under construction.</p>
    </main>
  );
}
```

(This is replaced for real in Task 4 — it exists only so the build stays green while the default page's SVG imports are removed.)

- [ ] **Step 4: Delete unused default assets and scaffold boilerplate**

```bash
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
rm AGENTS.md CLAUDE.md
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0.

- [ ] **Step 6: Commit and push**

```bash
git add -A
git commit -m "Set dark theme tokens, update metadata, remove scaffold boilerplate"
git push
```

---

### Task 3: Shared data types and Section layout component

**Files:**
- Create: `lib/data/types.ts`
- Create: `components/Section.tsx`

**Interfaces:**
- Produces:
  - `CaseStudy` type: `{ title: string; dates: string; summary: string; metric: string; problem: string; approach: string; decisions: string[]; tradeoffs: string[]; stack: string[]; links?: { label: string; href: string }[] }`
  - `CompactEntry` type: `{ title: string; org: string; dates: string; summary: string }`
  - `SkillGroup` type: `{ label: string; items: string[] }`
  - `Metric` type: `{ value: string; label: string }`
  - `Section` component: `{ id: string; eyebrow: string; title: string; children: React.ReactNode }` — renders a consistently-spaced page section with a monospace amber eyebrow label and a heading. Every later section component wraps its content in this.

- [ ] **Step 1: Create the shared data types**

Create `lib/data/types.ts`:

```ts
export type CaseStudy = {
  title: string;
  dates: string;
  summary: string;
  metric: string;
  problem: string;
  approach: string;
  decisions: string[];
  tradeoffs: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

export type CompactEntry = {
  title: string;
  org: string;
  dates: string;
  summary: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Metric = {
  value: string;
  label: string;
};
```

- [ ] **Step 2: Create the Section component**

Create `components/Section.tsx`:

```tsx
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0. (`Section` is not yet imported anywhere — this just confirms both new files type-check standalone.)

- [ ] **Step 4: Commit and push**

```bash
git add lib/data/types.ts components/Section.tsx
git commit -m "Add shared data types and Section layout component"
git push
```

---

### Task 4: Hero section

**Files:**
- Create: `lib/data/hero.ts`
- Create: `components/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: none (first content section).
- Produces: `hero` data object (`{ name, role, tagline, links: { label, href }[] }`), `<Hero />` component. `hero.links` is reused by Task 10 (`SiteFooter`).

- [ ] **Step 1: Create hero data**

Create `lib/data/hero.ts`:

```ts
export const hero = {
  name: "Tanishq Shukla",
  role: "Founding Engineer · Full-Stack AI Engineer",
  tagline:
    "I build production LLM infrastructure and agent systems — from OAuth-secured MCP servers to red-team platforms that measure whether agents are actually safe to ship.",
  links: [
    { label: "GitHub", href: "https://github.com/tanishq0421" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tanishq-shukla-735016195/",
    },
    { label: "Email", href: "mailto:tanishq.shukla.official@gmail.com" },
    { label: "Resume", href: "/resume.pdf" },
  ],
};
```

- [ ] **Step 2: Create the Hero component**

Create `components/Hero.tsx`:

```tsx
import { hero } from "@/lib/data/hero";

export function Hero() {
  return (
    <header className="mx-auto w-full max-w-4xl px-6 pt-24 pb-16 md:pt-32">
      <p className="font-mono text-sm text-accent">{hero.role}</p>
      <h1 className="mt-4 text-4xl font-bold text-foreground md:text-6xl">
        {hero.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{hero.tagline}</p>
      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
        {hero.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 3: Wire Hero into page.tsx**

Replace the full contents of `app/page.tsx` with:

```tsx
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0.

- [ ] **Step 5: Commit and push**

```bash
git add lib/data/hero.ts components/Hero.tsx app/page.tsx
git commit -m "Add hero section"
git push
```

---

### Task 5: Impact strip section

**Files:**
- Create: `lib/data/impact-metrics.ts`
- Create: `components/ImpactStrip.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Metric` type from `lib/data/types.ts` (Task 3).
- Produces: `impactMetrics: Metric[]`, `<ImpactStrip />` component.

- [ ] **Step 1: Create impact metrics data**

Create `lib/data/impact-metrics.ts`:

```ts
import type { Metric } from "@/lib/data/types";

export const impactMetrics: Metric[] = [
  { value: "~12k", label: "MCP tool calls/day across 9 tools" },
  { value: "$10k+/mo", label: "payments processed @ 99.99% success" },
  { value: "~50k", label: "requests/day, distributed job infra" },
  { value: "500k+", label: "frames/day, media pipeline" },
  { value: "89%", label: "scraping cost cut ($1,800 → $200/mo)" },
  { value: "100% → <20%", label: "red-team attack success rate (Sentinel)" },
];
```

- [ ] **Step 2: Create the ImpactStrip component**

Create `components/ImpactStrip.tsx`:

```tsx
import { impactMetrics } from "@/lib/data/impact-metrics";

export function ImpactStrip() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-3">
        {impactMetrics.map((metric) => (
          <div key={metric.label}>
            <p className="font-mono text-2xl font-semibold text-accent md:text-3xl">
              {metric.value}
            </p>
            <p className="mt-1 text-sm text-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire ImpactStrip into page.tsx**

Replace the full contents of `app/page.tsx` with:

```tsx
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactStrip />
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0.

- [ ] **Step 5: Commit and push**

```bash
git add lib/data/impact-metrics.ts components/ImpactStrip.tsx app/page.tsx
git commit -m "Add impact metrics strip"
git push
```

---

### Task 6: CaseStudyCard component + Experience section

**Files:**
- Create: `components/CaseStudyCard.tsx`
- Create: `lib/data/experience.ts`
- Create: `components/ExperienceSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CaseStudy`, `CompactEntry` types (Task 3), `Section` component (Task 3).
- Produces: `<CaseStudyCard study={CaseStudy} />` — a client-side accordion, **reused as-is by Task 7 (Projects)**, so its prop shape must not change after this task. `surgegrowthCaseStudies: CaseStudy[]`, `kimccCaseStudy: CaseStudy`, `otonEntry: CompactEntry`, `<ExperienceSection />`.

- [ ] **Step 1: Create the CaseStudyCard component**

Create `components/CaseStudyCard.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/data/types";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full flex-col gap-1 px-6 py-5 text-left"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-semibold text-foreground">{study.title}</span>
          <span className="font-mono text-xs text-muted">{study.dates}</span>
        </div>
        <p className="text-sm text-muted">{study.summary}</p>
        <p className="mt-2 font-mono text-sm text-accent">{study.metric}</p>
      </button>

      {expanded && (
        <div className="space-y-6 border-t border-border px-6 py-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Problem
            </p>
            <p className="mt-2 text-sm text-foreground">{study.problem}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Approach
            </p>
            <p className="mt-2 text-sm text-foreground">{study.approach}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Key decisions
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-foreground">
              {study.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Tradeoffs
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-foreground">
              {study.tradeoffs.map((tradeoff) => (
                <li key={tradeoff}>{tradeoff}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-border px-2 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {study.links && study.links.length > 0 && (
            <div className="flex gap-4 font-mono text-sm">
              {study.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create experience data**

Create `lib/data/experience.ts`:

```ts
import type { CaseStudy, CompactEntry } from "@/lib/data/types";

export const surgegrowthCaseStudies: CaseStudy[] = [
  {
    title: "MCP Server for Claude.ai & Cursor",
    dates: "Feb '25 – Present",
    summary:
      "Built and secured a FastMCP server exposing 9 task-oriented tools to Claude.ai and Cursor.",
    metric: "~12k tool calls/day",
    problem:
      "Claude.ai and Cursor needed a secure, standards-compliant way to call into Surgegrowth's task-oriented tooling from third-party AI clients.",
    approach:
      "Engineered the server on FastMCP, exposing 9 task-oriented tools, and secured it with a full OAuth 2.1 flow — PKCE, dynamic client registration, and rotating refresh tokens.",
    decisions: [
      "Implemented the full OAuth 2.1 flow (PKCE + dynamic client registration) rather than a static API key, so any MCP client can onboard without manual credential provisioning.",
      "Modeled each capability as a discrete tool rather than one general-purpose endpoint, keeping the surface auditable and matching how MCP clients discover and call tools.",
    ],
    tradeoffs: [
      "Rotating refresh tokens add operational complexity (token lifecycle, revocation) over a long-lived API key, traded for meaningfully better security posture at ~12k calls/day of external traffic.",
    ],
    stack: ["FastMCP", "OAuth 2.1", "PKCE"],
  },
  {
    title: "Billing & Usage-Based Pricing Engine",
    dates: "Feb '25 – Present",
    summary:
      "Co-built idempotent payments and metered billing across 40+ orgs.",
    metric: "$10k+/mo @ 99.99% success",
    problem:
      "Surgegrowth needed to bill 40+ orgs for metered usage (AI tokens, third-party API costs) without double-charging or losing revenue to failed webhooks or retries.",
    approach:
      "Co-built billing and usage-based pricing via Dodo: idempotent payment processing, subscriptions, and admin-configured rate cards that meter usage per org, backed by prepaid credit lots consumed FEFO (first-expired-first-out).",
    decisions: [
      "Made payment processing idempotent end-to-end so retried webhooks or duplicate events can't double-charge — critical once volume crossed $10k+/mo.",
      "Chose FEFO consumption for prepaid credit lots so credits with the nearest expiry are drawn down first, matching how the rate cards were sold to orgs.",
      "Instrumented per-org usage analytics on ClickHouse (synced from the credit ledger via PeerDB CDC) for sub-second cost/usage queries — without this, billing disputes would require querying the transactional Postgres ledger directly.",
    ],
    tradeoffs: [
      "Admin-configurable rate cards add UI/config surface area over hardcoded pricing tiers, traded for the flexibility to onboard orgs with different pricing without a deploy.",
    ],
    stack: ["Dodo", "Postgres", "ClickHouse", "PeerDB CDC"],
  },
  {
    title: "Distributed Job Infrastructure",
    dates: "Feb '25 – Present",
    summary:
      "Co-designed exactly-once scheduled and event-driven job execution at scale.",
    metric: "~50k requests/day (30–50/sec peaks)",
    problem:
      "Scheduled and event-driven jobs (scraping, media processing, billing runs) needed exactly-once execution at ~50k requests/day without a central scheduler becoming a bottleneck or single point of failure.",
    approach:
      "Co-designed the system around APScheduler cron backed by a Postgres job store, dispatching through Cloud Pub/Sub to Cloud Run Jobs/Functions, with atomic claims ensuring each job runs exactly once even with concurrent workers.",
    decisions: [
      "Used Postgres as the job store (not just Pub/Sub) so job state survives restarts and is queryable, then used Pub/Sub purely for dispatch and fan-out.",
      "Implemented atomic claims (not a distributed lock service) to guarantee exactly-once execution under 30–50 req/sec peaks without adding a new infra dependency.",
    ],
    tradeoffs: [
      "Cloud Run Jobs/Functions cold starts add latency variance versus long-running workers, accepted because the workload is bursty rather than constant.",
    ],
    stack: ["APScheduler", "Postgres", "Cloud Pub/Sub", "Cloud Run Jobs/Functions"],
  },
  {
    title: "Media-Processing Engine",
    dates: "Feb '25 – Present",
    summary:
      "Replaced a paid video API with a self-hosted FFmpeg + ML pipeline.",
    metric: "500k+ frames/day",
    problem:
      "Video/audio processing (voice enhancement, media generation) was outsourced to json2video at real recurring cost, and needed to move in-house without regressing quality.",
    approach:
      "Developed a media-processing engine on FFmpeg processing 500k+ frames/day (~1k requests/day), with self-hosted ML inference (MDX-Net/ONNX for source separation, DeepFilterNet for voice enhancement) replacing json2video.",
    decisions: [
      "Self-hosted the ML inference (MDX-Net/ONNX, DeepFilterNet) instead of calling a hosted API per request, since request volume made per-call pricing add up fast.",
      "Built a multi-model media generation gateway (Veo 3.1, Nano Banana, Seedance) with per-provider rate-limit handling and async queues, so generation load balances across providers instead of bottlenecking on one.",
    ],
    tradeoffs: [
      "Self-hosting ML inference trades ongoing infra/ops burden (GPU capacity, model updates) for the json2video bill it replaced — worth it at this volume, not necessarily below it.",
    ],
    stack: ["FFmpeg", "MDX-Net/ONNX", "DeepFilterNet", "Veo 3.1", "Nano Banana", "Seedance"],
  },
];

export const kimccCaseStudy: CaseStudy = {
  title: "Pulse & Time Diary",
  dates: "May – Jul '24",
  summary:
    "Led two key projects within a week of joining; revamped Pulse analytics and shipped a cross-platform desktop app.",
  metric: "+25% engagement",
  problem:
    "Kimcc needed its Pulse analytics revamped for better engagement and needed reliable offline-capable productivity tracking (Time Diary) as a desktop app.",
  approach:
    "Took ownership of both Pulse and Time Diary within the first week. Revamped Pulse analytics, lifting engagement 25%. Engineered a cross-platform Electron desktop app for Time Diary with secure auth, offline-first sync, and reliable tracking.",
  decisions: [
    "Built Time Diary offline-first so tracking keeps working without a connection and syncs once back online, rather than requiring a live connection.",
    "Resolved critical production bugs and built complex MongoDB aggregation pipelines that cut query time ~30%, prioritizing data-layer fixes since they were the bottleneck behind the engagement numbers.",
    "Automated recurring workflows with Node.js cron jobs and scripts to accelerate task execution.",
  ],
  tradeoffs: [
    "Offline-first sync adds conflict-resolution complexity over a simple online-only client, accepted because reliable tracking was the whole point of the product.",
  ],
  stack: ["Electron", "Node.js", "MongoDB"],
};

export const otonEntry: CompactEntry = {
  title: "SDE Intern",
  org: "Oton",
  dates: "Dec '23 – Feb '24",
  summary:
    "Built a Slack bot (Node.js) automating team workflows, administered PostgreSQL at scale via Prisma (25% faster queries), crafted cursor-based pagination and Jira API integration for boards/sprints/issues, and used Redis Bull queues for batch processing under bursty load.",
};
```

- [ ] **Step 3: Create the ExperienceSection component**

Create `components/ExperienceSection.tsx`:

```tsx
import { Section } from "@/components/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import {
  surgegrowthCaseStudies,
  kimccCaseStudy,
  otonEntry,
} from "@/lib/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've built">
      <div className="space-y-10">
        <div>
          <p className="font-mono text-sm text-muted">
            Founding Engineer · Surgegrowth · Feb &apos;25 – Present
          </p>
          <div className="mt-4 space-y-4">
            {surgegrowthCaseStudies.map((study) => (
              <CaseStudyCard key={study.title} study={study} />
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-sm text-muted">SDE Intern · Kimcc</p>
          <div className="mt-4">
            <CaseStudyCard study={kimccCaseStudy} />
          </div>
        </div>

        <div className="rounded-lg border border-border px-6 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold text-foreground">
              {otonEntry.title} · {otonEntry.org}
            </span>
            <span className="font-mono text-xs text-muted">
              {otonEntry.dates}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">{otonEntry.summary}</p>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Wire ExperienceSection into page.tsx**

Replace the full contents of `app/page.tsx` with:

```tsx
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { ExperienceSection } from "@/components/ExperienceSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactStrip />
      <ExperienceSection />
    </main>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0.

- [ ] **Step 6: Commit and push**

```bash
git add components/CaseStudyCard.tsx lib/data/experience.ts components/ExperienceSection.tsx app/page.tsx
git commit -m "Add CaseStudyCard accordion and Experience section"
git push
```

---

### Task 7: Projects section

**Files:**
- Create: `lib/data/projects.ts`
- Create: `components/ProjectsSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CaseStudy` type (Task 3), `CaseStudyCard` component (Task 6), `Section` component (Task 3).
- Produces: `projects: CaseStudy[]`, `<ProjectsSection />`.

- [ ] **Step 1: Create projects data**

Create `lib/data/projects.ts`:

```ts
import type { CaseStudy } from "@/lib/data/types";

export const projects: CaseStudy[] = [
  {
    title: "Sentinel — Agent Eval & Red-Team Platform",
    dates: "Personal project",
    summary:
      "An agent evaluation and red-teaming platform: configure an agent, then measure whether it's actually safe to ship.",
    metric: "100% → <20% attack success rate",
    problem:
      "Shipping LLM agents safely requires more than vibes — teams need measured, reproducible evidence of how an agent fails and how attackable it is, not generic BERTScore/ROUGE numbers.",
    approach:
      "Built two halves on one trace abstraction, surfaced in a dark Next.js operations console: (1) domain-specific evals — groundedness, policy compliance, refusal, tool-safety — over real agent traces with a measured failure taxonomy; (2) a red-team harness running indirect prompt-injection attacks across two surfaces (poisoned RAG doc, poisoned tool output), cross-model comparison, and a MART-style adaptive attacker loop.",
    decisions: [
      "Built the agent on LangGraph with a hybrid RAG pipeline (pgvector dense + ParadeDB BM25, RRF-fused) and per-agent KB isolation, then added guardrail layers (spotlighting, PII egress filtering) — this is what cut attack success rate from 100% to under 20%.",
      "Custom-built the eval/tracing layer (a Trace abstraction + LLM-as-judge) instead of adopting DeepEval or Langfuse, to keep both eval and red-team flowing through the same trace format.",
      "Ran cross-model red-team comparisons and found Claude Haiku held at 0% attack success rate against the same injection attacks that hit GPT-4o-mini at 25% — a measured finding, not a claim.",
      "The eval suite caught a real safety bug in the reference agent — an unauthorized refund triggered by a cancel request — flagged independently by 3 of the evals.",
    ],
    tradeoffs: [
      "Custom evals/tracing means no off-the-shelf dashboard or community eval library — traded for a single consistent trace format across both eval and red-team, and full control over the judge prompts.",
      "Verified against real services throughout — 77 tests, with integration tests run against a real Postgres instance rather than mocks — slower to run than a fully mocked suite but catches issues mocks would hide.",
    ],
    stack: [
      "LangGraph",
      "LiteLLM",
      "FastAPI",
      "Next.js",
      "Postgres/ParadeDB",
      "Redis/RQ",
    ],
    links: [{ label: "GitHub", href: "https://github.com/tanishq0421/Sentinel" }],
  },
  {
    title: "OutageRadar — Distributed RSS Feed Monitor",
    dates: "Personal project",
    summary:
      "A production-grade async status tracker monitoring OpenAI and Claude status feeds without hammering them or double-processing incidents.",
    metric: "Zero-duplicate processing across N workers",
    problem:
      "Tracking multiple providers' status feeds needs to scale to many feeds concurrently, react fast during incidents, and never double-process or drop an event — even with multiple worker processes running at once.",
    approach:
      "Split the system into an async monitor (poll → parse → dedup → enqueue) fully decoupled from worker processes (dequeue → atomic claim → dispatch) via a Redis queue, so the monitor never blocks on slow handlers.",
    decisions: [
      "Two-level deduplication: the monitor checks GUIDs before enqueueing (cheap, avoids queue noise), and each worker atomically claims a GUID with Redis SETNX before processing (race-condition-free even with multiple workers) — matches Kafka/SQS-style at-least-once delivery with idempotent handlers.",
      "Used a Strategy + Registry pattern for provider-specific parsers (OpenAI, Claude, generic fallback) so adding a new provider is zero changes to existing parsers — just register a new class.",
      "Built adaptive polling (30s during active incidents, 5min normal) plus conditional GET (ETag/Last-Modified) so the tracker reacts fast without hammering upstream feeds.",
    ],
    tradeoffs: [
      "The two-level dedup (pre-enqueue + atomic claim) is more moving parts than a single dedup check, accepted because it's the difference between 'probably no duplicates' and a guarantee under concurrent workers.",
    ],
    stack: ["Python", "asyncio/aiohttp", "Redis", "Docker Compose"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/tanishq0421/Status-Tracker-App",
      },
    ],
  },
];
```

- [ ] **Step 2: Create the ProjectsSection component**

Create `components/ProjectsSection.tsx`:

```tsx
import { Section } from "@/components/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { projects } from "@/lib/data/projects";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="What I've shipped on my own"
    >
      <div className="space-y-4">
        {projects.map((project) => (
          <CaseStudyCard key={project.title} study={project} />
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Wire ProjectsSection into page.tsx**

Replace the full contents of `app/page.tsx` with:

```tsx
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactStrip />
      <ExperienceSection />
      <ProjectsSection />
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0.

- [ ] **Step 5: Commit and push**

```bash
git add lib/data/projects.ts components/ProjectsSection.tsx app/page.tsx
git commit -m "Add Projects section (Sentinel, OutageRadar)"
git push
```

---

### Task 8: Skills section

**Files:**
- Create: `lib/data/skills.ts`
- Create: `components/SkillsSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `SkillGroup` type (Task 3), `Section` component (Task 3).
- Produces: `skillGroups: SkillGroup[]`, `<SkillsSection />`.

- [ ] **Step 1: Create skills data**

Create `lib/data/skills.ts`:

```ts
import type { SkillGroup } from "@/lib/data/types";

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["C/C++", "TypeScript", "Python", "Rust", "Go", "PHP", "SQL", "HTML/CSS"],
  },
  {
    label: "Infra & Cloud",
    items: ["AWS (EC2, S3)", "Docker", "Nginx", "Cloud Run", "Cloud Pub/Sub", "Grafana"],
  },
  {
    label: "AI / LLM",
    items: ["LangChain", "LangGraph", "LangSmith", "LiteLLM", "RAG", "Agentic system design"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "Redis", "ClickHouse", "pgvector"],
  },
];
```

- [ ] **Step 2: Create the SkillsSection component**

Create `components/SkillsSection.tsx`:

```tsx
import { Section } from "@/components/Section";
import { skillGroups } from "@/lib/data/skills";

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Skills" title="Toolbox">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {group.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-border px-2 py-1 font-mono text-xs text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Wire SkillsSection into page.tsx**

Replace the full contents of `app/page.tsx` with:

```tsx
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactStrip />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0.

- [ ] **Step 5: Commit and push**

```bash
git add lib/data/skills.ts components/SkillsSection.tsx app/page.tsx
git commit -m "Add Skills section"
git push
```

---

### Task 9: Leadership & Education section

**Files:**
- Create: `lib/data/leadership.ts`
- Create: `components/LeadershipSection.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Section` component (Task 3).
- Produces: `education: { degree: string; org: string; dates: string }`, `leadership: CompactEntry`, `<LeadershipSection />`.

- [ ] **Step 1: Create leadership/education data**

Create `lib/data/leadership.ts`:

```ts
import type { CompactEntry } from "@/lib/data/types";

export const education = {
  degree: "B.Tech, Chemical Engineering",
  org: "Indian Institute of Technology (BHU), Varanasi",
  dates: "2021 – 2025",
};

export const leadership: CompactEntry = {
  title: "Startup Assistance Program Manager",
  org: "E-Cell IIT BHU",
  dates: "May '23 – May '24",
  summary:
    "Principal liaison for 20+ startups at E-Summit'24; facilitated critical engagements for 15+ startups and promoted IIT BHU's entrepreneurial ecosystem through participation at IIT Kanpur.",
};
```

- [ ] **Step 2: Create the LeadershipSection component**

Create `components/LeadershipSection.tsx`:

```tsx
import { Section } from "@/components/Section";
import { education, leadership } from "@/lib/data/leadership";

export function LeadershipSection() {
  return (
    <Section
      id="leadership"
      eyebrow="Leadership & Education"
      title="Beyond the code"
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-border px-6 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold text-foreground">
              {leadership.title} · {leadership.org}
            </span>
            <span className="font-mono text-xs text-muted">
              {leadership.dates}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">{leadership.summary}</p>
        </div>

        <div className="rounded-lg border border-border px-6 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold text-foreground">
              {education.degree}
            </span>
            <span className="font-mono text-xs text-muted">
              {education.dates}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">{education.org}</p>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Wire LeadershipSection into page.tsx**

Replace the full contents of `app/page.tsx` with:

```tsx
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { LeadershipSection } from "@/components/LeadershipSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactStrip />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <LeadershipSection />
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0.

- [ ] **Step 5: Commit and push**

```bash
git add lib/data/leadership.ts components/LeadershipSection.tsx app/page.tsx
git commit -m "Add Leadership & Education section"
git push
```

---

### Task 10: Footer + resume PDF

**Files:**
- Create: `components/SiteFooter.tsx`
- Create: `public/resume.pdf` (copied from source)
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `hero.links` (Task 4).
- Produces: `<SiteFooter />`; `public/resume.pdf` is what `hero.links`'s `"Resume"` entry (`/resume.pdf`) resolves to.

- [ ] **Step 1: Copy the resume PDF into public/**

```bash
cp "/Users/tanishq/Library/Mobile Documents/com~apple~CloudDocs/Downloads/Tanishq_Shukla_SDE.pdf" public/resume.pdf
```

Expected: no output; verify with `ls -la public/resume.pdf` that the file exists and is non-zero size.

- [ ] **Step 2: Create the SiteFooter component**

Create `components/SiteFooter.tsx`:

```tsx
import { hero } from "@/lib/data/hero";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs text-muted">
          {hero.name} · built with Next.js
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          {hero.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted transition-colors hover:text-accent"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
```

(Uses a fixed string instead of `new Date().getFullYear()` deliberately — keeps this a pure server component with no dynamic-render requirement, appropriate for a fully static site.)

- [ ] **Step 3: Wire SiteFooter into page.tsx (final section order)**

Replace the full contents of `app/page.tsx` with:

```tsx
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactStrip />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <LeadershipSection />
      <SiteFooter />
    </main>
  );
}
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0.

- [ ] **Step 5: Commit and push**

```bash
git add components/SiteFooter.tsx app/page.tsx public/resume.pdf
git commit -m "Add footer and resume download"
git push
```

---

### Task 11: Final polish and manual verification

**Files:**
- Modify: any component above, only if the manual review in this task finds a real visual/responsive issue (see Step 2). No new files expected.

**Interfaces:**
- Consumes: the fully assembled page from Task 10.
- Produces: nothing new — this task is a verification gate before calling the site done.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected: `Ready in <N>ms`, listening on `http://localhost:3000`.

- [ ] **Step 2: Manually review in a real browser**

Open `http://localhost:3000` in a browser (or via the Browser tool) and check, per CLAUDE.md's rule that UI changes must be verified in-browser before being called done:
- Desktop width (~1280px): all six sections render in order (Hero, Impact strip, Experience, Projects, Skills, Leadership & Education, Footer), amber accent color is visible on the eyebrow labels/metrics, dark background throughout, no light-mode flash.
- Mobile width (~375px): sections collapse to single column, impact strip stays 2-column and readable, no horizontal scroll/overflow.
- Click every `CaseStudyCard` (4 Surgegrowth + 1 Kimcc + 2 Projects = 7 cards) and confirm each expands to show Problem/Approach/Key decisions/Tradeoffs/Stack, and collapses again on a second click.
- Click the "Resume" link in the hero and confirm `resume.pdf` opens/downloads correctly.
- Click the GitHub links on both project cards and confirm they point at `github.com/tanishq0421/Sentinel` and `github.com/tanishq0421/Status-Tracker-App` respectively.

If anything is visually broken, fix it directly in the relevant component file, then re-run `npm run build` to confirm it still compiles before moving on.

- [ ] **Step 3: Run a final production build**

```bash
npm run build
```

Expected: `Compiled successfully`, exit code 0, with a route summary showing `/` as a static route.

- [ ] **Step 4: Commit any fixes from Step 2 (if none, skip this step)**

```bash
git add -A
git commit -m "Polish: fix responsive/visual issues found in manual review"
git push
```

- [ ] **Step 5: Confirm the pushed repo matches local state**

```bash
git status
git log --oneline -12
```

Expected: `git status` reports `nothing to commit, working tree clean` and `up to date with 'origin/main'`. The site is now complete and live in the `tanishq0421/portfolio` GitHub repo, ready for the user to deploy to Vercel whenever they choose (deployment itself is out of scope, per the spec).

---

## Self-Review Notes

- **Spec coverage:** All 6 page sections (Hero, Impact strip, Experience with 4 Surgegrowth + Kimcc + Oton, Projects with Sentinel + OutageRadar, Skills, Leadership + Education) and the Footer are covered by Tasks 4–10. Visual system (dark palette, Geist fonts, amber accent) is covered by Task 2. Repo/remote setup is covered by Task 1. Out-of-scope items from the spec (CMS, backend, contact form, terminal easter egg, multi-page routing, automated tests, deployment) are correctly absent from every task.
- **Placeholder scan:** No TBD/TODO; every data field in Tasks 6–9 is real content traced to the spec/READMEs, not a stand-in.
- **Type consistency:** `CaseStudy`, `CompactEntry`, `SkillGroup`, `Metric` are defined once in Task 3 and referenced identically (name and shape) in Tasks 4–9; `CaseStudyCard`'s `study: CaseStudy` prop (Task 6) is reused unchanged by `ProjectsSection` (Task 7) — same import path (`@/lib/data/types`), same field names throughout.
