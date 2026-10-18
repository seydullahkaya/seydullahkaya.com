import { ArrowRight } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { RevealItem } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import type { PostMeta } from "@/lib/blog";

/** Tarih (mono), başlık, özet ve okuma süresiyle yazı listesi. */
export function PostList({ posts }: { posts: PostMeta[] }) {
  const t = useTranslations("Blog");
  const format = useFormatter();

  if (posts.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <RevealItem key={post.slug} as="li">
          <Link
            href={`/blog/${post.slug}`}
            className="group/post grid gap-2 py-7 outline-none focus-visible:ring-3 focus-visible:ring-ring/40 md:grid-cols-[10rem_1fr_auto] md:items-baseline md:gap-8"
          >
            <time
              dateTime={post.date}
              className="font-mono text-sm text-muted-foreground"
            >
              {format.dateTime(new Date(post.date), {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <div>
              <h3 className="text-h3 transition-colors group-hover/post:text-primary">
                {post.title}
              </h3>
              <p className="mt-2 max-w-[65ch] text-pretty text-muted-foreground">
                {post.description}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {t("minutesRead", { minutes: post.readingMinutes })}
              </p>
            </div>
            <ArrowRight
              aria-hidden="true"
              className="hidden size-5 text-muted-foreground transition-[transform,color] duration-200 group-hover/post:translate-x-1 group-hover/post:text-primary md:block"
            />
          </Link>
        </RevealItem>
      ))}
    </ul>
  );
}
