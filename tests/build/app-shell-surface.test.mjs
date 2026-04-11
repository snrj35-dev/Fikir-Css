import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);
const playgroundIndexPath = resolve(rootDir, "playground/index.html");
const appShellExamplePath = resolve(rootDir, "playground/app-shell-example.html");

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("app-shell surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".app-shell {",
    ".app-shell-topbar {",
    ".app-shell-content {",
    ".app-shell-sidebar {",
    ".app-shell-main {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing app-shell selector: ${marker}`);
  }
});

test("app-shell surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".app-layout", ".shell-layout", ".main-shell"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden app-shell alias leaked: ${className}`);
  }
});

test("app-shell surface: playground includes app-shell markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('25) App Shell Surface'));
  assert.ok(html.includes('class="app-shell"'));
  assert.ok(html.includes('class="app-shell-topbar"'));
  assert.ok(html.includes('class="app-shell-content"'));
  assert.ok(html.includes('class="app-shell-sidebar"'));
  assert.ok(html.includes('class="app-shell-main"'));
});

test("app-shell surface: standalone example page exists and uses canonical classes", async () => {
  const html = await readFile(appShellExamplePath, "utf8");

  assert.ok(html.includes('class="app-shell"'));
  assert.ok(html.includes('class="page-header"'));
  assert.ok(html.includes('class="section-block"'));
  assert.ok(html.includes('class="sidebar-nav"'));
});
