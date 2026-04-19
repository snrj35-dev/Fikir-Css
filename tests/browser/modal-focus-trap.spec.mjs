/**
 * modal-focus-trap.spec.mjs — M17.2
 * Browser-level: modal focus trap, Escape key, focus restore.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/modal.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("modal: opens on button click and receives focus", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#modal")).toBeVisible();
  await expect(page.locator("#modal")).toHaveAttribute("data-open", "true");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(["first-input", "modal-close", "cancel-btn", "confirm-btn"]).toContain(focused);
});

test("modal: has role=dialog and aria-modal=true", async ({ page }) => {
  await expect(page.locator("#modal")).toHaveAttribute("role", "dialog");
  await expect(page.locator("#modal")).toHaveAttribute("aria-modal", "true");
});

test("modal: has accessible name via aria-labelledby", async ({ page }) => {
  await expect(page.locator("#modal")).toHaveAttribute("aria-labelledby", "modal-title");
  await expect(page.locator("#modal-title")).toBeAttached();
});

test("modal: Escape key closes modal and restores focus", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#modal")).toHaveAttribute("data-open", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#modal")).not.toHaveAttribute("data-open");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("open-btn");
});

test("modal: close button closes modal", async ({ page }) => {
  await page.click("#open-btn");
  await page.click("#modal-close");
  await expect(page.locator("#modal")).not.toHaveAttribute("data-open");
});

test("modal: focus is trapped inside — Tab cycles through focusable elements", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#modal")).toHaveAttribute("data-open", "true");

  const focusable = ["#first-input", "#second-input", "#cancel-btn", "#confirm-btn", "#modal-close"];

  // Tab through all focusable elements
  for (let i = 0; i < focusable.length + 1; i++) {
    await page.keyboard.press("Tab");
  }

  // After cycling, focus should still be inside the modal
  const focused = await page.evaluate(() => document.activeElement?.closest('[role="dialog"]')?.id);
  expect(focused).toBe("modal");
});

test("modal: backdrop click closes modal", async ({ page }) => {
  await page.click("#open-btn");
  await expect(page.locator("#modal")).toHaveAttribute("data-open", "true");
  // Dispatch click directly — dialog overlaps backdrop center in viewport
  await page.evaluate(() => document.getElementById("modal-backdrop").dispatchEvent(new MouseEvent("click", { bubbles: true })));
  await expect(page.locator("#modal")).not.toHaveAttribute("data-open");
});
