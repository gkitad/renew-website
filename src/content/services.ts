import type { AssetKey } from "./assets";

/**
 * SERVICE MENU — Renew's packages and add-ons, from the published price sheet.
 * Edit here; the packages page, detail pages, home page, booking form and
 * sitemap all read from these lists.
 *
 * Prices are "starting at" figures by vehicle size. `includes` lists are the
 * business's own package contents — keep them in sync with the price sheet.
 */

export type VehicleSize = "sedan" | "suv" | "large";

export const vehicleSizes: { id: VehicleSize; label: string; detail: string }[] = [
  { id: "sedan", label: "Sedan / Coupe", detail: "Compact & midsize cars" },
  { id: "suv", label: "SUV / Crossover", detail: "2-row SUVs" },
  { id: "large", label: "3-row SUV / Truck", detail: "Large SUVs & pickup trucks" },
];

export type Service = {
  slug: string;
  name: string;
  /** Short positioning line from the price sheet. */
  tagline: string;
  /** One-line scope, e.g. "Quick interior refresh + complete exterior wash". */
  short: string;
  /** Opening paragraph on the detail page. */
  summary: string;
  /** Starting prices in USD by vehicle size. */
  prices: Record<VehicleSize, number>;
  /** Optional lead-in for the includes list, e.g. "Everything in Interior Detail, plus:" */
  includesPrefix?: string;
  includes: string[];
  suitedFor: string[];
  steps: { title: string; body: string }[];
  considerations: string[];
  image: AssetKey;
  detailImage: AssetKey;
  popular?: boolean;
  related: string[];
  confirmed: boolean;
};

export const services: Service[] = [
  {
    slug: "express-in-and-out",
    name: "Express In & Out",
    tagline: "Perfect for maintenance",
    short: "Quick interior refresh + complete exterior wash.",
    summary:
      "A fast, thorough refresh inside and out. The interior is vacuumed and wiped down, the exterior is fully washed with wheels and tires cleaned, and a short-term layer of paint protection is applied.",
    prices: { sedan: 120, suv: 150, large: 180 },
    includes: [
      "Light vacuuming",
      "Interior wipe-down",
      "Plastics and leather cleaned",
      "Door jambs cleaned",
      "Interior & exterior windows cleaned",
      "Complete exterior wash",
      "Wheels & tires cleaned",
      "2-week paint protection",
    ],
    suitedFor: [
      "Regular upkeep between full details",
      "Cars that are in good shape and just need a proper clean",
      "A quick reset before a trip, an event or a weekend",
    ],
    steps: [
      { title: "Interior", body: "Light vacuum, wipe-down of plastics and leather, door jambs and interior glass." },
      { title: "Exterior", body: "Complete exterior wash, wheels and tires cleaned, exterior windows." },
      { title: "Protect", body: "A short-term paint protection layer to finish." },
    ],
    considerations: [
      "Prices are starting points by vehicle size; the final quote depends on the vehicle’s condition.",
      "The included paint protection is short-term — about two weeks.",
      "Heavy pet hair or odors are handled with add-ons.",
    ],
    image: "handWash",
    detailImage: "foamFront",
    related: ["interior-detail", "full-detail"],
    confirmed: true,
  },
  {
    slug: "interior-detail",
    name: "Interior Detail",
    tagline: "Deep interior cleaning + restoration",
    short: "Deep vacuum, seats and carpets deep cleaned, every surface cleaned and conditioned.",
    summary:
      "A deep clean of the whole cabin, trunk to front. Seats and carpets are deep cleaned, plastic and leather surfaces are cleaned and conditioned, and the interior glass is left clear.",
    prices: { sedan: 170, suv: 200, large: 220 },
    includes: [
      "Deep vacuuming",
      "Seats & carpets deep cleaned",
      "Detailed wipe-down — trunk to front",
      "Plastic & leather surfaces cleaned and conditioned",
      "Door jambs cleaned",
      "Interior glass cleaned",
    ],
    suitedFor: [
      "Daily drivers, family cars and road-trip vehicles",
      "Stained seats or carpets, crumbs and built-up grime",
      "Getting a car ready to sell — or just bought",
    ],
    steps: [
      { title: "Deep vacuum", body: "Seats, carpets, mats, crevices and the trunk." },
      { title: "Deep clean", body: "Seats and carpets deep cleaned; detailed wipe-down from trunk to front." },
      { title: "Condition", body: "Plastic and leather conditioned, door jambs and interior glass finished." },
    ],
    considerations: [
      "Prices are starting points by vehicle size; the final quote depends on the vehicle’s condition.",
      "Some stains are permanent — we’ll tell you what’s realistic.",
      "Deep-cleaned fabric can need a little time to dry fully.",
      "Pet hair removal and odor elimination (ozone) are available as add-ons.",
      "Please take personal items out before the appointment.",
    ],
    image: "interiorLeather",
    detailImage: "steeringCloth",
    popular: true,
    related: ["full-detail", "express-in-and-out"],
    confirmed: true,
  },
  {
    slug: "full-detail",
    name: "Full Detail",
    tagline: "Best for a complete vehicle transformation",
    short: "Complete interior + exterior detail.",
    summary:
      "Everything in the Interior Detail, plus a careful exterior: contactless pre-wash, scratch-free contact wash, wheels and tires deep cleaned, plastic trim dressed, and four months of paint protection.",
    prices: { sedan: 220, suv: 250, large: 300 },
    includesPrefix: "Everything in the Interior Detail, plus:",
    includes: [
      "Wheel & tire deep cleaning (tire dressing applied)",
      "Contactless pre-wash",
      "Scratch-free contact wash",
      "Plastic trim cleaned and dressed",
      "4-month paint protection",
    ],
    suitedFor: [
      "A complete reset, inside and out",
      "Before selling a vehicle, or right after buying one",
      "Cars that haven’t had a proper detail in a while",
    ],
    steps: [
      { title: "Pre-wash", body: "Contactless pre-wash loosens dirt before anything touches the paint." },
      { title: "Wash & wheels", body: "Scratch-free contact wash; wheels and tires deep cleaned and dressed." },
      { title: "Interior & protect", body: "The full Interior Detail, trim dressed, and paint protection applied." },
    ],
    considerations: [
      "Prices are starting points by vehicle size; the final quote depends on the vehicle’s condition.",
      "Paint protection lasts around four months, depending on weather and how the car is washed.",
      "Headlight and trim restoration, ceramic coating application and odor elimination are available as add-ons.",
    ],
    image: "foamGarage",
    detailImage: "wheelFoam",
    related: ["interior-detail", "express-in-and-out"],
    confirmed: true,
  },
];

export type AddOn = { slug: string; name: string; note?: string; price: number; description: string };

export const addOns: AddOn[] = [
  {
    slug: "pet-hair-removal",
    name: "Pet hair removal",
    price: 50,
    description: "Embedded pet hair lifted from seats, carpets and mats.",
  },
  {
    slug: "headlight-restoration",
    name: "Headlight restoration",
    price: 90,
    description: "Cloudy, yellowed headlight lenses restored to clear.",
  },
  {
    slug: "trim-restoration",
    name: "Trim restoration",
    price: 80,
    description: "Faded exterior plastic trim brought back to a deep finish.",
  },
  {
    slug: "ceramic-coating-application",
    name: "Ceramic coating application",
    note: "Dashboard · leather seats · glass / windshield",
    price: 50,
    description: "A ceramic protective layer for interior surfaces or glass, so they stay cleaner for longer.",
  },
  {
    slug: "odor-elimination",
    name: "Odor elimination",
    note: "Ozone treatment",
    price: 50,
    description: "Ozone treatment to break down lingering odors in the cabin.",
  },
];

export function fromPrice(s: Service): number {
  return Math.min(...Object.values(s.prices));
}

export const usd = (n: number) => `$${n}`;
