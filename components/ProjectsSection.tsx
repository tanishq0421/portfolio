import { Section } from "@/components/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { selectedWork } from "@/lib/data/projects";

export function ProjectsSection() {
  return (
    <Section id="work" eyebrow="Selected work" title="Things I've built">
      <div className="space-y-4">
        {selectedWork.map((study) => (
          <CaseStudyCard key={study.title} study={study} />
        ))}
      </div>
    </Section>
  );
}
