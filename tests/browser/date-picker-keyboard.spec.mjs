/**
 * date-picker-keyboard.spec.mjs — M17.4 (P1)
 * Browser-level: date-picker calendar open/close, grid navigation, selection.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/date-picker.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("date-picker: calendar is hidden initially", async ({ page }) => {
  await expect(page.locator("#calendar-grid")).toHaveAttribute("hidden", "");
});

test("date-picker: trigger opens calendar panel", async ({ page }) => {
  await page.click("#calendar-trigger");
  await expect(page.locator("#calendar-grid")).not.toHaveAttribute("hidden");
  await expect(page.locator("#date-picker")).toHaveAttribute("data-open", "true");
});

test("date-picker: trigger sets aria-expanded=true when open", async ({ page }) => {
  await page.click("#calendar-trigger");
  await expect(page.locator("#calendar-trigger")).toHaveAttribute("aria-expanded", "true");
});

test("date-picker: calendar panel has role=dialog and aria-modal=true", async ({ page }) => {
  await expect(page.locator("#calendar-grid")).toHaveAttribute("role", "dialog");
  await expect(page.locator("#calendar-grid")).toHaveAttribute("aria-modal", "true");
});

test("date-picker: calendar grid has role=grid", async ({ page }) => {
  await expect(page.locator("[role='grid']")).toBeAttached();
});

test("date-picker: column headers have role=columnheader", async ({ page }) => {
  await page.click("#calendar-trigger");
  const headers = page.locator("[role='columnheader']");
  await expect(headers).toHaveCount(7);
});

test("date-picker: Escape closes calendar and restores focus", async ({ page }) => {
  await page.click("#calendar-trigger");
  await expect(page.locator("#calendar-grid")).not.toHaveAttribute("hidden");
  await page.keyboard.press("Escape");
  await expect(page.locator("#calendar-grid")).toHaveAttribute("hidden", "");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("calendar-trigger");
});

test("date-picker: ArrowRight moves focus to next day", async ({ page }) => {
  await page.click("#calendar-trigger");
  const days = page.locator(".date-picker-day");
  const firstDate = await days.first().getAttribute("data-date");
  await days.first().focus();
  await page.keyboard.press("ArrowRight");
  const focusedDate = await page.evaluate(() => document.activeElement?.dataset.date);
  expect(focusedDate).not.toBe(firstDate);
});

test("date-picker: ArrowLeft moves focus to previous day", async ({ page }) => {
  await page.click("#calendar-trigger");
  const days = page.locator(".date-picker-day");
  await days.nth(1).focus();
  const dateBefore = await page.evaluate(() => document.activeElement?.dataset.date);
  await page.keyboard.press("ArrowLeft");
  const dateAfter = await page.evaluate(() => document.activeElement?.dataset.date);
  expect(dateAfter).not.toBe(dateBefore);
});

test("date-picker: Enter selects focused day and closes calendar", async ({ page }) => {
  await page.click("#calendar-trigger");
  const firstDay = page.locator(".date-picker-day").first();
  await firstDay.focus();
  const expectedDate = await firstDay.getAttribute("data-date");
  await page.keyboard.press("Enter");
  await expect(page.locator("#calendar-grid")).toHaveAttribute("hidden", "");
  const inputVal = await page.inputValue("#date-input");
  expect(inputVal).toBe(expectedDate);
});

test("date-picker: day cells have role=gridcell with aria-label", async ({ page }) => {
  await page.click("#calendar-trigger");
  const firstCell = page.locator(".date-picker-day").first();
  await expect(firstCell).toHaveAttribute("role", "gridcell");
  await expect(firstCell).toHaveAttribute("aria-label");
});
