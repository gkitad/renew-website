import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { Pending } from "@/components/Pending";
import s from "../inner.module.css";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `How ${site.brand.name} handles the information you send through this website.`,
  path: "/privacy/",
});

/**
 * Plain-language privacy notice template. Have it reviewed for your
 * jurisdiction and form provider before launch; this is not legal advice.
 */
export default function PrivacyPage() {
  return (
    <section className={s.legal} aria-labelledby="privacy-title">
      <div className="wrap">
        <p className="label">Privacy</p>
        <h1 id="privacy-title" className="h1">
          Privacy notice
        </h1>
        <div className={`prose ${s.legalBody}`}>
          <p className="lead">This page explains what happens to information you send through this website.</p>
          <h2 className="h3">What we collect</h2>
          <p>
            Most bookings happen by text message or Instagram DM, so we only receive what you choose to send us there.
            The booking form on this website does not send anything by itself: it prepares a message that you send from
            your own phone or Instagram account. We do not ask for payment details on this website.
          </p>
          <h2 className="h3">How it is used</h2>
          <p>
            Only to reply to your request and, if you go ahead, to arrange the detail. We do not sell your information or
            add you to marketing lists without asking.
          </p>
          <h2 className="h3">Where it is stored</h2>
          <p>
            Messages stay in the texting app or Instagram account they were sent to.{" "}
            {site.form.endpoint ? (
              <>Requests sent through the website form are delivered to us by a third-party form service. <Pending label="Form provider name & retention period" /></>
            ) : null}
          </p>
          <h2 className="h3">Cookies and analytics</h2>
          <p>This website does not set advertising cookies. If analytics are added, this notice will be updated first.</p>
          <h2 className="h3">Your choices</h2>
          <p>
            You can ask us to delete the information you sent at any time — just text{" "}
            {site.contact.smsHref && site.contact.phone ? <a href={site.contact.smsHref}>{site.contact.phone}</a> : <Pending label="Phone" />}.
          </p>
          <p className="muted">Last updated: October 27, 2026</p>
        </div>
      </div>
    </section>
  );
}
