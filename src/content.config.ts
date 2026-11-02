import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),                 // on-page H1
    seoTitle: z.string().optional(),   // <title>, if different from the H1 (keep under ~60 chars)
    description: z.string(),           // meta description, 140-160 chars
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),      // /images/... file
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
