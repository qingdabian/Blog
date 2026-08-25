import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";

interface PageParams {
  tag: string;
}

// 标签为中文等非 ASCII 字符，静态预渲染的文件查找层对非 ASCII 路径段
// 编码不一致会导致 404，故该页采用动态渲染。
export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `标签：${decodeURIComponent(tag)}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-black dark:text-zinc-100">
        标签：
        <span className="bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
          {decoded}
        </span>
      </h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">共 {posts.length} 篇文章</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
