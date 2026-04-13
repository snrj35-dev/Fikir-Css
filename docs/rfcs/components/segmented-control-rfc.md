# RFC: Segmented Control (M2)

## Status
- Status: Accepted
- Scope: M2 competitive gap closure surface
- Support level: experimental (target: supported at M2 promotion wave)

## Purpose
Segmented control is a horizontal button group where exactly one option is active at a time. Common use: view-mode toggles (list/grid), time-range selectors, filter switching. Distinct from tabs in that it controls a state value, not a page panel.

## References
- `docs/contracts/naming-convention-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/segmented-control.css`

## Canonical Class Surface

| Selector | Purpose |
|----------|---------|
| `segmented-control` | Root container (`role="group"`) |
| `segmented-control-item` | Individual option wrapper |
| `segmented-control-input` | Hidden radio input |
| `segmented-control-label` | Visible label (styled as button) |

Forbidden aliases: `segmented-group`, `toggle-group`, `btn-group-segmented`.

## State Representation

- Active item: `segmented-control-input:checked` + sibling `segmented-control-label` styling via CSS `:has()` or adjacent sibling selector.
- Disabled item: `segmented-control-input:disabled` propagates to label via CSS.
- No JavaScript state classes required — pure CSS radio-button pattern.

## Variants

| Axis | Values |
|------|--------|
| Size | `segmented-control--sm`, `segmented-control--md` (default), `segmented-control--lg` |

## Accessibility Expectations

1. Root uses `role="group"` with `aria-label` or `aria-labelledby`.
2. Each option is a `<label>` wrapping a visually-hidden `<input type="radio">`.
3. Tab moves to first checked item; arrow keys navigate between items (native radio behavior).
4. Checked state communicated via native `checked` attribute — no `aria-checked` needed.
5. Disabled options have `disabled` attribute on the input.

## Token Consumption

- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-md`, `--radius-sm`
- Color: `--color-bg-default`, `--color-bg-surface`, `--color-fg-default`, `--color-fg-muted`, `--color-accent`, `--color-border-subtle`
- Shadow: `--shadow-sm`
- Typography: `--font-size-sm`, `--font-size-xs`

## Recipe Relationship
No recipe resolver in v1.0-M2. Size variant via modifier class.

## Open Questions
1. Should icon-only segments require `aria-label` enforcement via docs?
2. Vertical orientation variant — M3 or out of scope?
