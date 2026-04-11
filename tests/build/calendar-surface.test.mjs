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

test("calendar surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".calendar {",
    ".calendar-header {",
    ".calendar-title {",
    ".calendar-nav {",
    ".calendar-grid {",
    ".calendar-weekday {",
    ".calendar-day {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing calendar selector: ${marker}`);
  }
});

test("calendar surface: state selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.calendar-day[data-today="true"] {'));
  assert.ok(distCss.includes('.calendar-day[data-selected="true"] {'));
  assert.ok(distCss.includes('.calendar-day[data-outside="true"] {'));
  assert.ok(distCss.includes(".calendar-day[disabled] {"));
});

test("calendar surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".calendar-picker", ".month-grid", ".calendar-open", ".calendar-cell", ".calendar-selected"];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden calendar alias leaked: ${className}`);
  }
});

test("calendar surface: playground includes semantic calendar markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("36) Calendar Surface"));
  assert.ok(html.includes('data-pattern="calendar"'));
  assert.ok(html.includes('class="calendar" aria-label="April 2026 calendar"'));
  assert.ok(html.includes('class="calendar-header"'));
  assert.ok(html.includes('class="calendar-grid" role="grid"'));
  assert.ok(html.includes('class="calendar-day"'));
});
