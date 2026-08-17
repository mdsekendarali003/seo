import { markSvg } from '../lib/brand.js';

/**
 * Generated rather than a static file so it always matches the header logo and
 * the configured brandColor. Padded and plated: at 16px in a tab strip, a bare
 * mark bleeding to the edges is unreadable.
 */
export async function GET() {
  return new Response(markSvg({ size: 32, padded: true }), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=604800',
    },
  });
}
