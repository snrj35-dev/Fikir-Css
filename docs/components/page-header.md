# Page Header

> Support level: **Supported** | Surface key: `component.pageHeader` | Canonical: `.comp-page-header`

## When to use

Top section with title, breadcrumb, and actions. Sets page context.

- ✓ Page title + breadcrumb + actions
- ✓ Section headers with buttons
- ✓ Create/import/export actions
- ✓ Page-level filters
- ✗ Component within a card (use heading instead)
- ✗ Small subsections (use heading instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-page-header` | Header container | n/a |
| `comp-page-header-title` | Page title | n/a |
| `comp-page-header-subtitle` | Optional subtitle | n/a |
| `comp-page-header-breadcrumb` | Navigation trail | n/a |
| `comp-page-header-actions` | Button group | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Header with title and actions |

## Basic usage

```html
<!-- Basic page header -->
<header class="comp-page-header" style="padding: 2rem; background: var(--color-bg-surface); border-bottom: 1px solid var(--color-border-subtle);">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <div>
      <h1 class="comp-page-header-title" style="margin: 0 0 0.5rem 0; font-size: 2rem; font-weight: 700;">Products</h1>
      <p class="comp-page-header-subtitle" style="margin: 0; color: var(--color-fg-muted);">Manage your product catalog</p>
    </div>
    <div class="comp-page-header-actions" style="display: flex; gap: 1rem;">
      <button class="comp-button">+ Add Product</button>
      <button class="comp-button-secondary">Export</button>
    </div>
  </div>
</header>

<!-- With breadcrumb -->
<header class="comp-page-header" style="padding: 1.5rem 2rem; background: var(--color-bg-surface); border-bottom: 1px solid var(--color-border-subtle);">
  <nav class="comp-page-header-breadcrumb" style="margin-bottom: 1rem;">
    <ol style="display: flex; gap: 0.5rem; margin: 0; padding: 0; list-style: none; font-size: 0.875rem;">
      <li><a href="/" style="color: var(--color-accent); text-decoration: none;">Home</a></li>
      <li style="color: var(--color-fg-muted);">›</li>
      <li><a href="/products" style="color: var(--color-accent); text-decoration: none;">Products</a></li>
      <li style="color: var(--color-fg-muted);">›</li>
      <li aria-current="page">Edit Product</li>
    </ol>
  </nav>
  <div style="display: flex; justify-content: space-between; align-items: start;">
    <div>
      <h1 class="comp-page-header-title" style="margin: 0;">Edit Product</h1>
    </div>
    <div class="comp-page-header-actions">
      <button class="comp-button">Save</button>
      <button class="comp-button-text">Cancel</button>
    </div>
  </div>
</header>

<!-- With filters -->
<header class="comp-page-header" style="padding: 2rem;">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
    <h1 class="comp-page-header-title" style="margin: 0;">Users</h1>
    <button class="comp-button">+ Invite</button>
  </div>
  <div style="display: flex; gap: 1rem;">
    <input type="search" placeholder="Search users..." style="flex: 1; padding: 0.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.25rem;">
    <button class="comp-button-secondary">Filter</button>
  </div>
</header>
```

## With dense layout

```html
<header class="comp-page-header" style="padding: 1rem; background: var(--color-bg-surface); border-bottom: 1px solid var(--color-border-subtle);">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <h2 class="comp-page-header-title" style="margin: 0; font-size: 1.5rem;">Settings</h2>
    <div class="comp-page-header-actions" style="display: flex; gap: 0.5rem;">
      <button class="comp-button-text">Help</button>
      <button class="comp-button-text">Close</button>
    </div>
  </div>
</header>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<header>` and `<h1>` appropriately
- [x] **Heading hierarchy:** Main title is `<h1>`
- [x] **Breadcrumb:** Navigation trail with `aria-current="page"`
- [x] **Actions:** Clear button labels
- [x] **Contrast:** Good text contrast

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Navigate action buttons |
| `Enter` | Activate button |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Header background | Surface color |
| `--color-border-subtle` | Bottom border | Subtle divider |
| `--space-*` | Padding | Scales with density |

## Variants

- **With breadcrumb:** Navigation trail at top
- **With filters:** Search/filter controls
- **With subtitle:** Description under title
- **Dense:** Reduced padding for compact layouts
- **Action buttons:** Primary and secondary actions

## Layout options

- **Horizontal:** Title left, actions right (standard)
- **Vertical:** Title and actions stacked (mobile)
- **Centered:** Content centered

## AI / machine-readable notes

- **Selector pattern:** `comp-page-header` with `comp-page-header-title`, `comp-page-header-breadcrumb`, `comp-page-header-actions` children
- **Structure:** Breadcrumb (optional) → Title + Subtitle → Actions
- **Semantic:** Use `<header>`, `<h1>`, `<nav>` appropriately
- **Responsive:** Flex layout adapts to screen size
- **Copy-paste use:** Update title, breadcrumb, subtitle, and action buttons

## Related patterns

- **Breadcrumb:** Navigation trail
- **Stack:** Vertical layout
- **Cluster:** Horizontal button group
