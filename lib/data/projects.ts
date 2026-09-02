import type { CaseStudy, MoreProject } from "@/lib/data/types";
import { surgegrowthCaseStudies, kimccCaseStudy } from "@/lib/data/experience";

// Work case studies, tagged so they read as projects rather than a résumé
// entry. Order in experience.ts: [MCP, Billing, Job Infra, Media].
const [mcpServer, billingEngine, jobInfra, mediaEngine] =
  surgegrowthCaseStudies.map((study): CaseStudy => ({
    ...study,
    tag: "Surgegrowth",
  }));

const kimccPulse: CaseStudy = { ...kimccCaseStudy, tag: "Kimcc" };

const sentinel: CaseStudy = {
  title: "Sentinel — Agent Eval & Red-Team Platform",
  tag: "Personal",
  dates: "Personal project",
  summary:
    "An agent evaluation and red-teaming platform: configure an agent, then measure whether it's actually safe to ship.",
  metric: "100% → <20% attack success rate",
  problem:
    "Shipping LLM agents safely requires more than vibes — teams need measured, reproducible evidence of how an agent fails and how attackable it is, not generic BERTScore/ROUGE numbers.",
  approach:
    "Built two halves on one trace abstraction, surfaced in a dark Next.js operations console: (1) domain-specific evals — groundedness, policy compliance, refusal, tool-safety — over real agent traces with a measured failure taxonomy; (2) a red-team harness running indirect prompt-injection attacks across two surfaces (poisoned RAG doc, poisoned tool output), cross-model comparison, and a MART-style adaptive attacker loop.",
  decisions: [
    "Built the agent on LangGraph with a hybrid RAG pipeline (pgvector dense + ParadeDB BM25, RRF-fused) and per-agent KB isolation, then added guardrail layers (spotlighting, PII egress filtering) — this is what cut the dashboard's built-in canary-injection benchmark's attack success rate from 100% to under 20%.",
    "Custom-built the eval/tracing layer (a Trace abstraction + LLM-as-judge) instead of adopting DeepEval or Langfuse, to keep both eval and red-team flowing through the same trace format.",
    "Ran a separate, more targeted cross-model red-team campaign (curated indirect-injection attacks across two surfaces) and found Claude Haiku held at 0% attack success rate against the same attacks that hit GPT-4o-mini at 25% — a different measurement from the canary-injection benchmark behind the headline number above, not a contradiction of it.",
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
};

const slimserve: CaseStudy = {
  title: "SlimServe — Compressing a Tool-Calling LLM into a Cheap SLM",
  tag: "Personal",
  dates: "Personal project",
  summary:
    "A three-phase study proving a fine-tuned 1.5B student matches a 7B teacher on tool-calling at ~4.5× lower serving cost — measured end-to-end on vLLM, plus a from-scratch inference engine built to learn the internals.",
  metric: "1.5B matches 7B at ~4.5× lower cost",
  problem:
    "Serving large models for narrow agentic tool-calling is expensive. The open question: can a much smaller model match a 7B teacher on tool-calling accuracy, and how much does that cut serving cost — proven at every step, not asserted?",
  approach:
    "Ran a three-phase pipeline on Kaggle T4s over the xLAM tool-calling benchmark: (1) baseline and quantize a 7B teacher (INT8/INT4) on vLLM; (2) compress into 1.5B and 0.5B students via QLoRA and three distillation recipes; (3) build a from-scratch inference engine (RoPE, grouped-query attention, paged-KV cache, continuous batching) to learn the serving internals hands-on — all cost, throughput, and latency numbers are measured on vLLM, not this engine.",
  decisions: [
    "Fine-tuned a 1.5B student to tool accuracy 1.00 / argument accuracy 0.80 — matching the 7B teacher — at $0.038 vs $0.176 per 1M tokens (~4.5× cheaper); the 0.5B reached $0.016 (~11× cheaper) at 0.99 tool accuracy.",
    "Found distillation gave no gains: escalating signal richness (gold labels → teacher outputs → full logit distributions) all landed at ~0.79 argument accuracy — on near-deterministic tool-calling the teacher's softmax already approximates the ground-truth labels, so there's no 'dark knowledge' left to transfer. Defaulted to plain gold SFT.",
    "Found INT4 quantization essentially free — it matched FP16 on tool selection (0.99) while halving the memory footprint and removing the need for multi-GPU tensor parallelism.",
    "Used a Strategy + registry pattern (engines, trainers, evaluators as named, YAML-configured interfaces) so new compression experiments compose without code changes.",
  ],
  tradeoffs: [
    "Fine-tuned on 5,000 xLAM examples and evaluated on 200 held-out tool calls — enough to establish the cost/quality trend, though a larger, more varied eval set would tighten the argument-accuracy figures.",
    "Conclusions are scoped to a narrow, near-deterministic tool-calling task; the 'distillation doesn't help' result would not necessarily hold on open-ended generation.",
  ],
  stack: [
    "Qwen2.5",
    "vLLM",
    "QLoRA/peft",
    "GPTQ/AWQ",
    "PyTorch",
    "Kaggle T4",
  ],
  image: {
    src: "/projects/slimserve-cost-vs-quality.png",
    alt: "Serving cost and tool-calling accuracy across 7B, 1.5B, and 0.5B model variants",
    caption:
      "Serving cost vs. tool-calling accuracy — the fine-tuned 1.5B matches the 7B teacher at ~4.5× lower cost.",
  },
  links: [{ label: "GitHub", href: "https://github.com/tanishq0421/slimserve" }],
};

const mynaksh: CaseStudy = {
  title: "MyNaksh — Personalized AI Context Engine",
  tag: "Personal",
  dates: "Personal project",
  summary:
    "An orchestration layer between four astrology data services and an LLM that scores which context to send, degrades gracefully on failure, and generates deterministic confidence — before the model is ever called.",
  metric: "4 services in ~1.0s, not ~4.0s",
  problem:
    "Grounding an astrology LLM in structured user data (birth charts, horoscopes, planetary calcs) across four backends means either sending all context (wasting tokens) or brittle lookup tables that break when a service fails. It needed to select context, stay within a token budget, and survive upstream outages.",
  approach:
    "Inserted a multi-stage pipeline ahead of the LLM: rule-based intent classification, a scoring function that ranks context by intent weight + time scope + budget, concurrent fan-out to four services with per-service timeouts and stale-cache fallback, then a prompt builder that includes only the selected context.",
  decisions: [
    "Made context selection scored, not looked up — intent, time scope, budget, and failure handling all derive from tier weights, so merge/backfill/budget logic falls out of one mechanism instead of a cascade of if-then special cases.",
    "Chose deterministic rule-based intent classification over embeddings — embeddings scored 16/20 with false positives and added model overhead, while rules hit the needed accuracy at zero latency (a deterministic fallback was required anyway).",
    "Fanned out to all four services concurrently with per-service timeouts, so a full context fetch completes in ~1.0s instead of ~4.0s sequential.",
    "Used stale-on-error caching so an upstream outage degrades answer quality (fewer sources, lower confidence) rather than failing the request; exclusions are reported with three distinct reasons — rule, unavailable, or budget.",
  ],
  tradeoffs: [
    "Rule-based classification needs lexicon upkeep as phrasing grows, traded for determinism and zero inference cost on the hot path.",
    "A separate debug endpoint mirrors the live path exactly — extra surface to maintain, but it keeps the debug trace from describing behavior production no longer has.",
  ],
  stack: [
    "Python",
    "FastAPI",
    "AsyncIO",
    "YAML config",
    "Claude/OpenAI",
    "Docker Compose",
  ],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/tanishq0421/mynaksh-context-engine",
    },
  ],
};

const outageRadar: CaseStudy = {
  title: "OutageRadar — Distributed RSS Feed Monitor",
  tag: "Personal",
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
};

// Impact-ordered showcase — work and personal projects interleaved, each
// tagged, so the strongest work leads regardless of where it was built.
export const selectedWork: CaseStudy[] = [
  slimserve,
  sentinel,
  mcpServer,
  jobInfra,
  outageRadar,
  billingEngine,
  mediaEngine,
  mynaksh,
  kimccPulse,
];

// Smaller, real builds — listed for breadth without crowding the showcase.
export const moreProjects: MoreProject[] = [
  {
    title: "PaperPulse",
    summary:
      "Finds the latest papers in a chosen field and generates summaries tuned to the reader's level of expertise, using OpenAI models.",
    stack: ["Python", "OpenAI"],
    href: "https://github.com/tanishq0421/PaperPulse",
  },
  {
    title: "hive",
    summary:
      "An outcome-driven agent development framework that evolves — a build → deploy → operate → adapt loop for multi-agent systems.",
    stack: ["Python", "Agents"],
    href: "https://github.com/tanishq0421/hive",
  },
  {
    title: "RustyCLI",
    summary:
      "A Unix-style shell in Rust — command parsing, process spawning, and builtins written from scratch.",
    stack: ["Rust"],
    href: "https://github.com/tanishq0421/RustyCLI",
  },
  {
    title: "Richpanel",
    summary:
      "A support-ops tool that computes agents' true resolution time in business hours — intersecting each ticket's window with per-agent weekly schedules.",
    stack: ["TypeScript", "Python", "Docker"],
    href: "https://github.com/tanishq0421/Richpanel",
  },
];
