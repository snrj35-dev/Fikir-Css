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

test("section-block surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".section-block {", ".section-header {", ".section-body {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing section-block selector: ${marker}`);
  }
});

test("section-block surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".section-container", ".section-panel", ".app-section"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden section-block alias leaked: ${className}`);
  }
});

test("section-block surface: playground includes section-block markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('24) Section Block Surface'));
  assert.ok(html.includes('class="section-block"'));
  assert.ok(html.includes('class="section-header"'));
  assert.ok(html.includes('class="section-body"'));
});
