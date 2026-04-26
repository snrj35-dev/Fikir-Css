# Select

> Support level: **Supported** | Surface key: `component.select` | Canonical root: `.select`

## Status

Supported. Use native `<select>` for single-choice inputs where search is unnecessary and browser semantics should remain intact.

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `select` | Root select control | `select` |
| `select-sm` | Small size modifier | `select` |
| `select-md` | Medium size modifier | `select` |
| `select-lg` | Large size modifier | `select` |

## Form state contract

| State | Trigger | CSS selector |
|-------|---------|--------------|
| Invalid | `aria-invalid="true"` | `.select[aria-invalid="true"]` |
| Disabled | `disabled` | `.select[disabled]` |
| Required | `required` | semantic/native form state |

For a full field-level error state, pair the control with `.field[data-invalid="true"]` and visible `.error-text`.

## Basic usage

```html
<div class="field">
  <label class="label" for="role">Role</label>
  <select class="select select-md" id="role" aria-describedby="role-hint">
    <option value="">Select a role</option>
    <option value="admin">Admin</option>
    <option value="editor">Editor</option>
    <option value="viewer">Viewer</option>
  </select>
  <p class="helper-text" id="role-hint">Choose the permission level for this user.</p>
</div>
```

## Invalid and required state

```html
<div class="field" data-invalid="true">
  <label class="label" for="status">Status</label>
  <select class="select select-md"
          id="status"
          required
          aria-invalid="true"
          aria-describedby="status-error">
    <option value="">Select status</option>
    <option value="active">Active</option>
    <option value="paused">Paused</option>
  </select>
  <p class="error-text" id="status-error" role="alert">Status is required.</p>
</div>
```

## Disabled state

```html
<div class="field">
  <label class="label" for="region">Region</label>
  <select class="select select-md" id="region" disabled>
    <option>Europe (locked)</option>
  </select>
</div>
```

## Size variants

```html
<select class="select select-sm" aria-label="Small select"></select>
<select class="select select-md" aria-label="Medium select"></select>
<select class="select select-lg" aria-label="Large select"></select>
```

## CSS custom properties

Select does not expose dedicated component variables.

## Tokens used

| Token | Role |
|-------|------|
| `--color-bg-surface` | Control background |
| `--color-fg-default` | Text color |
| `--color-fg-muted` | Disabled text color |
| `--color-border-subtle` | Default border |
| `--color-accent` | Focus border |
| `--color-danger` | Invalid border |
| `--radius-md` | Border radius |
| `--space-2` / `--space-3` / `--space-4` | Horizontal padding by size |

## Accessibility checklist

- Use a visible `<label>` linked with `for`/`id`.
- Use `aria-invalid="true"` only when validation has actually failed.
- Link helper/error text with `aria-describedby`.
- Prefer native `<select>` semantics over custom menu behavior.

## AI notes

- Canonical state contract is `aria-invalid`, `disabled`, and `required` on the native `<select>`.
- Do not invent `data-disabled` or `data-readonly` for select.
- Use `.field[data-invalid="true"]` for wrapper-level invalid state when showing error text.

## Related components

- `field`
- `input`
- `checkbox`
- `combobox`
