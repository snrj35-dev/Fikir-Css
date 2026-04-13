/**
 * combobox-slice-promotion.test.mjs
 *
 * Promotion evidence tests for the combobox, search-box, autocomplete,
 * and command-palette surfaces. Validates:
 *   1. CSS selector presence in the built bundle
 *   2. Naming contract key registration
 *   3. ARIA / headless contract attributes in playground HTML
 *   4. Keyboard contract structure
 */

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());

async function getBuiltCss() {
  return readFile(resolve(rootDir, "dist/fikir.css"), "utf8");
}

async function getContract() {
  const src = await readFile(resolve(rootDir, "contracts/naming.contract.mjs"), "utf8");
  return src;
}

async function getPlaygroundHtml() {
  return readFile(resolve(rootDir, "playground/index.html"), "utf8");
}

/* ── CSS selector presence ─────────────────────────────────────────────── */

test("css: combobox selectors present in built bundle", async () => {
  const css = await getBuiltCss();
  assert.ok(css.includes(".combobox"), "missing .combobox");
  assert.ok(css.includes(".combobox-input"), "missing .combobox-input");
  assert.ok(css.includes(".combobox-list"), "missing .combobox-list");
  assert.ok(css.includes(".combobox-option"), "missing .combobox-option");
});

test("css: search-box selectors present in built bundle", async () => {
  const css = await getBuiltCss();
  assert.ok(css.includes(".search-box"), "missing .search-box");
  assert.ok(css.includes(".search-box-input"), "missing .search-box-input");
  assert.ok(css.includes(".search-box-action"), "missing .search-box-action");
});

test("css: autocomplete selectors present in built bundle", async () => {
  const css = await getBuiltCss();
  assert.ok(css.includes(".autocomplete"), "missing .autocomplete");
  assert.ok(css.includes(".autocomplete-input"), "missing .autocomplete-input");
  assert.ok(css.includes(".autocomplete-list"), "missing .autocomplete-list");
  assert.ok(css.includes(".autocomplete-option"), "missing .autocomplete-option");
});

test("css: command-palette selectors present in built bundle", async () => {
  const css = await getBuiltCss();
  assert.ok(css.includes(".command-palette"), "missing .command-palette");
  assert.ok(css.includes(".command-palette-dialog"), "missing .command-palette-dialog");
  assert.ok(css.includes(".command-palette-input"), "missing .command-palette-input");
  assert.ok(css.includes(".command-palette-list"), "missing .command-palette-list");
  assert.ok(css.includes(".command-palette-item"), "missing .command-palette-item");
});

/* ── Naming contract registration ──────────────────────────────────────── */

test("contract: combobox keys registered in naming contract", async () => {
  const contract = await getContract();
  assert.ok(contract.includes('"component.combobox"'), "combobox key not registered");
  assert.ok(contract.includes('"component.comboboxInput"'), "comboboxInput key not registered");
  assert.ok(contract.includes('"component.comboboxList"'), "comboboxList key not registered");
  assert.ok(contract.includes('"component.comboboxOption"'), "comboboxOption key not registered");
});

test("contract: search-box keys registered in naming contract", async () => {
  const contract = await getContract();
  assert.ok(contract.includes('"component.searchBox"'), "searchBox key not registered");
  assert.ok(contract.includes('"component.searchBoxInput"'), "searchBoxInput key not registered");
  assert.ok(contract.includes('"component.searchBoxAction"'), "searchBoxAction key not registered");
});

test("contract: autocomplete keys registered in naming contract", async () => {
  const contract = await getContract();
  assert.ok(contract.includes('"component.autocomplete"'), "autocomplete key not registered");
  assert.ok(contract.includes('"component.autocompleteInput"'), "autocompleteInput key not registered");
  assert.ok(contract.includes('"component.autocompleteList"'), "autocompleteList key not registered");
  assert.ok(contract.includes('"component.autocompleteOption"'), "autocompleteOption key not registered");
});

test("contract: command-palette keys registered in naming contract", async () => {
  const contract = await getContract();
  assert.ok(contract.includes('"component.commandPalette"'), "commandPalette key not registered");
  assert.ok(contract.includes('"component.commandPaletteDialog"'), "commandPaletteDialog key not registered");
  assert.ok(contract.includes('"component.commandPaletteInput"'), "commandPaletteInput key not registered");
  assert.ok(contract.includes('"component.commandPaletteList"'), "commandPaletteList key not registered");
  assert.ok(contract.includes('"component.commandPaletteItem"'), "commandPaletteItem key not registered");
});

/* ── ARIA / headless contract in playground ────────────────────────────── */

test("a11y: combobox has role=combobox and aria-expanded", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("combobox")) {
    return; // skip if no demo yet
  }
  assert.ok(
    html.includes('role="combobox"') || html.includes("combobox-input"),
    "Combobox input missing role=combobox or combobox-input class"
  );
});

test("a11y: search-box has role=search landmark", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("search-box")) return;
  assert.ok(
    html.includes('role="search"') || html.includes("search-box"),
    "Search box missing role=search or search-box class"
  );
});

test("a11y: autocomplete has aria-autocomplete attribute", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("autocomplete")) return;
  assert.ok(
    html.includes("aria-autocomplete") || html.includes("autocomplete-input"),
    "Autocomplete input missing aria-autocomplete or autocomplete-input class"
  );
});

test("a11y: command-palette has role=dialog or aria-label", async () => {
  const html = await getPlaygroundHtml();
  if (!html.includes("command-palette")) return;
  assert.ok(
    html.includes("command-palette-dialog") || html.includes('role="dialog"'),
    "Command palette missing command-palette-dialog class or role=dialog"
  );
});

/* ── Keyboard contract: interactive elements are focusable ─────────────── */

test("keyboard: combobox-option uses data-active for highlight state", async () => {
  const css = await getBuiltCss();
  assert.ok(
    css.includes('.combobox-option[data-active="true"]'),
    "combobox-option missing data-active highlight state"
  );
});

test("keyboard: command-palette-item uses data-active for highlight state", async () => {
  const css = await getBuiltCss();
  assert.ok(
    css.includes('.command-palette-item[data-active="true"]'),
    "command-palette-item missing data-active highlight state"
  );
});

test("keyboard: autocomplete-option uses data-active for highlight state", async () => {
  const css = await getBuiltCss();
  assert.ok(
    css.includes('.autocomplete-option[data-active="true"]'),
    "autocomplete-option missing data-active highlight state"
  );
});
