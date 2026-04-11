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

test("result surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".result {", ".result-media {", ".result-title {", ".result-description {", ".result-actions {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing result selector: ${marker}`);
  }
});

test("result surface: tone selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.result[data-result-tone="success"] {'));
  assert.ok(distCss.includes('.result[data-result-tone="danger"] {'));
});

test("result surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".status-page", ".result-card", ".state-screen", ".result-success"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden result alias leaked: ${className}`);
  }
});

test("result surface: playground includes result markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("44) Result / Status Surface"));
  assert.ok(html.includes('class="result" data-result-tone="success"'));
  assert.ok(html.includes('class="result-actions"'));
});
