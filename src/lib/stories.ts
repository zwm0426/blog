import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from '../../site.config.mjs';

export type Story = CollectionEntry<'stories'>;

export async function getStories() {
  const stories = await getCollection('stories', ({ data }) => import.meta.env.DEV || !data.draft);
  return stories.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

export function groupByYear(stories: Story[]) {
  const years = new Map<number, Story[]>();
  for (const story of stories) {
    const year = story.data.year ?? story.data.date.getUTCFullYear();
    years.set(year, [...(years.get(year) ?? []), story]);
  }
  return [...years].sort(([a], [b]) => b - a);
}

export const storyUrl = (story: Story) => withBase(`/stories/${story.id}/`);
export const dateLabel = (date: Date) => date.toISOString().slice(0, 10).replaceAll('-', '.');
