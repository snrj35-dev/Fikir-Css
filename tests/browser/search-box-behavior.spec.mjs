/**
 * search-box-behavior.spec.mjs — M17.4 (P2)
 * Browser-level: search-box clear button, focus behavior, accessible labels.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/search-box.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("search-box: input has type=search", async ({ page }) => {
  await expect(page.locator("#search-input")).toHaveAttribute("type", "search");
});

test("search-box: input has aria-label", async ({ page }) => {
  await expect(page.locator("#search-input")).toHaveAttribute("aria-label", "Search");
});

test("search-box: clear button is hidden when input is empty", async ({ page }) => {
  await expect(page.locator("#search-clear")).toHaveAttribute("hidden", "");
});

test("search-box: clear button appears when text is typed", async ({ page }) => {
  await page.fill("#search-input", "hello");
  await expect(page.locator("#search-clear")).not.toHaveAttribute("hidden");
});

test("search-box: clear button has aria-label", async ({ page }) => {
  await expect(page.locator("#search-clear")).toHaveAttribute("aria-label", "Clear search");
});

test("search-box: clear button clears input value", async ({ page }) => {
  await page.fill("#search-input", "playwright");
  await page.click("#search-clear");
  const value = await page.inputValue("#search-input");
  expect(value).toBe("");
});

test("search-box: clear button returns focus to input", async ({ page }) => {
  await page.fill("#search-input", "playwright");
  await page.click("#search-clear");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("search-input");
});

test("search-box: clear button hidden again after clearing", async ({ page }) => {
  await page.fill("#search-input", "playwright");
  await page.click("#search-clear");
  await expect(page.locator("#search-clear")).toHaveAttribute("hidden", "");
});

test("search-box: submit button has aria-label", async ({ page }) => {
  await expect(page.locator("#search-submit")).toHaveAttribute("aria-label", "Submit search");
});

test("search-box: pre-filled box shows clear button immediately", async ({ page }) => {
  await expect(page.locator("#search-clear-2")).not.toHaveAttribute("hidden");
});

test("search-box: pre-filled clear button clears and focuses input", async ({ page }) => {
  await page.click("#search-clear-2");
  const value = await page.inputValue("#search-input-2");
  expect(value).toBe("");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("search-input-2");
});

test("search-box: input is keyboard focusable", async ({ page }) => {
  await page.locator("#search-input").focus();
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("search-input");
});
