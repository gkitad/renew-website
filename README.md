# Renew Mobile Car Detailing: website

A multi-page, fully static website for Renew, a mobile car detailing service in North Austin, TX.
Next.js 16 (App Router) + TypeScript + CSS Modules, exported to plain HTML/CSS/JS.

> **Status: under construction.** Business details, packages, prices and add-ons come from Renew's
> published price sheet. Photography is still licensed sample imagery, and hours are not set yet.
> See **Before launch** below.

## Run it

Requires Node.js 20.9+.

```bash
npm install
npm run dev          # http://localhost:3000 (live reload)
npm run build        # static site in ./out
npm start            # serve ./out at http://localhost:3000
```

## Checks

```bash
npm run lint         # ESLint (next/core-web-vitals + TypeScript)
npm run typecheck    # tsc --noEmit
npm test             # Vitest: form validation & submission logic
npm run build && npm run test:e2e   # Playwright: navigation, menu, FAQ, lightbox, form, axe WCAG 2.2 AA
```

To test the form delivery paths, build with an endpoint and pass the same value to the tests
(the endpoint is mocked; nothing is sent):

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://forms.example.test/estimate npm run build
E2E_FORM_ENDPOINT=https://forms.example.test/estimate npm run test:e2e
```

## Where things live

| What | File |
| --- | --- |
| Business facts, nav, SEO defaults, launch switch | `src/content/site.ts` |
| Packages, prices by vehicle size, add-ons | `src/content/services.ts` |
| Process steps, FAQ, principles, gallery projects, reviews | `src/content/pages.ts` |
| Every image (swap photos here) | `src/content/assets.ts` |
| Design tokens (white/black/gold palette, Montserrat type scale, spacing, motion) | `src/app/globals.css` |
| Font: Montserrat (self-hosted, OFL) | `src/app/fonts.ts`, `src/fonts/` |
| Booking form UI / validation / message / sending | `src/components/EstimateForm.tsx`, `src/lib/validation.ts`, `src/lib/submit.ts` |
| Creative direction | `docs/CREATIVE_DIRECTION.md` |

Pages: `/`, `/services/`, `/services/[slug]/` (6), `/process/`, `/gallery/`, `/about/`, `/faq/`, `/contact/`, `/privacy/`, 404, plus `sitemap.xml` and `robots.txt`.

## Before launch (checklist)

1. **Photography**: replace the sample images with Renew's own photos (see below) and add real
   projects to `projects` in `src/content/pages.ts` (use `beforeAfter` only for true matched pairs).
2. **Hours**: set in `contact.hours` (and `contact.openingHours` for search engines) in `src/content/site.ts`. Currently Monday to Saturday 8:00 AM to 8:00 PM, Sunday 2:00 PM to 8:00 PM.
3. **Logo**: the header uses a text wordmark; replace `src/components/Wordmark.tsx` with the real logo SVG.
4. **Copy**: review the About page (`src/app/about/page.tsx`, including the owner introduction) and the
   process/FAQ text in `src/content/pages.ts`.
5. **Reviews**: add genuine reviews (with permission) to `testimonials`; the section appears automatically.
6. **Domain**: set `NEXT_PUBLIC_SITE_URL` (canonical URLs, sitemap, social cards).
7. **Go live**: set `launchReady: true` in `src/content/site.ts`. This removes the construction bar and
   "to confirm" markers, hides unknown FAQ answers, allows search indexing, and adds LocalBusiness
   structured data.

Prices live in one place (`src/content/services.ts`); a unit test checks them against the price sheet,
so update the test too when prices change.

## Photography

All current images are licensed Unsplash photos (free for commercial use) and are **samples, not
the business's work**; they are captioned "Sample photography" wherever that could be implied.
To replace one, put the file in `public/images/`, then in `src/content/assets.ts` change its `src`
to `/images/<file>`, update `width`/`height`/`alt` and set `sample: false`. Pre-size local photos
(≈2400px long edge, WebP/JPEG ~80%): the static export does not resize local files.
Unsplash images are resized on Unsplash's CDN by `src/lib/imageLoader.ts`.

## Booking form

Booking is by text or Instagram DM, so the form works **without any backend**:

- It validates the details (vehicle size, make/model, name required) and composes a message.
- "Open in Messages" opens the phone's texting app to (512) 775-2131 with the message filled in;
  "Copy message" + "Open Instagram DM" covers desktop and Instagram. Nothing is sent by the website,
  and the page says so.
- Optional: set `NEXT_PUBLIC_FORM_ENDPOINT` (e.g. a free Formspree form) to also receive requests by
  email. Phone then becomes required, and success is shown **only** when the endpoint returns 2xx.
- A honeypot field filters basic spam.

## Deploy

It is a static site: any static host works. Recommended: **Vercel** (import the Git repo; framework
preset Next.js; add the two environment variables). Netlify/Cloudflare Pages: build command
`npm run build`, publish directory `out`. `trailingSlash` is on, so every page is `/<page>/index.html`.
