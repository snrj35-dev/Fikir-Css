/**
 * empty-search-state-pattern-contract.test.mjs — Empty search state pattern contract (M16)
 *
 * Validates that empty search state HTML structures in playground satisfy
 * pattern and accessibility contracts. These are structural tests; full
 * browser behavior requires browser-level runner.
 */

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const dataDisplayPath = resolve(
  process.cwd(),
  "playground/data-display-example.html"
);

async function getDataDisplayHtml() {
  return readFile(dataDisplayPath, "utf8");
}

test("empty-search-state: pattern identifier is present", async () => {
  const html = await getDataDisplayHtml();
  assert.ok(
    html.includes('data-pattern="empty-search-state"'),
    "Data display example should contain empty-search-state pattern"
  );
});

test("empty-search-state: first-use variant exists", async () => {
  const html = await getDataDisplayHtml();
  assert.ok(
    html.includes('data-variant="first-use"'),
    "Should include first-use variant"
  );
});

test("empty-search-state: no-results variant exists", async () => {
  const html = await getDataDisplayHtml();
  assert.ok(
    html.includes('data-variant="no-results"'),
    "Should include no-results variant"
  );
});

test("empty-search-state: filtered-empty variant exists", async () => {
  const html = await getDataDisplayHtml();
  assert.ok(
    html.includes('data-variant="filtered-empty"'),
    "Should include filtered-empty variant"
  );
});

test("empty-search-state: icon slot present", async () => {
  const html = await getDataDisplayHtml();
  if (!html.includes('data-pattern="empty-search-state"')) return;
  assert.ok(
    html.includes('data-slot="icon"'),
    "Pattern should have icon slot"
  );
});

test("empty-search-state: title slot present", async () => {
  const html = await getDataDisplayHtml();
  if (!html.includes('data-pattern="empty-search-state"')) return;
  assert.ok(
    html.includes('data-slot="title"'),
    "Pattern should have title slot"
  );
});

test("empty-search-state: description slot present", async () => {
  const html = await getDataDisplayHtml();
  if (!html.includes('data-pattern="empty-search-state"')) return;
  assert.ok(
    html.includes('data-slot="description"'),
    "Pattern should have description slot"
  );
});

test("empty-search-state: actions slot present in no-results", async () => {
  const html = await getDataDisplayHtml();
  if (!html.includes('data-variant="no-results"')) return;
  // Check if there's at least one actions slot
  assert.ok(
    html.includes('data-slot="actions"'),
    "no-results variant should have actions slot"
  );
});

test("empty-search-state: icon has aria-hidden", async () => {
  const html = await getDataDisplayHtml();
  if (!html.includes('data-pattern="empty-search-state"')) return;
  assert.ok(
    html.includes('aria-hidden="true"'),
    "Icons should be marked as aria-hidden"
  );
});

test("empty-search-state: buttons are keyboard accessible", async () => {
  const html = await getDataDisplayHtml();
  if (!html.includes('data-pattern="empty-search-state"')) return;
  // Check that if there are action buttons, they're <button> elements
  const hasActions = html.includes('data-slot="actions"');
  if (hasActions) {
    assert.ok(
      html.match(/<button[^>]*class="[^"]*btn[^"]*"[^>]*type="button"/),
      "Action buttons should be proper button elements"
    );
  }
});
