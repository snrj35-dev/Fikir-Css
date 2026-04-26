# Page Header

> Support level: **Supported** | Surface key: `component.pageHeader` | Canonical root: `.page-header`

## Status

Supported. Use at the top of a page or dashboard section to pair page identity with primary actions.

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `page-header` | Root wrapper | `header` |
| `page-header-content` | Title / description area | `div` |
| `page-header-actions` | Action group | `div` |

## Basic usage

```html
<header class="page-header">
  <div class="page-header-content">
    <h1>Orders</h1>
    <p>Track shipments, refunds, and fulfillment status.</p>
  </div>

  <div class="page-header-actions">
    <button class="btn btn-outline btn-md" type="button">Export</button>
    <button class="btn btn-primary btn-md" type="button">New order</button>
  </div>
</header>
```

## Inside an app shell

```html
<main class="app-shell-main">
  <header class="page-header">
    <div class="page-header-content">
      <h1>Customers</h1>
      <p>Segment your accounts and review account health.</p>
    </div>

    <div class="page-header-actions">
      <button class="btn btn-ghost btn-md" type="button">Filter</button>
      <button class="btn btn-primary btn-md" type="button">Add customer</button>
    </div>
  </header>
</main>
```

## Variants and states

- Description optional: omit the supporting paragraph when the heading is enough
- Actions optional: omit `page-header-actions` for read-only pages
- Compact density: spacing tightens through shared density tokens; the structure stays the same

## CSS custom properties

Page Header does not define dedicated component variables. Customize through app-level tokens if needed.

## Tokens used

| Token | Role |
|-------|------|
| `--color-bg-surface` | Header background |
| `--color-fg-default` | Heading/content color |
| `--color-border-subtle` | Border |
| `--radius-md` | Rounded corners |
| `--space-2` / `--space-3` | Content spacing |

## Accessibility checklist

- Prefer `<header>` for page landmarks.
- Use a real heading (`<h1>` or section-appropriate heading level) inside `page-header-content`.
- Keep action button labels explicit.
- When the header introduces filters or search, label those controls normally; `page-header` does not add ARIA by itself.

## AI notes

- Canonical selectors are `page-header`, `page-header-content`, and `page-header-actions`.
- Do not invent `page-header-title`, `page-header-subtitle`, or `page-header-breadcrumb`; those are content decisions, not shipped classes.
- Put headings and supporting text directly inside `page-header-content`.
- Pair with `cluster`, `stack`, `breadcrumb`, or form components for richer page chrome.

## Related components

- `app-shell`
- `breadcrumb`
- `section-block`
