import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("input validation surface: invalid selector exists in component layer", async () => {
  const distCss = await readDistCss();

  assert.match(
    distCss,
    /\.input\[aria-invalid="true"\]\s*\{[^}]*border-color:\s*var\(--color-danger\);/m
  );
  assert.match(
    distCss,
    /\.input\[aria-invalid="true"\]:focus-visible\s*\{[^}]*border-color:\s*var\(--color-danger\);/m
  );
});

test("input validation surface: readonly and disabled selectors stay distinct", async () => {
  const distCss = await readDistCss();

  assert.match(
    distCss,
    /\.input\[readonly\]:not\(\[disabled\]\)\s*\{[^}]*cursor:\s*text;[^}]*\}/m
  );
  assert.match(distCss, /\.input\[disabled\]\s*\{[^}]*cursor:\s*not-allowed;[^}]*\}/m);
  assert.match(distCss, /\.input\[disabled\]\s*\{[^}]*opacity:\s*0\.7;[^}]*\}/m);
});

test("input validation surface: aria-invalid ring utility still requires attribute and class together", async () => {
  const distCss = await readDistCss();

  assert.ok(
    distCss.includes('[aria-invalid="true"].aria-invalid\\:ring-danger {'),
    "Expected attribute+class combined selector for aria-invalid ring utility"
  );
});

test("input validation surface: forbidden class aliases are absent", async () => {
  const distCss = await readDistCss();

  assert.equal(distCss.includes(".input-disabled"), false);
  assert.equal(distCss.includes(".input-readonly"), false);
  assert.equal(distCss.includes(".input-invalid"), false);
});
