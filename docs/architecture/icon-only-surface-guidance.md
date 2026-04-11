# Icon-only Surface Guidance (M2)

> Last reviewed: 2026-04-11

This guide defines minimum accessibility rules for icon-only interactive surfaces.

## Scope
- `icon-button`
- icon-only `button`
- icon-only `link`
- icon-only trigger surfaces in overlay/navigation examples

## Required Rules
1. Accessible name is mandatory
- Provide `aria-label` or `aria-labelledby` on every icon-only interactive element.
- Decorative icon content must be `aria-hidden="true"`.

2. Semantic element choice must stay correct
- Use `<button>` for in-page actions.
- Use `<a>` for navigation.

3. Disabled behavior must be semantic
- For buttons: use native `disabled`.
- For links: if disabled-like state is needed, use `aria-disabled="true"` and block interaction in app logic.

4. Focus visibility must remain obvious
- Do not remove default focus visibility without equivalent replacement.
- Verify focus ring/outline in both light and dark modes.

## Minimal Examples
```html
<button class="icon-button icon-button-sm" type="button" aria-label="Open quick menu">
  <span aria-hidden="true">☰</span>
</button>

<a class="link" href="/settings" aria-label="Open settings page">
  <span aria-hidden="true">⚙</span>
</a>
```

## QA Checks
- Keyboard: `Tab` focus reaches icon-only controls.
- Screen reader: control name is announced meaningfully.
- Contrast: icon and focus indication remain readable in dark mode.

## Related Docs
- `docs/architecture/core-accessibility-expectations.md`
- `docs/testing/manual-accessibility-qa-checklist.md`
