# List

> Support level: **Supported** | Surface key: `component.list` | Canonical: `.comp-list`

## When to use

Single-column list of items. Simple rows with text, icon, or actions.

- ✓ Navigation menu items
- ✓ Item lists with actions
- ✓ Grouped list sections
- ✓ Search results
- ✗ Tabular data (use table)
- ✗ Nested hierarchical (use tree-view)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-list` | List container | n/a |
| `comp-list-item` | List item | n/a |
| `comp-list-text` | Item text | n/a |
| `comp-list-action` | Item action (button/link) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Normal item |
| Hover | Mouse over | Background highlight |
| Active | Current/selected | Highlight + indicator |
| Disabled | Unavailable | Grayed out |

## Basic usage

```html
<ul class="comp-list" style="list-style: none; padding: 0; margin: 0; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; overflow: hidden;">
  <li class="comp-list-item" style="padding: 0.75rem; border-bottom: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
    <span class="comp-list-text">Item one</span>
    <button class="comp-button-text" style="font-size: 0.875rem;">Action</button>
  </li>
  <li class="comp-list-item" style="padding: 0.75rem; border-bottom: 1px solid var(--color-border-subtle); display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
    <span class="comp-list-text">Item two</span>
    <button class="comp-button-text" style="font-size: 0.875rem;">Action</button>
  </li>
  <li class="comp-list-item" style="padding: 0.75rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
    <span class="comp-list-text">Item three</span>
    <button class="comp-button-text" style="font-size: 0.875rem;">Action</button>
  </li>
</ul>
```

## With icons

```html
<ul class="comp-list" style="list-style: none; padding: 0; margin: 0;">
  <li class="comp-list-item" style="padding: 0.75rem; display: flex; align-items: center; gap: 1rem; border-bottom: 1px solid var(--color-border-subtle);">
    <span style="font-size: 1.25rem;">📁</span>
    <span class="comp-list-text">Documents</span>
  </li>
  <li class="comp-list-item" style="padding: 0.75rem; display: flex; align-items: center; gap: 1rem; border-bottom: 1px solid var(--color-border-subtle);">
    <span style="font-size: 1.25rem;">📷</span>
    <span class="comp-list-text">Photos</span>
  </li>
  <li class="comp-list-item" style="padding: 0.75rem; display: flex; align-items: center; gap: 1rem;">
    <span style="font-size: 1.25rem;">🎵</span>
    <span class="comp-list-text">Music</span>
  </li>
</ul>
```

## With secondary text

```html
<ul class="comp-list" style="list-style: none; padding: 0; margin: 0;">
  <li class="comp-list-item" style="padding: 0.75rem; border-bottom: 1px solid var(--color-border-subtle);">
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
      <span class="comp-list-text" style="font-weight: 500;">John Doe</span>
      <span style="font-size: 0.75rem; color: var(--color-fg-muted);">2h ago</span>
    </div>
    <p style="margin: 0; font-size: 0.875rem; color: var(--color-fg-muted);">Message preview...</p>
  </li>
</ul>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<ul>` and `<li>` elements
- [x] **Keyboard:** Arrow keys navigate items; Enter activates
- [x] **Focus:** Visible focus indicator on items
- [x] **Active state:** `aria-current="true"` on active item
- [x] **Disabled:** `aria-disabled="true"` + visual indication

## Keyboard behavior

| Key | Action |
|-----|--------|
| `↑/↓` | Navigate items |
| `Enter` | Activate item |
| `Home/End` | First/last item |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `<ul>/<li>` | Semantic list | List structure |
| `aria-current="true"` | Active item | Current page/selection |
| `aria-disabled="true"` | Disabled item | Unavailable |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-subtle` | Item separator | Divider color |
| `--color-bg-subtle` | Hover state | Background highlight |
| `--space-*` | Item padding | Scales with density |

## Variants

- **Scrollable:** Max-height with scroll
- **No dividers:** Remove borders
- **Compact:** Reduced padding (sm size)
- **Grouped:** Section headers with `<li role="presentation">`

## AI / machine-readable notes

- **Selector pattern:** `comp-list` wrapper with `comp-list-item` children
- **Item structure:** Text + optional icon/action
- **Active:** Mark current item via `aria-current="true"`
- **Disabled:** Use `aria-disabled="true"` + grayed-out appearance
- **Copy-paste use:** Update item text and actions

## Related patterns

- **Table:** Tabular multi-column data
- **Tree-view:** Hierarchical nested lists
- **Description-list:** Key-value pairs
