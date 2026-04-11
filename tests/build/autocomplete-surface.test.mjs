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

test("autocomplete surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".autocomplete {", ".autocomplete-input {", ".autocomplete-list {", ".autocomplete-option {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing autocomplete selector: ${marker}`);
  }
});

test("autocomplete surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = ["auto-complete", "typeahead", "suggestion-list", "autocomplete-item"];

  for (const className of forbidden) {
    const selectorPattern = new RegExp(`\\.${className}(?![-_a-zA-Z0-9])`);
    assert.equal(selectorPattern.test(distCss), false, `Forbidden autocomplete alias leaked: .${className}`);
  }
});

test("autocomplete surface: playground includes autocomplete markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("31) Autocomplete + Command Palette Surface"));
  assert.ok(html.includes('class="autocomplete"'));
  assert.ok(html.includes('class="autocomplete-input"'));
  assert.ok(html.includes('class="autocomplete-list"'));
  assert.ok(html.includes('class="autocomplete-option"'));
});
