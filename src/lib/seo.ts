import type { Metadata } from "next";
import { site, isPreview } from "@/content/site";
import { assets } from "@/content/assets";

type PageMeta = { title?: string; description?: string; path: string; image?: string };

/** Builds per-page metadata with canonical URL and social cards. */
export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const desc = description ?? site.seo.description;
  const ogImage = image ?? `${assets.foamFront.src}?w=1200&h=630&fit=crop&q=70&auto=format`;
  const fullTitle = title ? site.seo.titleTemplate.replace("%s", title) : site.seo.defaultTitle;
  return {
    title: title ?? { absolute: site.seo.defaultTitle },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.seo.locale,
      siteName: site.brand.name,
      title: fullTitle,
      description: desc,
      url: path,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: [ogImage] },
    robots: isPreview ? { index: false, follow: false } : undefined,
  };
}
