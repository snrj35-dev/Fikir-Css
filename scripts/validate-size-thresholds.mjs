import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const sizeReportPath = resolve(rootDir, "dist/contracts/size-report.json");

const MAX_BUNDLE_BYTES = Number(process.env.MAX_BUNDLE_BYTES ?? 100000);
const MAX_DIFF_BYTES = Number(process.env.MAX_DIFF_BYTES ?? 8000);

function formatSigned(value) {
  return value >= 0 ? `+${value}` : `${value}`;
}

async function main() {
  const reportRaw = await readFile(sizeReportPath, "utf8");
  const report = JSON.parse(reportRaw);

  const failures = [];

  if (report.bytes > MAX_BUNDLE_BYTES) {
    failures.push(
      `bundle size ${report.bytes} exceeds MAX_BUNDLE_BYTES=${MAX_BUNDLE_BYTES}`
    );
  }

  if (report.diffBytes > MAX_DIFF_BYTES) {
    failures.push(
      `size diff ${formatSigned(report.diffBytes)} exceeds MAX_DIFF_BYTES=${MAX_DIFF_BYTES}`
    );
  }

  console.log(
    [
      `bundle bytes: ${report.bytes}`,
      `previous bytes: ${report.previousBytes}`,
      `diff bytes: ${formatSigned(report.diffBytes)}`,
      `thresholds => max bytes: ${MAX_BUNDLE_BYTES}, max positive diff: ${MAX_DIFF_BYTES}`
    ].join("\n")
  );

  if (failures.length > 0) {
    throw new Error(failures.join("\n"));
  }

  console.log("bundle size thresholds passed");
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
