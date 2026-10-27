/**
 * next/image custom loader (required for static export).
 * - Unsplash CDN images: request the exact width, modern format (AVIF/WebP), cropped.
 * - Local images under /public: served as-is (pre-size them before adding).
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const params = new URLSearchParams({
      w: String(width),
      q: String(quality ?? 60),
      auto: "format",
      fit: "max",
    });
    return `${src}?${params.toString()}`;
  }
  return src;
}
