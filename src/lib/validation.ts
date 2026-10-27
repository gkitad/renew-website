/**
 * Booking-request validation and message composition. Pure functions,
 * shared by the form UI and the tests.
 */

export type BookingInput = {
  name: string;
  phone: string;
  vehicleYear: string;
  vehicle: string;
  size: string;
  service: string;
  addOns: string[];
  when: string;
  area: string;
  notes: string;
  /** Honeypot — must stay empty. */
  company: string;
};

export type FieldErrors = Partial<Record<keyof BookingInput, string>>;

export const LIMITS = { name: 80, phone: 30, vehicle: 80, when: 120, area: 120, notes: 1000 };

const PHONE_RE = /^[+()\-.\s\d]{7,30}$/;
const SIZES = ["sedan", "suv", "large"];

export function normalize(raw: Partial<Record<keyof BookingInput, unknown>>): BookingInput {
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const list = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : typeof v === "string" && v ? [v] : []);
  return {
    name: s(raw.name),
    phone: s(raw.phone),
    vehicleYear: s(raw.vehicleYear),
    vehicle: s(raw.vehicle),
    size: s(raw.size),
    service: s(raw.service),
    addOns: list(raw.addOns),
    when: s(raw.when),
    area: s(raw.area),
    notes: s(raw.notes),
    company: s(raw.company),
  };
}

export function validateBooking(
  input: BookingInput,
  { currentYear = new Date().getFullYear(), requirePhone = false }: { currentYear?: number; requirePhone?: boolean } = {},
): FieldErrors {
  const e: FieldErrors = {};

  if (!input.name) e.name = "Enter your name.";
  else if (input.name.length > LIMITS.name) e.name = `Keep your name under ${LIMITS.name} characters.`;

  if (requirePhone && !input.phone) e.phone = "Add a phone number so we can text you back.";
  else if (input.phone && !PHONE_RE.test(input.phone)) e.phone = "Enter a valid phone number.";

  if (input.vehicleYear) {
    const y = Number(input.vehicleYear);
    if (!/^\d{4}$/.test(input.vehicleYear) || y < 1900 || y > currentYear + 1)
      e.vehicleYear = `Enter a four-digit year between 1900 and ${currentYear + 1}, or leave it blank.`;
  }

  if (!input.vehicle) e.vehicle = "Enter the make and model.";
  else if (input.vehicle.length > LIMITS.vehicle) e.vehicle = `Keep this under ${LIMITS.vehicle} characters.`;

  if (!SIZES.includes(input.size)) e.size = "Choose your vehicle size.";

  if (input.when.length > LIMITS.when) e.when = `Keep this under ${LIMITS.when} characters.`;
  if (input.area.length > LIMITS.area) e.area = `Keep this under ${LIMITS.area} characters.`;
  if (input.notes.length > LIMITS.notes) e.notes = `Keep notes under ${LIMITS.notes} characters.`;

  return e;
}

export function isSpam(input: BookingInput): boolean {
  return input.company.length > 0;
}

type Named = { slug: string; name: string };
type Sized = { id: string; label: string };

/** Builds the plain-text booking message used for SMS / Instagram DM. */
export function composeMessage(
  input: BookingInput,
  catalog: { services: Named[]; addOns: Named[]; sizes: Sized[]; brand: string },
): string {
  const service = catalog.services.find((s) => s.slug === input.service)?.name ?? "Not sure — please recommend one";
  const size = catalog.sizes.find((s) => s.id === input.size)?.label ?? "";
  const addOns = input.addOns
    .map((a) => catalog.addOns.find((x) => x.slug === a)?.name)
    .filter(Boolean)
    .join(", ");
  const vehicle = [input.vehicleYear, input.vehicle].filter(Boolean).join(" ") + (size ? ` (${size})` : "");
  const lines = [
    `Hi ${catalog.brand}! I'd like to book a detail.`,
    `Name: ${input.name}`,
    `Vehicle: ${vehicle}`,
    `Package: ${service}`,
    addOns && `Add-ons: ${addOns}`,
    input.when && `When: ${input.when}`,
    input.area && `Area: ${input.area}`,
    input.notes && `Notes: ${input.notes}`,
  ];
  return lines.filter(Boolean).join("\n");
}

/** sms: link with a prefilled body; the `?&` form works on both iOS and Android. */
export function smsLink(smsHref: string, body: string): string {
  return `${smsHref}?&body=${encodeURIComponent(body)}`;
}
