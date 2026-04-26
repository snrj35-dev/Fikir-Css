# Auth Screen

> Support level: **Supported** | Pattern key: `pattern.authScreen` | Canonical: `data-pattern="auth-screen"`

## When to use

Page-level layout pattern for authentication flows (login, registration, password recovery). Supports both centered card and split-screen variants.

- ✓ Login / sign-in pages
- ✓ Register / sign-up pages
- ✓ Forgot password / reset password flows
- ✓ Email verification screens
- ✗ Simple contact forms (use `field` and `stack`)
- ✗ Multimodal walkthroughs (use `modal` or `onboarding-checklist`)

## Canonical anatomy

| Attribute | Values | Role |
|-----------|--------|------|
| `data-pattern` | `"auth-screen"` | Root container — required |
| `data-variant` | `"split"` | Two-column layout (brand panel + form) |
| `data-slot="brand"` | — | Brand identity area (logo, tagline) |
| `data-slot="card"` | — | The main interaction container (uses `.card`) |
| `data-slot="title"` | — | Page-level heading |
| `data-slot="subtitle"` | — | Supporting text / secondary label |
| `data-slot="footer"` | — | Legal links and footer navigation |

## Basic usage (Centered card)

```html
<div data-pattern="auth-screen">
  <header data-slot="brand">
    <img data-slot="logo" src="/logo.svg" alt="Fikir" width="120" height="32" />
    <p data-slot="tagline">The CSS framework for building great UIs</p>
  </header>

  <main data-slot="card" class="card card-elevated card-p-lg">
    <h1 data-slot="title">Sign in</h1>
    <p data-slot="subtitle">Welcome back! Please enter your details.</p>

    <form class="stack" style="--stack-gap: var(--space-4)">
      <div class="field">
        <label class="label" for="email">Email address</label>
        <input id="email" class="input" type="email" autocomplete="email" required />
      </div>
      <div class="field">
        <label class="label" for="password">Password</label>
        <div data-pattern="password-input">
          <input
            id="password"
            class="input"
            data-slot="input"
            type="password"
            autocomplete="current-password"
            required
          />
          <button data-slot="toggle" type="button" aria-label="Show password">
            <span data-icon="show" aria-hidden="true">👁</span>
            <span data-icon="hide" aria-hidden="true">🙈</span>
          </button>
        </div>
      </div>
      <button class="btn btn-solid btn-primary" type="submit">Sign in</button>
    </form>

    <div data-slot="divider">or</div>

    <button class="btn btn-outline btn-neutral" type="button">
      Continue with Google
    </button>

    <p style="text-align: center; font-size: var(--font-size-sm); margin-block-start: var(--space-4)">
      Don't have an account?
      <a href="/register" class="link">Sign up</a>
    </p>
  </main>

  <footer data-slot="footer">
    <a href="/privacy" class="link">Privacy Policy</a>
    <span aria-hidden="true">·</span>
    <a href="/terms" class="link">Terms of Service</a>
  </footer>
</div>
```

## Split variant

```html
<div data-pattern="auth-screen" data-variant="split">
  <aside data-slot="brand">
    <img data-slot="logo" src="/logo-white.svg" alt="Fikir" width="140" />
    <h2 style="font-size: var(--font-size-2xl); font-weight: var(--font-weight-bold); margin-block: var(--space-4) var(--space-2)">
      Build faster.
    </h2>
    <p>The CSS framework designed to ship great UIs quickly.</p>
  </aside>

  <section data-slot="form">
    <div data-slot="card" style="inline-size: min(28rem, 100%)">
      <h1 data-slot="title">Create account</h1>
      <p data-slot="subtitle">Start your 14-day free trial today.</p>

      <form class="stack">
        <!-- form fields -->
        <button class="btn btn-solid btn-primary" type="submit">Get started</button>
      </form>
    </div>
  </section>
</div>
```

## Accessibility checklist

- [x] **Semantic HTML:** uses `<main>` or `<section>` for the primary interaction area
- [x] **Landmarks:** header, main, and footer are appropriately tagged
- [x] **Form labels:** all inputs have associated `<label>` elements
- [x] **Autocomplete:** fields use standard `autocomplete` tokens (`email`, `current-password`, `new-password`)
- [x] **Dynamic feedback:** Use `aria-live="polite"` for login error messages
- [x] **Focus management:** Autofocus first input if appropriate for the flow

## Tokens used

| Token | Role | Notes |
|-------|------|-------|
| `--color-bg-default` | Page background | Mixed for split variant |
| `--color-fg-muted` | Tagline/Subtitle color | Reduced emphasis |
| `--space-8`, `--space-12` | Layout padding | Generous spacing |
| `--font-size-2xl` | Brand heading size | For split variant |

## AI / machine-readable notes

- **Pattern identifier:** `data-pattern="auth-screen"`
- **Variant:** `data-variant="split"` for side-by-side brand/form
- **Slots:** `brand`, `logo`, `tagline`, `card`, `title`, `subtitle`, `footer`
- **Component integration:** heavily relies on `card`, `stack`, `field`, `btn`, and `link`
- **Responsive:** layout shifts from column (mobile) to grid/split (desktop) automatically

## Related

- **`password-input`** — secure password field with visibility toggle
- **`field`** — standard form field container
- **`card`** — the base container for the auth form
- **`stack`** — used for vertical form layout
