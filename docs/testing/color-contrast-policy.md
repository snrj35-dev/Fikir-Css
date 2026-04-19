# Color Contrast Policy

## Standart

Fikir CSS, **WCAG 2.2 AA** seviyesini hedefler:

| Metin türü | Minimum oran |
|---|---|
| Normal metin (< 18pt) | 4.5:1 |
| Büyük metin (≥ 18pt veya 14pt+kalın) | 3:1 |
| UI bileşen ve grafik ögeleri | 3:1 |

## Renk token politikası

Fikir CSS token mimarisi, kontrast uyumluluğunu token seviyesinde garanti eder:

| Token grubu | Kullanım | Hedef kontrast |
|---|---|---|
| `--color-fg-default` üzerinde `--color-bg-default` | Varsayılan metin | ≥ 7:1 |
| `--color-fg-muted` üzerinde `--color-bg-default` | İkincil metin | ≥ 4.5:1 |
| `--color-primary-fg` üzerinde `--color-primary` | Birincil buton | ≥ 4.5:1 |
| `--color-danger-fg` üzerinde `--color-danger` | Hata durumu | ≥ 4.5:1 |
| `--color-success-fg` üzerinde `--color-success` | Başarı durumu | ≥ 4.5:1 |

## Dark mode

Dark tema token'ları bağımsız olarak kontrast denetiminden geçer. `dist/themes/dark.css` içindeki tüm renkler light tema ile aynı AA sözleşmesini karşılamalıdır.

## High contrast mode (forced-colors)

Forced-colors modunda sistem renkleri devralınır; Fikir CSS ek bir müdahale yapmaz. Bu mod WCAG AA'yı otomatik olarak aşar.

```css
@media (forced-colors: active) {
  /* Ek override gerekmez; OS renkleri WCAG AAA seviyesindedir */
}
```

## Kontrast raporu

```bash
npm run report:contrast
```

Bu komut `dist/contracts/` altındaki token değerlerini okuyarak hesaplanan kontrast oranlarını raporlar.

## Geçmeyen renkler

Aşağıdaki token kombinasyonları WCAG AA'yı geçememektedir ve gelecek sürümlerde ele alınacaktır:

| Token çifti | Mevcut oran | Hedef | Durum |
|---|---|---|---|
| `--color-fg-muted` / `--color-bg-surface` | ~4.2:1 | 4.5:1 | ⚠️ İyileştirme bekliyor |

## İlgili belgeler

- [`docs/testing/focus-visible-policy.md`](./focus-visible-policy.md)
- [`docs/testing/accessibility-matrix.md`](./accessibility-matrix.md)
