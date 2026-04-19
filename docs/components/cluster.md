# Cluster

> Support level: **Supported** | Surface key: `component.cluster` | Canonical: `.comp-cluster`

## When to use

Flex container for horizontal layout with wrapping. Items wrap on smaller screens.

- ✓ Button groups (responsive)
- ✓ Filter chips
- ✓ Tag lists
- ✓ Icon button groups
- ✗ Vertical stacking (use stack instead)
- ✗ Complex grids (use grid instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-cluster` | Flex wrapper with wrap | n/a |
| `comp-cluster-spacing-sm` | Small gap (0.5rem) | n/a |
| `comp-cluster-spacing-md` | Medium gap (1rem) | n/a |
| `comp-cluster-spacing-lg` | Large gap (1.5rem) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Items flow horizontally, wrap on small screens |

## Basic usage

```html
<!-- Button group (responsive) -->
<div class="comp-cluster comp-cluster-spacing-md" style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
  <button class="comp-button">Save</button>
  <button class="comp-button">Cancel</button>
  <button class="comp-button-text">Delete</button>
</div>

<!-- Filter chips -->
<div class="comp-cluster comp-cluster-spacing-md" style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <span class="comp-tag" style="display: inline-flex; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem;">JavaScript</span>
  <span class="comp-tag" style="display: inline-flex; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem;">React</span>
  <span class="comp-tag" style="display: inline-flex; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem;">Node.js</span>
</div>

<!-- Icon button group -->
<div class="comp-cluster comp-cluster-spacing-sm" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
  <button class="comp-icon-button" aria-label="Bold">B</button>
  <button class="comp-icon-button" aria-label="Italic">I</button>
  <button class="comp-icon-button" aria-label="Underline">U</button>
</div>

<!-- Responsive tag list -->
<div class="comp-cluster comp-cluster-spacing-md" style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <span class="comp-tag">Design</span>
  <span class="comp-tag">Development</span>
  <span class="comp-tag">Testing</span>
  <span class="comp-tag">Deployment</span>
</div>
```

## With alignment

```html
<!-- Centered cluster -->
<div class="comp-cluster comp-cluster-spacing-md" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; align-items: center;">
  <button class="comp-button">Option 1</button>
  <button class="comp-button">Option 2</button>
  <button class="comp-button">Option 3</button>
</div>

<!-- Space between cluster -->
<div class="comp-cluster comp-cluster-spacing-md" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: space-between;">
  <div>Left group</div>
  <div>Right group</div>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<div>` or semantic tags
- [x] **Flex wrap:** Items wrap naturally on small screens
- [x] **Keyboard:** Tab navigates items

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-*` | Gap between items | Scales with density |

## Spacing presets

| Class | Gap | Use case |
|-------|-----|----------|
| `comp-cluster-spacing-sm` | 0.5rem | Icon buttons, compact chips |
| `comp-cluster-spacing-md` | 1rem | Standard buttons, tags |
| `comp-cluster-spacing-lg` | 1.5rem | Large spaced elements |

## Variants

- **Horizontal:** Row layout with wrap (default)
- **Spacing:** sm, md, lg gaps
- **Alignment:** center, space-between, flex-start, flex-end

## AI / machine-readable notes

- **Selector pattern:** `comp-cluster` with spacing presets (sm/md/lg)
- **Direction:** Always horizontal with flex-wrap enabled
- **Gap:** Use `comp-cluster-spacing-*` presets
- **Responsive:** Items wrap naturally on smaller screens
- **Copy-paste use:** Update spacing and content

## Related patterns

- **Stack:** Vertical layout without wrap
- **Grid:** 2D grid layouts
- **Center:** Centered container
