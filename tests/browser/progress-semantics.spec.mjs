/**
 * progress-semantics.spec.mjs — M17.5 (P2)
 * Browser-level: progress bar role=progressbar, aria-valuenow, aria-labelledby.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/progress.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("progress: track has role=progressbar", async ({ page }) => {
  const bars = page.locator("[role='progressbar']");
  await expect(bars).toHaveCount(2);
});

test("progress: determinate bar has aria-valuenow, aria-valuemin, aria-valuemax", async ({ page }) => {
  const bar = page.locator("#progress-1 [role='progressbar']");
  await expect(bar).toHaveAttribute("aria-valuenow", "45");
  await expect(bar).toHaveAttribute("aria-valuemin", "0");
  await expect(bar).toHaveAttribute("aria-valuemax", "100");
});

test("progress: determinate bar has aria-labelledby pointing to label", async ({ page }) => {
  const bar = page.locator("#progress-1 [role='progressbar']");
  await expect(bar).toHaveAttribute("aria-labelledby", "progress-label-1");
  await expect(page.locator("#progress-label-1")).toContainText("Upload progress");
});

test("progress: indeterminate bar has aria-valuetext", async ({ page }) => {
  const bar = page.locator("#progress-2 [role='progressbar']");
  await expect(bar).toHaveAttribute("aria-valuetext", "Loading");
});

test("progress: set-75 updates aria-valuenow to 75", async ({ page }) => {
  await page.click("#set-75");
  const bar = page.locator("#progress-1 [role='progressbar']");
  await expect(bar).toHaveAttribute("aria-valuenow", "75");
});

test("progress: set-100 updates aria-valuenow to 100", async ({ page }) => {
  await page.click("#set-100");
  const bar = page.locator("#progress-1 [role='progressbar']");
  await expect(bar).toHaveAttribute("aria-valuenow", "100");
});

test("progress: indicator element is present inside track", async ({ page }) => {
  await expect(page.locator(".progress-indicator")).toHaveCount(2);
});
