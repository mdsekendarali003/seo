import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/data/business.js';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // Priority signals: money pages > city pages > guides
      serialize(item) {
        const u = item.url;
        if (u === SITE.url + '/') item.priority = 1.0;
        else if (/\/(computer|pc)-repair\//.test(u)) item.priority = 0.9;
        else if (/\/services\//.test(u)) item.priority = 0.8;
        else if (/\/guides\//.test(u)) item.priority = 0.7;
        else item.priority = 0.5;
        item.changefreq = /guides/.test(u) ? 'monthly' : 'weekly';
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
});
