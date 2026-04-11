import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const issuesManifestPath = resolve(rootDir, ".github/project-management/issues-m1.json");
const labelsManifestPath = resolve(rootDir, ".github/project-management/labels.json");
const milestonesManifestPath = resolve(rootDir, ".github/project-management/milestones.json");
const feedbackTemplatePath = resolve(rootDir, ".github/ISSUE_TEMPLATE/request_for_feedback.md");
const feedbackLogPath = resolve(rootDir, "docs/community/external-feedback-log.md");

test("governance readiness: roadmap conversion manifests include labels/milestone/issues", async () => {
  const labels = JSON.parse(await readFile(labelsManifestPath, "utf8"));
  const milestones = JSON.parse(await readFile(milestonesManifestPath, "utf8"));
  const issues = JSON.parse(await readFile(issuesManifestPath, "utf8"));

  assert.ok(labels.length >= 10);
  assert.ok(milestones.some((item) => item.title.includes("M1 Supported Foundation Release")));
  assert.ok(issues.some((item) => item.title.includes("Convert roadmap into GitHub issues/milestones")));
});

test("governance readiness: feedback intake template and log are present", async () => {
  const template = await readFile(feedbackTemplatePath, "utf8");
  const log = await readFile(feedbackLogPath, "utf8");

  assert.ok(template.includes("Request for feedback"));
  assert.ok(template.includes("Evaluated Scope"));
  assert.ok(log.includes("External Feedback Log"));
  assert.ok(log.includes("No external user feedback received yet"));
});
