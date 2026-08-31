import { hero } from "@/lib/data/hero";
import { Starfield } from "@/components/Starfield";
import { Typewriter } from "@/components/Typewriter";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Starfield />
      </div>
      {/* Fade the starfield into the page background at the bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-6 pb-24 pt-36 md:pt-48">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
            <span className="ping-dot h-2 w-2 rounded-full bg-emerald-400" />
            Open to new roles
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
            <span className="text-gradient">{hero.name}</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-4 flex h-8 items-center font-mono text-lg text-accent md:text-xl">
            <Typewriter phrases={hero.roles} />
          </p>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-6 max-w-2xl text-lg text-muted">{hero.tagline}</p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-[filter] hover:brightness-110"
              style={{
                background: "linear-gradient(100deg, var(--accent), var(--accent-2))",
              }}
            >
              View work →
            </a>
            {hero.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="rounded-full border border-border-strong px-4 py-2.5 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <a
        href="#work"
        aria-label="Scroll to work"
        className="float-y absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-accent md:flex"
      >
        Scroll
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </header>
  );
}
