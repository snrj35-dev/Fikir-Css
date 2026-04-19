# Split Button

> Support level: **Beta** | Surface key: `component.splitButton` | Canonical: `.split-button`

## When to use

Primary action immediately visible olsun ama yanında related secondary actions bir menüde toplansın istediğinizde kullanın.

- ✓ Publish / schedule / duplicate gibi birincil + ikincil aksiyon akışları
- ✓ Data table row veya toolbar içindeki action groups
- ✓ Settings ve release workflow ekranları
- ✗ Tek aksiyon varsa normal `button`
- ✗ Menü tek etkileşim yüzeyse doğrudan `dropdown-menu`

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `split-button` | Composite wrapper | Pair with `dropdown-menu` when using menu disclosure helpers |
| `split-button-action` | Primary action trigger | Combine with `btn` recipe classes |
| `split-button-toggle` | Secondary menu toggle | Combine with `btn` recipe classes |
| `dropdown-menu-content` | Reused secondary menu panel | Existing dropdown surface |
| `dropdown-menu-item` | Reused menu action item | Existing dropdown surface |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Closed | Default | `data-open="false"` on root + `aria-expanded="false"` on toggle |
| Open | Toggle click / keyboard | `data-open="true"` on root + `aria-expanded="true"` on toggle |
| Disabled primary | Primary unavailable | `disabled` on `split-button-action` |
| Disabled toggle | Secondary actions unavailable | `disabled` on `split-button-toggle` |

## Basic usage

```html
<div id="release-actions" class="split-button dropdown-menu" data-open="false">
  <button class="split-button-action btn btn-solid btn-primary btn-sm" type="button">
    Publish now
  </button>
  <button
    class="split-button-toggle btn btn-solid btn-primary btn-sm"
    type="button"
    data-dropdown-toggle="release-actions"
    data-split-button-toggle
    aria-label="Open publish options"
    aria-haspopup="menu"
    aria-expanded="false"
    aria-controls="release-actions-menu"
  >
    <span aria-hidden="true">▾</span>
  </button>

  <div id="release-actions-menu" class="dropdown-menu-content" data-split-button-menu role="menu">
    <button class="dropdown-menu-item" type="button" role="menuitem" data-dropdown-close="release-actions">
      Schedule
    </button>
    <button class="dropdown-menu-item" type="button" role="menuitem" data-dropdown-close="release-actions">
      Save draft
    </button>
    <button class="dropdown-menu-item" type="button" role="menuitem" data-dropdown-close="release-actions">
      Duplicate
    </button>
  </div>
</div>
```

## Tone / size alignment

Action ve toggle aynı button recipe kombinasyonunu taşımalıdır.

```html
<div class="split-button dropdown-menu" data-open="false">
  <button class="split-button-action btn btn-outline btn-neutral btn-lg" type="button">Export</button>
  <button
    class="split-button-toggle btn btn-outline btn-neutral btn-lg"
    type="button"
    aria-label="Open export options"
    aria-haspopup="menu"
    aria-expanded="false"
  >
    <span aria-hidden="true">▾</span>
  </button>
</div>
```

## Accessibility checklist

- [x] Primary action and toggle are separate native `<button>` elements
- [x] Toggle exposes `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls`
- [x] Menu actions use `role="menuitem"`
- [x] Focus order is primary action -> toggle -> menu items
- [x] Toggle keeps visible focus treatment via shared button styles + joined surface focus stacking
- [x] Escape can close the menu and return focus to the toggle in the demo wiring

### Keyboard behavior

- `Tab`: move to primary action, then toggle
- `Enter` / `Space` on primary action: run primary action
- `Enter`, `Space`, or `ArrowDown` on toggle: open menu
- `ArrowUp` / `ArrowDown` inside menu: move between menu items
- `Escape`: close menu and return focus to toggle

### ARIA requirements

| ARIA | When | Value |
|------|------|-------|
| `aria-haspopup` | Toggle button | `"menu"` |
| `aria-expanded` | Toggle button | `"true"` or `"false"` |
| `aria-controls` | Toggle button | ID of `dropdown-menu-content` |
| `role="menu"` | Secondary panel | On `dropdown-menu-content` |
| `role="menuitem"` | Secondary actions | On each `dropdown-menu-item` |

## AI / machine-readable notes

- **Composition rule:** `split-button` only owns the joined triggers; menu panel/items reuse `dropdown-menu-content` and `dropdown-menu-item`
- **Recipe rule:** keep identical `btn` variant/tone/size classes on both triggers
- **State rule:** open/closed state is attribute-driven with `data-open` on root
- **Keyboard rule:** if behavior is wired, focus should return to `split-button-toggle` when the menu closes

## Related patterns

- `button`
- `dropdown-menu`
- `data-table-toolbar`
