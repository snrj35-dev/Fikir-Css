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

test("table surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".table {",
    ".table-head {",
    ".table-body {",
    ".table-row {",
    ".table-head-cell {",
    ".table-cell {",
    '.table-row[data-row-selected="true"] {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing table selector: ${marker}`);
  }
});

test("table surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".data-table", ".table-grid", ".table-header-cell", ".table-body-row"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden table alias leaked: ${className}`);
  }
});

test("table surface: playground includes table markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("26) Table + Empty State Surface"));
  assert.ok(html.includes('class="table" aria-label="Project metrics table"'));
  assert.ok(html.includes('class="table-head"'));
  assert.ok(html.includes('class="table-body"'));
  assert.ok(html.includes('class="table-row" data-row-selected="true"'));
});
