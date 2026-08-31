import type { JourneyMilestone } from "@/lib/data/types";

// The arc, distilled from ~15 roles into five chapters — explorer → builder →
// founding engineer. Kept narrative, not a role dump.
export const journey: JourneyMilestone[] = [
  {
    year: "2021",
    title: "Where it started",
    body: "Started a B.Tech in Chemical Engineering at IIT (BHU) Varanasi — and almost immediately gravitated toward code and building things over the syllabus.",
    tags: ["IIT (BHU) Varanasi", "B.Tech"],
  },
  {
    year: "2022",
    title: "First builds, first ventures",
    body: "Took my first engineering internships and caught the startup bug — founded BLOCKZTECH (a web3 deployment SaaS), drove growth at Nova, and went deep into IIT BHU's E-Cell.",
    tags: ["NullClass", "BLOCKZTECH · founder", "Nova", "E-Cell"],
  },
  {
    year: "2023",
    title: "Founding engineer, first time",
    body: "Co-founded Kounselo as founding engineer — shipped a marketplace with secure auth and payments, deployed on EC2 behind Nginx with SSL at 99.99% uptime — while running E-Cell's Startup Assistance Program for 20+ startups at E-Summit'24.",
    tags: ["Kounselo · co-founder", "E-Cell · SAP lead"],
  },
  {
    year: "2024",
    title: "Sharpening the craft",
    body: "Back-to-back SDE internships across the stack: a Slack automation bot with PostgreSQL/Redis at Oton, a Jira-integrated dashboard frontend at Falcon AI, and leading Pulse plus a cross-platform desktop app at kim.cc (+25% engagement).",
    tags: ["Oton", "Falcon AI", "kim.cc"],
  },
  {
    year: "2025",
    title: "All-in as Founding Engineer",
    body: "Graduated from IIT (BHU) and went all-in building Surgegrowth from 0→1 — the automation infra layer behind the MCP servers, billing, distributed jobs, and media pipelines in the work above.",
    tags: ["IIT (BHU) '25", "Surgegrowth · Founding Engineer"],
  },
];
