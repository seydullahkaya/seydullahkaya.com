import {
  Check,
  Globe,
  LayoutDashboard,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { SpotlightCard } from "@/components/spotlight-card";
import { services } from "@/lib/site";

const icons = {
  globe: Globe,
  layout: LayoutDashboard,
  smartphone: Smartphone,
  wrench: Wrench,
} as const;

export function Services() {
  return (
    <section id="services" className="border-t border-border/60 section-y">
      <Reveal className="container-page">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {services.items.map((s) => {
            const Icon = icons[s.icon];
            return (
              <RevealItem key={s.title} className="h-full">
                <SpotlightCard>
                  <article className="flex h-full flex-col p-6 md:p-8">
                    <span className="grid size-11 place-items-center rounded-md border border-border bg-background text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-h3">{s.title}</h3>
                    <p className="mt-2 text-pretty text-muted-foreground">
                      {s.description}
                    </p>
                    <div className="mt-6 border-t border-border pt-5">
                      <p className="eyebrow text-muted-foreground">
                        {services.includesLabel}
                      </p>
                      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                        {s.includes.map((inc) => (
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
