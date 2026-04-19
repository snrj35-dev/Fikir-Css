# Loading Overlay

> Support level: **Supported** | Surface key: `component.loadingOverlay` | Canonical: `.comp-loading-overlay`

## When to use

Full-screen or container-level overlay with spinner and optional message. Blocks user interaction while loading.

- ✓ Page-level loading (replacing entire content)
- ✓ Section-level loading (replacing content area)
- ✓ Data table refresh
- ✓ Modal dialog loading state
- ✗ Non-blocking notification (use `toast`)
- ✗ Brief operations (<500ms, just disable buttons)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-loading-overlay` | Overlay container | n/a |
| `comp-loading-overlay-spinner` | Spinner element | n/a |
| `comp-loading-overlay-message` | Optional message text | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Visible | Loading | Overlay shown, spinner animated |
| Hidden | Done | Overlay removed from DOM |

## Basic usage

```html
<!-- Full-page loading overlay -->
<div class="comp-loading-overlay" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.3); display: flex; align-items: center; justify-content: center; z-index: 9999;">
  <div style="background: var(--color-bg-surface); padding: 2rem; border-radius: 0.5rem; text-align: center;">
    <div class="comp-spinner comp-spinner-lg" role="status" aria-label="Loading..."></div>
    <p style="margin-top: 1rem; color: var(--color-fg-muted);">Loading...</p>
  </div>
</div>

<!-- Section-level loading overlay -->
<div style="position: relative;">
  <div style="opacity: 0.5; pointer-events: none;">
    <!-- Original content here -->
  </div>
  <div class="comp-loading-overlay" style="position: absolute; inset: 0; background: rgba(255, 255, 255, 0.8); display: flex; align-items: center; justify-content: center;">
    <div class="comp-spinner" role="status" aria-label="Loading section..."></div>
  </div>
</div>

<!-- With message -->
<div class="comp-loading-overlay" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center;">
  <div style="background: var(--color-bg-surface); padding: 2rem; border-radius: 0.5rem; text-align: center;">
    <div class="comp-spinner comp-spinner-lg" role="status" aria-label="Processing..."></div>
    <p class="comp-loading-overlay-message" style="margin-top: 1rem;">Processing your request...</p>
    <p style="font-size: 0.75rem; color: var(--color-fg-muted); margin-top: 0.5rem;">This may take a few minutes</p>
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `role="status"` on spinner
- [x] **Label:** aria-label describes what's loading
- [x] **No interaction:** Content behind is not interactive
- [x] **Focus:** Focus cannot move to content behind (disabled)
- [x] **Announcement:** Loading message announced to screen reader
- [x] **Dismissal:** If not auto-dismissing, provide cancel button

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role` | On spinner | `"status"` |
| `aria-label` | Always | Describe what's loading |
| `aria-busy` | On page/section | `"true"` |

## Loading overlay patterns

```html
<!-- Variant: Transparent overlay (lighter) -->
<!-- Variant: Centered card with spinner -->
<!-- Variant: Top progress bar instead of overlay -->
<!-- Variant: With cancel button -->
```

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-overlay` | Backdrop color | Semi-transparent black/white |
| `--color-bg-surface` | Content card | Surface color |

## AI / machine-readable notes

- **Selector pattern:** `comp-loading-overlay` wrapper with `comp-spinner` and `comp-loading-overlay-message` children
- **Positioning:** `position: fixed` for page-level, `position: absolute` for section-level
- **Backdrop:** Semi-transparent (0.3–0.5 opacity) to dim content
- **Spinner:** Centered with optional message below
- **Copy-paste use:** Update aria-label and message text

## Related patterns

- **Spinner:** Just the rotating animation (no overlay)
- **Progress:** For known-duration operations
- **Skeleton:** For incremental content loading
