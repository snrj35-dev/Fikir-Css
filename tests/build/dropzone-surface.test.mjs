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

test("dropzone surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".dropzone {",
    ".dropzone-input {",
    ".dropzone-hint {",
    ".dropzone-meta {",
    ".dropzone-actions {",
    '.dropzone[data-drag-over="true"] {',
    '.dropzone[data-disabled="true"] {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing dropzone selector: ${marker}`);
  }
});

test("dropzone surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".drop-zone",
    ".upload-dropzone",
    ".droparea",
    ".dropzone-open",
    ".dropzone-disabled"
  ];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden dropzone alias leaked: ${className}`);
  }
});

test("dropzone surface: playground includes semantic markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("38) Dropzone Surface"));
  assert.ok(html.includes('data-pattern="dropzone"'));
  assert.ok(html.includes('class="dropzone" data-drag-over="true"'));
  assert.ok(html.includes('class="dropzone-input" type="file" multiple'));
  assert.ok(html.includes('class="dropzone-hint"'));
  assert.ok(html.includes('class="dropzone-meta"'));
  assert.ok(html.includes('class="dropzone-actions"'));
});
