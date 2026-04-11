import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const readinessDocPath = resolve(rootDir, "docs/release/github-release-readiness-v0.3.md");

test("github release readiness: doc includes local readiness and remaining external actions", async () => {
  const content = await readFile(readinessDocPath, "utf8");

  assert.ok(content.includes("Local Readiness (Completed)"));
  assert.ok(content.includes("Governance Readiness (Prepared)"));
  assert.ok(content.includes("Remaining External Actions"));
  assert.ok(content.includes("GH_TOKEN"));
  assert.ok(content.includes("v0.3.0"));
});
