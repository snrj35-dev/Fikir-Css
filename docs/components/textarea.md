# Textarea

> Support level: **Supported** | Surface key: `component.textarea` | Canonical root: `.textarea`

## Status

Supported. Use for multi-line freeform input such as comments, notes, descriptions, and feedback.

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `textarea` | Root textarea control | `textarea` |

## Form state contract

| State | Trigger | CSS selector |
|-------|---------|--------------|
| Invalid | `aria-invalid="true"` | `.textarea[aria-invalid="true"]` |
| Disabled | `disabled` | `.textarea[disabled]` |
| Read-only | `readonly` | `.textarea[readonly]:not([disabled])` |
| Required | `required` | semantic/native form state |

For a full field-level error state, pair the control with `.field[data-invalid="true"]`.

## Basic usage

```html
<div class="field">
  <label class="label" for="notes">Internal notes</label>
  <textarea class="textarea"
            id="notes"
            rows="5"
            aria-describedby="notes-hint"></textarea>
  <p class="helper-text" id="notes-hint">Visible only to your team.</p>
</div>
```

## Invalid state

```html
<div class="field" data-invalid="true">
  <label class="label" for="review">Review</label>
  <textarea class="textarea"
            id="review"
            rows="4"
            aria-invalid="true"
            aria-describedby="review-error"></textarea>
  <p class="error-text" id="review-error" role="alert">Review must be at least 20 characters.</p>
</div>
```

## Read-only and disabled states

```html
<textarea class="textarea" readonly aria-label="Read-only notes">Imported from CRM.</textarea>
<textarea class="textarea" disabled aria-label="Disabled notes">Locked by workflow.</textarea>
```

## CSS custom properties

Textarea does not expose dedicated component variables.

## Tokens used

| Token | Role |
|-------|------|
| `--color-bg-surface` | Background |
| `--color-bg-default` | Disabled/read-only background |
| `--color-fg-default` | Text color |
| `--color-fg-muted` | Disabled/read-only text |
| `--color-border-subtle` | Default border |
| `--color-accent` | Focus border |
| `--color-danger` | Invalid border |
| `--radius-md` | Border radius |
| `--space-3` | Padding |

## Accessibility checklist

- Pair with a visible label.
- Use `aria-describedby` for helper or error text.
- Use `readonly` when value should remain selectable.
- Keep native resize unless there is a strong product reason to disable it.

## AI notes

- Canonical selector is `.textarea`.
- Invalid state uses `aria-invalid="true"`.
- `readonly` and `disabled` are distinct and intentionally styled differently.
- Use `.field[data-invalid="true"]` when showing wrapper-level error UI.

## Related components

- `field`
- `input`
- `helper-text`
- `error-text`
