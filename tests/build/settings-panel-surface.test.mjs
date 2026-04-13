import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const distCssPath = resolve(process.cwd(), config.build.cssOutFile);

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("settings-panel: canonical selectors exist in dist", async () => {
  const css = await readDistCss();
  for (const sel of [
    ".settings-panel {",
    ".settings-panel-sidebar {",
    ".settings-panel-nav {",
    ".settings-panel-nav-item {",
    ".settings-panel-content {",
    ".settings-panel-section {",
    ".settings-panel-row {",
    ".settings-panel-row-label {",
    ".settings-panel-row-control {",
  ]) {
    assert.ok(css.includes(sel), `Missing selector: ${sel}`);
  }
});

test("settings-panel: active nav item state selector exists", async () => {
  const css = await readDistCss();
  assert.ok(
    css.includes('.settings-panel-nav-item[aria-current="page"]') ||
    css.includes('.settings-panel-nav-item[data-active="true"]'),
    "Missing active nav item state selector"
  );
});

test("settings-panel: section divider exists", async () => {
  const css = await readDistCss();
  assert.ok(
    css.includes(".settings-panel-section + .settings-panel-section {"),
    "Missing section separator rule"
  );
});
