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

test("number-input surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".number-input {", ".number-input-controls {", ".number-input-step {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing number-input selector: ${marker}`);
  }
});

test("number-input surface: composition and state selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.number-input > .input[type="number"] {'));
  assert.ok(distCss.includes(".number-input-step:focus-visible {"));
  assert.ok(distCss.includes(".number-input-step[disabled] {"));
});

test("number-input surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".input-number", ".numeric-input", ".spinner-input", ".number-spinner"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden number-input alias leaked: ${className}`);
  }
});

test("number-input surface: playground includes number-input markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="number-input"'));
  assert.ok(html.includes('class="number-input-controls"'));
  assert.ok(html.includes('class="number-input-step"'));
  assert.ok(html.includes('id="demo-number-input"'));
});
