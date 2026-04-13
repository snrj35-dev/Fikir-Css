import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const requiredPackagedFiles = [
  "dist/fikir.css",
  "dist/contracts/selectors.json",
  "dist/contracts/alias-migration.json",
  "dist/contracts/size-report.json",
  "dist/tooling/resolve-classes.mjs",
  "dist/tooling/resolve-classes.d.ts",
  "dist/helpers/index.mjs",
  "dist/helpers/index.d.ts",
  "dist/themes/dark.css",
  "dist/themes/light.css",
  "dist/themes/high-contrast.css",
  "README.md",
  "LICENSE",
  "docs/release/release-note-template.md",
  "docs/migration/migration-note-template.md"
];

// Subpath imports that must resolve without error
const requiredExports = [
  "./dist/contracts/selectors.json",
  "./dist/tooling/resolve-classes.mjs",
  "./dist/helpers/index.mjs",
  "./dist/themes/dark.css"
];

const forbiddenPrefixes = [
  "tests/",
  "playground/",
  "scripts/",
  "packages/tooling/",
  "packages/recipes/",
  "packages/helpers/",
  ".github/"
];

async function main() {
  const { stdout } = await execFileAsync("npm", ["pack", "--dry-run", "--json"], {
    maxBuffer: 20 * 1024 * 1024
  });

  const parsed = JSON.parse(stdout);
  assert.ok(Array.isArray(parsed) && parsed.length > 0, "npm pack output is empty");

  const packResult = parsed[0];
  const packagedPaths = packResult.files.map((entry) => entry.path);
  const packagedSet = new Set(packagedPaths);

  for (const requiredPath of requiredPackagedFiles) {
    assert.ok(packagedSet.has(requiredPath), `required packaged file missing: ${requiredPath}`);
  }

  for (const path of packagedPaths) {
    for (const forbidden of forbiddenPrefixes) {
      assert.ok(!path.startsWith(forbidden), `forbidden path included in package: ${path}`);
    }
  }

  // Verify that key export targets are actually resolvable as files
  const rootDir = resolve(process.cwd());
  for (const exportPath of requiredExports) {
    const absPath = resolve(rootDir, exportPath);
    try {
      // Dynamic import works for .mjs; for CSS/JSON just check readability
      if (exportPath.endsWith(".mjs")) {
        await import(absPath);
      } else {
        const { readFile } = await import("node:fs/promises");
        const content = await readFile(absPath, "utf8");
        assert.ok(content.length > 0, `export target empty: ${exportPath}`);
      }
    } catch (err) {
      throw new Error(`export target not importable: ${exportPath} — ${err.message}`);
    }
  }

  console.log(`package smoke passed (${packResult.entryCount} files, ${requiredExports.length} exports verified)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
