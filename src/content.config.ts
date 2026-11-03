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
    video: z.string().optional(),      // YouTube id of Courtney's video this article is based on
    situation: z.string().optional(),  // short 'When…' label used on the Get Help page
    draft: z.boolean().default(false),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]), // shown on the page + FAQPage schema

  }),
});

export const collections = { blog };
