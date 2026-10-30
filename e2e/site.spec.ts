import { test, expect, type Page } from "@playwright/test";
import { services } from "../src/content/services";
import { nav } from "../src/content/site";

const ENDPOINT = process.env.E2E_FORM_ENDPOINT || "";

// Unsplash is not reachable from CI sandboxes; serve a tiny placeholder instead.
test.beforeEach(async ({ page }) => {
  await page.route("https://images.unsplash.com/**", (r) =>
    r.fulfill({ contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"/>' }),
  );
});

async function noConsoleErrors(page: Page, path: string) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(path);
  await page.waitForLoadState("networkidle");
  return errors;
}

const pages = ["/", "/services/", "/about/", "/process/", "/gallery/", "/faq/", "/contact/", "/privacy/", ...services.map((s) => `/services/${s.slug}/`)];

for (const path of pages) {
  test(`page ${path}: one h1, titled, images have alt, no console errors`, async ({ page }) => {
    const errors = await noConsoleErrors(page, path);
    expect(errors).toEqual([]);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Renew/);
    expect(await page.locator("img:not([alt])").count()).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
}

test("desktop navigation reaches every main page", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop nav only");
  await page.goto("/");
  for (const item of nav) {
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: item.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${item.href}$`));
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: item.label, exact: true })).toHaveAttribute("aria-current", "page");
  }
  await page.getByRole("banner").getByRole("link", { name: "Book a detail" }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
});

test("every package opens its detail page", async ({ page }) => {
  for (const s of services) {
    await page.goto("/services/");
    await page.locator(`main a[href="/services/${s.slug}/"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`/services/${s.slug}/$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(s.name);
  }
});

test("vehicle size switch updates package prices", async ({ page }) => {
  await page.goto("/services/");
  const express = page.locator("main li").filter({ has: page.getByRole("heading", { name: "Express In & Out" }) }).first();
  await expect(express.getByText("$120", { exact: false })).toBeVisible();
  await expect(express.getByText("$150", { exact: false })).toBeHidden();
  await page.getByRole("radio", { name: /SUV \/ Crossover/ }).first().check();
  await expect(express.getByText("$150", { exact: false })).toBeVisible();
  await expect(express.getByText("$120", { exact: false })).toBeHidden();
  await page.getByRole("radio", { name: /3-row SUV/ }).first().check();
  await expect(express.getByText("$180", { exact: false })).toBeVisible();
});

test("package CTA preselects the package in the booking form", async ({ page }) => {
  await page.goto("/services/full-detail/");
  await page.locator("main").getByRole("link", { name: /Book Full Detail/ }).first().click();
  await expect(page).toHaveURL(/service=full-detail/);
  await expect(page.getByRole("combobox", { name: "Package" })).toHaveValue("full-detail");
});

test("Interior Detail is listed first and marked Most popular", async ({ page }) => {
  for (const path of ["/", "/services/"]) {
    await page.goto(path);
    const first = page.locator("main li").filter({ hasText: "Starting at" }).first();
    await expect(first.getByRole("heading", { level: 3 })).toHaveText("Interior Detail");
    await expect(first.getByText("Most popular")).toBeVisible();
  }
});

test("business hours are the same everywhere", async ({ page }) => {
  for (const path of ["/", "/contact/", "/faq/", "/services/full-detail/"]) {
    await page.goto(path);
    if (path === "/faq/") await page.getByText("What are your hours?").click();
    const text = await page.locator("body").innerText();
    expect(text, path).toContain("Monday – Saturday");
    expect(text, path).toContain("8:00 AM – 8:00 PM");
    expect(text, path).toContain("2:00 PM – 8:00 PM");
    expect(text, path).not.toContain("to confirm");
  }
});

test("contact page offers text and Instagram DM", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.locator('main a[href="sms:+15127752131"]').first()).toBeVisible();
  await expect(page.locator('main a[href="https://ig.me/m/renew.cardetailing"]').first()).toBeVisible();
});

test("unknown routes show the not-found page", async ({ page }) => {
  const res = await page.goto("/does-not-exist/");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Nothing here");
  await page.getByRole("link", { name: "Back to home" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("skip link moves focus to main content", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard test");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("mobile menu opens, traps focus, closes with Escape and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu", exact: true });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(dialog.getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: /Book a detail/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await dialog.getByRole("link", { name: /FAQ/ }).click();
  await expect(page).toHaveURL(/\/faq\/$/);
  await expect(dialog).toBeHidden();
  await toggle.click();
  await dialog.getByRole("button", { name: "Close menu" }).click();
  await expect(dialog).toBeHidden();
});

test("FAQ items expand and collapse", async ({ page }) => {
  await page.goto("/faq/");
  const q = page.getByText("Why are prices “starting at”?");
  const answer = page.getByText("The starting price is set by vehicle size");
  await expect(answer).toBeHidden();
  await q.click();
  await expect(answer).toBeVisible();
  await q.click();
  await expect(answer).toBeHidden();
});

test("gallery lightbox: open, step, close, focus returns", async ({ page }) => {
  await page.goto("/gallery/");
  const first = page.getByRole("button", { name: /Enlarge image/ }).first();
  await first.click();
  const dialog = page.locator("dialog[open]");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/^01 \/ 09$/)).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText(/^02 \/ 09$/)).toBeVisible();
  await dialog.getByRole("button", { name: "Previous image" }).click();
  await dialog.getByRole("button", { name: "Previous image" }).click();
  await expect(dialog.getByText(/^09 \/ 09$/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(first).toBeFocused();
});

test.describe("booking form", () => {
  test("shows accessible errors for missing and invalid fields", async ({ page }) => {
    await page.goto("/contact/");
    await page.getByRole("button", { name: ENDPOINT ? /Send request/ : /Prepare my message/ }).click();
    const alert = page.locator("[role=alert]").filter({ hasText: "Please check" });
    await expect(alert).toContainText(ENDPOINT ? "Please check 4 fields" : "Please check 3 fields");
    await expect(alert).toBeFocused();
    await expect(page.getByRole("textbox", { name: "Name" })).toHaveAttribute("aria-invalid", "true");
    await page.getByRole("textbox", { name: "Name" }).fill("Test Person");
    await page.getByLabel(/^Make and model/).fill("Honda Civic");
    await page.getByLabel(/^Year/).fill("18");
    await expect(alert).toContainText(ENDPOINT ? "Please check 3 fields" : "Please check 2 fields");
    await expect(page.getByText("Enter a four-digit year", { exact: false }).first()).toBeVisible();
  });

  async function fillValid(page: Page) {
    await page.goto("/contact/?service=interior-detail");
    await page.getByRole("radio", { name: /SUV \/ Crossover/ }).check();
    await page.getByLabel(/^Year/).fill("2020");
    await page.getByLabel(/^Make and model/).fill("Honda CR-V");
    await page.getByRole("checkbox", { name: /Pet hair removal/ }).check();
    await page.getByRole("textbox", { name: "Name" }).fill("Test Person");
    if (ENDPOINT) await page.getByRole("textbox", { name: "Phone" }).fill("(512) 555-0100");
  }

  test("without an endpoint, prepares a text message and sends nothing", async ({ page }) => {
    test.skip(!!ENDPOINT, "build has an endpoint");
    let posted = false;
    page.on("request", (r) => r.method() === "POST" && (posted = true));
    await fillValid(page);
    await page.getByRole("button", { name: /Prepare my message/ }).click();
    await expect(page.getByRole("heading", { name: /ready to send/ })).toBeVisible();
    await expect(page.getByText("Nothing has been sent yet.")).toBeVisible();
    const preview = page.getByLabel("Message preview");
    await expect(preview).toContainText("Vehicle: 2020 Honda CR-V (SUV / Crossover)");
    await expect(preview).toContainText("Package: Interior Detail");
    await expect(preview).toContainText("Add-ons: Pet hair removal");
    const href = await page.getByRole("link", { name: /Open in Messages/ }).getAttribute("href");
    expect(href).toMatch(/^sms:\+15127752131\?&body=Hi%20Renew/);
    expect(posted).toBe(false);
    await page.getByRole("button", { name: /Edit details/ }).click();
    await expect(page.getByRole("textbox", { name: "Name" })).toHaveValue("Test Person");
  });

  test("shows success only after the endpoint accepts", async ({ page }) => {
    test.skip(!ENDPOINT, "no endpoint in this build");
    let body: Record<string, string> = {};
    await page.route(ENDPOINT, async (r) => {
      body = r.request().postDataJSON();
      await new Promise((res) => setTimeout(res, 300));
      await r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    });
    await fillValid(page);
    await page.getByRole("button", { name: /Send request/ }).click();
    await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
    await expect(page.getByRole("heading", { name: "Thank you." })).toBeVisible();
    expect(body.vehicle).toBe("Honda CR-V");
    expect(body.size).toBe("suv");
    expect(body.company).toBeUndefined();
  });

  test("reports failure when the endpoint rejects", async ({ page }) => {
    test.skip(!ENDPOINT, "no endpoint in this build");
    await page.route(ENDPOINT, (r) => r.fulfill({ status: 500, body: "" }));
    await fillValid(page);
    await page.getByRole("button", { name: /Send request/ }).click();
    await expect(page.locator("[role=alert]").filter({ hasText: "Your request was not sent" })).toBeVisible();
    await expect(page.getByText("Thank you.")).toHaveCount(0);
  });
});
