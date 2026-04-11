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

test("date-range-picker surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".date-range-picker {",
    ".date-range-picker-start,",
    ".date-range-picker-end {",
    ".date-range-picker-separator {",
    ".date-range-picker-trigger {",
    ".date-range-picker-panel {",
    '.date-range-picker[data-open="true"] .date-range-picker-panel {',
    ".date-range-picker-grid {",
    ".date-range-picker-day {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing date-range-picker selector: ${marker}`);
  }
});

test("date-range-picker surface: range state selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.date-range-picker-day[data-in-range="true"] {'));
  assert.ok(distCss.includes('.date-range-picker-day[data-range-start="true"]'));
  assert.ok(distCss.includes('.date-range-picker-day[data-range-end="true"]'));
  assert.ok(distCss.includes('.date-range-picker-day[data-outside="true"] {'));
  assert.ok(distCss.includes(".date-range-picker-day[disabled] {"));
});

test("date-range-picker surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".daterange-picker",
    ".date-range",
    ".range-calendar",
    ".date-range-picker-open",
    ".date-range-picker-in-range"
  ];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden date-range-picker alias leaked: ${className}`);
  }
});

test("date-range-picker surface: playground includes semantic date-range-picker markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("35) Date Range Picker Surface"));
  assert.ok(html.includes('data-pattern="date-range-picker"'));
  assert.ok(html.includes('class="date-range-picker" data-open="true"'));
  assert.ok(html.includes('class="date-range-picker-start"'));
  assert.ok(html.includes('class="date-range-picker-end"'));
  assert.ok(html.includes('class="date-range-picker-panel" role="dialog"'));
  assert.ok(html.includes('class="date-range-picker-day"'));
});
