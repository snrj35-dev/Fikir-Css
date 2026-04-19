/**
 * time-picker-keyboard.spec.mjs — M17.4 (P1)
 * Browser-level: time-picker open/close, field navigation, Escape, confirm.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/time-picker.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("time-picker: panel is hidden initially", async ({ page }) => {
  await expect(page.locator("#time-panel")).toHaveAttribute("hidden", "");
});

test("time-picker: trigger opens panel", async ({ page }) => {
  await page.click("#time-trigger");
  await expect(page.locator("#time-panel")).not.toHaveAttribute("hidden");
  await expect(page.locator("#time-picker")).toHaveAttribute("data-open", "true");
});

test("time-picker: trigger sets aria-expanded=true when open", async ({ page }) => {
  await page.click("#time-trigger");
  await expect(page.locator("#time-trigger")).toHaveAttribute("aria-expanded", "true");
});

test("time-picker: panel has role=dialog and aria-modal=true", async ({ page }) => {
  await expect(page.locator("#time-panel")).toHaveAttribute("role", "dialog");
  await expect(page.locator("#time-panel")).toHaveAttribute("aria-modal", "true");
});

test("time-picker: hour input receives focus on open", async ({ page }) => {
  await page.click("#time-trigger");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("hour-input");
});

test("time-picker: hour input has min=0 and max=23", async ({ page }) => {
  await expect(page.locator("#hour-input")).toHaveAttribute("min", "0");
  await expect(page.locator("#hour-input")).toHaveAttribute("max", "23");
});

test("time-picker: minute input has min=0, max=59, step=5", async ({ page }) => {
  await expect(page.locator("#minute-input")).toHaveAttribute("min", "0");
  await expect(page.locator("#minute-input")).toHaveAttribute("max", "59");
  await expect(page.locator("#minute-input")).toHaveAttribute("step", "5");
});

test("time-picker: Escape closes panel and restores focus", async ({ page }) => {
  await page.click("#time-trigger");
  await page.keyboard.press("Escape");
  await expect(page.locator("#time-panel")).toHaveAttribute("hidden", "");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("time-trigger");
});

test("time-picker: Cancel button closes panel", async ({ page }) => {
  await page.click("#time-trigger");
  await page.click("#time-cancel");
  await expect(page.locator("#time-panel")).toHaveAttribute("hidden", "");
});

test("time-picker: OK button sets time value and closes panel", async ({ page }) => {
  await page.click("#time-trigger");
  await page.fill("#hour-input", "14");
  await page.fill("#minute-input", "30");
  await page.click("#time-confirm");
  await expect(page.locator("#time-panel")).toHaveAttribute("hidden", "");
  const value = await page.inputValue("#time-input");
  expect(value).toBe("14:30");
});

test("time-picker: Tab moves between hour and minute fields", async ({ page }) => {
  await page.click("#time-trigger");
  await page.locator("#hour-input").focus();
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("minute-input");
});
