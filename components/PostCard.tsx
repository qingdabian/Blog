import Link from "next/link";
import Image from "next/image";
import { formatDate, type PostMeta } from "@/lib/posts";
import { gradientOf } from "@/lib/gradients";
import TagChip from "@/components/TagChip";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:ring-white/10">
      <Link href={`/posts/${post.slug}`} className="block">
        {post.coverImage ? (
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div
            className={`relative flex aspect-[3/2] items-end overflow-hidden bg-gradient-to-br p-4 ${gradientOf(post.cover)}`}
          >
            <span className="absolute -right-6 -top-8 h-28 w-28 rounded-full bg-white/15" />
            <span className="absolute right-10 top-6 h-10 w-10 rounded-full bg-white/10" />
            <span className="relative text-4xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
              {post.emoji}
            </span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
        <h2 className="mt-2.5 line-clamp-2">
          <Link
            href={`/posts/${post.slug}`}
            className="text-lg font-bold leading-snug text-zinc-900 transition-colors hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {post.description}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 text-xs text-zinc-400 dark:text-zinc-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} 分钟阅读</span>
        </div>
      </div>
    </article>
  );
}
