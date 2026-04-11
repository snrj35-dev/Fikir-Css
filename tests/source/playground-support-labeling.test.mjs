import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const demoScriptPath = resolve(rootDir, "playground/demo.js");

test("playground support labeling: section heading labeling logic is present", async () => {
  const content = await readFile(demoScriptPath, "utf8");

  const requiredMarkers = [
    "sectionHeadings",
    "supportedSectionNumbers",
    "showcaseSectionNumbers",
    "data-support-level",
    "support-pill"
  ];

  for (const marker of requiredMarkers) {
    assert.ok(content.includes(marker), `Missing support-labeling marker: ${marker}`);
  }
});
