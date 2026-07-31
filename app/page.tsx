import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <ImpactStrip />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <LeadershipSection />
      <SiteFooter />
    </main>
  );
}
