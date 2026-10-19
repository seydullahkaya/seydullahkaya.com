import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";
import { site } from "@/lib/site";

const url = (href: string, locale: Locale) =>
  `${site.url}${getPathname({ href, locale })}`.replace(/\/$/, "") || site.url;

/** Bir sayfanın tüm dil sürümleri, hreflang alternatifleriyle. */
function entry(
  href: string,
  locales: readonly Locale[],
  extra: Partial<MetadataRoute.Sitemap[number]> = {},
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, url(href, l)]));
  return locales.map((locale) => ({
    url: url(href, locale),
    alternates: { languages },
    ...extra,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsByLocale = await Promise.all(
    routing.locales.map(async (l) => ({ locale: l, posts: await getPosts(l) })),
  );

  // Aynı slug'a sahip yazılar birbirinin çevirisidir
  const slugs = new Map<string, { locales: Locale[]; date: string }>();
  for (const { locale, posts } of postsByLocale) {
    for (const p of posts) {
      const item = slugs.get(p.slug) ?? { locales: [], date: p.date };
      item.locales.push(locale);
      slugs.set(p.slug, item);
    }
  }

  return [
    ...entry("/", routing.locales, { changeFrequency: "monthly", priority: 1 }),
    ...entry("/blog", routing.locales, {
      changeFrequency: "weekly",
      priority: 0.7,
    }),
    ...[...slugs].flatMap(([slug, { locales, date }]) =>
      entry(`/blog/${slug}`, locales, { lastModified: date, priority: 0.6 }),
    ),
  ];
}
