# Reduced Motion Policy

## Amaç

Vestibüler bozukluklar veya hareket hassasiyeti olan kullanıcılar için `prefers-reduced-motion: reduce` medya sorgusu desteklenir. Bu belge, Fikir CSS'in bu politikayı nasıl uyguladığını tanımlar.

## Temel kural

Tüm animasyonlar ve geçişler `reduced-motion` temasına taşınmıştır:

```css
/* packages/tokens/themes/reduced-motion.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Kullanım

```html
<link rel="stylesheet" href="fikir.css" />
<link rel="stylesheet" href="themes/reduced-motion.css" />
```

`prefers-reduced-motion: reduce` algılandığında sistem otomatik olarak geçişleri bastırır.

## Etkilenen bileşenler

Aşağıdaki bileşenler animasyon veya geçiş içerir ve reduced-motion'dan etkilenir:

| Bileşen | Animasyon türü | Reduced-motion davranışı |
|---|---|---|
| `modal` | fade-in + scale | Anında göster |
| `drawer` | slide-in | Anında göster |
| `toast` | slide-up + fade | Anında göster |
| `accordion` | panel expand | Anında aç |
| `tooltip` | fade-in | Anında göster |
| `progress` | bar fill animation | Statik çubuk |
| `skeleton` | shimmer loop | Statik gri |
| `btn` | ripple (opsiyonel) | Devre dışı |

## Tasarım ilkesi

Reduced-motion'da:

1. **Görsel sonuç korunur** — kullanıcı hâlâ modal'ı görmeli, drawer açılmalı
2. **Sadece süre sıfırlanır** — `display: none` gibi radikal değişiklikler yapılmaz
3. **transform ve opacity animasyonları** tercih edilir — `width/height` animasyonları kaçınılır

## Test etme

```bash
# Chromium DevTools > Rendering > Emulate CSS media > prefers-reduced-motion: reduce
npm run test:browser -- --project=chromium
```

Playwright ile reduced-motion emülasyonu:

```js
await page.emulateMedia({ reducedMotion: 'reduce' });
```

## İlgili belgeler

- [`docs/testing/accessibility-matrix.md`](./accessibility-matrix.md)
- [`packages/tokens/themes/reduced-motion.css`](../../packages/tokens/themes/reduced-motion.css)
