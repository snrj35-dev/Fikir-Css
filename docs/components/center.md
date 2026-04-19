# Center

> Support level: **Supported** | Surface key: `component.center` | Canonical: `.comp-center`

## When to use

Flex container for centered content. Horizontal and vertical centering.

- ✓ Center single element
- ✓ Center icon/message overlay
- ✓ Loading screen center
- ✗ Complex layouts (use grid instead)
- ✗ Multiple items (use cluster instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-center` | Centered flex container | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Content centered |

## Basic usage

```html
<!-- Centered icon + text -->
<div class="comp-center" style="display: flex; justify-content: center; align-items: center; height: 300px;">
  <div style="text-align: center;">
    <div style="font-size: 3rem; margin-bottom: 1rem;">✨</div>
    <h2>Loading...</h2>
    <p style="color: var(--color-fg-muted);">Please wait while we fetch your data.</p>
  </div>
</div>

<!-- Centered form -->
<div class="comp-center" style="display: flex; justify-content: center; align-items: center; min-height: 100vh;">
  <div style="padding: 2rem; background: var(--color-bg-surface); border-radius: 0.5rem; width: 100%; max-width: 400px;">
    <h1 style="margin-top: 0;">Sign in</h1>
    <!-- form content -->
  </div>
</div>

<!-- Centered spinner overlay -->
<div class="comp-center" style="display: flex; justify-content: center; align-items: center; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000;">
  <div class="comp-spinner comp-spinner-md" style="color: white;"></div>
</div>

<!-- Centered empty state -->
<div class="comp-center" style="display: flex; justify-content: center; align-items: center; height: 400px;">
  <div class="comp-empty-state" style="text-align: center;">
    <!-- empty state content -->
  </div>
</div>
```

## Horizontal centering only

```html
<div style="display: flex; justify-content: center; padding: 2rem;">
  <h1>Centered Heading</h1>
</div>
```

## Vertical centering with height

```html
<div class="comp-center" style="display: flex; justify-content: center; align-items: center; height: 200px;">
  <p>Vertically and horizontally centered</p>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<div>` or semantic tags
- [x] **Readable:** Centered content still readable
- [x] **Focus:** Focus order is logical
- [x] **Mobile:** Responsive centering on small screens

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-*` | Padding | Scales with density |

## Variants

- **Horizontal only:** Use `justify-content: center`
- **Vertical only:** Use `align-items: center`
- **Both:** Use both justify-content and align-items
- **With height:** Set `height` or `min-height` for centering space

## AI / machine-readable notes

- **Selector pattern:** `comp-center` flex container with centered children
- **Flex properties:** `display: flex; justify-content: center; align-items: center;`
- **Height:** Set `height` or `min-height` for vertical centering to work
- **Content:** Single or grouped items can be centered
- **Copy-paste use:** Update height and child content

## Related patterns

- **Stack:** Vertical layout
- **Cluster:** Horizontal layout
- **Container:** Width constraint
