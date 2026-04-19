# Data Table Toolbar

> Support level: **Supported** | Pattern key: `data-pattern="data-table-toolbar"` | Canonical: `[data-pattern="data-table-toolbar"]`

## When to use

Use when a table or data-grid needs a toolbar that combines search, filters, column controls (visibility, density) and bulk actions in a single coordinated surface.

- ✓ Data-heavy tables with search + filter + column visibility controls
- ✓ Admin/dashboard screens where users switch between compact/default/comfortable density
- ✓ When bulk row selection requires contextual actions (delete, export, assign)
- ✓ When a table needs a structured export button alongside other controls
- ✗ Simple search-only above a table — use `search-box` or `filter-bar`
- ✗ A page-level filter panel disconnected from a specific table — use `filter-bar`
- ✗ Navigation or page-level toolbars — use `navbar`, `menu-bar`, or `command-bar`

## Slots

| Slot | Element | Role |
|------|---------|------|
| `[data-slot="controls"]` | `div` | Primary flex row: search + filters + actions |
| `[data-slot="search"]` | `div` | Search input area, grows to fill space |
| `[data-slot="filters"]` | `div` | Filter selects |
| `[data-slot="column-visibility"]` | `div` | Column show/hide toggle button |
| `[data-slot="density"]` | `div` | Density selector (compact / default / comfortable) |
| `[data-slot="export"]` | `div` | Export button |
| `[data-slot="actions"]` | `div` | Contextual action buttons, aligns to inline-end |
| `[data-slot="active-filters"]` | `div` | Active filter chips (tag-chip, badge) |
| `[data-slot="selection-summary"]` | `div` | Selected row count text |
| `[data-slot="summary"]` | `div` | Footer row: active-filters + selection-summary |
| `[data-slot="surface"]` | `div` | Table or data-grid wrapper (inline-size: 100%) |

## Basic usage

```html
<div data-pattern="data-table-toolbar">
  <div data-slot="controls">
    <div data-slot="search">
      <form class="search-box" role="search" aria-label="Issues search">
        <input class="search-box-input" type="search" placeholder="Search issues..." aria-label="Search issues" />
        <button class="search-box-action" type="submit">Search</button>
      </form>
    </div>

    <div data-slot="filters">
      <select class="select select-sm" aria-label="Filter by status">
        <option value="">All statuses</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <div data-slot="actions">
      <button class="btn btn-primary btn-sm" type="button">New issue</button>
    </div>
  </div>

  <div data-slot="surface">
    <table class="table" id="issues-table" aria-label="Issues table">
      <!-- table content -->
    </table>
  </div>
</div>
```

## With column controls, density, and export

```html
<div data-pattern="data-table-toolbar">
  <div data-slot="controls">
    <div data-slot="search">
      <form class="search-box" role="search" aria-label="Table search">
        <input class="search-box-input" type="search" placeholder="Search..." aria-label="Search table" />
        <button class="search-box-action" type="submit">Search</button>
      </form>
    </div>

    <div data-slot="filters">
      <select class="select select-sm" aria-label="Status filter">
        <option>All</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>

    <div data-slot="column-visibility">
      <button class="btn btn-outline btn-sm" type="button" aria-haspopup="true">Columns</button>
    </div>

    <div data-slot="density">
      <select class="select select-sm" aria-label="Row density">
        <option value="compact">Compact</option>
        <option value="default" selected>Default</option>
        <option value="comfortable">Comfortable</option>
      </select>
    </div>

    <div data-slot="export">
      <button class="btn btn-outline btn-sm" type="button">Export CSV</button>
    </div>

    <div data-slot="actions">
      <button class="btn btn-primary btn-sm" type="button">Add row</button>
    </div>
  </div>

  <div data-slot="surface">
    <table class="table" id="data-table" aria-label="Data table" aria-controls="data-table">
      <!-- table content -->
    </table>
  </div>
</div>
```

## With active filters and selection summary (summary row)

```html
<div data-pattern="data-table-toolbar">
  <div data-slot="controls">
    <!-- search, filters, actions as above -->
  </div>

  <div data-slot="summary">
    <div data-slot="active-filters">
      <span class="tag-chip">
        Status: Active
        <button class="tag-chip-remove" aria-label="Remove status filter" type="button">×</button>
      </span>
    </div>
    <div data-slot="selection-summary" aria-live="polite" aria-atomic="true">
      3 rows selected
    </div>
  </div>

  <div data-slot="surface">
    <table class="table" aria-label="Filtered table">
      <!-- table content -->
    </table>
  </div>
</div>
```

## Inside a card (borderless variant)

When nested in a `.card`, the toolbar removes its own border and background:

```html
<article class="card card-p-md">
  <div data-pattern="data-table-toolbar">
    <!-- slots -->
  </div>
</article>
```

## Linking toolbar controls to the table

Use `aria-controls` on toolbar controls to associate them with the table:

```html
<button class="btn btn-outline btn-sm"
  type="button"
  aria-controls="issues-table"
  aria-label="Toggle column visibility">
  Columns
</button>

<table class="table" id="issues-table" aria-label="Issues table">
  <!-- ... -->
</table>
```

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Active filter chip | Filter applied | `tag-chip` in `[data-slot="active-filters"]` |
| Selection summary visible | Rows selected | `[data-slot="selection-summary"]` with count |
| Density: compact | User selects compact | Apply `data-density="compact"` to table wrapper |
| Density: comfortable | User selects comfortable | Apply `data-density="comfortable"` to table wrapper |
| Summary row visible | Filters or selection active | `[data-slot="summary"]` row rendered |

## Accessibility

- Wrap `[data-slot="search"]` in `<form role="search">` with `aria-label`
- Use `aria-label` on every `<select>` — never rely on visual placement
- Use `aria-controls="[table-id]"` on column-visibility and density controls
- `[data-slot="selection-summary"]` should have `aria-live="polite"` for dynamic updates
- Active filter chips must have `aria-label="Remove [filter] filter"` on remove buttons
- Export and action buttons need descriptive labels (not just icons)

## AI prompt context

```
data-table-toolbar pattern: data-pattern="data-table-toolbar"
Primary row: [data-slot="controls"] > search + filters + column-visibility + density + export + actions
Summary row: [data-slot="summary"] > [data-slot="active-filters"] + [data-slot="selection-summary"]
Surface slot: [data-slot="surface"] wraps .table or .data-grid
Table linking: aria-controls="[table-id]" on control buttons
Search uses: class="search-box" > search-box-input + search-box-action
Active filters: tag-chip with tag-chip-remove in [data-slot="active-filters"]
Selection count: [data-slot="selection-summary"] with aria-live="polite"
Card integration: .card[data-pattern="data-table-toolbar"] removes own border/bg
```

## Anti-patterns

- ❌ Omitting `aria-controls` between toolbar controls and the table
- ❌ Using `data-table-toolbar` for page-level filtering disconnected from a table
- ❌ Hardcoding selection summary — always update with `aria-live="polite"`
- ❌ Placing export inside `[data-slot="actions"]` when it's always visible (use `[data-slot="export"]`)
- ❌ Hiding entire toolbar when zero rows exist — show empty state in surface slot instead

## Related patterns

- **Filter Bar:** [filter-bar.md](./filter-bar.md) — standalone filter panel without table-level controls
- **Table:** [table.md](./table.md) — the table surface placed in `[data-slot="surface"]`
- **Data Grid:** [data-grid.md](./data-grid.md) — advanced table for the surface slot
- **Search Box:** [search-box.md](./search-box.md) — standalone search input component
- **Tag Chip:** [tag.md](./tag.md) — active filter chip in `[data-slot="active-filters"]`
- **Empty Search State:** [empty-search-state.md](./empty-search-state.md) — content when table is empty after filtering
