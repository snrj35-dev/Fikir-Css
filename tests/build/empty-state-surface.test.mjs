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

test("empty-state surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".empty-state {",
    ".empty-state-media {",
    ".empty-state-title {",
    ".empty-state-description {",
    ".empty-state-actions {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing empty-state selector: ${marker}`);
  }
});

test("empty-state surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = ["empty", "blank-state", "zero-state", "empty-panel"];

  for (const className of forbidden) {
    const selectorPattern = new RegExp(`\\.${className}(?![-_a-zA-Z0-9])`);
    assert.equal(selectorPattern.test(distCss), false, `Forbidden empty-state alias leaked: .${className}`);
  }
});

test("empty-state surface: playground includes empty-state markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="empty-state" aria-label="No table records"'));
  assert.ok(html.includes('class="empty-state-media" aria-hidden="true"'));
  assert.ok(html.includes('class="empty-state-title"'));
  assert.ok(html.includes('class="empty-state-description"'));
  assert.ok(html.includes('class="empty-state-actions"'));
});
