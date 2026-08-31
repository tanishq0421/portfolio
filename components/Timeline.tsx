"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { CompactEntry } from "@/lib/data/types";

export function Timeline({ entries }: { entries: CompactEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
          clearTimeout(fallback);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    // Safety net: never leave the timeline entries hidden if the observer
    // can't fire (e.g. non-composited/edge environments).
    const fallback = setTimeout(() => {
      setDrawn(true);
      io.disconnect();
    }, 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <ol ref={ref} className="relative space-y-7 pl-8">
      {/* Static track */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-[3px] top-2 w-px bg-border"
      />
      {/* Progress line that draws down when the list enters view */}
      <span
        aria-hidden="true"
        className="absolute left-[3px] top-2 w-px origin-top transition-transform duration-[1100ms] ease-out"
        style={{
          bottom: "0.5rem",
          background: "linear-gradient(var(--accent), var(--accent-2))",
          transform: drawn ? "scaleY(1)" : "scaleY(0)",
        }}
      />

      {entries.map((entry, i) => {
        const delay = 220 + i * 200;
        return (
          <li key={`${entry.org}-${entry.title}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background transition-all duration-500 ease-out"
              style={{
                left: "-1.75rem",
                transitionDelay: `${delay}ms`,
                transform: drawn ? "scale(1)" : "scale(0)",
                boxShadow: drawn ? "0 0 0 4px var(--accent-soft)" : "none",
                background: drawn ? "var(--accent)" : "var(--background)",
              }}
            />
            <div
              className="reveal rounded-lg border border-border bg-surface/40 px-5 py-4 transition-colors hover:border-border-strong"
              style={
                {
                  opacity: drawn ? 1 : 0,
                  transform: drawn ? "none" : "translateY(16px)",
                  transition:
                    "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: `${delay}ms`,
                } as CSSProperties
              }
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold text-foreground">
                  {entry.title} · {entry.org}
                </span>
                <span className="font-mono text-xs text-accent">
                  {entry.dates}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{entry.summary}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
