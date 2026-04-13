# Theme System Guide

> Updated: M10 — full content.

Fikir CSS ships multiple independent theme layers activated via `data-*` attributes on the `<html>` element. No rebuild, no JavaScript class toggling required.

## Available Themes

| Theme | Activation | CSS import | Effect |
|-------|-----------|------------|--------|
| Light _(default)_ | `data-theme="light"` or nothing | included in main bundle | Default color palette |
| Dark | `data-theme="dark"` | `fikir-css/themes/dark` | Dark color tokens |
| High contrast | `data-theme="high-contrast"` | `fikir-css/themes/high-contrast` | WCAG AAA contrast ratios |
| Compact | `data-density="compact"` | `fikir-css/themes/compact` | Reduced spacing + smaller font sizes |
| Comfortable | `data-density="comfortable"` | `fikir-css/themes/comfortable` | Increased spacing |
| Reduced motion | `data-motion="reduced"` or OS preference | `fikir-css/themes/reduced-motion` | Disables all transitions/animations |
| Shape | `data-shape="rounded"` | `fikir-css/themes/shape` | Alternative border-radius scale |

## Activation

### Option 1 — HTML attribute (simplest)

```html
<!-- Dark mode -->
<html data-theme="dark">

<!-- Compact density -->
<html data-density="compact">

<!-- High contrast -->
<html data-theme="high-contrast">

<!-- Combine: dark + compact -->
<html data-theme="dark" data-density="compact">
```

### Option 2 — JavaScript toggle

```js
// Toggle dark mode
const root = document.documentElement;
root.setAttribute('data-theme', root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');

// Toggle compact density
root.toggleAttribute('data-density'); // removes if present, adds if absent
root.setAttribute('data-density', 'compact');
root.removeAttribute('data-density'); // back to default
```

### Option 3 — CSS-only (no JS)

```html
<!-- Activate dark mode without JavaScript using a hidden checkbox -->
<input type="checkbox" id="dark-toggle" hidden />
<label for="dark-toggle">Dark mode</label>

<style>
  #dark-toggle:checked ~ html,
  #dark-toggle:checked ~ * { /* workaround: use data attribute via CSS custom property */ }
</style>
```

> Note: CSS-only theme toggle without JS requires a structural workaround. The recommended approach is the JS toggle above.

## Reduced Motion

The `reduced-motion` theme is special: it responds to **both** the OS preference and a manual override.

```css
/* packages/tokens/themes/reduced-motion.css — what ships in the bundle */

/* 1. Automatic: respects OS-level preference */
@media (prefers-reduced-motion: reduce) {
  @layer base {
    :root {
      --transition-duration-fast: 0ms;
      --transition-duration-base: 0ms;
      --transition-duration-slow: 0ms;
      --animation-duration: 0ms;
    }
  }
}

/* 2. Manual override: explicit data attribute or class */
[data-motion="reduced"],
.motion-reduced {
  --transition-duration-fast: 0ms;
  --transition-duration-base: 0ms;
  --transition-duration-slow: 0ms;
  --animation-duration: 0ms;
}
```

**Activation:**
```html
<!-- Automatic — no code needed; OS setting respected automatically -->

<!-- Manual override on the page -->
<html data-motion="reduced">

<!-- Manual on a specific element -->
<div class="motion-reduced">...</div>
```

## Mixing Themes

Themes are designed to compose cleanly:

```html
<!-- Dark mode + compact density + reduced motion -->
<html data-theme="dark" data-density="compact" data-motion="reduced">
```

## Brand Color (Accent Override)

**`--color-accent` is the single brand color hook.** Override it globally — all buttons, focus rings, active states, and interactive elements automatically pick up your brand color.

```css
/* brand.css — load AFTER fikir.css */
:root {
  --color-accent: #7c3aed;   /* your brand color — replaces Fikir's default blue */
}

/* Per-theme variant (optional) */
[data-theme="dark"] {
  --color-accent: #a78bfa;   /* lighter tint for dark backgrounds */
}
```

> ⚠️ **Do NOT create `--my-brand-accent` or `--app-accent`.** A parallel token system breaks dark mode and high-contrast themes — they only know how to override `--color-accent`.

## Writing Custom CSS with Fikir Tokens

When building app-specific components (charts, dashboards, brand sections), always consume Fikir tokens — never hard-code values:

```css
/* ✅ Correct — tokens adapt to every theme automatically */
.my-panel {
  background: var(--color-bg-surface);
  color: var(--color-fg-default);
  border: 1px solid var(--color-border-subtle);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  gap: var(--space-3);
  font-size: var(--font-size-sm);
}

/* ❌ Wrong — hard-coded values break dark mode */
.my-panel {
  background: #ffffff;
  color: #111827;
  border: 1px solid #e5e7eb;
  padding: 16px 24px;
  border-radius: 8px;
}
```

### Spacing scale

| Token | Value | Use for |
|-------|-------|---------|
| `--space-1` | 0.25rem | Tiny gaps, icon padding |
| `--space-2` | 0.5rem | Compact item spacing |
| `--space-3` | 0.75rem | Default internal padding |
| `--space-4` | 1rem | Card padding, section gaps |
| `--space-6` | 1.5rem | Large section spacing |
| `--space-8` | 2rem | Page-level spacing |

### Radius scale

| Token | Use for |
|-------|---------|
| `--radius-sm` | Tags, badges, small inputs |
| `--radius-md` | Buttons, inputs, cards |
| `--radius-lg` | Panels, modals, large cards |

## Token Overrides

All theme values are CSS custom properties. Override locally without touching the theme files:

```css
/* my-overrides.css */
[data-theme="dark"] {
  --color-accent: #a78bfa;           /* custom purple accent in dark mode */
  --color-bg-surface: #1a1a2e;       /* deeper background */
}

[data-density="compact"] {
  --space-3: 0.5rem;                 /* tighter than default compact */
}
```

## Adding a Custom Theme

```css
/* my-theme.css */
@layer theme {
  [data-theme="ocean"] {
    --color-accent: #0ea5e9;
    --color-bg-default: #0f172a;
    --color-bg-surface: #1e293b;
    --color-fg-default: #f1f5f9;
    --color-fg-muted: #94a3b8;
    --color-border-subtle: #334155;
  }
}
```

Then activate with `data-theme="ocean"` on any ancestor element.

## Importing Theme CSS

When using a bundler (Vite / webpack / Parcel):

```js
import 'fikir-css/css';                       // main bundle (light theme always included)
import 'fikir-css/themes/dark';               // dark theme tokens
import 'fikir-css/themes/compact';            // compact density
import 'fikir-css/themes/high-contrast';      // high contrast
import 'fikir-css/themes/reduced-motion';     // reduced motion (usually auto via media query)
```

Plain HTML — reference from the dist folder:

```html
<link rel="stylesheet" href="dist/fikir.css" />
<link rel="stylesheet" href="dist/themes/dark.css" />
<link rel="stylesheet" href="dist/themes/compact.css" />
```

> The main bundle already includes the `reduced-motion` media query. The separate import is only needed if you want the manual `[data-motion="reduced"]` override without the media query.
