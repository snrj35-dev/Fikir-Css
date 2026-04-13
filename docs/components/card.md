# Card

> Support level: **Supported** | Surface key: `component.card`

## Classes

| Class | Role |
|-------|------|
| `card` | Container — border, radius, background |
| `card-header` | Top section (title + actions) |
| `card-title` | Heading inside header |
| `card-body` | Main content area |
| `card-footer` | Bottom section (metadata, actions) |

## Basic usage

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Project overview</h3>
  </div>
  <div class="card-body">
    <p>Deploy target: production. Last deploy: 2 hours ago.</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary btn-sm">View details</button>
    <button class="btn btn-outline btn-neutral btn-sm">Archive</button>
  </div>
</div>
```

## Variants

### Minimal (body only)

```html
<div class="card">
  <div class="card-body">
    <p>Simple content card without header or footer.</p>
  </div>
</div>
```

### Interactive / clickable card

```html
<a href="/projects/42" class="card" style="text-decoration:none;display:block">
  <div class="card-body">
    <h3 class="card-title">My Project</h3>
    <p class="text-muted">Click to open</p>
  </div>
</a>
```

## Accessibility

- Cards are not interactive by default — no `role` needed
- For clickable cards, use `<a>` or `<button>` as the root element
- `card-title` heading level should follow document hierarchy
