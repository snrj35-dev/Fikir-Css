import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const distCssPath = resolve(process.cwd(), config.build.cssOutFile);

async function readDistCss() {
  return readFile(distCssPath, "utf8");
}

test("segmented-control: canonical selectors exist in dist", async () => {
  const css = await readDistCss();
  for (const sel of [
    ".segmented-control {",
    ".segmented-control-item {",
    ".segmented-control-input {",
    ".segmented-control-label {",
  ]) {
    assert.ok(css.includes(sel), `Missing selector: ${sel}`);
  }
});

test("segmented-control: checked state selector exists", async () => {
  const css = await readDistCss();
  assert.ok(
    css.includes(".segmented-control-input:checked + .segmented-control-label {"),
    "Missing checked state selector"
  );
});

test("segmented-control: size variant selectors exist", async () => {
  const css = await readDistCss();
  assert.ok(css.includes(".segmented-control-sm"), "Missing sm variant");
  assert.ok(css.includes(".segmented-control-lg"), "Missing lg variant");
});

test("segmented-control: disabled state selector exists", async () => {
  const css = await readDistCss();
  assert.ok(
    css.includes(".segmented-control-input:disabled + .segmented-control-label {"),
    "Missing disabled state selector"
  );
});

test("segmented-control: forbidden alias classes are absent", async () => {
  const css = await readDistCss();
  for (const forbidden of [".segmented-group", ".toggle-group", ".btn-group-segmented"]) {
    assert.equal(css.includes(forbidden), false, `Forbidden alias leaked: ${forbidden}`);
  }
});
