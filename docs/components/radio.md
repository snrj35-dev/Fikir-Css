# Radio

> Support level: **Supported** | Surface key: `component.radio` | Canonical: `.comp-radio`

## When to use

Single selection from a group of mutually exclusive options. User selects exactly one item.

- ✓ Choose one item from a list (payment method, shipping option, etc.)
- ✓ Mutually exclusive settings or preferences
- ✓ Form choices with 2–5 options (more than 5, use `select` instead)
- ✗ Multiple selections (use `checkbox` instead)
- ✗ Binary on/off toggle (use `switch` instead)
- ✗ Many options (>5, use `select` dropdown instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-radio` | Radio button input wrapper | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Unselected | Default | `<input type="radio" class="comp-radio">` |
| Selected | `:checked` or `checked` attribute | Visual dot shown inside circle |
| Disabled | `disabled` attribute | Grayed, not interactive |
| Focus | `:focus-visible` (automatic) | Outline ring visible |
| Hover | `:hover` (automatic) | Background highlight |

## Basic usage

```html
<!-- Simple radio group (fieldset required) -->
<fieldset>
  <legend>Choose a payment method:</legend>
  
  <label>
    <input type="radio" name="payment" value="card" class="comp-radio">
    Credit card
  </label>
  
  <label>
    <input type="radio" name="payment" value="paypal" class="comp-radio">
    PayPal
  </label>
  
  <label>
    <input type="radio" name="payment" value="bank" class="comp-radio">
    Bank transfer
  </label>
</fieldset>

<!-- Radio with helper text -->
<fieldset>
  <legend>Shipping method:</legend>
  
  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <span>
      <input type="radio" name="shipping" value="standard" class="comp-radio" checked>
      Standard (5–7 business days)
    </span>
    <span style="font-size: 0.75rem; color: var(--color-fg-muted); margin-left: 1.5rem;">
      Free shipping
    </span>
  </label>
  
  <label style="display: flex; flex-direction: column; gap: 0.25rem;">
    <span>
      <input type="radio" name="shipping" value="express" class="comp-radio">
      Express (2–3 business days)
    </span>
    <span style="font-size: 0.75rem; color: var(--color-fg-muted); margin-left: 1.5rem;">
      $15.00 additional
    </span>
  </label>
</fieldset>

<!-- Radio in field (single option) -->
<fieldset>
  <legend>Agree to terms:</legend>
  <label>
    <input type="radio" name="agree" value="yes" class="comp-radio">
    I agree
  </label>
  <label>
    <input type="radio" name="agree" value="no" class="comp-radio">
    I do not agree
  </label>
</fieldset>
```

## Vertical vs horizontal layout

```html
<!-- Vertical layout (default, most readable) -->
<fieldset>
  <legend>Options:</legend>
  <label>
    <input type="radio" name="option" value="a" class="comp-radio">
    Option A
  </label>
  <label>
    <input type="radio" name="option" value="b" class="comp-radio">
    Option B
  </label>
</fieldset>

<!-- Horizontal layout (for short labels) -->
<fieldset>
  <legend>Size:</legend>
  <div style="display: flex; gap: 1rem;">
    <label>
      <input type="radio" name="size" value="s" class="comp-radio">
      Small
    </label>
    <label>
      <input type="radio" name="size" value="m" class="comp-radio">
      Medium
    </label>
    <label>
      <input type="radio" name="size" value="l" class="comp-radio">
      Large
    </label>
  </div>
</fieldset>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses native `<input type="radio">` with `<fieldset>`+`<legend>`
- [x] **Grouped:** All related radios have same `name` attribute
- [x] **Label:** Each radio has associated `<label>` (implicit or explicit)
- [x] **Legend:** `<fieldset><legend>` describes the group
- [x] **Keyboard:** Tab/Shift+Tab to navigate group, Arrow keys to select within group
- [x] **Focus visible:** `:focus-visible` outline visible
- [x] **Disabled:** Non-interactive; excluded from tab order
- [x] **Color not only signal:** Dot + border color change, not just color

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to radio group |
| Arrow Up/Left | Select previous radio in group |
| Arrow Right/Down | Select next radio in group |
| Shift+Tab | Navigate to previous element |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `name` | Always (HTML attribute) | Shared name for grouped radios |
| `aria-label` | If label text is unclear | Descriptive label for radio option |

## Best practices

| ✗ Avoid | ✓ Use instead |
|---------|--------------|
| `<div role="radio">` | Use native `<input type="radio">` |
| Radios without fieldset | Wrap in `<fieldset><legend>` |
| Radio without label | Always provide label text |
| More than 5 radios | Use `<select>` dropdown instead |
| Horizontal layout for long text | Use vertical layout; wrap text if needed |

## Density modes

Radio size and label font scale with `[data-density]`:

| Density | Radio size | Label font |
|---------|-----------|-----------|
| `compact` | 16px × 16px | 0.875rem |
| `default` | 20px × 20px | 0.875rem |
| `comfortable` | 24px × 24px | 0.9375rem |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Radio background | Light surface |
| `--color-border-default` | Border | Subtle border |
| `--color-accent` | Selected dot & focus | Brand color |
| `--space-*` | Gap between radio and label | Scales with density |

## AI / machine-readable notes

- **Selector pattern:** `comp-radio` on input element
- **State:** `:checked` pseudo-class or `checked` HTML attribute
- **Grouping:** Radios with same `name` form a group; only one can be selected
- **Label:** Always include label text; use implicit (wrap radio in label) or explicit (`for="id"`) association
- **Fieldset:** Always wrap radio group in `<fieldset>` with descriptive `<legend>`
- **Copy-paste use:** Change `name` and `value` attributes, update label text

## Related patterns

- **Checkbox:** Multiple independent selections
- **Switch:** Binary on/off toggle
- **Select:** Single selection from many options (>5)
- **Segmented-control:** Visually emphasized radio alternative
