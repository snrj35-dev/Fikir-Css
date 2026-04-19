# Label

> Support level: **Supported** | Surface key: `component.label` | Canonical: `.comp-label`

## When to use

Semantic label text paired with form inputs. Use inside `field` component or standalone for custom layouts.

- ✓ Associated with inputs via `for="id"`
- ✓ Inside `field` container for standard layouts
- ✓ Standalone in custom form layouts
- ✗ As heading (use `<h3>` instead)
- ✗ For non-form text (use `<span>` or `<p>`)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-label` | Form label — semantic association with input | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<label class="comp-label" for="input-id">Label text</label>` |
| Disabled | Input is `disabled` | CSS shows muted color automatically |
| Required | Visual indicator | `<label>Label<abbr>*</abbr></label>` |

## Basic usage

```html
<!-- Simple associated label -->
<label class="comp-label" for="email">Email address</label>
<input type="email" id="email" class="comp-input">

<!-- Label with required indicator -->
<label class="comp-label" for="name">
  Name
  <abbr title="required">*</abbr>
</label>
<input type="text" id="name" class="comp-input" required>

<!-- Label inside field component (preferred) -->
<div class="comp-field">
  <label class="comp-label comp-field-label" for="role">User role</label>
  <select id="role" class="comp-input comp-select">
    <option>Admin</option>
    <option>User</option>
  </select>
</div>

<!-- Standalone custom layout -->
<div style="display: flex; align-items: center; gap: 1rem;">
  <label class="comp-label" for="agree" style="margin: 0;">
    <input type="checkbox" id="agree">
    I agree to terms
  </label>
</div>
```

## Accessibility checklist

- [x] **Label-input association:** `for="id"` matches input's `id`
- [x] **Semantic HTML:** Uses native `<label>` element
- [x] **Clickable area:** Full label text is clickable, not just checkbox/radio
- [x] **Screen reader:** Label text read when input focused
- [x] **Required clarity:** Visual `*` paired with `required` attribute if needed

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `for` (HTML attribute) | Always | ID of associated input element |

## Density modes

Label font size scales with `[data-density]`:

| Density | Font size |
|---------|-----------|
| `compact` | 0.75rem |
| `default` | 0.875rem |
| `comfortable` | 0.9375rem |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-fg-default` | Label text color | Main foreground |
| `--font-size-sm` | Label text size | Slightly smaller than input text |
| `--font-weight-medium` | Label weight | Slightly heavier than body text |

## AI / machine-readable notes

- **Selector pattern:** `comp-label` base, no modifiers
- **Association:** Always pair with `for="input-id"` attribute
- **Required marker:** Use `<abbr title="required">*</abbr>` for visual + semantic clarity
- **Responsive:** Font size scales with density; no breakpoints needed
- **Copy-paste use:** Set `for` to match input ID, replace label text

## Related patterns

- **Field:** Complete form field with label, input, hint, error
- **Helper-text:** Separate guidance text below input
- **Error-text:** Separate validation message
