/**
 * menu-bar-keyboard.spec.mjs — M17.3 (P1)
 * Browser-level: menu-bar keyboard traversal, ArrowLeft/Right, Escape.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/menu-bar.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("menu-bar: has role=menubar", async ({ page }) => {
  await expect(page.locator("[role='menubar']")).toBeAttached();
});

test("menu-bar: triggers have role=menuitem", async ({ page }) => {
  const triggers = page.locator(".menu-bar-trigger");
  await expect(triggers).toHaveCount(3);
  for (const t of await triggers.all()) {
    await expect(t).toHaveAttribute("role", "menuitem");
  }
});

test("menu-bar: first trigger has tabindex=0, others -1", async ({ page }) => {
  await expect(page.locator("#mb-trigger-1")).toHaveAttribute("tabindex", "0");
  await expect(page.locator("#mb-trigger-2")).toHaveAttribute("tabindex", "-1");
  await expect(page.locator("#mb-trigger-3")).toHaveAttribute("tabindex", "-1");
});

test("menu-bar: click opens submenu with aria-expanded=true", async ({ page }) => {
  await page.click("#mb-trigger-1");
  await expect(page.locator("#mb-trigger-1")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mb-item-1")).toHaveAttribute("data-open", "true");
  await expect(page.locator("#mb-menu-1")).not.toHaveAttribute("hidden");
});

test("menu-bar: first menu item receives focus on open", async ({ page }) => {
  await page.click("#mb-trigger-1");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("mb-new");
});

test("menu-bar: Escape closes submenu and returns focus to trigger", async ({ page }) => {
  await page.click("#mb-trigger-1");
  await page.keyboard.press("Escape");
  await expect(page.locator("#mb-menu-1")).toHaveAttribute("hidden", "");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("mb-trigger-1");
});

test("menu-bar: ArrowRight moves focus to next trigger", async ({ page }) => {
  await page.locator("#mb-trigger-1").focus();
  await page.keyboard.press("ArrowRight");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("mb-trigger-2");
});

test("menu-bar: ArrowLeft moves focus to previous trigger", async ({ page }) => {
  await page.locator("#mb-trigger-2").focus();
  await page.keyboard.press("ArrowLeft");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("mb-trigger-1");
});

test("menu-bar: ArrowDown opens submenu from trigger", async ({ page }) => {
  await page.locator("#mb-trigger-1").focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#mb-menu-1")).not.toHaveAttribute("hidden");
});

test("menu-bar: submenus have role=menu and items have role=menuitem", async ({ page }) => {
  await expect(page.locator("#mb-menu-1")).toHaveAttribute("role", "menu");
  await expect(page.locator("#mb-new")).toHaveAttribute("role", "menuitem");
  await expect(page.locator("#mb-open")).toHaveAttribute("role", "menuitem");
});
