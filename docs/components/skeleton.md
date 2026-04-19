# Skeleton

> Support level: **Supported** | Surface key: `component.skeleton` | Canonical: `.comp-skeleton`

## When to use

Placeholder shimmer animation while content is loading. Shows users that content is coming without blocking interaction.

- ✓ Async content loads (data fetches, image loads)
- ✓ Multi-section page loading (load top content first, show placeholders for below-fold)
- ✓ Progressive enhancement (show skeleton immediately, replace with real content)
- ✗ Static content (no skeleton needed for page load)
- ✗ Short delays (<200ms, let user wait or show spinner instead)
- ✗ Errors (use empty state or error message instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-skeleton` | Base placeholder with shimmer animation | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Loading | Default | `<div class="comp-skeleton"></div>` |
| Done | Replace element | Remove skeleton, insert real content |

## Basic usage

```html
<!-- Simple text skeleton -->
<div class="comp-skeleton" style="width: 100%; height: 1rem; margin-bottom: 0.5rem;"></div>

<!-- Skeleton for heading -->
<div class="comp-skeleton" style="width: 60%; height: 1.5rem; margin-bottom: 1rem;"></div>

<!-- Skeleton for card content -->
<div class="comp-surface">
  <div class="comp-skeleton" style="width: 100%; height: 200px; margin-bottom: 1rem;"></div>
  <div class="comp-skeleton" style="width: 80%; height: 1rem; margin-bottom: 0.5rem;"></div>
  <div class="comp-skeleton" style="width: 100%; height: 1rem;"></div>
</div>

<!-- Skeleton list (3 rows) -->
<div style="display: grid; gap: 1rem;">
  <div class="comp-skeleton" style="height: 4rem;"></div>
  <div class="comp-skeleton" style="height: 4rem;"></div>
  <div class="comp-skeleton" style="height: 4rem;"></div>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** Skeleton is `<div>` — not interactive
- [x] **ARIA:** Mark as `aria-busy="true"` if region is loading
- [x] **Color:** Shimmer visible in dark mode and high-contrast
- [x] **Motion:** Respects `@media (prefers-reduced-motion: reduce)` — shows static placeholder
- [x] **Screen reader:** Wrap container with `aria-busy="true"` or live region announcement
- [x] **Replacement:** Replace skeleton with real content, not just hide it

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-busy="true"` | Wrapping container loading | `"true"` |
| `role="status"` | If live update of loading state | `"status"` |

## Reduced motion

Under `@media (prefers-reduced-motion: reduce)`:
- Shimmer animation pauses
- Static placeholder shown (no motion)
- Same visual opacity and shape

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-default` | Placeholder base color | Light gray |
| `--color-border-subtle` | Shimmer overlay color | Animated gradient |
| `--animation-duration` | Shimmer speed | ~1.2s (0ms if reduced-motion) |
| `--radius-*` | Border radius | Matches real content shape |

## AI / machine-readable notes

- **Selector pattern:** `comp-skeleton` base, no modifiers
- **Size:** Use inline `style="width: ... height: ..."` to match expected content dimensions
- **Timing:** Replace skeleton when real content ready, not on timer
- **Screen reader:** Wrap in `<div aria-busy="true">...</div>` during load
- **Copy-paste use:** Duplicate skeleton div structure to match expected layout depth; replace once content loads
