import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const rootDir = resolve(process.cwd());
const starterUrl = `file://${resolve(rootDir, "examples/dashboard-starter/index.html")}`;

async function fulfillUnpkgFromDist(page) {
  await page.route("https://unpkg.com/fikir-css@latest/dist/**", async (route) => {
    const requestUrl = route.request().url();
    const distRelativePath = requestUrl.split("/dist/")[1];

    if (!distRelativePath) {
      await route.abort();
      return;
    }

    const localPath = resolve(rootDir, "dist", distRelativePath);
    const body = await readFile(localPath);
    const extension = extname(localPath);
    const contentType =
      extension === ".css" ? "text/css" :
      extension === ".mjs" ? "text/javascript" :
      "text/plain";

    await route.fulfill({ body, contentType, status: 200 });
  });
}

function getCssVariable(page, name) {
  return page.evaluate((tokenName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(tokenName).trim();
  }, name);
}

test.beforeEach(async ({ page }) => {
  await fulfillUnpkgFromDist(page);
  await page.goto(starterUrl);
});

test("dashboard starter: renders app shell, KPI cards, orders table, and timeline", async ({ page }) => {
  await expect(page.locator(".app-shell")).toBeVisible();
  await expect(page.locator(".app-shell-topbar")).toBeVisible();
  await expect(page.locator(".sidebar-nav")).toBeVisible();
  await expect(page.locator(".kpi-card")).toHaveCount(4);
  await expect(page.locator(".table")).toBeVisible();
  await expect(page.locator(".timeline .timeline-item")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "Latest orders" })).toBeVisible();
});

test("dashboard starter: modal opens, traps focus, and Escape restores focus", async ({ page }) => {
  const openButton = page.getByRole("button", { name: "New order" });

  await openButton.click();
  await expect(page.locator("#new-order-modal")).toHaveAttribute("data-open", "true");
  await expect(page.locator("#order-customer")).toBeFocused();

  for (let i = 0; i < 5; i += 1) {
    await page.keyboard.press("Tab");
  }

  const focusedDialogId = await page.evaluate(() => document.activeElement?.closest('[role="dialog"]')?.id);
  expect(focusedDialogId).toBe("new-order-modal");

  await page.keyboard.press("Escape");
  await expect(page.locator("#new-order-modal")).not.toHaveAttribute("data-open");
  await expect(openButton).toBeFocused();
});

test("dashboard starter: toast appears after save and auto-hides", async ({ page }) => {
  await page.getByRole("button", { name: "New order" }).click();
  await page.getByRole("button", { name: "Create" }).click();

  const toast = page.locator("#order-created-toast");
  await expect(toast).toHaveAttribute("data-open", "true");
  await expect(toast).toHaveAttribute("role", "status");
  await expect(page.locator(".toast-viewport")).toHaveAttribute("aria-live", "polite");
  await expect(page.locator(".toast-viewport")).toHaveAttribute("role", "region");
  await expect(toast).not.toHaveAttribute("data-open", { timeout: 5000 });
});

test("dashboard starter: dark theme toggle updates theme state and chart token rendering", async ({ page }) => {
  const themeToggle = page.locator('[data-action="toggle-theme"]');
  const chartLine = page.locator("svg polyline");

  const lightToken = await getCssVariable(page, "--color-chart-1");
  const lightStroke = await chartLine.evaluate((node) => getComputedStyle(node).stroke);

  await themeToggle.click();

  await expect(themeToggle).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.waitForFunction(
    (previous) => getComputedStyle(document.documentElement).getPropertyValue("--color-chart-1").trim() !== previous,
    lightToken
  );

  const darkToken = await getCssVariable(page, "--color-chart-1");
  const darkStroke = await chartLine.evaluate((node) => getComputedStyle(node).stroke);

  expect(darkToken).not.toBe(lightToken);
  expect(darkStroke).not.toBe(lightStroke);
});

test("dashboard starter: responsive layout keeps desktop sidebar visible and hides it on narrow screens", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.locator(".app-shell-sidebar")).toBeVisible();

  const desktopColumns = await page.locator(".app-shell-content").evaluate((node) => getComputedStyle(node).gridTemplateColumns);
  expect(desktopColumns).not.toBe("none");

  await page.setViewportSize({ width: 800, height: 900 });
  await expect(page.locator(".app-shell-sidebar")).toBeHidden();
  await expect(page.locator(".app-shell-main")).toBeVisible();
});
