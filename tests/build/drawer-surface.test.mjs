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

test("drawer surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".drawer {",
    '.drawer[data-open="true"] {',
    ".drawer-backdrop {",
    ".drawer-panel {",
    ".drawer-header {",
    ".drawer-body {",
    ".drawer-footer {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing drawer selector: ${marker}`);
  }
});

test("drawer surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".drawer-open", ".drawer-closed", ".side-drawer", ".drawer-dialog"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden drawer alias leaked: ${className}`);
  }
});

test("drawer surface: playground includes dialog semantics", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="drawer"'));
  assert.ok(html.includes('class="drawer-panel" role="dialog"'));
  assert.ok(html.includes('aria-modal="true"'));
  assert.ok(html.includes('data-drawer-open="demo-drawer"'));
  assert.ok(html.includes('data-drawer-close="demo-drawer"'));
});

test("drawer surface: playground js includes open/close wiring and escape handling", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-drawer-open"));
  assert.ok(js.includes("data-drawer-close"));
  assert.ok(js.includes("setDrawerOpen"));
  assert.ok(js.includes('.drawer[data-open="true"]'));
});
