# Headless UI Adapter Guide

Fikir CSS is a **zero-runtime** design system. For complex components that require heavy state management and accessibility (like date pickers, comboboxes, or multi-selects), we recommend using a **Headless UI** library and applying Fikir CSS classes and attributes to its unstyled elements.

## Recommended Libraries

- **React:** [Radix UI](https://www.radix-ui.com/), [React Aria](https://react-spectrum.adobe.com/react-aria/)
- **Vue / Svelte / Solid / React:** [Zag.js](https://zagjs.com/)
- **Vanilla / Generic:** [Headless UI](https://headlessui.com/)

## Integration Example: Zag.js Combobox

Zag.js provides the logic, Fikir CSS provides the "surface".

### 1. The Logic (JS)

```javascript
import * as combobox from "@zag-js/combobox"
import { useMachine, normalizeProps } from "@zag-js/react"

const [state, send] = useMachine(combobox.machine({ id: "1" }))
const api = combobox.connect(state, send, normalizeProps)
```

### 2. The Surface (HTML + Fikir CSS)

Apply Fikir CSS classes to the elements returned by the headless library.

```html
<div class="field" {...api.rootProps}>
  <label class="label" {...api.labelProps}>Select Fruit</label>
  
  <div class="input-group">
    <input class="input" {...api.inputProps} />
    <button class="icon-button" {...api.triggerProps}>▼</button>
  </div>
</div>

<ul class="popover" {...api.contentProps}>
  {options.map((item) => (
    <li 
      key={item.id} 
      class="dropdown-item" 
      data-active={api.highlightedValue === item.id ? "true" : "false"}
      {...api.getItemProps({ item })}
    >
      {item.label}
    </li>
  ))}
</ul>
```

## Key Mapping Patterns

| Headless State | Fikir CSS Trigger |
| :--- | :--- |
| `isOpen` | `data-open="true"` |
| `isHighlighted` | `data-active="true"` |
| `isSelected` | `aria-selected="true"` |
| `isDisabled` | `:disabled` or `aria-disabled="true"` |
| `isInvalid` | `aria-invalid="true"` |

## Benefits of this approach

1. **A11Y by default:** Headless libraries handle the complex ARIA relationships and keyboard navigation.
2. **Zero bloat:** You don't load a "Fikir React" library; you just use the CSS you already have.
3. **Infinite flexibility:** You can swap the headless engine without changing your design system.
