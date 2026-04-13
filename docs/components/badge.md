# Badge

> Support level: **Supported** | Surface key: `component.badge`

## Classes

| Class | Role |
|-------|------|
| `badge` | Base — pill-shaped label |
| `badge-primary` | Primary/accent tone |
| `badge-neutral` | Muted/secondary tone |
| `badge-success` | Success tone |
| `badge-warning` | Warning tone |
| `badge-danger` | Error/destructive tone |
| `badge-info` | Informational tone |

## Basic usage

```html
<span class="badge badge-primary">New</span>
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-danger">Overdue</span>
<span class="badge badge-neutral">Draft</span>
<span class="badge badge-info">Beta</span>
```

## In context

```html
<!-- In a table cell -->
<td><span class="badge badge-success">Paid</span></td>

<!-- On a nav item (count) -->
<a href="/inbox" class="side-link">
  Inbox <span class="badge badge-primary" aria-label="5 unread">5</span>
</a>
```

## Accessibility

- Badges are inline labels — they do not need `role`
- If a badge conveys status that should be announced, add `aria-label` with full context: `aria-label="Status: Active"`
- Do not rely on color alone — the text label is required
