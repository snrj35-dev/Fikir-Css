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

test("rating surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".rating {", ".rating-item {", ".rating-item-active {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing rating selector: ${marker}`);
  }
});

test("rating surface: state selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.rating-item[data-active="true"],'));
  assert.ok(distCss.includes('.rating[aria-disabled="true"] .rating-item {'));
  assert.ok(distCss.includes(".rating-item[disabled],"));
});

test("rating surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".stars", ".rate", ".score-input", ".rating-disabled"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden rating alias leaked: ${className}`);
  }
});

test("rating surface: playground includes rating markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("43) Rating Surface"));
  assert.ok(html.includes('class="rating"'));
  assert.ok(html.includes('class="rating-item rating-item-active"'));
});
