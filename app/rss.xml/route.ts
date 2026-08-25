import { getAllPosts } from "@/lib/posts";
import { getAllNotes } from "@/lib/notes";
import { siteConfig } from "@/lib/site";

function escapeXml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const items = [
    ...getAllPosts().map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteConfig.url}/posts/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${siteConfig.url}/posts/${post.slug}</guid>
      <category>文章</category>
    </item>`,
    ),
    ...getAllNotes().map(
      (note) => `
    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${siteConfig.url}/notes/${note.slug}</link>
      <description>${escapeXml(note.description)}</description>
      <pubDate>${new Date(note.date).toUTCString()}</pubDate>
      <guid>${siteConfig.url}/notes/${note.slug}</guid>
      <category>随笔</category>
    </item>`,
    ),
  ]
    .sort(
      (a, b) =>
        new Date(b.match(/<pubDate>(.*)<\/pubDate>/)?.[1] ?? 0).getTime() -
        new Date(a.match(/<pubDate>(.*)<\/pubDate>/)?.[1] ?? 0).getTime(),
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>zh-CN</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
