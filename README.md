# 一些小事 · Small Histories

一个以中文为主的个人故事 archive，保存回忆、照片和人生中的小片段。使用 Astro、TypeScript、Markdown / MDX 和原生 CSS，输出纯静态网页，没有数据库、登录或浏览器端框架。

目标地址：<https://zwm0426.github.io/blog/>

## 本地运行

推荐 Node.js 24 LTS（有 nvm 时可先执行 `nvm use`）。

```sh
npm install
npm run dev
```

打开终端提示的地址，通常为 `http://localhost:4321/blog/`。

```sh
npm run build    # TypeScript / Astro 检查，然后生成 dist/
npm run verify   # 检查生成的 HTML、RSS、sitemap 中的站内路径与文件
npm run preview # 预览 production build，不显示草稿
```

提交 `package-lock.json`。GitHub Actions 使用 `npm ci` 安装相同版本。

## 写第一篇文章

在 `src/content/stories/` 新建 `my-first-story.md`。文件名就是 URL：`/blog/stories/my-first-story/`。可以复制现有文章作为模板，日期和简介均可修改。初始四篇都是短示例；请在正式发表前核对日期，或将不想公开的示例改为草稿。

```md
---
title: "一台科学计算器的故事"
storyDate: 2004-01-01
storyDateLabel: "2004 → 2026"
writtenAt: 2026-10-07
publishedAt: 2026-10-07
# updatedAt: 2026-10-10
# location: "西安 / New York"
description: "关于一台计算器，以及一些小时候的事。"
# cover: "/images/calculator.jpg"
# coverAlt: "放在书桌上的科学计算器"
# coverCaption: "为照片写一句说明。"
draft: true
tags:
  - memory
  - childhood
---

从这里开始，写自己的故事。

## 一个小标题

正文可以分成多个自然段。

> 一句想记住的话。
```

`title`、`storyDate`、`writtenAt` 和 `publishedAt` 必填：

- `storyDate` 是故事发生的机器可读日期，决定生命档案中的年份和顺序。只知道年份时可写该年的 `01-01`，再用 `storyDateLabel` 显示更准确的人类表述。
- `storyDateLabel` 可选，例如 `2004`、`2004 → 2026` 或 `Summer 2017`。省略时显示完整的 `storyDate`。
- `writtenAt` 是文章写成的日期，文章页会显示“写于……”。
- `publishedAt` 决定首页“最近写下”和 RSS 的排序及时间。
- `updatedAt` 和 `location` 可选；有更新日期时文章页会显示“更新于……”，地点与故事时间并列展示。

主 Stories 档案始终按 `storyDate` 倒序并按其年份分组；“最近写下”只是按 `publishedAt` 提供的辅助入口。`draft` 默认为 `false`，`tags` 默认为空。

`draft: true` 在 `npm run dev` 下带草稿标记预览；production build 不会生成该文章页面，也不会出现在首页、Stories、相邻文章导航、RSS 或 sitemap 中。准备好发表时改为 `draft: false`。**草稿仍是仓库文件；公开仓库里的 Markdown 可以被别人读取。**

### 图片、链接与 MDX

图片放进 `public/images/`。不需要封面时直接省略 `cover`。Markdown 正文里用：

```md
![照片的具体描述](/images/calculator.jpg)

[读另一篇故事](/stories/2004-heartbeat-winner/)
```

正文中以 `/` 开头的普通 Markdown 图片和链接会在构建时自动补上 `/blog`，不要在内容中手写部署域名。不要把文件系统路径 `public/images/...` 当作网页地址。

需要图注时可在 `.md` 中使用：

```html
<figure>
  <img src="/images/calculator.jpg" alt="放在书桌上的计算器" loading="lazy" />
 <figcaption>这张照片的说明。</figcaption>
</figure>
```

文章正文保持适合中文阅读的窄栏。需要让某张图延伸到更宽的版心时，在 `figure` 上添加 `class="wide"`：

```html
<figure class="wide">
  <img src="/images/calculator.jpg" alt="放在书桌上的计算器" loading="lazy" />
  <figcaption>这张照片的说明。</figcaption>
</figure>
```

也支持 `.mdx`。MDX 的 JSX 属性需要显式使用路径工具（普通 Markdown 链接仍会自动处理）：

```mdx
import { withBase } from '../../../site.config.mjs';

<figure>
  <img src={withBase('/images/calculator.jpg')} alt="计算器" />
  <figcaption>一张照片的说明。</figcaption>
</figure>
```

示例导入路径适用于直接放在 `src/content/stories/` 下的文件。优先用普通 Markdown，便于长期迁移。

## 编辑其他内容

- 时间线：`src/data/timeline.ts`，首页刻度会同步变化；可添加 `description` 或可选文章 `href`。
- About 与联系方式占位：`src/pages/about.astro`。
- 首页介绍：`src/pages/index.astro`。
- 网站名称、域名和 base：`site.config.mjs`。
- 字体、颜色与响应式排版：`src/styles/global.css`。
- Favicon：`public/favicon.svg`。

## GitHub Pages 部署

1. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 将本项目文件（包含 `package-lock.json` 和 `.github/workflows/deploy.yml`）提交并 push 到 `main`。
3. 在 **Actions** 查看 `Deploy to GitHub Pages`，完成后访问 <https://zwm0426.github.io/blog/>。也可以手动运行 workflow。

工作流使用 GitHub 官方的 `configure-pages`、`upload-pages-artifact`、`deploy-pages` actions，权限已配置。不要选择从分支目录部署源码。源码仓库需满足 GitHub Pages 的可用条件，工作流也需要处于启用状态。

部署配置遵循 [Astro 的 GitHub Pages 文档](https://docs.astro.build/en/guides/deploy/github/)。`astro.config.mjs` 从 `site.config.mjs` 读取 `site` 和 `base`，CSS、站内导航、封面、正文路径、canonical、RSS 与 sitemap 使用同一部署前缀。

### 更改 GitHub 用户名 / 仓库名

修改 `site.config.mjs`：

```js
site: 'https://YOUR_USERNAME.github.io',
base: '/YOUR_REPOSITORY',
```

现在已经根据 Git remote 设置为 `zwm0426` 和 `/blog`，没有待替换的 username placeholder。

### 使用自定义域名

将 `site` 改为完整域名（例如 `https://example.com`），`base` 改为 `/`。在 `public/CNAME` 中写入域名（不含 `https://`），在 GitHub Pages 设置 Custom domain，并按 GitHub 提示配置 DNS 和 HTTPS。重新 build、verify 并部署。普通内容链接无需修改。

## 主要结构

```text
site.config.mjs             网站元数据与路径配置
astro.config.mjs            Astro、MDX、sitemap、Markdown 配置
src/content.config.ts       文章 frontmatter schema
src/content/stories/        Markdown / MDX 故事
src/data/timeline.ts        时间线数据
src/layouts/               HTML、导航、SEO 和页脚
src/components/            按年份分组的故事目录
src/pages/                 首页、归档、文章、时间线、About、RSS、404
src/styles/global.css      原生 CSS
public/images/             自己拥有使用权的图片
.github/workflows/         GitHub Pages 自动部署
```

以后迁移时带走 Markdown、图片和时间线数据即可，`dist/` 也能部署到其他静态托管服务。
