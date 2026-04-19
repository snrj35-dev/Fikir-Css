import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const thresholdsDocPath = resolve(rootDir, "docs/release/bundle-size-thresholds.md");
const packageJsonPath = resolve(rootDir, "package.json");
const ciWorkflowPath = resolve(rootDir, ".github/workflows/ci.yml");

test("size guardrails: thresholds document defines numeric limits", async () => {
  const content = await readFile(thresholdsDocPath, "utf8");

  assert.ok(content.includes("Maximum bundle size: `165000` bytes"));
  assert.ok(content.includes("Maximum positive size diff per change: `8000` bytes"));
  assert.ok(content.includes("Maximum gzip bundle size: `22000` bytes"));
  assert.ok(content.includes("Maximum positive gzip size diff per change: `1500` bytes"));
  assert.ok(content.includes("npm run validate:size"));
  assert.ok(content.includes("npm run report:size"));
});

test("size guardrails: package scripts include threshold validation and reporting", async () => {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));

  assert.equal(
    packageJson.scripts["validate:size"],
    "node scripts/validate-size-thresholds.mjs"
  );
  assert.equal(
    packageJson.scripts["validate:prefixed"],
    "node scripts/validate-prefixed-smoke.mjs"
  );
  assert.equal(
    packageJson.scripts["report:size"],
    "node scripts/report-size-diff.mjs"
  );
  assert.ok(packageJson.scripts["test:ci"].includes("npm run validate:size"));
  assert.ok(packageJson.scripts["test:ci"].includes("npm run validate:prefixed"));
});

test("size guardrails: CI workflow reports size diff", async () => {
  const workflow = await readFile(ciWorkflowPath, "utf8");

  assert.ok(workflow.includes("Report CSS size diff"));
  assert.ok(workflow.includes("npm run report:size"));
});
