# Stack

> Support level: **Supported** | Surface key: `component.stack` | Canonical: `.comp-stack`

## When to use

Flex container for vertical or horizontal layout. Space items uniformly.

- ✓ Vertical/horizontal spacing of elements
- ✓ Form fields stacked
- ✓ Button groups
- ✓ Navigation lists
- ✗ Complex grid layouts (use grid instead)
- ✗ Data tables (use table)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-stack` | Flex container | n/a |
| `comp-stack-vertical` | Vertical layout (default) | n/a |
| `comp-stack-horizontal` | Horizontal layout | n/a |
| `comp-stack-spacing-sm` | Small gap (0.5rem) | n/a |
| `comp-stack-spacing-md` | Medium gap (1rem) | n/a |
| `comp-stack-spacing-lg` | Large gap (1.5rem) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Items stacked with gap |

## Basic usage

```html
<!-- Vertical stack (default) -->
<div class="comp-stack comp-stack-vertical comp-stack-spacing-md" style="display: flex; flex-direction: column; gap: 1rem;">
  <button class="comp-button">Save</button>
  <button class="comp-button">Cancel</button>
  <button class="comp-button-text">Delete</button>
</div>

<!-- Horizontal stack -->
<div class="comp-stack comp-stack-horizontal comp-stack-spacing-md" style="display: flex; flex-direction: row; gap: 1rem;">
  <button class="comp-button">Save</button>
  <button class="comp-button">Cancel</button>
</div>

<!-- Form stack -->
<div class="comp-stack comp-stack-spacing-lg" style="display: flex; flex-direction: column; gap: 1.5rem;">
  <div class="comp-field">
    <label for="name">Name</label>
    <input id="name" type="text" placeholder="Enter name">
  </div>
  <div class="comp-field">
    <label for="email">Email</label>
    <input id="email" type="email" placeholder="Enter email">
  </div>
  <div class="comp-stack comp-stack-horizontal comp-stack-spacing-md">
    <button class="comp-button">Submit</button>
    <button class="comp-button-text">Reset</button>
  </div>
</div>

<!-- Navigation stack -->
<nav class="comp-stack comp-stack-vertical comp-stack-spacing-sm" style="display: flex; flex-direction: column; gap: 0.5rem;">
  <a href="/" class="comp-button-text">Home</a>
  <a href="/about" class="comp-button-text">About</a>
  <a href="/contact" class="comp-button-text">Contact</a>
</nav>
```

## With alignment

```html
<!-- Center aligned -->
<div class="comp-stack comp-stack-horizontal comp-stack-spacing-md" style="display: flex; flex-direction: row; gap: 1rem; justify-content: center; align-items: center;">
  <button class="comp-button">Left</button>
  <button class="comp-button">Right</button>
</div>

<!-- Space between -->
<div class="comp-stack comp-stack-horizontal comp-stack-spacing-md" style="display: flex; flex-direction: row; gap: 1rem; justify-content: space-between;">
  <button class="comp-button">Left</button>
  <button class="comp-button">Right</button>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<div>` or semantic tags (nav, section, etc.)
- [x] **Flex gap:** Uses CSS gap (not margin on children)
- [x] **Keyboard:** Tab navigates items naturally

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-*` | Gap between items | Scales with density |

## Spacing presets

| Class | Gap | Density |
|-------|-----|---------|
| `comp-stack-spacing-sm` | 0.5rem | Compact |
| `comp-stack-spacing-md` | 1rem | Default |
| `comp-stack-spacing-lg` | 1.5rem | Comfortable |

## Variants

- **Vertical:** Column layout (default)
- **Horizontal:** Row layout
- **Spacing:** sm, md, lg gaps
- **Alignment:** center, space-between, flex-end, etc.
- **Wrapped:** Items wrap on smaller screens

## AI / machine-readable notes

- **Selector pattern:** `comp-stack` with direction (vertical/horizontal) and spacing (sm/md/lg) classes
- **Direction:** Use `comp-stack-vertical` or `comp-stack-horizontal`
- **Gap:** Use `comp-stack-spacing-*` presets
- **Flex properties:** Inherits parent flex direction/alignment
- **Copy-paste use:** Update direction and spacing presets

## Related patterns

- **Cluster:** Horizontal layout with wrap
- **Grid:** 2D grid layouts
- **Center:** Center content
