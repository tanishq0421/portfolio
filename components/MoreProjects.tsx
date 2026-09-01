import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { moreProjects } from "@/lib/data/projects";

export function MoreProjects() {
  return (
    <Section id="more" eyebrow="More projects" title="Smaller builds & experiments">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {moreProjects.map((project, i) => (
          <Reveal key={project.title} delay={i * 70}>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col rounded-lg border border-border bg-surface/30 px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-white/[0.02]"
          >
            <span className="flex items-center gap-2 font-semibold text-foreground">
              {project.title}
              <span className="font-mono text-sm text-muted transition-colors group-hover:text-primary">
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
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
