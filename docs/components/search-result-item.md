# Search Result Item

> Support level: **Supported** | Pattern key: `pattern.searchResultItem` | Canonical: `data-pattern="search-result-item"`

## When to use

Individual result item within a search results list, command palette, or autocomplete dropdown. Supports icons, titles, descriptions, and metadata.

- ✓ Command palette result lists
- ✓ Global search overlays
- ✓ Autocomplete suggestion dropdowns
- ✓ Recent activity or history lists
- ✗ Standard navigation menus (use `nav-bar` or `sidebar-nav`)
- ✗ Complex data records (use `card` or `table`)

## Canonical anatomy

| Slot / Attribute | Role | Element |
|------------------|------|---------|
| `data-pattern` | Root container | `a` or `div` |
| `data-slot="icon"` | Visual context marker | `div` (aria-hidden) |
| `data-slot="content"` | Text content wrapper | `div` |
| `data-slot="title"` | Primary result label | `p` |
| `data-slot="description"` | Secondary detail text | `p` |
| `data-slot="meta"` | Contextual metadata | `span` |
| `data-role` | `"section-header"` | Group label variant |
| `data-active` | `"true" \| "false"` | Selected/hover state |

## Basic usage

```html
<ul role="listbox" aria-label="Search results" style="list-style: none; padding: 0; margin: 0">
  <li>
    <a data-pattern="search-result-item" href="/docs/getting-started" role="option">
      <div data-slot="icon" aria-hidden="true">📖</div>
      <div data-slot="content">
        <p data-slot="title">Getting started</p>
        <p data-slot="description">Installation and quick start guide</p>
      </div>
      <span data-slot="meta">Docs</span>
    </a>
  </li>
  <li>
    <a data-pattern="search-result-item" href="/docs/button" role="option" data-active="true" aria-selected="true">
      <div data-slot="icon" aria-hidden="true">🔘</div>
      <div data-slot="content">
        <p data-slot="title">Button component</p>
        <p data-slot="description">Base interactive element styling</p>
      </div>
      <span data-slot="meta">v1.1.0</span>
    </a>
  </li>
</ul>
```

## Section header

```html
<div data-pattern="search-result-item" data-role="section-header">
  Recently viewed
</div>
```

## Accessibility checklist

- [x] **Container role:** The list of results should use `role="listbox"`
- [x] **Item role:** Interactive items must use `role="option"`
- [x] **Selection:** The active item should have `aria-selected="true"` and match `data-active="true"`
- [x] **Dynamic focus:** Use `aria-activedescendant` on the input to point to the active item's ID
- [x] **Semantic markup:** Icons marked with `aria-hidden="true"`
- [x] **Match highlighting:** Use `<mark>` tag for text segments that match the search query

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Default background | Unselected state |
| `--color-bg-subtle` | Active background | Selected/hover state |
| `--color-fg-default` | Title text color | High contrast |
| `--color-fg-muted` | Description/Meta color | Secondary text |
| `--space-2`, `--space-3` | Padding & gaps | Scales with density |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="search-result-item"`
- **State indicator:** `data-active="true"` highlights the item (used for keyboard navigation)
- **Role variant:** `data-role="section-header"` makes the item non-interactive and styled as a label
- **Match pattern:** wrap matching substrings in `<mark>` tags inside `[data-slot="title"]`
- **Slots:** `icon`, `content` (wrapper), `title`, `description`, `meta`
- **Responsibility:** Application manages `data-active`, `aria-selected`, and list navigation

## Related

- **`search-box`** — the input component for searching
- **`command-palette`** — full-screen modal search interface
- **`empty-search-state`** — shown when no matches are found
- **`list`** — standard non-interactive list pattern
