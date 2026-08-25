#!/bin/bash
set -e
cd ~/Blog

# globals.css：改为自托管字体
sed -i 's|^@import "tailwindcss";|@import "@fontsource/noto-sans-sc/chinese-simplified-400.css";\n@import "@fontsource/noto-sans-sc/chinese-simplified-700.css";\n@import "@fontsource/noto-sans-sc/latin-400.css";\n@import "@fontsource/noto-sans-sc/latin-700.css";\n@import "@fontsource/geist-mono/index.css";\n@import "tailwindcss";|' app/globals.css
sed -i 's|--font-sans: var(--font-noto-sans-sc), ui-sans-serif, system-ui, sans-serif;|--font-sans: "Noto Sans SC", ui-sans-serif, system-ui, sans-serif;|' app/globals.css
sed -i 's|--font-mono: var(--font-geist-mono), ui-monospace, "SF Mono", monospace;|--font-mono: "Geist Mono", ui-monospace, "SF Mono", monospace;|' app/globals.css

# layout.tsx：备份后重写（移除 next/font/google）
cp app/layout.tsx app/layout.tsx.bak
cat > app/layout.tsx << 'LAYOUT_EOF'
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";
import "highlight.js/styles/github-dark.min.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "zh_CN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
LAYOUT_EOF

echo "=== fix done ==="
echo "fontsource imports: $(grep -c 'fontsource' app/globals.css)"
echo "next/font remains: $(grep -c 'next/font' app/layout.tsx || true)"
echo "package.json fontsource: $(grep -c 'fontsource' package.json || true)"
