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

test("sidebar-nav surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".sidebar-nav {",
    ".sidebar-nav-section {",
    ".sidebar-nav-item {",
    '.sidebar-nav-item[aria-current="page"] {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing sidebar-nav selector: ${marker}`);
  }
});

test("sidebar-nav surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".sidebar-menu", ".side-nav", ".sidebar-item-active", ".sidebar-nav-active"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden sidebar-nav alias leaked: ${className}`);
  }
});

test("sidebar-nav surface: playground includes semantic sidebar navigation markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="sidebar-nav" aria-label="Sidebar navigation"'));
  assert.ok(html.includes('class="sidebar-nav-section"'));
  assert.ok(html.includes('class="sidebar-nav-item" href="#" aria-current="page"'));
});
