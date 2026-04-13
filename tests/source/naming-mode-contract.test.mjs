import assert from "node:assert/strict";
import test from "node:test";

import { namingContract } from "../../contracts/naming.contract.mjs";

function ensureTrailingDash(value) {
  if (!value) return "";
  return value.endsWith("-") ? value : `${value}-`;
}

function resolveClassName(descriptor, namingConfig, defaults) {
  const mode = namingConfig.mode ?? defaults.mode;

  if (mode !== "prefixed") {
    return descriptor.base;
  }

  if (descriptor.domain === "utility") {
    const prefix = ensureTrailingDash(namingConfig.utilityPrefix ?? defaults.utilityPrefix);
    return `${prefix}${descriptor.base}`;
  }

  if (descriptor.domain === "component") {
    const prefix = ensureTrailingDash(namingConfig.componentPrefix ?? defaults.componentPrefix);
    return `${prefix}${descriptor.base}`;
  }

  return descriptor.base;
}

function buildSelectorMap(contract, overrides = {}) {
  const namingConfig = { ...contract.defaults, ...overrides };
  const map = {};

  for (const [key, descriptor] of Object.entries(contract.selectors)) {
    map[key] = resolveClassName(descriptor, namingConfig, contract.defaults);
  }

  return map;
}

const defaults = namingContract.defaults;
const allKeys = Object.keys(namingContract.selectors);

test("naming-mode plain: all selectors resolve to their base class name", () => {
  const map = buildSelectorMap(namingContract, { mode: "plain" });

  for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
    assert.equal(
      map[key],
      descriptor.base,
      `Plain mode selector mismatch for key: ${key}`
    );
  }
});

test("naming-mode plain: no selector resolves to an empty string", () => {
  const map = buildSelectorMap(namingContract, { mode: "plain" });

  for (const key of allKeys) {
    assert.ok(
      typeof map[key] === "string" && map[key].length > 0,
      `Plain mode produced empty class for key: ${key}`
    );
  }
});

test("naming-mode prefixed: utility selectors have utility prefix applied", () => {
  const utilityPrefix = ensureTrailingDash(defaults.utilityPrefix);
  const map = buildSelectorMap(namingContract, { mode: "prefixed" });

  for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
    if (descriptor.domain === "utility") {
      assert.ok(
        map[key].startsWith(utilityPrefix),
        `Prefixed mode: utility selector '${key}' does not start with '${utilityPrefix}' (got '${map[key]}')`
      );
      assert.equal(
        map[key],
        `${utilityPrefix}${descriptor.base}`,
        `Prefixed mode utility selector value incorrect for key: ${key}`
      );
    }
  }
});

test("naming-mode prefixed: component selectors have component prefix applied", () => {
  const componentPrefix = ensureTrailingDash(defaults.componentPrefix);
  const map = buildSelectorMap(namingContract, { mode: "prefixed" });

  for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
    if (descriptor.domain === "component") {
      assert.ok(
        map[key].startsWith(componentPrefix),
        `Prefixed mode: component selector '${key}' does not start with '${componentPrefix}' (got '${map[key]}')`
      );
      assert.equal(
        map[key],
        `${componentPrefix}${descriptor.base}`,
        `Prefixed mode component selector value incorrect for key: ${key}`
      );
    }
  }
});

test("naming-mode prefixed: no selector leaks plain-mode class name", () => {
  const map = buildSelectorMap(namingContract, { mode: "prefixed" });

  for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
    assert.notEqual(
      map[key],
      descriptor.base,
      `Prefixed mode leaked plain class for key '${key}': got '${map[key]}'`
    );
  }
});

test("naming-mode prefixed: no selector resolves to an empty string", () => {
  const map = buildSelectorMap(namingContract, { mode: "prefixed" });

  for (const key of allKeys) {
    assert.ok(
      typeof map[key] === "string" && map[key].length > 0,
      `Prefixed mode produced empty class for key: ${key}`
    );
  }
});

test("naming-mode parity: plain and prefixed maps cover identical key sets", () => {
  const plainMap = buildSelectorMap(namingContract, { mode: "plain" });
  const prefixedMap = buildSelectorMap(namingContract, { mode: "prefixed" });

  const plainKeys = new Set(Object.keys(plainMap));
  const prefixedKeys = new Set(Object.keys(prefixedMap));

  assert.deepEqual(
    [...plainKeys].sort(),
    [...prefixedKeys].sort(),
    "Plain and prefixed mode must resolve the same set of contract keys"
  );
});

test("naming-mode custom prefix: custom utility prefix is applied correctly", () => {
  const map = buildSelectorMap(namingContract, {
    mode: "prefixed",
    utilityPrefix: "fx",
    componentPrefix: "comp"
  });

  for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
    if (descriptor.domain === "utility") {
      assert.ok(
        map[key].startsWith("fx-"),
        `Custom utility prefix not applied for key '${key}': got '${map[key]}'`
      );
    }
  }
});

test("naming-mode custom prefix: custom component prefix is applied correctly", () => {
  const map = buildSelectorMap(namingContract, {
    mode: "prefixed",
    utilityPrefix: "u",
    componentPrefix: "fikir"
  });

  for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
    if (descriptor.domain === "component") {
      assert.ok(
        map[key].startsWith("fikir-"),
        `Custom component prefix not applied for key '${key}': got '${map[key]}'`
      );
    }
  }
});

test("naming-mode contract: defaults define mode, utilityPrefix, componentPrefix", () => {
  assert.ok(
    typeof defaults.mode === "string" && defaults.mode.length > 0,
    "defaults.mode must be a non-empty string"
  );
  assert.ok(
    typeof defaults.utilityPrefix === "string",
    "defaults.utilityPrefix must be a string"
  );
  assert.ok(
    typeof defaults.componentPrefix === "string",
    "defaults.componentPrefix must be a string"
  );
});

test("naming-mode contract: all selector descriptors have domain and base", () => {
  const allowedDomains = new Set(["component", "utility"]);

  for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
    assert.ok(
      allowedDomains.has(descriptor.domain),
      `Invalid domain '${descriptor.domain}' for key: ${key}`
    );
    assert.ok(
      typeof descriptor.base === "string" && descriptor.base.length > 0,
      `Missing or empty base for key: ${key}`
    );
    assert.ok(
      /^[a-z0-9:/-]+$/.test(descriptor.base),
      `Base class '${descriptor.base}' must be lowercase kebab-case (with optional state prefix) for key: ${key}`
    );
  }
});
