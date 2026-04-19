# Tabs

> Support level: **Supported** | Surface key: `component.tabs` | Canonical: `.tabs-list`

## When to use

Section switcher that shows one content panel at a time within the same view.

- ✓ Settings pages with multiple category sections
- ✓ Detail views with multiple data facets (Overview, Activity, Settings)
- ✓ Dashboard sections on the same screen level
- ✗ Navigation between different pages/routes — use `navbar` or `sidebar-nav`
- ✗ Sequential multi-step flows — use `stepper`
- ✗ Collapsible FAQ-style content — use `accordion`

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `tabs-list` | `role="tablist"` container | Add `aria-label` describing the tab set |
| `tabs-trigger` | Individual tab button (`role="tab"`) | `aria-selected`, `aria-controls`, `tabindex` |
| `tabs-panel` | Content panel (`role="tabpanel"`) | `hidden` when inactive |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Selected | `aria-selected="true"` on `tabs-trigger` | Active tab; `tabindex="0"` |
| Unselected | `aria-selected="false"` on `tabs-trigger` | Inactive tab; `tabindex="-1"` |
| Panel visible | `hidden` attribute removed from `tabs-panel` | Active panel |
| Panel hidden | `hidden` attribute on `tabs-panel` | Inactive panel |

## Basic usage

```html
<div role="tablist" class="tabs-list" aria-label="Account sections">
  <button role="tab" class="tabs-trigger" aria-selected="true"
          aria-controls="panel-profile" id="tab-profile">
    Profile
  </button>
  <button role="tab" class="tabs-trigger" aria-selected="false"
          aria-controls="panel-billing" id="tab-billing" tabindex="-1">
    Billing
  </button>
  <button role="tab" class="tabs-trigger" aria-selected="false"
          aria-controls="panel-security" id="tab-security" tabindex="-1">
    Security
  </button>
</div>

<div role="tabpanel" class="tabs-panel" id="panel-profile" aria-labelledby="tab-profile">
  Profile settings content
</div>
<div role="tabpanel" class="tabs-panel" id="panel-billing" aria-labelledby="tab-billing" hidden>
  Billing content
</div>
<div role="tabpanel" class="tabs-panel" id="panel-security" aria-labelledby="tab-security" hidden>
  Security content
</div>
```

## JS toggle (minimal roving tabindex)

```js
const tabs = document.querySelectorAll('.tabs-trigger')
const panels = document.querySelectorAll('.tabs-panel')

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => activateTab(i))
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') activateTab((i + 1) % tabs.length)
    if (e.key === 'ArrowLeft') activateTab((i - 1 + tabs.length) % tabs.length)
  })
})

function activateTab(index) {
  tabs.forEach((t, i) => {
    t.setAttribute('aria-selected', String(i === index))
    t.tabIndex = i === index ? 0 : -1
  })
  panels.forEach((p, i) => { p.hidden = i !== index })
  tabs[index].focus()
}
```

## Accessibility checklist

- [x] **tablist role:** `tabs-list` must have `role="tablist"` and `aria-label`
- [x] **tab role:** each `tabs-trigger` must have `role="tab"`, `aria-selected`, and `aria-controls`
- [x] **tabpanel role:** each `tabs-panel` must have `role="tabpanel"` and `aria-labelledby`
- [x] **Roving tabindex:** only selected tab has `tabindex="0"`; others have `tabindex="-1"`
- [x] **Hidden panels:** use `hidden` attribute (not CSS `display:none`) on inactive panels
- [x] **Arrow key navigation:** left/right arrows move focus between tabs

## Keyboard behavior

| Key | Action |
|-----|--------|
| Tab | Move focus into/out of the tab list |
| Arrow Right / Arrow Left | Move focus between tabs (roving tabindex) |
| Enter or Space | Activate focused tab (if not automatic activation) |
| Home | Move focus to first tab |
| End | Move focus to last tab |

## ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `role="tablist"` | Tab list container | On `tabs-list` |
| `aria-label` | Tab list needs accessible name | Short description of the tab group |
| `role="tab"` | Each tab button | On `tabs-trigger` |
| `aria-selected` | Every tab | `"true"` (active) or `"false"` (inactive) |
| `aria-controls` | Every tab | ID of associated `tabs-panel` |
| `role="tabpanel"` | Each content panel | On `tabs-panel` |
| `aria-labelledby` | Each panel | ID of associated `tabs-trigger` |

## Density modes

Tab padding and font-size scale with `[data-density]`:

| Density | Effect |
|---------|--------|
| `compact` | Reduced padding, smaller font |
| `default` | Standard padding and font |
| `comfortable` | Increased padding, larger font |

No CSS changes needed — tokens handle it automatically.

## Shape and motion

- **Shape:** `[data-shape]` does not significantly affect tabs (tabs use underline indicator)
- **Motion:** Active indicator transition respects `prefers-reduced-motion`

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-accent` | Active tab indicator / selected color | Brand color |
| `--color-fg-muted` | Inactive tab text color | Dimmed |
| `--space-3`, `--space-4` | Tab padding | Scales with density |
| `--font-size-sm` | Tab text size | Scales with density |
| `--transition-duration-fast` | Active indicator animation | 0ms if reduced-motion |

## Anti-patterns

```html
<!-- ✗ Don't omit aria-selected on tabs -->
<button class="tabs-trigger">Profile</button>

<!-- ✓ Always include aria-selected -->
<button role="tab" class="tabs-trigger" aria-selected="true" aria-controls="panel-profile">Profile</button>

<!-- ✗ Don't use tabs for route navigation -->
<!-- ✓ Use navbar or sidebar-nav for page-level navigation -->
```

## AI / machine-readable notes

- **Selector anatomy:** `tabs-list[role=tablist] > tabs-trigger[role=tab]` + sibling `tabs-panel[role=tabpanel]`
- **State indicator:** `aria-selected="true"` on the active tab; `hidden` attribute on inactive panels
- **Roving tabindex:** JS required for keyboard arrow navigation (see JS toggle example above)
- **No size modifiers:** tab size is controlled by density tokens only
- **Copy-paste use:** duplicate tab triggers and panels; update `id`/`for` relationships
