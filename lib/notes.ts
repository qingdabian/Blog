import path from "path";
import {
  parseDate,
  readEntries,
  readEntry,
  readingMinutes,
  type RawEntry,
} from "@/lib/content";

export interface NoteMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  /** 心情标签，如 平静/思考/开心 */
  mood: string;
  tags: string[];
  /** 详情页装饰线渐变名 */
  cover: string;
  readingTime: number;
}

export interface Note extends NoteMeta {
  content: string;
}

const notesDir = path.join(process.cwd(), "content", "notes");

function toMeta({ slug, data, content }: RawEntry): NoteMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: parseDate(data.date),
    description: String(data.description ?? ""),
    mood: String(data.mood ?? "平静"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "violet"),
    readingTime: readingMinutes(content),
  };
}

export function getAllNotes(): NoteMeta[] {
  return readEntries(notesDir)
    .map(toMeta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNoteBySlug(slug: string): Note | null {
  const entry = readEntry(notesDir, slug);
  return entry ? { ...toMeta(entry), content: entry.content } : null;
}
