import { site } from "@/content/site";
import styles from "./Wordmark.module.css";

/** Text wordmark with the brand's four-point sparkle. Swap for the real logo SVG when available. */
export function Wordmark({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <span className={`${styles.mark} ${tone === "paper" ? styles.paper : ""}`}>
      <span className={styles.primary}>
        {site.brand.wordmark.primary}
        <svg className={styles.spark} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 0c.6 5.2 4.8 9.4 10 10-5.2.6-9.4 4.8-10 10-.6-5.2-4.8-9.4-10-10C5.2 9.4 9.4 5.2 10 0z" />
        </svg>
      </span>{" "}
      <span className={styles.secondary}>{site.brand.wordmark.secondary}</span>
    </span>
  );
}
