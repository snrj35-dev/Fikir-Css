# Range Slider

> Support level: **Supported** | Surface key: `component.rangeSlider` | Canonical: `.comp-range-slider`

## When to use

Slider for selecting a value or range within continuous numeric interval. Provides visual and tactile feedback.

- ✓ Volume, brightness, zoom level (0–100%)
- ✓ Price range selection (min–max price)
- ✓ Date range picker (from–to dates)
- ✓ Confidence level, rating scale
- ✗ Single discrete choice from few options (use `radio` or `select`)
- ✗ Many distinct values (>10, use `number-input` instead)
- ✗ User needs to enter exact value (use `number-input`)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-range-slider` | Range slider input | n/a |
| `comp-range-slider-sm` | Small size (1.5rem height) | Composable |
| `comp-range-slider-md` | Medium size (2rem height, default) | Composable |
| `comp-range-slider-lg` | Large size (2.5rem height) | Composable |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | — | `<input type="range" class="comp-range-slider">` |
| Dragging | Mouse down on thumb | Thumb highlighted |
| Focus | `:focus-visible` (automatic) | Outline ring visible |
| Hover | `:hover` (automatic) | Thumb expands slightly |
| Disabled | `disabled` attribute | Grayed out, not interactive |

## Basic usage

```html
<!-- Simple volume slider (0–100) -->
<div class="comp-field">
  <label class="comp-label" for="volume">Volume</label>
  <input 
    type="range" 
    id="volume" 
    class="comp-range-slider comp-field-input"
    min="0" 
    max="100" 
    value="50"
    aria-label="Volume level"
  >
</div>

<!-- Zoom level with step -->
<div class="comp-field">
  <label class="comp-label" for="zoom">Zoom level</label>
  <input 
    type="range" 
    id="zoom" 
    class="comp-range-slider comp-field-input"
    min="50" 
    max="200" 
    step="10" 
    value="100"
    aria-label="Zoom percentage"
  >
</div>

<!-- Slider with display value -->
<div class="comp-field">
  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
    <label class="comp-label" for="brightness">Brightness</label>
    <span id="brightness-value">50%</span>
  </div>
  <input 
    type="range" 
    id="brightness" 
    class="comp-range-slider comp-field-input"
    min="0" 
    max="100" 
    value="50"
    oninput="document.getElementById('brightness-value').textContent = this.value + '%';"
  >
</div>

<!-- Price range slider (single value) -->
<div class="comp-field">
  <label class="comp-label" for="price-budget">Budget</label>
  <input 
    type="range" 
    id="price-budget" 
    class="comp-range-slider comp-field-input"
    min="0" 
    max="5000" 
    step="50" 
    value="2500"
    aria-label="Budget in USD"
  >
  <div style="font-size: 0.875rem; color: var(--color-fg-muted); margin-top: 0.5rem;">
    Selected: $<span id="budget-display">2500</span>
  </div>
</div>
```

## Dual-range slider (min–max)

```html
<!-- Note: HTML5 input[type=range] only supports single value. 
     Use two overlapping sliders or a JavaScript library for dual range. -->

<div class="comp-field">
  <label class="comp-label">Price range</label>
  
  <div style="display: flex; gap: 1rem; align-items: center;">
    <div style="flex: 1;">
      <input 
        type="range" 
        id="price-min" 
        class="comp-range-slider comp-field-input"
        min="0" 
        max="10000" 
        value="1000"
        aria-label="Minimum price"
      >
    </div>
    
    <div style="flex: 1;">
      <input 
        type="range" 
        id="price-max" 
        class="comp-range-slider comp-field-input"
        min="0" 
        max="10000" 
        value="9000"
        aria-label="Maximum price"
      >
    </div>
  </div>
  
  <div style="font-size: 0.875rem; margin-top: 0.5rem;">
    <span id="price-range-display">$1000 – $9000</span>
  </div>
</div>
```

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to slider |
| Arrow Left/Down | Decrease value by step |
| Arrow Right/Up | Increase value by step |
| Home | Set to min value |
| End | Set to max value |
| Page Up | Increase by 10 × step |
| Page Down | Decrease by 10 × step |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | Always (input has no visible label) | Describe slider purpose |
| `aria-labelledby` | If labeled by external element | ID of label element |
| `aria-valuenow` | Reading screen | Current slider value (automatic) |
| `aria-valuemin` | Reading screen | Minimum value (from HTML) |
| `aria-valuemax` | Reading screen | Maximum value (from HTML) |

## Accessibility checklist

- [x] **Semantic HTML:** Uses native `<input type="range">`
- [x] **Label:** Slider always has label via `<label>` or `aria-label`
- [x] **Keyboard:** Full control via arrow keys and Page Up/Down
- [x] **Value display:** Current value shown (visually or via aria-valuenow)
- [x] **Range:** `min` and `max` attributes define bounds
- [x] **Step:** `step` attribute controls granularity
- [x] **Focus visible:** `:focus-visible` outline visible
- [x] **Touch:** Thumb size ≥44px for touch targets

## Density modes

Slider height scales with `[data-density]`:

| Density | Track height | Thumb size |
|---------|--------------|-----------|
| `compact` | 4px | 16px |
| `default` | 6px | 20px |
| `comfortable` | 8px | 24px |

## Shape and theme

- **Shape:** Not typically applied to sliders
- **Theme:** Track and thumb colors adapt to `[data-theme="light" | "dark" | "high-contrast"]`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-accent` | Track fill (before thumb) | Brand color |
| `--color-border-default` | Track background | Lighter color |
| `--color-fg-inverse` | Thumb color | White or high-contrast |
| `--space-*` | Slider padding | Scales with density |
| `--radius-full` | Thumb border-radius | Circular (50%) |

## AI / machine-readable notes

- **Selector pattern:** `comp-range-slider` on input element (uses `type="range"`)
- **Value:** Controlled via `value` HTML attribute and JavaScript `oninput` event
- **Range:** `min` and `max` HTML attributes; optional `step` for granularity
- **Display value:** Display current value in separate `<span>` updated via `oninput`
- **Dual range:** Use two overlapping sliders with JavaScript coordination (HTML5 limitation)
- **Responsive:** Thumb size scales with density; no breakpoint changes needed
- **Copy-paste use:** Adjust `min`, `max`, `step`, `value`; structure unchanged

## Known limitations

- **Single value only:** HTML5 `input[type=range]` supports one value; dual-range needs two inputs + JavaScript
- **No custom track styling:** Track appearance is limited to color (browser-dependent)
- **Mobile support:** Works on touch devices but thumb must be large enough (≥44px)

## Related patterns

- **Number-input:** Precise numeric input with spinner buttons
- **Field:** Complete form field with label, input, helper, error
- **Slider component library:** For advanced features (dual range, steps labels, etc.)
