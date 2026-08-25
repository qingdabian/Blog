import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { chipColorOf } from "@/lib/gradients";

export const metadata: Metadata = {
  title: "标签",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-black dark:text-zinc-100">标签</h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">共 {tags.length} 个标签</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="flex items-center justify-between rounded-2xl bg-card p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md dark:ring-white/10"
          >
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${chipColorOf(tag)}`}
            >
              {tag}
            </span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500">{count} 篇</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
