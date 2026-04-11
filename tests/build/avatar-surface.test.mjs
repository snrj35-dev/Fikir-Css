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

test("avatar surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [
    ".avatar {",
    ".avatar-image {",
    ".avatar-fallback {",
    ".avatar-sm {",
    ".avatar-md {",
    ".avatar-lg {"
  ];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing avatar selector: ${marker}`);
  }
});

test("avatar surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".profile-avatar", ".user-avatar", ".avatar-placeholder", ".avatar-xs"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden avatar alias leaked: ${className}`);
  }
});

test("avatar surface: playground includes avatar markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("27) Avatar + Stat Surface"));
  assert.ok(html.includes('class="avatar avatar-sm" aria-label="Ada Lovelace avatar"'));
  assert.ok(html.includes('class="avatar-image"'));
  assert.ok(html.includes('class="avatar avatar-md" aria-label="Linus Torvalds avatar fallback"'));
  assert.ok(html.includes('class="avatar-fallback"'));
});
