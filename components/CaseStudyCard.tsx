"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/data/types";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="flex w-full flex-col gap-1 px-6 py-5 text-left"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-semibold text-foreground">{study.title}</span>
          <span className="font-mono text-xs text-muted">{study.dates}</span>
        </div>
        <p className="text-sm text-muted">{study.summary}</p>
        <p className="mt-2 font-mono text-sm text-accent">{study.metric}</p>
      </button>

      {expanded && (
        <div className="space-y-6 border-t border-border px-6 py-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Problem
            </p>
            <p className="mt-2 text-sm text-foreground">{study.problem}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Approach
            </p>
            <p className="mt-2 text-sm text-foreground">{study.approach}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Key decisions
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-foreground">
              {study.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Tradeoffs
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-foreground">
              {study.tradeoffs.map((tradeoff) => (
                <li key={tradeoff}>{tradeoff}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-border px-2 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          {study.links && study.links.length > 0 && (
            <div className="flex gap-4 font-mono text-sm">
              {study.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline underline-offset-4"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
