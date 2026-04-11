import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const releaseProcessPath = resolve(rootDir, "docs/release/milestone-release-notes-process.md");
const validateVersionScriptPath = resolve(rootDir, "scripts/validate-version-tag-consistency.mjs");
const issueTemplatePath = resolve(rootDir, ".github/ISSUE_TEMPLATE/support_level_promotion.md");

test("release version consistency: version/tag validation script includes expected checks", async () => {
  const content = await readFile(validateVersionScriptPath, "utf8");

  assert.ok(content.includes("RELEASE_TAG"));
  assert.ok(content.includes("GITHUB_REF_TYPE"));
  assert.ok(content.includes("GITHUB_REF_NAME"));
  assert.ok(content.includes("v${version}-release-notes.md"));
  assert.ok(content.includes("version/tag consistency passed"));
});

test("release process: milestone-based release notes process doc is present", async () => {
  const content = await readFile(releaseProcessPath, "utf8");

  assert.ok(content.includes("Milestone-Based Release Notes Process"));
  assert.ok(content.includes("Minimum Milestone Release Note Checklist"));
  assert.ok(content.includes("npm run validate:version"));
});

test("governance: support level promotion issue template references promotion criteria", async () => {
  const content = await readFile(issueTemplatePath, "utf8");

  assert.ok(content.includes("Support level promotion"));
  assert.ok(content.includes("experimental-to-supported-criteria.md"));
});
