import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const supportMatrixPath = resolve(rootDir, "docs/roadmap/support-matrix.md");
const overridesPath = resolve(rootDir, "docs/roadmap/support-matrix-rfc-overrides.json");

const ignoredTokens = new Set(["supported", "experimental", "rfc-only", "planned"]);
const rfcFileAliases = new Map([
  ["section-block", "section-rfc.md"],
  ["sidebar-nav", "sidebar-rfc.md"]
]);

async function exists(path) {
  await access(path, constants.F_OK);
}

function collectSurfaceTokens(markdownContent) {
  const tokens = [];

  for (const match of markdownContent.matchAll(/`([a-z0-9-]+)`/g)) {
    const token = match[1];

    if (ignoredTokens.has(token)) continue;
    tokens.push(token);
  }

  return [...new Set(tokens)].sort();
}

function getRfcPathForSurface(surface) {
  const filename = rfcFileAliases.get(surface) ?? `${surface}-rfc.md`;
  return resolve(rootDir, "docs/rfcs/components", filename);
}

test("support matrix RFC alignment: each surface is backed by RFC or explicit override evidence", async () => {
  const supportMatrixContent = await readFile(supportMatrixPath, "utf8");
  const overrides = JSON.parse(await readFile(overridesPath, "utf8"));

  const matrixSurfaces = collectSurfaceTokens(supportMatrixContent);
  const overrideSurfaces = Object.keys(overrides).sort();

  const missingWithoutOverride = [];

  for (const surface of matrixSurfaces) {
    const rfcPath = getRfcPathForSurface(surface);

    try {
      await exists(rfcPath);
      continue;
    } catch {
      if (!overrides[surface]) {
        missingWithoutOverride.push(surface);
      }
    }
  }

  assert.deepEqual(missingWithoutOverride, []);

  const orphanOverrides = overrideSurfaces.filter((surface) => !matrixSurfaces.includes(surface));
  assert.deepEqual(orphanOverrides, []);

  for (const surface of overrideSurfaces) {
    const entry = overrides[surface];

    assert.equal(typeof entry.reason, "string", `Override reason missing for ${surface}`);
    assert.ok(entry.reason.length > 0, `Override reason empty for ${surface}`);
    assert.ok(Array.isArray(entry.evidence), `Override evidence must be array for ${surface}`);
    assert.ok(entry.evidence.length > 0, `Override evidence empty for ${surface}`);

    for (const evidencePath of entry.evidence) {
      await exists(resolve(rootDir, evidencePath));
    }
  }
});
