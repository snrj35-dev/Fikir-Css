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

test("description-list surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".description-list {", ".description-term {", ".description-details {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing description-list selector: ${marker}`);
  }
});

test("description-list surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = ["desc-list", "dl-list", "kv-list", "description-key", "description-value"];

  for (const className of forbidden) {
    const selectorPattern = new RegExp(`\\.${className}(?![-_a-zA-Z0-9])`);
    assert.equal(
      selectorPattern.test(distCss),
      false,
      `Forbidden description-list alias leaked: .${className}`
    );
  }
});

test("description-list surface: playground includes description-list markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="description-list"'));
  assert.ok(html.includes('class="description-term"'));
  assert.ok(html.includes('class="description-details"'));
});
