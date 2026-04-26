# Canonical Conventions Cheat Sheet

> Status: **Stable** · Added 2026-04-20 (post-1.0 M22 — dashboard dogfooding feedback).
> Single-page reference so humans and AI assistants stop guessing conventions.

Fikir CSS is opinionated about **how state, navigation, and layout are expressed** in markup. This page is the short version of "what Fikir assumes" — every entry below maps a common question to the single canonical answer.

When in doubt, the source of truth is `dist/contracts/anatomy.json` (per-component canonical HTML) and `dist/contracts/primitives.json` (layout defaults).

---

## State attributes

| Purpose | Canonical attribute | Applied on | Notes |
|---------|---------------------|------------|-------|
| Show/hide an overlay | `data-open="true"` | Root of `modal`, `drawer`, `popover`, `dropdown-menu`, `hover-card`, `accordion-item` | **Remove** the attribute to hide — never set `data-open="false"` |
| Active tab / active tab panel | `data-active="true"` | `tabs-trigger`, `tabs-panel` | Pair with `aria-selected`/`aria-controls` on trigger |
| Expanded accordion section | `data-open="true"` | `accordion-item` | Mirror with `aria-expanded` on trigger |
| Loading / busy region | `aria-busy="true"` + `data-loading="true"` | Region root (e.g. `loading-overlay`) | |
| Invalid input field | `data-invalid="true"` | Root of `field` | Connect `error-text` via `aria-describedby` |
| Disabled control | Native `disabled` attribute | `<button>`, `<input>` | Do not use a `disabled` class |
| Dark theme | `data-theme="dark"` | `<html>` or container | See `docs/guides/theme-system.md` |
| Density | `data-density="compact"` / `comfortable"` | `<html>` or container | Requires opt-in theme CSS |

### Navigation "current" / "active"

Use **`aria-current="page"`** on the active element. Do not use `data-active` for navigation items.

| Component | Active marker |
|-----------|---------------|
| `sidebar-nav-item` | `aria-current="page"` |
| `pagination-item` | `aria-current="page"` |
| `breadcrumb-current` | `aria-current="page"` |
| `navbar-item > a` | `aria-current="page"` |
| `menu-bar-link` | `aria-current="page"` |
| `tabs-trigger` | `data-active="true"` (+ `aria-selected="true"`) — tabs are not "pages" |

### Tone / semantic variant

Most toned components use `data-tone="…"` on the root:

| Value | Meaning |
|-------|---------|
| `neutral` | Default, no semantic weight |
| `primary` | Brand emphasis |
| `success` | Positive confirmation |
| `warning` | Caution |
| `danger` | Destructive / error |
| `info` | Neutral informational |

Supported on: `inline-notice`, `toast` (`data-tone` with `success`/`info`/`warn`/`danger`), `coachmark` (`data-variant`). `alert` and `badge` expose tone via modifier classes instead (`alert-danger`, `badge-success`).

---

## Value / progress APIs

| Component | How to set value |
|-----------|------------------|
| `progress` | Inline `style="width: 42%"` on `progress-indicator`, **and** `aria-valuenow="42"` + `aria-valuemin`/`aria-valuemax` on root. The CSS also honours `--progress-value` if you prefer a CSS variable. |
| `range-slider` | Native `<input type="range">` value |
| `onboarding-checklist` | `data-completed="true"` on each `[data-slot="item"]`; progress bar fill via `style="width: 33%"` on `[data-slot="progress-fill"]` |
| `rating` | `rating-item-active` class on filled items |

```html
<div class="progress" role="progressbar"
     aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-track">
    <div class="progress-indicator" style="width: 60%"></div>
  </div>
  <span class="progress-label">60%</span>
</div>
```

---

## Overlay positioning

These components **already include** `position: fixed`, `z-index`, and sensible viewport positioning. Do not re-add them in app CSS.

| Component | Built-in positioning |
|-----------|----------------------|
| `toast-viewport` | `position: fixed; inset-inline-end: var(--space-4); inset-block-end: var(--space-4); z-index: 45;` |
| `modal` | `position: fixed; inset: 0; z-index: 40;` (centered dialog) |
| `drawer` | `position: fixed; z-index: 42;` (slides from inline-end) |
| `loading-overlay` | `position: absolute`, relative to nearest positioned ancestor |

`popover`, `tooltip`, `hover-card`, `dropdown-menu`, `context-menu` **do not** position themselves — the app wires anchor/positioning (e.g. with Floating UI).

### Modal backdrop click-to-close

The backdrop element does **not** auto-close on click. Bind it in JS:

```js
import { bindOverlayKeyboard, createFocusTrap } from "fikir-css/helpers";

const modal = document.getElementById("my-modal");
const trap = createFocusTrap(modal);

function open(trigger) {
  modal.setAttribute("data-open", "true");
  trap.activate(trigger);
  bindOverlayKeyboard(modal, close);
}

function close() {
  modal.removeAttribute("data-open");
  trap.deactivate();
}

modal.querySelector(".modal-backdrop")
  .addEventListener("click", close);
```

Full recipe: `docs/guides/overlay-js-helpers.md`.

---

## Form anatomy

The `field` wrapper is the canonical unit. It holds one label, one control, and exactly one of `helper-text` or `error-text` (never both simultaneously).

```html
<div class="field" data-invalid="true">
  <label class="label" for="email">Email</label>
  <input class="input input-md" id="email" type="email"
         aria-describedby="email-error" aria-invalid="true" />
  <p class="error-text" id="email-error" role="alert">Invalid email.</p>
</div>
```

- Pair `aria-describedby` with the `id` of `helper-text` or `error-text`.
- `data-invalid="true"` on `field` triggers the error visual state.
- Use `input-group` (not `field`) when the control has a prefix/suffix addon (e.g. `@`, `.com`).

---

## inline-notice vs alert vs toast vs callout

| | `inline-notice` | `alert` | `toast` | `callout` |
|---|---|---|---|---|
| Lifetime | Persistent, in flow | Persistent, in flow | Transient, fixed viewport | Persistent, in flow |
| Tones | `data-tone` (4 values) | Modifier class (`alert-danger`, …) | `data-tone` | Tone variants |
| Slots | icon / title / body / actions / close | title + description | title + description + close | title + body |
| When to pick | Page-level or section status that needs actions and dismissal | Simple static message with a title + description | Temporary confirmation after an action | Long-form contextual callout inside docs-like content |

Rule of thumb: "I need a dismissible, action-carrying status banner" → `inline-notice`. "Saved successfully" ephemeral confirmation → `toast`. "Static error summary in a form" → `alert`.

---

## Layout — don't write inline grids

The layout primitives cover the vast majority of dashboard needs. Before writing inline `display: grid` or `display: flex`, check:

| Need | Primitive |
|------|-----------|
| Vertical flow with consistent gap | `stack` (`--stack-gap` to tune) |
| Horizontal row of items, wraps on small screens | `cluster` (`data-cluster-justify="between"` for split layouts) |
| Responsive N-up grid (KPI cards, tiles) | `grid` with `--grid-min` |
| Sidebar + main (2 columns, collapses < 56rem) | `sidebar` primitive |
| Horizontal layout that flips to vertical when items squeeze | `switcher` |
| Centered max-width container | `center` or `container` |
| Full app shell (topbar + sidebar + main) | `app-shell` component |

See `docs/guides/layout-composition.md` for end-to-end recipes and `dist/contracts/primitives.json` for machine-readable defaults.

---

## Responsive sidebar / drawer bridge

`app-shell` already collapses its sidebar above/below `64rem`. For a slide-in mobile drawer, pair `app-shell-sidebar` (desktop) with a separate `drawer` component (mobile) — see the "Mobile drawer" section in `docs/components/app-shell.md`.

---

## Density, motion, theme

| Concern | Toggle |
|---------|--------|
| Light / dark | `data-theme="dark"` |
| Density | `data-density="compact"` (requires `themes/compact.css`) |
| Shape | `data-shape="rounded"` / `data-shape="sharp"` (requires `themes/shape.css`) |
| Reduced motion | Automatic via `@media (prefers-reduced-motion)`; opt-in file: `themes/reduced-motion.css` |

Density does not touch every component by design. For per-component impact, consult the `requires_app_css` / `does` entries in `dist/contracts/capabilities.json`. A dedicated density-impact matrix is tracked in the M22 post-1.0 work.

---

## Anti-pattern checklist (AI assistants, read this)

- ❌ Inline `display: grid; grid-template-columns: repeat(4, 1fr)` on a container of `kpi-card`s — use `<div class="grid" style="--grid-min: 14rem">` instead.
- ❌ `<div class="sidebar-nav-item" data-active="true">` — use `aria-current="page"`.
- ❌ `<div class="progress-indicator" style="width:42%">` **without** `aria-valuenow` on the root.
- ❌ Wrapping both `inline-notice` and `alert` classes on a single element.
- ❌ Re-positioning `toast-viewport` with inline `position: fixed; right: 1rem; bottom: 1rem` — it already does that.
- ❌ Inventing class names not present in `dist/contracts/selectors.json` (e.g. `kpi-card-metric`, `app-shell-footer`).
- ❌ Using utility CSS for component internals; utilities are intentionally narrow (see `docs/release/utility-surface-budget-policy.md`).

---

## Related reading

- `docs/guides/machine-readable-contracts.md` — full manifest tour
- `docs/guides/selector-manifest-usage.md` — how to import/consume the manifests
- `docs/guides/overlay-js-helpers.md` — focus trap + keyboard helpers
- `docs/guides/layout-composition.md` — layout primitive recipes
- `dist/contracts/anatomy.json` — canonical HTML per component
