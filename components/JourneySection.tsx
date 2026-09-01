"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { journey } from "@/lib/data/journey";
import { Reveal } from "@/components/Reveal";

export function JourneySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const start = vh * 0.82;
      const end = vh * 0.4;
      const span = rect.height + (start - end);
      const p = (start - rect.top) / span;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const settle = setTimeout(update, 300);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, []);

  const n = journey.length;
  const packetTop = `calc(0.25rem + (100% - 0.5rem) * ${progress})`;

  return (
    <section
      id="journey"
      className="mx-auto w-full max-w-4xl scroll-mt-20 px-6 py-20 md:py-28"
    >
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
          <span className="h-px w-6 bg-primary" aria-hidden="true" />
          Journey
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          The journey so far
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Chemical engineering to founding engineer — the route from campus to
          shipping production systems. Scroll to trace the signal.
        </p>
      </Reveal>

      <div ref={trackRef} className="relative mt-14 pl-16">
        {/* Pipeline (dashed teal route) */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-6 top-2 w-0.5 -translate-x-1/2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(var(--primary) 0 7px, transparent 7px 14px)",
            opacity: 0.5,
          }}
        />
        {/* Signal already sent (amber wake) */}
        <span
          aria-hidden="true"
          className="absolute left-6 top-2 w-1 -translate-x-1/2 rounded-full"
          style={{
            height: `calc((100% - 0.5rem) * ${progress})`,
            background: "linear-gradient(var(--accent), var(--accent-2))",
            boxShadow: "0 0 12px 0 var(--accent-soft)",
          }}
        />
        {/* The signal packet, riding the leading edge */}
        <span
          aria-hidden="true"
          className="absolute left-6 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            top: packetTop,
            background: "var(--accent)",
            opacity: progress > 0.001 && progress < 0.999 ? 1 : 0,
          }}
        >
          <span className="packet-pulse absolute inset-0 rounded-full" />
        </span>

        <div className="space-y-14">
          {journey.map((milestone, i) => {
            const active = progress >= i / n - 0.03;
            return (
              <div key={milestone.year} className="relative">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-[1.6rem] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-all duration-500 ease-out"
                  style={{
                    borderColor: "var(--primary)",
                    background: active ? "var(--primary)" : "var(--background)",
                    transform: active
                      ? "translateX(-50%) scale(1.2)"
                      : "translateX(-50%) scale(1)",
                    boxShadow: active ? "0 0 0 5px var(--primary-soft)" : "none",
                  }}
                />
                <div
                  className="rounded-xl border p-5 md:p-6"
                  style={
                    {
                      background: "var(--surface)",
                      borderColor: active
                        ? "color-mix(in srgb, var(--primary) 45%, transparent)"
                        : "var(--border)",
                      boxShadow: active
                        ? "0 12px 40px -24px var(--primary)"
                        : "none",
                      opacity: active ? 1 : 0.42,
                      transform: active ? "none" : "translateX(-8px) scale(0.99)",
                      transition:
                        "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1), border-color 0.5s, box-shadow 0.5s",
                    } as CSSProperties
                  }
                >
                  <span
                    className={`font-mono text-3xl font-bold md:text-4xl ${
                      active ? "text-gradient" : "text-muted"
                    }`}
                  >
                    {milestone.year}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-muted">
                    {milestone.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border bg-surface-2/60 px-2 py-1 font-mono text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
