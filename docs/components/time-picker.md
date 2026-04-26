# Time Picker

> Support level: **Supported** | Surface key: `component.timePicker` | Canonical: `.time-picker`

## When to use

Time picker enables users to select or enter a specific time in HH:MM:SS format (or HH:MM if seconds omitted). It provides both keyboard and interactive input paths.

- ✓ Use when users need to set a specific time (meeting time, alarm, schedule)
- ✓ Use in forms that require time input as a required or optional field
- ✓ Use when time input frequency is high and UX clarity matters
- ✗ Don't use for duration input (use range-slider or duration picker instead)
- ✗ Don't use for timezone selection (separate component)
- ✗ Don't use for interval-only selection (use segmented-control or radio)

## Canonical anatomy

| Class | Role | Modifiers |
|-------|------|-----------|
| `time-picker` | Root container — required | n/a |
| `time-picker-input` | Primary text input field | `input` base required |
| `time-picker-trigger` | Button to open panel | `btn` base recommended |
| `time-picker-panel` | Dropdown/panel container | Hidden unless `data-open="true"` |
| `time-picker-fields` | Grid of time fields (hour/minute/second) | n/a |
| `time-picker-field` | Single field wrapper (hour/minute/second) | n/a |
| `time-picker-field-label` | Field label (e.g., "Hours") | n/a |
| `time-picker-field-input` | Numeric input within field | n/a |
| `time-picker-increment` | Button to increase value | Spinner button |
| `time-picker-decrement` | Button to decrease value | Spinner button |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Closed | Default | `<div class="time-picker">` without `data-open` |
| Open | `data-open="true"` | `<div class="time-picker" data-open="true">` |
| Invalid | `aria-invalid="true"` | Apply to `time-picker-input` |
| Disabled | `disabled` on input | `<input class="time-picker-input" disabled>` |
| Focus | `:focus-visible` | Native browser focus ring |

## Basic usage

```html
<!-- Minimal text input approach -->
<div class="time-picker">
  <input
    class="time-picker-input"
    type="text"
    placeholder="HH:MM:SS"
    value="14:30:00"
    aria-label="Time"
  />
  <button class="time-picker-trigger btn btn-sm btn-outline">
    Clock icon
  </button>
</div>

<!-- With panel (closed by default) -->
<div class="time-picker">
  <input
    class="time-picker-input"
    type="text"
    placeholder="HH:MM:SS"
    value="14:30:00"
    aria-label="Time"
  />
  <button class="time-picker-trigger btn btn-sm btn-outline">
    Clock icon
  </button>
  <div class="time-picker-panel" hidden>
    <!-- Panel content -->
  </div>
</div>
```

## Panel with spinner interface

```html
<div class="time-picker" data-open="true">
  <input
    class="time-picker-input"
    type="text"
    placeholder="HH:MM:SS"
    aria-label="Time"
  />
  <button class="time-picker-trigger btn btn-sm btn-outline">
    Clock icon
  </button>
  
  <div class="time-picker-panel">
    <div class="time-picker-fields">
      <!-- Hours field -->
      <div class="time-picker-field">
        <label class="time-picker-field-label">Hours</label>
        <div class="time-picker-field-spinner">
          <button class="time-picker-increment" aria-label="Increase hour">
            +
          </button>
          <button class="time-picker-decrement" aria-label="Decrease hour">
            −
          </button>
        </div>
        <input
          class="time-picker-field-input"
          type="text"
          inputmode="numeric"
          maxlength="2"
          value="14"
          aria-label="Hour input"
        />
      </div>

      <!-- Minutes field -->
      <div class="time-picker-field">
        <label class="time-picker-field-label">Minutes</label>
        <div class="time-picker-field-spinner">
          <button class="time-picker-increment" aria-label="Increase minute">
            +
          </button>
          <button class="time-picker-decrement" aria-label="Decrease minute">
            −
          </button>
        </div>
        <input
          class="time-picker-field-input"
          type="text"
          inputmode="numeric"
          maxlength="2"
          value="30"
          aria-label="Minute input"
        />
      </div>

      <!-- Seconds field (optional) -->
      <div class="time-picker-field">
        <label class="time-picker-field-label">Seconds</label>
        <div class="time-picker-field-spinner">
          <button class="time-picker-increment" aria-label="Increase second">
            +
          </button>
          <button class="time-picker-decrement" aria-label="Decrease second">
            −
          </button>
        </div>
        <input
          class="time-picker-field-input"
          type="text"
          inputmode="numeric"
          maxlength="2"
          value="00"
          aria-label="Second input"
        />
      </div>
    </div>
  </div>
</div>
```

## With field wrapper (form context)

```html
<div class="field">
  <label class="label" for="appointment-time">Appointment time</label>
  
  <div class="time-picker">
    <input
      id="appointment-time"
      class="time-picker-input input"
      type="text"
      placeholder="HH:MM"
      aria-invalid="false"
      aria-describedby="appointment-time-error"
    />
    <button class="time-picker-trigger btn btn-sm btn-outline">
      Clock icon
    </button>
  </div>
  
  <div id="appointment-time-error" class="error-text" hidden>
    Please enter a valid time
  </div>
</div>
```

## Tone / Style variants

Time picker does not define custom tone or style variants. Input and trigger use inherited button/input recipes:

```html
<!-- Input uses base input styling -->
<input class="time-picker-input input" />

<!-- Trigger uses button variants -->
<button class="time-picker-trigger btn btn-sm btn-outline">Clock</button>
<button class="time-picker-trigger btn btn-sm btn-solid btn-primary">Clock</button>
```

## CSS custom properties

`time-picker` does not publish component-specific custom properties. Use the shared input, button, spacing, and surface tokens already consumed by the control.

If you need to change panel density or input rhythm, prefer global tokens / density modes over ad hoc inline overrides.

## Disabled state

```html
<!-- Disabled input -->
<input class="time-picker-input input" disabled aria-label="Time" />

<!-- Disabled trigger -->
<button class="time-picker-trigger btn btn-sm btn-outline" disabled>
  Clock icon
</button>
```

## Invalid state

```html
<!-- Invalid input with aria-invalid -->
<input
  class="time-picker-input input"
  aria-invalid="true"
  aria-describedby="time-error"
  value="25:99:00"
/>
<div id="time-error" class="error-text">
  Invalid time format. Use HH:MM:SS
</div>
```

## Accessibility checklist

- [ ] **Semantic HTML:** uses native `<input>` and `<button>`
- [ ] **ARIA attributes:** 
  - Input has `aria-label` or linked label via `<label>`
  - Trigger has `aria-expanded` and `aria-controls` linking to panel
  - Invalid input has `aria-invalid="true"` and `aria-describedby`
- [ ] **Keyboard:** 
  - Tab navigates through input, trigger, and panel fields
  - Escape closes panel and returns focus to trigger
  - Arrow keys increment/decrement in spinner fields
  - Enter in field input applies value
- [ ] **Focus visible:** `:focus-visible` outline on all interactive elements
- [ ] **Color not only signal:** invalid state shown by border AND error text
- [ ] **Screen reader:** announces "Time picker", "Hours", "Minutes", "Seconds"
- [ ] **Touch targets:** buttons at least 32px in compact, 44px+ in comfortable

### Keyboard behavior

- **Tab:** navigate to input, then trigger, then panel fields (if open)
- **Shift+Tab:** reverse navigation
- **Enter/Space:** open panel via trigger, confirm value in field input
- **Arrow-Up:** increment hour/minute/second in spinner
- **Arrow-Down:** decrement hour/minute/second in spinner
- **Escape:** close panel and return focus to trigger

### ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | Input has no visible label | `"Time"` or context |
| `aria-invalid` | Input validation fails | `"true"` or `"false"` |
| `aria-describedby` | Error or hint exists | ID of error/hint element |
| `aria-expanded` | Trigger controls panel | `"true"` or `"false"` |
| `aria-controls` | Trigger opens panel | Panel element ID |
| `aria-label` | Spinner buttons (inc/dec) | `"Increase hour"`, `"Decrease minute"` |

## Density modes

Spacing automatically scales:

| Density | Effect |
|---------|--------|
| `compact` | Reduced padding, smaller buttons; panel fits narrow containers |
| `default` | Standard padding; balanced layout |
| `comfortable` | Increased padding; larger touch targets (44px+) |

Density is applied via `[data-density]` on parent or `--space-*` tokens.

## Shape and motion

- **Shape:** Border-radius scales via `[data-shape="sharp" | "default" | "rounded"]`
- **Motion:** Transitions disabled in `@media (prefers-reduced-motion: reduce)`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-1`, `--space-2`, `--space-3` | Padding, gaps | Scale with density |
| `--color-border-subtle` | Input/panel borders | Default border |
| `--color-bg-surface`, `--color-bg-default` | Input, button backgrounds | Layer contrast |
| `--color-fg-default`, `--color-fg-muted` | Text, labels | Hierarchy |
| `--color-accent` | Focus and active states | Semantic highlight |
| `--radius-sm`, `--radius-md` | Border radius | Input, panel, buttons |
| `--font-size-sm`, `--font-size-xs` | Typography | Labels, field input |
| `--shadow-sm` | Panel shadow | Elevation hint |

## AI / machine-readable notes

- **CSS selector surface:** canonical class is `.time-picker`, sub-classes are `.time-picker-input`, `.time-picker-panel`, `.time-picker-field`, etc.
- **State indicators:** use `data-open="true"` to show the panel; remove the attribute to hide. Validation uses `aria-invalid="true"` on the input.
- **Time format:** default is HH:MM:SS; can be restricted to HH:MM via panel/input configuration
- **Spinner behavior:** increment/decrement steps are typically 1 hour/minute/second; can be configured to 15-minute steps
- **Panel positioning:** popover-like behavior, should respect viewport boundaries and not obscure main input
- **Responsive:** panel can be full-width on mobile or positioned below input on desktop
- **Integration:** works with `field`, `label`, `error-text`, `helper-text` form components
- **Anti-patterns:** 
  - Don't disable entire time picker for single invalid field
  - Don't use color alone to show validation state
  - Don't mix 12h and 24h format in same form
  - Don't require keyboard knowledge to increment/decrement values

## Common patterns

### Meeting scheduler use case

```html
<div class="field">
  <label class="label">Meeting time</label>
  <div class="time-picker">
    <input
      class="time-picker-input input"
      placeholder="HH:MM"
      value=""
    />
    <button class="time-picker-trigger btn btn-sm btn-outline">
      📅
    </button>
  </div>
  <div class="helper-text">
    Select a time between 09:00 and 17:00
  </div>
</div>
```

### Alarm clock use case

```html
<div class="field">
  <label class="label">Alarm time</label>
  <div class="time-picker">
    <input class="time-picker-input input" placeholder="HH:MM:SS" />
    <button class="time-picker-trigger btn btn-sm btn-primary">
      Set time
    </button>
    <!-- Panel with spinners shown on click -->
  </div>
</div>
```

### Dashboard/analytics filter

```html
<div data-pattern="filter-bar">
  <div data-slot="filters">
    <div class="time-picker">
      <input class="time-picker-input input" placeholder="From" aria-label="Start time" />
      <span style="color: var(--color-fg-muted)">to</span>
      <input class="time-picker-input input" placeholder="To" aria-label="End time" />
    </div>
  </div>
</div>
```

## Related components

- **Date Picker** — use for date-only selection
- **Date-Time Picker** — upcoming; combines date and time pickers
- **Input Group** — wrap time picker in input group for prefix/suffix icons
- **Field** — form field wrapper for label, input, error/helper text
- **Button** — trigger and spinner buttons use button recipe
