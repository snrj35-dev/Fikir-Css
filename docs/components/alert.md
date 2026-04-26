# Alert

> Support level: **Supported** | Surface key: `component.alert` | Canonical: `.alert`

## When to use

Inline contextual feedback message within the page flow.

- ✓ Form validation feedback (danger), success confirmations (success)
- ✓ Informational notices that don't block the user (info)
- ✓ Non-dismissible warnings about current page state (warning)
- ✗ Page-level banners that span the full width — use `inline-notice`
- ✗ Transient ephemeral messages — use `toast`
- ✗ Blocking error pages — use `result` component

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `alert` | Base wrapper | n/a |
| `alert-info` | Informational tone | default soft or `data-style="outline"` |
| `alert-success` | Success/positive tone | default soft or `data-style="outline"` |
| `alert-warning` | Warning/caution tone | default soft or `data-style="outline"` |
| `alert-danger` | Error/destructive tone | default soft or `data-style="outline"` |
| `alert-title` | Bold heading line | First child of `.alert` |
| `alert-description` | Body text / detail | Follows `alert-title` |

Style modifier (on `.alert` element):

| Attribute | Effect |
|-----------|--------|
| _(none)_ | Default soft tinted background |
| `data-style="outline"` | Border-only with transparent background |

## Basic usage

```html
<div class="alert alert-info" role="alert">
  <p class="alert-title">Heads up</p>
  <p class="alert-description">Your subscription renews in 3 days.</p>
</div>

<div class="alert alert-success" role="alert">
  <p class="alert-title">Saved</p>
  <p class="alert-description">Your changes have been saved successfully.</p>
</div>

<div class="alert alert-warning" role="alert">
  <p class="alert-title">Action required</p>
  <p class="alert-description">Please verify your email address to continue.</p>
</div>

<div class="alert alert-danger" role="alert">
  <p class="alert-title">Error</p>
  <p class="alert-description">Failed to save changes. Please try again.</p>
</div>
```

## Style variants

```html
<!-- Default: soft tinted background -->
<div class="alert alert-info" role="alert">
  <p class="alert-title">Info</p>
</div>

<!-- Outline: border only -->
<div class="alert alert-danger" data-style="outline" role="alert">
  <p class="alert-title">Error</p>
  <p class="alert-description">Failed to save changes.</p>
</div>
```

## Non-urgent status (polite)

```html
<!-- Use role="status" for non-urgent, low-priority messages -->
<div class="alert alert-success" role="status">
  <p class="alert-title">Auto-saved</p>
</div>
```

## Accessibility checklist

- [x] **role="alert":** use for urgent messages that should be announced immediately
- [x] **role="status":** use for non-urgent, polite announcements (auto-save, informational)
- [x] **Color not only signal:** tone is reinforced by the title text, not color alone
- [x] **Title first:** `alert-title` must be the first child so screen readers announce it first
- [x] **No focus management:** static alerts do not steal focus; use `result` or `modal` for blocking errors

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="alert"` | Urgent error, warning, or critical notice | Announces immediately (assertive) |
| `role="status"` | Non-urgent informational or success message | Announces politely |

## Density modes

Alert padding scales with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Reduced padding |
| `default` | Standard padding |
| `comfortable` | Increased padding |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically
- **Motion:** Alert has no entrance animation by default; if added via JS show/hide, respect `prefers-reduced-motion`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-info-subtle` | Info tone background | Soft blue |
| `--color-success-subtle` | Success tone background | Soft green |
| `--color-warning-subtle` | Warning tone background | Soft amber |
| `--color-danger-subtle` | Danger tone background | Soft red |
| `--space-3`, `--space-4` | Padding | Scales with density |
| `--font-size-sm` | Description text size | |
| `--radius-md` | Border radius | Scales with shape |

## Anti-patterns

```html
<!-- ✗ Don't omit role — screen readers won't announce it -->
<div class="alert alert-danger">
  <p class="alert-title">Error</p>
</div>

## Related

- **`inline-notice`** — non-disruptive semantic feedback
- **`callout`** — contextual documentation notes
- **`toast`** — transient global notifications

<!-- ✓ Always include role -->
<div class="alert alert-danger" role="alert">
  <p class="alert-title">Error</p>
</div>

<!-- ✗ Don't use alert for toast-style transient messages -->
<div class="alert alert-success" role="alert">File uploaded!</div>

<!-- ✓ Use toast for ephemeral messages -->
```

## AI / machine-readable notes

- **Selector pattern:** `alert` base + one tone (`alert-info`, `alert-success`, `alert-warning`, `alert-danger`) + optional `data-style="outline"`
- **ARIA role:** always required — `role="alert"` (urgent) or `role="status"` (non-urgent)
- **Not dismissible:** alerts are static; for dismissible use `toast` or add a close button with JS
- **Copy-paste use:** substitute tone class and message text; class structure is stable
