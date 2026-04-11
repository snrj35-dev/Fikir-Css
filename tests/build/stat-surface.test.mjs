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

test("stat surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".stat {", ".stat-label {", ".stat-value {", ".stat-meta {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing stat selector: ${marker}`);
  }
});

test("stat surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = ["metric-card", "kpi", "stat-title", "stat-number", "stat-caption"];

  for (const className of forbidden) {
    const selectorPattern = new RegExp(`\\.${className}(?![-_a-zA-Z0-9])`);
    assert.equal(selectorPattern.test(distCss), false, `Forbidden stat alias leaked: .${className}`);
  }
});

test("stat surface: playground includes stat markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="stat"'));
  assert.ok(html.includes('class="stat-label"'));
  assert.ok(html.includes('class="stat-value"'));
  assert.ok(html.includes('class="stat-meta"'));
});
