import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const tokensPath = resolve(rootDir, "dist/tokens.json");
const highContrastThemePath = resolve(rootDir, "dist/themes/high-contrast.css");

const tokenKeys = [
  "colorNeutral",
  "colorPrimary",
  "colorSuccess",
  "colorWarning",
  "colorDanger",
  "colorInfo",
  "colorNeutralSubtle",
  "colorPrimarySubtle",
  "colorSuccessSubtle",
  "colorWarningSubtle",
  "colorDangerSubtle",
  "colorInfoSubtle"
];

test("semantic tone contract: exported tokens include the official tone matrix", async () => {
  const tokens = JSON.parse(await readFile(tokensPath, "utf8"));

  for (const key of tokenKeys) {
    assert.ok(tokens.color?.[key], `dist/tokens.json is missing color.${key}`);
  }
});

test("semantic tone contract: distributed high-contrast theme ships all tone overrides", async () => {
  const css = await readFile(highContrastThemePath, "utf8");

  for (const token of ["neutral", "primary", "success", "warning", "danger", "info"]) {
    assert.ok(css.includes(`--color-${token}:`), `dist high-contrast theme is missing --color-${token}`);
    assert.ok(
      css.includes(`--color-${token}-subtle:`),
      `dist high-contrast theme is missing --color-${token}-subtle`
    );
  }
});
