export interface TimelineEntry {
  year: number;
  title: string;
  description?: string;
  // Optional link to a story, e.g. '/stories/first-move-to-singapore/'.
  href?: string;
}

// Initial outline supplied by the author; replace or expand whenever you like.
export const timeline: TimelineEntry[] = [
  { year: 1994, title: '出生' },
  { year: 2004, title: '小学时的一些故事', description: '一些留在小学时光里的片段。' },
  { year: 2012, title: '学生时代' },
  { year: 2016, title: '本科时光' },
  { year: 2017, title: '来到新加坡', description: '第一次搬到新加坡。' },
  { year: 2019, title: '来到上海' },
  { year: 2026, title: '一些新的开始', description: '继续生活，也继续记录。' },
];
