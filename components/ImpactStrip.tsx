import { impactMetrics } from "@/lib/data/impact-metrics";

export function ImpactStrip() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-3">
        {impactMetrics.map((metric) => (
          <div key={metric.label}>
            <p className="font-mono text-2xl font-semibold text-accent md:text-3xl">
              {metric.value}
            </p>
            <p className="mt-1 text-sm text-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
