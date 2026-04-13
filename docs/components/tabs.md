# Tabs

> Support level: **Supported** | Surface key: `component.tabList`

## Classes

| Class | Role |
|-------|------|
| `tab-list` | `role="tablist"` container |
| `tab` | Individual tab button (`role="tab"`) |
| `tab-panel` | Content panel (`role="tabpanel"`) |

## States

| State | How |
|-------|-----|
| Selected | `aria-selected="true"` on `tab` |
| Unselected | `aria-selected="false"` on `tab` |
| Panel visible | Remove `hidden` attribute from `tab-panel` |

## Basic usage

```html
<div role="tablist" class="tab-list" aria-label="Account sections">
  <button role="tab" class="tab" aria-selected="true"
          aria-controls="panel-profile" id="tab-profile">
    Profile
  </button>
  <button role="tab" class="tab" aria-selected="false"
          aria-controls="panel-billing" id="tab-billing" tabindex="-1">
    Billing
  </button>
  <button role="tab" class="tab" aria-selected="false"
          aria-controls="panel-security" id="tab-security" tabindex="-1">
    Security
  </button>
</div>

<div role="tabpanel" class="tab-panel" id="panel-profile" aria-labelledby="tab-profile">
  Profile settings content
</div>
<div role="tabpanel" class="tab-panel" id="panel-billing" aria-labelledby="tab-billing" hidden>
  Billing content
</div>
<div role="tabpanel" class="tab-panel" id="panel-security" aria-labelledby="tab-security" hidden>
  Security content
</div>
```

## Accessibility

- `tab-list` must have `role="tablist"` and `aria-label`
- Each `tab` must have `role="tab"`, `aria-selected`, and `aria-controls`
- Non-selected tabs get `tabindex="-1"` (only one tab in the tab sequence at a time)
- Arrow keys (← →) move focus between tabs per ARIA pattern
- Panel uses `role="tabpanel"` and `aria-labelledby` pointing to its tab
