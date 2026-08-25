# Griffin Blog

基于 Next.js + TypeScript + Tailwind CSS 的个人博客，乔巴粉 × 女帝紫红主题。

## 特性

- MDX 本地文件写作，front-matter 元数据 + 标签分类
- 文章卡片封面图展示（无图时回退多彩渐变块）
- 独立随笔频道（/notes，时间轴 + 心情标签）
- 代码高亮（rehype-highlight）、GFM 表格/任务列表
- Giscus 评论（环境变量注入配置）
- sitemap / robots / RSS 开箱即用
- Docker + Caddy 一键部署到 Ubuntu 服务器（自动 HTTPS）

## 本地开发

```bash
npm install
npm run dev
```

## 写作

在 `content/posts/` 下新建 `.mdx` 文件：

```yaml
---
title: 文章标题
date: 2026-08-24
description: 一句话摘要
tags:
  - Next.js
cover: violet       # violet / sky / emerald / amber / rose / slate
coverImage: /images/covers/example.svg  # 可选，卡片封面图（public 下路径）
emoji: 🚀
---
```

- `coverImage` 决定首页卡片的封面图（约 3:2），缺省时回退为 `cover` 渐变块
- 封面图放在 `public/images/covers/` 下，支持 svg / png / jpg
- slug（文件名）必须使用 ASCII 字符

## 随笔

在 `content/notes/` 下新建 `.md` 文件：

```yaml
---
title: 随笔标题
date: 2026-08-20
description: 一句话摘要
mood: 思考          # 心情标签，如 平静/思考/开心/夜晚
cover: violet
---
```

随笔独立展示在 `/notes` 时间轴页面，并出现在首页「最新随笔」区。

## 部署

见 [docs/deploy.md](docs/deploy.md)，核心流程：

```bash
cp .env.example .env  # 填写域名与 Giscus 参数
docker compose up -d --build
```
