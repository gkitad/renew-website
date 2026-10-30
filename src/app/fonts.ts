import localFont from "next/font/local";

/**
 * Montserrat (variable weight, Latin subset), self-hosted under the SIL Open Font License (see src/fonts/).
 * next/font preloads it and generates a size-matched fallback to avoid layout shift.
 */
export const sans = localFont({
  src: "../fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-montserrat",
  display: "swap",
  adjustFontFallback: "Arial",
});
