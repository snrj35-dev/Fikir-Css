import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);
const siteIndexPath = resolve(rootDir, "site/index.html");

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("style variant contract: dist ships the normalized selector matrix", async () => {
  const distCss = await readDistCss();
  const selectors = [
    ".btn-soft {",
    ".btn-ghost {",
    ".btn-plain {",
    ".badge-solid {",
    ".badge-soft {",
    ".badge-outline {",
    ".badge-plain {",
    ".card-flat {",
    ".card-subtle {",
    ".card-interactive {",
    ".surface-flat {",
    ".surface-subtle,",
    ".surface-elevated,",
    ".surface-interactive {",
    '.alert[data-style="outline"] {',
    '.result[data-style="soft"][data-result-tone="success"] {',
    '.toast[data-style="outline"] {'
  ];

  for (const selector of selectors) {
    assert.ok(distCss.includes(selector), `Missing style selector in dist: ${selector}`);
  }
});

test("style variant contract: forbidden synonym selectors are absent from dist", async () => {
  const distCss = await readDistCss();
  const forbidden = [
    ".btn-filled",
    ".btn-secondary",
    ".badge-filled",
    ".badge-ghost",
    ".card-raised",
    ".surface-hoverable",
    ".alert-soft",
    ".toast-soft"
  ];

  for (const selector of forbidden) {
    assert.equal(distCss.includes(selector), false, `Forbidden synonym leaked into dist: ${selector}`);
  }
});

test("style variant contract: gallery showcases the official style names", async () => {
  const html = await readFile(siteIndexPath, "utf8");

  assert.ok(html.includes('class="btn btn-soft btn-primary"'));
  assert.ok(html.includes('class="btn btn-ghost btn-primary"'));
  assert.ok(html.includes('class="badge badge-outline badge-primary"'));
  assert.ok(html.includes('class="card card-subtle"'));
  assert.ok(html.includes('class="surface surface-interactive"'));
  assert.ok(html.includes('data-style="outline"'));
});
