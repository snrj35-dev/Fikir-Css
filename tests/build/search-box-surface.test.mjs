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

test("search-box surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".search-box {", ".search-box-input {", ".search-box-action {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing search-box selector: ${marker}`);
  }
});

test("search-box surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = ["searchbar", "search-input-group", "site-search", "search-submit"];

  for (const className of forbidden) {
    const selectorPattern = new RegExp(`\\.${className}(?![-_a-zA-Z0-9])`);
    assert.equal(selectorPattern.test(distCss), false, `Forbidden search-box alias leaked: .${className}`);
  }
});

test("search-box surface: playground includes search-box markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="search-box"'));
  assert.ok(html.includes('class="search-box-input"'));
  assert.ok(html.includes('class="search-box-action"'));
});
