# Tree Table Pattern Spec (v1.0)

## Durum
- Status: Accepted (implemented pattern spec)
- Scope: v1.0 enterprise data pattern surface
- Non-goal: virtual scrolling, complex column resizing, cell editing

## Amaç
Bu belge, ağaç yapısını (expand/collapse nesting) tablo satır formatı (columns) ile birleştiren `Tree Table` pattern'ini tanımlar.

**Kullanım alanları:**
- Org chart (organization + title + status columns)
- File explorer (hierarchy + size + modified date columns)
- Project breakdown (tasks + owner + deadline columns)
- Financial data (accounts + balance + currency columns)

## Kapsam ve Sınırlar
Pattern aşağıdaki mevcut sınıflarla kurulmalıdır:
- Tree structure: `tree-view`, `tree-view-item`, `tree-view-toggle`, `tree-view-label`
- Table structure: `table`, `table-row`, `table-cell`
- Layout: `stack`, `cluster`

`tree-table` adında canonical CSS component class'ı yoktur.
Pattern wrapper için proje-yerel class veya `data-pattern="tree-table"` kullanılmalıdır.

## Pattern Yapısı

### 1. Visual Hierarchy: Indent Levels
```
[▾] Root Level 0 | Col A | Col B | Col C
  [▾] Child L1   | Data  | Data  | Data
    [►] Leaf L2  | Data  | Data  | Data
    [►] Leaf L2  | Data  | Data  | Data
  [►] Child L1   | Data  | Data  | Data
[►] Root Level 0 | Col A | Col B | Col C
```

**Indent contract:**
- Level 0: `margin-left: 0`
- Level 1: `margin-left: var(--space-4)` (1rem)
- Level 2: `margin-left: var(--space-8)` (2rem)
- Level N: `margin-left: calc(var(--space-4) * N)`

**Indent ayarı:** `--tree-table-indent-size: var(--space-4)` (customizable)

### 2. Expand/Collapse State
```html
<!-- Branch (has children) -->
<tr class="tree-table-row" data-tree-level="1" role="treeitem" aria-expanded="true">
  <td class="tree-table-cell-toggle">
    <button class="tree-view-toggle" aria-expanded="true">▾</button>
  </td>
  <td class="tree-table-cell">Engineering</td>
  <td class="tree-table-cell">Department</td>
  <td class="tree-table-cell">Active</td>
</tr>

<!-- Child rows appear/hidden based on parent aria-expanded -->
<tr class="tree-table-row" data-tree-level="2" role="treeitem">
  <td class="tree-table-cell-toggle">
    <button class="tree-view-toggle" aria-expanded="false">►</button>
  </td>
  <td class="tree-table-cell">Frontend</td>
  <td class="tree-table-cell">Team</td>
  <td class="tree-table-cell">Active</td>
</tr>

<!-- Leaf (no children) -->
<tr class="tree-table-row" data-tree-level="3" role="treeitem" aria-expanded="false">
  <td class="tree-table-cell-toggle">
    <!-- Empty or icon-only for visual balance -->
    <span class="tree-table-cell-toggle-placeholder"></span>
  </td>
  <td class="tree-table-cell">Alice Chen</td>
  <td class="tree-table-cell">Senior Dev</td>
  <td class="tree-table-cell">Active</td>
</tr>
```

### 3. Row States
```
default       → normal background, readable text
hover         → subtle background highlight (var(--color-bg-subtle))
focus-visible → outline on row or toggle button
selected      → stronger background, checkbox or aria-selected (if applicable)
expanded      → parent row background slightly different (optional)
collapsed     → hidden child rows (display: none or aria-hidden)
```

### 4. Accessibility Requirements
- Root table uses `role="table"`, row uses `role="row"` OR `role="treeitem"` (nested tree role)
- Each `tree-table-row` has `data-tree-level="N"` for nesting depth
- Parent rows have `aria-expanded="true|false"` + `aria-controls` pointing to child rows
- Toggle button is native `<button>`, keyboard operable
- Tab order: logical left-to-right, then down rows
- Arrow keys: ↑↓ navigate rows, → expand, ← collapse (JavaScript needed)
- Screen reader: announces "collapsed", "expanded", hierarchy level

### 5. Minimal Structure
```html
<table class="table" data-pattern="tree-table">
  <thead>
    <tr role="row">
      <th style="width: 2rem;"></th> <!-- Toggle column header (empty) -->
      <th>Name</th>
      <th>Type</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <!-- Rows with data-tree-level and aria-expanded -->
  </tbody>
</table>
```

## Override ve Kompozisyon Kuralları
- Indent size utilities ile customize edilebilir: `--tree-table-indent-size`
- Row hover davranışı table + pattern'den gelen base hover'ın üzerine yazılabilir
- Column alignment (left/center/right) table CSS'inden gelir, pattern tarafından değiştirilmez

## Contract İlişkisi
- Pattern, `tree-view-toggle`, `tree-view-label` sınıfları ve `table` sınıfları kullanır
- Bunlar `dist/contracts/selectors.json`'da olmalı
- Pattern özel class eklemez, var olan component'leri composite kullanır

## JavaScript Expectations
Pattern, semantic HTML + ARIA state'lerini belirtir ama davranış (toggle expand/collapse) uygulamaya bırakılır.

Minimal wire-up:
```js
document.querySelectorAll('[data-pattern="tree-table"] .tree-view-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const row = btn.closest('[role="treeitem"]')
    const expanded = row.getAttribute('aria-expanded') === 'true'
    row.setAttribute('aria-expanded', String(!expanded))
    btn.setAttribute('aria-expanded', String(!expanded))
    
    // Toggle visibility of child rows
    const level = parseInt(row.dataset.treeLevel)
    let next = row.nextElementSibling
    while (next && parseInt(next.dataset.treeLevel) > level) {
      next.style.display = expanded ? 'none' : 'table-row'
      next = next.nextElementSibling
    }
  })
})
```

## Open Questions
1. Virtualization (scrolling büyük dataset'ler) v1.0'da scope içinde mi? → Hayır, post-1.0
2. Inline row editing (cell click → input) → Pattern bu kapsamda değil, uygulama sorumluluğu
3. Column resizing handles → post-1.0 refinement

## Related Surfaces
- `tree-view` — nesting ve expand/collapse
- `table` — row/column structure
- `data-grid` — advanced tabular data (virtualization, sorting)
- `pagination` — large dataset management
