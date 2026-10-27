import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { visibleServices } from "@/lib/content";
import { addOns } from "@/content/services";
import { PageIntro } from "@/components/PageIntro";
import { PackageChooser } from "@/components/PackageChooser";
import { AddOnList } from "@/components/AddOnList";
import { CtaBand } from "@/components/CtaBand";
import { Arrow } from "@/components/Icons";
import s from "../inner.module.css";

export const metadata = pageMetadata({
  title: "Packages & prices",
  description:
    "Express In & Out from $120, Interior Detail from $170, Full Detail from $220 — priced by vehicle size. Add-ons from $50. Mobile detailing in North Austin.",
  path: "/services/",
});

export default function ServicesPage() {
  const services = visibleServices();
  return (
    <>
      <PageIntro
        label="Packages & prices"
        title={
          <>
            Choose your detail. <em>We bring it to you.</em>
          </>
        }
        lead="Three packages, priced by vehicle size, plus add-ons for the things that need extra attention. Prices are starting points; the final price depends on the car’s condition."
      />

      <section className={s.tight} aria-labelledby="packages-title">
        <div className="wrap">
          <h2 id="packages-title" className="visually-hidden">
            Packages
          </h2>
          <PackageChooser items={services} id="services" />
        </div>
      </section>

      <section id="add-ons" className="section on-stone" aria-labelledby="addons-title">
        <div className={`wrap ${s.split}`}>
          <div className={s.splitHead}>
            <p className="label">Add-ons</p>
            <h2 id="addons-title" className="h2">
              Extra attention, <em>where it’s needed.</em>
            </h2>
            <p className="muted">Add any of these to a package when you book. Prices start at the amount shown.</p>
          </div>
          <AddOnList items={addOns} />
        </div>
      </section>

      <section className="section" aria-labelledby="choose-title">
        <div className={`wrap ${s.split}`}>
          <div className={s.splitHead}>
            <p className="label">Not sure which?</p>
            <h2 id="choose-title" className="h2">
              Start with <em>how the car feels</em> to sit in.
            </h2>
          </div>
          <dl className={s.defs2}>
            <div>
              <dt className="h3">It just needs a proper clean</dt>
              <dd className="muted">Express In & Out — quick interior refresh and a complete exterior wash. Ideal for regular upkeep.</dd>
            </div>
            <div>
              <dt className="h3">The inside is the problem</dt>
              <dd className="muted">Interior Detail — seats and carpets deep cleaned, every surface cleaned and conditioned, trunk to front.</dd>
            </div>
            <div>
              <dt className="h3">It needs everything</dt>
              <dd className="muted">Full Detail — the Interior Detail plus a careful exterior, wheels, trim and four months of paint protection.</dd>
            </div>
          </dl>
          <p>
            <Link href="/contact/" className="link-arrow">
              Still unsure? Send photos and ask <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand image="garageCar" />
    </>
  );
}
