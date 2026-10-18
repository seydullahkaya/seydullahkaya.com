"use client";

import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PillLink } from "@/components/pill-link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getPathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ctaHref, navItems, site } from "@/lib/site";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const tHero = useTranslations("Hero");
  const locale = useLocale();
  // Hash linkleri her sayfadan (ör. 404) o dilin ana sayfasına gitsin
  const home = getPathname({ href: "/", locale });
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
          href={`${home}#top`}
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
          aria-label={t("label")}
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
        >
          <ul className="flex items-center gap-1 rounded-full border border-border/80 bg-card/70 p-1 shadow-[0_1px_2px_rgb(0_0_0/0.04)] backdrop-blur-xl">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={`${home}${item.href}`}
                  className="block rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors outline-none hover:bg-secondary hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <PillLink
            href={`${home}${ctaHref.contact}`}
            size="sm"
            className="hidden sm:inline-flex"
          >
            {tHero("secondaryCta")}
          </PillLink>

          {/* Mobil: tam ekran menü */}
          <Sheet>
            <SheetTrigger
              aria-label={t("openMenu")}
              className="grid size-10 place-items-center rounded-full border border-border bg-card outline-none focus-visible:ring-3 focus-visible:ring-ring/40 md:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="top"
              className="gap-0 border-none bg-background px-4 pt-20 pb-8 data-[side=top]:h-dvh"
            >
              <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
              <nav
                aria-label={t("mobileLabel")}
                className="flex flex-1 flex-col"
              >
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.href} className="border-b border-border">
                      <SheetClose
                        nativeButton={false}
                        render={<a href={`${home}${item.href}`} />}
                        className="block py-5 text-3xl font-semibold tracking-tight"
                      >
                        {t(item.key)}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <LanguageSwitcher className="mt-8 self-start" />
                <SheetClose
                  nativeButton={false}
                  render={
                    <PillLink href={`${home}${ctaHref.contact}`} size="lg" />
                  }
                  className="mt-auto w-full"
                >
                  {tHero("secondaryCta")}
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
