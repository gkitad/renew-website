import type { BookingInput } from "./validation";

export type SubmitResult = { status: "sent" } | { status: "not-configured" } | { status: "error"; message: string };

/**
 * Sends the booking request to the configured endpoint (NEXT_PUBLIC_FORM_ENDPOINT).
 * Success is reported ONLY when the endpoint answers with a 2xx status.
 * With no endpoint configured nothing is sent and the caller is told so.
 */
export async function submitBooking(
  endpoint: string,
  input: BookingInput,
  message: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!endpoint) return { status: "not-configured" };

  const { company: _honeypot, ...payload } = input;
  void _honeypot;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, addOns: payload.addOns.join(", "), message, _subject: `Booking request — ${payload.vehicle}` }),
      signal: controller.signal,
    });
    if (res.ok) return { status: "sent" };
    return { status: "error", message: `The request was not accepted (status ${res.status}).` };
  } catch {
    return { status: "error", message: "The request could not be sent. Check your connection and try again." };
  } finally {
    clearTimeout(timer);
  }
}
