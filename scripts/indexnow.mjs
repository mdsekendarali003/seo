#!/usr/bin/env node
/**
 * IndexNow submission — instant indexing for Bing, Microsoft Copilot, Yandex,
 * Seznam and Naver from a single POST.
 *
 * This is the fastest lever available for the "Microsoft" half of the goal.
 * Bing normally takes days to weeks to discover new pages by crawling. IndexNow
 * pushes them, and pages typically appear within hours. Because Copilot is
 * grounded on the Bing index, faster Bing indexing means faster Copilot presence.
 *
 * Google does not participate in IndexNow — for Google, use Search Console and
 * the sitemap, which this project already emits.
 *
 * Setup:
 *   1. node -e "console.log(crypto.randomUUID().replace(/-/g,''))"
 *   2. Put that value in src/data/business.js as indexNowKey
 *   3. npm run build   (writes public/<key>.txt automatically via this script)
 *   4. npm run indexnow
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const { SITE, BUSINESS } = await import('../src/data/business.js');

const key = BUSINESS.indexNowKey?.trim();
const host = new URL(SITE.url).host;

if (!key) {
  console.error('✗ No indexNowKey set in src/data/business.js');
  console.error('  Generate one:  node -e "console.log(crypto.randomUUID().replace(/-/g,\'\'))"');
  process.exit(1);
}
if (SITE.url.includes('REPLACE_ME')) {
  console.error('✗ SITE.url is still a placeholder. Set your real domain first.');
  process.exit(1);
}

// The key file must be reachable at https://host/<key>.txt or submissions are rejected.
const keyFile = path.join('public', `${key}.txt`);
await writeFile(keyFile, key, 'utf8');
console.log(`✓ Key file written: ${keyFile}`);

// Read the built sitemap for the URL list.
const sitemapPath = path.join('dist', 'sitemap-0.xml');
if (!existsSync(sitemapPath)) {
  console.error('✗ dist/sitemap-0.xml not found — run `npm run build` first.');
  process.exit(1);
}
const xml = await readFile(sitemapPath, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!urls.length) {
  console.error('✗ No URLs found in sitemap.');
  process.exit(1);
}

// IndexNow caps a single submission at 10,000 URLs.
const batches = [];
for (let i = 0; i < urls.length; i += 10000) batches.push(urls.slice(i, i + 10000));

for (const [i, batch] of batches.entries()) {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${SITE.url}/${key}.txt`,
      urlList: batch,
    }),
  });
  const label = `batch ${i + 1}/${batches.length} (${batch.length} URLs)`;
  // 200 = accepted, 202 = accepted pending key validation. Both are success.
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ Submitted ${label} — HTTP ${res.status}`);
  } else {
    console.error(`✗ Failed ${label} — HTTP ${res.status}: ${await res.text()}`);
    process.exitCode = 1;
  }
}
console.log(`\nDone. ${urls.length} URLs pushed to Bing / Copilot / Yandex / Seznam.`);
