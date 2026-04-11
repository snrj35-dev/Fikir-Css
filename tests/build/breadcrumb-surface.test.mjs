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

test("breadcrumb surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".breadcrumb {",
    ".breadcrumb-list {",
    ".breadcrumb-item {",
    ".breadcrumb-link {",
    ".breadcrumb-current {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing breadcrumb selector: ${marker}`);
  }
});

test("breadcrumb surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".breadcrumbs", ".crumb", ".breadcrumb-active", ".breadcrumb-disabled"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden breadcrumb alias leaked: ${className}`);
  }
});

test("breadcrumb surface: playground includes semantic breadcrumb markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="breadcrumb" aria-label="Breadcrumb"'));
  assert.ok(html.includes('class="breadcrumb-list"'));
  assert.ok(html.includes('class="breadcrumb-link"'));
  assert.ok(html.includes('class="breadcrumb-current" aria-current="page"'));
});
