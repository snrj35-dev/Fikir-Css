# RFC: Calendar (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: recurrence engine, event data modeli, timezone çözümü, çoklu ay navigasyon motoru

## Amaç
Bu RFC, calendar için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/calendar.css`

## Canonical Class Surface
Calendar için canonical class adları:
- Root: `calendar`
- Header: `calendar-header`
- Title: `calendar-title`
- Navigation button: `calendar-nav`
- Grid: `calendar-grid`
- Weekday cell: `calendar-weekday`
- Day cell: `calendar-day`

`calendar-picker`, `month-grid`, `calendar-open`, `calendar-cell` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
State yüzeyi için normatif kararlar:
- Seçili gün `data-selected="true"` ile temsil edilmelidir.
- Bugün `data-today="true"` ile temsil edilebilir.
- Ay dışı günler `data-outside="true"` ile temsil edilebilir.
- Etkileşimsiz günler HTML `disabled` ile temsil edilmelidir.
- Ayrı canonical state class yüzeyi (`calendar-selected`, `calendar-disabled`, `calendar-open`) tanımlanmaz.

## Recipe İlişkisi
v0.2'de calendar class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Calendar surface `components` layer'dan gelir.
2. Utility class'ları wrapper/grid/day düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.
4. Yeni alias class üreterek değil, mevcut canonical class surface ile ilerlenmelidir.

### Allowed Combinations
- Kabul edilir: `calendar-day` + `data-today="true"`
- Kabul edilir: `calendar-day` + `data-selected="true"`

### Disallowed Combinations
- Kabul edilmez: `calendar` ile birlikte `calendar-picker` paralel alias kullanımı
- Kabul edilmez: `calendar-selected`, `calendar-open` gibi state class üretimi

## Token Tüketimi
Calendar surface aşağıdaki tokenları tüketir:
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-sm`, `--radius-md`
- Typography: `--font-size-xs`, `--font-size-sm`
- Effects: `--shadow-sm`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-fg-muted`, `--color-accent`, `--color-primary-500`, `--color-gray-50`

Normatif kural:
- Surface kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token yalnızca semantic karşılık yoksa istisnai olarak kullanılmalıdır.

## Accessibility Beklentisi
1. Calendar kökünde erişilebilir isim olmalıdır (`aria-label` veya başlık ilişkisi).
2. Gün hücreleri etkileşimliyse `button` elementi kullanılmalıdır.
3. Navigation butonları erişilebilir isim taşımalıdır (`aria-label="Previous month"` gibi).
4. Seçili gün durumu yalnızca renkle değil, erişilebilir state/etiket ile de anlaşılır olmalıdır.
5. Disabled günlerde HTML `disabled` davranışı kullanılmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de calendar için resolver API tanımlı değildir.

## Open Questions
1. Calendar ve date-picker surface'leri v0.3'te birleştirilmeli mi, ayrı mı kalmalı?
2. Hafta başlangıç günü ve lokalizasyon hangi seviyede framework sorumluluğu olmalı?
3. Event gösterimi (dot/badge) calendar canonical surface'e dahil edilmeli mi?

## Önerilen Konum
`docs/rfcs/components/calendar-rfc.md`
