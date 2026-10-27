import type { AssetKey } from "@/content/assets";
import { Plate } from "./Plate";
import styles from "./PageIntro.module.css";

type Props = {
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  image?: AssetKey;
  imageCaption?: string;
  children?: React.ReactNode;
};

/** Inner-page opening: label, display title, lead and an optional offset plate. */
export function PageIntro({ label, title, lead, image, imageCaption, children }: Props) {
  return (
    <section className={`${styles.intro} ${image ? styles.withImage : ""}`}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.copy}>
          <p className="label">{label}</p>
          <h1 className="h1">{title}</h1>
          {lead && <p className={`lead ${styles.lead}`}>{lead}</p>}
          {children}
        </div>
        {image && (
          <div className={styles.media}>
            <Plate asset={image} ratio="4 / 5" sizes="(min-width: 64rem) 34vw, 100vw" priority caption={imageCaption} number={1} />
          </div>
        )}
      </div>
    </section>
  );
}
