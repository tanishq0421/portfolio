import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/lib/data/skills";

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Skills" title="Toolbox">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 70}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {group.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-border bg-surface/40 px-2 py-1 font-mono text-xs text-foreground transition-colors hover:border-accent/40 hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
