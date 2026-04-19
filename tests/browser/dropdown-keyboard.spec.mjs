/**
 * dropdown-keyboard.spec.mjs — M17.2
 * Browser-level: dropdown menu arrow key nav, Escape, focus return.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/dropdown-menu.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("dropdown: trigger has aria-haspopup and aria-expanded=false initially", async ({ page }) => {
  await expect(page.locator("#trigger")).toHaveAttribute("aria-haspopup", "true");
  await expect(page.locator("#trigger")).toHaveAttribute("aria-expanded", "false");
});

test("dropdown: opens on click and sets aria-expanded=true", async ({ page }) => {
  await page.click("#trigger");
  await expect(page.locator("#trigger")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#dropdown")).toHaveAttribute("data-open", "true");
});

test("dropdown: first item receives focus on open", async ({ page }) => {
  await page.click("#trigger");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("item-1");
});

test("dropdown: ArrowDown moves focus to next item", async ({ page }) => {
  await page.click("#trigger");
  await page.keyboard.press("ArrowDown");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("item-2");
});

test("dropdown: ArrowUp moves focus to previous item", async ({ page }) => {
  await page.click("#trigger");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowUp");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("item-1");
});

test("dropdown: ArrowDown wraps from last to first", async ({ page }) => {
  await page.click("#trigger");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("item-1");
});

test("dropdown: Home moves focus to first item", async ({ page }) => {
  await page.click("#trigger");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Home");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("item-1");
});

test("dropdown: End moves focus to last item", async ({ page }) => {
  await page.click("#trigger");
  await page.keyboard.press("End");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("item-3");
});

test("dropdown: Escape closes menu and returns focus to trigger", async ({ page }) => {
  await page.click("#trigger");
  await page.keyboard.press("Escape");
  await expect(page.locator("#dropdown")).not.toHaveAttribute("data-open");
  await expect(page.locator("#trigger")).toHaveAttribute("aria-expanded", "false");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("trigger");
});

test("dropdown: menu items have role=menuitem", async ({ page }) => {
  const items = page.locator("[role='menuitem']");
  await expect(items).toHaveCount(3);
});
