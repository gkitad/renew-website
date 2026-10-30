import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { principles } from "@/content/pages";
import { site } from "@/content/site";
import { pad } from "@/lib/content";
import { PageIntro } from "@/components/PageIntro";
import { Plate } from "@/components/Plate";
import { CtaBand } from "@/components/CtaBand";
import { Pending } from "@/components/Pending";
import { Arrow } from "@/components/Icons";
import s from "../inner.module.css";

export const metadata = pageMetadata({
  title: "About",
  description: `${site.brand.name} is a mobile detailing service in North Austin: careful work, the right product for every surface, and straight answers.`,
  path: "/about/",
});

const standards = [
  { k: "Mobile", v: "We come to where the car is parked, so your day doesn’t stop for a detail." },
  { k: "Method", v: "Wheels, paint and interior each have their own tools, so dirt isn’t carried from one to another." },
  { k: "Products", v: "Chosen for the material in front of us: what’s right for leather isn’t what goes on a wheel barrel." },
  { k: "Order", v: "Interior from top to bottom; exterior from pre-wash to contact wash to protection." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label="About"
        title={
          <>
            Detailing as a craft, <em>brought to your driveway.</em>
          </>
        }
        lead={`${site.brand.name} is a mobile detailing service based in North Austin. The idea is simple: your car, renewed, without you having to take it anywhere.`}
        image="steeringCloth"
        imageCaption="Hand finishing, interior"
      />

      <section className="section on-stone" aria-labelledby="belief-title">
        <div className={`wrap ${s.split}`}>
          <div className={s.splitHead}>
            <p className="label">What we believe</p>
            <h2 id="belief-title" className="h2">
              A good detail is <em>quiet.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="lead">
              It doesn’t smell of perfume or shine with greasy dressing. It looks like the car was made yesterday and has been
              looked after since.
            </p>
            <p className="muted">
              That takes time spent where nobody looks: wheel barrels, door jambs, seat rails, the bottom of the doors. It
              takes using the right product on each surface. And it takes being straight with people about what a
              package will and won’t do.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="principles-title">
        <div className="wrap">
          <h2 id="principles-title" className="label">
            Principles
          </h2>
          <ol role="list" className={s.bigList}>
            {principles.map((p, i) => (
              <li key={p.title} data-reveal>
                <span className={`num ${s.bigNum}`}>{pad(i + 1)}</span>
                <h3 className="h2">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section on-ink" aria-labelledby="standards-title">
        <div className={`wrap ${s.standards}`}>
          <div className={s.standardsMedia}>
            <Plate asset="wheelFoam" ratio="3 / 4" sizes="(min-width: 64rem) 36vw, 100vw" number={2} caption="Wheels get their own tools" />
          </div>
          <div className={s.standardsCopy}>
            <p className="label">Standards</p>
            <h2 id="standards-title" className="h2">
              The same order, <em>every time.</em>
            </h2>
            <dl className={s.defs}>
              {standards.map((d) => (
                <div key={d.k}>
                  <dt className="micro">{d.k}</dt>
                  <dd>{d.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="people-title">
        <div className={`wrap ${s.split}`}>
          <div className={s.splitHead}>
            <p className="label">The people</p>
            <h2 id="people-title" className="h2">
              Who does <em>the work.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="muted">
              {/* Replace with a short, true introduction of the owner/team and a real photo. */}
              <Pending label="Owner introduction and photo" />
            </p>
            <p>
              <Link href="/process/" className="link-arrow">
                See how a detail is run <Arrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand image="studioSedan" title={<>Your car. <em>Renewed.</em></>} />
    </>
  );
}
