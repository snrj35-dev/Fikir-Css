# Stepper

> Support level: **Supported** | Surface key: `component.stepper`

## Classes

| Class | Role |
|-------|------|
| `stepper` | List wrapper |
| `stepper-item` | Single step row |
| `stepper-marker` | Step number/icon circle |
| `stepper-label` | Step title text |

## States

Set `data-state` on each `stepper-item`:

| Value | Meaning |
|-------|---------|
| `complete` | Step finished — marker fills with accent color |
| `active` | Current step — marker fills with accent color |
| `upcoming` | Not yet reached — marker is unfilled |

## Basic usage

```html
<ol class="stepper">
  <li class="stepper-item" data-state="complete">
    <span class="stepper-marker" aria-hidden="true">✓</span>
    <span class="stepper-label">Account details</span>
  </li>
  <li class="stepper-item" data-state="active">
    <span class="stepper-marker" aria-hidden="true">2</span>
    <span class="stepper-label">Billing info</span>
  </li>
  <li class="stepper-item" data-state="upcoming">
    <span class="stepper-marker" aria-hidden="true">3</span>
    <span class="stepper-label">Review &amp; confirm</span>
  </li>
</ol>
```

## Accessibility

- Use `<ol>` for ordered steps
- `aria-hidden="true"` on `stepper-marker` — the step number is decorative
- For screen readers, each step label is sufficient context
- Consider adding `aria-current="step"` on the active `stepper-item`

## Implementation note

CSS state is driven by `[data-state]` — no JS class toggling. Toggle `data-state` values in your framework:

```js
// Move to next step
items[currentStep].dataset.state = 'complete'
items[currentStep + 1].dataset.state = 'active'
```
