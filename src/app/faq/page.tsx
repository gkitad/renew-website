import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { faqs } from "@/content/pages";
import { isPreview } from "@/content/site";
import { PageIntro } from "@/components/PageIntro";
import { FaqList } from "@/components/FaqList";
import { Pending } from "@/components/Pending";
import { CtaBand } from "@/components/CtaBand";
import { Arrow } from "@/components/Icons";
import s from "../inner.module.css";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Booking, service area, choosing a package, vehicle sizes, pricing and aftercare. Straight answers from Renew Mobile Car Detailing.",
  path: "/faq/",
});

export default function FaqPage() {
  // Unknown answers (null) are hidden at launch and flagged in preview.
  const groups = faqs
    .map((g) => ({
      ...g,
      items: g.items
        .filter((it) => it.a !== null || isPreview)
        .map((it) => ({ q: it.q, a: it.a ?? <Pending label="Answer" /> })),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <PageIntro
        label="FAQ"
        title={
          <>
            Straight answers, <em>including “it depends.”</em>
          </>
        }
        lead="Where the honest answer depends on the car, we say so and explain what it depends on."
      />

      <section className={s.tight} aria-label="Questions">
        <div className="wrap">
          {groups.map((g, i) => (
            <div key={g.group} className={s.faqGroup}>
              <h2 className={s.faqGroupTitle}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                {g.group}
              </h2>
              <FaqList items={g.items} />
            </div>
          ))}
        </div>
      </section>

      <section className="section on-stone" aria-label="More questions">
        <div className={`wrap ${s.inline}`}>
          <p className="h3">Question not here?</p>
          <Link href="/contact/" className="link-arrow">
            Ask it directly <Arrow />
          </Link>
        </div>
      </section>

      <CtaBand image="microfiberHood" />
    </>
  );
}
