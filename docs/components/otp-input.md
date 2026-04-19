# OTP Input

> Support level: **Supported** | Surface key: `component.otpInput` | Canonical: `.comp-otp-input`

## When to use

Multi-digit code input (SMS, authenticator). Separated input fields or single field with auto-advance.

- ✓ SMS/email verification codes
- ✓ One-time password input
- ✓ 2FA / MFA codes
- ✓ Confirmation codes
- ✗ Phone number input (use input with pattern)
- ✗ Credit card (use input with formatting)

## Classes

| Class | Role | Modifiers |
|-------|------|-----------|
| `comp-otp-input` | OTP wrapper | n/a |
| `comp-otp-digit` | Individual digit field | n/a |
| `comp-otp-digit-filled` | Digit entered | Modifier |
| `comp-otp-digit-active` | Current focus | Modifier |

## States

| State | Activation | HTML pattern |
|-------|-----------|--------------|
| Empty | Initial | All fields empty |
| Partial | Some digits entered | Mix of filled/empty |
| Complete | All digits entered | All fields filled |
| Error | Invalid code | Red border, error message |

## Basic usage

```html
<!-- Separated digit inputs (6-digit code) -->
<div class="comp-otp-input" style="display: flex; gap: 0.5rem;">
  <input class="comp-otp-digit" type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" style="width: 3rem; height: 3rem; text-align: center; font-size: 1.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; font-weight: bold;">
  <input class="comp-otp-digit" type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" style="width: 3rem; height: 3rem; text-align: center; font-size: 1.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; font-weight: bold;">
  <input class="comp-otp-digit" type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" style="width: 3rem; height: 3rem; text-align: center; font-size: 1.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; font-weight: bold;">
  <input class="comp-otp-digit" type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" style="width: 3rem; height: 3rem; text-align: center; font-size: 1.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; font-weight: bold;">
  <input class="comp-otp-digit" type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" style="width: 3rem; height: 3rem; text-align: center; font-size: 1.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; font-weight: bold;">
  <input class="comp-otp-digit" type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" style="width: 3rem; height: 3rem; text-align: center; font-size: 1.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; font-weight: bold;">
</div>

<!-- With label and error -->
<div class="comp-field" style="margin-bottom: 1.5rem;">
  <label for="otp" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Enter verification code</label>
  <div class="comp-otp-input" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
    <input id="otp" class="comp-otp-digit" type="text" inputmode="numeric" maxlength="1" aria-label="Code digit 1" style="width: 3rem; height: 3rem; text-align: center; font-size: 1.5rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; font-weight: bold;">
    <!-- More digits... -->
  </div>
  <div class="comp-error-text" style="color: var(--color-danger); font-size: 0.875rem;">Invalid code. Please try again.</div>
</div>

<!-- Single input with hidden digits -->
<div class="comp-field">
  <label for="otp-single">Verification code</label>
  <input id="otp-single" type="text" inputmode="numeric" placeholder="000000" maxlength="6" style="letter-spacing: 0.5em; font-size: 1.25rem; font-weight: bold; padding: 0.75rem; border: 1px solid var(--color-border-subtle); border-radius: 0.5rem; width: 100%; max-width: 300px;">
  <div class="comp-helper-text" style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--color-fg-muted);">Check your email for the code</div>
</div>
```

## JavaScript auto-advance

```javascript
function initOtpInput(containerSelector) {
  const inputs = document.querySelectorAll(`${containerSelector} .comp-otp-digit`);
  
  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && input.value === '' && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });
}

initOtpInput('.comp-otp-input');
```

## Accessibility checklist

- [x] **Semantic:** Uses `<input type="text" inputmode="numeric">` appropriately
- [x] **Labels:** Each digit or group has aria-label
- [x] **Keyboard:** Arrow keys / Tab navigate; Backspace goes back
- [x] **Paste:** Supports pasting full code into first field
- [x] **Error:** aria-invalid="true" on invalid state
- [x] **Screen reader:** Code completion announced

## Keyboard behavior

| Key | Action |
|-----|--------|
| `0-9` | Type digit, auto-advance to next |
| `Tab` | Move to next field |
| `Shift+Tab` | Move to previous field |
| `Backspace` | Clear, move to previous field |
| `Ctrl+V` (paste) | Paste full code into fields |
| `Arrow keys` | Navigate between fields |

## ARIA requirements

| Role/Attribute | Purpose | Notes |
|---|---|---|
| `aria-label="Code digit N"` | Digit position | For each input |
| `aria-invalid="true"` | Invalid state | When code rejected |
| `aria-describedby` | Error message | Links to error text |
| `inputmode="numeric"` | Numeric keyboard | Mobile optimization |

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-border-subtle` | Field border | Normal state |
| `--color-danger` | Error color | Invalid state |
| `--space-*` | Gap | Field spacing |

## Variants

- **Separated fields:** Individual inputs (most accessible)
- **Single input:** One field, hidden characters
- **Auto-advance:** Move focus after each digit
- **Paste support:** Allow pasting full code
- **Resend timer:** "Resend code in X seconds"

## UX patterns

```html
<!-- With resend link -->
<div style="margin-top: 1.5rem; text-align: center;">
  <p style="color: var(--color-fg-muted); font-size: 0.875rem;">
    Didn't receive the code?
    <button class="comp-button-text" onclick="resendCode()">Resend</button>
  </p>
  <p style="color: var(--color-fg-muted); font-size: 0.75rem; margin-top: 0.5rem;">
    Resend available in <span id="timer">60</span>s
  </p>
</div>

<!-- With auto-clear after success -->
<script>
function submitOtpCode() {
  const code = Array.from(document.querySelectorAll('.comp-otp-digit'))
    .map(input => input.value)
    .join('');
  // Verify code...
  if (codeValid) {
    // Success
    showSuccessMessage();
  }
}
</script>
```

## AI / machine-readable notes

- **Selector pattern:** `comp-otp-input` wrapper with `comp-otp-digit` children (typically 4-6 inputs)
- **Auto-advance:** JavaScript focuses next field on single digit entry
- **Paste support:** Handle paste event to distribute digits across fields
- **Keyboard:** Backspace moves focus to previous field
- **Error:** Mark as aria-invalid="true" when code invalid
- **Copy-paste use:** Update digit count and callback function

## Related patterns

- **Input:** Single text input
- **Field:** Complete form field with label/error
- **Form:** Multi-step verification form
