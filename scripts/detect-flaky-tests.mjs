/**
 * detect-flaky-tests.mjs — Flaky test detector and quarantine workflow (M3)
 *
 * Runs the test suite N times and identifies tests that fail intermittently.
 * Outputs a flaky test report to dist/contracts/flaky-tests-report.json.
 *
 * Usage:
 *   node scripts/detect-flaky-tests.mjs [--runs=5] [--suite=source|build|all]
 */

import { spawn } from "node:child_process";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

function parseArgs() {
  const args = process.argv.slice(2);
  let runs = 5;
  let suite = "source";
  for (const arg of args) {
    if (arg.startsWith("--runs=")) runs = parseInt(arg.split("=")[1], 10);
    if (arg.startsWith("--suite=")) suite = arg.split("=")[1];
  }
  return { runs, suite };
}

function runTestSuite(suite) {
  return new Promise((resolve) => {
    const cmd = suite === "build" ? "tests/build/*.test.mjs" : "tests/source/*.test.mjs";
    const proc = spawn("node", ["--test", cmd], { cwd: rootDir, shell: true });
    let output = "";
    const failures = [];

    proc.stdout.on("data", (d) => (output += d.toString()));
    proc.stderr.on("data", (d) => (output += d.toString()));

    proc.on("close", (code) => {
      const failRe = /✖ (.+?) \(/g;
      let m;
      while ((m = failRe.exec(output)) !== null) {
        failures.push(m[1].trim());
      }
      resolve({ exitCode: code, failures });
    });
  });
}

async function main() {
  const { runs, suite } = parseArgs();
  const suitesToRun = suite === "all" ? ["source", "build"] : [suite];

  console.log(`Flaky test detection — ${runs} run(s) of suite: ${suite}`);

  const allResults = [];
  const testFailCounts = {};

  for (let i = 1; i <= runs; i++) {
    console.log(`  Run ${i}/${runs}...`);
    for (const s of suitesToRun) {
      const { failures } = await runTestSuite(s);
      for (const f of failures) {
        testFailCounts[f] = (testFailCounts[f] || 0) + 1;
      }
      allResults.push({ run: i, suite: s, failures });
    }
  }

  const flaky = Object.entries(testFailCounts)
    .filter(([, count]) => count > 0 && count < runs * suitesToRun.length)
    .map(([name, failCount]) => ({ name, failCount, totalRuns: runs * suitesToRun.length }));

  const consistent = Object.entries(testFailCounts)
    .filter(([, count]) => count === runs * suitesToRun.length)
    .map(([name, failCount]) => ({ name, failCount, totalRuns: runs * suitesToRun.length }));

  const report = {
    generatedAt: new Date().toISOString(),
    runs,
    suite,
    flaky,
    consistent,
    summary: {
      flakyCount: flaky.length,
      consistentFailCount: consistent.length,
    },
  };

  const outPath = resolve(rootDir, "dist/contracts/flaky-tests-report.json");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(report, null, 2), "utf8");

  console.log(`\nResults:`);
  console.log(`  Flaky tests: ${flaky.length}`);
  for (const f of flaky) {
    console.log(`    ⚠ "${f.name}" — failed ${f.failCount}/${f.totalRuns} runs`);
  }
  console.log(`  Consistent failures: ${consistent.length}`);
  for (const c of consistent) {
    console.log(`    ✖ "${c.name}" — failed ${c.failCount}/${c.totalRuns} runs`);
  }
  console.log(`Report written: ${outPath}`);
}

main();
