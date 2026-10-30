import { site } from "@/content/site";
import styles from "./Wordmark.module.css";

/**
 * Official Renew logo: the script mark (vector, traced from the client's logo file,
 * public/brand/) with "Mobile Car Detailing" set in Montserrat underneath, as on the original.
 * Black version on white surfaces, white version on black ones.
 */
export function Wordmark({ tone = "ink", size = "md" }: { tone?: "ink" | "paper"; size?: "md" | "lg" }) {
  const src = tone === "paper" ? "/brand/renew-logo-white.svg" : "/brand/renew-logo-black.svg";
  return (
    <span className={`${styles.mark} ${tone === "paper" ? styles.paper : ""} ${size === "lg" ? styles.lg : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, no optimization needed */}
      <img src={src} alt={site.brand.shortName} width={3792} height={1140} className={styles.script} />
      <span className={styles.secondary}>{site.brand.wordmark.secondary}</span>
    </span>
  );
}
