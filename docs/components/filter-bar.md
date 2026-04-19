# Filter Bar

> Support level: **Supported** | Pattern key: `data-pattern="filter-bar"` | Canonical: `[data-pattern="filter-bar"]`

## When to use

Use when a list, table, or data grid needs a dedicated search + filter + active-filter-chip surface above the data surface.

- ✓ Table or data-grid pages with multiple filter dimensions
- ✓ Search + category/status/date filter combinations
- ✓ Any list where users need to see and remove active filters (chips)
- ✗ Single-field search only — use `search-box` directly
- ✗ Inline row filtering inside a table — use `data-table-toolbar` instead
- ✗ Simple key/value attribute filter with no chips — use a plain `field` group

## Slots

| Slot | Element | Role |
|------|---------|------|
| `[data-slot="controls"]` | `div` | Flex row containing search + filters |
| `[data-slot="search"]` | `div` | Search input area, grows to fill space |
| `[data-slot="filters"]` | `div` or `fieldset` | Filter select(s) / segmented controls |
| `[data-slot="chips"]` | `div` | Active filter chips (tag-chip, badge) |
| `[data-slot="actions"]` | `div` | Optional action buttons (e.g. advanced filter toggle) |
| `[data-slot="reset"]` | `div` | Reset/clear all button (aligns to inline-end) |
| `[data-slot="summary"]` | `div` | Footer row: chips + meta text |
| `[data-slot="meta"]` | `span` | Muted result count / active filter count text |

## Basic usage

```html
<div data-pattern="filter-bar">
  <div data-slot="controls">
    <div data-slot="search">
      <form class="search-box" role="search" aria-label="Filter search">
        <input class="search-box-input" type="search" placeholder="Search..." aria-label="Search items" />
        <button class="search-box-action" type="submit">Search</button>
      </form>
    </div>

    <div data-slot="filters">
      <select class="select select-sm" aria-label="Filter by status">
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="archived">Archived</option>
      </select>
      <select class="select select-sm" aria-label="Filter by type">
        <option value="">All types</option>
        <option value="enterprise">Enterprise</option>
        <option value="smb">SMB</option>
      </select>
    </div>

    <div data-slot="reset">
      <button class="btn btn-ghost btn-sm" type="button">Clear all</button>
    </div>
  </div>
</div>
```

## With active filter chips (summary row)

```html
<div data-pattern="filter-bar">
  <div data-slot="controls">
    <div data-slot="search">
      <form class="search-box" role="search" aria-label="Filter search">
        <input class="search-box-input" type="search" value="acme" aria-label="Search items" />
        <button class="search-box-action" type="submit">Search</button>
      </form>
    </div>
    <div data-slot="filters">
      <select class="select select-sm" aria-label="Status">
        <option selected>Active</option>
      </select>
    </div>
    <div data-slot="reset">
      <button class="btn btn-ghost btn-sm" type="button">Clear all</button>
    </div>
  </div>

  <div data-slot="summary">
    <div data-slot="chips">
      <span class="tag-chip">
        Search: "acme"
        <button class="tag-chip-remove" aria-label="Remove search filter" type="button">×</button>
      </span>
      <span class="tag-chip">
        Status: Active
        <button class="tag-chip-remove" aria-label="Remove status filter" type="button">×</button>
      </span>
    </div>
    <span data-slot="meta">12 results</span>
  </div>
</div>
```

## Inside a card (borderless variant)

When placed inside a `.card`, the pattern removes its own border and background:

```html
<article class="card card-p-md">
  <div data-pattern="filter-bar">
    <!-- slots as above -->
  </div>
</article>
```

## Fieldset filters (grouped)

Use `fieldset` + `legend` for semantically grouped filter controls:

```html
<fieldset data-slot="filters">
  <legend>Date range</legend>
  <select class="select select-sm" aria-label="From year">
    <option>2024</option>
    <option>2025</option>
  </select>
  <select class="select select-sm" aria-label="To year">
    <option>2025</option>
    <option>2026</option>
  </select>
</fieldset>
```

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Active filter chip | Filter is applied | `tag-chip` in `[data-slot="chips"]` |
| Empty chips | No filters active | `[data-slot="summary"]` hidden or empty |
| Search has value | User typed | `search-box-input[value]` |
| Reset visible | At least one filter active | Show `[data-slot="reset"]` button |

## Accessibility

- Wrap `data-slot="search"` in a `<form role="search">` with `aria-label`
- Use `aria-label` on each `<select>` — do not rely on visual proximity alone
- `fieldset` + `legend` groups related filter controls for screen readers
- Active filter chips must have accessible remove buttons: `aria-label="Remove [filter name] filter"`
- `data-slot="meta"` should be wrapped in `aria-live="polite"` if result count updates dynamically

```html
<span data-slot="meta" aria-live="polite" aria-atomic="true">12 results</span>
```

## AI prompt context

```
filter-bar pattern: data-pattern="filter-bar"
Required slots: [data-slot="controls"] > [data-slot="search"] + [data-slot="filters"]
Optional slots: [data-slot="chips"], [data-slot="actions"], [data-slot="reset"], [data-slot="summary"], [data-slot="meta"]
Summary row: [data-slot="summary"] > [data-slot="chips"] + [data-slot="meta"]
Search uses: class="search-box" > search-box-input + search-box-action
Filter uses: select.select, segmented-control, or fieldset grouping
Active filters: tag-chip with tag-chip-remove inside [data-slot="chips"]
Card integration: .card[data-pattern="filter-bar"] removes own border/bg
```

## Anti-patterns

- ❌ Using `filter-bar` for a single search box — use `search-box` directly
- ❌ Omitting `aria-label` on filter selects
- ❌ Placing active chip count in `meta` without `aria-live` on dynamic updates
- ❌ Hard-coding reset button visibility — show/hide based on filter state
- ❌ Using `filter-bar` without a corresponding data surface beneath it

## Related patterns

- **Data Table Toolbar:** [data-table-toolbar.md](./data-table-toolbar.md) — toolbar integrated with table surface (column visibility, density, export)
- **Search Box:** [search-box.md](./search-box.md) — standalone search input
- **Tag Chip:** [tag.md](./tag.md) — removable chip for active filter display
- **Empty Search State:** [empty-search-state.md](./empty-search-state.md) — content when filters yield no results
