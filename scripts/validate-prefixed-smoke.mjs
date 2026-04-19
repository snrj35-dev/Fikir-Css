import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";

import config from "../fikir.config.mjs";
import { namingContract } from "../contracts/naming.contract.mjs";

const execFileAsync = promisify(execFile);
const rootDir = resolve(process.cwd());
const selectorsManifestPath = resolve(rootDir, "dist/contracts/selectors.json");

function ensureTrailingDash(value) {
  if (!value) return "";
  return value.endsWith("-") ? value : `${value}-`;
}

async function runBuild(extraEnv = {}) {
  await execFileAsync("node", ["scripts/build-css.mjs"], {
    cwd: rootDir,
    env: {
      ...process.env,
      ...extraEnv
    }
  });
}

async function main() {
  const utilityPrefix = ensureTrailingDash(config.naming.utilityPrefix);
  const componentPrefix = ensureTrailingDash(config.naming.componentPrefix);

  try {
    await runBuild({ FIKIR_NAMING_MODE: "prefixed" });

    const selectorsManifest = JSON.parse(await readFile(selectorsManifestPath, "utf8"));
    const selectorMap = selectorsManifest.selectors;

    assert.equal(selectorsManifest.naming.mode, "prefixed");

    for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
      if (descriptor.domain === "pattern") continue; // data-pattern compounds are never prefixed — intentional

      const actualClass = selectorMap[key];
      assert.equal(typeof actualClass, "string", `Missing selector in prefixed smoke: ${key}`);

      if (descriptor.domain === "utility") {
        assert.ok(
          actualClass.startsWith(utilityPrefix),
          `Utility selector is not prefixed: ${key} -> ${actualClass}`
        );
      }

      if (descriptor.domain === "component") {
        assert.ok(
          actualClass.startsWith(componentPrefix),
          `Component selector is not prefixed: ${key} -> ${actualClass}`
        );
      }

      assert.notEqual(
        actualClass,
        descriptor.base,
        `Selector leaked plain-mode class in prefixed build: ${key} -> ${actualClass}`
      );
    }

    console.log("prefixed naming-mode smoke passed");
  } finally {
    await runBuild();
    // Restore the full selectors.json (schema_version, data_markers, etc.) written by generate-manifests,
    // which build-css.mjs overwrites with its minimal class-map format.
    await execFileAsync("node", ["scripts/generate-manifests.mjs"], { cwd: rootDir, env: process.env });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
