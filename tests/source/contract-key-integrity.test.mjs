import assert from "node:assert/strict";
import test from "node:test";

import { namingContract } from "../../contracts/naming.contract.mjs";
import { recipesContract } from "../../contracts/recipes.contract.mjs";

function collectRecipeSelectorKeys(recipes) {
  const keys = [];

  for (const layerEntry of Object.values(recipes.layer)) {
    keys.push(layerEntry.selector);
  }

  for (const resolverEntry of Object.values(recipes.resolvers)) {
    keys.push(...resolverEntry.base);

    for (const axisEntry of Object.values(resolverEntry.variants)) {
      for (const valueEntry of Object.values(axisEntry)) {
        keys.push(...valueEntry);
      }
    }
  }

  return keys;
}

test("contract key integrity: recipe keys exist in naming contract", () => {
  const namingKeys = new Set(Object.keys(namingContract.selectors));
  const recipeKeys = collectRecipeSelectorKeys(recipesContract);

  const missing = [...new Set(recipeKeys.filter((key) => !namingKeys.has(key)))].sort();

  assert.deepEqual(missing, []);
});

test("contract key integrity: naming selector descriptors keep expected schema", () => {
  const allowedDomains = new Set(["component", "utility", "pattern"]);

  for (const [key, descriptor] of Object.entries(namingContract.selectors)) {
    assert.match(key, /^(component|utility|pattern)\./);
    assert.ok(allowedDomains.has(descriptor.domain), `Invalid domain in ${key}`);
    assert.equal(typeof descriptor.base, "string", `Missing base string in ${key}`);
    assert.ok(descriptor.base.length > 0, `Empty base class in ${key}`);
  }
});
