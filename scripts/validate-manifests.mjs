/**
 * validate-manifests.mjs
 * Validates all generated dist/contracts/*.json manifests.
 *
 * Checks:
 *   - Required top-level fields (schema_version, generated, note/naming)
 *   - All anatomy entries have required fields
 *   - All capability entries have required fields
 *   - Anatomy selectors exist in selectors.json
 *   - Variant tones/styles are subset of global canonical values
 *   - No unknown status values
 *   - Primitives have required fields
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const contractsDir = resolve(rootDir, "dist/contracts");
const vscodeDir = resolve(rootDir, "dist/vscode");

let errors = 0;
let warnings = 0;

function error(msg) {
  console.error(`  ✗ ERROR: ${msg}`);
  errors++;
}

function warn(msg) {
  console.warn(`  ⚠ WARN: ${msg}`);
  warnings++;
}

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

async function readJSON(filename) {
  try {
    const raw = await readFile(resolve(contractsDir, filename), "utf8");
    return JSON.parse(raw);
  } catch (e) {
    error(`Cannot read ${filename}: ${e.message}`);
    return null;
  }
}

async function readJSONFrom(dir, filename) {
  try {
    const raw = await readFile(resolve(dir, filename), "utf8");
    return JSON.parse(raw);
  } catch (e) {
    error(`Cannot read ${filename}: ${e.message}`);
    return null;
  }
}

/* ─── validators ─────────────────────────────────────────────────────────── */

function validateTopLevel(data, filename, requiredFields) {
  if (!data) return;
  for (const field of requiredFields) {
    if (data[field] === undefined) {
      error(`${filename}: missing required top-level field "${field}"`);
    }
  }
  if (data.schema_version !== "1.0") {
    warn(`${filename}: unexpected schema_version "${data.schema_version}" (expected "1.0")`);
  }
}

const VALID_STATUSES = new Set(["stable", "beta", "experimental", "deprecated"]);

function validateStatus(name, status, filename) {
  if (!VALID_STATUSES.has(status)) {
    error(`${filename}: component "${name}" has invalid status "${status}"`);
  }
}

function validateSelectors(selectors) {
  if (!selectors) return;
  validateTopLevel(selectors, "selectors.json", ["schema_version", "generated", "naming", "selectors", "data_markers"]);

  const allClasses = new Set(Object.values(selectors.selectors || {}));
  ok(`selectors.json: ${allClasses.size} selector entries`);

  const deprecated = selectors.deprecated_selectors || {};
  const deprecatedCount = Object.keys(deprecated).length;
  if (deprecatedCount > 0) {
    warn(`selectors.json: ${deprecatedCount} deprecated selector(s) — review before next major release`);
    for (const [key, info] of Object.entries(deprecated)) {
      const since = info.since ? ` (since ${info.since})` : "";
      const instead = info.use_instead ? ` → use ${info.use_instead}` : "";
      ok(`  deprecated: ${key} (${info.base})${since}${instead}`);
    }
  }

  const { global: globalMarkers = [], components = {} } = selectors.data_markers || {};
  for (const marker of globalMarkers) {
    if (!marker.attr) error(`selectors.json: global data_marker missing "attr" field`);
  }
  ok(`selectors.json: ${globalMarkers.length} global data markers, ${Object.keys(components).length} component marker groups`);

  return allClasses;
}

function validateAnatomy(anatomy, selectorClasses) {
  if (!anatomy) return;
  validateTopLevel(anatomy, "anatomy.json", ["schema_version", "generated", "components"]);

  const { components = {} } = anatomy;
  let count = 0;

  for (const [name, entry] of Object.entries(components)) {
    const isPattern = entry.selector_type === "data-pattern";

    if (!entry.root_selector) {
      error(`anatomy.json: "${name}" missing "root_selector"`);
    } else if (!isPattern && selectorClasses && !selectorClasses.has(entry.root_selector)) {
      warn(`anatomy.json: "${name}" root_selector "${entry.root_selector}" not found in selectors.json`);
    }

    if (!entry.element) error(`anatomy.json: "${name}" missing "element"`);
    if (!Array.isArray(entry.elements)) error(`anatomy.json: "${name}" "elements" must be an array`);
    if (!entry.minimal_html) error(`anatomy.json: "${name}" missing "minimal_html"`);

    validateStatus(name, entry.status, "anatomy.json");

    for (const el of (entry.elements || [])) {
      if (!el.selector && !el.slot) error(`anatomy.json: "${name}" sub-element missing "selector" (or "slot" for data-pattern)`);
      if (!el.role) error(`anatomy.json: "${name}" sub-element missing "role"`);
      if (!el.element) error(`anatomy.json: "${name}" sub-element missing "element"`);
    }

    count++;
  }

  ok(`anatomy.json: ${count} component entries validated`);
}

function validateCapabilities(capabilities) {
  if (!capabilities) return;
  validateTopLevel(capabilities, "capabilities.json", ["schema_version", "generated", "components"]);

  const { components = {} } = capabilities;
  const allowedDensityEffects = new Set(["tangible", "subtle", "no-op"]);
  let count = 0;

  for (const [name, entry] of Object.entries(components)) {
    if (!Array.isArray(entry.does)) error(`capabilities.json: "${name}" missing "does" array`);
    if (!Array.isArray(entry.does_not)) error(`capabilities.json: "${name}" missing "does_not" array`);
    if (!Array.isArray(entry.requires_app_css)) error(`capabilities.json: "${name}" missing "requires_app_css" array`);
    if (!Array.isArray(entry.states)) error(`capabilities.json: "${name}" missing "states" array`);
    if (!allowedDensityEffects.has(entry.density_effect)) error(`capabilities.json: "${name}" invalid "density_effect" value`);
    validateStatus(name, entry.status, "capabilities.json");
    count++;
  }

  ok(`capabilities.json: ${count} component entries validated`);
}

const GLOBAL_TONES = new Set(["neutral", "primary", "success", "warning", "danger", "info"]);
const GLOBAL_STYLES = new Set(["solid", "soft", "outline", "ghost", "plain"]);
const GLOBAL_SIZES = new Set(["xs", "sm", "md", "lg"]);

function validateVariants(variants) {
  if (!variants) return;
  validateTopLevel(variants, "variants.json", ["schema_version", "generated", "global", "recipe_components"]);

  // Check global axes
  const { tones = [], styles = [], sizes = [] } = variants.global || {};
  for (const t of tones) {
    if (!GLOBAL_TONES.has(t)) warn(`variants.json: global tone "${t}" is not in canonical set`);
  }
  for (const s of styles) {
    if (!GLOBAL_STYLES.has(s)) warn(`variants.json: global style "${s}" is not in canonical set`);
  }
  for (const sz of sizes) {
    if (!GLOBAL_SIZES.has(sz)) warn(`variants.json: global size "${sz}" is not in canonical set`);
  }

  const componentCount = Object.keys(variants.recipe_components || {}).length;
  ok(`variants.json: ${tones.length} tones, ${styles.length} styles, ${sizes.length} sizes, ${componentCount} recipe components`);
}

function validateTokens(tokens) {
  if (!tokens) return;
  validateTopLevel(tokens, "tokens.json", ["schema_version", "generated", "groups"]);

  const { groups = {} } = tokens;
  let tokenCount = 0;
  let tokenUsageMetadataCount = 0;
  for (const group of Object.values(groups)) {
    for (const entry of Object.values(group)) {
      tokenCount++;
      if (entry.used_by !== undefined) {
        if (!Array.isArray(entry.used_by)) {
          error('tokens.json: token "used_by" metadata must be an array when present');
        } else {
          tokenUsageMetadataCount++;
        }
      }
    }
  }

  const groupNames = Object.keys(groups);
  ok(`tokens.json: ${tokenCount} tokens across groups: ${groupNames.join(", ")}`);
  ok(`tokens.json: ${tokenUsageMetadataCount} token entries include component usage metadata`);
}

function validatePrimitives(primitives) {
  if (!primitives) return;
  validateTopLevel(primitives, "primitives.json", ["schema_version", "generated", "primitives"]);

  const { primitives: prims = {} } = primitives;
  for (const [name, entry] of Object.entries(prims)) {
    if (!entry.selector) error(`primitives.json: "${name}" missing "selector"`);
    if (!entry.description) error(`primitives.json: "${name}" missing "description"`);
    if (!entry.layout) error(`primitives.json: "${name}" missing "layout"`);
  }

  ok(`primitives.json: ${Object.keys(prims).length} layout primitives validated`);
}

function validateVscodeHtmlCustomData(data) {
  if (!data) return;
  if (data.version !== 1.1) warn(`html-custom-data.json: unexpected version "${data.version}" (expected 1.1)`);
  if (!Array.isArray(data.globalAttributes)) error('html-custom-data.json: missing "globalAttributes" array');
  if (!Array.isArray(data.valueSets)) error('html-custom-data.json: missing "valueSets" array');

  const classAttribute = (data.globalAttributes || []).find((entry) => entry.name === "class");
  if (!classAttribute) error('html-custom-data.json: missing global "class" attribute entry');

  const classValueSet = (data.valueSets || []).find((entry) => entry.name === "fikir-css-classes");
  if (!classValueSet) {
    error('html-custom-data.json: missing "fikir-css-classes" value set');
  } else {
    if (!Array.isArray(classValueSet.values) || classValueSet.values.length === 0) {
      error('html-custom-data.json: "fikir-css-classes" must contain values');
    } else {
      ok(`html-custom-data.json: ${classValueSet.values.length} class autocomplete values`);
    }
  }
}

function validateVscodeCssCustomData(data) {
  if (!data) return;
  if (data.version !== 1.1) warn(`css-custom-data.json: unexpected version "${data.version}" (expected 1.1)`);
  if (!Array.isArray(data.properties)) error('css-custom-data.json: missing "properties" array');
  if (Array.isArray(data.properties) && data.properties.length > 0) {
    ok(`css-custom-data.json: ${data.properties.length} token property entries`);
  } else {
    error("css-custom-data.json: expected at least one property entry");
  }
}

/* ─── cross-manifest checks ─────────────────────────────────────────────── */

function crossCheck(anatomy, capabilities) {
  if (!anatomy || !capabilities) return;

  const anatomyComponents = new Set(Object.keys(anatomy.components || {}));
  const capabilityComponents = new Set(Object.keys(capabilities.components || {}));

  const onlyInAnatomy = [...anatomyComponents].filter((c) => !capabilityComponents.has(c));
  const onlyInCapabilities = [...capabilityComponents].filter((c) => !anatomyComponents.has(c));

  if (onlyInAnatomy.length > 0) {
    warn(`Cross-check: ${onlyInAnatomy.length} component(s) in anatomy.json but not in capabilities.json: ${onlyInAnatomy.join(", ")}`);
  }
  if (onlyInCapabilities.length > 0) {
    warn(`Cross-check: ${onlyInCapabilities.length} component(s) in capabilities.json but not in anatomy.json: ${onlyInCapabilities.join(", ")}`);
  }

  const covered = [...anatomyComponents].filter((c) => capabilityComponents.has(c)).length;
  ok(`Cross-check: ${covered} components covered in both anatomy and capabilities`);
}

/* ─── main ───────────────────────────────────────────────────────────────── */

async function main() {
  console.log("Validating dist/contracts/ manifests...\n");

  const [selectors, anatomy, tokens, capabilities, variants, primitives, htmlCustomData, cssCustomData] =
    await Promise.all([
      readJSON("selectors.json"),
      readJSON("anatomy.json"),
      readJSON("tokens.json"),
      readJSON("capabilities.json"),
      readJSON("variants.json"),
      readJSON("primitives.json"),
      readJSONFrom(vscodeDir, "html-custom-data.json"),
      readJSONFrom(vscodeDir, "css-custom-data.json")
    ]);

  console.log("selectors.json:");
  const selectorClasses = validateSelectors(selectors);

  console.log("\nanatomy.json:");
  validateAnatomy(anatomy, selectorClasses);

  console.log("\ntokens.json:");
  validateTokens(tokens);

  console.log("\ncapabilities.json:");
  validateCapabilities(capabilities);

  console.log("\nvariants.json:");
  validateVariants(variants);

  console.log("\nprimitives.json:");
  validatePrimitives(primitives);

  console.log("\nhtml-custom-data.json:");
  validateVscodeHtmlCustomData(htmlCustomData);

  console.log("\ncss-custom-data.json:");
  validateVscodeCssCustomData(cssCustomData);

  console.log("\nCross-manifest checks:");
  crossCheck(anatomy, capabilities);

  console.log(`\n${"─".repeat(50)}`);
  if (errors > 0) {
    console.error(`Manifest validation FAILED: ${errors} error(s), ${warnings} warning(s)`);
    process.exitCode = 1;
  } else if (warnings > 0) {
    console.warn(`Manifest validation PASSED with ${warnings} warning(s)`);
  } else {
    console.log("Manifest validation PASSED — 0 errors, 0 warnings");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
