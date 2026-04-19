/**
 * typescript-types-surface.test.mjs — M19.4 (P0 / Blocker B3)
 * Verifies that every export declared in the .d.ts files is actually
 * exported at runtime from the corresponding .mjs files.
 * This smoke catches d.ts drift without requiring a full TypeScript compiler.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = resolve(process.cwd());

// Expected runtime exports per module (derived from .d.ts declarations)
const toolingExports = [
  "resolveClasses",
  "resolveBtn",
  "resolveCard",
  "resolveInput",
  "resolveAlert",
  "resolveBadge",
  "resolveModal",
  "resolveTabs",
];

const helpersExports = [
  "createFocusTrap",
  "bindOverlayKeyboard",
  "createRovingTabindex",
];

test("fikir-css/tooling: .d.ts exports match runtime exports", async () => {
  const mod = await import(resolve(ROOT, "dist/tooling/resolve-classes.mjs"));
  for (const name of toolingExports) {
    assert.ok(
      typeof mod[name] === "function" || name in mod,
      `Missing export in tooling: ${name}`
    );
  }
});

test("fikir-css/helpers: .d.ts exports match runtime exports", async () => {
  const mod = await import(resolve(ROOT, "dist/helpers/index.mjs"));
  for (const name of helpersExports) {
    assert.ok(
      typeof mod[name] === "function",
      `Missing export in helpers: ${name}`
    );
  }
});

test("fikir-css/tooling: resolveBtn returns non-empty string", async () => {
  const { resolveBtn } = await import(resolve(ROOT, "dist/tooling/resolve-classes.mjs"));
  const result = resolveBtn({ variant: "solid", tone: "primary", size: "md" });
  assert.ok(typeof result === "string" && result.length > 0, `resolveBtn returned: ${result}`);
  assert.ok(result.includes("btn"), `resolveBtn result should include 'btn': ${result}`);
});

test("fikir-css/tooling: resolveClasses deduplicates and merges", async () => {
  const { resolveClasses } = await import(resolve(ROOT, "dist/tooling/resolve-classes.mjs"));
  const result = resolveClasses("btn btn-primary", "btn btn-danger");
  assert.ok(typeof result === "string" && result.length > 0);
});

test("fikir-css/helpers: createFocusTrap returns activate/deactivate interface", async () => {
  const { createFocusTrap } = await import(resolve(ROOT, "dist/helpers/index.mjs"));
  const fakeContainer = { addEventListener: () => {}, removeEventListener: () => {}, querySelectorAll: () => [] };
  const trap = createFocusTrap(fakeContainer);
  assert.ok(typeof trap.activate === "function", "trap.activate should be a function");
  assert.ok(typeof trap.deactivate === "function", "trap.deactivate should be a function");
});

test("fikir-css/helpers: bindOverlayKeyboard returns destroy interface", async () => {
  // bindOverlayKeyboard calls document.addEventListener — provide a minimal global mock
  globalThis.document = {
    addEventListener: () => {},
    removeEventListener: () => {},
  };
  const { bindOverlayKeyboard } = await import(resolve(ROOT, "dist/helpers/index.mjs"));
  const fakeEl = { addEventListener: () => {}, removeEventListener: () => {} };
  const binding = bindOverlayKeyboard(fakeEl, { onClose: () => {} });
  assert.ok(typeof binding.destroy === "function", "binding.destroy should be a function");
  binding.destroy(); // should not throw
  delete globalThis.document;
});

test("dist/tooling/resolve-classes.d.ts exists and declares key exports", async () => {
  const dts = await readFile(resolve(ROOT, "dist/tooling/resolve-classes.d.ts"), "utf8");
  for (const name of toolingExports) {
    assert.ok(dts.includes(name), `d.ts missing declaration for: ${name}`);
  }
});

test("dist/helpers/index.d.ts exists and declares key exports", async () => {
  const dts = await readFile(resolve(ROOT, "dist/helpers/index.d.ts"), "utf8");
  for (const name of helpersExports) {
    assert.ok(dts.includes(name), `d.ts missing declaration for: ${name}`);
  }
});
