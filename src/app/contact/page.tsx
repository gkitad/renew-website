import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { addOns } from "@/content/services";
import { visibleServices } from "@/lib/content";
import { EstimateForm } from "@/components/EstimateForm";
import { Pending } from "@/components/Pending";
import { Hours } from "@/components/Hours";
import { Arrow } from "@/components/Icons";
import s from "../inner.module.css";

export const metadata = pageMetadata({
  title: "Book a detail",
  description: "Book mobile car detailing in North Austin. Text (512) 775-2131 or DM @renew.cardetailing on Instagram.",
  path: "/contact/",
});

export default function ContactPage() {
  const { contact, serviceArea, social, dmHref } = site;
  const instagram = social.find((x) => x.label === "Instagram");
  const services = visibleServices().map(({ slug, name, prices }) => ({ slug, name, prices }));
  return (
    <section className={s.contact} aria-labelledby="contact-title">
      <div className={`wrap ${s.contactGrid}`}>
        <aside className={s.contactAside}>
          <p className="label">Book</p>
          <h1 id="contact-title" className="h1">
            Book your <em>detail.</em>
          </h1>
          <p className="lead">The fastest way to book is a text or an Instagram DM. Tell us your car, its size and the package you want.</p>

          <div className={s.bookActions}>
            {contact.smsHref && contact.phone && (
              <a href={contact.smsHref} className="btn">
                Text {contact.phone} <Arrow />
              </a>
            )}
            {instagram && (
              <a href={dmHref} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
                DM {instagram.handle}
                <span className="visually-hidden"> on Instagram (opens in a new tab)</span>
              </a>
            )}
          </div>

          <dl className={s.contactList}>
            <div>
              <dt className="micro">Text</dt>
              <dd>
                {contact.phone && contact.smsHref ? <a href={contact.smsHref}>{contact.phone}</a> : <Pending label="Phone" />}
              </dd>
            </div>
            {instagram && (
              <div>
                <dt className="micro">Instagram</dt>
                <dd>
                  <a href={instagram.href} target="_blank" rel="noopener noreferrer">
                    {instagram.handle}
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="micro">Service area</dt>
              <dd>{serviceArea ? <>Mobile · {serviceArea} and nearby</> : <Pending label="Service area" />}</dd>
            </div>
            {contact.email && (
              <div>
                <dt className="micro">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
            )}
            <div>
              <dt className="micro">Hours</dt>
              <dd>
                <Hours compact />
              </dd>
            </div>
          </dl>
        </aside>

        <div className={s.contactForm}>
          <h2 className={`h3 ${s.formTitle}`}>Prefer to fill in the details here?</h2>
          <Suspense fallback={null}>
            <EstimateForm services={services} addOns={addOns.map(({ slug, name, price }) => ({ slug, name, price }))} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
