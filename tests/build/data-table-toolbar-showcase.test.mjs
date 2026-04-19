import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const playgroundIndexPath = resolve(rootDir, "playground/index.html");
const distCssPath = resolve(rootDir, config.build.cssOutFile);

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("data table toolbar showcase: playground includes pattern section", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("33) Data Table Toolbar Pattern"));
  assert.ok(html.includes('data-pattern="data-table-toolbar"'));
});

test("data table toolbar showcase: implementation uses current class surface", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="search-box"'));
  assert.ok(html.includes('id="demo-table-status-filter" class="select"'));
  assert.ok(html.includes('id="demo-table-density" class="select"'));
  assert.ok(html.includes('data-slot="column-visibility"'));
  assert.ok(html.includes('data-slot="density"'));
  assert.ok(html.includes('data-slot="export"'));
  assert.ok(html.includes('data-slot="selection-summary"'));
  assert.ok(html.includes('class="btn btn-outline btn-sm"'));
  assert.ok(html.includes('class="table"'));
  assert.ok(html.includes('class="table-row" data-row-selected="true"'));
});

test("data table toolbar showcase: accessibility link to controlled table exists", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('id="demo-issues-table"'));
  assert.ok(html.includes('aria-controls="demo-issues-table"'));
  assert.ok(html.includes('aria-label="Issue table snapshot"'));
});

test("data table toolbar showcase: css contract is bundled", async () => {
  const css = await readDistCss();
  const markers = [
    '[data-pattern="data-table-toolbar"] {',
    '.card[data-pattern="data-table-toolbar"] {',
    '[data-pattern="data-table-toolbar"] [data-slot="controls"]',
    '[data-pattern="data-table-toolbar"] [data-slot="column-visibility"]',
    '[data-pattern="data-table-toolbar"] [data-slot="density"]',
    '[data-pattern="data-table-toolbar"] [data-slot="export"]',
    '[data-pattern="data-table-toolbar"] [data-slot="summary"]',
    '[data-pattern="data-table-toolbar"] [data-slot="surface"]'
  ];

  for (const marker of markers) {
    assert.ok(css.includes(marker), `Missing data-table-toolbar selector: ${marker}`);
  }
});
