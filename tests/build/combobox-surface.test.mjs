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

test("combobox surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".combobox {", ".combobox-input {", ".combobox-list {", ".combobox-option {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing combobox selector: ${marker}`);
  }
});

test("combobox surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = ["combo-box", "combo-select", "combobox-field", "combobox-item"];

  for (const className of forbidden) {
    const selectorPattern = new RegExp(`\\.${className}(?![-_a-zA-Z0-9])`);
    assert.equal(selectorPattern.test(distCss), false, `Forbidden combobox alias leaked: .${className}`);
  }
});

test("combobox surface: playground includes combobox markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("30) Combobox + Search Box Surface"));
  assert.ok(html.includes('class="combobox"'));
  assert.ok(html.includes('class="combobox-input"'));
  assert.ok(html.includes('class="combobox-list"'));
  assert.ok(html.includes('class="combobox-option"'));
});
