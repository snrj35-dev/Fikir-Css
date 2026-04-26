# Copy Button

> Support level: **Supported** | Pattern key: `pattern.copyButton` | Canonical: `data-pattern="copy-button"`

## When to use

Interactive button pattern with built-in "copied" feedback state. Switches icons and labels when `data-copied="true"` is applied.

- ✓ Copying code blocks or snippets
- ✓ Copying API keys, tokens, or share URLs
- ✓ Any single-click "copy to clipboard" action
- ✗ Complex data export (use `data-table-toolbar` export)
- ✗ Navigation buttons (use standard `btn`)

## Canonical anatomy

| Slot / Attribute | Role | Element |
|------------------|------|---------|
| `data-pattern` | Root container | `button` |
| `data-copied` | `"true" \| "false"` | Active feedback state |
| `data-icon="copy"` | Default icon | `span` (aria-hidden) |
| `data-icon="check"`| Success icon | `span` (aria-hidden) |
| `data-label="copy"`| Default text label | `span` |
| `data-label="copied"`| Success text label | `span` |

## Basic usage

```html
<button
  class="btn btn-ghost btn-sm"
  data-pattern="copy-button"
  type="button"
  aria-label="Copy to clipboard"
>
  <span data-icon="copy" aria-hidden="true">📋</span>
  <span data-icon="check" aria-hidden="true">✓</span>
  <span data-label="copy">Copy</span>
  <span data-label="copied">Copied!</span>
</button>
```

## Icon only

```html
<button
  class="btn btn-ghost btn-xs"
  data-pattern="copy-button"
  type="button"
  aria-label="Copy to clipboard"
>
  <span data-icon="copy" aria-hidden="true">📋</span>
  <span data-icon="check" aria-hidden="true">✓</span>
</button>
```

## Accessibility checklist

- [x] **Accessible Name:** Always provide a descriptive `aria-label` (e.g., "Copy API key")
- [x] **State feedback:** Use a visually hidden `aria-live="polite"` region to announce "Copied!" to screen readers
- [x] **Icons:** Marking decorative icons with `aria-hidden="true"`
- [x] **Button semantics:** Uses native `<button>` element for keyboard accessibility

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-fg-default` | Icon/Label color | Inherited from button |
| `--color-tone-success` | Success icon color | For "check" icon |
| `--space-1`, `--space-2` | Icon-to-text gap | Scales with density |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="copy-button"`
- **State model:** feedback triggered by `data-copied="true"`. CSS hides `[data-icon="copy"]` and `[data-label="copy"]` while showing `[data-icon="check"]` and `[data-label="copied"]`.
- **Slots:** `data-icon="copy|check"`, `data-label="copy|copied"`
- **Behavior:** Application must handle the Clipboard API and toggle `data-copied` for a duration (e.g., 2000ms)
- **A11y:** Ensure `aria-label` reflects the target content description

## Related

- **`btn`** — the base component for styling
- **`code-block`** — common container for copy-button usage
- **`tooltip`** — for providing feedback when space is limited
- **`toast`** — for global copy confirmations
