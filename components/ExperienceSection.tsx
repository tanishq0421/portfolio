import { Section } from "@/components/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import {
  surgegrowthCaseStudies,
  kimccCaseStudy,
  otonEntry,
} from "@/lib/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've built">
      <div className="space-y-10">
        <div>
          <p className="font-mono text-sm text-muted">
            Founding Engineer · Surgegrowth · Feb &apos;25 – Present
          </p>
          <div className="mt-4 space-y-4">
            {surgegrowthCaseStudies.map((study) => (
              <CaseStudyCard key={study.title} study={study} />
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-sm text-muted">SDE Intern · Kimcc</p>
          <div className="mt-4">
            <CaseStudyCard study={kimccCaseStudy} />
          </div>
        </div>

        <div className="rounded-lg border border-border px-6 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="font-semibold text-foreground">
              {otonEntry.title} · {otonEntry.org}
            </span>
            <span className="font-mono text-xs text-muted">
              {otonEntry.dates}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">{otonEntry.summary}</p>
        </div>
      </div>
    </Section>
  );
}
