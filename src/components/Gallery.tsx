"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { assets, type AssetKey } from "@/content/assets";
import { Chevron, Close } from "./Icons";
import styles from "./Gallery.module.css";

export type GalleryItem = { key: AssetKey; caption: string; span: "tall" | "wide" | "square" };

/**
 * Editorial image grid with an accessible lightbox built on the native
 * <dialog> element (focus containment, Escape to close). Arrow keys move
 * between images; focus returns to the thumbnail that opened it.
 */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const openerRef = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    openerRef.current = i;
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setIndex(null);
      // Return focus to the thumbnail that opened the viewer.
      const opener = openerRef.current;
      if (opener !== null) triggerRefs.current[opener]?.focus();
      openerRef.current = null;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      dlg.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = index === null ? null : items[index];
  const a = current ? assets[current.key] : null;

  return (
    <>
      <ul role="list" className={styles.grid}>
        {items.map((it, i) => {
          const img = assets[it.key];
          return (
            <li key={it.key} className={`${styles.cell} ${styles[it.span]}`} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}>
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                className={styles.thumb}
                onClick={() => open(i)}
                aria-haspopup="dialog"
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes={it.span === "wide" ? "(min-width: 64rem) 60vw, 100vw" : "(min-width: 64rem) 30vw, 50vw"}
                  className={styles.img}
                />
                <span className="visually-hidden">Enlarge image: {img.alt}</span>
              </button>
              <p className={styles.caption}>
                <span className="num">Pl. {String(i + 1).padStart(2, "0")}</span>
                <span>{it.caption}</span>
              </p>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className={`on-ink ${styles.dialog}`}
        aria-label={a ? `Image ${index! + 1} of ${items.length}: ${current!.caption}` : "Image viewer"}
        onClick={(e) => {
          // click on backdrop (the dialog element itself) closes
          if (e.target === dialogRef.current) close();
        }}
      >
        {a && current && (
          <div className={styles.viewer}>
            <div className={styles.bar}>
              <p className="num micro" aria-live="polite">
                {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <button type="button" className={styles.iconBtn} onClick={close} aria-label="Close image viewer" autoFocus>
                <Close />
              </button>
            </div>
            <div className={styles.stage}>
              <Image key={a.src} src={a.src} alt={a.alt} fill sizes="100vw" className={styles.full} />
            </div>
            <div className={styles.foot}>
              <p>
                <span>{current.caption}</span>
                {a.sample && <span className="muted"> · Sample photography{a.credit ? `, ${a.credit}` : ""}</span>}
              </p>
              <div className={styles.nav}>
                <button type="button" className={styles.iconBtn} onClick={() => step(-1)} aria-label="Previous image">
                  <Chevron dir="left" />
                </button>
                <button type="button" className={styles.iconBtn} onClick={() => step(1)} aria-label="Next image">
                  <Chevron />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
