import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-400 bg-clip-text text-7xl font-black text-transparent dark:from-white dark:via-zinc-300 dark:to-zinc-500">
        404
      </p>
      <h1 className="mt-4 text-xl font-bold dark:text-zinc-100">页面不存在</h1>
      <p className="mt-2 text-zinc-500 dark:text-zinc-400">你访问的页面可能已被移动或删除</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-r from-zinc-900 to-zinc-500 px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-90 dark:from-white dark:to-zinc-400 dark:text-zinc-900"
      >
        返回首页
      </Link>
    </div>
  );
}
