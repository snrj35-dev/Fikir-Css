# Divider

> Support level: **Supported** | Surface key: `component.divider` | Canonical: `.comp-divider`

## When to use

Visual separator between sections or items. Horizontal or vertical line.

- ✓ Separate form sections
- ✓ Divide content regions
- ✓ Item list separators
- ✓ Visual break in layout
- ✗ No semantic grouping (use section-block instead)
- ✗ Decorative only (use CSS border)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-divider` | Horizontal line | n/a |
| `comp-divider-vertical` | Vertical line | Modifier |
| `comp-divider-muted` | Subtle color | Modifier |
| `comp-divider-strong` | Bold color | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Line shown |

## Basic usage

```html
<!-- Horizontal divider -->
<div class="comp-divider" style="height: 1px; background: var(--color-border-subtle); margin: 1.5rem 0;"></div>

<!-- Between sections -->
<section>
  <h2>Section 1</h2>
  <p>Content here</p>
</section>

<div class="comp-divider" style="height: 1px; background: var(--color-border-subtle); margin: 2rem 0;"></div>

<section>
  <h2>Section 2</h2>
  <p>Content here</p>
</section>

<!-- Between list items (border-bottom instead) -->
<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="padding: 1rem; border-bottom: 1px solid var(--color-border-subtle);">Item 1</li>
  <li style="padding: 1rem; border-bottom: 1px solid var(--color-border-subtle);">Item 2</li>
  <li style="padding: 1rem;">Item 3</li>
</ul>

<!-- Vertical divider (inline) -->
<div style="display: flex; gap: 1rem; align-items: center;">
  <span>Left</span>
  <div class="comp-divider-vertical" style="width: 1px; height: 2rem; background: var(--color-border-subtle);"></div>
  <span>Right</span>
</div>
```

## With label (optional)

```html
<!-- Divider with center text -->
<div style="display: flex; align-items: center; gap: 1rem; margin: 2rem 0;">
  <div style="flex: 1; height: 1px; background: var(--color-border-subtle);"></div>
  <span style="color: var(--color-fg-muted); font-size: 0.875rem;">OR</span>
  <div style="flex: 1; height: 1px; background: var(--color-border-subtle);"></div>
</div>
```

## Muted variant

```html
<!-- Less prominent divider -->
<div class="comp-divider comp-divider-muted" style="height: 1px; background: var(--color-border-subtle); opacity: 0.5; margin: 1rem 0;"></div>
```

## Accessibility checklist

- [x] **Semantic:** Use `<hr>` or `<div role="separator">` for semantic dividers
- [x] **Visual only:** Divider is decorative; content separation is semantic
- [x] **Contrast:** Sufficient color contrast

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-subtle` | Divider color | Subtle line |

## Variants

- **Horizontal:** Default line (1px height)
- **Vertical:** Inline line for inline separation
- **Muted:** Lower opacity for subtle division
- **Strong:** Higher opacity for prominent division

## When NOT to use

- Avoid using as only visual structure. Pair with semantic HTML (`<hr>`, `<section>`, etc.)
- Don't use for layout spacing (use `padding`/`margin` instead)
- Don't use color alone (always ensure adequate contrast)

## AI / machine-readable notes

- **Selector pattern:** `comp-divider` with optional vertical or muted modifiers
- **Structure:** Use `<hr>` semantically or `<div role="separator">`
- **Styling:** 1px height for horizontal, 1px width for vertical
- **Color:** Use `--color-border-subtle` token
- **Copy-paste use:** Adjust margin and color as needed

## Related patterns

- **Section-block:** Grouped content with visual separation
- **Stack:** Vertical layout with consistent spacing
- **Cluster:** Horizontal layout with items
