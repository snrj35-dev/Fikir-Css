/**
 * validate-recipe-strict.mjs — Recipe-typing strict mode validator (M2)
 *
 * Validates that all recipe definitions in recipes.contract.mjs:
 * 1. Reference only keys that exist in naming.contract.mjs
 * 2. Have no undefined variant values
 * 3. Have no duplicate variant keys within a recipe
 * 4. Have a `base` property that references valid selector keys
 */

import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

async function loadContracts() {
  const { namingContract } = await import(resolve(rootDir, "contracts/naming.contract.mjs"));
  const { recipesContract } = await import(resolve(rootDir, "contracts/recipes.contract.mjs"));
  return { namingContract, recipesContract };
}

function validateRecipes(namingContract, recipesContract) {
  const errors = [];
  const selectorKeys = new Set(Object.keys(namingContract.selectors));

  for (const [recipeName, recipe] of Object.entries(recipesContract)) {
    if (!recipe.base) {
      errors.push(`[${recipeName}] Missing 'base' property`);
      continue;
    }

    if (!selectorKeys.has(recipe.base)) {
      errors.push(`[${recipeName}] base key '${recipe.base}' not found in namingContract`);
    }

    if (!recipe.variants || typeof recipe.variants !== "object") {
      continue;
    }

    for (const [variantAxis, variantMap] of Object.entries(recipe.variants)) {
      if (typeof variantMap !== "object") {
        errors.push(`[${recipeName}] variant axis '${variantAxis}' is not an object`);
        continue;
      }

      const seenKeys = new Set();
      for (const [variantKey, selectorKey] of Object.entries(variantMap)) {
        if (seenKeys.has(variantKey)) {
          errors.push(`[${recipeName}] duplicate variant key '${variantKey}' in axis '${variantAxis}'`);
        }
        seenKeys.add(variantKey);

        if (selectorKey === undefined || selectorKey === null) {
          errors.push(`[${recipeName}] variant '${variantAxis}.${variantKey}' has undefined selector key`);
          continue;
        }

        if (typeof selectorKey === "string" && !selectorKeys.has(selectorKey)) {
          errors.push(`[${recipeName}] variant '${variantAxis}.${variantKey}' references missing key '${selectorKey}'`);
        }
      }
    }
  }

  return errors;
}

async function main() {
  const { namingContract, recipesContract } = await loadContracts();
  const errors = validateRecipes(namingContract, recipesContract);

  const recipeCount = Object.keys(recipesContract).length;
  console.log(`Recipe strict-mode validation`);
  console.log(`- recipes checked: ${recipeCount}`);

  if (errors.length > 0) {
    console.error(`- ERRORS: ${errors.length}`);
    for (const e of errors) {
      console.error(`  ✖ ${e}`);
    }
    process.exit(1);
  } else {
    console.log(`- result: all recipes valid`);
  }
}

main();
