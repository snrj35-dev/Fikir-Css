import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const requiredPackagedFiles = [
  "dist/fikir.css",
  "dist/contracts/selectors.json",
  "dist/contracts/alias-migration.json",
  "dist/contracts/size-report.json",
  "README.md",
  "LICENSE",
  "docs/release/release-note-template.md",
  "docs/migration/migration-note-template.md"
];

const forbiddenPrefixes = [
  "tests/",
  "playground/",
  "scripts/",
  "packages/",
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

  console.log(`package smoke passed (${packResult.entryCount} files)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
