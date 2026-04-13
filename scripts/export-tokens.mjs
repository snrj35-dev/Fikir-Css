/**
 * export-tokens.mjs
 *
 * Extracts CSS custom properties from core.css and semantic.css and writes
 * dist/tokens.json in W3C Design Token Community Group (DTCG) format.
 *
 * Usage:
 *   node scripts/export-tokens.mjs
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const rootDir = resolve(process.cwd());
const outFile = resolve(rootDir, "dist/tokens.json");

const TOKEN_SOURCES = [
  resolve(rootDir, "packages/tokens/core.css"),
  resolve(rootDir, "packages/tokens/semantic.css"),
];

function inferType(name, value) {
  if (name.startsWith("--color-")) return "color";
  if (name.startsWith("--space-")) return "dimension";
  if (name.startsWith("--font-size-")) return "dimension";
  if (name.startsWith("--radius-")) return "dimension";
  if (name.startsWith("--shadow-")) return "shadow";
  if (name.startsWith("--container-")) return "dimension";
  return "string";
}

function camelKey(varName) {
  return varName
    .replace(/^--/, "")
    .replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function groupKey(name) {
  const stripped = name.replace(/^--/, "");
  const parts = stripped.split("-");
  return parts[0]; // e.g. "color", "space", "font", "radius", "shadow"
}

async function extractTokens(cssPath) {
  const css = await readFile(cssPath, "utf8");
  const tokens = {};
  for (const match of css.matchAll(/\s*(--[\w-]+)\s*:\s*([^;}\n]+)/g)) {
    const name = match[1].trim();
    const value = match[2].trim();
    tokens[name] = value;
  }
  return tokens;
}

async function main() {
  const rawTokens = {};
  for (const src of TOKEN_SOURCES) {
    Object.assign(rawTokens, await extractTokens(src));
  }

  const dtcg = {};

  for (const [name, value] of Object.entries(rawTokens)) {
    const group = groupKey(name);
    const key = camelKey(name);
    const type = inferType(name, value);

    if (!dtcg[group]) dtcg[group] = {};
    dtcg[group][key] = { $value: value, $type: type };
  }

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, JSON.stringify(dtcg, null, 2), "utf8");

  const count = Object.values(dtcg).reduce((n, g) => n + Object.keys(g).length, 0);
  console.log(`Tokens exported: ${count} tokens → dist/tokens.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
