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

test("kpi-card surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".kpi-card {",
    ".kpi-card-header {",
    ".kpi-card-value {",
    ".kpi-card-meta {",
    ".kpi-card-trend {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing kpi-card selector: ${marker}`);
  }
});

test("kpi-card surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".metric-tile", ".kpi-panel", ".kpi-value", ".kpi-trend"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden kpi-card alias leaked: ${className}`);
  }
});

test("kpi-card surface: playground includes kpi-card markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="kpi-card"'));
  assert.ok(html.includes('class="kpi-card-header"'));
  assert.ok(html.includes('class="kpi-card-value"'));
  assert.ok(html.includes('class="kpi-card-meta"'));
  assert.ok(html.includes('class="kpi-card-trend"'));
});
