/**
 * check-docs-quality.mjs — Docs quality checker (M3)
 *
 * Scans all markdown files in docs/ and checks for:
 * 1. Stale markers: lines containing <!-- stale -->, [STALE], or (stale)
 * 2. Broken cross-links: relative markdown links where the target file does not exist
 * 3. TODO markers left in docs
 *
 * Outputs a report and exits with code 1 if issues are found in strict mode.
 *
 * Usage:
 *   node scripts/check-docs-quality.mjs [--strict]
 */

import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, dirname, relative, join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const docsDir = resolve(rootDir, "docs");
const strict = process.argv.includes("--strict");

async function walkMarkdown(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdown(full)));
    } else if (entry.isFile() && extname(entry.name) === ".md") {
      files.push(full);
    }
  }
  return files;
}

function extractLinks(content, filePath) {
  const links = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const href = m[2].split("#")[0].trim();
    if (!href || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")) continue;
    links.push({ text: m[1], href, line: content.slice(0, m.index).split("\n").length });
  }
  return links;
}

async function checkFile(filePath) {
  const content = await readFile(filePath, "utf8");
  const relPath = relative(rootDir, filePath);
  const issues = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/<!--\s*stale\s*-->|\[STALE\]|\(stale\)/i.test(line)) {
      issues.push({ type: "stale", line: i + 1, text: line.trim().slice(0, 80) });
    }
    if (/\bTODO\b/.test(line)) {
      issues.push({ type: "todo", line: i + 1, text: line.trim().slice(0, 80) });
    }
  }

  const links = extractLinks(content, filePath);
  for (const link of links) {
    const target = resolve(dirname(filePath), link.href);
    try {
      await stat(target);
    } catch {
      issues.push({ type: "broken-link", line: link.line, text: `[${link.text}](${link.href}) → ${relative(rootDir, target)}` });
    }
  }

  return { file: relPath, issues };
}

async function main() {
  const files = await walkMarkdown(docsDir);

  const allResults = [];
  for (const f of files) {
    allResults.push(await checkFile(f));
  }

  const withIssues = allResults.filter((r) => r.issues.length > 0);
  const staleCount = withIssues.reduce((s, r) => s + r.issues.filter((i) => i.type === "stale").length, 0);
  const brokenCount = withIssues.reduce((s, r) => s + r.issues.filter((i) => i.type === "broken-link").length, 0);
  const todoCount = withIssues.reduce((s, r) => s + r.issues.filter((i) => i.type === "todo").length, 0);
  const totalFiles = files.length;

  console.log(`Docs quality check`);
  console.log(`- files scanned: ${totalFiles}`);
  console.log(`- files with issues: ${withIssues.length}`);
  console.log(`- stale markers: ${staleCount}`);
  console.log(`- broken links: ${brokenCount}`);
  console.log(`- TODO markers: ${todoCount}`);

  if (withIssues.length > 0) {
    console.log("");
    for (const result of withIssues) {
      console.log(`  ${result.file}`);
      for (const issue of result.issues) {
        const icon = issue.type === "broken-link" ? "✖" : issue.type === "stale" ? "⚠" : "·";
        console.log(`    ${icon} [${issue.type}] line ${issue.line}: ${issue.text}`);
      }
    }
  }

  const criticalIssues = brokenCount + staleCount;
  if (strict && criticalIssues > 0) {
    console.error(`\nStrict mode: ${criticalIssues} critical issue(s) found.`);
    process.exit(1);
  } else if (criticalIssues > 0) {
    console.log(`\nRun with --strict to fail CI on these issues.`);
  } else {
    console.log(`\nAll docs are clean.`);
  }
}

main();
