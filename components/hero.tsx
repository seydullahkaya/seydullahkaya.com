"use client";

import { motion } from "motion/react";
import { Fragment } from "react";
import { PillLink } from "@/components/pill-link";
import { hero, techMarquee } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.6, ease, delay },
  };
}

export function Hero() {
  const words = [
    ...hero.titleBefore.split(" ").map((w) => ({ w, hl: false })),
    { w: hero.titleHighlight, hl: true },
    ...hero.titleAfter.split(" ").map((w) => ({ w, hl: false })),
  ];
  const afterTitle = 0.15 + words.length * 0.06;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24"
    >
      <HeroBackground />

      <div className="container-page flex flex-col items-center text-center">
        <motion.p
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 py-1.5 pr-3.5 pl-3 eyebrow text-muted-foreground shadow-[0_1px_2px_rgb(0_0_0/0.04)] backdrop-blur"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping-slow rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {hero.badge}
        </motion.p>

        <h1 className="mt-7 max-w-[16ch] text-display text-balance">
          {words.map(({ w, hl }, i) => (
            <Fragment key={i}>
              <motion.span
                className={hl ? "inline-block text-gradient" : "inline-block"}
                initial={{ opacity: 0, y: "0.35em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.06 }}
              >
                {w}
              </motion.span>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </h1>

        <motion.p
          {...fadeUp(afterTitle)}
          className="mt-6 max-w-[58ch] text-pretty text-muted-foreground md:text-lg"
        >
          {hero.description}
        </motion.p>

        <motion.div
          {...fadeUp(afterTitle + 0.1)}
          className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <PillLink
            href={hero.primaryCta.href}
            size="lg"
            arrow
            className="w-full sm:w-auto"
          >
            {hero.primaryCta.label}
          </PillLink>
          <PillLink
            href={hero.secondaryCta.href}
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            {hero.secondaryCta.label}
          </PillLink>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: afterTitle + 0.3 }}
        className="mt-20 md:mt-28"
      >
        <TechMarquee />
      </motion.div>
    </section>
  );
}

function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      {/* Mesh gradient: accent rengi %4–6 opaklıkta */}
      <div className="absolute -top-40 left-1/2 h-[640px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--primary)_9%,transparent),transparent),radial-gradient(closest-side_at_20%_60%,color-mix(in_oklch,#a855f7_6%,transparent),transparent),radial-gradient(closest-side_at_80%_55%,color-mix(in_oklch,#06b6d4_5%,transparent),transparent)] blur-2xl" />
      {/* Kenarlara doğru kaybolan grid deseni */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_30%,transparent_100%)] bg-[size:56px_56px] opacity-70" />
    </div>
  );
}

function TechMarquee() {
  // Kesintisiz kayma için liste iki kez yan yana
  const row = [...techMarquee, ...techMarquee];
  return (
    <div className="group relative [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <p className="sr-only">
        Kullandığım teknolojiler: {techMarquee.join(", ")}
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
