# RFC: Stat (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: chart, sparkline veya KPI kompozitleri eklemek

## Amaç
Bu RFC, stat için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/stat.css`

## Canonical Class Surface
Stat için canonical class adları:
- Root: `stat`
- Label: `stat-label`
- Value: `stat-value`
- Meta: `stat-meta`

`metric-card`, `kpi`, `stat-title`, `stat-number`, `stat-caption` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de stat için ayrı durum class yüzeyi tanımlanmaz.
- Trend veya durum farkları metin ve mevcut utility/semantic surface ile temsil edilmelidir.

## Recipe İlişkisi
v0.2'de stat class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Stat surface `components` layer'dan gelir.
2. Utility class'ları label/value/meta düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Stat surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Typography: `--font-size-sm`, `--font-size-lg`
- Color semantic: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`

Normatif kural:
- Stat görünüm kararları semantic tokenlar üzerinden kurulmalıdır.

## Accessibility Beklentisi
1. Label ve value ilişkisi açık olmalıdır.
2. Stat bir grupta kullanılıyorsa uygun semantik yapı (`section`, `dl`, uygun heading) tercih edilmelidir.
3. Yalnızca renk farkı ile durum anlatımı yapılmamalıdır; metin/ikonla desteklenmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de stat için resolver API tanımlı değildir.

## Open Questions
1. `stat` ile `kpi-card` sınırı v0.3'te nasıl ayrılmalı?
2. Yoğun dashboard görünümünde stat için compact varyant gerekir mi?

## Önerilen Konum
`docs/rfcs/components/stat-rfc.md`
