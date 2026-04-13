# Adding Fikir CSS to an Existing Project

This guide helps you integrate Fikir CSS into a project that already has its own styles, without breaking anything.

---

## TL;DR

| Scenario | Recommended approach |
|----------|---------------------|
| Greenfield / new project | Import normally — no extra steps |
| Existing project, low style surface | Add Fikir CSS last in the import order |
| Existing project, many global styles | Use `@layer` override block |
| Shared codebase, aggressive global CSS | Enable prefixed class mode |
| Side-by-side with Bootstrap | Load Bootstrap first, Fikir CSS second; override shared names via `@layer my-overrides` |
| Side-by-side with Tailwind | Add Fikir CSS after Tailwind; use `@layer` for conflicts |

---

## Strategy 1 — `@layer` Override Block (Recommended)

Fikir CSS writes all its rules inside named `@layer` declarations. Styles written **outside** any layer automatically win over layered styles. Styles inside a **later-declared layer** also win.

### Declare your layers first

```css
/* your-app.css — import this before anything else */
@layer reset, base, layouts, recipes, components, utilities, overrides;
```

Then put your existing styles in `overrides`:

```css
@layer overrides {
  /* Your existing styles go here — they win over every Fikir CSS layer */
  .btn { background: hotpink; }      /* overrides .btn from Fikir CSS */
  input { border-radius: 0; }        /* overrides input styling */
}
```

### Or use unlayered styles (even simpler)

Styles written outside any `@layer` block beat all layered styles unconditionally:

```css
/* No @layer wrapper needed — these always win */
.my-header { background: var(--brand-primary); }
.legacy-card { border: 2px solid red; }
```

---

## Strategy 2 — Import Order

If you load Fikir CSS **after** your existing stylesheet, its rules can cascade over yours where specificity is equal. To prevent this, use Strategy 1 (`@layer`) rather than relying on import order.

```js
// Bundler example
import "./my-existing-styles.css";   // loaded first
import "fikir-css/css";              // loaded second
import "./my-overrides.css";         // loaded last — wins over both
```

---

## Strategy 3 — Prefixed Mode

When class names like `btn`, `input`, `modal`, `table` genuinely conflict with your existing CSS, enable prefixed mode. All Fikir CSS class names are prefixed with `fk-` (e.g. `fk-btn`, `fk-input`, `fk-modal`).

> **Note:** Prefixed mode requires a build-time flag. See `docs/guides/collision-prevention.md` for migration steps.

```html
<!-- plain mode (default) -->
<button class="btn btn-primary">Click</button>

<!-- prefixed mode -->
<button class="fk-btn fk-btn-primary">Click</button>
```

---

## Side-by-side with Bootstrap

Bootstrap and Fikir CSS both define `.btn`. Bootstrap loads its styles outside any `@layer`, which makes it high-specificity by default.

**Recommended setup:**

```css
/* 1. Declare your layer order */
@layer reset, base, layouts, recipes, components, utilities, bootstrap-compat;

/* 2. Wrap your Bootstrap import in a layer to give it controlled priority */
@layer bootstrap-compat {
  /* paste Bootstrap's reset/normalize here, or import via JS */
}
```

Or use prefixed mode for Fikir CSS so there is no naming overlap at all.

---

## Side-by-side with Tailwind

Tailwind utilities are highly specific when using `!important` variants. With standard Tailwind v3:

```css
/* Load order */
@import "fikir-css/css";     /* Fikir CSS layers */
@tailwind base;
@tailwind components;
@tailwind utilities;         /* Tailwind utilities — highest specificity by default */
```

Fikir CSS component classes (`.btn`, `.card`) and Tailwind utilities are used on different elements in practice, so conflicts are rare. When they do occur, Tailwind utilities win due to specificity.

---

## Incremental Adoption

You do not have to migrate your entire UI at once. Adopt Fikir CSS surface-by-surface:

1. Import `fikir-css/css` once at the app entry point
2. Use Fikir CSS classes only for **new** components; keep existing components unchanged
3. Migrate existing components over time, removing old classes as you add Fikir CSS ones
4. Use `@layer overrides` for any temporary shims during migration

---

## Checklist

- [ ] Import order or `@layer` strategy chosen
- [ ] No visual regressions in existing components (run visual diff or manual review)
- [ ] `data-theme="light"` (or `"dark"`) set on `<html>` so Fikir CSS tokens resolve
- [ ] If using prefixed mode: all class references updated to `fk-` prefix

See `docs/guides/collision-prevention.md` for a per-class conflict risk table.
