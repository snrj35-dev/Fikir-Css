# Error Text

> Support level: **Supported** | Surface key: `component.errorText` | Canonical: `.comp-error-text`

## When to use

Validation error message shown below form inputs when validation fails. Appears in place of helper text.

- ✓ Form validation feedback
- ✓ Required field missing
- ✓ Invalid format (email, phone, date, etc.)
- ✓ Value out of range (too long, too short, out of bounds)
- ✓ Business rule violations (username taken, date in past, etc.)
- ✗ Informational messages (use helper-text instead)
- ✗ Success confirmations (use toast or inline success indicator)
- ✗ Warnings (use warning-level message, not error)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-error-text` | Validation error message container | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Visible | Input invalid (`aria-invalid="true"`) | `.comp-error-text[id]` shown with error text |
| Hidden | Input valid (no aria-invalid or "false") | CSS hides error message |

## Basic usage

```html
<!-- Error message in field -->
<div class="comp-field">
  <label class="comp-label" for="email">Email address</label>
  <input 
    type="email" 
    id="email" 
    class="comp-input"
    aria-invalid="true"
    aria-describedby="email-error"
    value="invalid-email"
  >
  <div class="comp-error-text" id="email-error" role="alert">
    Please enter a valid email address.
  </div>
</div>

<!-- Required field error -->
<div class="comp-field">
  <label class="comp-label" for="name">
    Name
    <abbr title="required">*</abbr>
  </label>
  <input 
    type="text" 
    id="name" 
    class="comp-input"
    aria-invalid="true"
    aria-describedby="name-error"
    value=""
  >
  <div class="comp-error-text" id="name-error" role="alert">
    Name is required.
  </div>
</div>

<!-- Length validation error -->
<div class="comp-field">
  <label class="comp-label" for="password">Password</label>
  <input 
    type="password" 
    id="password" 
    class="comp-input"
    aria-invalid="true"
    aria-describedby="pwd-error"
    value="short"
  >
  <div class="comp-error-text" id="pwd-error" role="alert">
    Password must be at least 8 characters long.
  </div>
</div>

<!-- Pattern/format error -->
<div class="comp-field">
  <label class="comp-label" for="username">Username</label>
  <input 
    type="text" 
    id="username" 
    class="comp-input"
    aria-invalid="true"
    aria-describedby="username-error"
    value="user@123!"
  >
  <div class="comp-error-text" id="username-error" role="alert">
    Username can only contain letters, numbers, and underscores.
  </div>
</div>

<!-- Business rule error (async validation) -->
<div class="comp-field">
  <label class="comp-label" for="username-async">Username</label>
  <input 
    type="text" 
    id="username-async" 
    class="comp-input"
    aria-invalid="true"
    aria-describedby="username-async-error"
    value="john_doe"
  >
  <div class="comp-error-text" id="username-async-error" role="alert">
    Username is already taken. Try "john_doe_123".
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses `role="alert"` for immediate announcement
- [x] **Linked to input:** Error ID used in input's `aria-describedby`
- [x] **Invalid state:** Input has `aria-invalid="true"` when error shown
- [x] **Screen reader:** Error message announced immediately when validation fails
- [x] **Clear language:** Error message explains what's wrong and how to fix
- [x] **Visual indicator:** Red text + icon, not color alone
- [x] **No code/jargon:** Errors use plain language (avoid "400", "invalid regex", etc.)

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-invalid` | Input validation fails | `"true"` |
| `aria-describedby` | On input | ID of `.comp-error-text` |
| `role` | On error text | `"alert"` (announces immediately) |
| `id` | On error text | Unique ID for linking |

## Error message best practices

| ✗ Avoid | ✓ Use instead |
|---------|--------------|
| "Error: Invalid input" | Explain what's wrong: "Email address is invalid" |
| "Validation failed" | Specific issue: "Password must contain uppercase letter" |
| "400 Bad Request" | User-friendly: "Something went wrong. Please try again." |
| Generic emoji 🔴 | Icon + text: "⚠️ Password is required" |
| "Try again" (on async error) | Suggest fix: "Username is taken. Try 'john_doe_123'" |

## Density modes

Error text font size scales with `[data-density]`:

| Density | Font size |
|---------|-----------|
| `compact` | 0.625rem |
| `default` | 0.75rem |
| `comfortable` | 0.8125rem |

## Theme modes

Error text color:
- **Light theme:** Red (danger color)
- **Dark theme:** Lighter red/pink (maintains contrast)
- **High-contrast:** High-contrast red with border/outline emphasis

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-danger` | Error text color | Brand danger/red |
| `--font-size-xs` | Error text size | Smaller than input text |
| `--space-*` | Gap above error text | Scales with density |

## AI / machine-readable notes

- **Selector pattern:** `comp-error-text` base, no modifiers
- **Always linked:** Error text connected via `aria-describedby` on the input
- **State:** Shown only when `aria-invalid="true"` on input
- **Screen reader:** `role="alert"` triggers immediate announcement on form submission
- **Replace helper:** Error replaces helper-text when validation fails
- **Copy-paste use:** Replace error message text, update input's `aria-describedby` ID

## Validation patterns

```html
<!-- Client-side (on blur) -->
<input 
  id="email"
  type="email"
  onchange="validate(this)"
  aria-invalid="false"
>

<!-- Server-side (on submit) -->
<input 
  id="username"
  aria-invalid="true"
  aria-describedby="username-error"
>
<div class="comp-error-text" id="username-error" role="alert">
  <!-- Server renders error message here -->
</div>

<!-- Async validation (e.g., username check) -->
<input 
  id="username"
  oninput="checkAvailability(this)"
  aria-invalid="false"
>
```

## Related patterns

- **Helper-text:** Non-error guidance text (shown always)
- **Field:** Complete form field with label, input, helper, error
- **Label:** Standalone label component
