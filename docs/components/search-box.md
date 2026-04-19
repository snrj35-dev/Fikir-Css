# Search Box

> Support level: **Supported** | Surface key: `component.searchBox` | Canonical: `.comp-search-box`

## When to use

Text input optimized for search queries. Often includes search button or enter-to-submit behavior.

- ✓ Page search (search this page)
- ✓ Site search (search all content)
- ✓ Product search (search catalog)
- ✓ Command palette (search + filter)
- ✗ Simple text input (use `input` instead)
- ✗ Multiple search filters (use `form` with multiple inputs)
- ✗ Advanced search (use form with multiple fields)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-search-box` | Search input container | n/a |
| `comp-search-box-input` | Search text input | n/a |
| `comp-search-box-button` | Submit search button | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<div class="comp-search-box">` with input |
| Focused | Input focused | Border color changes |
| With results | Results visible | Dropdown or results page shown |
| Empty | No query typed | Placeholder visible |
| Searching | Async search underway | Spinner shown |

## Basic usage

```html
<!-- Simple search box with button -->
<form class="comp-search-box" onsubmit="return search(this);">
  <input 
    type="search" 
    class="comp-search-box-input comp-input"
    placeholder="Search..."
    aria-label="Search"
  >
  <button type="submit" class="comp-search-box-button comp-button">
    Search
  </button>
</form>

<!-- Search box with icon button -->
<form class="comp-search-box">
  <svg class="comp-input-group-addon" width="1em" height="1em" viewBox="0 0 24 24">
    <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor"/>
    <path d="m14 14 4 4" stroke="currentColor" stroke-linecap="round"/>
  </svg>
  <input 
    type="search" 
    class="comp-search-box-input comp-input"
    placeholder="Search..."
    aria-label="Search content"
  >
  <button 
    type="submit" 
    class="comp-search-box-button comp-icon-button"
    aria-label="Submit search"
  >
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5v14"/>
    </svg>
  </button>
</form>

<!-- Search with live autocomplete results -->
<div class="comp-search-box">
  <input 
    type="search" 
    id="site-search" 
    class="comp-search-box-input comp-input"
    placeholder="Search..."
    aria-label="Search"
    aria-autocomplete="list"
    aria-controls="search-results"
    autocomplete="off"
    oninput="showResults(this.value)"
  >
  <ul 
    id="search-results" 
    class="comp-surface" 
    role="listbox"
    style="display: none; position: absolute; top: 100%; width: 100%; max-height: 300px; overflow: auto;"
  >
    <!-- Results populated by JavaScript -->
  </ul>
</div>

<!-- Mobile-friendly search input in header -->
<div style="display: flex; gap: 0.5rem; align-items: center;">
  <input 
    type="search" 
    class="comp-search-box-input comp-input"
    placeholder="Search..."
    style="flex: 1;"
    aria-label="Search"
  >
  <button 
    type="submit" 
    class="comp-icon-button"
    aria-label="Submit search"
  >
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path d="M10 2C5.6 2 2 5.6 2 10s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm8 12l-2-2"/>
    </svg>
  </button>
</div>
```

## Autocomplete / live search pattern

```html
<div style="position: relative;">
  <input 
    type="search" 
    id="search" 
    class="comp-input"
    placeholder="Type to search..."
    autocomplete="off"
    aria-autocomplete="list"
    aria-controls="suggestions"
    aria-expanded="false"
    oninput="updateSuggestions(this)"
  >
  <ul 
    id="suggestions" 
    class="comp-surface" 
    role="listbox"
    style="position: absolute; top: 100%; left: 0; right: 0; display: none;"
  >
    <li role="option">Suggestion 1</li>
    <li role="option" aria-selected="true">Suggestion 2</li>
    <li role="option">Suggestion 3</li>
  </ul>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses `<input type="search">` in `<form>`
- [x] **Label:** Input has `aria-label` or associated `<label>`
- [x] **Keyboard:** Enter submits, Escape closes results (if dropdown)
- [x] **Submit button:** Button has `type="submit"` for form submission
- [x] **Results:** Use `role="listbox"` and `role="option"` for autocomplete
- [x] **Announcement:** Live region (aria-live="polite") announces results count
- [x] **Loading:** Spinner shown during async search

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to search input |
| Enter | Submit search |
| Escape | Close results dropdown (if open) |
| Arrow Down | Select next result (if dropdown) |
| Arrow Up | Select previous result (if dropdown) |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | No visible label | "Search", "Search products", etc. |
| `aria-autocomplete` | Live suggestions | `"list"` for dropdown results |
| `aria-controls` | Search controls results | ID of results container |
| `aria-expanded` | Results dropdown shown | `"true"` or `"false"` |
| `role="listbox"` | Results dropdown | On container |
| `role="option"` | Individual results | On each result item |

## Search patterns

| Pattern | Use case | Example |
|---------|----------|---------|
| **Submit button** | Form search, requires user action | "Search" button in toolbar |
| **Live autocomplete** | Instant filtering, suggestions appear as user types | Site search with dropdown |
| **Search page** | Dedicated search interface | `/search?q=...` page |
| **Command palette** | Quick access to actions + search | Cmd+K to open |

## Density modes

Search box input height and font size scale with `[data-density]`:

| Density | Height | Font-size |
|---------|--------|-----------|
| `compact` | 2.25rem | 0.875rem |
| `default` | 2.5rem | 0.875rem |
| `comfortable` | 2.75rem | 0.9375rem |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-input` | Input background | Light gray |
| `--color-border-default` | Border default | Subtle |
| `--color-border-accent` | Border focus | Brand color |
| `--space-*` | Padding | Scales with density |
| `--font-size-*` | Text size | Scales with density |

## AI / machine-readable notes

- **Selector pattern:** `.comp-search-box` wrapper with `.comp-search-box-input` and `.comp-search-box-button` children
- **Form submission:** Wrap in `<form>` with `onsubmit` handler for traditional form submit
- **Live search:** Use `oninput` event + ARIA live region for autocomplete feedback
- **Results:** Use `role="listbox"` and `role="option"` for screen reader navigation
- **Button:** Search button should be keyboard accessible (Tab) and clickable
- **Copy-paste use:** Adjust `placeholder` and `aria-label`; structure unchanged

## Related patterns

- **Input:** Basic text input
- **Input-group:** Input with prefix/suffix elements
- **Dropdown:** Results container (often paired with search)
- **Command palette:** Advanced search + action filtering UI
