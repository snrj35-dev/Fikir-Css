# Stepper

> Support level: **Supported** | Surface key: `component.stepper` | Canonical: `.stepper`

## When to use

Linear progress indicator for multi-step flows where sequence and completion matter.

- ✓ Multi-step forms (checkout, onboarding, wizard)
- ✓ Sequential process tracking (account creation, setup flow)
- ✓ Visual progress indicator showing current, complete, and upcoming steps
- ✗ Non-sequential section switching — use `tabs`
- ✗ Collapsible FAQ / content sections — use `accordion`
- ✗ Navigation between pages — use `sidebar-nav`

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `stepper` | List wrapper — use `<ol>` for ordered steps | n/a |
| `stepper-item` | Single step row — `<li>` | `data-state` attribute controls visual state |
| `stepper-marker` | Step number/icon circle — decorative | `aria-hidden="true"` required |
| `stepper-label` | Step title text | n/a |

## States

Set `data-state` on each `stepper-item`:

| Value | Meaning | CSS effect |
|-------|---------|------------|
| `complete` | Step finished | Marker fills with success accent color |
| `active` | Current step | Marker fills with primary accent color |
| `upcoming` | Not yet reached | Marker is unfilled / muted |

## Basic usage

```html
<ol class="stepper" aria-label="Account setup progress">
  <li class="stepper-item" data-state="complete">
    <span class="stepper-marker" aria-hidden="true">✓</span>
    <span class="stepper-label">Account details</span>
  </li>
  <li class="stepper-item" data-state="active" aria-current="step">
    <span class="stepper-marker" aria-hidden="true">2</span>
    <span class="stepper-label">Billing info</span>
  </li>
  <li class="stepper-item" data-state="upcoming">
    <span class="stepper-marker" aria-hidden="true">3</span>
    <span class="stepper-label">Review &amp; confirm</span>
  </li>
</ol>
```

## State management

CSS state is driven by `[data-state]` — no JS class toggling. Toggle `data-state` and `aria-current` in your framework:

```js
function goToStep(nextIndex) {
  items.forEach((item, i) => {
    if (i < nextIndex) {
      item.dataset.state = 'complete'
      item.removeAttribute('aria-current')
    } else if (i === nextIndex) {
      item.dataset.state = 'active'
      item.setAttribute('aria-current', 'step')
    } else {
      item.dataset.state = 'upcoming'
      item.removeAttribute('aria-current')
    }
  })
}
```

## Accessibility checklist

- [x] **Semantic HTML:** uses `<ol>` for ordered, sequential steps
- [x] **aria-label:** on `stepper` element describing the overall process
- [x] **aria-current="step":** on the active `stepper-item` — announced by screen readers
- [x] **Decorative marker:** `aria-hidden="true"` on `stepper-marker` (step number/icon is visual only)
- [x] **Label is sufficient:** `stepper-label` text must be descriptive enough standalone
- [x] **Color not only signal:** `data-state` styling uses marker shape + color together

## Keyboard behavior

Stepper is a **read-only progress indicator** — it has no interactive keyboard behavior.  
Navigation between steps is handled by the surrounding form/wizard controls (e.g., Next/Back buttons).

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | On `stepper` wrapper | Describes the overall process (e.g., `"Account setup progress"`) |
| `aria-current="step"` | Active `stepper-item` | Marks the current step for screen readers |

## Density modes

Stepper marker size and spacing scale with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Smaller markers, reduced row height |
| `default` | Standard markers and spacing |
| `comfortable` | Larger markers, increased spacing |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape]` affects `stepper-marker` border-radius (circle → square in `sharp` mode)
- **Motion:** State transition animation (complete → active) respects `prefers-reduced-motion`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-accent` | Active step marker background | Primary brand color |
| `--color-success` | Complete step marker background | Success green |
| `--color-fg-muted` | Upcoming step marker / text color | Dimmed |
| `--space-3` | Row gap | Scales with density |
| `--radius-full` | Marker circle shape | Modified by `data-shape` |

## Anti-patterns

```html
<!-- ✗ Don't omit aria-current on active step -->
<li class="stepper-item" data-state="active">...</li>

<!-- ✓ Mark current step with aria-current -->
<li class="stepper-item" data-state="active" aria-current="step">...</li>

<!-- ✗ Don't use stepper for non-sequential navigation -->
<!-- ✓ Use tabs for section switching -->
```

## AI / machine-readable notes

- **Selector anatomy:** `stepper[ol] > stepper-item[li] > stepper-marker[span] + stepper-label[span]`
- **State indicator:** `data-state="complete|active|upcoming"` on each `stepper-item`; `aria-current="step"` on the active item
- **Read-only:** stepper has no interactive elements; navigation is external (Next/Back buttons)
- **Copy-paste use:** duplicate `stepper-item` entries; update `data-state` and `aria-current` via JS
