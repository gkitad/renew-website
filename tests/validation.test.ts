import { describe, expect, it, vi } from "vitest";
import { normalize, validateBooking, isSpam, composeMessage, smsLink } from "@/lib/validation";
import { submitBooking } from "@/lib/submit";
import { services, addOns, vehicleSizes, fromPrice } from "@/content/services";

const valid = normalize({
  name: "Test Person",
  phone: "",
  vehicleYear: "2019",
  vehicle: "Mazda 3",
  size: "sedan",
  service: "full-detail",
  addOns: ["pet-hair-removal", "odor-elimination"],
  when: "Saturday morning",
  area: "Wells Branch",
  notes: "",
  company: "",
});
const opts = { currentYear: 2026 };
const catalog = { services, addOns, sizes: vehicleSizes, brand: "Renew" };

describe("price data", () => {
  it("matches the published price sheet", () => {
    expect(services.map((s) => [s.slug, s.prices])).toEqual([
      ["interior-detail", { sedan: 170, suv: 200, large: 220 }],
      ["express-in-and-out", { sedan: 120, suv: 150, large: 180 }],
      ["full-detail", { sedan: 220, suv: 250, large: 300 }],
    ]);
    expect(addOns.map((a) => a.price)).toEqual([50, 90, 80, 50, 50]);
    expect(fromPrice(services[2])).toBe(220);
  });

  it("features Interior Detail first as the only most-popular package", () => {
    expect(services[0].slug).toBe("interior-detail");
    expect(services.filter((s) => s.popular).map((s) => s.slug)).toEqual(["interior-detail"]);
  });
});

describe("validateBooking", () => {
  it("accepts a complete, valid request", () => {
    expect(validateBooking(valid, opts)).toEqual({});
  });

  it("requires name, vehicle and size", () => {
    const e = validateBooking(normalize({}), opts);
    expect(Object.keys(e).sort()).toEqual(["name", "size", "vehicle"]);
  });

  it("requires a phone only when sending to an endpoint", () => {
    expect(validateBooking(valid, { ...opts, requirePhone: true }).phone).toBeTruthy();
    expect(validateBooking({ ...valid, phone: "(512) 555-0100" }, { ...opts, requirePhone: true })).toEqual({});
    expect(validateBooking({ ...valid, phone: "abc" }, opts).phone).toBeTruthy();
  });

  it("validates vehicle year range and size values", () => {
    expect(validateBooking({ ...valid, vehicleYear: "1850" }, opts).vehicleYear).toBeTruthy();
    expect(validateBooking({ ...valid, vehicleYear: "2027" }, opts).vehicleYear).toBeUndefined();
    expect(validateBooking({ ...valid, size: "bus" }, opts).size).toBeTruthy();
  });

  it("normalizes single and multiple add-ons", () => {
    expect(normalize({ addOns: "trim-restoration" }).addOns).toEqual(["trim-restoration"]);
    expect(normalize({ name: "  A  " }).name).toBe("A");
  });

  it("flags honeypot submissions", () => {
    expect(isSpam({ ...valid, company: "Acme" })).toBe(true);
    expect(isSpam(valid)).toBe(false);
  });
});

describe("composeMessage", () => {
  it("builds a readable booking text", () => {
    const m = composeMessage(valid, catalog);
    expect(m).toBe(
      [
        "Hi Renew! I'd like to book a detail.",
        "Name: Test Person",
        "Vehicle: 2019 Mazda 3 (Sedan / Coupe)",
        "Package: Full Detail",
        "Add-ons: Pet hair removal, Odor elimination",
        "When: Saturday morning",
        "Area: Wells Branch",
      ].join("\n"),
    );
  });

  it("asks for a recommendation when no package is chosen", () => {
    expect(composeMessage({ ...valid, service: "", addOns: [] }, catalog)).toContain("Package: Not sure, please recommend one");
  });

  it("encodes the body into an sms link", () => {
    expect(smsLink("sms:+15127752131", "Hi & bye\nok")).toBe("sms:+15127752131?&body=Hi%20%26%20bye%0Aok");
  });
});

describe("submitBooking", () => {
  it("reports not-configured and sends nothing without an endpoint", async () => {
    const f = vi.fn();
    expect(await submitBooking("", valid, "m", f as unknown as typeof fetch)).toEqual({ status: "not-configured" });
    expect(f).not.toHaveBeenCalled();
  });

  it("reports sent only on a 2xx response, without the honeypot field", async () => {
    const f = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    expect(await submitBooking("https://forms.test/x", valid, "msg", f as unknown as typeof fetch)).toEqual({ status: "sent" });
    const body = JSON.parse(f.mock.calls[0][1].body);
    expect(body.company).toBeUndefined();
    expect(body.message).toBe("msg");
    expect(body.addOns).toBe("pet-hair-removal, odor-elimination");
  });

  it("reports an error on non-2xx and on network failure", async () => {
    const bad = vi.fn().mockResolvedValue(new Response("", { status: 500 }));
    expect((await submitBooking("https://forms.test/x", valid, "m", bad as unknown as typeof fetch)).status).toBe("error");
    const down = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    expect((await submitBooking("https://forms.test/x", valid, "m", down as unknown as typeof fetch)).status).toBe("error");
  });
});
