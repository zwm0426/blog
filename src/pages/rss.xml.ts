import rss from '@astrojs/rss';
import { getRecentlyWritten, getStories, storyUrl } from '../lib/stories';
import { siteConfig, withBase } from '../../site.config.mjs';

export async function GET() {
  const publicStories = (await getStories()).filter(({ data }) => !data.draft);
  const stories = getRecentlyWritten(publicStories, publicStories.length);
  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: new URL(withBase('/'), siteConfig.site),
    items: stories.map((story) => ({
      title: story.data.title,
      pubDate: story.data.publishedAt,
      description: story.data.description ?? story.data.title,
      link: new URL(storyUrl(story), siteConfig.site).href,
      categories: story.data.tags,
    })),
    customData: '<language>zh-CN</language>',
  });
}
