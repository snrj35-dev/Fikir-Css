/**
 * number-input-constraints.spec.mjs — M17.4 (P1)
 * Browser-level: number-input min/max/step constraints, increment/decrement.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/number-input.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("number-input: input has correct min, max, step attributes", async ({ page }) => {
  await expect(page.locator("#qty-input")).toHaveAttribute("min", "0");
  await expect(page.locator("#qty-input")).toHaveAttribute("max", "100");
  await expect(page.locator("#qty-input")).toHaveAttribute("step", "1");
});

test("number-input: increment button increases value by step", async ({ page }) => {
  const before = Number(await page.inputValue("#qty-input"));
  await page.click("#btn-inc");
  const after = Number(await page.inputValue("#qty-input"));
  expect(after).toBe(before + 1);
});

test("number-input: decrement button decreases value by step", async ({ page }) => {
  const before = Number(await page.inputValue("#qty-input"));
  await page.click("#btn-dec");
  const after = Number(await page.inputValue("#qty-input"));
  expect(after).toBe(before - 1);
});

test("number-input: increment does not exceed max", async ({ page }) => {
  await page.evaluate(() => {
    document.getElementById("qty-input").value = "100";
  });
  await page.click("#btn-inc");
  const value = Number(await page.inputValue("#qty-input"));
  expect(value).toBeLessThanOrEqual(100);
});

test("number-input: decrement does not go below min", async ({ page }) => {
  await page.evaluate(() => {
    document.getElementById("qty-input").value = "0";
  });
  await page.click("#btn-dec");
  const value = Number(await page.inputValue("#qty-input"));
  expect(value).toBeGreaterThanOrEqual(0);
});

test("number-input: increment and decrement buttons have accessible labels", async ({ page }) => {
  await expect(page.locator("#btn-inc")).toHaveAttribute("aria-label", "Increment");
  await expect(page.locator("#btn-dec")).toHaveAttribute("aria-label", "Decrement");
});

test("number-input: disabled state disables buttons", async ({ page }) => {
  const buttons = page.locator("#number-input-disabled .number-input-step");
  for (const btn of await buttons.all()) {
    await expect(btn).toBeDisabled();
  }
});

test("number-input: disabled input is not interactive", async ({ page }) => {
  await expect(page.locator("#disabled-input")).toBeDisabled();
  await expect(page.locator("#disabled-input")).toHaveAttribute("aria-disabled", "true");
});

test("number-input: step=0.5 increments by 0.5", async ({ page }) => {
  await page.evaluate(() => {
    document.getElementById("price-input").value = "10";
  });
  await page.click("#price-inc");
  const value = Number(await page.inputValue("#price-input"));
  expect(value).toBe(10.5);
});

test("number-input: ArrowUp key increments value", async ({ page }) => {
  await page.locator("#qty-input").focus();
  const before = Number(await page.inputValue("#qty-input"));
  await page.keyboard.press("ArrowUp");
  const after = Number(await page.inputValue("#qty-input"));
  expect(after).toBeGreaterThan(before);
});

test("number-input: ArrowDown key decrements value", async ({ page }) => {
  await page.locator("#qty-input").focus();
  const before = Number(await page.inputValue("#qty-input"));
  await page.keyboard.press("ArrowDown");
  const after = Number(await page.inputValue("#qty-input"));
  expect(after).toBeLessThan(before);
});
