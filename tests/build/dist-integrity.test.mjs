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

test("placeholder-free dist: generated CSS has no unresolved selector placeholders", async () => {
  const distCss = await readDistCss();
  assert.equal(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/.test(distCss), false);
});

test("layer prelude and layer blocks are present in dist", async () => {
  const distCss = await readDistCss();
  const expectedPrelude = `@layer ${config.layers.join(", ")};`;

  assert.ok(distCss.includes(expectedPrelude), "Missing layer prelude");

  const preludeIndex = distCss.indexOf(expectedPrelude);

  for (const layerName of config.layers) {
    const marker = `@layer ${layerName} {`;
    const markerIndex = distCss.indexOf(marker);

    assert.ok(markerIndex !== -1, `Missing layer block: ${marker}`);
    assert.ok(markerIndex > preludeIndex, `Layer block appears before prelude: ${marker}`);
  }
});
