import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  site: 'https://pensjonatus.github.io',
  base: '/pensjonatus'
  integrations: [preact()],
});
