# Computer Repair SEO Site

Static Astro site built for local + AI search visibility. 76 pages: 52 city pages,
10 service pages, 6 troubleshooting guides, plus trust pages.

```bash
npm install
npm run dev        # local preview
npm run build      # build + automatic SEO audit
npm run indexnow   # push URLs to Bing / Copilot / Yandex
```

---

## 1. Before you launch — fill in `site.config.js`

**`site.config.js` in the project root is the only file you need to edit.** Everything
else derives from it — all 76 pages, every schema block, robots.txt, llms.txt, sitemap.

Six required values, then you are live:

| Field | What to put |
|---|---|
| `domain` | Your domain, no trailing slash. Pick www or non-www and keep it forever |
| `businessName` | Must match your Google Business Profile **character for character** |
| `legalName` | Registered entity. No LLC? Just repeat `businessName` |
| `phone` | `+1` then 10 digits, e.g. `'+12145551234'` |
| `email` | On your own domain — a gmail address is a visible trust downgrade |
| `homeCity` | A slug from `src/data/cities.js`, e.g. `'houston-tx'` |

**Things that fill themselves in, so you cannot get them wrong:**

- **Display phone.** You type `+17138820199` once; `(713) 882-0199` is generated from it.
  They can never drift out of sync.
- **State, state name and map coordinates.** Set `homeCity: 'houston-tx'` and Texas plus
  the correct lat/lng are looked up for you. Not in the 52-city list? Set `homeCity: null`
  and fill in `manualLocation`.
- **Empty social profiles** are dropped automatically — a `sameAs` pointing at a profile
  that does not exist is worse than none.
- **An IndexNow key** is already generated and in place.

`hasWalkInShop` matters: leave it `false` unless customers physically visit you. Claiming
a storefront in cities where you have no premises is the most common cause of Google
Business Profile suspension.

Run `npm run build` and the audit names any field you missed, in plain English:

```
✗ 4 ERRORS (fix before launch)
  • site.config.js → domain: "https://example.com" is still the template default
  • site.config.js → phone: 555 numbers are reserved for fiction — every
    call-to-action on all 76 pages is dead
```

The audit deliberately catches placeholders that *look* real. A 555 phone number renders
perfectly and kills every call on the site, so it is a hard error, not a warning.

**NAP consistency.** Your name, address and phone must match *character for character*
everywhere you appear online — Google Business Profile, Bing Places, Yelp, Facebook, BBB.
`Suite 200` vs `Ste 200` registers as a different business and splits your ranking signal.
Set the format once in `site.config.js` and copy-paste from there everywhere else.

## 2. The thing that actually determines whether you rank

**Your website is maybe 20% of local ranking. Google Business Profile is most of the rest.**

The screenshot you started from shows Norton's own entity being surfaced because Google
has decided Norton *is* the answer for "Norton". You cannot shortcut into being an
entity. But for `computer repair Dallas` the top result is the **map pack**, and the map
pack is fed by Google Business Profile — not by your HTML.

Do these in order. Steps 1–3 matter more than everything in this repo combined:

1. **Google Business Profile** — [business.google.com](https://business.google.com).
   Verify by postcard/video. Pick primary category **Computer Repair Service**. Set your
   service area. Add real photos of your actual premises, van, or workbench. Post weekly.
2. **Reviews.** This is the single biggest local ranking factor after proximity. Ask every
   satisfied customer, by text, with a direct link, the same day you fix their machine.
   Reply to all of them. Aim for 30+ in the first quarter. Never buy reviews — Google
   detects clusters and it is how profiles get suspended.
3. **Bing Places** — [bingplaces.com](https://www.bingplaces.com). Ten minutes, imports
   from Google, and it is what feeds Microsoft Copilot's local answers. Almost nobody
   bothers, which is exactly why it is worth doing.
4. **Apple Business Connect** — [businessconnect.apple.com](https://businessconnect.apple.com).
   Covers Apple Maps and Siri.
5. **Citations.** Consistent NAP on Yelp, BBB, Angi, Thumbtack, Nextdoor, YellowPages,
   Apple Maps, Facebook.
6. **Search Console + Bing Webmaster Tools.** Verify both, submit
   `https://yourdomain.com/sitemap-index.xml`. Put the verification tokens in
   `business.js` → `verification`.

> **Honest warning about the 52 city pages.** Programmatic city pages rank when the
> business has genuine presence in those markets. Fifty-two pages with nothing behind them
> but a swapped city name is what Google's spam policy calls *doorway pages*, and the March
> 2024 scaled-content update was built to catch exactly that. Launch with the 3–5 metros you
> can actually serve, add real local proof to each (named technician, local reviews, local
> case studies, real response times), and expand only as coverage becomes real. The template
> supports all 52 — that is a ceiling, not a launch plan.

---

## 3. Getting into AI answers (Google AI Overviews, Copilot, ChatGPT, Perplexity)

This is the part your screenshot was really about, and it works differently from blue links.

**What is already built in:**

| Mechanism | Where | Why it works |
|---|---|---|
| `/llms.txt` | `src/pages/llms.txt.js` | Structured site summary models read in one fetch instead of parsing HTML |
| `/llms-full.txt` | `src/pages/llms-full.txt.js` | Entire site content, plain text, zero parsing |
| AI crawlers **allowed** | `src/pages/robots.txt.js` | Blocking `OAI-SearchBot`/`PerplexityBot`/`ClaudeBot` removes you from AI answers entirely |
| Connected `@graph` JSON-LD | `src/lib/schema.js` | One cross-referenced entity per page, not scattered fragments |
| `FAQPage` on every page | 65 Q&A pairs total | Pre-segmented question→answer pairs are the easiest thing for a retriever to lift |
| Answer-first `.answer-box` | Top of every page | A complete standalone answer in the first passage |
| `max-snippet:-1` | `Base.astro` | Removes the snippet length cap; default settings cost you the citation |
| `speakable` | `Base.astro` | Voice assistant selection |

**The content rule that matters most:** lead with a direct, complete answer, then explain.
An LLM extracting your page frequently reads only the first passage. "Virus removal costs
$89–$149 and takes 1–3 hours" gets quoted. "At TechFix Pro, we understand how frustrating
malware can be…" does not.

**IndexNow** (`npm run indexnow`) is the fastest lever for the Microsoft side. Bing normally
takes days to weeks to discover pages; IndexNow pushes them and they typically appear within
hours. Copilot is grounded on the Bing index, so faster Bing indexing means faster Copilot
presence. Google does not participate — for Google, use Search Console.

---

## 4. What I did not build, and why

Your keyword list had two groups that needed different treatment.

**Built in full:** all 52 city keywords, and the generic service terms
(`virus removal toll free number`, `printer support toll free number`,
`IT support toll free number`, and so on). These describe what you actually do. They are
yours to compete for.

**Not built:** pages targeting `Norton support number`, `Norton toll free number`,
`Norton customer service number`, `Microsoft 365 support toll free number` and the rest of
the brand-support block, with your number in the position Norton's occupies in your
screenshot.

Three separate reasons, any one of which is decisive:

- **Legal.** Ranking your number for a vendor's support query so callers believe they have
  reached the vendor is the fact pattern in FTC tech-support-fraud actions
  (*FTC v. Click4Support*, *FTC v. Elite IT*). Liability is personal, not just corporate.
- **It would not survive.** Microsoft and Gen Digital both run active brand-protection
  programs that specifically hunt this pattern. Google's site reputation abuse policy and
  Bing's equivalent demote it. Domains doing this get deindexed, typically within months —
  after you have paid to build them.
- **It is unnecessary.** The people you actually want are already served by what is here.
  Someone searching `Norton won't open` has a problem you can fix and money to spend.
  Someone searching `Norton customer service number` wants their *billing* fixed, which
  needs vendor account access you do not have — they are a bad lead even if you catch them.

**What replaces it:** `/guides/` targets the same searchers through their actual problems —
`antivirus-wont-open-or-install`, `windows-defender-turned-off`,
`outlook-keeps-asking-for-password`. Each names the product (lawful nominative use), carries
a machine-readable non-affiliation notice, and routes billing and account questions to the
vendor. Every vendor page is audited for that disclosure at build time; a missing one is a
hard build error.

`/guides/how-to-spot-a-tech-support-scam` is doing double duty on purpose. It ranks for high-
volume queries, it is the strongest trust signal you can publish, and it is the clearest way
to demonstrate you are not the thing people are worried about. Keep it prominent.

---

## 5. Design, theme and animation

The UI is a navy + amber service-trade layout: utility bar, sticky header, photo
hero with a gradient scrim, feature cards overlapping the hero, and a service grid
with one highlighted card.

**Colours** come from `site.config.js` → `brandColor` (accent) and `navyColor`
(dark surfaces). Change those two and the whole site follows — nothing hardcodes a
colour.

**Dark/light toggle** sits in the header and handles three states: explicit dark,
explicit light, and "follow the OS" when the visitor has never chosen. The choice
persists in `localStorage`. An inline script in `<head>` applies the saved theme
*before first paint* — a deferred script would let dark-mode users see a white
flash on every page load.

**Scroll animations** fade and lift each section as it enters the viewport, with
staggered children in grids. Three deliberate constraints:

- **Invisible content is impossible.** The hidden state lives behind a `js-reveal`
  class that JavaScript adds. No JS, a script error, or a crawler that skips JS —
  nothing is ever hidden. Verified by rendering with JavaScript disabled.
- **The hero `<h1>` is never animated.** It is almost certainly your Largest
  Contentful Paint element, and fading it in delays LCP by exactly the animation
  duration. Supporting hero elements animate; the headline paints immediately.
- **Zero layout shift.** Only `opacity` and `transform` animate — both are
  compositor-only, so Cumulative Layout Shift stays at 0.

`prefers-reduced-motion: reduce` disables all of it. That is a real accessibility
requirement, not a nicety — scroll animation is genuinely unpleasant for people
with vestibular disorders.

**Icons.** The header logo, favicon, `favicon.ico`, Apple touch icon and PWA
icons are all generated from one definition in `src/lib/brand.js`, so they cannot
drift apart — change `brandColor` in `site.config.js` and every one of them
follows. The favicon is padded and plated because a bare mark bleeding to the
edges is unreadable at the 16px a browser tab actually renders. The Apple touch
icon is an opaque PNG because iOS paints transparency solid black on the home
screen. Regenerate the rasters with `npm run icons` after a colour change.

**Service-area map.** The homepage map is inline SVG, generated at build time by
`scripts/gen-map.mjs` from real city coordinates using the Albers USA projection
(which insets Alaska and Hawaii rather than leaving Honolulu off-canvas). Your
logo mark is the marker, defined once and instanced 52 times via `<use>`.

Run `npm run map` only if you change the city list.

**Why not a Google Maps embed:**

| | Google Maps JS | This SVG map |
|---|---|---|
| API key + billing | Required | None |
| Cost | ~$7 per 1,000 loads | Free |
| Page weight | ~200KB+ third-party JS | 14KB inline, 0 requests |
| SEO value of markers | None — not crawlable | 52 real `<a>` links |
| Custom logo marker | Needs a Map ID | Native |

That last row is the one that matters. The map sits *above* the text link list
rather than replacing it, because that list is how your 52 city pages get crawled
and receive authority from the homepage — swapping it for an embed would have
deleted 52 internal links and quietly undercut the whole city-page strategy.

If you specifically want Google's street-level tiles on the individual **city**
pages, that is a reasonable place for an embed, since each page has one location
and the map is genuinely informative there. You would need a Google Cloud
project with billing enabled and the Maps JavaScript API turned on.

**Images** are self-hosted Unsplash photos, served as WebP with a JPEG fallback
(40-58% smaller). See `public/images/ATTRIBUTION.md`. Replace them with photos of
your actual business when you can — stock reads as "could be anyone", which is
the opposite of what a local trust decision needs.

---

## 6. Project layout

```
site.config.js           ← THE ONLY FILE YOU EDIT (details, colours, images)
src/data/business.js     Derived from the config — no need to touch
src/data/cities.js       52 metros with real coordinates + neighborhoods
src/data/services.js     10 services, 46 FAQ pairs
src/data/guides.js       6 troubleshooting guides, 19 FAQ pairs
src/lib/schema.js        JSON-LD @graph builders
src/lib/seo.js           Titles, descriptions, AI crawler list
src/components/VendorDisclosure.astro   ← required on any vendor-mentioning page
scripts/seo-audit.mjs    Post-build validation (runs automatically)
scripts/indexnow.mjs     Bing/Copilot instant indexing
public/_redirects        pc-repair/* → computer-repair/* (301)
public/images/           Photos + ATTRIBUTION.md
src/styles/global.css    Design tokens, theme, animations
src/components/Icon.astro    Inline SVG icons (no external requests)
src/lib/brand.js         Logo mark — drives navbar AND every favicon size
scripts/gen-icons.mjs    Regenerates the PNG/ICO rasters
```

**Note on `/pc-repair/`:** `computer repair Dallas` and `PC repair Dallas` are the same
search intent, so building both as separate pages would make them compete with each other
and split the link equity. One page targets both; `/pc-repair/*` 301-redirects into
`/computer-repair/*` via `public/_redirects` (Netlify/Cloudflare) or `vercel.json` (Vercel).

---

## 7. Realistic timeline

| When | What to expect |
|---|---|
| Week 1 | Indexed in Bing within hours via IndexNow; Google within days |
| Weeks 2–6 | Long-tail guide traffic starts. Google Business Profile verification completes |
| Months 2–4 | Map pack movement in your real service area, driven by reviews |
| Months 4–8 | Competitive city terms become reachable — *if* you have local proof and reviews |
| Ongoing | AI citations follow topical authority; guides are what earn them |

Anyone promising page one in 30 days for `computer repair Dallas` is selling you something.

## 8. Maintenance

- Add one guide a month from questions customers actually ask on the phone
- Update `updated:` in `guides.js` when you revise one — freshness is a real signal
- Re-run `npm run indexnow` after each deploy
- Watch Search Console **Queries** monthly; write a guide for anything ranking 8–20
- Keep NAP identical everywhere, forever
