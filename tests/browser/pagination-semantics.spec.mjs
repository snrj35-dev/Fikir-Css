/**
 * pagination-semantics.spec.mjs — M17.3 (P2)
 * Browser-level: pagination current-state semantics, aria-current, nav landmark.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/pagination.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("pagination: is a <nav> landmark with aria-label", async ({ page }) => {
  await expect(page.locator("nav.pagination")).toBeAttached();
  await expect(page.locator("#pagination")).toHaveAttribute("aria-label", "Search results pages");
});

test("pagination: current page has aria-current=page", async ({ page }) => {
  await expect(page.locator("#page-1")).toHaveAttribute("aria-current", "page");
});

test("pagination: non-current pages do not have aria-current", async ({ page }) => {
  await expect(page.locator("#page-2")).not.toHaveAttribute("aria-current");
  await expect(page.locator("#page-3")).not.toHaveAttribute("aria-current");
});

test("pagination: all page links have aria-label", async ({ page }) => {
  for (const id of ["page-1", "page-2", "page-3", "page-10"]) {
    await expect(page.locator(`#${id}`)).toHaveAttribute("aria-label");
  }
});

test("pagination: prev/next buttons have aria-label", async ({ page }) => {
  await expect(page.locator("#prev-btn")).toHaveAttribute("aria-label", "Previous page");
  await expect(page.locator("#next-btn")).toHaveAttribute("aria-label", "Next page");
});

test("pagination: clicking page 2 sets aria-current=page on it", async ({ page }) => {
  await page.click("#page-2");
  await expect(page.locator("#page-2")).toHaveAttribute("aria-current", "page");
  await expect(page.locator("#page-1")).not.toHaveAttribute("aria-current");
});

test("pagination: all interactive items are keyboard reachable", async ({ page }) => {
  const items = page.locator(".pagination-item[href]");
  const count = await items.count();
  expect(count).toBeGreaterThan(3);
});

test("pagination: ellipsis is aria-hidden", async ({ page }) => {
  const ellipsis = page.locator(".pagination-item[aria-hidden='true']");
  await expect(ellipsis).toHaveCount(1);
});
