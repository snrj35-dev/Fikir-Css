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

test("tabs surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".tabs {",
    ".tabs-list {",
    ".tabs-trigger {",
    '.tabs-trigger[data-active="true"] {',
    ".tabs-panel {",
    '.tabs-panel[data-active="true"] {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing tabs selector: ${marker}`);
  }
});

test("tabs surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".tab", ".tab-list", ".tab-trigger", ".tab-panel"];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden tabs alias leaked: ${className}`);
  }
});

test("tabs surface: playground includes tabs markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('data-tabs-root'));
  assert.ok(html.includes('class="tabs-list" role="tablist"'));
  assert.ok(html.includes('class="tabs-trigger"'));
  assert.ok(html.includes('class="tabs-panel"'));
});

test("tabs surface: playground js includes tabs switching wiring", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-tabs-root"));
  assert.ok(js.includes("data-tabs-trigger"));
  assert.ok(js.includes("data-tabs-panel"));
});
