import { Plus } from "./Icons";
import styles from "./FaqList.module.css";

/**
 * Accordion built on native <details>/<summary>: keyboard and screen-reader
 * accessible by default, and it works without JavaScript.
 */
export function FaqList({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className={styles.list}>
      {items.map((it) => (
        <details key={it.q} className={styles.item}>
          <summary className={styles.q}>
            <span>{it.q}</span>
            <span className={styles.icon} aria-hidden="true">
              <Plus />
            </span>
          </summary>
          <div className={styles.a}>{it.a}</div>
        </details>
      ))}
    </div>
  );
}
