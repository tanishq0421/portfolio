import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { ProjectsSection } from "@/components/ProjectsSection";
import { MoreProjects } from "@/components/MoreProjects";
import { JourneySection } from "@/components/JourneySection";
import { SkillsSection } from "@/components/SkillsSection";
import { LeadershipSection } from "@/components/LeadershipSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <ImpactStrip />
        <ProjectsSection />
        <MoreProjects />
        <JourneySection />
        <SkillsSection />
        <LeadershipSection />
      </main>
      <SiteFooter />
    </>
  );
}
