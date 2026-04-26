import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const anatomyPath = resolve(rootDir, "dist/contracts/anatomy.json");
const markdownRoots = [
  resolve(rootDir, "docs/components"),
  resolve(rootDir, "docs/patterns"),
  resolve(rootDir, "docs/guides")
];
const htmlRoots = [
  resolve(rootDir, "examples")
];
const standaloneMarkdownFiles = [
  resolve(rootDir, "README.md"),
  resolve(rootDir, "docs/getting-started.md")
];

const TARGET_ATTRS = ["data-invalid", "data-disabled", "data-readonly"];

async function collectFiles(dir, extension) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolute, extension)));
      continue;
    }

    if (entry.isFile() && extname(entry.name) === extension) {
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

function extractAttrValue(tag, attrName) {
  const match = tag.match(new RegExp(`${attrName}\\s*=\\s*"([^"]+)"`));
  return match?.[1] ?? null;
}

function extractClassList(tag) {
  const classValue = extractAttrValue(tag, "class") ?? extractAttrValue(tag, "className");
  return classValue ? classValue.split(/\s+/).filter(Boolean) : [];
}

function buildAllowedRoots(components) {
  const allowed = new Map(TARGET_ATTRS.map((attr) => [attr, []]));

  for (const entry of Object.values(components)) {
    for (const dataAttr of entry.data_attrs || []) {
      if (dataAttr.on !== "root") continue;
      if (!allowed.has(dataAttr.attr)) continue;

      if (entry.selector_type === "data-pattern") {
        const patternName = entry.root_selector.match(/^\[data-pattern="([^"]+)"\]$/)?.[1];
        if (patternName) {
          allowed.get(dataAttr.attr).push({ type: "data-pattern", value: patternName });
        }
        continue;
      }

      allowed.get(dataAttr.attr).push({ type: "class", value: entry.root_selector });
    }
  }

  return allowed;
}

function tagMatchesAllowedRoot(tag, allowedRoots) {
  const classList = extractClassList(tag);
  const dataPattern = extractAttrValue(tag, "data-pattern");

  return allowedRoots.some((root) => {
    if (root.type === "class") return classList.includes(root.value);
    if (root.type === "data-pattern") return dataPattern === root.value;
    return false;
  });
}

function lintSnippet(snippet, filePath, allowedRoots) {
  const violations = [];

  for (const match of snippet.matchAll(/<([a-zA-Z0-9-]+)\b[^>]*\b(data-invalid|data-disabled|data-readonly)\s*=\s*"([^"]+)"[^>]*>/g)) {
    const fullTag = match[0];
    const tagName = match[1];
    const attrName = match[2];
    const attrValue = match[3];
    const supportedRoots = allowedRoots.get(attrName) ?? [];

    if (tagMatchesAllowedRoot(fullTag, supportedRoots)) continue;

    violations.push({
      file: relative(rootDir, filePath),
      attr: attrName,
      value: attrValue,
      tag: tagName,
      snippet: fullTag
    });
  }

  return violations;
}

test("state attribute lint: docs and examples only use supported data-invalid/data-disabled/data-readonly roots", async () => {
  const anatomy = JSON.parse(await readFile(anatomyPath, "utf8"));
  const allowedRoots = buildAllowedRoots(anatomy.components || {});

  const markdownFiles = [...standaloneMarkdownFiles];
  for (const dir of markdownRoots) {
    markdownFiles.push(...(await collectFiles(dir, ".md")));
  }

  const htmlFiles = [];
  for (const dir of htmlRoots) {
    htmlFiles.push(...(await collectFiles(dir, ".html")));
  }

  const violations = [];

  for (const filePath of markdownFiles.sort()) {
    const content = await readFile(filePath, "utf8");
    for (const snippet of collectHtmlFenceBodies(content)) {
      violations.push(...lintSnippet(snippet, filePath, allowedRoots));
    }
  }

  for (const filePath of htmlFiles.sort()) {
    const content = await readFile(filePath, "utf8");
    violations.push(...lintSnippet(content, filePath, allowedRoots));
  }

  assert.deepEqual(
    violations,
    [],
    `Unsupported state data-* usage found.\n${JSON.stringify(violations, null, 2)}`
  );
});
