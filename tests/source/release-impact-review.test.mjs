import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const impactReviewDocPath = resolve(rootDir, "docs/release/release-impact-review.md");
const checklistPath = resolve(rootDir, "docs/release/release-checklist.md");

test("release impact review: doc defines required review areas", async () => {
  const content = await readFile(impactReviewDocPath, "utf8");

  assert.ok(content.includes("Required Review Areas"));
  assert.ok(content.includes("Selector and compatibility impact"));
  assert.ok(content.includes("Behavior and accessibility impact"));
  assert.ok(content.includes("CI result recorded"));
});

test("release impact review: release checklist references impact review doc", async () => {
  const content = await readFile(checklistPath, "utf8");

  assert.ok(content.includes("release-impact-review.md"));
});
