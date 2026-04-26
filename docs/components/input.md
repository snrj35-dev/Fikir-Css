# Input

> Support level: **Supported** | Surface key: `component.input` | Canonical root: `.input`

## When to use

Single-line text input for collecting user data in forms.

- ✓ Text, email, password, search, URL, tel — all standard input types
- ✓ Used inside a `field` wrapper or standalone with `label` + `helper-text`
- ✗ Multi-line text — use `textarea`
- ✗ Numeric stepping — use `number-input`
- ✗ Time/date picking — use `time-picker` or `date-picker`
- ✗ Option selection — use `select`, `radio`, or `checkbox`

## Canonical anatomy

| Class | Role | Element |
|-------|------|---------|
| `input` | Text input field | `input` |
| `input-sm` | Small size modifier | `input` |
| `input-md` | Medium size modifier | `input` |
| `input-lg` | Large size modifier | `input` |

## Form state contract

| State | Trigger | CSS selector |
|-------|---------|--------------|
| Invalid | `aria-invalid="true"` | `.input[aria-invalid="true"]` |
| Disabled | `disabled` | `.input[disabled]` |
| Read-only | `readonly` | `.input[readonly]:not([disabled])` |
| Required | `required` | semantic/native form state |

For a full field-level error state, pair the control with `.field[data-invalid="true"]` and visible `.error-text`.

## Basic usage

```html
<div class="field">
  <label class="label" for="email">Email address</label>
  <input class="input input-md" type="email" id="email"
         placeholder="you@example.com"
         aria-describedby="email-hint" />
  <p class="helper-text" id="email-hint">We'll never share your email.</p>
</div>
```

## With error state

```html
<div class="field" data-invalid="true">
  <label class="label" for="username">Username</label>
  <input class="input input-md" type="text" id="username"
         aria-invalid="true"
         required
         aria-describedby="username-error"
         value="x" />
  <p class="error-text" id="username-error" role="alert">
    Username must be at least 3 characters.
  </p>
</div>
```

## Read-only and disabled states

```html
<div class="field">
  <label class="label" for="account-id">Account ID</label>
  <input class="input input-md" type="text" id="account-id"
         value="ACC-00142" readonly />
  <p class="helper-text">Account ID cannot be changed.</p>
</div>

<div class="field">
  <label class="label" for="team-name">Team name</label>
  <input class="input input-md" type="text" id="team-name"
         value="Northwind Ops" disabled />
</div>
```

## Size variants

```html
<input class="input input-sm" aria-label="Small input" />
<input class="input input-md" aria-label="Medium input" />
<input class="input input-lg" aria-label="Large input" />
```

## Accessibility checklist

- [x] **Label pairing:** every `input` must have a `<label>` linked via `for`/`id`
- [x] **Invalid state:** use `aria-invalid="true"` on the `input`
- [x] **Error linkage:** `aria-describedby` links the input to its `error-text` element's `id`
- [x] **Helper text linkage:** `aria-describedby` should also reference `helper-text` `id` when present
- [x] **Focus visible:** `:focus-visible` ring visible in high-contrast and keyboard navigation
- [x] **Read-only:** use `readonly` attribute — not `disabled` — when value is viewable but not editable
- [x] **Wrapper state:** use `.field[data-invalid="true"]` when the full field should read as invalid

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to input |
| Type | Enter text |
| Escape | Clear focus (browser default) |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-invalid` | Validation error | `"true"` |
| `aria-describedby` | Helper or error text present | ID(s) of `helper-text` / `error-text` element |
| `aria-required` | Field is required | `"true"` (or use `required` attribute) |
| `aria-label` | No visible `<label>` (avoid if possible) | Descriptive label text |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border` | Input border color | Changes on focus/invalid |
| `--color-accent` | Focus outline color | Brand color |
| `--color-danger` | Invalid border color | Error state |
| `--color-bg-input` | Input background | Token from surface palette |
| `--space-2`, `--space-3`, `--space-4` | Padding | Depends on size modifier |
| `--font-size-sm`, `--font-size-md`, `--font-size-lg` | Input text size | Depends on size modifier |
| `--radius-md` | Border radius | Scales with shape |

## Anti-patterns

```html
<!-- ✗ Don't use input without a label -->
<input class="input" type="text" placeholder="Email" />

<!-- ✓ Always pair with a label -->
<label class="label" for="email">Email</label>
<input class="input" type="email" id="email" />

<!-- ✗ Don't rely on JS class alone for invalid state -->
<input class="input" type="text" />

<!-- ✓ Use aria-invalid -->
<input class="input" type="text" aria-invalid="true" aria-describedby="err" />
<p class="error-text" id="err">Required field</p>
```

## AI / machine-readable notes

- **Selector pattern:** `input` + optional size modifier on native `<input>`
- **Companion classes:** `label`, `helper-text`, and `error-text` live outside the control
- **State indicators:** `aria-invalid="true"`, `disabled`, `readonly`, `required`
- **Field wrapper:** use `.field[data-invalid="true"]` when the entire field should read as invalid
- **Copy-paste use:** substitute `id`/`for` values and placeholder text; class structure is stable

## Related

- **`field`** — wrapping container that owns invalid/disabled state and groups label + control + help/error
- **`label`** — paired text label for the input
- **`helper-text`** — non-error guidance under the input
- **`error-text`** — validation error message linked via `aria-describedby`
- **`textarea`** — multi-line variant
- **`number-input`** — numeric stepper variant
- **`select`** — option-pick variant
