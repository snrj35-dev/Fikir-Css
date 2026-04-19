/**
 * tooltip-semantics.spec.mjs — M17.2 (P2)
 * Browser-level: tooltip non-interactive behavior, role=tooltip, aria-describedby.
 * Tooltips are NOT interactive — they only provide supplemental description.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/tooltip.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("tooltip: content has role=tooltip", async ({ page }) => {
  const tooltips = page.locator("[role='tooltip']");
  await expect(tooltips).toHaveCount(3);
});

test("tooltip: trigger references tooltip via aria-describedby", async ({ page }) => {
  await expect(page.locator("#delete-btn")).toHaveAttribute("aria-describedby", "tooltip-1-content");
  await expect(page.locator("#info-btn")).toHaveAttribute("aria-describedby", "tooltip-2-content");
});

test("tooltip: shows on focus (data-open set)", async ({ page }) => {
  await page.locator("#delete-btn").focus();
  await expect(page.locator("#tooltip-1")).toHaveAttribute("data-open", "true");
});

test("tooltip: hides on blur (data-open removed)", async ({ page }) => {
  await page.locator("#delete-btn").focus();
  await expect(page.locator("#tooltip-1")).toHaveAttribute("data-open", "true");
  await page.locator("#delete-btn").blur();
  await expect(page.locator("#tooltip-1")).not.toHaveAttribute("data-open");
});

test("tooltip: shows on second button focus", async ({ page }) => {
  await page.locator("#info-btn").focus();
  await expect(page.locator("#tooltip-2")).toHaveAttribute("data-open", "true");
});

test("tooltip: icon button has aria-label (not relying on tooltip for name)", async ({ page }) => {
  await expect(page.locator("#info-btn")).toHaveAttribute("aria-label", "More information");
});

test("tooltip: disabled button wrapper is focusable with tabindex=0", async ({ page }) => {
  await expect(page.locator("#disabled-wrapper")).toHaveAttribute("tabindex", "0");
  await expect(page.locator("#disabled-wrapper")).toHaveAttribute("aria-describedby", "tooltip-3-content");
});

test("tooltip: tooltip content is not interactive (no focusable children)", async ({ page }) => {
  const tooltipContent = page.locator("#tooltip-1-content");
  const focusable = await tooltipContent.locator("button, a, input, select, textarea, [tabindex]").count();
  expect(focusable).toBe(0);
});

test("tooltip: trigger is keyboard reachable (focusable)", async ({ page }) => {
  await page.locator("#delete-btn").focus();
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("delete-btn");
});
