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

test("command-palette surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".command-palette {",
    ".command-palette-dialog {",
    ".command-palette-input {",
    ".command-palette-list {",
    ".command-palette-item {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing command-palette selector: ${marker}`);
  }
});

test("command-palette surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = ["command-menu", "palette-dialog", "command-list", "command-item"];

  for (const className of forbidden) {
    const selectorPattern = new RegExp(`\\.${className}(?![-_a-zA-Z0-9])`);
    assert.equal(selectorPattern.test(distCss), false, `Forbidden command-palette alias leaked: .${className}`);
  }
});

test("command-palette surface: playground includes command palette markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="command-palette"'));
  assert.ok(html.includes('class="command-palette-dialog"'));
  assert.ok(html.includes('class="command-palette-input"'));
  assert.ok(html.includes('class="command-palette-list"'));
  assert.ok(html.includes('class="command-palette-item"'));
});
