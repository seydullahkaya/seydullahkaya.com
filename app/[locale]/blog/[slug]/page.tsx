import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations } from "next-intl/server";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappButton } from "@/components/whatsapp-button";
import { getPathname, Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { getPost, getPosts } from "@/lib/blog";

type Props = PageProps<"/[locale]/blog/[slug]">;

// Yazılar generateStaticParams ile önceden üretiliyor. Bilinmeyen slug'lar
// gerçek 404 dönsün diye içerik Suspense'e sarılmıyor (bloklayan rota).
export const instant = false;

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, params.locale)) return [];
  const posts = await getPosts(params.locale);
  return posts.map((p) => ({ slug: p.slug }));
}

async function load(params: Props["params"]) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const post = await getPost(locale, slug);
  if (!post) notFound();
  return { locale, slug, post };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, post } = await load(params);
  const href = `/blog/${slug}`;

  // Sadece çevirisi olan diller hreflang'e eklenir
  const translated = await Promise.all(
    routing.locales.map(async (l) => ((await getPost(l, slug)) ? l : null)),
  );
  const languages = Object.fromEntries(
    translated
      .filter((l): l is Locale => l !== null)
      .map((l) => [l, getPathname({ href, locale: l })]),
  );

  return {
    title: `${post.meta.title} — Seydullah Kaya`,
    description: post.meta.description,
    alternates: {
      canonical: getPathname({ href, locale }),
      languages,
    },
    openGraph: {
      type: "article",
      siteName: "Seydullah Kaya",
      title: post.meta.title,
      description: post.meta.description,
      publishedTime: post.meta.date,
      locale: locale === "tr" ? "tr_TR" : "en_US",
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug, post } = await load(params);
  const [t, format, { default: Content }] = await Promise.all([
    getTranslations({ locale, namespace: "Blog" }),
    getFormatter({ locale }),
    import(`@/content/blog/${locale}/${slug}.mdx`),
  ]);

  return (
    <>
      <ReadingProgress />
      <SiteHeader />
      <main className="flex-1 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-page">
          <Link
            href="/blog"
            className="group/back inline-flex items-center gap-2 rounded-full text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            <ArrowLeft
              className="size-4 transition-transform duration-200 group-hover/back:-translate-x-0.5"
              aria-hidden="true"
            />
            {t("backToBlog")}
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-16">
            <article className="min-w-0">
              <header className="max-w-[65ch] border-b border-border pb-10">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted-foreground">
                  <time dateTime={post.meta.date}>
                    {format.dateTime(new Date(post.meta.date), {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>
                    {t("minutesRead", { minutes: post.meta.readingMinutes })}
                  </span>
                </p>
                <h1 className="mt-5 text-h2 text-balance">{post.meta.title}</h1>
                <p className="mt-5 text-lg text-pretty text-muted-foreground">
                  {post.meta.description}
                </p>
              </header>

              <div className="prose-post prose mt-10">
                <Content />
              </div>
            </article>

            {/* Masaüstünde yanda sabit içindekiler tablosu */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents headings={post.headings} title={t("toc")} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsappButton />
    </>
  );
}
