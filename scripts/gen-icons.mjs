#!/usr/bin/env node
/**
 * Regenerates the raster icons from src/lib/brand.js.
 * Run after changing `brandColor` or `navyColor` in site.config.js:
 *     npm run icons
 *
 * The SVG favicon and the header logo are generated at build time and need no
 * step here — only the PNG/ICO rasters, which cannot be produced by Astro.
 * Requires Python with Pillow (pip3 install pillow).
 */
import { spawnSync } from 'node:child_process';
import { BRAND_COLOR, BRAND_SHADE, NAVY_COLOR } from '../src/lib/brand.js';

const py = `
from PIL import Image, ImageDraw
B, S, N = "${BRAND_COLOR}", "${BRAND_SHADE}", "${NAVY_COLOR}"
FRONT = [(16,2),(30,29),(19.5,29),(16,21.5),(12.5,29),(2,29)]
SHADE = [(16,2),(30,29),(19.5,29),(16,21.5)]

def render(px, pad_ratio=0.19, ss=8):
    W = px*ss
    im = Image.new('RGBA', (W,W), N)
    d = ImageDraw.Draw(im)
    pad = W*pad_ratio; scale = (W-2*pad)/32.0
    f = lambda pts: [(pad+x*scale, pad+y*scale) for x,y in pts]
    d.polygon(f(FRONT), fill=B); d.polygon(f(SHADE), fill=S)
    return im.resize((px,px), Image.LANCZOS)

render(180).convert('RGB').save('public/apple-touch-icon.png')
render(192).convert('RGB').save('public/icon-192.png')
render(512).convert('RGB').save('public/icon-512.png')
render(512, pad_ratio=0.30).convert('RGB').save('public/icon-maskable-512.png')
render(64).save('public/favicon.ico', sizes=[(16,16),(32,32),(48,48),(64,64)])
print('  regenerated: apple-touch-icon.png, icon-192, icon-512, icon-maskable-512, favicon.ico')
`;

const r = spawnSync('python3', ['-c', py], { stdio: 'inherit' });
if (r.status !== 0) {
  console.error('\n✗ Icon generation failed. Install Pillow:  pip3 install pillow');
  process.exit(1);
}
console.log(`✓ Icons rebuilt from brandColor ${BRAND_COLOR} on ${NAVY_COLOR}`);
