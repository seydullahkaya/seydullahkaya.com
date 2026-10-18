"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Yazının başlıkları. Ekrandaki bölüm vurgulanır. */
export function TableOfContents({
  headings,
  title,
}: {
  headings: Heading[];
  title: string;
}) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    // Ekranın üst kısmına giren son başlık aktif sayılır
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={title}>
      <p className="eyebrow text-muted-foreground">{title}</p>
      <ul className="mt-4 space-y-1 border-l border-border text-sm">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1 transition-colors outline-none focus-visible:text-foreground",
                h.level === 3 ? "pl-7" : "pl-4",
                active === h.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
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
