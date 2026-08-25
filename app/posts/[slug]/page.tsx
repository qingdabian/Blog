import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";
import { gradientOf } from "@/lib/gradients";
import { siteConfig } from "@/lib/site";
import TagChip from "@/components/TagChip";
import Comments from "@/components/Comments";

interface PageParams {
  slug: string;
}

export function generateStaticParams(): PageParams[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `/posts/${post.slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4">
      <article className="py-10">
        <header>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-zinc-400 dark:text-zinc-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{siteConfig.author}</span>
          </div>
        </header>
        <div
          className={`my-8 h-1.5 w-24 rounded-full bg-gradient-to-r ${gradientOf(post.cover)}`}
        />
        <div className="prose max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>
      </article>
      <section className="border-t border-black/5 py-10 dark:border-white/10">
        <h2 className="mb-6 text-xl font-bold dark:text-zinc-100">评论</h2>
        <Comments />
      </section>
    </div>
  );
}
