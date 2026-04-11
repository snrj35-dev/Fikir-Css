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

test("tag-chip surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".tag-chip {", ".tag-chip-label {", ".tag-chip-remove {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing tag-chip selector: ${marker}`);
  }
});

test("tag-chip surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".tag-filter", ".chip-item", ".filter-chip", ".pill-chip"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden tag-chip alias leaked: ${className}`);
  }
});

test("tag-chip surface: playground includes tag-chip markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("27.1) Avatar Group + Tag Chip Surface"));
  assert.ok(html.includes('class="tag-chip"'));
  assert.ok(html.includes('class="tag-chip-label"'));
  assert.ok(html.includes('class="tag-chip-remove" type="button"'));
});
