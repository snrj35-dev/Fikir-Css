# Timeline

> Support level: **Supported** | Surface key: `component.timeline`

## Classes

| Class | Role |
|-------|------|
| `timeline` | List wrapper |
| `timeline-item` | Single event row |
| `timeline-marker` | Dot connector |
| `timeline-content` | Content area with vertical line |
| `timeline-title` | Event heading |
| `timeline-meta` | Date/author metadata |

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

## Implementation note

The vertical connector line is drawn via `border-left` on `timeline-content`. The **last** `timeline-item`'s content automatically hides the line via CSS:

```css
.timeline-item:last-child .timeline-content {
  border-left-color: transparent;
}
```

No extra class or markup needed.

## Accessibility

- Use `<ol>` for chronological/ordered events, `<ul>` for unordered activity feeds
- `timeline-marker` is purely decorative — `aria-hidden="true"`
- Each `timeline-title` should be meaningful without surrounding context
- For screen readers, `timeline-meta` (date/author) follows the title naturally
