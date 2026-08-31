"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function NavBar() {
  const [active, setActive] = useState("work");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-3.5">
        <a
          href="#top"
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          TS<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-1 sm:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
                active === s.id
                  ? "bg-[var(--accent-soft)] text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        <a
          href="https://drive.google.com/file/d/16-2eOYT0Fs2yo3zC7ztQRr5RZY8mAyho/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border-strong px-3.5 py-1.5 font-mono text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
