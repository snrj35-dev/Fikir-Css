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

test("stepper surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".stepper {",
    ".stepper-item {",
    ".stepper-marker {",
    ".stepper-label {",
    '.stepper-item[data-state="complete"] .stepper-marker,',
    '.stepper-item[data-state="active"] .stepper-marker {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing stepper selector: ${marker}`);
  }
});

test("stepper surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".steps", ".step-item", ".step-active", ".stepper-active"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden stepper alias leaked: ${className}`);
  }
});

test("stepper surface: playground includes stateful stepper markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="stepper" aria-label="Checkout steps"'));
  assert.ok(html.includes('class="stepper-item" data-state="complete"'));
  assert.ok(html.includes('class="stepper-item" data-state="active"'));
  assert.ok(html.includes('class="stepper-item" data-state="upcoming"'));
});
