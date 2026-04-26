# Card

> Support level: **Supported** | Surface key: `component.card`

## When to use

Generic container for grouping related content into a distinct visual unit. Use for dashboard widgets, article previews, or complex form sections.

- ✓ Dashboard metric widgets
- ✓ Product or article summaries in a feed
- ✓ Grouping related form fields
- ✓ Complex interactive items with internal actions
- ✗ Simple semantic sections (use `section-block`)
- ✗ Layout only (use `stack`, `cluster`, or `surface`)
- ✗ Purely decorative borders (use `surface`)

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `card` | Root container | `article` or `div` |
| `card-flat` | Default flat surface | Modifier |
| `card-subtle` | Low-emphasis background | Modifier |
| `card-elevated` | Container with shadow | Modifier |
| `card-interactive` | Hover/focus state enabled | Modifier |

> Use `data-card-slot="footer"` for the trailing action area. Use `data-card-layout="stack"` or `"cluster"` for internal spacing.

## Basic usage

```html
<article class="card card-elevated card-p-md" data-card-layout="stack">
  <h3 style="margin:0">Project overview</h3>
  <p style="margin:0">Deploy target: production. Last deploy: 2 hours ago.</p>
  <div data-card-slot="footer" class="cluster">
    <button class="btn btn-solid btn-primary btn-sm">View details</button>
    <button class="btn btn-outline btn-neutral btn-sm">Archive</button>
  </div>
</article>
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

## Accessibility checklist

- [x] **Semantic HTML:** uses `<article>` for self-contained content, `<a>` for clickable cards
- [x] **Heading level:** includes a heading (`<h2>`-`<h6>`) to provide a landmark label
- [x] **Focus visible:** `card-interactive` has `:focus-visible` ring
- [x] **No redundant roles:** generic cards don't need a role; clickable cards are links
- [x] **ARIA:** if a card is purely decorative, use `role="presentation"`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Default background | Elevated from page bg |
| `--color-border-subtle` | Card border | Subtle separator |
| `--space-3`, `--space-4` | Padding | Scales with density |
| `--radius-md` | Corner radius | Scales with shape |
| `--shadow-md` | Card elevation | For `card-elevated` |

## AI / machine-readable notes

- **Selector pattern:** `card` base + one elevation (`card-flat`, `card-subtle`, `card-elevated`) + padding (`card-p-sm`, `card-p-md`, `card-p-lg`)
- **Slots:** use `data-card-slot="footer"` for actions; root uses `data-card-layout` for internal gap
- **Interactive state:** `card-interactive` adds hover/active transforms and focus ring
- **Responsive:** padding and radius scale via tokens; width is controlled by parent layout (grid/stack)

## Related

- **`surface`** — base container without card specific padding/border logic
- **`kpi-card`** — specialized card for dashboard metrics
- **`section-block`** — semantic page section with header/footer
