import { Section } from "@/components/Section";
import { moreProjects } from "@/lib/data/projects";

export function MoreProjects() {
  return (
    <Section id="more" eyebrow="More projects" title="Smaller builds & experiments">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {moreProjects.map((project) => (
          <a
            key={project.title}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col rounded-lg border border-border px-6 py-5 transition-colors hover:border-accent/40 hover:bg-white/[0.02]"
          >
            <span className="flex items-center gap-2 font-semibold text-foreground">
              {project.title}
              <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent">
                ↗
              </span>
            </span>
            <p className="mt-2 text-sm text-muted">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-border px-2 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
