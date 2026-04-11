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

test("tree-view surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".tree-view {", ".tree-view-item {", ".tree-view-group {", ".tree-view-toggle {", ".tree-view-label {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing tree-view selector: ${marker}`);
  }
});

test("tree-view surface: state selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.tree-view-item[data-tree-expanded="false"] > .tree-view-group {'));
  assert.ok(distCss.includes(".tree-view-toggle[disabled],"));
});

test("tree-view surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".tree", ".folder-tree", ".nav-tree", ".tree-view-open"];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden tree-view alias leaked: ${className}`);
  }
});

test("tree-view surface: playground includes tree-view markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("45) Tree View Surface"));
  assert.ok(html.includes('class="tree-view"'));
  assert.ok(html.includes('class="tree-view-toggle"'));
});
