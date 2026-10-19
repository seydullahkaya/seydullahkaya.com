import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getPost, getPosts } from "@/lib/blog";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Seydullah Kaya — Blog";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  const all = await Promise.all(
    routing.locales.map(async (locale) =>
      (await getPosts(locale)).map((p) => ({ locale, slug: p.slug })),
    ),
  );
  return all.flat();
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: value, slug } = await params;
  const locale = hasLocale(routing.locales, value)
    ? value
    : routing.defaultLocale;
  const [t, post] = await Promise.all([
    getTranslations({ locale, namespace: "Blog" }),
    getPost(locale, slug),
  ]);

  return renderOgImage({
    eyebrow: t("eyebrow"),
    title: post?.meta.title ?? t("title"),
    description: post?.meta.description,
  });
}
