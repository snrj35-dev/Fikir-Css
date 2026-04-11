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

test("progress surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".progress {", ".progress-label {", ".progress-track {", ".progress-indicator {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing progress selector: ${marker}`);
  }
});

test("progress surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".progress-bar", ".loading-bar", ".bar-track", ".progress-fill"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden progress alias leaked: ${className}`);
  }
});

test("progress surface: playground includes progress semantics", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="progress" role="progressbar"'));
  assert.ok(html.includes('class="progress-label"'));
  assert.ok(html.includes('class="progress-track"'));
  assert.ok(html.includes('class="progress-indicator" style="--progress-value: 68%"'));
});
