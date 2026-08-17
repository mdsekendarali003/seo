/**
 * JSON-LD builders. Everything structured on this site is generated here so the
 * entity graph stays internally consistent.
 *
 * The design that matters: every page emits ONE @graph containing multiple nodes
 * cross-referenced by @id, rather than several disconnected <script> blocks.
 * Google and LLM retrievers resolve those @id references into a single connected
 * entity — "this Organization, at this place, offering this Service, answering
 * these questions" — which is far stronger than the same facts stated separately.
 */
import { SITE, BUSINESS, VENDORS, DISCLOSURE } from '../data/business.js';

const abs = (path = '/') => `${SITE.url}${path === '/' ? '' : path}`;

// Stable @id anchors. These strings are the joints of the graph — never randomise them.
export const ID = {
  org: abs('/#organization'),
  website: abs('/#website'),
  localBusiness: abs('/#localbusiness'),
  page: (p) => abs(p) + '#webpage',
  service: (s) => abs(`/services/${s}`) + '#service',
  city: (c) => abs(`/computer-repair/${c}`) + '#place',
  faq: (p) => abs(p) + '#faq',
  breadcrumb: (p) => abs(p) + '#breadcrumb',
};

const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: BUSINESS.address.street,
  addressLocality: BUSINESS.address.city,
  addressRegion: BUSINESS.address.region,
  postalCode: BUSINESS.address.postalCode,
  addressCountry: BUSINESS.address.country,
});

const openingHours = () =>
  BUSINESS.hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));

/** Organization — the root identity node every other node points back to. */
export function organization() {
  return {
    '@type': 'Organization',
    '@id': ID.org,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: abs('/'),
    description: BUSINESS.description,
    foundingDate: BUSINESS.foundingDate,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: postalAddress(),
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'technical support',
        areaServed: 'US',
        availableLanguage: ['English'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
    // Machine-readable independence statement. Search engines and LLMs read
    // disambiguatingDescription when deciding which entity a page represents —
    // this is what prevents the site being conflated with a vendor's own support.
    disambiguatingDescription: DISCLOSURE,
    knowsAbout: [
      'computer repair', 'virus removal', 'malware removal', 'Microsoft Windows troubleshooting',
      'printer setup', 'data recovery', 'network configuration', 'email configuration',
    ],
  };
}

/** WebSite node + sitelinks search box. */
export function website() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: abs('/'),
    name: BUSINESS.name,
    publisher: { '@id': ID.org },
    inLanguage: SITE.lang,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: abs('/search?q={search_term_string}') },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * LocalBusiness. `city` optional — when passed, emits a city-scoped variant used
 * on location pages so each one describes a distinct served area.
 * Uses ProfessionalService, which is the correct type for a service-area business
 * (ComputerRepairService is not a real schema.org type despite being widely copied).
 */
export function localBusiness(city = null) {
  const base = {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': city ? ID.city(city.slug) : ID.localBusiness,
    name: city ? `${BUSINESS.name} — ${city.name}, ${city.state}` : BUSINESS.name,
    description: city
      ? `Computer and PC repair in ${city.name}, ${city.stateName}. ${BUSINESS.description}`
      : BUSINESS.description,
    url: city ? abs(`/computer-repair/${city.slug}`) : abs('/'),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currency,
    paymentAccepted: BUSINESS.paymentAccepted.join(', '),
    parentOrganization: { '@id': ID.org },
    openingHoursSpecification: openingHours(),
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
  };

  if (city) {
    // Service-area business: state the area served, not a storefront in every city.
    // Claiming a physical address in a city you have no premises in is exactly what
    // triggers Google Business Profile suspensions.
    return {
      ...base,
      areaServed: {
        '@type': 'City',
        name: city.name,
        containedInPlace: { '@type': 'State', name: city.stateName },
      },
      geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
        geoRadius: '40000',
      },
    };
  }

  return {
    ...base,
    ...(BUSINESS.serviceAreaBusiness ? {} : { address: postalAddress() }),
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    areaServed: { '@type': 'Country', name: 'United States' },
  };
}

/** Service node with an offer catalogue. */
export function service(svc, city = null) {
  return {
    '@type': 'Service',
    '@id': city ? `${abs(`/computer-repair/${city.slug}`)}#service-${svc.slug}` : ID.service(svc.slug),
    name: city ? `${svc.name} in ${city.name}, ${city.state}` : svc.name,
    description: svc.blurb,
    serviceType: svc.name,
    provider: { '@id': ID.org },
    ...(city
      ? { areaServed: { '@type': 'City', name: city.name } }
      : { areaServed: { '@type': 'Country', name: 'United States' } }),
    offers: {
      '@type': 'Offer',
      priceCurrency: BUSINESS.currency,
      price: String(svc.priceFrom),
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: svc.priceFrom,
        priceCurrency: BUSINESS.currency,
        valueAddedTaxIncluded: false,
      },
      availability: 'https://schema.org/InStock',
      url: abs(`/services/${svc.slug}`),
    },
  };
}

/**
 * FAQPage — the highest-value block on the site for AI surfaces.
 * Rich-result eligibility narrowed in 2023, but this markup remains one of the
 * strongest signals for AI Overview and LLM answer extraction, because it hands
 * the retriever a pre-segmented question→answer pair with no parsing required.
 */
export function faqPage(faqs, pagePath) {
  return {
    '@type': 'FAQPage',
    '@id': ID.faq(pagePath),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** HowTo — used by troubleshooting guides. */
export function howTo({ name, description, steps, totalTime = 'PT30M', pagePath }) {
  return {
    '@type': 'HowTo',
    '@id': abs(pagePath) + '#howto',
    name,
    description,
    totalTime,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: abs(s.url) } : {}),
    })),
  };
}

export function breadcrumbs(trail, pagePath) {
  return {
    '@type': 'BreadcrumbList',
    '@id': ID.breadcrumb(pagePath),
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

/**
 * WebPage node. `speakable` marks which parts a voice assistant should read
 * aloud — cheap to add and still the only way to influence voice-answer selection.
 */
export function webPage({ path, title, description, datePublished, dateModified, primaryEntityId }) {
  return {
    '@type': 'WebPage',
    '@id': ID.page(path),
    url: abs(path),
    name: title,
    description,
    isPartOf: { '@id': ID.website },
    about: primaryEntityId ? { '@id': primaryEntityId } : { '@id': ID.org },
    inLanguage: SITE.lang,
    datePublished: datePublished || BUSINESS.foundingDate,
    dateModified: dateModified || new Date().toISOString().slice(0, 10),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-speakable]'],
    },
  };
}

/** Article node for guides — establishes authorship, which feeds E-E-A-T. */
export function article({ path, headline, description, datePublished, dateModified }) {
  return {
    '@type': 'TechArticle',
    '@id': abs(path) + '#article',
    headline,
    description,
    author: { '@id': ID.org },
    publisher: { '@id': ID.org },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: { '@id': ID.page(path) },
    inLanguage: SITE.lang,
  };
}

/**
 * Vendor mention node. When a guide discusses a third-party product, we name the
 * product as a subject the article is ABOUT and link to the vendor's own support.
 * That is the structural difference between writing about a product and
 * impersonating its support channel.
 */
export function vendorMention(vendorKey) {
  const v = VENDORS[vendorKey];
  if (!v) return null;
  return {
    '@type': 'SoftwareApplication',
    '@id': abs(`/#vendor-${vendorKey}`),
    name: v.name,
    applicationCategory: 'SecurityApplication',
    publisher: { '@type': 'Organization', name: v.owner, url: v.officialSupport },
  };
}

/** Assemble the final @graph. Drops nulls so callers can pass conditionals inline. */
export function graph(...nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes.flat().filter(Boolean) };
}
