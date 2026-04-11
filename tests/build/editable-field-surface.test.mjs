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

test("editable-field surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".editable-field {",
    ".editable-field-display {",
    ".editable-field-editor {",
    ".editable-field-actions {",
    '.editable-field[data-editing="true"] .editable-field-display {',
    '.editable-field[data-editing="true"] .editable-field-editor {',
    '.editable-field[data-disabled="true"] {'
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing editable-field selector: ${marker}`);
  }
});

test("editable-field surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".inline-editor",
    ".editable-input",
    ".field-editor",
    ".edit-field",
    ".editable-field-editing",
    ".editable-field-disabled"
  ];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden editable-field alias leaked: ${className}`);
  }
});

test("editable-field surface: playground includes semantic markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("39) Editable Field Surface"));
  assert.ok(html.includes('data-pattern="editable-field"'));
  assert.ok(html.includes('class="editable-field" data-editing="false"'));
  assert.ok(html.includes('class="editable-field-display'));
  assert.ok(html.includes('class="editable-field-editor"'));
  assert.ok(html.includes('class="editable-field-actions"'));
});
