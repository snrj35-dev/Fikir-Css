import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const rootDir = resolve(process.cwd());
const capabilitiesPath = resolve(rootDir, "dist/contracts/capabilities.json");
const selectorsPath = resolve(rootDir, "dist/contracts/selectors.json");

function stateMap(states) {
  return new Map(states.map((entry) => [entry.name, entry]));
}

test("form state contract: capabilities manifest exposes canonical control states", async () => {
  const capabilities = JSON.parse(await readFile(capabilitiesPath, "utf8"));
  const components = capabilities.components;

  const inputStates = stateMap(components.input.states);
  const textareaStates = stateMap(components.textarea.states);
  const selectStates = stateMap(components.select.states);
  const checkboxStates = stateMap(components.checkbox.states);
  const fieldStates = stateMap(components.field.states);

  assert.equal(inputStates.get("invalid")?.selector, '.input[aria-invalid="true"]');
  assert.equal(inputStates.get("disabled")?.selector, ".input[disabled]");
  assert.equal(inputStates.get("readonly")?.selector, ".input[readonly]:not([disabled])");
  assert.equal(inputStates.get("required")?.selector, ".input[required]");

  assert.equal(textareaStates.get("invalid")?.selector, '.textarea[aria-invalid="true"]');
  assert.equal(textareaStates.get("disabled")?.selector, ".textarea[disabled]");
  assert.equal(textareaStates.get("readonly")?.selector, ".textarea[readonly]:not([disabled])");
  assert.equal(textareaStates.get("required")?.selector, ".textarea[required]");

  assert.equal(selectStates.get("invalid")?.selector, '.select[aria-invalid="true"]');
  assert.equal(selectStates.get("disabled")?.selector, ".select[disabled]");
  assert.equal(selectStates.get("required")?.selector, ".select[required]");

  assert.equal(checkboxStates.get("invalid")?.selector, '.checkbox[aria-invalid="true"]');
  assert.equal(checkboxStates.get("disabled")?.selector, ".checkbox[disabled]");
  assert.equal(checkboxStates.get("required")?.selector, ".checkbox[required]");

  assert.equal(fieldStates.get("invalid")?.selector, '.field[data-invalid="true"]');
});

test("form state contract: selectors manifest exposes control state markers", async () => {
  const selectors = JSON.parse(await readFile(selectorsPath, "utf8"));
  const dataMarkers = selectors.data_markers?.components ?? {};

  const fieldAttrs = dataMarkers.field?.map((entry) => entry.attr) ?? [];
  const inputAttrs = dataMarkers.input?.map((entry) => entry.attr) ?? [];
  const textareaAttrs = dataMarkers.textarea?.map((entry) => entry.attr) ?? [];
  const selectAttrs = dataMarkers.select?.map((entry) => entry.attr) ?? [];
  const checkboxAttrs = dataMarkers.checkbox?.map((entry) => entry.attr) ?? [];

  assert.ok(fieldAttrs.includes("data-invalid"));
  assert.deepEqual(inputAttrs, ["aria-invalid", "disabled", "readonly", "required"]);
  assert.deepEqual(textareaAttrs, ["aria-invalid", "disabled", "readonly", "required"]);
  assert.deepEqual(selectAttrs, ["aria-invalid", "disabled", "required"]);
  assert.deepEqual(checkboxAttrs, ["aria-invalid", "disabled", "required"]);
});
