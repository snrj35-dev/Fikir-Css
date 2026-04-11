import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const gettingStartedPath = resolve(rootDir, "playground/getting-started.html");

test("getting-started page: file exists and references dist CSS", async () => {
  const html = await readFile(gettingStartedPath, "utf8");

  assert.ok(html.includes('<link rel="stylesheet" href="../dist/fikir.css" />'));
  assert.ok(html.includes("Fikir CSS Minimal Getting Started"));
});

test("getting-started page: uses supported core surface classes", async () => {
  const html = await readFile(gettingStartedPath, "utf8");

  const markers = [
    'class="button"',
    'class="badge"',
    'class="alert alert-info"',
    'class="field"',
    'class="label"',
    'class="input"',
    'class="helper-text"',
    'class="error-text"'
  ];

  for (const marker of markers) {
    assert.ok(html.includes(marker), `Missing marker: ${marker}`);
  }
});
