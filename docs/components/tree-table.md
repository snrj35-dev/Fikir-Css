# Tree Table

> Support level: **Beta** | Pattern key: `data-pattern="tree-table"` | Canonical: `[data-pattern="tree-table"]`

## When to use

Nested hierarchical data (org chart, file explorer, project breakdown) sayıldığında, her satırda birden fazla bilgi sütunu (column) göstermek istiyorsanız kullanın.

- ✓ Organization chart (department → team → person + title + status)
- ✓ File explorer (folders → files + size + modified date)
- ✓ Project breakdown (epic → story → task + owner + deadline)
- ✓ Account hierarchy (account → sub-account + balance + currency)
- ✗ Sadece tree yapısı gerekiyorsa → `tree-view`
- ✗ Flat tabular data (no hierarchy) → `table`
- ✗ Real-time massive datasets → `data-grid` (virtualized)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `[data-pattern="tree-table"]` | Pattern wrapper — required | n/a |
| `tree-view-toggle` | Expand/collapse button (reused) | `aria-expanded` |
| `tree-table-cell-toggle` | First column container (toggle + label) | n/a |
| `tree-table-cell-toggle-placeholder` | Visual indent for leaf nodes | n/a |
| `table`, `table-row`, `table-cell` | Reused table components | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Collapsed | Parent has children, toggle clicked | `aria-expanded="false"` on toggle, child rows `display: none` |
| Expanded | Parent has children, toggled open | `aria-expanded="true"` on toggle, child rows visible |
| Leaf | No children | No toggle button, placeholder only |
| Hover | Mouse over row | `background-color: var(--color-bg-subtle)` |
| Focus | Keyboard navigation | `:focus-visible` on toggle or row |
| Selected | Checkbox or click | `aria-selected="true"` (optional) |

## Basic usage

```html
<table class="table" data-pattern="tree-table">
  <thead>
    <tr role="row">
      <th style="width: 2rem;"></th>
      <th>Name</th>
      <th>Type</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <!-- Level 0: Root branch -->
    <tr role="treeitem" aria-expanded="false" data-tree-level="0">
      <td class="tree-table-cell-toggle">
        <button class="tree-view-toggle" aria-expanded="false">▾</button>
      </td>
      <td class="tree-table-cell">Engineering</td>
      <td class="tree-table-cell">Department</td>
      <td class="tree-table-cell">Active</td>
    </tr>

    <!-- Level 1: Team (child of Engineering) -->
    <tr role="treeitem" aria-expanded="false" data-tree-level="1" data-hidden="true">
      <td class="tree-table-cell-toggle">
        <button class="tree-view-toggle" aria-expanded="false">▾</button>
      </td>
      <td class="tree-table-cell">Frontend</td>
      <td class="tree-table-cell">Team</td>
      <td class="tree-table-cell">Active</td>
    </tr>

    <!-- Level 2: Person (child of Frontend) -->
    <tr role="treeitem" data-tree-level="2" data-hidden="true">
      <td class="tree-table-cell-toggle">
        <span class="tree-table-cell-toggle-placeholder"></span>
      </td>
      <td class="tree-table-cell">Alice Chen</td>
      <td class="tree-table-cell">Senior Dev</td>
      <td class="tree-table-cell">Active</td>
    </tr>

    <tr role="treeitem" data-tree-level="2" data-hidden="true">
      <td class="tree-table-cell-toggle">
        <span class="tree-table-cell-toggle-placeholder"></span>
      </td>
      <td class="tree-table-cell">Bob Smith</td>
      <td class="tree-table-cell">Junior Dev</td>
      <td class="tree-table-cell">Active</td>
    </tr>

    <!-- Level 1: Another team -->
    <tr role="treeitem" aria-expanded="false" data-tree-level="1" data-hidden="true">
      <td class="tree-table-cell-toggle">
        <button class="tree-view-toggle" aria-expanded="false">▾</button>
      </td>
      <td class="tree-table-cell">Backend</td>
      <td class="tree-table-cell">Team</td>
      <td class="tree-table-cell">Active</td>
    </tr>

    <tr role="treeitem" data-tree-level="2" data-hidden="true">
      <td class="tree-table-cell-toggle">
        <span class="tree-table-cell-toggle-placeholder"></span>
      </td>
      <td class="tree-table-cell">Charlie Davis</td>
      <td class="tree-table-cell">Senior Dev</td>
      <td class="tree-table-cell">Active</td>
    </tr>

    <!-- Level 0: Another department -->
    <tr role="treeitem" aria-expanded="false" data-tree-level="0">
      <td class="tree-table-cell-toggle">
        <button class="tree-view-toggle" aria-expanded="false">▾</button>
      </td>
      <td class="tree-table-cell">Sales</td>
      <td class="tree-table-cell">Department</td>
      <td class="tree-table-cell">Active</td>
    </tr>
  </tbody>
</table>
```

## JavaScript: Toggle Expand/Collapse

```js
// Wire up expand/collapse toggles
document.querySelectorAll('[data-pattern="tree-table"] .tree-view-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation()
    const row = btn.closest('[role="treeitem"]')
    const isExpanded = row.getAttribute('aria-expanded') === 'true'
    const currentLevel = parseInt(row.dataset.treeLevel)
    
    // Update parent row state
    row.setAttribute('aria-expanded', String(!isExpanded))
    btn.setAttribute('aria-expanded', String(!isExpanded))
    
    // Toggle visibility of direct children
    let next = row.nextElementSibling
    while (next) {
      const nextLevel = parseInt(next.dataset.treeLevel)
      if (nextLevel <= currentLevel) break // Stop at same or higher level
      
      if (nextLevel === currentLevel + 1) {
        // Direct child: always toggle
        next.dataset.hidden = isExpanded ? 'true' : 'false'
      } else if (isExpanded) {
        // Collapsing parent: hide all descendants
        next.dataset.hidden = 'true'
      }
      // When expanding, descendants stay hidden until their parent is expanded
      
      next = next.nextElementSibling
    }
  })
})
```

## Accessibility checklist

- [x] **Semantic HTML:** Native `<table>`, `<tr>`, `<td>`, `<button>` elements
- [x] **ARIA attributes:** `role="treeitem"`, `aria-expanded`, `data-tree-level` for hierarchy
- [x] **Keyboard:** Tab navigates, toggle button Enter/Space, arrow keys ↑↓ for rows
- [x] **Focus visible:** `:focus-visible` on toggle button, clear outline
- [x] **Color not only signal:** Indent levels (spacing), toggle icons (▾/►), hierarchy clear
- [x] **Screen reader:** Announces "collapsed", "expanded", tree depth, cell values in order
- [x] **Touch targets:** Toggle button at least 40px × 40px in default density

### Keyboard behavior

- **Tab**: navigate to next toggle or table cell
- **Shift+Tab**: navigate to previous toggle or table cell
- **Enter/Space** on toggle button: expand/collapse
- **↑/↓**: move to previous/next row (optional, requires JavaScript)
- **→**: expand collapsed row (optional)
- **←**: collapse expanded row (optional)

### ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="treeitem"` | Each data row | On `<tr>` |
| `role="row"` | Header row | On `<tr>` in `<thead>` |
| `aria-expanded` | Branch rows (with children) | `"true"` or `"false"` |
| `data-tree-level` | Every row | `0`, `1`, `2`, etc (depth) |
| `data-hidden` | Collapsed child rows | `"true"` (display: none) |

## Indent & Spacing

Indent size customizable via CSS variable:

```css
/* Default (1rem per level) */
[data-pattern="tree-table"] {
  --tree-table-indent-size: var(--space-4);
}

/* Compact (0.75rem per level) */
[data-density="compact"] [data-pattern="tree-table"] {
  --tree-table-indent-size: var(--space-3);
}
```

Indent applied to first cell's `padding-inline-start` based on `data-tree-level`.

## Density modes

Spacing and font size scale with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Smaller padding, smaller font, reduced indent |
| `default` | Standard spacing |
| `comfortable` | Larger padding, larger font |

## Shape and motion

- **Shape:** Toggle button inherits `[data-shape]` via `:focus-visible` outline radius
- **Motion:** Expand/collapse transitions respect `@media (prefers-reduced-motion: reduce)`

## Row Selection (Optional)

If rows are selectable (checkboxes):

```html
<tr role="treeitem" data-tree-level="1" aria-selected="false">
  <td class="tree-table-cell-toggle">
    <input type="checkbox" aria-label="Select row" />
  </td>
  <td class="tree-table-cell">Frontend</td>
  ...
</tr>
```

Update `aria-selected="true"` when checked. Row background highlights via `.tree-table-row[aria-selected="true"]`.

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--tree-table-indent-size` | Indent per level | Default: `var(--space-4)` |
| `--space-1` through `--space-4` | Cell padding | Scales with density |
| `--color-bg-subtle` | Row hover background | Light contrast |
| `--color-border-subtle` | Row borders | Subtle separator |
| `--color-focus` | Focus outline | Keyboard visibility |
| `--font-size-*` | Cell text | Scales with density |
| `--radius-sm` | Toggle focus outline | Shape-aware |

## AI / machine-readable notes

- **Pattern surface:** `[data-pattern="tree-table"]` is the canonical marker
- **Composition rule:** owns layout/indent; reuses `tree-view-toggle`, `table`, `table-row`, `table-cell` components
- **Hierarchy rule:** `data-tree-level="N"` defines indent depth; child visibility toggled by parent's `aria-expanded`
- **State rule:** `aria-expanded` on branches, `data-hidden` controls visibility (CSS display: none)
- **Keyboard rule:** JS needed for ↑↓ arrow nav, auto-expand/collapse via Enter/Space on toggle
- **Accessibility rule:** Screen readers announce hierarchy via ARIA; visual indent + toggle icons provide fallback

## Related surfaces

- **Tree View:** [tree-view.md](./tree-view.md) — nested structure only, no columns
- **Table:** [table.md](./table.md) — flat tabular data
- **Data Grid:** [data-grid.md](./data-grid.md) — advanced table (virtualization, real-time)
- **Pagination:** [pagination.md](./pagination.md) — when tree-table spans multiple pages
