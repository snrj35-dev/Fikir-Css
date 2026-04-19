# Button

> Support level: **Supported** | Surface key: `component.btn` | Canonical: `.btn`

## When to use

The primary interactive trigger for user-initiated actions.

- ✓ Submitting forms, confirming dialogs, triggering operations
- ✓ Primary, secondary and tertiary call-to-action hierarchy
- ✓ Destructive actions (use `btn-danger`)
- ✗ Navigation between pages — use `<a class="btn ...">` with `href` instead
- ✗ Inline text actions in prose — use `link` component
- ✗ Icon-only actions — use `icon-button` component

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `btn` | Base — required on every button | n/a |
| `btn-solid` | High-emphasis filled style | Composable with tones |
| `btn-soft` | Low-emphasis tinted style | Composable with tones |
| `btn-outline` | Outlined style — combine with a tone modifier | Composable with tones |
| `btn-ghost` | Chrome-light style with hover fill | Composable with tones |
| `btn-plain` | Text-first style, link-like emphasis | Composable with tones |
| `btn-primary` | Primary/accent tone | solid, soft, outline, ghost, plain |
| `btn-neutral` | Neutral/secondary tone | solid, soft, outline, ghost, plain |
| `btn-danger` | Destructive action tone | solid, soft, outline, ghost, plain |
| `btn-sm` | Small size | xs, sm, md, lg |
| `btn-md` | Medium size (default) | xs, sm, md, lg |
| `btn-lg` | Large size | xs, sm, md, lg |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<button class="btn btn-solid btn-primary">` |
| Disabled | `disabled` attribute | `<button class="btn ..." disabled>` |
| Loading | `data-loading="true"` + `aria-busy="true"` | Shows spinner, prevents double-submit |
| Active/pressed | `:active` pseudo (automatic) | Visual press feedback |
| Focus | `:focus-visible` (automatic) | Outline ring visible |

## Basic usage

```html
<button type="button" class="btn btn-solid btn-primary">Save</button>
<button type="button" class="btn btn-soft btn-primary">Save Draft</button>
<button type="button" class="btn btn-outline btn-neutral">Cancel</button>
<button type="button" class="btn btn-ghost btn-neutral">More options</button>
<button type="button" class="btn btn-plain btn-danger">Delete</button>
```

## Tone / Style variants

```html
<!-- Solid — high-emphasis filled -->
<button type="button" class="btn btn-solid btn-primary">Primary</button>
<button type="button" class="btn btn-solid btn-danger">Delete</button>
<button type="button" class="btn btn-solid btn-neutral">Confirm</button>

<!-- Soft — tinted background -->
<button type="button" class="btn btn-soft btn-primary">Save Draft</button>
<button type="button" class="btn btn-soft btn-neutral">Review</button>

<!-- Outline — border only -->
<button type="button" class="btn btn-outline btn-neutral">Cancel</button>

<!-- Ghost — minimal chrome -->
<button type="button" class="btn btn-ghost btn-neutral">More options</button>

<!-- Plain — text-only -->
<button type="button" class="btn btn-plain btn-danger">Remove</button>
```

## Size variants

```html
<button type="button" class="btn btn-solid btn-primary btn-sm">Small</button>
<button type="button" class="btn btn-solid btn-primary btn-md">Medium</button>
<button type="button" class="btn btn-solid btn-primary btn-lg">Large</button>
```

## Disabled state

```html
<!-- Native disabled (preferred) -->
<button type="button" class="btn btn-solid btn-primary" disabled>Saving...</button>

<!-- Custom disabled (non-button elements) -->
<a href="#" class="btn btn-solid btn-primary" aria-disabled="true" tabindex="-1">Disabled link</a>
```

## Loading state

```html
<button type="button" class="btn btn-solid btn-primary"
        data-loading="true" aria-busy="true" disabled>
  Saving...
</button>
```

## As navigation link

```html
<a href="/dashboard" class="btn btn-solid btn-primary btn-sm">Go to dashboard</a>
```

## Accessibility checklist

- [x] **Semantic HTML:** uses native `<button type="button">` for actions
- [x] **Keyboard:** Tab to button, Enter/Space to activate
- [x] **Focus visible:** `:focus-visible` outline visible in high-contrast and keyboard navigation
- [x] **Disabled state:** `disabled` attribute used (not `aria-disabled`) for native buttons
- [x] **Color not only signal:** text label always present; icon-only use must use `icon-button` instead
- [x] **Loading:** `aria-busy="true"` announces busy state to screen readers
- [x] **Touch targets:** at least 40px height in default density (32px compact, 44px+ comfortable)

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to button |
| Enter or Space | Activate button |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-busy` | Loading state | `"true"` |
| `aria-disabled` | Non-button element appearing disabled | `"true"` |
| `aria-label` | Icon-adjacent button without visible text | Concise action label |
| `aria-pressed` | Toggle button (on/off) | `"true"` or `"false"` |

## Density modes

Button height and padding scale with `[data-density]`:

| Density | Height | Font size |
|---------|--------|-----------|
| `compact` | sm: 28px, md: 32px, lg: 36px | Reduced |
| `default` | sm: 32px, md: 36px, lg: 40px | Standard |
| `comfortable` | sm: 36px, md: 40px, lg: 48px | Larger |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically
- **Motion:** Hover/active transitions respect `[data-motion="reduced"]` or `@media (prefers-reduced-motion: reduce)`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-primary` | Primary solid tone background | Override via `--color-accent` |
| `--color-primary-subtle` | Primary soft tone background | Light variant |
| `--color-accent` | Focus ring color | Brand color |
| `--space-2`, `--space-4` | Vertical/horizontal padding | Scales with density |
| `--font-size-sm` | Button text size | Scales with density |
| `--radius-md` | Border radius | Scales with shape |
| `--transition-duration-fast` | Hover/active transition | 120ms (0ms if reduced-motion) |

## Anti-patterns

```html
<!-- ✗ Don't use div/span as buttons -->
<div class="btn btn-solid btn-primary" onclick="save()">Save</div>

<!-- ✓ Use button element -->
<button type="button" class="btn btn-solid btn-primary">Save</button>

<!-- ✗ Don't chain multiple tone classes -->
<button class="btn btn-primary btn-danger">Confusing</button>

<!-- ✓ One style + one tone -->
<button class="btn btn-solid btn-primary">Clear</button>
```

## AI / machine-readable notes

- **Selector pattern:** `btn` base + one style modifier (`btn-solid`, `btn-soft`, `btn-outline`, `btn-ghost`, `btn-plain`) + one tone modifier + optional size
- **State indicators:** use `disabled` attribute and `data-loading="true"` — not CSS classes
- **Navigation:** `<a class="btn ...">` renders as link visually but does not submit forms
- **Responsive behavior:** height/padding scale via density tokens; no breakpoint-based resizing needed
- **Copy-paste use:** substitute tone and label; class structure remains stable across versions
