import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const iconOnlyDocPath = resolve(rootDir, "docs/architecture/icon-only-surface-guidance.md");
const a11yCiScopePath = resolve(rootDir, "docs/testing/a11y-ci-scope.md");

test("a11y docs: icon-only guidance defines required accessible-name rule", async () => {
  const content = await readFile(iconOnlyDocPath, "utf8");

  assert.ok(content.includes("Accessible name is mandatory"));
  assert.ok(content.includes("aria-label"));
  assert.ok(content.includes("aria-hidden=\"true\""));
});

test("a11y docs: CI scope document defines automated and manual boundaries", async () => {
  const content = await readFile(a11yCiScopePath, "utf8");

  assert.ok(content.includes("Automated in CI (Current Baseline)"));
  assert.ok(content.includes("Not Fully Automated Yet"));
  assert.ok(content.includes("manual accessibility checklist mandatory"));
  assert.ok(content.includes("npm run test:ci"));
});
