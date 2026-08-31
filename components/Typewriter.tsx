"use client";

import { useEffect, useState } from "react";

export function Typewriter({
  phrases,
  className = "",
}: {
  phrases: string[];
  className?: string;
}) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(phrases[0]);
      return;
    }
    const current = phrases[index % phrases.length];
    let delay = deleting ? 45 : 85;

    if (!deleting && text === current) {
      delay = 1600; // hold at full phrase
    } else if (deleting && text === "") {
      delay = 260;
    }

    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, phrases]);

  return (
    <span className={className}>
      {text}
      <span className="caret" aria-hidden="true">
        &nbsp;
      </span>
    </span>
  );
}
