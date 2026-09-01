import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { JourneySection } from "@/components/JourneySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { MoreProjects } from "@/components/MoreProjects";
import { TechStack } from "@/components/TechStack";
import { LeadershipSection } from "@/components/LeadershipSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <ImpactStrip />
        <JourneySection />
        <TechStack />
        <ProjectsSection />
        <MoreProjects />
        <LeadershipSection />
      </main>
      <SiteFooter />
    </>
  );
}
