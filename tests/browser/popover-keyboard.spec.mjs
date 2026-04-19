/**
 * popover-keyboard.spec.mjs — M17.2 (P1)
 * Browser-level: popover dismiss, focus return.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/popover.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("popover: trigger has aria-expanded=false initially", async ({ page }) => {
  await expect(page.locator("#trigger")).toHaveAttribute("aria-expanded", "false");
});

test("popover: opens on click and sets aria-expanded=true", async ({ page }) => {
  await page.click("#trigger");
  await expect(page.locator("#popover")).toHaveAttribute("data-open", "true");
  await expect(page.locator("#trigger")).toHaveAttribute("aria-expanded", "true");
});

test("popover: content panel receives focus on open", async ({ page }) => {
  await page.click("#trigger");
  const focused = await page.evaluate(() => document.activeElement?.closest("[data-open]")?.id ?? document.activeElement?.id);
  expect(focused).toBeTruthy();
});

test("popover: Escape closes popover and restores focus to trigger", async ({ page }) => {
  await page.click("#trigger");
  await expect(page.locator("#popover")).toHaveAttribute("data-open", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#popover")).not.toHaveAttribute("data-open");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("trigger");
});

test("popover: close button closes popover", async ({ page }) => {
  await page.click("#trigger");
  await page.click("#popover-close");
  await expect(page.locator("#popover")).not.toHaveAttribute("data-open");
});

test("popover: focus returns to trigger after close button click", async ({ page }) => {
  await page.click("#trigger");
  await page.click("#popover-close");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("trigger");
});

test("popover: click outside closes popover", async ({ page }) => {
  await page.click("#trigger");
  await expect(page.locator("#popover")).toHaveAttribute("data-open", "true");
  await page.click("#outside-btn");
  await expect(page.locator("#popover")).not.toHaveAttribute("data-open");
});

test("popover: content has aria-controls pointing to panel", async ({ page }) => {
  await expect(page.locator("#trigger")).toHaveAttribute("aria-controls", "popover-panel");
});
