import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeRaw from 'rehype-raw';
import { siteConfig } from './site.config.mjs';
import rehypeBasePaths from './src/lib/rehype-base-paths.mjs';

export default defineConfig({
  site: siteConfig.site,
  base: siteConfig.base,
  trailingSlash: 'always',
  output: 'static',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      rehypePlugins: [
        [rehypeRaw, { passThrough: ['mdxjsEsm', 'mdxFlowExpression', 'mdxTextExpression', 'mdxJsxFlowElement', 'mdxJsxTextElement'] }],
        rehypeBasePaths,
      ],
    }),
    shikiConfig: { theme: 'github-light' },
  },
});
