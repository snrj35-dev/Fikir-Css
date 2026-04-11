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

test("layout primitives refinement: expected selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".container {",
    ".stack {",
    ".stack[data-stack-split-after] {",
    ".cluster {",
    '.cluster[data-cluster-justify="between"] {',
    '.cluster[data-cluster-nowrap="true"] {',
    ".center {",
    '.center[data-center-intrinsic="true"] {',
    ".sidebar {",
    '.sidebar[data-sidebar-side="end"] {',
    ".switcher {",
    '.switcher[data-switcher-fixed="true"] > * {',
    ".grid {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing layout refinement selector: ${marker}`);
  }
});

test("layout primitives refinement: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".container-wrap", ".layout-grid", ".stack-layout", ".cluster-row", ".split-sidebar"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden layout alias leaked: ${className}`);
  }
});

test("layout primitives refinement: playground includes refined layout examples", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("`container` + `center` + `grid` composition"));
  assert.ok(html.includes('class="container"'));
  assert.ok(html.includes('class="center" style="--center-max: 48rem"'));
  assert.ok(html.includes('class="grid" style="--grid-min: 11rem; --grid-gap: var(--space-2)"'));
  assert.ok(html.includes('class="switcher" data-switcher-fixed="true"'));
});
