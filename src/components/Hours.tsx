import { site } from "@/content/site";
import { Pending } from "./Pending";
import styles from "./Hours.module.css";

/** Business hours, from src/content/site.ts. One component so every page shows the same schedule. */
export function Hours({ compact = false }: { compact?: boolean }) {
  const hours = site.contact.hours;
  if (!hours?.length) return <Pending label="Hours" />;
  return (
    <dl className={`${styles.hours} ${compact ? styles.compact : ""}`}>
      {hours.map((h) => (
        <div key={h.days} className={styles.row}>
          <dt>{h.days}</dt>
          <dd className="num">{h.time}</dd>
        </div>
      ))}
    </dl>
  );
}
