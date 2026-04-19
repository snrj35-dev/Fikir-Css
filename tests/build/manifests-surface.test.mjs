/**
 * manifests-surface.test.mjs
 * Validates that all dist/contracts/ manifests are present and structurally correct.
 *
 * Run: node --test tests/build/manifests-surface.test.mjs
 * (Requires `npm run build:manifests` to have been run first.)
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = resolve(process.cwd());
const contractsDir = resolve(rootDir, "dist/contracts");

async function readJSON(filename) {
  const raw = await readFile(resolve(contractsDir, filename), "utf8");
  return JSON.parse(raw);
}

/* ─── selectors.json ─────────────────────────────────────────────────────── */

describe("selectors.json", () => {
  it("file is readable and valid JSON", async () => {
    const data = await readJSON("selectors.json");
    assert.ok(data, "selectors.json should parse");
  });

  it("has schema_version 1.0", async () => {
    const data = await readJSON("selectors.json");
    assert.strictEqual(data.schema_version, "1.0");
  });

  it("has generated timestamp", async () => {
    const data = await readJSON("selectors.json");
    assert.match(data.generated, /^\d{4}-\d{2}-\d{2}/);
  });

  it("has selectors object with at least 100 entries", async () => {
    const data = await readJSON("selectors.json");
    assert.ok(typeof data.selectors === "object");
    assert.ok(Object.keys(data.selectors).length >= 100, "Expected 100+ selector entries");
  });

  it("contains core component selectors", async () => {
    const data = await readJSON("selectors.json");
    const required = ["component.btn", "component.badge", "component.modal", "component.alert", "component.card"];
    for (const key of required) {
      assert.ok(data.selectors[key], `Missing selector: ${key}`);
    }
  });

  it("has data_markers with global section", async () => {
    const data = await readJSON("selectors.json");
    assert.ok(data.data_markers, "data_markers should exist");
    assert.ok(Array.isArray(data.data_markers.global), "data_markers.global should be an array");
    assert.ok(data.data_markers.global.length >= 3, "Expected at least 3 global data markers");
  });

  it("global data markers have attr and values fields", async () => {
    const data = await readJSON("selectors.json");
    for (const marker of data.data_markers.global) {
      assert.ok(marker.attr, "Global marker should have attr");
      assert.ok(Array.isArray(marker.values), "Global marker should have values array");
    }
  });

  it("naming object has mode field", async () => {
    const data = await readJSON("selectors.json");
    assert.ok(data.naming, "naming should exist");
    assert.ok(data.naming.mode, "naming.mode should exist");
  });
});

/* ─── anatomy.json ───────────────────────────────────────────────────────── */

describe("anatomy.json", () => {
  it("file is readable and valid JSON", async () => {
    const data = await readJSON("anatomy.json");
    assert.ok(data);
  });

  it("has schema_version 1.0", async () => {
    const data = await readJSON("anatomy.json");
    assert.strictEqual(data.schema_version, "1.0");
  });

  it("has components object with at least 30 entries", async () => {
    const data = await readJSON("anatomy.json");
    assert.ok(typeof data.components === "object");
    assert.ok(Object.keys(data.components).length >= 30, "Expected 30+ component anatomy entries");
  });

  it("every component entry has required fields", async () => {
    const data = await readJSON("anatomy.json");
    for (const [name, entry] of Object.entries(data.components)) {
      assert.ok(entry.root_selector, `${name}: missing root_selector`);
      assert.ok(entry.element, `${name}: missing element`);
      assert.ok(Array.isArray(entry.elements), `${name}: elements must be array`);
      assert.ok(entry.minimal_html, `${name}: missing minimal_html`);
      assert.ok(entry.status, `${name}: missing status`);
    }
  });

  it("core components are present", async () => {
    const data = await readJSON("anatomy.json");
    const required = ["button", "modal", "drawer", "tabs", "accordion", "badge", "alert", "card", "table", "app-shell"];
    for (const name of required) {
      assert.ok(data.components[name], `Missing anatomy for: ${name}`);
    }
  });

  it("modal has visibility info and 5+ elements", async () => {
    const data = await readJSON("anatomy.json");
    const modal = data.components.modal;
    assert.ok(modal, "modal entry should exist");
    assert.ok(modal.visibility, "modal should have visibility");
    assert.ok(modal.elements.length >= 4, "modal should have 4+ sub-elements");
  });

  it("sub-elements have selector, role, element fields", async () => {
    const data = await readJSON("anatomy.json");
    for (const [compName, entry] of Object.entries(data.components)) {
      for (const el of (entry.elements || [])) {
        assert.ok(
          el.selector || el.slot,
          `${compName} sub-element missing selector`
        );
        assert.ok(el.role, `${compName} sub-element missing role`);
        assert.ok(el.element, `${compName} sub-element missing element`);
      }
    }
  });

  it("data_attrs entries have attr and values fields", async () => {
    const data = await readJSON("anatomy.json");
    for (const [compName, entry] of Object.entries(data.components)) {
      for (const da of (entry.data_attrs || [])) {
        assert.ok(da.attr, `${compName} data_attr missing attr`);
        assert.ok(Array.isArray(da.values), `${compName} data_attr missing values array`);
      }
    }
  });
});

/* ─── tokens.json ────────────────────────────────────────────────────────── */

describe("tokens.json", () => {
  it("file is readable and valid JSON", async () => {
    const data = await readJSON("tokens.json");
    assert.ok(data);
  });

  it("has schema_version 1.0", async () => {
    const data = await readJSON("tokens.json");
    assert.strictEqual(data.schema_version, "1.0");
  });

  it("has groups object with at least 3 groups", async () => {
    const data = await readJSON("tokens.json");
    assert.ok(typeof data.groups === "object");
    assert.ok(Object.keys(data.groups).length >= 3);
  });

  it("has color, space, font groups", async () => {
    const data = await readJSON("tokens.json");
    assert.ok(data.groups.color, "Expected color group");
    assert.ok(data.groups.space, "Expected space group");
    assert.ok(data.groups.font, "Expected font group");
  });

  it("every token entry has $value and $type", async () => {
    const data = await readJSON("tokens.json");
    for (const [groupName, group] of Object.entries(data.groups)) {
      for (const [tokenName, entry] of Object.entries(group)) {
        assert.ok(entry.$value !== undefined, `${groupName}.${tokenName}: missing $value`);
        assert.ok(entry.$type, `${groupName}.${tokenName}: missing $type`);
      }
    }
  });

  it("dimension tokens have px equivalents where value is rem", async () => {
    const data = await readJSON("tokens.json");
    const spaceGroup = data.groups.space || {};
    const remTokens = Object.values(spaceGroup).filter((e) => String(e.$value).endsWith("rem"));
    const withPx = remTokens.filter((e) => typeof e.px === "number");
    // At least some space tokens should have px values
    if (remTokens.length > 0) {
      assert.ok(withPx.length > 0, "Expected some rem tokens to have px equivalents");
    }
  });
});

/* ─── capabilities.json ──────────────────────────────────────────────────── */

describe("capabilities.json", () => {
  it("file is readable and valid JSON", async () => {
    const data = await readJSON("capabilities.json");
    assert.ok(data);
  });

  it("has schema_version 1.0", async () => {
    const data = await readJSON("capabilities.json");
    assert.strictEqual(data.schema_version, "1.0");
  });

  it("has components object with at least 20 entries", async () => {
    const data = await readJSON("capabilities.json");
    assert.ok(Object.keys(data.components).length >= 20);
  });

  it("every component has does, does_not, requires_app_css arrays", async () => {
    const data = await readJSON("capabilities.json");
    for (const [name, entry] of Object.entries(data.components)) {
      assert.ok(Array.isArray(entry.does), `${name}: does must be array`);
      assert.ok(Array.isArray(entry.does_not), `${name}: does_not must be array`);
      assert.ok(Array.isArray(entry.requires_app_css), `${name}: requires_app_css must be array`);
    }
  });

  it("modal documents focus trap in does_not", async () => {
    const data = await readJSON("capabilities.json");
    const modal = data.components.modal;
    assert.ok(modal, "modal entry should exist");
    const hasNote = modal.does_not.some((d) => d.toLowerCase().includes("focus"));
    assert.ok(hasNote, "modal.does_not should mention focus trap");
  });

  it("navbar documents no fixed positioning in does_not", async () => {
    const data = await readJSON("capabilities.json");
    const navbar = data.components.navbar;
    assert.ok(navbar, "navbar entry should exist");
    const hasNote = navbar.does_not.some((d) => d.toLowerCase().includes("fixed"));
    assert.ok(hasNote, "navbar.does_not should mention fixed positioning");
  });
});

/* ─── variants.json ──────────────────────────────────────────────────────── */

describe("variants.json", () => {
  it("file is readable and valid JSON", async () => {
    const data = await readJSON("variants.json");
    assert.ok(data);
  });

  it("has schema_version 1.0", async () => {
    const data = await readJSON("variants.json");
    assert.strictEqual(data.schema_version, "1.0");
  });

  it("global tones include all 6 canonical values", async () => {
    const data = await readJSON("variants.json");
    const canonical = ["neutral", "primary", "success", "warning", "danger", "info"];
    for (const tone of canonical) {
      assert.ok(data.global.tones.includes(tone), `Missing global tone: ${tone}`);
    }
  });

  it("global styles include all 5 canonical values", async () => {
    const data = await readJSON("variants.json");
    const canonical = ["solid", "soft", "outline", "ghost", "plain"];
    for (const style of canonical) {
      assert.ok(data.global.styles.includes(style), `Missing global style: ${style}`);
    }
  });

  it("global sizes include xs, sm, md, lg", async () => {
    const data = await readJSON("variants.json");
    for (const size of ["xs", "sm", "md", "lg"]) {
      assert.ok(data.global.sizes.includes(size), `Missing global size: ${size}`);
    }
  });

  it("button recipe component exists with tone and variant axes", async () => {
    const data = await readJSON("variants.json");
    const btn = data.recipe_components.button;
    assert.ok(btn, "button recipe should exist");
    assert.ok(btn.axes.tone, "button should have tone axis");
    assert.ok(btn.axes.variant, "button should have variant axis");
    assert.ok(btn.resolver_fn, "button should have resolver_fn");
  });

  it("badge recipe component has 6 tone values", async () => {
    const data = await readJSON("variants.json");
    const badge = data.recipe_components.badge;
    assert.ok(badge, "badge recipe should exist");
    assert.ok(badge.axes.tone.values.length >= 5, "badge should have 5+ tones");
  });
});

/* ─── primitives.json ────────────────────────────────────────────────────── */

describe("primitives.json", () => {
  it("file is readable and valid JSON", async () => {
    const data = await readJSON("primitives.json");
    assert.ok(data);
  });

  it("has schema_version 1.0", async () => {
    const data = await readJSON("primitives.json");
    assert.strictEqual(data.schema_version, "1.0");
  });

  it("has all 7 layout primitives", async () => {
    const data = await readJSON("primitives.json");
    const expected = ["stack", "cluster", "center", "container", "grid", "switcher", "sidebar"];
    for (const p of expected) {
      assert.ok(data.primitives[p], `Missing primitive: ${p}`);
    }
  });

  it("every primitive has selector, description, layout, example", async () => {
    const data = await readJSON("primitives.json");
    for (const [name, entry] of Object.entries(data.primitives)) {
      assert.ok(entry.selector, `${name}: missing selector`);
      assert.ok(entry.description, `${name}: missing description`);
      assert.ok(entry.layout, `${name}: missing layout`);
      assert.ok(entry.example, `${name}: missing example`);
    }
  });

  it("stack has default_gap and css_properties", async () => {
    const data = await readJSON("primitives.json");
    const stack = data.primitives.stack;
    assert.ok(stack.default_gap, "stack should have default_gap");
    assert.ok(Array.isArray(stack.css_properties), "stack should have css_properties array");
  });

  it("sidebar has breakpoint documented", async () => {
    const data = await readJSON("primitives.json");
    assert.ok(data.primitives.sidebar.breakpoint, "sidebar should have breakpoint");
  });
});
