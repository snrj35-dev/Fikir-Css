# RFC: Data Table Toolbar (v0.6 Pattern)

## Durum
- Status: Draft (implementation-aligned pattern RFC)
- Scope: v0.6 experimental product pattern surface
- Non-goal: yeni `data-table-toolbar` component class'ı, table state engine, column pinning API, server transport contract

## Amaç
Bu RFC, `data-table-toolbar` pattern'i için canonical attribute surface, slot sözleşmesi, override davranışı, token tüketimi ve erişilebilirlik beklentilerini normatif olarak tanımlar.

## Referanslar
- `docs/architecture/headless-contract-spec.md`
- `docs/architecture/data-table-toolbar-pattern-spec.md`
- `packages/components/data-table-toolbar.css`
- `packages/components/table.css`
- `packages/components/data-grid.css`

## Canonical Pattern Surface
`data-table-toolbar` için canonical işaretleme:
- Root: `data-pattern="data-table-toolbar"`
- Control row: `data-slot="controls"`
- Search area: `data-slot="search"`
- Filter controls: `data-slot="filters"`
- Column visibility controls: `data-slot="column-visibility"`
- Density controls: `data-slot="density"`
- Export controls: `data-slot="export"`
- Bulk/non-export actions: `data-slot="actions"`
- Summary row: `data-slot="summary"`
- Active filters: `data-slot="active-filters"`
- Selection summary: `data-slot="selection-summary"`
- Controlled surface: `data-slot="surface"`

`table-toolbar`, `grid-toolbar`, `toolbar-export`, `selection-meta` gibi paralel canonical class veya slot alias'ları tanımlanmamalıdır.

## State Representation
- Toolbar'ın etkilediği table/data-grid state'i mevcut surface attribute'ları ile temsil edilmelidir (`data-row-selected`, `data-loading`, vb.).
- Toolbar üstünde ayrı canonical state class yüzeyi (`data-table-toolbar-busy`, `data-table-toolbar-selected`) tanımlanmaz.
- Seçili satır özeti metinle görünür verilmelidir.

## Slot Contract
1. `controls` satırı toolbar'ın birincil etkileşim alanıdır.
2. `search` slot'u search-box tabanlı sorgu girişini taşır.
3. `filters` slot'u table/data-grid kapsamını daraltan kontrolleri taşır.
4. `column-visibility` slot'u kolon görünürlüğüyle ilgili kontrolleri taşır.
5. `density` slot'u compact/default/comfortable seçimlerini taşır.
6. `export` slot'u CSV/JSON/report export aksiyonlarını taşır.
7. `actions` slot'u bulk assign, bulk close, archive gibi export dışı aksiyonları taşır.
8. `summary` satırı opsiyoneldir; görünür aktif filtre ve seçim özeti varsa kullanılmalıdır.
9. `active-filters` slot'u tag/chip/badge tabanlı filtre özetini taşır.
10. `selection-summary` slot'u seçili satır sayısı ve ek metayı taşır.
11. `surface` slot'u toolbar'ın bağlandığı `table` veya `data-grid` surface'ini taşır.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Pattern stilleri `components` layer'dan gelir.
2. Slot dizilimi utilities ile esnetilebilir; yeni semantic alias class eklenmemelidir.
3. `card[data-pattern="data-table-toolbar"]` host'ları panel padding/border ayarını host seviyesinde taşıyabilir.
4. `export` ve `actions` slot'ları farklı sorumluluklara sahiptir; export butonları `actions` içine rastgele taşınmamalıdır.

## Token Tüketimi
- Space: `--space-2`, `--space-3`
- Radius: `--radius-lg`
- Typography: `--font-size-sm`
- Colors: `--color-bg-default`, `--color-bg-surface`, `--color-border-subtle`, `--color-fg-muted`

## Accessibility Beklentisi
1. Search alanı erişilebilir label taşımalıdır.
2. Toolbar kontrolleri etkilediği surface ile `aria-controls` üzerinden ilişkilendirilmelidir.
3. `column-visibility`, `density`, `export` ve bulk aksiyon kontrolleri semantik `button`/`select` elemanları olmalıdır.
4. Toplu aksiyonlar seçili satır yokken devre dışı kalıyorsa bu durum native `disabled` ile ifade edilmelidir.
5. `selection-summary` alanı yalnızca badge ile değil metinle de anlaşılır olmalıdır.

## Resolver Kullanım Sözleşmesi
v0.6'da `data-table-toolbar` için resolver API tanımlı değildir.

## Open Questions
1. Sort state ve column pinning özetleri ileride ayrı slot gerektirir mi?
2. Server-side pagination/filter sync için ayrı integration guide gerekli mi?

## Önerilen Konum
`docs/rfcs/patterns/data-table-toolbar-rfc.md`
