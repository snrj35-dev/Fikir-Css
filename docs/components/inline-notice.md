# Inline Notice

> Support level: **Supported** | Component key: `component.inlineNotice` | Canonical: `.inline-notice`

## When to use

Persistent status or informational messages embedded within the document flow. Unlike toasts, inline notices do not disappear automatically and are usually related to a specific section or form.

- ✓ Form validation results (success/error)
- ✓ Settings update confirmations
- ✓ Contextual warnings or tips
- ✓ Process status updates
- ✗ Temporary global alerts (use `toast`)
- ✗ Layout separators (use `divider` or `surface`)

## Canonical anatomy

| Class / Attribute | Role | Element |
|-------------------|------|---------|
| `.inline-notice` | Root container | `div` |
| `data-tone` | `"success" \| "warning" \| "danger" \| "info"` | Semantic variant |
| `.inline-notice-icon` | Status indicator | `div` (aria-hidden) |
| `.inline-notice-content` | Text wrapper | `div` |
| `.inline-notice-title` | Message heading | `h3` |
| `.inline-notice-body` | Detailed description | `p` |
| `.inline-notice-actions`| Button/link container | `div` |
| `.inline-notice-close` | Dismissal trigger | `button` |

## Basic usage

```html
<div class="inline-notice" data-tone="success" role="status" aria-live="polite">
  <div class="inline-notice-icon" aria-hidden="true">✓</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Changes saved</h3>
    <p class="inline-notice-body">Your profile has been updated successfully.</p>
  </div>
  <button class="inline-notice-close" aria-label="Dismiss notice">×</button>
</div>
```

## Variants

### Warning
```html
<div class="inline-notice" data-tone="warning" role="alert" aria-live="assertive">
  <div class="inline-notice-icon" aria-hidden="true">!</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Legacy API</h3>
    <p class="inline-notice-body">Support for v1.x will end in 30 days.</p>
    <div class="inline-notice-actions">
      <a href="/docs/migration" class="btn btn-sm btn-outline">Read more</a>
    </div>
  </div>
</div>
```

### Danger
```html
<div class="inline-notice" data-tone="danger" role="alert">
  <div class="inline-notice-icon" aria-hidden="true">⚠️</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Error</h3>
    <p class="inline-notice-body">Failed to sync data with the server.</p>
  </div>
</div>
```

## Accessibility checklist

- [x] **Roles:** Use `role="status"` for success/info and `role="alert"` for warning/danger
- [x] **Live regions:** Use `aria-live="polite"` or `"assertive"` based on urgency
- [x] **Atomic:** Set `aria-atomic="true"` so screen readers announce the whole block
- [x] **Dismissal:** Close button must have a clear `aria-label`
- [x] **Icons:** Decorative icons marked with `aria-hidden="true"`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-success-subtle` | Success background | Theme-aware |
| `--color-warning-subtle` | Warning background | Theme-aware |
| `--color-danger-subtle` | Danger background | Theme-aware |
| `--color-info-subtle` | Info background | Theme-aware |
| `--space-3` | Internal padding | Scales with density |
| `--radius-md` | Container corners | Standard component shape |

## AI / machine-readable notes

- **Selector pattern:** `.inline-notice` + `data-tone="[success|warning|danger|info]"`
- **Structure:** flex layout; icon is left-aligned; close button is right-aligned
- **State model:** visibility controlled by DOM presence or `[data-hidden="true"]` (if supported)
- **Slots:** `icon`, `title`, `body`, `actions`, `close`
- **Application responsibilities:** Manage dismissal logic (removing from DOM) and setting correct ARIA roles

## Related

- **`toast`** — temporary fixed-position notifications
- **`alert`** — broader semantic block containers
- **`badge`** — small inline status indicators
- **`callout`** — informational blocks without tone variants
