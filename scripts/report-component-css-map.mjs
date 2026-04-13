/**
 * report-component-css-map.mjs — Component-level CSS usage map (M3)
 *
 * Builds a map of component name → CSS rule count, byte size, and selector list
 * by analyzing each component file before bundling. Useful for tree-shaking audits.
 *
 * Output: dist/contracts/component-css-map.json
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { cssManifest } from "./css-manifest.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

function countSelectorsInSource(css) {
  const cleaned = css.replace(/\{\{[^}]+\}\}/g, ".x");
  const matches = cleaned.match(/\.[a-zA-Z][a-zA-Z0-9_-]*\s*(\{|,|\+|~|>|\[)/g);
  return matches ? new Set(matches.map((m) => m.replace(/[\s{,+~>[].*/, ""))).size : 0;
}

async function main() {
  const componentEntries = cssManifest.filter((p) => p.includes("packages/components/"));
  const map = [];

  for (const relPath of componentEntries) {
    const fullPath = resolve(rootDir, relPath);
    let source;
    try {
      source = await readFile(fullPath, "utf8");
    } catch {
      map.push({ file: relPath, status: "missing" });
      continue;
    }

    const bytes = Buffer.byteLength(source, "utf8");
    const gzipBytes = gzipSync(source).length;
    const ruleCount = (source.match(/\{[^{}]+\}/g) || []).length;
    const selectorCount = countSelectorsInSource(source);
    const name = basename(relPath, ".css");

    map.push({ name, file: relPath, bytes, gzipBytes, ruleCount, selectorCount, status: "ok" });
  }

  map.sort((a, b) => (b.bytes || 0) - (a.bytes || 0));

  const report = {
    generatedAt: new Date().toISOString(),
    totalComponents: map.filter((e) => e.status === "ok").length,
    totalBytes: map.reduce((s, e) => s + (e.bytes || 0), 0),
    components: map,
  };

  const outPath = resolve(rootDir, "dist/contracts/component-css-map.json");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(report, null, 2), "utf8");

  console.log("Component CSS usage map");
  console.log(`- components analyzed: ${report.totalComponents}`);
  console.log(`- total source bytes: ${report.totalBytes}`);
  console.log("");

  for (const e of map.slice(0, 10)) {
    if (e.status !== "ok") continue;
    console.log(`  ${e.name}: ${e.bytes}B raw, ${e.gzipBytes}B gz, ${e.selectorCount} selectors`);
  }
  if (map.length > 10) console.log(`  ... and ${map.length - 10} more`);
  console.log(`\nReport written: ${outPath}`);
}

main();
