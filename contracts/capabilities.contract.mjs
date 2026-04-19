/**
 * Capabilities Contract — source of truth for dist/contracts/capabilities.json
 * Documents what each component does and does NOT do, to guide AI code generation.
 */
export const capabilitiesContract = {

  /* ─── Core ─────────────────────────────────────────────────────────────── */

  button: {
    status: "stable",
    does: [
      "Applies tone-based color theming: primary, neutral, danger",
      "Applies style variants: solid, soft, outline, ghost, plain",
      "Applies size variants: xs, sm, md, lg",
      "Applies :disabled state (opacity 0.65 + cursor: not-allowed)",
      "Applies hover and active transitions (background-color, border-color, color)"
    ],
    does_not: [
      "Does not add icons — compose icon elements inside the button",
      "Does not manage loading state — add a spinner element manually",
      "Does not emit events — wire event handlers in app JS",
      "Does not manage focus trapping"
    ],
    requires_app_css: []
  },

  "icon-button": {
    status: "stable",
    does: [
      "Provides square, equal-width/height button sizing",
      "Applies size variants: xs, sm, md, lg"
    ],
    does_not: [
      "Does not include an icon — place SVG or icon font inside",
      "Does not provide tooltip — add tooltip component separately"
    ],
    requires_app_css: []
  },

  badge: {
    status: "stable",
    does: [
      "Applies tone-based color: primary, neutral, success, warning, danger, info",
      "Applies style variants: solid, soft, outline, plain",
      "Applies size variants: xs, sm, md, lg"
    ],
    does_not: [
      "Does not dismiss/close — add close logic in app JS if needed",
      "Does not animate entry/exit"
    ],
    requires_app_css: []
  },

  alert: {
    status: "stable",
    does: [
      "Applies tone-based background/border color: danger, warning, success, info, neutral",
      "Provides title and description sub-elements",
      "Applies outline style modifier via data-style=\"outline\""
    ],
    does_not: [
      "Does not auto-dismiss — app must remove element",
      "Does not animate entry/exit",
      "Does not include icons — add icon element manually"
    ],
    requires_app_css: []
  },

  card: {
    status: "stable",
    does: [
      "Provides bordered, rounded container with background",
      "Applies variant styles: flat, plain, subtle, elevated, interactive",
      "Applies padding presets: card-p-sm, card-p-md, card-p-lg",
      "Interactive variant adds hover lift and shadow transition"
    ],
    does_not: [
      "Does not define header/body/footer sub-elements — compose freely inside",
      "Does not include media/image area — add img/div manually"
    ],
    requires_app_css: []
  },

  surface: {
    status: "stable",
    does: [
      "Provides semantic background/border/shadow surfaces: flat, subtle, elevated, interactive, raised, sunken"
    ],
    does_not: [
      "Does not define inner layout — compose freely inside"
    ],
    requires_app_css: []
  },

  divider: {
    status: "stable",
    does: ["Renders a horizontal or vertical separator line"],
    does_not: ["Does not add label/text — add text element beside it if needed"],
    requires_app_css: []
  },

  spinner: {
    status: "stable",
    does: [
      "Renders an animated loading indicator",
      "Applies size variants: sm, md, lg"
    ],
    does_not: [
      "Does not block UI — wrap in loading-overlay for that",
      "Does not announce loading state — add aria-label and role=\"status\""
    ],
    requires_app_css: []
  },

  skeleton: {
    status: "stable",
    does: [
      "Renders animated shimmer placeholder shapes: text, block, circle",
      "Provides composite presets: skeleton-table, skeleton-card, skeleton-form"
    ],
    does_not: [
      "Does not detect data loading state — app must swap skeleton with real content",
      "Does not measure real content dimensions automatically"
    ],
    requires_app_css: [
      "Add aria-hidden=\"true\" on skeleton container"
    ]
  },

  "visually-hidden": {
    status: "stable",
    does: ["Hides element visually while keeping it accessible to screen readers"],
    does_not: ["Does not affect DOM order — place appropriately in source"],
    requires_app_css: []
  },

  link: {
    status: "stable",
    does: [
      "Applies styled anchor color, underline, and hover state",
      "Tone variants: link-muted | link-danger"
    ],
    does_not: ["Does not handle routing — use framework router or <a href>"],
    requires_app_css: []
  },

  label: {
    status: "stable",
    does: ["Applies styled form label with correct font weight and spacing"],
    does_not: ["Does not auto-associate with input — use for/id attributes"],
    requires_app_css: ["Use for attribute pointing to input id"]
  },

  "helper-text": {
    status: "stable",
    does: ["Applies styled hint text below a form field"],
    does_not: ["Does not toggle visibility — app must show/hide it"],
    requires_app_css: ["Mutually exclusive with error-text — toggle via hidden attribute"]
  },

  "error-text": {
    status: "stable",
    does: ["Applies styled error message text (red color)"],
    does_not: [
      "Does not validate — app triggers visibility",
      "Does not announce — add role=\"alert\" for live region"
    ],
    requires_app_css: ["Add role=\"alert\" for live announcement", "Mutually exclusive with helper-text"]
  },

  "otp-input": {
    status: "stable",
    does: [
      "Provides styled group of individual digit input slots",
      "Applies consistent sizing and gap between slots"
    ],
    does_not: [
      "Does NOT manage focus traversal between slots — app must wire keydown handlers",
      "Does NOT auto-submit on completion — app implements logic"
    ],
    requires_app_css: ["Wire focus traversal (left/right arrows, backspace) in app JS"]
  },

  "hover-card": {
    status: "stable",
    does: [
      "Provides floating card content box",
      "Shows when data-open=\"true\" is set on root"
    ],
    does_not: [
      "Does NOT show/hide on hover automatically — app manages mouse events",
      "Does NOT position itself — JS positioning required"
    ],
    requires_app_css: ["Wire mouseenter/mouseleave to set/remove data-open", "Position via JS"]
  },

  "menu-bar": {
    status: "stable",
    does: [
      "Provides horizontal nav bar with dropdowns",
      "Shows submenu when data-open=\"true\" on menu-bar-item"
    ],
    does_not: [
      "Does NOT open dropdowns on hover — wire mouseenter/click in app JS",
      "Does NOT handle keyboard navigation — wire ArrowDown/Escape in app JS"
    ],
    requires_app_css: ["Toggle data-open on menu-bar-item to show/hide submenus"]
  },

  list: {
    status: "stable",
    does: ["Applies styled list with consistent spacing and markers"],
    does_not: ["Does not manage selection state"],
    requires_app_css: []
  },

  "description-list": {
    status: "stable",
    does: ["Applies styled definition list layout for term/value pairs"],
    does_not: ["Does not enforce key/value alignment beyond CSS — structure with dt/dd"],
    requires_app_css: ["Use semantic <dl>, <dt>, <dd> elements"]
  },

  /* ─── Form / Input ──────────────────────────────────────────────────────── */

  field: {
    status: "stable",
    does: [
      "Provides layout wrapper for form control + label + helper/error text",
      "Applies invalid state styling via data-invalid=\"true\""
    ],
    does_not: [
      "Does not validate input — wire validation in app JS",
      "Does not auto-connect label to input — use for/id attributes",
      "Does not switch helper-text/error-text visibility — app must toggle hidden attribute"
    ],
    requires_app_css: [
      "Connect label to input via for/id",
      "Toggle error-text/helper-text visibility via hidden attribute or JS",
      "Add aria-describedby on input to reference helper-text or error-text id"
    ]
  },

  input: {
    status: "stable",
    does: [
      "Applies full-width styled input box with border, radius, padding",
      "Applies size variants: sm, md, lg",
      "Applies :focus-visible ring",
      "Applies :disabled and :read-only states"
    ],
    does_not: [
      "Does not add a label — always use label element",
      "Does not validate — app is responsible",
      "Does not add clear/search icons — compose manually"
    ],
    requires_app_css: []
  },

  textarea: {
    status: "stable",
    does: ["Applies styled textarea with border, radius, padding"],
    does_not: [
      "Does not auto-resize — add resize logic in app JS if needed",
      "Does not add character counter — add separately"
    ],
    requires_app_css: []
  },

  select: {
    status: "stable",
    does: [
      "Applies styled native select with border, radius, padding",
      "Applies size variants: sm, md, lg"
    ],
    does_not: [
      "Does not provide custom dropdown UI — use combobox for that",
      "Does not add search filtering"
    ],
    requires_app_css: []
  },

  checkbox: {
    status: "stable",
    does: ["Styles native checkbox with accent color and sizing"],
    does_not: [
      "Does not provide indeterminate visual — set via JS input.indeterminate",
      "Does not manage group state"
    ],
    requires_app_css: []
  },

  radio: {
    status: "stable",
    does: ["Styles native radio button with accent color"],
    does_not: ["Does not manage group selection state — native name attribute handles it"],
    requires_app_css: []
  },

  switch: {
    status: "stable",
    does: [
      "Styles checkbox as a toggle switch",
      "Applies on/off visual states via :checked"
    ],
    does_not: [
      "Does not provide label text — add label element",
      "Does not animate toggle — app can add CSS transition"
    ],
    requires_app_css: [
      "Use type=\"checkbox\" role=\"switch\" on input element"
    ]
  },

  "input-group": {
    status: "stable",
    does: [
      "Provides prefix and suffix addon layout for inputs",
      "Joins addon and input visually (removes inner border-radius)"
    ],
    does_not: [
      "Does not style addon icons — add icon content inside addon"
    ],
    requires_app_css: []
  },

  "search-box": {
    status: "stable",
    does: [
      "Provides composed search input with trigger button",
      "Handles layout of input + action button pair"
    ],
    does_not: [
      "Does not filter/search — wire onSubmit/onInput in app JS",
      "Does not show results dropdown — compose with combobox or autocomplete"
    ],
    requires_app_css: []
  },

  "segmented-control": {
    status: "stable",
    does: [
      "Provides radio-group styled as segmented tabs",
      "Applies size variants: xs, sm, md, lg",
      "Applies selected state via :checked on hidden input"
    ],
    does_not: [
      "Does not manage selection in JS — native radio inputs handle it"
    ],
    requires_app_css: []
  },

  /* ─── Overlay / Feedback ────────────────────────────────────────────────── */

  modal: {
    status: "stable",
    does: [
      "Provides fixed full-screen overlay with backdrop and dialog",
      "Provides header, body, footer sub-structure",
      "Shows when data-open=\"true\" is set on root",
      "Hides when data-open attribute is removed"
    ],
    does_not: [
      "Does NOT trap focus — app must implement focus management",
      "Does NOT close on Escape key — wire keydown handler in app JS",
      "Does NOT animate open/close — add CSS transitions in app",
      "Does NOT prevent body scroll — add overflow:hidden on body in app",
      "Does NOT emit events"
    ],
    requires_app_css: [
      "Set data-open=\"true\" to show; removeAttribute(\"data-open\") to hide (never set to false)",
      "Manage focus trap and Escape key in app JS",
      "Add role=\"dialog\" aria-modal=\"true\" aria-labelledby on root"
    ]
  },

  drawer: {
    status: "stable",
    does: [
      "Provides fixed side panel overlay with backdrop",
      "Panel slides from inline-end (right in LTR)",
      "Provides header, body, footer sub-structure",
      "Shows when data-open=\"true\" is set; hides when attribute is removed",
      "z-index: 42"
    ],
    does_not: [
      "Does NOT trap focus — app must implement",
      "Does NOT animate slide — add CSS transition in app",
      "Does NOT close on backdrop click — wire in app JS",
      "Does NOT support left/top/bottom placement without custom CSS"
    ],
    requires_app_css: [
      "Set data-open=\"true\" to show; removeAttribute(\"data-open\") to hide",
      "Manage focus trap in app JS"
    ]
  },

  toast: {
    status: "stable",
    does: [
      "Provides fixed viewport container for stacking toasts",
      "Applies tone variants: danger, success, info, warn, error",
      "Shows individual toast when data-open=\"true\" is set"
    ],
    does_not: [
      "Does NOT auto-dismiss — app must set timer and remove data-open",
      "Does NOT animate entry/exit — add transitions in app",
      "Does NOT stack/position automatically — toast-viewport handles positioning"
    ],
    requires_app_css: [
      "Add aria-live=\"polite\" on toast-viewport",
      "Set data-open=\"true\" on toast to show; removeAttribute to dismiss"
    ]
  },

  popover: {
    status: "stable",
    does: [
      "Provides floating content box",
      "Shows when data-open=\"true\" is set on root"
    ],
    does_not: [
      "Does NOT position itself — use JS (Popper, Floating UI, etc.)",
      "Does NOT close on outside click — wire in app JS",
      "Does NOT animate"
    ],
    requires_app_css: [
      "Position via JS or inline style",
      "Set data-open=\"true\" to show; removeAttribute to hide"
    ]
  },

  tooltip: {
    status: "stable",
    does: ["Provides styled tooltip content box"],
    does_not: [
      "Does NOT show/hide on hover — app manages visibility",
      "Does NOT position itself — JS required"
    ],
    requires_app_css: [
      "Show/hide tooltip-content via JS toggle",
      "Add role=\"tooltip\" and aria-describedby for accessibility"
    ]
  },

  "dropdown-menu": {
    status: "stable",
    does: [
      "Provides menu container and item styling",
      "Shows when data-open=\"true\" is set on root"
    ],
    does_not: [
      "Does NOT position itself — use JS positioning",
      "Does NOT manage keyboard navigation — wire ArrowUp/Down in app JS",
      "Does NOT close on outside click — wire in app JS"
    ],
    requires_app_css: [
      "Position via JS",
      "Set data-open=\"true\" to show; removeAttribute to hide",
      "Add role=\"menu\" on content, role=\"menuitem\" on items"
    ]
  },

  progress: {
    status: "stable",
    does: [
      "Provides track and indicator bar layout",
      "Width of progress-indicator drives the fill"
    ],
    does_not: [
      "Does NOT animate progress change — add CSS transition in app",
      "Does NOT fetch progress value — app sets width via style or CSS var"
    ],
    requires_app_css: [
      "Set progress-indicator width via inline style: style=\"width: 60%\"",
      "Add role=\"progressbar\" aria-valuenow/min/max on root"
    ]
  },

  "loading-overlay": {
    status: "stable",
    does: [
      "Provides semi-transparent backdrop + centered content overlay",
      "Activates when data-loading=\"true\" is set on root"
    ],
    does_not: [
      "Does NOT detect async operations — app sets data-loading",
      "Does NOT block pointer events on its own — add pointer-events:none if needed"
    ],
    requires_app_css: [
      "Set data-loading=\"true\" to show; removeAttribute to hide",
      "Parent element must have position:relative (or positioned ancestor)"
    ]
  },

  result: {
    status: "stable",
    does: [
      "Provides centered media + title + description + actions layout",
      "Used for success, error, and empty results"
    ],
    does_not: [
      "Does NOT manage navigation — wire action buttons in app JS"
    ],
    requires_app_css: []
  },

  /* ─── Navigation ────────────────────────────────────────────────────────── */

  tabs: {
    status: "stable",
    does: [
      "Provides tab list, tab triggers, and tab panels",
      "Shows active trigger via data-active=\"true\"",
      "Shows active panel via data-active=\"true\""
    ],
    does_not: [
      "Does NOT manage active state — app must toggle data-active on click",
      "Does NOT animate panel transition",
      "Does NOT handle keyboard arrow navigation — wire in app JS"
    ],
    requires_app_css: [
      "Toggle data-active=\"true\" on trigger and matching panel",
      "Add role=\"tablist\" / role=\"tab\" / role=\"tabpanel\" and aria-selected"
    ]
  },

  accordion: {
    status: "stable",
    does: [
      "Provides items with trigger and expandable panel",
      "Shows panel when data-open=\"true\" is set on accordion-item"
    ],
    does_not: [
      "Does NOT enforce single-open — app can open multiple items",
      "Does NOT animate expand/collapse — add CSS transition in app",
      "Does NOT manage keyboard navigation"
    ],
    requires_app_css: [
      "Toggle data-open=\"true\" on accordion-item to expand/collapse",
      "Sync aria-expanded on trigger"
    ]
  },

  navbar: {
    status: "stable",
    does: [
      "Provides horizontal navigation layout with brand, nav list, and items"
    ],
    does_not: [
      "Does NOT provide fixed/sticky positioning — add position:fixed or sticky in app CSS",
      "Does NOT provide backdrop blur — add in app CSS",
      "Does NOT handle mobile hamburger toggle — app JS required",
      "Does NOT collapse on mobile automatically"
    ],
    requires_app_css: [
      "Add position:fixed and top:0 for sticky navbar in app",
      "Mobile toggle behavior must be wired in app JS"
    ]
  },

  "sidebar-nav": {
    status: "stable",
    does: [
      "Provides vertical nav with sections and item links",
      "Styles active item via aria-current=\"page\""
    ],
    does_not: [
      "Does NOT collapse to mobile — app handles responsive behavior",
      "Does NOT manage active state — app sets aria-current"
    ],
    requires_app_css: []
  },

  breadcrumb: {
    status: "stable",
    does: [
      "Provides styled breadcrumb list with links and current page label"
    ],
    does_not: [
      "Does NOT add separator characters — add via CSS content or HTML entity between items"
    ],
    requires_app_css: [
      "Add aria-label=\"Breadcrumb\" on nav element",
      "Add aria-current=\"page\" on current item"
    ]
  },

  pagination: {
    status: "stable",
    does: [
      "Provides pagination item buttons/links",
      "Applies size variants: sm, md, lg",
      "Applies active state via aria-current=\"page\""
    ],
    does_not: [
      "Does NOT manage page state — app wires click handlers",
      "Does NOT generate page numbers — app renders correct items"
    ],
    requires_app_css: [
      "Add aria-label=\"Pagination\" on nav",
      "Set aria-current=\"page\" on active page item"
    ]
  },

  stepper: {
    status: "stable",
    does: [
      "Provides step list with marker and label per step",
      "Applies status styling via data-status: complete, active, pending"
    ],
    does_not: [
      "Does NOT navigate between steps — app manages step index",
      "Does NOT validate steps — app is responsible"
    ],
    requires_app_css: [
      "Set data-status on each stepper-item as user progresses"
    ]
  },

  "command-palette": {
    status: "stable",
    does: [
      "Provides full-screen overlay with search input and results list",
      "Shows when data-open=\"true\" is set"
    ],
    does_not: [
      "Does NOT filter results — app implements search logic",
      "Does NOT handle keyboard (ArrowUp/Down, Enter, Escape) — wire in app JS",
      "Does NOT fetch commands — app provides result items"
    ],
    requires_app_css: [
      "Set data-open=\"true\" to show; removeAttribute to hide",
      "Wire keyboard navigation in app JS",
      "Add role=\"dialog\" aria-label on root, role=\"listbox\" on list, role=\"option\" on items"
    ]
  },

  "tree-view": {
    status: "stable",
    does: [
      "Provides nested tree item list with toggle and label",
      "Collapses group when data-tree-expanded=\"false\" on item"
    ],
    does_not: [
      "Does NOT manage expand state — app toggles data-tree-expanded",
      "Does NOT handle keyboard navigation — app wires ArrowUp/Down/Left/Right"
    ],
    requires_app_css: [
      "Toggle data-tree-expanded on tree-view-item",
      "Sync aria-expanded on each tree-view-item"
    ]
  },

  /* ─── Data / Display ────────────────────────────────────────────────────── */

  table: {
    status: "stable",
    does: [
      "Provides styled table with head, body, rows, and cells",
      "Applies row selection highlight via data-row-selected=\"true\"",
      "Applies loading opacity via data-loading=\"true\" on root"
    ],
    does_not: [
      "Does NOT sort columns — app implements sort logic",
      "Does NOT paginate — use pagination component",
      "Does NOT virtualize rows"
    ],
    requires_app_css: []
  },

  "data-grid": {
    status: "stable",
    does: [
      "Provides div-based grid layout for head, body, rows, and cells",
      "Applies row selection via data-row-selected=\"true\""
    ],
    does_not: [
      "Does NOT provide column resizing",
      "Does NOT virtualize rows",
      "Does NOT handle sorting or filtering"
    ],
    requires_app_css: [
      "Add ARIA role=\"grid\" / \"row\" / \"columnheader\" / \"gridcell\" for accessibility"
    ]
  },

  avatar: {
    status: "stable",
    does: [
      "Provides circular avatar with image and fallback",
      "Applies size variants: sm, md, lg"
    ],
    does_not: [
      "Does NOT detect image load failure — app must toggle avatar-fallback visibility",
      "Does NOT provide online/status indicator — compose separately"
    ],
    requires_app_css: [
      "Show avatar-fallback on image error via JS onerror handler"
    ]
  },

  "avatar-group": {
    status: "stable",
    does: ["Stacks multiple avatars with overlap effect"],
    does_not: ["Does NOT show overflow count (+N) automatically — add manually"],
    requires_app_css: []
  },

  stat: {
    status: "stable",
    does: ["Provides label + value + meta layout for a single metric"],
    does_not: ["Does NOT format numbers — app formats value string"],
    requires_app_css: []
  },

  "kpi-card": {
    status: "stable",
    does: ["Provides card-style KPI widget with header, value, meta, and trend"],
    does_not: ["Does NOT fetch data — app populates values"],
    requires_app_css: []
  },

  "empty-state": {
    status: "stable",
    does: [
      "Provides centered media + title + description + actions layout",
      "Used for zero-data and first-use screens"
    ],
    does_not: [
      "Does NOT detect empty data — app conditionally renders component"
    ],
    requires_app_css: []
  },

  timeline: {
    status: "stable",
    does: ["Provides vertical event list with marker, title, and meta"],
    does_not: ["Does NOT fetch events — app provides items"],
    requires_app_css: []
  },

  "tag-chip": {
    status: "stable",
    does: [
      "Provides chip label and optional remove button",
      "Remove button is visually integrated"
    ],
    does_not: [
      "Does NOT auto-remove on click — wire onclick in app JS",
      "Does NOT apply colors by tag value — add inline style or modifier class"
    ],
    requires_app_css: [
      "Wire tag-chip-remove onclick to remove chip from DOM"
    ]
  },

  /* ─── Layout / Shell ────────────────────────────────────────────────────── */

  "app-shell": {
    status: "stable",
    does: [
      "Provides full application layout: topbar + sidebar + main content via CSS Grid",
      "Handles responsive stacking"
    ],
    does_not: [
      "Does NOT collapse sidebar on mobile — app manages responsive state",
      "Does NOT provide sidebar toggle behavior — wire in app JS"
    ],
    requires_app_css: []
  },

  "page-header": {
    status: "stable",
    does: ["Provides flex layout for page title area and actions row"],
    does_not: ["Does NOT include breadcrumbs — compose breadcrumb above if needed"],
    requires_app_css: []
  },

  "section-block": {
    status: "stable",
    does: ["Provides content section with header and body sub-areas"],
    does_not: ["Does NOT toggle collapsed state — add accordion if collapsible needed"],
    requires_app_css: []
  },

  "split-pane": {
    status: "stable",
    does: ["Provides two-panel layout with primary and secondary panes"],
    does_not: [
      "Does NOT allow user-draggable resize — add resizer JS if needed",
      "Does NOT collapse panels on mobile automatically"
    ],
    requires_app_css: []
  },

  /* ─── M16+ data-pattern compounds ─────────────────────────────────────── */

  "auth-screen": {
    status: "stable",
    does: [
      "Provides full-page authentication layout using CSS Grid",
      "Centered single-column variant (default)",
      "Split two-column variant via data-variant='split' (brand panel + form)"
    ],
    does_not: [
      "Does NOT handle form submission or validation — wire in app JS",
      "Does NOT manage social auth buttons — compose inside [data-slot='card']",
      "Does NOT redirect after login — app responsibility"
    ],
    requires_app_css: []
  },

  "coachmark": {
    status: "stable",
    does: [
      "Provides positioned tooltip/hint card with icon, title, description and actions",
      "Applies tone variants via data-variant: info, warning, success, danger, neutral",
      "Supports four anchor positions via data-position: top, bottom, start, end",
      "Shows directional arrow pointer via data-arrow='true'"
    ],
    does_not: [
      "Does NOT handle positioning relative to trigger — requires JS (e.g. Floating UI)",
      "Does NOT auto-show/hide on hover — wire visibility in app JS",
      "Does NOT provide step navigation for multi-step tours"
    ],
    requires_app_css: [
      "Set position:absolute on coachmark and position:relative on trigger wrapper"
    ]
  },

  "command-bar": {
    status: "stable",
    does: [
      "Provides flex layout combining search-box with quick-action icon-buttons",
      "Stacks vertically on narrow viewports (responsive)"
    ],
    does_not: [
      "Does NOT include search-box or buttons — compose inside the pattern",
      "Does NOT execute search or commands — wire in app JS"
    ],
    requires_app_css: []
  },

  "copy-button": {
    status: "stable",
    does: [
      "Swaps copy icon → check icon when data-copied='true' is set",
      "Swaps copy label → copied label when data-copied='true' is set",
      "Shows tooltip feedback slot when data-copied='true'"
    ],
    does_not: [
      "Does NOT read clipboard or call navigator.clipboard.writeText — wire in app JS",
      "Does NOT auto-reset data-copied after a delay — app must clear attribute"
    ],
    requires_app_css: [
      "Toggle data-copied='true' on click; clear after ~2s delay in app JS"
    ]
  },

  "data-table-toolbar": {
    status: "stable",
    does: [
      "Provides slotted layout for search, filters, actions, active-filter chips and export",
      "Integrates flush with card component when placed inside .card"
    ],
    does_not: [
      "Does NOT perform filtering or searching — wire in app JS / framework",
      "Does NOT manage column visibility state — app responsibility"
    ],
    requires_app_css: []
  },

  "empty-search-state": {
    status: "stable",
    does: [
      "Provides centered layout for empty search area with icon, title, description, actions",
      "Applies variant styles via data-variant: first-use, no-results, filtered-empty"
    ],
    does_not: [
      "Does NOT detect search state automatically — set data-variant in app JS based on query state",
      "Does NOT animate in/out — apply transitions in app CSS if needed"
    ],
    requires_app_css: []
  },

  "filter-bar": {
    status: "stable",
    does: [
      "Provides slotted layout for search, filter controls, active-filter chips and reset",
      "Integrates flush with card component when placed inside .card"
    ],
    does_not: [
      "Does NOT apply or clear filters — wire in app JS",
      "Does NOT manage chip state — app adds/removes tag-chip elements"
    ],
    requires_app_css: []
  },

  "onboarding-checklist": {
    status: "stable",
    does: [
      "Provides list layout with progress bar and individual completable step rows",
      "Animates progress fill via inline-size transition"
    ],
    does_not: [
      "Does NOT track completion state — app sets data-completed='true' on items",
      "Does NOT update progress bar width automatically — set via inline style in app JS"
    ],
    requires_app_css: [
      "Set progress-fill width via style='width: X%' driven by JS completion count"
    ]
  },

  "password-input": {
    status: "stable",
    does: [
      "Lays out input + toggle button absolutely positioned inside a relative container",
      "Swaps show/hide icons when data-visible='true'",
      "Renders optional strength bar segments colored by data-strength value"
    ],
    does_not: [
      "Does NOT toggle input type between password/text — wire data-visible toggle in app JS",
      "Does NOT calculate password strength — set data-strength in app JS",
      "Does NOT validate password requirements"
    ],
    requires_app_css: [
      "Toggle data-visible='true' and switch input[type] between password/text in app JS"
    ]
  },

  "search-result-item": {
    status: "stable",
    does: [
      "Provides flex layout for icon, title, description and metadata",
      "Applies hover and data-active='true' highlight styles",
      "Applies section-header styles via data-role='section-header'"
    ],
    does_not: [
      "Does NOT handle keyboard navigation between items — implement roving tabindex in app JS",
      "Does NOT highlight matched text — wrap matched characters in <mark> elements in app JS"
    ],
    requires_app_css: []
  },

  "stat-group": {
    status: "stable",
    does: [
      "Provides responsive auto-fit grid for stat components",
      "Applies compact spacing via data-variant='compact'",
      "Adds inter-item dividers via data-variant='divided'"
    ],
    does_not: [
      "Does NOT include stat components — compose .stat elements inside",
      "Does NOT animate stat value changes"
    ],
    requires_app_css: []
  },

  "time-range-picker": {
    status: "stable",
    does: [
      "Provides inline flex layout for from/separator/to time pickers",
      "Full-width block layout via data-variant='block'",
      "Applies error border color to both inputs via data-invalid='true'"
    ],
    does_not: [
      "Does NOT include time-picker components — compose inside [data-slot='from'] and [data-slot='to']",
      "Does NOT validate that 'from' is before 'to' — wire validation in app JS"
    ],
    requires_app_css: []
  }
};
