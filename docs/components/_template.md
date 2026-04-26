# [Component Name]

> Support level: **[Supported | Beta | Experimental]** | Surface key: `component.[key]` | Canonical: `.[base]`

## When to use

Brief description of when this component solves a user problem.

- ✓ Use when...
- ✓ Use when...
- ✗ Don't use when...
- ✗ Don't use when...

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `[base]` | Base container — required | n/a |
| `[base]-[modifier]` | Modifier (tone/style/size/state) | Composable |
| `[base]-sm` | Size: small | xs, sm, md, lg (if applicable) |
| `[base]-primary` | Tone: primary | neutral, primary, success, warning, danger, info (if applicable) |
| `[base]-solid` | Style: solid | solid, soft, outline, ghost, plain (if applicable) |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<element class="[base]">` |
| Disabled | `disabled` attribute | `disabled` on `<button>`, `<input>`, `<select>` |
| Invalid | `aria-invalid="true"` | Custom inputs use `[aria-invalid="true"]` |
| Selected | `aria-selected="true"` or `[data-selected="true"]` | List items, menu items, tabs |
| Checked | `:checked` pseudo (native) or `[aria-checked="true"]` | Checkbox, radio, switch |
| Current | `aria-current="page"` | Navigation active state |
| Open | `[data-open="true"]` | Accordion, dropdown, modal |
| Loading/Busy | `[data-loading="true"]` or `[aria-busy="true"]` | Async operations |
| Expanded | `aria-expanded="true"` | Disclosure, collapsible sections |

## Basic usage

```html
<!-- Minimal working example with canonical class -->
<[element] class="[base]">[content]</[element]>
```

## Tone / Style variants

```html
<!-- If component supports semantic tones (neutral, primary, success, warning, danger, info) -->
<!-- and/or visual styles (solid, soft, outline, ghost, plain) -->

<element class="[base] [base]-primary [base]-solid">Primary Solid</element>
<element class="[base] [base]-danger [base]-soft">Danger Soft</element>
```

## Size variants

```html
<!-- If component has size classes (xs, sm, md, lg) -->
<element class="[base] [base]-sm">Small</element>
<element class="[base] [base]-md">Medium (default)</element>
<element class="[base] [base]-lg">Large</element>
```

## Disabled state

```html
<!-- Native: use disabled attribute -->
<button class="[base]" disabled>Disabled</button>

<!-- Custom: use aria-disabled -->
<div class="[base]" aria-disabled="true">Disabled</div>
```

## Accessibility checklist

- [ ] **Semantic HTML:** uses native `<button>`, `<input>`, `<a>`, `<select>` when possible
- [ ] **ARIA attributes:** includes required role, aria-*, and data-* attributes
- [ ] **Keyboard:** Tab order logical, interactive elements keyboard operable
- [ ] **Focus visible:** `:focus-visible` outline visible in high-contrast and keyboard navigation
- [ ] **Color not only signal:** state indicated by text, border, icon, weight — not color alone
- [ ] **Screen reader:** announces state changes, disabled status, selected/checked status
- [ ] **Touch targets:** at least 40px × 40px in default density (32px in compact, 44px+ in comfortable)

### Keyboard behavior

- **Tab:** navigate to component
- **Enter/Space:** activate/toggle
- **Escape:** dismiss overlay or cancel operation
- **Arrow keys:** navigate within composite (menu, tabs, list)

### ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="..."` | [if needed] | `[role]` |
| `aria-selected` | Item in list/menu | `"true"` or `"false"` |
| `aria-checked` | Custom checkbox/radio/switch | `"true"` or `"false"` |
| `aria-expanded` | Collapsible element | `"true"` or `"false"` |
| `aria-current` | Navigation active state | `"page"` |
| `aria-busy` | Async operation | `"true"` |
| `aria-invalid` | Form validation failure | `"true"` |
| `aria-label` or `aria-labelledby` | Missing text label | `[text or id]` |

## Density modes

Spacing and size automatically scale with `[data-density]`:

| Density | Effect | Example |
|---------|--------|---------|
| `compact` | Reduced padding, smaller font | Recommended for dashboards, data-heavy |
| `default` | Standard padding and font | Recommended for most apps |
| `comfortable` | Increased padding, larger font | Recommended for accessibility, touch |

No CSS changes needed — tokens handle it.

## Shape and motion

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically
- **Motion:** `[data-motion="reduced"]` or `@media (prefers-reduced-motion: reduce)` — transitions disabled

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-primary` | Primary tone background | Override via `--color-accent` |
| `--color-*-subtle` | Soft background | Light variant of tone |
| `--space-*` | Padding/margin | Scales with density |
| `--font-size-*` | Font size | Scales with density |
| `--radius-*` | Border radius | Scales with shape |
| `--transition-duration-fast` | Animation | Respects reduced-motion |

## AI / machine-readable notes

- **CSS selector surface:** canonical class is `[base]`, modifiers are additive
- **State indicators:** prefer ARIA/data-* attributes over CSS classes
- **Responsive behavior:** uses CSS variables for theme/density/shape — supports dark mode, high-contrast, reduced-motion out of box
- **Compound components:** if multi-part (e.g. owl-carousel), describe sub-selectors
- **Copy-paste use:** ensure ID and aria-controls attributes are unique

## Related

- **`component-a`** — brief description of relationship
- **`component-b`** — brief description of relationship
