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

test("context-menu surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();

  for (const marker of [
    ".context-menu {",
    ".context-menu-content {",
    '.context-menu[data-open="true"] .context-menu-content {',
    ".context-menu-item {"
  ]) {
    assert.ok(distCss.includes(marker), `Missing context-menu selector: ${marker}`);
  }
});

test("context-menu surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".menu-context", ".right-click-menu", ".context-panel", ".context-item"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden context-menu alias leaked: ${className}`);
  }
});

test("context-menu surface: playground includes semantic context-menu markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('id="demo-context-menu" class="context-menu"'));
  assert.ok(html.includes('class="context-menu-content" role="menu"'));
  assert.ok(html.includes('class="context-menu-item" type="button" role="menuitem"'));
  assert.ok(html.includes('aria-controls="demo-context-menu-content"'));
});
