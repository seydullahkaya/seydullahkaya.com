import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { cacheLife } from "next/cache";
import type { Locale } from "@/i18n/routing";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  readingMinutes: number;
};

export type Heading = { id: string; text: string; level: 2 | 3 };

type Frontmatter = {
  title: string;
  description: string;
  date: string | Date;
  draft?: boolean;
};

async function readPostFile(locale: Locale, slug: string) {
  // slug sadece güvenli karakterler içerebilir (path traversal'a karşı)
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    return await fs.readFile(
      path.join(BLOG_DIR, locale, `${slug}.mdx`),
      "utf8",
    );
  } catch {
    return null;
  }
}

function toMeta(slug: string, raw: string) {
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;
  const words = stripCode(content).split(/\s+/).filter(Boolean).length;
  const meta: PostMeta = {
    slug,
    title: fm.title,
    description: fm.description,
    // gray-matter YAML tarihlerini Date nesnesine çevirir
    date:
      fm.date instanceof Date
        ? fm.date.toISOString().slice(0, 10)
        : String(fm.date),
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
  return { meta, content, draft: fm.draft === true };
}

function stripCode(md: string) {
  return md.replace(/```[\s\S]*?```/g, " ");
}

/** rehype-slug ile aynı id'leri üretmek için başlıkları aynı sırayla slug'lar. */
function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const line of stripCode(content).split("\n")) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_~]/g, "");
    const id = slugger.slug(text);
    if (level === 2 || level === 3) headings.push({ id, text, level });
  }
  return headings;
}

/** Bir dildeki yayınlanmış yazılar, yeniden eskiye. */
export async function getPosts(locale: Locale): Promise<PostMeta[]> {
  "use cache";
  cacheLife("max");

  let files: string[] = [];
  try {
    files = await fs.readdir(path.join(BLOG_DIR, locale));
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await readPostFile(locale, slug);
        return raw ? toMeta(slug, raw) : null;
      }),
  );

  return posts
    .filter((p): p is NonNullable<typeof p> => p !== null && !p.draft)
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(locale: Locale, slug: string) {
  "use cache";
  cacheLife("max");

  const raw = await readPostFile(locale, slug);
  if (!raw) return null;
  const { meta, content, draft } = toMeta(slug, raw);
  if (draft) return null;
  return { meta, headings: extractHeadings(content) };
}
