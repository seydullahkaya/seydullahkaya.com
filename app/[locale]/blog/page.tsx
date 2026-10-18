import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PostList } from "@/components/blog/post-list";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappButton } from "@/components/whatsapp-button";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });

  return {
    title: t("metaTitle"),
    description: t("description"),
    alternates: {
      canonical: getPathname({ href: "/blog", locale }),
      languages: {
        tr: getPathname({ href: "/blog", locale: "tr" }),
        en: getPathname({ href: "/blog", locale: "en" }),
        "x-default": getPathname({ href: "/blog", locale: "tr" }),
      },
    },
  };
}

export default async function BlogPage({
  params,
}: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "Blog" }),
    getPosts(locale),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-32 pb-24 md:pt-44 md:pb-32">
        <Reveal className="container-page">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <div className="mt-14">
            <PostList posts={posts} />
          </div>
        </Reveal>
      </main>
      <SiteFooter />
      <WhatsappButton />
    </>
  );
}
