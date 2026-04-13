# Tree View

> Support level: **Supported** | Surface key: `component.treeView`

## Classes

| Class | Role |
|-------|------|
| `tree-view` | Root container (`role="tree"`) |
| `tree-view-group` | `<ul>` list of items at same level |
| `tree-view-item` | `<li>` for a single node |
| `tree-view-toggle` | Button to expand/collapse a branch |
| `tree-view-label` | Leaf node label (no children) |

## States

| State | How |
|-------|-----|
| Expanded | `data-tree-expanded="true"` on `tree-view-item` |
| Collapsed | `data-tree-expanded="false"` on `tree-view-item` |

## Basic usage

```html
<div class="tree-view" role="tree" aria-label="File explorer">
  <ul class="tree-view-group" role="group">
    <li class="tree-view-item" data-tree-expanded="true" role="treeitem" aria-expanded="true">
      <button class="tree-view-toggle" aria-expanded="true" id="src-toggle">
        ▾ src
      </button>
      <ul class="tree-view-group" role="group" aria-labelledby="src-toggle">
        <li class="tree-view-item" role="treeitem">
          <span class="tree-view-label">main.ts</span>
        </li>
        <li class="tree-view-item" data-tree-expanded="false" role="treeitem" aria-expanded="false">
          <button class="tree-view-toggle" aria-expanded="false" id="components-toggle">
            ▾ components
          </button>
          <ul class="tree-view-group" role="group" aria-labelledby="components-toggle">
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
  })
})
```

## Accessibility

- Root `tree-view` requires `role="tree"` and `aria-label`
- Each `tree-view-item` uses `role="treeitem"`
- Branch items need `aria-expanded` mirroring `data-tree-expanded`
- Child `tree-view-group` uses `role="group"` and `aria-labelledby` pointing to its toggle button
- `tree-view-toggle` must be a `<button>` (keyboard accessible)
- Arrow keys (↑↓ for navigate, → to expand, ← to collapse) per ARIA pattern
