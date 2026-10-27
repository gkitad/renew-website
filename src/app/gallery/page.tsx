import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { projects, samplePlates } from "@/content/pages";
import { site } from "@/content/site";
import { PageIntro } from "@/components/PageIntro";
import { Gallery } from "@/components/Gallery";
import { BeforeAfter } from "@/components/BeforeAfter";
import { getService } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { Arrow } from "@/components/Icons";
import s from "../inner.module.css";

export const metadata = pageMetadata({
  title: "Our work",
  description: "Renew project gallery — real cars from around North Austin, before and after. Coming soon.",
  path: "/gallery/",
});

export default function GalleryPage() {
  const hasProjects = projects.length > 0;
  const instagram = site.social.find((x) => x.label === "Instagram");
  return (
    <>
      <PageIntro
        label="Our work"
        title={
          <>
            Evidence, <em>in consistent light.</em>
          </>
        }
        lead={
          hasProjects
            ? "Selected projects, photographed the same way before and after."
            : "Our project gallery is coming soon — real cars from around North Austin, shown as they really are, before and after. Until then, our latest work is on Instagram."
        }
      />

      {!hasProjects && (
        <section className={s.tight} aria-labelledby="sample-title">
          <div className="wrap">
            <div className={s.notice} role="note">
              <h2 id="sample-title" className="micro">
                About these images
              </h2>
              <p>
                The photographs below are licensed sample images from Unsplash. They show the type of work involved, but they
                are <strong>not {site.brand.name} projects</strong> and do not show our customers’ vehicles.
              </p>
            </div>
            <Gallery items={samplePlates} />
          </div>
        </section>
      )}

      {hasProjects && (
        <section className={s.tight} aria-label="Projects">
          <div className="wrap">
            {projects.some((p) => p.beforeAfter) && (
              <div className={s.pairs}>
                {projects
                  .filter((p) => p.beforeAfter)
                  .map((p) => (
                    <BeforeAfter key={p.title} before={p.beforeAfter!.before} after={p.beforeAfter!.after} label={p.title} />
                  ))}
              </div>
            )}
            <Gallery
              items={projects.flatMap((p, i) =>
                p.images.map((key, j) => ({
                  key,
                  caption: [p.title, getService(p.service)?.name].filter(Boolean).join(" · "),
                  span: (["tall", "wide", "square"] as const)[(i + j) % 3],
                })),
              )}
            />
          </div>
        </section>
      )}

      <section className="section on-stone" aria-label="Instagram">
        <div className={`wrap ${s.inline}`}>
          <p className="h3">See the latest work on Instagram.</p>
          {instagram ? (
            <a href={instagram.href} className="link-arrow" target="_blank" rel="noopener noreferrer">
              {instagram.handle} <Arrow />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link href="/contact/" className="link-arrow">
              Ask us <Arrow />
            </Link>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
