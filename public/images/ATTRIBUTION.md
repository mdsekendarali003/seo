# Image sources

All images are from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license) — free for commercial use,
no attribution required (credit is appreciated, not obligatory).

They are **downloaded and self-hosted**, not hotlinked. Hotlinking would add an
external request to the LCP path and put your hero image outside your control.

| File | Unsplash photo ID |
|---|---|
| `hero.*` | `photo-1581091226825-a6a2a5aee158` |
| `about-1.*` | `photo-1517430816045-df4b7de11d1d` |
| `about-2.*` | `photo-1597852074816-d933c7d2b988` |
| `service-printer.*` | `photo-1612815154858-60aa4c59eaa6` |
| `service-network.*` | `photo-1544197150-b99a580bb7a8` |
| `service-hardware.*` | `photo-1555617981-dac3880eac6e` |

Each has a `.webp` (served first) and a `.jpg` (fallback).

## Replace these with your own photos

Stock imagery is a placeholder, not a destination. Real photos of your actual
workbench, van, storefront and team outperform stock for a local business:
Google Business Profile rewards genuine imagery, and visitors recognise stock
instantly — it reads as "could be anyone", which is the opposite of what a local
trust decision needs.

To swap: drop your files in this folder and point `site.config.js` → `images` at
them (path without the extension). Keep the hero around 1600px wide and under
~250KB, since it is your Largest Contentful Paint element.

`service-*` images are downloaded and ready but not yet placed in a template —
they are there for when you add imagery to the service pages.
