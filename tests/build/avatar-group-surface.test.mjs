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

test("avatar-group surface: canonical selectors exist", async () => {
  const distCss = await readDistCss();
  const markers = [".avatar-group {", ".avatar-group-item {", ".avatar-group-item > .avatar {"];

  for (const marker of markers) {
    assert.ok(distCss.includes(marker), `Missing avatar-group selector: ${marker}`);
  }
});

test("avatar-group surface: alias leakage is blocked", async () => {
  const distCss = await readDistCss();
  const forbidden = [".avatar-stack", ".group-avatar", ".avatar-list", ".avatar-overlap"];

  for (const className of forbidden) {
    assert.equal(distCss.includes(className), false, `Forbidden avatar-group alias leaked: ${className}`);
  }
});

test("avatar-group surface: playground includes avatar-group markup", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("27.1) Avatar Group + Tag Chip Surface"));
  assert.ok(html.includes('class="avatar-group" aria-label="Project members"'));
  assert.ok(html.includes('class="avatar-group-item"'));
});
