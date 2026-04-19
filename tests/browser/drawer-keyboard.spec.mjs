/**
 * drawer-keyboard.spec.mjs — M17.2
 * Browser-level: drawer Escape key, focus restore.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/drawer.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("drawer: opens on button click and receives focus", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#drawer")).toHaveAttribute("data-open", "true");
  const focused = await page.evaluate(() => document.activeElement?.closest('[role="dialog"]')?.id);
  expect(focused).toBe("drawer");
});

test("drawer: has role=dialog and aria-modal=true", async ({ page }) => {
  await expect(page.locator("#drawer")).toHaveAttribute("role", "dialog");
  await expect(page.locator("#drawer")).toHaveAttribute("aria-modal", "true");
});

test("drawer: Escape key closes drawer and restores focus", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#drawer")).toHaveAttribute("data-open", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#drawer")).not.toHaveAttribute("data-open");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("open-btn");
});

test("drawer: close button closes drawer", async ({ page }) => {
  await page.click("#open-btn");
  await page.click("#drawer-close");
  await expect(page.locator("#drawer")).not.toHaveAttribute("data-open");
});

test("drawer: focus returns to trigger after close", async ({ page }) => {
  await page.click("#open-btn");
  await page.click("#drawer-cancel");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("open-btn");
});
