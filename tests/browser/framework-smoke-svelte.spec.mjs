/**
 * framework-smoke-svelte.spec.mjs — M18.3 (P1)
 * Verifies the CSS patterns used in examples/svelte-vite:
 *   - theme toggle (data-theme), density toggle (data-density via writable store)
 *   - modal with data-open, focus trap, Escape key
 *   - result, data-grid, app-shell, badge, alert, card components
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/framework-adoption-smoke.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

// ── Theme toggle ─────────────────────────────────────────────────────────────

test("svelte-smoke: initial theme is light", async ({ page }) => {
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("svelte-smoke: theme toggle switches to dark", async ({ page }) => {
  await page.click("#theme-toggle");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("svelte-smoke: theme toggle cycles back to light", async ({ page }) => {
  await page.click("#theme-toggle");
  await page.click("#theme-toggle");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

// ── Density toggle (writable store pattern) ──────────────────────────────────

test("svelte-smoke: initial density has no data-density attribute", async ({ page }) => {
  const val = await page.locator("html").getAttribute("data-density");
  expect(val).toBeNull();
});

test("svelte-smoke: density toggle sets data-density=compact", async ({ page }) => {
  await page.click("#density-toggle");
  await expect(page.locator("html")).toHaveAttribute("data-density", "compact");
});

test("svelte-smoke: density toggle removes data-density on second click", async ({ page }) => {
  await page.click("#density-toggle");
  await page.click("#density-toggle");
  const val = await page.locator("html").getAttribute("data-density");
  expect(val).toBeNull();
});

// ── Components ────────────────────────────────────────────────────────────────

test("svelte-smoke: badge components are visible", async ({ page }) => {
  await expect(page.locator("#badge-primary")).toBeVisible();
  await expect(page.locator("#badge-neutral")).toBeVisible();
  await expect(page.locator("#badge-danger")).toBeVisible();
});

test("svelte-smoke: alert components are visible", async ({ page }) => {
  await expect(page.locator("#alert-default")).toBeVisible();
  await expect(page.locator("#alert-danger")).toHaveClass(/alert-danger/);
});

test("svelte-smoke: card is visible", async ({ page }) => {
  await expect(page.locator("#card-sample")).toBeVisible();
});

test("svelte-smoke: result components are visible with tone attributes", async ({ page }) => {
  await expect(page.locator("#result-success")).toHaveAttribute("data-result-tone", "success");
  await expect(page.locator("#result-danger")).toHaveAttribute("data-result-tone", "danger");
});

test("svelte-smoke: data-grid renders rows", async ({ page }) => {
  await expect(page.locator("#data-grid")).toBeVisible();
  await expect(page.locator("#grid-row-0")).toBeVisible();
});

test("svelte-smoke: app-shell renders topbar, sidebar, main", async ({ page }) => {
  await expect(page.locator("#app-shell-topbar")).toBeVisible();
  await expect(page.locator("#app-shell-sidebar")).toBeVisible();
  await expect(page.locator("#app-shell-main")).toBeVisible();
});

// ── Modal (bindOverlayKeyboard + createFocusTrap pattern) ────────────────────

test("svelte-smoke: modal is hidden before open", async ({ page }) => {
  await expect(page.locator("#modal")).not.toHaveAttribute("data-open");
});

test("svelte-smoke: modal opens on button click", async ({ page }) => {
  await page.click("#open-modal");
  await expect(page.locator("#modal")).toHaveAttribute("data-open", "true");
  await expect(page.locator("#modal")).toBeVisible();
});

test("svelte-smoke: modal has role=dialog and aria-modal=true", async ({ page }) => {
  await expect(page.locator("#modal")).toHaveAttribute("role", "dialog");
  await expect(page.locator("#modal")).toHaveAttribute("aria-modal", "true");
  await expect(page.locator("#modal")).toHaveAttribute("aria-labelledby", "modal-title");
});

test("svelte-smoke: Escape key closes modal", async ({ page }) => {
  await page.click("#open-modal");
  await expect(page.locator("#modal")).toHaveAttribute("data-open", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#modal")).not.toHaveAttribute("data-open");
});

test("svelte-smoke: close button closes modal", async ({ page }) => {
  await page.click("#open-modal");
  await page.click("#modal-close");
  await expect(page.locator("#modal")).not.toHaveAttribute("data-open");
});

test("svelte-smoke: modal receives focus on open", async ({ page }) => {
  await page.click("#open-modal");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(["modal-input", "modal-close", "modal-cancel", "modal-confirm"]).toContain(focused);
});
