import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);
const playgroundIndexPath = resolve(rootDir, "playground/index.html");
const playgroundJsPath = resolve(rootDir, "playground/demo.js");

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("split-button surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".split-button {",
    ".split-button-action {",
    ".split-button-toggle {",
    ".split-button:focus-within .split-button-action,",
    ".split-button:focus-within .split-button-toggle {",
    '.split-button[data-open="true"] .split-button-toggle {',
    ".split-button .dropdown-menu-content {",
    '.split-button[data-open="true"] .dropdown-menu-content {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing split-button selector: ${marker}`);
  }
});

test("split-button surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".split-action-button", ".split-button-menu", ".split-button-panel", ".btn-split"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden split-button alias leaked: ${className}`);
  }
});

test("split-button surface: playground includes dropdown-integrated markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("14.2) Split Button Surface"));
  assert.ok(html.includes('id="demo-split-button" class="split-button dropdown-menu" data-open="false"'));
  assert.ok(html.includes('class="split-button-action btn btn-solid btn-primary btn-sm"'));
  assert.ok(html.includes('class="split-button-toggle btn btn-solid btn-primary btn-sm"'));
  assert.ok(html.includes('data-split-button-toggle'));
  assert.ok(html.includes('aria-haspopup="menu"'));
  assert.ok(html.includes('aria-controls="demo-split-button-menu"'));
  assert.ok(html.includes('id="demo-split-button-menu" class="dropdown-menu-content" data-split-button-menu role="menu"'));
  assert.ok(html.includes('class="dropdown-menu-item" type="button" role="menuitem" data-dropdown-close="demo-split-button"'));
});

test("split-button surface: playground js includes keyboard focus wiring", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-split-button-toggle"));
  assert.ok(js.includes("data-split-button-menu"));
  assert.ok(js.includes("focusDropdownBoundaryItem"));
  assert.ok(js.includes('event.key !== "ArrowDown" && event.key !== "ArrowUp"'));
  assert.ok(js.includes('setDropdownOpen(dropdown.id, false, { restoreFocus: true })'));
});
