import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  posts.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
  return rss({
    title: 'Paweł Kowaluk | Flash Fiction',
    description: 'Flash fiction, poetry, and short stories',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.body.slice(0, 100),
      link: `${import.meta.env.BASE_URL}/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
