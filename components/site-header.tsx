"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { PillLink } from "@/components/pill-link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { hero, nav, site } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-border/70 bg-background/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-full font-semibold tracking-tight outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full bg-foreground font-mono text-[0.7rem] text-background"
          >
            SK
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>

        {/* Masaüstü: ortada yüzen menü kapsülü */}
        <nav
          aria-label="Ana menü"
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
        >
          <ul className="flex items-center gap-1 rounded-full border border-border/80 bg-card/70 p-1 shadow-[0_1px_2px_rgb(0_0_0/0.04)] backdrop-blur-xl">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* TODO (Aşama 3): TR/EN dil seçici */}
          <PillLink
            href={hero.secondaryCta.href}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {hero.secondaryCta.label}
          </PillLink>

          {/* Mobil: tam ekran menü */}
          <Sheet>
            <SheetTrigger
              aria-label="Menüyü aç"
              className="grid size-10 place-items-center rounded-full border border-border bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring/40 md:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="top"
              className="gap-0 border-none bg-background px-4 pt-20 pb-8 data-[side=top]:h-dvh"
            >
              <SheetTitle className="sr-only">Menü</SheetTitle>
              <nav aria-label="Mobil menü" className="flex flex-1 flex-col">
                <ul className="flex flex-col">
                  {nav.map((item) => (
                    <li key={item.href} className="border-b border-border">
                      <SheetClose
                        nativeButton={false}
                        render={<a href={item.href} />}
                        className="block py-5 text-3xl font-semibold tracking-tight"
                      >
                        {item.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <SheetClose
                  nativeButton={false}
                  render={<PillLink href={hero.secondaryCta.href} size="lg" />}
                  className="mt-auto w-full"
                >
                  {hero.secondaryCta.label}
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
