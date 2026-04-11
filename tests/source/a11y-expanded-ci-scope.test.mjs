import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());

async function readPlayground(fileName) {
  return readFile(resolve(rootDir, "playground", fileName), "utf8");
}

test("a11y expanded scope: settings workflow includes validation semantics", async () => {
  const html = await readPlayground("settings-workflow-example.html");

  assert.ok(html.includes('aria-invalid="true"'));
  assert.ok(html.includes('class="error-text"'));
  assert.ok(html.includes('class="switch"'));
});

test("a11y expanded scope: tree-table workflow includes tree and table semantics", async () => {
  const html = await readPlayground("tree-table-workflow-example.html");

  assert.ok(html.includes('role="tree"'));
  assert.ok(html.includes('role="treeitem"'));
  assert.ok(html.includes('aria-expanded="true"'));
  assert.ok(html.includes('aria-label="Enterprise accounts table"'));
});

test("a11y expanded scope: result and toast pages include status messaging semantics", async () => {
  const resultHtml = await readPlayground("result-status-example.html");
  const toastHtml = await readPlayground("toast-example.html");

  assert.ok(resultHtml.includes('aria-label="Payment success result"'));
  assert.ok(resultHtml.includes('aria-label="Upload failure result"'));

  assert.ok(toastHtml.includes('aria-live="polite"'));
  assert.ok(toastHtml.includes('role="status"'));
  assert.ok(toastHtml.includes('aria-label="Billing action failed"'));
});
