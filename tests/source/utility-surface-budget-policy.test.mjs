import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const policyDocPath = resolve(rootDir, "docs/release/utility-surface-budget-policy.md");
const fluidRfcPath = resolve(rootDir, "docs/rfcs/foundations/fluid-tokens-rfc.md");
const tasklistPath = resolve(rootDir, "docs/roadmap/tasklist.md");

test("utility budget policy: document defines utility-growth guardrails", async () => {
  const content = await readFile(policyDocPath, "utf8");

  assert.ok(content.includes("Utility Surface Budget Policy"));
  assert.ok(content.includes("P1 target: keep utility selector count under `40`."));
  assert.ok(content.includes("avoid adding more than `6` utility selectors"));
  assert.ok(content.includes("No utility addition without documenting why semantic or token-first usage is insufficient."));
});

test("fluid token pilot RFC: includes clamp pilot constraints and acceptance criteria", async () => {
  const content = await readFile(fluidRfcPath, "utf8");

  assert.ok(content.includes("Fluid Tokens Pilot (`clamp`)"));
  assert.ok(content.includes("No breaking change to current canonical component API."));
  assert.ok(content.includes("font-size: clamp("));
  assert.ok(content.includes("Playground includes side-by-side fixed/fluid comparison."));
});

test("tasklist hardening pack: utility budget and fluid pilot items are marked done", async () => {
  const content = await readFile(tasklistPath, "utf8");

  assert.ok(content.includes("- [x] Define utility-surface budget policy (core vs optional utilities) `(P2)`"));
  assert.ok(content.includes("- [x] Create fluid token (`clamp`) RFC + playground comparison `(P2)`"));
});
