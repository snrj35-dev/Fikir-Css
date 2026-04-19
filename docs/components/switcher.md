# Switcher

> Support level: **Supported** | Surface key: `component.switcher` | Canonical: `.comp-switcher`

## When to use

Responsive flex container that switches from row to column layout. Sidebar + main pattern.

- ✓ Sidebar + main content (switches on mobile)
- ✓ Two-column layout with breakpoint
- ✓ Responsive main + aside
- ✗ Fixed layouts (use grid instead)
- ✗ Complex responsive logic (use media queries)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-switcher` | Responsive flex wrapper | n/a |
| `comp-switcher-gap-md` | Medium gap (1rem) | Modifier |
| `comp-switcher-gap-lg` | Large gap (1.5rem) | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Row | Wide screen | Items in row |
| Column | Narrow screen | Items stack |

## Basic usage

```html
<!-- Sidebar + main (switches on narrow) -->
<div class="comp-switcher comp-switcher-gap-lg" style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
  <!-- Sidebar -->
  <aside style="flex: 0 0 250px; min-width: 250px;">
    <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="/" style="padding: 0.75rem; border-radius: 0.5rem;">Dashboard</a>
      <a href="/users" style="padding: 0.75rem; border-radius: 0.5rem;">Users</a>
    </nav>
  </aside>
  
  <!-- Main content -->
  <main style="flex: 1; min-width: 300px;">
    <h1>Dashboard</h1>
    <p>Main content here.</p>
  </main>
</div>

<!-- 2-column layout -->
<div class="comp-switcher comp-switcher-gap-md" style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <section style="flex: 1; min-width: 300px;">
    <h2>Primary</h2>
    <!-- main content -->
  </section>
  <aside style="flex: 0 0 250px; min-width: 250px;">
    <h3>Secondary</h3>
    <!-- sidebar content -->
  </aside>
</div>
```

## Responsive behavior

The switcher automatically switches from row to column when container width is too narrow to fit both items.

```html
<!-- At wide widths: row layout -->
<!-- sidebar (250px) | main (remaining) -->

<!-- At narrow widths: column layout -->
<!-- sidebar (full width) -->
<!-- main (full width) -->
```

## Accessibility checklist

- [x] **Semantic:** Uses semantic tags (aside, main, section)
- [x] **Responsive:** Adapts to screen width
- [x] **Flexible:** Doesn't force specific widths
- [x] **Mobile:** Stacks on narrow screens

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-*` | Gap | Scales with density |

## Gap presets

| Class | Gap | Use case |
|-------|-----|----------|
| `comp-switcher-gap-md` | 1rem | Standard spacing |
| `comp-switcher-gap-lg` | 1.5rem | Comfortable spacing |

## Variants

- **Default:** Sidebar + main
- **With gap:** md, lg spacing
- **Flexible:** Both columns grow equally

## AI / machine-readable notes

- **Selector pattern:** `comp-switcher` flex wrapper with `flex: 0 0 <width>` for fixed items and `flex: 1` for flexible items
- **Responsive:** Uses flex-wrap to auto-switch layout
- **Min-width:** Set `min-width` on children to control breakpoint
- **Gap:** Use `comp-switcher-gap-*` presets
- **Copy-paste use:** Update fixed widths (sidebar 250px) and min-widths

## Related patterns

- **Stack:** Vertical layout
- **Grid:** 2D layouts
- **Container:** Width constraint
