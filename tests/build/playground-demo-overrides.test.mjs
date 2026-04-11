import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const demoCssPath = resolve(rootDir, "playground/demo.css");
const selectorsManifestPath = resolve(rootDir, "dist/contracts/selectors.json");

function collectCssClassTokens(cssContent) {
  const matches = cssContent.matchAll(/\.([a-zA-Z][a-zA-Z0-9-]*)/g);
  return new Set(Array.from(matches, (match) => match[1]));
}

test("playground demo overrides: demo.css does not override canonical framework classes", async () => {
  const demoCss = await readFile(demoCssPath, "utf8");
  const selectorsManifest = JSON.parse(await readFile(selectorsManifestPath, "utf8"));

  const demoCssClasses = collectCssClassTokens(demoCss);
  const canonicalClasses = new Set(
    Object.values(selectorsManifest.selectors).map((selector) => selector.replace(/^\./, ""))
  );

  const overlap = Array.from(demoCssClasses).filter((name) => canonicalClasses.has(name));

  assert.deepEqual(
    overlap,
    [],
    `demo.css must not target canonical framework classes, found: ${overlap.join(", ")}`
  );
});
