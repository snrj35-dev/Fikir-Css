# Number Input

> Support level: **Supported** | Surface key: `component.numberInput` | Canonical: `.comp-number-input`

## When to use

Numeric input with optional spinner controls (up/down arrows) for incrementing/decrementing values.

- ✓ Quantities, prices, scores (numeric values)
- ✓ Inputs where up/down arrows help users adjust
- ✓ Constrained ranges (min/max values)
- ✓ Form fields requiring numbers
- ✗ Text input (use `input type="text"` instead)
- ✗ Decimals without constraints (use `input type="number"` plain)
- ✗ Very large numbers (JavaScript BigInt, use `input type="text"`)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-number-input` | Numeric input with spinner buttons | n/a |
| `comp-number-input-sm` | Small size (2.25rem) | Composable |
| `comp-number-input-md` | Medium size (2.5rem, default) | Composable |
| `comp-number-input-lg` | Large size (2.75rem) | Composable |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<input type="number" class="comp-number-input">` |
| Focus | `:focus-visible` (automatic) | Border color + outline visible |
| Spinner up | `:hover` on up arrow or up arrow button | Visual highlight |
| Spinner down | `:hover` on down arrow or down arrow button | Visual highlight |
| Disabled | `disabled` attribute | Opacity reduced, cursor not-allowed |
| Invalid | `aria-invalid="true"` | Red border |

## Basic usage

```html
<!-- Simple number input (in field) -->
<div class="comp-field">
  <label class="comp-label" for="quantity">Quantity</label>
  <input 
    type="number" 
    id="quantity" 
    class="comp-number-input comp-field-input"
    min="1" 
    max="100" 
    value="1"
  >
</div>

<!-- Price input with step -->
<div class="comp-field">
  <label class="comp-label" for="price">Price</label>
  <input 
    type="number" 
    id="price" 
    class="comp-number-input comp-field-input"
    min="0" 
    step="0.01" 
    placeholder="0.00"
    aria-label="Price in USD"
  >
</div>

<!-- Rating input (1–5) -->
<div class="comp-field">
  <label class="comp-label" for="rating">Rating</label>
  <input 
    type="number" 
    id="rating" 
    class="comp-number-input comp-field-input"
    min="1" 
    max="5" 
    step="1" 
    aria-label="Rate from 1 to 5"
  >
</div>

<!-- Input with spinner in group -->
<div class="comp-input-group">
  <input 
    type="number" 
    class="comp-number-input comp-field-input"
    min="0" 
    step="5" 
    placeholder="Enter value"
  >
  <span class="comp-input-group-addon">items</span>
</div>
```

## Constrained ranges

```html
<!-- Age input (0–150) -->
<input 
  type="number" 
  class="comp-number-input comp-field-input"
  min="0" 
  max="150" 
  placeholder="Age"
  aria-label="Age in years"
>

<!-- Percentage (0–100) -->
<input 
  type="number" 
  class="comp-number-input comp-field-input"
  min="0" 
  max="100" 
  step="1" 
  placeholder="0–100"
  aria-label="Percentage"
>

<!-- Temperature (with step) -->
<input 
  type="number" 
  class="comp-number-input comp-field-input"
  min="-50" 
  max="50" 
  step="0.1" 
  placeholder="°C"
  aria-label="Temperature in Celsius"
>
```

## Disabled and error states

```html
<!-- Disabled number input -->
<input 
  type="number" 
  class="comp-number-input comp-field-input"
  value="5"
  disabled
>

<!-- Invalid number input -->
<div class="comp-field">
  <label class="comp-label" for="invalid-qty">Quantity</label>
  <input 
    type="number" 
    id="invalid-qty" 
    class="comp-number-input comp-field-input"
    aria-invalid="true"
    aria-describedby="qty-error"
    value="0"
  >
  <div class="comp-error-text" id="qty-error" role="alert">
    Quantity must be at least 1.
  </div>
</div>
```

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to input |
| Shift+Tab | Navigate to previous element |
| Arrow Up | Increment value (by step) |
| Arrow Down | Decrement value (by step) |
| Ctrl+Arrow Up | Increment by 10 × step |
| Ctrl+Arrow Down | Decrement by 10 × step |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-invalid` | Validation fails | `"true"` |
| `aria-describedby` | Helper or error text | ID of helper/error element |
| `aria-label` | No visible label | Describe numeric value, e.g., "Age in years" |
| `min`, `max` | Constraints | HTML attributes for range validation |

## Accessibility checklist

- [x] **Semantic HTML:** Uses native `<input type="number">`
- [x] **Label:** Associated label via `<label for="id">` or `aria-label`
- [x] **Range:** `min` and `max` attributes define constraints
- [x] **Step:** `step` attribute controls increment/decrement size
- [x] **Keyboard:** Arrow Up/Down adjust value; Ctrl+Up/Down = 10× increment
- [x] **Screen reader:** Label read when focused; range/step announced
- [x] **Spinner controls:** Optional visual up/down arrows for mouse users

## Density modes

Number input height and font size scale with `[data-density]`:

| Density | Height | Font-size |
|---------|--------|-----------|
| `compact` | 2.25rem | 0.875rem |
| `default` | 2.5rem | 0.875rem |
| `comfortable` | 2.75rem | 0.9375rem |

## Shape and theme

- **Shape:** `[data-shape="sharp" | "default" | "rounded"]` — border-radius scales automatically
- **Theme:** Adapts to `[data-theme="light" | "dark" | "high-contrast"]` automatically

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-input` | Background | Input field background |
| `--color-border-default` | Border default | Subtle border |
| `--color-border-accent` | Border focus | Brand color on focus |
| `--color-border-danger` | Border invalid | Red on invalid state |
| `--space-*` | Padding | Scales with density |
| `--radius-*` | Border radius | Scales with shape |

## AI / machine-readable notes

- **Selector pattern:** `comp-number-input` on input element (uses `type="number"`)
- **Validation:** Use `min`/`max`/`step` HTML attributes; `aria-invalid` for JS validation
- **Spinner:** Browser-native up/down buttons; styling optional
- **Responsive:** Height/font scale with density; no breakpoint changes needed
- **Copy-paste use:** Adjust `min`, `max`, `step`, `placeholder`; structure unchanged

## Browser differences

- **Chrome/Firefox:** Native spinner buttons (↑↓) appear on right side
- **Safari:** Spinner buttons not visible by default (accessibility buttons still work)
- **Custom spinner:** Can be built with button pair and JavaScript (advanced)

## Related patterns

- **Input:** Single-line text input
- **Range slider:** Continuous numeric range with visual slider
- **Field:** Complete form field with label, input, helper, error
