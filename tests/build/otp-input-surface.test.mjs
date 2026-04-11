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

test("otp-input surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".otp-input {", ".otp-input-group {", ".otp-input-slot {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing otp-input selector: ${marker}`);
  }
});

test("otp-input surface: state selectors exist", async () => {
  const distCss = await readDistCss();

  assert.ok(distCss.includes('.otp-input-slot[aria-invalid="true"] {'));
  assert.ok(distCss.includes(".otp-input-slot[disabled] {"));
});

test("otp-input surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".pin-input", ".otp-group", ".otp-slot", ".verification-input"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden otp-input alias leaked: ${className}`);
  }
});

test("otp-input surface: playground includes otp-input markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="otp-input"'));
  assert.ok(html.includes('class="otp-input-group"'));
  assert.ok(html.includes('class="otp-input-slot"'));
});
