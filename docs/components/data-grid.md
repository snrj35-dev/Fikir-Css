# Data Grid

> Support level: **Supported** | Surface key: `component.dataGrid` | Canonical: `.comp-data-grid`

## When to use

Advanced tabular data display with virtualization, filtering, inline editing. Large datasets (1000+ rows).

- ✓ Large datasets with virtualization
- ✓ Real-time data updates
- ✓ Inline cell editing
- ✓ Complex filtering and column management
- ✗ Simple tabular data (use table instead)
- ✗ Small datasets <100 rows (use table instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-data-grid` | Data grid wrapper | n/a |
| `comp-data-grid-toolbar` | Top toolbar (filters, buttons) | n/a |
| `comp-data-grid-content` | Scrollable content area | n/a |
| `comp-data-grid-row` | Virtualized row | n/a |
| `comp-data-grid-cell` | Grid cell | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Rows rendered |
| Loading | Fetching data | Skeleton placeholders |
| Filtered | User applies filter | Subset of rows shown |
| Editing | Cell selected | Inline editor shown |
| Selected | Row checked | Row highlighted |

## Basic usage

```html
<!-- Data grid wrapper -->
<div class="comp-data-grid" style="display: flex; flex-direction: column; height: 100%; max-height: 600px;">
  <!-- Toolbar -->
  <div class="comp-data-grid-toolbar" style="padding: 1rem; border-bottom: 1px solid var(--color-border-subtle); display: flex; gap: 1rem; align-items: center;">
    <input type="search" placeholder="Search..." style="flex: 1; padding: 0.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.25rem;">
    <button class="comp-button" style="font-size: 0.875rem;">Add row</button>
  </div>

  <!-- Content area with virtualization -->
  <div class="comp-data-grid-content" style="flex: 1; overflow-y: auto; border: 1px solid var(--color-border-subtle);">
    <table style="width: 100%; border-collapse: collapse;">
      <thead style="position: sticky; top: 0; background: var(--color-bg-subtle); z-index: 1;">
        <tr>
          <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--color-border-subtle);">ID</th>
          <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--color-border-subtle);">Name</th>
          <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--color-border-subtle);">Value</th>
          <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid var(--color-border-subtle);">Status</th>
        </tr>
      </thead>
      <tbody>
        <!-- Virtualized rows (only visible ones rendered) -->
        <tr class="comp-data-grid-row" style="border-bottom: 1px solid var(--color-border-subtle);">
          <td class="comp-data-grid-cell" style="padding: 0.75rem;">1</td>
          <td class="comp-data-grid-cell" style="padding: 0.75rem;">Item A</td>
          <td class="comp-data-grid-cell" style="padding: 0.75rem;">100</td>
          <td class="comp-data-grid-cell" style="padding: 0.75rem;"><span style="background: #d1fae5; color: #065f46; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">Complete</span></td>
        </tr>
        <tr class="comp-data-grid-row" style="border-bottom: 1px solid var(--color-border-subtle);">
          <td class="comp-data-grid-cell" style="padding: 0.75rem;">2</td>
          <td class="comp-data-grid-cell" style="padding: 0.75rem;">Item B</td>
          <td class="comp-data-grid-cell" style="padding: 0.75rem;">250</td>
          <td class="comp-data-grid-cell" style="padding: 0.75rem;"><span style="background: #fef3c7; color: #78350f; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem;">In Progress</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## With inline editing

```html
<div class="comp-data-grid">
  <div class="comp-data-grid-content">
    <table>
      <thead><tr>
        <th style="padding: 0.75rem;">Name</th>
        <th style="padding: 0.75rem;">Value</th>
      </tr></thead>
      <tbody>
        <tr class="comp-data-grid-row">
          <td class="comp-data-grid-cell" style="padding: 0.75rem; cursor: pointer;" contenteditable="true">Item A</td>
          <td class="comp-data-grid-cell" style="padding: 0.75rem; cursor: pointer;" contenteditable="true">100</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<table>` with semantic structure
- [x] **Keyboard:** Arrow keys navigate cells; Tab/Shift+Tab skip rows
- [x] **Focus:** Visible focus indicator on active cell
- [x] **Edit mode:** Enter or F2 enters edit mode; Escape cancels
- [x] **Announce:** Live region announces row count, sort state

## Keyboard behavior

| Key | Action |
|-----|--------|
| `↑/↓` | Navigate rows |
| `←/→` | Navigate columns |
| `Enter` / `F2` | Enter edit mode |
| `Escape` | Cancel edit |
| `Tab` | Move to next cell (skip rows) |
| `Ctrl+A` | Select all rows |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `role="grid"` | Grid container | Explicit role |
| `role="gridcell"` | Cell element | Per-cell role |
| `aria-rowcount` | Total rows | For virtualization |
| `aria-colcount` | Total columns | Column count |
| `aria-live="polite"` | Status updates | Announce changes |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-subtle` | Header background | Sticky header |
| `--color-border-subtle` | Cell borders | Grid lines |
| `--space-*` | Cell padding | Scales with density |

## Features

- **Virtualization:** Only visible rows rendered (1000+ rows efficient)
- **Sorting:** Click column header to sort
- **Filtering:** Top toolbar with search/filters
- **Inline editing:** Double-click cell to edit
- **Selection:** Checkbox for multi-row selection
- **Resizable columns:** Drag column borders to resize

## AI / machine-readable notes

- **Selector pattern:** `comp-data-grid` wrapper with `comp-data-grid-toolbar`, `comp-data-grid-content`, rows, cells
- **Virtualization:** Only render visible rows + buffer
- **Edit mode:** `contenteditable="true"` or inline input
- **Filtering:** Toolbar search/filter state synced to row visibility
- **Copy-paste use:** Update headers, row data, and toolbar controls

## Related patterns

- **Table:** Simple tabular data
- **List:** Single-column data
- **Description-list:** Key-value pairs
