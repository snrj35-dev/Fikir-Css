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

test("list surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".list {", ".list-item {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing list selector: ${marker}`);
  }
});

test("list surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = ["item-list", "data-list", "list-row", "list-entry"];

  for (const className of forbidden) {
    const selectorPattern = new RegExp(`\\.${className}(?![-_a-zA-Z0-9])`);
    assert.equal(selectorPattern.test(distCss), false, `Forbidden list alias leaked: .${className}`);
  }
});

test("list surface: playground includes list markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("29) List + Description List Surface"));
  assert.ok(html.includes('class="list" aria-label="Deployment checklist"'));
  assert.ok(html.includes('class="list-item"'));
});
