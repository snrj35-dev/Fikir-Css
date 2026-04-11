import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);
const playgroundIndexPath = resolve(rootDir, "playground/index.html");
const playgroundJsPath = resolve(rootDir, "playground/demo.js");

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("toast surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();

  for (const marker of [".toast-viewport {", ".toast {", '.toast[data-open="true"] {']) {
    assert.ok(distCss.includes(marker), `Missing toast selector: ${marker}`);
  }
});

test("toast surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".toast-open", ".toast-closed", ".toast-item", ".toast-container"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden toast alias leaked: ${className}`);
  }
});

test("toast surface: playground includes live region and controls", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="toast-viewport" aria-live="polite" aria-atomic="true"'));
  assert.ok(html.includes('data-toast-show="demo-toast-info"'));
  assert.ok(html.includes('data-toast-hide="demo-toast-info"'));
  assert.ok(html.includes('class="toast" data-open="false"'));
});

test("toast surface: playground js includes toast show/hide wiring", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-toast-show"));
  assert.ok(js.includes("data-toast-hide"));
  assert.ok(js.includes("setToastOpen"));
});
