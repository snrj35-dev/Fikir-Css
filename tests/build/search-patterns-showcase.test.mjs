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

test("search patterns showcase: playground includes command-bar pattern section", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("32) Command Bar + Filter Bar Composite"));
  assert.ok(html.includes('data-pattern="command-bar"'));
  assert.ok(html.includes('class="search-box"'));
  assert.ok(html.includes("Quick open"));
});

test("search patterns showcase: playground includes filter-bar implementation", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('data-pattern="filter-bar"'));
  assert.ok(html.includes('data-slot="search"'));
  assert.ok(html.includes('data-slot="filters"'));
  assert.ok(html.includes('data-slot="reset"'));
  assert.ok(html.includes('data-slot="chips"'));
  assert.ok(html.includes('id="demo-filter-status" class="select"'));
  assert.ok(html.includes("Apply"));
  assert.ok(html.includes("Reset"));
});

test("search patterns showcase: filter-bar css contract is bundled", async () => {
  const css = await readDistCss();
  const markers = [
    '[data-pattern="filter-bar"] {',
    '.card[data-pattern="filter-bar"] {',
    '[data-pattern="filter-bar"] [data-slot="controls"]',
    '[data-pattern="filter-bar"] [data-slot="search"]',
    '[data-pattern="filter-bar"] [data-slot="filters"]',
    '[data-pattern="filter-bar"] [data-slot="reset"]',
    '[data-pattern="filter-bar"] [data-slot="summary"]',
    '[data-pattern="filter-bar"] [data-slot="chips"]'
  ];

  for (const marker of markers) {
    assert.ok(css.includes(marker), `Missing filter-bar selector: ${marker}`);
  }
});

test("search patterns showcase: playground includes search-filter composite summary", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('data-pattern="search-filter-composite"'));
  assert.ok(html.includes("12 results"));
  assert.ok(html.includes('aria-label="Composite result snapshot"'));
});
