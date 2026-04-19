# Input Group

> Support level: **Supported** | Surface key: `component.inputGroup` | Canonical: `.comp-input-group`

## When to use

Container for grouping related form inputs with visual unity. Combines inputs, labels, buttons, or addons into a cohesive unit.

- ✓ Input with prefix/suffix (currency symbol, unit)
- ✓ Search input with button
- ✓ Multiple checkboxes or radios together
- ✓ Input field with action button (reset, clear)
- ✗ Independent unrelated inputs (use `field` for each separately)
- ✗ Fieldset-level grouping (use `<fieldset>` wrapper instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-input-group` | Container for grouped inputs | n/a |
| `comp-input-group-addon` | Prefix/suffix element (label, icon, button) | n/a |
| `comp-input-group-input` | Input within group | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | Inputs display together |
| Focused | One input has focus | Visual focus ring on that input |
| Error | Input has `aria-invalid="true"` | Error styling on group |

## Basic usage

```html
<!-- Input with currency prefix -->
<div class="comp-input-group">
  <span class="comp-input-group-addon">$</span>
  <input type="number" class="comp-input-group-input comp-input" placeholder="0.00">
</div>

<!-- Search input with button -->
<div class="comp-input-group">
  <input 
    type="search" 
    class="comp-input-group-input comp-input" 
    placeholder="Search..."
    aria-label="Search products"
  >
  <button class="comp-button" type="submit">Search</button>
</div>

<!-- Input with clear button -->
<div class="comp-input-group">
  <input 
    type="text" 
    id="search" 
    class="comp-input-group-input comp-input"
    placeholder="Enter text"
  >
  <button 
    type="button" 
    class="comp-icon-button" 
    aria-label="Clear input"
    onclick="document.getElementById('search').value='';"
  >
    <svg width="1em" height="1em" viewBox="0 0 24 24">
      <path d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>
</div>

<!-- Input with unit suffix -->
<div class="comp-input-group">
  <input 
    type="number" 
    class="comp-input-group-input comp-input" 
    placeholder="Enter value"
    aria-label="Temperature in Celsius"
  >
  <span class="comp-input-group-addon">°C</span>
</div>

<!-- Multiple checkboxes in group -->
<fieldset>
  <legend>Preferences:</legend>
  <div class="comp-input-group" style="flex-direction: column;">
    <label>
      <input type="checkbox" class="comp-checkbox">
      Option 1
    </label>
    <label>
      <input type="checkbox" class="comp-checkbox">
      Option 2
    </label>
    <label>
      <input type="checkbox" class="comp-checkbox">
      Option 3
    </label>
  </div>
</fieldset>
```

## Addon patterns

```html
<!-- Icon addon (search) -->
<div class="comp-input-group">
  <svg class="comp-input-group-addon" width="1em" height="1em" viewBox="0 0 24 24">
    <circle cx="10" cy="10" r="6"/>
    <path d="m14 14 4 4"/>
  </svg>
  <input type="text" class="comp-input-group-input comp-input" placeholder="Search">
</div>

<!-- Text addon + input + button -->
<div class="comp-input-group">
  <span class="comp-input-group-addon">https://</span>
  <input type="text" class="comp-input-group-input comp-input" placeholder="example.com">
  <button type="button" class="comp-button">Visit</button>
</div>

<!-- Separated input + button -->
<div style="display: flex; gap: 0.5rem;">
  <input type="text" class="comp-input" placeholder="Paste URL here" style="flex: 1;">
  <button type="button" class="comp-button">Fetch</button>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses `<input>`, `<button>`, `<span>` appropriately
- [x] **Label:** Inputs in group have associated label or `aria-label`
- [x] **Keyboard:** Tab navigates through inputs and buttons in order
- [x] **Focus visible:** `:focus-visible` visible on focused input
- [x] **Color not only signal:** Icon + text or position indicates addon role
- [x] **Screen reader:** Addon text or aria-label describes purpose
- [x] **Touch targets:** Buttons/icons ≥44px in comfortable density

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | Input has no visible label | Describe input purpose, e.g., "Search products" |
| `aria-labelledby` | If group has label element | ID of group label |

## Density modes

Input group spacing and internal padding scale with `[data-density]`:

| Density | Padding between items |
|---------|----------------------|
| `compact` | 0.25rem |
| `default` | 0.5rem |
| `comfortable` | 0.75rem |

## Shape and theme

- **Shape:** Inputs inside group adapt to `[data-shape="sharp" | "default" | "rounded"]`
- **Theme:** Addons adapt to `[data-theme="light" | "dark" | "high-contrast"]`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-fg-default` | Addon text color | Standard foreground |
| `--space-*` | Gap between items | Scales with density |
| `--font-size-sm` | Addon text size | Slightly smaller |

## AI / machine-readable notes

- **Selector pattern:** `.comp-input-group` wrapper with `.comp-input-group-addon` and `.comp-input-group-input` children
- **Structure:** Addon elements can be before or after input
- **Flexbox:** Uses `display: flex` for alignment; items centered vertically
- **Keyboard:** Tab order flows left-to-right through inputs and buttons
- **Copy-paste use:** Adjust input type/placeholder and addon text; structure unchanged

## Related patterns

- **Field:** Complete form field with label, input, helper, error
- **Input:** Single text input (without addons)
- **Button:** Action button, often used as addon
