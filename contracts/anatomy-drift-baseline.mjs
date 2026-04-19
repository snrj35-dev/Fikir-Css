/**
 * anatomy-drift-baseline.mjs
 *
 * Known CSS components that do not yet have an anatomy.json entry.
 * These are pre-existing omissions tracked here to prevent false positives
 * in the CI drift detection step. Remove entries from this list as you
 * add them to anatomy.contract.mjs.
 *
 * @see scripts/detect-css-anatomy-drift.mjs
 */
export const anatomyDriftBaseline = new Set([
  "autocomplete",
  "calendar",
  "callout",
  "code",
  "code-block",
  "combobox",
  "context-menu",
  "date-picker",
  "date-range-picker",
  "date-time-picker",
  "dropzone",
  "editable-field",
  "file-upload",
  "heading",
  "inline-notice",
  "kbd",
  "markdown-surface",
  "number-input",
  "quote",
  "range-slider",
  "rating",
  "settings-panel",
  "split-button",
  "tags-input",
  "text",
  "time-picker",
  "tree-table"
]);
