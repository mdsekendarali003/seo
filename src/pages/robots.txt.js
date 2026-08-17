import { SITE, BUSINESS } from '../data/business.js';
import { AI_CRAWLERS } from '../lib/seo.js';

/**
 * robots.txt, generated so the crawler list stays in one place.
 *
 * The key decision encoded here: AI retrieval crawlers are ALLOWED.
 * Many sites reflexively block everything with "AI" in the name and then wonder
 * why they never appear in ChatGPT, Copilot or Perplexity answers. Retrieval
 * crawlers are how you get cited in AI answers — blocking them is opting out of
 * the entire surface. Training crawlers are a separate, genuinely optional choice.
 */
export async function GET() {
  const lines = [];

  lines.push('# ' + BUSINESS.name);
  lines.push('# Full sitemap: ' + SITE.url + '/sitemap-index.xml');
  lines.push('# LLM-readable summary: ' + SITE.url + '/llms.txt');
  lines.push('');

  lines.push('User-agent: *');
  lines.push('Allow: /');
  lines.push('Disallow: /search');
  lines.push('Disallow: /*?*');            // keeps parameterised duplicates out of the index
  lines.push('');

  lines.push('# --- Search engines: explicit allow, no crawl delay ---');
  for (const bot of ['Googlebot', 'Googlebot-Image', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Applebot']) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
    lines.push('');
  }

  lines.push('# --- AI retrieval crawlers: ALLOWED ---');
  lines.push('# These fetch pages to answer user questions and cite sources.');
  lines.push('# Allowing them is what makes this site eligible to appear in');
  lines.push('# ChatGPT, Copilot, Gemini, Claude and Perplexity answers.');
  for (const bot of AI_CRAWLERS.retrieval) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
    lines.push('');
  }

  lines.push('# --- Model training crawlers ---');
  lines.push('# Allowed here. These do not drive traffic directly, but they do');
  lines.push('# influence whether a model knows this business exists at all.');
  lines.push('# To opt out of training only, change Allow to Disallow below —');
  lines.push('# it will NOT affect the retrieval crawlers above.');
  for (const bot of AI_CRAWLERS.training) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
    lines.push('');
  }

  lines.push('# --- Aggressive SEO scrapers: blocked to save crawl budget ---');
  for (const bot of ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'DataForSeoBot', 'BLEXBot']) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Disallow: /');
    lines.push('');
  }

  lines.push('Sitemap: ' + SITE.url + '/sitemap-index.xml');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
