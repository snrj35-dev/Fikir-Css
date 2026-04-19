# Progress

> Support level: **Supported** | Surface key: `component.progress` | Canonical: `.comp-progress`

## When to use

Visual progress indicator showing completion percentage of operation. For known-duration tasks.

- ✓ File uploads/downloads
- ✓ Long-running operations with percentage
- ✓ Multi-step form progress
- ✓ Installation or processing progress
- ✗ Loading without percentage (use `spinner`)
- ✗ Indeterminate progress (use `spinner`)
- ✗ Short operations (use spinner or toast)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-progress` | Progress bar container | n/a |
| `comp-progress-bar` | Filled portion (0–100%) | n/a |
| `comp-progress-label` | Optional percentage label | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Starting | 0% | Empty bar |
| In progress | 1–99% | Partially filled |
| Complete | 100% | Fully filled |

## Basic usage

```html
<!-- Simple progress bar -->
<div class="comp-progress" style="width: 100%; height: 0.5rem; background: var(--color-border-default); border-radius: 0.25rem; overflow: hidden;">
  <div class="comp-progress-bar" style="height: 100%; width: 65%; background: var(--color-accent); transition: width 0.3s;"></div>
</div>

<!-- Progress with label -->
<div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
  <label for="upload-progress">Upload progress</label>
  <span class="comp-progress-label">65%</span>
</div>
<div class="comp-progress" id="upload-progress" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <div class="comp-progress-bar" style="width: 65%;"></div>
</div>

<!-- Progress with description -->
<div>
  <h3>Processing file...</h3>
  <div class="comp-progress">
    <div class="comp-progress-bar" style="width: 42%;"></div>
  </div>
  <p style="font-size: 0.875rem; color: var(--color-fg-muted); margin-top: 0.5rem;">
    Step 2 of 4: Compressing (42%)
  </p>
</div>
```

## With label inside bar

```html
<div class="comp-progress" style="position: relative; height: 1.5rem; background: var(--color-border-default); border-radius: 0.25rem;">
  <div class="comp-progress-bar" style="position: absolute; top: 0; left: 0; height: 100%; width: 75%; background: var(--color-accent);"></div>
  <span style="position: relative; display: flex; align-items: center; height: 100%; padding: 0 0.5rem; font-size: 0.875rem; font-weight: bold; color: white; z-index: 1;">
    75%
  </span>
</div>
```

## Multi-step progress

```html
<!-- Stepper with progress -->
<div style="display: flex; gap: 0.25rem; margin-bottom: 1rem;">
  <div style="flex: 1; height: 0.25rem; background: var(--color-accent);"></div>
  <div style="flex: 1; height: 0.25rem; background: var(--color-accent);"></div>
  <div style="flex: 1; height: 0.25rem; background: var(--color-border-default);"></div>
  <div style="flex: 1; height: 0.25rem; background: var(--color-border-default);"></div>
</div>
<p style="text-align: center;">Step 2 of 4</p>
```

## Accessibility checklist

- [x] **Semantic:** Uses `role="progressbar"`
- [x] **Value:** `aria-valuenow`, `aria-valuemin`, `aria-valuemax` set
- [x] **Label:** Associated label or aria-label describes task
- [x] **Color:** Not only color indicates progress (width change too)
- [x] **Updates:** ARIA values update as progress changes
- [x] **Accessible text:** "75% complete" preferred over just number

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role` | Always | `"progressbar"` |
| `aria-valuenow` | Always | Current percentage (0–100) |
| `aria-valuemin` | Always | `0` |
| `aria-valuemax` | Always | `100` |
| `aria-label` or `aria-labelledby` | Always | Task description |

## Indeterminate vs determinate

- **Determinate:** Known duration/percentage (file upload)
- **Indeterminate:** Unknown duration (loading spinner instead)

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-accent` | Bar fill color | Brand color |
| `--color-border-default` | Background track | Subtle gray |
| `--space-*` | Spacing | Around progress bar |

## AI / machine-readable notes

- **Selector pattern:** `comp-progress` container with `comp-progress-bar` fill element
- **Width:** Update `width` style as percentage changes
- **ARIA:** Update `aria-valuenow` on each progress change
- **Label:** Always include task description
- **Copy-paste use:** Update label text and set initial percentage

## Related patterns

- **Spinner:** For indeterminate/unknown duration loading
- **Stepper:** Multi-step form progress with step numbers
