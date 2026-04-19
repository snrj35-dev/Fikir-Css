/**
 * loading-overlay-semantics.spec.mjs — M17.5 (P2)
 * Browser-level: loading-overlay busy state, aria-busy, role=status.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/loading-overlay.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("loading-overlay: aria-busy=false initially", async ({ page }) => {
  await expect(page.locator("#content-region")).toHaveAttribute("aria-busy", "false");
});

test("loading-overlay: data-loading not set initially", async ({ page }) => {
  await expect(page.locator("#content-region")).not.toHaveAttribute("data-loading");
});

test("loading-overlay: start-loading sets aria-busy=true", async ({ page }) => {
  await page.click("#start-loading");
  await expect(page.locator("#content-region")).toHaveAttribute("aria-busy", "true");
});

test("loading-overlay: start-loading sets data-loading=true", async ({ page }) => {
  await page.click("#start-loading");
  await expect(page.locator("#content-region")).toHaveAttribute("data-loading", "true");
});

test("loading-overlay: stop-loading sets aria-busy=false", async ({ page }) => {
  await page.click("#start-loading");
  await page.click("#stop-loading");
  await expect(page.locator("#content-region")).toHaveAttribute("aria-busy", "false");
});

test("loading-overlay: content status element has role=status", async ({ page }) => {
  await expect(page.locator(".loading-overlay-content")).toHaveAttribute("role", "status");
});

test("loading-overlay: content status has aria-live=polite", async ({ page }) => {
  await expect(page.locator(".loading-overlay-content")).toHaveAttribute("aria-live", "polite");
});

test("loading-overlay: backdrop is aria-hidden", async ({ page }) => {
  await expect(page.locator(".loading-overlay-backdrop")).toHaveAttribute("aria-hidden", "true");
});
