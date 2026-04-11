import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);
const playgroundIndexPath = resolve(rootDir, "playground/index.html");

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("menu-bar surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".menu-bar {",
    ".menu-bar-list {",
    ".menu-bar-item {",
    ".menu-bar-trigger {",
    ".menu-bar-content {",
    '.menu-bar-item[data-open="true"] .menu-bar-content {',
    ".menu-bar-link {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing menu-bar selector: ${marker}`);
  }
});

test("menu-bar surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".menubar", ".top-menu", ".menu-item", ".menu-panel"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden menu-bar alias leaked: ${className}`);
  }
});

test("menu-bar surface: playground includes semantic menu-bar markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("20.1) Menu Bar Surface"));
  assert.ok(html.includes('class="menu-bar" aria-label="Workspace menu bar"'));
  assert.ok(html.includes('class="menu-bar-list"'));
  assert.ok(html.includes('class="menu-bar-item" data-open="true"'));
  assert.ok(html.includes('class="menu-bar-trigger"'));
  assert.ok(html.includes('class="menu-bar-content" role="menu"'));
  assert.ok(html.includes('class="menu-bar-link" href="#" role="menuitem"'));
});
