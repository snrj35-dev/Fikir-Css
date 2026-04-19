# Date-Time Picker

> Support level: **Supported** | Surface key: `component.dateTimePicker` | Canonical: `.date-time-picker`

## When to use

Date-time picker enables users to select or enter a specific date and time in a single interaction. It combines calendar selection with time input for comprehensive date-time capture.

- ✓ Use when users need to set a specific moment (appointment, event, deadline with time)
- ✓ Use in scheduling, booking, and event management forms
- ✓ Use when both date and time are required in a single field
- ✓ Use in dashboard filters with time-aware ranges
- ✗ Don't use for date-only selection (use date-picker instead)
- ✗ Don't use for time-only selection (use time-picker instead)
- ✗ Don't use for timezone selection (separate component)
- ✗ Don't use for duration selection (use range-slider or duration picker)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `date-time-picker` | Root container — required | n/a |
| `date-time-picker-input` | Primary text input field | `input` base required |
| `date-time-picker-trigger` | Button to open panel | `btn` base recommended |
| `date-time-picker-panel` | Dropdown/panel container | Hidden unless `data-open="true"` |
| `date-time-picker-date-section` | Calendar section wrapper | n/a |
| `date-time-picker-calendar` | Calendar grid | 7-column layout |
| `date-time-picker-day` | Single calendar day cell | n/a |
| `date-time-picker-time-section` | Time input section wrapper | n/a |
| `date-time-picker-fields` | Grid of time fields (hour/minute/second) | n/a |
| `date-time-picker-field` | Single time field wrapper | n/a |
| `date-time-picker-field-label` | Field label (e.g., "Hours") | n/a |
| `date-time-picker-field-input` | Numeric input within field | n/a |
| `date-time-picker-increment` | Button to increase time value | Spinner button |
| `date-time-picker-decrement` | Button to decrease time value | Spinner button |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Closed | Default | `<div class="date-time-picker">` without `data-open` |
| Open | `data-open="true"` | `<div class="date-time-picker" data-open="true">` |
| Invalid | `aria-invalid="true"` | Apply to `date-time-picker-input` |
| Disabled | `disabled` on input | `<input class="date-time-picker-input" disabled>` |
| Date selected | `data-selected="true"` | Apply to calendar day cell |
| Today | `data-today="true"` | Apply to today's calendar cell |

## Basic usage

```html
<!-- Minimal text input approach -->
<div class="date-time-picker">
  <input
    class="date-time-picker-input input"
    type="text"
    placeholder="YYYY-MM-DD HH:MM"
    value="2026-04-17 14:30"
    aria-label="Date and time"
  />
  <button class="date-time-picker-trigger btn btn-sm btn-outline">
    Calendar icon
  </button>
</div>
```

## Panel with date and time sections

```html
<div class="date-time-picker" data-open="true">
  <input
    class="date-time-picker-input input"
    type="text"
    placeholder="YYYY-MM-DD HH:MM"
    value="2026-04-17 14:30"
    aria-label="Date and time"
  />
  <button class="date-time-picker-trigger btn btn-sm btn-outline">
    Calendar icon
  </button>
  
  <div class="date-time-picker-panel">
    <!-- Date Section -->
    <div class="date-time-picker-date-section">
      <div class="date-time-picker-calendar">
        <button class="date-time-picker-day" type="button">1</button>
        <button class="date-time-picker-day" type="button">2</button>
        <!-- ... more days ... -->
        <button class="date-time-picker-day" data-today="true" data-selected="true" type="button">
          17
        </button>
        <!-- ... more days ... -->
      </div>
    </div>

    <!-- Time Section -->
    <div class="date-time-picker-time-section">
      <div class="date-time-picker-fields">
        <!-- Hours -->
        <div class="date-time-picker-field">
          <label class="date-time-picker-field-label">Hours</label>
          <div class="date-time-picker-field-spinner">
            <button class="date-time-picker-increment" type="button" aria-label="Increase hour">
              +
            </button>
            <button class="date-time-picker-decrement" type="button" aria-label="Decrease hour">
              −
            </button>
          </div>
          <input
            class="date-time-picker-field-input"
            type="text"
            inputmode="numeric"
            maxlength="2"
            value="14"
            aria-label="Hour input"
          />
        </div>

        <!-- Minutes -->
        <div class="date-time-picker-field">
          <label class="date-time-picker-field-label">Minutes</label>
          <div class="date-time-picker-field-spinner">
            <button class="date-time-picker-increment" type="button" aria-label="Increase minute">
              +
            </button>
            <button class="date-time-picker-decrement" type="button" aria-label="Decrease minute">
              −
            </button>
          </div>
          <input
            class="date-time-picker-field-input"
            type="text"
            inputmode="numeric"
            maxlength="2"
            value="30"
            aria-label="Minute input"
          />
        </div>
      </div>
    </div>
  </div>
</div>
```

## With field wrapper (form context)

```html
<div class="field">
  <label class="label" for="meeting-datetime">Meeting date and time</label>
  
  <div class="date-time-picker">
    <input
      id="meeting-datetime"
      class="date-time-picker-input input"
      type="text"
      placeholder="YYYY-MM-DD HH:MM"
      aria-invalid="false"
      aria-describedby="meeting-datetime-error"
    />
    <button class="date-time-picker-trigger btn btn-sm btn-outline" type="button">
      📅
    </button>
  </div>
  
  <div id="meeting-datetime-error" class="error-text" hidden>
    Please select a valid date and time
  </div>
</div>
```

## Tone / Style variants

Date-time picker does not define custom tone or style variants. Input and trigger use inherited button/input recipes:

```html
<!-- Input uses base input styling -->
<input class="date-time-picker-input input" />

<!-- Trigger uses button variants -->
<button class="date-time-picker-trigger btn btn-sm btn-outline">Open</button>
<button class="date-time-picker-trigger btn btn-sm btn-solid btn-primary">Open</button>
```

## Disabled state

```html
<!-- Disabled input -->
<input class="date-time-picker-input input" disabled aria-label="Date and time" />

<!-- Disabled trigger -->
<button class="date-time-picker-trigger btn btn-sm btn-outline" disabled>
  📅
</button>
```

## Invalid state

```html
<!-- Invalid input with aria-invalid -->
<input
  class="date-time-picker-input input"
  aria-invalid="true"
  aria-describedby="datetime-error"
  value="invalid"
/>
<div id="datetime-error" class="error-text">
  Invalid date-time format. Use YYYY-MM-DD HH:MM
</div>
```

## Accessibility checklist

- [ ] **Semantic HTML:** uses native `<input>` and `<button>`
- [ ] **ARIA attributes:** 
  - Input has `aria-label` or linked label via `<label>`
  - Trigger has `aria-expanded` and `aria-controls` linking to panel
  - Invalid input has `aria-invalid="true"` and `aria-describedby`
- [ ] **Keyboard:** 
  - Tab navigates through input, trigger, calendar cells, and time fields
  - Escape closes panel and returns focus to trigger
  - Arrow keys navigate calendar grid (up/down/left/right)
  - Arrow keys increment/decrement in time spinners
  - Enter in calendar cell selects date
  - Enter in time field applies value
- [ ] **Focus visible:** `:focus-visible` outline on all interactive elements
- [ ] **Color not only signal:** invalid state shown by border AND error text
- [ ] **Screen reader:** announces "Date-time picker", date, time, "Hours", "Minutes"
- [ ] **Touch targets:** buttons at least 32px in compact, 44px+ in comfortable

### Keyboard behavior

- **Tab:** navigate through input → trigger → calendar cells (if open) → time fields
- **Shift+Tab:** reverse navigation
- **Enter/Space:** open panel via trigger, select date in calendar, confirm time field value
- **Arrow-Up:** in calendar (week up) or increment hour/minute
- **Arrow-Down:** in calendar (week down) or decrement hour/minute
- **Arrow-Left:** in calendar (day left)
- **Arrow-Right:** in calendar (day right)
- **Escape:** close panel and return focus to trigger

### ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | Input has no visible label | `"Date and time"` or context |
| `aria-invalid` | Input validation fails | `"true"` or `"false"` |
| `aria-describedby` | Error or hint exists | ID of error/hint element |
| `aria-expanded` | Trigger controls panel | `"true"` or `"false"` |
| `aria-controls` | Trigger opens panel | Panel element ID |
| `aria-label` | Spinner buttons (inc/dec) | `"Increase hour"`, `"Decrease minute"` |
| `role="button"` | Calendar day cells | Optional if using `<button>` |

## Density modes

Spacing automatically scales:

| Density | Effect |
|---------|--------|
| `compact` | Reduced padding, smaller calendar cells, smaller time fields |
| `default` | Standard padding; balanced calendar and time layout |
| `comfortable` | Increased padding; larger calendar cells (48px+), larger time inputs |

Density is applied via `[data-density]` on parent or `--space-*` tokens.

## Shape and motion

- **Shape:** Border-radius scales via `[data-shape="sharp" | "default" | "rounded"]`
- **Motion:** Transitions disabled in `@media (prefers-reduced-motion: reduce)`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--space-1`, `--space-2`, `--space-3` | Padding, gaps | Scale with density |
| `--color-border-subtle` | Input/panel/cell borders | Default border |
| `--color-bg-surface`, `--color-bg-default` | Input, cell, button backgrounds | Layer contrast |
| `--color-fg-default`, `--color-fg-muted` | Text, labels | Hierarchy |
| `--color-primary-500` | Selected date background | Accent |
| `--color-accent` | Focus and active states | Semantic highlight |
| `--radius-sm`, `--radius-md` | Border radius | Input, cells, panel |
| `--font-size-sm`, `--font-size-xs` | Typography | Labels, cell content |
| `--shadow-sm` | Panel shadow | Elevation hint |

## AI / machine-readable notes

- **CSS selector surface:** canonical class is `.date-time-picker`, sub-classes are `.date-time-picker-input`, `.date-time-picker-panel`, `.date-time-picker-date-section`, `.date-time-picker-time-section`, etc.
- **State indicators:** use `data-open="true|false"`, `data-selected="true"`, `data-today="true"`, `aria-invalid="true|false"`, `aria-expanded="true|false"` attributes
- **DateTime format:** default is ISO 8601 (YYYY-MM-DD HH:MM); can be localized
- **Panel composition:** date section above, time section below, separated by border
- **Calendar grid:** 7-column layout for week days; 6 rows for calendar grid
- **Time granularity:** typically hour/minute; seconds optional
- **Responsive:** panel can be full-width on mobile or positioned below input on desktop
- **Integration:** works with `field`, `label`, `error-text`, `helper-text` form components
- **Anti-patterns:** 
  - Don't disable entire picker for single invalid field
  - Don't use color alone to show validation state
  - Don't mix 12h and 24h format in same form
  - Don't require manual typing if calendar is available
  - Don't hide time section if time is required
  - Don't allow selecting past dates without explicit allowance

## Common patterns

### Meeting scheduler

```html
<div class="field">
  <label class="label">Meeting starts at</label>
  <div class="date-time-picker">
    <input
      class="date-time-picker-input input"
      placeholder="YYYY-MM-DD HH:MM"
      value=""
    />
    <button class="date-time-picker-trigger btn btn-sm btn-outline" type="button">
      📅
    </button>
  </div>
  <div class="helper-text">
    Select a date between today and 30 days from now, time 09:00–17:00
  </div>
</div>
```

### Deadline with time

```html
<div class="field">
  <label class="label">Project deadline</label>
  <div class="date-time-picker">
    <input
      class="date-time-picker-input input"
      placeholder="YYYY-MM-DD HH:MM"
    />
    <button class="date-time-picker-trigger btn btn-sm btn-primary" type="button">
      Set deadline
    </button>
  </div>
  <div class="helper-text">
    Include time to manage multiple time zones
  </div>
</div>
```

### Dashboard time-range filter

```html
<div class="cluster">
  <div class="date-time-picker">
    <input class="date-time-picker-input input" placeholder="From" />
    <button class="date-time-picker-trigger btn btn-xs btn-ghost" type="button">📅</button>
  </div>
  
  <span style="color: var(--color-fg-muted)">to</span>
  
  <div class="date-time-picker">
    <input class="date-time-picker-input input" placeholder="To" />
    <button class="date-time-picker-trigger btn btn-xs btn-ghost" type="button">📅</button>
  </div>
</div>
```

## Related components

- **Date Picker** — use for date-only selection
- **Time Picker** — use for time-only selection
- **Input Group** — wrap date-time picker in input group for icon/suffix
- **Field** — form field wrapper for label, input, error/helper text
- **Button** — trigger and calendar/spinner buttons use button recipe
