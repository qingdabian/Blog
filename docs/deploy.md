# Ubuntu 服务器部署指南

## 首次部署

1. **安装 Docker**（含 compose 插件）：

   ```bash
   curl -fsSL https://get.docker.com | sh
   ```

2. **克隆仓库**：

   ```bash
   git clone <你的仓库地址> myblog && cd myblog
   ```

3. **配置环境变量**：

   ```bash
   cp .env.example .env
   vim .env
   ```

   必填项：
   - `DOMAIN`：博客域名（需已解析到服务器 IP）
   - `NEXT_PUBLIC_SITE_URL`：站点完整 URL
   - Giscus 四个参数：在 [giscus.app](https://giscus.app) 按提示生成（不填则评论区显示占位提示）

4. **放行端口**（若使用 ufw）：

   ```bash
   sudo ufw allow 80,443/tcp
   ```

5. **构建并启动**：

   ```bash
   docker compose up -d --build
   ```

   首次启动 Caddy 会自动签发 HTTPS 证书，等待 1 分钟左右访问域名即可。

## 日常更新（发布新文章后）

```bash
git pull && docker compose up -d --build
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `docker compose ps` | 查看容器状态 |
| `docker compose logs -f` | 实时查看日志 |
| `docker compose down` | 停止服务 |
| `docker compose up -d` | 重启服务（无变更时） |

## 本地开发

```bash
npm install
npm run dev
```

访问 `http://localhost:3000`。若需本地启用评论，将 `.env` 中 Giscus 参数填好后重新启动 `npm run dev`。
