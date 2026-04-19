/**
 * subpath-exports.test.mjs — M19.2 (P1)
 * Verifies that every subpath export declared in package.json resolves
 * to a readable, non-empty file. No bundler required.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createRequire } from "node:module";

const pkg = JSON.parse(
  await readFile(new URL("../../package.json", import.meta.url), "utf8")
);

const ROOT = resolve(process.cwd());

// All subpath exports that map to a single file (string value)
const fileExports = Object.entries(pkg.exports)
  .flatMap(([key, value]) => {
    if (typeof value === "string") return [{ key, path: value }];
    // Object with "default" or "types"
    return Object.entries(value).map(([cond, path]) => ({ key: `${key}[${cond}]`, path }));
  })
  .filter(({ path }) => typeof path === "string");

for (const { key, path } of fileExports) {
  test(`export "${key}" → ${path} is non-empty`, async () => {
    const abs = resolve(ROOT, path);
    let content;
    try {
      content = await readFile(abs, "utf8");
    } catch (err) {
      assert.fail(`Cannot read export target: ${path} — ${err.message}`);
    }
    assert.ok(content.length > 0, `Export target is empty: ${path}`);
  });
}
