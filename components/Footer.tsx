import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-8 text-center text-sm text-zinc-400 dark:border-white/10 dark:text-zinc-500">
      <p>
        © {new Date().getFullYear()} {siteConfig.name} · Powered by Next.js
      </p>
      <p className="mt-1">
        <Link
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          GitHub
        </Link>
      </p>
    </footer>
  );
}
