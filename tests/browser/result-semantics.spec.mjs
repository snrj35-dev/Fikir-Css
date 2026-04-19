/**
 * result-semantics.spec.mjs — M17.5 (P2)
 * Browser-level: result tone/heading semantics, data-result-tone, heading hierarchy.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/result.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("result: success tone has data-result-tone=success", async ({ page }) => {
  await expect(page.locator("#result-success")).toHaveAttribute("data-result-tone", "success");
});

test("result: danger tone has data-result-tone=danger", async ({ page }) => {
  await expect(page.locator("#result-danger")).toHaveAttribute("data-result-tone", "danger");
});

test("result: info tone has data-result-tone=info", async ({ page }) => {
  await expect(page.locator("#result-info")).toHaveAttribute("data-result-tone", "info");
});

test("result: warning tone has data-result-tone=warning", async ({ page }) => {
  await expect(page.locator("#result-warning")).toHaveAttribute("data-result-tone", "warning");
});

test("result: each result has a heading (h2)", async ({ page }) => {
  const headings = page.locator(".result-title");
  await expect(headings).toHaveCount(4);
});

test("result: success heading has correct text", async ({ page }) => {
  await expect(page.locator("#result-success-title")).toContainText("Payment successful");
});

test("result: danger heading has correct text", async ({ page }) => {
  await expect(page.locator("#result-danger-title")).toContainText("Payment failed");
});

test("result: result media elements are aria-hidden", async ({ page }) => {
  const media = page.locator(".result-media");
  for (const m of await media.all()) {
    await expect(m).toHaveAttribute("aria-hidden", "true");
  }
});

test("result: success result has a visible action", async ({ page }) => {
  await expect(page.locator("#result-success-link")).toBeVisible();
  await expect(page.locator("#result-success-link")).toContainText("View receipt");
});

test("result: danger result retry button is focusable", async ({ page }) => {
  await page.locator("#result-retry").focus();
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("result-retry");
});

test("result: all four tones render without error", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url);
  await expect(page.locator(".result")).toHaveCount(4);
  expect(errors).toHaveLength(0);
});
