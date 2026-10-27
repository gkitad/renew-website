import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { visibleServices } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.seo.url.replace(/\/$/, "");
  const pages = ["/", "/services/", "/process/", "/gallery/", "/about/", "/faq/", "/contact/", "/privacy/"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...visibleServices().map((s) => ({ url: `${base}/services/${s.slug}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
