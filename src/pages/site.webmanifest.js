import { BUSINESS } from '../data/business.js';
import { BRAND_COLOR, NAVY_COLOR } from '../lib/brand.js';

/** Generated so name and colours track site.config.js automatically. */
/**
 * PWA short_name is what appears under the icon on a phone home screen —
 * roughly 15 characters before Android truncates it.
 * Taking the first word breaks on any name starting with an article
 * ("The Civil Desk" would label the icon "The"), so strip leading articles
 * and keep the whole name when it fits.
 */
function shortName(name) {
  const stripped = String(name).replace(/^(the|a|an)\s+/i, '').trim();
  return stripped.length <= 15 ? stripped : stripped.split(/\s+/)[0];
}

export async function GET() {
  return new Response(JSON.stringify({
    name: BUSINESS.name,
    short_name: shortName(BUSINESS.name),
    description: BUSINESS.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: NAVY_COLOR,
    theme_color: NAVY_COLOR,
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
}
