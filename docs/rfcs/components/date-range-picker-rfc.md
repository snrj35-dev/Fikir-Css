# RFC: Date Range Picker (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: date parsing/formatting engine, timezone çözümü, preset engine, keyboard navigation engine

## Amaç
Bu RFC, date range picker için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/date-range-picker.css`

## Canonical Class Surface
Date range picker için canonical class adları:
- Root: `date-range-picker`
- Start input: `date-range-picker-start`
- End input: `date-range-picker-end`
- Separator: `date-range-picker-separator`
- Trigger: `date-range-picker-trigger`
- Panel: `date-range-picker-panel`
- Grid: `date-range-picker-grid`
- Day cell: `date-range-picker-day`

`daterange-picker`, `date-range`, `range-calendar`, `date-range-picker-open` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Açık/kapalı görünüm root üstünde `data-open="true|false"` ile temsil edilmelidir.
- Aralık içindeki gün `data-in-range="true"` ile temsil edilmelidir.
- Aralık başlangıcı `data-range-start="true"` ile temsil edilmelidir.
- Aralık bitişi `data-range-end="true"` ile temsil edilmelidir.
- Ay dışı günler `data-outside="true"` ile temsil edilebilir.
- Etkileşimsiz gün `disabled` attribute'u ile temsil edilmelidir.
- Ayrı canonical state class yüzeyi (`date-range-picker-open`, `date-range-picker-in-range`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de date-range-picker class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Date range picker surface `components` layer'dan gelir.
2. Utility class'ları wrapper/panel/day düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.
4. Yeni semantic alias class eklenerek değil, mevcut canonical surface ile ilerlenmelidir.

### Allowed Combinations
- Kabul edilir: `date-range-picker` + `data-open="true"` + `date-range-picker-panel`
- Kabul edilir: `date-range-picker-day` + `data-range-start="true"` + `data-range-end="true"` (tek günlük aralık)

### Disallowed Combinations
- Kabul edilmez: `date-range-picker` ile birlikte `daterange-picker` paralel alias kullanımı
- Kabul edilmez: `date-range-picker-open` veya `date-range-picker-in-range` gibi state class üretimi

## Token Tüketimi
Date range picker surface aşağıdaki tokenları tüketir:
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`
- Effects: `--shadow-sm`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`, `--color-accent`, `--color-primary-500`, `--color-gray-50`

Normatif kural:
- Surface kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token yalnızca semantic karşılık yoksa istisnai olarak kullanılmalıdır.

## Accessibility Beklentisi
1. Başlangıç ve bitiş input'u erişilebilir label almalıdır.
2. Trigger öğesi `<button type="button">` olmalıdır.
3. Trigger-panel ilişkisi `aria-controls` ve `aria-expanded` ile kurulmalıdır.
4. Takvim paneli erişilebilir isim taşımalıdır (`role="dialog"` veya semantik eşdeğeri).
5. Gün hücreleri etkileşimliyse `button` elementi kullanılmalıdır.
6. Aralık özeti (başlangıç-bitiş) ekranda metinle görünür olmalı veya assistive text ile aktarılmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de date-range-picker için resolver API tanımlı değildir.

## Open Questions
1. Date range picker ile calendar surface ayrımı v0.3'te nasıl netleştirilmeli?
2. Preset ranges (last 7 days vb.) bu surface içinde mi, ayrı pattern olarak mı ele alınmalı?
3. Çoklu ay görünümü bu componentin parçası mı, yoksa ayrı seviye mi olmalı?

## Önerilen Konum
`docs/rfcs/components/date-range-picker-rfc.md`
