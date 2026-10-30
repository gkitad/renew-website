import { site } from "@/content/site";

/**
 * LocalBusiness structured data: emitted ONLY when the site is launched and
 * the business identity, contact and service area are confirmed. Never
 * includes ratings, prices or hours that are not configured.
 */
export function JsonLd() {
  const { brand, contact, serviceArea, seo, social, launchReady } = site;
  if (!launchReady || !brand.nameConfirmed || !serviceArea || !(contact.phone || contact.email)) return null;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name: brand.name,
    url: seo.url,
    areaServed: serviceArea,
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.address ? { address: contact.address } : {}),
    ...(social.length ? { sameAs: social.map((s) => s.href) } : {}),
    ...(contact.openingHours?.length
      ? { openingHoursSpecification: contact.openingHours.map((h) => ({ "@type": "OpeningHoursSpecification", ...h })) }
      : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
