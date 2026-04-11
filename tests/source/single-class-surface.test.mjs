import assert from "node:assert/strict";
import test from "node:test";

import { recipesContract } from "../../contracts/recipes.contract.mjs";

function getLayerSelectorKeys(recipes) {
  return new Set(Object.values(recipes.layer).map((entry) => entry.selector));
}

function getResolverSelectorKeys(recipes) {
  const keys = [];

  for (const resolverEntry of Object.values(recipes.resolvers)) {
    keys.push(...resolverEntry.base);

    for (const axisEntry of Object.values(resolverEntry.variants)) {
      for (const valueEntry of Object.values(axisEntry)) {
        keys.push(...valueEntry);
      }
    }
  }

  return new Set(keys);
}

test("single class surface: resolver selectors are covered by recipe layer", () => {
  const layerKeys = getLayerSelectorKeys(recipesContract);
  const resolverKeys = getResolverSelectorKeys(recipesContract);

  const missingInLayer = [...resolverKeys].filter((key) => !layerKeys.has(key)).sort();

  assert.deepEqual(missingInLayer, []);
});

test("single class surface: recipe layer selectors are reachable from resolvers", () => {
  const layerKeys = getLayerSelectorKeys(recipesContract);
  const resolverKeys = getResolverSelectorKeys(recipesContract);

  const unreachable = [...layerKeys].filter((key) => !resolverKeys.has(key)).sort();

  assert.deepEqual(unreachable, []);
});
