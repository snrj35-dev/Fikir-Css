# Checkbox

> Support level: **Supported** | Surface key: `component.checkbox` | Canonical root: `.checkbox`

## Status

Supported. Use for independent yes/no choices or multi-select lists.

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `checkbox` | Native checkbox control | `input[type="checkbox"]` |

## Form state contract

| State | Trigger | CSS selector |
|-------|---------|--------------|
| Invalid | `aria-invalid="true"` | `.checkbox[aria-invalid="true"]` |
| Disabled | `disabled` | `.checkbox[disabled]` |
| Required | `required` | semantic/native form state |

`readonly` is not part of the checkbox contract. Use `disabled` when the control must not change.

## Basic usage

```html
<div class="field">
  <label class="cluster" for="newsletter" style="--cluster-gap: var(--space-2)">
    <input class="checkbox" id="newsletter" type="checkbox" />
    <span>Subscribe to release updates</span>
  </label>
  <p class="helper-text">We send a maximum of two emails per month.</p>
</div>
```

## Required consent state

```html
<div class="field" data-invalid="true">
  <label class="cluster" for="terms" style="--cluster-gap: var(--space-2)">
    <input class="checkbox"
           id="terms"
           type="checkbox"
           required
           aria-invalid="true"
           aria-describedby="terms-error" />
    <span>I agree to the terms of service</span>
  </label>
  <p class="error-text" id="terms-error" role="alert">You must accept the terms to continue.</p>
</div>
```

## Disabled and grouped usage

```html
<fieldset class="field">
  <legend class="label">Notifications</legend>

  <label class="cluster" style="--cluster-gap: var(--space-2)">
    <input class="checkbox" type="checkbox" checked />
    <span>Product updates</span>
  </label>

  <label class="cluster" style="--cluster-gap: var(--space-2)">
    <input class="checkbox" type="checkbox" disabled />
    <span>Security alerts (managed by admin)</span>
  </label>
</fieldset>
```

## CSS custom properties

Checkbox does not expose dedicated component variables.

## Tokens used

| Token | Role |
|-------|------|
| `--color-accent` | Native accent color |
| `--color-primary-500` | Focus ring mix |
| `--color-danger` | Invalid outline |

## Accessibility checklist

- Pair each checkbox with visible text.
- Use `<fieldset>` and `<legend>` for related groups.
- Use `aria-invalid="true"` only for validation failures.
- Use `required` for consent-style mandatory checkboxes.

## AI notes

- Canonical selector is `.checkbox` on a native checkbox input.
- Invalid state is `aria-invalid="true"`, not a custom invalid class.
- Checkbox does not support `readonly`.
- Indeterminate remains a JS property (`input.indeterminate = true`), not a class or attribute contract.

## Related components

- `field`
- `radio`
- `switch`
