import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

/**
 * Hero'daki terminal penceresi: komut harf harf yazılır, adımlar sırayla
 * belirir. Saf CSS animasyonu (globals.css → terminal-*); reduced-motion'da
 * hepsi anında görünür. Metin gerçek metin olduğu için ekran okuyucular okur.
 */
export function TerminalWindow({ startDelay = 0.6 }: { startDelay?: number }) {
  const t = useTranslations("Hero.terminal");
  const command = t("command");
  const steps = t.raw("steps") as string[];
  const typeDuration = Math.min(1.6, command.length * 0.045);
  const at = (i: number) => startDelay + typeDuration + 0.25 + i * 0.35;

  return (
    <figure className="terminal mx-auto w-full max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#0b1129]/85 text-left font-mono text-[0.72rem] shadow-[0_20px_60px_-15px_rgb(0_0_0/0.6),0_0_0_1px_rgb(185_166_255/0.08),0_0_40px_-10px_rgb(124_92_255/0.35)] backdrop-blur-md sm:text-sm">
      <figcaption className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-muted-foreground">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto pr-10">{t("title")}</span>
      </figcaption>
      <div className="space-y-1.5 px-4 py-4 sm:px-5">
        <p className="flex min-w-0 gap-2">
          <span className="shrink-0 text-[#67e8f9]" aria-hidden="true">
            $
          </span>
          <span
            className="terminal-type overflow-hidden whitespace-nowrap text-foreground"
            style={
              {
                "--chars": command.length,
                animationDelay: `${startDelay}s`,
                animationDuration: `${typeDuration}s`,
              } as CSSProperties
            }
          >
            {command}
          </span>
        </p>
        {steps.map((step, i) => (
          <p
            key={step}
            className="terminal-line flex gap-2 text-muted-foreground"
            style={{ animationDelay: `${at(i)}s` }}
          >
            <span className="shrink-0 text-[#4ade80]" aria-hidden="true">
              ✓
            </span>
            <span className="min-w-0">{step}</span>
          </p>
        ))}
        <p
          className="terminal-line flex items-center gap-2 pt-1 text-[#c4b5fd]"
          style={{ animationDelay: `${at(steps.length)}s` }}
        >
          <span className="shrink-0 text-[#67e8f9]" aria-hidden="true">
            →
          </span>
          {t("done")}
          <span
            className="terminal-cursor inline-block h-4 w-2 bg-[#c4b5fd]"
            aria-hidden="true"
          />
        </p>
      </div>
    </figure>
  );
}
