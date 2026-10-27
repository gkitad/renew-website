import Link from "next/link";
import { vehicleSizes, usd, type Service } from "@/content/services";
import { Arrow } from "./Icons";
import styles from "./PackageChooser.module.css";

/**
 * Three packages side by side with a vehicle-size switch.
 * The switch is pure HTML/CSS (radio inputs + :has), so it works without JavaScript.
 */
export function PackageChooser({ items, id = "pkg" }: { items: Service[]; id?: string }) {
  return (
    <div className={styles.chooser}>
      <fieldset className={styles.sizes}>
        <legend className={`micro ${styles.legend}`}>Vehicle size</legend>
        <div className={styles.sizeOptions}>
          {vehicleSizes.map((v, i) => (
            <label key={v.id} className={styles.size}>
              <input type="radio" name={`${id}-size`} value={v.id} defaultChecked={i === 0} />
              <span className={styles.sizeBox}>
                <span className={styles.sizeLabel}>{v.label}</span>
                <span className={styles.sizeDetail}>{v.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <ol role="list" className={styles.packages}>
        {items.map((s, i) => (
          <li key={s.slug} className={`${styles.pkg} ${s.popular ? styles.popular : ""}`} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
            <div className={styles.head}>
              <p className={`num ${styles.n}`}>
                {String(i + 1).padStart(2, "0")}
                {s.popular && <span className={styles.badge}>Most popular</span>}
              </p>
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.tagline}>{s.tagline}</p>
            </div>
            <p className={styles.price}>
              <span className="micro">Starting at</span>
              {vehicleSizes.map((v) => (
                <span key={v.id} className={styles.amount} data-size={v.id}>
                  {usd(s.prices[v.id])}
                  <span className="visually-hidden"> for {v.label}</span>
                </span>
              ))}
            </p>
            <div className={styles.includes}>
              {s.includesPrefix && <p className={styles.prefix}>{s.includesPrefix}</p>}
              <ul role="list">
                {s.includes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className={styles.actions}>
              <Link href={`/contact/?service=${s.slug}`} className={`btn ${s.popular ? "" : "btn--ghost"} ${styles.book}`}>
                Book {s.name}
              </Link>
              <Link href={`/services/${s.slug}/`} className="link-arrow">
                Details <Arrow />
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
