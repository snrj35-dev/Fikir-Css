# Description List

> Support level: **Supported** | Surface key: `component.descriptionList` | Canonical: `.comp-description-list`

## When to use

Key-value pair display. Terms and definitions, specifications, metadata.

- ✓ Glossaries and definitions
- ✓ Product specifications
- ✓ Metadata display
- ✓ Feature lists
- ✗ Tabular data (use table)
- ✗ Key-value editing (use form)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-description-list` | List wrapper | n/a |
| `comp-description-term` | Term (key) | n/a |
| `comp-description-details` | Details (value) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Term and details shown |

## Basic usage

```html
<dl class="comp-description-list" style="display: grid; grid-template-columns: auto 1fr; gap: 1.5rem 1rem; padding: 1rem; background: var(--color-bg-surface); border-radius: 0.5rem;">
  <dt class="comp-description-term" style="font-weight: 500; color: var(--color-fg-muted);">License</dt>
  <dd class="comp-description-details" style="margin: 0;">MIT</dd>

  <dt class="comp-description-term" style="font-weight: 500; color: var(--color-fg-muted);">Version</dt>
  <dd class="comp-description-details" style="margin: 0;">1.0.0</dd>

  <dt class="comp-description-term" style="font-weight: 500; color: var(--color-fg-muted);">Repository</dt>
  <dd class="comp-description-details" style="margin: 0;"><a href="#" style="color: var(--color-accent); text-decoration: none;">github.com/example/repo</a></dd>

  <dt class="comp-description-term" style="font-weight: 500; color: var(--color-fg-muted);">Author</dt>
  <dd class="comp-description-details" style="margin: 0;">Jane Doe</dd>
</dl>
```

## Stacked layout

```html
<dl class="comp-description-list" style="display: flex; flex-direction: column; gap: 1.5rem;">
  <div style="display: flex; flex-direction: column; gap: 0.25rem;">
    <dt class="comp-description-term" style="font-weight: 500;">Color</dt>
    <dd class="comp-description-details">Blue</dd>
  </div>
  <div style="display: flex; flex-direction: column; gap: 0.25rem;">
    <dt class="comp-description-term" style="font-weight: 500;">Size</dt>
    <dd class="comp-description-details">Medium</dd>
  </div>
</dl>
```

## With sections

```html
<div class="comp-description-list">
  <h3 style="margin-top: 0; margin-bottom: 1rem;">Specifications</h3>
  <dl style="display: grid; grid-template-columns: 150px 1fr; gap: 1rem;">
    <dt style="font-weight: 500;">Dimensions</dt>
    <dd style="margin: 0;">100 × 50 × 25 mm</dd>

    <dt style="font-weight: 500;">Weight</dt>
    <dd style="margin: 0;">250g</dd>

    <dt style="font-weight: 500;">Material</dt>
    <dd style="margin: 0;">Aluminum</dd>
  </dl>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<dl>`, `<dt>`, `<dd>` elements
- [x] **Structure:** Clear term-details pairing
- [x] **Readable:** Good contrast and font size

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-fg-muted` | Term color | Lighter text for labels |
| `--color-bg-surface` | Background | Container color |
| `--space-*` | Gap | Spacing between terms/details |

## Variants

- **Grid:** 2-column layout (term | details)
- **Stacked:** Vertical layout (term then details below)
- **Bordered:** Dividers between pairs

## AI / machine-readable notes

- **Selector pattern:** `comp-description-list` wrapper with `comp-description-term` and `comp-description-details` pairs
- **Structure:** Use semantic `<dl>`, `<dt>`, `<dd>` elements
- **Layout:** Grid or flex layout for visual alignment
- **Copy-paste use:** Update terms and details

## Related patterns

- **List:** Single-column items
- **Table:** Multi-column tabular data
- **Form:** Key-value input (for editing)
