/**
 * validate-recipe-strict.mjs — Recipe-typing strict mode validator
 *
 * Validates all resolver definitions in recipesContract.resolvers:
 * 1. Each resolver has a non-empty `base` array
 * 2. Every key in `base` exists in namingContract.selectors
 * 3. Every selector key in `variants.*.* ` arrays exists in namingContract.selectors
 * 4. No undefined / null values in variant maps
 * 5. `defaults` values match keys that exist in the corresponding variant axis
 */

import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

async function loadContracts() {
  const { namingContract } = await import(resolve(rootDir, "contracts/naming.contract.mjs"));
  const { recipesContract } = await import(resolve(rootDir, "contracts/recipes.contract.mjs"));
  return { namingContract, recipesContract };
}

function validateResolvers(namingContract, resolvers) {
  const errors = [];
  const selectorKeys = new Set(Object.keys(namingContract.selectors));

  for (const [name, recipe] of Object.entries(resolvers)) {
    // 1. base must be a non-empty array
    if (!Array.isArray(recipe.base) || recipe.base.length === 0) {
      errors.push(`[${name}] 'base' must be a non-empty array`);
    } else {
      for (const key of recipe.base) {
        if (!selectorKeys.has(key)) {
          errors.push(`[${name}] base key '${key}' not found in namingContract.selectors`);
        }
      }
    }

    // 2. variants — each value must be an array of valid selector keys
    if (recipe.variants && typeof recipe.variants === "object") {
      for (const [axis, axisMap] of Object.entries(recipe.variants)) {
        if (typeof axisMap !== "object" || axisMap === null) {
          errors.push(`[${name}] variant axis '${axis}' must be an object`);
          continue;
        }
        for (const [value, keys] of Object.entries(axisMap)) {
          if (!Array.isArray(keys)) {
            errors.push(`[${name}] variant '${axis}.${value}' must be an array`);
            continue;
          }
          for (const key of keys) {
            if (key === undefined || key === null) {
              errors.push(`[${name}] variant '${axis}.${value}' contains null/undefined`);
            } else if (!selectorKeys.has(key)) {
              errors.push(`[${name}] variant '${axis}.${value}' references missing key '${key}'`);
            }
          }
        }
      }
    }

    // 3. defaults — each default value must exist as a key in the referenced axis
    if (recipe.defaults && recipe.variants) {
      for (const [axis, defaultValue] of Object.entries(recipe.defaults)) {
        const axisMap = recipe.variants[axis];
        if (!axisMap) {
          errors.push(`[${name}] default axis '${axis}' not found in variants`);
        } else if (!Object.prototype.hasOwnProperty.call(axisMap, defaultValue)) {
          errors.push(`[${name}] default '${axis}=${defaultValue}' is not a valid variant key`);
        }
      }
    }
  }

  return errors;
}

async function main() {
  const { namingContract, recipesContract } = await loadContracts();
  const resolvers = recipesContract.resolvers ?? {};
  const errors = validateResolvers(namingContract, resolvers);

  const resolverCount = Object.keys(resolvers).length;
  console.log("Recipe strict-mode validation");
  console.log(`- resolvers checked: ${resolverCount}`);

  if (errors.length > 0) {
    console.error(`- ERRORS: ${errors.length}`);
    for (const e of errors) {
      console.error(`  ✖ ${e}`);
    }
    process.exit(1);
  } else {
    console.log("- result: all resolvers valid ✓");
  }
}

main();
