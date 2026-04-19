# Password Input

Görünürlük toggle'ı olan şifre giriş alanı. `data-pattern="password-input"` wrapper'ı, standart `input[type="password"]` üzerine bir toggle düğmesi ve isteğe bağlı güç göstergesi ekler.

## When to use

- Kullanıcının girdiği şifreyi kontrol etmesi gerektiğinde
- Kayıt ve giriş formlarında
- Güvenlik ayarları ekranlarında

## Anatomy

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

## States

### Visible (data-visible="true")

```html
<div data-pattern="password-input" data-visible="true">
  <input
    class="input"
    data-slot="input"
    type="text"
    value="mysecretpassword"
    aria-label="Password"
  />
  <button
    data-slot="toggle"
    type="button"
    aria-label="Hide password"
    aria-pressed="true"
  >
    <span data-icon="show" aria-hidden="true">👁</span>
    <span data-icon="hide" aria-hidden="true">🙈</span>
  </button>
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
    />
    <button
      data-slot="toggle"
      type="button"
      aria-label="Show password"
    >
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

## Strength levels

| `data-strength` | Color | Meaning |
|---|---|---|
| `weak` | Danger | 1 bar, easy to guess |
| `fair` | Warning | 2 bars, moderate |
| `strong` | Success | 3 bars, good |
| `very-strong` | Success | 4 bars, excellent |

## Accessibility

- Toggle button'ın `aria-label`'ı duruma göre "Show password" / "Hide password" olarak JS ile güncellenmeli.
- Toggle button'a `aria-controls="[input-id]"` eklenmeli.
- Toggle button'a `aria-pressed="true/false"` eklenmeli.
- Görünürlük değiştiğinde `input[type]` JS ile `"password"` ↔ `"text"` olarak değiştirilmeli.

## JavaScript scaffold

```js
document.querySelectorAll('[data-pattern="password-input"]').forEach((wrapper) => {
  const input  = wrapper.querySelector('[data-slot="input"]');
  const toggle = wrapper.querySelector('[data-slot="toggle"]');
  if (!input || !toggle) return;

  toggle.addEventListener('click', () => {
    const isVisible = wrapper.dataset.visible === 'true';
    wrapper.dataset.visible = isVisible ? 'false' : 'true';
    input.type = isVisible ? 'password' : 'text';
    toggle.setAttribute('aria-pressed', String(!isVisible));
    toggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
  });
});
```

## Related components

- **Input** — base input element
- **Field** — form field wrapper (label, helper text, error text)
- **Form** — full form layout
