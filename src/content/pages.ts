import type { AssetKey } from "./assets";
import { site } from "./site";

/**
 * PROCESS, FAQ, PRINCIPLES AND GALLERY CONTENT.
 * Review every line against how the business actually works before launch.
 */

export const principles = [
  {
    title: "Look before touching",
    body: "Every car is different. Its size and condition decide the time and products it needs — not a stopwatch.",
  },
  {
    title: "The right product for each surface",
    body: "Leather, plastic, fabric, glass, paint and wheels each get a product and tool meant for them.",
  },
  {
    title: "Straight answers",
    body: "If a stain is permanent or something needs an add-on, you’ll hear it before the work starts — not after.",
  },
];

export const processSteps = [
  {
    title: "Send a text or DM",
    body: "Text (512) 775-2131 or message @renew.cardetailing on Instagram with your vehicle and the package you’re interested in. Photos help.",
    customer: "Tell us the year, make and model, the package, and where you are in North Austin.",
  },
  {
    title: "Get your quote",
    body: "Prices start by vehicle size. We confirm the final price based on the size and condition of your car, plus any add-ons.",
    customer: "Answer a couple of quick questions; send photos if asked.",
  },
  {
    title: "Pick a time and place",
    body: "We’re mobile — we agree a day, a time and where the car will be parked, and come to you.",
    customer: "Make sure the car is accessible at the agreed time.",
  },
  {
    title: "Prep",
    body: "A quick look over the vehicle before starting, so nothing is a surprise.",
    customer: "Take personal items and valuables out of the car.",
  },
  {
    title: "The detail",
    body: "The package is carried out in order — interior top to bottom, exterior from pre-wash to protection.",
    customer: "Nothing. Go about your day.",
  },
  {
    title: "Your car, renewed",
    body: "We let you know when it’s done and share tips to keep it looking that way.",
    customer: "Take a look and enjoy the drive.",
  },
];

/** An answer of `null` means the fact is unknown: hidden at launch, flagged in preview. */
export type FaqGroup = { group: string; items: { q: string; a: string | null }[] };

export const faqs: FaqGroup[] = [
  {
    group: "Booking",
    items: [
      {
        q: "How do I book?",
        a: "Send a text to (512) 775-2131 or a DM to @renew.cardetailing on Instagram. Tell us your vehicle, the package you want and roughly where you are, and we’ll confirm the price and a time.",
      },
      {
        q: "Do you come to me?",
        a: site.serviceArea
          ? `Yes — Renew is fully mobile. We serve ${site.serviceArea} and nearby areas. If you’re just outside, ask; it may still be possible.`
          : null,
      },
      {
        q: "What are your hours?",
        a: site.contact.hours ? site.contact.hours.map((h) => `${h.days}: ${h.time}`).join(" · ") : null,
      },
    ],
  },
  {
    group: "Choosing a package",
    items: [
      {
        q: "Which package should I choose?",
        a: "Express In & Out is for regular upkeep: a quick interior refresh and a complete exterior wash. Interior Detail is a deep clean of the cabin. Full Detail combines the Interior Detail with a careful exterior wash, wheels, trim and longer-lasting paint protection. Not sure? Send photos and we’ll recommend one.",
      },
      {
        q: "Which vehicle size am I?",
        a: "Sedan / Coupe covers compact and midsize cars. SUV / Crossover covers 2-row SUVs. 3-row SUV / Truck covers large SUVs and pickup trucks.",
      },
      {
        q: "Why are prices “starting at”?",
        a: "The starting price is set by vehicle size. A car with heavy soiling, lots of pet hair or strong odors takes more time, so the final quote depends on its condition — and some of that is covered by add-ons. You’ll know the price before we start.",
      },
      {
        q: "Is the ceramic coating add-on for the paint?",
        a: "The ceramic coating application add-on covers the dashboard, leather seats and glass / windshield. Ask us if you’re looking for something else.",
      },
    ],
  },
  {
    group: "Before & after",
    items: [
      {
        q: "How should I prepare my car?",
        a: "Take out personal items and valuables. Let us know about anything fragile, recently repaired or that needs special care.",
      },
      {
        q: "How long does the paint protection last?",
        a: "Express In & Out includes about two weeks of paint protection; the Full Detail includes about four months. How long it actually lasts depends on weather and how the car is washed.",
      },
      {
        q: "How do I keep the car looking good afterwards?",
        a: "Skip automatic brush washes, use a clean wash mitt and soft microfiber towels, and wash from the top down. Regular Express In & Out details make upkeep easy.",
      },
    ],
  },
];

/** Real projects go here once photographed. Leave empty to show the placeholder state. */
export type Project = {
  title: string;
  service: string; // service slug
  vehicle?: string;
  description?: string;
  images: AssetKey[];
  /** Only for genuine before/after pairs of the same vehicle. */
  beforeAfter?: { before: AssetKey; after: AssetKey };
};

export const projects: Project[] = [];

/** Sample plates shown on the gallery page while `projects` is empty. Clearly labelled as samples. */
export const samplePlates: { key: AssetKey; caption: string; span: "tall" | "wide" | "square" }[] = [
  { key: "foamFront", caption: "Pre-wash foam", span: "tall" },
  { key: "reflectionBrown", caption: "Reflections in deep brown paint", span: "wide" },
  { key: "wheelBrush", caption: "Tire sidewall, soft brush", span: "square" },
  { key: "interiorRed", caption: "Leather and console", span: "tall" },
  { key: "microfiberHood", caption: "Microfiber on a black hood", span: "wide" },
  { key: "padHeadlight", caption: "Hand application near the headlight", span: "square" },
  { key: "steeringCloth", caption: "Steering wheel wipe-down", span: "tall" },
  { key: "wheelFoam", caption: "Wheel cleaning", span: "tall" },
  { key: "garageCar", caption: "Ready to go", span: "tall" },
];

/**
 * Genuine customer reviews only (with permission). The home page shows a
 * testimonials section only when this list is not empty.
 */
export const testimonials: { quote: string; name: string; vehicle?: string; source?: string }[] = [];
