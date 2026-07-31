import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactStrip />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
    </main>
  );
}
