"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { site, isPreview } from "@/content/site";
import { vehicleSizes, usd } from "@/content/services";
import {
  normalize,
  validateBooking,
  isSpam,
  composeMessage,
  smsLink,
  LIMITS,
  type BookingInput,
  type FieldErrors,
} from "@/lib/validation";
import { submitBooking } from "@/lib/submit";
import { Arrow } from "./Icons";
import styles from "./EstimateForm.module.css";

type Status = "idle" | "submitting" | "sent" | "compose" | "error";
type Props = {
  services: { slug: string; name: string; prices: Record<string, number> }[];
  addOns: { slug: string; name: string; price: number }[];
};

const FIELD_ORDER: (keyof BookingInput)[] = ["name", "phone", "vehicleYear", "vehicle", "size", "service", "when", "area", "notes"];

/**
 * Booking request form.
 * - With NEXT_PUBLIC_FORM_ENDPOINT set: posts the request; success only on a 2xx reply.
 * - Without it: composes a ready-to-send text message (SMS link / copy for Instagram DM).
 *   Nothing is sent by the website in that mode, and the UI says so.
 */
export function EstimateForm({ services, addOns }: Props) {
  const params = useSearchParams();
  const preselect = params.get("service");
  const initialService = services.some((s) => s.slug === preselect) ? preselect! : "";
  const endpoint = site.form.endpoint;

  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const read = (): BookingInput => {
    const fd = new FormData(formRef.current!);
    return normalize({ ...Object.fromEntries(fd.entries()), addOns: fd.getAll("addOns") });
  };
  const validate = (input: BookingInput) => validateBooking(input, { requirePhone: !!endpoint });

  const revalidate = () => {
    if (submitted) setErrors(validate(read()));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const input = read();
    const errs = validate(input);
    setErrors(errs);
    if (Object.keys(errs).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const text = composeMessage(input, { services, addOns, sizes: vehicleSizes, brand: site.brand.shortName });
    setMessage(text);
    if (isSpam(input)) {
      setStatus("error");
      setErrorMessage("The request could not be sent.");
      return;
    }
    if (!endpoint) {
      setCopied(false);
      setStatus("compose");
      requestAnimationFrame(() => resultRef.current?.focus());
      return;
    }
    setStatus("submitting");
    const result = await submitBooking(endpoint, input, text);
    if (result.status === "error") setErrorMessage(result.message);
    setStatus(result.status === "not-configured" ? "compose" : result.status);
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const errorList = FIELD_ORDER.filter((f) => errors[f]);
  const describe = (f: keyof BookingInput, hint?: boolean) =>
    [hint ? id(`${f}-hint`) : null, errors[f] ? id(`${f}-error`) : null].filter(Boolean).join(" ") || undefined;
  const err = (f: keyof BookingInput) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="field-error">
        {errors[f]}
      </p>
    ) : null;

  if (status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} className={`${styles.result} ${styles.sent}`} role="status">
        <p className="label">Request received</p>
        <h2 className="h2">Thank you.</h2>
        <p className="lead">Your request has been delivered. We’ll text you back to confirm the price and a time.</p>
        <Link href="/process/" className="link-arrow">
          What happens next <Arrow />
        </Link>
      </div>
    );
  }

  const composePanel =
    status === "compose" ? (
      <div ref={resultRef} tabIndex={-1} className={`${styles.result} ${styles.sent}`} role="status" aria-labelledby={id("compose-title")}>
        <p className="label">Almost done</p>
        <h2 id={id("compose-title")} className="h2">
          Your message is <em>ready to send.</em>
        </h2>
        <p className={styles.notice}>
          <strong>Nothing has been sent yet.</strong> Send it as a text from your phone, or copy it into an Instagram DM.
        </p>
        <pre className={styles.preview} aria-label="Message preview">
          {message}
        </pre>
        <div className={styles.composeActions}>
          {site.contact.smsHref && (
            <a href={smsLink(site.contact.smsHref, message)} className="btn">
              Open in Messages <Arrow />
            </a>
          )}
          <button type="button" className="btn btn--ghost" onClick={copy}>
            {copied ? "Copied ✓" : "Copy message"}
          </button>
          <a href={site.dmHref} className="link-arrow" target="_blank" rel="noopener noreferrer">
            Open Instagram DM <Arrow />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
        <p className="visually-hidden" aria-live="polite">
          {copied ? "Message copied to clipboard" : ""}
        </p>
        {site.contact.phone && (
          <p className="muted">
            On a computer? Text it to {site.contact.phone} from your phone, or paste it into a DM.
          </p>
        )}
        <button type="button" className={styles.back} onClick={() => {
            setStatus("idle");
            requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("input:not([tabindex='-1']), select, textarea")?.focus());
          }}>
          ← Edit details
        </button>
      </div>
    ) : null;

  return (
    <>
    {composePanel}
    {/* The form stays mounted (hidden) while the message is shown, so "Edit details" keeps what was typed. */}
    <form ref={formRef} className={styles.form} noValidate hidden={status === "compose"} onSubmit={onSubmit} onChange={revalidate} aria-describedby={id("intro")}>
      <p id={id("intro")} className={`muted ${styles.intro}`}>
        {endpoint
          ? "Fill this in and we’ll text you back to confirm."
          : "Fill this in and we’ll turn it into a ready-to-send text message."}{" "}
        Fields marked <span aria-hidden="true">*</span>
        <span className="visually-hidden">with an asterisk</span> are required.
      </p>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className={styles.summary} role="alert" aria-labelledby={id("summary-title")}>
          <p id={id("summary-title")} className={styles.summaryTitle}>
            Please check {errorList.length === 1 ? "1 field" : `${errorList.length} fields`}:
          </p>
          <ul>
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${id(f === "size" ? "size-sedan" : f)}`}>{errors[f]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "error" && (
        <div ref={resultRef} tabIndex={-1} className={`${styles.result} ${styles.warn}`} role="alert">
          <p className={styles.summaryTitle}>Your request was not sent.</p>
          <p>
            {errorMessage} Your details are still filled in below
            {site.contact.phone ? <>, or text us directly at {site.contact.phone}</> : null}.
          </p>
        </div>
      )}

      <fieldset className={styles.group}>
        <legend className={`micro ${styles.legend}`}>
          <span className="num">01</span> The car
        </legend>
        <fieldset className="field" aria-describedby={describe("size")}>
          <legend>
            Vehicle size <span aria-hidden="true">*</span>
          </legend>
          <div className={styles.sizeChoices} data-invalid={errors.size ? "true" : undefined}>
            {vehicleSizes.map((v) => (
              <label key={v.id} className={styles.sizeChoice}>
                <input type="radio" name="size" value={v.id} id={id(`size-${v.id}`)} />
                <span>
                  <strong>{v.label}</strong>
                  <small>{v.detail}</small>
                </span>
              </label>
            ))}
          </div>
          {err("size")}
        </fieldset>
        <div className={styles.rowVehicle}>
          <div className="field">
            <label htmlFor={id("vehicleYear")}>
              Year <span className="opt">(optional)</span>
            </label>
            <input id={id("vehicleYear")} name="vehicleYear" className="input" inputMode="numeric" maxLength={4} placeholder="2021"
              aria-invalid={!!errors.vehicleYear} aria-describedby={describe("vehicleYear")} />
            {err("vehicleYear")}
          </div>
          <div className="field">
            <label htmlFor={id("vehicle")}>
              Make and model <span aria-hidden="true">*</span>
            </label>
            <input id={id("vehicle")} name="vehicle" className="input" required maxLength={LIMITS.vehicle} placeholder="e.g. Toyota RAV4"
              aria-invalid={!!errors.vehicle} aria-describedby={describe("vehicle")} />
            {err("vehicle")}
          </div>
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={`micro ${styles.legend}`}>
          <span className="num">02</span> The detail
        </legend>
        <div className="field">
          <label htmlFor={id("service")}>Package</label>
          <select id={id("service")} name="service" className="input" defaultValue={initialService}>
            <option value="">Not sure, recommend one</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}: from {usd(Math.min(...Object.values(s.prices)))}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="field">
          <legend>
            Add-ons <span className="opt">(optional)</span>
          </legend>
          <div className={styles.checks}>
            {addOns.map((a) => (
              <label key={a.slug} className={styles.check}>
                <input type="checkbox" name="addOns" value={a.slug} />
                <span>
                  {a.name} <small>from {usd(a.price)}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={`micro ${styles.legend}`}>
          <span className="num">03</span> You
        </legend>
        <div className={styles.row2}>
          <div className="field">
            <label htmlFor={id("name")}>
              Name <span aria-hidden="true">*</span>
            </label>
            <input id={id("name")} name="name" className="input" autoComplete="name" required maxLength={LIMITS.name}
              aria-invalid={!!errors.name} aria-describedby={describe("name")} />
            {err("name")}
          </div>
          <div className="field">
            <label htmlFor={id("phone")}>
              Phone {endpoint ? <span aria-hidden="true">*</span> : <span className="opt">(optional)</span>}
            </label>
            <input id={id("phone")} name="phone" type="tel" className="input" autoComplete="tel" inputMode="tel" maxLength={LIMITS.phone}
              aria-invalid={!!errors.phone} aria-describedby={describe("phone")} />
            {err("phone")}
          </div>
        </div>
        <div className={styles.row2}>
          <div className="field">
            <label htmlFor={id("when")}>
              Preferred day / time <span className="opt">(optional)</span>
            </label>
            <input id={id("when")} name="when" className="input" maxLength={LIMITS.when} placeholder="e.g. Saturday morning"
              aria-invalid={!!errors.when} aria-describedby={describe("when")} />
            {err("when")}
          </div>
          <div className="field">
            <label htmlFor={id("area")}>
              Area or neighborhood <span className="opt">(optional)</span>
            </label>
            <input id={id("area")} name="area" className="input" maxLength={LIMITS.area} placeholder="e.g. Wells Branch"
              aria-invalid={!!errors.area} aria-describedby={describe("area", true)} />
            <p id={id("area-hint")} className="hint">
              No need for your full address yet.
            </p>
            {err("area")}
          </div>
        </div>
        <div className="field">
          <label htmlFor={id("notes")}>
            Anything we should know? <span className="opt">(optional)</span>
          </label>
          <textarea id={id("notes")} name="notes" className="input" maxLength={LIMITS.notes} rows={4}
            placeholder="Stains, pet hair, smoke smell, kids’ car seats…" aria-invalid={!!errors.notes} aria-describedby={describe("notes")} />
          {err("notes")}
        </div>
      </fieldset>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className="btn" disabled={status === "submitting"} aria-describedby={id("privacy")}>
          {status === "submitting" ? "Sending…" : endpoint ? "Send request" : "Prepare my message"}{" "}
          {status !== "submitting" && <Arrow />}
        </button>
        <p id={id("privacy")} className={`muted ${styles.privacy}`}>
          {endpoint ? "Your details are used only to reply to this request." : "Nothing is sent until you send the message yourself."}{" "}
          <Link href="/privacy/">Privacy notice</Link>.
        </p>
      </div>
      {isPreview && !endpoint && (
        <p className={styles.dev}>
          Site owner: to also receive requests by email, set <code>NEXT_PUBLIC_FORM_ENDPOINT</code> (see README).
        </p>
      )}
      <p className="visually-hidden" aria-live="polite">
        {status === "submitting" ? "Sending your request" : ""}
      </p>
    </form>
    </>
  );
}
