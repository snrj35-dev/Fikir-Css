/**
 * range-slider-keyboard.spec.mjs — M17.4 (P1)
 * Browser-level: range slider keyboard increment, aria values.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/range-slider.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("range-slider: has correct aria-valuemin, aria-valuemax, aria-valuenow", async ({ page }) => {
  await expect(page.locator("#slider-1")).toHaveAttribute("aria-valuemin", "0");
  await expect(page.locator("#slider-1")).toHaveAttribute("aria-valuemax", "100");
  await expect(page.locator("#slider-1")).toHaveAttribute("aria-valuenow", "50");
});

test("range-slider: is focusable", async ({ page }) => {
  await page.locator("#slider-1").focus();
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("slider-1");
});

test("range-slider: ArrowRight increments value", async ({ page }) => {
  await page.locator("#slider-1").focus();
  await page.keyboard.press("ArrowRight");
  const value = await page.inputValue("#slider-1");
  expect(Number(value)).toBeGreaterThan(50);
});

test("range-slider: ArrowLeft decrements value", async ({ page }) => {
  await page.locator("#slider-1").focus();
  await page.keyboard.press("ArrowLeft");
  const value = await page.inputValue("#slider-1");
  expect(Number(value)).toBeLessThan(50);
});

test("range-slider: ArrowUp increments value", async ({ page }) => {
  await page.locator("#slider-1").focus();
  await page.keyboard.press("ArrowUp");
  const value = await page.inputValue("#slider-1");
  expect(Number(value)).toBeGreaterThan(50);
});

test("range-slider: ArrowDown decrements value", async ({ page }) => {
  await page.locator("#slider-1").focus();
  await page.keyboard.press("ArrowDown");
  const value = await page.inputValue("#slider-1");
  expect(Number(value)).toBeLessThan(50);
});

test("range-slider: Home sets value to minimum", async ({ page }) => {
  await page.locator("#slider-1").focus();
  await page.keyboard.press("Home");
  const value = await page.inputValue("#slider-1");
  expect(Number(value)).toBe(0);
});

test("range-slider: End sets value to maximum", async ({ page }) => {
  await page.locator("#slider-1").focus();
  await page.keyboard.press("End");
  const value = await page.inputValue("#slider-1");
  expect(Number(value)).toBe(100);
});

test("range-slider: disabled slider is not interactive", async ({ page }) => {
  await expect(page.locator("#slider-disabled")).toBeDisabled();
  await expect(page.locator("#slider-disabled")).toHaveAttribute("aria-disabled", "true");
});

test("range-slider: has aria-label", async ({ page }) => {
  await expect(page.locator("#slider-1")).toHaveAttribute("aria-label", "Volume");
});
