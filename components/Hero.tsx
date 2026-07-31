import { hero } from "@/lib/data/hero";

export function Hero() {
  return (
    <header className="mx-auto w-full max-w-4xl px-6 pt-24 pb-16 md:pt-32">
      <p className="font-mono text-sm text-accent">{hero.role}</p>
      <h1 className="mt-4 text-4xl font-bold text-foreground md:text-6xl">
        {hero.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">{hero.tagline}</p>
      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
        {hero.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
