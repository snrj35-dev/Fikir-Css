# Data Display Token Audit (v0.2, P4 Paket-1)

## Kapsam
Bu denetim, yeni eklenen surface için token kullanımını listeler:
- `table`
- `empty-state`

## Table Token Kullanımı
Kaynak: `packages/components/table.css`

- Space:
  - `--space-2`
  - `--space-3`
- Radius:
  - `--radius-md`
- Typography:
  - `--font-size-sm`
- Semantic colors:
  - `--color-bg-surface`
  - `--color-bg-default`
  - `--color-border-subtle`
  - `--color-fg-default`
- Core fallback:
  - `--color-gray-100` (seçili satır vurgusu)

Değerlendirme:
- Surface kararlarının çoğu semantic token ile yapılmıştır.
- Seçili satır rengi için core token kullanımı geçici ve sınırlıdır.

## Empty State Token Kullanımı
Kaynak: `packages/components/empty-state.css`

- Space:
  - `--space-2`
  - `--space-3`
  - `--space-4`
- Radius:
  - `--radius-md`
- Typography:
  - `--font-size-sm`
  - `--font-size-md`
- Semantic colors:
  - `--color-bg-surface`
  - `--color-bg-default`
  - `--color-border-subtle`
  - `--color-fg-default`
  - `--color-fg-muted`

Değerlendirme:
- Tamamen semantic odaklı token tüketimi var.
- Yeni token ailesi eklenmemiştir.

## Sonuç
- v0.2 token dictionary ile çelişen bir kullanım bulunmadı.
- P4 paket-1 için token şişmesi oluşturacak yeni değişken eklenmedi.

## Open Question
1. Seçili satır görseli için v0.3'te semantic bir `--color-bg-selected-subtle` token'ı gerekli mi?
