import { usd, type AddOn } from "@/content/services";
import styles from "./AddOnList.module.css";

/** Add-ons as an index list: name, scope note, description and starting price. */
export function AddOnList({ items }: { items: AddOn[] }) {
  return (
    <ul role="list" className={styles.list}>
      {items.map((a) => (
        <li key={a.slug} className={styles.row}>
          <div className={styles.text}>
            <h3 className={styles.name}>{a.name}</h3>
            {a.note && <p className={`micro ${styles.note}`}>{a.note}</p>}
            <p className={styles.desc}>{a.description}</p>
          </div>
          <p className={styles.price}>
            <span className="micro">From</span> <span className={styles.amount}>{usd(a.price)}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
