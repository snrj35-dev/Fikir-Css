/**
 * detect-css-anatomy-drift.mjs
 *
 * Compares the list of CSS files in packages/components/ against the registered
 * entries in dist/contracts/anatomy.json and reports any drift:
 *
 *   - UNREGISTERED: CSS file exists but no anatomy entry (needs documentation)
 *   - ORPHANED:     anatomy entry exists but no CSS file (stale or renamed)
 *
 * Exits with code 1 if any UNREGISTERED components are found.
 * Orphaned anatomy entries produce warnings only (may be intentional virtual entries).
 *
 * Usage:
 *   node scripts/detect-css-anatomy-drift.mjs
 *   node scripts/detect-css-anatomy-drift.mjs --strict   (also exits 1 on orphans)
 */

import { appendFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

import { anatomyDriftBaseline } from "../contracts/anatomy-drift-baseline.mjs";

const rootDir = resolve(process.cwd());
const componentsDir = resolve(rootDir, "packages/components");
const anatomyManifestPath = resolve(rootDir, "dist/contracts/anatomy.json");
const reportOutPath = resolve(rootDir, "dist/contracts/css-anatomy-drift-report.json");

const STRICT = process.argv.includes("--strict");

async function main() {
  // 1. Collect CSS component names
  const cssFiles = await readdir(componentsDir);
  const cssNames = new Set(
    cssFiles
      .filter((f) => f.endsWith(".css"))
      .map((f) => basename(f, ".css"))
  );

  // 2. Load anatomy manifest
  let anatomyData;
  try {
    anatomyData = JSON.parse(await readFile(anatomyManifestPath, "utf8"));
  } catch (e) {
    console.error(`ERROR: Cannot read anatomy manifest at ${anatomyManifestPath}`);
    console.error("Run 'npm run build:manifests' first.");
    process.exitCode = 1;
    return;
  }

  const anatomyNames = new Set(Object.keys(anatomyData.components || {}));

  // 3. Compute drift — split unregistered into new vs known-missing baseline
  const allUnregistered = [...cssNames]
    .filter((name) => !anatomyNames.has(name))
    .sort();

  const newUnregistered = allUnregistered.filter((name) => !anatomyDriftBaseline.has(name));
  const knownMissing = allUnregistered.filter((name) => anatomyDriftBaseline.has(name));

  const orphaned = [...anatomyNames]
    .filter((name) => !cssNames.has(name))
    .sort();

  // 4. Report
  const report = {
    generated: new Date().toISOString(),
    css_component_count: cssNames.size,
    anatomy_entry_count: anatomyNames.size,
    new_unregistered_count: newUnregistered.length,
    known_missing_count: knownMissing.length,
    orphaned_count: orphaned.length,
    new_unregistered: newUnregistered,
    known_missing: knownMissing,
    orphaned
  };

  await mkdir(resolve(rootDir, "dist/contracts"), { recursive: true });
  await writeFile(reportOutPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log("CSS → anatomy drift detection");
  console.log(`- CSS component files:        ${cssNames.size}`);
  console.log(`- anatomy.json entries:       ${anatomyNames.size}`);
  console.log(`- NEW unregistered (CI fail): ${newUnregistered.length}`);
  console.log(`- known missing (baseline):   ${knownMissing.length}`);
  console.log(`- orphaned (no CSS file):     ${orphaned.length}`);
  console.log(`- report written: ${reportOutPath}`);

  if (newUnregistered.length > 0) {
    console.error(`\nERROR: ${newUnregistered.length} new CSS component(s) have no anatomy.json entry:`);
    console.error("Add them to anatomy.contract.mjs or to contracts/anatomy-drift-baseline.mjs.");
    for (const name of newUnregistered) {
      console.error(`  ✗ ${name}`);
    }
  }

  if (knownMissing.length > 0) {
    console.warn(`\nWARN: ${knownMissing.length} component(s) still missing from anatomy (tracked in baseline):`);
    for (const name of knownMissing) {
      console.warn(`  ⚠ ${name}`);
    }
  }

  if (orphaned.length > 0) {
    const level = STRICT ? "ERROR" : "WARN";
    console.warn(`\n${level}: ${orphaned.length} anatomy entry(ies) have no CSS file:`);
    for (const name of orphaned) {
      console.warn(`  ⚠ ${name}`);
    }
  }

  await writeGithubSummary(report);

  if (newUnregistered.length > 0 || (STRICT && orphaned.length > 0)) {
    process.exitCode = 1;
  }
}

async function writeGithubSummary(report) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;

  const lines = ["## CSS → Anatomy Drift Report", ""];

  if (report.new_unregistered_count === 0 && report.orphaned_count === 0) {
    lines.push("✅ No new drift — all newly added CSS components are registered in anatomy.json.");
    if (report.known_missing_count > 0) {
      lines.push(`ℹ️ ${report.known_missing_count} component(s) in baseline backlog (pre-existing, tracked).`);
    }
  } else {
    lines.push(`| Metric | Count |`);
    lines.push(`| --- | --- |`);
    lines.push(`| CSS component files | ${report.css_component_count} |`);
    lines.push(`| anatomy.json entries | ${report.anatomy_entry_count} |`);
    lines.push(`| New unregistered (CI fail) | ${report.new_unregistered_count} |`);
    lines.push(`| Known missing (baseline backlog) | ${report.known_missing_count} |`);
    lines.push(`| Orphaned (anatomy only) | ${report.orphaned_count} |`);
    lines.push("");

    if (report.new_unregistered.length > 0) {
      lines.push("### ❌ New unregistered components (must fix)");
      for (const name of report.new_unregistered) {
        lines.push(`- \`${name}\``);
      }
      lines.push("");
    }

    if (report.orphaned.length > 0) {
      lines.push("### ⚠️ Orphaned anatomy entries (no CSS file)");
      for (const name of report.orphaned) {
        lines.push(`- \`${name}\``);
      }
      lines.push("");
    }
  }

  await appendFile(summaryPath, `${lines.join("\n")}\n`, "utf8");
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
