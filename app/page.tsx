import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { getAllNotes } from "@/lib/notes";
import { chipColorOf } from "@/lib/gradients";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();
  const notes = getAllNotes().slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="py-16 text-center sm:py-20">
        <h1 className="text-2xl font-black leading-relaxed tracking-wide sm:text-3xl">
          天高地迥，觉宇宙之无穷
          <br />
          兴尽悲来，识盈虚之有数
          <br />
          关山难越，谁悲失路之人
          <br />
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-400 bg-clip-text text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-500">
            萍水相逢，尽是他乡之客
          </span>
        </h1>
      </section>

      {notes.length > 0 && (
        <section className="pb-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold dark:text-zinc-100">最新随笔</h2>
            <Link
              href="/notes"
              className="text-sm font-medium text-zinc-900 transition hover:text-zinc-500 dark:text-zinc-100 dark:hover:text-zinc-300"
            >
              全部随笔 →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Link
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="group rounded-2xl bg-card p-4 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:ring-white/10"
              >
                <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                  <time dateTime={note.date}>{formatDate(note.date)}</time>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${chipColorOf(note.mood)}`}
                  >
                    {note.mood}
                  </span>
                </div>
                <h3 className="mt-2 line-clamp-1 text-sm font-bold text-zinc-900 transition-colors group-hover:text-zinc-500 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                  {note.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="pb-16">
        <h2 className="mb-5 text-xl font-bold dark:text-zinc-100">最新文章</h2>
        {posts.length === 0 ? (
          <p className="py-20 text-center text-zinc-400 dark:text-zinc-500">
            还没有文章，去 content/posts 目录添加第一篇吧
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
