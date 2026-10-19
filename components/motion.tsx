"use client";

import { type ReactNode, useEffect, useRef } from "react";

// Kaydırınca belirme efekti: animasyon kütüphanesi yerine IntersectionObserver
// ve CSS geçişleri (globals.css → [data-reveal-item]). JS paketini küçük tutar.
const STAGGER_MS = 80;

/** Ekrana girince içindeki <RevealItem>'ları sırayla aşağıdan yukarı belirtir. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach(
      (item, i) => {
        item.style.transitionDelay = `${i * STAGGER_MS}ms`;
      },
    );
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.revealed = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} data-reveal>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className,
  as: Component = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return (
    <Component className={className} data-reveal-item>
      {children}
    </Component>
  );
}
