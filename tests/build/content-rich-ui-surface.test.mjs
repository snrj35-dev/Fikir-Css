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

test("content rich-ui surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".text {",
    ".heading {",
    ".code {",
    ".code-block {",
    ".callout {",
    ".callout-title {",
    ".callout-body {",
    ".quote {",
    ".kbd {",
    ".markdown-surface {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing content selector: ${marker}`);
  }
});

test("content rich-ui surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".body-text",
    ".section-title",
    ".inline-code",
    ".snippet-block",
    ".info-box",
    ".quote-panel",
    ".shortcut-key",
    ".markdown-body"
  ];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden content alias leaked: ${className}`);
  }
});

test("content rich-ui surface: playground includes content showcase", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("41) Content / Rich UI Surface"));
  assert.ok(html.includes('class="heading"'));
  assert.ok(html.includes('class="text"'));
  assert.ok(html.includes('class="code"'));
  assert.ok(html.includes('class="code-block"'));
  assert.ok(html.includes('class="callout"'));
  assert.ok(html.includes('class="quote"'));
  assert.ok(html.includes('class="kbd"'));
  assert.ok(html.includes('class="markdown-surface"'));
});
