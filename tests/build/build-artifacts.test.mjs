import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());

const requiredArtifacts = [
  config.build.cssOutFile,
  "packages/recipes/index.css",
  "packages/recipes/generated/resolvers.ts",
  "dist/contracts/selectors.json",
  "dist/contracts/alias-migration.json",
  config.build.sizeReportOutFile
];

test("build success: required generated artifacts exist and are non-empty", async () => {
  for (const relativePath of requiredArtifacts) {
    const absolutePath = resolve(rootDir, relativePath);

    await access(absolutePath, constants.F_OK);
    const content = await readFile(absolutePath, "utf8");

    assert.ok(content.length > 0, `Generated artifact is empty: ${relativePath}`);
  }
});
