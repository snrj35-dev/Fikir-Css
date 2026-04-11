import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const docsDir = resolve(rootDir, "docs");

const externalSchemes = ["http://", "https://", "mailto:", "tel:"];
const pathLikePrefixes = [
  "docs/",
  "playground/",
  "contracts/",
  "scripts/",
  "tests/",
  "examples/",
  "packages/",
  ".github/",
  "README.md",
  "CONTRIBUTING.md",
  "LICENSE",
  "package.json"
];
const skipPrefixes = ["dist/", "node_modules/", "packages/recipes/generated/"];

async function exists(path) {
  await access(path, constants.F_OK);
}

async function collectMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "archive") {
      continue;
    }

    const absolute = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(absolute)));
      continue;
    }

    if (entry.isFile() && extname(entry.name) === ".md") {
      files.push(absolute);
    }
  }

  return files;
}

function normalizeReference(raw) {
  const trimmed = raw.trim().replace(/^<|>$/g, "");
  const noAnchor = trimmed.split("#")[0].split("?")[0];
  return noAnchor.trim();
}

function isExternalReference(reference) {
  if (!reference) return true;
  if (reference.startsWith("#")) return true;
  if (reference.includes("://")) return true;

  for (const scheme of externalSchemes) {
    if (reference.startsWith(scheme)) return true;
  }

  return false;
}

function looksLikePathToken(token) {
  if (!token || token.includes("\n") || token.includes(" ")) return false;
  if (token.includes("*")) return false;

  const normalized = token.replace(/^\.\//, "");

  return pathLikePrefixes.some((prefix) => normalized === prefix || normalized.startsWith(prefix));
}

function shouldSkipReference(reference) {
  if (reference.includes("vX.Y") || reference.includes("vA.B.C")) return true;
  if (reference.startsWith("./contracts/")) return true;
  if (reference === "./css") return true;
  return skipPrefixes.some((prefix) => reference.startsWith(prefix));
}

function resolveReference(reference, markdownFilePath) {
  if (reference.startsWith("./") || reference.startsWith("../")) {
    return resolve(dirname(markdownFilePath), reference);
  }

  return resolve(rootDir, reference);
}

function collectMarkdownLinkTargets(content) {
  const targets = [];

  for (const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    targets.push(match[1]);
  }

  return targets;
}

function collectInlinePathTokens(content) {
  const tokens = [];

  for (const match of content.matchAll(/`([^`\n]+)`/g)) {
    const token = match[1].trim();
    if (looksLikePathToken(token)) {
      tokens.push(token);
    }
  }

  return tokens;
}

test("docs link audit: referenced local docs paths exist", async () => {
  const markdownFiles = [
    resolve(rootDir, "README.md"),
    resolve(rootDir, "playground/README.md"),
    ...(await collectMarkdownFiles(docsDir))
  ];

  const missing = [];

  for (const markdownFilePath of markdownFiles) {
    const content = await readFile(markdownFilePath, "utf8");
    const references = [
      ...collectMarkdownLinkTargets(content),
      ...collectInlinePathTokens(content)
    ];

    for (const rawReference of references) {
      const reference = normalizeReference(rawReference);

      if (isExternalReference(reference)) continue;
      if (shouldSkipReference(reference)) continue;

      const absolute = resolveReference(reference, markdownFilePath);

      try {
        await exists(absolute);
      } catch {
        missing.push(`${markdownFilePath}: ${reference}`);
      }
    }
  }

  assert.deepEqual(missing, []);
});
