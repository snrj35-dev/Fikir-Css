import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import test from "node:test";

import { docsSelectorsDriftBaseline } from "../../contracts/docs-selectors-drift-baseline.mjs";
import { namingContract } from "../../contracts/naming.contract.mjs";

const rootDir = resolve(process.cwd());
const selectorsPath = resolve(rootDir, "dist/contracts/selectors.json");
const primitivesPath = resolve(rootDir, "dist/contracts/primitives.json");
const docsRoots = [
  resolve(rootDir, "docs/components"),
  resolve(rootDir, "docs/patterns")
];

async function collectMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(absolute)));
      continue;
    }

    if (entry.isFile() && extname(entry.name) === ".md" && entry.name !== "_template.md") {
      files.push(absolute);
    }
  }

  return files;
}

function collectHtmlFenceBodies(content) {
  const bodies = [];

  for (const match of content.matchAll(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g)) {
    const language = match[1].trim().toLowerCase();
    if (["html", "vue", "svelte", "astro", "jsx", "tsx", ""].includes(language)) {
      bodies.push(match[2]);
    }
  }

  return bodies;
}

function collectClassTokens(htmlSnippet) {
  const tokens = new Set();

  for (const match of htmlSnippet.matchAll(/class(?:Name)?\s*=\s*"([^"]+)"/g)) {
    for (const token of match[1].split(/\s+/).filter(Boolean)) {
      tokens.add(token);
    }
  }

  return [...tokens];
}

function isPlaceholderToken(token) {
  return /^\[[^\]]+\](?:-[a-z0-9-]+)?$/i.test(token);
}

test("docs selectors consistency: docs examples do not introduce new unknown classes", async () => {
  const selectorManifest = JSON.parse(await readFile(selectorsPath, "utf8"));
  const primitivesManifest = JSON.parse(await readFile(primitivesPath, "utf8"));
  const knownSelectors = new Set(Object.values(selectorManifest.selectors));
  const utilitySelectors = new Set(
    Object.values(namingContract.selectors)
      .filter((descriptor) => descriptor.domain === "utility")
      .map((descriptor) => descriptor.base)
  );
  const primitiveSelectors = new Set(
    Object.values(primitivesManifest.primitives ?? {}).map((entry) => entry.selector)
  );

  const markdownFiles = [];
  for (const docsRoot of docsRoots) {
    markdownFiles.push(...(await collectMarkdownFiles(docsRoot)));
  }

  const newDrift = [];
  const staleBaseline = [];

  for (const markdownFilePath of markdownFiles.sort()) {
    const content = await readFile(markdownFilePath, "utf8");
    const relativePath = relative(rootDir, markdownFilePath);
    const unknownTokens = new Set();

    for (const htmlSnippet of collectHtmlFenceBodies(content)) {
      for (const token of collectClassTokens(htmlSnippet)) {
        if (knownSelectors.has(token)) continue;
        if (utilitySelectors.has(token)) continue;
        if (primitiveSelectors.has(token)) continue;
        if (isPlaceholderToken(token)) continue;
        unknownTokens.add(token);
      }
    }

    const actual = [...unknownTokens].sort();
    const baseline = [...(docsSelectorsDriftBaseline[relativePath] ?? [])].sort();

    if (actual.length === 0 && baseline.length === 0) {
      continue;
    }

    if (actual.length === 0 && baseline.length > 0) {
      staleBaseline.push(`${relativePath}: baseline can be removed`);
      continue;
    }

    if (JSON.stringify(actual) !== JSON.stringify(baseline)) {
      newDrift.push({
        file: relativePath,
        expected: baseline,
        actual
      });
    }
  }

  assert.deepEqual(
    newDrift,
    [],
    `Docs ↔ selectors drift detected.\n${JSON.stringify(newDrift, null, 2)}`
  );

  assert.deepEqual(
    staleBaseline,
    [],
    `Docs selectors baseline has stale entries.\n${staleBaseline.join("\n")}`
  );
});
