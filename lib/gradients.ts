/** 封面渐变：纯黑白灰系（key 为 front-matter 中 cover 字段的取值） */
export const gradients = {
  violet: "from-zinc-900 via-zinc-600 to-zinc-400",
  sky: "from-zinc-600 via-zinc-500 to-zinc-300",
  emerald: "from-zinc-700 via-zinc-500 to-zinc-300",
  amber: "from-stone-700 via-stone-500 to-stone-300",
  rose: "from-zinc-800 via-zinc-600 to-zinc-400",
  slate: "from-slate-500 via-slate-400 to-slate-300",
} as const;

export type GradientKey = keyof typeof gradients;

export function gradientOf(key: string): string {
  return gradients[key as GradientKey] ?? gradients.violet;
}

/** 标签徽章配色：黑白灰四档（深浅交替），按标签名哈希稳定取色 */
const chipColors = [
  "bg-zinc-100 text-zinc-700 dark:bg-white/10 dark:text-zinc-200",
  "bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900",
  "bg-zinc-200 text-zinc-700 dark:bg-white/15 dark:text-zinc-300",
  "bg-black/5 text-zinc-600 dark:bg-white/5 dark:text-zinc-400",
] as const;

export function chipColorOf(tag: string): string {
  let hash = 0;
  for (const ch of tag) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return chipColors[Math.abs(hash) % chipColors.length];
}
