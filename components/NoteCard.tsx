import Link from "next/link";
import { formatDate } from "@/lib/posts";
import type { NoteMeta } from "@/lib/notes";
import { chipColorOf } from "@/lib/gradients";
import TagChip from "@/components/TagChip";

/** 随笔条目：时间轴节点 + 卡片 */
export default function NoteCard({ note }: { note: NoteMeta }) {
  return (
    <div className="group relative pl-10">
      <span className="absolute left-0 top-7 h-3 w-3 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 ring-4 ring-background transition-transform duration-300 group-hover:scale-125 dark:from-zinc-500 dark:to-zinc-300" />
      <Link
        href={`/notes/${note.slug}`}
        className="block rounded-2xl bg-card p-6 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:ring-white/10"
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 dark:text-zinc-500">
          <time dateTime={note.date}>{formatDate(note.date)}</time>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${chipColorOf(note.mood)}`}
          >
            {note.mood}
          </span>
          <span>{note.readingTime} 分钟阅读</span>
        </div>
        <h2 className="mt-2.5 text-lg font-bold text-zinc-900 transition-colors group-hover:text-zinc-500 dark:text-zinc-100 dark:group-hover:text-zinc-300">
          {note.title}
        </h2>
        <p className="mt-1.5 line-clamp-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          {note.description}
        </p>
        {note.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {note.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}
