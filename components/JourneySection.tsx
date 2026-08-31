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
      const start = vh * 0.82; // start filling as the track enters the lower viewport
      const end = vh * 0.45; // fully filled once the track's end clears mid-viewport
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

  return (
    <section
      id="journey"
      className="mx-auto w-full max-w-4xl scroll-mt-20 px-6 py-20 md:py-28"
    >
      <Reveal>
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent">
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          Journey
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          The journey so far
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Chemical engineering to founding engineer — the path from campus to
          shipping production systems. Scroll to follow it.
        </p>
      </Reveal>

      <div ref={trackRef} className="relative mt-12 pl-12">
        {/* Base rail */}
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-[21px] top-1 w-0.5 bg-border"
        />
        {/* Scroll-driven fill */}
        <span
          aria-hidden="true"
          className="absolute left-[21px] top-1 w-0.5"
          style={{
            height: `calc((100% - 0.5rem) * ${progress})`,
            background: "linear-gradient(var(--accent), var(--accent-2))",
          }}
        />
        {/* Comet head at the leading edge */}
        <span
          aria-hidden="true"
          className="absolute left-[18px] h-2 w-2 -translate-y-1/2 rounded-full"
          style={{
            top: `calc(0.25rem + (100% - 0.5rem) * ${progress})`,
            background: "var(--accent)",
            boxShadow: "0 0 12px 3px var(--accent)",
            opacity: progress > 0.001 && progress < 0.999 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        <div className="space-y-12">
          {journey.map((milestone, i) => {
            const active = progress >= i / n - 0.02;
            return (
              <div key={milestone.year} className="relative">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className="absolute left-[16px] top-1.5 h-3 w-3 rounded-full border-2 transition-all duration-500 ease-out"
                  style={{
                    borderColor: "var(--accent)",
                    background: active ? "var(--accent)" : "var(--background)",
                    transform: active ? "scale(1.25)" : "scale(1)",
                    boxShadow: active ? "0 0 0 4px var(--accent-soft)" : "none",
                  }}
                />
                <div
                  style={
                    {
                      opacity: active ? 1 : 0.35,
                      transform: active ? "none" : "translateX(-10px)",
                      transition:
                        "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                    } as CSSProperties
                  }
                >
                  <span
                    className={`font-mono text-2xl font-bold md:text-3xl ${
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
                  <div className="mt-3 flex flex-wrap gap-2">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border bg-surface/40 px-2 py-1 font-mono text-xs text-muted"
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
