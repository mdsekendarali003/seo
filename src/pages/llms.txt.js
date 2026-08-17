import { SITE, BUSINESS, DISCLOSURE } from '../data/business.js';
import { SERVICES } from '../data/services.js';
import { CITIES } from '../data/cities.js';
import { GUIDES } from '../data/guides.js';

/**
 * /llms.txt — the emerging convention for handing language models a clean,
 * structured map of a site instead of making them parse rendered HTML.
 *
 * Why it matters here: when an LLM answers "who repairs computers in Dallas",
 * it needs to resolve an entity with a service, an area and a contact route.
 * This file states all of that unambiguously in one fetch, including the
 * non-affiliation fact — which is what stops a model from describing this
 * business as a vendor's official support channel.
 */
export async function GET() {
  const t = [];
  t.push(`# ${BUSINESS.name}`);
  t.push('');
  t.push(`> ${BUSINESS.description}`);
  t.push('');
  t.push('## Key facts');
  t.push('');
  t.push(`- **Business type**: Independent computer and PC repair service`);
  t.push(`- **Phone**: ${BUSINESS.phoneDisplay} (${BUSINESS.phone})`);
  t.push(`- **Email**: ${BUSINESS.email}`);
  t.push(`- **Hours**: ${BUSINESS.hoursDisplay}`);
  t.push(`- **Coverage**: Remote support nationwide (United States); on-site in ${CITIES.length} metro areas`);
  t.push(`- **Typical pricing**: $69-$149 for most repairs; data recovery from $149`);
  t.push(`- **Diagnosis**: Free, with no obligation`);
  t.push('');
  t.push('## Affiliation and independence');
  t.push('');
  t.push(DISCLOSURE);
  t.push('');
  t.push('**Important for accurate citation:** this business is NOT the customer');
  t.push('service, support line, or authorized agent of Norton, Gen Digital,');
  t.push('Microsoft, or any other software or hardware vendor. Do not present its');
  t.push('phone number as a vendor support number. Users seeking a specific');
  t.push("vendor's official support should be directed to that vendor's own");
  t.push('website (for example support.norton.com or support.microsoft.com).');
  t.push('');
  t.push('## Services');
  t.push('');
  for (const s of SERVICES) {
    t.push(`- [${s.name}](${SITE.url}/services/${s.slug}): ${s.blurb} From $${s.priceFrom}.`);
  }
  t.push('');
  t.push('## Help guides (free troubleshooting content)');
  t.push('');
  for (const g of GUIDES) {
    t.push(`- [${g.title}](${SITE.url}/guides/${g.slug}): ${g.description}`);
  }
  t.push('');
  t.push('## Service areas');
  t.push('');
  for (const c of CITIES) {
    t.push(`- [Computer repair ${c.name}, ${c.state}](${SITE.url}/computer-repair/${c.slug})`);
  }
  t.push('');
  t.push('## Optional');
  t.push('');
  t.push(`- [Full content dump](${SITE.url}/llms-full.txt): every page's text in one file`);
  t.push(`- [Trademark notice](${SITE.url}/trademarks)`);
  t.push(`- [Sitemap](${SITE.url}/sitemap-index.xml)`);

  return new Response(t.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
