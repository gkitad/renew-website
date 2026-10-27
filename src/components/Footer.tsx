import Link from "next/link";
import { nav, primaryCta, site } from "@/content/site";
import { visibleServices } from "@/lib/content";
import { Wordmark } from "./Wordmark";
import { Pending } from "./Pending";
import { Arrow } from "./Icons";
import styles from "./Footer.module.css";

export function Footer() {
  const { contact, social, serviceArea } = site;
  const year = new Date().getFullYear();
  return (
    <footer className={`on-ink ${styles.footer}`}>
      <div className={`wrap ${styles.top}`}>
        <div className={styles.intro}>
          <Wordmark tone="paper" />
          <p className={`muted ${styles.tagline}`}>
            Mobile car detailing in North Austin. We come to you.
          </p>
          <Link href={primaryCta.href} className="link-arrow">
            {primaryCta.label} <Arrow />
          </Link>
        </div>

        <nav aria-label="Footer" className={styles.col}>
          <h2 className={`micro ${styles.heading}`}>Explore</h2>
          <ul role="list">
            <li><Link href="/">Home</Link></li>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
            ))}
            <li><Link href="/contact/">Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Packages" className={styles.col}>
          <h2 className={`micro ${styles.heading}`}>Packages</h2>
          <ul role="list">
            {visibleServices().map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.name}</Link></li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={`micro ${styles.heading}`}>Book</h2>
          <ul role="list">
            <li>
              {contact.phone && contact.smsHref ? (
                <a href={contact.smsHref}>Text {contact.phone}</a>
              ) : (
                <Pending label="Phone" />
              )}
            </li>
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} rel="noopener noreferrer" target="_blank">
                  {s.label} {s.handle}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            )}
            <li>{serviceArea ? <span>Mobile · {serviceArea}</span> : <Pending label="Service area" />}</li>
            {contact.hours?.map((h) => (
              <li key={h.days} className="muted">
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`wrap ${styles.bottom}`}>
        <p className="muted">
          © {year} {site.brand.name}
        </p>
        <p className="muted">
          <Link href="/privacy/">Privacy</Link>
          <span aria-hidden="true"> · </span>
          Sample photography via Unsplash
        </p>
      </div>
    </footer>
  );
}
