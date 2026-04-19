/**
 * switch-semantics.spec.mjs — M17.4 (P1)
 * Browser-level: switch toggle semantics, role=switch, aria-checked.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/switch.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("switch: has role=switch", async ({ page }) => {
  await expect(page.locator("#sw-1")).toHaveAttribute("role", "switch");
  await expect(page.locator("#sw-2")).toHaveAttribute("role", "switch");
});

test("switch: unchecked switch has aria-checked=false", async ({ page }) => {
  await expect(page.locator("#sw-1")).toHaveAttribute("aria-checked", "false");
});

test("switch: checked switch has aria-checked=true", async ({ page }) => {
  await expect(page.locator("#sw-2")).toHaveAttribute("aria-checked", "true");
});

test("switch: click toggles aria-checked from false to true", async ({ page }) => {
  await page.click("#sw-1");
  await expect(page.locator("#sw-1")).toHaveAttribute("aria-checked", "true");
});

test("switch: click toggles aria-checked back to false", async ({ page }) => {
  await page.click("#sw-1");
  await page.click("#sw-1");
  await expect(page.locator("#sw-1")).toHaveAttribute("aria-checked", "false");
});

test("switch: Space key toggles switch when focused", async ({ page }) => {
  await page.locator("#sw-1").focus();
  await page.keyboard.press("Space");
  await expect(page.locator("#sw-1")).toBeChecked();
  await expect(page.locator("#sw-1")).toHaveAttribute("aria-checked", "true");
});

test("switch: disabled switch is not interactive", async ({ page }) => {
  await expect(page.locator("#sw-disabled")).toBeDisabled();
  await expect(page.locator("#sw-disabled")).toHaveAttribute("aria-disabled", "true");
});

test("switch: switch is keyboard focusable", async ({ page }) => {
  await page.locator("#sw-1").focus();
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("sw-1");
});
