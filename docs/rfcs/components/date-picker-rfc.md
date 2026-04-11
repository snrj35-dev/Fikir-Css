# RFC: Date Picker (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: date parsing/formatting engine, timezone çözümü, range seçimi, keyboard navigation engine

## Amaç
Bu RFC, date picker için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/date-picker.css`

## Canonical Class Surface
Date picker için canonical class adları:
- Root: `date-picker`
- Input: `date-picker-input`
- Trigger: `date-picker-trigger`
- Panel: `date-picker-panel`
- Grid: `date-picker-grid`
- Day cell: `date-picker-day`

`datepicker`, `date-input`, `calendar-picker`, `date-picker-open` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Açık/kapalı görünüm root üstünde `data-open="true|false"` ile temsil edilmelidir.
- Seçili gün `data-selected="true"` ile temsil edilmelidir.
- Bugünün günü `data-today="true"` ile temsil edilebilir.
- Ay dışı günler `data-outside="true"` ile temsil edilebilir.
- Etkileşimsiz gün `disabled` attribute'u ile temsil edilmelidir.
- Ayrı canonical state class yüzeyi (`date-picker-open`, `date-picker-selected`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de date-picker class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Date picker surface `components` layer'dan gelir.
2. Utility class'ları wrapper/panel/day düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.
4. Component davranışı yeni semantic alias class eklenerek değil, mevcut surface ile korunmalıdır.

### Allowed Combinations
- Kabul edilir: `date-picker` + `data-open="true"` + `date-picker-panel`
- Kabul edilir: `date-picker-day` + `data-selected="true"`

### Disallowed Combinations
- Kabul edilmez: `date-picker` ile birlikte `datepicker` paralel alias kullanımı
- Kabul edilmez: `date-picker-open` veya `date-picker-selected` gibi state class üretimi

## Token Tüketimi
Date picker surface aşağıdaki tokenları tüketir:
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-sm`
- Effects: `--shadow-sm`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`, `--color-accent`, `--color-primary-500`, `--color-gray-50`

Normatif kural:
- Surface kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token yalnızca semantic karşılık yoksa istisnai olarak kullanılmalıdır.

## Accessibility Beklentisi
1. Date input için erişilebilir label sağlanmalıdır.
2. Trigger öğesi `<button type="button">` olmalıdır.
3. Trigger-panel ilişkisi `aria-controls` ve `aria-expanded` ile kurulmalıdır.
4. Takvim paneli, erişilebilir isim taşıyan bir bölge olarak sunulmalıdır (`role="dialog"` veya eşdeğer semantik yapı).
5. Gün hücreleri etkileşimliyse `button` elementi kullanılmalıdır.
6. Disabled günlerde yalnızca görsel stil değil, HTML `disabled` davranışı da kullanılmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de date-picker için resolver API tanımlı değildir.

## Open Questions
1. Date picker ve calendar yüzeyleri v0.3'te tek RFC altında mı, ayrı RFC'lerde mi yönetilmeli?
2. Klavye ile gün navigasyonu için minimum davranış seviyesi hangi fazda zorunlu hale gelmeli?
3. Lokalizasyon (hafta başlangıç günü, ay adı formatı) bu surface için framework kapsamına alınmalı mı?

## Önerilen Konum
`docs/rfcs/components/date-picker-rfc.md`
