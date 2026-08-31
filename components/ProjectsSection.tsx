import { Section } from "@/components/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Reveal } from "@/components/Reveal";
import { selectedWork } from "@/lib/data/projects";

export function ProjectsSection() {
  return (
    <Section id="work" eyebrow="Selected work" title="Things I've built">
      <div className="space-y-4">
        {selectedWork.map((study, i) => (
          <Reveal key={study.title} delay={Math.min(i, 4) * 60}>
            <CaseStudyCard study={study} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
