import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services } from "../src/content/services";

const pages = ["/", "/services/", "/about/", "/process/", "/gallery/", "/faq/", "/contact/", "/privacy/", `/services/${services[0].slug}/`];

test.beforeEach(async ({ page }) => {
  await page.route("https://images.unsplash.com/**", (r) =>
    r.fulfill({ contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"/>' }),
  );
});

for (const path of pages) {
  test(`axe WCAG 2.2 AA: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).slice(0, 4).join(", ")}`);
    expect(summary).toEqual([]);
  });
}

test("axe: contact form with errors and open mobile menu", async ({ page, isMobile }) => {
  await page.goto("/contact/");
  await page.getByRole("button", { name: /Send request|Prepare my message/ }).click();
  let r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  expect(r.violations.map((v) => v.id)).toEqual([]);
  if (isMobile) {
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
    expect(r.violations.map((v) => v.id)).toEqual([]);
  }
});
