import Link from "next/link";
import type { Metadata } from "next";
import { Arrow } from "@/components/Icons";
import styles from "./not-found.module.css";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className={`wrap ${styles.nf}`}>
      <p className="label">Error 404</p>
      <h1 className="display">
        Nothing here <em>under the light.</em>
      </h1>
      <p className="lead muted">The page you were looking for has moved or never existed.</p>
      <div className={styles.actions}>
        <Link href="/" className="btn">
          Back to home <Arrow />
        </Link>
        <Link href="/services/" className="link-arrow">
          View services <Arrow />
        </Link>
      </div>
    </section>
  );
}
