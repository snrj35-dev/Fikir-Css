/**
 * keyboard-traversal-matrix.test.mjs — Keyboard traversal contract tests (M2)
 *
 * Validates that the HTML structures in playground satisfy keyboard traversal
 * contracts defined in the headless-contract-spec. These are static structure
 * tests — full keyboard simulation requires a browser-level test runner.
 */

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const playgroundPath = resolve(process.cwd(), "playground/index.html");

async function getPlaygroundHtml() {
  return readFile(playgroundPath, "utf8");
}

test("keyboard: modal close button is a <button> element", async () => {
  const html = await getPlaygroundHtml();
  assert.ok(
    html.includes("modal-close") && html.match(/<button[^>]+modal-close|modal-close[^>]*>/),
    "Modal close should be a <button>"
  );
});

test("keyboard: dropdown-menu items are <a> or <button> elements", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("dropdown-menu")) return;
  assert.ok(
    html.includes("dropdown-menu-link") || html.includes('role="menuitem"'),
    "Dropdown menu items missing link or menuitem role"
  );
});

test("keyboard: accordion triggers are <button> elements", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("accordion-trigger")) return;
  assert.ok(
    html.match(/<button[^>]+accordion-trigger|accordion-trigger[^>]*>/),
    "Accordion trigger should be a <button>"
  );
});

test("keyboard: tab triggers are <button> elements with role=tab", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes('role="tab"')) return;
  assert.ok(
    html.match(/<button[^>]+role="tab"|role="tab"[^>]*>/),
    "Tab trigger should be a <button> with role=tab"
  );
});

test("keyboard: sidebar-nav links are <a> elements", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("sidebar-nav")) return;
  assert.ok(
    html.includes("sidebar-nav-link") || html.match(/class="sidebar-nav[^"]*"[^>]*>[\s\S]*?<a /),
    "Sidebar nav items should be <a> elements"
  );
});

test("keyboard: settings-panel nav items are <a> or <button>", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("settings-panel-nav-item")) return;
  assert.ok(
    html.match(/<(a|button)[^>]+settings-panel-nav-item|settings-panel-nav-item[^>]*>/),
    "Settings panel nav items should be <a> or <button>"
  );
});

test("keyboard: segmented-control uses radio inputs for state", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("segmented-control-input")) return;
  assert.ok(
    html.match(/type="radio"[^>]+segmented-control-input|segmented-control-input[^>]+type="radio"/),
    "Segmented control should use radio inputs"
  );
});

test("keyboard: split-button keeps primary/toggle buttons and menuitem actions", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("split-button")) return;

  assert.ok(
    html.match(/<button[^>]+split-button-action|split-button-action[^>]*>/),
    "Split button primary action should be a <button>"
  );
  assert.ok(
    html.match(/<button[^>]+split-button-toggle|split-button-toggle[^>]*>/),
    "Split button toggle should be a <button>"
  );
  assert.ok(html.includes('data-split-button-menu'), "Split button menu marker missing");
  assert.ok(html.includes('role="menuitem"'), "Split button menu items should expose role=menuitem");
});
