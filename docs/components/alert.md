# Alert

> Support level: **Supported** | Surface key: `component.alert`

## Classes

| Class | Role |
|-------|------|
| `alert` | Base wrapper |
| `alert-info` | Informational tone |
| `alert-success` | Success tone |
| `alert-warning` | Warning tone |
| `alert-danger` | Error/destructive tone |
| `alert-title` | Bold heading line |
| `alert-description` | Body text |

## Basic usage

```html
<div class="alert alert-info" role="alert">
  <p class="alert-title">Heads up</p>
  <p class="alert-description">Your subscription renews in 3 days.</p>
</div>

<div class="alert alert-success" role="alert">
  <p class="alert-title">Saved</p>
</div>

<div class="alert alert-danger" role="alert">
  <p class="alert-title">Error</p>
  <p class="alert-description">Failed to save changes. Please try again.</p>
</div>
```

## Accessibility

- `role="alert"` announces the content to screen readers immediately
- Use `role="status"` for non-urgent messages (polite announcement)
- `alert-title` should be the first element inside `.alert`
