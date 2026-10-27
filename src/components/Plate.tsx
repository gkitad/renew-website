import Image from "next/image";
import { assets, type AssetKey } from "@/content/assets";
import styles from "./Plate.module.css";

type Props = {
  asset: AssetKey;
  /** CSS aspect-ratio for the frame, e.g. "3 / 4". Defaults to the image's own ratio. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  /** Plate number shown in the caption, e.g. 1 → "Pl. 01". */
  number?: number;
  caption?: string;
  /** Hide the caption entirely (decorative use). */
  bare?: boolean;
  /** One-off "inspection light" sweep across the image on load. */
  sweep?: boolean;
  className?: string;
  objectPosition?: string;
};

/** An editorial photo "plate": framed image + caption. Captions flag sample imagery. */
export function Plate({ asset, ratio, sizes, priority, number, caption, bare, sweep, className, objectPosition }: Props) {
  const a = assets[asset];
  return (
    <figure className={`${styles.plate} ${className ?? ""}`}>
      <div className={styles.frame} style={{ aspectRatio: ratio ?? `${a.width} / ${a.height}` }}>
        <Image
          src={a.src}
          alt={a.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.img}
          style={objectPosition ? { objectPosition } : undefined}
        />
        {sweep && <span className={styles.sweep} aria-hidden="true" />}
      </div>
      {!bare && (number !== undefined || caption || a.sample) && (
        <figcaption className={styles.caption}>
          {number !== undefined && <span className="num">Pl. {String(number).padStart(2, "0")}</span>}
          {caption && <span>{caption}</span>}
          {a.sample && <span className={styles.sample}>Sample photography</span>}
        </figcaption>
      )}
    </figure>
  );
}
