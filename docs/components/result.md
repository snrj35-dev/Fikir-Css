# Result

> Support level: **Supported** | Surface key: `component.result` | Canonical: `.comp-result`

## When to use

Large status display with icon, heading, and optional action buttons. Shows operation outcome (success, error, empty state).

- ✓ Success confirmation page
- ✓ Error page (404, 500)
- ✓ Empty state (no results, no data)
- ✓ Access denied / permission error
- ✓ Operation completion status
- ✗ Small notifications (use `toast` instead)
- ✗ Progress indication (use `progress` or `spinner`)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-result` | Result container | n/a |
| `comp-result-icon` | Status icon (large) | n/a |
| `comp-result-title` | Status title/heading | n/a |
| `comp-result-description` | Status explanation | n/a |
| `comp-result-actions` | Action buttons (optional) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Success | Positive outcome | Green icon, positive message |
| Error | Operation failed | Red icon, error message |
| Empty | No content | Neutral icon, context message |
| Warning | Caution needed | Yellow icon, warning text |

## Basic usage

```html
<!-- Success result -->
<div class="comp-result" style="text-align: center; padding: 3rem 2rem;">
  <div class="comp-result-icon" style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
  <h1 class="comp-result-title" style="font-size: 1.5rem; margin-bottom: 0.5rem;">Payment successful</h1>
  <p class="comp-result-description" style="color: var(--color-fg-muted); margin-bottom: 2rem;">
    Your order #12345 has been confirmed. You'll receive a confirmation email shortly.
  </p>
  <div class="comp-result-actions">
    <a href="/orders" class="comp-button">View order</a>
    <a href="/" class="comp-button comp-button-ghost">Return to home</a>
  </div>
</div>

<!-- Error result (404) -->
<div class="comp-result" style="text-align: center; padding: 3rem 2rem;">
  <div class="comp-result-icon" style="font-size: 3rem; color: var(--color-danger); margin-bottom: 1rem;">!</div>
  <h1 class="comp-result-title">Page not found</h1>
  <p class="comp-result-description">
    The page you're looking for doesn't exist or has been moved.
  </p>
  <div class="comp-result-actions">
    <a href="/" class="comp-button">Go home</a>
  </div>
</div>

<!-- Empty state result -->
<div class="comp-result" style="text-align: center; padding: 3rem 2rem;">
  <div class="comp-result-icon" style="font-size: 3rem; color: var(--color-fg-muted); margin-bottom: 1rem;">📭</div>
  <h1 class="comp-result-title">No results found</h1>
  <p class="comp-result-description">
    Try adjusting your search criteria or filters.
  </p>
  <div class="comp-result-actions">
    <button type="button" class="comp-button">Clear filters</button>
  </div>
</div>

<!-- Permission denied -->
<div class="comp-result" style="text-align: center; padding: 3rem 2rem;">
  <div class="comp-result-icon" style="font-size: 3rem; color: var(--color-warning); margin-bottom: 1rem;">🔒</div>
  <h1 class="comp-result-title">Access denied</h1>
  <p class="comp-result-description">
    You don't have permission to access this resource.
  </p>
  <div class="comp-result-actions">
    <a href="/login" class="comp-button">Sign in</a>
    <a href="/" class="comp-button comp-button-ghost">Go back</a>
  </div>
</div>
```

## Result types

| Type | Icon | Color | Use case |
|------|------|-------|----------|
| Success | ✓ | Green | Positive outcome |
| Error | ✕ or ! | Red | Failed operation |
| Warning | ⚠️ | Yellow | Caution/alert |
| Info | ⓘ | Blue | Information |
| Empty | 📭 | Gray | No content |

## Accessibility checklist

- [x] **Semantic HTML:** Uses `<h1>` for title, `<p>` for description
- [x] **Icon meaning:** Icon has clear semantic meaning; include text fallback
- [x] **Heading:** Main heading describes status clearly
- [x] **Actions:** Buttons provide next steps
- [x] **Screen reader:** All text read; icon not redundantly announced
- [x] **Color not only signal:** Icon and text describe status, not color alone
- [x] **Focus:** Buttons focusable for keyboard navigation

## Layout variants

```html
<!-- Horizontal layout -->
<div style="display: flex; gap: 2rem; align-items: center;">
  <div style="font-size: 3rem;">✓</div>
  <div>
    <h1>Success</h1>
    <p>Operation completed</p>
    <button class="comp-button">Next</button>
  </div>
</div>

<!-- Vertical layout (centered, typical) -->
<!-- Card layout -->
<div class="comp-surface">
  <!-- Result content -->
</div>
```

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-success` | Success icon | Green |
| `--color-danger` | Error icon | Red |
| `--color-warning` | Warning icon | Yellow |
| `--color-fg-muted` | Description text | Lighter gray |
| `--space-*` | Padding/margins | Scales with density |

## AI / machine-readable notes

- **Selector pattern:** `comp-result` wrapper with `comp-result-icon`, `comp-result-title`, `comp-result-description`, `comp-result-actions` children
- **Icon:** Can be emoji, SVG, or icon component
- **Title:** Must be descriptive of the status
- **Description:** Brief explanation; link to docs/help if complex
- **Actions:** Provide at least one button for next step
- **Copy-paste use:** Update icon, title, description, and button links

## Related patterns

- **Alert:** Small in-page notification (not full-page)
- **Toast:** Auto-dismissing notification
- **Empty-state:** Special case of result (no data scenario)
- **Modal:** If result requires user decision before proceeding
