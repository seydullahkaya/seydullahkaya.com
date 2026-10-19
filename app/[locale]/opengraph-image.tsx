import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Seydullah Kaya";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: value } = await params;
  const locale = hasLocale(routing.locales, value)
    ? value
    : routing.defaultLocale;
  const [t, tHero] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "Hero" }),
  ]);

  return renderOgImage({
    eyebrow: "Seydullah Kaya",
    title: `${tHero("titleBefore")} ${tHero("titleHighlight")} ${tHero("titleAfter")}`,
    description: t("description"),
    badge: tHero("badge"),
  });
}
