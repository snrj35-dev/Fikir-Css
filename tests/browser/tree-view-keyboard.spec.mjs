/**
 * tree-view-keyboard.spec.mjs — M17.3
 * Browser-level: tree-view arrow key navigation, expand/collapse.
 */
import { test, expect } from "@playwright/test";
import { resolve } from "node:path";

const url = `file://${resolve(process.cwd(), "tests/browser/fixtures/tree-view.html")}`;

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("tree-view: has role=tree", async ({ page }) => {
  await expect(page.locator("[role='tree']")).toBeAttached();
});

test("tree-view: root nodes have role=treeitem", async ({ page }) => {
  const roots = page.locator("[role='treeitem'][aria-level='1']");
  await expect(roots).toHaveCount(2);
});

test("tree-view: first root item is focusable (tabindex=0)", async ({ page }) => {
  await expect(page.locator("#node-1")).toHaveAttribute("tabindex", "0");
});

test("tree-view: ArrowRight expands collapsed node", async ({ page }) => {
  await page.locator("#node-1").focus();
  await expect(page.locator("#node-1")).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#node-1")).toHaveAttribute("aria-expanded", "true");
});

test("tree-view: ArrowRight on expanded node moves focus to first child", async ({ page }) => {
  await page.locator("#node-1").focus();
  await page.keyboard.press("ArrowRight"); // expand
  await page.keyboard.press("ArrowRight"); // move to first child
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("node-2");
});

test("tree-view: ArrowLeft collapses expanded node", async ({ page }) => {
  await page.locator("#node-1").focus();
  await page.keyboard.press("ArrowRight"); // expand
  await expect(page.locator("#node-1")).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("ArrowLeft"); // collapse
  await expect(page.locator("#node-1")).toHaveAttribute("aria-expanded", "false");
});

test("tree-view: ArrowDown moves focus to next visible node", async ({ page }) => {
  await page.locator("#node-1").focus();
  await page.keyboard.press("ArrowDown");
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("node-4");
});

test("tree-view: ArrowDown after expand moves into children", async ({ page }) => {
  await page.locator("#node-1").focus();
  await page.keyboard.press("ArrowRight"); // expand
  await page.keyboard.press("ArrowDown");  // move to first child
  const focused = await page.evaluate(() => document.activeElement?.id);
  expect(focused).toBe("node-2");
});

test("tree-view: Enter toggles expand on node with children", async ({ page }) => {
  await page.locator("#node-1").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#node-1")).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Enter");
  await expect(page.locator("#node-1")).toHaveAttribute("aria-expanded", "false");
});

test("tree-view: child nodes have aria-level=2", async ({ page }) => {
  await page.locator("#node-1").focus();
  await page.keyboard.press("ArrowRight"); // expand
  await expect(page.locator("#node-2")).toHaveAttribute("aria-level", "2");
  await expect(page.locator("#node-3")).toHaveAttribute("aria-level", "2");
});
