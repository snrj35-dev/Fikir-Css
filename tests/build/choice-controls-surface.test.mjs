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

test("choice controls: canonical selectors exist", async () => {
  const distCss = await readDistCss();

  for (const marker of [".checkbox {", ".radio {", ".switch {"]) {
    assert.ok(distCss.includes(marker), `Missing choice control selector: ${marker}`);
  }
});

test("choice controls: disabled selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes(".checkbox[disabled] {"));
  assert.ok(distCss.includes(".radio[disabled] {"));
  assert.ok(distCss.includes(".switch[disabled] {"));
});

test("choice controls: checkbox invalid selector exists", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.checkbox[aria-invalid="true"] {'));
});

test("choice controls: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".check-input",
    ".choice-radio",
    ".toggle-switch",
    ".checkbox-disabled",
    ".radio-disabled",
    ".switch-disabled"
  ];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden alias leaked: ${className}`);
  }
});

test("choice controls: playground includes checkbox/radio/switch showcase", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="checkbox"'));
  assert.ok(html.includes('class="radio"'));
  assert.ok(html.includes('class="switch"'));
});
