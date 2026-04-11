# RFC: Range Slider (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: çift thumb range seçimi, histogram/scale label sistemi

## Amaç
Bu RFC, range slider için canonical class surface, state davranışı, token tüketimi ve erişilebilirlik beklentilerini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/range-slider.css`

## Canonical Class Surface
Range slider için canonical class adı:
- `range-slider`

`slider`, `input-range`, `range-input`, `range-control` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Disabled state HTML `disabled` attribute'u ile temsil edilmelidir.
- Invalid state gerekliyse `aria-invalid="true"` kullanımı tüketici seviyesinde değerlendirilebilir.
- Ayrı canonical state class (`range-slider-disabled`, `range-slider-active`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de range-slider class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

## Token Tüketimi
- Radius: `--radius-md`
- Color semantic/core: `--color-border-subtle`, `--color-bg-surface`, `--color-accent`

## Accessibility Beklentisi
1. Range slider için görünür label veya `aria-label` sağlanmalıdır.
2. Min/max/step bilgileri HTML attribute'ları ile açık tanımlanmalıdır.
3. Disabled durum semantik `disabled` attribute'u ile temsil edilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de range-slider için resolver API tanımlı değildir.

## Open Questions
1. v0.3'te dual-range (min/max) için ayrı surface gerekli mi?

## Önerilen Konum
`docs/rfcs/components/range-slider-rfc.md`
