import type { Metric } from "@/lib/data/types";

export const impactMetrics: Metric[] = [
  { value: "~12k", to: 12, prefix: "~", suffix: "k", label: "MCP tool calls/day across 9 tools" },
  { value: "$10k+/mo", to: 10, prefix: "$", suffix: "k+/mo", label: "payments processed @ 99.99% success" },
  { value: "~50k", to: 50, prefix: "~", suffix: "k", label: "requests/day, distributed job infra" },
  { value: "500k+", to: 500, suffix: "k+", label: "frames/day, media pipeline" },
  { value: "89%", to: 89, suffix: "%", label: "scraping cost cut ($1,800 → $200/mo)" },
  { value: "100% → <20%", label: "red-team attack success rate (Sentinel)" },
];
