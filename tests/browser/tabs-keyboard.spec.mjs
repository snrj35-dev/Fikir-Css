/**
 * tabs-keyboard.spec.mjs — M17.3
 * Browser-level: tabs roving tabindex, ArrowLeft/Right, Home/End.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/tabs.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("tabs: tablist has role=tablist", async ({ page }) => {
  await expect(page.locator("[role='tablist']")).toBeAttached();
});

test("tabs: first tab is selected and tabindex=0 initially", async ({ page }) => {
  await expect(page.locator("#tab-1")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#tab-1")).toHaveAttribute("tabindex", "0");
});

test("tabs: inactive tabs have tabindex=-1", async ({ page }) => {
  await expect(page.locator("#tab-2")).toHaveAttribute("tabindex", "-1");
  await expect(page.locator("#tab-3")).toHaveAttribute("tabindex", "-1");
});

test("tabs: ArrowRight moves focus and activates next tab", async ({ page }) => {
  await page.locator("#tab-1").focus();
  await page.keyboard.press("ArrowRight");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("tab-2");
  await expect(page.locator("#tab-2")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#panel-2")).not.toHaveAttribute("hidden");
});

test("tabs: ArrowLeft moves focus to previous tab", async ({ page }) => {
  await page.locator("#tab-2").click();
  await page.keyboard.press("ArrowLeft");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("tab-1");
});

test("tabs: ArrowRight wraps from last to first", async ({ page }) => {
  await page.locator("#tab-3").click();
  await page.keyboard.press("ArrowRight");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("tab-1");
});

test("tabs: Home activates first tab", async ({ page }) => {
  await page.locator("#tab-3").click();
  await page.keyboard.press("Home");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("tab-1");
  await expect(page.locator("#tab-1")).toHaveAttribute("aria-selected", "true");
});

test("tabs: End activates last tab", async ({ page }) => {
  await page.locator("#tab-1").focus();
  await page.keyboard.press("End");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("tab-3");
});

test("tabs: active tab panel is visible, others hidden", async ({ page }) => {
  await expect(page.locator("#panel-1")).not.toHaveAttribute("hidden");
  await expect(page.locator("#panel-2")).toHaveAttribute("hidden", "");
  await expect(page.locator("#panel-3")).toHaveAttribute("hidden", "");
});

test("tabs: each tab has aria-controls pointing to its panel", async ({ page }) => {
  await expect(page.locator("#tab-1")).toHaveAttribute("aria-controls", "panel-1");
  await expect(page.locator("#tab-2")).toHaveAttribute("aria-controls", "panel-2");
  await expect(page.locator("#tab-3")).toHaveAttribute("aria-controls", "panel-3");
});
