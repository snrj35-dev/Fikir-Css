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

test("range-slider surface: canonical selector exists", async () => {
  const distCss = await readDistCss();
  assert.ok(distCss.includes(".range-slider {"), "Missing canonical .range-slider selector");
});

test("range-slider surface: track/thumb and disabled selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes(".range-slider::-webkit-slider-runnable-track {"));
  assert.ok(distCss.includes(".range-slider::-webkit-slider-thumb {"));
  assert.ok(distCss.includes(".range-slider::-moz-range-track {"));
  assert.ok(distCss.includes(".range-slider::-moz-range-thumb {"));
  assert.ok(distCss.includes(".range-slider[disabled] {"));
});

test("range-slider surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".slider", ".input-range", ".range-input", ".range-control"];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden range-slider alias leaked: ${className}`);
  }
});

test("range-slider surface: playground includes range-slider markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="range-slider"'));
  assert.ok(html.includes('id="demo-volume"'));
});
