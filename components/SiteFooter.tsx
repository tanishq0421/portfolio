import { hero } from "@/lib/data/hero";

export function SiteFooter() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs text-muted">
          {hero.name} · built with Next.js
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          {hero.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted transition-colors hover:text-accent"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
