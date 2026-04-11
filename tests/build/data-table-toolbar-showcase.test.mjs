import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const playgroundIndexPath = resolve(rootDir, "playground/index.html");

test("data table toolbar showcase: playground includes pattern section", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes("33) Data Table Toolbar Pattern"));
  assert.ok(html.includes('data-pattern="data-table-toolbar"'));
});

test("data table toolbar showcase: implementation uses current class surface", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('class="search-box"'));
  assert.ok(html.includes('id="demo-table-status-filter" class="select"'));
  assert.ok(html.includes('class="btn btn-outline btn-sm"'));
  assert.ok(html.includes('class="table"'));
  assert.ok(html.includes('class="table-row" data-row-selected="true"'));
});

test("data table toolbar showcase: accessibility link to controlled table exists", async () => {
  const html = await readFile(playgroundIndexPath, "utf8");

  assert.ok(html.includes('id="demo-issues-table"'));
  assert.ok(html.includes('aria-controls="demo-issues-table"'));
  assert.ok(html.includes('aria-label="Issue table snapshot"'));
});
