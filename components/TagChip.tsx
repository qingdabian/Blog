import Link from "next/link";
import { chipColorOf } from "@/lib/gradients";

export default function TagChip({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium transition hover:opacity-75 ${chipColorOf(tag)}`}
    >
      {tag}
    </Link>
  );
}
