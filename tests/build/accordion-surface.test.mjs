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

test("accordion surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".accordion {",
    ".accordion-item {",
    ".accordion-trigger {",
    ".accordion-panel {",
    '.accordion-item[data-open="true"] .accordion-panel {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing accordion selector: ${marker}`);
  }
});

test("accordion surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".accordion-open", ".accordion-header", ".accordion-body", ".faq-accordion"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden accordion alias leaked: ${className}`);
  }
});

test("accordion surface: playground includes accordion markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('data-accordion-root'));
  assert.ok(html.includes('class="accordion-item" data-open="true"'));
  assert.ok(html.includes('class="accordion-trigger"'));
  assert.ok(html.includes('class="accordion-panel"'));
});

test("accordion surface: playground js includes accordion toggle wiring", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-accordion-trigger"));
  assert.ok(js.includes(".accordion-item"));
  assert.ok(js.includes("data-open"));
});
