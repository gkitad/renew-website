import type { NextConfig } from "next";

/**
 * Fully static site (HTML/CSS/JS in `out/`), deployable to any static host.
 * Images are served from Unsplash's CDN through a custom loader that requests
 * the exact width needed, in modern formats (see src/lib/imageLoader.ts).
 * When real photography is added under /public, the loader passes it through.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    qualities: [60, 75],
  },
};

export default nextConfig;
