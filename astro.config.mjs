import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://sighandfiction.com',
  build: {
    format: 'file',
  },
  integrations: [preact(), pagefind()],
});
