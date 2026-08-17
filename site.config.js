/* ══════════════════════════════════════════════════════════════════════
   THE ONLY FILE YOU NEED TO EDIT

   Fill in the values below and the whole site updates — all 76 pages,
   every schema block, robots.txt, llms.txt and the sitemap.

   Run `npm run build` when done — it checks your values and tells you
   exactly what is missing or malformed.
   ══════════════════════════════════════════════════════════════════════ */

export default {

  /* ─── 1. REQUIRED — the basics ─────────────────────────────────── */

  // Your domain. No trailing slash. Pick www or non-www and stay with it forever.
  domain: 'https://cleanfeatures.com',

  // Trading name. This must match your Google Business Profile EXACTLY —
  // same spelling, same punctuation, same capitalisation.
  businessName: 'Clean Features',

  // Registered legal entity. Appears in the footer copyright and schema.
  // If you are a sole trader with no LLC, just repeat businessName here.
  legalName: 'Clean Features LLC',

  // Your phone, digits only, with country code. Example: '+12145551234'
  // The display format — (214) 555-1234 — is generated from this automatically,
  // so you only type the number once and the two can never drift apart.
  //
  // TIP: for local rankings a local area code beats a toll-free number.
  // Google treats a local number as a local relevance signal.
  phone: '+18208376461',

  // Business email on your own domain.
  email: 'support@cleanfeatures.com',


  /* ─── 2. REQUIRED — where you are ──────────────────────────────── */

  // Pick the slug of your home city from src/data/cities.js
  // (e.g. 'dallas-tx', 'houston-tx', 'phoenix-az').
  // This auto-fills your state, state name and map coordinates.
  //
  // Not in the list? Set this to null and fill in `manualLocation` below.
  homeCity: 'dallas-tx',

  // Only used when homeCity is null. Get lat/lng by right-clicking your
  // location in Google Maps — the coordinates are the first menu item.
  manualLocation: { city: '', region: '', regionName: '', lat: 0, lng: 0 },

  // Do customers physically visit you?
  //   true  = you have a walk-in shop customers come to
  //   false = you travel to them / remote only  ← most repair businesses
  //
  // Claiming a storefront in cities where you have no premises is the single
  // most common cause of Google Business Profile suspension.
  hasWalkInShop: false,

  // REQUIRED if hasWalkInShop is true; otherwise optional.
  street: '',
  postalCode: '',


  /* ─── 3. OPTIONAL — how you describe yourself ──────────────────── */

  tagline: 'Same-day computer, PC and laptop repair',

  description:
    'Independent computer and PC repair service offering virus and malware removal, ' +
    'Windows troubleshooting, printer setup, email and Microsoft 365 configuration, ' +
    'and remote support for home and small business users across the United States.',

  foundingYear: 2019,

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '20:00' },
    { days: ['Saturday', 'Sunday'], opens: '09:00', closes: '18:00' },
  ],

  hoursDisplay: 'Mon–Fri 8am–8pm, Sat–Sun 9am–6pm (local time)',

  priceRange: '$$',
  paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],


  /* ─── 4. OPTIONAL — your profiles elsewhere ────────────────────── */
  // Only fill in profiles that actually exist and link back to your site.
  // Empty ones are dropped automatically.

  profiles: {
    googleBusiness: '',
    bingPlaces: '',
    facebook: '',
    linkedin: '',
    yelp: '',
    instagram: '',
    bbb: '',
  },


  /* ─── 5. OPTIONAL — fill in as you set things up ───────────────── */

  verification: {
    google: '',   // Search Console → HTML tag method → the content="..." value
    bing: '',     // Bing Webmaster Tools → Meta tag option
    yandex: '',
  },

  // IndexNow key — instant indexing for Bing and Microsoft Copilot.
  indexNowKey: '3b68f8f05d6d4db88bbfc66ba8de7e82',


  /* ─── 6. Images ────────────────────────────────────────────────── */
  // Photos live in public/images/. Give the path WITHOUT the extension —
  // the site serves .webp and falls back to .jpg automatically.
  // Hero should be ~1600x900 and under ~250KB: it decides your LCP score.
  images: {
    hero: '/images/hero',
    about1: '/images/about-1',
    about2: '/images/about-2',
  },


  /* ─── 7. Theme ─────────────────────────────────────────────────── */

  // Accent colour for buttons, icons and the logo.
  // Run `npm run icons` after changing this to rebuild the favicons.
  brandColor: '#f0a028',

  // Dark colour for the top bar, footer and featured cards.
  navyColor: '#1b2a54',
};
