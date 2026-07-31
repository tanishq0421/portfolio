import { Section } from "@/components/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { projects } from "@/lib/data/projects";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="What I've shipped on my own"
    >
      <div className="space-y-4">
        {projects.map((project) => (
          <CaseStudyCard key={project.title} study={project} />
        ))}
      </div>
    </Section>
  );
}
