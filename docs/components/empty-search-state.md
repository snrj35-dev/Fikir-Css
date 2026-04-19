# Empty Search State

> Pattern level: **Supported** | Pattern key: `empty-search-state` | Variants: `first-use`, `no-results`, `filtered-empty`

## When to use

Empty search state pattern communicates the reason why no results are shown and suggests next steps. It appears in search results, filtered lists, and data discovery flows.

- ✓ Use when search returns no results
- ✓ Use when filters applied but yield no matches
- ✓ Use on first visit before user searches
- ✓ Use to guide user towards actionable next steps
- ✗ Don't use for generic empty states (use empty-state component)
- ✗ Don't use for errors or exceptions (use result component)
- ✗ Don't use as a loading state (use spinner/loading-overlay)

## Variants

This pattern defines three semantic variants:

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
    <button class="btn btn-sm btn-outline" onclick="clearSearch()">
      Clear search
    </button>
    <button class="btn btn-sm btn-ghost" onclick="goBack()">
      Back to browse
    </button>
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
    Your selected filters (Price: $500+, Rating: 4+) returned no results.
  </p>
  <div data-slot="actions">
    <button class="btn btn-sm btn-outline" onclick="resetFilters()">
      Reset filters
    </button>
    <button class="btn btn-sm btn-ghost" onclick="adjustFilters()">
      Adjust filters
    </button>
  </div>
</div>
```

## Basic structure

All variants follow the same slot structure:

| Slot | Content | Required |
|------|---------|----------|
| `icon` | Large emoji or icon | ✓ (for visual clarity) |
| `title` | Primary message | ✓ |
| `description` | Explanation and context | ✓ |
| `actions` | Buttons or links to resolve | ✗ (recommended for `no-results`, `filtered-empty`) |

## Implementation with `empty-state` component

Empty search state reuses `empty-state` CSS:

```html
<!-- Using empty-state component classes -->
<div data-pattern="empty-search-state" data-variant="no-results" class="empty-state">
  <div class="empty-state-media" aria-hidden="true">🔍</div>
  <h2 class="empty-state-title">No results</h2>
  <p class="empty-state-description">
    Try different keywords or remove filters.
  </p>
  <div class="empty-state-actions">
    <button class="btn btn-sm btn-outline">Clear search</button>
  </div>
</div>
```

Or with semantic slots:

```html
<!-- Using data-slot pattern -->
<div data-pattern="empty-search-state" data-variant="no-results">
  <div data-slot="icon" aria-hidden="true">🔍</div>
  <h2 data-slot="title">No results</h2>
  <p data-slot="description">
    Try different keywords or remove filters.
  </p>
  <div data-slot="actions">
    <button class="btn btn-sm btn-outline">Clear search</button>
  </div>
</div>
```

## In search workflows

### Search box + empty state integration

```html
<section style="max-width: 36rem; margin: 0 auto; padding: var(--space-4)">
  <!-- Search input -->
  <div class="field">
    <label class="label" for="product-search">Search products</label>
    <div class="search-box">
      <input
        id="product-search"
        class="search-box-input input"
        type="text"
        placeholder="Enter keyword..."
        aria-label="Search products"
      />
      <button class="btn btn-sm btn-ghost" aria-label="Clear search">
        ✕
      </button>
    </div>
  </div>

  <!-- Results or empty state -->
  <div id="search-results" style="margin-block-start: var(--space-3)">
    <!-- Results list or -->
    
    <!-- Empty state when no results -->
    <div data-pattern="empty-search-state" data-variant="no-results">
      <div data-slot="icon">🔍</div>
      <h2 data-slot="title">No products found</h2>
      <p data-slot="description">
        We couldn't find products matching "unknown brand".
      </p>
      <div data-slot="actions">
        <button class="btn btn-sm btn-outline" onclick="clearSearch()">
          Clear search
        </button>
      </div>
    </div>
  </div>
</section>
```

### Data table with filters + empty state

```html
<section class="stack" style="--stack-gap: var(--space-3)">
  <!-- Filter bar -->
  <div data-pattern="filter-bar" data-slot="controls">
    <select class="select" aria-label="Category">
      <option>All categories</option>
      <option>Electronics</option>
      <option>Clothing</option>
    </select>
    <input type="range" class="range-slider" min="0" max="1000" />
    <!-- ... more filters ... -->
  </div>

  <!-- Table or list -->
  <div id="results-container">
    <!-- If results exist, show table -->
    
    <!-- If no results due to filters -->
    <div data-pattern="empty-search-state" data-variant="filtered-empty">
      <div data-slot="icon">⊙</div>
      <h2 data-slot="title">No items match your filters</h2>
      <p data-slot="description">
        Try adjusting your filter selections.
      </p>
      <div data-slot="actions">
        <button class="btn btn-sm btn-outline" onclick="resetFilters()">
          Reset all filters
        </button>
      </div>
    </div>
  </div>
</section>
```

## Accessibility checklist

- [ ] **Semantic:** uses `<h2>` for title, `<p>` for description
- [ ] **Icon:** marked with `aria-hidden="true"` (purely decorative)
- [ ] **Live region:** optional `aria-live="polite"` on title for dynamic updates
- [ ] **Action buttons:** clear, specific labels (not generic "OK" or "Go back")
- [ ] **Message clarity:** explains WHAT happened and HOW to recover
- [ ] **Screen reader:** full content readable without visuals
- [ ] **Contrast:** text meets WCAG AA contrast ratio

### Message best practices

- **For `first-use`:** "Search to get started" (positive, inviting)
- **For `no-results`:** Mention the query: "No items found for 'winter coats'" (specific)
- **For `filtered-empty`:** Mention active filters: "No results with selected price range" (diagnostic)

## Density and theme support

Empty search state automatically scales with:

| Aspect | Behavior |
|--------|----------|
| **Density** | Padding and spacing scale via `--space-*` tokens |
| **Dark mode** | Text color automatically adjusts via `--color-fg-*` tokens |
| **High contrast** | Border and text contrast maintained |
| **Shape** | No border-radius by default; utilities can override |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-2`, `--space-3`, `--space-4` | Padding, gaps | Scale with density |
| `--color-fg-default` | Title text | Primary text color |
| `--color-fg-muted` | Description text | Secondary text color |
| `--font-size-sm`, `--font-size-lg` | Typography | Description, title |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="empty-search-state"`
- **Variant:** `data-variant="first-use" | "no-results" | "filtered-empty"`
- **Slots:** `data-slot="icon"`, `data-slot="title"`, `data-slot="description"`, `data-slot="actions"`
- **Reuse:** leverages existing `empty-state`, `btn`, and form components
- **Message context:** tailor title and description to the specific variant
- **Action buttons:** provide recovery path (clear, reset, adjust, browse)
- **Responsive:** use utility classes for mobile adjustments if needed
- **Dynamic rendering:** variant can change based on user interaction (JS-managed)
- **Anti-patterns:**
  - Don't use generic "No data" without context
  - Don't hide all recovery options
  - Don't use in error states (use result component)
  - Don't animate unnecessarily (respect reduced-motion)

## Related components

- **Empty State** — generic empty container (not specific to search)
- **Result** — operation outcome feedback
- **Search Box** — primary search input
- **Filter Bar** — optional filtering controls above results
- **Button** — actions within empty state (clear, reset, browse)
