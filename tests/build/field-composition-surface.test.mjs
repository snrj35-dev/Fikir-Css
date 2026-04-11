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

test("field composition: canonical selectors exist in dist", async () => {
  const distCss = await readDistCss();
  const expected = [".field {", ".label {", ".helper-text {", ".error-text {"];

  for (const marker of expected) {
    assert.ok(distCss.includes(marker), `Missing field composition selector in dist: ${marker}`);
  }
});

test("field composition: forbidden alias selectors do not exist", async () => {
  const distCss = await readDistCss();
  const forbidden = [".form-field", ".field-label", ".field-helper", ".field-error"];

  for (const marker of forbidden) {
    assert.equal(distCss.includes(marker), false, `Forbidden alias selector leaked: ${marker}`);
  }
});

test("field composition: playground uses accessible field wiring", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="field demo-field"'));
  assert.ok(html.includes('class="label" for="demo-email-invalid"'));
  assert.ok(html.includes('class="error-text"'));
  assert.ok(html.includes('aria-describedby="demo-email-invalid-error"'));
  assert.ok(html.includes('aria-invalid="true"'));
});
