"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { assets, type AssetKey } from "@/content/assets";
import styles from "./BeforeAfter.module.css";

/**
 * Before/after comparison for GENUINE matched pairs only (same vehicle,
 * angle and light). Operated with a native range input: keyboard, touch and
 * screen readers work without extra code.
 */
export function BeforeAfter({ before, after, label }: { before: AssetKey; after: AssetKey; label: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const b = assets[before];
  const a = assets[after];
  return (
    <figure className={styles.wrap}>
      <div className={styles.stage} style={{ ["--pos" as string]: `${pos}%`, aspectRatio: `${a.width} / ${a.height}` }}>
        <Image src={a.src} alt={`After: ${a.alt}`} fill sizes="(min-width: 64rem) 70vw, 100vw" className={styles.img} />
        <div className={styles.before}>
          <Image src={b.src} alt={`Before: ${b.alt}`} fill sizes="(min-width: 64rem) 70vw, 100vw" className={styles.img} />
        </div>
        <span className={styles.handle} aria-hidden="true" />
        <span className={`micro ${styles.tagB}`}>Before</span>
        <span className={`micro ${styles.tagA}`}>After</span>
      </div>
      <label htmlFor={id} className="visually-hidden">
        Reveal before and after: {label}
      </label>
      <input id={id} type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className={styles.range} />
      <figcaption className="micro muted">{label}</figcaption>
    </figure>
  );
}
