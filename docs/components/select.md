# Select

> Support level: **Supported** | Surface key: `component.select` | Canonical: `.select`

## When to use

Dropdown list for selecting one option. Native HTML or custom styled.

- ✓ Single option selection
- ✓ Form field (required/optional)
- ✓ Filtering/sorting dropdown
- ✓ Option lists 3-20 items
- ✗ Large lists (use combobox/autocomplete)
- ✗ Multi-select (use checkboxes or multi-select)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `select` | Select input | n/a |
| `select-sm` | Small size | Modifier |
| `select-md` | Medium size (default) | Modifier |
| `select-lg` | Large size | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | Initial | Placeholder shown |
| Open | Click/focus | Options visible |
| Selected | Option chosen | Value shown |
| Disabled | Unavailable | Grayed out |
| Error | Invalid | Red border, error text |

## Basic usage

```html
<!-- Native select -->
<div class="field" style="margin-bottom: 1.5rem;">
  <label for="category" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Category</label>
  <select id="category" class="select select-md" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; font-size: 1rem;">
    <option value="">Select a category...</option>
    <option value="design">Design</option>
    <option value="development">Development</option>
    <option value="marketing">Marketing</option>
    <option value="sales">Sales</option>
  </select>
  <div class="helper-text" style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-fg-muted);">Choose your primary role</div>
</div>

<!-- Disabled select -->
<select class="select" disabled style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; opacity: 0.5; cursor: not-allowed;">
  <option>Unavailable</option>
</select>

<!-- Select with error -->
<div class="field">
  <label for="status" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Status</label>
  <select id="status" class="select" aria-invalid="true" aria-describedby="status-error" style="width: 100%; padding: 0.75rem; border: 2px solid var(--color-danger); border-radius: 0.5rem;">
    <option value="">Select status...</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </select>
  <div id="status-error" class="error-text" style="color: var(--color-danger); font-size: 0.875rem; margin-top: 0.5rem;">This field is required</div>
</div>
```

## With grouped options

```html
<select class="select" style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem;">
  <optgroup label="Frontend">
    <option value="react">React</option>
    <option value="vue">Vue</option>
    <option value="svelte">Svelte</option>
  </optgroup>
  <optgroup label="Backend">
    <option value="node">Node.js</option>
    <option value="python">Python</option>
    <option value="rust">Rust</option>
  </optgroup>
</select>
```

## Sizes

```html
<!-- Small -->
<select class="select-sm" style="padding: 0.5rem; font-size: 0.875rem;"><!-- options --></select>

<!-- Medium (default) -->
<select class="select-md" style="padding: 0.75rem; font-size: 1rem;"><!-- options --></select>

<!-- Large -->
<select class="select-lg" style="padding: 1rem; font-size: 1.125rem;"><!-- options --></select>
```

## Accessibility checklist

- [x] **Semantic:** Uses native `<select>` element
- [x] **Label:** Associated `<label>` with `for` attribute
- [x] **Required:** Required attribute set if needed
- [x] **Disabled:** Disabled state properly indicated
- [x] **Error:** aria-invalid="true" and aria-describedby
- [x] **Keyboard:** Tab navigates, arrow keys select
- [x] **Focus:** Visible focus indicator

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Move to next field |
| `↑/↓` | Navigate options (open) |
| `Enter/Space` | Open/select option |
| `Home/End` | First/last option |
| `Type letter` | Jump to option starting with letter |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `<label for="id">` | Associated label | Describes purpose |
| `required` | Required field | HTML attribute |
| `disabled` | Unavailable | HTML attribute |
| `aria-invalid="true"` | Error state | Set on invalid |
| `aria-describedby` | Error text | Links to error message |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-subtle` | Border color | Normal state |
| `--color-danger` | Error color | Invalid state |
| `--space-*` | Padding | Scales with density |

## Variants

- **Native select:** Browser default (best for mobile)
- **Custom styled:** CSS override of default
- **With placeholder:** Empty option with placeholder text
- **Grouped options:** `<optgroup>` for categories
- **Large lists:** Consider combobox/autocomplete instead

## DO's and DON'Ts

✅ **DO:**
- Use native `<select>` for accessibility
- Include placeholder option
- Group related options with `<optgroup>`
- Label every select field
- Show error states clearly

❌ **DON'T:**
- Use select for >20 options (use combobox)
- Hide the label
- Remove focus indicator
- Use select for always-expanded menu (use menu pattern)
- Trigger actions on select (require explicit button)

## AI / machine-readable notes

- **Selector pattern:** `select` with optional size modifiers (sm/md/lg)
- **Structure:** Native `<select>` with `<option>` children and `<optgroup>` for groups
- **Label:** Associated via `<label for="id">`
- **Error:** `aria-invalid="true"` + `aria-describedby` linking to error text
- **Copy-paste use:** Update options, placeholder, and label

## Related patterns

- **Input:** Text input field
- **Combobox:** Searchable select for large lists
- **Radio:** Mutually exclusive selection (visible options)
- **Checkbox:** Multi-select from options
