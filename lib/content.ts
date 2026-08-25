import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface RawEntry {
  slug: string;
  data: Record<string, unknown>;
  content: string;
}

/** 读取目录下所有 .md/.mdx 文件并解析 front-matter */
export function readEntries(dir: string): RawEntry[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /\.mdx?$/.test(name))
    .map((name) => {
      const slug = path.basename(name).replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(dir, name), "utf-8");
      const { data, content } = matter(raw);
      return { slug, data, content };
    });
}

/** 按 slug 读取单篇，.mdx 优先 */
export function readEntry(dir: string, slug: string): RawEntry | null {
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(dir, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return { slug, data, content };
  }
  return null;
}

/** gray-matter 会把 YYYY-MM-DD 解析为 Date 对象，统一归一化为字符串 */
export function parseDate(value: unknown): string {
  return value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value ?? "");
}

/** 估算阅读时长（分钟），中文按约 400 字/分钟 */
export function readingMinutes(content: string): number {
  const chars = content.replace(/\s+/g, "").length;
  return Math.max(1, Math.round(chars / 400));
}
