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

test("select surface: canonical selector exists", async () => {
  const distCss = await readDistCss();
  assert.ok(distCss.includes(".select {"), "Missing canonical .select selector");
});

test("select surface: invalid/disabled selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.select[aria-invalid="true"] {'));
  assert.ok(distCss.includes(".select[disabled] {"));
});

test("select surface: size selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes(".select-sm {"));
  assert.ok(distCss.includes(".select-md {"));
  assert.ok(distCss.includes(".select-lg {"));
});

test("select surface: no alias class leakage", async () => {
  const distCss = await readDistCss();
  const forbidden = [".dropdown", ".select-input", ".select-disabled", ".select-invalid"];

  for (const className of forbidden) {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactSelectorPattern = new RegExp(`(^|\\s)${escaped}(\\s*\\{|\\s*\\[|\\s*\\.|\\s*\\:|\\s*\\,|\\s*$)`, "m");
    assert.equal(exactSelectorPattern.test(distCss), false, `Forbidden select alias leaked: ${className}`);
  }
});

test("select surface: playground includes select showcase", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("<select"));
  assert.ok(html.includes('class="select"'));
});
