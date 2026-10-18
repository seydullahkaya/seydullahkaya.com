import { getTranslations } from "next-intl/server";
import { PostList } from "@/components/blog/post-list";
import { Reveal, RevealItem } from "@/components/motion";
import { pillVariants } from "@/components/pill-link";
import { SectionHeading } from "@/components/section-heading";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";

const HOME_POST_COUNT = 3;

/** Ana sayfadaki "Son yazılar" bölümü. */
export async function BlogSection({ locale }: { locale: Locale }) {
  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "Blog" }),
    getPosts(locale),
  ]);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="border-t border-border/60 section-y">
      <Reveal className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <RevealItem>
            <Link
              href="/blog"
              className={pillVariants({ variant: "outline", size: "md" })}
            >
              {t("allPosts")}
            </Link>
          </RevealItem>
        </div>
        <div className="mt-12">
          <PostList posts={posts.slice(0, HOME_POST_COUNT)} />
        </div>
      </Reveal>
    </section>
  );
}
