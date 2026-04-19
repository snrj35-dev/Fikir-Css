/**
 * toast-aria-live.spec.mjs — M17.5 (P1)
 * Browser-level: toast aria-live behavior, role=status/alert, dismiss.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/toast.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("toast: viewport has aria-live=polite", async ({ page }) => {
  await expect(page.locator("#toast-viewport")).toHaveAttribute("aria-live", "polite");
});

test("toast: viewport has role=region", async ({ page }) => {
  await expect(page.locator("#toast-viewport")).toHaveAttribute("role", "region");
});

test("toast: info toast appears with role=status", async ({ page }) => {
  await page.click("#show-info");
  const toast = page.locator(".toast").first();
  await expect(toast).toBeAttached();
  await expect(toast).toHaveAttribute("role", "status");
});

test("toast: success toast appears with role=status", async ({ page }) => {
  await page.click("#show-success");
  const toast = page.locator(".toast").first();
  await expect(toast).toHaveAttribute("data-tone", "success");
  await expect(toast).toHaveAttribute("role", "status");
});

test("toast: danger toast appears with role=alert", async ({ page }) => {
  await page.click("#show-danger");
  const toast = page.locator(".toast").first();
  await expect(toast).toHaveAttribute("data-tone", "danger");
  await expect(toast).toHaveAttribute("role", "alert");
});

test("toast: has a dismiss button with accessible label", async ({ page }) => {
  await page.click("#show-info");
  const closeBtn = page.locator(".toast .toast-close").first();
  await expect(closeBtn).toHaveAttribute("aria-label", "Dismiss");
});

test("toast: dismiss button removes toast", async ({ page }) => {
  await page.click("#show-info");
  await expect(page.locator(".toast")).toHaveCount(1);
  await page.locator(".toast-close").first().click();
  await expect(page.locator(".toast[data-open='true']")).toHaveCount(0);
});

test("toast: multiple toasts can appear simultaneously", async ({ page }) => {
  await page.click("#show-info");
  await page.click("#show-success");
  await expect(page.locator(".toast")).toHaveCount(2);
});

test("toast: title is present in toast element", async ({ page }) => {
  await page.click("#show-info");
  await expect(page.locator(".toast-title").first()).toContainText("Info");
});
