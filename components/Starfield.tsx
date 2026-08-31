"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas constellation — drifting points that connect with faint
 * lines when near each other, plus a soft parallax pull toward the cursor.
 * Capped particle count, pauses when offscreen/hidden, and disables itself
 * under prefers-reduced-motion.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    const pointer = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let points: P[] = [];

    const seed = () => {
      const count = Math.min(72, Math.floor((width * height) / 22000));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const near = dx * dx + dy * dy < 140 * 140;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = near
          ? "rgba(245, 165, 36, 0.9)"
          : "rgba(210, 214, 235, 0.55)";
        ctx.fill();
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK) {
            const alpha = (1 - dist / LINK) * 0.22;
            ctx.strokeStyle = `rgba(150, 160, 200, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    let raf = 0;
    let running = true;
    const loop = () => {
      if (running) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };

    resize();
    loop();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
