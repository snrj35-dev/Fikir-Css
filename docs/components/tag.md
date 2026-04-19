# Tag / Chip

> Support level: **Supported** | Surface key: `component.tag` | Canonical: `.comp-tag`

## When to use

Small label or removable tag. Categorize items or mark attributes.

- ✓ Filter tags / labels
- ✓ Skill tags
- ✓ Category badges
- ✓ Removable tags in input
- ✗ Status indicators (use result or toast)
- ✗ Buttons (use button instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-tag` | Tag container | n/a |
| `comp-tag-label` | Tag text | n/a |
| `comp-tag-close` | Removable button | Optional |
| `comp-tag-primary` | Primary variant | Accent color |
| `comp-tag-secondary` | Secondary variant | Muted color |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Tag shown |
| Removable | Close button present | X button shown |
| Active | Selected | Highlighted |
| Disabled | Unavailable | Grayed out |

## Basic usage

```html
<!-- Simple tag -->
<span class="comp-tag" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); color: var(--color-fg-base); border-radius: 1rem; font-size: 0.875rem; font-weight: 500;">
  <span class="comp-tag-label">JavaScript</span>
</span>

<!-- Removable tag -->
<span class="comp-tag" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem; font-size: 0.875rem;">
  <span class="comp-tag-label">React</span>
  <button class="comp-tag-close" type="button" aria-label="Remove React tag" style="background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 1rem; height: 1rem; font-size: 1rem;">×</button>
</span>

<!-- Primary variant -->
<span class="comp-tag comp-tag-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: var(--color-accent); color: white; border-radius: 1rem; font-size: 0.875rem; font-weight: 500;">
  <span class="comp-tag-label">Featured</span>
</span>

<!-- With icon -->
<span class="comp-tag" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem; font-size: 0.875rem;">
  <span style="font-size: 0.875rem;">🏷️</span>
  <span class="comp-tag-label">CSS</span>
</span>
```

## Tag group

```html
<div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
  <span class="comp-tag" style="display: inline-flex; align-items: center; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem; font-size: 0.875rem;">Design</span>
  <span class="comp-tag" style="display: inline-flex; align-items: center; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem; font-size: 0.875rem;">Development</span>
  <span class="comp-tag" style="display: inline-flex; align-items: center; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem; font-size: 0.875rem;">Testing</span>
</div>
```

## Removable input tags

```html
<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem;">
  <span class="comp-tag" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; background: var(--color-bg-subtle); border-radius: 1rem;">
    <span>JavaScript</span>
    <button class="comp-tag-close" type="button" aria-label="Remove tag" style="background: none; border: none; cursor: pointer; font-size: 1rem;">×</button>
  </span>
  <input type="text" placeholder="Add tag..." style="border: none; outline: none; flex: 1; min-width: 100px;">
</div>
```

## Accessibility checklist

- [x] **Semantic:** Uses `<span>` or `<button>` appropriately
- [x] **Close button:** Has `aria-label="Remove [tag name]"`
- [x] **Keyboard:** Close button focusable with Tab; activates with Enter/Space
- [x] **Readable:** Good contrast for text and background

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Focus close button |
| `Enter` / `Space` | Remove tag |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `aria-label` (close) | Remove action | "Remove [tag name]" |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-subtle` | Tag background | Default color |
| `--color-accent` | Primary variant | Highlight color |
| `--color-fg-base` | Tag text | Text color |
| `--space-*` | Tag padding | Scales with density |

## Sizes

- **Small:** 0.5rem padding, 0.75rem font (compact)
- **Medium:** 0.75rem padding, 0.875rem font (default)
- **Large:** 1rem padding, 1rem font (comfortable)

## Variants

- **Primary:** Accent color background
- **Secondary:** Muted background
- **Outline:** Border only, no fill
- **Removable:** Close (×) button
- **With icon:** Leading icon + text

## AI / machine-readable notes

- **Selector pattern:** `comp-tag` wrapper with `comp-tag-label` and optional `comp-tag-close` button
- **Removable:** Include close button with `aria-label="Remove [name]"`
- **Variants:** Primary (accent bg), secondary (muted bg), outline (border only)
- **Layout:** Inline-flex with wrap for groups
- **Copy-paste use:** Update label text and remove button aria-label

## Related patterns

- **Badge:** Fixed label without remove
- **Button:** Interactive action (not a label)
- **Input:** Text input with tag support
