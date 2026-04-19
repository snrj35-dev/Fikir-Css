# Helper Text

> Support level: **Supported** | Surface key: `component.helperText` | Canonical: `.comp-helper-text`

## When to use

Descriptive guidance text below form inputs. Shows user how to fill the field correctly (not for validation errors).

- ✓ Format hints (e.g., "Format: MM/DD/YYYY")
- ✓ Requirements guidance (e.g., "Must contain uppercase and numbers")
- ✓ Examples (e.g., "Example: john@company.com")
- ✓ Additional context (e.g., "Used for password recovery")
- ✗ Validation errors (use `error-text` instead)
- ✗ Required field indicators (use `required` attribute + visual marker in label)
- ✗ Long explanations (keep brief; use separate section if more detail needed)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-helper-text` | Guidance text container | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Visible | Default | `<div class="comp-helper-text" id="hint-id">...</div>` |
| Hidden (on error) | Input has `aria-invalid="true"` | CSS hides helper, shows error instead |

## Basic usage

```html
<!-- Helper text linked via aria-describedby -->
<div class="comp-field">
  <label class="comp-label" for="password">Password</label>
  <input 
    type="password" 
    id="password" 
    class="comp-input"
    aria-describedby="pwd-hint"
  >
  <div class="comp-helper-text" id="pwd-hint">
    Must be at least 8 characters with uppercase, lowercase, and numbers.
  </div>
</div>

<!-- Format hint -->
<div class="comp-field">
  <label class="comp-label" for="phone">Phone number</label>
  <input 
    type="tel" 
    id="phone" 
    class="comp-input"
    aria-describedby="phone-hint"
    placeholder="(123) 456-7890"
  >
  <div class="comp-helper-text" id="phone-hint">
    Format: (XXX) XXX-XXXX
  </div>
</div>

<!-- Usage example -->
<div class="comp-field">
  <label class="comp-label" for="domain">Custom domain</label>
  <input 
    type="text" 
    id="domain" 
    class="comp-input"
    aria-describedby="domain-hint"
    placeholder="mycompany"
  >
  <div class="comp-helper-text" id="domain-hint">
    Example: mycompany.com — only letters, numbers, and hyphens allowed
  </div>
</div>

<!-- Usage/context hint -->
<div class="comp-field">
  <label class="comp-label" for="recovery-email">Recovery email</label>
  <input 
    type="email" 
    id="recovery-email" 
    class="comp-input"
    aria-describedby="recovery-hint"
  >
  <div class="comp-helper-text" id="recovery-hint">
    Used to reset your password if locked out
  </div>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses `<div>` with role implied by context
- [x] **Link to input:** Helper text ID used in input's `aria-describedby`
- [x] **Screen reader:** Text read when input focused (via aria-describedby)
- [x] **Clear language:** Short, actionable guidance (not "info" or "additional details")
- [x] **Color not only signal:** Icon + text for format hints (e.g., "ℹ️ Format: ...")
- [x] **No duplication:** If requirement shown on label, don't repeat in helper

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-describedby` | On input | ID of `.comp-helper-text` |
| `id` | On helper text | Unique ID for linking |

## Density modes

Helper text font size scales with `[data-density]`:

| Density | Font size |
|---------|-----------|
| `compact` | 0.625rem |
| `default` | 0.75rem |
| `comfortable` | 0.8125rem |

## Theme modes

Helper text color:
- **Light theme:** Muted gray (subtle but readable)
- **Dark theme:** Lighter gray (maintains contrast)
- **High-contrast:** Higher contrast; optional icon for emphasis

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-fg-muted` | Helper text color | Lighter than main text |
| `--font-size-xs` | Helper text size | Smaller than input text |
| `--space-*` | Gap above helper text | Scales with density |

## AI / machine-readable notes

- **Selector pattern:** `comp-helper-text` base, no modifiers
- **Always linked:** Helper text must be connected via `aria-describedby` on the input
- **Context:** Contains actionable guidance, not warnings or errors
- **Screen reader:** Automatically read when input focused (via aria-describedby)
- **Copy-paste use:** Replace text content and update input's `aria-describedby` ID

## Related patterns

- **Error-text:** Validation error messages (shown on form submission)
- **Field:** Complete form field with label, input, helper, error
- **Label:** Standalone label component
