/**
 * a11y-interaction-ci.test.mjs — Scenario-level a11y interaction assertions (M2)
 *
 * Tests that headless contract attributes are correctly structured for
 * screen-reader and keyboard interaction. Validates HTML structure
 * semantics against the headless contract spec.
 */

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const playgroundPath = resolve(process.cwd(), "playground/index.html");

async function getPlaygroundHtml() {
  return readFile(playgroundPath, "utf8");
}

test("a11y: modal has role=dialog and aria-modal", async () => {
  const html = await getPlaygroundHtml();
  assert.ok(html.includes('role="dialog"'), "Modal missing role=dialog");
  assert.ok(html.includes('aria-modal="true"'), "Modal missing aria-modal=true");
  assert.ok(html.includes("aria-labelledby") || html.includes("aria-label"), "Modal missing accessible name");
});

test("a11y: toast-viewport has aria-live region", async () => {
  const html = await getPlaygroundHtml();
  assert.ok(
    html.includes('aria-live="polite"') || html.includes('aria-live="assertive"'),
    "Toast viewport missing aria-live region"
  );
});

test("a11y: accordion triggers have aria-expanded", async () => {
  const html = await getPlaygroundHtml();
  assert.ok(html.includes("aria-expanded"), "Accordion missing aria-expanded attribute");
  assert.ok(html.includes("aria-controls"), "Accordion trigger missing aria-controls");
});

test("a11y: tabs have role=tablist and role=tab", async () => {
  const html = await getPlaygroundHtml();
  assert.ok(html.includes('role="tablist"'), "Missing role=tablist");
  assert.ok(html.includes('role="tab"'), "Missing role=tab");
  assert.ok(html.includes('role="tabpanel"'), "Missing role=tabpanel");
});

test("a11y: breadcrumb has nav landmark with aria-label", async () => {
  const html = await getPlaygroundHtml();
  assert.ok(
    html.includes('aria-label="Breadcrumb"') || html.includes("aria-labelledby"),
    "Breadcrumb nav missing aria-label"
  );
});

test("a11y: icon-buttons have aria-label", async () => {
  const html = await getPlaygroundHtml();
  const iconButtonRegex = /class="icon-button[^"]*"[^>]*>/g;
  const matches = [...html.matchAll(iconButtonRegex)];
  if (matches.length > 0) {
    for (const match of matches) {
      const fragment = html.slice(html.indexOf(match[0]), html.indexOf(match[0]) + 200);
      assert.ok(
        fragment.includes("aria-label") || fragment.includes("aria-labelledby"),
        `Icon button missing aria-label near: ${match[0]}`
      );
    }
  }
});

test("a11y: data-grid or table has accessible name", async () => {
  const html = await getPlaygroundHtml();
  const hasTableLabel =
    html.includes('aria-label') && (html.includes('role="grid"') || html.includes('<table'));
  const hasCaptionInTable = html.includes("<caption");
  assert.ok(hasTableLabel || hasCaptionInTable, "Table/grid missing accessible name or caption");
});

test("a11y: segmented-control group has accessible name", async () => {
  const html = await getPlaygroundHtml();
  if (html.includes("segmented-control")) {
    assert.ok(
      html.includes('role="group"') || html.includes("fieldset"),
      "Segmented control missing role=group or fieldset"
    );
  }
});

test("a11y: split-button toggle exposes menu relationship", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("split-button")) return;

  assert.ok(html.includes('data-split-button-toggle'), "Split button toggle marker missing");
  assert.ok(html.includes('aria-haspopup="menu"'), "Split button toggle missing aria-haspopup=menu");
  assert.ok(html.includes('aria-controls="demo-split-button-menu"'), "Split button toggle missing aria-controls");
  assert.ok(html.includes('id="demo-split-button-menu" class="dropdown-menu-content" data-split-button-menu role="menu"'));
});
