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
