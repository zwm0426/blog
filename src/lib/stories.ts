import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from '../../site.config.mjs';

export type Story = CollectionEntry<'stories'>;

export async function getStories() {
  const stories = await getCollection('stories', ({ data }) => import.meta.env.DEV || !data.draft);
  return stories.sort((a, b) => b.data.storyDate.getTime() - a.data.storyDate.getTime() || a.id.localeCompare(b.id));
}

export function getRecentlyWritten(stories: Story[], limit = 3) {
  return [...stories]
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
      || b.data.writtenAt.getTime() - a.data.writtenAt.getTime()
      || b.data.storyDate.getTime() - a.data.storyDate.getTime()
      || a.id.localeCompare(b.id))
    .slice(0, limit);
}

export function groupByYear(stories: Story[]) {
  const years = new Map<number, Story[]>();
  for (const story of stories) {
    const year = story.data.storyDate.getUTCFullYear();
    years.set(year, [...(years.get(year) ?? []), story]);
  }
  return [...years].sort(([a], [b]) => b - a);
}

export const storyUrl = (story: Story) => withBase(`/stories/${story.id}/`);
export const numericDate = (date: Date) => date.toISOString().slice(0, 10).replaceAll('-', '.');
export const storyDateLabel = (story: Story) => story.data.storyDateLabel ?? numericDate(story.data.storyDate);
export const chineseDate = (date: Date) => {
  const [year, month, day] = date.toISOString().slice(0, 10).split('-').map(Number);
  return `${year} 年 ${month} 月 ${day} 日`;
};
