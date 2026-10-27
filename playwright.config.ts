import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests run against the static build in `out/`.
 * Build first: `npm run build`, then `npm run test:e2e`.
 * Set E2E_FORM_ENDPOINT to the same value as NEXT_PUBLIC_FORM_ENDPOINT used for
 * the build to exercise the delivery paths (the endpoint is mocked in tests).
 */
export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4174", reducedMotion: "reduce" },
  webServer: { command: "npx serve out -l 4174 --no-request-logging", url: "http://localhost:4174", reuseExistingServer: true },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
