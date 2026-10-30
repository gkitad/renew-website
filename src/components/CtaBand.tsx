import Link from "next/link";
import { primaryCta } from "@/content/site";
import { Plate } from "./Plate";
import { Arrow } from "./Icons";
import { Hours } from "./Hours";
import type { AssetKey } from "@/content/assets";
import styles from "./CtaBand.module.css";

type Props = {
  title?: React.ReactNode;
  body?: string;
  image?: AssetKey;
  /** Override the action target, e.g. to preselect a service. */
  href?: string;
};

/** Closing call-to-action: dark band, one action, quiet supporting link. */
export function CtaBand({
  title = (
    <>
      Ready for a <em>renewed car?</em>
    </>
  ),
  body = "Send the year, make and model, your vehicle size and the package you want. Photos help. We’ll confirm the price and a time, then come to you.",
  image = "detailerHeadlight",
  href = primaryCta.href,
}: Props) {
  return (
    <section className={`on-ink ${styles.band}`} aria-labelledby="cta-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy} data-reveal>
          <p className="label">Next step</p>
          <h2 id="cta-title" className="h2">
            {title}
          </h2>
          <p className={`muted ${styles.body}`}>{body}</p>
          <div className={styles.actions}>
            <Link href={href} className="btn btn--light">
              {primaryCta.label} <Arrow />
            </Link>
            <Link href="/process/" className="link-arrow">
              How it works <Arrow />
            </Link>
          </div>
          <div className={styles.hours}>
            <p className="micro muted">Hours</p>
            <Hours compact />
          </div>
        </div>
        <div className={styles.media} data-reveal>
          <Plate asset={image} ratio="4 / 3" sizes="(min-width: 64rem) 40vw, 100vw" bare />
        </div>
      </div>
    </section>
  );
}
