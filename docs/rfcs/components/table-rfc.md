# RFC: Table (v0.2 Foundation)

## Durum
- Status: Draft (documentation RFC)
- Scope: v0.2 mevcut foundation surface
- Non-goal: data-grid seviyesinde sıralama, sanallaştırma veya kolon yeniden boyutlandırma davranışı eklemek

## Amaç
Bu RFC, table için canonical class surface, override davranışı, token tüketimi, erişilebilirlik beklentisi ve recipe ilişkisini normatif olarak tanımlar.

## Referanslar
- `docs/contracts/naming-convention-spec.md`
- `docs/contracts/token-dictionary-spec.md`
- `contracts/naming.contract.mjs`
- `packages/components/table.css`

## Canonical Class Surface
Table için canonical class adları:
- Root: `table`
- Head group: `table-head`
- Body group: `table-body`
- Row: `table-row`
- Header cell: `table-head-cell`
- Cell: `table-cell`

`data-table`, `table-grid`, `table-header-cell`, `table-body-row` gibi paralel canonical class yüzeyi tanımlanmamalıdır.

## State Representation
- Seçili satır durumu `data-row-selected="true"` ile temsil edilmelidir.
- Ayrı `table-row-selected` canonical class yüzeyi tanımlanmaz.

## Recipe İlişkisi
v0.2'de table class surface recipe tarafından üretilmez.

## Override Davranışı
Katman sırası: `reset -> base -> layouts -> recipes -> components -> utilities`.

Kurallar:
1. Table surface `components` layer'dan gelir.
2. Utility class'ları table root/satır/hücre düzeyinde override amaçlı kullanılabilir.
3. `force-*` utility yalnızca escape-hatch olarak kullanılabilir.

## Token Tüketimi
Table surface aşağıdaki tokenları tüketir:
- Space: `--space-2`, `--space-3`
- Radius: `--radius-md`
- Color semantic/core: `--color-bg-surface`, `--color-bg-default`, `--color-border-subtle`, `--color-fg-default`, `--color-gray-100`
- Typography: `--font-size-sm`

Normatif kural:
- Tablo görünüm kararlarında semantic tokenlar varsayılan tercih olmalıdır.
- Core token kullanımına yalnızca semantic karşılık yoksa gidilmelidir.

## Accessibility Beklentisi
1. Veri tablosu semantik `<table>` yapısıyla kurulmalıdır.
2. Başlık hücreleri `<th scope="col">` veya uygun scope ile tanımlanmalıdır.
3. Satır seçimi görsel olarak işaretlense bile seçim anlamı yalnızca renkle verilmemelidir.
4. Tablonun amacı gerekiyorsa erişilebilir ad (`aria-label` veya `caption`) ile desteklenmelidir.

## Resolver Kullanım Sözleşmesi
v0.2'de table için resolver API tanımlı değildir.

## Open Questions
1. Yoğun veri görünümü için `table--dense` benzeri axis ihtiyacı recipe yerine utility ile mi yönetilmeli?
2. Boş durum satırı için canonical `table-empty-row` surface gerekli mi, yoksa `empty-state` kombinasyonu yeterli mi?

## Önerilen Konum
`docs/rfcs/components/table-rfc.md`
