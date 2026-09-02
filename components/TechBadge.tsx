import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiTypescript,
  SiPython,
  SiGo,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiClickhouse,
  SiPrisma,
  SiApachekafka,
  SiGooglepubsub,
  SiCelery,
  SiLangchain,
  SiLanggraph,
  SiGooglecloud,
  SiDocker,
  SiNginx,
  SiFfmpeg,
  SiGrafana,
  SiGit,
  SiGithub,
  SiJira,
} from "react-icons/si";
import type { Tech } from "@/lib/data/tech";

const ICONS: Record<string, IconType> = {
  cpp: SiCplusplus,
  typescript: SiTypescript,
  python: SiPython,
  go: SiGo,
  node: SiNodedotjs,
  express: SiExpress,
  fastapi: SiFastapi,
  react: SiReact,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  redux: SiRedux,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  clickhouse: SiClickhouse,
  prisma: SiPrisma,
  kafka: SiApachekafka,
  pubsub: SiGooglepubsub,
  celery: SiCelery,
  langchain: SiLangchain,
  langgraph: SiLanggraph,
  googlecloud: SiGooglecloud,
  docker: SiDocker,
  nginx: SiNginx,
  ffmpeg: SiFfmpeg,
  grafana: SiGrafana,
  git: SiGit,
  github: SiGithub,
  jira: SiJira,
};

// Pick black or white text for legibility on the brand color.
function readableText(hex: string): string {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#0a0a0a" : "#ffffff";
}

export function TechBadge({ tech }: { tech: Tech }) {
  const Icon = tech.icon ? ICONS[tech.icon] : undefined;
  const colored = Boolean(tech.color);
  const fg = tech.color ? readableText(tech.color) : "var(--foreground)";

  return (
    <span
      className="inline-flex items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide transition-transform duration-200 hover:-translate-y-0.5"
      style={{
        background: colored ? tech.color : "var(--surface-2)",
        color: fg,
        borderColor: colored ? "rgba(255,255,255,0.14)" : "var(--border-strong)",
      }}
    >
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      {tech.name}
    </span>
  );
}
