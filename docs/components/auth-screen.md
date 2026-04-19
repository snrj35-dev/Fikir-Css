# Auth Screen

Giriş, kayıt ve parola sıfırlama ekranları için sayfa düzeyi CSS layout pattern'i. Ortalanmış kart ve iki sütunlu split varyantlarını destekler.

## When to use

- Login / sign-in sayfası
- Register / sign-up sayfası
- Forgot password / reset password sayfası
- Email verification sayfası

## Basic (centered card)

```html
<div data-pattern="auth-screen">
  <header data-slot="brand">
    <img data-slot="logo" src="/logo.svg" alt="Fikir" width="120" height="32" />
    <p data-slot="tagline">Design system for modern products</p>
  </header>

  <main data-slot="card" class="card card-elevated">
    <h1 data-slot="title">Sign in</h1>
    <p data-slot="subtitle">Welcome back! Please enter your details.</p>

    <form class="stack">
      <div class="field">
        <label class="label" for="email">Email</label>
        <input id="email" class="input" type="email" autocomplete="email" />
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

    <button class="btn btn-outline" type="button">Continue with Google</button>

    <p style="text-align: center; font-size: var(--font-size-sm); margin-block-start: var(--space-4)">
      Don't have an account?
      <a href="/register" class="link">Sign up</a>
    </p>
  </main>

  <footer data-slot="footer">
    <a href="/privacy" class="link">Privacy</a> ·
    <a href="/terms" class="link">Terms</a>
  </footer>
</div>
```

## Split variant (brand panel + form)

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
      <p data-slot="subtitle">Start your free trial today.</p>

      <form class="stack">
        <div class="field">
          <label class="label" for="name">Full name</label>
          <input id="name" class="input" type="text" autocomplete="name" />
        </div>
        <div class="field">
          <label class="label" for="reg-email">Work email</label>
          <input id="reg-email" class="input" type="email" autocomplete="email" />
        </div>
        <div class="field">
          <label class="label" for="reg-pwd">Password</label>
          <div data-pattern="password-input">
            <input
              id="reg-pwd"
              class="input"
              data-slot="input"
              type="password"
              autocomplete="new-password"
            />
            <button data-slot="toggle" type="button" aria-label="Show password">
              <span data-icon="show" aria-hidden="true">👁</span>
              <span data-icon="hide" aria-hidden="true">🙈</span>
            </button>
          </div>
        </div>
        <button class="btn btn-solid btn-primary" type="submit">Get started</button>
      </form>

      <p style="text-align: center; font-size: var(--font-size-sm); margin-block-start: var(--space-4)">
        Already have an account?
        <a href="/login" class="link">Sign in</a>
      </p>
    </div>
  </section>
</div>
```

## Variants

| `data-variant` | Description |
|---|---|
| *(default)* | Ortalanmış kart, tam sayfa yüksekliği |
| `split` | Sol marka paneli + sağ form alanı |

## Slots

| Slot | Variant | Description |
|---|---|---|
| `brand` | Her ikisi | Logo ve tagline alanı |
| `logo` | Her ikisi | Logo görüntüsü |
| `tagline` | Default | Kısa slogan metni |
| `card` | Default | Form kart alanı |
| `form` | Split | Form bölümü (split) |
| `title` | Her ikisi | Ekran başlığı |
| `subtitle` | Her ikisi | Yardımcı metin |
| `divider` | Her ikisi | "or" ayırıcısı |
| `footer` | Default | Gizlilik/yasal bağlantılar |

## Accessibility

- `<main>` veya `<section>` ile anlamlı landmark kullanın.
- Form submit hataları için `aria-live="polite"` bölgesi ekleyin.
- Otomatik odak için `autofocus` ilk input'a eklenebilir.

## Related components

- **Password Input** — şifre alanı toggle'ı
- **Field** — form alanı wrapper'ı
- **Card** — kart bileşeni
- **Stack** — dikey yığın layout'u
