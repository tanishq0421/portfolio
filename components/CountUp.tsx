"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1300,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setValue(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        clearTimeout(fallback);
        run();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    // Safety net: land on the final value even if the observer never fires.
    const fallback = setTimeout(() => {
      io.disconnect();
      run();
    }, 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
