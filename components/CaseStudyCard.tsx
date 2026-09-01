"use client";

import { useState } from "react";
import type { CaseStudy } from "@/lib/data/types";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = `case-study-${study.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;

  return (
    <div className="group rounded-lg border border-border bg-surface/30 transition-colors hover:border-border-strong">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={panelId}
        className="flex w-full cursor-pointer flex-col gap-1 px-6 pt-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          {study.tag && (
            <span className="rounded-full border border-primary/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-primary">
              {study.tag}
            </span>
          )}
          <span className="ml-auto font-mono text-xs text-muted">
            {study.dates}
          </span>
        </div>
        <span className="mt-2 flex items-center gap-2 font-semibold text-foreground">
          {study.title}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-4 w-4 shrink-0 text-muted transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
        <p className="text-sm text-muted">{study.summary}</p>
        <p className="mt-2 font-mono text-sm text-accent">{study.metric}</p>
      </button>

      {/* Always visible: image, stack, links — the "show, don't tell" surface */}
      <div className="space-y-4 px-6 pb-5 pt-4">
        {study.image && (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={study.image.src}
              alt={study.image.alt}
              loading="lazy"
              className="w-full rounded border border-border"
            />
            {study.image.caption && (
              <figcaption className="mt-2 text-xs text-muted">
                {study.image.caption}
              </figcaption>
            )}
          </figure>
        )}

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
                className="text-primary underline underline-offset-4"
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Smooth height animation via grid-template-rows 0fr → 1fr */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div id={panelId} className="space-y-6 border-t border-border px-6 py-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}
