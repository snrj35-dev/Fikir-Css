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

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-subtle` | Toolbar border | Light separator |
| `--color-bg-surface` | Default background | Mixed with page bg |
| `--space-2`, `--space-3` | Internal gaps | Scales with density |
| `--radius-lg` | Corner radius | Pattern container shape |
| `--font-size-sm` | Meta text size | Muted results count font |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="filter-bar"`
- **Layout structure:**
  - `[data-slot="controls"]` — primary row for search and filter inputs
  - `[data-slot="summary"]` — optional row for active chips and result meta
  - `[data-slot="chips"]` — container for `tag-chip` or `badge` indicators
  - `[data-slot="reset"]` — dedicated area for "Clear all" button
- **Search implementation:** must use `search-box` component inside `[data-slot="search"]`
- **Filter implementation:** use `select`, `segmented-control`, or `fieldset` inside `[data-slot="filters"]`
- **Live updates:** `[data-slot="meta"]` should use `aria-live="polite"` if count updates dynamically
- **Card integration:** `.card[data-pattern="filter-bar"]` automatically removes own border/bg

## Related

- **`data-table-toolbar`** — toolbar integrated with table-specific controls (columns, density)
- **`search-box`** — standalone search input component
- **`tag-chip`** — used for active filter indicators
- **`empty-search-state`** — content when filters yield no results
