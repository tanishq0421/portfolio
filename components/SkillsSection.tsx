import { Section } from "@/components/Section";
import { skillGroups } from "@/lib/data/skills";

export function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Skills" title="Toolbox">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {group.label}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-border px-2 py-1 font-mono text-xs text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
