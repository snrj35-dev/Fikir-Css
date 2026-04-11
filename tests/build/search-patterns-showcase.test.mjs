import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const playgroundIndexPath = resolve(rootDir, "playground/index.html");

test("search patterns showcase: playground includes command-bar pattern section", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("32) Command Bar + Filter Bar Composite"));
  assert.ok(html.includes('data-pattern="command-bar"'));
  assert.ok(html.includes('class="search-box"'));
  assert.ok(html.includes("Quick open"));
});

test("search patterns showcase: playground includes filter-bar implementation", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('data-pattern="filter-bar"'));
  assert.ok(html.includes('id="demo-filter-status" class="select"'));
  assert.ok(html.includes("Apply"));
  assert.ok(html.includes("Reset"));
});

test("search patterns showcase: playground includes search-filter composite summary", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('data-pattern="search-filter-composite"'));
  assert.ok(html.includes("12 results"));
  assert.ok(html.includes('aria-label="Composite result snapshot"'));
});
