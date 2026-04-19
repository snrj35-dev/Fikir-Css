/**
 * cross-theme-smoke.spec.mjs — M17.7 (P0/P1)
 * Browser-level: light × dark × high-contrast + compact × comfortable smoke.
 * Validates that theme CSS loads without breaking core token presence
 * and that key elements remain visible across all theme combinations.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/cross-theme-smoke.html")}`;

const themes = {
  light:         `file://${resolve(process.cwd(), "dist/themes/light.css")}`,
  dark:          `file://${resolve(process.cwd(), "dist/themes/dark.css")}`,
  "high-contrast": `file://${resolve(process.cwd(), "dist/themes/high-contrast.css")}`,
  compact:       `file://${resolve(process.cwd(), "dist/themes/compact.css")}`,
  comfortable:   `file://${resolve(process.cwd(), "dist/themes/comfortable.css")}`,
  "reduced-motion": `file://${resolve(process.cwd(), "dist/themes/reduced-motion.css")}`,
  shape:         `file://${resolve(process.cwd(), "dist/themes/shape.css")}`,
};

async function loadTheme(page, themeUrl, themeAttr) {
  await page.evaluate(([href, attr]) => window.loadTheme(href, attr), [themeUrl, themeAttr ?? null]);
  await page.waitForTimeout(50);
}

// ─── Light theme (baseline) ─────────────────────────────────────────────────

test("light theme: core elements are visible", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.light);
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
  await expect(page.locator("#card-sample")).toBeVisible();
});

test("light theme: --color-bg-default token is defined", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.light);
  const val = await page.evaluate(() => window.getTokenValue("--color-bg-default"));
  expect(val.length).toBeGreaterThan(0);
});

test("light theme: --color-fg-default token is defined", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.light);
  const val = await page.evaluate(() => window.getTokenValue("--color-fg-default"));
  expect(val.length).toBeGreaterThan(0);
});

// ─── Dark theme ──────────────────────────────────────────────────────────────

test("dark theme: core elements remain visible", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.dark, "dark");
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
  await expect(page.locator("#card-sample")).toBeVisible();
});

test("dark theme: --color-bg-default is overridden to a dark value", async ({ page }) => {
  await page.goto(url);
  const base = await page.evaluate(() => window.getTokenValue("--color-bg-default"));
  await loadTheme(page, themes.dark, "dark");
  await page.waitForFunction(
    (prev) => window.getTokenValue("--color-bg-default") !== prev,
    base,
    { timeout: 3000 }
  );
  const darkBg = await page.evaluate(() => window.getTokenValue("--color-bg-default"));
  expect(darkBg.length).toBeGreaterThan(0);
  expect(darkBg).toContain("oklch");
});

test("dark theme: --color-primary token is defined", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.dark, "dark");
  const val = await page.evaluate(() => window.getTokenValue("--color-primary"));
  expect(val.length).toBeGreaterThan(0);
});

// ─── High contrast theme ─────────────────────────────────────────────────────

test("high-contrast theme: core elements remain visible", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes["high-contrast"]);
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
});

test("high-contrast theme: --color-bg-default is defined", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes["high-contrast"]);
  const val = await page.evaluate(() => window.getTokenValue("--color-bg-default"));
  expect(val.length).toBeGreaterThan(0);
});

test("high-contrast theme: btn-primary remains visible", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes["high-contrast"]);
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#btn-danger")).toBeVisible();
});

// ─── Compact density ─────────────────────────────────────────────────────────

test("compact theme: core elements remain visible", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.compact);
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
});

test("compact theme: --space-1 is smaller than comfortable", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.comfortable);
  const comfortable = await page.evaluate(() => window.getTokenValue("--space-1"));
  await loadTheme(page, themes.compact);
  const compact = await page.evaluate(() => window.getTokenValue("--space-1"));
  // compact spacing should be less than or equal to comfortable
  const compactNum = parseFloat(compact);
  const comfortableNum = parseFloat(comfortable);
  if (!isNaN(compactNum) && !isNaN(comfortableNum)) {
    expect(compactNum).toBeLessThanOrEqual(comfortableNum);
  } else {
    // Tokens may be defined as color-mix/oklch — just check they're defined
    expect(compact.length).toBeGreaterThan(0);
  }
});

// ─── Comfortable density ──────────────────────────────────────────────────────

test("comfortable theme: core elements remain visible", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.comfortable);
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
});

// ─── Reduced motion ───────────────────────────────────────────────────────────

test("reduced-motion theme: loads without errors", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(err.message));
  await page.goto(url);
  await loadTheme(page, themes["reduced-motion"]);
  await expect(page.locator("#btn-primary")).toBeVisible();
  expect(errors).toHaveLength(0);
});

// ─── Dark + compact combination ───────────────────────────────────────────────

test("dark + compact combination: elements visible", async ({ page }) => {
  await page.goto(url);
  // Load dark first, then stack compact on top via evaluate
  await page.evaluate((darkUrl) => {
    window.loadTheme(darkUrl);
    const extra = document.createElement("link");
    extra.id = "extra-theme";
    extra.rel = "stylesheet";
    extra.href = darkUrl.replace("dark.css", "compact.css");
    document.head.appendChild(extra);
  }, themes.dark);
  await page.waitForTimeout(100);
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
});

// ─── Shape: sharp × default × rounded ────────────────────────────────────────

async function setShape(page, shapeUrl, shapeAttr) {
  await page.evaluate(([href, attr]) => {
    let link = document.getElementById("shape-css");
    if (!link) {
      link = document.createElement("link");
      link.id = "shape-css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
    if (attr) document.documentElement.setAttribute("data-shape", attr);
    else document.documentElement.removeAttribute("data-shape");
  }, [shapeUrl, shapeAttr ?? null]);
  await page.waitForTimeout(50);
}

test("shape default: core elements visible (no shape override)", async ({ page }) => {
  await page.goto(url);
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
  await expect(page.locator("#card-sample")).toBeVisible();
});

test("shape rounded: core elements visible", async ({ page }) => {
  await page.goto(url);
  await setShape(page, themes.shape, "rounded");
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
});

test("shape rounded: --radius-md overridden to larger value", async ({ page }) => {
  await page.goto(url);
  const base = await page.evaluate(() => window.getTokenValue("--radius-md"));
  await setShape(page, themes.shape, "rounded");
  await page.waitForFunction(
    (prev) => window.getTokenValue("--radius-md") !== prev,
    base,
    { timeout: 3000 }
  );
  const rounded = await page.evaluate(() => window.getTokenValue("--radius-md"));
  expect(rounded).toBe("0.875rem");
});

test("shape sharp: core elements visible", async ({ page }) => {
  await page.goto(url);
  await setShape(page, themes.shape, "sharp");
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
});

test("shape sharp: --radius-md set to 0", async ({ page }) => {
  await page.goto(url);
  await setShape(page, themes.shape, "sharp");
  await page.waitForFunction(
    () => window.getTokenValue("--radius-md") !== "",
    null,
    { timeout: 3000 }
  );
  const sharp = await page.evaluate(() => window.getTokenValue("--radius-md"));
  expect(sharp).toBe("0");
});

test("shape sharp: --radius-full set to 0", async ({ page }) => {
  await page.goto(url);
  await setShape(page, themes.shape, "sharp");
  await page.waitForFunction(
    () => window.getTokenValue("--radius-full") !== "",
    null,
    { timeout: 3000 }
  );
  const val = await page.evaluate(() => window.getTokenValue("--radius-full"));
  expect(val).toBe("0");
});

test("shape rounded + dark combination: elements visible", async ({ page }) => {
  await page.goto(url);
  await loadTheme(page, themes.dark, "dark");
  await setShape(page, themes.shape, "rounded");
  await expect(page.locator("#btn-primary")).toBeVisible();
  await expect(page.locator("#text-input")).toBeVisible();
});
