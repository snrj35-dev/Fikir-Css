import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

import config from "../fikir.config.mjs";
import { namingContract } from "../contracts/naming.contract.mjs";
import { recipesContract } from "../contracts/recipes.contract.mjs";
import { cssManifest } from "./css-manifest.mjs";

const rootDir = resolve(process.cwd());
const recipeCssOutFile = resolve(rootDir, "packages/recipes/index.css");
const recipeResolversOutFile = resolve(rootDir, "packages/recipes/generated/resolvers.ts");
const outFile = resolve(rootDir, config.build.cssOutFile);
const selectorsManifestOutFile = resolve(rootDir, config.build.selectorsManifestOutFile);
const sizeReportOutFile = resolve(rootDir, config.build.sizeReportOutFile);
const aliasMigrationOutFile = resolve(rootDir, "dist/contracts/alias-migration.json");

const PLACEHOLDER_PATTERN = /\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g;

function ensureTrailingDash(value) {
  if (!value) return "";
  return value.endsWith("-") ? value : `${value}-`;
}

function escapeClassName(className) {
  return className.replace(/:/g, "\\:");
}

async function pathExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function resolveClassName({ domain, base }, namingConfig, defaults) {
  const mode = namingConfig.mode ?? defaults.mode;

  if (mode !== "prefixed") {
    return base;
  }

  if (domain === "utility") {
    const prefix = ensureTrailingDash(namingConfig.utilityPrefix ?? defaults.utilityPrefix);
    return `${prefix}${base}`;
  }

  if (domain === "component") {
    const prefix = ensureTrailingDash(namingConfig.componentPrefix ?? defaults.componentPrefix);
    return `${prefix}${base}`;
  }

  return base;
}

function buildSelectorMap(contract, namingConfig) {
  const map = {};

  for (const [key, descriptor] of Object.entries(contract.selectors)) {
    map[key] = resolveClassName(descriptor, namingConfig, contract.defaults);
  }

  return map;
}

function selectorForKey(selectorMap, key) {
  const className = selectorMap[key];

  if (!className) {
    throw new Error(`Unknown selector key: ${key}`);
  }

  return `.${escapeClassName(className)}`;
}

function replaceSelectorPlaceholders(content, selectorMap, sourceFile) {
  const replaced = content.replace(PLACEHOLDER_PATTERN, (_, key) => selectorForKey(selectorMap, key));

  if (/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/.test(replaced)) {
    throw new Error(`Unresolved selector placeholder in ${sourceFile}`);
  }

  return replaced;
}

function collectRecipeSelectorReferences(contract) {
  const refs = [];

  for (const layerEntry of Object.values(contract.layer)) {
    refs.push(layerEntry.selector);
  }

  for (const resolverEntry of Object.values(contract.resolvers)) {
    refs.push(...resolverEntry.base);
    for (const axisEntry of Object.values(resolverEntry.variants)) {
      for (const valueEntry of Object.values(axisEntry)) {
        refs.push(...valueEntry);
      }
    }
  }

  return refs;
}

function validateContractReferences(naming, recipes) {
  const selectorKeys = new Set(Object.keys(naming.selectors));
  const refs = collectRecipeSelectorReferences(recipes);
  const missing = refs.filter((key) => !selectorKeys.has(key));

  if (missing.length > 0) {
    const uniqueMissing = [...new Set(missing)].sort();
    throw new Error(`Recipe contract references unknown selector keys: ${uniqueMissing.join(", ")}`);
  }
}

function validateSingleClassSurface(recipes) {
  const layerSelectors = new Set(Object.values(recipes.layer).map((entry) => entry.selector));
  const resolverRefs = [];

  for (const resolverEntry of Object.values(recipes.resolvers)) {
    resolverRefs.push(...resolverEntry.base);
    for (const axisEntry of Object.values(resolverEntry.variants)) {
      for (const valueEntry of Object.values(axisEntry)) {
        resolverRefs.push(...valueEntry);
      }
    }
  }

  const notInLayer = resolverRefs.filter((key) => !layerSelectors.has(key));

  if (notInLayer.length > 0) {
    const unique = [...new Set(notInLayer)].sort();
    throw new Error(`Resolver class surface is not fully covered by recipe layer: ${unique.join(", ")}`);
  }
}

function generateRecipeCss(recipes, selectorMap) {
  const lines = ["@layer recipes {"];

  for (const layerEntry of Object.values(recipes.layer)) {
    lines.push(`  ${selectorForKey(selectorMap, layerEntry.selector)} {`);

    for (const [prop, value] of layerEntry.declarations) {
      lines.push(`    ${prop}: ${value};`);
    }

    lines.push("  }");
    lines.push("");
  }

  if (lines[lines.length - 1] === "") {
    lines.pop();
  }

  lines.push("}");
  lines.push("");

  return lines.join("\n");
}

function pascalCase(value) {
  return value
    .replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");
}

function generateResolverTypes(recipeName, resolverEntry) {
  const recipeTypeName = pascalCase(recipeName);
  const axisNames = Object.keys(resolverEntry.variants);
  const lines = [];

  for (const axisName of axisNames) {
    const axisType = `${recipeTypeName}${pascalCase(axisName)}`;
    const values = Object.keys(resolverEntry.variants[axisName]);
    const union = values.map((v) => `"${v}"`).join(" | ");
    lines.push(`type ${axisType} = ${union};`);
  }

  const inputFields = axisNames
    .map((axisName) => `${axisName}?: ${recipeTypeName}${pascalCase(axisName)};`)
    .join(" ");
  lines.push(`export type ${recipeTypeName}RecipeInput = { ${inputFields} };`);

  return lines.join("\n");
}

function generateResolverBody(recipeName, resolverEntry, selectorMap) {
  const recipeTypeName = pascalCase(recipeName);
  const fnName = `${recipeName}Recipe`;
  const axisNames = Object.keys(resolverEntry.variants);

  const defaultObj = JSON.stringify(resolverEntry.defaults, null, 2);
  const baseArray = JSON.stringify(resolverEntry.base.map((key) => selectorMap[key]));

  const variantBlocks = axisNames
    .map((axisName) => {
      const options = Object.entries(resolverEntry.variants[axisName])
        .map(([variantValue, selectorKeys]) => {
          const classNames = selectorKeys.map((key) => selectorMap[key]);
          return `    "${variantValue}": ${JSON.stringify(classNames)}`;
        })
        .join(",\n");
      return `  ${axisName}: {\n${options}\n  }`;
    })
    .join(",\n");

  const axisRuntime = axisNames
    .map((axisName) => {
      const axisType = `${recipeTypeName}${pascalCase(axisName)}`;
      return [
        `  const ${axisName} = input.${axisName} ?? defaults.${axisName};`,
        `  classes.push(...variants.${axisName}[${axisName} as ${axisType}]);`
      ].join("\n");
    })
    .join("\n\n");

  return [
    generateResolverTypes(recipeName, resolverEntry),
    `const ${recipeName}Base = ${baseArray};`,
    `const ${recipeName}Variants = {\n${variantBlocks}\n} as const;`,
    `const ${recipeName}Defaults = ${defaultObj} as const;`,
    "",
    `export function ${fnName}(input: ${recipeTypeName}RecipeInput = {}): string {`,
    `  const defaults = ${recipeName}Defaults;`,
    `  const variants = ${recipeName}Variants;`,
    `  const classes = [...${recipeName}Base];`,
    "",
    axisRuntime,
    "",
    `  return classes.join(" ");`,
    `}`
  ].join("\n");
}

function generateRecipeResolversTs(recipes, selectorMap) {
  const blocks = [
    "/* This file is generated by scripts/build-css.mjs */",
    "/* Source of truth: contracts/recipes.contract.mjs + contracts/naming.contract.mjs */",
    ""
  ];

  for (const [recipeName, resolverEntry] of Object.entries(recipes.resolvers)) {
    blocks.push(generateResolverBody(recipeName, resolverEntry, selectorMap));
    blocks.push("");
  }

  return blocks.join("\n");
}

function buildAliasMigrationMap(contract, namingConfig) {
  const utilityPrefix = ensureTrailingDash(namingConfig.utilityPrefix ?? contract.defaults.utilityPrefix);
  const componentPrefix = ensureTrailingDash(namingConfig.componentPrefix ?? contract.defaults.componentPrefix);
  const migration = {};

  for (const descriptor of Object.values(contract.selectors)) {
    if (descriptor.domain === "utility") {
      migration[`${utilityPrefix}${descriptor.base}`] = descriptor.base;
    }
    if (descriptor.domain === "component") {
      migration[`${componentPrefix}${descriptor.base}`] = descriptor.base;
    }
  }

  return migration;
}

function validateDist(distCss, selectorMap, recipes) {
  const expectedPrelude = `@layer ${config.layers.join(", ")};`;

  if (!distCss.includes(expectedPrelude)) {
    throw new Error(`Layer prelude mismatch. Expected: ${expectedPrelude}`);
  }

  for (const layerName of config.layers) {
    const blockMarker = `@layer ${layerName} {`;
    if (!distCss.includes(blockMarker)) {
      throw new Error(`Missing layer block in dist: ${blockMarker}`);
    }
  }

  if (/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/.test(distCss)) {
    throw new Error("Unresolved selector placeholders remain in dist CSS.");
  }

  const referencedKeys = collectRecipeSelectorReferences(recipes);

  for (const key of referencedKeys) {
    const selector = selectorForKey(selectorMap, key);
    if (!distCss.includes(selector)) {
      throw new Error(`Contract selector not found in dist CSS: ${key} -> ${selector}`);
    }
  }
}

async function writeFileEnsured(path, content) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf8");
}

async function buildCss() {
  const previousSize = (await pathExists(outFile))
    ? (await readFile(outFile, "utf8")).length
    : 0;

  validateContractReferences(namingContract, recipesContract);
  validateSingleClassSurface(recipesContract);

  const selectorMap = buildSelectorMap(namingContract, config.naming);

  const generatedRecipeCss = generateRecipeCss(recipesContract, selectorMap);
  await writeFileEnsured(recipeCssOutFile, generatedRecipeCss);

  const generatedResolvers = generateRecipeResolversTs(recipesContract, selectorMap);
  await writeFileEnsured(recipeResolversOutFile, generatedResolvers);

  const parts = [
    "/* Fikir CSS v0.1 - Generated bundle */",
    "/* Do not edit dist directly */",
    `@layer ${config.layers.join(", ")};`,
    ""
  ];

  for (const relativePath of cssManifest) {
    const absolutePath = resolve(rootDir, relativePath);
    const content = await readFile(absolutePath, "utf8");
    const processed = replaceSelectorPlaceholders(content, selectorMap, relativePath);
    parts.push(`/* Source: ${relativePath} */`);
    parts.push(processed.trim());
    parts.push("");
  }

  const distCss = `${parts.join("\n")}\n`;
  validateDist(distCss, selectorMap, recipesContract);

  await writeFileEnsured(outFile, distCss);

  await writeFileEnsured(
    selectorsManifestOutFile,
    `${JSON.stringify({ naming: config.naming, selectors: selectorMap }, null, 2)}\n`
  );

  const aliasMigration = buildAliasMigrationMap(namingContract, config.naming);
  await writeFileEnsured(
    aliasMigrationOutFile,
    `${JSON.stringify({ mode: config.naming.mode, migration: aliasMigration }, null, 2)}\n`
  );

  const currentSize = distCss.length;
  const report = {
    file: config.build.cssOutFile,
    bytes: currentSize,
    previousBytes: previousSize,
    diffBytes: currentSize - previousSize,
    namingMode: config.naming.mode
  };

  await writeFileEnsured(sizeReportOutFile, `${JSON.stringify(report, null, 2)}\n`);

  console.log(`Built ${outFile}`);
  console.log(`Selectors manifest: ${selectorsManifestOutFile}`);
  console.log(`Alias migration: ${aliasMigrationOutFile}`);
  console.log(`Size report: ${sizeReportOutFile}`);
  console.log(`Size diff: ${report.diffBytes} bytes`);
}

buildCss().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
