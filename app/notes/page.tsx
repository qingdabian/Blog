import type { Metadata } from "next";
import { getAllNotes } from "@/lib/notes";
import NoteCard from "@/components/NoteCard";

export const metadata: Metadata = {
  title: "随笔",
  description: "碎碎念 · 生活记录",
};

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="mx-auto max-w-3xl px-4">
      <section className="py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
          碎碎念 · 生活记录
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          随笔
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          共{" "}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{notes.length}</span>{" "}
          篇随想
        </p>
      </section>

      <section className="pb-16">
        {notes.length === 0 ? (
          <p className="py-20 text-center text-zinc-400 dark:text-zinc-500">
            还没有随笔，去 content/notes 目录添加第一篇吧
          </p>
        ) : (
          <div className="relative space-y-8 before:absolute before:bottom-4 before:left-[5px] before:top-4 before:w-px before:bg-gradient-to-b before:from-zinc-300 before:to-zinc-400 dark:before:from-white/20 dark:before:to-white/10">
            {notes.map((note) => (
              <NoteCard key={note.slug} note={note} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
