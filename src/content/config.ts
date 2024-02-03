import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    categories: z.array(z.string()),
  }),
});

export const collections = {
  posts: postCollection,
};
