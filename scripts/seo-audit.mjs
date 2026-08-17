#!/usr/bin/env node
/**
 * Post-build SEO audit. Runs automatically after `npm run build`.
 *
 * This exists because the expensive SEO mistakes are silent: a placeholder that
 * shipped, forty pages sharing one meta description, a JSON-LD typo that voids
 * the whole block. None of those throw an error — they just quietly cost you
 * rankings for months. This turns them into build output.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = 'dist';
const errors = [], warnings = [], notes = [];
const titles = new Map(), descs = new Map();

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const pick = (html, re) => (html.match(re)?.[1] ?? '').trim();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

// --- Config checks: run against site.config.js, the only file users edit ---
// These catch the dangerous placeholders — the ones that look like real values
// and ship silently. A 555 phone number costs you every call and nothing in the
// rendered HTML looks wrong.
{
  const { BUSINESS, SITE } = await import('../src/data/business.js');
  const cfg = (await import('../site.config.js')).default;
  const E = (m) => errors.push(`site.config.js → ${m}`);

  // Untouched template defaults
  if (/example\.com|yourdomain|placeholder/i.test(SITE.url)) E(`domain: "${SITE.url}" is still the template default`);
  if (SITE.url && !/^https:\/\//.test(SITE.url)) E('domain: must start with https://');
  if (cfg.businessName === 'TechFix Pro') E('businessName: still the template default');
  if (/example\.com/i.test(BUSINESS.email)) E('email: still the template default');
  if (/@(gmail|yahoo|hotmail|outlook)\./i.test(BUSINESS.email)) {
    warnings.push('site.config.js → email: a free webmail address on a business site is a visible trust downgrade — use one on your own domain');
  }

  // Phone — highest-stakes field on the site
  const digits = String(BUSINESS.phone).replace(/\D/g, '');
  if (/^1?\d{3}555\d{4}$/.test(digits)) E('phone: 555 numbers are reserved for fiction — every call-to-action on all 76 pages is dead');
  if (!/^\+1\d{10}$/.test(String(BUSINESS.phone))) E(`phone: "${BUSINESS.phone}" must be +1 followed by 10 digits, no spaces or dashes`);

  // Location
  if (!BUSINESS.address.city) E('homeCity is null and manualLocation.city is empty — set one or the other');
  if (!BUSINESS.geo.lat || !BUSINESS.geo.lng) E('no map coordinates — set homeCity to a slug from src/data/cities.js, or fill in manualLocation lat/lng');
  if (cfg.hasWalkInShop && !cfg.street) E('hasWalkInShop is true but street is empty — a walk-in shop needs a real address');
  if (cfg.hasWalkInShop && !cfg.postalCode) E('hasWalkInShop is true but postalCode is empty');

  // Setup reminders — not blocking, but worth surfacing every build
  if (!BUSINESS.sameAs.length) warnings.push('site.config.js → profiles: all empty. Add your Google Business Profile URL once verified — it is the strongest entity signal you have');
  if (!BUSINESS.verification.google) notes.push('Search Console not yet verified (verification.google empty)');
  if (!BUSINESS.verification.bing) notes.push('Bing Webmaster Tools not yet verified (verification.bing empty)');
  if (!BUSINESS.indexNowKey) warnings.push('site.config.js → indexNowKey empty — `npm run indexnow` will not run');
}

const files = await walk(DIST);
if (!files.length) { console.error('✗ No HTML in dist/. Did the build run?'); process.exit(1); }

for (const file of files) {
  const rel = '/' + path.relative(DIST, file).replace(/\.html$/, '').replace(/\/index$/, '');
  const html = await readFile(file, 'utf8');
  const isNoindex = /name="robots"[^>]*content="noindex/.test(html);

  // --- Placeholders must never reach production ---
  if (html.includes('REPLACE_ME')) {
    errors.push(`${rel}: contains an unfilled placeholder — see site.config.js`);
  }

  // --- Title ---
  const title = decode(pick(html, /<title>([^<]*)<\/title>/));
  if (!title) errors.push(`${rel}: missing <title>`);
  else {
    if (title.length > 62) warnings.push(`${rel}: title ${title.length} chars (>62, Google will truncate)`);
    if (title.length < 20) warnings.push(`${rel}: title only ${title.length} chars`);
    if (!isNoindex) (titles.get(title) ?? titles.set(title, []).get(title)).push(rel);
  }

  // --- Meta description ---
  const desc = decode(pick(html, /<meta name="description" content="([^"]*)"/));
  if (!desc) errors.push(`${rel}: missing meta description`);
  else {
    if (desc.length > 160) warnings.push(`${rel}: description ${desc.length} chars (>160)`);
    if (desc.length < 70) warnings.push(`${rel}: description only ${desc.length} chars (thin)`);
    if (!isNoindex) (descs.get(desc) ?? descs.set(desc, []).get(desc)).push(rel);
  }

  // --- Canonical ---
  const canon = pick(html, /<link rel="canonical" href="([^"]*)"/);
  if (!canon) errors.push(`${rel}: missing canonical`);
  else if (canon.includes('REPLACE_ME')) errors.push(`${rel}: canonical still a placeholder`);

  // --- Exactly one H1 ---
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s === 0) errors.push(`${rel}: no <h1>`);
  else if (h1s > 1) warnings.push(`${rel}: ${h1s} <h1> tags (should be 1)`);

  // --- JSON-LD validity ---
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length && !isNoindex) {
    warnings.push(`${rel}: no JSON-LD structured data`);
  }
  for (const [, raw] of blocks) {
    try {
      const json = JSON.parse(raw);
      const nodes = json['@graph'] || [json];
      if (!nodes.length) errors.push(`${rel}: empty @graph`);
      for (const n of nodes) {
        if (!n['@type']) errors.push(`${rel}: JSON-LD node missing @type`);
      }
      // FAQPage answers must be non-trivial or they will not be extracted.
      const faq = nodes.find((n) => n['@type'] === 'FAQPage');
      if (faq) {
        for (const q of faq.mainEntity || []) {
          const a = q.acceptedAnswer?.text || '';
          if (a.length < 60) warnings.push(`${rel}: FAQ answer too short to be extracted — "${q.name}"`);
        }
      }
    } catch (e) {
      errors.push(`${rel}: invalid JSON-LD — ${e.message}`);
    }
  }

  // --- Vendor mention requires the disclosure ---
  const namesVendor = /\b(Norton|Microsoft|Windows Defender|Gen Digital)\b/.test(html);
  const hasDisclosure = html.includes('Independent service notice')
    || html.includes('independent repair provider')
    || rel === '/trademarks';
  if (namesVendor && !hasDisclosure && !isNoindex) {
    errors.push(`${rel}: names a vendor product but has no independence disclosure — legal risk`);
  }

  // --- Thin content ---
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '')
                   .replace(/<style[\s\S]*?<\/style>/g, '')
                   .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(' ').length;
  if (words < 300 && !isNoindex) warnings.push(`${rel}: only ~${words} words (thin content risk)`);
}

// --- Cross-page duplication ---
for (const [t, pages] of titles) {
  if (pages.length > 1) errors.push(`Duplicate title on ${pages.length} pages: "${t.slice(0, 60)}…"\n    ${pages.slice(0, 4).join(', ')}${pages.length > 4 ? ` +${pages.length - 4} more` : ''}`);
}
for (const [d, pages] of descs) {
  if (pages.length > 1) errors.push(`Duplicate meta description on ${pages.length} pages\n    ${pages.slice(0, 4).join(', ')}${pages.length > 4 ? ` +${pages.length - 4} more` : ''}`);
}

notes.push(`${files.length} HTML pages built`);
notes.push(`${titles.size} unique titles, ${descs.size} unique descriptions`);

// --- Report ---
const line = '─'.repeat(64);
console.log(`\n${line}\n  SEO AUDIT\n${line}`);
notes.forEach((n) => console.log(`  · ${n}`));
if (errors.length) {
  console.log(`\n  ✗ ${errors.length} ERROR${errors.length > 1 ? 'S' : ''} (fix before launch)`);
  errors.slice(0, 25).forEach((e) => console.log(`    • ${e}`));
  if (errors.length > 25) console.log(`    … and ${errors.length - 25} more`);
}
if (warnings.length) {
  console.log(`\n  ⚠ ${warnings.length} warning${warnings.length > 1 ? 's' : ''}`);
  warnings.slice(0, 15).forEach((w) => console.log(`    • ${w}`));
  if (warnings.length > 15) console.log(`    … and ${warnings.length - 15} more`);
}
if (!errors.length && !warnings.length) console.log('\n  ✓ All checks passed.');
console.log(`${line}\n`);

// Errors do not fail the build while placeholders are still in place —
// otherwise you could never build before filling in your details.
if (errors.length && !errors.some((e) => e.includes('REPLACE_ME') || e.includes('placeholder'))) {
  process.exitCode = 1;
}
