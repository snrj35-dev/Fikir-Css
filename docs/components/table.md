# Table

> Support level: **Supported** | Surface key: `component.table` | Canonical: `.comp-table`

## When to use

Structured data in rows and columns. For tabular comparison, sorting, and pagination.

- ✓ Structured tabular data (spreadsheet-like)
- ✓ Sortable columns
- ✓ Paginated large datasets
- ✓ Column filtering
- ✗ Nested/hierarchical data (use tree-view or data-grid)
- ✗ Real-time streaming data (use data-grid with virtualization)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-table` | Table wrapper | n/a |
| `comp-table-head` | Table header | n/a |
| `comp-table-body` | Table body | n/a |
| `comp-table-row` | Table row (tr) | n/a |
| `comp-table-cell` | Table cell (td/th) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Normal row colors |
| Sortable | Clickable header | Pointer cursor + sort icon |
| Hover | Mouse over row | Slight background highlight |
| Selected | Row checked | Checkbox + highlight |

## Basic usage

```html
<table class="comp-table" style="width: 100%; border-collapse: collapse;">
  <thead class="comp-table-head" style="background: var(--color-bg-subtle); border-bottom: 1px solid var(--color-border-subtle);">
    <tr class="comp-table-row">
      <th class="comp-table-cell" style="padding: 0.75rem; text-align: left; font-weight: 500;">Name</th>
      <th class="comp-table-cell" style="padding: 0.75rem; text-align: left; font-weight: 500;">Email</th>
      <th class="comp-table-cell" style="padding: 0.75rem; text-align: left; font-weight: 500;">Status</th>
      <th class="comp-table-cell" style="padding: 0.75rem; text-align: left; font-weight: 500;">Action</th>
    </tr>
  </thead>
  <tbody class="comp-table-body">
    <tr class="comp-table-row" style="border-bottom: 1px solid var(--color-border-subtle); hover-background: var(--color-bg-subtle);">
      <td class="comp-table-cell" style="padding: 0.75rem;">Jane Doe</td>
      <td class="comp-table-cell" style="padding: 0.75rem;">jane@example.com</td>
      <td class="comp-table-cell" style="padding: 0.75rem;"><span style="background: #d1fae5; color: #065f46; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">Active</span></td>
      <td class="comp-table-cell" style="padding: 0.75rem;"><button class="comp-button-text" onclick="editRow()">Edit</button></td>
    </tr>
    <tr class="comp-table-row" style="border-bottom: 1px solid var(--color-border-subtle);">
      <td class="comp-table-cell" style="padding: 0.75rem;">John Smith</td>
      <td class="comp-table-cell" style="padding: 0.75rem;">john@example.com</td>
      <td class="comp-table-cell" style="padding: 0.75rem;"><span style="background: #fee2e2; color: #991b1b; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">Inactive</span></td>
      <td class="comp-table-cell" style="padding: 0.75rem;"><button class="comp-button-text" onclick="editRow()">Edit</button></td>
    </tr>
  </tbody>
</table>
```

## With sorting

```html
<table class="comp-table" style="width: 100%; border-collapse: collapse;">
  <thead class="comp-table-head">
    <tr class="comp-table-row">
      <th class="comp-table-cell" style="padding: 0.75rem; text-align: left; cursor: pointer; user-select: none;">
        Name 
        <span style="margin-left: 0.5rem; color: var(--color-fg-muted);">↓</span>
      </th>
      <th class="comp-table-cell" style="padding: 0.75rem; text-align: left; cursor: pointer;">Email</th>
      <th class="comp-table-cell" style="padding: 0.75rem; text-align: left;">Status</th>
    </tr>
  </thead>
  <tbody class="comp-table-body">
    <!-- sorted rows here -->
  </tbody>
</table>
```

## With selection

```html
<table class="comp-table">
  <thead>
    <tr>
      <th style="padding: 0.75rem; width: 2rem;">
        <input type="checkbox" id="select-all" aria-label="Select all rows">
      </th>
      <th style="padding: 0.75rem; text-align: left;">Name</th>
      <th style="padding: 0.75rem; text-align: left;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom: 1px solid var(--color-border-subtle);">
      <td style="padding: 0.75rem;">
        <input type="checkbox" aria-label="Select row">
      </td>
      <td style="padding: 0.75rem;">Jane Doe</td>
      <td style="padding: 0.75rem;">Active</td>
    </tr>
  </tbody>
</table>
```

## Accessibility checklist

- [x] **Semantic:** Uses semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`
- [x] **Headers:** `<th scope="col">` identifies column headers
- [x] **Sortable:** Sortable headers have role="button" + aria-sort
- [x] **Selection:** Checkboxes for row selection with aria-label
- [x] **Keyboard:** Tab navigates cells; sort headers activate with Enter/Space
- [x] **Contrast:** Good color contrast for text and status badges

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Move to next cell |
| `Shift+Tab` | Move to previous cell |
| `Enter/Space` (on sortable header) | Sort column |
| `Space` (on checkbox) | Toggle row selection |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `<table>` | Root element | Semantic table container |
| `<thead>/<tbody>` | Semantic grouping | Separates header from body |
| `<th scope="col">` | Column header | Links cells to column |
| `role="button"` (sortable) | Sortable header | Make interactive |
| `aria-sort="ascending"/"descending"` | Sort state | Indicates current sort |
| `aria-label` (checkboxes) | Row selection | "Select row", "Select all" |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-subtle` | Hover state | Subtle row highlight |
| `--color-border-subtle` | Row separator | Border between rows |
| `--color-fg-muted` | Sort indicator | Lighter text |
| `--space-*` | Cell padding | Scales with density |

## Variants

- **Striped:** Alternating row colors
- **Bordered:** Full grid borders
- **Compact:** Reduced padding (sm size)
- **Hover:** Highlight on row hover
- **Sticky header:** Header stays on scroll

## AI / machine-readable notes

- **Selector pattern:** `comp-table` wrapper with semantic `thead`, `tbody`, rows, cells
- **Data structure:** Rows as `<tr>`, cells as `<td>`, headers as `<th scope="col">`
- **Sorting:** Sortable headers have `role="button"` + `aria-sort`
- **Selection:** Checkboxes for row selection with `aria-label`
- **Copy-paste use:** Update table headers, rows, and cell data

## Related patterns

- **Data-grid:** Advanced table with virtualization
- **List:** Simple row-based display
- **Description-list:** Key-value pairs
