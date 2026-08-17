import { SITE, BUSINESS } from '../data/business.js';

/** Title: keep under ~60 chars so Google does not rewrite it. */
export function buildTitle(page, { withBrand = true } = {}) {
  const brand = BUSINESS.name;
  if (!page) return `${brand} — ${BUSINESS.tagline}`;
  const full = withBrand ? `${page} | ${brand}` : page;
  return full.length > 62 && withBrand ? page : full;
}

/** Description: 140-160 chars is the safe render window. */
export function clampDescription(text, max = 158) {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

export const canonical = (path) => `${SITE.url}${path === '/' ? '/' : path}`;

/**
 * Every crawler we explicitly want, including the AI ones.
 * Split deliberately: training crawlers vs. live retrieval crawlers.
 * Blocking retrieval crawlers (OAI-SearchBot, PerplexityBot, ClaudeBot) removes you
 * from AI answers entirely — that is the mistake most sites make when they try to
 * "block AI". If you want to appear in ChatGPT/Copilot/Perplexity answers, these
 * must be allowed.
 */
export const AI_CRAWLERS = {
  retrieval: [
    'OAI-SearchBot',      // ChatGPT search results
    'ChatGPT-User',       // ChatGPT live browsing on user request
    'PerplexityBot',      // Perplexity index
    'Perplexity-User',    // Perplexity live fetch
    'ClaudeBot',          // Claude index + citations
    'Claude-User',        // Claude live browsing
    'Claude-SearchBot',
    'Google-Extended',    // Gemini grounding / AI Overviews
    'Applebot-Extended',  // Apple Intelligence
    'Amazonbot',
    'Bingbot',            // Bing + Copilot
    'DuckAssistBot',
    'cohere-ai',
    'MistralAI-User',
    'meta-externalagent',
    'YouBot',
  ],
  training: ['GPTBot', 'CCBot', 'anthropic-ai', 'Meta-ExternalFetcher', 'Applebot'],
};
