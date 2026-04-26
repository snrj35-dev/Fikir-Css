# Tree View

> Support level: **Supported** | Surface key: `component.treeView` | Canonical: `.tree-view`

## When to use

Hierarchical nested list where branches can be expanded and collapsed.

- ✓ File system / directory explorers
- ✓ Nested category/taxonomy navigation
- ✓ Org-chart or recursive data navigation
- ✓ Sidebar navigation with nested sub-items
- ✗ Flat non-hierarchical lists — use `list` component
- ✗ Multi-level menus triggered on hover — use `dropdown-menu`
- ✗ Data with tabular columns — use `tree-table` pattern

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `tree-view` | Root container | `role="tree"` + `aria-label` required |
| `tree-view-group` | `<ul>` list of items at same level | `role="group"` |
| `tree-view-item` | `<li>` for a single node | `role="treeitem"`, `data-tree-expanded` for branches |
| `tree-view-toggle` | `<button>` to expand/collapse a branch | `aria-expanded` required |
| `tree-view-label` | Leaf node label (no children, no toggle) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Expanded | `data-tree-expanded="true"` on `tree-view-item` | Child group visible |
| Collapsed | `data-tree-expanded="false"` on `tree-view-item` | Child group hidden |
| Focus | `:focus-visible` on `tree-view-toggle` or `tree-view-label` | Ring visible |

## Basic usage

```html
<div class="tree-view" role="tree" aria-label="File explorer">
  <ul class="tree-view-group" role="group">
    <!-- Branch node (has children) -->
    <li class="tree-view-item" data-tree-expanded="true" role="treeitem" aria-expanded="true">
      <button class="tree-view-toggle" aria-expanded="true" id="src-toggle">
        ▾ src
      </button>
      <ul class="tree-view-group" role="group" aria-labelledby="src-toggle">
        <!-- Leaf node (no children) -->
        <li class="tree-view-item" role="treeitem">
          <span class="tree-view-label">main.ts</span>
        </li>
        <!-- Nested branch -->
        <li class="tree-view-item" data-tree-expanded="false" role="treeitem" aria-expanded="false">
          <button class="tree-view-toggle" aria-expanded="false" id="components-toggle">
            ▸ components
          </button>
          <ul class="tree-view-group" role="group" aria-labelledby="components-toggle" hidden>
            <li class="tree-view-item" role="treeitem">
              <span class="tree-view-label">Button.vue</span>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
```

## JS toggle (minimal)

```js
document.querySelectorAll('.tree-view-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('[data-tree-expanded]')
    const expanded = item.dataset.treeExpanded === 'true'
    item.dataset.treeExpanded = String(!expanded)
    btn.setAttribute('aria-expanded', String(!expanded))
    const childGroup = item.querySelector('.tree-view-group')
    if (childGroup) childGroup.hidden = expanded
  })
})
```

## Accessibility checklist

- [x] **tree role:** root `tree-view` must have `role="tree"` and `aria-label`
- [x] **treeitem role:** every `tree-view-item` must have `role="treeitem"`
- [x] **aria-expanded:** branch items must have `aria-expanded` on the toggle button, mirroring `data-tree-expanded`
- [x] **group role:** child `tree-view-group` must have `role="group"` and `aria-labelledby` pointing to its toggle
- [x] **Toggle as button:** `tree-view-toggle` must be a `<button>` for keyboard access
- [x] **Leaf nodes:** `tree-view-label` does not need `aria-expanded` — it has no children
- [x] **Focus visible:** toggle buttons and labels have `:focus-visible` outline

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Move focus to the tree; then Tab moves out |
| Arrow Down | Move focus to next visible node |
| Arrow Up | Move focus to previous visible node |
| Arrow Right | Expand collapsed branch; or move to first child if already expanded |
| Arrow Left | Collapse expanded branch; or move to parent if already collapsed |
| Enter or Space | Activate/select focused node (app-specific) |
| Home | Move focus to first node |
| End | Move focus to last visible node |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="tree"` | Root container | On `tree-view` |
| `aria-label` | Root container | Descriptive name (e.g., `"File explorer"`) |
| `role="treeitem"` | Each node | On every `tree-view-item` |
| `aria-expanded` | Branch nodes | `"true"` or `"false"` on `tree-view-toggle` |
| `role="group"` | Child node list | On `tree-view-group` inside a branch |
| `aria-labelledby` | Child group | ID of the parent toggle button |

## Density modes

Tree node height and indentation scale with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Smaller row height, tighter indentation |
| `default` | Standard row height and indentation |
| `comfortable` | Larger row height, wider indentation |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape]` affects `tree-view-toggle` hover background border-radius
- **Motion:** Branch expand/collapse animation respects `prefers-reduced-motion`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-accent` | Selected node highlight | When selection is implemented |
| `--color-fg-muted` | Muted leaf node text | |
| `--space-2`, `--space-3` | Row padding | Scales with density |
| `--space-4` | Branch indentation per level | |
| `--radius-sm` | Toggle button hover background | |
| `--transition-duration-fast` | Expand/collapse animation | 0ms if reduced-motion |

## Anti-patterns

```html
<!-- ✗ Don't use div/span as toggle — not keyboard accessible -->
<div class="tree-view-toggle" onclick="toggle()">▸ src</div>

<!-- ✓ Use button element -->
<button class="tree-view-toggle" aria-expanded="false">▸ src</button>

<!-- ✗ Don't omit role="tree" on root -->
<div class="tree-view">...</div>

<!-- ✓ Include role and label -->
<div class="tree-view" role="tree" aria-label="File explorer">...</div>
```

## AI / machine-readable notes

- **Selector anatomy:** `tree-view[role=tree] > tree-view-group[role=group] > tree-view-item[role=treeitem] > (tree-view-toggle[button] | tree-view-label[span])`
- **State indicator:** `data-tree-expanded="true/false"` on branch `tree-view-item`; `aria-expanded` mirrored on `tree-view-toggle`
- **Leaf vs branch:** branch nodes have `tree-view-toggle` + child `tree-view-group`; leaf nodes have only `tree-view-label`
- **Collapse via hidden:** use `hidden` attribute on child `tree-view-group` (not CSS `display:none`)
- **Copy-paste use:** nest `tree-view-item` blocks recursively; update all `id`/`aria-labelledby` pairs

## Related

- **`accordion`** — flat list of collapsible items
- **`tree-table`** — hierarchical data with tabular columns
- **`sidebar-nav`** — vertical navigation pattern
