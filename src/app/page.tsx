import Link from "next/link";
import { primaryCta, site } from "@/content/site";
import { principles, processSteps, testimonials } from "@/content/pages";
import { addOns, fromPrice, usd } from "@/content/services";
import { visibleServices, pad } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Plate } from "@/components/Plate";
import { PackageChooser } from "@/components/PackageChooser";
import { AddOnList } from "@/components/AddOnList";
import { ProcessRail } from "@/components/ProcessRail";
import { CtaBand } from "@/components/CtaBand";
import { Arrow } from "@/components/Icons";
import styles from "./home.module.css";

export const metadata = pageMetadata({ path: "/" });

export default function Home() {
  const services = visibleServices();
  const railSteps = processSteps.filter((s) => s.title !== "Prep");
  const { contact, social, serviceArea } = site;
  const instagram = social.find((s) => s.label === "Instagram");

  return (
    <>
      {/* ---------- Hero: editorial split ---------- */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className="label">Mobile car detailing{serviceArea ? <> · {serviceArea}</> : null}</p>
            <h1 id="hero-title" className="display">
              Your car. <em>Renewed.</em>
            </h1>
            <p className={`lead ${styles.heroLead}`}>
              Interior, exterior and full details, done carefully wherever your car is parked. We come to you.
            </p>
            <div className={styles.heroActions}>
              <Link href={primaryCta.href} className="btn">
                {primaryCta.label} <Arrow />
              </Link>
              <Link href="/services/" className="link-arrow">
                See packages & prices <Arrow />
              </Link>
            </div>
            {contact.phone && contact.smsHref && (
              <p className={styles.heroMeta}>
                Book by text <a href={contact.smsHref}>{contact.phone}</a>
                {instagram && (
                  <>
                    {" "}or DM{" "}
                    <a href={site.dmHref} target="_blank" rel="noopener noreferrer">
                      {instagram.handle}
                      <span className="visually-hidden"> on Instagram (opens in a new tab)</span>
                    </a>
                  </>
                )}
              </p>
            )}
          </div>
          <div className={styles.heroMedia}>
            <Plate
              asset="foamFront"
              ratio="4 / 5"
              sizes="(min-width: 64rem) 40vw, 100vw"
              priority
              sweep
              number={1}
              caption="Pre-wash foam"
              objectPosition="50% 40%"
            />
          </div>
        </div>

        <nav aria-label="Packages at a glance" className="wrap">
          <ol role="list" className={styles.disciplines}>
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className={styles.discipline}>
                  <span className={`num ${styles.dNum}`}>{pad(i + 1)}</span>
                  <span className={styles.dName}>{s.name}</span>
                  <span className={styles.dLine}>From {usd(fromPrice(s))}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services/#add-ons" className={styles.discipline}>
                <span className={`num ${styles.dNum}`}>+</span>
                <span className={styles.dName}>Add-ons</span>
                <span className={styles.dLine}>From {usd(Math.min(...addOns.map((a) => a.price)))}</span>
              </Link>
            </li>
          </ol>
        </nav>
      </section>

      {/* ---------- Approach statement ---------- */}
      <section className="section" aria-labelledby="approach-title">
        <div className={`wrap ${styles.approach}`}>
          <p className="label" data-reveal>
            Approach
          </p>
          <h2 id="approach-title" className={`h2 ${styles.statement}`} data-reveal>
            A detail isn’t judged from ten feet away. It’s judged up close — in the door jambs, the seat rails, the
            wheel barrels. That’s where <em>we start.</em>
          </h2>
          <ol role="list" className={styles.principles}>
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <span className={`num ${styles.pNum}`}>{pad(i + 1)}</span>
                <h3 className="h3">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Packages (dark booth) ---------- */}
      <section className={`on-ink section ${styles.services}`} aria-labelledby="services-title">
        <div className="wrap">
          <div className={styles.sectionHead}>
            <p className="label">Packages</p>
            <h2 id="services-title" className="h2">
              Choose your <em>detail.</em>
            </h2>
            <p className="muted">
              Three packages, priced by vehicle size. Pick your size to see starting prices — the final price depends on
              the car’s condition and any add-ons.
            </p>
          </div>
          <PackageChooser items={services} id="home" />
        </div>
      </section>

      {/* ---------- Full-bleed plate ---------- */}
      <section className={`on-ink ${styles.bleed}`} aria-label="Under the light">
        <Plate asset="reflectionBrown" ratio="21 / 9" sizes="100vw" bare className={styles.bleedPlate} />
        <div className={`wrap ${styles.bleedCopy}`}>
          <p className={`h2 ${styles.bleedLine}`} data-reveal>
            Clean you can see <em>up close.</em>
          </p>
          <p className={`micro ${styles.bleedCap}`}>Pl. 02 · Reflections in deep brown paint · Sample photography</p>
        </div>
      </section>

      {/* ---------- Mobile + add-ons ---------- */}
      <section className="section" aria-labelledby="mobile-title">
        <div className={`wrap ${styles.compare}`}>
          <div className={styles.compareHead}>
            <p className="label" data-reveal>
              We come to you
            </p>
            <h2 id="mobile-title" className="h2" data-reveal>
              Fully mobile, <em>{serviceArea ? `across ${serviceArea.replace(", TX", "")}.` : "at your door."}</em>
            </h2>
            <p className="muted" data-reveal>
              No drop-off, no waiting room. Tell us where the car is parked and we bring the detail to it. Need something
              extra? Add it to any package.
            </p>
            <Link href="/services/#add-ons" className="link-arrow" data-reveal>
              All add-ons <Arrow />
            </Link>
          </div>
          <div data-reveal>
            <AddOnList items={addOns} />
          </div>
        </div>
      </section>

      {/* ---------- Process preview ---------- */}
      <section className="section on-stone" aria-labelledby="process-title">
        <div className="wrap">
          <div className={styles.sectionHead}>
            <p className="label">How it works</p>
            <h2 id="process-title" className="h2">
              From a text <em>to a renewed car.</em>
            </h2>
          </div>
          <ProcessRail steps={railSteps} />
          <div className={styles.processFoot}>
            <Link href="/process/" className="link-arrow">
              The full process, and what we need from you <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Work showcase (honest placeholder state) ---------- */}
      <section className="section" aria-labelledby="work-title">
        <div className={`wrap ${styles.work}`}>
          <div className={styles.workA} data-reveal>
            <Plate asset="detailerHeadlight" ratio="3 / 4" sizes="(min-width: 64rem) 45vw, 100vw" number={3} caption="Hand finishing near the headlight" objectPosition="62% 50%" />
          </div>
          <div className={styles.workCopy} data-reveal>
            <p className="label">Our work</p>
            <h2 id="work-title" className="h2">
              Evidence, <em>not adjectives.</em>
            </h2>
            <p className="muted">
              Our project gallery is coming soon — real cars from around North Austin, before and after. Until then, the
              images on this site are licensed samples that show the kind of work involved.
              {instagram && (
                <>
                  {" "}Latest work is on{" "}
                  <a href={instagram.href} target="_blank" rel="noopener noreferrer">
                    Instagram
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                  .
                </>
              )}
            </p>
            <Link href="/gallery/" className="link-arrow">
              View the gallery <Arrow />
            </Link>
          </div>
          <div className={styles.workB} data-reveal>
            <Plate asset="wheelBrush" ratio="1 / 1" sizes="(min-width: 64rem) 22vw, 50vw" number={4} caption="Tire sidewall" />
          </div>
          <div className={styles.workC} data-reveal>
            <Plate asset="interiorRed" ratio="4 / 5" sizes="(min-width: 64rem) 22vw, 50vw" number={5} caption="Leather and console" />
          </div>
        </div>
      </section>

      {/* ---------- Testimonials: only when genuine reviews exist ---------- */}
      {testimonials.length > 0 && (
        <section className="section on-stone" aria-labelledby="reviews-title">
          <div className="wrap">
            <p className="label">In their words</p>
            <h2 id="reviews-title" className="visually-hidden">
              Customer reviews
            </h2>
            <ul role="list" className={styles.reviews}>
              {testimonials.map((t) => (
                <li key={t.name}>
                  <blockquote className="h3">“{t.quote}”</blockquote>
                  <p className="micro">
                    {t.name}
                    {t.vehicle ? ` · ${t.vehicle}` : ""}
                    {t.source ? ` · ${t.source}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
