import path from "path";
import {
  parseDate,
  readEntries,
  readEntry,
  readingMinutes,
  type RawEntry,
} from "@/lib/content";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover: string;
  emoji: string;
  /** 封面图路径（public 下），缺省时回退为渐变块 */
  coverImage: string | null;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

const postsDir = path.join(process.cwd(), "content", "posts");

function toMeta({ slug, data, content }: RawEntry): PostMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: parseDate(data.date),
    description: String(data.description ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "violet"),
    emoji: String(data.emoji ?? "📝"),
    coverImage:
      typeof data.coverImage === "string" ? data.coverImage : null,
    readingTime: readingMinutes(content),
  };
}

export function getAllPosts(): PostMeta[] {
  return readEntries(postsDir)
    .map(toMeta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  const entry = readEntry(postsDir, slug);
  return entry ? { ...toMeta(entry), content: entry.content } : null;
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function formatDate(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}
