import { access, appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

import { namingContract } from "../contracts/naming.contract.mjs";

const rootDir = resolve(process.cwd());
const selectorsManifestPath = resolve(rootDir, "dist/contracts/selectors.json");
const driftReportOutPath = resolve(rootDir, "dist/contracts/contract-drift-report.json");
const snapshotPath = resolve(rootDir, ".generated/contract-snapshot.json");

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function writeFileEnsured(path, content) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf8");
}

function extractCurrentContractKeys(contract) {
  const keys = {};

  for (const [key, descriptor] of Object.entries(contract.selectors)) {
    keys[key] = {
      domain: descriptor.domain,
      base: descriptor.base,
      deprecated: descriptor.deprecated ?? false
    };
  }

  return keys;
}

function diffContractKeys(previous, current) {
  const prevKeys = new Set(Object.keys(previous));
  const currKeys = new Set(Object.keys(current));

  const added = [...currKeys].filter((k) => !prevKeys.has(k)).map((k) => ({
    key: k,
    domain: current[k].domain,
    base: current[k].base
  }));

  const removed = [...prevKeys].filter((k) => !currKeys.has(k)).map((k) => ({
    key: k,
    domain: previous[k].domain,
    base: previous[k].base
  }));

  const changed = [];

  for (const key of [...currKeys]) {
    if (!prevKeys.has(key)) continue;

    const prev = previous[key];
    const curr = current[key];

    if (prev.base !== curr.base || prev.domain !== curr.domain) {
      changed.push({
        key,
        previousBase: prev.base,
        currentBase: curr.base,
        previousDomain: prev.domain,
        currentDomain: curr.domain
      });
    }
  }

  const deprecatedNew = [...currKeys].filter(
    (k) => current[k].deprecated && !(previous[k] && previous[k].deprecated)
  ).map((k) => ({
    key: k,
    base: current[k].base,
    domain: current[k].domain
  }));

  return { added, removed, changed, deprecatedNew };
}

async function writeGithubSummary(drift) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;

  if (!summaryPath) return;

  const lines = ["## Contract Drift Report", ""];

  if (drift.added.length === 0 && drift.removed.length === 0 && drift.changed.length === 0 && drift.deprecatedNew.length === 0) {
    lines.push("No contract drift detected.");
  } else {
    if (drift.added.length > 0) {
      lines.push(`### Added (${drift.added.length})`);
      lines.push("| Key | Domain | Base |");
      lines.push("| --- | --- | --- |");
      for (const entry of drift.added) {
        lines.push(`| \`${entry.key}\` | ${entry.domain} | \`${entry.base}\` |`);
      }
      lines.push("");
    }

    if (drift.removed.length > 0) {
      lines.push(`### Removed (${drift.removed.length}) ⚠️`);
      lines.push("| Key | Domain | Base |");
      lines.push("| --- | --- | --- |");
      for (const entry of drift.removed) {
        lines.push(`| \`${entry.key}\` | ${entry.domain} | \`${entry.base}\` |`);
      }
      lines.push("");
    }

    if (drift.changed.length > 0) {
      lines.push(`### Changed (${drift.changed.length}) ⚠️`);
      lines.push("| Key | Previous Base | Current Base |");
      lines.push("| --- | --- | --- |");
      for (const entry of drift.changed) {
        lines.push(`| \`${entry.key}\` | \`${entry.previousBase}\` | \`${entry.currentBase}\` |`);
      }
      lines.push("");
    }

    if (drift.deprecatedNew.length > 0) {
      lines.push(`### Newly Deprecated (${drift.deprecatedNew.length})`);
      lines.push("| Key | Domain | Base |");
      lines.push("| --- | --- | --- |");
      for (const entry of drift.deprecatedNew) {
        lines.push(`| \`${entry.key}\` | ${entry.domain} | \`${entry.base}\` |`);
      }
      lines.push("");
    }
  }

  await appendFile(summaryPath, `${lines.join("\n")}\n`, "utf8");
}

async function main() {
  const currentKeys = extractCurrentContractKeys(namingContract);
  const totalKeys = Object.keys(currentKeys).length;

  let previous = {};
  let hasSnapshot = false;

  if (await fileExists(snapshotPath)) {
    try {
      previous = JSON.parse(await readFile(snapshotPath, "utf8"));
      hasSnapshot = true;
    } catch {
      console.warn("Warning: could not parse contract snapshot. Treating as empty baseline.");
    }
  }

  const drift = diffContractKeys(previous, currentKeys);

  const report = {
    generatedAt: new Date().toISOString(),
    totalKeys,
    hasSnapshot,
    snapshotPath: hasSnapshot ? snapshotPath : null,
    summary: {
      added: drift.added.length,
      removed: drift.removed.length,
      changed: drift.changed.length,
      deprecatedNew: drift.deprecatedNew.length
    },
    drift
  };

  await writeFileEnsured(driftReportOutPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log("Contract drift report");
  console.log(`- total keys: ${totalKeys}`);
  console.log(`- snapshot available: ${hasSnapshot}`);
  console.log(`- added: ${drift.added.length}`);
  console.log(`- removed: ${drift.removed.length}`);
  console.log(`- changed: ${drift.changed.length}`);
  console.log(`- newly deprecated: ${drift.deprecatedNew.length}`);
  console.log(`- report written: ${driftReportOutPath}`);

  if (drift.removed.length > 0) {
    console.warn(`\nWARN: ${drift.removed.length} selector key(s) removed:`);
    for (const entry of drift.removed) {
      console.warn(`  - ${entry.key} (base: ${entry.base})`);
    }
  }

  if (drift.changed.length > 0) {
    console.warn(`\nWARN: ${drift.changed.length} selector key(s) changed:`);
    for (const entry of drift.changed) {
      console.warn(`  - ${entry.key}: ${entry.previousBase} -> ${entry.currentBase}`);
    }
  }

  await writeGithubSummary(drift);

  await writeFileEnsured(snapshotPath, `${JSON.stringify(currentKeys, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
