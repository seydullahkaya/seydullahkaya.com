import { useTranslations } from "next-intl";
import { type CSSProperties, Fragment } from "react";
import { PillLink } from "@/components/pill-link";
import { TerminalWindow } from "@/components/terminal-window";
import { ctaHref, techMarquee } from "@/lib/site";

// Giriş animasyonları saf CSS (globals.css: hero-word, hero-rise, hero-fade).
// JS beklemeden ilk boyamada başlar; LCP öğesi (açıklama) hiç gizlenmez,
// sadece yukarı kayar. prefers-reduced-motion açıksa animasyonlar kapanır.
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export function Hero() {
  const t = useTranslations("Hero");
  const words = [
    ...t("titleBefore")
      .split(" ")
      .map((w) => ({ w, hl: false })),
    { w: t("titleHighlight"), hl: true },
    ...t("titleAfter")
      .split(" ")
      .map((w) => ({ w, hl: false })),
  ];
  const afterTitle = 0.1 + words.length * 0.04;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24"
    >
      <HeroBackground />

      <div className="container-page flex flex-col items-center text-center">
        <p className="inline-flex animate-hero-rise items-center gap-2 rounded-full border border-border bg-card/80 py-1.5 pr-3.5 pl-3 eyebrow text-muted-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04)] backdrop-blur">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {t("badge")}
        </p>

        <h1 className="mt-7 max-w-[16ch] text-display text-balance">
          {words.map(({ w, hl }, i) => (
            <Fragment key={i}>
              <span
                className={
                  hl
                    ? "inline-block animate-hero-word text-gradient"
                    : "inline-block animate-hero-word"
                }
                style={delay(0.05 + i * 0.04)}
              >
                {w}
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
          <span
            aria-hidden="true"
            className="terminal-cursor ml-[0.08em] inline-block h-[0.78em] w-[0.09em] translate-y-[0.04em] rounded-[1px] bg-[var(--nebula-cyan)] shadow-[0_0_12px_var(--nebula-cyan)]"
          />
        </h1>

        <p
          className="mt-6 max-w-[58ch] animate-hero-rise text-pretty text-muted-foreground md:text-lg"
          style={delay(afterTitle)}
        >
          {t("description")}
        </p>

        <div
          className="mt-9 flex w-full animate-hero-rise flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
          style={delay(afterTitle + 0.08)}
        >
          <PillLink
            href={ctaHref.services}
            size="lg"
            arrow
            className="w-full sm:w-auto"
          >
            {t("primaryCta")}
          </PillLink>
          <PillLink
            href={ctaHref.contact}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            {t("secondaryCta")}
          </PillLink>
        </div>
      </div>

      <div
        className="container-page mt-14 animate-hero-rise md:mt-16"
        style={delay(afterTitle + 0.15)}
      >
        <TerminalWindow startDelay={afterTitle + 0.5} />
      </div>

      <div
        className="mt-16 animate-hero-fade md:mt-20"
        style={delay(afterTitle + 0.2)}
      >
        <TechMarquee label={t("techLabel")} />
      </div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {/* Başlığın arkasında nebula parıltısı */}
      <div className="absolute top-10 left-1/2 h-[520px] w-[900px] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(124_58_237/0.32),transparent),radial-gradient(closest-side_at_30%_60%,rgb(34_211_238/0.14),transparent),radial-gradient(closest-side_at_72%_55%,rgb(240_171_252/0.14),transparent)]" />
      {/* Ufuktaki dijital gezegen: grid yüzey + atmosfer ışıması, alta doğru sayfaya karışır */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)]">
        <div className="planet absolute top-[78%] left-1/2 aspect-square w-[1800px] max-w-[260vw] -translate-x-1/2 rounded-full md:top-[72%]" />
      </div>
    </div>
  );
}

function TechMarquee({ label }: { label: string }) {
  // Kesintisiz kayma için liste iki kez yan yana
  const row = [...techMarquee, ...techMarquee];
  return (
    <div className="group relative [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <p className="sr-only">
        {label}: {techMarquee.join(", ")}
      </p>
      <ul
        aria-hidden="true"
        className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]"
      >
        {row.map((t, i) => (
          <li
            key={i}
            className="rounded-full border border-border bg-card px-4 py-2 font-mono text-[0.8rem] whitespace-nowrap text-muted-foreground"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
