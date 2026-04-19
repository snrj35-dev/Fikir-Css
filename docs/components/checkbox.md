# Checkbox

> Support level: **Supported** | Surface key: `component.checkbox` | Canonical: `.comp-checkbox`

## When to use

Single selection from multiple independent options. User can select zero, one, or more items.

- ✓ Enable/disable features
- ✓ Accept terms or conditions
- ✓ Multiple selections from a list
- ✓ Toggle preferences or settings
- ✗ Single selection from mutually exclusive options (use `radio` instead)
- ✗ On/off toggle (use `switch` instead)
- ✗ List of related items (use checkboxes in `input-group` instead)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-checkbox` | Checkbox input wrapper | n/a |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Unchecked | Default | `<input type="checkbox" class="comp-checkbox">` |
| Checked | `:checked` or `checked` attribute | Visual checkmark shown |
| Indeterminate | `indeterminate` property (JS) | Dash shown (parent group state) |
| Disabled | `disabled` attribute | Grayed, not interactive |
| Focus | `:focus-visible` (automatic) | Outline ring visible |
| Hover | `:hover` (automatic) | Background highlight |

## Basic usage

```html
<!-- Simple checkbox with label -->
<label>
  <input type="checkbox" class="comp-checkbox">
  Subscribe to newsletter
</label>

<!-- Checkbox in field (standalone) -->
<div class="comp-field">
  <label>
    <input type="checkbox" id="agree" class="comp-checkbox">
    I agree to the terms
  </label>
</div>

<!-- Multiple checkboxes (in input-group) -->
<fieldset>
  <legend>Select interests:</legend>
  <div class="comp-input-group">
    <label>
      <input type="checkbox" name="interests" value="music" class="comp-checkbox">
      Music
    </label>
    <label>
      <input type="checkbox" name="interests" value="sports" class="comp-checkbox">
      Sports
    </label>
    <label>
      <input type="checkbox" name="interests" value="tech" class="comp-checkbox">
      Technology
    </label>
  </div>
</fieldset>

<!-- Checkbox with helper text -->
<label style="display: flex; flex-direction: column; gap: 0.5rem;">
  <span>
    <input type="checkbox" id="backup" class="comp-checkbox">
    <span>Enable daily backups</span>
  </span>
  <span style="font-size: 0.75rem; color: var(--color-fg-muted); margin-left: 1.5rem;">
    Automatic backup runs at 2:00 AM
  </span>
</label>
```

## Indeterminate state (parent checkbox)

```html
<!-- Parent checkbox (indeterminate when some children checked) -->
<fieldset>
  <legend>Permissions</legend>
  <label>
    <input 
      type="checkbox" 
      id="all-perms" 
      class="comp-checkbox"
      aria-controls="perm-group"
    >
    All permissions
  </label>
  
  <div id="perm-group" style="margin-left: 1.5rem; margin-top: 0.5rem;">
    <label>
      <input type="checkbox" name="permissions" value="read" class="comp-checkbox">
      Read
    </label>
    <label>
      <input type="checkbox" name="permissions" value="write" class="comp-checkbox">
      Write
    </label>
    <label>
      <input type="checkbox" name="permissions" value="admin" class="comp-checkbox">
      Admin
    </label>
  </div>
</fieldset>
```

## Accessibility checklist

- [x] **Semantic HTML:** Uses native `<input type="checkbox">` element
- [x] **Label association:** Each checkbox has associated `<label>` (implicit or explicit `for="id"`)
- [x] **Keyboard:** Tab/Shift+Tab to navigate, Space to toggle
- [x] **Focus visible:** `:focus-visible` outline visible
- [x] **Indeterminate:** Dash shows partial selection state (parent checkbox)
- [x] **Disabled:** Visually and functionally disabled; excluded from tab order
- [x] **Color not only signal:** Checkmark + border color change, not just color

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Navigate to checkbox |
| Shift+Tab | Navigate to previous element |
| Space | Toggle checkbox state |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-checked` | Indeterminate state (rare) | `"mixed"` (usually automatic with `:indeterminate`) |
| `aria-controls` | Parent checkbox controls children | ID of child group |

## Grouping checkboxes

Use `<fieldset>` + `<legend>` to group related checkboxes:

```html
<fieldset>
  <legend>Which features would you like?</legend>
  <label>
    <input type="checkbox" name="features" class="comp-checkbox">
    Feature A
  </label>
  <label>
    <input type="checkbox" name="features" class="comp-checkbox">
    Feature B
  </label>
</fieldset>
```

## Density modes

Checkbox size and label font scale with `[data-density]`:

| Density | Checkbox size | Label font |
|---------|---------------|-----------|
| `compact` | 16px × 16px | 0.875rem |
| `default` | 20px × 20px | 0.875rem |
| `comfortable` | 24px × 24px | 0.9375rem |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-surface` | Checkbox background | Light surface |
| `--color-border-default` | Border | Subtle border |
| `--color-accent` | Checkmark & focus | Brand color |
| `--space-*` | Gap between checkbox and label | Scales with density |

## AI / machine-readable notes

- **Selector pattern:** `comp-checkbox` on input element
- **State:** `:checked` pseudo-class, `checked` HTML attribute, or JavaScript `indeterminate` property
- **Grouping:** Use `<fieldset>` + `<legend>` for multiple checkboxes
- **Label:** Always include label text; wrap checkbox in `<label>` for implicit association
- **Name attribute:** Use `name` for form submission grouping
- **Copy-paste use:** Adjust `name`, `value`, and label text; structure unchanged

## Related patterns

- **Radio:** Single selection from mutually exclusive options
- **Switch:** On/off toggle (binary choice)
- **Input-group:** Group of related inputs with shared layout
