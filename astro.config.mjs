// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seniorandlivingtoday.com',
  // Old WordPress URLs all ended in "/", so keep trailing slashes for consistent canonicals.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|404)\//.test(page),
    }),
  ],
});
