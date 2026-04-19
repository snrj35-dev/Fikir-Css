# Field

> Support level: **Supported** | Surface key: `component.field` | Canonical: `.field`

## When to use

Wrapper container for form inputs with built-in label, helper text, and error message support. Foundation for all single-input form layouts.

- ✓ Single text/email/password/number inputs
- ✓ Select, textarea, or any form control
- ✓ With label and optional helper/error text
- ✓ Consistent form field spacing and alignment
- ✗ Multi-input groups (use `input-group` for checkboxes, radio buttons together)
- ✗ Fieldsets with multiple unrelated inputs (group logically, use `field` for each input)
- ✗ Standalone inputs without labels (always wrap with label)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `field` | Form field container — wraps input + label + help | n/a |
| `label` | Label element inside field | n/a |
| `input`, `textarea`, or `select` | Input element (input, textarea, select) | n/a |
| `helper-text` | Optional helper text below input | n/a |
| `error-text` | Error message (shown when invalid) | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Valid (default) | — | .field with valid input inside |
| Invalid | `aria-invalid="true"` on input | Input has red border; error text shown |
| Disabled | `disabled` on input | Input greyed out; label muted |
| Required | Visual indicator on label | `<abbr title="required">*</abbr>` or similar |

## Basic usage

```html
<!-- Simple field with label and input -->
<div class="field">
  <label class="label" for="email">Email address</label>
  <input 
    type="email" 
    id="email" 
    class="input"
    placeholder="you@example.com"
  >
</div>

<!-- Field with helper text -->
<div class="field">
  <label class="label" for="password">Password</label>
  <input 
    type="password" 
    id="password" 
    class="input"
    aria-describedby="pwd-hint"
  >
  <div class="helper-text" id="pwd-hint">
    Must be at least 8 characters with uppercase, lowercase, and numbers.
  </div>
</div>

<!-- Field with error message (after validation) -->
<div class="field">
  <label class="label" for="name">Full name</label>
  <input 
    type="text" 
    id="name" 
    class="input"
    aria-invalid="true"
    aria-describedby="name-error"
    value="Jo"
  >
  <div class="error-text" id="name-error" role="alert">
    Name must be at least 3 characters.
  </div>
</div>

<!-- Required field -->
<div class="field">
  <label class="label" for="phone">
    Phone number
    <abbr title="required">*</abbr>
  </label>
  <input 
    type="tel" 
    id="phone" 
    class="input"
    required
  >
</div>
```

## With different input types

```html
<!-- With textarea -->
<div class="field">
  <label class="label" for="bio">Bio</label>
  <textarea id="bio" class="textarea"></textarea>
</div>

<!-- With select -->
<div class="field">
  <label class="label" for="role">Role</label>
  <select id="role" class="select">
    <option>-- Select a role --</option>
    <option>Admin</option>
    <option>User</option>
  </select>
</div>

<!-- With number input -->
<div class="field">
  <label class="label" for="age">Age</label>
  <input 
    type="number" 
    id="age" 
    class="input"
    min="0" max="120"
  >
</div>
```

## Accessibility checklist

- [x] **Label association:** Every input has `<label>` with matching `for="id"`
- [x] **Semantic HTML:** Uses `<label>`, `<input>`, `<div>` appropriately
- [x] **Error announcements:** Error text has `role="alert"` for screen reader notification
- [x] **Help text:** Helper text uses `aria-describedby` to link to input
- [x] **Invalid state:** Input has `aria-invalid="true"` when validation fails
- [x] **Required indication:** Visual `*` paired with `required` attribute
- [x] **Keyboard:** Tab through inputs, Enter to submit, Shift+Tab to previous

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Move to next input in field |
| Shift+Tab | Move to previous input |
| Enter (in last field) | Submit form if available |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-invalid` | Input validation fails | `"true"` |
| `aria-describedby` | Helper or error text present | ID of `.comp-field-hint` or `.comp-field-error` |
| `aria-label` | If no visible label (rare) | Descriptive field label |
| `required` | Field is mandatory | `required` attribute |

## Density modes

Field spacing (gap between label and input) scales with `[data-density]`:

| Density | Label-to-input gap |
|---------|-------------------|
| `compact` | 0.25rem |
| `default` | 0.5rem |
| `comfortable` | 0.75rem |

Input inside field scales independently with its own density token.

## Shape and theme

- **Shape:** Input inside field adapts to `[data-shape="sharp" | "default" | "rounded"]`
- **Theme:** Field label and error text adapt to `[data-theme="light" | "dark" | "high-contrast"]`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-fg-default` | Label text color | Main foreground |
| `--color-fg-danger` | Error text color | Red for invalid state |
| `--space-*` | Gap between label and input | Scales with density |
| `--font-size-sm` | Label and error text size | Slightly smaller than input |

## AI / machine-readable notes

- **Selector pattern:** .field wrapper, with child selectors `.comp-field-label`, `.comp-field-input`, `.comp-field-hint`, `.comp-field-error`
- **Structure:** Always label → input → optional hint/error (top-to-bottom order)
- **Validation:** Use `aria-invalid="true"` + `aria-describedby` for error linking
- **Helper text:** `.comp-field-hint` for non-error guidance; visible always or on focus
- **Error messages:** `.comp-field-error` with `role="alert"` for validation failures only
- **Required:** Pair `required` HTML attribute with visual indicator (e.g., asterisk)
- **Copy-paste use:** Replace `id`, input `type`, `placeholder`, and label text; structure unchanged

## Related patterns

- **Label:** Standalone label component for custom layouts
- **Helper-text:** Separate component for hint/guidance text
- **Error-text:** Separate component for validation messages
- **Input-group:** Multiple inputs/controls in one logical group
