/**
 * generate-manifests.mjs
 * Generates all machine-readable contract JSON files into dist/contracts/.
 *
 * Outputs:
 *   dist/contracts/selectors.json    — all CSS selectors + data-* markers
 *   dist/contracts/anatomy.json      — component HTML anatomy
 *   dist/contracts/tokens.json       — design tokens with px equivalents
 *   dist/contracts/capabilities.json — does/does_not per component
 *   dist/contracts/variants.json     — canonical tones / styles / sizes
 *   dist/contracts/primitives.json   — layout primitive defaults
 */

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { namingContract } from "../contracts/naming.contract.mjs";
import { recipesContract } from "../contracts/recipes.contract.mjs";
import { anatomyContract } from "../contracts/anatomy.contract.mjs";
import { capabilitiesContract } from "../contracts/capabilities.contract.mjs";

const rootDir = resolve(process.cwd());
const outDir = resolve(rootDir, "dist/contracts");
const GENERATED = new Date().toISOString();
const SCHEMA_VERSION = "1.0";

/* ─── helpers ─────────────────────────────────────────────────────────────── */

async function write(filename, data) {
  const path = resolve(outDir, filename);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`  ✓ dist/contracts/${filename}`);
}

function remToPx(value) {
  const m = String(value).match(/^([\d.]+)rem$/);
  if (m) return Math.round(parseFloat(m[1]) * 16);
  return null;
}

/* ─── 1. selectors.json ───────────────────────────────────────────────────── */
// Extends the basic naming map with global data-* markers and per-component
// data-* markers extracted from the anatomy contract.

async function buildSelectorsManifest() {
  const { defaults, selectors } = namingContract;

  // Build plain-mode class name map (same as build-css default mode)
  const classMap = {};
  const deprecatedMap = {};
  for (const [key, desc] of Object.entries(selectors)) {
    classMap[key] = desc.base;
    if (desc.deprecated) {
      deprecatedMap[key] = {
        base: desc.base,
        since: desc.deprecated.since ?? null,
        use_instead: desc.deprecated.use_instead ?? null,
        note: desc.deprecated.note ?? null
      };
    }
  }

  // Collect per-component data_attrs from anatomy contract
  const componentDataAttrs = {};
  for (const [name, entry] of Object.entries(anatomyContract)) {
    if (entry.data_attrs && entry.data_attrs.length > 0) {
      componentDataAttrs[name] = entry.data_attrs;
    }
  }

  return {
    schema_version: SCHEMA_VERSION,
    generated: GENERATED,
    naming: defaults,
    note: "Class names shown use mode=plain (default). Set FIKIR_NAMING_MODE=prefixed for prefix mode.",
    selectors: classMap,
    deprecated_selectors: deprecatedMap,
    data_markers: {
      global: [
        {
          attr: "data-theme",
          on: "html or container",
          values: ["dark"],
          description: "Enable dark theme. Apply to root <html> or any container."
        },
        {
          attr: "data-density",
          on: "html or container",
          values: ["compact", "comfortable"],
          description: "Override density. Requires compact.css or comfortable.css to be imported."
        },
        {
          attr: "data-shape",
          on: "html or container",
          values: ["rounded", "sharp"],
          description: "Override border-radius globally. Requires shape.css to be imported."
        }
      ],
      components: componentDataAttrs
    }
  };
}

/* ─── 2. anatomy.json ─────────────────────────────────────────────────────── */

async function buildAnatomyManifest() {
  const components = {};
  for (const [name, entry] of Object.entries(anatomyContract)) {
    components[name] = {
      status: entry.status,
      ...(entry.selector_type ? { selector_type: entry.selector_type } : {}),
      root_selector: entry.root_selector,
      element: entry.element,
      elements: entry.elements || [],
      data_attrs: entry.data_attrs || [],
      ...(entry.visibility ? { visibility: entry.visibility } : {}),
      minimal_html: entry.minimal_html,
      notes: entry.notes || ""
    };
  }

  return {
    schema_version: SCHEMA_VERSION,
    generated: GENERATED,
    note: "Minimal HTML examples use plain-mode class names (default build). See selectors.json for full class surface.",
    components
  };
}

/* ─── 3. tokens.json ──────────────────────────────────────────────────────── */
// Reads core.css and semantic.css, extracts CSS custom properties, and
// outputs a grouped manifest with px equivalents for dimension tokens.

async function buildTokensManifest() {
  const tokenSources = [
    resolve(rootDir, "packages/tokens/core.css"),
    resolve(rootDir, "packages/tokens/semantic.css")
  ];

  const rawTokens = {};
  for (const src of tokenSources) {
    let css;
    try {
      css = await readFile(src, "utf8");
    } catch {
      continue;
    }
    for (const m of css.matchAll(/\s*(--[\w-]+)\s*:\s*([^;}\n]+)/g)) {
      rawTokens[m[1].trim()] = m[2].trim();
    }
  }

  const inferType = (name) => {
    if (name.startsWith("--color-")) return "color";
    if (
      name.startsWith("--space-") ||
      name.startsWith("--font-size-") ||
      name.startsWith("--radius-") ||
      name.startsWith("--container-")
    ) return "dimension";
    if (name.startsWith("--shadow-")) return "shadow";
    if (name.startsWith("--font-")) return "string";
    return "string";
  };

  // Group by first segment after --
  const groups = {};
  for (const [name, value] of Object.entries(rawTokens)) {
    const seg = name.replace(/^--/, "").split("-")[0];
    if (!groups[seg]) groups[seg] = {};
    const entry = { $value: value, $type: inferType(name) };
    const px = remToPx(value);
    if (px !== null) entry.px = px;
    groups[seg][name] = entry;
  }

  return {
    schema_version: SCHEMA_VERSION,
    generated: GENERATED,
    note: "Tokens extracted from packages/tokens/core.css and semantic.css. px values computed from rem at base 16.",
    groups
  };
}

/* ─── 4. capabilities.json ────────────────────────────────────────────────── */

async function buildCapabilitiesManifest() {
  const components = {};
  for (const [name, entry] of Object.entries(capabilitiesContract)) {
    components[name] = {
      status: entry.status,
      does: entry.does || [],
      does_not: entry.does_not || [],
      requires_app_css: entry.requires_app_css || []
    };
  }

  return {
    schema_version: SCHEMA_VERSION,
    generated: GENERATED,
    note: "Each entry documents what the CSS provides and what the application must handle itself.",
    components
  };
}

/* ─── 5. variants.json ────────────────────────────────────────────────────── */
// Derives canonical global axes from the recipes contract and adds
// per-component applicable variant axes.

async function buildVariantsManifest() {
  // Global canonical axes (plan.md §5)
  const global = {
    tones: ["neutral", "primary", "success", "warning", "danger", "info"],
    styles: ["solid", "soft", "outline", "ghost", "plain"],
    sizes: ["xs", "sm", "md", "lg"]
  };

  // Per-component axes from recipes contract
  const components = {};
  for (const [name, resolver] of Object.entries(recipesContract.resolvers)) {
    const axes = {};
    for (const [axisName, axisValues] of Object.entries(resolver.variants)) {
      axes[axisName] = {
        values: Object.keys(axisValues),
        default: resolver.defaults[axisName] ?? null
      };
    }
    components[name] = {
      resolver_fn: `${name}Recipe`,
      defaults: resolver.defaults,
      axes
    };
  }

  // Additional components with size variants (from naming contract but not in recipes)
  const sizeOnlyComponents = {
    "icon-button": { sizes: ["xs", "sm", "md", "lg"], default_size: "md" },
    "input": { sizes: ["sm", "md", "lg"], default_size: "md" },
    "select": { sizes: ["sm", "md", "lg"], default_size: "md" },
    "pagination": { sizes: ["sm", "md", "lg"], default_size: "md" },
    "spinner": { sizes: ["sm", "md", "lg"], default_size: "md" },
    "avatar": { sizes: ["sm", "md", "lg"], default_size: "md" },
    "segmented-control": { sizes: ["xs", "sm", "md", "lg"], default_size: "md" }
  };

  // Toast tones (not in recipes but in CSS)
  const toastTones = ["danger", "success", "info", "warn", "error"];

  return {
    schema_version: SCHEMA_VERSION,
    generated: GENERATED,
    note: "Recipe-based components have a resolver function in fikir-css/tooling. See resolver_fn field.",
    global,
    recipe_components: components,
    size_variants: sizeOnlyComponents,
    tone_overrides: {
      toast: {
        note: "Toast tones applied via data-tone attribute or modifier class (toast--success etc.)",
        values: toastTones
      }
    }
  };
}

/* ─── 6. primitives.json ──────────────────────────────────────────────────── */

async function buildPrimitivesManifest() {
  const primitives = {
    stack: {
      selector: "stack",
      description: "Vertical flex column. Children separated by gap.",
      layout: "flex",
      direction: "column",
      align: "stretch",
      default_gap: "var(--space-4)",
      css_properties: [
        { prop: "--stack-gap", description: "Override gap between children", default: "var(--space-4)" }
      ],
      data_attrs: [
        {
          attr: "data-stack-split-after",
          value: "<n>",
          description: "Push the last child to the end of the stack (useful for push footer pattern)."
        }
      ],
      example: '<div class="stack"><!-- children --></div>'
    },

    cluster: {
      selector: "cluster",
      description: "Horizontal flex wrap. Items flow left-to-right and wrap.",
      layout: "flex",
      direction: "row",
      wrap: "wrap",
      align: "center",
      justify: "flex-start",
      default_gap: "var(--space-2)",
      css_properties: [
        { prop: "--cluster-gap", description: "Override gap between items", default: "var(--space-2)" }
      ],
      data_attrs: [
        {
          attr: "data-cluster-justify",
          values: ["between"],
          description: "justify-content: space-between between items."
        },
        {
          attr: "data-cluster-nowrap",
          values: ["true"],
          description: "Disable flex-wrap. Items overflow-x: auto."
        }
      ],
      example: '<div class="cluster"><!-- inline items --></div>'
    },

    center: {
      selector: "center",
      description: "Horizontally centered content with max-width and gutters.",
      layout: "block",
      default_max_width: "var(--container-md)",
      default_gutter: "var(--space-4)",
      css_properties: [
        { prop: "--center-max", description: "Max inline size", default: "var(--container-md)" },
        { prop: "--center-gutter", description: "Horizontal gutters", default: "var(--space-4)" }
      ],
      data_attrs: [
        {
          attr: "data-center-intrinsic",
          values: ["true"],
          description: "Also center children intrinsically (CSS grid place-items: center)."
        }
      ],
      example: '<div class="center"><!-- centered content --></div>'
    },

    container: {
      selector: "container",
      description: "Simple centered max-width wrapper.",
      layout: "block",
      default_max_width: "var(--container-md)",
      default_gutter: "var(--space-4)",
      css_properties: [
        { prop: "--container-max", description: "Max inline size", default: "var(--container-md)" },
        { prop: "--container-gutter", description: "Horizontal gutters", default: "var(--space-4)" }
      ],
      data_attrs: [],
      example: '<div class="container"><!-- page content --></div>'
    },

    grid: {
      selector: "grid",
      description: "Auto-fit responsive grid. Items flow into columns automatically.",
      layout: "grid",
      default_gap: "var(--space-3)",
      default_min_column_width: "14rem",
      css_properties: [
        { prop: "--grid-gap", description: "Gap between grid cells", default: "var(--space-3)" },
        { prop: "--grid-min", description: "Minimum column width before wrapping", default: "14rem" }
      ],
      data_attrs: [],
      example: '<div class="grid"><!-- grid items --></div>'
    },

    switcher: {
      selector: "switcher",
      description: "Flex layout that switches from horizontal to vertical when items reach minimum width.",
      layout: "flex",
      direction: "row (switches to column when items are too narrow)",
      default_gap: "var(--space-4)",
      default_min_item_width: "16rem",
      css_properties: [
        { prop: "--switcher-gap", description: "Gap between items", default: "var(--space-4)" },
        { prop: "--switcher-min", description: "Min item width before wrapping", default: "16rem" }
      ],
      data_attrs: [
        {
          attr: "data-switcher-fixed",
          values: ["true"],
          description: "Prevent items from growing beyond their min width."
        }
      ],
      example: '<div class="switcher"><!-- items --></div>'
    },

    sidebar: {
      selector: "sidebar",
      description: "Two-column grid: narrow sidebar + wide main content. Collapses to single column below 56rem.",
      layout: "grid",
      default_sidebar_width: "18rem",
      default_gap: "var(--space-6)",
      breakpoint: "56rem",
      css_properties: [
        { prop: "--sidebar-width", description: "Sidebar column width", default: "18rem" },
        { prop: "--sidebar-gap", description: "Gap between sidebar and content", default: "var(--space-6)" },
        { prop: "--sidebar-min", description: "Minimum sidebar width", default: "14rem" }
      ],
      data_attrs: [
        {
          attr: "data-sidebar-side",
          values: ["end"],
          description: "Place sidebar on the inline-end (right in LTR)."
        }
      ],
      example: '<div class="sidebar">\n  <nav><!-- sidebar --></nav>\n  <main><!-- content --></main>\n</div>'
    }
  };

  return {
    schema_version: SCHEMA_VERSION,
    generated: GENERATED,
    note: "Layout primitives are plain CSS classes (not component selectors). Override via CSS custom properties on the element.",
    primitives
  };
}

/* ─── main ────────────────────────────────────────────────────────────────── */

async function main() {
  console.log("Generating machine-readable manifests...");

  const [selectors, anatomy, tokens, capabilities, variants, primitives] =
    await Promise.all([
      buildSelectorsManifest(),
      buildAnatomyManifest(),
      buildTokensManifest(),
      buildCapabilitiesManifest(),
      buildVariantsManifest(),
      buildPrimitivesManifest()
    ]);

  await Promise.all([
    write("selectors.json", selectors),
    write("anatomy.json", anatomy),
    write("tokens.json", tokens),
    write("capabilities.json", capabilities),
    write("variants.json", variants),
    write("primitives.json", primitives)
  ]);

  console.log("All manifests generated.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
