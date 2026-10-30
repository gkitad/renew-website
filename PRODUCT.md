# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People in North Austin, TX who want their car detailed without taking it anywhere. Most visitors arrive on a phone (from Instagram, a text link or a search), so the phone is the primary design target; desktop is secondary.

Their job on the site: understand the packages and what they cost for their vehicle size, trust that the work is done well, and book quickly by text or Instagram DM.

## Product Purpose

The marketing and booking site for Renew Mobile Car Detailing, a mobile detailing business. Success means a visitor on a phone can see the right package and price for their car and start a booking (text or DM) within a minute.

## Positioning

Fully mobile: Renew comes to where the car is parked. Clear packages priced by vehicle size, with add-ons for specific needs.

## Operating Context

- Booking happens by text to (512) 775-2131 or Instagram DM to @renew.cardetailing. The site's booking form composes a ready-to-send text message; it does not send anything itself unless a form endpoint is configured.
- Service area: North Austin, TX and nearby.
- Hours: Monday to Saturday 8:00 AM to 8:00 PM; Sunday 2:00 PM to 8:00 PM.

## Capabilities and Constraints

- Packages (from the client's price sheet, starting prices by vehicle size: Sedan/Coupe, SUV/Crossover, 3-row SUV/Truck):
  - Interior Detail: $170 / $200 / $220. The featured, most popular package; always listed first.
  - Express In & Out: $120 / $150 / $180.
  - Full Detail: $220 / $250 / $300.
- Add-ons (starting at): pet hair removal $50, headlight restoration $90, trim restoration $80, ceramic coating application (dashboard, leather seats, glass/windshield) $50, odor elimination (ozone) $50.
- Stack: Next.js static export, TypeScript, CSS Modules, deployed on Vercel from GitHub (gkitad/renew-website). Content lives in `src/content/`.
- The site is under construction: photography is licensed Unsplash sample imagery, clearly labelled, until the client supplies real work photos.

## Brand Commitments

- Name: Renew Mobile Car Detailing. Tagline: "Your car. Renewed."
- Official logo: script "Renew" with a four-point sparkle and "MOBILE CAR DETAILING" underneath. Vector versions in `public/brand/`; original in `docs/renew-logo-original.jpg`.
- Client-required palette: white, black and gold only. Gold used sparingly for accents.
- Client-required typography: Montserrat as the primary typeface.
- Interior Detail must be first and marked "Most popular".
- Public copy in English. Never use the em dash. Copy must sound human and precise, not AI-written.

## Evidence on Hand

- Real: business name, logo, packages, prices, add-ons, hours, phone, Instagram handle.
- Not yet available: real work photos, before/after pairs, customer reviews, owner photo or bio. Never fabricate testimonials, ratings, project stories, guarantees or years of experience.

## Product Principles

1. Phone first: every decision is judged at phone width before desktop.
2. Price clarity: a visitor should see the price for their vehicle size without hunting.
3. One tap to book: text and DM are always within reach.
4. Honest by default: no invented claims; sample imagery stays labelled until replaced.

## Accessibility & Inclusion

WCAG 2.2 AA: contrast, keyboard access, visible focus, 44px minimum touch targets on phones, reduced-motion support.
