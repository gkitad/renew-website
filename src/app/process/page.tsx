import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { processSteps } from "@/content/pages";
import { pad } from "@/lib/content";
import { PageIntro } from "@/components/PageIntro";
import { Plate } from "@/components/Plate";
import { CtaBand } from "@/components/CtaBand";
import { Arrow } from "@/components/Icons";
import type { AssetKey } from "@/content/assets";
import s from "../inner.module.css";

export const metadata = pageMetadata({
  title: "How it works",
  description: "How booking a mobile detail with Renew works — from a text or DM to a renewed car, and what we need from you.",
  path: "/process/",
});

const stepImages: (AssetKey | null)[] = [null, "padHeadlight", null, "steeringCloth", "foamGarage", null];

export default function ProcessPage() {
  return (
    <>
      <PageIntro
        label="How it works"
        title={
          <>
            No surprises, <em>from first text to a renewed car.</em>
          </>
        }
        lead="Six steps. At each one you know what’s happening, what’s needed from you, and what comes next."
      />

      <section className={s.tight} aria-label="Steps">
        <div className="wrap">
          <ol role="list" className={s.steps}>
            {processSteps.map((st, i) => {
              const img = stepImages[i];
              return (
                <li key={st.title} className={s.step} data-reveal>
                  <div className={s.stepHead}>
                    <span className={`num ${s.stepNum}`}>{pad(i + 1)}</span>
                  </div>
                  <div className={s.stepBody}>
                    <h2 className="h2">{st.title}</h2>
                    <p className="lead">{st.body}</p>
                    <div className={s.stepYou}>
                      <p className="micro">Your part</p>
                      <p>{st.customer}</p>
                    </div>
                  </div>
                  {img && (
                    <div className={s.stepMedia}>
                      <Plate asset={img} ratio="4 / 3" sizes="(min-width: 64rem) 30vw, 100vw" bare />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section on-stone" aria-labelledby="bring-title">
        <div className={`wrap ${s.split}`}>
          <div className={s.splitHead}>
            <p className="label">Helpful to have</p>
            <h2 id="bring-title" className="h2">
              What to include <em>when you book.</em>
            </h2>
          </div>
          <ul role="list" className={s.ticks}>
            <li>Year, make and model — and which size it is: sedan / coupe, SUV / crossover, or 3-row SUV / truck</li>
            <li>The package you want, and any add-ons</li>
            <li>Photos of the interior and any problem areas: stains, pet hair, cloudy headlights</li>
            <li>Where the car will be parked, and a day and time that work for you</li>
            <li>Anything recently repaired or that needs special care</li>
          </ul>
        </div>
      </section>

      <section className="section" aria-label="Related questions">
        <div className={`wrap ${s.inline}`}>
          <p className="h3">Questions about timing, preparation or aftercare?</p>
          <Link href="/faq/" className="link-arrow">
            Read the FAQ <Arrow />
          </Link>
        </div>
      </section>

      <CtaBand image="wheelBrush" />
    </>
  );
}
