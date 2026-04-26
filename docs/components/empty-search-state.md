# Empty Search State

> Support level: **Supported** | Pattern key: `pattern.emptySearchState` | Canonical: `data-pattern="empty-search-state"`

## When to use

Empty search state pattern communicates the reason why no results are shown and suggests next steps. It appears in search results, filtered lists, and data discovery flows.

- ✓ Use when search returns no results
- ✓ Use when filters applied but yield no matches
- ✓ Use on first visit before user searches
- ✓ Use to guide user towards actionable next steps
- ✗ Don't use for generic empty states (use `empty-state` component)
- ✗ Don't use for errors or exceptions (use `result` component)
- ✗ Don't use as a loading state (use `spinner` or `loading-overlay`)

## Canonical anatomy

| Slot | Role | Element |
|------|------|---------|
| `data-slot="icon"` | Visual context marker | `div` (aria-hidden) |
| `data-slot="title"` | Primary status message | `h2` |
| `data-slot="description"` | Explanation and guidance | `p` |
| `data-slot="actions"` | Recovery options (buttons/links) | `div` |

## Variants

This pattern defines three semantic variants using `data-variant`:

### `first-use` — Prompt to start searching

Shown when no search has been performed yet. Encourages the user to begin.

```html
<div data-pattern="empty-search-state" data-variant="first-use">
  <div data-slot="icon" aria-hidden="true">🔍</div>
  <h2 data-slot="title">Find what you need</h2>
  <p data-slot="description">
    Search across all items by keyword, category, or author.
  </p>
</div>
```

### `no-results` — Search performed but no matches

Shown when user enters a query but nothing matches. Provides recovery options.

```html
<div data-pattern="empty-search-state" data-variant="no-results">
  <div data-slot="icon" aria-hidden="true">🔍</div>
  <h2 data-slot="title">No results for "smartphone"</h2>
  <p data-slot="description">
    Try different keywords, check spelling, or remove filters.
  </p>
  <div data-slot="actions">
    <button class="btn btn-sm btn-outline" type="button">Clear search</button>
  </div>
</div>
```

### `filtered-empty` — Filters applied but no matches

Shown when active filters yield zero results. Suggests filter adjustment.

```html
<div data-pattern="empty-search-state" data-variant="filtered-empty">
  <div data-slot="icon" aria-hidden="true">⊙</div>
  <h2 data-slot="title">No items match filters</h2>
  <p data-slot="description">
    Your selected filters returned no results.
  </p>
  <div data-slot="actions">
    <button class="btn btn-sm btn-outline" type="button">Reset filters</button>
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** uses `<h2>` for title, `<p>` for description
- [x] **Icon:** marked with `aria-hidden="true"` (purely decorative)
- [x] **Live region:** optional `aria-live="polite"` on title for dynamic updates
- [x] **Action buttons:** clear, specific labels (not generic "OK" or "Go back")
- [x] **Message clarity:** explains WHAT happened and HOW to recover

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-2`, `--space-4` | Padding & gaps | Scale with density |
| `--color-fg-default` | Title text color | High contrast |
| `--color-fg-muted` | Description text color | Medium contrast |
| `--font-size-sm` | Description text size | Base readability |
| `--font-size-lg` | Title text size | Heading emphasis |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="empty-search-state"`
- **Variant:** `data-variant="first-use" | "no-results" | "filtered-empty"`
- **Slots:** `icon`, `title`, `description`, `actions`
- **Reusability:** leverages `empty-state` logic with specific search context
- **Message context:** tailor title and description to the specific variant
- **Recovery paths:** Always provide at least one action button for `no-results` and `filtered-empty` variants

## Related

- **`empty-state`** — generic empty container
- **`result`** — operation outcome feedback
- **`search-box`** — primary search input component
- **`filter-bar`** — optional filtering controls above results
- **`tag-chip`** — used for active filter indicators
