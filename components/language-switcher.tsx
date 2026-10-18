"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** TR / EN geçişi. Aynı sayfanın diğer dildeki sürümüne gider. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common");

  return (
    <nav
      aria-label={t("language")}
      className={cn(
        "flex items-center rounded-full border border-border bg-card p-0.5 font-mono text-xs",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/40",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {l}
          </Link>
        );
      })}
    </nav>
  );
}
