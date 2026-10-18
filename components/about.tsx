import { Clock, MapPin, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { LocalTime } from "@/components/local-time";
import { Reveal, RevealItem } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { learning, skills } from "@/lib/site";

export function About() {
  const t = useTranslations("About");
  const tCommon = useTranslations("Common");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="about" className="section-y">
      <Reveal className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-[auto_auto_auto]">
          {/* Büyük kart: tanıtım + profil */}
          <BentoCard className="md:col-span-2 lg:col-span-4 lg:row-span-2">
            <div className="flex h-full flex-col gap-8 sm:flex-row sm:items-start">
              {/* TODO: Profil fotoğrafı (PROJE_1.md Bölüm 9) */}
              <div
                aria-hidden="true"
                className="grid size-20 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),color-mix(in_oklch,var(--primary),#a855f7_55%))] text-2xl font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] sm:size-24"
              >
                SK
              </div>
              <div>
                <h3 className="text-h3">{t("greeting")}</h3>
                <div className="mt-4 space-y-4 text-muted-foreground">
                  {paragraphs.map((p) => (
                    <p key={p} className="max-w-[62ch] text-pretty">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="lg:col-span-2">
            <CardLabel icon={<MapPin className="size-3.5" />}>
              {t("locationLabel")}
            </CardLabel>
            <p className="mt-4 text-h3">{t("locationValue")}</p>
            <p className="mt-auto flex items-center gap-2 pt-6 font-mono text-sm text-muted-foreground">
              <Clock className="size-3.5" aria-hidden="true" />
              <LocalTime /> · {tCommon("localTimeCity")}
            </p>
          </BentoCard>

          <BentoCard className="lg:col-span-2">
            <CardLabel icon={<Zap className="size-3.5" />}>
              {t("workStyleLabel")}
            </CardLabel>
            <p className="mt-4 text-h3">{t("workStyleValue")}</p>
            <p className="mt-auto pt-6 text-sm text-muted-foreground">
              {t("workStyleNote")}
            </p>
          </BentoCard>

          {/* Teknoloji yığını */}
          <BentoCard className="md:col-span-2 lg:col-span-4">
            <div className="grid gap-6 sm:grid-cols-3">
              {skills.map((s) => (
                <div key={s.key}>
                  <p className="eyebrow text-muted-foreground">
                    {t(`skillGroups.${s.key}`)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-background px-3 py-1 text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2 lg:col-span-2">
            <CardLabel icon={<Sparkles className="size-3.5" />}>
              {t("learningLabel")}
            </CardLabel>
            <ul className="mt-4 flex flex-wrap gap-2">
              {learning.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </BentoCard>
        </div>
      </Reveal>
    </section>
  );
}

function BentoCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <RevealItem
      className={cn(
        "flex flex-col rounded-lg border border-border bg-card p-6 shadow-[0_1px_2px_rgb(0_0_0/0.03)] md:p-8",
        className,
      )}
    >
      {children}
    </RevealItem>
  );
}

function CardLabel({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <p className="flex items-center gap-2 eyebrow text-muted-foreground">
      <span aria-hidden="true">{icon}</span>
      {children}
    </p>
  );
}
