import { access, appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { gzipSync } from "node:zlib";

import config from "../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);
const layerReportOutPath = resolve(rootDir, "dist/contracts/bundle-layers-report.json");

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

function extractSingleBlock(css, startIdx) {
  let depth = 0;
  let endIdx = startIdx;
  let inBlock = false;

  for (let i = startIdx; i < css.length; i++) {
    if (css[i] === "{") {
      depth++;
      inBlock = true;
    } else if (css[i] === "}") {
      depth--;
      if (inBlock && depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }

  return css.slice(startIdx, endIdx);
}

function extractLayerBlocks(css, layerNames) {
  const result = {};

  for (const layerName of layerNames) {
    const marker = `@layer ${layerName} {`;
    let searchFrom = 0;
    const allBlocks = [];

    while (true) {
      const startIdx = css.indexOf(marker, searchFrom);
      if (startIdx === -1) break;

      const block = extractSingleBlock(css, startIdx);
      allBlocks.push(block);
      searchFrom = startIdx + block.length;
    }

    if (allBlocks.length === 0) {
      result[layerName] = { found: false, bytes: 0, gzipBytes: 0, percentage: 0, blockCount: 0 };
      continue;
    }

    const combined = allBlocks.join("\n");
    const blockBytes = allBlocks.reduce((sum, b) => sum + Buffer.byteLength(b, "utf8"), 0);
    const blockGzipBytes = gzipSync(combined).length;

    result[layerName] = {
      found: true,
      bytes: blockBytes,
      gzipBytes: blockGzipBytes,
      percentage: 0,
      blockCount: allBlocks.length
    };
  }

  return result;
}

function computePercentages(layers, totalBytes) {
  for (const entry of Object.values(layers)) {
    if (totalBytes > 0) {
      entry.percentage = parseFloat(((entry.bytes / totalBytes) * 100).toFixed(2));
    }
  }
}

function countSelectorsInBlock(block) {
  const matches = block.match(/\.[a-zA-Z\\][a-zA-Z0-9_:\\-]*\s*\{/g);
  return matches ? matches.length : 0;
}

function countSelectorsPerLayer(css, layerNames, layers) {
  for (const layerName of layerNames) {
    const marker = `@layer ${layerName} {`;
    let searchFrom = 0;
    let totalCount = 0;

    while (true) {
      const startIdx = css.indexOf(marker, searchFrom);
      if (startIdx === -1) break;

      const block = extractSingleBlock(css, startIdx);
      totalCount += countSelectorsInBlock(block);
      searchFrom = startIdx + block.length;
    }

    layers[layerName].selectorCount = totalCount;
  }
}

async function writeGithubSummary(report) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;

  if (!summaryPath) return;

  const lines = [
    "## CSS Bundle Layer Contribution Report",
    "",
    `**Total CSS:** ${report.totalBytes} bytes (${report.totalGzipBytes} bytes gzip)`,
    "",
    "| Layer | Bytes | Gzip Bytes | % of Total | Selectors |",
    "| --- | ---: | ---: | ---: | ---: |"
  ];

  for (const [name, entry] of Object.entries(report.layers)) {
    const foundStr = entry.found ? "" : " *(missing)*";
    lines.push(
      `| \`${name}\`${foundStr} | ${entry.bytes} | ${entry.gzipBytes} | ${entry.percentage}% | ${entry.selectorCount ?? "-"} |`
    );
  }

  lines.push("");

  await appendFile(summaryPath, `${lines.join("\n")}\n`, "utf8");
}

async function main() {
  if (!(await fileExists(distCssPath))) {
    console.log("dist CSS not found. Run `npm run build` first.");
    process.exitCode = 1;
    return;
  }

  const css = await readFile(distCssPath, "utf8");
  const totalBytes = Buffer.byteLength(css, "utf8");
  const totalGzipBytes = gzipSync(css).length;
  const layerNames = config.layers;

  const layers = extractLayerBlocks(css, layerNames);
  computePercentages(layers, totalBytes);
  countSelectorsPerLayer(css, layerNames, layers);

  const report = {
    generatedAt: new Date().toISOString(),
    file: config.build.cssOutFile,
    totalBytes,
    totalGzipBytes,
    layerCount: layerNames.length,
    layers
  };

  await writeFileEnsured(layerReportOutPath, `${JSON.stringify(report, null, 2)}\n`);

  console.log("Bundle layer contribution report");
  console.log(`- file: ${config.build.cssOutFile}`);
  console.log(`- total bytes: ${totalBytes}`);
  console.log(`- total gzip bytes: ${totalGzipBytes}`);
  console.log(`- layers analyzed: ${layerNames.join(", ")}`);
  console.log("");

  let layerTable = "";

  for (const [name, entry] of Object.entries(layers)) {
    const status = entry.found ? "ok" : "MISSING";
    layerTable += `  [${status}] ${name}: ${entry.bytes} bytes (${entry.percentage}%), ${entry.selectorCount ?? 0} selectors\n`;
  }

  process.stdout.write(layerTable);
  console.log(`\nReport written: ${layerReportOutPath}`);

  await writeGithubSummary(report);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
