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
