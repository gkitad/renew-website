# Creative direction — "Under the light"

## What the references actually showed (inspected 27 Oct 2026)

Both sites were opened in a real browser; computed styles were read from the live DOM.

**Reference A — reflectionsperfection.com** (Elementor/WordPress, Montserrat + Poppins, sky-blue accent)
- Less "sophisticated" than the brief assumed: it is a conventional local-service template (promo pop-up, bar of icons, grey image cards, repeated "Start Your Quote").
- What *is* worth keeping: honest, hands-on photography (a person, foam, a real driveway) carries the trust, not the typography; a short, plain three-step process; pricing handled as "request a quote", which suits work that depends on vehicle condition.

**Reference B — shwash.co** (Proxima Nova, teal accent, rounded inset hero card, floating pill nav)
- Strong service-business UX: the offer is stated in the first line, the header always carries one primary action, the "where we work" tiles answer logistics before the visitor asks, pricing is explained by vehicle size, and the FAQ is grouped by concern.
- Weaknesses to avoid: every block is a rounded card, the CTA repeats constantly, review/blog areas contain placeholder copy, and the page is long before it gets to the point.

**Principles extracted**
1. Photography of the work itself builds more trust than claims (A).
2. Say what you do and how to start in the first screen; one primary action, always reachable (B).
3. Explain the process plainly — few steps, what the customer does at each (A + B).
4. Answer logistics and "it depends" questions honestly rather than hiding them (B).

## Original concept

Detailers judge paint under a raking inspection light: it reveals swirls that daylight hides. The site borrows that idea. Quiet, warm **paper-stone** surfaces read like a technical job sheet; **dark "booth" sections** hold the photography, as if the car has been rolled under the lamp. A single thin **gold line** (Renew's brand colour) — the "inspection light" — is the recurring graphic device: it sweeps once across the hero image, underlines section labels and marks focus and active states.

Not a black-and-gold template, not neon, not rounded cards. Precision comes from alignment, a numbered index system, plate captions and generous space.

## Typography & colour

- **Display:** Instrument Serif — large, tightly set, with italic for a single emphasised word. Editorial and warm; unusual in this category, which is the point.
- **Text & UI:** Archivo Variable (weight + width axes). Body at normal width; small labels use the *expanded* width in uppercase with tracking — a nod to automotive badging without imitating any marque.
- **Palette:** paper `#F3F0EA`, stone greys, warm near-black ink `#151412`, one accent taken from Renew's brand — brass `#7A5D1A` on light surfaces and gold `#D4B25A` on dark ones — used only for the light line, focus, active states, the sparkle and a few numerals. The base stays warm paper rather than black, so the gold reads as a detail, not a black-and-gold template.

## Photography

Low-key, controlled light, dark bodywork, gloved hands, foam, pads and reflections — one consistent grade throughout. All current images are licensed Unsplash photography used as **samples**; every plate that could be mistaken for the business's own work is captioned "Sample photography". Real project photos replace them through one manifest (`src/content/assets.ts`).

## Layout & interaction

- 12-column grid with deliberate asymmetry: editorial split hero, three-column package chooser with a vehicle-size switch (pure CSS), an add-on index list, full-bleed photo plates, a numbered process rail.
- Motion: a single light-sweep in the hero, gentle reveal of sections, image scale on hover. 160/320/640 ms, one ease-out curve. All disabled under `prefers-reduced-motion`; all content visible without JavaScript.

## Update — Renew brand applied (27 Oct 2026)

Business: Renew Mobile Car Detailing, North Austin, mobile; booking by text (512) 775-2131 or Instagram DM @renew.cardetailing. Packages (Express In & Out, Interior Detail, Full Detail), prices by vehicle size and add-ons come from the business's published price sheet. Hero uses the brand tagline "Your car. Renewed." The wordmark echoes the logo's script + four-point sparkle until the real logo file is supplied.
