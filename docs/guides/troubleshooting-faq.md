# Troubleshooting & FAQ

> See also: [Quick Start](../../README.md#quick-start) · [Migration note](../migration/v0.6-to-v1.0-migration-note.md) · [What's stable in v1.0](../release/what-is-stable-in-v1.md)

---

## Installation

### Styles are not loading — nothing looks right

**Check 1 — import the built CSS:**
```js
// ✓ Correct
import "fikir-css";

// ✗ Wrong — importing source, not built output
import "fikir-css/packages/tokens/core.css";
```

**Check 2 — your bundler must handle CSS imports.** With Vite or webpack 5 this works out of the box. With older setups, check that a CSS loader is configured.

**Check 3 — if you use `data-theme="dark"`, apply it to `<html>` or a top-level container:**
```html
<html data-theme="dark">
```

---

### `Cannot find module 'fikir-css'`

The package must be installed in the project where you import it:
```bash
npm install fikir-css
```

If you're in a monorepo and see this in a sub-package, make sure the sub-package lists `fikir-css` in its own `dependencies`.

---

### TypeScript: no types for `fikir-css/tooling`

Types ship with the package. Make sure you are on `fikir-css@^1.0.0` and your `tsconfig.json` has:
```json
{ "moduleResolution": "bundler" }
```
or
```json
{ "moduleResolution": "node16" }
```
If you see `any` types, check `node_modules/fikir-css/dist/tooling/resolve-classes.d.ts` exists. Reinstall if missing.

---

## Styling

### Dark mode is not applying

Dark mode requires `data-theme="dark"` on a parent element **and** the main CSS import:
```html
<!-- ✓ -->
<html data-theme="dark">
  ...
</html>
```
The dark theme overrides are in the same `fikir.css` bundle — no extra import needed.

---

### Compact density is not applying

Compact mode requires **both** the attribute and a second CSS import:
```js
import "fikir-css";
import "fikir-css/compact"; // required
```
```html
<div data-density="compact">...</div>
```

---

### Rounded / sharp shape is not applying

Same pattern as density — requires a separate import:
```js
import "fikir-css/shape";
```
```html
<html data-shape="rounded">
```

---

### My button/badge style is overridden by something

Fikir CSS uses `@layer` cascade layers (`tokens → base → components → recipes`). If your own CSS is **not** in a layer, it wins. Move your overrides into a layer that comes after `recipes`, or use a higher-specificity selector:
```css
@layer overrides {
  .btn-primary { background: hotpink; }
}
```

---

### `btn-success` / `btn-warning` classes don't exist

Fikir CSS has **three tones** for buttons: `btn-primary`, `btn-neutral`, `btn-danger`. There is no `btn-success` or `btn-warning`. Use a badge or inline-notice for success/warning communication:
```html
<span class="badge badge-success">Saved</span>
```

---

## Accessibility

### Focus ring is missing

Focus rings require `focus-visible` pseudo-class support. All modern browsers support it. If you're targeting very old browsers, you may need the [`focus-visible` polyfill](https://github.com/WICG/focus-visible).

Make sure you haven't globally suppressed `outline` in your reset:
```css
/* ✗ Don't do this */
* { outline: none; }
```

---

### Screen reader announces button role incorrectly

Always use a native `<button>` element — never `<div class="btn">`:
```html
<!-- ✓ -->
<button type="button" class="btn btn-primary btn-solid">Save</button>

<!-- ✗ Not accessible -->
<div class="btn btn-primary btn-solid" onclick="save()">Save</div>
```

---

## Components

### Modal doesn't open

The modal visibility is controlled by the `data-open` attribute — not a class:
```js
// ✓ Open
modal.setAttribute("data-open", "true");

// ✓ Close — always REMOVE, never set to "false"
modal.removeAttribute("data-open");

// ✗ Wrong — has no effect
modal.setAttribute("data-open", "false");
```

---

### Dropdown menu items are not keyboard-navigable

Keyboard navigation (arrow keys, Home/End, Escape) must be wired in your JavaScript. The CSS only provides the visual layer. See the [Dropdown menu keyboard pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/) for a reference implementation.

---

### Tabs don't switch on click

Fikir CSS applies `display: none` to non-active panels via `[data-selected]`. Your JS must:
1. Remove `data-selected` from all tab triggers and panels
2. Add `data-selected` to the clicked trigger and its associated panel

---

### Icon button has no accessible label

Every `icon-button` must have `aria-label`:
```html
<!-- ✓ -->
<button class="icon-button icon-button-md" aria-label="Close dialog">×</button>

<!-- ✗ No accessible name -->
<button class="icon-button icon-button-md">×</button>
```

---

## Resolvers / Tooling

### `resolveBtn is not a function`

Import from the canonical path:
```js
// ✓
import { resolveBtn } from "fikir-css/tooling";

// ✗ Path typo or old alias
import { resolveBtn } from "fikir-css/resolvers";
```
Both paths resolve to the same module, but `fikir-css/tooling` is the canonical one.

---

### Resolver returns wrong class string in prefixed mode

If you use `FIKIR_NAMING_MODE=prefixed`, the resolver output will include the configured prefix. Make sure your template matches the mode:
```js
// Plain mode (default) → "btn btn-primary btn-solid btn-md"
// Prefixed mode        → "fk-btn fk-btn-primary fk-btn-solid fk-btn-md"
```

---

## Still stuck?

- Browse the component docs in [`docs/components/`](../components/)
- Check [`docs/migration/v0.6-to-v1.0-migration-note.md`](../migration/v0.6-to-v1.0-migration-note.md) if upgrading
- Open an issue on GitHub with a minimal reproduction
