# RFC: Filter Bar (v0.6 Pattern)

## Durum
- Status: Draft (implementation-aligned pattern RFC)
- Scope: v0.6 experimental product pattern surface
- Non-goal: yeni `filter-bar` component class'ı, query parser, remote filtering protocol, runtime state manager

## Amaç
Bu RFC, `filter-bar` pattern'i için canonical attribute surface, `data-slot` sözleşmesi, override davranışı, token tüketimi ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `docs/architecture/headless-contract-spec.md`
- `docs/architecture/filter-bar-pattern-spec.md`
- `packages/components/filter-bar.css`
- `packages/components/search-box.css`
- `packages/components/tag-chip.css`

## Canonical Pattern Surface
`filter-bar` için canonical işaretleme:
- Root: `data-pattern="filter-bar"`
- Control row: `data-slot="controls"`
- Search area: `data-slot="search"`
- Filter controls: `data-slot="filters"`
- Reset area: `data-slot="reset"`
- Action area: `data-slot="actions"`
- Summary row: `data-slot="summary"`
- Active chips: `data-slot="chips"`
- Meta text: `data-slot="meta"`

`filter-bar`, `filter-toolbar`, `filter-summary`, `active-filters`, `filter-reset` gibi paralel canonical class veya slot alias'ları tanımlanmamalıdır.

## State Representation
- Arama ve filtre state'i mevcut surface'lerin native/ARIA durumları ile temsil edilmelidir.
- Aktif filtreler `tag-chip` veya `badge` ile gösterilmelidir.
- Pattern durumu için ayrı canonical state class yüzeyi (`filter-bar-active`, `filter-bar-dirty`) tanımlanmaz.

## Slot Contract
1. `controls` satırı pattern'in birincil etkileşim alanıdır.
2. `search` slot'u `search-box` veya `input-group` tabanlı arama alanı taşımalıdır.
3. `filters` slot'u `select`, `checkbox`, `radio` gibi mevcut filter surface'lerini taşır.
4. `reset` slot'u filtreleri temizleyen ikincil aksiyonları taşır.
5. `actions` slot'u apply/export/save-view gibi reset dışı aksiyonları taşır.
6. `summary` satırı opsiyoneldir; görünür sonuç/meta özeti varsa kullanılmalıdır.
7. `chips` slot'u aktif filtrelerin okunabilir ve tercihen kaldırılabilir özetini taşır.
8. `meta` slot'u sonuç sayısı, scope veya otomatik uygulama bilgisi gibi metni taşır.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Pattern stilleri `components` layer'dan gelir.
2. Slot düzeni utilities ile esnetilebilir; yeni semantic alias class eklenmemelidir.
3. `card[data-pattern="filter-bar"]` gibi host surface'ler padding/border override edebilir.
4. `btn` aksiyonlarında aynı axis çakışmaları birlikte kullanılmamalıdır.

## Token Tüketimi
- Space: `--space-1`, `--space-2`, `--space-3`
- Radius: `--radius-lg`
- Typography: `--font-size-xs`, `--font-size-sm`
- Colors: `--color-bg-default`, `--color-bg-surface`, `--color-border-subtle`, `--color-fg-muted`

## Accessibility Beklentisi
1. Search alanı erişilebilir label taşımalıdır.
2. Birden fazla ilişkili filtre varsa `fieldset`/`legend` tercih edilmelidir.
3. Reset ve apply aksiyonları gerçek `button` elementi olmalıdır.
4. Aktif filtre kaldırma aksiyonu varsa `tag-chip-remove` butonu `aria-label` taşımalıdır.
5. Sonuç sayısı veya kapsam özeti yalnızca renk ile değil metinle de ifade edilmelidir.

## Resolver Kullanım Sözleşmesi
v0.6'da `filter-bar` için resolver API tanımlı değildir.

## Open Questions
1. Mobilde drawer handoff davranışı bu RFC'ye mi, ayrı bir responsive pattern notuna mı taşınmalı?
2. Saved views / preset filters için ayrı slot gerekirse mevcut contract nasıl genişlemeli?

## Önerilen Konum
`docs/rfcs/patterns/filter-bar-rfc.md`
