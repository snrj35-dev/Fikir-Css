/**
 * diff-playground-screenshots.mjs
 *
 * Threshold-based screenshot diff reporter (non-blocking).
 *
 * Compares PNG file sizes between a baseline directory and the current
 * capture directory. A significant size difference (> THRESHOLD_PERCENT)
 * is flagged as a visual-change warning in the GitHub Step Summary.
 *
 * This script always exits 0 (non-blocking). It is intended to provide
 * visibility on potential visual regressions without gating CI.
 *
 * Usage:
 *   node scripts/diff-playground-screenshots.mjs
 *
 * Environment variables:
 *   SCREENSHOTS_DIR      — current screenshots directory (default: playground/screenshots)
 *   BASELINE_DIR         — baseline screenshots directory (default: playground/screenshots/baseline)
 *   THRESHOLD_PERCENT    — size diff % to flag as changed (default: 5)
 */

import { access, appendFile, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve, join, relative } from "node:path";

const rootDir = resolve(process.cwd());
const screenshotsDir = resolve(rootDir, process.env.SCREENSHOTS_DIR ?? "playground/screenshots");
const baselineDir = resolve(rootDir, process.env.BASELINE_DIR ?? "playground/screenshots/baseline");
const THRESHOLD = Number(process.env.THRESHOLD_PERCENT ?? 5);

async function fileExists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function getPngFiles(dir) {
  if (!(await fileExists(dir))) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const pngs = [];
  for (const e of entries) {
    if (e.isDirectory()) {
      const sub = await getPngFiles(join(dir, e.name));
      pngs.push(...sub);
    } else if (e.name.endsWith(".png")) {
      pngs.push(join(dir, e.name));
    }
  }
  return pngs;
}

async function writeGithubSummary(markdown) {
  const path = process.env.GITHUB_STEP_SUMMARY;
  if (!path) return;
  await appendFile(path, `${markdown}\n`, "utf8");
}

async function main() {
  const currentFiles = await getPngFiles(screenshotsDir);

  if (currentFiles.length === 0) {
    console.log("No screenshots found in", screenshotsDir);
    console.log("Run `npm run capture:playground` first.");
    await writeGithubSummary("## Screenshot Diff\n\n⚠️ No screenshots found — capture step may have been skipped.");
    return;
  }

  const rows = [];
  let changedCount = 0;
  let missingBaseline = 0;

  for (const currentPath of currentFiles) {
    const rel = relative(screenshotsDir, currentPath);
    const baselinePath = join(baselineDir, rel);

    const currentStat = await stat(currentPath);
    const currentBytes = currentStat.size;

    if (!(await fileExists(baselinePath))) {
      rows.push({ rel, status: "new", currentBytes, baselineBytes: 0, diffPct: null });
      missingBaseline++;
      continue;
    }

    const baselineStat = await stat(baselinePath);
    const baselineBytes = baselineStat.size;
    const diffPct = baselineBytes === 0 ? 100 : Math.abs((currentBytes - baselineBytes) / baselineBytes) * 100;
    const changed = diffPct > THRESHOLD;
    if (changed) changedCount++;
    rows.push({ rel, status: changed ? "changed" : "ok", currentBytes, baselineBytes, diffPct });
  }

  // Console output
  console.log(`Screenshot diff report (threshold: ${THRESHOLD}%)`);
  console.log(`Total: ${currentFiles.length} | Changed: ${changedCount} | New (no baseline): ${missingBaseline}`);
  for (const r of rows) {
    const pct = r.diffPct !== null ? `${r.diffPct.toFixed(1)}%` : "—";
    const icon = r.status === "ok" ? "✓" : r.status === "new" ? "+" : "Δ";
    console.log(`  ${icon} ${r.rel} (${r.currentBytes}B vs ${r.baselineBytes}B, diff: ${pct})`);
  }

  // GitHub Step Summary
  const tableRows = rows
    .map(r => {
      const pct = r.diffPct !== null ? `${r.diffPct.toFixed(1)}%` : "—";
      const icon = r.status === "ok" ? "✅" : r.status === "new" ? "🆕" : "⚠️";
      return `| ${icon} | \`${r.rel}\` | ${r.baselineBytes} | ${r.currentBytes} | ${pct} |`;
    })
    .join("\n");

  const summary = [
    "## Screenshot Diff Report",
    "",
    `> Threshold: **${THRESHOLD}%** size change · Changed: **${changedCount}** · New: **${missingBaseline}**`,
    "",
    "| | File | Baseline (B) | Current (B) | Δ% |",
    "| --- | --- | ---: | ---: | ---: |",
    tableRows,
    "",
    "_Size-based diff only — pixel-level comparison requires a browser runtime._",
  ].join("\n");

  await writeGithubSummary(summary);

  if (changedCount > 0) {
    console.log(`\n⚠️  ${changedCount} screenshot(s) changed by >${THRESHOLD}%. Review the Step Summary for details.`);
  } else {
    console.log("\n✓ All screenshots within threshold.");
  }

  // Always exit 0 — non-blocking
}

main().catch(err => {
  console.error("Screenshot diff error:", err.message);
  // Non-blocking: do not set exitCode
});
