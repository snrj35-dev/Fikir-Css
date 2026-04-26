/**
 * validate-cdn-urls.mjs
 *
 * Scans current docs/examples for Fikir CSS CDN URLs on unpkg and jsDelivr,
 * verifies pinned versions are current, and checks that each URL resolves.
 */

import { readFile, readdir, stat } from "node:fs/promises";
import { resolve, relative } from "node:path";

const rootDir = resolve(process.cwd());
const packageJsonPath = resolve(rootDir, "package.json");
const CDN_URL_PATTERN = /https:\/\/(?:unpkg\.com\/fikir-css@[\w.-]+\/[^\s"'`()<>]+|cdn\.jsdelivr\.net\/npm\/fikir-css@[\w.-]+\/[^\s"'`()<>]+)/gu;
const ALLOWED_CHANNELS = new Set(["latest", "beta", "rc"]);
const scanTargets = [
  "README.md",
  "docs/getting-started.md",
  "docs/guides",
  "docs/patterns",
  "examples",
  "playground",
  "site/index.html"
];

let errors = 0;

function fail(message) {
  console.error(`  ✗ ${message}`);
  errors++;
}

function pass(message) {
  console.log(`  ✓ ${message}`);
}

async function readPackageVersion() {
  const raw = await readFile(packageJsonPath, "utf8");
  return JSON.parse(raw).version;
}

async function walkFiles(targetPath, results) {
  let targetStat;
  try {
    targetStat = await stat(targetPath);
  } catch {
    return;
  }

  if (targetStat.isDirectory()) {
    const children = await readdir(targetPath);
    for (const child of children) {
      await walkFiles(resolve(targetPath, child), results);
    }
    return;
  }

  results.push(targetPath);
}

function extractVersion(url) {
  const parsed = new URL(url);
  const match = parsed.hostname === "unpkg.com"
    ? parsed.pathname.match(/^\/fikir-css@([^/]+)\//u)
    : parsed.pathname.match(/^\/npm\/fikir-css@([^/]+)\//u);
  return match?.[1] || null;
}

function versionIsAllowed(version, packageVersion) {
  return version === packageVersion || ALLOWED_CHANNELS.has(version);
}

async function fetchUrl(url) {
  const headers = { "user-agent": "fikir-css-cdn-validator/1.0" };
  let response;

  try {
    response = await fetch(url, { method: "HEAD", redirect: "follow", headers });
    if (response.ok) return response;
  } catch {
    // Fall back to GET below.
  }

  return fetch(url, { method: "GET", redirect: "follow", headers });
}

async function main() {
  const packageVersion = await readPackageVersion();
  const files = [];

  for (const target of scanTargets) {
    await walkFiles(resolve(rootDir, target), files);
  }

  const urlUsage = new Map();
  for (const filePath of files) {
    const text = await readFile(filePath, "utf8");
    const matches = text.match(CDN_URL_PATTERN) || [];
    for (const url of matches) {
      if (!urlUsage.has(url)) urlUsage.set(url, new Set());
      urlUsage.get(url).add(relative(rootDir, filePath));
    }
  }

  if (urlUsage.size === 0) {
    pass("No unpkg/jsDelivr Fikir CSS URLs found in current docs/examples.");
    return;
  }

  console.log("Validating CDN URLs...");

  for (const [url, filesForUrl] of [...urlUsage.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const version = extractVersion(url);
    if (!version) {
      fail(`Could not parse package version from ${url}`);
      continue;
    }

    if (!versionIsAllowed(version, packageVersion)) {
      fail(`${url} pins version "${version}" but package.json is "${packageVersion}" (${[...filesForUrl].join(", ")})`);
      continue;
    }

    let response;
    try {
      response = await fetchUrl(url);
    } catch (error) {
      fail(`${url} request failed: ${error.message}`);
      continue;
    }

    if (!response.ok) {
      fail(`${url} returned HTTP ${response.status} (${[...filesForUrl].join(", ")})`);
      continue;
    }

    pass(`${response.status} ${url} (${[...filesForUrl].join(", ")})`);
  }

  if (errors > 0) {
    console.error(`\nFAILED — ${errors} CDN URL issue(s) found`);
    process.exitCode = 1;
    return;
  }

  console.log(`\nPASSED — ${urlUsage.size} CDN URL(s) validated`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
