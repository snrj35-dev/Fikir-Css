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

test("popover surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();

  for (const marker of [".popover {", ".popover-content {", '.popover[data-open="true"] .popover-content {']) {
    assert.ok(distCss.includes(marker), `Missing popover selector: ${marker}`);
  }
});

test("popover surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".popover-open", ".popover-closed", ".popover-panel", ".overlay-popover"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden popover alias leaked: ${className}`);
  }
});

test("popover surface: playground includes accessible trigger/content relation", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="popover"'));
  assert.ok(html.includes('class="popover-content '));
  assert.ok(html.includes('data-popover-toggle="demo-popover-filters"'));
  assert.ok(html.includes('aria-controls="demo-popover-filters-content"'));
  assert.ok(html.includes('aria-expanded="false"'));
});

test("popover surface: playground js includes toggle/close/outside wiring", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-popover-toggle"));
  assert.ok(js.includes("data-popover-close"));
  assert.ok(js.includes("setPopoverOpen"));
  assert.ok(js.includes('window.addEventListener("click"'));
});
