import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { TechBadge } from "@/components/TechBadge";
import { techGroups } from "@/lib/data/tech";

export function TechStack() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tech stack & tools">
      <div className="space-y-10">
        {techGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 60}>
            <div className="text-center">
              <p className="text-sm font-semibold text-muted">{group.label}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {group.items.map((tech) => (
                  <TechBadge key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
