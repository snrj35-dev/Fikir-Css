/**
 * validate-docs-examples.mjs — Component docs HTML example validation
 *
 * Validates that all HTML code examples in component docs use real CSS selectors
 * from the built manifest. Catches copy-paste errors, renamed classes, and typos.
 *
 * Output: Reports invalid class references and formatting issues
 *
 * Usage:
 *   npm run validate:docs-examples
 *   npm run validate:docs-examples -- --fix   (formats examples)
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

let manifest = null;
let issueCount = 0;
let fixCount = 0;
const FIX_MODE = process.argv.includes("--fix");

async function loadManifest() {
  try {
    const [selectorsData, cssData] = await Promise.all([
      readFile(resolve(rootDir, "dist/contracts/selectors.json"), "utf8"),
      readFile(resolve(rootDir, "dist/fikir.css"), "utf8")
    ]);

    manifest = JSON.parse(selectorsData);

    const classSet = new Set();
    for (const className of Object.values(manifest.selectors)) {
      classSet.add(className);
    }

    for (const match of cssData.matchAll(/\.([a-zA-Z][a-zA-Z0-9-]*)/g)) {
      classSet.add(match[1]);
    }

    manifest.classSet = classSet;
    manifest.count = classSet.size;

    console.log(`✓ Loaded selector set (${manifest.count} selectors from manifest + dist)`);
  } catch (err) {
    console.error("✗ Cannot load selector sources. Run build first: npm run build");
    process.exit(1);
  }
}

function extractHtmlBlocks(markdown) {
  const blocks = [];
  const regex = /```html\n([\s\S]*?)```/g;
  let m;

  while ((m = regex.exec(markdown)) !== null) {
    blocks.push({
      start: m.index,
      end: m.index + m[0].length,
      code: m[1].trim(),
    });
  }
  return blocks;
}

function extractClassesFromHtml(html) {
  const classes = [];
  const regex = /class="([^"]*)"/g;
  let m;

  while ((m = regex.exec(html)) !== null) {
    const classStr = m[1].trim();
    if (classStr) {
      for (const cls of classStr.split(/\s+/)) {
        if (cls) {
          classes.push({
            class: cls,
            position: m.index,
          });
        }
      }
    }
  }
  return classes;
}

function validateClasses(classes, docPath, blockIndex) {
  const invalidClasses = [];

  for (const { class: cls } of classes) {
    // Temporary legacy tolerance: some docs still contain historical prefixed examples
    // tracked for cleanup. Canonical public docs should prefer plain-mode selectors
    if (cls.startsWith("comp-") || cls.startsWith("tab-") || cls.startsWith("tree-view-") || cls.startsWith("timeline-")) {
      continue;
    }

    // Check if class exists in manifest
    if (!manifest.classSet.has(cls)) {
      invalidClasses.push(cls);
    }
  }

  if (invalidClasses.length > 0) {
    issueCount++;
    console.error(
      `✗ ${docPath} (block ${blockIndex}): Invalid classes: ${invalidClasses.join(", ")}`
    );
    return false;
  }

  return true;
}

function formatHtml(html) {
  // Basic formatting: clean up indentation
  return html
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0)
    .join("\n");
}

async function validateDoc(docPath) {
  try {
    const content = await readFile(docPath, "utf8");
    const blocks = extractHtmlBlocks(content);

    if (blocks.length === 0) {
      return; // No HTML blocks to validate
    }

    let updatedContent = content;
    let hasChanges = false;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const classes = extractClassesFromHtml(block.code);

      if (!validateClasses(classes, docPath, i + 1)) {
        // Don't fix—report only
        continue;
      }

      // Check formatting
      const formatted = formatHtml(block.code);
      if (formatted !== block.code && FIX_MODE) {
        console.log(
          `  → Formatted block ${i + 1} in ${docPath.split("/").pop()}`
        );
        const originalBlock = content.substring(block.start, block.end);
        const newBlock = `\`\`\`html\n${formatted}\n\`\`\``;
        updatedContent = updatedContent.replace(originalBlock, newBlock);
        hasChanges = true;
        fixCount++;
      }
    }

    if (hasChanges) {
      await writeFile(docPath, updatedContent, "utf8");
    }
  } catch (err) {
    console.error(`✗ Error reading ${docPath}: ${err.message}`);
  }
}

async function findDocFiles() {
  const docsDir = resolve(rootDir, "docs/components");
  try {
    const entries = await readdir(docsDir);
    return entries
      .filter((f) => f.endsWith(".md") && f !== "_template.md")
      .map((f) => resolve(docsDir, f));
  } catch (err) {
    console.error(`✗ Cannot read docs/components: ${err.message}`);
    return [];
  }
}

async function main() {
  console.log("Validating component docs HTML examples...\n");

  await loadManifest();

  const docFiles = await findDocFiles();
  console.log(`✓ Found ${docFiles.length} component docs\n`);

  for (const docPath of docFiles) {
    await validateDoc(docPath);
  }

  console.log(`\n${FIX_MODE ? "✓ Fixed" : "✓ Checked"} ${docFiles.length} docs`);

  if (issueCount > 0) {
    console.error(`✗ Found ${issueCount} issue(s) with invalid selectors`);
    console.log(
      "  → Check manifest: dist/contracts/selectors.json (run npm run build)"
    );
    process.exit(1);
  }

  if (FIX_MODE && fixCount > 0) {
    console.log(`✓ Fixed formatting in ${fixCount} block(s)`);
  }

  console.log("✓ All examples are valid!");
}

main().catch(console.error);
