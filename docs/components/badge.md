# Badge

> Support level: **Supported** | Surface key: `component.badge` | Canonical: `.badge`

## When to use

Compact inline label for status, category, or count indicators.

- ✓ Status labels (Active, Pending, Paid, Overdue)
- ✓ Category/tag labels on cards and list items
- ✓ Notification count bubbles on nav items
- ✓ Feature flags (Beta, New, Deprecated)
- ✗ Long multi-word phrases — use `alert` or `inline-notice` instead
- ✗ Interactive clickable labels — use `tag-chip` instead
- ✗ Primary call-to-action — use `button`

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `badge` | Base — pill-shaped label | n/a |
| `badge-solid` | Filled badge style | Composable with tones |
| `badge-soft` | Soft tinted badge style | Composable with tones |
| `badge-outline` | Outline badge style | Composable with tones |
| `badge-plain` | Text-first badge style | Composable with tones |
| `badge-primary` | Primary/accent tone | solid, soft, outline, plain |
| `badge-neutral` | Muted/secondary tone | solid, soft, outline, plain |
| `badge-success` | Success tone | solid, soft, outline, plain |
| `badge-warning` | Warning tone | solid, soft, outline, plain |
| `badge-danger` | Error/destructive tone | solid, soft, outline, plain |
| `badge-info` | Informational tone | solid, soft, outline, plain |

## Basic usage

```html
<span class="badge badge-solid badge-primary">New</span>
<span class="badge badge-soft badge-success">Active</span>
<span class="badge badge-soft badge-warning">Pending</span>
<span class="badge badge-outline badge-danger">Overdue</span>
<span class="badge badge-soft badge-neutral">Draft</span>
<span class="badge badge-plain badge-info">Beta</span>
```

## Tone / Style variants

```html
<!-- Solid — high-contrast filled -->
<span class="badge badge-solid badge-primary">Primary</span>
<span class="badge badge-solid badge-success">Success</span>
<span class="badge badge-solid badge-danger">Danger</span>

<!-- Soft — subtle tinted background (recommended for most uses) -->
<span class="badge badge-soft badge-success">Active</span>
<span class="badge badge-soft badge-warning">Pending</span>

<!-- Outline — border only -->
<span class="badge badge-outline badge-neutral">Draft</span>

<!-- Plain — text only -->
<span class="badge badge-plain badge-info">Beta</span>
```

## In context

```html
<!-- In a table cell -->
<td><span class="badge badge-soft badge-success">Paid</span></td>

<!-- On a nav item (count) -->
<a href="/inbox" class="link">
  Inbox <span class="badge badge-solid badge-primary" aria-label="5 unread">5</span>
</a>

<!-- On a card -->
<div class="card">
  <div>
    <span class="badge badge-soft badge-warning">Review needed</span>
  </div>
</div>
```

## Accessibility checklist

- [x] **Text label required:** never use color alone — the text must convey the status
- [x] **Screen reader context:** add `aria-label` with full context when text is abbreviated (e.g., `aria-label="5 unread messages"`)
- [x] **No interactive role:** badge is purely decorative/informational; not keyboard focusable
- [x] **Color not only signal:** shape + text + color together communicate state

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | Badge text is abbreviated or count-only | Full context string (e.g., `"3 new notifications"`) |
| `role="status"` | Badge content updates dynamically | Announce updates politely |

## Density modes

Badge font-size and padding scale with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Reduced padding and font size |
| `default` | Standard padding and font size |
| `comfortable` | Increased padding and font size |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically (pill shape is preserved in all modes)
- **Motion:** Badge has no transition animations

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-*` | Tone background and foreground | Semantic tone tokens |
| `--color-*-subtle` | Soft style background | Light variant of tone |
| `--font-size-xs` | Badge text size | Scales with density |
| `--space-1`, `--space-2` | Padding | Scales with density |
| `--radius-full` | Pill shape | Always full-radius |

## AI / machine-readable notes

- **Selector pattern:** `badge` base + one style (`badge-solid`, `badge-soft`, `badge-outline`, `badge-plain`) + one tone (`badge-primary`, `badge-success`, etc.)
- **Not interactive:** badges have no click/keyboard behavior; use `tag-chip` for interactive labels
- **State indicator:** use alongside interactive components to convey semantic state
- **Copy-paste use:** substitute tone class and text label; class structure is stable

## Related

- **`tag-chip`** — categorized labels with close actions
- **`kpi-card-trend`** — metric delta indicators
- **`avatar`** — can be decorated with badges
