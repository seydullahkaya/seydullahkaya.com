"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** İmleci takip eden spotlight ışığı ve ince kenar parlaması olan kart. */
export function SpotlightCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        "group/spot relative h-full rounded-lg bg-border p-px [--x:50%] [--y:0px]",
        className,
      )}
    >
      {/* Kenar parlaması */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(360px_circle_at_var(--x)_var(--y),color-mix(in_oklch,var(--primary)_55%,transparent),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      />
      <div className="relative h-full overflow-hidden rounded-[calc(var(--radius)-1px)] bg-popover">
        {/* İç ışık */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(480px_circle_at_var(--x)_var(--y),color-mix(in_oklch,var(--primary)_14%,transparent),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
