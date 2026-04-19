# Icon Button

> Support level: **Supported** | Surface key: `component.iconButton` | Canonical: `.comp-icon-button`

## When to use

Icon-only buttons for compact toolbars, headers, and action areas where space is limited but the action is clear from context.

- ✓ Toolbar actions (edit, delete, share, search)
- ✓ Form field clear/visibility toggles
- ✓ Header/navigation actions
- ✓ Hover-revealed secondary actions in lists
- ✗ Primary calls-to-action (use button with text)
- ✗ Actions that users don't recognize instantly (always pair with tooltip)
- ✗ Replacing text in dense prose (use link instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-icon-button` | Base container — required | n/a |
| `comp-icon-button-xs` | Extra-small size (1.75rem) | Composable with sizes |
| `comp-icon-button-sm` | Small size (2rem) | Composable with sizes |
| `comp-icon-button-md` | Medium size (2.25rem, default) | Composable with sizes |
| `comp-icon-button-lg` | Large size (2.75rem) | Composable with sizes |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<button class="comp-icon-button">` |
| Disabled | `disabled` attribute | `<button class="comp-icon-button" disabled>` |
| Hover | `:hover` pseudo (automatic) | Visual background change |
| Focus | `:focus-visible` (automatic) | Outline ring visible |
| Active/pressed | `:active` pseudo or `aria-pressed="true"` | Darkened background |

## Basic usage

```html
<!-- Icon-only button with SVG -->
<button type="button" class="comp-icon-button" aria-label="Edit item">
  <svg width="1em" height="1em" viewBox="0 0 24 24">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
  </svg>
</button>

<!-- Icon button in toolbar -->
<div style="display: flex; gap: 0.25rem;">
  <button type="button" class="comp-icon-button" aria-label="Edit">
    <svg><!-- pencil icon --></svg>
  </button>
  <button type="button" class="comp-icon-button" aria-label="Delete">
    <svg><!-- trash icon --></svg>
  </button>
  <button type="button" class="comp-icon-button" aria-label="Share">
    <svg><!-- share icon --></svg>
  </button>
</div>
```

## Sizes

```html
<!-- Extra-small: 1.75rem -->
<button type="button" class="comp-icon-button comp-icon-button-xs" aria-label="Close">
  <svg><!-- icon --></svg>
</button>

<!-- Small: 2rem -->
<button type="button" class="comp-icon-button comp-icon-button-sm" aria-label="Delete">
  <svg><!-- icon --></svg>
</button>

<!-- Medium: 2.25rem (default) -->
<button type="button" class="comp-icon-button comp-icon-button-md" aria-label="Edit">
  <svg><!-- icon --></svg>
</button>

<!-- Large: 2.75rem -->
<button type="button" class="comp-icon-button comp-icon-button-lg" aria-label="Settings">
  <svg><!-- icon --></svg>
</button>
```

## Disabled state

```html
<button type="button" class="comp-icon-button" aria-label="Delete" disabled>
  <svg><!-- icon --></svg>
</button>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses native `<button>` element
- [x] **Accessible label:** Icon-only buttons **must** have `aria-label` or `aria-labelledby` describing the action
- [x] **Keyboard:** Tab to button, Enter/Space to activate
- [x] **Focus visible:** `:focus-visible` outline visible in high-contrast and keyboard navigation
- [x] **Color not only signal:** Hover/active state uses background + icon color change, not color alone
- [x] **Screen reader:** Icon is not redundantly announced; label is clear and concise
- [x] **Touch targets:** 40px × 40px minimum in default density (32px in compact, 44px+ in comfortable)

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to button |
| Enter or Space | Activate button |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | Icon-only button | Concise action label, e.g., "Edit", "Delete", "Open menu" |
| `aria-labelledby` | Button labeled by another element | ID of labeling element |
| `aria-pressed` | Toggle icon-button (on/off state) | `"true"` or `"false"` |

**Best practice:** If icon meaning is unclear (e.g., esoteric symbols), always pair with a tooltip or text label.

## Density modes

Button height and font size scale with `[data-density]`:

| Density | Icon-button size |
|---------|------------------|
| `compact` | xs: 28px, sm: 32px, md: 36px, lg: 40px |
| `default` | xs: 32px, sm: 36px, md: 40px, lg: 44px |
| `comfortable` | xs: 36px, sm: 40px, md: 44px, lg: 48px |

No CSS changes needed — icon size scales with `font-size`, padding adapts via tokens.

## Shape and motion

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically
- **Motion:** Hover/active transitions respect `[data-motion="reduced"]` or `@media (prefers-reduced-motion: reduce)`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Default background | Subtle surface color |
| `--color-fg-default` | Icon and text color | Main foreground |
| `--color-accent` | Focus outline color | Brand color override |
| `--space-*` | Padding | Scales with density |
| `--font-size-*` | Icon size (via em units) | Scales with density |
| `--radius-md` | Border radius | Scales with shape |
| `--transition-duration-fast` | Hover transition | 120ms (0ms if reduced-motion) |

## AI / machine-readable notes

- **Selector pattern:** `comp-icon-button` + size modifier (xs, sm, md, lg)
- **State indicators:** Use `disabled` attribute and `aria-pressed` for toggle states, not CSS classes
- **Icon pattern:** SVG as direct child, size controlled by `font-size` and `1em` units
- **Label requirement:** Always include `aria-label` or `aria-labelledby`; icon alone is never sufficient
- **Responsive:** Sizes scale with density tokens; no breakpoint-based resizing needed
- **Copy-paste use:** Substitute your icon SVG and label text; class structure remains stable
