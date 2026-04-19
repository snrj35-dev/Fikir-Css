# Card

> Support level: **Supported** | Surface key: `component.card`

## Classes

| Class | Role |
|-------|------|
| `card` | Base container |
| `card-flat` | Default flat surface |
| `card-subtle` | Lower-emphasis container on the default background |
| `card-elevated` | Elevated container with shadow |
| `card-interactive` | Hover/focus-responsive container |
| `card-p-sm` | Small padding |
| `card-p-md` | Medium padding |
| `card-p-lg` | Large padding |

## Basic usage

```html
<div class="card card-flat card-p-md" data-card-layout="stack">
  <h3 style="margin:0">Project overview</h3>
  <p style="margin:0">Deploy target: production. Last deploy: 2 hours ago.</p>
  <div data-card-slot="footer" class="cluster">
    <button class="btn btn-solid btn-primary btn-sm">View details</button>
    <button class="btn btn-outline btn-neutral btn-sm">Archive</button>
  </div>
</div>
```

## Variants

### Subtle

```html
<div class="card card-subtle card-p-md">
  <p style="margin:0">Simple content card without strong elevation.</p>
</div>
```

### Interactive / clickable card

```html
<a href="/projects/42" class="card card-interactive card-p-md" style="text-decoration:none;display:block">
  <h3 style="margin:0">My Project</h3>
  <p style="margin:.5rem 0 0;color:var(--color-fg-muted)">Click to open</p>
</a>
```

## Accessibility

- Cards are not interactive by default — no `role` needed
- For clickable cards, use `<a>` or `<button>` as the root element
- Use `data-card-slot="footer"` instead of legacy `card-footer`-style wrapper classes
