import { access, appendFile, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const sizeReportPath = resolve(rootDir, "dist/contracts/size-report.json");

function formatSigned(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function writeGithubSummary(report) {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;

  if (!summaryPath) return;

  const markdown = [
    "## CSS Bundle Size Report",
    "",
    "| Metric | Value |",
    "| --- | ---: |",
    `| Current bytes | ${report.bytes} |`,
    `| Previous bytes | ${report.previousBytes} |`,
    `| Diff bytes | ${formatSigned(report.diffBytes)} |`,
    `| Current gzip bytes | ${report.gzipBytes} |`,
    `| Previous gzip bytes | ${report.previousGzipBytes} |`,
    `| Diff gzip bytes | ${formatSigned(report.diffGzipBytes)} |`,
    ""
  ].join("\n");

  await appendFile(summaryPath, `${markdown}\n`, "utf8");
}

async function main() {
  if (!(await fileExists(sizeReportPath))) {
    console.log("size report not found (run npm run build first).");
    return;
  }

  const reportRaw = await readFile(sizeReportPath, "utf8");
  const report = JSON.parse(reportRaw);
  const signedDiff = formatSigned(report.diffBytes);

  console.log("CSS size diff report");
  console.log(`- file: ${report.file}`);
  console.log(`- current bytes: ${report.bytes}`);
  console.log(`- previous bytes: ${report.previousBytes}`);
  console.log(`- diff bytes: ${signedDiff}`);
  console.log(`- current gzip bytes: ${report.gzipBytes}`);
  console.log(`- previous gzip bytes: ${report.previousGzipBytes}`);
  console.log(`- diff gzip bytes: ${formatSigned(report.diffGzipBytes)}`);

  await writeGithubSummary(report);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
