import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";
import { gzipSync } from "node:zlib";

import config from "../../fikir.config.mjs";

const rootDir = resolve(process.cwd());
const distCssPath = resolve(rootDir, config.build.cssOutFile);
const sizeReportPath = resolve(rootDir, config.build.sizeReportOutFile);

async function readJson(path) {
  const content = await readFile(path, "utf8");
  return JSON.parse(content);
}

test("dist size report presence: report exists and contains required fields", async () => {
  const report = await readJson(sizeReportPath);

  assert.equal(report.file, config.build.cssOutFile);
  assert.equal(report.namingMode, config.naming.mode);
  assert.equal(typeof report.bytes, "number");
  assert.equal(typeof report.previousBytes, "number");
  assert.equal(typeof report.diffBytes, "number");
  assert.equal(typeof report.gzipBytes, "number");
  assert.equal(typeof report.previousGzipBytes, "number");
  assert.equal(typeof report.diffGzipBytes, "number");
  assert.ok(report.bytes > 0);
  assert.ok(report.gzipBytes > 0);
});

test("dist size report presence: byte count matches current dist/fikir.css", async () => {
  const report = await readJson(sizeReportPath);
  const distCss = await readFile(distCssPath, "utf8");

  assert.equal(report.bytes, Buffer.byteLength(distCss, "utf8"));
  assert.equal(report.gzipBytes, gzipSync(distCss).length);
});
