import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const planDocPath = resolve(rootDir, "docs/testing/playground-visual-regression-plan.md");
const playgroundReadmePath = resolve(rootDir, "playground/README.md");

test("playground visual regression plan: doc includes strategy and baseline references", async () => {
  const content = await readFile(planDocPath, "utf8");

  const requiredMarkers = [
    "Playground Visual Regression Plan",
    "Screenshot Baseline Strategy",
    "playground/screenshots/playground-light.png",
    "playground/screenshots/playground-dark.png",
    "validate:playground-baseline",
    "Full pixel diff automation is deferred"
  ];

  for (const marker of requiredMarkers) {
    assert.ok(content.includes(marker), `Missing visual regression plan marker: ${marker}`);
  }
});

test("playground visual regression plan: playground README links visual regression plan", async () => {
  const readme = await readFile(playgroundReadmePath, "utf8");

  assert.ok(readme.includes("docs/testing/playground-visual-regression-plan.md"));
});
