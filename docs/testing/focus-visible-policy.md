# Focus-Visible Policy

## Scope

Bu belge, Fikir CSS'in tüm interaktif yüzeylerinde klavye odak göstergesinin nasıl uygulandığını tanımlar.

## Temel kural

Fikir CSS, tüm interaktif elemanlarda `:focus-visible` sözde sınıfını kullanır. `:focus` kullanılmaz; bu sayede fare kullanıcıları gereksiz odak halkasıyla rahatsız edilmez.

```css
/* ✓ Doğru */
.btn:focus-visible { outline: 2px solid var(--color-focus); }

/* ✗ Yanlış */
.btn:focus { outline: 2px solid blue; }
```

## Tasarım belirteci

| Token | Değer | Kullanım |
|---|---|---|
| `--color-focus` | `oklch(60% 0.22 264)` | Odak halkası rengi |
| `--color-focus-offset` | `2px` | `outline-offset` değeri |

## Standart uygulama

Her interaktif yüzeyin odak stili şu şekilde standartlaştırılmıştır:

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

## Yüksek kontrast desteği

`forced-colors: active` medya sorgusunda `outline` rengi otomasyonla OS tarafından sağlananla değiştirilir. Ek müdahale gerekmez:

```css
@media (forced-colors: active) {
  :focus-visible {
    outline: 2px solid ButtonText;
  }
}
```

## Bileşen özel kurallar

Bazı bileşenler için `outline-offset` uyarlanır:

| Bileşen | `outline-offset` | Neden |
|---|---|---|
| `switch` | `-2px` | Yuvarlak yüzeyde dahili odak |
| `avatar` | `2px` | Standart |
| `btn` | `2px` | Standart |
| `input` | `0` | Border-box içinde |
| `.tab` | `-2px` | Tab çubuğunda iç odak |

## Test etme

Klavye odak göstergesi, aşağıdaki koşullarda görünür olmalıdır:

1. Tab ile elemente gelindiğinde
2. Shift+Tab ile geri gelindiğinde
3. Arrow key ile navigate edildiğinde (roving tabindex)
4. JS ile `.focus()` çağrıldığında

```bash
npm run test:browser
```

## İlgili belgeler

- [`docs/testing/accessibility-matrix.md`](./accessibility-matrix.md)
- [`docs/testing/color-contrast-policy.md`](./color-contrast-policy.md)
