# Button

> Support level: **Supported** | Surface key: `component.btn`

## Classes

| Class | Role |
|-------|------|
| `btn` | Base — required on every button |
| `btn-primary` | Primary tone (accent color) |
| `btn-neutral` | Neutral/secondary tone |
| `btn-danger` | Destructive action tone |
| `btn-outline` | Outlined variant — combine with a tone modifier |
| `btn-sm` | Small size |
| `btn-md` | Medium size (default) |
| `btn-lg` | Large size |

## States

| State | How |
|-------|-----|
| Disabled | `disabled` attribute on `<button>` |
| Loading | Add `data-loading="true"` + `aria-busy="true"` |
| Active/pressed | `:active` pseudo (automatic) |
| Focus | `:focus-visible` ring (automatic) |

## Basic usage

```html
<button type="button" class="btn btn-primary">Save</button>
<button type="button" class="btn btn-neutral">Cancel</button>
<button type="button" class="btn btn-danger">Delete</button>
<button type="button" class="btn btn-outline btn-neutral">Secondary action</button>
```

## Sizes

```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary btn-md">Medium</button>
<button class="btn btn-primary btn-lg">Large</button>
```

## Disabled

```html
<button class="btn btn-primary" disabled>Disabled</button>
```

## As link

```html
<a href="/save" class="btn btn-primary btn-sm">Go to dashboard</a>
```

## Accessibility

- Always use `<button type="button">` for actions (not navigation)
- For navigation use `<a class="btn ...">` with an `href`
- `disabled` attribute prevents interaction and is announced by screen readers
- Focus ring is visible in high-contrast mode via `--color-accent`

## Tokens used

| Token | Role |
|-------|------|
| `--color-primary-500` | Primary tone background |
| `--color-accent` | Focus ring color |
| `--space-2`, `--space-4` | Vertical/horizontal padding |
| `--font-size-sm` | Button text size |
| `--radius-md` | Border radius |
| `--transition-duration-fast` | Hover/active transition |
