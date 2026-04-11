import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const packageJsonPath = resolve(rootDir, "package.json");

async function exists(path) {
  await access(path, constants.F_OK);
}

function collectExportTargets(exportsField) {
  const targets = [];

  function walk(node) {
    if (typeof node === "string") {
      targets.push(node);
      return;
    }

    if (!node || typeof node !== "object") {
      return;
    }

    for (const value of Object.values(node)) {
      walk(value);
    }
  }

  walk(exportsField);
  return [...new Set(targets)];
}

async function main() {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));

  assert.ok(packageJson.style, "package.json style entry is missing");
  assert.ok(packageJson.exports, "package.json exports is missing");
  assert.ok(Array.isArray(packageJson.files), "package.json files list is missing");

  const requiredFiles = new Set([
    "dist/**",
    "README.md",
    "LICENSE",
    "docs/release/release-note-template.md",
    "docs/migration/migration-note-template.md"
  ]);

  for (const required of requiredFiles) {
    assert.ok(packageJson.files.includes(required), `package.json files must include: ${required}`);
  }

  for (const fileEntry of packageJson.files) {
    if (fileEntry.includes("*")) {
      continue;
    }

    await exists(resolve(rootDir, fileEntry));
  }

  const exportTargets = collectExportTargets(packageJson.exports);
  assert.ok(exportTargets.length > 0, "No export target found");

  for (const target of exportTargets) {
    await exists(resolve(rootDir, target));
  }

  await exists(resolve(rootDir, packageJson.style));

  const distCss = await readFile(resolve(rootDir, "dist/fikir.css"), "utf8");
  assert.ok(distCss.length > 0, "dist/fikir.css is empty");

  const selectors = JSON.parse(await readFile(resolve(rootDir, "dist/contracts/selectors.json"), "utf8"));
  const alias = JSON.parse(await readFile(resolve(rootDir, "dist/contracts/alias-migration.json"), "utf8"));
  const sizeReport = JSON.parse(await readFile(resolve(rootDir, "dist/contracts/size-report.json"), "utf8"));

  assert.ok(Object.keys(selectors).length > 0, "selectors.json is empty");
  assert.ok(Object.keys(alias).length > 0, "alias-migration.json is empty");
  assert.equal(typeof sizeReport.bytes, "number", "size-report.json does not contain bytes");

  console.log("publishable output validation passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
