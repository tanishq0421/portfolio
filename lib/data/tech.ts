export type Tech = { name: string; color?: string; icon?: string };
export type TechGroup = { label: string; items: Tech[] };

// Grouped like a GitHub-style badge wall. `icon` maps to a brand icon in
// TechBadge's registry; `color` is the brand color (omit for a neutral badge).
export const techGroups: TechGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", icon: "typescript", color: "#3178C6" },
      { name: "Python", icon: "python", color: "#3776AB" },
      { name: "Go", icon: "go", color: "#00ADD8" },
      { name: "C++", icon: "cpp", color: "#00599C" },
      { name: "C", icon: "c", color: "#A8B9CC" },
      { name: "Rust", icon: "rust", color: "#CE422B" },
      { name: "PHP", icon: "php", color: "#777BB4" },
      { name: "SQL", color: "#336791" },
    ],
  },
  {
    label: "Backend & Frameworks",
    items: [
      { name: "Node.js", icon: "node", color: "#5FA04E" },
      { name: "Express", icon: "express", color: "#000000" },
      { name: "FastAPI", icon: "fastapi", color: "#009688" },
      { name: "Laravel", icon: "laravel", color: "#FF2D20" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", icon: "react", color: "#61DAFB" },
      { name: "Next.js", icon: "next", color: "#000000" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#06B6D4" },
      { name: "Redux", icon: "redux", color: "#764ABC" },
    ],
  },
  {
    label: "Data & Messaging",
    items: [
      { name: "PostgreSQL", icon: "postgresql", color: "#4169E1" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "MySQL", icon: "mysql", color: "#4479A1" },
      { name: "Redis", icon: "redis", color: "#FF4438" },
      { name: "ClickHouse", icon: "clickhouse", color: "#FFCC01" },
      { name: "Prisma", icon: "prisma", color: "#2D3748" },
      { name: "pgvector" },
    ],
  },
  {
    label: "AI / LLM",
    items: [
      { name: "LangChain", icon: "langchain", color: "#1C3C3C" },
      { name: "LangGraph", icon: "langgraph", color: "#1C3C3C" },
      { name: "LangSmith" },
      { name: "LiteLLM" },
      { name: "RAG" },
      { name: "Vertex AI", color: "#4285F4" },
    ],
  },
  {
    label: "Cloud, DevOps & Infra",
    items: [
      { name: "AWS", color: "#FF9900" },
      { name: "Google Cloud", icon: "googlecloud", color: "#4285F4" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "Nginx", icon: "nginx", color: "#009639" },
      { name: "FFmpeg", icon: "ffmpeg", color: "#007808" },
      { name: "Grafana", icon: "grafana", color: "#F46800" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", icon: "git", color: "#F05032" },
      { name: "GitHub", icon: "github", color: "#181717" },
      { name: "Jira", icon: "jira", color: "#0052CC" },
    ],
  },
];
