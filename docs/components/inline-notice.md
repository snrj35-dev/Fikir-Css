---
title: Inline Notice
description: Semantic tone-based inline status and informational messaging component
token-coverage: success, warning, danger, info
a11y-checklist: ✓ role="status|alert", aria-live, aria-atomic
browser-tested: false
---

# Inline Notice

Inline notices display page-level or section-level status messages with semantic tone indication. Unlike toast (temporary, fixed position), inline notices are part of document flow and persist until dismissed or context changes.

## When to Use

Use inline notices for:

- **Form validation results** — Show success or error state after submission
- **Settings confirmations** — Confirm that changes were saved or applied
- **Deprecation warnings** — Alert users about deprecated features or upcoming changes
- **Informational tips** — Provide contextual help or important notes
- **Process status updates** — Show steps completed or current progress state

Do **not** use for:

- **Temporary toasts** — Use Toast for automatic dismissal
- **Semantic containers** — Use Alert for semantic warning blocks
- **Large content blocks** — Use Callout for longer explanatory content

## Structure

### Root Classes

```text
.inline-notice                  Root element with flex layout
  ├─ .inline-notice-icon        Icon/indicator slot
  ├─ .inline-notice-content     Text content wrapper
  │  ├─ .inline-notice-title    Heading slot
  │  └─ .inline-notice-body     Description slot
  ├─ .inline-notice-actions     Action buttons/links slot
  └─ .inline-notice-close       Close button (optional)
```

### States

```html
<!-- Tone: required -->
<div class="inline-notice" data-tone="success|warning|danger|info">

<!-- Visibility: optional -->
<div class="inline-notice" data-hidden="true|false">
```

## Tone Variants

### Success — Positive Confirmation

Use for successful actions, validation passes, or confirmations.

```html
<div class="inline-notice" data-tone="success" role="status" aria-live="polite">
  <div class="inline-notice-icon" aria-hidden="true">✓</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Changes saved</h3>
    <p class="inline-notice-body">Your settings have been updated successfully.</p>
  </div>
  <button class="inline-notice-close" aria-label="Dismiss success notice">×</button>
</div>
```

**Token colors:** `--color-success`, `--color-success-subtle`, `--color-success-muted`

---

### Warning — Caution Notice

Use for deprecated features, upcoming changes, or review recommendations.

```html
<div class="inline-notice" data-tone="warning" role="alert" aria-live="assertive">
  <div class="inline-notice-icon" aria-hidden="true">!</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Legacy API deprecated</h3>
    <p class="inline-notice-body">The <code>old-method()</code> function will be removed in v2.0. Plan your migration now.</p>
    <div class="inline-notice-actions">
      <a href="/docs/migration" class="btn btn-sm btn-outline">Migration guide</a>
      <button class="btn btn-sm btn-ghost" type="button">Dismiss</button>
    </div>
  </div>
</div>
```

**Token colors:** `--color-warning`, `--color-warning-subtle`, `--color-warning-muted`

---

### Danger — Critical Alert

Use for errors, blocked actions, or data loss risks.

```html
<div class="inline-notice" data-tone="danger" role="alert" aria-live="assertive">
  <div class="inline-notice-icon" aria-hidden="true">⚠️</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Form validation failed</h3>
    <p class="inline-notice-body">Please correct the highlighted fields below before submitting.</p>
  </div>
</div>
```

**Token colors:** `--color-danger`, `--color-danger-subtle`, `--color-danger-muted`

---

### Info — Informational

Use for tips, hints, or contextual notes.

```html
<div class="inline-notice" data-tone="info" role="status" aria-live="polite">
  <div class="inline-notice-icon" aria-hidden="true">ℹ️</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Tip: Use keyboard shortcuts</h3>
    <p class="inline-notice-body">Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save, or <kbd>Ctrl</kbd> + <kbd>Z</kbd> to undo.</p>
  </div>
</div>
```

**Token colors:** `--color-info`, `--color-info-subtle`, `--color-info-muted`

---

## Layout Patterns

### Icon-Only (Minimal)

```html
<div class="inline-notice" data-tone="success" role="status">
  <div class="inline-notice-icon" aria-hidden="true">✓</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Saved</h3>
  </div>
</div>
```

### With Description

```html
<div class="inline-notice" data-tone="warning" role="alert">
  <div class="inline-notice-icon" aria-hidden="true">!</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Action required</h3>
    <p class="inline-notice-body">Your subscription expires in 7 days.</p>
  </div>
</div>
```

### With Actions

```html
<div class="inline-notice" data-tone="danger" role="alert">
  <div class="inline-notice-icon" aria-hidden="true">⚠️</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">Delete account</h3>
    <p class="inline-notice-body">This action is permanent and cannot be undone.</p>
    <div class="inline-notice-actions">
      <button class="btn btn-danger btn-sm" type="button">Delete</button>
      <button class="btn btn-ghost btn-sm" type="button">Cancel</button>
    </div>
  </div>
</div>
```

### With Close Button

```html
<div class="inline-notice" data-tone="info" role="status">
  <div class="inline-notice-icon" aria-hidden="true">ℹ️</div>
  <div class="inline-notice-content">
    <h3 class="inline-notice-title">New feature available</h3>
    <p class="inline-notice-body">Try the new dashboard layout in settings.</p>
  </div>
  <button class="inline-notice-close" aria-label="Dismiss notification">×</button>
</div>
```

---

## Accessibility

### ARIA Attributes

Always include proper ARIA for screen readers:

```html
<!-- For positive/info messages -->
<div class="inline-notice" data-tone="success|info" 
     role="status" aria-live="polite" aria-atomic="true">

<!-- For warning/danger messages -->
<div class="inline-notice" data-tone="warning|danger" 
     role="alert" aria-live="assertive" aria-atomic="true">
```

- `role="status"` — For success/info notices (non-disruptive)
- `role="alert"` — For warning/danger notices (important)
- `aria-live="polite"` — Announce after user interaction completes
- `aria-live="assertive"` — Announce immediately (interrupting if needed)
- `aria-atomic="true"` — Read entire notice as one unit

### Icon Accessibility

Mark decorative icons as `aria-hidden`:

```html
<div class="inline-notice-icon" aria-hidden="true">✓</div>
```

If icon is semantic (not decorative), include in title or body text instead.

### Keyboard Navigation

- Close button must be keyboard-accessible `<button>` element
- Focus visible on buttons and links
- Tab order should be natural (left-to-right, top-to-bottom)

### Color Contrast

- All text meets 4.5:1 contrast ratio (WCAG AA)
- Icon color + background color meaningful (not icon shape alone)

---

## Form Integration

Show inline notices adjacent to form fields for validation feedback:

```html
<form>
  <div>
    <label for="email">Email</label>
    <input id="email" type="email" required />
    
    <!-- Show after validation failure -->
    <div class="inline-notice" data-tone="danger" role="alert">
      <div class="inline-notice-icon" aria-hidden="true">⚠️</div>
      <p class="inline-notice-body">Please enter a valid email address.</p>
    </div>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

---

## Settings Workflow Example

Show confirmation after saving settings:

```html
<section class="settings-panel">
  <!-- Success notice appears after save -->
  <div class="inline-notice" data-tone="success" role="status">
    <div class="inline-notice-icon" aria-hidden="true">✓</div>
    <div class="inline-notice-content">
      <h3 class="inline-notice-title">Settings saved</h3>
      <p class="inline-notice-body">Your preferences have been updated.</p>
    </div>
    <button class="inline-notice-close" aria-label="Dismiss">×</button>
  </div>

  <!-- Settings form -->
  <form>
    <fieldset>
      <legend>Notifications</legend>
      <label>
        <input type="checkbox" checked />
        Email notifications
      </label>
    </fieldset>
    <button type="submit" class="btn btn-primary">Save</button>
  </form>
</section>
```

---

## Result Status Example

Show result of action (success, error, or info):

```html
<div class="stack" style="--stack-gap: var(--space-3)">
  <!-- Success result -->
  <div class="inline-notice" data-tone="success" role="status">
    <div class="inline-notice-icon" aria-hidden="true">✓</div>
    <div class="inline-notice-content">
      <h3 class="inline-notice-title">Export completed</h3>
      <p class="inline-notice-body">Your data has been exported to CSV. Download begins automatically.</p>
    </div>
    <button class="inline-notice-close" aria-label="Dismiss">×</button>
  </div>

  <!-- Error result (alternative) -->
  <div class="inline-notice" data-tone="danger" role="alert">
    <div class="inline-notice-icon" aria-hidden="true">⚠️</div>
    <div class="inline-notice-content">
      <h3 class="inline-notice-title">Export failed</h3>
      <p class="inline-notice-body">The file could not be processed. Try a smaller dataset.</p>
    </div>
    <div class="inline-notice-actions">
      <button class="btn btn-sm btn-outline" type="button">Retry</button>
    </div>
  </div>
</div>
```

---

## Tone & Theme Variations

### Light Theme

| Tone | Background | Border | Text |
|------|------------|--------|------|
| Success | `--color-success-subtle` | `--color-success-muted` | `--color-fg-default` |
| Warning | `--color-warning-subtle` | `--color-warning-muted` | `--color-fg-default` |
| Danger | `--color-danger-subtle` | `--color-danger-muted` | `--color-fg-default` |
| Info | `--color-info-subtle` | `--color-info-muted` | `--color-fg-default` |

### Dark Theme

Same token names (theme-aware via design tokens).

### High Contrast

Borders emphasized, background saturation increased (handled by semantic tokens).

---

## Density & Spacing

Base density uses `--space-3` padding and `--space-2` gap. Override via CSS custom properties:

```css
.inline-notice {
  --inline-notice-padding: var(--space-compact); /* Compact mode */
  --inline-notice-gap: var(--space-1);
}
```

---

## Related Components

- **Alert** — semantic warning container for broader scope content
- **Toast** — temporary fixed-position notifications with auto-dismiss
- **Callout** — informational block container without tone variants
- **Badge** — small inline status indicator
- **Button** — action controls and close buttons within notices

---

## Token Reference

Semantic tone tokens:

```text
--color-success, --color-success-subtle, --color-success-muted
--color-warning, --color-warning-subtle, --color-warning-muted
--color-danger, --color-danger-subtle, --color-danger-muted
--color-info, --color-info-subtle, --color-info-muted
--color-fg-default, --color-fg-muted
```

Spacing and sizing:

```text
--space-1, --space-2, --space-3
--radius-md
--font-size-sm, --font-size-md
```

---

## AI & Machine-Readable Notes

**Component ID:** `inline-notice` (semantic tone-based inline messaging)

**Tones:** `success`, `warning`, `danger`, `info` (mutually exclusive via `data-tone`)

**Root selector:** `.inline-notice[data-tone="*"]`

**Slots:**
- `.inline-notice-icon` — Semantic status indicator (aria-hidden)
- `.inline-notice-title` — Heading (h2, h3, or h4)
- `.inline-notice-body` — Description text
- `.inline-notice-actions` — Button/link container
- `.inline-notice-close` — Dismiss button

**Accessibility:** Requires `role="status|alert"` and `aria-live="polite|assertive"`

**Browser Support:** All modern browsers (flex layout, CSS custom properties)

---

## Changelog

### v0.1 (2026-04-17)

Initial release with 4 semantic tones (success, warning, danger, info), flex layout, and accessibility baseline.
