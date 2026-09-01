"use client";

import { useEffect, useRef } from "react";

/**
 * "Living system" ambient graph — teal nodes wired into a small topology with
 * amber signal packets pulsing along the edges. Reads as a distributed system
 * rather than a generic starfield. Capped, pauses when hidden, and disables
 * itself under prefers-reduced-motion.
 */
export function SystemGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999 };

    type Node = { x: number; y: number; hx: number; hy: number; ph: number };
    type Edge = { a: number; b: number };
    type Packet = { edge: number; t: number; speed: number; dir: number };

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let packets: Packet[] = [];

    const seed = () => {
      const count = Math.max(10, Math.min(20, Math.floor(width / 90)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        hx: (Math.random() - 0.5) * 0.16,
        hy: (Math.random() - 0.5) * 0.16,
        ph: Math.random() * Math.PI * 2,
      }));

      // Wire each node to its 2 nearest neighbors → a stable topology.
      const key = new Set<string>();
      edges = [];
      nodes.forEach((n, i) => {
        const near = nodes
          .map((m, j) => ({ j, d: (n.x - m.x) ** 2 + (n.y - m.y) ** 2 }))
          .filter((o) => o.j !== i)
          .sort((p, q) => p.d - q.d)
          .slice(0, 2);
        for (const { j } of near) {
          const k = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!key.has(k)) {
            key.add(k);
            edges.push({ a: i, b: j });
          }
        }
      });
      packets = [];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let frame = 0;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Drift nodes gently, bouncing at edges.
      for (const n of nodes) {
        n.x += n.hx;
        n.y += n.hy;
        if (n.x < 0 || n.x > width) n.hx *= -1;
        if (n.y < 0 || n.y > height) n.hy *= -1;
      }

      // Edges (teal), brighter near the pointer.
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        const midx = (a.x + b.x) / 2;
        const midy = (a.y + b.y) / 2;
        const near =
          (midx - pointer.x) ** 2 + (midy - pointer.y) ** 2 < 160 * 160;
        ctx.strokeStyle = near
          ? "rgba(45, 212, 191, 0.5)"
          : "rgba(45, 212, 191, 0.16)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Nodes (teal) with a soft breathing glow.
      for (const n of nodes) {
        const pulse = 1 + Math.sin(frame * 0.03 + n.ph) * 0.25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.1 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(94, 234, 212, 0.9)";
        ctx.fill();
      }

      // Spawn amber packets along edges.
      if (edges.length && packets.length < 12 && frame % 22 === 0) {
        packets.push({
          edge: Math.floor(Math.random() * edges.length),
          t: 0,
          speed: 0.006 + Math.random() * 0.006,
          dir: Math.random() < 0.5 ? 1 : -1,
        });
      }
      packets = packets.filter((p) => {
        p.t += p.speed;
        if (p.t >= 1) return false;
        const e = edges[p.edge];
        const a = nodes[e.a];
        const b = nodes[e.b];
        const tt = p.dir === 1 ? p.t : 1 - p.t;
        const x = a.x + (b.x - a.x) * tt;
        const y = a.y + (b.y - a.y) * tt;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 7);
        grad.addColorStop(0, "rgba(245, 165, 36, 0.95)");
        grad.addColorStop(1, "rgba(245, 165, 36, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255, 214, 138, 1)";
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
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
