import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const labelsPath = resolve(rootDir, ".github/project-management/labels.json");
const milestonesPath = resolve(rootDir, ".github/project-management/milestones.json");
const issuesPath = resolve(rootDir, ".github/project-management/issues-m1.json");
const bootstrapScriptPath = resolve(rootDir, "scripts/bootstrap-github-roadmap.mjs");

test("github bootstrap: labels/milestones/issues manifests are present and minimally valid", async () => {
  const labels = JSON.parse(await readFile(labelsPath, "utf8"));
  const milestones = JSON.parse(await readFile(milestonesPath, "utf8"));
  const issues = JSON.parse(await readFile(issuesPath, "utf8"));

  assert.ok(Array.isArray(labels) && labels.length > 0);
  assert.ok(Array.isArray(milestones) && milestones.length > 0);
  assert.ok(Array.isArray(issues) && issues.length > 0);

  const requiredLabelNames = [
    "workstream:governance",
    "workstream:release",
    "support:supported",
    "support:experimental"
  ];

  const labelNames = new Set(labels.map((item) => item.name));
  for (const requiredName of requiredLabelNames) {
    assert.ok(labelNames.has(requiredName), `Missing label: ${requiredName}`);
  }

  const milestoneTitles = new Set(milestones.map((item) => item.title));
  assert.ok(milestoneTitles.has("M1 Supported Foundation Release"));

  const issueTitles = new Set(issues.map((item) => item.title));
  assert.ok(issueTitles.has("M1: Convert roadmap into GitHub issues/milestones"));
  assert.ok(issueTitles.has("M1: Request for feedback from external users"));
});

test("github bootstrap: script supports dry-run without token", async () => {
  const content = await readFile(bootstrapScriptPath, "utf8");

  assert.ok(content.includes("GH_TOKEN"));
  assert.ok(content.includes("GITHUB_TOKEN"));
  assert.ok(content.includes("Dry-run only"));
  assert.ok(content.includes("GitHub roadmap bootstrap completed"));
});
