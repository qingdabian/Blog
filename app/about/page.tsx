import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black dark:text-zinc-100">关于</h1>
      <div className="prose mt-8 max-w-none">
        <p>
          你好，我是 {siteConfig.author}，欢迎来到 {siteConfig.name}。
        </p>
        <p>
          这里是我的个人博客，主要记录三类内容：技术笔记（踩坑记录、源码阅读、
          工具链分享）、项目复盘（从 0 到 1 的过程与决策取舍），以及一些生活随笔。
        </p>
        <h2>关于本站</h2>
        <p>
          本站使用 Next.js + TypeScript + Tailwind CSS 搭建，文章以 MDX 编写，
          通过 Docker 部署在自己的 Ubuntu 服务器上，评论系统基于 GitHub
          Discussions（Giscus）。
        </p>
        <h2>联系方式</h2>
        <ul>
          <li>
            GitHub：
            <Link href={siteConfig.github}>{siteConfig.github}</Link>
          </li>
          <li>
            RSS：<Link href="/rss.xml">订阅文章更新</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
