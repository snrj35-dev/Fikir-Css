# Time Range Picker

> Support level: **Supported** | Pattern key: `pattern.timeRangePicker` | Canonical: `data-pattern="time-range-picker"`

## When to use

Layout pattern for aligning two time inputs as a "start–end" pair. Used for selecting time durations or shifts.

- ✓ Business hours selection (from/to)
- ✓ Reservation or event time slots
- ✓ Dashboard time range filters
- ✗ Single time entry (use `time-picker-input` or standard `input[type="time"]`)
- ✗ Date range selection (use `date-range-picker`)

## Canonical anatomy

| Slot / Attribute | Role | Element |
|------------------|------|---------|
| `data-pattern` | Root container | `div` |
| `data-slot="from"` | Start time wrapper | `div` |
| `data-slot="to"` | End time wrapper | `div` |
| `data-slot="separator"`| Visual divider | `span` |
| `data-variant` | `"block" \| "inline"` | Layout style |
| `data-invalid` | `"true" \| "false"` | Range validation state |

## Basic usage

```html
<div data-pattern="time-range-picker">
  <div data-slot="from">
    <input
      class="input"
      type="time"
      aria-label="Start time"
      value="09:00"
    />
  </div>
  <span data-slot="separator" aria-hidden="true">to</span>
  <div data-slot="to">
    <input
      class="input"
      type="time"
      aria-label="End time"
      value="17:00"
    />
  </div>
</div>
```

## Block variant (full width)

```html
<div data-pattern="time-range-picker" data-variant="block" class="stack">
  <div class="field">
    <label class="label" for="shift-start">Shift starts</label>
    <div data-slot="from">
      <input id="shift-start" class="input" type="time" value="08:00" />
    </div>
  </div>
  <div class="field">
    <label class="label" for="shift-end">Shift ends</label>
    <div data-slot="to">
      <input id="shift-end" class="input" type="time" value="16:00" />
    </div>
  </div>
</div>
```

## Invalid state

```html
<div data-pattern="time-range-picker" data-invalid="true">
  <div data-slot="from">
    <input class="input" type="time" aria-invalid="true" value="18:00" />
  </div>
  <span data-slot="separator">–</span>
  <div data-slot="to">
    <input class="input" type="time" aria-invalid="true" value="09:00" />
  </div>
</div>
<p class="error-text">End time must be after start time.</p>
```

## Accessibility checklist

- [x] **Individual labels:** Each input must have a unique `aria-label` or `<label>`
- [x] **Range validation:** If the range is invalid, both inputs should have `aria-invalid="true"`
- [x] **Error link:** Use `aria-describedby` on inputs to link to the error message text
- [x] **Separator:** Decorative separators marked with `aria-hidden="true"`
- [x] **Keyboard:** Standard Tab navigation through both inputs

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-default` | Input border | Standard field border |
| `--color-tone-danger` | Invalid border color | High contrast alert |
| `--space-2`, `--space-3` | Internal gaps | Scales with density |
| `--font-size-sm` | Separator text size | Secondary typography |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="time-range-picker"`
- **Variant:** `data-variant="block"` for full-width stacked layout; `data-variant="inline"` for horizontal pair
- **State indicator:** `data-invalid="true"` applies error styling to both input wrappers simultaneously
- **Slots:** `from`, `to`, `separator`
- **Responsibility:** Application manages range validation logic and `aria-invalid` updates

## Related

- **`date-range-picker`** — for date intervals
- **`filter-bar`** — often contains a time range picker
- **`input`** — the base component for time entry
- **`field`** — used for labeling the range inputs
