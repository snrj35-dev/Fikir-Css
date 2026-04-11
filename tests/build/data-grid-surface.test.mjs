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

test("data-grid surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".data-grid {",
    ".data-grid-head,",
    ".data-grid-body {",
    ".data-grid-row {",
    ".data-grid-cell {",
    '.data-grid-row[data-row-selected="true"] {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing data-grid selector: ${marker}`);
  }
});

test("data-grid surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".data-table", ".table-grid", ".grid-row", ".grid-cell"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden data-grid alias leaked: ${className}`);
  }
});

test("data-grid surface: playground includes role-based grid markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("26.1) Data Grid Surface"));
  assert.ok(html.includes('class="data-grid" role="grid"'));
  assert.ok(html.includes('class="data-grid-head" role="rowgroup"'));
  assert.ok(html.includes('class="data-grid-body" role="rowgroup"'));
  assert.ok(html.includes('class="data-grid-cell" role="columnheader"'));
  assert.ok(html.includes('class="data-grid-row" role="row" data-row-selected="true"'));
});
