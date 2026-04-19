# Spinner

> Support level: **Supported** | Surface key: `component.spinner` | Canonical: `.comp-spinner`

## When to use

Animated loading indicator for asynchronous operations. Shows system is working without blocking UI.

- ✓ Loading overlays while fetching data
- ✓ Button loading state (append spinner while submitting)
- ✓ Page transitions
- ✓ Full-page or content-area loading states
- ✗ Quick operations (<200ms, just disable button instead)
- ✗ Skeleton loading (use skeleton component for content placeholders)
- ✗ Progress indication (use progress bar for long operations with percentage)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-spinner` | Base rotating loader | n/a |
| `comp-spinner-sm` | Small size (1.5rem) | Composable |
| `comp-spinner-md` | Medium size (2rem, default) | Composable |
| `comp-spinner-lg` | Large size (2.5rem) | Composable |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Loading (default) | — | `<div class="comp-spinner" role="status" aria-label="Loading">` |
| Done | Remove/hide spinner | Replace with content or hide |

## Basic usage

```html
<!-- Centered loading indicator -->
<div style="display: flex; justify-content: center; align-items: center; min-height: 200px;">
  <div class="comp-spinner" role="status" aria-label="Loading content..."></div>
</div>

<!-- Spinner in button while loading -->
<button type="submit" disabled class="comp-button">
  <div class="comp-spinner comp-spinner-sm"></div>
  Submitting...
</button>

<!-- Spinner overlay (with backdrop) -->
<div style="position: fixed; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
  <div class="comp-spinner comp-spinner-lg" role="status" aria-label="Loading data..."></div>
</div>
```

## Sizes

```html
<!-- Small (1.5rem) -->
<div class="comp-spinner comp-spinner-sm" role="status" aria-label="Loading"></div>

<!-- Medium (2rem, default) -->
<div class="comp-spinner comp-spinner-md" role="status" aria-label="Loading"></div>

<!-- Large (2.5rem) -->
<div class="comp-spinner comp-spinner-lg" role="status" aria-label="Loading"></div>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses `role="status"` to announce loading state
- [x] **Label:** Always include `aria-label` describing what's loading
- [x] **No auto-focus:** Spinner doesn't steal focus; user can still interact with rest of page
- [x] **Motion:** Respects `@media (prefers-reduced-motion: reduce)` — animation stops
- [x] **Color:** Visible in dark mode and high-contrast themes
- [x] **Screen reader:** Status role announces "Loading" or custom aria-label on load start
- [x] **Timeout:** If loading takes >30s, show error or allow cancel

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="status"` | Always | `"status"` |
| `aria-label` | Always | Describe what's loading, e.g., "Loading profile data" |
| `aria-busy="true"` | On parent container | If entire region is loading |

## Reduced motion

Under `@media (prefers-reduced-motion: reduce)`:
- Rotation animation stops
- Spinner shows static visual (e.g., semi-transparent circle with outline)
- Label still visible and clear

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-primary` | Spinner border/stroke color | Brand override via `--color-accent` |
| `--space-*` | Spinner size | sm/md/lg scale |
| `--animation-duration` | Rotation speed | ~1s (0ms if reduced-motion) |

## AI / machine-readable notes

- **Selector pattern:** `comp-spinner` base + size modifier (sm, md, lg)
- **State:** Always pair with `role="status"` and `aria-label`
- **Timing:** Show spinner for operations >200ms; remove when complete
- **Button state:** Use `.comp-button[disabled] .comp-spinner` pattern
- **Responsive:** Size scales with density; no breakpoint changes needed
- **Copy-paste use:** Replace `aria-label` text with your operation description

## Related patterns

- **Progress bar:** For operations with known duration/percentage
- **Skeleton:** For content placeholders while loading
- **Button loading:** Inline spinner in `<button disabled>` with text
