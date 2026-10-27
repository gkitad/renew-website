import { isPreview } from "@/content/site";
import styles from "./PreviewBar.module.css";

export function PreviewBar() {
  if (!isPreview) return null;
  return (
    <div className={styles.bar} role="note">
      <span className={styles.dot} aria-hidden="true" />
      <p>
        <strong>Site under construction.</strong> Photos shown are licensed sample images, not our own work — our gallery is
        coming soon.
      </p>
    </div>
  );
}
