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

test("input-group surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes(".input-group {"), "Missing .input-group selector");
  assert.ok(distCss.includes(".input-group-addon {"), "Missing .input-group-addon selector");
});

test("input-group surface: composition selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes(".input-group > * + * {"));
  assert.ok(distCss.includes('.input-group[data-input-group-invalid="true"] .input-group-addon {'));
  assert.ok(distCss.includes(".input-group > :not(:first-child):not(:last-child) {"));
});

test("input-group surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".input-prefix", ".input-suffix", ".field-group", ".input-group-invalid"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden input-group alias leaked: ${className}`);
  }
});

test("input-group surface: playground includes input-group showcase", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="input-group"'));
  assert.ok(html.includes('class="input-group-addon"'));
});
