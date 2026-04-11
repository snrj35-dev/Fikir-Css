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

test("tags-input surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".tags-input {", ".tags-input-field {", ".tags-input-list {", ".tags-input-item {", ".tags-input-remove {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing tags-input selector: ${marker}`);
  }
});

test("tags-input surface: state selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.tags-input[data-tags-invalid="true"] {'));
  assert.ok(distCss.includes('.tags-input[data-tags-disabled="true"] {'));
});

test("tags-input surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".chips-input", ".multi-tag-input", ".tokenizer", ".tags-input-invalid"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden tags-input alias leaked: ${className}`);
  }
});

test("tags-input surface: playground includes tags-input markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("46) Tags Input Surface"));
  assert.ok(html.includes('class="tags-input"'));
  assert.ok(html.includes('class="tags-input-field"'));
  assert.ok(html.includes('class="tags-input-remove" type="button"'));
});
