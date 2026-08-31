import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { education, leadership } from "@/lib/data/leadership";

export function LeadershipSection() {
  return (
    <Section
      id="leadership"
      eyebrow="Leadership & Education"
      title="Beyond the code"
    >
      <Reveal>
      <div className="space-y-4">
        <div className="rounded-lg border border-border bg-surface/30 px-6 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold text-foreground">
              {leadership.title} · {leadership.org}
            </span>
            <span className="font-mono text-xs text-muted">
              {leadership.dates}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">{leadership.summary}</p>
        </div>

        <div className="rounded-lg border border-border bg-surface/30 px-6 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold text-foreground">
              {education.degree}
            </span>
            <span className="font-mono text-xs text-muted">
              {education.dates}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">{education.org}</p>
        </div>
      </div>
      </Reveal>
    </Section>
  );
}
