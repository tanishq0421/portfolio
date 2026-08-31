import type { CaseStudy } from "@/lib/data/types";

export const surgegrowthCaseStudies: CaseStudy[] = [
  {
    title: "MCP Server for Claude.ai & Cursor",
    dates: "Feb '25 – Aug '26",
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
    dates: "Feb '25 – Aug '26",
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
    dates: "Feb '25 – Aug '26",
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
      "This same job infrastructure also runs the in-house Facebook/Instagram, Google Ads, and YouTube scrapers that replaced paid scraping APIs — routing them through Decodo residential proxies to bypass anti-bots cut the bill $1,800 → $200/mo (~89%).",
    ],
    tradeoffs: [
      "Cloud Run Jobs/Functions cold starts add latency variance versus long-running workers, accepted because the workload is bursty rather than constant.",
    ],
    stack: ["APScheduler", "Postgres", "Cloud Pub/Sub", "Cloud Run Jobs/Functions"],
  },
  {
    title: "Media-Processing Engine",
    dates: "Feb '25 – Aug '26",
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

