import { Section } from "@/components/Section";
import { experienceTimeline } from "@/lib/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <ol className="space-y-4">
        {experienceTimeline.map((entry) => (
          <li
            key={`${entry.org}-${entry.title}`}
            className="rounded-lg border border-border px-6 py-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-semibold text-foreground">
                {entry.title} · {entry.org}
              </span>
              <span className="font-mono text-xs text-muted">{entry.dates}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{entry.summary}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted">
        The work itself is up in{" "}
        <a
          href="#work"
          className="text-accent underline underline-offset-4"
        >
          Selected work
        </a>
        .
      </p>
    </Section>
  );
}
