# Password Input

> Support level: **Supported** | Pattern key: `pattern.passwordInput` | Canonical: `data-pattern="password-input"`

## When to use

Password entry field with a visibility toggle. The `data-pattern="password-input"` wrapper adds a toggle button to a standard `input[type="password"]` and supports an optional strength indicator.

- ✓ Login and registration forms
- ✓ Security and profile setting screens
- ✓ Any sensitive data entry that requires verification
- ✗ Simple numeric PIN entry (use standard `input` with `inputmode="numeric"`)
- ✗ Generic text entry (use standard `input`)

## Canonical anatomy

| Slot / Attribute | Role | Element |
|------------------|------|---------|
| `data-pattern` | Root container | `div` |
| `data-slot="input"` | Password input | `input[type="password"]` |
| `data-slot="toggle"`| Visibility trigger | `button` |
| `data-visible` | `"true" \| "false"` | Visibility state |
| `data-strength` | `"weak" \| "fair" \| "strong" \| "very-strong"` | Strength level |
| `data-slot="strength"` | Strength bars wrapper | `div` |

## Basic usage

```html
<div class="field">
  <label class="label" for="pwd">Password</label>
  <div data-pattern="password-input">
    <input
      id="pwd"
      class="input"
      data-slot="input"
      type="password"
      autocomplete="current-password"
      placeholder="Enter your password"
      required
    />
    <button
      data-slot="toggle"
      type="button"
      aria-label="Show password"
      aria-controls="pwd"
      aria-pressed="false"
    >
      <span data-icon="show" aria-hidden="true">👁</span>
      <span data-icon="hide" aria-hidden="true">🙈</span>
    </button>
  </div>
</div>
```

## With strength indicator

```html
<div class="field">
  <label class="label" for="new-pwd">New password</label>
  <div data-pattern="password-input" data-strength="strong">
    <input
      id="new-pwd"
      class="input"
      data-slot="input"
      type="password"
      autocomplete="new-password"
      required
    />
    <button data-slot="toggle" type="button" aria-label="Show password">
      <span data-icon="show" aria-hidden="true">👁</span>
      <span data-icon="hide" aria-hidden="true">🙈</span>
    </button>
  </div>
  <div data-slot="strength" aria-hidden="true">
    <div data-slot="strength-bar"></div>
    <div data-slot="strength-bar"></div>
    <div data-slot="strength-bar"></div>
    <div data-slot="strength-bar"></div>
  </div>
  <p class="helper-text">Use 8+ characters with numbers and symbols.</p>
</div>
```

## Accessibility checklist

- [x] **Trigger semantics:** use `aria-label` updated to "Show password" / "Hide password" via JavaScript
- [x] **Linking:** toggle button uses `aria-controls="[input-id]"`
- [x] **State:** toggle button uses `aria-pressed="true/false"`
- [x] **Type toggle:** JavaScript must switch `input[type]` between `"password"` and `"text"`
- [x] **Keyboard:** trigger is reachable via Tab and activated by Enter/Space

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-default` | Input border | Standard field border |
| `--color-tone-danger` | "Weak" strength color | Low security alert |
| `--color-tone-warning` | "Fair" strength color | Moderate security |
| `--color-tone-success` | "Strong" strength color | High security |
| `--space-1`, `--space-2` | Toggle padding & gaps | Scales with density |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="password-input"`
- **State model:** visibility controlled by `data-visible="true/false"`
- **Strength model:** uses `data-strength="weak | fair | strong | very-strong"`
- **Slots:** `input`, `toggle`, `strength`, `strength-bar`
- **Behavior:** application must toggle `input.type` and `aria-label` based on interaction
- **Strength display:** `[data-slot="strength"]` child bars colorize based on root `data-strength` attribute

## Related

- **`input`** — base text entry component
- **`field`** — standard form field container
- **`auth-screen`** — page-level authentication layout
- **`button`** — base button styling for the toggle
