/**
 * DERIVED business data — you should not need to edit this file.
 * Edit ../../site.config.js instead.
 *
 * This layer turns the flat values in site.config.js into the shapes the rest of
 * the site needs: E.164 + display phone from one input, state and coordinates
 * looked up from a city slug, empty profile URLs dropped, address omitted when
 * there is no walk-in shop.
 */
import config from '../../site.config.js';
import { CITIES } from './cities.js';

/* ── helpers ─────────────────────────────────────────────────────── */

/** '+12145551234' → '(214) 555-1234'. Falls back to the raw input if unparseable. */
function formatPhone(e164) {
  const d = String(e164 || '').replace(/\D/g, '').replace(/^1/, '');
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : String(e164 || '');
}

/** Resolve location from the city slug, or fall back to manualLocation. */
function resolveLocation() {
  if (config.homeCity) {
    const c = CITIES.find((x) => x.slug === config.homeCity);
    if (c) {
      return { city: c.name, region: c.state, regionName: c.stateName, lat: c.lat, lng: c.lng };
    }
    // Bad slug: surface it loudly rather than silently shipping wrong coordinates.
    throw new Error(
      `site.config.js: homeCity "${config.homeCity}" is not a known city slug.\n` +
      `  Valid slugs are listed in src/data/cities.js (e.g. 'dallas-tx', 'phoenix-az').\n` +
      `  If your city is not there, set homeCity: null and fill in manualLocation.`
    );
  }
  const m = config.manualLocation || {};
  return { city: m.city, region: m.region, regionName: m.regionName, lat: m.lat, lng: m.lng };
}

const loc = resolveLocation();
const url = String(config.domain || '').replace(/\/+$/, '');   // strip trailing slash

/* ── exports ─────────────────────────────────────────────────────── */

export const SITE = {
  url,
  locale: 'en_US',
  lang: 'en',
  themeColor: config.navyColor || '#1b2a54',
  brandColor: config.brandColor || '#f0a028',
  // Empty string when not configured — Base.astro checks this and renders
  // nothing at all, so a site with no ad campaign ships zero extra bytes.
  googleAdsId: String(config.googleAdsId || '').trim(),
  images: {
    hero:   config.images?.hero   || '/images/hero',
    about1: config.images?.about1 || '/images/about-1',
    about2: config.images?.about2 || '/images/about-2',
  },
};

export const BUSINESS = {
  name: config.businessName,
  legalName: config.legalName || config.businessName,
  tagline: config.tagline,
  description: config.description,
  foundingDate: `${config.foundingYear || 2019}-01-01`,

  phone: config.phone,
  phoneDisplay: formatPhone(config.phone),
  email: config.email,

  // hasWalkInShop is the inverse of serviceAreaBusiness — the config phrases it
  // as a plain question, the schema layer wants the technical flag.
  serviceAreaBusiness: !config.hasWalkInShop,
  address: {
    street: config.street || '',
    city: loc.city,
    region: loc.region,
    regionName: loc.regionName,
    postalCode: config.postalCode || '',
    country: 'US',
  },
  geo: { lat: loc.lat, lng: loc.lng },

  hours: config.hours,
  hoursDisplay: config.hoursDisplay,
  priceRange: config.priceRange,
  currency: 'USD',
  paymentAccepted: config.paymentAccepted,

  // Drop unset profiles — a sameAs pointing nowhere is worse than no sameAs.
  sameAs: Object.values(config.profiles || {}).map((s) => String(s || '').trim()).filter(Boolean),

  verification: config.verification || {},
  indexNowKey: config.indexNowKey || '',
};

export const VENDORS = {
  norton: {
    name: 'Norton',
    owner: 'Gen Digital Inc.',
    officialSupport: 'https://support.norton.com',
  },
  microsoft: {
    name: 'Microsoft',
    owner: 'Microsoft Corporation',
    officialSupport: 'https://support.microsoft.com',
  },
  windows: {
    name: 'Windows',
    owner: 'Microsoft Corporation',
    officialSupport: 'https://support.microsoft.com/windows',
  },
};

export const DISCLOSURE =
  `${BUSINESS.name} is an independent repair provider. We are not affiliated with, ` +
  `endorsed by, authorized by, or an agent of any software or hardware manufacturer. ` +
  `All product and company names are trademarks of their respective owners and are ` +
  `used here for identification only. For warranty or account service, contact the ` +
  `vendor directly using the official link on this page.`;
