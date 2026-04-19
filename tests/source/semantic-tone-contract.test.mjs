import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());

const toneTokens = ["neutral", "primary", "success", "warning", "danger", "info"];

function expectTokenDeclarations(content, tokens, label) {
  for (const token of tokens) {
    const pattern = new RegExp(`\\s*--color-${token}:`, "m");
    assert.match(content, pattern, `${label} is missing --color-${token}`);
  }
}

function expectSubtleDeclarations(content, tokens, label) {
  for (const token of tokens) {
    const pattern = new RegExp(`\\s*--color-${token}-subtle:`, "m");
    assert.match(content, pattern, `${label} is missing --color-${token}-subtle`);
  }
}

test("semantic tone contract: base semantic file defines all official tone tokens", async () => {
  const semanticCss = await readFile(resolve(rootDir, "packages/tokens/semantic.css"), "utf8");

  expectTokenDeclarations(semanticCss, toneTokens, "packages/tokens/semantic.css");
  expectSubtleDeclarations(semanticCss, toneTokens, "packages/tokens/semantic.css");
});

test("semantic tone contract: dark and high-contrast themes override all official tone tokens", async () => {
  const darkCss = await readFile(resolve(rootDir, "packages/tokens/themes/dark.css"), "utf8");
  const highContrastCss = await readFile(resolve(rootDir, "packages/tokens/themes/high-contrast.css"), "utf8");

  expectTokenDeclarations(darkCss, toneTokens, "packages/tokens/themes/dark.css");
  expectSubtleDeclarations(darkCss, toneTokens, "packages/tokens/themes/dark.css");
  expectTokenDeclarations(highContrastCss, toneTokens, "packages/tokens/themes/high-contrast.css");
  expectSubtleDeclarations(highContrastCss, toneTokens, "packages/tokens/themes/high-contrast.css");
});

test("semantic tone contract: canonical docs describe the six-tone matrix and fallback strategy", async () => {
  const taxonomyDoc = await readFile(resolve(rootDir, "docs/contracts/token-taxonomy-v1.md"), "utf8");
  const themeGuide = await readFile(resolve(rootDir, "docs/guides/theme-system.md"), "utf8");

  assert.ok(
    taxonomyDoc.includes("The official tone surface for the v1.0 track is frozen to:"),
    "token taxonomy must define the official tone contract"
  );
  assert.ok(themeGuide.includes("## Semantic Tone Matrix"), "theme guide must include the semantic tone matrix");
  assert.ok(
    themeGuide.includes("### High-Contrast Fallback Strategy"),
    "theme guide must document the high-contrast fallback strategy"
  );
});
