# Anti-patterns and Troubleshooting Handbook

> Updated: M18 — v1.0.0

---

## Anti-patterns

### 1. Using a component class from the wrong layer

**Problem:** Applying `utilities` class names as if they were in `components`, or vice versa.

```html
<!-- ❌ Wrong: using utility class on a component host expecting component behavior -->
<button class="btn p-0">Save</button>
<!-- p-0 won't override btn's padding unless it's in a higher layer -->
```

**Fix:** Utility classes DO override component classes (utilities layer > components layer). This is intended. `p-0` will win over `btn`'s padding.

---

### 2. Toggling visibility with CSS classes instead of data attributes

**Problem:**
```js
// ❌ Wrong: class toggling for open/close state
modal.classList.add("modal-open");
```

**Fix:** Use the `data-open` attribute contract:
```js
// ✅ Open
modal.setAttribute("data-open", "true");

// ✅ Close — removeAttribute, not dataset.open = "false"
modal.removeAttribute("data-open");
```

CSS checks `[data-open="true"]`. Setting `data-open="false"` leaves the attribute set and the overlay remains visible.

---

### 3. Importing `fikir.css` multiple times

**Problem:** Multiple `<link>` or `@import` statements for the same stylesheet double-loads all rules.

**Fix:** Import once in your entry point. In a bundler, ensure CSS deduplication is configured.

---

### 4. Overriding tokens inside component CSS

**Problem:**
```css
/* ❌ Overriding tokens deep inside a component — hard to maintain */
.my-card .btn {
  --color-accent: red;
}
```

**Fix:** Apply token overrides at the appropriate scope (root, page, or section):
```css
/* ✅ */
.danger-section {
  --color-accent: var(--color-danger);
}
```

---

### 5. Using compact density without importing the theme file

**Problem:**
```js
// ❌ Imported only the base stylesheet
import "fikir-css/css";

// Then toggling density in JS — but nothing changes
document.documentElement.setAttribute("data-density", "compact");
```

**Fix:** The compact density overrides live in a separate opt-in stylesheet:
```js
import "fikir-css/css";
import "fikir-css/themes/compact"; // ✅ required for data-density="compact" to work
```

---

### 6. Wrong `resolveBtn` signature

**Problem:**
```ts
// ❌ variant is the visual style (solid/outline/ghost), not the color tone
resolveBtn({ variant: "primary" });
```

**Fix:**
```ts
// ✅ tone = color, variant = visual style
resolveBtn({ tone: "primary", variant: "solid", size: "md" });
```

---

### 7. Relying on `!important` instead of force utilities

**Problem:**
```css
/* ❌ */
.my-component { padding: 0 !important; }
```

**Fix:** Use the `force-*` escape-hatch utilities which are designed for this:
```html
<!-- ✅ -->
<div class="card force-mt-0">
```

---

### 8. Creating component-specific utility classes outside of the layers

**Problem:** Adding styles outside `@layer` — they have higher specificity than layered rules and cause unexpected overrides.

```css
/* ❌ */
.my-widget { background: red; }
```

**Fix:** Either use Fikir's token-driven component pattern, or scope within an appropriate `@layer`.

---

## Troubleshooting

### Button doesn't look right

- Check you have both `btn` and the variant class (`btn-primary`, etc.)
- Confirm `dist/fikir.css` is loaded
- Check browser devtools for layer order (`@layer components` should have lower priority than `@layer utilities`)

### Dark mode doesn't switch

- Fikir CSS dark mode relies on `prefers-color-scheme`. Check system settings.
- For manual toggle: set `data-theme="dark"` on `<html>` and ensure your semantic token file has a dark override.

### Overlay (modal/popover/dropdown) doesn't appear

- Ensure `data-open="true"` is set on the wrapper element — not a CSS class.
- Check z-index: modal uses `z-index: 40`, popover uses `z-index: 30`, dropdown uses `z-index: 20`.

### Segmented control checked state not applying

- Ensure `<input type="radio" class="segmented-control-input">` is immediately followed by `<label class="segmented-control-label">` (adjacent sibling selector required).

### Component styles missing after build

- Check that the component's CSS file is included in `scripts/css-manifest.mjs`.
- Run `npm run build` and verify the selector appears in `dist/fikir.css`.
- Run `npm run report:dead-surfaces` to see playground coverage.

### Tests failing after adding a new component

1. Add contract keys to `contracts/naming.contract.mjs`
2. Add CSS file to `scripts/css-manifest.mjs`
3. Run `npm run build` before running `npm run test:build`
