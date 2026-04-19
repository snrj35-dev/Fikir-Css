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

### Component-level motion effects

Motion handling varies by component type:

| Component | Motion effect | Behavior under reduced-motion |
|-----------|---------------|------------------------------|
| Button | Hover/active background transition (120ms) | Instant change |
| Icon-button | Hover/active state transition (120ms) | Instant change |
| Link | Color transition (120ms) | Instant change |
| Switch | Slide animation (120ms) | Instant toggle, no transition |
| Segmented control | Background/color transition (100ms) | Instant change |
| Surface | Elevation/shadow transition (120ms) | Instant shadow change |
| Progress | Width transition (180ms) | Instant width update |
| Spinner | Rotation animation (900ms) | Static spinner (paused) |
| Skeleton | Shimmer animation (1.2s) | Static placeholder (no shimmer) |
| Tooltip / Popover | Fade-in animation | Instant appearance |
| Modal / Drawer | Slide/fade animation | Instant appearance |
| Toast | Slide and fade (200-300ms) | Instant appearance/dismissal |

### Motion tokens available

- `--transition-duration-fast`: 120ms (default) → 0ms (reduced)
- `--transition-duration-base`: 200ms (default) → 0ms (reduced)
- `--transition-duration-slow`: 300ms (default) → 0ms (reduced)
- `--animation-duration`: 600–1200ms range → 0ms (reduced)

Use these in custom component CSS to respect user preferences:

```css
.my-button {
  transition: background-color var(--transition-duration-base) ease;
}
```

## Mixing Themes

Themes are designed to compose cleanly:

```html
<!-- Dark mode + compact density + reduced motion -->
<html data-theme="dark" data-density="compact" data-motion="reduced">
```

## Density Modes

Fikir CSS provides three density options that scale **spacing**, **font sizes**, and **touch targets** independently of color themes. Density is NOT a color theme — it's a layout scale.

### Density options

| Mode | Activation | Effect | Use for |
|------|-----------|--------|---------|
| `compact` | `data-density="compact"` | Reduced spacing, smaller fonts, tighter touch targets | Power users, dashboards, data-heavy apps |
| `default` | (none — baseline) | Standard spacing, standard fonts, standard touch targets | Most apps, general UI |
| `comfortable` | `data-density="comfortable"` | Increased spacing, larger fonts, more spacious touch targets | Accessibility-first, kids apps, large screens |

### Spacing scale per density

All `--space-*` tokens scale with density:

| Token | Default | Compact | Comfortable |
|-------|---------|---------|-------------|
| `--space-1` | 0.25rem | 0.125rem | 0.375rem |
| `--space-2` | 0.5rem | 0.25rem | 0.75rem |
| `--space-3` | 0.75rem | 0.375rem | 1rem |
| `--space-4` | 1rem | 0.5rem | 1.25rem |
| `--space-6` | 1.5rem | 0.75rem | 1.75rem |
| `--space-8` | 2rem | 1rem | 2.5rem |

### Font size scale per density

All `--font-size-*` tokens scale with density:

| Token | Default | Compact | Comfortable |
|-------|---------|---------|-------------|
| `--font-size-xs` | 0.75rem | 0.6875rem | 0.8125rem |
| `--font-size-sm` | 0.875rem | 0.75rem | 0.9375rem |
| `--font-size-md` | 1rem | 0.875rem | 1.0625rem |
| `--font-size-lg` | 1.125rem | 1rem | 1.25rem |

### Density + size varyants

Size varyants (xs/sm/md/lg) automatically adapt to the active density mode:

```html
<!-- In default density: button 40px tall -->
<button class="btn btn-md">Save</button>

<!-- Under compact density: button ~36px tall (smaller font, less padding) -->
<html data-density="compact">
  <button class="btn btn-md">Save</button>
</html>

<!-- Under comfortable density: button ~44px tall (larger font, more padding) -->
<html data-density="comfortable">
  <button class="btn btn-md">Save</button>
</html>
```

Touch targets scale to meet WCAG minimums across all densities — no additional work needed.

### Data table / grid density

Tables and data grids also respect density:

- **Compact:** row height ~32px, condensed cell padding, smaller text
- **Default:** row height ~40px, standard padding, standard text
- **Comfortable:** row height ~48px, spacious padding, larger text

## Shape Contract

Fikir CSS provides three shape options that scale **border-radius** across components. Shape is independent of color and density themes.

### Shape options

| Mode | Activation | Effect | Use for |
|------|-----------|--------|---------|
| `sharp` | `data-shape="sharp"` | No border radius (0px) | Enterprise, data-heavy, minimal UI |
| `default` | (none — baseline) | Subtle radius (0.375–1.25rem) | Most apps, balanced modern feel |
| `rounded` | `data-shape="rounded"` | Generous radius (0.5–1.75rem) | Consumer, playful, accessible designs |

### Radius scale per shape mode

All `--radius-*` tokens scale with shape:

| Token | Default | Sharp | Rounded |
|-------|---------|-------|---------|
| `--radius-sm` | 0.375rem | 0 | 0.5rem |
| `--radius-md` | 0.625rem | 0 | 0.875rem |
| `--radius-lg` | 0.875rem | 0 | 1.25rem |
| `--radius-xl` | 1.25rem | 0 | 1.75rem |

### Shape application matrix

| Component family | Token used | Rationale |
|-----------------|-----------|-----------|
| Button, icon-button, input, select | `--radius-md` | Medium radius for interactive targets |
| Badge, tag, chip | `--radius-sm` | Tighter radius for compact elements |
| Card, surface, section | `--radius-lg` | Generous radius for larger containers |
| Modal, drawer, popover | `--radius-lg` | Large radius for overlay surfaces |
| Dropdown menu, tooltip, toast | `--radius-md` | Consistent with button feel |
| Segmented control, tabs | `--radius-md` | Medium radius for control groups |
| Avatar | `--radius-full` | Circle (unchanged across shape modes) |

### Combining shape with density and color

Shape, density, and color themes compose freely:

```html
<!-- Rounded, comfortable, dark -->
<html data-shape="rounded" data-density="comfortable" data-theme="dark">
  <button class="btn btn-primary">Click me</button>
</html>
```

## Semantic Tone Matrix

Fikir CSS v1.0 uses a frozen six-tone contract:

| Tone | Base token | Subtle token | Intended use | High-contrast behavior |
|------|------------|--------------|--------------|------------------------|
| `neutral` | `--color-neutral` | `--color-neutral-subtle` | low-emphasis surfaces, neutral badges, passive feedback | stays on the neutral foreground/background channel |
| `primary` | `--color-primary` | `--color-primary-subtle` | primary actions, selected states, brand-led emphasis | stays on the accent channel |
| `success` | `--color-success` | `--color-success-subtle` | successful outcomes, completion feedback | collapses to the primary emphasis channel |
| `warning` | `--color-warning` | `--color-warning-subtle` | caution, soft blocking states, review-required feedback | collapses to the primary emphasis channel |
| `danger` | `--color-danger` | `--color-danger-subtle` | destructive actions, failures, invalid states | keeps a dedicated destructive channel when available |
| `info` | `--color-info` | `--color-info-subtle` | informative status, passive progress, contextual notices | collapses to the primary emphasis channel |

`--color-primary` is the public tone token. It follows `--color-accent`, so brand overrides stay centralized while component tone APIs remain stable.

### High-Contrast Fallback Strategy

High-contrast themes intentionally reduce the number of simultaneous color channels:

- `neutral` remains neutral and leans on foreground, border, and shape rather than tint.
- `primary` keeps the accent channel.
- `success`, `warning`, and `info` collapse onto the same emphasis channel as `primary` so low-contrast pastel differences do not become the only state signal.
- `danger` keeps a dedicated destructive token when the platform exposes enough contrast to do so safely.
- Under `forced-colors: active`, subtle backgrounds collapse back to `Canvas`; state emphasis must still be carried by text, border, iconography, and copy.

### Forced-Colors Mode Coverage

Windows High Contrast mode (`prefers-contrast: more`) and CSS `forced-colors: active` media feature override colors. Fikir CSS components maintain usability under forced colors via:

**Critical surfaces tested for forced-colors compatibility:**
- Button (all variants: solid, soft, outline, ghost, plain)
- Icon-button (all sizes)
- Input, textarea, select
- Checkbox, radio, switch
- Badge (all tones)
- Alert, toast, result
- Modal, drawer, popover
- Tabs, accordion, pagination
- Progress, spinner
- Link, breadcrumb, navbar active states

**Forced-colors strategy:**
- Border and text colors preserved via CSS keywords (`ButtonBorder`, `ButtonText`, `LinkText`, etc.)
- Subtle backgrounds collapse; state indicated by border, outline, or text weight instead
- Focus indicators use forced-colors-safe outline patterns
- Icons and decorative elements remain visible via `Highlight` and `HighlightText` fallbacks

## Brand Color (Accent Override)

**`--color-accent` is the single brand color hook.** Override it globally — `--color-primary`, buttons, focus rings, active states, and interactive elements automatically pick up your brand color.

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

## State Mapping (ARIA & data-* Attributes)

Fikir CSS components use standardized attribute patterns for state indication. **Do not use CSS classes for state;** use ARIA and data attributes instead.

### Normalized state patterns

| State | Primary mechanism | Secondary indicator | Use case |
|-------|------------------|---------------------|----------|
| `disabled` | `[disabled]` attr | `opacity: 0.65`, pointer-events: none` | Unavailable interactive control |
| `invalid` | `[aria-invalid="true"]` | `border-color: var(--color-danger)` | Form validation failure |
| `readonly` | `[readonly]` | `background: lighter, cursor: text` | Form field not editable |
| `selected` | `[aria-selected="true"]` or `[data-selected="true"]` | `background: accent-tinted` | List/menu item, tab, radio checked state |
| `checked` | `[aria-checked="true"]` or `:checked` pseudo | N/A for native inputs | Checkbox, radio, toggle state |
| `current` | `[aria-current="page"]` or `[data-current="true"]` | `font-weight: bold, background: highlight` | Navigation active page, breadcrumb |
| `open` | `[open]` attr (details) or `[data-open="true"]` | `visibility, height, transform` | Accordion, disclosure, dropdown state |
| `busy` / `loading` | `[aria-busy="true"]` or `[data-loading="true"]` | `opacity: 0.5, pointer-events: none, spinner overlay` | Async operation in progress |
| `expanded` | `[aria-expanded="true"]` | visual indicator toggle | Collapsible sections, tree toggles |
| `completed` | `[data-completed="true"]` | `background: success color, checkmark icon` | Task, step, workflow completion |
| `drag-over` | `[data-drag-over="true"]` | `border: dashed, background: highlight` | Dropzone hover state |

### ARIA attributes required by component

| Component | Required ARIA |
|-----------|---------------|
| Button | None (native) |
| Link | None (native) |
| Checkbox | `aria-checked` (if custom) |
| Radio | `aria-checked` (if custom) |
| Switch | `aria-checked` |
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby` |
| Dropdown menu | `role="listbox"` or `role="menu"`, `aria-expanded` |
| Tab | `role="tab"`, `aria-selected`, `aria-controls` |
| Accordion | `role="region"`, `aria-labelledby`, aria-expanded` |
| Pagination link | `aria-current="page"` for active |
| Breadcrumb current | `aria-current="page"` |
| Form field | `aria-invalid`, `aria-describedby` for error |

### HTML structure examples

```html
<!-- Disabled button (native) -->
<button class="btn" disabled>Save</button>

<!-- Invalid input (ARIA) -->
<input class="input" aria-invalid="true" aria-describedby="email-error" />
<span id="email-error" class="error-text">Invalid email format</span>

<!-- Selected list item (data attribute) -->
<li class="list-item" data-selected="true">Option A</li>

<!-- Current page in breadcrumb (ARIA) -->
<a href="/page" class="breadcrumb-link" aria-current="page">Current Page</a>

<!-- Loading state (ARIA) -->
<table class="table" aria-busy="true">...</table>

<!-- Dropdown expanded state (ARIA) -->
<button class="dropdown-trigger" aria-expanded="true">Menu</button>
<ul class="dropdown-menu" role="menu">...</ul>

<!-- Accordion expanded section (ARIA) -->
<section role="region" aria-labelledby="acc-1" aria-expanded="true">...</section>
```

### No CSS classes for state

✅ Correct — use attributes:
```html
<input aria-invalid="true" />
```

❌ Wrong — do NOT add `.is-invalid`, `.has-error`, `.state-invalid`:
```html
<input class="input is-invalid" />  <!-- WRONG -->
```

Attributes scale to all themes and density modes automatically. Classes require manual maintenance.

## M14.6 Contrast & Visual Regression Guide

### Contrast requirements by component

Fikir CSS enforces **WCAG AAA (7:1) contrast** in all theme modes for critical interactive surfaces:

| Component type | Light theme | Dark theme | High-contrast |
|---|---|---|---|
| Button (all tones/styles) | 7:1+ fg/bg | 7:1+ fg/bg | Forced-colors (system-managed) |
| Link | 3:1+ text/bg, 4:5:1 underline indicator | 3:1+ text/bg | System colors |
| Form input | 3:1+ border/bg, 4:5:1 focus ring | 3:1+ border/bg | System colors |
| Badge | 4.5:1+ text/bg for small text | 4.5:1+ text/bg | Forced-colors |
| Alert / warning | 4.5:1+ icon/bg, 3:1+ border/bg | 4.5:1+ icon/bg | Forced-colors |

### Tone combinations to test for contrast

The contract requires testing all supported tone + style + density combinations:

**Semantic tones:** neutral, primary, success, warning, danger, info  
**Style variants:** solid, soft, outline, ghost, plain  
**Density modes:** compact, default, comfortable  
**Themes:** light, dark, high-contrast

**Critical surfaces for tone/style matrix:**
- Button family
- Badge family
- Alert family
- Result family
- Toast family

### Contrast regression reporting

A contract test validates that:
- **Button**: each (tone × style) combination meets 7:1 contrast light/dark
- **Badge**: each (tone × style) combination meets WCAG AA minimum
- **Alert/result**: tone colors stay distinguishable under high-contrast mode
- **Subtle tones**: `--color-*-subtle` backgrounds never reduce text contrast below 4.5:1 when paired with `--color-fg-default`

### Visual baseline strategy

Screenshot baselines are captured for:
- **Light mode:** default density, default shape
- **Dark mode:** default density, default shape
- **High-contrast mode:** compact and comfortable densities to verify button/input sizing
- **Compact density:** light + dark themes (verify spacing reduction doesn't break touch targets)
- **Comfortable density:** light + dark themes (verify spacing increase doesn't cause wrapping)

### Semantic tone visual matrix

All six semantic tones should be visible in playground with live theme toggles:

```html
<!-- Example: badge tone matrix -->
<h3>Badge Tone Matrix</h3>
<div style="display: grid; gap: 1rem;">
  <!-- neutral -->
  <div><span class="badge badge-neutral badge-solid">Neutral</span></div>
  
  <!-- primary -->
  <div><span class="badge badge-primary badge-solid">Primary</span></div>
  
  <!-- success -->
  <div><span class="badge badge-success badge-solid">Success</span></div>
  
  <!-- warning -->
  <div><span class="badge badge-warning badge-solid">Warning</span></div>
  
  <!-- danger -->
  <div><span class="badge badge-danger badge-solid">Danger</span></div>
  
  <!-- info -->
  <div><span class="badge badge-info badge-solid">Info</span></div>
</div>
```

---

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

## Size Contract

Fikir CSS v1.0 uses a frozen four-tier size scale across interactive components.

### Size scale

| Size class | Font size | Touch target | Min padding | Use for | Affected components |
|-----------|-----------|-------------|-------------|---------|-------------------|
| `xs` | `--font-size-xs` (0.75rem) | 32px | tight | Dense controls, tags, compact lists | badge, segmented-control |
| `sm` | `--font-size-sm` (0.875rem) | 36px | compact | Secondary buttons, small inputs | button, icon-button, badge, input, select, pagination |
| `md` | `--font-size-md` (1rem) | 40px | default | Primary buttons, standard form fields | button, icon-button, badge, input, select, segmented-control, pagination |
| `lg` | `--font-size-lg` (1.125rem) | 44px | spacious | Large CTAs, spacious inputs | button, icon-button, badge, segmented-control |

### Touch target minimums under density modes

Size varyantları density modes ile automatic scaling olur. Touch target minimumları adjusted:

| Density | Icon button | Button | Input / Select | Badge | Pagination item |
|---------|----------|--------|----------|-------|----------|
| `compact` | xs: 28px | xs: 28px, sm: 32px | sm: 34px | xs: 20px | sm: 32px |
| `default` | xs: 32px | xs: 32px, sm: 36px | sm: 36px | xs: 24px | sm: 36px |
| `comfortable` | xs: 36px | xs: 36px, sm: 40px | sm: 40px | xs: 28px | sm: 40px |

> Padding scaled proportionally; `min-block-size` uses `--space-*` tokens that respond to density.

### Size consistency rules

1. **Buttons:** size applies to height and internal padding; text inherits `--font-size-{size}`.
2. **Icon buttons:** size is square dimension (`inline-size` = `block-size`).
3. **Inputs / Selects:** size applies to `min-block-size`; padding and font inherit the size tier.
4. **Badge:** size affects padding and font scale; respects text overflow via `white-space: nowrap`.
5. **Pagination items:** minimum width tied to size tier; centering via flexbox.
6. **Segmented control:** container padding and item font scale tied to size tier.

### Responsive sizing via density

To maintain touch target minimums across all densities, size classes use `--space-*` tokens and `--font-size-{size}` values. When density mode changes, padding and font scale adjust automatically:

```css
/* Example: button.md in default density */
.btn-md {
  padding: 0.75rem 1.25rem;        /* scales with --space-3, --space-4 */
  font-size: var(--font-size-md);  /* scales with density */
}

/* Under compact density ([data-density="compact"]):
   padding: ~0.5rem 0.75rem (smaller spacing)
   font-size: 0.875rem (smaller font)
*/

/* Under comfortable density ([data-density="comfortable"]):
   padding: ~1rem 1.5rem (larger spacing)
   font-size: 1.0625rem (larger font)
*/
```

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
