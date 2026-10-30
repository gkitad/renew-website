import Link from "next/link";
import { notFound } from "next/navigation";
import { assets } from "@/content/assets";
import { addOns, fromPrice, usd, vehicleSizes } from "@/content/services";
import { visibleServices, getService, pad } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { Plate } from "@/components/Plate";
import { AddOnList } from "@/components/AddOnList";
import { CtaBand } from "@/components/CtaBand";
import { Arrow } from "@/components/Icons";
import s from "../../inner.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleServices().map((sv) => ({ slug: sv.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sv = getService(slug);
  if (!sv) return {};
  return pageMetadata({
    title: `${sv.name} from ${usd(fromPrice(sv))}`,
    description: `${sv.short} Mobile detailing in North Austin, priced by vehicle size from ${usd(fromPrice(sv))}.`,
    path: `/services/${sv.slug}/`,
    image: `${assets[sv.image].src}?w=1200&h=630&fit=crop&q=70&auto=format`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sv = getService(slug);
  if (!sv) notFound();
  const all = visibleServices();
  const index = all.findIndex((x) => x.slug === sv.slug);
  const related = sv.related.map((r) => getService(r)).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const bookHref = `/contact/?service=${sv.slug}`;

  return (
    <>
      <nav aria-label="Breadcrumb" className={`wrap ${s.crumbs}`}>
        <ol role="list">
          <li>
            <Link href="/services/">Packages</Link>
          </li>
          <li aria-current="page">{sv.name}</li>
        </ol>
      </nav>

      <section className={s.svHero} aria-labelledby="sv-title">
        <div className={`wrap ${s.svHeroGrid}`}>
          <div className={s.svHeroCopy}>
            <p className="label">
              Package <span className="num">{pad(index + 1)}</span> / <span className="num">{pad(all.length)}</span>
              {sv.popular ? " · Most popular" : ""}
            </p>
            <h1 id="sv-title" className="h1">
              {sv.name}
            </h1>
            <p className="lead">{sv.summary}</p>
            <dl className={s.sizePrices} aria-label="Starting prices by vehicle size">
              {vehicleSizes.map((v) => (
                <div key={v.id}>
                  <dt>
                    {v.label}
                    <span>{v.detail}</span>
                  </dt>
                  <dd>
                    <small>From</small>
                    {usd(sv.prices[v.id])}
                  </dd>
                </div>
              ))}
            </dl>
            <Link href={bookHref} className="btn">
              Book {sv.name} <Arrow />
            </Link>
          </div>
          <div className={s.svHeroMedia}>
            <Plate asset={sv.image} ratio="4 / 5" sizes="(min-width: 64rem) 38vw, 100vw" priority number={1} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="scope-title">
        <div className={`wrap ${s.columns}`}>
          <div>
            <p className="label">{sv.tagline}</p>
            <ul role="list" className={s.ticks}>
              {sv.suitedFor.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="scope-title" className="label">
              What’s included
            </h2>
            {sv.includesPrefix && (
              <p className={s.prefixNote}>
                Everything in <Link href="/services/interior-detail/">the Interior Detail</Link>, plus:
              </p>
            )}
            <ol role="list" className={s.scope}>
              {sv.includes.map((x, i) => (
                <li key={x}>
                  <span className="num">{pad(i + 1)}</span>
                  {x}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section on-ink" aria-labelledby="how-title">
        <div className={`wrap ${s.how}`}>
          <div className={s.howHead}>
            <p className="label">How it’s done</p>
            <h2 id="how-title" className="h2">
              Three stages, <em>in order.</em>
            </h2>
          </div>
          <ol role="list" className={s.howSteps}>
            {sv.steps.map((st, i) => (
              <li key={st.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <span className={`num ${s.howNum}`}>{pad(i + 1)}</span>
                <h3 className="h3">{st.title}</h3>
                <p className="muted">{st.body}</p>
              </li>
            ))}
          </ol>
          <div className={s.howMedia}>
            <Plate asset={sv.detailImage} ratio="3 / 2" sizes="(min-width: 64rem) 50vw, 100vw" number={2} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="limits-title">
        <div className={`wrap ${s.limits}`}>
          <div>
            <p className="label">Good to know</p>
            <h2 id="limits-title" className="h2">
              What to <em>expect.</em>
            </h2>
          </div>
          <ul role="list" className={s.limitList}>
            {sv.considerations.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section on-stone" aria-labelledby="addons-title">
        <div className={`wrap ${s.split}`}>
          <div className={s.splitHead}>
            <p className="label">Add-ons</p>
            <h2 id="addons-title" className="h2">
              Add to this <em>package.</em>
            </h2>
            <p className="muted">Mention any add-ons when you book.</p>
          </div>
          <AddOnList items={addOns} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title" className="label">
              Other packages
            </h2>
            <ul role="list" className={s.related}>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/services/${r.slug}/`} className={s.relatedLink}>
                    <Plate asset={r.image} ratio="3 / 2" sizes="(min-width: 48rem) 40vw, 100vw" bare />
                    <span className={s.relatedName}>{r.name}</span>
                    <span className="muted">
                      {r.short} From {usd(fromPrice(r))}.
                    </span>
                    <span className="link-arrow" aria-hidden="true">
                      View package <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={
          <>
            Book the <em>{sv.name}.</em>
          </>
        }
        body="Text or DM us your vehicle and size. We’ll confirm the price and a time, then come to you."
        image={sv.detailImage === "detailerHeadlight" ? "garageCar" : "detailerHeadlight"}
        href={bookHref}
      />
    </>
  );
}
