import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());

async function readPlaygroundFile(fileName) {
  return readFile(resolve(rootDir, "playground", fileName), "utf8");
}

test("playground examples: form validation page exists with semantic invalid wiring", async () => {
  const html = await readPlaygroundFile("form-validation-example.html");

  assert.ok(html.includes("Form Validation Example"));
  assert.ok(html.includes('class="field"'));
  assert.ok(html.includes('aria-invalid="true"'));
  assert.ok(html.includes('class="error-text"'));
});

test("playground examples: app-shell refinement page includes shell + toolbar pattern", async () => {
  const html = await readPlaygroundFile("app-shell-example.html");

  assert.ok(html.includes('class="app-shell"'));
  assert.ok(html.includes('class="breadcrumb"'));
  assert.ok(html.includes('data-pattern="data-table-toolbar"'));
});

test("playground examples: data display page includes table, empty-state, and data-grid", async () => {
  const html = await readPlaygroundFile("data-display-example.html");

  assert.ok(html.includes('class="table"'));
  assert.ok(html.includes('class="empty-state"'));
  assert.ok(html.includes('class="data-grid"'));
});

test("playground examples: accessibility notes page includes icon-only naming guidance", async () => {
  const html = await readPlaygroundFile("accessibility-notes.html");

  assert.ok(html.includes("Accessibility-focused Example Notes"));
  assert.ok(html.includes('class="icon-button'));
  assert.ok(html.includes('aria-label="Open quick menu"'));
});

test("playground examples: dashboard and settings pages exist with expected product patterns", async () => {
  const dashboard = await readPlaygroundFile("dashboard-example.html");
  const settings = await readPlaygroundFile("settings-example.html");

  assert.ok(dashboard.includes("Dashboard Example"));
  assert.ok(dashboard.includes('class="app-shell"'));
  assert.ok(dashboard.includes('class="stat"'));

  assert.ok(settings.includes("Settings Page Example"));
  assert.ok(settings.includes('data-pattern="settings-panel"'));
  assert.ok(settings.includes('class="section-block"'));
});

test("playground examples: data table workflow page includes toolbar-to-table relationship", async () => {
  const html = await readPlaygroundFile("data-table-workflow-example.html");

  assert.ok(html.includes("Data Table Workflow Example"));
  assert.ok(html.includes('data-pattern="data-table-toolbar"'));
  assert.ok(html.includes('aria-controls="issues-table"'));
  assert.ok(html.includes('id="issues-table"'));
});
