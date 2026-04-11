# RFC: Rating (v0.4 Professional Core)

## Durum
- Status: Draft (proposed RFC)
- Scope: v0.4 gap-closure component
- Non-goal: review system, histogram analytics, recommendation engine

## Amaç
Bu RFC, rating surface'i için canonical class yüzeyi, state davranışı, token tüketimi ve erişilebilirlik beklentilerini tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `docs/roadmap/competitive-gap-analysis-2026-04-11.md`

## Canonical Class Surface
Önerilen canonical class adları:
- Root: `rating`
- Item: `rating-item`
- Active item: `rating-item-active`

`stars`, `rate`, `score-input` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Disabled state `disabled` veya `aria-disabled="true"` ile temsil edilir.
- Readonly state `aria-readonly="true"` ile temsil edilebilir.
- Seçili değer semantik olarak uygun input modeliyle ilişkilendirilmelidir (radio grubu veya uygun button modeli).
- Ayrı canonical state class (`rating-disabled`) tanımlanmaz.

## Recipe İlişkisi
v0.4 ilk aşamada rating recipe-generated olmayacaktır.
Canonical surface `components` layer içinde tutulur.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Rating temel görünümü `components` layer'dan gelir.
2. Utility override desteklenir, ancak görsel durumları anlamsızlaştıracak aşırı override kaçınılmalıdır.

## Token Tüketimi
Önerilen token kullanımı:
- Space: `--space-1`, `--space-2`
- Radius: `--radius-sm`
- Color semantic: `--color-fg-muted`, `--color-accent`, `--color-border-subtle`, `--color-bg-surface`

## Accessibility Beklentisi
1. Rating kontrolü erişilebilir isim taşımalıdır (`aria-label`/`aria-labelledby`).
2. Klavye ile değer seçimi mümkün olmalıdır.
3. Seçili değer ekran okuyucuya anlamlı biçimde iletilmelidir.
4. Salt ikon kullanımı varsa alternatif metinsel bilgi sağlanmalıdır.

## Open Questions
1. Rating için half-step (`3.5`) desteği ilk sürüme dahil olmalı mı?
2. Tek seçimli radio tabanlı model mi, button tabanlı model mi varsayılan olmalı?
3. Readonly rating için ayrı görsel treatment gerekli mi?

## Önerilen Konum
`docs/rfcs/components/rating-rfc.md`
