import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stories' }),
  schema: z.object({
    title: z.string(),
    storyDate: z.coerce.date(),
    storyDateLabel: z.string().optional(),
    writtenAt: z.coerce.date(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().default(''),
    coverCaption: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { stories };
