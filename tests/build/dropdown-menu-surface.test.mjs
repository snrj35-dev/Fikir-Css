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

test("dropdown-menu surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();

  for (const marker of [
    ".dropdown-menu {",
    ".dropdown-menu-content {",
    '.dropdown-menu[data-open="true"] .dropdown-menu-content {',
    ".dropdown-menu-item {"
  ]) {
    assert.ok(distCss.includes(marker), `Missing dropdown-menu selector: ${marker}`);
  }
});

test("dropdown-menu surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".dropdown-open", ".dropdown-closed", ".dropdown-panel", ".menu-dropdown"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden dropdown alias leaked: ${className}`);
  }
});

test("dropdown-menu surface: playground includes trigger/content relation", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="dropdown-menu"'));
  assert.ok(html.includes('class="dropdown-menu-content"'));
  assert.ok(html.includes('class="dropdown-menu-item"'));
  assert.ok(html.includes('data-dropdown-toggle="demo-dropdown-account"'));
  assert.ok(html.includes('aria-controls="demo-dropdown-account-content"'));
  assert.ok(html.includes('aria-expanded="false"'));
});

test("dropdown-menu surface: playground js includes toggle/close/outside wiring", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-dropdown-toggle"));
  assert.ok(js.includes("data-dropdown-close"));
  assert.ok(js.includes("setDropdownOpen"));
  assert.ok(js.includes(".dropdown-menu[data-open="));
});
