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

test("core refinement: button disabled state is present", async () => {
  const distCss = await readDistCss();

  assert.match(distCss, /\.btn:disabled\s*\{[^}]*cursor:\s*not-allowed;[^}]*\}/m);
  assert.match(distCss, /\.btn:disabled\s*\{[^}]*opacity:\s*0\.65;[^}]*\}/m);
});

test("core refinement: card composition selectors are present", async () => {
  const distCss = await readDistCss();

  assert.ok(
    distCss.includes('.card[data-card-layout="stack"] > * + * {'),
    "Missing stack composition selector for card"
  );
  assert.ok(
    distCss.includes('.card > [data-card-slot="footer"] {'),
    "Missing footer slot selector for card"
  );
});

test("core refinement: no slot alias classes leaked", async () => {
  const distCss = await readDistCss();

  assert.equal(distCss.includes(".card-header"), false);
  assert.equal(distCss.includes(".card-body"), false);
  assert.equal(distCss.includes(".card-footer"), false);
});
