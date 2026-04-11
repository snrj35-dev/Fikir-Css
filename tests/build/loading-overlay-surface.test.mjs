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

test("loading-overlay surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();

  for (const marker of [
    ".loading-overlay {",
    ".loading-overlay-backdrop {",
    ".loading-overlay-content {",
    '.loading-overlay[data-loading="true"] .loading-overlay-backdrop,',
    '.loading-overlay[data-loading="true"] .loading-overlay-content {'
  ]) {
    assert.ok(distCss.includes(marker), `Missing loading-overlay selector: ${marker}`);
  }
});

test("loading-overlay surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".loading-mask", ".overlay-loader", ".busy-overlay", ".loading-panel"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden loading-overlay alias leaked: ${className}`);
  }
});

test("loading-overlay surface: playground includes loading semantics", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="loading-overlay surface surface-sunken" data-loading="true" aria-busy="true"'));
  assert.ok(html.includes('class="loading-overlay-backdrop"'));
  assert.ok(html.includes('class="loading-overlay-content"'));
  assert.ok(html.includes("Loading report..."));
});
