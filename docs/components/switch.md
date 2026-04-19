# Switch

> Support level: **Supported** | Surface key: `component.switch` | Canonical: `.comp-switch`

## When to use

Binary toggle for on/off or enabled/disabled states. Animated sliding indicator shows state clearly.

- ✓ Feature toggles (enable/disable feature)
- ✓ Boolean settings (dark mode, notifications, etc.)
- ✓ Visibility toggles (show/hide password)
- ✗ Single selection from multiple options (use `radio` or `select`)
- ✗ Multiple independent options (use `checkbox` instead)
- ✗ Form submission choices (use `checkbox` or `radio`)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-switch` | Switch input wrapper | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Off | Default | `<input type="checkbox" class="comp-switch">` |
| On | `:checked` or `checked` attribute | Slider moves right, background color changes |
| Disabled | `disabled` attribute | Grayed, not interactive |
| Focus | `:focus-visible` (automatic) | Outline ring visible |
| Hover | `:hover` (automatic) | Background highlight |

## Basic usage

```html
<!-- Simple switch toggle -->
<label style="display: flex; align-items: center; gap: 0.5rem;">
  <input type="checkbox" class="comp-switch">
  Enable notifications
</label>

<!-- Switch in settings form -->
<div class="comp-field">
  <label style="display: flex; align-items: center; gap: 0.5rem;">
    <input type="checkbox" id="dark-mode" class="comp-switch">
    <span>Dark mode</span>
  </label>
</div>

<!-- Switch with description -->
<div style="display: flex; flex-direction: column; gap: 0.25rem;">
  <label style="display: flex; align-items: center; gap: 0.5rem;">
    <input type="checkbox" id="email-alerts" class="comp-switch">
    <span>Email notifications</span>
  </label>
  <span style="font-size: 0.75rem; color: var(--color-fg-muted); margin-left: 2rem;">
    Receive daily digest of activity
  </span>
</div>

<!-- Disabled switch -->
<label style="display: flex; align-items: center; gap: 0.5rem;">
  <input type="checkbox" class="comp-switch" disabled>
  <span>Feature not available</span>
</label>
```

## Multiple switches in settings

```html
<fieldset>
  <legend>Privacy settings</legend>
  
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <label style="display: flex; align-items: center; gap: 0.5rem;">
      <input type="checkbox" name="profile-public" class="comp-switch">
      Public profile
    </label>
    
    <label style="display: flex; align-items: center; gap: 0.5rem;">
      <input type="checkbox" name="email-public" class="comp-switch">
      Show email address
    </label>
    
    <label style="display: flex; align-items: center; gap: 0.5rem;">
      <input type="checkbox" name="activity-visible" class="comp-switch">
      Show activity history
    </label>
  </div>
</fieldset>
```

## Switch with async state change

```html
<!-- Switch with loading indicator -->
<label style="display: flex; align-items: center; gap: 0.5rem;">
  <input 
    type="checkbox" 
    id="feature-beta" 
    class="comp-switch"
    onchange="toggleFeature(this)"
  >
  <span id="feature-label">Beta feature</span>
  <div class="comp-spinner comp-spinner-sm" id="feature-spinner" style="display: none;"></div>
</label>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses native `<input type="checkbox">` styled as switch
- [x] **Label association:** Label text paired with switch (implicit or explicit)
- [x] **Keyboard:** Tab/Shift+Tab to navigate, Space to toggle
- [x] **Focus visible:** `:focus-visible` outline visible
- [x] **Color not only signal:** Slider position + background color both indicate state
- [x] **ARIA label:** Always include descriptive label text or `aria-label`
- [x] **Async handling:** If toggling triggers action, show feedback (spinner, toast)

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to switch |
| Shift+Tab | Navigate to previous element |
| Space | Toggle switch on/off |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-label` | If label text unclear | Describe toggle state, e.g., "Toggle dark mode" |
| `aria-checked` | If using custom switch | `"true"` or `"false"` (automatic with native input) |

## States for different contexts

```html
<!-- Feature toggle (on = enabled) -->
<label>
  <input type="checkbox" class="comp-switch" checked>
  Advanced search
</label>

<!-- Mode toggle (on = dark mode active) -->
<label>
  <input type="checkbox" id="theme-toggle" class="comp-switch">
  Dark mode
</label>

<!-- Permission toggle (on = granted) -->
<label>
  <input type="checkbox" class="comp-switch">
  Allow notifications
</label>

<!-- Visibility toggle (on = visible) -->
<label>
  <input type="checkbox" class="comp-switch">
  Show password
</label>
```

## Density modes

Switch size and label font scale with `[data-density]`:

| Density | Switch size | Label font |
|---------|------------|-----------|
| `compact` | 32px × 18px | 0.875rem |
| `default` | 40px × 24px | 0.875rem |
| `comfortable` | 48px × 28px | 0.9375rem |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Switch off background | Light gray |
| `--color-accent` | Switch on background | Brand color |
| `--color-fg-inverse` | Slider (dot) color | White/light color |
| `--transition-duration-fast` | Slider animation | Smooth 120ms transition |

## AI / machine-readable notes

- **Selector pattern:** `comp-switch` on input element (uses `type="checkbox"` semantically)
- **State:** `:checked` pseudo-class or `checked` HTML attribute
- **Label:** Always include label text or `aria-label`; switch rarely used alone
- **Async actions:** If toggle triggers async operation, show spinner and update state when complete
- **Responsive:** Size scales with density; no breakpoint changes needed
- **Copy-paste use:** Replace `id` and label text; structure unchanged

## Related patterns

- **Checkbox:** Multiple independent selections
- **Radio:** Single selection from mutually exclusive options
- **Input (type="range"):** Gradient slider for continuous values
