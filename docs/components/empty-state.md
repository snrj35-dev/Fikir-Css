# Empty State

> Support level: **Supported** | Surface key: `component.emptyState` | Canonical: `.comp-empty-state`

## When to use

Placeholder displayed when no content or data exists. Explains situation and suggests next actions.

- ✓ No search results
- ✓ No data in table/list
- ✓ Empty inbox or feed
- ✓ First-time user experience
- ✗ Loaded content (use result component)
- ✗ Temporary load state (use spinner)
- ✗ Error state (use result with error styling)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-empty-state` | Empty state container | n/a |
| `comp-empty-state-icon` | Large illustration/icon | n/a |
| `comp-empty-state-title` | Primary message | n/a |
| `comp-empty-state-description` | Explanation | n/a |
| `comp-empty-state-actions` | CTA buttons | Optional |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Visible | No content | Empty state shown |
| Cleared | User takes action | Empty state hidden |

## Basic usage

```html
<!-- No search results -->
<div class="comp-empty-state" style="text-align: center; padding: 3rem 2rem;">
  <div class="comp-empty-state-icon" style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
  <h2 class="comp-empty-state-title">No results found</h2>
  <p class="comp-empty-state-description" style="color: var(--color-fg-muted); margin-bottom: 1.5rem;">
    No items match your search. Try different keywords.
  </p>
  <div class="comp-empty-state-actions">
    <button type="button" class="comp-button" onclick="clearSearch()">Clear search</button>
  </div>
</div>

<!-- Empty inbox -->
<div class="comp-empty-state">
  <div class="comp-empty-state-icon" style="font-size: 3rem;">📭</div>
  <h2 class="comp-empty-state-title">All caught up!</h2>
  <p class="comp-empty-state-description">
    You have no unread messages.
  </p>
</div>

<!-- First-time user -->
<div class="comp-empty-state">
  <div class="comp-empty-state-icon" style="font-size: 3rem;">✨</div>
  <h2 class="comp-empty-state-title">Get started</h2>
  <p class="comp-empty-state-description">
    Create your first document to begin.
  </p>
  <div class="comp-empty-state-actions">
    <button type="button" class="comp-button">Create document</button>
  </div>
</div>

<!-- No data in table -->
<div class="comp-empty-state" style="padding: 2rem; text-align: center;">
  <p style="color: var(--color-fg-muted);">No data available</p>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<h2>` for title, `<p>` for description
- [x] **Clear message:** Explains why content is empty
- [x] **Action:** Suggests next steps or provides CTA
- [x] **Icon:** Complementary to text, not required for understanding
- [x] **Screen reader:** Full content readable without icon

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-fg-muted` | Description text | Lighter gray |
| `--space-*` | Padding | Container spacing |

## AI / machine-readable notes

- **Selector pattern:** `comp-empty-state` wrapper with icon, title, description, actions
- **Context:** Explain why empty (no data, no results, first-time)
- **Action:** Provide button or link to populate content
- **Copy-paste use:** Update icon, title, description, and action text

## Related patterns

- **Result:** Operation outcome (success, error, etc.)
- **Skeleton:** Loading placeholder
- **Spinner:** Loading indicator
