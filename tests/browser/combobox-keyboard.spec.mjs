/**
 * combobox-keyboard.spec.mjs — M17.4 (P1)
 * Browser-level: combobox keyboard navigation, selection, aria-activedescendant.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/combobox.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("combobox: input has role=combobox", async ({ page }) => {
  await expect(page.locator("#combo-input")).toHaveAttribute("role", "combobox");
});

test("combobox: aria-expanded=false initially", async ({ page }) => {
  await expect(page.locator("#combo-input")).toHaveAttribute("aria-expanded", "false");
});

test("combobox: listbox is hidden initially", async ({ page }) => {
  await expect(page.locator("#combo-list")).toHaveAttribute("hidden", "");
});

test("combobox: focus opens listbox", async ({ page }) => {
  await page.locator("#combo-input").focus();
  await expect(page.locator("#combo-input")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#combo-list")).not.toHaveAttribute("hidden");
});

test("combobox: listbox has role=listbox", async ({ page }) => {
  await expect(page.locator("#combo-list")).toHaveAttribute("role", "listbox");
});

test("combobox: options have role=option", async ({ page }) => {
  const options = page.locator("[role='option']");
  await expect(options).toHaveCount(5);
});

test("combobox: ArrowDown moves active to first option", async ({ page }) => {
  await page.locator("#combo-input").focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#opt-1")).toHaveAttribute("data-active", "true");
  await expect(page.locator("#combo-input")).toHaveAttribute("aria-activedescendant", "opt-1");
});

test("combobox: ArrowDown then ArrowDown moves to second option", async ({ page }) => {
  await page.locator("#combo-input").focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#opt-2")).toHaveAttribute("data-active", "true");
  await expect(page.locator("#combo-input")).toHaveAttribute("aria-activedescendant", "opt-2");
});

test("combobox: Enter selects active option and closes list", async ({ page }) => {
  await page.locator("#combo-input").focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.locator("#combo-list")).toHaveAttribute("hidden", "");
  const value = await page.inputValue("#combo-input");
  expect(value).toBe("France");
});

test("combobox: Escape closes listbox", async ({ page }) => {
  await page.locator("#combo-input").focus();
  await page.keyboard.press("Escape");
  await expect(page.locator("#combo-list")).toHaveAttribute("hidden", "");
  await expect(page.locator("#combo-input")).toHaveAttribute("aria-expanded", "false");
});
