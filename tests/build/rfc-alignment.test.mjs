import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

import { recipesContract } from "../../contracts/recipes.contract.mjs";

const rootDir = resolve(process.cwd());
const resolverPath = resolve(rootDir, "packages/recipes/generated/resolvers.ts");
const selectorsManifestPath = resolve(rootDir, "dist/contracts/selectors.json");

async function readResolverSource() {
  return readFile(resolverPath, "utf8");
}

test("RFC guardrail: button/card default recipe values stay stable", () => {
  assert.deepEqual(recipesContract.resolvers.button.defaults, {
    variant: "solid",
    tone: "primary",
    size: "md"
  });

  assert.deepEqual(recipesContract.resolvers.card.defaults, {
    variant: "plain",
    padding: "md"
  });
});

test("RFC guardrail: resolver output order is deterministic for button/card", async () => {
  const src = await readResolverSource();

  const buttonOrderMarkers = [
    "const classes = [...buttonBase];",
    "const variant = input.variant ?? defaults.variant;",
    "classes.push(...variants.variant[variant as ButtonVariant]);",
    "const tone = input.tone ?? defaults.tone;",
    "classes.push(...variants.tone[tone as ButtonTone]);",
    "const size = input.size ?? defaults.size;",
    "classes.push(...variants.size[size as ButtonSize]);",
    "return classes.join(\" \");"
  ];

  let previousIdx = -1;
  for (const marker of buttonOrderMarkers) {
    const idx = src.indexOf(marker);
    assert.ok(idx !== -1, `Missing button resolver marker: ${marker}`);
    assert.ok(idx > previousIdx, `Button resolver order mismatch around: ${marker}`);
    previousIdx = idx;
  }

  const cardOrderMarkers = [
    "const classes = [...cardBase];",
    "const variant = input.variant ?? defaults.variant;",
    "classes.push(...variants.variant[variant as CardVariant]);",
    "const padding = input.padding ?? defaults.padding;",
    "classes.push(...variants.padding[padding as CardPadding]);",
    "return classes.join(\" \");"
  ];

  const cardFunctionStart = src.indexOf("export function cardRecipe");
  assert.ok(cardFunctionStart !== -1, "Missing cardRecipe function");

  previousIdx = cardFunctionStart - 1;
  for (const marker of cardOrderMarkers) {
    const idx = src.indexOf(marker, cardFunctionStart);
    assert.ok(idx !== -1, `Missing card resolver marker: ${marker}`);
    assert.ok(idx > previousIdx, `Card resolver order mismatch around: ${marker}`);
    previousIdx = idx;
  }
});

test("RFC guardrail: forbidden class names are absent from canonical selector surface", async () => {
  const manifest = JSON.parse(await readFile(selectorsManifestPath, "utf8"));
  const canonicalClasses = new Set(Object.values(manifest.selectors));
  const forbidden = [
    "button",
    "btn-disabled",
    "input-disabled",
    "textarea-disabled",
    "select-disabled",
    "checkbox-disabled",
    "radio-disabled",
    "switch-disabled",
    "input-group-disabled",
    "input-group-invalid",
    "modal-open",
    "modal-closed",
    "modal-dialog-lg",
    "toast-open",
    "toast-closed",
    "toast-danger",
    "card-disabled",
    "btn-loading",
    "input-loading",
    "textarea-loading",
    "select-loading",
    "checkbox-loading",
    "radio-loading",
    "switch-loading",
    "input-group-loading",
    "modal-loading",
    "toast-loading",
    "card-loading",
    "input-sm",
    "input-md",
    "input-lg",
    "textarea-sm",
    "textarea-md",
    "textarea-lg",
    "select-sm",
    "select-md",
    "select-lg",
    "checkbox-sm",
    "checkbox-md",
    "checkbox-lg",
    "radio-sm",
    "radio-md",
    "radio-lg",
    "switch-sm",
    "switch-md",
    "switch-lg",
    "input-group-sm",
    "input-group-md",
    "input-group-lg",
    "input-prefix",
    "input-suffix",
    "modal-sm",
    "modal-md",
    "modal-lg",
    "toast-sm",
    "toast-md",
    "toast-lg",
    "toast-item",
    "toast-container",
    "tooltip-open",
    "tooltip-closed",
    "tooltip-panel",
    "tooltip-bubble",
    "popover-open",
    "popover-closed",
    "popover-panel",
    "overlay-popover",
    "dropdown-open",
    "dropdown-closed",
    "dropdown-panel",
    "menu-dropdown",
    "drawer-open",
    "drawer-closed",
    "side-drawer",
    "drawer-dialog",
    "tab",
    "tab-list",
    "tab-trigger",
    "tab-panel",
    "accordion-open",
    "accordion-header",
    "accordion-body",
    "faq-accordion",
    "pager",
    "pagination-link",
    "pagination-active",
    "page-item",
    "breadcrumbs",
    "crumb",
    "breadcrumb-active",
    "breadcrumb-disabled",
    "top-nav",
    "main-navbar",
    "nav-item-active",
    "navbar-active",
    "sidebar-menu",
    "side-nav",
    "sidebar-item-active",
    "sidebar-nav-active",
    "steps",
    "step-item",
    "step-active",
    "stepper-active",
    "header-bar",
    "page-title-bar",
    "page-toolbar",
    "section-container",
    "section-panel",
    "app-section",
    "app-layout",
    "shell-layout",
    "main-shell",
    "data-table",
    "table-grid",
    "table-header-cell",
    "table-body-row",
    "empty",
    "blank-state",
    "zero-state",
    "empty-panel",
    "profile-avatar",
    "user-avatar",
    "avatar-placeholder",
    "avatar-xs",
    "metric-card",
    "kpi",
    "stat-title",
    "stat-number",
    "stat-caption",
    "timeline-list",
    "timeline-entry",
    "timeline-dot",
    "timeline-event",
    "metric-tile",
    "kpi-panel",
    "kpi-value",
    "kpi-trend",
    "item-list",
    "data-list",
    "list-row",
    "list-entry",
    "desc-list",
    "dl-list",
    "kv-list",
    "description-key",
    "description-value",
    "combo-box",
    "combo-select",
    "combobox-field",
    "combobox-item",
    "searchbar",
    "search-input-group",
    "site-search",
    "search-submit",
    "auto-complete",
    "typeahead",
    "suggestion-list",
    "autocomplete-item",
    "command-menu",
    "palette-dialog",
    "command-list",
    "command-item",
    "datepicker",
    "date-input",
    "calendar-picker",
    "date-picker-open",
    "date-picker-selected",
    "daterange-picker",
    "date-range",
    "range-calendar",
    "date-range-picker-open",
    "date-range-picker-in-range",
    "month-grid",
    "calendar-open",
    "calendar-cell",
    "calendar-selected",
    "file-uploader",
    "file-input",
    "upload-field",
    "upload-box",
    "file-upload-disabled",
    "file-upload-open",
    "drop-zone",
    "upload-dropzone",
    "droparea",
    "dropzone-open",
    "dropzone-disabled",
    "inline-editor",
    "editable-input",
    "field-editor",
    "edit-field",
    "editable-field-editing",
    "editable-field-disabled",
    "hovercard",
    "hover-panel",
    "profile-hover-card",
    "hover-card-open",
    "hover-card-closed",
    "toggle"
  ];

  for (const className of forbidden) {
    assert.equal(
      canonicalClasses.has(className),
      false,
      `Forbidden canonical class leaked into selector surface: ${className}`
    );
  }
});
