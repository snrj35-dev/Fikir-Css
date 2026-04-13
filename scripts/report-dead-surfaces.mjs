/**
 * report-dead-surfaces.mjs — Dead-surface detection for playground examples (M3)
 *
 * Compares selectors present in the built CSS against selectors actually used
 * in playground/index.html. Reports selectors that exist in the bundle but are
 * not referenced in any playground example.
 *
 * Output: dist/contracts/dead-surfaces-report.json
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import config from "../fikir.config.mjs";

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

async function main() {
  const cssPath = resolve(rootDir, config.build.cssOutFile);
  const htmlPath = resolve(rootDir, "playground/index.html");

  let css, html;
  try {
    css = await readFile(cssPath, "utf8");
  } catch {
    console.error("dist/fikir.css not found — run build first");
    process.exit(1);
  }
  try {
    html = await readFile(htmlPath, "utf8");
  } catch {
    console.error("playground/index.html not found");
    process.exit(1);
  }

  const bundleSelectors = extractSelectorsFromCss(css);
  const playgroundClasses = extractClassesFromHtml(html);

  const used = [];
  const unused = [];

  for (const sel of bundleSelectors) {
    if (playgroundClasses.has(sel)) {
      used.push(sel);
    } else {
      unused.push(sel);
    }
  }

  unused.sort();
  used.sort();

  const report = {
    generatedAt: new Date().toISOString(),
    bundleSelectorCount: bundleSelectors.size,
    playgroundClassCount: playgroundClasses.size,
    usedCount: used.length,
    unusedCount: unused.length,
    coveragePercent: parseFloat(((used.length / bundleSelectors.size) * 100).toFixed(1)),
    unused,
    used,
  };

  const outPath = resolve(rootDir, "dist/contracts/dead-surfaces-report.json");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(report, null, 2), "utf8");

  console.log("Dead surface detection report");
  console.log(`- bundle selectors: ${report.bundleSelectorCount}`);
  console.log(`- playground classes: ${report.playgroundClassCount}`);
  console.log(`- coverage: ${report.coveragePercent}% (${report.usedCount} used, ${report.unusedCount} unused)`);
  if (unused.length > 0) {
    console.log(`\nTop unused selectors (first 15):`);
    for (const s of unused.slice(0, 15)) {
      console.log(`  .${s}`);
    }
  }
  console.log(`\nReport written: ${outPath}`);
}

main();
