import { SITE, BUSINESS, DISCLOSURE } from '../data/business.js';
import { SERVICES } from '../data/services.js';
import { GUIDES } from '../data/guides.js';
import { CITIES } from '../data/cities.js';

/** Full-text variant: complete content in one fetch, no HTML parsing required. */
export async function GET() {
  const t = [];
  t.push(`# ${BUSINESS.name} — Full Content`);
  t.push(`> ${BUSINESS.description}`);
  t.push(`> Contact: ${BUSINESS.phoneDisplay} | ${BUSINESS.email} | ${BUSINESS.hoursDisplay}`);
  t.push('');
  t.push('## AFFILIATION NOTICE');
  t.push(DISCLOSURE);
  t.push('');
  t.push('---');
  t.push('');
  t.push('# SERVICES');
  for (const s of SERVICES) {
    t.push('');
    t.push(`## ${s.name}`);
    t.push(`URL: ${SITE.url}/services/${s.slug}`);
    t.push(`Starting price: $${s.priceFrom} USD`);
    t.push('');
    t.push(s.blurb);
    t.push('');
    t.push('### Symptoms');
    s.symptoms.forEach((x) => t.push(`- ${x}`));
    t.push('');
    t.push('### Our process');
    s.process.forEach(([n, d], i) => t.push(`${i + 1}. **${n}** — ${d}`));
    t.push('');
    t.push('### FAQ');
    s.faqs.forEach((f) => { t.push(`**Q: ${f.q}**`); t.push(`A: ${f.a}`); t.push(''); });
  }
  t.push('---');
  t.push('');
  t.push('# HELP GUIDES');
  for (const g of GUIDES) {
    t.push('');
    t.push(`## ${g.title}`);
    t.push(`URL: ${SITE.url}/guides/${g.slug}`);
    t.push(`Published: ${g.published} | Updated: ${g.updated}`);
    t.push('');
    t.push(`**Short answer:** ${g.answer}`);
    t.push('');
    if (g.vendors?.length) {
      t.push(`> NOTE: This guide discusses third-party products. ${BUSINESS.name} is independent and unaffiliated with those vendors.`);
      t.push('');
    }
    t.push('### Steps');
    g.steps.forEach((s, i) => t.push(`${i + 1}. **${s.name}** — ${s.text}`));
    if (g.vendorRouting) { t.push(''); t.push(`**Vendor-only matters:** ${g.vendorRouting}`); }
    t.push('');
    t.push('### FAQ');
    g.faqs.forEach((f) => { t.push(`**Q: ${f.q}**`); t.push(`A: ${f.a}`); t.push(''); });
  }
  t.push('---');
  t.push('');
  t.push('# SERVICE AREAS');
  t.push(`On-site service in ${CITIES.length} US metro areas; remote support nationwide.`);
  t.push('');
  for (const c of CITIES) {
    t.push(`- **${c.name}, ${c.state}** (${c.stateName}) — ${SITE.url}/computer-repair/${c.slug} — covering ${c.neighborhoods.join(', ')}`);
  }

  return new Response(t.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
