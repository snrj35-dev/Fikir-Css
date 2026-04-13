# Input

> Support level: **Supported** | Surface key: `component.input`

## Classes

| Class | Role |
|-------|------|
| `input` | Text input field |
| `label` | Form label |
| `helper-text` | Hint text below the input |
| `field-error` | Error message below the input |

## States

| State | How |
|-------|-----|
| Invalid | `aria-invalid="true"` on the `input` |
| Disabled | `disabled` attribute |
| Read-only | `readonly` attribute |

## Basic usage

```html
<div style="display:flex;flex-direction:column;gap:.25rem">
  <label class="label" for="email">Email address</label>
  <input class="input" type="email" id="email" placeholder="you@example.com" />
  <p class="helper-text">We'll never share your email.</p>
</div>
```

## With error state

```html
<div style="display:flex;flex-direction:column;gap:.25rem">
  <label class="label" for="username">Username</label>
  <input class="input" type="text" id="username" aria-invalid="true"
         aria-describedby="username-error" value="x" />
  <p class="field-error" id="username-error" role="alert">
    Username must be at least 3 characters.
  </p>
</div>
```

## Accessibility

- Always pair `<input>` with a `<label>` using `for`/`id`
- Use `aria-invalid="true"` for validation errors — not just a visual class
- `aria-describedby` links the input to its error/helper text
- `helper-text` should have `id` and be referenced by `aria-describedby`
