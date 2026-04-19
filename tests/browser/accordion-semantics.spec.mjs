/**
 * accordion-semantics.spec.mjs — M17.3 (P1)
 * Browser-level: accordion toggle semantics, aria-expanded, panel visibility.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/accordion.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("accordion: triggers are <button> elements", async ({ page }) => {
  const triggers = page.locator(".accordion-trigger");
  await expect(triggers).toHaveCount(3);
  for (const t of await triggers.all()) {
    await expect(t).toHaveAttribute("type", "button");
  }
});

test("accordion: all panels are collapsed initially (aria-expanded=false)", async ({ page }) => {
  for (const id of ["trigger-1", "trigger-2", "trigger-3"]) {
    await expect(page.locator(`#${id}`)).toHaveAttribute("aria-expanded", "false");
  }
});

test("accordion: all panels hidden initially", async ({ page }) => {
  for (const id of ["panel-1", "panel-2", "panel-3"]) {
    await expect(page.locator(`#${id}`)).toHaveAttribute("hidden", "");
  }
});

test("accordion: click opens panel and sets aria-expanded=true", async ({ page }) => {
  await page.click("#trigger-1");
  await expect(page.locator("#trigger-1")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#panel-1")).not.toHaveAttribute("hidden");
});

test("accordion: click again closes panel", async ({ page }) => {
  await page.click("#trigger-1");
  await page.click("#trigger-1");
  await expect(page.locator("#trigger-1")).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#panel-1")).toHaveAttribute("hidden", "");
});

test("accordion: each trigger has aria-controls pointing to its panel", async ({ page }) => {
  await expect(page.locator("#trigger-1")).toHaveAttribute("aria-controls", "panel-1");
  await expect(page.locator("#trigger-2")).toHaveAttribute("aria-controls", "panel-2");
  await expect(page.locator("#trigger-3")).toHaveAttribute("aria-controls", "panel-3");
});

test("accordion: each panel has role=region and aria-labelledby", async ({ page }) => {
  await expect(page.locator("#panel-1")).toHaveAttribute("role", "region");
  await expect(page.locator("#panel-1")).toHaveAttribute("aria-labelledby", "trigger-1");
});

test("accordion: multiple panels can be open simultaneously", async ({ page }) => {
  await page.click("#trigger-1");
  await page.click("#trigger-2");
  await expect(page.locator("#trigger-1")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#trigger-2")).toHaveAttribute("aria-expanded", "true");
});

test("accordion: panel content is reachable by Tab when open", async ({ page }) => {
  await page.click("#trigger-2");
  await page.locator("#trigger-2").focus();
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("panel-2-link");
});
