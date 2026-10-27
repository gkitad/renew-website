import type { MetadataRoute } from "next";
import { site, isPreview } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Preview builds ask crawlers to stay away until business details are confirmed.
  if (isPreview) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.seo.url}/sitemap.xml` };
}
