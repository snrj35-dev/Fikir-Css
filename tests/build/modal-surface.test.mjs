import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);
const playgroundIndexPath = resolve(rootDir, "playground/index.html");
const playgroundJsPath = resolve(rootDir, "playground/demo.js");

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("modal surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".modal {",
    ".modal[data-open=\"true\"] {",
    ".modal-backdrop {",
    ".modal-dialog {",
    ".modal-header {",
    ".modal-body {",
    ".modal-footer {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing modal selector: ${marker}`);
  }
});

test("modal surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".modal-open", ".modal-closed", ".modal-panel", ".overlay-dialog"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden modal alias leaked: ${className}`);
  }
});

test("modal surface: playground includes dialog semantics", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="modal"'));
  assert.ok(html.includes('class="modal-dialog" role="dialog"'));
  assert.ok(html.includes('aria-modal="true"'));
  assert.ok(html.includes('data-modal-open="demo-modal"'));
  assert.ok(html.includes('data-modal-close="demo-modal"'));
});

test("modal surface: playground js includes open/close wiring and escape handling", async () => {
  const js = await readFile(playgroundJsPath, "utf8");

  assert.ok(js.includes("data-modal-open"));
  assert.ok(js.includes("data-modal-close"));
  assert.ok(js.includes('event.key !== "Escape"'));
});
