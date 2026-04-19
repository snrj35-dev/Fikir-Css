/**
 * detect-stale-anatomy.mjs
 *
 * Reports anatomy baseline entries that have been undocumented for a long time.
 *
 * "Stale" means: a CSS component exists in anatomy-drift-baseline.mjs (it has
 * no anatomy.json entry) but it has been present in the codebase for enough
 * time that it should have been documented by now.
 *
 * Staleness is determined by the CSS file's first git-commit date:
 *   - < WARN_DAYS (90):  ignored — newly added, still in grace period
 *   - WARN_DAYS – FAIL_DAYS (90–180): WARNING — should be documented soon
 *   - >= FAIL_DAYS (180): ERROR — long-overdue, exits 1 in --strict mode
 *
 * Usage:
 *   node scripts/detect-stale-anatomy.mjs
 *   node scripts/detect-stale-anatomy.mjs --strict   (exits 1 on stale entries)
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

import { anatomyDriftBaseline } from "../contracts/anatomy-drift-baseline.mjs";

const rootDir = resolve(process.cwd());
const componentsDir = resolve(rootDir, "packages/components");
const reportOutPath = resolve(rootDir, "dist/contracts/stale-anatomy-report.json");

const STRICT = process.argv.includes("--strict");
const WARN_DAYS = 90;
const FAIL_DAYS = 180;

function getFileFirstCommitDate(filePath) {
  try {
    const iso = execSync(
      `git log --follow --diff-filter=A --format=%aI -- "${filePath}"`,
      { cwd: rootDir, encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }
    ).trim().split("\n").pop();
    if (!iso) return null;
    return new Date(iso);
  } catch {
    return null;
  }
}

function daysSince(date) {
  if (!date) return null;
  return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}

async function main() {
  const now = new Date();
  const results = { ok: [], warn: [], error: [] };

  for (const name of anatomyDriftBaseline) {
    const cssPath = resolve(componentsDir, `${name}.css`);
    const firstCommit = getFileFirstCommitDate(cssPath);
    const age = daysSince(firstCommit);

    const entry = {
      name,
      first_commit: firstCommit ? firstCommit.toISOString().split("T")[0] : null,
      age_days: age
    };

    if (age === null || age < WARN_DAYS) {
      results.ok.push(entry);
    } else if (age < FAIL_DAYS) {
      results.warn.push(entry);
    } else {
      results.error.push(entry);
    }
  }

  const report = {
    generated: now.toISOString(),
    thresholds: { warn_days: WARN_DAYS, fail_days: FAIL_DAYS },
    baseline_count: anatomyDriftBaseline.size,
    ok_count: results.ok.length,
    warn_count: results.warn.length,
    error_count: results.error.length,
    ok: results.ok,
    warn: results.warn,
    error: results.error
  };

  await mkdir(resolve(rootDir, "dist/contracts"), { recursive: true });
  await writeFile(reportOutPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

  console.log("Stale anatomy detection");
  console.log(`- baseline components: ${report.baseline_count}`);
  console.log(`- in grace period (<${WARN_DAYS}d):  ${report.ok_count}`);
  console.log(`- warn zone (${WARN_DAYS}–${FAIL_DAYS}d): ${report.warn_count}`);
  console.log(`- stale (>=${FAIL_DAYS}d):     ${report.error_count}`);
  console.log(`- report written: ${reportOutPath}`);

  if (report.warn_count > 0) {
    console.warn(`\nWARN: ${report.warn_count} baseline component(s) undocumented for ${WARN_DAYS}+ days:`);
    for (const e of results.warn) {
      console.warn(`  ⚠ ${e.name} (${e.age_days}d since first commit)`);
    }
  }

  if (report.error_count > 0) {
    const level = STRICT ? "ERROR" : "WARN";
    console.warn(`\n${level}: ${report.error_count} baseline component(s) undocumented for ${FAIL_DAYS}+ days:`);
    for (const e of results.error) {
      console.warn(`  ✗ ${e.name} (${e.age_days}d since first commit)`);
    }
    if (STRICT) {
      process.exitCode = 1;
    }
  }

  await writeGithubSummary(report);
}

async function writeGithubSummary(report) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (!summaryPath) return;

  const lines = ["## Stale Anatomy Report", ""];

  if (report.error_count === 0 && report.warn_count === 0) {
    lines.push("✅ No stale anatomy entries — all baseline components are within grace period.");
  } else {
    lines.push(`| Metric | Count |`);
    lines.push(`| --- | --- |`);
    lines.push(`| Baseline total | ${report.baseline_count} |`);
    lines.push(`| In grace period | ${report.ok_count} |`);
    lines.push(`| Warn (${report.thresholds.warn_days}–${report.thresholds.fail_days}d) | ${report.warn_count} |`);
    lines.push(`| Stale (>=${report.thresholds.fail_days}d) | ${report.error_count} |`);
    lines.push("");
    if (report.error.length > 0) {
      lines.push("### Stale (needs anatomy documentation)");
      for (const e of report.error) {
        lines.push(`- \`${e.name}\` — ${e.age_days} days`);
      }
    }
    if (report.warn.length > 0) {
      lines.push("### Warn (approaching stale threshold)");
      for (const e of report.warn) {
        lines.push(`- \`${e.name}\` — ${e.age_days} days`);
      }
    }
  }

  const { appendFile } = await import("node:fs/promises");
  await appendFile(summaryPath, lines.join("\n") + "\n", "utf8");
}

main();
