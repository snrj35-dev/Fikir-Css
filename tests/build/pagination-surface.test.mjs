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

test("pagination surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".pagination {",
    ".pagination-item {",
    '.pagination-item[aria-current="page"] {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing pagination selector: ${marker}`);
  }
});

test("pagination surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".pager", ".pagination-link", ".pagination-active", ".page-item"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden pagination alias leaked: ${className}`);
  }
});

test("pagination surface: playground includes semantic pagination markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="pagination" aria-label="Results pages"'));
  assert.ok(html.includes('class="pagination-item" href="#" aria-current="page"'));
});
