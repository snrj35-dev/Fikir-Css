import assert from "node:assert/strict";
import test from "node:test";

import { recipesContract } from "../../contracts/recipes.contract.mjs";

function assertDefaultsAreValid(resolverName, resolverEntry) {
  for (const [axisName, defaultValue] of Object.entries(resolverEntry.defaults)) {
    const axis = resolverEntry.variants[axisName];
    assert.ok(axis, `Missing axis '${axisName}' in resolver '${resolverName}'`);
    assert.ok(
      Object.prototype.hasOwnProperty.call(axis, defaultValue),
      `Invalid default '${defaultValue}' for axis '${axisName}' in resolver '${resolverName}'`
    );
  }
}

function assertAxisValuesAreMutuallyExclusive(resolverName, axisName, axisMap) {
  const classOwner = new Map();

  for (const [valueName, selectorKeys] of Object.entries(axisMap)) {
    const seenInValue = new Set();

    for (const selectorKey of selectorKeys) {
      assert.equal(
        seenInValue.has(selectorKey),
        false,
        `Duplicate selector '${selectorKey}' in resolver '${resolverName}', axis '${axisName}', value '${valueName}'`
      );
      seenInValue.add(selectorKey);

      const existingOwner = classOwner.get(selectorKey);
      assert.equal(
        existingOwner === undefined || existingOwner === valueName,
        true,
        `Selector '${selectorKey}' is shared across axis values ('${existingOwner}' and '${valueName}') in resolver '${resolverName}', axis '${axisName}'`
      );
      classOwner.set(selectorKey, valueName);
    }
  }
}

test("RFC guardrail: button/card resolver axes remain as documented", () => {
  assert.deepEqual(Object.keys(recipesContract.resolvers.button.variants), ["variant", "tone", "size"]);
  assert.deepEqual(Object.keys(recipesContract.resolvers.card.variants), ["variant", "padding"]);
});

test("RFC guardrail: button/card defaults point to valid variant keys", () => {
  assertDefaultsAreValid("button", recipesContract.resolvers.button);
  assertDefaultsAreValid("card", recipesContract.resolvers.card);
});

test("RFC guardrail: resolver axis combinations are mutually exclusive", () => {
  for (const [resolverName, resolverEntry] of Object.entries(recipesContract.resolvers)) {
    for (const [axisName, axisMap] of Object.entries(resolverEntry.variants)) {
      assertAxisValuesAreMutuallyExclusive(resolverName, axisName, axisMap);
    }
  }
});
