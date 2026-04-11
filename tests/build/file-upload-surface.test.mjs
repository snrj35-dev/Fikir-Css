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

test("file-upload surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".file-upload {",
    ".file-upload-input {",
    ".file-upload-meta {",
    ".file-upload-actions {",
    '.file-upload[data-has-file="true"] {',
    ".file-upload-input[disabled] {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing file-upload selector: ${marker}`);
  }
});

test("file-upload surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".file-uploader",
    ".file-input",
    ".upload-field",
    ".upload-box",
    ".file-upload-disabled",
    ".file-upload-open"
  ];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden file-upload alias leaked: ${className}`);
  }
});

test("file-upload surface: playground includes semantic markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("37) File Upload Surface"));
  assert.ok(html.includes('data-pattern="file-upload"'));
  assert.ok(html.includes('class="file-upload" data-has-file="true"'));
  assert.ok(html.includes('class="file-upload-input"'));
  assert.ok(html.includes('type="file"'));
  assert.ok(html.includes('class="file-upload-meta"'));
  assert.ok(html.includes('class="file-upload-actions"'));
});
