// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.seniorandlivingtoday.com',
  // Old WordPress URLs all ended in "/", so keep trailing slashes for consistent canonicals.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|404|read\/[^/]+)\//.test(page), // reader pages are noindex (content behind sign-up)
    }),
  ],
});
