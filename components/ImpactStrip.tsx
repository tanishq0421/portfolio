import { impactMetrics } from "@/lib/data/impact-metrics";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";

export function ImpactStrip() {
  return (
    <section className="relative border-y border-border bg-surface/30">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-3">
        {impactMetrics.map((metric, i) => (
          <Reveal key={metric.label} delay={i * 70}>
            <p className="font-mono text-2xl font-semibold text-accent md:text-3xl">
              {metric.to !== undefined ? (
                <CountUp
                  to={metric.to}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              ) : (
                metric.value
              )}
            </p>
            <p className="mt-1 text-sm text-muted">{metric.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
