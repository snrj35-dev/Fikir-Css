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

test("textarea surface: canonical selector exists", async () => {
  const distCss = await readDistCss();
  assert.ok(distCss.includes(".textarea {"), "Missing canonical .textarea selector");
});

test("textarea surface: invalid/readonly/disabled selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.textarea[aria-invalid="true"] {'));
  assert.ok(distCss.includes(".textarea[readonly]:not([disabled]) {"));
  assert.ok(distCss.includes(".textarea[disabled] {"));
});

test("textarea surface: invalid focus selector exists", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.textarea[aria-invalid="true"]:focus-visible {'));
});

test("textarea surface: no alias class leakage", async () => {
  const distCss = await readDistCss();
  const forbidden = [".text-area", ".textarea-disabled", ".textarea-invalid", ".textarea-readonly"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden textarea alias leaked: ${className}`);
  }
});

test("textarea surface: playground includes textarea showcase", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("<textarea"));
  assert.ok(html.includes('class="textarea"'));
});
