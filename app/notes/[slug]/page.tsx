import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { formatDate } from "@/lib/posts";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { gradientOf, chipColorOf } from "@/lib/gradients";
import TagChip from "@/components/TagChip";
import Comments from "@/components/Comments";

interface PageParams {
  slug: string;
}

export function generateStaticParams(): PageParams[] {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.description,
    openGraph: {
      type: "article",
      title: note.title,
      description: note.description,
      publishedTime: note.date,
      url: `/notes/${note.slug}`,
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4">
      <article className="py-10">
        <header>
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
            <time dateTime={note.date}>{formatDate(note.date)}</time>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${chipColorOf(note.mood)}`}
            >
              {note.mood}
            </span>
            <span>{note.readingTime} 分钟阅读</span>
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
            {note.title}
          </h1>
          {note.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {note.tags.map((tag) => (
                <TagChip key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>
        <div
          className={`my-8 h-1.5 w-24 rounded-full bg-gradient-to-r ${gradientOf(note.cover)}`}
        />
        <div className="prose max-w-none">
          <MDXRemote
            source={note.content}
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
