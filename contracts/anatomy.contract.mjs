/**
 * Anatomy Contract — source of truth for dist/contracts/anatomy.json
 * Each entry describes the HTML structure of a component for AI/tooling consumption.
 */
export const anatomyContract = {

  /* ─── Core ─────────────────────────────────────────────────────────────── */

  button: {
    status: "stable",
    root_selector: "btn",
    element: "button",
    elements: [],
    data_attrs: [],
    minimal_html: '<button class="btn btn-primary btn-md">Label</button>',
    notes: "Single element. Use <button> or <a>. Tone: btn-primary | btn-neutral | btn-danger. Style: btn-solid | btn-soft | btn-outline | btn-ghost | btn-plain. Size: btn-xs | btn-sm | btn-md | btn-lg."
  },

  "icon-button": {
    status: "stable",
    root_selector: "icon-button",
    element: "button",
    elements: [],
    data_attrs: [],
    minimal_html: '<button class="icon-button icon-button-md" aria-label="Close">×</button>',
    notes: "Square icon-only button. Always add aria-label. Size: icon-button-xs | icon-button-sm | icon-button-md | icon-button-lg."
  },

  link: {
    status: "stable",
    root_selector: "link",
    element: "a",
    elements: [],
    data_attrs: [],
    minimal_html: '<a class="link" href="/path">Link text</a>',
    notes: "Inline link. Tone variants: link-muted | link-danger."
  },

  badge: {
    status: "stable",
    root_selector: "badge",
    element: "span",
    elements: [],
    data_attrs: [],
    minimal_html: '<span class="badge badge-primary badge-soft badge-md">Label</span>',
    notes: "Inline pill. Tone: badge-primary | badge-neutral | badge-success | badge-warning | badge-danger | badge-info. Style: badge-solid | badge-soft | badge-outline | badge-plain. Size: badge-xs | badge-sm | badge-md | badge-lg."
  },

  alert: {
    status: "stable",
    root_selector: "alert",
    element: "div",
    elements: [
      { selector: "alert-title", role: "title", element: "p" },
      { selector: "alert-description", role: "description", element: "p" }
    ],
    data_attrs: [
      { attr: "data-style", on: "root", values: ["outline"], description: "Outline style variant." }
    ],
    minimal_html: '<div class="alert alert-danger">\n  <p class="alert-title">Error title</p>\n  <p class="alert-description">Description text.</p>\n</div>',
    notes: "Tone classes: alert-danger | alert-warning | alert-success | alert-info | alert-neutral. Style modifier: data-style=\"outline\"."
  },

  card: {
    status: "stable",
    root_selector: "card",
    element: "div",
    elements: [],
    data_attrs: [],
    minimal_html: '<div class="card card-flat card-p-md"><!-- content --></div>',
    notes: "Variant: card-flat | card-plain | card-subtle | card-elevated | card-interactive. Padding: card-p-sm | card-p-md | card-p-lg."
  },

  surface: {
    status: "stable",
    root_selector: "surface",
    element: "div",
    elements: [],
    data_attrs: [],
    minimal_html: '<div class="surface surface-elevated">Content</div>',
    notes: "Generic container. Variants: surface-flat | surface-subtle | surface-elevated | surface-interactive | surface-raised | surface-sunken."
  },

  divider: {
    status: "stable",
    root_selector: "divider",
    element: "hr",
    elements: [],
    data_attrs: [
      { attr: "data-orientation", on: "root", values: ["horizontal", "vertical"], description: "Divider orientation." }
    ],
    minimal_html: '<hr class="divider" />',
    notes: "Use <hr> element."
  },

  spinner: {
    status: "stable",
    root_selector: "spinner",
    element: "span",
    elements: [],
    data_attrs: [],
    minimal_html: '<span class="spinner spinner-md" aria-label="Loading" role="status"></span>',
    notes: "Size: spinner-sm | spinner-md | spinner-lg. Add aria-label=\"Loading\" and role=\"status\"."
  },

  skeleton: {
    status: "stable",
    root_selector: "skeleton",
    element: "div",
    elements: [
      { selector: "skeleton-text", role: "text line placeholder", element: "div" },
      { selector: "skeleton-block", role: "rectangular placeholder", element: "div" },
      { selector: "skeleton-circle", role: "circular placeholder (avatar)", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div class="skeleton" aria-hidden="true">\n  <div class="skeleton-circle"></div>\n  <div class="skeleton-text"></div>\n  <div class="skeleton-text"></div>\n</div>',
    notes: "Add aria-hidden=\"true\" on wrapper. Presets: skeleton-table | skeleton-card | skeleton-form."
  },

  "visually-hidden": {
    status: "stable",
    root_selector: "visually-hidden",
    element: "span",
    elements: [],
    data_attrs: [],
    minimal_html: '<span class="visually-hidden">Screen reader text</span>',
    notes: "Visually hidden, accessible to screen readers. Use for icon-only interactive elements."
  },

  /* ─── Form / Input ──────────────────────────────────────────────────────── */

  field: {
    status: "stable",
    root_selector: "field",
    element: "div",
    elements: [
      { selector: "label", role: "field label", element: "label" },
      { selector: "helper-text", role: "hint text", element: "p" },
      { selector: "error-text", role: "error message", element: "p" }
    ],
    data_attrs: [
      { attr: "data-invalid", on: "root", values: ["true"], description: "Marks field as invalid." }
    ],
    minimal_html: '<div class="field">\n  <label class="label" for="email">Email</label>\n  <input class="input input-md" id="email" type="email" />\n  <p class="helper-text">We will not share your email.</p>\n  <p class="error-text" hidden>Invalid email address.</p>\n</div>',
    notes: "helper-text and error-text are mutually exclusive — show one at a time. Connect with aria-describedby."
  },

  label: {
    status: "stable",
    root_selector: "label",
    element: "label",
    elements: [],
    data_attrs: [],
    minimal_html: '<label class="label" for="input-id">Field Label</label>',
    notes: "Always use for attribute pointing to input id."
  },

  "helper-text": {
    status: "stable",
    root_selector: "helper-text",
    element: "p",
    elements: [],
    data_attrs: [],
    minimal_html: '<p class="helper-text">Hint text.</p>',
    notes: "Used inside field. Mutually exclusive with error-text."
  },

  "error-text": {
    status: "stable",
    root_selector: "error-text",
    element: "p",
    elements: [],
    data_attrs: [],
    minimal_html: '<p class="error-text" role="alert">This field is required.</p>',
    notes: "Used inside field. Mutually exclusive with helper-text. Add role=\"alert\" for live announcement."
  },

  input: {
    status: "stable",
    root_selector: "input",
    element: "input",
    elements: [],
    data_attrs: [
      { attr: "aria-invalid", on: "root", values: ["true"], description: "Invalid/error state on the input element." },
      { attr: "disabled", on: "root", values: ["present"], description: "Native disabled state." },
      { attr: "readonly", on: "root", values: ["present"], description: "Native readonly state." },
      { attr: "required", on: "root", values: ["present"], description: "Marks the field as required." }
    ],
    minimal_html: '<input class="input input-md" type="text" placeholder="Placeholder" />',
    notes: "Single element. Size: input-sm | input-md | input-lg. Always pair with label inside field."
  },

  textarea: {
    status: "stable",
    root_selector: "textarea",
    element: "textarea",
    elements: [],
    data_attrs: [
      { attr: "aria-invalid", on: "root", values: ["true"], description: "Invalid/error state on the textarea element." },
      { attr: "disabled", on: "root", values: ["present"], description: "Native disabled state." },
      { attr: "readonly", on: "root", values: ["present"], description: "Native readonly state." },
      { attr: "required", on: "root", values: ["present"], description: "Marks the field as required." }
    ],
    minimal_html: '<textarea class="textarea" rows="3"></textarea>',
    notes: "Single element. Pair with label."
  },

  select: {
    status: "stable",
    root_selector: "select",
    element: "select",
    elements: [],
    data_attrs: [
      { attr: "aria-invalid", on: "root", values: ["true"], description: "Invalid/error state on the select element." },
      { attr: "disabled", on: "root", values: ["present"], description: "Native disabled state." },
      { attr: "required", on: "root", values: ["present"], description: "Marks the field as required." }
    ],
    minimal_html: '<select class="select select-md">\n  <option>Option 1</option>\n  <option>Option 2</option>\n</select>',
    notes: "Native select. Size: select-sm | select-md | select-lg."
  },

  checkbox: {
    status: "stable",
    root_selector: "checkbox",
    element: "input",
    elements: [],
    data_attrs: [
      { attr: "aria-invalid", on: "root", values: ["true"], description: "Invalid/error state on the checkbox element." },
      { attr: "disabled", on: "root", values: ["present"], description: "Native disabled state." },
      { attr: "required", on: "root", values: ["present"], description: "Marks the checkbox as required." }
    ],
    minimal_html: '<input class="checkbox" type="checkbox" id="cb1" />\n<label class="label" for="cb1">Label</label>',
    notes: "Native checkbox. Always pair with a label."
  },

  radio: {
    status: "stable",
    root_selector: "radio",
    element: "input",
    elements: [],
    data_attrs: [],
    minimal_html: '<input class="radio" type="radio" name="group" id="r1" />\n<label class="label" for="r1">Option</label>',
    notes: "Native radio. Always pair with a label."
  },

  switch: {
    status: "stable",
    root_selector: "switch",
    element: "input",
    elements: [],
    data_attrs: [],
    minimal_html: '<input class="switch" type="checkbox" role="switch" id="sw1" />\n<label class="label" for="sw1">Toggle feature</label>',
    notes: "Use type=\"checkbox\" role=\"switch\". Pair with label."
  },

  "input-group": {
    status: "stable",
    root_selector: "input-group",
    element: "div",
    elements: [
      { selector: "input-group-addon", role: "prefix or suffix addon", element: "span" }
    ],
    data_attrs: [],
    minimal_html: '<div class="input-group">\n  <span class="input-group-addon">@</span>\n  <input class="input input-md" type="text" />\n</div>',
    notes: "First child = prefix addon, last child = suffix addon."
  },

  "search-box": {
    status: "stable",
    root_selector: "search-box",
    element: "div",
    elements: [
      { selector: "search-box-input", role: "search input", element: "input" },
      { selector: "search-box-action", role: "search trigger button", element: "button" }
    ],
    data_attrs: [],
    minimal_html: '<div class="search-box">\n  <input class="search-box-input" type="search" placeholder="Search..." />\n  <button class="search-box-action">Search</button>\n</div>',
    notes: "Composed search pattern."
  },

  "segmented-control": {
    status: "stable",
    root_selector: "segmented-control",
    element: "div",
    elements: [
      { selector: "segmented-control-item", role: "individual option wrapper", element: "label" },
      { selector: "segmented-control-input", role: "hidden radio input", element: "input" },
      { selector: "segmented-control-label", role: "visible label text", element: "span" }
    ],
    data_attrs: [],
    minimal_html: '<div class="segmented-control segmented-control-md">\n  <label class="segmented-control-item">\n    <input class="segmented-control-input" type="radio" name="view" checked />\n    <span class="segmented-control-label">List</span>\n  </label>\n  <label class="segmented-control-item">\n    <input class="segmented-control-input" type="radio" name="view" />\n    <span class="segmented-control-label">Grid</span>\n  </label>\n</div>',
    notes: "Radio-based. Size: segmented-control-xs | sm | md | lg."
  },

  "otp-input": {
    status: "stable",
    root_selector: "otp-input",
    element: "div",
    elements: [
      { selector: "otp-input-group", role: "group of slots", element: "div" },
      { selector: "otp-input-slot", role: "individual digit slot", element: "input" }
    ],
    data_attrs: [],
    minimal_html: '<div class="otp-input">\n  <div class="otp-input-group">\n    <input class="otp-input-slot" type="text" maxlength="1" inputmode="numeric" />\n    <input class="otp-input-slot" type="text" maxlength="1" inputmode="numeric" />\n    <input class="otp-input-slot" type="text" maxlength="1" inputmode="numeric" />\n    <input class="otp-input-slot" type="text" maxlength="1" inputmode="numeric" />\n    <input class="otp-input-slot" type="text" maxlength="1" inputmode="numeric" />\n    <input class="otp-input-slot" type="text" maxlength="1" inputmode="numeric" />\n  </div>\n</div>',
    notes: "Each slot is a separate input. App manages focus traversal."
  },

  calendar: {
    status: "stable",
    root_selector: "calendar",
    element: "div",
    elements: [
      { selector: "calendar-header", role: "month navigation row", element: "div" },
      { selector: "calendar-title", role: "current month label", element: "p" },
      { selector: "calendar-nav", role: "previous or next month button", element: "button" },
      { selector: "calendar-grid", role: "weekday + day grid", element: "div" },
      { selector: "calendar-weekday", role: "weekday label", element: "span" },
      { selector: "calendar-day", role: "single day cell", element: "button" }
    ],
    data_attrs: [
      { attr: "data-today", on: "calendar-day", values: ["true"], description: "Marks today's date." },
      { attr: "data-selected", on: "calendar-day", values: ["true"], description: "Marks the selected date." },
      { attr: "data-outside", on: "calendar-day", values: ["true"], description: "Marks a day rendered from the previous or next month." },
      { attr: "disabled", on: "calendar-day", values: ["present"], description: "Disables a day button." }
    ],
    minimal_html: '<div class="calendar" aria-label="April 2026 calendar">\n  <div class="calendar-header">\n    <button class="calendar-nav" type="button" aria-label="Previous month">‹</button>\n    <p class="calendar-title">April 2026</p>\n    <button class="calendar-nav" type="button" aria-label="Next month">›</button>\n  </div>\n  <div class="calendar-grid">\n    <span class="calendar-weekday">Mo</span>\n    <button class="calendar-day" type="button" data-selected="true">25</button>\n  </div>\n</div>',
    notes: "Standalone month calendar. calendar-grid commonly includes weekday labels first, followed by day buttons."
  },

  "date-picker": {
    status: "stable",
    root_selector: "date-picker",
    element: "div",
    elements: [
      { selector: "date-picker-input", role: "date text input", element: "input" },
      { selector: "date-picker-trigger", role: "panel toggle button", element: "button" },
      { selector: "date-picker-panel", role: "calendar panel", element: "div" },
      { selector: "date-picker-grid", role: "calendar day grid", element: "div" },
      { selector: "date-picker-day", role: "single day cell", element: "button" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Shows the calendar panel." },
      { attr: "aria-invalid", on: "date-picker-input", values: ["true"], description: "Invalid/error state on the text input." },
      { attr: "disabled", on: "date-picker-input", values: ["present"], description: "Native disabled state on the text input." },
      { attr: "data-today", on: "date-picker-day", values: ["true"], description: "Marks today's date." },
      { attr: "data-selected", on: "date-picker-day", values: ["true"], description: "Marks the selected date." },
      { attr: "data-outside", on: "date-picker-day", values: ["true"], description: "Marks a day rendered from the previous or next month." },
      { attr: "disabled", on: "date-picker-day", values: ["present"], description: "Disables a day button." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="date-picker" data-open="true">\n  <input class="date-picker-input input" type="text" placeholder="YYYY-MM-DD" aria-label="Date" />\n  <button class="date-picker-trigger btn btn-sm btn-outline" type="button" aria-label="Open date picker">Calendar</button>\n  <div class="date-picker-panel">\n    <div class="date-picker-grid">\n      <button class="date-picker-day" type="button" data-selected="true">25</button>\n    </div>\n  </div>\n</div>',
    notes: "Text input + disclosure button + calendar panel. JS owns parsing, month navigation and input/panel sync."
  },

  "date-range-picker": {
    status: "stable",
    root_selector: "date-range-picker",
    element: "div",
    elements: [
      { selector: "date-range-picker-start", role: "range start input", element: "input" },
      { selector: "date-range-picker-separator", role: "separator label", element: "span" },
      { selector: "date-range-picker-end", role: "range end input", element: "input" },
      { selector: "date-range-picker-trigger", role: "panel toggle button", element: "button" },
      { selector: "date-range-picker-panel", role: "calendar panel", element: "div" },
      { selector: "date-range-picker-grid", role: "calendar day grid", element: "div" },
      { selector: "date-range-picker-day", role: "single day cell", element: "button" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Shows the range calendar panel." },
      { attr: "data-in-range", on: "date-range-picker-day", values: ["true"], description: "Marks a day between the start and end dates." },
      { attr: "data-range-start", on: "date-range-picker-day", values: ["true"], description: "Marks the first selected day." },
      { attr: "data-range-end", on: "date-range-picker-day", values: ["true"], description: "Marks the last selected day." },
      { attr: "data-outside", on: "date-range-picker-day", values: ["true"], description: "Marks a day rendered from the previous or next month." },
      { attr: "disabled", on: "date-range-picker-day", values: ["present"], description: "Disables a day button." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="date-range-picker" data-open="true">\n  <input class="date-range-picker-start input" type="text" placeholder="Start date" aria-label="Start date" />\n  <span class="date-range-picker-separator" aria-hidden="true">–</span>\n  <input class="date-range-picker-end input" type="text" placeholder="End date" aria-label="End date" />\n  <button class="date-range-picker-trigger btn btn-sm btn-outline" type="button" aria-label="Open date range picker">Calendar</button>\n  <div class="date-range-picker-panel">\n    <div class="date-range-picker-grid">\n      <button class="date-range-picker-day" type="button" data-range-start="true">24</button>\n      <button class="date-range-picker-day" type="button" data-in-range="true">25</button>\n      <button class="date-range-picker-day" type="button" data-range-end="true">26</button>\n    </div>\n  </div>\n</div>',
    notes: "Paired start/end inputs with a shared range panel. JS owns range selection rules and input formatting."
  },

  "date-time-picker": {
    status: "stable",
    root_selector: "date-time-picker",
    element: "div",
    elements: [
      { selector: "date-time-picker-input", role: "date-time text input", element: "input" },
      { selector: "date-time-picker-trigger", role: "panel toggle button", element: "button" },
      { selector: "date-time-picker-panel", role: "combined panel", element: "div" },
      { selector: "date-time-picker-date-section", role: "calendar section", element: "div" },
      { selector: "date-time-picker-calendar", role: "calendar day grid", element: "div" },
      { selector: "date-time-picker-day", role: "single day cell", element: "button" },
      { selector: "date-time-picker-time-section", role: "time fields section", element: "div" },
      { selector: "date-time-picker-fields", role: "time field grid", element: "div" },
      { selector: "date-time-picker-field", role: "single time field", element: "div" },
      { selector: "date-time-picker-field-label", role: "time field label", element: "label" },
      { selector: "date-time-picker-field-input", role: "time field input", element: "input" },
      { selector: "date-time-picker-increment", role: "increment spinner button", element: "button" },
      { selector: "date-time-picker-decrement", role: "decrement spinner button", element: "button" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Shows the date-time panel." },
      { attr: "aria-invalid", on: "date-time-picker-input", values: ["true"], description: "Invalid/error state on the text input." },
      { attr: "disabled", on: "date-time-picker-input", values: ["present"], description: "Native disabled state on the text input." },
      { attr: "data-today", on: "date-time-picker-day", values: ["true"], description: "Marks today's date." },
      { attr: "data-selected", on: "date-time-picker-day", values: ["true"], description: "Marks the selected date." },
      { attr: "data-outside", on: "date-time-picker-day", values: ["true"], description: "Marks a day rendered from the previous or next month." },
      { attr: "disabled", on: "date-time-picker-day", values: ["present"], description: "Disables a day button." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="date-time-picker" data-open="true">\n  <input class="date-time-picker-input input" type="text" placeholder="YYYY-MM-DD HH:MM" aria-label="Date and time" />\n  <button class="date-time-picker-trigger btn btn-sm btn-outline" type="button" aria-label="Open date and time picker">Calendar</button>\n  <div class="date-time-picker-panel">\n    <div class="date-time-picker-date-section">\n      <div class="date-time-picker-calendar">\n        <button class="date-time-picker-day" type="button" data-selected="true">25</button>\n      </div>\n    </div>\n    <div class="date-time-picker-time-section">\n      <div class="date-time-picker-fields">\n        <div class="date-time-picker-field">\n          <label class="date-time-picker-field-label">Hour</label>\n          <input class="date-time-picker-field-input" type="text" value="14" inputmode="numeric" />\n        </div>\n      </div>\n    </div>\n  </div>\n</div>',
    notes: "Combined calendar + time control. JS owns parsing, focus flow, calendar navigation and synchronization between text input and panel."
  },

  "time-picker": {
    status: "stable",
    root_selector: "time-picker",
    element: "div",
    elements: [
      { selector: "time-picker-input", role: "time text input", element: "input" },
      { selector: "time-picker-trigger", role: "panel toggle button", element: "button" },
      { selector: "time-picker-panel", role: "time panel", element: "div" },
      { selector: "time-picker-fields", role: "time field grid", element: "div" },
      { selector: "time-picker-field", role: "single time field", element: "div" },
      { selector: "time-picker-field-label", role: "time field label", element: "label" },
      { selector: "time-picker-field-input", role: "time field input", element: "input" },
      { selector: "time-picker-increment", role: "increment spinner button", element: "button" },
      { selector: "time-picker-decrement", role: "decrement spinner button", element: "button" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Shows the time panel." },
      { attr: "aria-invalid", on: "time-picker-input", values: ["true"], description: "Invalid/error state on the text input." },
      { attr: "disabled", on: "time-picker-input", values: ["present"], description: "Native disabled state on the text input." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="time-picker" data-open="true">\n  <input class="time-picker-input input" type="text" placeholder="HH:MM:SS" aria-label="Time" />\n  <button class="time-picker-trigger btn btn-sm btn-outline" type="button" aria-label="Open time picker">Clock</button>\n  <div class="time-picker-panel">\n    <div class="time-picker-fields">\n      <div class="time-picker-field">\n        <label class="time-picker-field-label">Hour</label>\n        <input class="time-picker-field-input" type="text" value="14" inputmode="numeric" />\n      </div>\n    </div>\n  </div>\n</div>',
    notes: "Text input + disclosure button + optional spinner panel. JS owns parsing, focus flow and input/panel synchronization."
  },

  dropzone: {
    status: "stable",
    root_selector: "dropzone",
    element: "div",
    elements: [
      { selector: "dropzone-input", role: "hidden file input", element: "input" },
      { selector: "dropzone-hint", role: "primary hint text", element: "p" },
      { selector: "dropzone-meta", role: "secondary metadata text", element: "p" },
      { selector: "dropzone-actions", role: "action button row", element: "div" }
    ],
    data_attrs: [
      { attr: "data-drag-over", on: "root", values: ["true"], description: "Highlights the drop target while dragging files over it." },
      { attr: "data-disabled", on: "root", values: ["true"], description: "Visually disables the dropzone." }
    ],
    minimal_html: '<div class="dropzone" data-drag-over="true">\n  <input class="dropzone-input" type="file" aria-label="Upload files" />\n  <p class="dropzone-hint">Drop files here or browse</p>\n  <p class="dropzone-meta">PNG, JPG up to 10 MB</p>\n  <div class="dropzone-actions">\n    <button class="btn btn-sm btn-outline" type="button">Choose files</button>\n  </div>\n</div>',
    notes: "Drag-and-drop upload surface. Keep the native file input in the DOM for accessibility and programmatic click handling."
  },

  "editable-field": {
    status: "stable",
    root_selector: "editable-field",
    element: "div",
    elements: [
      { selector: "editable-field-display", role: "read-only value view", element: "div" },
      { selector: "editable-field-editor", role: "editing surface", element: "div" },
      { selector: "editable-field-actions", role: "save/cancel actions row", element: "div" }
    ],
    data_attrs: [
      { attr: "data-editing", on: "root", values: ["true"], description: "Switches from display mode to editor mode." },
      { attr: "data-disabled", on: "root", values: ["true"], description: "Visually disables the editable field." }
    ],
    minimal_html: '<div class="editable-field" data-editing="true">\n  <div class="editable-field-display">Jane Doe</div>\n  <div class="editable-field-editor">\n    <input class="input input-sm" type="text" value="Jane Doe" aria-label="Edit name" />\n    <div class="editable-field-actions">\n      <button class="btn btn-sm btn-primary" type="button">Save</button>\n      <button class="btn btn-sm btn-outline" type="button">Cancel</button>\n    </div>\n  </div>\n</div>',
    notes: "Inline edit wrapper that toggles between a static display block and an editor block."
  },

  "file-upload": {
    status: "stable",
    root_selector: "file-upload",
    element: "div",
    elements: [
      { selector: "file-upload-input", role: "native file input", element: "input" },
      { selector: "file-upload-meta", role: "secondary metadata text", element: "p" },
      { selector: "file-upload-actions", role: "action button row", element: "div" }
    ],
    data_attrs: [
      { attr: "data-has-file", on: "root", values: ["true"], description: "Highlights the wrapper when a file is selected." },
      { attr: "disabled", on: "file-upload-input", values: ["present"], description: "Native disabled state on the file input." }
    ],
    minimal_html: '<div class="file-upload" data-has-file="true">\n  <input class="file-upload-input" type="file" aria-label="Upload file" />\n  <p class="file-upload-meta">invoice-q2.pdf selected</p>\n  <div class="file-upload-actions">\n    <button class="btn btn-sm btn-outline" type="button">Replace</button>\n    <button class="btn btn-sm btn-ghost" type="button">Remove</button>\n  </div>\n</div>',
    notes: "Inline file input wrapper for single or multiple uploads. data-has-file is a styling state only; JS still owns file list rendering."
  },

  /* ─── Overlay / Feedback ────────────────────────────────────────────────── */

  modal: {
    status: "stable",
    root_selector: "modal",
    element: "div",
    elements: [
      { selector: "modal-backdrop", role: "backdrop overlay", element: "div" },
      { selector: "modal-dialog", role: "dialog container", element: "div" },
      { selector: "modal-header", role: "header row", element: "div" },
      { selector: "modal-body", role: "body content", element: "div" },
      { selector: "modal-footer", role: "footer/actions row", element: "div" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Show modal. Remove attribute (never set to false) to hide." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="modal" data-open="true" role="dialog" aria-modal="true" aria-labelledby="modal-title">\n  <div class="modal-backdrop"></div>\n  <div class="modal-dialog">\n    <div class="modal-header"><h2 id="modal-title">Title</h2></div>\n    <div class="modal-body">Content</div>\n    <div class="modal-footer">\n      <button class="btn btn-primary btn-md">Confirm</button>\n      <button class="btn btn-neutral btn-outline btn-md">Cancel</button>\n    </div>\n  </div>\n</div>',
    notes: "Hidden by default. Set data-open=\"true\" to show. Remove attribute (NOT setAttribute(\"data-open\",\"false\")) to hide. App must manage focus trap and Escape key."
  },

  drawer: {
    status: "stable",
    root_selector: "drawer",
    element: "div",
    elements: [
      { selector: "drawer-backdrop", role: "backdrop overlay", element: "div" },
      { selector: "drawer-panel", role: "panel container (slides from end)", element: "div" },
      { selector: "drawer-header", role: "panel header", element: "div" },
      { selector: "drawer-body", role: "panel body", element: "div" },
      { selector: "drawer-footer", role: "panel footer/actions", element: "div" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Show drawer. Remove attribute to hide." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="drawer" data-open="true">\n  <div class="drawer-backdrop"></div>\n  <div class="drawer-panel">\n    <div class="drawer-header">Title</div>\n    <div class="drawer-body">Content</div>\n    <div class="drawer-footer"><button class="btn btn-primary btn-md">Done</button></div>\n  </div>\n</div>',
    notes: "Panel slides from inline-end (right in LTR). z-index: 42. App handles focus trap + Escape."
  },

  popover: {
    status: "stable",
    root_selector: "popover",
    element: "div",
    elements: [
      { selector: "popover-content", role: "floating content box", element: "div" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Show popover content." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="popover" data-open="true">\n  <div class="popover-content">Popover text</div>\n</div>',
    notes: "Positioning (top/bottom/left/right) must be managed by JS/Popper. popover-content is hidden until data-open=\"true\"."
  },

  tooltip: {
    status: "stable",
    root_selector: "tooltip",
    element: "div",
    elements: [
      { selector: "tooltip-content", role: "tooltip text box", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div class="tooltip">\n  <button aria-describedby="tt1">Hover me</button>\n  <div class="tooltip-content" role="tooltip" id="tt1">Tooltip text</div>\n</div>',
    notes: "Visibility managed by JS (toggle class/display). Use role=\"tooltip\" and aria-describedby."
  },

  "dropdown-menu": {
    status: "stable",
    root_selector: "dropdown-menu",
    element: "div",
    elements: [
      { selector: "dropdown-menu-content", role: "menu list container", element: "div" },
      { selector: "dropdown-menu-item", role: "menu action item", element: "button" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Show dropdown menu." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="dropdown-menu" data-open="true">\n  <div class="dropdown-menu-content" role="menu">\n    <button class="dropdown-menu-item" role="menuitem">Action 1</button>\n    <button class="dropdown-menu-item" role="menuitem">Action 2</button>\n  </div>\n</div>',
    notes: "Hidden by default. Positioning by JS. Add role=\"menu\" and role=\"menuitem\" for accessibility."
  },

  "context-menu": {
    status: "stable",
    root_selector: "context-menu",
    element: "div",
    elements: [
      { selector: "context-menu-content", role: "floating menu panel", element: "div" },
      { selector: "context-menu-item", role: "menu action item", element: "button" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Shows the context menu panel." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="context-menu" data-open="true">\n  <button class="btn btn-sm btn-outline" type="button" aria-haspopup="menu" aria-expanded="true">Open menu</button>\n  <div class="context-menu-content" role="menu">\n    <button class="context-menu-item" type="button" role="menuitem">Rename</button>\n    <button class="context-menu-item" type="button" role="menuitem">Delete</button>\n  </div>\n</div>',
    notes: "Inline disclosure wrapper for right-click or kebab-triggered menus. Positioning and collision handling stay in JS."
  },

  "split-button": {
    status: "stable",
    root_selector: "split-button",
    element: "div",
    elements: [
      { selector: "split-button-action", role: "primary action button", element: "button" },
      { selector: "split-button-toggle", role: "secondary menu toggle", element: "button" },
      { selector: "dropdown-menu-content", role: "secondary actions menu", element: "div" },
      { selector: "dropdown-menu-item", role: "secondary action item", element: "button" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true", "false"], description: "Controls the secondary menu state." },
      { attr: "disabled", on: "split-button-action", values: ["present"], description: "Disables the primary action." },
      { attr: "disabled", on: "split-button-toggle", values: ["present"], description: "Disables the secondary toggle." }
    ],
    minimal_html: '<div class="split-button dropdown-menu" data-open="false">\n  <button class="split-button-action btn btn-solid btn-primary btn-sm" type="button">Publish now</button>\n  <button class="split-button-toggle btn btn-solid btn-primary btn-sm" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Open publish options">▾</button>\n  <div class="dropdown-menu-content" role="menu">\n    <button class="dropdown-menu-item" type="button" role="menuitem">Schedule</button>\n  </div>\n</div>',
    notes: "Joined two-button control. The menu panel reuses dropdown-menu-content and dropdown-menu-item selectors."
  },

  toast: {
    status: "stable",
    root_selector: "toast-viewport",
    element: "div",
    elements: [
      { selector: "toast", role: "individual toast notification", element: "div" },
      { selector: "toast-title", role: "toast title", element: "p" },
      { selector: "toast-description", role: "toast description", element: "p" },
      { selector: "toast-close", role: "dismiss button", element: "button" }
    ],
    data_attrs: [
      { attr: "data-open", on: "toast", values: ["true"], description: "Show individual toast. Remove to dismiss." },
      { attr: "data-tone", on: "toast", values: ["danger", "success", "info", "warn", "error"], description: "Toast tone variant." }
    ],
    minimal_html: '<div class="toast-viewport" aria-live="polite">\n  <div class="toast" data-open="true" data-tone="success">\n    <p class="toast-title">Saved</p>\n    <p class="toast-description">Changes saved successfully.</p>\n    <button class="toast-close" aria-label="Dismiss">×</button>\n  </div>\n</div>',
    notes: "toast-viewport is a fixed container. Each toast shows/hides via data-open. Tone also via class: toast--success | toast--info | toast--warn | toast--error."
  },

  progress: {
    status: "stable",
    root_selector: "progress",
    element: "div",
    elements: [
      { selector: "progress-track", role: "track background", element: "div" },
      { selector: "progress-indicator", role: "fill bar (set width via style)", element: "div" },
      { selector: "progress-label", role: "label text", element: "span" }
    ],
    data_attrs: [],
    minimal_html: '<div class="progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">\n  <div class="progress-track">\n    <div class="progress-indicator" style="width: 60%"></div>\n  </div>\n  <span class="progress-label">60%</span>\n</div>',
    notes: "Set progress-indicator width via inline style or CSS var. Add ARIA attributes on root."
  },

  "loading-overlay": {
    status: "stable",
    root_selector: "loading-overlay",
    element: "div",
    elements: [
      { selector: "loading-overlay-backdrop", role: "semi-transparent backdrop", element: "div" },
      { selector: "loading-overlay-content", role: "spinner/message container", element: "div" }
    ],
    data_attrs: [
      { attr: "data-loading", on: "root", values: ["true"], description: "Activate overlay." }
    ],
    minimal_html: '<div class="loading-overlay" data-loading="true" aria-busy="true">\n  <div class="loading-overlay-backdrop"></div>\n  <div class="loading-overlay-content"><span class="spinner spinner-lg" aria-label="Loading"></span></div>\n</div>',
    notes: "Positioned relative to nearest positioned ancestor. Set data-loading=\"true\" to show."
  },

  "hover-card": {
    status: "stable",
    root_selector: "hover-card",
    element: "div",
    elements: [
      { selector: "hover-card-content", role: "floating card content", element: "div" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Show hover card." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="hover-card" data-open="true">\n  <div class="hover-card-content">Preview content</div>\n</div>',
    notes: "Hover-triggered popover variant. Positioning by JS."
  },

  result: {
    status: "stable",
    root_selector: "result",
    element: "div",
    elements: [
      { selector: "result-media", role: "illustration or icon", element: "div" },
      { selector: "result-title", role: "result heading", element: "p" },
      { selector: "result-description", role: "description text", element: "p" },
      { selector: "result-actions", role: "CTA area", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div class="result">\n  <div class="result-media">✅</div>\n  <p class="result-title">Payment successful</p>\n  <p class="result-description">Your order has been placed.</p>\n  <div class="result-actions"><button class="btn btn-primary btn-md">Continue</button></div>\n</div>',
    notes: "Full-page or section-level result feedback (success/error/empty)."
  },

  /* ─── Navigation ────────────────────────────────────────────────────────── */

  tabs: {
    status: "stable",
    root_selector: "tabs",
    element: "div",
    elements: [
      { selector: "tabs-list", role: "tab list container", element: "div" },
      { selector: "tabs-trigger", role: "individual tab button", element: "button" },
      { selector: "tabs-panel", role: "tab content panel", element: "div" }
    ],
    data_attrs: [
      { attr: "data-active", on: "tabs-trigger", values: ["true"], description: "Active tab button." },
      { attr: "data-active", on: "tabs-panel", values: ["true"], description: "Active tab panel (visible)." }
    ],
    minimal_html: '<div class="tabs">\n  <div class="tabs-list" role="tablist">\n    <button class="tabs-trigger" data-active="true" role="tab" aria-selected="true">Tab 1</button>\n    <button class="tabs-trigger" role="tab" aria-selected="false">Tab 2</button>\n  </div>\n  <div class="tabs-panel" data-active="true" role="tabpanel">Panel 1 content</div>\n  <div class="tabs-panel" role="tabpanel">Panel 2 content</div>\n</div>',
    notes: "Set data-active=\"true\" on the active trigger and its matching panel. Wire keyboard navigation in app JS."
  },

  accordion: {
    status: "stable",
    root_selector: "accordion",
    element: "div",
    elements: [
      { selector: "accordion-item", role: "individual section", element: "div" },
      { selector: "accordion-trigger", role: "expand/collapse button", element: "button" },
      { selector: "accordion-panel", role: "expandable content", element: "div" }
    ],
    data_attrs: [
      { attr: "data-open", on: "accordion-item", values: ["true"], description: "Expand panel. Remove attribute to collapse." }
    ],
    minimal_html: '<div class="accordion">\n  <div class="accordion-item" data-open="true">\n    <button class="accordion-trigger" aria-expanded="true">Section 1</button>\n    <div class="accordion-panel">Content for section 1.</div>\n  </div>\n  <div class="accordion-item">\n    <button class="accordion-trigger" aria-expanded="false">Section 2</button>\n    <div class="accordion-panel">Content for section 2.</div>\n  </div>\n</div>',
    notes: "Set data-open=\"true\" on accordion-item to expand. Remove attribute (not set false) to collapse."
  },

  breadcrumb: {
    status: "stable",
    root_selector: "breadcrumb",
    element: "nav",
    elements: [
      { selector: "breadcrumb-list", role: "ordered list", element: "ol" },
      { selector: "breadcrumb-item", role: "list item", element: "li" },
      { selector: "breadcrumb-link", role: "ancestor page link", element: "a" },
      { selector: "breadcrumb-current", role: "current page label", element: "span" }
    ],
    data_attrs: [],
    minimal_html: '<nav class="breadcrumb" aria-label="Breadcrumb">\n  <ol class="breadcrumb-list">\n    <li class="breadcrumb-item"><a class="breadcrumb-link" href="/">Home</a></li>\n    <li class="breadcrumb-item"><a class="breadcrumb-link" href="/products">Products</a></li>\n    <li class="breadcrumb-item"><span class="breadcrumb-current" aria-current="page">Detail</span></li>\n  </ol>\n</nav>',
    notes: "Use <nav aria-label=\"Breadcrumb\"> and aria-current=\"page\" on current item."
  },

  pagination: {
    status: "stable",
    root_selector: "pagination",
    element: "nav",
    elements: [
      { selector: "pagination-item", role: "page button or link", element: "button" }
    ],
    data_attrs: [],
    minimal_html: '<nav class="pagination pagination-md" aria-label="Pagination">\n  <button class="pagination-item">‹</button>\n  <button class="pagination-item">1</button>\n  <button class="pagination-item" aria-current="page">2</button>\n  <button class="pagination-item">3</button>\n  <button class="pagination-item">›</button>\n</nav>',
    notes: "Size: pagination-sm | pagination-md | pagination-lg. Use aria-current=\"page\" on active item."
  },

  navbar: {
    status: "stable",
    root_selector: "navbar",
    element: "nav",
    elements: [
      { selector: "navbar-brand", role: "logo/brand link", element: "a" },
      { selector: "navbar-nav", role: "nav link group", element: "div" },
      { selector: "navbar-item", role: "navigation link", element: "a" }
    ],
    data_attrs: [],
    minimal_html: '<nav class="navbar" aria-label="Main navigation">\n  <a class="navbar-brand" href="/">Brand</a>\n  <div class="navbar-nav">\n    <a class="navbar-item" href="/" aria-current="page">Overview</a>\n    <a class="navbar-item" href="/reports">Reports</a>\n  </div>\n</nav>',
    notes: "Inline-flex navigation bar. Use aria-current=\"page\" on the active navbar-item. Does NOT provide fixed/sticky positioning — add that in app CSS if needed."
  },

  "menu-bar": {
    status: "stable",
    root_selector: "menu-bar",
    element: "div",
    elements: [
      { selector: "menu-bar-list", role: "menu item list", element: "ul" },
      { selector: "menu-bar-item", role: "individual item wrapper", element: "li" },
      { selector: "menu-bar-trigger", role: "dropdown trigger button", element: "button" },
      { selector: "menu-bar-content", role: "dropdown content", element: "div" },
      { selector: "menu-bar-link", role: "direct nav link", element: "a" }
    ],
    data_attrs: [
      { attr: "data-open", on: "menu-bar-item", values: ["true"], description: "Open submenu." }
    ],
    minimal_html: '<div class="menu-bar" role="menubar">\n  <ul class="menu-bar-list">\n    <li class="menu-bar-item">\n      <a class="menu-bar-link" href="/home">Home</a>\n    </li>\n    <li class="menu-bar-item" data-open="true">\n      <button class="menu-bar-trigger">Products</button>\n      <div class="menu-bar-content"><!-- dropdown items --></div>\n    </li>\n  </ul>\n</div>',
    notes: "Horizontal navigation bar with optional dropdowns."
  },

  "sidebar-nav": {
    status: "stable",
    root_selector: "sidebar-nav",
    element: "nav",
    elements: [
      { selector: "sidebar-nav-section", role: "section wrapper", element: "div" },
      { selector: "sidebar-nav-item", role: "nav link", element: "a" }
    ],
    data_attrs: [],
    minimal_html: '<nav class="sidebar-nav" aria-label="Sidebar navigation">\n  <div class="sidebar-nav-section">\n    <a class="sidebar-nav-item" href="/" aria-current="page">Dashboard</a>\n    <a class="sidebar-nav-item" href="/orders">Orders</a>\n  </div>\n  <div class="sidebar-nav-section">\n    <a class="sidebar-nav-item" href="/settings">Settings</a>\n  </div>\n</nav>',
    notes: "Use sidebar-nav-section to group links. Use aria-current=\"page\" on the active item."
  },

  "settings-panel": {
    status: "stable",
    root_selector: "settings-panel",
    element: "section",
    elements: [
      { selector: "settings-panel-sidebar", role: "sidebar navigation column", element: "aside" },
      { selector: "settings-panel-nav", role: "settings section nav", element: "nav" },
      { selector: "settings-panel-nav-item", role: "settings nav link or button", element: "button" },
      { selector: "settings-panel-content", role: "main settings content area", element: "div" },
      { selector: "settings-panel-section", role: "grouped settings section", element: "section" },
      { selector: "settings-panel-section-title", role: "section heading", element: "h2" },
      { selector: "settings-panel-row", role: "single setting row", element: "div" },
      { selector: "settings-panel-row-label", role: "setting label copy", element: "div" },
      { selector: "settings-panel-row-control", role: "setting control area", element: "div" }
    ],
    data_attrs: [
      { attr: "aria-current", on: "settings-panel-nav-item", values: ["page"], description: "Marks the current nav item." },
      { attr: "data-active", on: "settings-panel-nav-item", values: ["true"], description: "Alternate active styling for nav items." }
    ],
    minimal_html: '<section class="settings-panel">\n  <aside class="settings-panel-sidebar">\n    <nav class="settings-panel-nav" aria-label="Settings sections">\n      <button class="settings-panel-nav-item" type="button" aria-current="page">Profile</button>\n    </nav>\n  </aside>\n  <div class="settings-panel-content">\n    <section class="settings-panel-section">\n      <h2 class="settings-panel-section-title">Profile</h2>\n      <div class="settings-panel-row">\n        <div class="settings-panel-row-label"><strong>Name</strong><span>Visible to your team</span></div>\n        <div class="settings-panel-row-control"><input class="input input-sm" type="text" value="Jane Doe" /></div>\n      </div>\n    </section>\n  </div>\n</section>',
    notes: "Two-column settings layout with a nav rail and grouped setting rows. Nav items may be links or buttons depending on routing."
  },

  stepper: {
    status: "stable",
    root_selector: "stepper",
    element: "div",
    elements: [
      { selector: "stepper-item", role: "individual step", element: "div" },
      { selector: "stepper-marker", role: "step number or icon", element: "div" },
      { selector: "stepper-label", role: "step label", element: "span" }
    ],
    data_attrs: [
      { attr: "data-status", on: "stepper-item", values: ["complete", "active", "pending"], description: "Step status for styling." }
    ],
    minimal_html: '<div class="stepper">\n  <div class="stepper-item" data-status="complete">\n    <div class="stepper-marker">✓</div>\n    <span class="stepper-label">Step 1</span>\n  </div>\n  <div class="stepper-item" data-status="active">\n    <div class="stepper-marker">2</div>\n    <span class="stepper-label">Step 2</span>\n  </div>\n  <div class="stepper-item" data-status="pending">\n    <div class="stepper-marker">3</div>\n    <span class="stepper-label">Step 3</span>\n  </div>\n</div>',
    notes: "data-status on stepper-item drives visual state."
  },

  "command-palette": {
    status: "stable",
    root_selector: "command-palette",
    element: "div",
    elements: [
      { selector: "command-palette-dialog", role: "centered dialog box", element: "div" },
      { selector: "command-palette-input", role: "search/filter input", element: "input" },
      { selector: "command-palette-list", role: "results list", element: "ul" },
      { selector: "command-palette-item", role: "individual result", element: "li" }
    ],
    data_attrs: [
      { attr: "data-open", on: "root", values: ["true"], description: "Show command palette overlay." }
    ],
    visibility: { attr: "data-open", value: "true", on: "root" },
    minimal_html: '<div class="command-palette" data-open="true" role="dialog" aria-label="Command palette">\n  <div class="command-palette-dialog">\n    <input class="command-palette-input" type="search" placeholder="Search commands..." aria-label="Search" />\n    <ul class="command-palette-list" role="listbox">\n      <li class="command-palette-item" role="option">Go to Dashboard</li>\n      <li class="command-palette-item" role="option">New Project</li>\n    </ul>\n  </div>\n</div>',
    notes: "Full-screen overlay. App handles keyboard (ArrowUp/Down, Enter, Escape)."
  },

  "tree-view": {
    status: "stable",
    root_selector: "tree-view",
    element: "ul",
    elements: [
      { selector: "tree-view-item", role: "tree node", element: "li" },
      { selector: "tree-view-group", role: "child nodes container", element: "ul" },
      { selector: "tree-view-toggle", role: "expand/collapse button", element: "button" },
      { selector: "tree-view-label", role: "node label", element: "span" }
    ],
    data_attrs: [
      { attr: "data-tree-expanded", on: "tree-view-item", values: ["true", "false"], description: "Expanded state of node." }
    ],
    minimal_html: '<ul class="tree-view" role="tree">\n  <li class="tree-view-item" data-tree-expanded="true" role="treeitem" aria-expanded="true">\n    <button class="tree-view-toggle">▼</button>\n    <span class="tree-view-label">Parent</span>\n    <ul class="tree-view-group">\n      <li class="tree-view-item" role="treeitem"><span class="tree-view-label">Child</span></li>\n    </ul>\n  </li>\n</ul>',
    notes: "Use role=\"tree\" + role=\"treeitem\" + aria-expanded."
  },

  /* ─── Data / Display ────────────────────────────────────────────────────── */

  table: {
    status: "stable",
    root_selector: "table",
    element: "table",
    elements: [
      { selector: "table-head", role: "header section", element: "thead" },
      { selector: "table-body", role: "body section", element: "tbody" },
      { selector: "table-row", role: "table row", element: "tr" },
      { selector: "table-head-cell", role: "header cell", element: "th" },
      { selector: "table-cell", role: "data cell", element: "td" }
    ],
    data_attrs: [
      { attr: "data-row-selected", on: "table-row", values: ["true"], description: "Highlight selected row." },
      { attr: "data-loading", on: "root", values: ["true"], description: "Apply loading opacity to body." }
    ],
    minimal_html: '<table class="table">\n  <thead class="table-head">\n    <tr class="table-row">\n      <th class="table-head-cell">Name</th>\n      <th class="table-head-cell">Status</th>\n    </tr>\n  </thead>\n  <tbody class="table-body">\n    <tr class="table-row">\n      <td class="table-cell">Item</td>\n      <td class="table-cell">Active</td>\n    </tr>\n  </tbody>\n</table>',
    notes: "Use semantic <table> elements."
  },

  "tree-table": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"tree-table\"]",
    element: "table",
    elements: [
      { selector: "table-row", role: "tree row", element: "tr" },
      { selector: "table-cell", role: "data cell", element: "td" },
      { selector: "tree-table-cell-toggle", role: "toggle/indent cell", element: "td" },
      { selector: "tree-view-toggle", role: "expand/collapse button", element: "button" },
      { selector: "tree-table-cell-toggle-placeholder", role: "leaf indent placeholder", element: "span" }
    ],
    data_attrs: [
      { attr: "data-tree-level", on: "table-row", values: ["0", "1", "2", "3", "4", "5"], description: "Hierarchy depth used for indentation." },
      { attr: "aria-expanded", on: "table-row", values: ["true", "false"], description: "Expanded state for rows with children." },
      { attr: "aria-selected", on: "table-row", values: ["true"], description: "Optional selected-row styling state." },
      { attr: "data-hidden", on: "table-row", values: ["true"], description: "Hides collapsed descendants." }
    ],
    minimal_html: '<table class="table" data-pattern="tree-table">\n  <tbody class="table-body">\n    <tr class="table-row" role="treeitem" aria-expanded="false" data-tree-level="0">\n      <td class="tree-table-cell-toggle">\n        <button class="tree-view-toggle" type="button" aria-expanded="false">▾</button>\n      </td>\n      <td class="table-cell">Engineering</td>\n      <td class="table-cell">Department</td>\n    </tr>\n    <tr class="table-row" role="treeitem" data-tree-level="1" data-hidden="true">\n      <td class="tree-table-cell-toggle">\n        <span class="tree-table-cell-toggle-placeholder" aria-hidden="true"></span>\n      </td>\n      <td class="table-cell">Frontend</td>\n      <td class="table-cell">Team</td>\n    </tr>\n  </tbody>\n</table>',
    notes: "Hierarchical table pattern built on table + tree-view selectors. JS owns descendant collapse/expand behavior."
  },

  "data-grid": {
    status: "stable",
    root_selector: "data-grid",
    element: "div",
    elements: [
      { selector: "data-grid-head", role: "header row container", element: "div" },
      { selector: "data-grid-body", role: "body rows container", element: "div" },
      { selector: "data-grid-row", role: "data row", element: "div" },
      { selector: "data-grid-cell", role: "data cell", element: "div" }
    ],
    data_attrs: [
      { attr: "data-row-selected", on: "data-grid-row", values: ["true"], description: "Highlight selected row." }
    ],
    minimal_html: '<div class="data-grid" role="grid">\n  <div class="data-grid-head">\n    <div class="data-grid-row" role="row">\n      <div class="data-grid-cell" role="columnheader">Column</div>\n    </div>\n  </div>\n  <div class="data-grid-body">\n    <div class="data-grid-row" role="row">\n      <div class="data-grid-cell" role="gridcell">Value</div>\n    </div>\n  </div>\n</div>',
    notes: "div-based grid. Add role=\"grid\"/\"row\"/\"columnheader\"/\"gridcell\" for accessibility."
  },

  list: {
    status: "stable",
    root_selector: "list",
    element: "ul",
    elements: [
      { selector: "list-item", role: "list item", element: "li" }
    ],
    data_attrs: [],
    minimal_html: '<ul class="list">\n  <li class="list-item">Item 1</li>\n  <li class="list-item">Item 2</li>\n</ul>',
    notes: "Styled list."
  },

  "description-list": {
    status: "stable",
    root_selector: "description-list",
    element: "dl",
    elements: [
      { selector: "description-term", role: "term/label", element: "dt" },
      { selector: "description-details", role: "description/value", element: "dd" }
    ],
    data_attrs: [],
    minimal_html: '<dl class="description-list">\n  <dt class="description-term">Name</dt>\n  <dd class="description-details">John Doe</dd>\n  <dt class="description-term">Role</dt>\n  <dd class="description-details">Admin</dd>\n</dl>',
    notes: "Use <dl>, <dt>, <dd> semantic elements."
  },

  avatar: {
    status: "stable",
    root_selector: "avatar",
    element: "div",
    elements: [
      { selector: "avatar-image", role: "photo", element: "img" },
      { selector: "avatar-fallback", role: "initials or icon fallback", element: "span" }
    ],
    data_attrs: [],
    minimal_html: '<div class="avatar avatar-md">\n  <img class="avatar-image" src="/photo.jpg" alt="John Doe" />\n  <span class="avatar-fallback" aria-hidden="true">JD</span>\n</div>',
    notes: "Size: avatar-sm | avatar-md | avatar-lg. Show avatar-fallback when image fails. aria-hidden=\"true\" on fallback when img has alt text."
  },

  "avatar-group": {
    status: "stable",
    root_selector: "avatar-group",
    element: "div",
    elements: [
      { selector: "avatar-group-item", role: "individual avatar wrapper", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div class="avatar-group">\n  <div class="avatar-group-item"><div class="avatar avatar-sm">...</div></div>\n  <div class="avatar-group-item"><div class="avatar avatar-sm">...</div></div>\n</div>',
    notes: "Overlapping avatar stack."
  },

  stat: {
    status: "stable",
    root_selector: "stat",
    element: "div",
    elements: [
      { selector: "stat-label", role: "metric label", element: "p" },
      { selector: "stat-value", role: "metric numeric value", element: "p" },
      { selector: "stat-meta", role: "secondary info (trend, period)", element: "p" }
    ],
    data_attrs: [],
    minimal_html: '<div class="stat">\n  <p class="stat-label">Revenue</p>\n  <p class="stat-value">$12,400</p>\n  <p class="stat-meta">↑ 12% from last month</p>\n</div>',
    notes: "Single metric. Use inside a cluster or grid for dashboards."
  },

  "kpi-card": {
    status: "stable",
    root_selector: "kpi-card",
    element: "div",
    elements: [
      { selector: "kpi-card-header", role: "card header row", element: "div" },
      { selector: "kpi-card-value", role: "main metric value", element: "p" },
      { selector: "kpi-card-meta", role: "label / period", element: "p" },
      { selector: "kpi-card-trend", role: "trend indicator", element: "span" }
    ],
    data_attrs: [],
    minimal_html: '<div class="kpi-card">\n  <div class="kpi-card-header">Monthly Revenue</div>\n  <p class="kpi-card-value">$12,400</p>\n  <p class="kpi-card-meta">vs last month</p>\n  <span class="kpi-card-trend">↑ 12%</span>\n</div>',
    notes: "Card-style KPI widget."
  },

  "empty-state": {
    status: "stable",
    root_selector: "empty-state",
    element: "div",
    elements: [
      { selector: "empty-state-media", role: "illustration / icon", element: "div" },
      { selector: "empty-state-title", role: "title heading", element: "p" },
      { selector: "empty-state-description", role: "description body", element: "p" },
      { selector: "empty-state-actions", role: "CTA button area", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div class="empty-state">\n  <div class="empty-state-media">🗂</div>\n  <p class="empty-state-title">No items yet</p>\n  <p class="empty-state-description">Create your first item to get started.</p>\n  <div class="empty-state-actions">\n    <button class="btn btn-primary btn-md">Add Item</button>\n  </div>\n</div>',
    notes: "Centered empty state. Use for zero-data and first-use screens."
  },

  timeline: {
    status: "stable",
    root_selector: "timeline",
    element: "ol",
    elements: [
      { selector: "timeline-item", role: "single event entry", element: "li" },
      { selector: "timeline-marker", role: "event dot or icon", element: "span" },
      { selector: "timeline-content", role: "event content area", element: "div" },
      { selector: "timeline-title", role: "event title", element: "p" },
      { selector: "timeline-meta", role: "timestamp or secondary info", element: "p" }
    ],
    data_attrs: [],
    minimal_html: '<ol class="timeline">\n  <li class="timeline-item">\n    <span class="timeline-marker" aria-hidden="true"></span>\n    <div class="timeline-content">\n      <p class="timeline-title">Order placed</p>\n      <p class="timeline-meta">2 hours ago</p>\n    </div>\n  </li>\n</ol>',
    notes: "Vertical event timeline. Prefer <ol> for chronological events and mark the decorative marker aria-hidden=\"true\"."
  },

  "tag-chip": {
    status: "stable",
    root_selector: "tag-chip",
    element: "span",
    elements: [
      { selector: "tag-chip-label", role: "chip label", element: "span" },
      { selector: "tag-chip-remove", role: "remove/dismiss button", element: "button" }
    ],
    data_attrs: [],
    minimal_html: '<span class="tag-chip">\n  <span class="tag-chip-label">React</span>\n  <button class="tag-chip-remove" aria-label="Remove React">×</button>\n</span>',
    notes: "tag-chip-remove is optional."
  },

  /* ─── Layout / Shell ────────────────────────────────────────────────────── */

  "app-shell": {
    status: "stable",
    root_selector: "app-shell",
    element: "div",
    elements: [
      { selector: "app-shell-topbar", role: "top navigation bar", element: "header" },
      { selector: "app-shell-sidebar", role: "sidebar navigation area", element: "aside" },
      { selector: "app-shell-main", role: "main content area", element: "main" },
      { selector: "app-shell-content", role: "inner content wrapper", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div class="app-shell">\n  <header class="app-shell-topbar">Topbar</header>\n  <div class="app-shell-content">\n    <aside class="app-shell-sidebar">Sidebar</aside>\n    <main class="app-shell-main">Page content</main>\n  </div>\n</div>',
    notes: "Full application layout shell using CSS Grid. app-shell-content wraps sidebar + main and becomes two columns at >= 64rem."
  },

  "page-header": {
    status: "stable",
    root_selector: "page-header",
    element: "header",
    elements: [
      { selector: "page-header-content", role: "title and description area", element: "div" },
      { selector: "page-header-actions", role: "action buttons area", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<header class="page-header">\n  <div class="page-header-content">\n    <h1>Page Title</h1>\n    <p>Short supporting description.</p>\n  </div>\n  <div class="page-header-actions">\n    <button class="btn btn-outline btn-md">Secondary</button>\n    <button class="btn btn-primary btn-md">Primary action</button>\n  </div>\n</header>',
    notes: "Page-level header with title/content and action groups. Root wraps on narrow layouts."
  },

  "section-block": {
    status: "stable",
    root_selector: "section-block",
    element: "section",
    elements: [
      { selector: "section-header", role: "section title row", element: "div" },
      { selector: "section-body", role: "section content", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<section class="section-block">\n  <div class="section-header">Section Title</div>\n  <div class="section-body">Section content here.</div>\n</section>',
    notes: "Content section with header and body areas."
  },

  "split-pane": {
    status: "stable",
    root_selector: "split-pane",
    element: "div",
    elements: [
      { selector: "split-pane-primary", role: "primary panel", element: "div" },
      { selector: "split-pane-secondary", role: "secondary panel", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div class="split-pane">\n  <div class="split-pane-primary">Primary</div>\n  <div class="split-pane-secondary">Secondary</div>\n</div>',
    notes: "Two-panel split layout."
  },

  /* ─── M16+ data-pattern compounds ─────────────────────────────────────── */

  "auth-screen": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"auth-screen\"]",
    element: "div",
    elements: [
      { slot: "brand", role: "logo and tagline area", element: "div" },
      { slot: "card", role: "form card container", element: "div" },
      { slot: "title", role: "form heading", element: "h1" },
      { slot: "subtitle", role: "form sub-heading", element: "p" },
      { slot: "divider", role: "or-separator", element: "div" },
      { slot: "footer", role: "footer links", element: "footer" }
    ],
    data_attrs: [
      { attr: "data-variant", on: "root", values: ["centered", "split"], description: "Layout variant." }
    ],
    minimal_html: '<div data-pattern="auth-screen">\n  <div data-slot="brand"><img data-slot="logo" src="logo.svg" alt="Brand"></div>\n  <div data-slot="card">\n    <h1 data-slot="title">Sign in</h1>\n    <p data-slot="subtitle">Welcome back</p>\n    <!-- form fields -->\n  </div>\n</div>',
    notes: "Full-page authentication layout. Variant 'split' shows brand panel + form in two columns."
  },

  "coachmark": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"coachmark\"]",
    element: "div",
    elements: [
      { slot: "icon", role: "tone icon", element: "span" },
      { slot: "title", role: "coachmark heading", element: "p" },
      { slot: "description", role: "explanatory text", element: "p" },
      { slot: "actions", role: "action buttons row", element: "div" }
    ],
    data_attrs: [
      { attr: "data-variant", on: "root", values: ["info", "warning", "success", "danger", "neutral"], description: "Tone variant." },
      { attr: "data-position", on: "root", values: ["top", "bottom", "start", "end"], description: "Popover direction relative to trigger." },
      { attr: "data-arrow", on: "root", values: ["true"], description: "Show directional arrow pointer." }
    ],
    minimal_html: '<div data-pattern="coachmark" data-variant="info">\n  <span data-slot="icon" aria-hidden="true">ℹ</span>\n  <p data-slot="title">Tip</p>\n  <p data-slot="description">Select a template to get started quickly.</p>\n</div>',
    notes: "Inline contextual hint or tooltip-style coach mark. Position relative to anchor requires JS."
  },

  "command-bar": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"command-bar\"]",
    element: "div",
    elements: [
      { slot: "actions", role: "quick action buttons group", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div data-pattern="command-bar">\n  <!-- search-box component -->\n  <div data-slot="actions">\n    <!-- icon-button components -->\n  </div>\n</div>',
    notes: "Topbar command area combining a search-box with a group of quick action icon-buttons."
  },

  "copy-button": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"copy-button\"]",
    element: "button",
    elements: [
      { slot: "feedback", role: "visual copied tooltip", element: "span" }
    ],
    data_attrs: [
      { attr: "data-copied", on: "root", values: ["true"], description: "Activates copied visual state (icon + label swap)." }
    ],
    minimal_html: '<button type="button" class="icon-button icon-button-sm" data-pattern="copy-button" aria-label="Copy to clipboard">\n  <span data-icon="copy" aria-hidden="true">⎘</span>\n  <span data-icon="check" aria-hidden="true">✓</span>\n  <span data-slot="feedback">Copied!</span>\n</button>',
    notes: "Clipboard copy button. Toggle data-copied='true' on click; auto-clear after delay."
  },

  "data-table-toolbar": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"data-table-toolbar\"]",
    element: "div",
    elements: [
      { slot: "controls", role: "top controls row", element: "div" },
      { slot: "search", role: "search input", element: "div" },
      { slot: "filters", role: "filter controls", element: "div" },
      { slot: "actions", role: "action buttons", element: "div" },
      { slot: "active-filters", role: "active filter chips", element: "div" },
      { slot: "column-visibility", role: "column toggle controls", element: "div" },
      { slot: "density", role: "row density selector", element: "div" },
      { slot: "export", role: "export controls", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div data-pattern="data-table-toolbar">\n  <div data-slot="controls">\n    <div data-slot="search"><!-- search-box --></div>\n    <div data-slot="actions"><!-- buttons --></div>\n  </div>\n  <div data-slot="active-filters"><!-- tag-chips --></div>\n</div>',
    notes: "Toolbar for data tables with search, filters, actions and active-filter chips."
  },

  "empty-search-state": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"empty-search-state\"]",
    element: "div",
    elements: [
      { slot: "icon", role: "illustration or icon", element: "span" },
      { slot: "title", role: "state heading", element: "p" },
      { slot: "description", role: "explanatory text", element: "p" },
      { slot: "actions", role: "action buttons", element: "div" }
    ],
    data_attrs: [
      { attr: "data-variant", on: "root", values: ["first-use", "no-results", "filtered-empty"], description: "Search state variant." }
    ],
    minimal_html: '<div data-pattern="empty-search-state" data-variant="no-results">\n  <span data-slot="icon" aria-hidden="true">🔍</span>\n  <p data-slot="title">No results found</p>\n  <p data-slot="description">Try adjusting your search terms.</p>\n</div>',
    notes: "Empty state pattern for search result areas. Use first-use before any search, no-results for zero results, filtered-empty when filters are too narrow."
  },

  "filter-bar": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"filter-bar\"]",
    element: "div",
    elements: [
      { slot: "controls", role: "controls row", element: "div" },
      { slot: "search", role: "search input", element: "div" },
      { slot: "filters", role: "filter selects", element: "div" },
      { slot: "chips", role: "active filter chips", element: "div" },
      { slot: "actions", role: "action buttons", element: "div" },
      { slot: "reset", role: "reset/clear all", element: "div" }
    ],
    data_attrs: [],
    minimal_html: '<div data-pattern="filter-bar">\n  <div data-slot="controls">\n    <div data-slot="search"><!-- search-box --></div>\n    <div data-slot="filters"><!-- select controls --></div>\n    <div data-slot="actions"><!-- buttons --></div>\n  </div>\n  <div data-slot="chips"><!-- tag-chip filters --></div>\n</div>',
    notes: "Standalone filter bar with search, filter controls and active-filter chip row."
  },

  "onboarding-checklist": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"onboarding-checklist\"]",
    element: "div",
    elements: [
      { slot: "progress", role: "progress bar row", element: "div" },
      { slot: "progress-bar", role: "track container", element: "div" },
      { slot: "progress-fill", role: "filled indicator", element: "div" },
      { slot: "progress-label", role: "x / y completed text", element: "span" },
      { slot: "item", role: "individual checklist step", element: "div" }
    ],
    data_attrs: [
      { attr: "data-completed", on: "[data-slot='item']", values: ["true"], description: "Marks step as complete." }
    ],
    minimal_html: '<div data-pattern="onboarding-checklist">\n  <div data-slot="progress">\n    <div data-slot="progress-bar"><div data-slot="progress-fill" style="width:33%"></div></div>\n    <span data-slot="progress-label">1 / 3 completed</span>\n  </div>\n  <div data-slot="item"><span data-slot="status-icon" aria-hidden="true">✓</span>Step 1</div>\n  <div data-slot="item" data-completed="true">Step 2</div>\n</div>',
    notes: "Guided onboarding checklist with progress bar and individual completable steps."
  },

  "password-input": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"password-input\"]",
    element: "div",
    elements: [
      { slot: "input", role: "native password input", element: "input" },
      { slot: "toggle", role: "show/hide password button", element: "button" },
      { slot: "strength", role: "strength bar row", element: "div" },
      { slot: "strength-bar", role: "individual bar segment", element: "div" }
    ],
    data_attrs: [
      { attr: "data-visible", on: "root", values: ["true"], description: "Shows password (type=text)." },
      { attr: "data-strength", on: "root", values: ["weak", "fair", "strong", "very-strong"], description: "Password strength level." }
    ],
    minimal_html: '<div data-pattern="password-input">\n  <input data-slot="input" class="input" type="password" aria-label="Password" />\n  <button type="button" data-slot="toggle" aria-label="Show password">\n    <span data-icon="show" aria-hidden="true">👁</span>\n    <span data-icon="hide" aria-hidden="true">🙈</span>\n  </button>\n</div>',
    notes: "Password input with show/hide toggle and optional strength indicator."
  },

  "search-result-item": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"search-result-item\"]",
    element: "a",
    elements: [
      { slot: "icon", role: "item icon", element: "span" },
      { slot: "content", role: "text content area", element: "div" },
      { slot: "title", role: "result title", element: "p" },
      { slot: "description", role: "result description", element: "p" },
      { slot: "meta", role: "metadata (date, category)", element: "span" }
    ],
    data_attrs: [
      { attr: "data-active", on: "root", values: ["true"], description: "Highlighted/focused state." },
      { attr: "data-role", on: "root", values: ["section-header"], description: "Section header separator between result groups." }
    ],
    minimal_html: '<a data-pattern="search-result-item" href="/result">\n  <span data-slot="icon" aria-hidden="true">📄</span>\n  <div data-slot="content">\n    <p data-slot="title">Result title</p>\n    <p data-slot="description">Result description text.</p>\n  </div>\n  <span data-slot="meta">Dec 2024</span>\n</a>',
    notes: "Single search result row with icon, title, description and metadata. Used inside command-palette or search dropdown lists."
  },

  "stat-group": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"stat-group\"]",
    element: "div",
    elements: [
      { selector: "stat", role: "individual stat child (see stat component)", element: "div" }
    ],
    data_attrs: [
      { attr: "data-variant", on: "root", values: ["compact", "divided"], description: "Layout variant. 'divided' inserts separator lines and removes gap; 'compact' tightens gap and min column width." }
    ],
    minimal_html: '<div data-pattern="stat-group" data-variant="divided">\n  <div class="stat">\n    <p class="stat-label">Active</p>\n    <p class="stat-value">1,284</p>\n  </div>\n  <div class="stat">\n    <p class="stat-label">Churned</p>\n    <p class="stat-value">22</p>\n  </div>\n  <div class="stat">\n    <p class="stat-label">New this week</p>\n    <p class="stat-value">+128</p>\n  </div>\n</div>',
    notes: "Responsive auto-fit grid wrapper for stat components. Tune with --stat-group-cols (default 4), --stat-group-min (default 10rem), --stat-group-gap (default space-4). Variant 'divided' adds separator lines; 'compact' reduces spacing."
  },

  "chart-frame": {
    status: "stable",
    root_selector: "chart-frame",
    element: "figure",
    elements: [
      { selector: "chart-frame-title", role: "chart heading", element: "figcaption" },
      { selector: "chart-frame-body", role: "aspect-ratio wrapper for svg/canvas/chart lib", element: "div" },
      { selector: "chart-frame-legend", role: "horizontal legend row", element: "ul" },
      { selector: "chart-frame-legend-item", role: "single legend swatch + label", element: "li" }
    ],
    data_attrs: [],
    minimal_html: '<figure class="chart-frame" aria-labelledby="revenue-title">\n  <figcaption class="chart-frame-title" id="revenue-title">Monthly Revenue</figcaption>\n  <div class="chart-frame-body" role="img" aria-label="Bar chart, monthly revenue January to December">\n    <svg viewBox="0 0 400 200"><!-- draw or mount chart lib here --></svg>\n  </div>\n  <ul class="chart-frame-legend">\n    <li class="chart-frame-legend-item" style="--legend-color: var(--color-chart-1)">Revenue</li>\n    <li class="chart-frame-legend-item" style="--legend-color: var(--color-chart-2)">Target</li>\n  </ul>\n</figure>',
    notes: "Minimal layout wrapper for embedded charts. Does NOT render charts. Tune aspect ratio with --chart-frame-ratio (default 16/9). Consume chart colors via --color-chart-1..8 tokens. See docs/architecture/chart-embedding-pattern.md."
  },

  "inline-notice": {
    status: "stable",
    root_selector: "inline-notice",
    element: "div",
    elements: [
      { selector: "inline-notice-icon", role: "leading tone icon", element: "span" },
      { selector: "inline-notice-content", role: "text wrapper (title + body)", element: "div" },
      { selector: "inline-notice-title", role: "heading", element: "p" },
      { selector: "inline-notice-body", role: "description text", element: "p" },
      { selector: "inline-notice-actions", role: "trailing action buttons row", element: "div" },
      { selector: "inline-notice-close", role: "dismiss button", element: "button" }
    ],
    data_attrs: [
      { attr: "data-tone", on: "root", values: ["success", "warning", "danger", "info"], description: "Required tone variant. Drives background, border and left-accent colors." },
      { attr: "data-hidden", on: "root", values: ["true"], description: "Hide the notice without removing it from the DOM." }
    ],
    minimal_html: '<div class="inline-notice" data-tone="info" role="status" aria-live="polite">\n  <span class="inline-notice-icon" aria-hidden="true">\u2139</span>\n  <div class="inline-notice-content">\n    <p class="inline-notice-title">Heads up</p>\n    <p class="inline-notice-body">Your subscription renews in 3 days.</p>\n  </div>\n  <div class="inline-notice-actions">\n    <button class="btn btn-primary btn-sm">Renew</button>\n  </div>\n  <button class="inline-notice-close icon-button icon-button-sm" aria-label="Dismiss">\u00d7</button>\n</div>',
    notes: "Persistent in-flow page/section status message with slots for icon, content, actions, and close. Pick inline-notice when the message needs actions or dismissal; use alert for static blocks and toast for transient confirmations. Add role=\"status\" + aria-live=\"polite\" (or role=\"alert\" for danger tone)."
  },

  "time-range-picker": {
    status: "stable",
    selector_type: "data-pattern",
    root_selector: "[data-pattern=\"time-range-picker\"]",
    element: "div",
    elements: [
      { slot: "from", role: "start time input", element: "div" },
      { slot: "separator", role: "to/dash separator", element: "span" },
      { slot: "to", role: "end time input", element: "div" }
    ],
    data_attrs: [
      { attr: "data-variant", on: "root", values: ["block"], description: "Full-width block layout." },
      { attr: "data-invalid", on: "root", values: ["true"], description: "Invalid/error state on both inputs." }
    ],
    minimal_html: '<div data-pattern="time-range-picker">\n  <div data-slot="from"><!-- time-picker --></div>\n  <span data-slot="separator" aria-hidden="true">–</span>\n  <div data-slot="to"><!-- time-picker --></div>\n</div>',
    notes: "Inline time range selector wrapping two time-picker components. Use aria-describedby with an error-text for invalid state."
  },

  /* ─── Typography surfaces ───────────────────────────────────────────────── */

  heading: {
    status: "stable",
    root_selector: "heading",
    element: "h2",
    elements: [],
    data_attrs: [],
    minimal_html: '<h2 class="heading">Section heading</h2>',
    notes: "Single-class typographic heading. Use any of <h1>–<h6> elements; class only normalizes margin, color, size and weight. Size/weight variants are not yet normalized — set --font-size-* on the element if a different scale step is needed."
  },

  text: {
    status: "stable",
    root_selector: "text",
    element: "p",
    elements: [],
    data_attrs: [],
    minimal_html: '<p class="text">Body copy paragraph.</p>',
    notes: "Generic paragraph/body-copy surface. Tone or scale variants not yet finalized; lean on tokens (--font-size-*, --color-fg-*) for adjustments."
  },

  quote: {
    status: "stable",
    root_selector: "quote",
    element: "blockquote",
    elements: [],
    data_attrs: [],
    minimal_html: '<blockquote class="quote">Inline quotation text.</blockquote>',
    notes: "Inline-start accent border quotation. Use <blockquote> or <q> for semantics."
  },

  kbd: {
    status: "stable",
    root_selector: "kbd",
    element: "kbd",
    elements: [],
    data_attrs: [],
    minimal_html: '<kbd class="kbd">⌘</kbd> <kbd class="kbd">K</kbd>',
    notes: "Single inline keyboard key indicator. Use the native <kbd> element for semantics."
  },

  code: {
    status: "stable",
    root_selector: "code",
    element: "code",
    elements: [],
    data_attrs: [],
    minimal_html: '<code class="code">npm install</code>',
    notes: "Inline code surface. For multi-line snippets use code-block. Syntax highlighting is not provided."
  },

  "code-block": {
    status: "stable",
    root_selector: "code-block",
    element: "pre",
    elements: [],
    data_attrs: [],
    minimal_html: '<pre class="code-block"><code>const x = 1;\nconsole.log(x);</code></pre>',
    notes: "Multi-line code block. Wrap the inner <code> for valid HTML. Syntax-highlight integration is up to the consumer."
  },

  callout: {
    status: "stable",
    root_selector: "callout",
    element: "div",
    elements: [
      { selector: "callout-title", role: "callout heading", element: "p" },
      { selector: "callout-body", role: "callout description", element: "p" }
    ],
    data_attrs: [],
    minimal_html: '<div class="callout">\n  <p class="callout-title">Heads up</p>\n  <p class="callout-body">Supplementary explanation text.</p>\n</div>',
    notes: "Inline-start accent informational callout. For dismissible/transient surfaces prefer alert or inline-notice; semantic distinction from alert is not fully resolved."
  },

  "markdown-surface": {
    status: "stable",
    root_selector: "markdown-surface",
    element: "div",
    elements: [],
    data_attrs: [],
    minimal_html: '<div class="markdown-surface">\n  <h2>Title</h2>\n  <p>Rendered markdown body copy.</p>\n  <ul>\n    <li>Item</li>\n  </ul>\n</div>',
    notes: "Opinionated reset for rendered markdown/prose blocks. Resets margins on h1–h3, p, ul, pre and applies a vertical rhythm. May conflict with custom prose stacks."
  },

  /* ─── Form / Input (beta) ──────────────────────────────────────────────── */

  "number-input": {
    status: "stable",
    root_selector: "number-input",
    element: "div",
    elements: [
      { selector: "input", role: "native numeric input", element: "input" },
      { selector: "number-input-controls", role: "increment/decrement column", element: "div" },
      { selector: "number-input-step", role: "single step button (up or down)", element: "button" }
    ],
    data_attrs: [],
    minimal_html: '<div class="number-input">\n  <input class="input" type="number" aria-label="Quantity" />\n  <div class="number-input-controls">\n    <button class="number-input-step" type="button" aria-label="Increase">+</button>\n    <button class="number-input-step" type="button" aria-label="Decrease">−</button>\n  </div>\n</div>',
    notes: "Composed numeric input with stacked stepper buttons. Always set aria-label on the input and on each step button. JS owns increment/decrement behavior."
  },

  "range-slider": {
    status: "stable",
    root_selector: "range-slider",
    element: "input",
    elements: [],
    data_attrs: [
      { attr: "disabled", on: "root", values: ["present"], description: "Native disabled state." }
    ],
    minimal_html: '<input class="range-slider" type="range" min="0" max="100" value="50" aria-label="Volume" />',
    notes: "Single-element native range input. Always provide aria-label or labelled-by association. min/max/step/value live on the native input."
  },

  rating: {
    status: "stable",
    root_selector: "rating",
    element: "div",
    elements: [
      { selector: "rating-item", role: "single star/level button", element: "button" },
      { selector: "rating-item-active", role: "active visual modifier (alternative to data-active)", element: "button" }
    ],
    data_attrs: [
      { attr: "data-active", on: "rating-item", values: ["true"], description: "Marks the item as selected/highlighted." },
      { attr: "aria-disabled", on: "root", values: ["true"], description: "Disables every rating item visually and via cursor." }
    ],
    minimal_html: '<div class="rating" role="radiogroup" aria-label="Rate this item">\n  <button class="rating-item" type="button" data-active="true" aria-label="1 star">★</button>\n  <button class="rating-item" type="button" data-active="true" aria-label="2 stars">★</button>\n  <button class="rating-item" type="button" aria-label="3 stars">★</button>\n  <button class="rating-item" type="button" aria-label="4 stars">★</button>\n  <button class="rating-item" type="button" aria-label="5 stars">★</button>\n</div>',
    notes: "Star/level rating control. JS owns selection state; toggle data-active='true' on the active items. Use role='radiogroup' on root and aria-label on each item. Half-step contract is not yet finalized."
  },

  "tags-input": {
    status: "stable",
    root_selector: "tags-input",
    element: "div",
    elements: [
      { selector: "tags-input-list", role: "row of selected tag chips", element: "div" },
      { selector: "tags-input-item", role: "single selected tag", element: "span" },
      { selector: "tags-input-remove", role: "remove tag button", element: "button" },
      { selector: "tags-input-field", role: "free-text entry input", element: "input" }
    ],
    data_attrs: [
      { attr: "data-tags-invalid", on: "root", values: ["true"], description: "Invalid/error state on the wrapper (red border)." },
      { attr: "data-tags-disabled", on: "root", values: ["true"], description: "Disables the input and all remove buttons." }
    ],
    minimal_html: '<div class="tags-input">\n  <div class="tags-input-list">\n    <span class="tags-input-item">design\n      <button class="tags-input-remove" type="button" aria-label="Remove design">×</button>\n    </span>\n  </div>\n  <input class="tags-input-field" type="text" aria-label="Add tag" />\n</div>',
    notes: "Composite chip + free-text input. JS owns tag add/remove. Use the wrapper-level data-tags-invalid / data-tags-disabled attributes (not data-invalid) — interaction API is still evolving."
  },

  autocomplete: {
    status: "stable",
    root_selector: "autocomplete",
    element: "div",
    elements: [
      { selector: "autocomplete-input", role: "free-text input", element: "input" },
      { selector: "autocomplete-list", role: "suggestion listbox", element: "ul" },
      { selector: "autocomplete-option", role: "single suggestion", element: "li" }
    ],
    data_attrs: [
      { attr: "data-active", on: "autocomplete-option", values: ["true"], description: "Highlights the option (e.g. keyboard cursor)." }
    ],
    minimal_html: '<div class="autocomplete">\n  <input class="autocomplete-input" type="text" role="combobox" aria-expanded="true" aria-controls="ac-list" aria-autocomplete="list" />\n  <ul id="ac-list" class="autocomplete-list" role="listbox">\n    <li class="autocomplete-option" role="option" data-active="true">First match</li>\n    <li class="autocomplete-option" role="option">Second match</li>\n  </ul>\n</div>',
    notes: "Single-select free-text autocomplete. JS owns filtering, navigation and aria-activedescendant wiring. Keyboard interaction API may be extended (beta surface)."
  },

  combobox: {
    status: "stable",
    root_selector: "combobox",
    element: "div",
    elements: [
      { selector: "combobox-input", role: "free-text input", element: "input" },
      { selector: "combobox-list", role: "options listbox", element: "ul" },
      { selector: "combobox-option", role: "single option", element: "li" }
    ],
    data_attrs: [
      { attr: "data-active", on: "combobox-option", values: ["true"], description: "Highlights the keyboard-focused option." },
      { attr: "aria-selected", on: "combobox-option", values: ["true"], description: "Marks the option as the currently selected value." }
    ],
    minimal_html: '<div class="combobox">\n  <input class="combobox-input" type="text" role="combobox" aria-expanded="true" aria-controls="cb-list" aria-autocomplete="list" />\n  <ul id="cb-list" class="combobox-list" role="listbox">\n    <li class="combobox-option" role="option" aria-selected="true">Selected option</li>\n    <li class="combobox-option" role="option" data-active="true">Highlighted option</li>\n  </ul>\n</div>',
    notes: "Single-select combobox. Differs from autocomplete by exposing a persisted aria-selected option. JS owns filtering and aria-activedescendant wiring. Keyboard interaction API may be extended (beta surface)."
  }
};
