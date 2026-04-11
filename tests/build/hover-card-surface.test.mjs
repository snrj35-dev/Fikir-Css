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

test("hover-card surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".hover-card {",
    ".hover-card-content {",
    '.hover-card[data-open="true"] .hover-card-content {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing hover-card selector: ${marker}`);
  }
});

test("hover-card surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".hovercard",
    ".hover-panel",
    ".profile-hover-card",
    ".hover-card-open",
    ".hover-card-closed"
  ];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden hover-card alias leaked: ${className}`);
  }
});

test("hover-card surface: playground includes semantic markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("40) Hover Card Surface"));
  assert.ok(html.includes('data-pattern="hover-card"'));
  assert.ok(html.includes('class="hover-card" data-open="true"'));
  assert.ok(html.includes('class="hover-card-content" role="note"'));
});
