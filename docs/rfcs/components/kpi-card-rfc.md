# RFC: KPI Card (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: chart/sparkline, hedef karşılaştırma motoru veya interaktif analitik katmanı eklemek

## Amaç
Bu RFC, KPI Card için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/kpi-card.css`

## Canonical Class Surface
KPI Card için canonical class adları:
- Root: `kpi-card`
- Header: `kpi-card-header`
- Value: `kpi-card-value`
- Meta: `kpi-card-meta`
- Trend badge: `kpi-card-trend`

`kpi`, `metric-tile`, `kpi-panel`, `kpi-value`, `kpi-trend` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de KPI Card için ayrı state class yüzeyi tanımlanmaz.
- Pozitif/negatif trend farkı metin + mevcut utility kombinasyonları ile temsil edilmelidir.

## Recipe İlişkisi
v0.2'de kpi-card class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. KPI Card surface `components` layer'dan gelir.
2. Utility class'ları header/value/meta/trend düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
KPI Card surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-xs`, `--font-size-sm`, `--font-size-lg`
- Color semantic: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`

Normatif kural:
- KPI card görsel kararları semantic tokenlar üzerinden kurulmalıdır.

## Accessibility Beklentisi
1. KPI label ve value ilişkisi açık olmalıdır.
2. Trend bilgisi yalnızca renk ile verilmemeli, metinle desteklenmelidir.
3. Birden fazla KPI birlikte kullanılıyorsa semantik grup yapısı (`section`, `ul`, `dl`) tercih edilmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de KPI Card için resolver API tanımlı değildir.

## Open Questions
1. KPI Card ile `stat` yüzeyi v0.3'te net olarak nasıl ayrıştırılmalı?
2. Trend tone (`positive`, `negative`) için canonical axis gerekir mi?

## Önerilen Konum
`docs/rfcs/components/kpi-card-rfc.md`
