import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const criteriaDocPath = resolve(rootDir, "docs/release/experimental-to-supported-criteria.md");
const releaseChecklistPath = resolve(rootDir, "docs/release/release-checklist.md");

test("release criteria: experimental-to-supported criteria doc defines required gates", async () => {
  const content = await readFile(criteriaDocPath, "utf8");

  const requiredMarkers = [
    "Promotion Eligibility (All Required)",
    "Test coverage exists",
    "Accessibility expectations are documented",
    "Release impact is reviewed",
    "Promotion Blockers",
    "Required Evidence Checklist",
    "Promotion Record Template"
  ];

  for (const marker of requiredMarkers) {
    assert.ok(content.includes(marker), `Missing criteria marker: ${marker}`);
  }
});

test("release criteria: release checklist references promotion criteria doc", async () => {
  const checklist = await readFile(releaseChecklistPath, "utf8");

  assert.ok(checklist.includes("experimental-to-supported-criteria.md"));
});
