# RFC: List (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: virtualized list, grouped list manager veya reorder interaction eklemek

## Amaç
Bu RFC, list için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/list.css`

## Canonical Class Surface
List için canonical class adları:
- Root: `list`
- Item: `list-item`

`item-list`, `data-list`, `list-row`, `list-entry` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- v0.2'de list için ayrı state class yüzeyi tanımlanmaz.
- Aktif/seçili öğe temsilinde semantik attribute ve mevcut utility kombinasyonları kullanılmalıdır.

## Recipe İlişkisi
v0.2'de list class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. List surface `components` layer'dan gelir.
2. Utility class'ları root/item seviyesinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
List surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic: `--color-bg-surface`, `--color-border-subtle`, `--color-fg-default`

Normatif kural:
- List görsel kararlarında semantic tokenlar tercih edilmelidir.

## Accessibility Beklentisi
1. Liste semantiği gerekiyorsa `ul`/`ol` kullanılmalıdır.
2. `list-item` uygulanan öğeler gerçek liste öğeleri (`li`) veya eşdeğer semantics taşımalıdır.
3. Etkileşimli içerik varsa öğe içinde uygun semantik element (`button`, `a`) kullanılmalıdır.

## Resolver Kullanım Sözleşmesi
v0.2'de list için resolver API tanımlı değildir.

## Open Questions
1. Yoğun (compact) list görünümü için v0.3'te ayrı canonical surface gerekir mi?
2. Bölüm başlıklı listeler (`list-section`) için ayrı RFC açılmalı mı?

## Önerilen Konum
`docs/rfcs/components/list-rfc.md`
