# Segmented Control

> Support level: **Supported** | Surface key: `component.segmentedControl` | Canonical: `.comp-segmented-control`

## When to use

Button group for mutually exclusive options. Compact alternative to radio buttons or select.

- ✓ View mode toggle (grid/list/table)
- ✓ Time period selection (day/week/month)
- ✓ Mutually exclusive options (2-5 items)
- ✓ Inline option selection
- ✗ Many options (use select instead)
- ✗ Independent selections (use checkboxes)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-segmented-control` | Control wrapper | n/a |
| `comp-segmented-item` | Individual segment | n/a |
| `comp-segmented-item-selected` | Selected segment | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Default | Initial | First selected (or none) |
| Selected | Clicked | Segment highlighted |
| Hover | Mouse over | Button hover state |
| Disabled | Unavailable | Item grayed out |

## Basic usage

```html
<!-- View toggle (grid/list/table) -->
<div class="comp-segmented-control" role="group" aria-label="View mode" style="display: inline-flex; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; overflow: hidden;">
  <button class="comp-segmented-item comp-segmented-item-selected" aria-pressed="true" style="padding: 0.75rem 1.5rem; background: var(--color-accent); color: white; border: none; cursor: pointer; border-right: 1px solid var(--color-border-subtle);">⊞ Grid</button>
  <button class="comp-segmented-item" aria-pressed="false" style="padding: 0.75rem 1.5rem; background: transparent; color: var(--color-fg-base); border: none; cursor: pointer; border-right: 1px solid var(--color-border-subtle);">☰ List</button>
  <button class="comp-segmented-item" aria-pressed="false" style="padding: 0.75rem 1.5rem; background: transparent; color: var(--color-fg-base); border: none; cursor: pointer;">⊞ Table</button>
</div>

<!-- Time period selection -->
<div class="comp-segmented-control" role="group" aria-label="Time period" style="display: inline-flex; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; overflow: hidden; background: var(--color-bg-subtle);">
  <button class="comp-segmented-item" aria-pressed="false" style="padding: 0.5rem 1rem; background: transparent; border: none; cursor: pointer; border-right: 1px solid var(--color-border-subtle); font-size: 0.875rem;">Day</button>
  <button class="comp-segmented-item comp-segmented-item-selected" aria-pressed="true" style="padding: 0.5rem 1rem; background: white; border: none; cursor: pointer; border-right: 1px solid var(--color-border-subtle); font-size: 0.875rem; font-weight: 500;">Week</button>
  <button class="comp-segmented-item" aria-pressed="false" style="padding: 0.5rem 1rem; background: transparent; border: none; cursor: pointer; border-right: 1px solid var(--color-border-subtle); font-size: 0.875rem;">Month</button>
  <button class="comp-segmented-item" aria-pressed="false" style="padding: 0.5rem 1rem; background: transparent; border: none; cursor: pointer; font-size: 0.875rem;">Year</button>
</div>

<!-- Sort order toggle -->
<div class="comp-segmented-control" role="group" aria-label="Sort order" style="display: inline-flex; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; overflow: hidden;">
  <button class="comp-segmented-item comp-segmented-item-selected" aria-pressed="true" style="padding: 0.5rem 1rem; background: var(--color-bg-subtle); border: none; cursor: pointer; border-right: 1px solid var(--color-border-subtle); display: flex; align-items: center; gap: 0.25rem; font-size: 0.875rem;">↑ Asc</button>
  <button class="comp-segmented-item" aria-pressed="false" style="padding: 0.5rem 1rem; background: transparent; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; font-size: 0.875rem;">↓ Desc</button>
</div>

<!-- With icons only -->
<div class="comp-segmented-control" role="group" aria-label="Alignment" style="display: inline-flex; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; overflow: hidden;">
  <button class="comp-segmented-item" aria-pressed="false" aria-label="Left align" style="padding: 0.5rem; border: none; cursor: pointer; border-right: 1px solid var(--color-border-subtle); font-size: 1.25rem;">⬅</button>
  <button class="comp-segmented-item comp-segmented-item-selected" aria-pressed="true" aria-label="Center align" style="padding: 0.5rem; background: var(--color-bg-subtle); border: none; cursor: pointer; border-right: 1px solid var(--color-border-subtle); font-size: 1.25rem;">⬍</button>
  <button class="comp-segmented-item" aria-pressed="false" aria-label="Right align" style="padding: 0.5rem; border: none; cursor: pointer; font-size: 1.25rem;">➡</button>
</div>
```

## JavaScript toggle

```javascript
function initSegmentedControl(selector) {
  const controls = document.querySelectorAll(selector);
  
  controls.forEach(control => {
    control.addEventListener('click', (e) => {
      if (e.target.classList.contains('comp-segmented-item')) {
        control.querySelectorAll('.comp-segmented-item').forEach(item => {
          item.classList.remove('comp-segmented-item-selected');
          item.setAttribute('aria-pressed', 'false');
        });
        e.target.classList.add('comp-segmented-item-selected');
        e.target.setAttribute('aria-pressed', 'true');
        
        // Trigger change event or callback
        const event = new CustomEvent('segmentedChange', { detail: { value: e.target.dataset.value } });
        control.dispatchEvent(event);
      }
    });
  });
}

initSegmentedControl('.comp-segmented-control');
```

## Accessibility checklist

- [x] **Semantic:** Uses button group with role="group"
- [x] **Label:** Group has aria-label describing purpose
- [x] **Pressed state:** Buttons have aria-pressed="true/false"
- [x] **Keyboard:** Tab/Shift+Tab navigate group; arrow keys select within group
- [x] **Focus:** Visible focus on all buttons
- [x] **Screen reader:** Selected state announced

## Keyboard behavior

| Key | Action |
|-----|--------|
| `Tab` | Move to first item in group |
| `Shift+Tab` | Move to previous item |
| `→/↓` | Move to next segment |
| `←/↑` | Move to previous segment |
| `Space/Enter` | Select current segment |
| `Home/End` | First/last segment |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `role="group"` | Control group | Container for buttons |
| `aria-label` (group) | Group purpose | "View mode", "Sort order", etc. |
| `aria-pressed="true/false"` | Button state | true = selected |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-subtle` | Control border | Separator color |
| `--color-bg-subtle` | Inactive segment | Subtle background |
| `--color-accent` | Selected segment | Highlight color |
| `--space-*` | Padding | Scales with density |

## Variants

- **Text + icon:** Icon and text label
- **Icon only:** Icon buttons without text
- **Full width:** Segments stretch to fill container
- **Outline style:** No fill, just borders
- **With colors:** Tinted backgrounds for each option

## Sizes

- **Small (compact):** 0.5rem padding, tight spacing
- **Medium (default):** 0.75rem padding, standard spacing
- **Large:** 1rem padding, generous spacing

## When NOT to use

- ❌ More than 5-6 options (use select or menu)
- ❌ Options can be independently toggled (use checkboxes)
- ❌ Complex option description needed (use radio with help text)
- ❌ Space-constrained (use select or dropdown)

## AI / machine-readable notes

- **Selector pattern:** `comp-segmented-control` group with `comp-segmented-item` children
- **Structure:** Button group with `role="group"` and `aria-label`
- **State:** `aria-pressed="true/false"` on each button
- **Selection:** Only one button has `aria-pressed="true"` at a time
- **Styling:** Selected item has `comp-segmented-item-selected` class
- **Keyboard:** Arrow keys navigate items; Space/Enter selects
- **Copy-paste use:** Update labels and data attributes

## Related patterns

- **Radio:** Mutually exclusive with visible options
- **Select:** Dropdown for same purpose
- **Tab:** Tab-based navigation (different use case)
- **Button group:** Non-exclusive button collection
