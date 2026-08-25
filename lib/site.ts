export const siteConfig = {
  name: "Griffin Blog",
  title: "Griffin Blog — 萍水相逢，尽是他乡之客",
  description: "一个使用 Next.js + TypeScript + Tailwind CSS 搭建的个人博客，分享技术笔记与生活随笔。",
  author: "博主",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: "https://github.com/qingdabian",
} as const;
