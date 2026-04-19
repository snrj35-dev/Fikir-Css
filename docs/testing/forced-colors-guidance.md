# Forced Colors Guidance

## Nedir?

`forced-colors` modu, Windows Yüksek Kontrast gibi işletim sistemi erişilebilirlik özelliklerinin etkinleştirildiği durumlarda tarayıcının renk paletini sistem renklerine zorladığı moddur. CSS `color`, `background-color`, `border-color` ve `outline` değerleri tarayıcı tarafından geçersiz kılınır.

## Fikir CSS yaklaşımı

Fikir CSS, `forced-colors: active` modunda aşağıdaki stratejiyi benimser:

1. **CSS Custom Properties geçersiz kılınır** — `var(--color-*)` değerleri sistem rengiyle değiştirilir; bu beklenen davranıştır.
2. **Yapısal özellikler (boyut, layout) korunur** — `width`, `height`, `padding`, `margin` etkilenmez.
3. **Ek override gerekmez** — sistem renkleri WCAG AA'yı zaten karşılar.

## Sistem renk anahtarları

Forced-colors modunda kullanılabilecek CSS sistem renk anahtar kelimeleri:

| Anahtar | Kullanım |
|---|---|
| `ButtonText` | Buton üzerindeki metin |
| `ButtonFace` | Buton arka planı |
| `Canvas` | Sayfa arka planı |
| `CanvasText` | Sayfa metni |
| `LinkText` | Bağlantı rengi |
| `Highlight` | Seçili metin arka planı |
| `HighlightText` | Seçili metin |
| `GrayText` | Devre dışı metin |

## Dikkat edilmesi gerekenler

### 1. `box-shadow` ile oluşturulan görünür kenarlıklar

`box-shadow` forced-colors modunda kaldırılır. Eğer görünürlük için sadece `box-shadow` kullanılıyorsa, alternatif olarak `outline` veya `border` eklenmelidir:

```css
/* ✓ Forced-colors için güvenli */
.card {
  border: 1px solid var(--color-border-subtle);
}

/* ⚠️ Tek başına kullanılırsa forced-colors'da kaybolur */
.card {
  box-shadow: 0 0 0 1px var(--color-border-subtle);
}
```

### 2. SVG icon rengi

SVG `fill` ve `stroke` değerleri forced-colors'da etkilenir. `currentColor` kullanmak güvenlidir:

```css
/* ✓ Güvenli */
.icon { fill: currentColor; }

/* ⚠️ Forced-colors'da kaybolabilir */
.icon { fill: var(--color-primary-500); }
```

### 3. Focus indicator

`:focus-visible` outline'ı forced-colors modunda `ButtonText` rengiyle otomatik override edilir. Ek müdahale gerekmez.

### 4. Arka plan görsellerinin devre dışı bırakılması

`background-image` forced-colors modunda kaldırılır. İçerik taşıyan görsel varsa `<img>` olarak kullanılmalıdır.

## Test etme

### Windows Yüksek Kontrast

1. Windows → Ayarlar → Erişilebilirlik → Yüksek Kontrast'ı etkinleştir
2. Tarayıcıda uygulamayı aç ve tüm etkileşimli ögelerin görünür olduğunu doğrula

### Chrome DevTools emülasyonu

1. DevTools → Rendering sekmesi
2. **Emulate CSS media feature forced-colors** → `active`

### Playwright ile test

```js
await page.emulateMedia({ forcedColors: 'active' });
await expect(page.locator('#btn-primary')).toBeVisible();
```

## Fikir CSS bileşen durumu

Aşağıdaki bileşenler forced-colors uyumluluğu için doğrulanmıştır:

| Bileşen | Durum | Not |
|---|---|---|
| `btn` | ✓ | `border` mevcut, `box-shadow` sadece ek efekt |
| `input` | ✓ | `border` mevcut |
| `modal` | ✓ | `border` mevcut |
| `card` | ✓ | `border` mevcut |
| `badge` | ✓ | `border` mevcut |
| `tag` | ✓ | `border` mevcut |
| `switch` | ✓ | `outline-offset` ile odak görünür |

## İlgili belgeler

- [`docs/testing/color-contrast-policy.md`](./color-contrast-policy.md)
- [`docs/testing/focus-visible-policy.md`](./focus-visible-policy.md)
