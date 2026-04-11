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

test("core foundation extensions: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const expected = [
    ".icon-button {",
    ".icon-button-sm {",
    ".icon-button-md {",
    ".icon-button-lg {",
    ".link {",
    ".link-muted {",
    ".link-danger {",
    ".divider {",
    '.divider[data-orientation="vertical"] {',
    ".surface {",
    ".surface-raised {",
    ".surface-sunken {",
    ".visually-hidden {",
    ".skeleton {",
    ".skeleton-text {",
    ".skeleton-block {",
    ".skeleton-circle {",
    ".spinner {",
    ".spinner-sm {",
    ".spinner-md {",
    ".spinner-lg {",
    ".badge-neutral {",
    ".badge-primary {",
    ".badge-danger {",
    ".alert-title {",
    ".alert-description {"
  ];

  for (const marker of expected) {
    assert.ok(distCss.includes(marker), `Missing core extension selector: ${marker}`);
  }
});

test("core foundation extensions: forbidden alias selectors do not exist", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".icon-btn",
    ".icon-only-button",
    ".anchor-link",
    ".text-link",
    ".separator-line",
    ".panel",
    ".sr-only",
    ".loading-skeleton",
    ".spinner-icon",
    ".alert-body",
    ".badge-default"
  ];

  for (const marker of forbidden) {
    assert.equal(distCss.includes(marker), false, `Forbidden alias selector leaked: ${marker}`);
  }
});

test("core foundation extensions: playground includes semantic markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("<h3>Core Extensions</h3>"));
  assert.ok(html.includes('class="icon-button icon-button-sm"'));
  assert.ok(html.includes('class="icon-button icon-button-md"'));
  assert.ok(html.includes('class="link link-muted"'));
  assert.ok(html.includes('class="link link-danger"'));
  assert.ok(html.includes('class="divider"'));
  assert.ok(html.includes('class="surface surface-raised stack"'));
  assert.ok(html.includes('class="visually-hidden"'));
  assert.ok(html.includes('class="skeleton skeleton-text"'));
  assert.ok(html.includes('class="skeleton skeleton-block"'));
  assert.ok(html.includes('class="spinner spinner-lg"'));
  assert.ok(html.includes('class="badge badge-primary"'));
  assert.ok(html.includes('class="alert-title"'));
  assert.ok(html.includes('class="alert-description"'));
});
