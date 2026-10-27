import styles from "./ProcessRail.module.css";

type Step = { title: string; body: string };

/** Numbered stations on a horizontal rail (vertical on small screens). */
export function ProcessRail({ steps }: { steps: Step[] }) {
  return (
    <ol role="list" className={styles.rail} style={{ ["--count" as string]: steps.length }}>
      {steps.map((s, i) => (
        <li key={s.title} className={styles.step} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
          <span className={styles.n} aria-hidden="true" />
          <h3 className={styles.title}>{s.title}</h3>
          <p className={styles.body}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
