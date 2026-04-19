/**
 * report-dead-surfaces.mjs — Dead-surface detection for playground examples (M3)
 *
 * Compares selectors present in the built CSS against selectors actually used
 * across ALL playground HTML files. Reports selectors that exist in the bundle
 * but are not referenced in any playground example.
 *
 * Flags: --min-coverage=<percent>  (default: 0, set to e.g. 95 for CI gate)
 *
 * Output: dist/contracts/dead-surfaces-report.json
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../fikir.config.mjs";

const MIN_COVERAGE = (() => {
  const arg = process.argv.find((a) => a.startsWith("--min-coverage="));
  return arg ? parseFloat(arg.split("=")[1]) : 0;
})();

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

function extractSelectorsFromCss(css) {
  const selectors = new Set();
  const re = /\.([\w-]+)\s*\{/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    selectors.add(m[1]);
  }
  return selectors;
}

function extractClassesFromHtml(html) {
  const classes = new Set();
  const re = /class="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    for (const cls of m[1].trim().split(/\s+/)) {
      if (cls) classes.add(cls);
    }
  }
  return classes;
}

async function collectHtmlFiles() {
  const candidates = [
    "playground/index.html",
    "playground/quickstart.html",
    "playground/token-explorer.html",
    "playground/variant-showcase.html",
  ];
  const templatesDir = resolve(rootDir, "playground/templates");
  try {
    const entries = await readdir(templatesDir);
    for (const f of entries) {
      if (f.endsWith(".html")) candidates.push(`playground/templates/${f}`);
    }
  } catch { /* templates dir may not exist */ }
  return candidates;
}

async function main() {
  const cssPath = resolve(rootDir, config.build.cssOutFile);

  let css;
  try {
    css = await readFile(cssPath, "utf8");
  } catch {
    console.error("dist/fikir.css not found — run build first");
    process.exit(1);
  }

  const htmlFiles = await collectHtmlFiles();
  const allClasses = new Set();
  const scannedFiles = [];

  for (const rel of htmlFiles) {
    try {
      const html = await readFile(resolve(rootDir, rel), "utf8");
      const classes = extractClassesFromHtml(html);
      for (const c of classes) allClasses.add(c);
      scannedFiles.push(rel);
    } catch { /* skip missing files */ }
  }

  const bundleSelectors = extractSelectorsFromCss(css);
  const used = [];
  const unused = [];

  for (const sel of bundleSelectors) {
    if (allClasses.has(sel)) {
      used.push(sel);
    } else {
      unused.push(sel);
    }
  }

  unused.sort();
  used.sort();

  const coveragePercent = parseFloat(((used.length / bundleSelectors.size) * 100).toFixed(1));

  const report = {
    generatedAt: new Date().toISOString(),
    scannedFiles,
    bundleSelectorCount: bundleSelectors.size,
    playgroundClassCount: allClasses.size,
    usedCount: used.length,
    unusedCount: unused.length,
    coveragePercent,
    minCoverageThreshold: MIN_COVERAGE,
    unused,
    used,
  };

  const outPath = resolve(rootDir, "dist/contracts/dead-surfaces-report.json");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(report, null, 2), "utf8");

  console.log("Dead surface detection report");
  console.log(`- scanned files: ${scannedFiles.length} (${scannedFiles.join(", ")})`);
  console.log(`- bundle selectors: ${report.bundleSelectorCount}`);
  console.log(`- coverage: ${coveragePercent}% (${report.usedCount} used, ${report.unusedCount} unused)`);
  if (unused.length > 0) {
    console.log(`\nTop unused selectors (first 15):`);
    for (const s of unused.slice(0, 15)) {
      console.log(`  .${s}`);
    }
  }
  console.log(`\nReport written: ${outPath}`);

  if (MIN_COVERAGE > 0 && coveragePercent < MIN_COVERAGE) {
    console.error(`\nCoverage gate failed: ${coveragePercent}% < ${MIN_COVERAGE}% minimum`);
    process.exit(1);
  }
}

main();
