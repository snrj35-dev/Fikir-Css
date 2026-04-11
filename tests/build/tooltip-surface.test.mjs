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

test("tooltip surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".tooltip {",
    ".tooltip-content {",
    '.tooltip[data-open="true"] .tooltip-content {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing tooltip selector: ${marker}`);
  }
});

test("tooltip surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".tooltip-open", ".tooltip-closed", ".tooltip-panel", ".tooltip-bubble"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden tooltip alias leaked: ${className}`);
  }
});

test("tooltip surface: playground includes aria-describedby relation", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="tooltip"'));
  assert.ok(html.includes('class="tooltip-content" role="tooltip"'));
  assert.ok(html.includes('aria-describedby="demo-tooltip-save"'));
  assert.ok(html.includes('data-tooltip-target'));
});

test("tooltip surface: playground js includes hover/focus state wiring", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-tooltip-target"));
  assert.ok(js.includes("setTooltipOpen"));
  assert.ok(js.includes("mouseenter"));
  assert.ok(js.includes("focus"));
});
