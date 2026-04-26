import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const capabilitiesPath = resolve(rootDir, "dist/contracts/capabilities.json");
const densityGuidePath = resolve(rootDir, "docs/guides/density.md");

test("density impact matrix: capabilities manifest exposes density_effect for every component", async () => {
  const capabilities = JSON.parse(await readFile(capabilitiesPath, "utf8"));
  const allowed = new Set(["tangible", "subtle", "no-op"]);

  for (const [name, entry] of Object.entries(capabilities.components)) {
    assert.ok(allowed.has(entry.density_effect), `${name} is missing a valid density_effect`);
  }

  assert.equal(capabilities.components.input.density_effect, "tangible");
  assert.equal(capabilities.components.button.density_effect, "subtle");
  assert.equal(capabilities.components.checkbox.density_effect, "no-op");
});

test("density impact matrix: guide documents all three density effect buckets", async () => {
  const content = await readFile(densityGuidePath, "utf8");

  assert.ok(content.includes("Density Impact Matrix"));
  assert.ok(content.includes("`tangible`"));
  assert.ok(content.includes("`subtle`"));
  assert.ok(content.includes("`no-op`"));
  assert.ok(content.includes("`input`"));
  assert.ok(content.includes("`button`"));
  assert.ok(content.includes("`checkbox`"));
});
