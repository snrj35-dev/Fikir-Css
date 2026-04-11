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

test("date-picker surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".date-picker {",
    ".date-picker-input {",
    ".date-picker-trigger {",
    ".date-picker-panel {",
    '.date-picker[data-open="true"] .date-picker-panel {',
    ".date-picker-grid {",
    ".date-picker-day {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing date-picker selector: ${marker}`);
  }
});

test("date-picker surface: state selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.date-picker-day[data-selected="true"] {'));
  assert.ok(distCss.includes('.date-picker-day[data-today="true"] {'));
  assert.ok(distCss.includes('.date-picker-day[data-outside="true"] {'));
  assert.ok(distCss.includes(".date-picker-day[disabled] {"));
});

test("date-picker surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".datepicker", ".date-input", ".calendar-picker", ".date-picker-open", ".date-picker-selected"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden date-picker alias leaked: ${className}`);
  }
});

test("date-picker surface: playground includes semantic date-picker markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("34) Date Picker Surface"));
  assert.ok(html.includes('data-pattern="date-picker"'));
  assert.ok(html.includes('class="date-picker" data-open="true"'));
  assert.ok(html.includes('class="date-picker-input"'));
  assert.ok(html.includes('class="date-picker-trigger"'));
  assert.ok(html.includes('class="date-picker-panel" role="dialog"'));
  assert.ok(html.includes('class="date-picker-day"'));
});
