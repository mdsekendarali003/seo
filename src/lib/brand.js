/**
 * Single source of truth for the logo mark.
 *
 * The navbar logo and the favicon are the SAME artwork, defined once here.
 * Previously they were two separate hand-written SVGs, which is how a site ends
 * up with a tab icon that looks nothing like its header — the two drift the
 * moment either is touched.
 */
import config from '../../site.config.js';

/** Darken a hex colour by `amount` (0-1). Used for the mark's shaded face. */
export function darken(hex, amount = 0.22) {
  const h = String(hex).replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(((n >> 16) & 255) * (1 - amount));
  const g = clamp(((n >> 8) & 255) * (1 - amount));
  const b = clamp((n & 255) * (1 - amount));
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

export const BRAND_COLOR = config.brandColor || '#f0a028';
export const BRAND_SHADE = darken(BRAND_COLOR, 0.22);
export const NAVY_COLOR = config.navyColor || '#1b2a54';

/** The mark: an A-frame chevron. Drawn on a 32x32 grid. */
export const MARK_VIEWBOX = '0 0 32 32';
export const MARK_FRONT = 'M16 2 30 29H19.5L16 21.5 12.5 29H2L16 2z';
export const MARK_SHADE = 'M16 2 30 29H19.5L16 21.5 16 2z';

/**
 * Standalone SVG markup for the mark.
 * `padded` insets it on a 40x40 canvas — favicons render at 16px, where artwork
 * touching the edges reads as a smudge. `bg` paints a plate behind it, which the
 * tab strip needs but the header does not.
 */
export function markSvg({ size = 32, bg = null, padded = false, radius = 0 } = {}) {
  const vb = padded ? '-4 -4 40 40' : MARK_VIEWBOX;
  const plate = bg
    ? `<rect x="-4" y="-4" width="40" height="40" rx="${radius}" fill="${bg}"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${size}" height="${size}">` +
    plate +
    `<path d="${MARK_FRONT}" fill="${BRAND_COLOR}"/>` +
    `<path d="${MARK_SHADE}" fill="${BRAND_SHADE}"/>` +
    `</svg>`;
}
