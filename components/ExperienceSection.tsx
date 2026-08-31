import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { experienceTimeline } from "@/lib/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <Timeline entries={experienceTimeline} />
      <p className="mt-8 text-sm text-muted">
        The work itself is up in{" "}
        <a href="#work" className="text-accent underline underline-offset-4">
          Selected work
        </a>
        .
      </p>
    </Section>
  );
}
