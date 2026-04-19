/**
 * command-palette-keyboard.spec.mjs — M17.2
 * Browser-level: command palette open/close, arrow nav, Escape.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/command-palette.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("command-palette: hidden by default", async ({ page }) => {
  await expect(page.locator("#palette")).toHaveAttribute("hidden", "");
});

test("command-palette: opens on button click", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#palette")).not.toHaveAttribute("hidden");
});

test("command-palette: input receives focus on open", async ({ page }) => {
  await page.click("#open-btn");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("palette-input");
});

test("command-palette: has role=dialog and aria-modal=true", async ({ page }) => {
  await expect(page.locator("#palette")).toHaveAttribute("role", "dialog");
  await expect(page.locator("#palette")).toHaveAttribute("aria-modal", "true");
});

test("command-palette: input has role=combobox", async ({ page }) => {
  await expect(page.locator("#palette-input")).toHaveAttribute("role", "combobox");
});

test("command-palette: first result is selected on open", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#result-1")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#result-2")).toHaveAttribute("aria-selected", "false");
});

test("command-palette: ArrowDown moves selection to next result", async ({ page }) => {
  await page.click("#open-btn");
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#result-2")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#result-1")).toHaveAttribute("aria-selected", "false");
});

test("command-palette: ArrowUp wraps to last result", async ({ page }) => {
  await page.click("#open-btn");
  await page.keyboard.press("ArrowUp");
  await expect(page.locator("#result-3")).toHaveAttribute("aria-selected", "true");
});

test("command-palette: Escape closes palette and restores focus", async ({ page }) => {
  await page.click("#open-btn");
  await page.keyboard.press("Escape");
  await expect(page.locator("#palette")).toHaveAttribute("hidden", "");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("open-btn");
});

test("command-palette: results have role=option", async ({ page }) => {
  const options = page.locator("[role='option']");
  await expect(options).toHaveCount(3);
});

test("command-palette: aria-activedescendant tracks active result", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#palette-input")).toHaveAttribute("aria-activedescendant", "result-1");
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#palette-input")).toHaveAttribute("aria-activedescendant", "result-2");
});
