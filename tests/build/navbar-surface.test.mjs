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

test("navbar surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".navbar {",
    ".navbar-brand {",
    ".navbar-nav {",
    ".navbar-item {",
    '.navbar-item[aria-current="page"] {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing navbar selector: ${marker}`);
  }
});

test("navbar surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".top-nav", ".main-navbar", ".nav-item-active", ".navbar-active"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden navbar alias leaked: ${className}`);
  }
});

test("navbar surface: playground includes semantic navbar markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="navbar" aria-label="Main navigation"'));
  assert.ok(html.includes('class="navbar-brand"'));
  assert.ok(html.includes('class="navbar-nav"'));
  assert.ok(html.includes('class="navbar-item" href="#" aria-current="page"'));
});
