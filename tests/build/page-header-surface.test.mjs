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

test("page-header surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".page-header {", ".page-header-content {", ".page-header-actions {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing page-header selector: ${marker}`);
  }
});

test("page-header surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".header-bar", ".page-title-bar", ".page-toolbar"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden page-header alias leaked: ${className}`);
  }
});

test("page-header surface: playground includes page-header markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('23) Page Header Surface'));
  assert.ok(html.includes('class="page-header"'));
  assert.ok(html.includes('class="page-header-content"'));
  assert.ok(html.includes('class="page-header-actions"'));
});
