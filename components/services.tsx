import {
  Check,
  Globe,
  LayoutDashboard,
  Smartphone,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import { serviceKeys } from "@/lib/site";

const icons = {
  website: Globe,
  webapp: LayoutDashboard,
  mobile: Smartphone,
  maintenance: Wrench,
} as const;

export function Services() {
  const t = useTranslations("Services");

  return (
    <section id="services" className="border-t border-border/60 section-y">
      <Reveal className="container-page">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {serviceKeys.map((key) => {
            const Icon = icons[key];
            const includes = t.raw(`items.${key}.includes`) as string[];
            return (
              <RevealItem key={key} className="h-full">
                <SpotlightCard>
                  <article className="flex h-full flex-col p-6 md:p-8">
                    <span className="grid size-11 place-items-center rounded-md border border-border bg-background text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-h3">{t(`items.${key}.title`)}</h3>
                    <p className="mt-2 text-pretty text-muted-foreground">
                      {t(`items.${key}.description`)}
                    </p>
                    <div className="mt-6 border-t border-border pt-5">
                      <p className="eyebrow text-muted-foreground">
                        {t("includesLabel")}
                      </p>
                      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                        {includes.map((inc) => (
                          <li key={inc} className="flex items-start gap-2">
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-success"
                              aria-hidden="true"
                            />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
