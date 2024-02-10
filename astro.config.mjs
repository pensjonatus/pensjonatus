import preact from '@astrojs/preact';
import sitemap from "@astrojs/sitemap";
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://sighandfiction.com',
  build: {
    format: 'file'
  },
  integrations: [preact(), pagefind(), sitemap()]
});