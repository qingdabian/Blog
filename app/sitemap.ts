import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { getAllNotes } from "@/lib/notes";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const notes = getAllNotes().map((note) => ({
    url: `${siteConfig.url}/notes/${note.slug}`,
    lastModified: note.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const tags = getAllTags().map(({ tag }) => ({
    url: `${siteConfig.url}/tags/${encodeURIComponent(tag)}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/tags`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/notes`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...posts,
    ...notes,
    ...tags,
  ];
}
