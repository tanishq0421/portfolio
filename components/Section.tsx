import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
