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

test("timeline surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".timeline {",
    ".timeline-item {",
    ".timeline-marker {",
    ".timeline-content {",
    ".timeline-title {",
    ".timeline-meta {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing timeline selector: ${marker}`);
  }
});

test("timeline surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".timeline-list", ".timeline-entry", ".timeline-dot", ".timeline-event"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden timeline alias leaked: ${className}`);
  }
});

test("timeline surface: playground includes timeline markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("28) Timeline + KPI Card Surface"));
  assert.ok(html.includes('class="timeline" aria-label="Release timeline"'));
  assert.ok(html.includes('class="timeline-item"'));
  assert.ok(html.includes('class="timeline-marker"'));
  assert.ok(html.includes('class="timeline-content"'));
});
