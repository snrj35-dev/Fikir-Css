# Surface

> Support level: **Supported** | Surface key: `component.surface` | Canonical: `.comp-surface`

## When to use

Neutral container element for grouping related content. Foundation for cards, panels, and content blocks. Use when you need a surface-level background without semantic meaning.

- ✓ Generic content containers
- ✓ Panel backgrounds
- ✓ Section separators
- ✓ Elevated content on page backgrounds
- ✗ Actionable card surfaces (use `card` with clickable states)
- ✗ Modal/overlay backgrounds (use `modal`, `drawer`, `popover`)
- ✗ Purely decorative spacing (use margin/padding utilities)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-surface` | Base container — creates elevation or separation | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<div class="comp-surface">Content</div>` |

> Surface itself is stateless. State is applied to child interactive elements within it.

## Basic usage

```html
<!-- Simple surface container -->
<div class="comp-surface">
  <h3>Section heading</h3>
  <p>Content goes here.</p>
</div>

<!-- Surface as panel in layout -->
<div class="comp-surface">
  <header>
    <h2>Panel title</h2>
  </header>
  <div>
    <!-- Panel content -->
  </div>
</div>

<!-- Multiple surfaces for grouped layout -->
<div style="display: grid; gap: 1rem;">
  <div class="comp-surface">Item 1</div>
  <div class="comp-surface">Item 2</div>
  <div class="comp-surface">Item 3</div>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** Use appropriate heading levels inside, not on the surface itself
- [x] **Content grouping:** Surfaces group related information logically
- [x] **No artificial barrier:** Surface is visual only, not a navigation boundary
- [x] **Keyboard:** No keyboard interaction on surface itself; child interactive elements are navigable
- [x] **Color contrast:** Surface background and child text meet WCAG AA
- [x] **Screen reader:** Surface itself is not announced; heading and content within are

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="region"` | If surface wraps a major content area | Optional; use if landmark is needed |
| `aria-labelledby` | If region, reference heading inside | ID of `<h2>` or `<h3>` |

## Density modes

Surface padding scales with `[data-density]`:

| Density | Internal padding |
|---------|-----------------|
| `compact` | Reduced spacing around content |
| `default` | Standard spacing around content |
| `comfortable` | Increased spacing around content |

No CSS changes needed — padding scales via tokens.

## Shape and theme

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically
- **Theme:** Adapts to `[data-theme="light" | "dark" | "high-contrast"]` automatically
- **Elevation:** Subtle shadow in light mode, no shadow in dark mode for clarity

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Background color | Slightly elevated from page background |
| `--color-border-subtle` | Optional border | Used if outline needed |
| `--space-*` | Internal padding | Scales with density |
| `--radius-*` | Border radius | Scales with shape |
| `--shadow-sm` | Subtle elevation | Light theme only |

## AI / machine-readable notes

- **Selector pattern:** `comp-surface` base, no modifiers
- **Content agnostic:** Surface is a neutral container; no assumptions about children
- **Elevation signal:** Visual surface change (via shadow or color shift) indicates grouping, not importance
- **Responsive:** Padding and border-radius scale with tokens; no breakpoints needed
- **Copy-paste use:** Wrap content in `<div class="comp-surface">...</div>` and adjust heading levels inside

## Composition examples

```html
<!-- Surface with card-like content -->
<div class="comp-surface">
  <img src="image.jpg" alt="Description" style="width: 100%; margin-bottom: 1rem;">
  <h3>Title</h3>
  <p>Description text.</p>
</div>

<!-- Surface as section in form -->
<form>
  <div class="comp-surface">
    <h3>Personal information</h3>
    <input type="text" placeholder="Name" class="comp-input">
  </div>
  <div class="comp-surface">
    <h3>Contact information</h3>
    <input type="email" placeholder="Email" class="comp-input">
  </div>
</form>
```
