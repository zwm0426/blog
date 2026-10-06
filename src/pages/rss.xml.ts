import rss from '@astrojs/rss';
import { getStories, storyUrl } from '../lib/stories';
import { siteConfig, withBase } from '../../site.config.mjs';

export async function GET() {
  const stories = (await getStories()).filter(({ data }) => !data.draft);
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: new URL(withBase('/'), siteConfig.site),
    items: stories.map((story) => ({
      title: story.data.title,
      pubDate: story.data.date,
      description: story.data.description ?? story.data.title,
      link: new URL(storyUrl(story), siteConfig.site).href,
      categories: story.data.tags,
    })),
    customData: '<language>zh-CN</language>',
  });
}
