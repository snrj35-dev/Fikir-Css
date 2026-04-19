# Input

> Support level: **Supported** | Surface key: `component.input` | Canonical: `.input`

## When to use

Single-line text input for collecting user data in forms.

- ✓ Text, email, password, search, URL, tel — all standard input types
- ✓ Used inside a `field` wrapper or standalone with `label` + `helper-text`
- ✗ Multi-line text — use `textarea`
- ✗ Numeric stepping — use `number-input`
- ✗ Time/date picking — use `time-picker` or `date-picker`
- ✗ Option selection — use `select`, `radio`, or `checkbox`

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `input` | Text input field — applies to `<input>` element | n/a |
| `label` | Form label — applies to `<label>` element | n/a |
| `helper-text` | Hint text below the input | n/a |
| `error-text` | Error message below the input | n/a |

> **Note:** `label`, `helper-text`, and `error-text` are companion classes used alongside `input`. For the full field wrapper pattern see the `field` component.

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<input class="input">` |
| Invalid | `aria-invalid="true"` | `<input class="input" aria-invalid="true">` |
| Disabled | `disabled` attribute | `<input class="input" disabled>` |
| Read-only | `readonly` attribute | `<input class="input" readonly>` |
| Focus | `:focus-visible` (automatic) | Outline ring visible |

## Basic usage

```html
<div class="field">
  <label class="label" for="email">Email address</label>
  <input class="input" type="email" id="email"
         placeholder="you@example.com"
         aria-describedby="email-hint" />
  <p class="helper-text" id="email-hint">We'll never share your email.</p>
</div>
```

## With error state

```html
<div class="field">
  <label class="label" for="username">Username</label>
  <input class="input" type="text" id="username"
         aria-invalid="true"
         aria-describedby="username-error"
         value="x" />
  <p class="error-text" id="username-error" role="alert">
    Username must be at least 3 characters.
  </p>
</div>
```

## Disabled state

```html
<div class="field">
  <label class="label" for="readonly-field">Account ID</label>
  <input class="input" type="text" id="readonly-field"
         value="ACC-00142" readonly />
  <p class="helper-text">Account ID cannot be changed.</p>
</div>
```

## Size variants

Input height scales via density — no size modifier classes. Use density tokens for compacted layouts.

## Accessibility checklist

- [x] **Label pairing:** every `input` must have a `<label>` linked via `for`/`id`
- [x] **Invalid state:** use `aria-invalid="true"` on the `input` — not a CSS-only class
- [x] **Error linkage:** `aria-describedby` links the input to its `error-text` element's `id`
- [x] **Helper text linkage:** `aria-describedby` should also reference `helper-text` `id` when present
- [x] **Focus visible:** `:focus-visible` ring visible in high-contrast and keyboard navigation
- [x] **Read-only:** use `readonly` attribute — not `disabled` — when value is viewable but not editable
- [x] **Touch targets:** at least 40px height in default density (32px compact, 44px+ comfortable)

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

## Density modes

Input height and padding scale with `[data-density]`:

| Density | Height |
|---------|--------|
| `compact` | ~32px |
| `default` | ~40px |
| `comfortable` | ~48px |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically
- **Motion:** Focus transition respects `prefers-reduced-motion`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border` | Input border color | Changes on focus/invalid |
| `--color-accent` | Focus outline color | Brand color |
| `--color-danger` | Invalid border color | Error state |
| `--color-bg-input` | Input background | Token from surface palette |
| `--space-2`, `--space-3` | Padding | Scales with density |
| `--font-size-sm` | Input text size | Scales with density |
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

- **Selector pattern:** `input` class on native `<input>` element; always paired with `label` class on `<label>`
- **Companion classes:** `helper-text` and `error-text` are adjacent siblings, not nested inside `input`
- **State indicators:** `aria-invalid="true"` for error, `disabled` for disabled, `readonly` for read-only
- **Field wrapper:** for full field layout (label + input + helper/error), use the `field` component
- **Copy-paste use:** substitute `id`/`for` values and placeholder text; class structure is stable
