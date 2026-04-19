/**
 * stepper-semantics.spec.mjs — M17.3 (P2)
 * Browser-level: stepper current/completed semantics, data-state, aria-current.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/stepper.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("stepper: is an <ol> (ordered list) for sequential steps", async ({ page }) => {
  await expect(page.locator("ol.stepper")).toBeAttached();
});

test("stepper: has aria-label", async ({ page }) => {
  await expect(page.locator("#stepper")).toHaveAttribute("aria-label", "Account setup steps");
});

test("stepper: completed step has data-state=complete", async ({ page }) => {
  await expect(page.locator("#step-1")).toHaveAttribute("data-state", "complete");
});

test("stepper: active step has data-state=active", async ({ page }) => {
  await expect(page.locator("#step-2")).toHaveAttribute("data-state", "active");
});

test("stepper: pending steps have data-state=pending", async ({ page }) => {
  await expect(page.locator("#step-3")).toHaveAttribute("data-state", "pending");
  await expect(page.locator("#step-4")).toHaveAttribute("data-state", "pending");
});

test("stepper: active step has aria-current=step", async ({ page }) => {
  await expect(page.locator("#step-2")).toHaveAttribute("aria-current", "step");
});

test("stepper: completed and pending steps do not have aria-current", async ({ page }) => {
  await expect(page.locator("#step-1")).not.toHaveAttribute("aria-current");
  await expect(page.locator("#step-3")).not.toHaveAttribute("aria-current");
});

test("stepper: Next advances to next step", async ({ page }) => {
  await page.click("#next-step");
  await expect(page.locator("#step-2")).toHaveAttribute("data-state", "complete");
  await expect(page.locator("#step-3")).toHaveAttribute("data-state", "active");
  await expect(page.locator("#step-3")).toHaveAttribute("aria-current", "step");
});

test("stepper: Back moves to previous step", async ({ page }) => {
  await page.click("#next-step");
  await page.click("#prev-step");
  await expect(page.locator("#step-2")).toHaveAttribute("data-state", "active");
  await expect(page.locator("#step-2")).toHaveAttribute("aria-current", "step");
  await expect(page.locator("#step-3")).toHaveAttribute("data-state", "pending");
});

test("stepper: markers are aria-hidden (decorative)", async ({ page }) => {
  const markers = page.locator(".stepper-marker");
  for (const m of await markers.all()) {
    await expect(m).toHaveAttribute("aria-hidden", "true");
  }
});
