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

test("split-pane surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".split-pane {",
    '.split-pane[data-split-pane-side="end"] {',
    ".split-pane-primary,",
    ".split-pane-secondary {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing split-pane selector: ${marker}`);
  }
});

test("split-pane surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".split-layout", ".pane-left", ".pane-right", ".resizable-pane"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden split-pane alias leaked: ${className}`);
  }
});

test("split-pane surface: playground includes split-pane markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("25.1) Split Pane Surface"));
  assert.ok(html.includes('class="split-pane" data-split-pane-side="end"'));
  assert.ok(html.includes('class="split-pane-primary"'));
  assert.ok(html.includes('class="split-pane-secondary"'));
});
