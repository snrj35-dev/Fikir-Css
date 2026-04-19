---
title: Inline Notice RFC (M16.7)
description: Inline notice / status banner for page-level messaging (success, warning, danger, info)
version: 0.1
status: draft
---

# Inline Notice RFC

## Overview

**Inline Notice** is a component for page-level or section-level status and informational messaging. Unlike toast (position: fixed, temporary), inline notices are part of the document flow. Unlike alert (semantic warning container), inline notices use tone-based styling.

## Canonical Class Surface

```text
.inline-notice             (root, flex container)
.inline-notice-icon        (icon/status indicator slot)
.inline-notice-title       (heading slot)
.inline-notice-body        (description/content slot)
.inline-notice-actions     (action buttons/links slot)
.inline-notice-close       (dismiss button, optional)
```

## State Representation

### Tone (Required)

Semantic tone via `data-tone` attribute (mutually exclusive):

```html
<div class="inline-notice" data-tone="success|warning|danger|info">
  <!-- content -->
</div>
```

- `success` — Positive confirmation (action completed, validation passed)
- `warning` — Caution notice (deprecated feature, upcoming change, review recommended)
- `danger` — Critical alert (error, blocked action, data loss risk)
- `info` — Informational (tips, hints, contextual notes)

### Visibility (Optional)

Hide/show via `data-hidden="true|false"` or `hidden` attribute:

```html
<div class="inline-notice" data-tone="info" data-hidden="false">
  <!-- visible -->
</div>
```

## Layout Contract

### Horizontal Layout

Base structure with flexbox, left-to-right flow:

```
┌─────────────────────────────────────────┐
│ [icon]  [title]                 [close] │
│         [body]                          │
│         [actions]                       │
└─────────────────────────────────────────┘
```

- **Icon slot**: Optional, left-aligned, semantic indicator
- **Title slot**: Optional heading, supports inline text
- **Body slot**: Optional description or explanation
- **Actions slot**: Optional buttons/links for recovery or confirmation
- **Close button**: Optional dismissal control

### Density & Spacing

- Base padding: `var(--space-3)` (default)
- Gap between icon/content: `var(--space-2)`
- Gap within actions: `var(--space-2)`
- Border radius: `var(--radius-md)`
- Border: 1px, left: 4px (tone-specific color)

## CSS Layer

Defined in `@layer components`:

```css
/* Base: layout and structure */
.inline-notice {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid;
  border-left: 4px solid;
}

/* Tone variants */
.inline-notice[data-tone="success"] {
  background: var(--color-success-subtle);
  border-color: var(--color-success-muted);
  border-left-color: var(--color-success);
}
.inline-notice[data-tone="warning"] {
  background: var(--color-warning-subtle);
  border-color: var(--color-warning-muted);
  border-left-color: var(--color-warning);
}
.inline-notice[data-tone="danger"] {
  background: var(--color-danger-subtle);
  border-color: var(--color-danger-muted);
  border-left-color: var(--color-danger);
}
.inline-notice[data-tone="info"] {
  background: var(--color-info-subtle);
  border-color: var(--color-info-muted);
  border-left-color: var(--color-info);
}

/* Slots */
.inline-notice-icon { flex-shrink: 0; }
.inline-notice-title { 
  font-weight: 500;
  margin: 0;
}
.inline-notice-body { 
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-fg-default);
}
.inline-notice-actions { 
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.inline-notice-close { 
  margin-left: auto;
  flex-shrink: 0;
}

/* Visibility */
.inline-notice[data-hidden="true"] { display: none; }
```

## Accessibility Contract

### ARIA

- `role="status"` or `role="alert"` depending on tone:
  - `success`, `info`: `role="status"`
  - `warning`, `danger`: `role="alert"`
- `aria-live="polite"` for status, `aria-live="assertive"` for alerts
- `aria-atomic="true"` (entire notice is one atomic unit)
- Close button: `aria-label="Dismiss"` or `aria-label="Dismiss [tone] notice"`

### Keyboard

- Close button keyboard-accessible (native `<button>` element)
- Focus management: Focus returns to trigger or previous focus when dismissed
- Escape key: Optional close behavior (if implementing in JavaScript)

### Color Contrast

- Title and body text: 4.5:1 minimum contrast against background
- Icon: Semantic color (not just icon indicator; use background color as fallback)

## Related Components

- **Alert** (`alert.css`, `alert-rfc.md`) — Semantic warning container, broader scope
- **Toast** (`toast.css`, `toast-rfc.md`) — Temporary fixed-position notifications
- **Callout** (`callout.css`, `callout-rfc.md`) — Informational block, no tone variants
- **Badge** (`badge.css`) — Small status indicator, inline
- **Button** (`button.css`) — Actions within notice

## Recipes

### Validation Result

```html
<div class="inline-notice" data-tone="danger" role="alert" aria-live="assertive">
  <div class="inline-notice-icon" aria-hidden="true">⚠️</div>
  <div>
    <h3 class="inline-notice-title">Form validation failed</h3>
    <p class="inline-notice-body">Please correct the highlighted fields below.</p>
  </div>
</div>
```

### Settings Change Confirmation

```html
<div class="inline-notice" data-tone="success" role="status" aria-live="polite">
  <div class="inline-notice-icon" aria-hidden="true">✓</div>
  <div>
    <h3 class="inline-notice-title">Settings updated</h3>
    <p class="inline-notice-body">Your changes have been saved.</p>
  </div>
  <button class="inline-notice-close" aria-label="Dismiss">×</button>
</div>
```

### Deprecation Warning

```html
<div class="inline-notice" data-tone="warning" role="alert" aria-live="assertive">
  <div class="inline-notice-icon" aria-hidden="true">!</div>
  <div>
    <h3 class="inline-notice-title">Legacy API deprecated</h3>
    <p class="inline-notice-body">The `old-method()` function will be removed in v2.0.</p>
    <div class="inline-notice-actions">
      <a href="/migration-guide" class="btn btn-sm btn-outline">Migration guide</a>
    </div>
  </div>
</div>
```

## Token Dependencies

- `--color-success`, `--color-success-subtle`, `--color-success-muted`
- `--color-warning`, `--color-warning-subtle`, `--color-warning-muted`
- `--color-danger`, `--color-danger-subtle`, `--color-danger-muted`
- `--color-info`, `--color-info-subtle`, `--color-info-muted`
- `--color-fg-default`, `--color-fg-muted` (text)
- `--space-2`, `--space-3` (padding, gap)
- `--radius-md` (border-radius)
- `--font-size-sm` (body)

## Open Questions

1. Should close button always be present, or only when JavaScript-controlled?
   - **Decision**: Optional; static markup can omit. JavaScript can add on demand.
2. Should notices support `data-style="outline|soft"` variants?
   - **Decision**: Not in v0.2. All tones use soft (subtle bg + muted border) style.
3. Should there be a compact/comfortable density mode?
   - **Decision**: Yes, via `--space-compact` override (future M18 work).
4. Should notices be dismissible by default with Escape key?
   - **Decision**: No; dismiss behavior is opt-in via JavaScript (M17 browser-level work).

## Normativity

### MUST
- Root element must have `data-tone` attribute set to one of: `success`, `warning`, `danger`, `info`
- Title (if present) must be in `<h2>`, `<h3>`, or `<h4>` (not `<div>`)
- Icon must be wrapped in `<div class="inline-notice-icon" aria-hidden="true">` or removed
- Close button (if present) must be `<button>` with proper `aria-label`

### SHOULD
- Use semantic tone values that match actual message intent
- Include ARIA role (`status` or `alert`) and `aria-live` attribute
- Provide icon indicator matching tone (color + symbol, not icon alone)
- Use title to summarize message, body for explanation

### MAY
- Include action buttons in `inline-notice-actions` slot
- Use different border/background styling (custom CSS on top of base)
- Dismiss via button click or Escape key (future M17)

## Version History

- **v0.1** (2026-04-17) — Initial draft, 4 tones, flex layout, accessibility baseline
