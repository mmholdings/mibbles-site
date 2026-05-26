"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Heading {
  level: number;
  text: string;
  slug: string;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24">
      <div className="text-xs uppercase tracking-widest text-ink-500 mb-3 font-medium">
        On this page
      </div>
      <ul className="space-y-2 border-l border-ink-100">
        {headings.map((h) => (
          <li key={h.slug} style={{ paddingLeft: h.level === 3 ? 16 : 0 }}>
            <a
              href={`#${h.slug}`}
              className={cn(
                "block -ml-px pl-3 border-l text-sm transition-colors",
                activeId === h.slug
                  ? "border-terracotta-500 text-terracotta-700 font-medium"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
