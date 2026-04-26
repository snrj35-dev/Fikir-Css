# Timeline

> Support level: **Supported** | Surface key: `component.timeline` | Canonical root: `.timeline`

## Status

Supported. Use for chronological events, release activity, order history, or audit trails.

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `timeline` | Event list wrapper | `ol` |
| `timeline-item` | Single event row | `li` |
| `timeline-marker` | Decorative marker | `span` |
| `timeline-content` | Event body | `div` |
| `timeline-title` | Event heading | `p` |
| `timeline-meta` | Secondary metadata | `p` |

## Basic usage

```html
<ol class="timeline">
  <li class="timeline-item">
    <span class="timeline-marker" aria-hidden="true"></span>
    <div class="timeline-content">
      <p class="timeline-title">Account created</p>
      <p class="timeline-meta">Jan 12, 2025 · by admin</p>
    </div>
  </li>
  <li class="timeline-item">
    <span class="timeline-marker" aria-hidden="true"></span>
    <div class="timeline-content">
      <p class="timeline-title">Plan upgraded to Pro</p>
      <p class="timeline-meta">Feb 3, 2025</p>
    </div>
  </li>
  <li class="timeline-item">
    <span class="timeline-marker" aria-hidden="true"></span>
    <div class="timeline-content">
      <p class="timeline-title">First production deploy</p>
      <p class="timeline-meta">Apr 1, 2025</p>
    </div>
  </li>
</ol>
```

## Activity feed variant

```html
<ul class="timeline" aria-label="Recent account activity">
  <li class="timeline-item">
    <span class="timeline-marker" aria-hidden="true"></span>
    <div class="timeline-content">
      <p class="timeline-title">Invoice paid</p>
      <p class="timeline-meta">5 minutes ago</p>
    </div>
  </li>
  <li class="timeline-item">
    <span class="timeline-marker" aria-hidden="true"></span>
    <div class="timeline-content">
      <p class="timeline-title">Seat added to workspace</p>
      <p class="timeline-meta">Yesterday</p>
    </div>
  </li>
</ul>
```

## Variants and states

- Ordered history: prefer `<ol>` for true chronology
- Activity feeds: `<ul>` is acceptable when exact ordering semantics are less important
- Decorative marker: keep `timeline-marker` `aria-hidden="true"`

## Implementation note

The vertical connector line is drawn via `border-left` on `timeline-content`. The **last** `timeline-item`'s content automatically hides the line via CSS:

```css
.timeline-item:last-child .timeline-content {
  border-left-color: transparent;
}
```

No extra class or markup needed.

## CSS custom properties

Timeline does not expose component-specific custom properties.

## Tokens used

| Token | Role |
|-------|------|
| `--color-primary-500` | Marker fill/border |
| `--color-bg-surface` | Marker outline ring |
| `--color-border-subtle` | Connector line |
| `--color-fg-default` | Title color |
| `--color-fg-muted` | Meta text |
| `--font-size-md` / `--font-size-sm` | Typography scale |
| `--space-2` / `--space-3` | Gaps and connector padding |

## Accessibility checklist

- Use `<ol>` for chronological/ordered events, `<ul>` for unordered activity feeds
- `timeline-marker` is purely decorative — `aria-hidden="true"`
- Each `timeline-title` should be meaningful without surrounding context
- For screen readers, `timeline-meta` (date/author) follows the title naturally

## AI notes

- Canonical selectors are `timeline`, `timeline-item`, `timeline-marker`, `timeline-content`, `timeline-title`, `timeline-meta`.
- Do not invent connector helper classes; the last-item line removal is built into the component CSS.
- Put the readable content inside `timeline-content`; the marker stays decorative.

## Related components

- `kpi-card`
- `stat`
- `table`
