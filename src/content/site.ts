/**
 * SITE CONFIGURATION — the single place for business facts.
 *
 * Anything set to `null` is unknown and is NOT shown publicly. While
 * `launchReady` is false the site runs in "preview" mode: a thin notice bar is
 * shown, missing details appear as dashed "to confirm" markers, and search
 * engines are asked not to index the site.
 *
 * Before launch: replace sample photography in assets.ts, fill any remaining
 * nulls below, then set `launchReady: true`.
 */

export type SocialLink = { label: string; href: string; handle?: string };

const PHONE_E164 = "+15127752131";

export const site = {
  launchReady: false,

  brand: {
    name: "Renew Mobile Car Detailing",
    shortName: "Renew",
    tagline: "Your car. Renewed.",
    wordmark: { primary: "Renew", secondary: "Mobile Car Detailing" },
    nameConfirmed: true,
  },

  serviceArea: "North Austin, TX" as string | null,
  /** Mobile (we come to you), studio (you drop off), or both — drives some copy. */
  serviceModel: "mobile" as "mobile" | "studio" | "both" | null,

  contact: {
    phone: "(512) 775-2131" as string | null,
    phoneHref: `tel:${PHONE_E164}` as string | null,
    /** Booking is by text message or Instagram DM. */
    smsHref: `sms:${PHONE_E164}` as string | null,
    sms: true,
    email: null as string | null,
    address: null as string | null, // mobile business — no customer-facing address
    hours: null as { days: string; time: string }[] | null,
  },

  social: [
    { label: "Instagram", handle: "@renew.cardetailing", href: "https://www.instagram.com/renew.cardetailing/" },
  ] as SocialLink[],

  /** Where to send people to book: Instagram DM link. */
  dmHref: "https://ig.me/m/renew.cardetailing",

  seo: {
    defaultTitle: "Renew Mobile Car Detailing — North Austin, TX",
    titleTemplate: "%s · Renew Mobile Car Detailing",
    description:
      "Mobile car detailing in North Austin. Express, interior and full detail packages priced by vehicle size — we come to you. Book by text or Instagram DM.",
    /** Overridden by NEXT_PUBLIC_SITE_URL at build time. */
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com",
    locale: "en_US",
  },

  form: {
    /**
     * Optional. Without an endpoint the booking form composes a ready-to-send
     * text message instead (nothing is sent by the website itself).
     * Set NEXT_PUBLIC_FORM_ENDPOINT to also receive requests by email (see .env.example).
     */
    endpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  },
};

export const nav = [
  { href: "/services/", label: "Packages" },
  { href: "/process/", label: "How it works" },
  { href: "/gallery/", label: "Our work" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
];

export const primaryCta = { href: "/contact/", label: "Book a detail" };

export const isPreview = !site.launchReady;
