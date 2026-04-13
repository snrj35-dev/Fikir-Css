/**
 * report-contrast-regression.mjs — Contrast regression script (M3)
 *
 * Parses color tokens from the built CSS and checks that critical
 * foreground/background pairs meet WCAG AA contrast requirements (4.5:1 for
 * body text, 3:1 for large text and UI components).
 *
 * Uses WCAG relative luminance formula on oklch-resolved values.
 * Outputs a JSON report to dist/contracts/contrast-regression-report.json.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

function oklchToLinear(l, c, h) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
  const L = l_ ** 3;
  const M = m_ ** 3;
  const S = s_ ** 3;
  const r = 4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S;
  const g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S;
  const bl = -0.0041960863 * L - 0.7034186147 * M + 1.7076147010 * S;
  return [r, g, bl];
}

function linearToLuminance([r, g, b]) {
  const channel = (v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channel(Math.max(0, Math.min(1, r))) +
         0.7152 * channel(Math.max(0, Math.min(1, g))) +
         0.0722 * channel(Math.max(0, Math.min(1, b)));
}

function contrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseOklchValue(str) {
  const match = str.match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/);
  if (!match) return null;
  const l = parseFloat(match[1]) / (str.includes("%") ? 100 : 1);
  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);
  return oklchToLinear(l, c, h);
}

const CRITICAL_PAIRS = [
  { label: "fg-default on bg-default", fgToken: "--color-fg-default", bgToken: "--color-bg-default", minRatio: 4.5 },
  { label: "fg-default on bg-surface", fgToken: "--color-fg-default", bgToken: "--color-bg-surface", minRatio: 4.5 },
  { label: "fg-muted on bg-surface", fgToken: "--color-fg-muted", bgToken: "--color-bg-surface", minRatio: 3.0 },
  { label: "fg-muted on bg-default", fgToken: "--color-fg-muted", bgToken: "--color-bg-default", minRatio: 3.0 },
];

async function extractTokenValues(cssContent) {
  const tokens = {};
  const regex = /(--color-[a-z-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(cssContent)) !== null) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

async function main() {
  const cssPath = resolve(rootDir, "dist/fikir.css");
  let cssContent;
  try {
    cssContent = await readFile(cssPath, "utf8");
  } catch {
    console.error("dist/fikir.css not found — run build first");
    process.exit(1);
  }

  const tokens = await extractTokenValues(cssContent);
  const results = [];
  let hasFailure = false;

  for (const pair of CRITICAL_PAIRS) {
    const fgValue = tokens[pair.fgToken];
    const bgValue = tokens[pair.bgToken];

    if (!fgValue || !bgValue) {
      results.push({ ...pair, status: "skip", reason: "token not resolved" });
      continue;
    }

    const fgRgb = parseOklchValue(fgValue);
    const bgRgb = parseOklchValue(bgValue);

    if (!fgRgb || !bgRgb) {
      results.push({ ...pair, status: "skip", reason: "value not parseable as oklch" });
      continue;
    }

    const fgLum = linearToLuminance(fgRgb);
    const bgLum = linearToLuminance(bgRgb);
    const ratio = contrastRatio(fgLum, bgLum);
    const pass = ratio >= pair.minRatio;

    if (!pass) hasFailure = true;

    results.push({
      label: pair.label,
      fgToken: pair.fgToken,
      bgToken: pair.bgToken,
      minRatio: pair.minRatio,
      actualRatio: parseFloat(ratio.toFixed(2)),
      status: pass ? "pass" : "fail",
    });
  }

  const report = { generatedAt: new Date().toISOString(), results };
  const outPath = resolve(rootDir, "dist/contracts/contrast-regression-report.json");
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(report, null, 2), "utf8");

  console.log("Contrast regression report");
  for (const r of results) {
    const icon = r.status === "pass" ? "[ok]" : r.status === "skip" ? "[skip]" : "[FAIL]";
    const ratio = r.actualRatio ? `${r.actualRatio}:1 (min ${r.minRatio}:1)` : r.reason;
    console.log(`  ${icon} ${r.label}: ${ratio}`);
  }
  console.log(`Report written: ${outPath}`);

  if (hasFailure) process.exit(1);
}

main();
