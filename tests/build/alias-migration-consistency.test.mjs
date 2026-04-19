import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";
import { namingContract } from "../../contracts/naming.contract.mjs";

const rootDir = resolve(process.cwd());
const selectorsManifestPath = resolve(rootDir, "dist/contracts/selectors.json");
const aliasMigrationPath = resolve(rootDir, "dist/contracts/alias-migration.json");

function ensureTrailingDash(value) {
  if (!value) return "";
  return value.endsWith("-") ? value : `${value}-`;
}

async function readJson(path) {
  const content = await readFile(path, "utf8");
  return JSON.parse(content);
}

test("alias migration consistency: mode and entry count match current naming contract", async () => {
  const selectorsManifest = await readJson(selectorsManifestPath);
  const aliasManifest = await readJson(aliasMigrationPath);

  assert.equal(aliasManifest.mode, config.naming.mode);

  const nonPatternCount = Object.values(namingContract.selectors)
    .filter((d) => d.domain !== "pattern").length;
  assert.equal(Object.keys(aliasManifest.migration).length, nonPatternCount);

  const selectorKeys = Object.keys(selectorsManifest.selectors).sort();
  const contractKeys = Object.keys(namingContract.selectors).sort();

  assert.deepEqual(selectorKeys, contractKeys);
});

test("alias migration consistency: each alias points to active selector surface", async () => {
  const selectorsManifest = await readJson(selectorsManifestPath);
  const aliasManifest = await readJson(aliasMigrationPath);

  const utilityPrefix = ensureTrailingDash(config.naming.utilityPrefix ?? namingContract.defaults.utilityPrefix);
  const componentPrefix = ensureTrailingDash(config.naming.componentPrefix ?? namingContract.defaults.componentPrefix);

  for (const [selectorKey, descriptor] of Object.entries(namingContract.selectors)) {
    if (descriptor.domain === "pattern") continue; // data-pattern compounds have no CSS class alias
    const prefix = descriptor.domain === "utility" ? utilityPrefix : componentPrefix;
    const aliasKey = `${prefix}${descriptor.base}`;
    const expectedValue = selectorsManifest.selectors[selectorKey];

    assert.equal(
      aliasManifest.migration[aliasKey],
      expectedValue,
      `Alias mismatch for ${selectorKey} (${aliasKey})`
    );
  }
});
